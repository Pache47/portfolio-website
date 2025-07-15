const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.ASSISTANT_ID;

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Basic CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Check if required environment variables are present
    if (!process.env.OPENAI_API_KEY || !ASSISTANT_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing OpenAI configuration' }),
      };
    }

    // Parse request body
    const { threadId, message } = JSON.parse(event.body);

    // Validate input
    if (!threadId || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Thread ID and message are required' }),
      };
    }

    // Basic input validation
    if (typeof message !== 'string' || message.trim().length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message must be a non-empty string' }),
      };
    }

    // Limit message length
    if (message.length > 4000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long. Maximum 4000 characters.' }),
      };
    }

    console.log('Sending message to thread:', threadId);

    // Add the user's message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message.trim()
    });

    console.log('Message added to thread');

    // Run the assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID
    });

    console.log('Assistant run started:', run.id);

    // Poll for the run completion with timeout
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    let attempts = 0;
    const maxAttempts = 60; // 30 seconds timeout (60 * 500ms)

    while ((runStatus.status === 'in_progress' || runStatus.status === 'queued') && attempts < maxAttempts) {
      console.log('Run status:', runStatus.status);
      await new Promise(resolve => setTimeout(resolve, 500));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return {
        statusCode: 408,
        headers,
        body: JSON.stringify({ error: 'Request timeout. Please try again.' }),
      };
    }

    console.log('Run completed with status:', runStatus.status);

    if (runStatus.status === 'completed') {
      // Get the latest messages
      const messages = await openai.beta.threads.messages.list(threadId);
      
      // Find the most recent assistant message
      const lastMessage = messages.data
        .filter(msg => msg.role === 'assistant')[0];

      if (lastMessage && lastMessage.content[0].type === 'text') {
        console.log('Assistant response received');
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ response: lastMessage.content[0].text.value }),
        };
      }
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Failed to get response from assistant. Status: ${runStatus.status}` }),
    };

  } catch (error) {
    console.error('Error sending message:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send message' }),
    };
  }
};
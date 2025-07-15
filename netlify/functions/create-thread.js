const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    if (!process.env.OPENAI_API_KEY || !process.env.ASSISTANT_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing OpenAI configuration' }),
      };
    }

    console.log('Creating new thread...');
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ threadId: thread.id }),
    };
  } catch (error) {
    console.error('Error creating thread:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to create chat thread' }),
    };
  }
};
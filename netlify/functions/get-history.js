const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Basic CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing OpenAI configuration' }),
      };
    }

    // Get threadId from query parameters
    const threadId = event.queryStringParameters?.threadId;

    if (!threadId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Thread ID is required' }),
      };
    }

    console.log('Getting history for thread:', threadId);

    const messages = await openai.beta.threads.messages.list(threadId);
    
    const history = messages.data.map(msg => ({
      role: msg.role,
      content: msg.content[0].type === 'text' ? msg.content[0].text.value : '',
      timestamp: msg.created_at
    })).reverse(); // Reverse to get chronological order

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ history }),
    };

  } catch (error) {
    console.error('Error getting message history:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get message history' }),
    };
  }
};
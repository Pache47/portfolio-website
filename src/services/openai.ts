// Updated frontend service to use Netlify functions
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export async function createThread(): Promise<string> {
  try {
    console.log('Creating new thread...');
    const response = await fetch('/.netlify/functions/create-thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create thread');
    }

    const data = await response.json();
    console.log('Thread created:', data.threadId);
    return data.threadId;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

export async function sendMessage(threadId: string, message: string): Promise<string> {
  try {
    console.log('Sending message to thread:', threadId);
    
    const response = await fetch('/.netlify/functions/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId,
        message
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send message');
    }

    const data = await response.json();
    console.log('Assistant response received');
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function getMessageHistory(threadId: string): Promise<Message[]> {
  try {
    const response = await fetch(`/.netlify/functions/get-history?threadId=${encodeURIComponent(threadId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get message history');
    }

    const data = await response.json();
    return data.history;
  } catch (error) {
    console.error('Error getting message history:', error);
    throw error;
  }
}
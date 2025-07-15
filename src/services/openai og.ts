import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ASSISTANT_ID = import.meta.env.VITE_ASSISTANT_ID;

if (!OPENAI_API_KEY || !ASSISTANT_ID) {
  console.error('Missing OpenAI configuration. Please check your environment variables.');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should use a backend proxy
});

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function createThread() {
  try {
    console.log('Creating new thread...');
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);
    return thread.id;
  } catch (error) {
    console.error('Error creating thread:', error);
    throw error;
  }
}

export async function sendMessage(threadId: string, message: string) {
  try {
    console.log('Sending message to thread:', threadId);
    
    // Add the user's message to the thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message
    });

    console.log('Message added to thread');

    // Run the assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID
    });

    console.log('Assistant run started:', run.id);

    // Poll for the run completion with a shorter interval
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      console.log('Run status:', runStatus.status);
      await new Promise(resolve => setTimeout(resolve, 500)); // Reduced to 500ms from 1000ms
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    console.log('Run completed with status:', runStatus.status);

    if (runStatus.status === 'completed') {
      // Get the latest messages immediately after completion
      const messages = await openai.beta.threads.messages.list(threadId);
      
      // Find the most recent assistant message
      const lastMessage = messages.data
        .filter(msg => msg.role === 'assistant')[0];

      if (lastMessage && lastMessage.content[0].type === 'text') {
        console.log('Assistant response received');
        return lastMessage.content[0].text.value;
      }
    }

    throw new Error(`Failed to get response from assistant. Status: ${runStatus.status}`);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function getMessageHistory(threadId: string): Promise<Message[]> {
  try {
    const messages = await openai.beta.threads.messages.list(threadId);
    
    return messages.data.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content[0].type === 'text' ? msg.content[0].text.value : ''
    }));
  } catch (error) {
    console.error('Error getting message history:', error);
    throw error;
  }
} 
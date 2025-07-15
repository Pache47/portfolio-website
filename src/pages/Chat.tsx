import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { createThread, sendMessage, Message as OpenAIMessage } from '../services/openai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages update

  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log('Initializing chat...');
        const newThreadId = await createThread();
        console.log('Chat initialized with thread ID:', newThreadId);
        setThreadId(newThreadId);
      } catch (error) {
        console.error('Error initializing chat:', error);
        setError('Failed to initialize chat. Please refresh the page and try again.');
      }
    };

    initializeChat();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !threadId || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to OpenAI...');
      const response = await sendMessage(threadId, userMessage.text);
      console.log('Received response from OpenAI');
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Failed to get response from the assistant. Please try again.');
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I apologize, but I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="py-4 border-b border-sky-100">
          <Link to="/" className="flex items-center text-sky-600 hover:text-sky-700">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Chat Container */}
        <div className="h-[calc(100vh-8rem)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 text-red-600 p-4 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500"
              >
                <p className="text-lg font-light mb-2">Welcome to my personal AI Chatbot!</p>
                <p className="text-sm">Hi! I'm Viki, Tsega's AI assistant. Feel free to ask me anything about him.</p>
              </motion.div>
            ) : (
              messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.sender === 'user'
                        ? 'bg-sky-600 text-white'
                        : 'bg-white/80 backdrop-blur-sm text-gray-800'
                    }`}
                  >
                    {message.sender === 'ai' ? (
                      <div className="text-sm font-light whitespace-pre-wrap">
                      <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                    ) : (
                      <p className="text-sm font-light">{message.text}</p>
                    )}                   
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="py-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-sky-200 text-gray-800"
                disabled={isLoading || !threadId}
              />
              <button
                type="submit"
                className="bg-sky-600 text-white rounded-xl px-6 py-4 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !input.trim() || !threadId}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
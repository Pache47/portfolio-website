import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: "Hello! I'm Viki, a personal AI assistant helping you learn more about Tsega's Journey. I am currently under development, so please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
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
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500"
              >
                <p className="text-lg font-light mb-2">Welcome to the my personal AI Chatbot!</p>
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
                    <p className="text-sm font-light">{message.text}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
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
              />
              <button
                type="submit"
                className="bg-sky-600 text-white rounded-xl px-6 py-4 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-200"
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
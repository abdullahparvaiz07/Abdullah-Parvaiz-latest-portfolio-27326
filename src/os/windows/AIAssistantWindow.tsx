/**
 * Abdullah OS — AI Assistant Window
 * Reuses Gemini API from existing Chatbot
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function AIAssistantWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Welcome to **Abdullah OS AI Assistant**!\n\nI'm your built-in portfolio guide. Ask me anything about:\n- 🛠️ Abdullah's **skills & tech stack**\n- 📁 His **projects** and case studies\n- 💼 **Services** he offers\n- 📧 How to **get in touch**\n\nWhat would you like to know?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) return;
      const ai = new GoogleGenAI({ apiKey: apiKey as string });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are the built-in AI assistant of Abdullah OS — a futuristic desktop operating system built into Abdullah Parvaiz's portfolio website. You are knowledgeable, helpful, and enthusiastic.

About Abdullah:
- Full-Stack Web Developer & UI/UX Engineer
- Expert in: React, Next.js, TypeScript, JavaScript, Tailwind CSS, Framer Motion, Node.js, Express, MongoDB
- Also skilled in: Figma, Git, WordPress, AI Integration
- Projects: PortFolyn (CV builder), Subledge (subscription manager), FitNexa AI (AI fitness app), This portfolio with OS mode
- Contact: abdullahparvaizofficial@gmail.com
- GitHub: abdullahparvaiz07
- Based in Pakistan, self-taught developer

Your personality: Professional yet friendly. Use markdown formatting. Be concise but thorough. If asked about things outside Abdullah's portfolio, politely redirect to his skills and projects. Encourage visitors to explore the OS and check out his projects.`,
        },
      });
    } catch (error) {
      console.error('Failed to initialize AI:', error);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) throw new Error('Chat not initialized');
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: response.text, sender: 'bot' }]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="os-ai">
      {/* Messages */}
      <div className="os-ai-messages" ref={scrollRef}>
        {messages.map(msg => (
          <div key={msg.id} className={`os-ai-msg os-ai-msg--${msg.sender}`}>
            <div className={`os-ai-msg-avatar os-ai-msg-avatar--${msg.sender}`}>
              {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
            </div>
            <div className={`os-ai-msg-bubble os-ai-msg-bubble--${msg.sender}`}>
              {msg.sender === 'bot' ? (
                <div className="os-ai-markdown">
                  <Markdown>{msg.text}</Markdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="os-ai-msg os-ai-msg--bot">
            <div className="os-ai-msg-avatar os-ai-msg-avatar--bot">
              <Bot size={14} />
            </div>
            <div className="os-ai-msg-bubble os-ai-msg-bubble--bot os-ai-typing">
              <Loader2 size={14} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="os-ai-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Abdullah..."
          className="os-ai-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="os-ai-send"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}

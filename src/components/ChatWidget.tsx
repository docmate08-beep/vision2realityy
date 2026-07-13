import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ArrowUpRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getWhatsAppLink } from '../lib/utils';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hi! I am the V2R AI Assistant. How can I help you build your vision today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Send last 10 messages for context
          messages: [...messages, userMessage].slice(-10).map(m => ({ role: m.role, content: m.content }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to reach the chat service');
      }

      if (typeof data.message !== 'string' || !data.message.trim()) {
        throw new Error('The chat service returned an empty response');
      }
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.message
      }]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'I am having a little trouble connecting to my servers right now. Please message us on WhatsApp instead!'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to extract a summary of the chat for the WhatsApp handoff
  const getWhatsAppMessageContext = () => {
    if (messages.length <= 1) return "Hi V2R Team, I'm interested in discussing a project.";
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    return `Hi V2R Team, I was chatting with your AI assistant about: "${lastUserMessage?.content || 'starting a project'}". I'd like to discuss further.`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300"
            >
              <MessageSquare size={24} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-0 right-0 sm:bottom-10 sm:right-10 z-[100] w-full sm:w-[420px] h-[100svh] sm:h-[600px] sm:max-h-[85vh] bg-[#0A0A0A] sm:rounded-3xl flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-0 sm:border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#050505] relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                  <Bot size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-light tracking-wide">V2R Assistant</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.2em]">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Persistent WhatsApp Handoff */}
            <div className="bg-[#080808] px-6 py-3 border-b border-white/5 flex justify-between items-center relative z-10">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Talk to a human?</span>
              <a 
                href={getWhatsAppLink(getWhatsAppMessageContext())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-white flex items-center gap-2 hover:opacity-70 transition-opacity uppercase tracking-widest"
              >
                WhatsApp <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-0 bg-gradient-to-b from-[#050505] to-[#0A0A0A]" data-lenis-prevent="true">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-4 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === 'user' ? "bg-white/5 text-white border border-white/10" : "bg-white text-black"
                  )}>
                    {msg.role === 'user' ? <User size={14} strokeWidth={1.5} /> : <Bot size={14} strokeWidth={1.5} />}
                  </div>
                  <div className={cn(
                    "p-4 text-[13px] sm:text-sm leading-relaxed prose prose-invert max-w-none shadow-sm font-sans font-light",
                    msg.role === 'user' 
                      ? "bg-white text-black rounded-2xl rounded-tr-sm" 
                      : "bg-[#111] text-gray-200 rounded-2xl rounded-tl-sm border border-white/5"
                  )}>
                    {msg.role === 'bot' ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4 max-w-[85%] mr-auto">
                   <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} strokeWidth={1.5} />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-[#111] rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-[#050505] border-t border-white/5 relative z-10 pb-8 sm:pb-6">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full bg-[#111] border border-white/10 rounded-full pl-6 pr-14 py-4 text-sm font-light text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2.5 bg-white text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={16} className="ml-0.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

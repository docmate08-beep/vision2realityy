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
            className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-white text-background rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-300"
            >
              <MessageSquare size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[80vh] glass-panel border border-white/20 rounded-3xl flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-background flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">V2R Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Persistent WhatsApp Handoff */}
            <div className="bg-white/[0.03] px-4 py-2 border-b border-white/5 flex justify-between items-center">
              <span className="text-xs text-gray-400">Want to talk to a human?</span>
              <a 
                href={getWhatsAppLink(getWhatsAppMessageContext())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-white flex items-center gap-1 hover:underline"
              >
                WhatsApp Us <ArrowUpRight size={12} />
              </a>
            </div>

            {/* Messages Area - Added data-lenis-prevent to fix scroll */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" data-lenis-prevent="true">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[90%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1",
                    msg.role === 'user' ? "bg-white/10 text-white" : "bg-white text-background"
                  )}>
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed prose prose-invert prose-p:leading-snug prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-300 max-w-none",
                    msg.role === 'user' 
                      ? "bg-white text-background rounded-tr-sm" 
                      : "bg-white/10 text-gray-200 rounded-tl-sm border border-white/5"
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
                <div className="flex gap-3 max-w-[85%] mr-auto">
                   <div className="w-6 h-6 rounded-full bg-white text-background flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/80 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 bg-white text-background rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

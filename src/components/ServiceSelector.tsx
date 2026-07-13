import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { getWhatsAppLink, cn } from '../lib/utils';
import AnimatedText from './AnimatedText';

const services = [
  {
    id: 'ai',
    title: 'AI Automation',
    description: 'AI agents, workflow automation, and LLM integrations.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Bots',
    description: 'Smart bots, order automation, and AI conversational agents.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'web',
    title: 'Web Engineering',
    description: 'High-performance, modern web applications built for scale.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'app',
    title: 'App Development',
    description: 'Native iOS & Android mobile applications.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description: 'Bespoke software tailored to your business logic.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
  },
];

export default function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getWhatsAppMessage = () => {
    if (selectedServices.length === 0) return "Hi V2R Team, I'd like to discuss a project.";
    const selectedTitles = services
      .filter(s => selectedServices.includes(s.id))
      .map(s => s.title)
      .join(', ');
    return `Hi V2R Team, I'm interested in ${selectedTitles}. I'd like to discuss my project.`;
  };

  return (
    <section id="services" className="py-32 relative bg-[#050505] overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <AnimatedText 
              text="What do you need" 
              type="chars" 
              animation="fadeUp" 
              className="text-[10vw] sm:text-5xl md:text-7xl font-serif tracking-tight text-white leading-none will-change-transform"
            />
            <AnimatedText 
              text="Built?" 
              type="chars" 
              animation="blurIn" 
              delay={0.2}
              className="text-[10vw] sm:text-5xl md:text-7xl font-serif font-light italic text-gray-500 tracking-tight leading-none mt-1 sm:mt-2 will-change-transform"
            />
          </div>
          <div className="max-w-md">
            <p className="text-gray-400 text-base sm:text-lg font-sans leading-relaxed">
              Select the services you need. We handle everything from initial concept to ongoing management, completely in-house.
            </p>
          </div>
        </div>
      </div>

      {/* Cinematic Image-Based List */}
      <div className="container mx-auto px-0 sm:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col border-t border-white/10">
          {services.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <div 
                key={service.id}
                onClick={() => toggleService(service.id)}
                className="group relative border-b border-white/10 cursor-none"
              >
                {/* Background Image Reveal on Hover (Desktop) */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none hidden sm:block">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-[150%] object-cover object-center grayscale-[0.8] opacity-20 group-hover:scale-105 transition-transform duration-[20s] ease-out -translate-y-10" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]"></div>
                </div>

                {/* Mobile Image (Always visible but subtle) */}
                <div className="absolute inset-0 overflow-hidden sm:hidden opacity-20 pointer-events-none">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-black/80"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-10 sm:py-16 transition-all duration-500 group-hover:pl-10 sm:group-hover:pl-16">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-16 w-full">
                    <span className="text-gray-600 font-mono text-sm tracking-[0.2em]">0{index + 1}</span>
                    
                    <div className="flex-1">
                      <h3 className={cn(
                        "text-3xl sm:text-5xl md:text-6xl font-serif font-light transition-colors duration-500 mb-2 sm:mb-0",
                        isSelected ? "text-white" : "text-gray-400 group-hover:text-white"
                      )}>
                        {service.title}
                      </h3>
                      {/* Mobile Description */}
                      <p className="text-gray-500 text-sm sm:hidden mt-2 font-sans">{service.description}</p>
                    </div>

                    {/* Desktop Description */}
                    <div className="hidden sm:block flex-1 max-w-sm">
                      <p className="text-gray-500 text-sm md:text-base font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Checkbox / Select Indicator */}
                  <div className={cn(
                    "w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 flex-shrink-0 ml-4 sm:ml-0 relative overflow-hidden",
                    isSelected ? "bg-white border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "group-hover:border-white/60"
                  )}>
                    {/* Liquid fill animation background */}
                    <div className={cn(
                      "absolute inset-0 bg-white transition-transform duration-500 origin-bottom",
                      isSelected ? "scale-y-100" : "scale-y-0"
                    )}></div>
                    <Check 
                      size={20} 
                      className={cn(
                        "relative z-10 transition-colors duration-500",
                        isSelected ? "text-black" : "text-transparent"
                      )} 
                      strokeWidth={2} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Sticky Bar */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-[60] md:w-[600px] pointer-events-auto"
          >
            <div className="glass-panel border-white/20 p-4 md:p-4 rounded-3xl md:rounded-full flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl bg-black/80">
              <div className="px-4 text-sm md:text-base flex items-center justify-center gap-3 w-full sm:w-auto font-mono">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-gray-400 uppercase tracking-widest text-[10px]">Selected</span>
                <span className="text-white font-bold">{selectedServices.length}</span>
              </div>
              <a
                href={getWhatsAppLink(getWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl md:rounded-full font-bold hover:bg-gray-200 transition-colors whitespace-nowrap text-center text-xs uppercase tracking-[0.2em] font-mono cursor-pointer"
              >
                Send Request
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

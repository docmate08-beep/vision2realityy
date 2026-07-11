import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Globe, Smartphone, Code2, Wrench, Check, MessageCircle, Rocket } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import { cn } from '../lib/utils';
import TiltCard from './TiltCard';

const services = [
  {
    id: 'ai',
    title: 'AI Automation',
    description: 'AI agents, workflow automation, and LLM integrations.',
    icon: Bot,
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Automation',
    description: 'Smart bots, order automation, and AI conversational agents.',
    icon: MessageCircle,
  },
  {
    id: 'startup',
    title: 'Start Your Startup (CTO)',
    description: 'We handle your entire technical pipeline & growth (SEO/GEO).',
    icon: Rocket,
  },
  {
    id: 'web',
    title: 'Website Development',
    description: 'High-performance, modern web applications.',
    icon: Globe,
  },
  {
    id: 'app',
    title: 'App Development',
    description: 'Native iOS & Android mobile applications.',
    icon: Smartphone,
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description: 'Bespoke software tailored to your business logic.',
    icon: Code2,
  },
  {
    id: 'maintenance',
    title: 'Mgmt & Maintenance',
    description: 'Ongoing support, updates, and scaling.',
    icon: Wrench,
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
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tighter text-white">What do you need <span className="text-gray-400 italic">built?</span></h2>
            <p className="text-gray-400 max-w-2xl text-lg md:text-xl">
              Select the services you need. We handle everything from initial concept to ongoing management, all under one roof.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);
            const Icon = service.icon;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.id}
                onClick={() => toggleService(service.id)}
              >
                <TiltCard className="h-full">
                  <div className={cn(
                    "relative p-8 rounded-3xl cursor-pointer transition-all duration-500 h-full flex flex-col group overflow-hidden premium-card premium-glow",
                    isSelected 
                      ? "bg-white/[0.05] border-white/30" 
                      : ""
                  )}>

                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className={cn(
                        "p-4 rounded-2xl transition-all duration-300",
                        isSelected ? "bg-white text-background shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/5 text-gray-300 group-hover:bg-white/10 group-hover:text-white"
                      )}>
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <div className={cn(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                        isSelected ? "bg-white border-white" : "border-gray-600 group-hover:border-white/50"
                      )}>
                        {isSelected && <Check size={16} className="text-background" strokeWidth={3} />}
                      </div>
                    </div>
                    
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-2xl font-display font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
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
            className="fixed bottom-6 left-4 right-4 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-[60] md:w-[600px]"
          >
            <div className="glass-panel border-white/20 p-4 md:p-5 rounded-3xl md:rounded-full flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl bg-background/90">
              <div className="px-2 text-sm md:text-base flex items-center justify-center gap-3 w-full sm:w-auto">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span className="text-gray-300">Selected: </span>
                <span className="text-white font-bold">{selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}</span>
              </div>
              <a
                href={getWhatsAppLink(getWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-background rounded-2xl md:rounded-full font-bold hover:bg-gray-200 transition-colors whitespace-nowrap text-center"
              >
                Continue on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

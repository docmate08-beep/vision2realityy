import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import TiltCard from './TiltCard';

export default function Hero() {
  const defaultWhatsAppMsg = "Hi V2R Team, I'm interested in starting a project.";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
      
      {/* Floating Glowing Orbs - Changed to subtle white/silver for premium look */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel text-sm font-mono text-gray-300 mb-10 border-t border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <Sparkles size={16} className="text-white animate-pulse" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-medium">IIT-Founded Engineering Agency</span>
        </motion.div>

        {/* Main Headline */}
        <div className="relative">
          {/* Subtle background text for 3D depth */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black font-display whitespace-nowrap pointer-events-none z-[-1]"
          >
            REALITY
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[7rem] font-black font-display leading-[1.05] tracking-tighter mb-8"
          >
            We turn vision into <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600">
                production reality.
              </span>
            </span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 font-medium leading-relaxed"
        >
          The best minds building your product. From complex AI automations to scalable web applications — everything engineered in one place.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <TiltCard className="w-full sm:w-auto h-auto">
            <a 
              href={getWhatsAppLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-10 py-5 bg-white text-background rounded-full font-bold flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-background group-hover:text-background transition-colors duration-300 text-lg">Start Your Project</span>
              <ArrowRight size={20} className="relative z-10 text-background group-hover:text-background transition-colors duration-300 group-hover:translate-x-1" />
            </a>
          </TiltCard>
          
          <TiltCard className="w-full sm:w-auto h-auto">
            <a 
              href="#work"
              className="w-full sm:w-auto px-10 py-5 glass-panel text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-lg border-t border-white/20"
            >
              Explore Our Work
            </a>
          </TiltCard>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-32 h-32 border border-white/5 rounded-full pointer-events-none hidden lg:block"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 w-48 h-48 border border-white/5 rounded-full pointer-events-none hidden lg:block"
      ></motion.div>
    </section>
  );
}

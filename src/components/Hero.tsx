import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import TiltCard from './TiltCard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const defaultWhatsAppMsg = "Hi V2R Team, I'm interested in starting a project.";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to('.hero-bg-img', { scale: 1.05, duration: 2, ease: 'power2.out' }, 0)
      .to('.hero-title', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.5)
      .to('.hero-subtitle', { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 1)
      .to('.hero-buttons', { opacity: 1, duration: 1, ease: 'power2.out' }, 1.2);
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-dark text-white">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2915&auto=format&fit=crop" 
          alt="Luxury Abstract Background" 
          className="w-full h-full object-cover hero-bg-img" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
      </div>
      
      {/* Floating Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel text-sm font-mono text-gray-300 mb-10 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] hero-subtitle opacity-0 translate-y-5">
          <Sparkles size={16} className="text-white" />
          <span className="font-medium tracking-widest uppercase text-xs">IIT-Founded Engineering Agency</span>
        </div>

        {/* Main Headline */}
        <div className="relative mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-semibold font-serif leading-[1.05] tracking-tight hero-title opacity-0 translate-y-10">
            Vision to <br className="hidden md:block" />
            <span className="italic font-light">Reality</span>
          </h1>
        </div>

        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 font-sans leading-relaxed hero-subtitle opacity-0 translate-y-5">
          The best minds building your product. From complex AI automations to scalable web applications — everything engineered in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 hero-buttons opacity-0">
          <TiltCard className="w-full sm:w-auto h-auto">
            <a 
              href={getWhatsAppLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto px-10 py-5 bg-white text-background rounded-full font-bold flex items-center justify-center gap-3 overflow-hidden border border-white"
            >
              <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 text-background uppercase tracking-widest text-sm">Start Your Project</span>
              <ArrowRight size={20} className="relative z-10 text-background group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </TiltCard>
          
          <TiltCard className="w-full sm:w-auto h-auto">
            <a 
              href="#work"
              className="w-full sm:w-auto px-10 py-5 glass-panel text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-sm uppercase tracking-widest border border-white/20"
            >
              Explore Our Work
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

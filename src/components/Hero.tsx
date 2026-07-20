import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import AnimatedText from './AnimatedText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const defaultWhatsAppMsg = "Hi V2R Team, I'm interested in starting a project.";
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Slow infinite zoom for background ONLY on desktop
      gsap.to('.hero-bg-img', { 
        scale: 1.15, 
        duration: 20, 
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

      // Parallax on scroll ONLY on desktop
      gsap.to('.hero-bg-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Intro Animations
    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }) // Quick delay for loader
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.5")
      .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }, "-=0.5");

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-20 bg-[#050505] text-white">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="/rolls-royce-hero.jpg" 
          alt="Custom Black Rolls Royce Background" 
          fetchPriority="high"
          className="w-full h-full object-cover hero-bg-img" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-transparent to-[#050505] z-10"></div>
      </div>
      
      {/* Floating Glowing Orbs for depth - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/3 left-1/4 w-[500px] max-w-[100vw] h-[500px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[400px] max-w-[100vw] h-[400px] bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-20 text-center w-full">
        
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full backdrop-blur-md bg-white/[0.02] text-sm font-mono text-gray-300 mb-8 sm:mb-12 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.03)] w-max max-w-full isolate">
          <Sparkles size={14} className="text-white flex-shrink-0" />
          <span className="font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase text-[9px] sm:text-[10px] truncate">IIT-Founded Engineering Agency</span>
        </div>

        {/* Main Headline with Split Text */}
        {/* Main Headline with Split Text - Wrapped in H1 for SEO/GEO */}
        <h1 className="relative mb-6 sm:mb-10 pointer-events-none w-full">
          <AnimatedText 
            text="Vision to" 
            type="chars" 
            animation="fadeUp" 
            delay={1.5} 
            className="text-[12vw] sm:text-6xl md:text-8xl lg:text-[9rem] font-semibold font-serif leading-[1] tracking-tight justify-center" 
          />
          <AnimatedText 
            text="Reality" 
            type="chars" 
            animation="blurIn" 
            delay={1.8} 
            className="text-[12vw] sm:text-6xl md:text-8xl lg:text-[9rem] font-light font-serif italic leading-[1] tracking-tight justify-center mt-1 sm:mt-2 text-gray-300" 
          />
        </h1>

        <p className="hero-desc text-base sm:text-lg md:text-2xl text-gray-400 max-w-[90%] sm:max-w-3xl mx-auto mb-10 sm:mb-16 font-sans leading-relaxed tracking-wide">
          The best minds building your product. From complex AI automations to scalable web applications — everything engineered in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-8 relative z-30 w-full sm:w-auto px-4 sm:px-0">
            <a 
              href={getWhatsAppLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn group relative px-8 sm:px-12 py-4 sm:py-5 bg-white text-black rounded-full font-bold flex items-center justify-center gap-3 sm:gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-mono">Start Your Project</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 ease-out sm:w-[18px] sm:h-[18px]" />
            </a>
          
            <a 
              href="#work"
              className="hero-btn group px-8 sm:px-12 py-4 sm:py-5 backdrop-blur-md bg-white/[0.03] text-white rounded-full font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-mono border border-white/20 isolate"
            >
              Explore Our Work
            </a>
        </div>
      </div>
    </section>
  );
}

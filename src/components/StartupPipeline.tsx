import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code2, TrendingUp, Target } from 'lucide-react';
import TiltCard from './TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pipelineSteps = [
  {
    title: "Concept & Architecture",
    number: "01",
    desc: "We transform your raw idea into a scalable technical architecture, selecting the right stack for long-term growth.",
    icon: Target
  },
  {
    title: "Full-Stack Development",
    number: "02",
    desc: "Our IIT engineers build robust, high-performance web and mobile apps. We handle the entire codebase.",
    icon: Code2
  },
  {
    title: "Deployment & Scaling",
    number: "03",
    desc: "Cloud infrastructure setup on AWS/GCP. We ensure your startup handles 10 users or 10 million users flawlessly.",
    icon: Rocket
  },
  {
    title: "Growth & Optimization",
    number: "04",
    desc: "Post-launch, we engineer your growth. Search Engine, Generative Engine, and App Engine Optimization to dominate.",
    icon: TrendingUp
  }
];

export default function StartupPipeline() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;

    // Cinematic Text Reveal
    gsap.fromTo('.startup-title-line', 
      { y: 100, opacity: 0, rotateX: -45 },
      { 
        y: 0, opacity: 1, rotateX: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.startup-title-container',
          start: 'top 85%',
        }
      }
    );

    // Staggered Cards Reveal
    gsap.fromTo('.startup-card', 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1,
        stagger: isMobile ? 0.1 : 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.startup-cards-container',
          start: isMobile ? 'top 95%' : 'top 80%',
        }
      }
    );

  }, { scope: container });

  return (
    <section id="startup" ref={container} className="py-24 sm:py-32 relative overflow-hidden bg-[#050505]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 sm:mb-32 startup-title-container perspective-1000">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white text-xs font-mono tracking-[0.2em] uppercase mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
          >
            <Rocket size={14} className="text-gray-400" />
            <span>Startup your startup</span>
          </motion.div>
          
          <div className="overflow-hidden mb-2">
            <h2 className="startup-title-line text-[11vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold font-display tracking-tighter text-white leading-[1.1]">
              We build the product.
            </h2>
          </div>
          <div className="overflow-hidden mb-8">
            <h2 className="startup-title-line text-[11vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light font-serif tracking-tighter text-gray-500 italic leading-[1.1]">
              You build the business.
            </h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
          >
            Don't waste time hunting for freelancers. We act as your elite outsourced CTO and engineering team. From the first line of code to aggressive SEO, GEO, and AEO growth strategies.
          </motion.p>
        </div>

        {/* Cinematic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 startup-cards-container relative">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="startup-card h-full will-change-transform">
                <TiltCard className="h-full">
                  <div className="glass-panel p-8 sm:p-10 rounded-2xl h-full flex flex-col hover:bg-white/[0.04] transition-all duration-500 group border border-white/5 hover:border-white/20 relative overflow-hidden bg-[#0A0A0A]">
                    
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-12">
                        <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-4xl font-serif font-light text-white/10 group-hover:text-white/20 transition-colors duration-500">
                          {step.number}
                        </span>
                      </div>
                      
                      <div className="mt-auto">
                        <h3 className="text-xl sm:text-2xl font-light font-display text-white mb-4 tracking-wide group-hover:translate-x-2 transition-transform duration-500">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed font-sans font-light group-hover:text-gray-400 transition-colors duration-500">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 sm:mt-32 text-center relative z-20"
        >
          <a
            href="https://wa.me/917068180478?text=Hi%20V2R%20Team,%20I%20am%20interested%20in%20the%20'Start%20Your%20Startup'%20program.%20Let's%20discuss!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full font-sans font-medium text-sm sm:text-base tracking-wide hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] group"
          >
            <span>Connect with your CTO</span>
            <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

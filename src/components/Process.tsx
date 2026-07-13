import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', title: 'Discover', description: 'Deep dive into requirements, architecture planning, and feasibility analysis.' },
  { id: '02', title: 'Design', description: 'System design, UI/UX prototyping, and technical specification.' },
  { id: '03', title: 'Develop', description: 'Agile engineering sprints focusing on scalable, clean, and secure code.' },
  { id: '04', title: 'Deploy', description: 'Rigorous testing, CI/CD pipelines, and production rollout.' },
  { id: '05', title: 'Manage', description: 'Ongoing monitoring, maintenance, and feature scaling post-launch.' },
];

export default function Process() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text Fill Effect on Scroll
    gsap.to('.process-title-fill', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '.process-title-container',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      }
    });

    // 2. Timeline Progress Bar & Node Reveal (Desktop)
    if (window.innerWidth >= 1024) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-timeline-container',
          start: 'top 70%',
          end: 'bottom 50%',
          scrub: 1,
        }
      });

      // Animate the line width
      tl.to('.process-line-active', { width: '100%', ease: 'none', duration: 1 }, 0);

      // Animate the nodes appearing as the line reaches them
      const nodes = gsap.utils.toArray('.process-node');
      const stepInterval = 1 / (nodes.length - 1);
      
      nodes.forEach((node: any, i) => {
        // Node lights up
        tl.to(node.querySelector('.node-bg'), { scale: 1, opacity: 1, duration: 0.1, ease: 'power2.out' }, i * stepInterval);
        tl.to(node.querySelector('.node-text'), { color: '#ffffff', duration: 0.1 }, i * stepInterval);
        
        // Content fades up
        tl.fromTo(node.querySelector('.node-content'), 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 
          i * stepInterval
        );
      });
    } else {
      // Mobile staggered reveal
      const nodes = gsap.utils.toArray('.process-node');
      nodes.forEach((node: any) => {
        gsap.to(node.querySelector('.node-bg'), { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 80%' } });
        gsap.to(node.querySelector('.node-text'), { color: '#ffffff', duration: 0.5, scrollTrigger: { trigger: node, start: 'top 80%' } });
        gsap.fromTo(node.querySelector('.node-content'), 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: node, start: 'top 80%' } }
        );
      });
    }

  }, { scope: container });

  return (
    <section id="process" ref={container} className="py-32 sm:py-48 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Title Section with Outline Text Fill */}
        <div className="mb-24 sm:mb-32 process-title-container text-center lg:text-left">
          <div className="relative inline-block w-full">
            {/* Outline Background Text */}
            <h2 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display uppercase tracking-tighter"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
            >
              Full lifecycle ownership.
            </h2>
            {/* Solid Fill Text */}
            <h2 
              className="process-title-fill absolute top-0 left-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display uppercase tracking-tighter text-white"
              style={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            >
              Full lifecycle ownership.
            </h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mt-8 font-light tracking-wide lg:mx-0 mx-auto"
          >
            We don't just hand over code and disappear. Our process is designed for end-to-end delivery and long-term success.
          </motion.p>
        </div>

        {/* Timeline Section */}
        <div className="process-timeline-container relative pt-10 pb-20">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[85px] left-0 w-full h-[1px] bg-white/10 z-0">
            {/* Active Progress Line */}
            <div className="process-line-active absolute top-0 left-0 h-full bg-white w-0 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="process-node relative group"
              >
                <div className="flex flex-row lg:flex-col gap-8 lg:gap-10 items-start lg:items-center text-left lg:text-center">
                  
                  {/* Number Node */}
                  <div className="flex-shrink-0 w-[90px] h-[90px] rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-300">
                    {/* Glow background (animated) */}
                    <div className="node-bg absolute inset-0 bg-white opacity-0 scale-50 rounded-full transition-all duration-300"></div>
                    <span className="node-text font-serif text-3xl font-light text-white/30 relative z-10 transition-colors duration-300">
                      {step.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="node-content pt-2 lg:pt-0 opacity-0 lg:opacity-100">
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-3 tracking-wide">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">{step.description}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

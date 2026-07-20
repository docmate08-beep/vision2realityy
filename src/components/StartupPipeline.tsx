import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pipelineSteps = [
  {
    title: "Concept & Architecture",
    number: "01",
    desc: "We transform your raw idea into a scalable technical architecture, selecting the right stack for long-term growth.",
    image: "/step1.jpg?v=2"
  },
  {
    title: "Full-Stack Development",
    number: "02",
    desc: "Our IIT engineers build robust, high-performance web and mobile apps. We handle the entire codebase.",
    image: "/step2.jpg?v=2"
  },
  {
    title: "Deployment & Scaling",
    number: "03",
    desc: "Cloud infrastructure setup on AWS/GCP. We ensure your startup handles 10 users or 10 million users flawlessly.",
    image: "/step3.jpg?v=2"
  },
  {
    title: "Growth & Optimization",
    number: "04",
    desc: "Post-launch, we engineer your growth. Search Engine, Generative Engine, and App Engine Optimization to dominate.",
    image: "/step4.jpg?v=2"
  }
];

export default function StartupPipeline() {
  const container = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Cinematic Text Reveal (Runs on all devices)
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

    mm.add("(min-width: 1024px)", () => {
      // Horizontal Scroll for Desktop
      if (scrollContainerRef.current) {
        const sections = gsap.utils.toArray('.startup-step-card');
        
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: 0.1,
            start: "center center",
            end: "+=1500",
          }
        });
      }
    });

  }, { scope: container });

  return (
    <section id="startup" ref={container} className="py-24 sm:py-32 relative overflow-hidden bg-[#050505] lg:h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Subtle Background Glow - Hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 lg:h-full lg:flex lg:flex-col">
        
        {/* Header Section */}
        <div className="mb-12 sm:mb-20 startup-title-container perspective-1000 lg:flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white text-xs font-mono tracking-[0.2em] uppercase mb-8 backdrop-blur-md cursor-default isolate"
          >
            <Rocket size={14} className="text-gray-400" />
            <span>Startup your startup</span>
          </motion.div>
          
          <div className="overflow-hidden mb-2">
            <h2 className="startup-title-line text-[11vw] sm:text-6xl md:text-7xl font-bold font-display tracking-tighter text-white leading-[1.1]">
              We build the product.
            </h2>
          </div>
          <div className="overflow-hidden mb-6">
            <h2 className="startup-title-line text-[11vw] sm:text-6xl md:text-7xl font-light font-serif tracking-tighter text-gray-500 italic leading-[1.1]">
              You build the business.
            </h2>
          </div>
        </div>

        {/* Cinematic Horizontal/Vertical Cards */}
        <div className="relative w-full lg:flex-1 lg:overflow-hidden rounded-3xl lg:rounded-none">
          <div 
            ref={scrollContainerRef} 
            className="flex flex-col lg:flex-row gap-8 lg:gap-0 lg:h-[60vh] w-full lg:w-[400vw]"
          >
            {pipelineSteps.map((step) => (
              <div 
                key={step.title} 
                className="startup-step-card relative w-full lg:w-[100vw] lg:h-full flex-shrink-0 lg:px-4"
              >
                <div className="relative w-full h-[60vh] lg:h-full rounded-3xl overflow-hidden group shadow-2xl">
                  {/* Background Image */}
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transform scale-100 lg:group-hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale-[0.3]"
                  />
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start w-full max-w-7xl mx-auto">
                      <span className="text-6xl sm:text-7xl lg:text-8xl font-serif font-light text-white/40 tracking-tighter">
                        {step.number}
                      </span>
                    </div>
                    
                    <div className="w-full max-w-7xl mx-auto mb-4">
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display text-white mb-4 sm:mb-6 tracking-wide drop-shadow-xl">{step.title}</h3>
                      <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-sans font-light max-w-2xl drop-shadow-md">
                        {step.desc}
                      </p>
                    </div>
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

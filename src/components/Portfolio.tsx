import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Support Agent',
    category: 'AI Automation',
    tech: ['Python', 'LangChain', 'OpenAI'],
    description: 'Fully autonomous customer support agent integrating with Zendesk. Handles 80% of L1 tickets instantly.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Fintech Dashboard',
    category: 'Web App',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    description: 'Real-time financial analytics dashboard with complex data viz, handling millions of rows securely.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Health Platform',
    category: 'Custom Software',
    tech: ['Node.js', 'MongoDB', 'React Native'],
    description: 'HIPAA-compliant patient management system connecting doctors and patients seamlessly.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Web3 Marketplace',
    category: 'Blockchain',
    tech: ['Solidity', 'Next.js', 'Ethers.js'],
    description: 'Decentralized digital asset exchange with real-time bidding and low-latency smart contract execution.',
    image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Headless Commerce',
    category: 'E-Commerce',
    tech: ['Shopify Plus', 'React', 'Tailwind'],
    description: 'Ultra-fast headless architecture driving a 40% increase in mobile conversions for a luxury retail brand.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop'
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    let mm = gsap.matchMedia();

    // Mobile Animations
    mm.add("(max-width: 767px)", () => {
      // Mobile image parallax
      gsap.utils.toArray('.mobile-parallax-img').forEach((img: any) => {
        gsap.to(img, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentNode,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    });

    // Desktop Animations
    mm.add("(min-width: 768px)", () => {
      if (!scrollContainerRef.current) return;
      const pinWrap = scrollContainerRef.current;
      const pinWrapWidth = pinWrap.scrollWidth;
      const scrollDistance = pinWrapWidth - window.innerWidth;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 0.1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(pinWrap, {
        x: -scrollDistance,
        ease: 'none',
      });

      gsap.utils.toArray('.portfolio-parallax-img').forEach((img: any) => {
        gsap.to(img, {
          xPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            scrub: 0.1,
            invalidateOnRefresh: true,
          }
        });
      });
    });

  }, { scope: sectionRef });



  return (
    <section ref={sectionRef} id="work" className="relative bg-[#050505] overflow-hidden">
      
      {/* Title Section (Sticky in desktop, static in mobile) */}
      <div className="relative md:absolute top-0 left-0 w-full z-10 pt-20 sm:pt-32 px-4 sm:px-6 pointer-events-none">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <AnimatedText 
              text="Selected" 
              type="chars" 
              animation="fadeUp" 
              className="text-[12vw] sm:text-5xl md:text-7xl font-serif tracking-tight text-white leading-none pointer-events-auto will-change-transform"
            />
            <AnimatedText 
              text="Work." 
              type="chars" 
              animation="blurIn" 
              delay={0.2}
              className="text-[12vw] sm:text-5xl md:text-7xl font-serif font-light italic text-gray-500 tracking-tight leading-none pointer-events-auto will-change-transform"
            />
          </div>
          <div className="pointer-events-auto mt-4 sm:mt-0 w-full sm:w-auto">
            <a href="#services" className="group flex sm:inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-4 rounded-full border border-white/20 hover:border-white transition-colors uppercase tracking-[0.2em] text-[10px] sm:text-xs text-white font-mono bg-white/[0.02] backdrop-blur-sm w-full sm:w-auto">
              Start your project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Vertical) */}
      <div className="md:hidden container mx-auto px-4 py-10 mt-6">
          <div className="flex flex-col gap-12">
            {projects.map((project) => (
              <div key={project.title} className="flex flex-col gap-6 mobile-fade-up">
                <div className="w-full h-[60vh] rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                  <img src={project.image} alt={project.title} loading="lazy" className="mobile-parallax-img absolute inset-0 w-full h-[120%] object-cover -top-[10%] will-change-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div>
                  <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full text-[9px] font-mono text-gray-400 uppercase tracking-widest border border-white/10 mb-4">
                    {project.category}
                  </div>
                  <h3 className="font-serif text-3xl mb-3 text-white font-light">{project.title}</h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-transparent rounded text-[9px] uppercase tracking-widest text-gray-500 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Desktop Layout (Horizontal Scroll Pinning) */}
      <div className="hidden md:flex h-screen items-center pt-32">
          <div ref={scrollContainerRef} className="pin-wrap px-[10vw]">
            <div className="flex gap-[15vw] items-center h-full">
              {projects.map((project) => (
                <div key={project.title} className="flex gap-16 items-center w-[80vw] max-w-[1200px]">
                  
                  {/* Image Card */}
                  <div className="w-[50vw] max-w-[700px] h-[60vh] relative overflow-hidden rounded-2xl group cursor-none">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="portfolio-parallax-img absolute inset-0 w-[120%] h-full object-cover -left-[10%] grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                  </div>
                  
                  {/* Details */}
                  <div className="w-[30vw] max-w-[400px]">
                    <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] border border-white/10 mb-8">
                      {project.category}
                    </div>
                    
                    <h3 className="font-serif text-5xl lg:text-6xl mb-6 text-white font-light leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-400 font-sans leading-relaxed text-lg mb-10 font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-4 py-2 bg-transparent rounded-sm text-[10px] uppercase tracking-[0.2em] text-gray-500 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
              
              {/* Extra spacing at the end to allow scrolling past the last item comfortably */}
              <div className="w-[20vw] flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

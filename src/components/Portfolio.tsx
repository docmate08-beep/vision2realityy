import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Support Agent',
    category: 'AI Automation',
    tech: ['Python', 'LangChain', 'OpenAI'],
    description: 'Fully autonomous customer support agent integrating with Zendesk. Handles 80% of L1 tickets instantly.',
    image: '/ai_agent.jpg'
  },
  {
    title: 'Fintech Dashboard',
    category: 'Web App',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    description: 'Real-time financial analytics dashboard with complex data viz, handling millions of rows securely.',
    image: '/fintech.jpg'
  },
  {
    title: 'Health Platform',
    category: 'Custom Software',
    tech: ['Node.js', 'MongoDB', 'React Native'],
    description: 'HIPAA-compliant patient management system connecting doctors and patients seamlessly.',
    image: '/health.jpg'
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    if (isMobile) {
      // Standard vertical fade up for mobile
      const elements = gsap.utils.toArray('.mobile-fade-up');
      elements.forEach((elem: any) => {
        gsap.fromTo(elem, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: elem, start: 'top 85%' } }
        );
      });
      return;
    }

    // Horizontal Scroll Pinning for Desktop
    const pinWrap = scrollContainerRef.current;
    const pinWrapWidth = pinWrap.scrollWidth;
    
    // Calculate how much we need to scroll horizontally
    const scrollDistance = pinWrapWidth - window.innerWidth;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tl.to(pinWrap, {
      x: -scrollDistance,
      ease: 'none',
    });

    // Parallax on images while scrolling horizontally
    gsap.utils.toArray('.portfolio-parallax-img').forEach((img: any) => {
      gsap.to(img, {
        xPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="work" className="relative bg-[#050505] overflow-hidden">
      
      {/* Title Section (Sticky in desktop, static in mobile) */}
      <div className={`absolute top-0 left-0 w-full z-10 pt-32 px-6 pointer-events-none ${isMobile ? 'relative' : ''}`}>
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <AnimatedText 
              text="Selected" 
              type="chars" 
              animation="fadeUp" 
              className="text-5xl md:text-7xl font-serif tracking-tight text-white leading-none pointer-events-auto"
            />
            <AnimatedText 
              text="Work." 
              type="chars" 
              animation="blurIn" 
              delay={0.2}
              className="text-5xl md:text-7xl font-serif font-light italic text-gray-500 tracking-tight leading-none pointer-events-auto"
            />
          </div>
          <div className="pointer-events-auto">
            <a href="#services" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-white transition-colors uppercase tracking-[0.2em] text-xs text-white font-mono bg-white/[0.02] backdrop-blur-sm">
              Start your project <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {isMobile ? (
        // Mobile Layout (Vertical)
        <div className="container mx-auto px-6 py-20 mt-10">
          <div className="flex flex-col gap-24">
            {projects.map((project) => (
              <div key={project.title} className="flex flex-col gap-8 mobile-fade-up">
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div>
                  <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-mono text-gray-400 uppercase tracking-widest border border-white/10 mb-6">
                    {project.category}
                  </div>
                  <h3 className="font-serif text-3xl mb-4 text-white font-light">{project.title}</h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-transparent rounded text-[10px] uppercase tracking-widest text-gray-500 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop Layout (Horizontal Scroll Pinning)
        <div className="h-screen flex items-center pt-32">
          <div ref={scrollContainerRef} className="pin-wrap px-[10vw]">
            <div className="flex gap-[15vw] items-center h-full">
              {projects.map((project) => (
                <div key={project.title} className="flex gap-16 items-center w-[80vw] max-w-[1200px]">
                  
                  {/* Image Card */}
                  <div className="w-[50vw] max-w-[700px] h-[60vh] relative overflow-hidden rounded-2xl group cursor-none">
                    <img 
                      src={project.image} 
                      alt={project.title} 
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
      )}
    </section>
  );
}

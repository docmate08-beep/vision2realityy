import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI Support Agent',
    category: 'AI Automation',
    tech: ['Python', 'LangChain', 'OpenAI'],
    description: 'Fully autonomous customer support agent integrating with Zendesk.',
    image: '/ai_agent.jpg'
  },
  {
    title: 'Fintech Dashboard',
    category: 'Web App',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    description: 'Real-time financial analytics dashboard with complex data viz.',
    image: '/fintech.jpg'
  },
  {
    title: 'Health Platform',
    category: 'Custom Software',
    tech: ['Node.js', 'MongoDB', 'React Native'],
    description: 'HIPAA-compliant patient management system.',
    image: '/health.jpg'
  },
];

export default function Portfolio() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax Image Effects
    gsap.utils.toArray('.portfolio-parallax-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom", 
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Fade Up Elements
    gsap.utils.toArray('.portfolio-fade-up').forEach((elem: any) => {
      gsap.from(elem, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
        },
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="work" className="py-32 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-transparent pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 portfolio-fade-up">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight text-white">Selected <span className="italic font-light text-gray-500">Work.</span></h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl font-sans">
              A glimpse into the systems we've engineered. Built for scale, optimized for performance.
            </p>
          </div>
          <div>
            <a href="#services" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm text-white">
              Start your project <ArrowUpRight size={20} className="transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div key={project.title} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center portfolio-fade-up`}>
              
              <div className="w-full md:w-3/5 parallax-wrapper h-[60vh] rounded-sm">
                <img src={project.image} alt={project.title} className="parallax-img portfolio-parallax-img grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              
              <div className={`w-full md:w-2/5 ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                <div className={`inline-block px-4 py-1.5 bg-white/5 rounded-full text-xs font-mono text-gray-400 border border-white/10 mb-6`}>
                  {project.category}
                </div>
                
                <h3 className="font-serif text-3xl md:text-5xl mb-6 text-white">{project.title}</h3>
                
                <p className="text-gray-400 font-sans leading-relaxed text-lg mb-8">
                  {project.description}
                </p>
                
                <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-transparent rounded-sm text-xs uppercase tracking-widest text-gray-500 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

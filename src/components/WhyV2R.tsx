import { useRef } from 'react';
import { Code, Server, CheckCircle, Users } from 'lucide-react';
import TiltCard from './TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const stats = [
  { label: 'Combined Experience', value: '2+', suffix: ' Yrs', icon: Users },
  { label: 'Projects Delivered', value: '20+', suffix: '', icon: CheckCircle },
  { label: 'Technologies Mastered', value: '15+', suffix: '', icon: Code },
  { label: 'Systems Managed', value: '50+', suffix: '', icon: Server },
];

export default function WhyV2R() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    
    // 1. Scroll-Driven Text Reveal (Liquid Fill style)
    gsap.to('.v2r-reveal-text-1', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#v2r-text-reveal-section',
        start: 'top 80%',
        end: isMobile ? 'center center' : 'center 40%',
        scrub: 1, 
      }
    });

    gsap.to('.v2r-reveal-text-2', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none',
      scrollTrigger: {
        trigger: '#v2r-text-reveal-section',
        start: isMobile ? 'top 70%' : 'top 70%',
        end: isMobile ? 'bottom center' : 'bottom 40%',
        scrub: 1, 
      }
    }); 

    // 2. Fade Up Elements
    gsap.utils.toArray('.v2r-fade-up').forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 95%',
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="about" className="py-32 relative overflow-hidden bg-[#050505]">
      
      {/* Title Section with GSAP Text Fill */}
      <div id="v2r-text-reveal-section" className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10 mb-20 sm:mb-32 pt-10 sm:pt-20">
        <div className="text-left md:text-center mb-16 sm:mb-24">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-gray-500 mb-8 sm:mb-12 font-mono v2r-fade-up">About V2R</p>
          <div className="font-serif text-[11vw] sm:text-5xl md:text-7xl lg:text-[8rem] font-medium leading-[1.1] tracking-tight relative text-fill-container text-reveal-wrap">
            <div className="text-outline">ENGINEERED BY</div>
            <div className="text-fill v2r-reveal-text-1 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">ENGINEERED BY</div>
          </div>
          <div className="font-serif text-[11vw] sm:text-5xl md:text-7xl lg:text-[8rem] font-light leading-[1.1] tracking-tight relative text-fill-container text-reveal-wrap mt-1 sm:mt-2">
            <div className="text-outline italic text-gray-700">THE BEST MINDS</div>
            <div className="text-fill v2r-reveal-text-2 italic bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-white to-gray-400">THE BEST MINDS</div>
          </div>
        </div>
        
        <div className="max-w-[95%] sm:max-w-3xl mx-auto md:text-center text-gray-400 text-lg sm:text-xl md:text-2xl font-sans leading-relaxed v2r-fade-up font-light tracking-wide will-change-transform">
          We don't just write code; we architect systems that scale. When you work with V2R, you're partnering with top-tier technical talent dedicated to turning your vision into a robust reality.
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="v2r-fade-up">
                  <TiltCard>
                    <div className="glass-panel rounded-2xl p-8 relative overflow-hidden h-full group hover:bg-white/[0.04] transition-colors border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      <div className="relative z-10">
                        <Icon size={24} className="text-gray-400 mb-8 group-hover:text-white transition-colors duration-500" />
                        <div className="text-4xl md:text-6xl font-serif font-light text-white mb-3 tracking-tight">
                          {stat.value}<span className="text-2xl font-sans text-gray-500">{stat.suffix}</span>
                        </div>
                        <div className="text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>

          {/* Right: Founders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
            
            {/* Founder 1 */}
            <div className="relative group v2r-fade-up">
              <TiltCard>
                <div className="glass-panel rounded-2xl p-3 pb-8 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-colors duration-700 bg-[#0A0A0A]">
                  <div className="w-full aspect-[4/5] rounded-xl bg-[#050505] mb-6 overflow-hidden relative grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000">
                    <img src="/rajan.jpg" alt="Rajan Kumar Karn" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-20"></div>
                  </div>
                  <div className="relative z-40 transform translate-z-10 px-4">
                    <h3 className="text-2xl font-serif mb-2 text-white font-light">Rajan Kumar Karn</h3>
                    <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-5 font-mono">Founder & CEO</p>
                    <div className="flex flex-col items-center gap-4">
                      <div className="inline-block px-5 py-2 bg-white/[0.03] rounded-full text-[10px] text-gray-300 font-mono tracking-widest border border-white/10 uppercase">IIT Alumnus</div>
                      <a href="https://www.linkedin.com/in/rajan-kumar-karn-853baa23b/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase">
                        <LinkedinIcon size={14} /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Founder 2 */}
            <div className="relative group sm:translate-y-24 v2r-fade-up">
              <TiltCard>
                <div className="glass-panel rounded-2xl p-3 pb-8 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-colors duration-700 bg-[#0A0A0A]">
                  <div className="w-full aspect-[4/5] rounded-xl bg-[#050505] mb-6 overflow-hidden relative grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000">
                    <img src="/adarsh.jpg" alt="Adarsh Kumar" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-20"></div>
                  </div>
                  <div className="relative z-40 transform translate-z-10 px-4">
                    <h3 className="text-2xl font-serif mb-2 text-white font-light">Adarsh Kumar</h3>
                    <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mb-5 font-mono">Co-Founder & COO</p>
                    <div className="mt-8">
                      <a href="https://www.linkedin.com/in/adarsh-kumar-5b0431230/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase mt-1">
                        <LinkedinIcon size={14} /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

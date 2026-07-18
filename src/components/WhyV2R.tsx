import { useRef } from 'react';
import { Code, Server, CheckCircle, Users } from 'lucide-react';
import TiltCard from './TiltCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Combined Experience', value: '25+', suffix: ' Yrs', icon: Users },
  { label: 'Projects Delivered', value: '20+', suffix: '', icon: CheckCircle },
  { label: 'Technologies Mastered', value: '15+', suffix: '', icon: Code },
  { label: 'Systems Managed', value: '50+', suffix: '', icon: Server },
];

export default function WhyV2R() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Mobile Animations
    mm.add("(max-width: 767px)", () => {
      gsap.to('.v2r-reveal-text-1', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#v2r-text-reveal-section',
          start: 'top 80%',
          end: 'center center',
          scrub: 0.1, 
        }
      });

      gsap.to('.v2r-reveal-text-2', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#v2r-text-reveal-section',
          start: 'top 70%',
          end: 'bottom center',
          scrub: 0.1, 
        }
      }); 
    });

    // Desktop Animations
    mm.add("(min-width: 768px)", () => {
      gsap.to('.v2r-reveal-text-1', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#v2r-text-reveal-section',
          start: 'top 80%',
          end: 'center 40%',
          scrub: 0.1, 
        }
      });

      gsap.to('.v2r-reveal-text-2', {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#v2r-text-reveal-section',
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.1, 
        }
      }); 

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
        {/* Stats Grid Centered */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="v2r-fade-up">
                  <TiltCard>
                    <div className="glass-panel rounded-2xl p-8 relative overflow-hidden h-full group hover:bg-white/[0.04] transition-colors border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      <div className="relative z-10 text-center">
                        <Icon size={24} className="text-gray-400 mx-auto mb-6 group-hover:text-white transition-colors duration-500" />
                        <div className="text-3xl md:text-5xl font-serif font-light text-white mb-2 tracking-tight">
                          {stat.value}<span className="text-xl font-sans text-gray-500">{stat.suffix}</span>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">{stat.label}</div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

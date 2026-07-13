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
    // 1. Scroll-Driven Text Reveal (Fill up animation)
    const textRevealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#v2r-text-reveal-section',
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1, 
      }
    });

    textRevealTimeline.to('.v2r-reveal-text-1', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none'
    }, 0)
    .to('.v2r-reveal-text-2', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none'
    }, 0.2); 

    // 2. Fade Up Elements
    gsap.utils.toArray('.v2r-fade-up').forEach((elem: any, i) => {
      gsap.from(elem, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 90%',
        },
        delay: i * 0.1
      });
    });
  }, { scope: container });

  return (
    <section ref={container} id="about" className="py-32 relative overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      {/* Title Section with GSAP Text Fill */}
      <div id="v2r-text-reveal-section" className="container mx-auto px-6 max-w-6xl relative z-10 mb-24">
        <div className="text-left md:text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-8 font-sans">About V2R</p>
          <div className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight relative text-fill-container text-reveal-wrap">
            <div className="text-outline">ENGINEERED BY</div>
            <div className="text-fill v2r-reveal-text-1">ENGINEERED BY</div>
          </div>
          <div className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight relative text-fill-container text-reveal-wrap mt-2">
            <div className="text-outline italic font-light">THE BEST MINDS</div>
            <div className="text-fill v2r-reveal-text-2 italic font-light">THE BEST MINDS</div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto md:text-center text-gray-400 text-lg md:text-xl font-sans leading-relaxed v2r-fade-up">
          We don't just write code; we architect systems that scale. When you work with V2R, you're partnering with top-tier technical talent dedicated to turning your vision into a robust reality.
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="v2r-fade-up">
                  <TiltCard>
                    <div className="glass-panel rounded-sm p-8 relative overflow-hidden h-full group hover:bg-white/[0.02] transition-colors border-white/10">
                      <div className="relative z-10">
                        <Icon size={28} className="text-white mb-6" />
                        <div className="text-4xl md:text-5xl font-serif font-semibold text-white mb-2 tracking-tight">
                          {stat.value}<span className="text-2xl font-sans">{stat.suffix}</span>
                        </div>
                        <div className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest">{stat.label}</div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>

          {/* Right: Founders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            
            {/* Founder 1 */}
            <div className="relative group v2r-fade-up">
              <TiltCard>
                <div className="glass-panel rounded-sm p-3 pb-8 flex flex-col items-center text-center border border-white/10 hover:border-white/30 transition-colors duration-500">
                  <div className="w-full aspect-[4/5] rounded-sm bg-white/5 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="/rajan.jpg" alt="Rajan Kumar Karn" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative z-40 transform translate-z-10">
                    <h3 className="text-2xl font-serif mb-1 text-white">Rajan Kumar Karn</h3>
                    <p className="text-xs text-gray-500 tracking-widest uppercase mb-4 font-sans">Founder & CEO</p>
                    <div className="flex flex-col items-center gap-3">
                      <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full text-xs text-white font-medium border border-white/10">IIT Alumnus</div>
                      <a href="https://www.linkedin.com/in/rajan-kumar-karn-853baa23b/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-sans">
                        <LinkedinIcon size={16} /> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Founder 2 */}
            <div className="relative group sm:translate-y-16 v2r-fade-up">
              <TiltCard>
                <div className="glass-panel rounded-sm p-3 pb-8 flex flex-col items-center text-center border border-white/10 hover:border-white/30 transition-colors duration-500">
                  <div className="w-full aspect-[4/5] rounded-sm bg-white/5 mb-6 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src="/adarsh.jpg" alt="Adarsh Kumar" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="relative z-40 transform translate-z-10">
                    <h3 className="text-2xl font-serif mb-1 text-white">Adarsh Kumar</h3>
                    <p className="text-gray-500 tracking-widest uppercase text-xs mb-4 font-sans">Co-Founder & COO</p>
                    <a href="https://www.linkedin.com/in/adarsh-kumar-5b0431230/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-sans mt-1">
                      <LinkedinIcon size={16} /> LinkedIn
                    </a>
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

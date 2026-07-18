import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          opacity: 0,
          y: 50,
          filter: 'blur(8px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-text2 block mb-6 sm:mb-8">
          Philosophy
        </span>

        <h2
          ref={headlineRef}
          className="text-editorial mx-auto max-w-[850px]"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)', lineHeight: 1.15 }}
        >
          Great companies should outlast their founders.
          <span className="text-white/40 block mt-1 sm:mt-2">
            Not simply their era.
          </span>
        </h2>

        <p
          ref={subRef}
          className="text-mate-text2 mt-6 sm:mt-8 md:mt-10 max-w-[480px] mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(0.875rem, 1vw, 1.0625rem)' }}
        >
          We measure success in decades, not quarters. Every venture we create 
          is built to endure, evolve and define its category.
        </p>
      </div>
    </section>
  );
}

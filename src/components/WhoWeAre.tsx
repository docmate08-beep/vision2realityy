import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(line1Ref.current, {
        opacity: 0,
        y: 60,
        filter: 'blur(6px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line1Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(line2Ref.current, {
        opacity: 0,
        y: 60,
        filter: 'blur(6px)',
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: line2Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(bodyRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bodyRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 overflow-hidden"
    >
      <div className="section-container max-w-[1000px]">
        <h2
          ref={line1Ref}
          className="text-editorial font-light text-white/90"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)', lineHeight: 1.15 }}
        >
          We don't build products.
        </h2>

        <h2
          ref={line2Ref}
          className="text-editorial font-light text-white mt-1 sm:mt-2"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)', lineHeight: 1.15 }}
        >
          We build enduring companies.
        </h2>

        <p
          ref={bodyRef}
          className="text-mate-text2 mt-6 sm:mt-8 md:mt-10 max-w-[520px] leading-relaxed"
          style={{ fontSize: 'clamp(0.875rem, 1vw, 1.0625rem)' }}
        >
          TheMate is not a service provider. We identify transformative opportunities across 
          industries, establish ventures, and scale them into businesses with lasting impact. 
          Every company we create is designed for permanence.
        </p>
      </div>
    </section>
  );
}

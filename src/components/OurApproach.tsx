import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Vision',
    desc: 'Identify transformative opportunities across market and industry landscapes.',
  },
  {
    title: 'Strategy',
    desc: 'Define the architecture, positioning and long-term trajectory of each venture.',
  },
  {
    title: 'Design',
    desc: 'Craft experiences that set a new standard for quality and sophistication.',
  },
  {
    title: 'Build',
    desc: 'Execute with precision, assembling the right teams, tools and infrastructure.',
  },
  {
    title: 'Launch',
    desc: 'Introduce the venture to market with confidence, clarity and intent.',
  },
  {
    title: 'Scale',
    desc: 'Grow sustainably through iteration, intelligence and disciplined expansion.',
  },
];

export default function OurApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: 1,
          },
        });
      }

      stepRefs.current.forEach((step, i) => {
        if (!step) return;
        gsap.from(step, {
          opacity: 0,
          x: i % 2 === 0 ? -30 : 30,
          filter: 'blur(4px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-text2 block mb-4 sm:mb-5">
            Our Approach
          </span>
          <h2 className="text-editorial text-white"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)' }}
          >
            From vision to enduring value.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[700px] mx-auto">
          {/* Connecting line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] sm:left-[23px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] timeline-line"
          />

          {/* Steps */}
          <div className="flex flex-col gap-10 sm:gap-12 md:gap-16">
            {steps.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => { stepRefs.current[i] = el; }}
                className={`relative flex items-start gap-4 sm:gap-6 md:gap-0 ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="timeline-dot mt-1" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 md:w-[calc(50%-40px)] ${
                    i % 2 === 0
                      ? 'md:pr-12 lg:pr-16 md:text-right'
                      : 'md:pl-12 lg:pl-16 md:text-left'
                  }`}
                >
                  <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-accent block mb-1.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-editorial text-white"
                    style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-mate-text2 mt-1.5 leading-relaxed"
                    style={{ fontSize: 'clamp(0.8125rem, 0.9vw, 0.9375rem)' }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Spacer for opposite side (desktop) */}
                <div className="hidden md:block md:w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function OurCompanies() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const navigate = useNavigate();

  const handleV2RClick = () => {
    navigate('/v2r');
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-12 md:py-20"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-text2 block mb-4 sm:mb-5">
            Our Services
          </span>
          <h2 className="text-editorial text-white max-w-[600px]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)' }}
          >
            Ventures designed for permanence.
          </h2>
        </motion.div>

        {/* Company Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mt-8 sm:mt-10 md:mt-14 max-w-4xl mx-auto"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="relative group card-premium p-6 sm:p-8 md:p-10 overflow-hidden cursor-pointer"
            onClick={handleV2RClick}
          >
            {/* Mouse-following glow */}
            <div
              className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
              style={{
                width: 300,
                height: 300,
                left: mousePos.x - 150,
                top: mousePos.y - 150,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-accent">
                Digital Agency
              </span>

              <h3 className="text-editorial text-white mt-3 sm:mt-4"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}
              >
                Vision2Reality
              </h3>

              <p className="text-mate-text2 mt-3 sm:mt-4 max-w-[600px] leading-relaxed"
                style={{ fontSize: 'clamp(0.8125rem, 0.95vw, 0.9375rem)' }}
              >
                Vision2Reality transforms ambitious ideas into scalable digital products through 
                AI engineering, software development, mobile applications and enterprise technology.
              </p>

              <div className="mt-5 sm:mt-6 flex items-center gap-2 font-sans font-medium text-white group-hover:text-mate-accent transition-colors duration-300"
                style={{ fontSize: '0.875rem' }}
              >
                <span>Explore Vision2Reality</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-mate-accent/10 to-transparent rounded-bl-[40px]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

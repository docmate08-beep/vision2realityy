import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      {/* Background radial */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[500px] h-[300px] sm:w-[600px] sm:h-[400px] md:w-[800px] md:h-[500px] opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse, #8B5CF6 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <h2
            className="text-editorial mx-auto max-w-[700px]"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', lineHeight: 1.15 }}
          >
            Ready to build something exceptional?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mt-6 sm:mt-8 md:mt-10"
        >
          <a
            href="tel:8796879297"
            className="cta-primary text-[0.875rem] sm:text-[0.9375rem]"
          >
            Start a Conversation
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[0.75rem] sm:text-[0.8125rem] text-mate-text2/50 mt-4 sm:mt-5"
        >
          hello@themate.in
        </motion.p>
      </div>
    </section>
  );
}

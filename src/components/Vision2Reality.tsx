import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const services = [
  {
    title: 'AI & Machine Learning',
    desc: 'Custom AI solutions, intelligent automation, natural language processing and computer vision systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <path d="M12 2a4 4 0 014 4v1a1 1 0 001 1h1a4 4 0 010 8h-1a1 1 0 00-1 1v1a4 4 0 01-8 0v-1a1 1 0 00-1-1H6a4 4 0 010-8h1a1 1 0 001-1V6a4 4 0 014-4z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Software',
    desc: 'Scalable platforms, ERP integrations, cloud infrastructure and mission-critical business systems.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8h2M7 11h4" />
      </svg>
    ),
  },
  {
    title: 'Web Applications',
    desc: 'High-performance web platforms built with modern frameworks, optimized for speed and scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: 'Mobile Products',
    desc: 'Native and cross-platform mobile applications with premium user experiences.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Product Design',
    desc: 'User-centric design systems, interfaces and experiences that set new standards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Robust cloud architecture, CI/CD pipelines and infrastructure automation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    ),
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '25+', label: 'Years Combined Experience' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support & Maintenance' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(3px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.06, ease: EASE },
  }),
};

export default function Vision2Reality() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="vision2reality"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-mate-bg2" />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <div className="section-container relative z-10 px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8">
            <div>
              <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-accent block mb-3 sm:mb-4">
                A TheMate Company
              </span>
              <h2 className="text-editorial text-white"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.1 }}
              >
                Vision2Reality
              </h2>
              <p className="text-mate-text2 mt-3 sm:mt-4 max-w-[520px] leading-relaxed"
                style={{ fontSize: 'clamp(0.875rem, 1vw, 1.0625rem)' }}
              >
                A premium engineering studio that transforms ambitious ideas into scalable 
                digital products. From concept to deployment, we build what matters.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-white font-sans font-semibold"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em' }}
              >
                {stat.value}
              </div>
              <div className="text-mate-text2/70 mt-1 font-sans"
                style={{ fontSize: 'clamp(0.6875rem, 0.8vw, 0.8125rem)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Services */}
        <div className="mt-12 sm:mt-14 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mb-6 sm:mb-8"
          >
            <h3 className="text-editorial text-white"
              style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
            >
              What we build
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="card-premium p-5 sm:p-6 group"
              >
                <div className="text-mate-text2 group-hover:text-mate-accent transition-colors duration-300 mb-3">
                  {service.icon}
                </div>
                <h4 className="font-sans font-medium text-white"
                  style={{ fontSize: 'clamp(0.8125rem, 0.95vw, 0.9375rem)' }}
                >
                  {service.title}
                </h4>
                <p className="text-mate-text2 mt-1.5 leading-relaxed"
                  style={{ fontSize: 'clamp(0.75rem, 0.85vw, 0.8125rem)' }}
                >
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-10 sm:mt-12 md:mt-14 flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
        >
          <a
            href="mailto:hello@themate.in?subject=Vision2Reality%20Inquiry"
            className="cta-primary text-[0.8125rem] sm:text-[0.875rem] w-full sm:w-auto text-center"
          >
            Work With Vision2Reality
          </a>
          <a
            href="mailto:hello@themate.in?subject=Vision2Reality%20Portfolio"
            className="cta-secondary text-[0.8125rem] sm:text-[0.875rem] w-full sm:w-auto text-center"
          >
            View Our Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}

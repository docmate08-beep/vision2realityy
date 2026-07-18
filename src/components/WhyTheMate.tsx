import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    title: 'Innovation & Technology',
    desc: 'Leveraging the latest advancements to give every venture a competitive edge.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Operational Excellence',
    desc: 'Systems and processes built for reliability, performance and global scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Strategic Vision',
    desc: 'Precision positioning that aligns capability with market opportunity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We build companies alongside founders, not deliverables for clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Global Quality Standards',
    desc: 'Every venture meets the highest benchmarks of craft and excellence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
  {
    title: '25+ Years Collective Experience',
    desc: 'Decades of expertise across engineering, design and business strategy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 sm:w-6 sm:h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: EASE,
    },
  }),
};

export default function WhyTheMate() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 sm:mb-10 md:mb-14"
        >
          <span className="text-caption font-sans font-medium tracking-[0.15em] uppercase text-mate-text2 block mb-4 sm:mb-5">
            Why TheMate
          </span>
          <h2 className="text-editorial text-white max-w-[500px]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.75rem)' }}
          >
            Built on conviction, not convention.
          </h2>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="card-premium p-5 sm:p-6 md:p-7 group"
            >
              <div className="text-mate-text2 group-hover:text-mate-accent transition-colors duration-400 mb-3 sm:mb-4">
                {feature.icon}
              </div>

              <h3 className="font-sans font-medium text-white tracking-[-0.01em]"
                style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
              >
                {feature.title}
              </h3>

              <p className="text-mate-text2 mt-2 leading-relaxed"
                style={{ fontSize: 'clamp(0.8125rem, 0.9vw, 0.875rem)' }}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'Discover', description: 'Deep dive into requirements, architecture planning, and feasibility analysis.' },
  { id: '02', title: 'Design', description: 'System design, UI/UX prototyping, and technical specification.' },
  { id: '03', title: 'Develop', description: 'Agile engineering sprints focusing on scalable, clean, and secure code.' },
  { id: '04', title: 'Deploy', description: 'Rigorous testing, CI/CD pipelines, and production rollout.' },
  { id: '05', title: 'Manage', description: 'Ongoing monitoring, maintenance, and feature scaling post-launch.' },
];

export default function Process() {
  return (
    <section id="process" className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Full lifecycle ownership.</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              We don't just hand over code and disappear. Our process is designed for end-to-end delivery and long-term success.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[45px] left-0 w-full h-[1px] bg-gradient-to-r from-primary/50 via-primary to-primary/50 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={step.id}
                className="relative"
              >
                <div className="flex flex-row lg:flex-col gap-6 lg:gap-8 items-start">
                  
                  {/* Number Node */}
                  <div className="flex-shrink-0 w-[90px] h-[90px] rounded-full glass-panel flex items-center justify-center border border-white/10 relative group">
                    <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                    <span className="font-mono text-2xl font-bold text-white relative z-10">{step.id}</span>
                  </div>

                  {/* Content */}
                  <div className="pt-2 lg:pt-0">
                    <h3 className="text-xl font-display font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from './TiltCard';

const projects = [
  {
    title: 'AI Support Agent',
    category: 'AI Automation',
    tech: ['Python', 'LangChain', 'OpenAI'],
    description: 'Fully autonomous customer support agent integrating with Zendesk.',
    image: '/ai_agent.jpg'
  },
  {
    title: 'Fintech Dashboard',
    category: 'Web App',
    tech: ['React', 'Next.js', 'PostgreSQL'],
    description: 'Real-time financial analytics dashboard with complex data viz.',
    image: '/fintech.jpg'
  },
  {
    title: 'Health Platform',
    category: 'Custom Software',
    tech: ['Node.js', 'MongoDB', 'React Native'],
    description: 'HIPAA-compliant patient management system.',
    image: '/health.jpg'
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold font-display mb-4 tracking-tighter text-white">Selected <span className="italic text-gray-400">Work.</span></h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl">
              A glimpse into the systems we've engineered. Built for scale, optimized for performance.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <a href="#services" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full glass-panel hover:border-white/50 transition-colors font-bold text-white">
              Start your project <ArrowUpRight size={20} className="group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              key={project.title}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="group premium-card p-0 overflow-hidden h-full flex flex-col relative">

                  {/* Project Image */}
                  <div className="aspect-[4/3] w-full bg-[#0A0A0F] relative overflow-hidden flex items-center justify-center">
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/20 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Category Tag */}
                    <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-xs font-mono text-gray-200 border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-8 relative z-20 flex-1 flex flex-col">
                    <h3 className="text-3xl font-bold font-display mb-3 text-white group-hover:text-gray-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-base mb-8 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono text-gray-300 border border-white/10 group-hover:border-white/30 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

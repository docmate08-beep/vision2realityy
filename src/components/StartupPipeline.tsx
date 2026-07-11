import { motion } from 'framer-motion';
import { Rocket, Code2, TrendingUp, Target } from 'lucide-react';
import TiltCard from './TiltCard';

const pipelineSteps = [
  {
    title: "1. Concept & Architecture",
    desc: "We transform your raw idea into a scalable technical architecture, selecting the right stack for long-term growth.",
    icon: Target
  },
  {
    title: "2. Full-Stack Development",
    desc: "Our IIT engineers build robust, high-performance web and mobile apps. We handle the entire codebase.",
    icon: Code2
  },
  {
    title: "3. Deployment & Scaling",
    desc: "Cloud infrastructure setup on AWS/GCP. We ensure your startup handles 10 users or 10 million users flawlessly.",
    icon: Rocket
  },
  {
    title: "4. Growth & SEO/GEO/AEO",
    desc: "Post-launch, we engineer your growth. Search Engine, Generative Engine, and App Engine Optimization to dominate.",
    icon: TrendingUp
  }
];

export default function StartupPipeline() {
  return (
    <section id="startup" className="py-24 relative overflow-hidden bg-[#05050A]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-sm font-bold font-mono mb-6"
          >
            <Rocket size={16} />
            <span>STARTUP YOUR STARTUP</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-6 text-white"
          >
            We build the product.<br />
            <span className="text-gray-500">You build the business.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Don't waste time hunting for freelancers. We act as your elite outsourced CTO and engineering team. From the first line of code to aggressive SEO, GEO, and AEO growth strategies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="glass-panel p-8 rounded-3xl h-full flex flex-col hover:bg-white/[0.02] transition-colors group">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-display text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://wa.me/917068180478?text=Hi%20V2R%20Team,%20I%20am%20interested%20in%20the%20'Start%20Your%20Startup'%20program.%20Let's%20discuss!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold font-display hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <span>Connect with your CTO</span>
            <Rocket size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

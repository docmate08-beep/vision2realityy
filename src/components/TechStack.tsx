import { motion } from 'framer-motion';

const techCategories = [
  {
    name: 'Frontend',
    techs: ['React', 'Next.js', 'Vue', 'Tailwind CSS', 'Framer Motion']
  },
  {
    name: 'Backend & Core',
    techs: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB']
  },
  {
    name: 'AI & Data',
    techs: ['OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'Vector DBs']
  },
  {
    name: 'Cloud & DevOps',
    techs: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

export default function TechStack() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">The tools of our trade.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We leverage modern, battle-tested technologies to build scalable and maintainable systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={category.name}
              className="glass-panel p-6 rounded-2xl text-left border-t border-primary/20 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-lg font-mono text-white mb-4 border-b border-white/10 pb-2">{category.name}</h3>
              <ul className="space-y-3">
                {category.techs.map(tech => (
                  <li key={tech} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

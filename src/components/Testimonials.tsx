import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "V2R didn't just build what we asked for; they architected what we actually needed. Their engineering depth is unmatched.",
    author: "Client Placeholder",
    role: "CEO, Tech Startup",
  },
  {
    quote: "Working with an IIT-founded team means you never have to worry about scalability or technical debt. True professionals.",
    author: "Client Placeholder",
    role: "Product Manager, Enterprise SaaS",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Don't just take our word for it.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="glass-panel p-8 md:p-10 rounded-2xl relative"
            >
              <Quote size={40} className="text-primary/20 absolute top-8 left-8" />
              <div className="relative z-10 pt-4">
                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10"></div>
                  <div>
                    <h4 className="font-bold font-display text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400 font-mono">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

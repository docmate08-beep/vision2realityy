import { motion } from 'framer-motion';
import { Code, Server, CheckCircle, Users } from 'lucide-react';

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
import TiltCard from './TiltCard';

const stats = [
  { label: 'Combined Experience', value: '2+', suffix: ' Yrs', icon: Users },
  { label: 'Projects Delivered', value: '20+', suffix: '', icon: CheckCircle },
  { label: 'Technologies Mastered', value: '15+', suffix: '', icon: Code },
  { label: 'Systems Managed', value: '50+', suffix: '', icon: Server },
];

export default function WhyV2R() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Dynamic Background Grids and Glows */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none translate-x-1/2 animate-pulse-glow"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text & Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-6 text-white">
              Engineered by the<br />
              <span className="text-gray-400">best minds.</span>
            </h2>  <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                We don't just write code; we architect systems that scale. When you work with V2R, you're partnering with top-tier technical talent dedicated to turning your vision into a robust reality.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={stat.label}
                  >
                    <TiltCard>
                      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden h-full group hover:bg-white/[0.02] transition-colors border-white/10">
                      
                      <div className="relative z-10">
                          <Icon size={28} className="text-white mb-6" />
                          <div className="text-4xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight">
                            {stat.value}<span className="text-2xl">{stat.suffix}</span>
                          </div>
                          <div className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Founders */}
          <div className="relative mt-12 lg:mt-0">
            {/* Floating connecting elements */}
            {/* Removed neon pulse */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              
              {/* Founder 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative group"
              >
                <TiltCard>
                  <div className="glass-panel rounded-3xl p-3 pb-8 flex flex-col items-center text-center border-t border-white/20 hover:border-primary/50 transition-colors duration-500">
                    <div className="w-full aspect-[4/5] rounded-2xl bg-white/5 mb-6 overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                      <img src="/rajan.jpg" alt="Rajan Kumar Karn" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent z-20"></div>
                      {/* Animated overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500 z-30"></div>
                    </div>
                    <div className="relative z-40 transform translate-z-10">
                      <h3 className="text-2xl font-bold font-display mb-1 text-white group-hover:text-gray-200 transition-colors">Rajan Kumar Karn</h3>
                      <p className="text-sm text-gray-400 font-mono mb-4">Founder & CEO</p>
                      <div className="flex flex-col items-center gap-3">
                        <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full text-xs text-white font-medium border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]">IIT Alumnus</div>
                        <a href="https://www.linkedin.com/in/rajan-kumar-karn-853baa23b/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium">
                          <LinkedinIcon size={16} /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Founder 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="relative group sm:translate-y-16"
              >
                <TiltCard>
                  <div className="glass-panel rounded-3xl p-3 pb-8 flex flex-col items-center text-center border-t border-white/20 hover:border-primary/50 transition-colors duration-500">
                    <div className="w-full aspect-[4/5] rounded-2xl bg-white/5 mb-6 overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
                      <img src="/adarsh.jpg" alt="Adarsh Kumar" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent z-20"></div>
                      {/* Animated overlay */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-500 z-30"></div>
                    </div>
                    <div className="relative z-40 transform translate-z-10">
                      <h3 className="text-2xl font-bold font-display mb-1 text-white group-hover:text-gray-200 transition-colors">Adarsh Kumar</h3>
                      <p className="text-gray-400 font-mono text-sm mb-4">Co-Founder & COO</p>
                      <a href="https://www.linkedin.com/in/adarsh-kumar-5b0431230/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium mt-1">
                        <LinkedinIcon size={16} /> LinkedIn
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

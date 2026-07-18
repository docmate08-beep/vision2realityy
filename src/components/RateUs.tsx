import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, HeartHandshake } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import { cn } from '../lib/utils';
import TiltCard from './TiltCard';

export default function RateUs() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // In a real app, this would go to a database. 
    // Here we use the WhatsApp handoff so the founders get real feedback.
    const msg = `Hi V2R Team! I just rated your platform ${rating} out of 5 stars. ${feedback ? '\\nMy feedback: ' + feedback : ''}`;
    window.open(getWhatsAppLink(msg), '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <TiltCard>
          <div className="glass-panel rounded-3xl p-8 md:p-16 border-white/10 text-center relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md max-h-md bg-primary/10 blur-[100px] pointer-events-none rounded-full"></div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="rating-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-white">
                    Rate our platform
                  </h2>
                  <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                    We built this from scratch with love and engineering excellence. Let us know how you feel about the experience!
                  </p>

                  <div className="flex justify-center gap-2 md:gap-4 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="relative group transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star 
                          size={48} 
                          strokeWidth={1}
                          className={cn(
                            "transition-all duration-300 relative z-10",
                            (hoverRating || rating) >= star 
                              ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" 
                              : "text-gray-600"
                          )} 
                        />
                        {/* Glow effect behind active stars */}
                        {(hoverRating || rating) >= star && (
                          <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full scale-150"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {rating > 0 && (
                      <motion.form
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto overflow-hidden"
                      >
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="What did you like? What can we improve? (Optional)"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none h-24 mb-4"
                        />
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-4 bg-white text-background font-bold rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                          <span>Send Feedback</span>
                          <Send size={18} />
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                </motion.div>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative z-10 py-12 flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-400 shadow-[0_0_50px_rgba(34,197,94,0.3)] border border-green-500/30">
                    <HeartHandshake size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-3">Thank You!</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">
                    Your rating helps us push the boundaries of what's possible on the web.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

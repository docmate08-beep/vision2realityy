import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function WhatsAppFallback() {
  const { scrollY } = useScroll();
  // Only show after scrolling down 200px
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const pointerEvents = useTransform(scrollY, [0, 200], ["none", "auto"]);

  return (
    <motion.a
      style={{ opacity, pointerEvents: pointerEvents as any }}
      href={getWhatsAppLink("Hi V2R Team, I'd like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
      
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
    </motion.a>
  );
}

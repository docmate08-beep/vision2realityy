import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
  ];

  const defaultWhatsAppMsg = "Hi V2R Team, I'd like to discuss a potential project.";

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <img src="/v2r-logo-horizontal-light.svg" alt="V2R - Vision To Reality" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={getWhatsAppLink(defaultWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-white text-background px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Start Your Project
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel border-t border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-lg text-gray-300 hover:text-white py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={getWhatsAppLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-center bg-white text-background px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Start Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

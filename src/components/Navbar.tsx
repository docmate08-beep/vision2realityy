import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      className={`fixed top-0 w-full z-40 transition duration-300 ${
        isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <img src="/v2r-logo-horizontal-light.svg" alt="V2R - Vision To Reality" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="hidden lg:flex flex-col text-right mr-2 border-r border-white/20 pr-6">
            <a href="mailto:hello@themate.in" className="text-[11px] text-gray-400 hover:text-white font-mono transition">hello@themate.in</a>
            <a href="tel:+918796879297" className="text-[11px] text-gray-400 hover:text-white font-mono transition">+91 8796879297</a>
          </div>
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors font-medium ml-2 mr-2"
          >
            ← Back to TheMate
          </Link>
          <a 
            href={getWhatsAppLink(defaultWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-white text-background px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
          >
            Start Your Project
          </a>
        </nav>

        {/* Mobile Nav & Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <Link 
            to="/" 
            className="text-xs text-gray-300 font-medium px-3 py-1.5 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            ← TheMate
          </Link>
          <button 
            className="text-white p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-[#050505] border-t border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl z-50 overflow-hidden"
          >
            {/* Mobile Contact Info */}
            <div className="flex flex-col gap-2 pb-4 mb-2 border-b border-white/10">
              <a href="mailto:hello@themate.in" className="text-gray-300 hover:text-white font-mono text-sm transition">hello@themate.in</a>
              <a href="tel:+918796879297" className="text-gray-300 hover:text-white font-mono text-sm transition">+91 8796879297</a>
            </div>

            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-xl font-serif text-gray-300 hover:text-white py-3 border-b border-white/5 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/"
              className="text-xl font-serif text-gray-300 hover:text-white py-3 border-b border-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              ← Back to TheMate
            </Link>
            <a 
              href={getWhatsAppLink(defaultWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-center bg-white text-black px-6 py-4 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-gray-200 transition-colors"
            >
              Start Your Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

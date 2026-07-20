import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 0, width: '100%' }}
          animate={{ 
            y: scrolled ? 16 : 0,
            width: scrolled ? '90%' : '100%',
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-auto max-w-[1440px] transition duration-400 ${
            scrolled 
              ? 'glass-pill-nav bg-[rgba(255,255,255,0.85)] shadow-[0_12px_40px_rgba(15,23,42,0.12)] rounded-full' 
              : 'bg-transparent rounded-none border-transparent shadow-none'
          }`}
        >
          {/* We use a container that matches the site's padding when NOT scrolled, and strict padding when scrolled */}
          <div className={`transition duration-400 grid grid-cols-2 md:grid-cols-3 items-center ${
            scrolled ? 'px-6 md:px-8 h-[64px] md:h-[72px]' : 'section-container h-[72px] md:h-[80px]'
          }`}>
            {/* Logo */}
            <div className="flex justify-start">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="relative z-10 transition-opacity hover:opacity-70 duration-300"
              >
                <span className={`text-[1.125rem] md:text-[1.25rem] font-sans font-semibold tracking-[0.04em] transition-colors duration-400 ${
                  scrolled ? 'text-[#111827]' : 'text-white'
                }`}>
                  TheMate
                </span>
              </a>
            </div>

            {/* Desktop Links - Strictly Centered */}
            <div className="hidden md:flex justify-center items-center gap-10 lg:gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`nav-link-premium text-[0.9375rem] transition-colors duration-400 ${
                    scrolled ? 'text-[#111827]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA / Right - Desktop */}
            <div className="hidden md:flex justify-end">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className={`transition duration-400 ${
                  scrolled 
                    ? 'cta-premium' 
                    : 'text-[0.8125rem] font-sans font-medium tracking-[0.03em] text-white px-5 py-2.5 border border-white/[0.15] rounded-[2px] hover:bg-white/[0.04] hover:border-white/[0.25]'
                }`}
              >
                Start a Conversation
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden justify-end">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-[101] w-8 h-8 flex flex-col items-end justify-center gap-[5px]"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6.5, width: 24, backgroundColor: '#111827' } : { rotate: 0, y: 0, width: 20, backgroundColor: scrolled ? '#111827' : '#FFFFFF' }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] origin-center rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 14, backgroundColor: scrolled ? '#111827' : '#FFFFFF' }}
                  transition={{ duration: 0.2 }}
                  className="block h-[1.5px] rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6.5, width: 24, backgroundColor: '#111827' } : { rotate: 0, y: 0, width: 20, backgroundColor: scrolled ? '#111827' : '#FFFFFF' }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] origin-center rounded-full"
                />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[98] bg-[#050505]/40 backdrop-blur-sm md:hidden flex justify-end isolate"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-pill-drawer w-[80%] max-w-[320px] h-full flex flex-col pt-32 px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-start gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                    className="text-[#111827] font-semibold text-[2rem] tracking-tight hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (navLinks.length * 0.05) }}
                  className="mt-8 cta-premium w-full text-center py-4"
                >
                  Start a Conversation
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

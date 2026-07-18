import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

import Navigation from './components/Navigation';
import TheMateHero from './components/TheMateHero';
import WhoWeAre from './components/WhoWeAre';
import OurCompanies from './components/OurCompanies';
import OurApproach from './components/OurApproach';
import WhyTheMate from './components/WhyTheMate';
import Philosophy from './components/Philosophy';
import FinalCTA from './components/FinalCTA';
import TheMateFooter from './components/TheMateFooter';

gsap.registerPlugin(ScrollTrigger);

/* ─── Minimal Loader ─── */
function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        className="text-center"
      >
        <span className="text-[1.25rem] md:text-[1.5rem] font-sans font-semibold tracking-[0.08em] text-white">
          TheMate
        </span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="h-[1px] bg-white/20 mt-4 mx-auto"
          style={{ maxWidth: 120 }}
        />
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  // Smooth scroll with Lenis + GSAP sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div
      className={`relative min-h-[100svh] w-full overflow-x-hidden bg-mate-bg ${
        !loaded ? 'h-[100svh] overflow-hidden' : ''
      }`}
    >
      {/* Loader */}
      <AnimatePresence mode="wait">
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none bg-noise z-50" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <TheMateHero />
        <WhoWeAre />
        <OurCompanies />
        <OurApproach />
        <WhyTheMate />
        <Philosophy />
        <FinalCTA />
      </main>

      {/* Footer */}
      <TheMateFooter />
    </div>
  );
}

export default App;

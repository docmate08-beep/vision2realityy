import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceSelector from './components/ServiceSelector';
import StartupPipeline from './components/StartupPipeline';
import WhyV2R from './components/WhyV2R';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Testimonials from './components/Testimonials';
import RateUs from './components/RateUs';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);

  // Apple-style Smooth scroll with Lenis + GSAP sync
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
    <div className={`relative min-h-screen bg-[#050505] ${!loaded ? 'h-screen overflow-hidden' : ''}`}>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      
      <div className="fixed inset-0 pointer-events-none bg-noise z-50"></div>
      
      <Navbar />
      
      <main>
        <Hero />
        <ServiceSelector />
        <StartupPipeline />
        <WhyV2R />
        <Process />
        <Portfolio />
        <TechStack />
        <Testimonials />
        <RateUs />
      </main>
      
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;

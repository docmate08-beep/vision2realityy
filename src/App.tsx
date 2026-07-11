import { useEffect } from 'react';
import Lenis from 'lenis';
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

function App() {
  // Apple-style Smooth scroll with Lenis
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none bg-noise z-50 opacity-40 mix-blend-overlay"></div>
      
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

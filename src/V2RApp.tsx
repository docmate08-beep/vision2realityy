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
import SEO from './components/SEO';

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

  const v2rSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Vision2Reality (V2R)",
    "url": "https://themate.in/v2r",
    "logo": "https://themate.in/v2r-icon-mark.svg",
    "image": "https://themate.in/rolls-royce-hero.jpg",
    "description": "Vision2Reality (V2R) is an elite engineering and AI agency building scalable digital products, enterprise tech, and AI automations.",
    "parentOrganization": {
      "@type": "Organization",
      "name": "TheMate"
    }
  };

  return (
    <div className={`relative min-h-[100dvh] w-full overflow-x-hidden bg-[#050505] v2r-cursor-none ${!loaded ? 'h-[100dvh] overflow-hidden' : ''}`}>
      <SEO 
        title="Vision2Reality (V2R) | AI & Engineering Agency"
        description="The best minds building your product. From complex AI automations to scalable web applications — everything engineered in one place."
        canonical="/v2r"
        schema={v2rSchema}
        image="/rolls-royce-hero.jpg"
      />
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

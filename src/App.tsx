import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const container = useRef<HTMLDivElement>(null);

  // Initialize Lenis
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
    };
  }, []);

  useGSAP(() => {
    // 1. Initial Page Load Animation
    const tl = gsap.timeline();
    tl.to('.hero-img', { scale: 1.05, duration: 2, ease: 'power2.out' }, 0)
      .to('.hero-title', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0.5)
      .to('.hero-subtitle', { opacity: 1, duration: 1, ease: 'power2.out' }, 1);

    // 2. Scroll-Driven Text Reveal (Fill up animation)
    const textRevealTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#text-reveal-section',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, 
      }
    });

    textRevealTimeline.to('.reveal-text-1', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none'
    }, 0)
    .to('.reveal-text-2', {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      ease: 'none'
    }, 0.2); 

    // 3. Parallax Image Effects
    gsap.utils.toArray('.parallax-img').forEach((img: any) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom", 
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Image Scale Effect for the first intro image
    gsap.fromTo('.img-scale', 
      { scale: 1.2 },
      { 
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.img-scale-trigger',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Fade Up Elements
    gsap.utils.toArray('.fade-up').forEach((elem: any) => {
      gsap.from(elem, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
        }
      });
    });

    // Footer Parallax
    gsap.to('.footer-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: 'footer',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.from('.footer-content', {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 75%',
        end: 'center center',
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="font-sans antialiased selection:bg-white selection:text-black bg-dark text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2915&auto=format&fit=crop" alt="Luxury Car Concept" className="w-full h-full object-cover hero-img" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
        </div>
        
        <div className="z-10 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tight leading-none mb-6 hero-title opacity-0 translate-y-10">
            Visionary <br/>
            <span className="italic font-light">Elegance</span>
          </h1>
          <p className="font-sans text-sm md:text-lg text-gray-400 max-w-md mx-auto uppercase tracking-widest hero-subtitle opacity-0">
            The pinnacle of modern aesthetics
          </p>
        </div>
      </section>

      {/* Spacer / Intro */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="w-full md:w-1/2">
          <p className="text-xl md:text-3xl font-serif text-gray-300 leading-relaxed fade-up">
            We believe that true luxury lies in the spaces between the lines. It's the harmony of raw performance and uncompromising design.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-end img-scale-trigger">
          <div className="parallax-wrapper w-full md:w-4/5 h-[60vh] rounded-sm fade-up">
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2664&auto=format&fit=crop" alt="Details" className="parallax-img img-scale" />
          </div>
        </div>
      </section>

      {/* Scroll Text Reveal Section */}
      <section className="h-[150vh] relative flex items-center justify-center bg-dark" id="text-reveal-section">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full px-4 overflow-hidden">
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-gray-500 mb-8">Design Philosophy</p>
            <div className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight relative text-fill-container text-reveal-wrap">
              <div className="text-outline">REDEFINING</div>
              <div className="text-fill reveal-text-1">REDEFINING</div>
            </div>
            <div className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight relative text-fill-container text-reveal-wrap mt-2">
              <div className="text-outline italic font-light">LUXURY SPACE</div>
              <div className="text-fill reveal-text-2 italic font-light">LUXURY SPACE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Gallery Parallax */}
      <section className="py-32 px-6 md:px-12 bg-dark">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          {/* Gallery Item 1 */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-3/5 parallax-wrapper h-[70vh] rounded-sm">
              <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2832&auto=format&fit=crop" alt="Interior" className="parallax-img" />
            </div>
            <div className="w-full md:w-2/5">
              <h2 className="font-serif text-3xl md:text-5xl mb-6">Crafted for the Senses</h2>
              <p className="text-gray-400 font-sans leading-relaxed text-lg">
                Every material, every texture, carefully curated to evoke an emotional response. A sanctuary of calm in a world of motion.
              </p>
            </div>
          </div>

          {/* Gallery Item 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="w-full md:w-3/5 parallax-wrapper h-[70vh] rounded-sm">
              <img src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2940&auto=format&fit=crop" alt="Aerodynamics" className="parallax-img" />
            </div>
            <div className="w-full md:w-2/5 md:text-right">
              <h2 className="font-serif text-3xl md:text-5xl mb-6">Aerodynamic Purity</h2>
              <p className="text-gray-400 font-sans leading-relaxed text-lg">
                Form sculpted by the wind. Seamless lines that reduce drag and amplify aesthetic appeal, pushing the boundaries of what is possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Closing */}
      <footer className="h-screen flex items-center justify-center relative overflow-hidden bg-black text-center px-4">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2787&auto=format&fit=crop" alt="Future" className="w-full h-full object-cover opacity-20 footer-parallax" />
        </div>
        <div className="z-10 footer-content">
          <h2 className="font-serif text-4xl md:text-7xl mb-8">The Future is Here.</h2>
          <button className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors duration-500 uppercase tracking-widest text-sm">
            Discover More
          </button>
        </div>
      </footer>
    </div>
  );
}

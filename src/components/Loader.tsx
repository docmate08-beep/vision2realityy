import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let currentProgress = 0;
    
    // Extremely fast loader mimicking immediate asset ready
    const interval = setInterval(() => {
      currentProgress += Math.random() * 40 + 20; 
      if (currentProgress > 100) currentProgress = 100;
      setProgress(Math.floor(currentProgress));

      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Instant sharp fade out of text
        gsap.to('.loader-text', {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut'
        });

        // Sharp upward clip-path reveal (Mercedes style)
        gsap.to(loaderRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.8,
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete: onComplete
        });
      }
    }, 40);

    return () => clearInterval(interval);
  }, { scope: loaderRef });

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center pointer-events-none"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div className="loader-text flex flex-col items-center justify-center relative z-10 w-full px-4">
        <h1 className="text-white text-[15vw] sm:text-5xl md:text-7xl font-serif tracking-tighter mb-4 text-center">V2R</h1>
        <div className="flex items-end justify-center gap-2 font-mono text-gray-500 text-[10px] sm:text-sm tracking-[0.2em] uppercase w-full">
          <span>Loading Experience</span>
          <span className="text-white text-xs sm:text-lg w-8 sm:w-10 text-right">{progress}%</span>
        </div>
        
        <div className="w-32 sm:w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden mx-auto">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

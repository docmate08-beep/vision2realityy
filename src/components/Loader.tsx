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
    
    // Simulate loading
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 10) + 1;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Outro Animation
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to('.loader-text', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
          .to(loaderRef.current, { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // Mask reveal upwards
            duration: 1.5, 
            ease: 'expo.inOut' 
          }, "+=0.2");
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, { scope: loaderRef });

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center pointer-events-none"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div className="loader-text flex flex-col items-center justify-center relative z-10">
        <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tighter mb-4">V2R</h1>
        <div className="flex items-end gap-2 font-mono text-gray-500 text-sm tracking-widest uppercase">
          <span>Loading Experience</span>
          <span className="text-white text-lg w-10 text-right">{progress}%</span>
        </div>
        
        <div className="w-48 h-[1px] bg-white/10 mt-6 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

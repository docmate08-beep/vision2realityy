import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fadeUp' | 'blurIn' | 'reveal';
  delay?: number;
  triggerOnScroll?: boolean;
}

export default function AnimatedText({ 
  text, 
  className = "", 
  type = 'chars',
  animation = 'fadeUp',
  delay = 0,
  triggerOnScroll = true
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to split text
  const splitContent = () => {
    if (type === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="inline-block relative overflow-hidden" style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
          <span className="split-element inline-block origin-bottom">{char}</span>
        </span>
      ));
    }
    if (type === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="inline-block relative overflow-hidden mr-[0.3em]">
          <span className="split-element inline-block origin-bottom">{word}</span>
        </span>
      ));
    }
    return <span className="split-element inline-block origin-bottom">{text}</span>;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll('.split-element');

    if (elements.length === 0) return;

    let tl = gsap.timeline({
      scrollTrigger: triggerOnScroll ? {
        trigger: containerRef.current,
        start: 'top 85%',
      } : undefined
    });

    if (animation === 'fadeUp') {
      tl.fromTo(elements, 
        { y: '100%', opacity: 0, rotate: 5 },
        { y: '0%', opacity: 1, rotate: 0, duration: 0.8, stagger: 0.02, ease: 'power4.out', delay }
      );
    } else if (animation === 'blurIn') {
      tl.fromTo(elements, 
        { filter: 'blur(10px)', opacity: 0, scale: 1.2 },
        { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 1, stagger: 0.04, ease: 'power3.out', delay }
      );
    } else if (animation === 'reveal') {
      tl.fromTo(elements,
        { y: '110%' },
        { y: '0%', duration: 0.8, stagger: 0.03, ease: 'expo.out', delay }
      );
    }

    return () => {
      tl.kill();
    };
  }, [animation, delay, triggerOnScroll]);

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap`}>
      {splitContent()}
    </div>
  );
}

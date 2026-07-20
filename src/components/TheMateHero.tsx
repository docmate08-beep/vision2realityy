import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/* ─── Minimal Particle Canvas ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const count = Math.min(50, Math.floor((w * h) / 30000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      const grd = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.5);
      grd.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      grd.addColorStop(0.5, 'rgba(139, 92, 246, 0.01)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.003;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.999;
        p.vy *= 0.999;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const cleanup = init();
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => {
      cleanup?.();
      window.removeEventListener('mousemove', onMouse);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Hero Section ─── */
const EASE = [0.23, 1, 0.32, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease: EASE as unknown as [number, number, number, number] },
});

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/themate-bg.png)', opacity: 0.6 }}
      />
      
      {/* Particle Background */}
      <div className="relative z-[1]">
        <ParticleField />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mate-bg/40 to-mate-bg pointer-events-none z-[2]" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-mate-bg/80 to-transparent pointer-events-none z-[2]" />

      {/* Content */}
      <div className="relative z-10 section-container w-full text-center py-20 md:py-24">
        {/* Headline */}
        <motion.h1
          {...fadeUp(0.3)}
          className="text-editorial max-w-[900px] mx-auto"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 6.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          Building Companies That{' '}
          Shape Tomorrow.
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-mate-text2 mt-5 md:mt-7 max-w-[520px] mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.125rem)' }}
        >
          TheMate creates, operates and scales exceptional businesses across
          industries — through strategy, innovation and long-term vision.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 md:mt-10"
        >
          <button
            onClick={() => handleScroll('#services')}
            className="cta-primary w-full sm:w-auto"
          >
            Explore Our Services
          </button>
          <Link
            to="/v2r"
            className="cta-secondary flex items-center justify-center w-full sm:w-auto"
          >
            Vision 2 Reality
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

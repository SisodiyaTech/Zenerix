// ============================================================
// Hero Section Component — Emerald Edition
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play } from 'lucide-react';
import './Hero.css';

export default function Hero({ onWatchShowreel }) {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.6 });

    tl.to(eyebrowRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    })
    .to([line1Ref.current, line2Ref.current].map(el => el?.querySelector('span')), {
      y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out',
    }, '-=0.4')
    .to(subRef.current?.querySelector('span'), {
      y: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.6')
    .to(actionsRef.current, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    }, '-=0.5')
    .to(scrollRef.current, {
      opacity: 1, duration: 0.6, ease: 'power2.out',
    }, '-=0.3');

    return () => tl.kill();
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Background */}
      <div className="hero-bg">
        {/* Base dark canvas */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 40% 70%, #0C4137 0%, #070A09 65%)',
        }} />

        {/* Ambient brand visual */}
        <div className="hero-poster-ambient" />

        {/* Emerald flowing light particles */}
        <HeroParticles />
        <div className="hero-bg-gradient" />
        <div className="hero-noise" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-eyebrow" ref={eyebrowRef} style={{ opacity: 0, transform: 'translateY(15px)' }}>
          <div className="hero-eyebrow-badge">
            <span className="hero-eyebrow-dot" />
            <span>Video Editing Agency — Production & Post</span>
          </div>
        </div>

        <h1 className="hero-headline">
          <div className="line" ref={line1Ref}>
            <span>We Cut.</span>
          </div>
          <div className="line" ref={line2Ref}>
            <span>You <em>Captivate.</em></span>
          </div>
        </h1>

        <p className="hero-sub" ref={subRef}>
          <span>
            Video editing for brands and creators who want every second to count.
            From viral short-form reels to high-converting commercial ads.
          </span>
        </p>

        <div className="hero-actions" ref={actionsRef} style={{ opacity: 0, transform: 'translateY(15px)' }}>
          <button
            className="btn-primary"
            onClick={onWatchShowreel}
            data-cursor="play"
          >
            <Play size={14} fill="currentColor" strokeWidth={0} />
            Watch Showreel
          </button>
          <a href="#work" className="btn-secondary">
            Explore Portfolio
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll" ref={scrollRef}>
        <span className="hero-scroll-label">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

// Emerald particle system matching brand palette:
// #06D6A0 (Electric Emerald), #0C745B (Forest), #0C4137 (Brunswick)
function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating emerald energy orbs
    const orbs = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.4, r: 280, vx: 0.15, vy: -0.1, color: '6, 214, 160', alpha: 0.07 },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.6, r: 350, vx: -0.12, vy: 0.08, color: '12, 116, 91', alpha: 0.09 },
      { x: window.innerWidth * 0.5,  y: window.innerHeight * 0.8, r: 400, vx: 0.08, vy: -0.15, color: '12, 65, 55', alpha: 0.14 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

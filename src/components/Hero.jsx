// ============================================================
// Hero Section Component — Emerald Edition (Optimized)
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Play } from 'lucide-react';

export default function Hero({ onWatchShowreel }) {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.4 });

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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-[640px] h-[100svh] flex flex-col items-start justify-end px-6 sm:px-10 lg:px-16 pb-12 sm:pb-20 overflow-hidden"
      id="hero"
      ref={heroRef}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 40% 70%, #0C4137 0%, #070A09 65%)',
          }}
        />

        {/* Ambient brand visual */}
        <div
          className="absolute -right-[5%] top-[10%] w-[55vw] max-w-[800px] h-[80vh] bg-cover bg-center opacity-20 filter blur-[1px] mix-blend-lighten pointer-events-none"
          style={{
            backgroundImage: "url('/brand/hero-poster.webp')",
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 75%)',
          }}
        />

        {/* Emerald flowing light particles */}
        <HeroParticles />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A09] via-[#070A09]/75 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[950px]">
        <div
          className="font-sans text-xs uppercase tracking-widest text-[#06D6A0] mb-6 overflow-hidden flex items-center gap-2.5"
          ref={eyebrowRef}
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0C4137]/40 border border-[#06D6A0]/30 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] shadow-[0_0_8px_#06D6A0] animate-pulse" />
            <span>Video Editing Agency — Production & Post</span>
          </div>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.98] tracking-tight text-[#E6FBF6] mb-6">
          <div className="block overflow-hidden" ref={line1Ref}>
            <span className="block transform translate-y-[110%]">We Cut.</span>
          </div>
          <div className="block overflow-hidden" ref={line2Ref}>
            <span className="block transform translate-y-[110%]">
              You <em className="italic text-[#06D6A0] drop-shadow-[0_0_40px_rgba(6,214,160,0.35)]">Captivate.</em>
            </span>
          </div>
        </h1>

        <p
          className="text-base sm:text-lg text-[#8AA49E] font-light max-w-lg leading-relaxed overflow-hidden mb-10"
          ref={subRef}
        >
          <span className="block transform translate-y-[110%]">
            Video editing for brands and creators who want every second to count.
            From viral short-form reels to high-converting commercial ads.
          </span>
        </p>

        <div
          className="flex flex-wrap gap-4 items-center"
          ref={actionsRef}
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          <button
            className="inline-flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#070A09] bg-[#06D6A0] hover:bg-[#09D5A0] px-7 py-4 rounded transition-all shadow-[0_0_20px_rgba(6,214,160,0.3)] hover:shadow-[0_0_35px_rgba(6,214,160,0.6)] hover:-translate-y-0.5 cursor-pointer"
            onClick={onWatchShowreel}
            data-cursor="play"
          >
            <Play size={14} fill="currentColor" strokeWidth={0} />
            <span>Watch Showreel</span>
          </button>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-wider text-[#E6FBF6] bg-[#141E1B] hover:bg-[#1A2824] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/40 px-7 py-4 rounded transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Portfolio
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hidden md:flex absolute right-10 lg:right-16 bottom-16 flex-col items-center gap-3 z-10 pointer-events-none"
        ref={scrollRef}
        style={{ opacity: 0 }}
      >
        <span className="text-[0.65rem] uppercase tracking-widest text-[#8AA49E] [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#06D6A0] to-transparent" />
      </div>
    </section>
  );
}

// Emerald particle system matching brand palette:
function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const colors = ['#06D6A0', '#0C745B', '#0C4137'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    const particleCount = Math.min(35, Math.floor(window.innerWidth / 40));
    particles = Array.from({ length: particleCount }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}

// ============================================================
// Page Loader — Futuristic Emerald Zenerix Reveal
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader({ onComplete }) {
  const loaderRef = useRef(null);
  const markRef = useRef(null);
  const wordmarkRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const mark = markRef.current;
    const wordmark = wordmarkRef.current;
    const tag = tagRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.2,
          onComplete,
        });
      },
    });

    // Animate mark scale and glow
    tl.fromTo(mark, 
      { scale: 0.7, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(wordmark,
      { opacity: 0, y: 10, letterSpacing: '0.3em' },
      { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(tag,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-[#040605] z-[99999] flex flex-col items-center justify-center gap-7 pointer-events-auto select-none"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          ref={markRef}
          src="/brand/logo-mark.png"
          alt="Zenerix Mark"
          className="w-16 sm:w-20 h-auto max-h-20 object-contain drop-shadow-[0_0_20px_rgba(6,214,160,0.5)]"
        />
        <img
          ref={wordmarkRef}
          src="/brand/logo-wordmark.png"
          alt="Zenerix"
          className="h-6 sm:h-7 w-auto max-w-[160px] object-contain opacity-95"
        />
        <span
          ref={tagRef}
          className="font-sans text-[0.68rem] tracking-[0.25em] uppercase text-[#06D6A0]"
        >
          Video Production Agency
        </span>
      </div>
      <div className="w-32 h-[2px] bg-[#E6FBF6]/10 relative overflow-hidden rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06D6A0] to-transparent animate-pulse" />
      </div>
    </div>
  );
}

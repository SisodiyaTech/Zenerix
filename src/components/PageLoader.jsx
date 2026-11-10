// ============================================================
// Page Loader — Futuristic Emerald Zenerix Reveal
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
    <div className="page-loader" ref={loaderRef}>
      <div className="loader-logo-wrap">
        <img
          ref={markRef}
          src="/brand/logo-mark.png"
          alt="Zenerix Mark"
          className="loader-mark-img"
        />
        <img
          ref={wordmarkRef}
          src="/brand/logo-wordmark.png"
          alt="Zenerix"
          className="loader-wordmark-img"
        />
        <span ref={tagRef} className="loader-tagline">
          Video Production Agency
        </span>
      </div>
      <div className="loader-line" />
    </div>
  );
}

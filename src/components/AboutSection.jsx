// ============================================================
// About Section — Emerald Edition
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tools = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro',
  'Final Cut Pro', 'Motion 5', 'Adobe Audition',
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 border-t border-[#E6FBF6]/10 relative" id="about" ref={sectionRef}>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Content */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.68rem] uppercase tracking-widest text-[#06D6A0] mb-4">
              <Sparkles size={11} />
              <span>Who We Are</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-tight text-[#E6FBF6] mb-6">
              The work<br />
              <em className="italic text-[#06D6A0]">is the website.</em>
            </h2>

            <p className="text-sm sm:text-base text-[#8AA49E] leading-relaxed mb-4">
              Zenerix Media is a <strong className="text-white font-medium">specialist video editing agency</strong> built for modern brands,
              performance marketers, and creators who understand that great editing isn't just cutting footage —
              it's pacing, kinetic rhythm, color harmony, and psychological retention.
            </p>

            <p className="text-sm sm:text-base text-[#8AA49E] leading-relaxed mb-6">
              We work in the quiet dark behind the scenes so your content dominates the feed.
              Upload your raw files and creative brief — receive back high-impact, polished edits
              ready to publish on time, every time.
            </p>

            <div className="p-5 border-l-2 border-[#06D6A0] bg-[#0E1513] rounded-r-lg mb-8">
              <p className="font-serif text-lg italic text-[#E6FBF6]">
                "Less text, more motion, lots of space — the edit does the talking."
              </p>
            </div>

            {/* Editing Tools */}
            <p className="text-xs font-semibold uppercase tracking-widest text-[#06D6A0] mb-3">
              Production Suite
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-xs text-[#8AA49E] bg-[#141E1B] border border-[#E6FBF6]/10 px-3 py-1 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column — Visual Card */}
          <div ref={rightRef} style={{ opacity: 0 }} className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-[#06D6A0]/20 shadow-[0_20px_50px_rgba(6,214,160,0.15)] max-w-lg group">
              <picture>
                <source srcSet="/brand/hero-poster.webp" type="image/webp" />
                <img
                  src="/brand/hero-poster.png"
                  alt="Zenerix Futuristic Emerald Identity"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="1122"
                  height="1402"
                />
              </picture>
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#070A09] via-[#070A09]/80 to-transparent flex justify-between items-end">
                <div>
                  <div className="font-serif text-xl font-normal text-white">
                    ZENERIX MEDIA
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#06D6A0]">
                    Video Production Agency
                  </div>
                </div>
                <img
                  src="/brand/logo-mark.png"
                  alt="Zenerix"
                  loading="lazy"
                  decoding="async"
                  className="h-9 max-h-9 w-auto max-w-[40px] object-contain drop-shadow-[0_0_10px_rgba(6,214,160,0.5)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

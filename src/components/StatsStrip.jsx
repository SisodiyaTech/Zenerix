// ============================================================
// Stats Strip + Client Logos Marquee
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  'FitVerse', 'Luminary Studios', 'Nexus Brands', 'GreenLeaf Co.',
  'Titan Retail', 'SkyForge Media', 'PulseWear', 'CloudNine Ventures',
  'FitVerse', 'Luminary Studios', 'Nexus Brands', 'GreenLeaf Co.',
  'Titan Retail', 'SkyForge Media', 'PulseWear', 'CloudNine Ventures',
];

function AnimatedCounter({ target, suffix, start }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!start) return;
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.value);
      },
    });
  }, [start, target]);

  return (
    <div className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#E6FBF6] leading-none mb-2">
      <span ref={ref}>0</span>
      <span className="text-[#06D6A0] ml-0.5">{suffix}</span>
    </div>
  );
}

export default function StatsStrip() {
  const stripRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stripRef.current,
        start: 'top 80%',
        onEnter: () => setStarted(true),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Logos Marquee */}
      <div className="py-4 border-b border-[#E6FBF6]/10 overflow-hidden bg-[#070A09]">
        <div className="flex gap-16 w-max animate-marquee">
          {clients.map((c, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-widest text-[#8AA49E]/70 font-medium whitespace-nowrap hover:text-[#06D6A0] transition-colors"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <section className="py-14 sm:py-20 bg-[#0E1513] border-b border-[#E6FBF6]/10" ref={stripRef}>
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-[#E6FBF6]/10">
            {stats.map((stat) => (
              <div className="py-6 md:py-0 px-4 flex flex-col items-center" key={stat.label}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} start={started} />
                <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8AA49E] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================
// Stats Strip + Client Logos Marquee (Fixed)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../data/projects';
import './StatsStrip.css';

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
    <div className="stat-value">
      <span ref={ref}>0</span>
      <span className="stat-suffix">{suffix}</span>
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
      <div className="logos-marquee">
        <div className="logos-track">
          {clients.map((c, i) => (
            <span key={i} className="logo-item">{c}</span>
          ))}
        </div>
      </div>

      <section className="stats-strip" ref={stripRef}>
        <div className="container">
          <div className="stats-inner">
            {stats.map((stat, i) => (
              <>
                <div className="stat-item" key={stat.label}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} start={started} />
                  <p className="stat-label">{stat.label}</p>
                </div>
                {i < stats.length - 1 && <div className="stat-divider" key={`div-${i}`} />}
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

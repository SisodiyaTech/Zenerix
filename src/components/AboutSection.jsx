// ============================================================
// About Section — Emerald Edition
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const tools = ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro', 'Final Cut Pro', 'Motion 5', 'Adobe Audition'];

// Brand color palette from 'emerald green.pdf' and brand card
const palette = [
  { name: 'Brunswick', hex: '#0C4137' },
  { name: 'Forest', hex: '#0C745B' },
  { name: 'Emerald', hex: '#06D6A0' },
  { name: 'Sage', hex: '#AACBC4' },
  { name: 'Polar', hex: '#E6FBF6' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
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
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-inner">
          {/* Left — Text */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="label about-label">Who We Are</p>

            <h2 className="about-headline">
              The work<br />
              <em>is the website.</em>
            </h2>

            <p className="about-body">
              Zenerix Media is a <strong>specialist video editing agency</strong> built for modern brands,
              performance marketers, and creators who understand that great editing isn't just cutting footage —
              it's pacing, kinetic rhythm, color harmony, and psychological retention.
            </p>

            <p className="about-body">
              We work in the quiet dark behind the scenes so your content dominates the feed.
              Upload your raw files and creative brief — receive back high-impact, polished edits
              ready to publish on time, every time.
            </p>

            <div className="about-quote">
              <p>"Less text, more motion, lots of space — the edit does the talking."</p>
            </div>

            {/* Editing Suite */}
            <p className="label" style={{ marginBottom: '0.6rem', marginTop: '1.8rem' }}>Production Suite</p>
            <div className="about-tools">
              {tools.map(tool => (
                <span key={tool} className="tool-tag">{tool}</span>
              ))}
            </div>

            {/* Official Brand Palette */}
            <div className="about-palette">
              <p className="label" style={{ marginBottom: '0.4rem' }}>Official Palette</p>
              <div className="palette-chips">
                {palette.map(c => (
                  <div key={c.hex} className="palette-chip">
                    <span className="chip-color" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                    <code style={{ fontSize: '0.62rem', opacity: 0.7 }}>{c.hex}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Visual poster */}
          <div className="about-visual" ref={rightRef} style={{ opacity: 0 }}>
            <div className="about-card-container">
              <img
                src="/brand/hero-poster.png"
                alt="Zenerix Futuristic Emerald Identity"
                className="about-card-img"
              />
              <div className="about-card-badge">
                <div>
                  <div className="about-card-badge-title">ZENERIX MEDIA</div>
                  <div className="about-card-badge-sub">Video Production Agency</div>
                </div>
                <img
                  src="/brand/logo-mark.png"
                  alt="Zenerix"
                  style={{ height: '36px', filter: 'drop-shadow(0 0 10px rgba(6, 214, 160, 0.5))' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Process Section — 3-step horizontal layout
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '../data/projects';
import './ProcessSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(step,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              onEnter: () => setVisibleSteps(prev => [...prev, i]),
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process-section" id="process" ref={sectionRef}>
      <div className="container">
        <div ref={titleRef} style={{ opacity: 0 }}>
          <p className="label" style={{ marginBottom: '1rem' }}>How It Works</p>
          <h2 className="process-title">
            Simple. Fast. <em>Polished.</em>
          </h2>
        </div>

        <div className="process-steps">
          {process.map((step, i) => (
            <div
              key={step.step}
              className={`process-step ${visibleSteps.includes(i) ? 'visible' : ''}`}
              ref={el => stepsRef.current[i] = el}
              style={{ opacity: 0 }}
            >
              <div className="step-number-wrap">
                <div className="step-dot">{step.step}</div>
              </div>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


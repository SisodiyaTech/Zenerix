// ============================================================
// Before / After Showcase Component — Blueprint Spec 4.6
// Interactive drag slider comparing raw footage with the polished edit
// ============================================================
import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlidersHorizontal } from 'lucide-react';
import { beforeAfterCases } from '../data/projects';
import './BeforeAfter.css';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const isDragging = useRef(false);
  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  const currentCase = beforeAfterCases[activeTab];

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ba-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
      gsap.fromTo('.ba-stage-wrap',
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ba-stage-wrap',
            start: 'top 82%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Drag logic
  const handleMove = useCallback((clientX) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const onPointerDown = () => {
    isDragging.current = true;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX || (e.touches && e.touches[0].clientX));
  };

  const onClickStage = (e) => {
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalUp = () => { isDragging.current = false; };
    const handleGlobalMove = (e) => {
      if (isDragging.current) {
        handleMove(e.clientX || (e.touches && e.touches[0].clientX));
      }
    };

    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchend', handleGlobalUp);
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });

    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchend', handleGlobalUp);
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, [handleMove]);

  return (
    <section className="before-after-section" id="comparison" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="ba-header">
          <p className="label">The Transformation</p>
          <h2 className="ba-title">
            Raw Footage vs. <em>Polished Master</em>
          </h2>
          <p className="ba-desc">
            We don't just cut clips together — we sculpt the narrative with precision color timing,
            spatial audio mastering, and kinetic motion design that commands viewer attention.
          </p>
        </div>

        {/* Tabs */}
        <div className="ba-tabs">
          {beforeAfterCases.map((item, idx) => (
            <button
              key={item.id}
              className={`ba-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="ba-stage-wrap">
          <div
            className="ba-stage"
            ref={stageRef}
            onMouseDown={onPointerDown}
            onTouchStart={onPointerDown}
            onClick={onClickStage}
          >
            {/* Layer 1: Edited Master (Background) */}
            <div className="ba-layer ba-layer-edited">
              <picture>
                <source srcSet={currentCase.editedPreview} type="image/webp" />
                <img
                  src={currentCase.editedPreview}
                  alt={currentCase.editedLabel}
                  className="ba-image"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Layer 2: Raw Footage (Clipped overlay) */}
            <div
              className="ba-layer ba-layer-raw"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <picture>
                <source srcSet={currentCase.rawPreview} type="image/webp" />
                <img
                  src={currentCase.rawPreview}
                  alt={currentCase.rawLabel}
                  className="ba-image"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Badges */}
            <span className="ba-badge ba-badge-raw">{currentCase.rawLabel}</span>
            <span className="ba-badge ba-badge-edited">{currentCase.editedLabel}</span>

            {/* Draggable divider line */}
            <div
              className="ba-handle"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="ba-handle-btn">
                <SlidersHorizontal size={18} />
              </div>
            </div>
          </div>

          {/* Details footer */}
          <div className="ba-footer-info">
            <div>
              <h3 className="ba-info-title">{currentCase.title}</h3>
              <p className="ba-info-sub">{currentCase.description}</p>
            </div>
            <div className="ba-metric-pill">
              {currentCase.metric}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

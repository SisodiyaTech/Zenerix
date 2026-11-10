// ============================================================
// Horizontal Scroll Gallery — Featured Projects with real Drive thumbnails
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import VideoModal from './VideoModal';
import './HScrollGallery.css';

gsap.registerPlugin(ScrollTrigger);

// Featured = first 6, prioritising the ones marked featured: true
const featuredProjects = [
  ...projects.filter(p => p.featured),
  ...projects.filter(p => !p.featured),
].slice(0, 6);

function HScrollThumb({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {/* Gradient fallback always rendered underneath */}
      <div
        className="hscroll-card-bg"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, ${project.thumbnailColor}, #0B0B0C)`,
        }}
      />
      {/* Drive thumbnail on top */}
      {!error && (
        <img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
            zIndex: 1,
          }}
        />
      )}
    </>
  );
}

export default function HScrollGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);
  const [modalProject, setModalProject] = useState(null);

  // Drag-to-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let moved = false;

    const onMouseDown = (e) => {
      isDown = true;
      moved = false;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      moved = true;
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    };

    track.addEventListener('mousedown', onMouseDown);
    track.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('mouseup', onMouseUp);
    track.addEventListener('mousemove', onMouseMove);

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      track.removeEventListener('mouseleave', onMouseLeave);
      track.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo('.hscroll-card',
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardClick = (project) => {
    setModalProject(project);
  };

  return (
    <>
      <section className="hscroll-section" ref={sectionRef}>
        {/* Header */}
        <div className="hscroll-header" ref={headerRef} style={{ opacity: 0 }}>
          <div>
            <p className="label" style={{ marginBottom: '0.75rem' }}>Featured Projects</p>
            <h2 className="hscroll-title">
              Work We're <em>Proud Of</em>
            </h2>
          </div>
          <span className="hscroll-hint">
            <ArrowRight size={12} />
            Drag to browse
          </span>
        </div>

        {/* Drag-scroll track */}
        <div className="hscroll-track-wrap" ref={trackRef}>
          <div className="hscroll-track">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className={`hscroll-card ${project.aspect === 'vertical' ? 'tall' : ''}`}
                style={{ opacity: 0 }}
                onClick={() => handleCardClick(project)}
                data-cursor="play"
              >
                <div className="hscroll-card-thumb">
                  <HScrollThumb project={project} />
                  <div className="hscroll-card-overlay" />
                  <div className="hscroll-play" style={{ zIndex: 2 }}>
                    <Play size={16} strokeWidth={1.5} />
                  </div>
                  <div className="hscroll-card-info" style={{ zIndex: 2 }}>
                    <p className="hscroll-card-tag">{project.tag}</p>
                    <h3 className="hscroll-card-title">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalProject && (
        <VideoModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </>
  );
}

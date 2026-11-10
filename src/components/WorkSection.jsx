// ============================================================
// Selected Work / Portfolio Section — with real Drive videos
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, ExternalLink } from 'lucide-react';
import { projects, categories } from '../data/projects';
import VideoModal from './VideoModal';
import './WorkSection.css';

gsap.registerPlugin(ScrollTrigger);

// Thumbnail with Drive image + fallback gradient
function VideoThumb({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="video-thumb-bg"
      style={{
        background: `radial-gradient(ellipse at 30% 70%, ${project.thumbnailColor}, #0B0B0C)`,
      }}
    >
      {/* Drive thumbnail */}
      {!imgError && (
        <img
          src={project.thumbnail}
          alt={project.title}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Category watermark shown if no thumb */}
      {(imgError || !imgLoaded) && (
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          fontWeight: '300',
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.05)',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {project.tag}
        </div>
      )}
    </div>
  );
}

function VideoCard({ project, index, onPlay }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          delay: (index % 3) * 0.1,
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      className={`video-card ${project.aspect}`}
      ref={cardRef}
      style={{ opacity: 0 }}
      onClick={() => onPlay(project)}
      data-cursor="play"
    >
      <div className="video-card-thumb">
        <VideoThumb project={project} />

        {/* Category tag */}
        <span className="video-tag">{project.tag}</span>

        {/* Play overlay */}
        <div className="video-play-overlay">
          <div className="play-btn">
            <Play size={20} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="video-card-info">
        <h3 className="video-card-title">{project.title}</h3>
        <p className="video-card-desc">{project.description}</p>
      </div>
    </div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getModalIndex = () =>
    filteredProjects.findIndex(p => p.id === modalProject?.id);

  const handlePrev = () => {
    const idx = getModalIndex();
    if (idx > 0) setModalProject(filteredProjects[idx - 1]);
  };

  const handleNext = () => {
    const idx = getModalIndex();
    if (idx < filteredProjects.length - 1) setModalProject(filteredProjects[idx + 1]);
  };

  return (
    <>
      <section className="work-section" id="work" ref={sectionRef}>
        <div className="container">
          {/* Header */}
          <div className="work-header">
            <div ref={titleRef} style={{ opacity: 0 }}>
              <p className="label" style={{ marginBottom: '1rem' }}>Selected Work</p>
              <h2 className="work-title">
                Our <em>Portfolio</em>
              </h2>
            </div>

            {/* Filters */}
            <div className="work-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="work-grid">
            {filteredProjects.map((project, i) => (
              <VideoCard
                key={project.id}
                project={project}
                index={i}
                onPlay={setModalProject}
              />
            ))}
          </div>

          {/* Footer — link to full Drive folder */}
          <div className="work-footer">
            <a
              href="https://drive.google.com/drive/folders/1aIdvvs-_K74TLn8yUNL77eaSMS9hi8s_"
              target="_blank"
              rel="noopener noreferrer"
              className="view-all-btn"
            >
              View All Work on Drive
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      <VideoModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}

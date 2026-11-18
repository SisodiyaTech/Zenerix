// ============================================================
// Horizontal Scroll Gallery — Featured Projects
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { projects } from '../data/projects';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

// Featured = first 6, prioritising the ones marked featured: true
const featuredProjects = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
].slice(0, 6);

function HScrollThumb({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          background: `radial-gradient(ellipse at 30% 70%, ${project.thumbnailColor || '#0C4137'}, #0B0B0C)`,
        }}
      />
      {!error && project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-[1] group-hover:scale-105 transition-transform duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
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

    const onMouseDown = (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
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
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.hscroll-card',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
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

  return (
    <>
      <section className="py-16 md:py-24 overflow-hidden relative" ref={sectionRef}>
        {/* Header */}
        <div
          className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex justify-between items-end mb-8 gap-4 flex-wrap"
          ref={headerRef}
          style={{ opacity: 0 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.68rem] uppercase tracking-widest text-[#06D6A0] mb-3">
              <Sparkles size={11} />
              <span>Curated Highlights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#E6FBF6]">
              Work We're <em className="italic text-[#06D6A0]">Proud Of</em>
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#8AA49E]">
            <ArrowRight size={13} />
            <span>Drag to browse</span>
          </span>
        </div>

        {/* Drag-scroll track */}
        <div
          className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing px-6 sm:px-10 lg:px-16 select-none"
          ref={trackRef}
        >
          <div className="flex gap-6 pb-6 w-max">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="hscroll-card group relative flex-shrink-0 bg-[#0E1513] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ opacity: 0 }}
                onClick={() => setModalProject(project)}
                data-cursor="play"
              >
                <div
                  className={`relative overflow-hidden ${
                    project.aspect === 'vertical'
                      ? 'w-[240px] sm:w-[280px] aspect-[9/16]'
                      : 'w-[320px] sm:w-[420px] aspect-[16/9]'
                  }`}
                >
                  <HScrollThumb project={project} />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A09]/95 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-[2]" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-[3]">
                    <div className="w-12 h-12 rounded-full bg-[#06D6A0] text-[#070A09] flex items-center justify-center pl-0.5 shadow-[0_0_20px_rgba(6,214,160,0.4)]">
                      <Play size={18} fill="currentColor" strokeWidth={0} />
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="absolute bottom-0 inset-x-0 p-5 z-[3] transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <p className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#06D6A0] mb-1">
                      {project.tag}
                    </p>
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-white line-clamp-1">
                      {project.title}
                    </h3>
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

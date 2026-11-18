// ============================================================
// WorkSection.jsx — All Categories in Dedicated Sections
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Film,
  Smartphone,
  Sparkles,
  Layers,
} from 'lucide-react';
import { portfolioSections, DRIVE_FOLDER_URL, projects } from '../data/projects';
import VideoModal from './VideoModal';

gsap.registerPlugin(ScrollTrigger);

// Robust thumbnail with Google Drive CDN + fallback
function VideoThumb({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 70%, ${project.thumbnailColor || '#0C4137'}, #070A09)`,
      }}
    >
      {!imgError && project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-106 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {(!imgLoaded || imgError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#E6FBF6]/20">
          <span className="font-serif text-2xl font-light tracking-wider">
            {project.tag}
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest text-[#8AA49E]">
            {project.aspect === 'vertical' ? '9:16 Reel' : '16:9 4K'}
          </span>
        </div>
      )}
    </div>
  );
}

// Individual Video Card
function VideoCard({ project, onPlay }) {
  const isVertical = project.aspect === 'vertical';

  return (
    <article
      onClick={() => onPlay(project)}
      data-cursor="play"
      tabIndex={0}
      role="button"
      aria-label={`Play preview: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPlay(project);
        }
      }}
      className="group relative bg-[#0E1513] border border-[#E6FBF6]/10 rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-[#06D6A0]/30 hover:shadow-[0_16px_36px_-12px_rgba(6,214,160,0.18)] cursor-pointer outline-none"
    >
      {/* Thumbnail Wrap with strict Aspect Ratio */}
      <div
        className={`w-full relative overflow-hidden bg-[#0B0E0D] ${
          isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'
        }`}
      >
        <VideoThumb project={project} />

        {/* Badges Row */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-none">
          <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-white bg-[#070A09]/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded">
            {project.tag}
          </span>
          <span className="text-[0.62rem] font-medium tracking-wide text-[#06D6A0] bg-[#070A09]/80 backdrop-blur-md border border-[#06D6A0]/30 px-2 py-0.5 rounded inline-flex items-center gap-1">
            {isVertical ? (
              <>
                <Smartphone size={10} /> 9:16
              </>
            ) : (
              <>
                <Film size={10} /> 16:9
              </>
            )}
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#070A09]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-hover:bg-[#070A09]/60 transition-all duration-300 z-10">
          <div className="w-12 h-12 rounded-full bg-[#06D6A0] text-[#070A09] flex items-center justify-center pl-0.5 shadow-[0_0_24px_rgba(6,214,160,0.3)] transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play size={18} fill="currentColor" strokeWidth={0} />
          </div>
          <span className="text-[0.65rem] tracking-widest uppercase text-white font-medium">
            Watch Preview
          </span>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center gap-2 mb-1.5">
          <span className="text-[0.65rem] tracking-wider uppercase text-[#06D6A0] font-medium truncate">
            {project.category}
          </span>
          {project.duration && (
            <span className="text-[0.62rem] tracking-wide text-[#8AA49E] whitespace-nowrap">
              {project.duration}
            </span>
          )}
        </div>
        <h4 className="font-serif text-lg sm:text-xl font-normal text-[#E6FBF6] leading-snug mb-2 line-clamp-2">
          {project.title}
        </h4>
        <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed line-clamp-2 mt-auto">
          {project.description}
        </p>
      </div>
    </article>
  );
}

// Dedicated Category Section Component with Max 5 Demo & Show More button
function CategorySection({ category, formatAspect, onPlay }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_DEMO = 5;
  const hasMore = category.items.length > MAX_DEMO;
  const visibleItems = expanded ? category.items : category.items.slice(0, MAX_DEMO);
  const isVertical = formatAspect === 'vertical';

  return (
    <div className="scroll-mt-28" id={category.id}>
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#06D6A0] mb-1.5 block">
            {category.tag}
          </span>
          <h4 className="font-serif text-2xl sm:text-3xl font-light text-[#E6FBF6] tracking-tight mb-1.5">
            {category.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed">
            {category.description}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-xs font-medium uppercase tracking-wider text-[#8AA49E] bg-[#0E1513] border border-[#E6FBF6]/10 px-3 py-1 rounded-full">
            {category.items.length} {category.items.length === 1 ? 'Video' : 'Videos'}
          </span>
        </div>
      </div>

      {/* Responsive Grid Container */}
      <div
        className={
          isVertical
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start'
        }
      >
        {visibleItems.map((item) => (
          <VideoCard key={item.id} project={item} onPlay={onPlay} />
        ))}
      </div>

      {/* Show More Button (shown if items exceed 5 demo) */}
      {hasMore && (
        <div className="flex justify-center mt-7">
          <button
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#E6FBF6] bg-[#141E1B] border border-[#06D6A0]/30 px-6 py-2.5 rounded-full hover:bg-[#1A2824] hover:text-[#06D6A0] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(6,214,160,0.2)] transition-all cursor-pointer"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            <span>
              {expanded
                ? 'Show Less'
                : `Show More (${category.items.length - MAX_DEMO} more videos)`}
            </span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default function WorkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
    projects.findIndex((p) => p.fileId === modalProject?.fileId);

  const handlePrev = () => {
    const idx = getModalIndex();
    if (idx > 0) setModalProject(projects[idx - 1]);
  };

  const handleNext = () => {
    const idx = getModalIndex();
    if (idx < projects.length - 1) setModalProject(projects[idx + 1]);
  };

  const handleNavScroll = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="py-16 md:py-24 relative" id="work" ref={sectionRef}>
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Main Showcase Header */}
          <div
            className="flex flex-wrap items-end justify-between gap-6 mb-8"
            ref={titleRef}
            style={{ opacity: 0 }}
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.7rem] uppercase tracking-widest text-[#06D6A0] mb-4">
                <Sparkles size={12} />
                <span>Curated Client Portfolio</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight text-[#E6FBF6] mb-3">
                Selected <em className="italic text-[#06D6A0]">Work & Demos</em>
              </h2>
              <p className="text-sm sm:text-base text-[#8AA49E] leading-relaxed">
                Browse our complete production library organized by format and genre — from high-retention vertical reels to cinematic widescreen master films.
              </p>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-medium uppercase tracking-widest px-4 py-2 border border-[#06D6A0]/20 rounded bg-[#0E1513]/80 text-[#06D6A0]">
                {projects.length} Total Demos
              </span>
            </div>
          </div>

          {/* Quick Jump Bar */}
          <nav
            className="flex flex-wrap items-center gap-4 p-4 mb-12 sm:mb-16 bg-[#0E1513] border border-[#E6FBF6]/10 rounded-lg"
            aria-label="Portfolio category quick jump"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8AA49E]">
              <Layers size={13} />
              <span>Jump to:</span>
            </span>
            <div className="flex flex-wrap gap-4 items-center flex-grow">
              {portfolioSections.map((sec) => (
                <div key={sec.formatSlug} className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#06D6A0]">
                    {sec.format}:
                  </span>
                  {sec.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavScroll(cat.id)}
                      className="text-xs text-[#8AA49E] bg-[#141E1B] border border-[#E6FBF6]/10 px-3 py-1.5 rounded-full hover:text-white hover:border-[#06D6A0]/30 hover:bg-[#1A2824] transition-all whitespace-nowrap cursor-pointer"
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </nav>

          {/* ALL CATEGORIES IN DIFFERENT DEDICATED SECTIONS */}
          <div className="flex flex-col gap-16 md:gap-24">
            {portfolioSections.map((formatSec) => (
              <section
                key={formatSec.formatSlug}
                className="flex flex-col gap-12 pt-4"
                id={formatSec.formatSlug}
              >
                {/* Division Header */}
                <div className="pb-6 border-b border-[#06D6A0]/20">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#06D6A0] bg-[#06D6A0]/10 border border-[#06D6A0]/20 px-3 py-1 rounded-full mb-3">
                    {formatSec.aspect === 'vertical' ? (
                      <Smartphone size={13} />
                    ) : (
                      <Film size={13} />
                    )}
                    <span>{formatSec.format} Format</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#E6FBF6] tracking-tight mb-2">
                    {formatSec.format} Showcase
                  </h3>
                  <p className="text-sm text-[#8AA49E] max-w-2xl leading-relaxed">
                    {formatSec.formatDesc}
                  </p>
                </div>

                {/* Categories List */}
                <div className="flex flex-col gap-14 sm:gap-20">
                  {formatSec.categories.map((cat) => (
                    <CategorySection
                      key={cat.id}
                      category={cat}
                      formatAspect={formatSec.aspect}
                      onPlay={setModalProject}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Direct Drive Cloud Library Link */}
          <div className="mt-16 sm:mt-24">
            <div className="bg-gradient-to-br from-[#0E1513]/90 to-[#0C4137]/30 border border-[#06D6A0]/20 rounded-xl p-8 sm:p-12 flex flex-wrap justify-between items-center gap-6">
              <div className="max-w-xl">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#E6FBF6] mb-2">
                  Access the Entire Master Drive Library
                </h3>
                <p className="text-sm text-[#8AA49E] leading-relaxed">
                  Explore all original high-bitrate deliverables, raw footage masters, and organized cloud folders directly on Google Drive.
                </p>
              </div>
              <a
                href={DRIVE_FOLDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06D6A0] hover:bg-[#09D5A0] text-[#070A09] font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded transition-all shadow-[0_0_24px_rgba(6,214,160,0.25)] hover:shadow-[0_0_32px_rgba(6,214,160,0.4)] hover:-translate-y-0.5"
              >
                <span>Browse Full Drive Folder</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {modalProject && (
        <VideoModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </>
  );
}

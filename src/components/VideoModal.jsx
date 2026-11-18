// ============================================================
// Video Modal — Full-screen Google Drive video player (Optimized)
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';

export default function VideoModal({ project, onClose, onPrev, onNext }) {
  const backdropRef = useRef(null);
  const [loadedUrl, setLoadedUrl] = useState(null);
  const isOpen = !!project;
  const iframeLoading = Boolean(project?.embedUrl && loadedUrl !== project.embedUrl);

  // Handle ESC / arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  const isVertical = project.aspect === 'vertical';

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-[#070A09]/95 backdrop-blur-2xl transition-all"
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      {/* Header */}
      <div className="w-full max-w-[1100px] flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif text-lg sm:text-2xl font-light text-[#E6FBF6] leading-tight">
            {project.title}
          </h3>
          <p className="text-[0.65rem] tracking-widest uppercase text-[#06D6A0]">
            {project.tag}
          </p>
        </div>
        <div className="flex gap-2.5 items-center">
          {project.driveUrl && (
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8AA49E] hover:text-[#E6FBF6] border border-[#E6FBF6]/10 hover:border-[#E6FBF6]/30 px-3 py-1.5 rounded transition-all"
            >
              <ExternalLink size={12} />
              <span>Drive</span>
            </a>
          )}
          <button
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8AA49E] hover:text-[#E6FBF6] border border-[#E6FBF6]/10 hover:border-[#E6FBF6]/30 px-3.5 py-1.5 rounded transition-all cursor-pointer"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={13} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Video Container */}
      <div
        className={`w-full relative rounded-lg overflow-hidden bg-black shadow-2xl ${
          isVertical
            ? 'aspect-[9/16] max-w-[420px]'
            : 'aspect-[16/9] max-w-[1100px]'
        }`}
      >
        {/* Loading Spinner */}
        {iframeLoading && project.embedUrl && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#070A09] text-[#06D6A0] z-10">
            <Loader2 size={32} className="animate-spin" />
            <span className="text-[0.68rem] tracking-widest uppercase text-[#8AA49E]">
              Loading High-Definition Stream...
            </span>
          </div>
        )}

        {project.embedUrl ? (
          <iframe
            key={project.embedUrl}
            src={project.embedUrl}
            title={project.title}
            allowFullScreen
            allow="autoplay; fullscreen"
            loading="lazy"
            onLoad={() => setLoadedUrl(project.embedUrl)}
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6 text-[#8AA49E]">
            <ExternalLink size={36} className="opacity-30" />
            <p className="text-sm">This video cannot be embedded directly.</p>
            {project.driveUrl && (
              <a
                href={project.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#06D6A0] underline"
              >
                Watch on Google Drive →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next Nav */}
      {(onPrev || onNext) && (
        <div className="w-full max-w-[1100px] flex justify-between items-center mt-4">
          {onPrev ? (
            <button
              onClick={onPrev}
              aria-label="Previous video"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8AA49E] hover:text-[#06D6A0] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-4 py-2 rounded transition-all cursor-pointer"
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>
          ) : <div />}
          {onNext ? (
            <button
              onClick={onNext}
              aria-label="Next video"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#8AA49E] hover:text-[#06D6A0] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-4 py-2 rounded transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          ) : <div />}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Video Modal — Full-screen Google Drive video player (Optimized)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ project, onClose, onPrev, onNext }) {
  const backdropRef = useRef(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const isOpen = !!project;

  // Reset loading state whenever project changes
  useEffect(() => {
    setIframeLoading(true);
  }, [project?.embedUrl]);

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
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'open' : ''}`}
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      {/* Header */}
      <div className="modal-header">
        <div>
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-meta">{project.tag}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {project.driveUrl && (
            <a
              href={project.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-close-btn"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={12} />
              Open in Drive
            </a>
          )}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={12} />
            Close
          </button>
        </div>
      </div>

      {/* Video container */}
      <div className={`modal-video-container ${project.aspect || 'horizontal'}`}>
        {/* Loading spinner */}
        {iframeLoading && project.embedUrl && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              color: 'var(--accent)',
              background: '#070A09',
              zIndex: 1,
            }}
          >
            <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
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
            onLoad={() => setIframeLoading(false)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <div className="drive-fallback">
            <ExternalLink size={40} style={{ opacity: 0.3 }} />
            <p>This video cannot be embedded directly.</p>
            {project.driveUrl && (
              <a href={project.driveUrl} target="_blank" rel="noopener noreferrer">
                Watch on Google Drive →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Prev / Next nav */}
      {(onPrev || onNext) && (
        <div className="modal-nav">
          {onPrev && (
            <button onClick={onPrev} aria-label="Previous video">
              <ChevronLeft size={12} />
              Previous
            </button>
          )}
          {onNext && (
            <button onClick={onNext} aria-label="Next video">
              Next
              <ChevronRight size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

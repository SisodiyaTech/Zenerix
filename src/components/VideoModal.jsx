// ============================================================
// Video Modal — Full-screen Google Drive video player
// ============================================================
import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ project, onClose, onPrev, onNext }) {
  const backdropRef = useRef(null);
  const isOpen = !!project;

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
          {/* Open in Drive link */}
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
          <button className="modal-close-btn" onClick={onClose}>
            <X size={12} />
            Close
          </button>
        </div>
      </div>

      {/* Video container */}
      <div className={`modal-video-container ${project.aspect || 'horizontal'}`}>
        {project.embedUrl ? (
          <iframe
            key={project.embedUrl}         /* re-mount on project change */
            src={project.embedUrl}
            title={project.title}
            allowFullScreen
            allow="autoplay; fullscreen"
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          /* Fallback if no embed available */
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

      {/* Prev / Next nav (only when handlers provided) */}
      {(onPrev || onNext) && (
        <div className="modal-nav">
          {onPrev && (
            <button onClick={onPrev}>
              <ChevronLeft size={12} />
              Previous
            </button>
          )}
          {onNext && (
            <button onClick={onNext}>
              Next
              <ChevronRight size={12} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

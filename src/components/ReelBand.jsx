// ============================================================
// Reel Band — Cinematic scrolling text separator
// ============================================================
import './ReelBand.css';

const items = [
  'Short-form Reels', 'Brand Ads', 'Corporate Films', 'Podcast Editing',
  'Motion Graphics', 'Product Videos', 'Creator Content', 'Social Media',
  'Short-form Reels', 'Brand Ads', 'Corporate Films', 'Podcast Editing',
  'Motion Graphics', 'Product Videos', 'Creator Content', 'Social Media',
];

export default function ReelBand({ reverse = false }) {
  return (
    <div className="reel-band">
      <div
        className="reel-track"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((item, i) => (
          <div key={i} className="reel-item">
            <span className="reel-text">{item}</span>
            <span className="reel-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}


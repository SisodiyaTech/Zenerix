// ============================================================
// Reel Band — Cinematic scrolling text separator
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
const items = [
  'Short-form Reels', 'Brand Ads', 'Corporate Films', 'Podcast Editing',
  'Motion Graphics', 'Product Videos', 'Creator Content', 'Social Media',
  'Short-form Reels', 'Brand Ads', 'Corporate Films', 'Podcast Editing',
  'Motion Graphics', 'Product Videos', 'Creator Content', 'Social Media',
];

export default function ReelBand({ reverse = false }) {
  return (
    <div className="py-5 overflow-hidden border-y border-[#E6FBF6]/10 bg-[#0E1513]">
      <div
        className="flex gap-12 w-max animate-marquee"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-12 flex-shrink-0 whitespace-nowrap">
            <span className="font-serif text-xl sm:text-2xl font-light italic text-[#8AA49E] tracking-wide">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#06D6A0] shadow-[0_0_8px_#06D6A0] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

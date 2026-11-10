// ============================================================
// ZENERIX MEDIA — Real Video Data
// All 8 videos from Google Drive folder:
// https://drive.google.com/drive/folders/1aIdvvs-_K74TLn8yUNL77eaSMS9hi8s_
// ============================================================

const driveEmbed = (id) => `https://drive.google.com/file/d/${id}/preview`;
const driveView  = (id) => `https://drive.google.com/file/d/${id}/view`;

export const projects = [
  {
    id: 1,
    title: "Brand Case Study Film",
    category: "Corporate",
    tag: "CORPORATE",
    description:
      "A full case study brand film — structured storytelling, clean cuts, and professional pacing. Perfect for brand credibility and pitch decks.",
    aspect: "horizontal",
    featured: true,
    fileId: "1gozBeQAjyygc_SyzWdav5u5fm57h-SoK",
    embedUrl: driveEmbed("1gozBeQAjyygc_SyzWdav5u5fm57h-SoK"),
    driveUrl: driveView("1gozBeQAjyygc_SyzWdav5u5fm57h-SoK"),
    thumbnail: "/thumbnails/case_study.jpg",
    thumbnailColor: "#0C4137",
    size: "258.4 MB",
    modified: "23 Oct",
  },
  {
    id: 2,
    title: "Pinterest Reel — Home Decor",
    category: "Reels",
    tag: "REELS",
    description:
      "Scroll-stopping vertical reel edited for Pinterest virality — worship room home inspiration with cinematic transitions and aesthetic pacing.",
    aspect: "vertical",
    featured: true,
    fileId: "1tMhuef4FeuUztPsqBfZ5LNsJC971yWHL",
    embedUrl: driveEmbed("1tMhuef4FeuUztPsqBfZ5LNsJC971yWHL"),
    driveUrl: driveView("1tMhuef4FeuUztPsqBfZ5LNsJC971yWHL"),
    thumbnail: "/thumbnails/pinterest_decor.jpg",
    thumbnailColor: "#0D4037",
    size: "1.6 MB",
    modified: "23 Oct",
  },
  {
    id: 3,
    title: "Pinterest Reel — Food & Recipe",
    category: "Reels",
    tag: "REELS",
    description:
      "Quick-cut food reel edited for maximum engagement — easy dinner recipes presented with dynamic visuals and appetite-driven pacing.",
    aspect: "vertical",
    featured: false,
    fileId: "1RWiRO8C1qWRvMTjWfwUHZ0wwAVeVj-zk",
    embedUrl: driveEmbed("1RWiRO8C1qWRvMTjWfwUHZ0wwAVeVj-zk"),
    driveUrl: driveView("1RWiRO8C1qWRvMTjWfwUHZ0wwAVeVj-zk"),
    thumbnail: "/thumbnails/pinterest_food.jpg",
    thumbnailColor: "#141E1B",
    size: "448 KB",
    modified: "23 Oct",
  },
  {
    id: 4,
    title: "Pinterest Reel — Wedding Inspiration",
    category: "Reels",
    tag: "REELS",
    description:
      "Elegant lifestyle reel showcasing rustic wedding sign ideas — soft aesthetic, smooth transitions, crafted for Pinterest saves and shares.",
    aspect: "vertical",
    featured: true,
    fileId: "1w51z-MWgk7UztR3G1HVpC99BI1fucHTx",
    embedUrl: driveEmbed("1w51z-MWgk7UztR3G1HVpC99BI1fucHTx"),
    driveUrl: driveView("1w51z-MWgk7UztR3G1HVpC99BI1fucHTx"),
    thumbnail: "/thumbnails/pinterest_wedding.jpg",
    thumbnailColor: "#0C745B",
    size: "2.6 MB",
    modified: "23 Oct",
  },
  {
    id: 5,
    title: "Creator Content Edit",
    category: "Reels",
    tag: "REELS",
    description:
      "High-energy creator reel with sharp cuts, dynamic pacing, and music-synced transitions built to maximize watch time and engagement.",
    aspect: "vertical",
    featured: false,
    fileId: "1Fv_kk6t6DKFV0yOrcXvk2OtbN3dIX2qu",
    embedUrl: driveEmbed("1Fv_kk6t6DKFV0yOrcXvk2OtbN3dIX2qu"),
    driveUrl: driveView("1Fv_kk6t6DKFV0yOrcXvk2OtbN3dIX2qu"),
    thumbnail: "/thumbnails/creator_img.jpg",
    thumbnailColor: "#0E1513",
    size: "67.4 MB",
    modified: "27 Sept",
  },
  {
    id: 6,
    title: "Portfolio Showreel",
    category: "Ads",
    tag: "SHOWREEL",
    description:
      "The main Zenerix portfolio showreel — a cinematic showcase of editing style, genre versatility, and production quality across multiple projects.",
    aspect: "horizontal",
    featured: true,
    fileId: "1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB",
    embedUrl: driveEmbed("1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB"),
    driveUrl: driveView("1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB"),
    thumbnail: "/thumbnails/showreel_portfolio.jpg",
    thumbnailColor: "#0C4137",
    size: "72.3 MB",
    modified: "11 Oct",
  },
  {
    id: 7,
    title: "Motion Graphic Background",
    category: "Motion Graphics",
    tag: "MOTION",
    description:
      "Animated motion graphic backdrop designed for brand overlays, intros, and lower thirds — adds a cinematic layer to any video project.",
    aspect: "horizontal",
    featured: false,
    fileId: "1rUWpTgWXHqJrwwSC1vHtBB6AO59vSWCe",
    embedUrl: driveEmbed("1rUWpTgWXHqJrwwSC1vHtBB6AO59vSWCe"),
    driveUrl: driveView("1rUWpTgWXHqJrwwSC1vHtBB6AO59vSWCe"),
    thumbnail: "/thumbnails/motion_bg.jpg",
    thumbnailColor: "#141E1B",
    size: "35.3 MB",
    modified: "1 Jul",
  },
  {
    id: 8,
    title: "Social Media Ad Edit",
    category: "Ads",
    tag: "ADS",
    description:
      "Fast-paced ad edit built to hold attention and drive action — sharp cuts, bold typography, and a strong CTA that converts scrollers into buyers.",
    aspect: "vertical",
    featured: false,
    fileId: "1YuGdwZ0wrYpi0eIud8X5j2wK1fBpX3sv",
    embedUrl: driveEmbed("1YuGdwZ0wrYpi0eIud8X5j2wK1fBpX3sv"),
    driveUrl: driveView("1YuGdwZ0wrYpi0eIud8X5j2wK1fBpX3sv"),
    thumbnail: "/thumbnails/social_ad_raj.jpg",
    thumbnailColor: "#0D4037",
    size: "63.6 MB",
    modified: "29 Sept",
  },
];

export const categories = ["All", "Reels", "Ads", "Corporate", "Motion Graphics"];

export const stats = [
  { value: 500, suffix: "+", label: "Videos Edited" },
  { value: 50,  suffix: "M+", label: "Views Generated" },
  { value: 120, suffix: "+", label: "Happy Clients" },
];

export const services = [
  {
    id: "reels",
    number: "01",
    title: "Short-form / Reels",
    description:
      "Scroll-stopping edits with sharp cuts, captions and music sync. We understand the algorithm, so your content reaches further.",
    detail:
      "Vertical and square formats optimised for Instagram, TikTok, Pinterest, and YouTube Shorts. Captions, effects, music sync — delivered ready to post.",
  },
  {
    id: "ads",
    number: "02",
    title: "Ads & Promos",
    description:
      "Fast, persuasive edits built to hold attention and drive action. From brand awareness to direct response.",
    detail:
      "Platform-ready ad formats for Meta, YouTube, and Google. Performance-first editing with clear CTAs and high-retention pacing.",
  },
  {
    id: "corporate",
    number: "03",
    title: "Corporate & Product Videos",
    description:
      "Clean, professional stories that explain your brand or product. Build credibility through exceptional storytelling.",
    detail:
      "Brand films, case studies, product showcases, testimonials, and company culture videos. Polished, professional, and always on-brand.",
  },
  {
    id: "podcasts",
    number: "04",
    title: "Podcast Editing",
    description:
      "Clear audio, smooth cuts and clips ready to share. Transform long-form conversations into engaging content.",
    detail:
      "Full episode editing, highlight clips, audiograms, and social-ready cuts. We handle the technical so you focus on the conversation.",
  },
  {
    id: "motion",
    number: "05",
    title: "Motion Graphics",
    description:
      "Animated titles, graphics and effects that lift your footage. Add a layer of polish that sets your content apart.",
    detail:
      "Kinetic typography, animated logos, lower thirds, intros/outros, backgrounds, and VFX integration. Pure cinematic polish.",
  },
];

export const faqs = [
  {
    q: "How long does an edit take?",
    a: "Most projects take 3–7 days, depending on length and complexity. Rush delivery is available for tight deadlines — just let us know.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes 2 rounds of revisions. Additional rounds can be added at a small fee — we always make sure you're happy with the final result.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept all major formats — MP4, MOV, AVI, WAV, MP3, and project files from Premiere, Final Cut, or DaVinci. Share via Google Drive, Dropbox, or WeTransfer.",
  },
  {
    q: "What formats will I receive?",
    a: "Platform-ready files in the aspect ratios you need: 9:16 for Reels/TikTok/Pinterest, 16:9 for YouTube, 1:1 for feeds. High-quality MP4, compressed to spec.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on video length, complexity, and turnaround time. Send us your brief and we'll give you a custom quote — usually within a few hours.",
  },
  {
    q: "Can I see samples in my specific style first?",
    a: "Absolutely. Browse our work above or message us on WhatsApp with your style reference — we'll share the most relevant samples from our portfolio.",
  },
];

export const process = [
  {
    step: "01",
    title: "Send Footage",
    description:
      "Share your raw files and a short brief via Google Drive, Dropbox, or WeTransfer. We'll confirm scope and turnaround within 24 hours.",
  },
  {
    step: "02",
    title: "We Edit",
    description:
      "Your dedicated editor shapes the story. First draft delivered within the agreed timeline — no delays, no excuses.",
  },
  {
    step: "03",
    title: "Review & Publish",
    description:
      "Request changes, approve the final cut, and receive platform-ready files in every format you need. Done.",
  },
];

export const contact = {
  email: "hello@zenerixmedia.com",
  whatsapp: "https://wa.me/919876543210",
  whatsappNumber: "+91 98765 43210",
  instagram: "https://instagram.com/zenerixmedia",
  linkedin: "https://linkedin.com/company/zenerixmedia",
  youtube: "https://youtube.com/@zenerixmedia",
  calendly: "https://calendly.com/zenerixmedia",
};

// The showreel is PORTFOILO.mp4 (ID: 1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB)
export const showreel = {
  id: "showreel",
  title: "Zenerix Media — Portfolio Showreel",
  tag: "SHOWREEL",
  aspect: "horizontal",
  fileId: "1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB",
  embedUrl: driveEmbed("1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB"),
  driveUrl: driveView("1RoIexFyfwdjxJzn49iX3E1bl0xklBiIB"),
};

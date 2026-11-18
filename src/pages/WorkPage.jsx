// ============================================================
// WorkPage.jsx — Dedicated Page for Selected Work & Demos
// ============================================================
import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import WorkSection from '../components/WorkSection';
import { projects } from '../data/projects';

const ContactSection = lazy(() => import('../components/ContactSection'));

function SectionPlaceholder({ minHeight = '300px' }) {
  return (
    <div
      style={{ minHeight }}
      className="w-full flex items-center justify-center bg-transparent"
      aria-hidden="true"
    />
  );
}

export default function WorkPage() {
  return (
    <main className="pt-24 sm:pt-28">
      {/* Work Page Hero Banner */}
      <section className="py-12 sm:py-16 border-b border-[#E6FBF6]/10 relative bg-gradient-to-b from-[#0C4137]/20 via-[#070A09] to-[#070A09]">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8AA49E] hover:text-[#06D6A0] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.7rem] uppercase tracking-widest text-[#06D6A0] mb-4">
                <Sparkles size={12} />
                <span>Full Video Showcase</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#E6FBF6] mb-4">
                Selected <em className="italic text-[#06D6A0]">Work & Demos</em>
              </h1>
              <p className="text-sm sm:text-base text-[#8AA49E] leading-relaxed">
                Explore our complete client work archive across widescreen cinema and high-retention short-form reels. Every project is cut, paced, and graded for maximum audience impact.
              </p>
            </div>

            <div className="flex items-center">
              <span className="text-xs font-mono font-medium uppercase tracking-widest px-4 py-2 border border-[#06D6A0]/20 rounded-full bg-[#0E1513]/80 text-[#06D6A0] shadow-[0_0_15px_rgba(6,214,160,0.15)]">
                {projects.length} Total Demos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Categorized Work Section (Single clean header above) */}
      <WorkSection showHeader={false} />

      {/* Contact Hub */}
      <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}

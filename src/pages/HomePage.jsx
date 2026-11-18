// ============================================================
// HomePage.jsx — Zenerix Media Home Experience
// ============================================================
import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

// Below-the-fold components
const ReelBand = lazy(() => import('../components/ReelBand'));
const StatsStrip = lazy(() => import('../components/StatsStrip'));
const HScrollGallery = lazy(() => import('../components/HScrollGallery'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const ProcessSection = lazy(() => import('../components/ProcessSection'));
const FAQSection = lazy(() => import('../components/FAQSection'));
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

export default function HomePage({ onWatchShowreel }) {
  return (
    <main>
      {/* Hero Section */}
      <Hero onWatchShowreel={onWatchShowreel} />

      {/* Marquee Reel Band */}
      <Suspense fallback={<SectionPlaceholder minHeight="60px" />}>
        <ReelBand />
      </Suspense>

      {/* Stats Counter & Clients */}
      <Suspense fallback={<SectionPlaceholder minHeight="200px" />}>
        <StatsStrip />
      </Suspense>

      {/* Featured Projects Carousel (With Link to Full Work Page) */}
      <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
        <HScrollGallery />
      </Suspense>

      {/* Marquee Reel Band Reverse */}
      <Suspense fallback={<SectionPlaceholder minHeight="60px" />}>
        <ReelBand reverse />
      </Suspense>

      {/* About Agency */}
      <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
        <AboutSection />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
        <ServicesSection />
      </Suspense>

      {/* Process Section */}
      <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
        <ProcessSection />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
        <FAQSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
        <ContactSection />
      </Suspense>
    </main>
  );
}

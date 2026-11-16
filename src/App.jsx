// ============================================================
// App.jsx — Optimized Root Component
// Zenerix Media Portfolio Website
// Uses React.lazy & Suspense for code splitting & lazy loading
// ============================================================
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './App.css';

// Above-the-fold critical components (loaded immediately)
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatsAppFloat from './components/WhatsAppFloat';
import { showreel as showreelProject } from './data/projects';

// Below-the-fold components (lazy loaded for optimal bundle size & performance)
const ReelBand = lazy(() => import('./components/ReelBand'));
const StatsStrip = lazy(() => import('./components/StatsStrip'));
const HScrollGallery = lazy(() => import('./components/HScrollGallery'));
const WorkSection = lazy(() => import('./components/WorkSection'));
const BeforeAfter = lazy(() => import('./components/BeforeAfter'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const VideoModal = lazy(() => import('./components/VideoModal'));

gsap.registerPlugin(ScrollTrigger);

// Fallback skeleton placeholder while lazy chunks resolve
function SectionPlaceholder({ minHeight = '300px' }) {
  return (
    <div
      style={{
        minHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showreel, setShowreel] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll after initial page load
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      autoRaf: false, // We sync with GSAP ticker below
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP's ticker for zero jitter
    const onTick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [loaded]);

  const handleLoaderComplete = () => {
    setLoaded(true);
  };

  return (
    <>
      {/* 1. Page Loader — Metallic Logo Mark reveal */}
      <PageLoader onComplete={handleLoaderComplete} />

      {/* 2. Custom Cursor — Emerald Glow (desktop only) */}
      <CustomCursor />

      {/* 3. WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* 4. Main Site */}
      <div className="App">
        <Navbar />

        <main>
          {/* Hero Section — critical above-the-fold */}
          <Hero onWatchShowreel={() => setShowreel(true)} />

          {/* Below-the-fold lazy-loaded sections */}
          <Suspense fallback={<SectionPlaceholder minHeight="60px" />}>
            <ReelBand />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="250px" />}>
            <StatsStrip />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
            <HScrollGallery />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="700px" />}>
            <WorkSection />
          </Suspense>

          {/* Interactive Before / After Transformation Slider (Blueprint 4.6) */}
          <Suspense fallback={<SectionPlaceholder minHeight="550px" />}>
            <BeforeAfter />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="60px" />}>
            <ReelBand reverse />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
            <ServicesSection />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
            <ProcessSection />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="400px" />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<SectionPlaceholder minHeight="600px" />}>
            <ContactSection />
          </Suspense>
        </main>

        <Suspense fallback={<SectionPlaceholder minHeight="200px" />}>
          <Footer />
        </Suspense>
      </div>

      {/* Showreel Fullscreen Modal (lazy loaded only on click) */}
      {showreel && (
        <Suspense fallback={null}>
          <VideoModal
            project={showreelProject}
            onClose={() => setShowreel(false)}
          />
        </Suspense>
      )}
    </>
  );
}

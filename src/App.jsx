// ============================================================
// App.jsx — Optimized Root Component with React Router DOM
// Zenerix Media Portfolio Website
// Uses React.lazy & Suspense for code splitting & lazy loading
// ============================================================
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Above-the-fold critical components (loaded immediately)
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import { showreel as showreelProject } from './data/projects';

// Below-the-fold lazy-loaded components
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
    <BrowserRouter>
      {/* Route change scroll position reset */}
      <ScrollToTop />

      {/* 1. Page Loader — Metallic Logo Mark reveal */}
      <PageLoader onComplete={handleLoaderComplete} />

      {/* 2. Custom Cursor — Emerald Glow (desktop only) */}
      <CustomCursor />

      {/* 3. WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* 4. Main Site Layout */}
      <div className="min-h-screen">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<HomePage onWatchShowreel={() => setShowreel(true)} />}
          />
          <Route path="/work" element={<WorkPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
    </BrowserRouter>
  );
}

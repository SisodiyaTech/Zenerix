// ============================================================
// App.jsx — Root component
// Zenerix Media Portfolio Website
// ============================================================
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import './App.css';

// Components
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ReelBand from './components/ReelBand';
import StatsStrip from './components/StatsStrip';
import HScrollGallery from './components/HScrollGallery';
import WorkSection from './components/WorkSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import VideoModal from './components/VideoModal';
import { showreel as showreelProject } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [showreel, setShowreel] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll after page loads
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
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

      {/* 2. Custom Cursor — Emerald Glow Cursor (desktop) */}
      <CustomCursor />

      {/* 3. WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* 4. Main Site */}
      <div className="App">
        <Navbar />

        <main>
          {/* Hero Section with particle canvas & ambient poster */}
          <Hero onWatchShowreel={() => setShowreel(true)} />

          {/* Cinematic service ticker */}
          <ReelBand />

          {/* Social proof counters + client logo marquee */}
          <StatsStrip />

          {/* Featured drag-to-scroll horizontal gallery */}
          <HScrollGallery />

          {/* Selected Work — 12-column asymmetric portfolio grid with real Drive videos */}
          <WorkSection />

          {/* Reverse marquee divider */}
          <ReelBand reverse />

          {/* About — Agency philosophy, editing suite & official emerald color palette */}
          <AboutSection />

          {/* Services — Expandable accordion rows */}
          <ServicesSection />

          {/* Process — 3-step connected timeline */}
          <ProcessSection />

          {/* FAQ — Common questions accordion */}
          <FAQSection />

          {/* Contact & CTA — Calendly booking, WhatsApp & query form */}
          <ContactSection />
        </main>

        {/* Footer with brand logos and quick navigation */}
        <Footer />
      </div>

      {/* Showreel Fullscreen Modal */}
      {showreel && (
        <VideoModal
          project={showreelProject}
          onClose={() => setShowreel(false)}
        />
      )}
    </>
  );
}

// ============================================================
// Navbar Component — Emerald Brand Edition
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.8 }
    );

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      // Hide on scroll down, show on scroll up
      if (y > lastScrollY.current && y > 200 && !hidden.current) {
        gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'power2.inOut' });
        hidden.current = true;
      } else if (y < lastScrollY.current && hidden.current) {
        gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.inOut' });
        hidden.current = false;
      }

      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        style={{ opacity: 0 }}
      >
        <a href="#hero" className="navbar-brand-link" onClick={(e) => handleNavClick(e, '#hero')}>
          <img
            src="/brand/logo-mark.png"
            alt="Zenerix Mark"
            className="navbar-logo-mark"
          />
          <img
            src="/brand/logo-wordmark.png"
            alt="Zenerix"
            className="navbar-logo-wordmark"
          />
        </a>

        <ul className="navbar-nav">
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="navbar-cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>

        <button
          className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <img
          src="/brand/logo-mark.png"
          alt="Zenerix"
          className="mobile-menu-mark"
        />
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
}

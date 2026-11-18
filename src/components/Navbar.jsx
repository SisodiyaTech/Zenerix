// ============================================================
// Navbar Component — Emerald Brand Edition
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
    gsap.fromTo(
      navRef.current,
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
        style={{ opacity: 0 }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 transition-all duration-400 ${
          scrolled
            ? 'bg-[#070A09]/90 backdrop-blur-xl border-b border-[#E6FBF6]/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <a
          href="#hero"
          className="group flex items-center gap-2.5 shrink-0"
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <img
            src="/brand/logo-mark.png"
            alt="Zenerix Mark"
            className="h-8 max-h-8 w-auto max-w-[34px] object-contain drop-shadow-[0_0_10px_rgba(6,214,160,0.35)] group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(6,214,160,0.6)] transition-all"
          />
          <img
            src="/brand/logo-wordmark.png"
            alt="Zenerix"
            className="h-[18px] max-h-[18px] w-auto max-w-[110px] object-contain opacity-95"
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative font-sans text-xs uppercase tracking-widest text-[#8AA49E] hover:text-[#E6FBF6] transition-colors py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#06D6A0] shadow-[0_0_8px_#06D6A0] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#070A09] bg-[#06D6A0] hover:bg-[#09D5A0] px-6 py-2.5 rounded transition-all shadow-[0_0_15px_rgba(6,214,160,0.25)] hover:shadow-[0_0_25px_rgba(6,214,160,0.5)] hover:-translate-y-0.5"
        >
          Let's Talk
        </a>

        {/* Mobile Toggle */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-[#E6FBF6] transition-transform duration-300 origin-center ${
              menuOpen ? 'translate-y-2 rotate-45 !bg-[#06D6A0]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#E6FBF6] transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#E6FBF6] transition-transform duration-300 origin-center ${
              menuOpen ? '-translate-y-2 -rotate-45 !bg-[#06D6A0]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        className={`fixed inset-0 z-40 bg-[#070A09]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 transition-all duration-400 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <img
          src="/brand/logo-mark.png"
          alt="Zenerix"
          className="w-14 h-auto drop-shadow-[0_0_20px_rgba(6,214,160,0.4)] mb-4"
        />
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="font-serif text-3xl font-light text-[#E6FBF6] hover:text-[#06D6A0] tracking-wide transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-[#070A09] bg-[#06D6A0] px-8 py-3.5 rounded shadow-[0_0_20px_rgba(6,214,160,0.3)]"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
}

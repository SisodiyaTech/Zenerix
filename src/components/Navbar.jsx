// ============================================================
// Navbar Component — Emerald Brand Edition
// Styled with Tailwind CSS & React Router DOM
// ============================================================
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const navLinks = [
  { label: 'Demo', to: '/demo', isRoute: true },
  { label: 'Services', to: '#services', isRoute: false },
  { label: 'Process', to: '#process', isRoute: false },
  { label: 'About', to: '#about', isRoute: false },
  { label: 'Contact', to: '#contact', isRoute: false },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMenuOpen(false);

    if (link.isRoute) {
      navigate(link.to);
      return;
    }

    // Anchor navigation
    if (location.pathname !== '/') {
      navigate(`/${link.to}`);
    } else {
      const target = document.querySelector(link.to);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{ opacity: 0 }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 lg:px-16 transition-all duration-400 ${
          scrolled || location.pathname === '/demo' || location.pathname === '/work'
            ? 'bg-[#070A09]/90 backdrop-blur-xl border-b border-[#E6FBF6]/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <Link
          to="/"
          onClick={handleBrandClick}
          className="group flex items-center gap-2.5 shrink-0"
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
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => {
            const isDemoActive =
              link.isRoute &&
              (location.pathname === '/demo' || location.pathname === '/work');
            return (
              <li key={link.label}>
                <a
                  href={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`group relative font-sans text-xs uppercase tracking-widest transition-colors py-1 ${
                    isDemoActive
                      ? 'text-[#06D6A0] font-medium'
                      : 'text-[#8AA49E] hover:text-[#E6FBF6]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#06D6A0] shadow-[0_0_8px_#06D6A0] transition-all duration-300 ${
                      isDemoActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, { to: '#contact', isRoute: false })}
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
          className="w-14 h-auto max-w-[56px] object-contain drop-shadow-[0_0_20px_rgba(6,214,160,0.4)] mb-4"
        />
        {navLinks.map((link) => {
          const isDemoActive =
            link.isRoute &&
            (location.pathname === '/demo' || location.pathname === '/work');
          return (
            <a
              key={link.label}
              href={link.to}
              onClick={(e) => handleNavClick(e, link)}
              className={`font-serif text-3xl font-light tracking-wide transition-colors ${
                isDemoActive
                  ? 'text-[#06D6A0]'
                  : 'text-[#E6FBF6] hover:text-[#06D6A0]'
              }`}
            >
              {link.label}
            </a>
          );
        })}
        <a
          href="#contact"
          className="mt-4 font-sans text-xs font-semibold uppercase tracking-wider text-[#070A09] bg-[#06D6A0] px-8 py-3.5 rounded shadow-[0_0_20px_rgba(6,214,160,0.3)]"
          onClick={(e) => handleNavClick(e, { to: '#contact', isRoute: false })}
        >
          Let's Talk
        </a>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-4 bg-charcoal-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
        : 'py-6 bg-transparent'
    }`} id="navbar">
      <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-3 no-underline">
          <img 
            src="/assets/zenerix text logo.png" 
            alt="Zenerix Logo" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex list-none gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-silver hover:text-white uppercase tracking-[1px] text-[0.9rem] font-medium transition-all duration-300 relative py-1
                  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-electric-blue after:transition-all after:duration-300 hover:after:w-full hover:after:shadow-[0_0_8px_#00A3FF]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <div 
          className="md:hidden text-white text-2xl cursor-pointer select-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`ph ${isMobileMenuOpen ? 'ph-x' : 'ph-list'}`}></i>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <ul className="flex md:hidden flex-col absolute top-full left-0 w-full bg-charcoal-black/95 backdrop-blur-md p-8 border-b border-white/10 gap-6 list-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fadeIn">
          {navLinks.map((link) => (
            <li key={link.name} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
              <a 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-silver hover:text-white uppercase tracking-[1px] text-[0.9rem] font-medium transition-all duration-300 block"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

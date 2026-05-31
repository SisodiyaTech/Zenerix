

export default function Footer() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal-black border-t border-white/10 pt-20">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Block */}
        <div className="flex flex-col gap-6">
          <a href="#home" onClick={(e) => handleScroll(e, '#home')} className="inline-block">
            <img 
              src="/assets/zenerix text logo.png" 
              alt="Zenerix Logo" 
              className="h-10 w-auto"
            />
          </a>
          <p className="text-silver text-sm max-w-[300px] leading-relaxed">
            A high-end futuristic creative agency elevating modern brands through cinematic content and digital growth.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/zenerix_official/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-electric-blue hover:-translate-y-1 transition-all duration-300 text-2xl"
            >
              <i className="ph ph-instagram-logo"></i>
            </a>
            <a 
              href="https://x.com/zenerix_media" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-electric-blue hover:-translate-y-1 transition-all duration-300 text-2xl"
            >
              <i className="ph ph-twitter-logo"></i>
            </a>
            <a 
              href="#" 
              className="text-white hover:text-electric-blue hover:-translate-y-1 transition-all duration-300 text-2xl"
            >
              <i className="ph ph-linkedin-logo"></i>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61589973603211" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-electric-blue hover:-translate-y-1 transition-all duration-300 text-2xl"
            >
              <i className="ph ph-facebook-logo"></i>
            </a>
          </div>
        </div>

        {/* Agency Links */}
        <div>
          <h4 className="text-white text-lg font-bold font-heading mb-6">Agency</h4>
          <ul className="list-none flex flex-col gap-3 p-0 m-0">
            <li>
              <a href="#about" onClick={(e) => handleScroll(e, '#about')} className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Services
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={(e) => handleScroll(e, '#portfolio')} className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Work
              </a>
            </li>
            <li>
              <a href="#" className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-white text-lg font-bold font-heading mb-6">Legal</h4>
          <ul className="list-none flex flex-col gap-3 p-0 m-0">
            <li>
              <a href="#" className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-silver hover:text-electric-blue transition-colors duration-300 no-underline text-sm">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Links */}
        <div>
          <h4 className="text-white text-lg font-bold font-heading mb-6">Contact</h4>
          <div className="flex flex-col gap-4">
            <p className="text-silver text-sm flex items-center gap-2 m-0">
              <i className="ph ph-envelope-simple text-electric-blue text-lg"></i>
              zenerixmedia@gmail.com
            </p>
            <p className="text-silver text-sm flex items-center gap-2 m-0">
              <i className="ph ph-map-pin text-electric-blue text-lg"></i>
              Bhopal, Madhya Pradesh
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-white/10 py-8 text-center text-silver/50 text-xs">
        <div className="max-w-[1280px] mx-auto px-8">
          <p className="m-0">&copy; 2026 Zenerix Creative Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// Footer Component — Emerald Edition
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { contact } from '../data/projects';

const quickLinks = [
  { label: 'Work Portfolio', href: '/work', isRoute: true },
  { label: 'Editing Services', href: '#services', isRoute: false },
  { label: 'Workflow Process', href: '#process', isRoute: false },
  { label: 'Agency Philosophy', href: '#about', isRoute: false },
  { label: 'Start a Project', href: '#contact', isRoute: false },
];

const socials = [
  { label: 'Instagram', href: contact.instagram },
  { label: 'X (Twitter)', href: contact.x },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'Facebook', href: contact.facebook },
  { label: 'WhatsApp', href: contact.whatsapp },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (e, link) => {
    e.preventDefault();
    if (link.isRoute) {
      navigate(link.href);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/${link.href}`);
    } else {
      const target = document.querySelector(link.href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-16 pb-12 border-t border-[#E6FBF6]/10 relative bg-[#070A09]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16 pb-14 border-b border-[#E6FBF6]/10">
          {/* Brand */}
          <div className="md:col-span-2 max-w-md">
            <Link
              to="/"
              onClick={handleBrandClick}
              className="inline-flex items-center gap-2.5 mb-5 cursor-pointer"
            >
              <img
                src="/brand/logo-mark.png"
                alt="Zenerix Mark"
                className="h-8 max-h-8 w-auto max-w-[34px] object-contain drop-shadow-[0_0_10px_rgba(6,214,160,0.35)]"
              />
              <img
                src="/brand/logo-wordmark.png"
                alt="Zenerix"
                className="h-[18px] max-h-[18px] w-auto max-w-[110px] object-contain opacity-95"
              />
            </Link>
            <p className="text-sm text-[#8AA49E] leading-relaxed">
              Premium video editing agency for brands, creators, and marketers who demand cinematic retention.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#06D6A0] mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link)}
                    className="text-sm text-[#8AA49E] hover:text-[#E6FBF6] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Direct Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#06D6A0] mb-5">
              Connect
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#8AA49E] hover:text-[#06D6A0] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-[#E6FBF6] hover:text-[#06D6A0] transition-colors font-medium"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-wrap justify-between items-center gap-4 text-xs text-[#8AA49E]">
          <p>© 2026 Zenerix Media. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#E6FBF6] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#E6FBF6] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

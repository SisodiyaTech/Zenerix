// ============================================================
// Footer Component — Emerald Edition
// ============================================================
import { contact } from '../data/projects';
import './Footer.css';

const quickLinks = [
  { label: 'Work Portfolio', href: '#work' },
  { label: 'Editing Services', href: '#services' },
  { label: 'Workflow Process', href: '#process' },
  { label: 'Agency Philosophy', href: '#about' },
  { label: 'Start a Project', href: '#contact' },
];

const socials = [
  { label: 'Instagram', href: contact.instagram },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'YouTube', href: contact.youtube },
  { label: 'WhatsApp', href: contact.whatsapp },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logos">
              <img
                src="/brand/logo-mark.png"
                alt="Zenerix Mark"
                className="footer-logo-mark"
              />
              <img
                src="/brand/logo-wordmark.png"
                alt="Zenerix"
                className="footer-logo-wordmark"
              />
            </div>
            <p className="footer-tagline">
              Premium video editing agency for brands, creators, and marketers who demand cinematic retention.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-links">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="footer-col-title">Connect</p>
            <ul className="footer-links">
              {socials.map(s => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} Zenerix Media. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

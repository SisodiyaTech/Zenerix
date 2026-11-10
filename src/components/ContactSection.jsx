// ============================================================
// Contact Section — CTA + Query Form
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Calendar } from 'lucide-react';
import { contact } from '../data/projects';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  'Short-form / Reels',
  'Ads & Promos',
  'Corporate & Product Videos',
  'Podcast Editing',
  'Motion Graphics',
  'Other / Not sure yet',
];

export default function ContactSection() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo('.contact-grid',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: send to backend/email service
    console.log('Form submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="container">
        {/* CTA Band */}
        <div className="cta-band" ref={ctaRef} style={{ opacity: 0 }}>
          <div className="cta-bg" />
          <span className="cta-eyebrow">Ready to start?</span>
          <h2 className="cta-headline">
            Got footage?<br />
            Let's make it <em>unforgettable.</em>
          </h2>
          <p className="cta-sub">Send footage, get back a polished edit — on time, every time.</p>

          <div className="cta-actions">
            <a
              href={contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              <Calendar size={14} />
              Book a Call
            </a>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Grid: Info + Form */}
        <div className="contact-grid" style={{ opacity: 0 }}>
          {/* Info */}
          <div className="contact-info">
            <h3>Or send us<br />a <em>message</em></h3>

            <div className="contact-detail">
              <div className="contact-item">
                <span className="contact-item-label">Email</span>
                <a href={`mailto:${contact.email}`} className="contact-item-value">
                  {contact.email}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-item-label">WhatsApp</span>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-item-value">
                  {contact.whatsappNumber}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-item-label">Response Time</span>
                <span className="contact-item-value">Within 24 hours</span>
              </div>
            </div>

            <div className="contact-socials">
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="social-link">YouTube</a>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="form-success">
                ✓ Thanks! We'll reply within 24 hours.
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name *</label>
                    <input
                      id="name" name="name" type="text" required
                      className="form-input"
                      placeholder="Your name"
                      value={form.name} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input
                      id="email" name="email" type="email" required
                      className="form-input"
                      placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp</label>
                    <input
                      id="phone" name="phone" type="tel"
                      className="form-input"
                      placeholder="+91 ..."
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="service">Service Needed *</label>
                    <select
                      id="service" name="service" required
                      className="form-select"
                      value={form.service} onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message" name="message"
                    className="form-textarea"
                    placeholder="Tell us about your project — what do you need edited? What's the vibe?"
                    value={form.message} onChange={handleChange}
                  />
                </div>

                {/* Honeypot spam protection */}
                <input type="text" name="_trap" style={{ display: 'none' }} tabIndex={-1} />

                <button type="submit" className="form-submit">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}


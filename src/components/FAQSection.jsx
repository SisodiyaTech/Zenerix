// ============================================================
// FAQ Section
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { faqs } from '../data/projects';
import './FAQSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const sectionRef = useRef(null);
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-left',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo('.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="container">
        <div className="faq-inner">
          {/* Left sticky */}
          <div className="faq-left" style={{ opacity: 0 }}>
            <p className="label" style={{ marginBottom: '1rem' }}>FAQ</p>
            <h2 className="faq-left-title">
              Common<br /><em>Questions</em>
            </h2>
            <p className="faq-left-desc">
              Everything you need to know before we start working together.
              Can't find your answer? Message us on WhatsApp — we reply fast.
            </p>
          </div>

          {/* FAQ list */}
          <div className="faq-list">
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openItem === i ? 'open' : ''}`}
                style={{ opacity: 0 }}
              >
                <div
                  className="faq-question"
                  onClick={() => setOpenItem(prev => prev === i ? null : i)}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <div className="faq-icon">
                    <Plus size={12} />
                  </div>
                </div>

                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p className="faq-a-text">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


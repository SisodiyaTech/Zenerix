// ============================================================
// Services Section — Accordion rows
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { services } from '../data/projects';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Stagger rows
      gsap.fromTo('.service-row',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-list',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (id) => {
    setOpenRow(prev => prev === id ? null : id);
  };

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="services-header" ref={headerRef} style={{ opacity: 0 }}>
          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>What We Do</p>
            <h2 className="services-title">
              Our <em>Services</em>
            </h2>
          </div>
          <p className="services-intro">
            From viral short-form reels to cinematic brand films — we handle
            every format, every platform. One edit partner for your entire
            video content operation.
          </p>
        </div>

        {/* Service Rows */}
        <div className="services-list">
          {services.map(service => (
            <div
              key={service.id}
              className={`service-row ${openRow === service.id ? 'active' : ''}`}
            >
              <div
                className="service-row-header"
                onClick={() => toggle(service.id)}
                role="button"
                aria-expanded={openRow === service.id}
              >
                <span className="service-number">{service.number}</span>
                <span className="service-name">{service.title}</span>
                <div className="service-toggle">
                  <Plus size={14} />
                </div>
              </div>

              <div className="service-body">
                <div className="service-body-inner">
                  <div className="service-body-content">
                    <div className="service-desc-col">
                      <p className="service-short">{service.description}</p>
                      <p className="service-detail">{service.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


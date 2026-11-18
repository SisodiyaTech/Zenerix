// ============================================================
// Services Section — Accordion Rows
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Sparkles } from 'lucide-react';
import { services } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [openRow, setOpenRow] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.service-row',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 md:py-24 border-t border-[#E6FBF6]/10 relative" id="services" ref={sectionRef}>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div
          className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16"
          ref={headerRef}
          style={{ opacity: 0 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.68rem] uppercase tracking-widest text-[#06D6A0] mb-3">
              <Sparkles size={11} />
              <span>What We Do</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#E6FBF6]">
              Our <em className="italic text-[#06D6A0]">Services</em>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#8AA49E] max-w-md leading-relaxed">
            From viral short-form reels to cinematic brand films — we handle
            every format, every platform. One edit partner for your entire
            video content operation.
          </p>
        </div>

        {/* Service Rows */}
        <div className="services-list divide-y divide-[#E6FBF6]/10 border-y border-[#E6FBF6]/10">
          {services.map((service) => {
            const isOpen = openRow === service.id;
            return (
              <div
                key={service.id}
                className="service-row group transition-colors duration-300"
              >
                <div
                  className="flex items-center justify-between py-6 sm:py-8 cursor-pointer select-none"
                  onClick={() => toggle(service.id)}
                  role="button"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span className="font-mono text-xs text-[#06D6A0] tracking-wider">
                      {service.number}
                    </span>
                    <h3 className="font-serif text-xl sm:text-3xl font-light text-[#E6FBF6] group-hover:text-[#06D6A0] transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full border border-[#E6FBF6]/10 flex items-center justify-center text-[#8AA49E] group-hover:border-[#06D6A0]/40 group-hover:text-[#06D6A0] transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#06D6A0]/10 text-[#06D6A0]' : ''
                    }`}
                  >
                    <Plus size={16} />
                  </div>
                </div>

                {/* Collapsible Body */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-12 sm:pl-20 max-w-3xl flex flex-col gap-3">
                    <p className="text-sm sm:text-base text-[#E6FBF6] font-normal leading-relaxed">
                      {service.description}
                    </p>
                    <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed">
                      {service.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

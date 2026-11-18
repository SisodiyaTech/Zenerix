// ============================================================
// FAQ Section
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Sparkles } from 'lucide-react';
import { faqs } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function FAQSection() {
  const sectionRef = useRef(null);
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-left',
        { x: -30, opacity: 0 },
        {
          x: 0,
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
        '.faq-item',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
    <section className="py-16 md:py-24 border-t border-[#E6FBF6]/10 relative" id="faq" ref={sectionRef}>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="faq-left lg:col-span-5" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.68rem] uppercase tracking-widest text-[#06D6A0] mb-3">
              <Sparkles size={11} />
              <span>FAQ</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#E6FBF6] mb-5">
              Common<br />
              <em className="italic text-[#06D6A0]">Questions</em>
            </h2>
            <p className="text-sm sm:text-base text-[#8AA49E] leading-relaxed max-w-md">
              Everything you need to know before we start working together.
              Can't find your answer? Message us on WhatsApp — we reply fast.
            </p>
          </div>

          {/* Right Column FAQ List */}
          <div className="faq-list lg:col-span-7 divide-y divide-[#E6FBF6]/10 border-y border-[#E6FBF6]/10">
            {faqs.map((item, i) => {
              const isOpen = openItem === i;
              return (
                <div
                  key={i}
                  className="faq-item group transition-colors"
                  style={{ opacity: 0 }}
                >
                  <div
                    className="flex justify-between items-center py-5 sm:py-6 cursor-pointer select-none gap-4"
                    onClick={() => setOpenItem((prev) => (prev === i ? null : i))}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal text-[#E6FBF6] group-hover:text-[#06D6A0] transition-colors">
                      {item.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full border border-[#E6FBF6]/10 flex items-center justify-center text-[#8AA49E] group-hover:text-[#06D6A0] group-hover:border-[#06D6A0]/30 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-45 text-[#06D6A0] bg-[#06D6A0]/10' : ''
                      }`}
                    >
                      <Plus size={14} />
                    </div>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-60 pb-6 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed pr-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

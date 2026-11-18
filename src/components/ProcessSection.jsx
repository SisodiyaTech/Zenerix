// ============================================================
// Process Section — 3-step Horizontal Layout
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { process } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-24 border-t border-[#E6FBF6]/10 relative" id="process" ref={sectionRef}>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div ref={titleRef} style={{ opacity: 0 }} className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.68rem] uppercase tracking-widest text-[#06D6A0] mb-3">
            <Sparkles size={11} />
            <span>How It Works</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-[#E6FBF6]">
            Simple. Fast. <em className="italic text-[#06D6A0]">Polished.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {process.map((step, i) => (
            <div
              key={step.step}
              className="bg-[#0E1513] border border-[#E6FBF6]/10 rounded-xl p-8 flex flex-col relative transition-all duration-300 hover:border-[#06D6A0]/30 hover:-translate-y-1"
              ref={(el) => (stepsRef.current[i] = el)}
              style={{ opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/30 text-[#06D6A0] font-mono text-sm font-semibold flex items-center justify-center mb-6">
                {step.step}
              </div>

              <h3 className="font-serif text-2xl font-light text-[#E6FBF6] mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#8AA49E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

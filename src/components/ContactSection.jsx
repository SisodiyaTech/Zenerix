// ============================================================
// Contact Section — Showcase CTA & Direct Connect Hub
// Styled with Tailwind CSS (Zero external CSS dependency)
// ============================================================
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Calendar, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { contact } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="py-16 md:py-24 border-t border-[#E6FBF6]/10 relative"
      id="contact"
      ref={sectionRef}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Main Showcase CTA Banner */}
        <div
          className="text-center py-16 sm:py-24 px-6 sm:px-12 relative overflow-hidden bg-gradient-to-b from-[#0C4137]/35 to-[#070A09]/80 border border-[#06D6A0]/20 rounded-2xl mb-12 sm:mb-16"
          ref={ctaRef}
          style={{ opacity: 0 }}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(6,214,160,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06D6A0]/10 border border-[#06D6A0]/20 text-[0.7rem] uppercase tracking-widest text-[#06D6A0] mb-5">
            <Sparkles size={12} />
            <span>Ready for your next production?</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-[#E6FBF6] mb-4">
            Got raw footage?<br />
            Let's make it <em className="italic text-[#06D6A0]">unforgettable.</em>
          </h2>

          <p className="text-sm sm:text-base text-[#8AA49E] max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
            Direct collaboration with dedicated senior video editors. Fast turnaround, precision sound, and viral pacing.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#070A09] bg-[#25D366] hover:bg-[#1eb956] px-7 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(37,211,102,0.4)]"
            >
              <MessageCircle size={16} />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2.5 font-sans text-xs font-medium tracking-wide text-[#E6FBF6] bg-[#141E1B] hover:bg-[#1A2824] hover:text-[#06D6A0] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-7 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            >
              <Mail size={16} />
              <span>{contact.email}</span>
            </a>

            <a
              href={contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-xs font-medium uppercase tracking-wider text-[#8AA49E] hover:text-white border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-6 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5"
            >
              <Calendar size={15} />
              <span>Book Discovery Call</span>
            </a>
          </div>
        </div>

        {/* Direct Connect Hub Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          ref={cardsRef}
        >
          {/* Card 1: WhatsApp */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#0E1513] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 rounded-xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-12px_rgba(6,214,160,0.12)] text-inherit"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                <MessageCircle size={22} />
              </span>
              <ArrowUpRight
                size={18}
                className="text-[#8AA49E] group-hover:text-[#06D6A0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <span className="text-[0.65rem] font-medium tracking-widest uppercase text-[#06D6A0] mb-1.5">
                Instant Messaging
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#E6FBF6] mb-2">
                WhatsApp Direct
              </h3>
              <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed mb-6">
                Fastest way to get in touch. Share sample references, ask questions, or request availability.
              </p>
              <span className="text-sm font-medium text-white pt-4 border-t border-[#E6FBF6]/10 mt-auto">
                {contact.whatsappNumber}
              </span>
            </div>
          </a>

          {/* Card 2: Email Direct */}
          <a
            href={`mailto:${contact.email}`}
            className="group bg-[#0E1513] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 rounded-xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-12px_rgba(6,214,160,0.12)] text-inherit"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#06D6A0]/10 text-[#06D6A0] border border-[#06D6A0]/20">
                <Mail size={22} />
              </span>
              <ArrowUpRight
                size={18}
                className="text-[#8AA49E] group-hover:text-[#06D6A0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <span className="text-[0.65rem] font-medium tracking-widest uppercase text-[#06D6A0] mb-1.5">
                Project Briefs
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#E6FBF6] mb-2">
                Direct Email
              </h3>
              <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed mb-6">
                Send your script, project details, drive links, or commercial scopes directly to our inbox.
              </p>
              <span className="text-sm font-medium text-white pt-4 border-t border-[#E6FBF6]/10 mt-auto">
                {contact.email}
              </span>
            </div>
          </a>

          {/* Card 3: Social Showcase */}
          <div className="bg-[#0E1513] border border-[#E6FBF6]/10 rounded-xl p-7 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="w-11 h-11 rounded-lg flex items-center justify-center bg-white/5 text-[#E6FBF6] border border-white/10">
                <Sparkles size={22} />
              </span>
            </div>
            <div className="flex flex-col flex-grow">
              <span className="text-[0.65rem] font-medium tracking-widest uppercase text-[#06D6A0] mb-1.5">
                Follow Along
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#E6FBF6] mb-2">
                Social Channels
              </h3>
              <p className="text-xs sm:text-sm text-[#8AA49E] leading-relaxed mb-6">
                See our latest editing breakdowns, client milestones, and behind-the-scenes techniques.
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E6FBF6]/10 mt-auto">
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8AA49E] hover:text-[#06D6A0] bg-[#141E1B] hover:bg-[#1A2824] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-3 py-1.5 rounded transition-all"
                >
                  Instagram
                </a>
                <a
                  href={contact.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8AA49E] hover:text-[#06D6A0] bg-[#141E1B] hover:bg-[#1A2824] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-3 py-1.5 rounded transition-all"
                >
                  X (Twitter)
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8AA49E] hover:text-[#06D6A0] bg-[#141E1B] hover:bg-[#1A2824] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-3 py-1.5 rounded transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8AA49E] hover:text-[#06D6A0] bg-[#141E1B] hover:bg-[#1A2824] border border-[#E6FBF6]/10 hover:border-[#06D6A0]/30 px-3 py-1.5 rounded transition-all"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

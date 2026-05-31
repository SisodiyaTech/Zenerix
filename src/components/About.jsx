
import Reveal from './Reveal';
import StatCounter from './StatCounter';

export default function About() {
  return (
    <section id="about" className="py-32 bg-gradient-to-b from-transparent to-deep-navy/30 relative">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <Reveal>
          <div className="about-content">
            <h2 className="text-white text-5xl font-bold tracking-tight mb-6 font-heading">
              The <span className="text-gradient">Zenerix</span> Standard
            </h2>
            <p className="text-white text-xl font-medium mb-6 leading-relaxed">
              A modern creative agency helping brands grow through content, branding, and digital marketing.
            </p>
            <p className="text-silver text-base mb-10 leading-relaxed">
              We believe in the intersection of aesthetics and analytics. Our team builds digital experiences
              that don't just look luxurious, but are fundamentally engineered to drive unparalleled growth.
            </p>

            <div className="grid grid-cols-3 gap-6 border-l border-neon-blue/20 pl-0">
              <div className="border-l-2 border-neon-blue pl-4 md:pl-6">
                <StatCounter target="150" suffix="+" />
                <p className="text-silver text-xs md:text-sm uppercase tracking-wider">Brands Scaled</p>
              </div>
              <div className="border-l-2 border-neon-blue pl-4 md:pl-6">
                <StatCounter target="50" suffix="M+" />
                <p className="text-silver text-xs md:text-sm uppercase tracking-wider">Total Views</p>
              </div>
              <div className="border-l-2 border-neon-blue pl-4 md:pl-6">
                <StatCounter target="99" suffix="%" />
                <p className="text-silver text-xs md:text-sm uppercase tracking-wider">Client ROI</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Graphic Visual */}
        <Reveal>
          <div className="relative flex justify-center items-center">
            <div className="w-full h-[500px] bg-surface-gradient border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute w-[200px] h-[200px] bg-neon-blue/30 blur-[80px] rounded-full opacity-30"></div>
              <div className="w-[70%] h-[70%] border border-electric-blue/20 rounded-full absolute animate-spin-slow 
                before:absolute before:inset-[-20px] before:border before:border-dashed before:border-silver/20 before:rounded-full 
                after:absolute after:inset-[20px] after:border after:border-neon-blue/30 after:rounded-full after:animate-spin-slow-reverse">
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

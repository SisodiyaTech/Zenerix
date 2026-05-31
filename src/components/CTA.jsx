
import Reveal from './Reveal';

export default function CTA() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-32">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <div className="bg-surface-gradient border border-electric-blue/30 rounded-xl py-20 px-8 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-[600px] mx-auto">
              <h2 className="text-white text-4xl md:text-[3.5rem] font-bold mb-4 font-heading leading-tight">
                Ready to Build Your <span className="text-gradient">Brand?</span>
              </h2>
              <p className="text-silver text-lg md:text-xl mb-10">
                Let's engineer a digital presence that dominates your industry.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, '#contact')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-semibold text-base transition-all duration-300 cursor-pointer border-none bg-primary-gradient text-white shadow-[0_4px_15px_rgba(0,102,255,0.3)] hover:shadow-neon-glow hover:-translate-y-0.5"
                >
                  Get Started <i className="ph ph-rocket-launch"></i>
                </a>
                <a 
                  href="mailto:zenerixmedia@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-semibold text-base transition-all duration-300 cursor-pointer bg-transparent text-white border border-electric-blue hover:bg-electric-blue/10 hover:shadow-[inset_0_0_10px_rgba(0,163,255,0.2)] hover:-translate-y-0.5"
                >
                  Contact Us <i className="ph ph-envelope-simple"></i>
                </a>
              </div>
            </div>
            
            {/* Radial glow background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,_rgba(0,163,255,0.15)_0%,_transparent_70%)] z-0 pointer-events-none"></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

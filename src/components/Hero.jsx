

export default function Hero() {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-[80px] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 w-full hero-content z-10 relative">
        <div className="badge fade-in-up inline-block px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-electric-blue text-sm font-semibold uppercase tracking-wider mb-6 shadow-[inset_0_0_10px_rgba(0,163,255,0.1)]">
          Welcome to the Future
        </div>
        <h1 className="fade-in-up delay-1 text-white text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] font-heading">
          Building Brands That<br />
          <span className="text-gradient">Capture Attention</span>
        </h1>
        <p className="fade-in-up delay-2 text-silver text-lg md:text-xl max-w-[600px] mb-10">
          We merge cutting-edge design with strategic growth to elevate your brand.
          Specializing in high-impact content creation, branding, and digital scaling.
        </p>
        <div className="hero-ctas flex flex-wrap gap-4 fade-in-up delay-3">
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, '#contact')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-semibold text-base transition-all duration-300 cursor-pointer border-none bg-primary-gradient text-white shadow-[0_4px_15px_rgba(0,102,255,0.3)] hover:shadow-neon-glow hover:-translate-y-0.5"
          >
            Get Started <i className="ph ph-arrow-right"></i>
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => handleScroll(e, '#portfolio')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-semibold text-base transition-all duration-300 cursor-pointer bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-electric-blue hover:-translate-y-0.5"
          >
            View Work <i className="ph ph-play-circle text-lg"></i>
          </a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 pointer-events-none hidden lg:block">
        <div className="absolute bg-surface-gradient border border-white/10 backdrop-blur-md rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] w-[400px] h-[400px] top-[50px] right-[50px] animate-morph-slow-1 shadow-[0_0_40px_rgba(0,163,255,0.1)]"></div>
        <div className="absolute bg-neon-blue/10 border border-neon-blue/20 backdrop-blur-md rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] w-[300px] h-[300px] bottom-[20px] left-[20px] animate-morph-slow-2"></div>
      </div>
    </section>
  );
}

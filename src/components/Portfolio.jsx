
import Reveal from './Reveal';

export default function Portfolio() {
  const projects = [
    {
      title: 'Nexus AI',
      category: 'Brand Identity & Web',
      gradient: 'from-[#1A1F2B] to-[#0D0F14]'
    },
    {
      title: 'Aura Dynamics',
      category: 'Content Strategy',
      gradient: 'from-[#0D0F14] to-[#1A1F2B]'
    },
    {
      title: 'Vellora',
      category: 'Short-form Video',
      gradient: 'from-[#1A1F2B] to-[#001f3f]'
    },
    {
      title: 'Quantum Capital',
      category: 'Digital Transformation',
      gradient: 'from-[#0D0F14] to-[#003366]'
    }
  ];

  return (
    <section id="portfolio" className="py-32">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-white text-5xl font-bold tracking-tight mb-4 font-heading">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-silver text-lg max-w-[600px] mx-auto">
            A glimpse into our cinematic digital experiences.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Reveal key={index}>
              <div className="group rounded-lg overflow-hidden relative aspect-video cursor-pointer border border-white/10">
                {/* Visual Background with scale effect */}
                <div className={`w-full h-full bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`}></div>
                
                {/* Slide up overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-black/90 to-transparent flex flex-col justify-end p-8 opacity-0 translate-y-5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <h4 className="text-white text-2xl font-bold mb-1 font-heading">{project.title}</h4>
                  <p className="text-electric-blue text-sm uppercase tracking-wider font-semibold">{project.category}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <a 
            href="#" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-heading font-semibold text-base transition-all duration-300 cursor-pointer bg-transparent text-white border border-electric-blue hover:bg-electric-blue/10 hover:shadow-[inset_0_0_10px_rgba(0,163,255,0.2)] hover:-translate-y-0.5"
          >
            View All Projects
          </a>
        </Reveal>
      </div>
    </section>
  );
}

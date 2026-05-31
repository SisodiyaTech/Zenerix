
import Reveal from './Reveal';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Zenerix completely transformed our digital presence. Their attention to futuristic aesthetics and high-retention content skyrocketed our engagement by 300% in just two months.",
      client: "Sarah Jenkins",
      title: "CMO, NovaTech"
    },
    {
      quote: "The level of premium quality they deliver is unmatched. From our initial rebrand to the daily short-form videos, everything feels cinematic and luxurious.",
      client: "Marcus Chen",
      title: "Founder, Elevate AI"
    },
    {
      quote: "Working with Zenerix feels like stepping into the future. Their strategies are data-driven but incredibly creative. Truly a luxury digital agency.",
      client: "Elena Rostova",
      title: "Director, Vesper Luxe"
    }
  ];

  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/10">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-white text-5xl font-bold tracking-tight font-heading">
            Client <span className="text-gradient">Feedback</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Reveal key={index}>
              <div className="bg-surface-gradient border border-white/10 rounded-lg p-10 backdrop-blur-md transition-all duration-300 hover:border-electric-blue/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] h-full flex flex-col justify-between">
                <div>
                  <div className="text-[2rem] text-neon-blue mb-6 opacity-50">
                    <i className="ph-fill ph-quotes"></i>
                  </div>
                  <p className="text-[1.1rem] italic mb-8 text-white font-light leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full border-2 border-electric-blue bg-[#1A1F2B]"></div>
                  <div>
                    <h5 className="text-white text-base font-semibold mb-0.5">{t.client}</h5>
                    <span className="text-silver text-xs uppercase tracking-wider block">{t.title}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

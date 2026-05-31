
import Reveal from './Reveal';

export default function Services() {
  const services = [
    {
      icon: 'ph-video-camera',
      title: 'Short-form Video',
      description: 'High-retention, cinematic video editing designed to maximize engagement and virality.'
    },
    {
      icon: 'ph-browser',
      title: 'Website Development',
      description: 'Modern, high-performance websites designed for strong brand presence, smooth user experience, and higher customer engagement.'
    },
    {
      icon: 'ph-instagram-logo',
      title: 'Social Presence Branding',
      description: 'Strategic and visually consistent social media branding designed to strengthen online presence, increase recognition, and build a modern digital identity.'
    },
    {
      icon: 'ph-strategy',
      title: 'Online Marketing Strategy',
      description: 'Growth-focused digital marketing strategies designed to increase brand visibility, audience engagement, and long-term online presence.'
    },
    {
      icon: 'ph-megaphone',
      title: 'Creative Ad Campaigns',
      description: 'High-converting visual ad creatives designed to capture attention, strengthen brand identity, and drive audience engagement across digital platforms.'
    },
    {
      icon: 'ph-trend-up',
      title: 'SEO Optimization',
      description: 'Search-focused optimization strategies designed to improve website visibility, increase organic traffic, and help brands rank higher across search engines.'
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-white text-5xl font-bold tracking-tight mb-4 font-heading">
            Our <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-silver text-lg max-w-[600px] mx-auto">
            Comprehensive digital solutions engineered for modern growth.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={index}>
              <div className="group relative overflow-hidden bg-surface-gradient border border-white/10 rounded-lg p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,163,255,0.1)] hover:border-electric-blue/30 h-full">
                {/* Scale line on top */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-gradient origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></div>
                
                <div className="text-[2.5rem] text-electric-blue mb-6 inline-block drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]">
                  <i className={`ph ${service.icon}`}></i>
                </div>
                <h3 className="text-white text-xl font-bold mb-4 font-heading">{service.title}</h3>
                <p className="text-silver text-[0.95rem] leading-relaxed">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



export default function BgEffects() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 top-[-200px] left-[-200px] bg-neon-blue animate-float-slow"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 bottom-[-200px] right-[-200px] bg-electric-blue animate-float-slow-reverse"></div>
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
}

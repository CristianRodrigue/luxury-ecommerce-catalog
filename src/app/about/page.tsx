import Hero from "@/components/Hero";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Cinematic Hero for About Page - Increased scale and darker vibe */}
      <Hero 
        videoSrc="/videos/about-bg.mp4"
        height="h-[85vh]"
        posterImage="/p4p_about.png"
        title={
          <h1 className="font-serif text-8xl md:text-[15rem] leading-none tracking-tighter mb-8 italic text-white/90">P4P</h1>
        }
        subtitle="The Philosophy"
        ctaText=""
        overlayOpacity="bg-gradient-to-b from-black/10 via-black/30 to-black"
      />

      {/* Masculine, High-End Storytelling - More "Air" and larger typography */}
      <section className="max-w-7xl mx-auto px-6 py-48 md:py-64 space-y-48">
        <div className="max-w-4xl space-y-12">
          <h2 className="font-sans text-[10px] uppercase tracking-[0.8em] text-foreground/20 border-b border-foreground/5 pb-6 inline-block uppercase">The Philosophy</h2>
          <p className="font-serif text-4xl md:text-7xl leading-[1.1] tracking-tight">
            We don't build for the masses. We build for the <span className="italic">elite few</span> who treat every session as a <span className="italic text-foreground underline underline-offset-[16px] decoration-foreground/10">battlefield</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="aspect-[4/5] bg-zinc-900 border border-white/5 relative overflow-hidden grayscale -rotate-1 hover:rotate-0 transition-transform duration-1000">
             <img 
               src="/p4p_about.png" 
               className="object-cover w-full h-full opacity-90 transition-opacity duration-700 group-hover:opacity-100"
               alt="P4P Technical Precision"
             />
          </div>
          <div className="space-y-12 flex flex-col justify-center">
             <h3 className="font-serif text-4xl md:text-5xl italic tracking-tight">Technical Precision</h3>
             <div className="space-y-8 max-w-md">
                <p className="font-sans text-sm font-light leading-relaxed text-foreground/40 tracking-[0.1em]">
                  Inspired by the aggressive engineering of Italian supercars and the uncompromising heritage of British luxury. P4P is the "Ferrari" of combat streetwear. 
                </p>
                <p className="font-sans text-sm font-light leading-relaxed text-foreground/40 tracking-[0.1em]">
                  Engineered with military-grade fabrics that maintain a sharp silhouette from the boardroom to the locker room. Tier-One quality, zero compromises.
                </p>
             </div>
          </div>
        </div>

        {/* Global Standard section with absolute air */}
        <div className="text-center py-40 border-t border-foreground/5 relative">
           <div className="font-serif text-[10rem] md:text-[25rem] text-foreground/[0.03] tracking-tighter absolute left-1/2 -top-20 -translate-x-1/2 select-none pointer-events-none uppercase italic">
              Legacy
           </div>
           <h4 className="font-sans text-[10px] uppercase tracking-[1.2em] text-foreground/20 relative z-10">Unapologetic Excellence</h4>
        </div>
      </section>
    </div>
  );
}

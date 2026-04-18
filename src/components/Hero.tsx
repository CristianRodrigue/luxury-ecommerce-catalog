'use client';

import Link from 'next/link';
import { ReactNode, useEffect, useState, useRef } from 'react';

interface HeroProps {
  videoSrc?: string;
  posterImage?: string;
  title?: ReactNode;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  height?: string;
  overlayOpacity?: string;
}

export default function Hero({
  videoSrc,
  posterImage,
  title,
  subtitle = "Built for the Grind",
  ctaText = "Explore Now",
  ctaLink = "/shop",
  height = "h-screen",
  overlayOpacity = "bg-black/60"
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && videoRef.current && videoSrc) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented:", error);
        });
      }
    }
  }, [mounted, videoSrc]);

  return (
    <section 
      onClick={() => videoRef.current?.play()}
      className={`relative w-full ${height} flex items-center justify-center bg-black overflow-hidden cursor-pointer`}
    >
      {/* Background Overlay - Dark Cinematic Grade */}
      <div className={`absolute inset-0 ${overlayOpacity} z-10 transition-colors duration-1000`} />
      
      {/* Background Content */}
      <div className="absolute inset-0 bg-zinc-900">
        {mounted && videoSrc ? (
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterImage}
            className="w-full h-full object-cover animate-slow-zoom"
          />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-80 animate-slow-zoom"
            style={{ backgroundImage: `url('${posterImage || '/flat_lay_gi.png'}')` }}
          />
        )}
      </div>

      <div className="relative z-20 text-center px-4 flex flex-col items-center">
        {subtitle && (
          <h2 className="text-white/70 uppercase tracking-[0.3em] font-sans text-[10px] md:text-sm mb-6 
                         border border-white/20 px-6 py-2 rounded-full backdrop-blur-md">
            {subtitle}
          </h2>
        )}
        
        {title || (
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-10">
            UNLEASH THE <br /> <span className="italic text-gray-300">CHAMPION</span>
          </h1>
        )}
        
        {ctaText && (
          <Link href={ctaLink} className="inline-block font-sans uppercase text-black bg-white px-12 py-5 text-[11px] md:text-sm tracking-[0.4em] font-bold 
                           hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            {ctaText}
          </Link>
        )}
      </div>

      {/* Industrial Grain Texture Overlay */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-[0.03] select-none mix-blend-overlay">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </section>
  );
}

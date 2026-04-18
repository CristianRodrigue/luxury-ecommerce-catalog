'use client';

import { Suspense, useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Link from 'next/link';
import FilterBar from "@/components/FilterBar";
import FilterDrawer from "@/components/FilterDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBarVisible, setIsBarVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the bar when scrolled past 600px (approaching the content)
      if (window.scrollY > 600) {
        setIsBarVisible(true);
      } else {
        setIsBarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="!bg-black !text-white overflow-x-hidden">
      <Suspense fallback={null}>
        {/* Scroll-Triggered Filter Bar for Home */}
        <AnimatePresence>
          {isBarVisible && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 md:top-20 inset-x-0 z-[45]"
            >
              <FilterBar 
                isHome={true}
                onFilterClick={() => setIsFilterOpen(true)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <FilterDrawer 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
          hideSort={true}
          forceDark={true}
        />
      </Suspense>

      <Hero 
        videoSrc="/videos/hero-bg.mp4"
        posterImage="/flat_lay_gi.png"
        overlayOpacity="bg-black/40"
        ctaText="Explore Now"
      />

      {/* Featured Callouts - Masculine, High-Impact (Ferrari feeling) */}
      <section className="max-w-screen-2xl mx-auto px-6 py-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Link href="/collections/staples" className="group relative h-[85vh] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
             <img 
               src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 p-16 flex flex-col justify-end z-20">
                <span className="font-sans text-[10px] uppercase tracking-[1em] text-white/40 mb-6 ml-2 block">The Standard</span>
                <h2 className="font-serif text-7xl md:text-9xl tracking-tighter italic uppercase underline underline-offset-[24px] decoration-white/5">STAPLES</h2>
             </div>
          </Link>
          <Link href="/collections/limited" className="group relative h-[85vh] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
             <img 
               src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-20">
                <span className="font-sans text-[10px] uppercase tracking-[1em] text-white/40 mb-6 ml-2 block">Elite Tier</span>
                <h2 className="font-serif text-6xl md:text-9xl tracking-tighter italic uppercase underline underline-offset-[24px] decoration-white/5 whitespace-nowrap">Limited</h2>
             </div>
          </Link>
        </div>
      </section>

      {/* Cinematic Brand Section - Final Tier One Statement */}
      <section className="py-64 text-center border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-fixed bg-cover opacity-[0.03] grayscale" />
         <div className="relative z-10">
            <h3 className="font-serif text-5xl md:text-8xl italic mb-20 max-w-5xl mx-auto px-6 leading-[1.1] tracking-tight">
              "Victory is reserved for those <span className="text-white underline decoration-white/20 underline-offset-8">willing to pay</span> its price."
            </h3>
            <Link 
              href="/shop" 
              className="inline-block font-sans text-[11px] uppercase tracking-[1em] border border-white px-20 py-6 hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-sm ml-[1em]"
            >
              Enter The Shop
            </Link>
         </div>
      </section>
    </div>
  );
}

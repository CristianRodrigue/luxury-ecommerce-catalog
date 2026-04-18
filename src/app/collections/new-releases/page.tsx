'use client';

import { Suspense, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import FilterDrawer from "@/components/FilterDrawer";
import Hero from "@/components/Hero";

export default function NewReleasesPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Cinematic Hero for New Releases */}
      <Hero 
        videoSrc="/videos/about-bg.mp4" 
        height="h-[70vh]"
        posterImage="/p4p_about.png"
        title={
          <h1 className="font-serif text-7xl md:text-9xl leading-none tracking-tighter mb-8 italic text-white/90">New Releases</h1>
        }
        subtitle="The Latest Drops / Tier-One Evolution"
        ctaText="Scroll to Shop"
        overlayOpacity="bg-black/50"
      />

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-foreground/20 uppercase tracking-widest text-xs">Loading Latest Drops...</div>}>
        <FilterBar 
          productCount={productCount} 
          onFilterClick={() => setIsFilterOpen(true)} 
        />

        <FilterDrawer 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />

        <section className="max-w-screen-2xl mx-auto px-6 py-24">
          <ProductGrid 
            isNewOnly={true} 
            onCountChange={setProductCount} 
          />
        </section>
      </Suspense>
    </div>
  );
}

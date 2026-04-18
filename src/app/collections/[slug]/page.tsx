'use client';

import { Suspense, useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import FilterDrawer from "@/components/FilterDrawer";
import { notFound, useParams } from "next/navigation";

const slugToTitle: Record<string, string> = {
  "staples": "Staples",
  "accessories": "Accessories",
  "limited": "Limited",
  "combat-gear": "Combat Gear",
  "streetwear": "Streetwear",
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const title = slugToTitle[slug];
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);

  if (!title) {
    // Handling non-existent slug in client component
    return null; 
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-screen-2xl mx-auto px-6 py-24 md:py-32">
        <h1 className="font-serif text-6xl md:text-9xl mb-8 tracking-tighter uppercase italic">{title}</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.8em] text-foreground/20 ml-2">
          Precision Engineered / {title}
        </p>
      </section>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-foreground/20 uppercase tracking-widest text-xs">Filtering Inventory...</div>}>
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
            categoryOverride={title} 
            onCountChange={setProductCount}
          />
        </section>
      </Suspense>
    </div>
  );
}

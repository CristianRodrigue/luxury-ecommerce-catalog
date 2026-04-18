'use client';

import { Suspense, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterBar from "@/components/FilterBar";
import FilterDrawer from "@/components/FilterDrawer";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [productCount, setProductCount] = useState(0);

  return (
    <div className="min-h-screen">
      <section className="max-w-screen-2xl mx-auto px-6 pt-32 pb-12">
        <h1 className="font-serif text-5xl md:text-7xl mb-4 tracking-tight">Shop All</h1>
        <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-foreground/30">
          The Full P4P Inventory
        </p>
      </section>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-foreground/20 uppercase tracking-widest text-xs">Loading Inventory...</div>}>
        <FilterBar 
          productCount={productCount} 
          onFilterClick={() => setIsFilterOpen(true)} 
        />

        <FilterDrawer 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)} 
        />

        <section className="max-w-screen-2xl mx-auto px-6 py-24">
          <ProductGrid onCountChange={setProductCount} />
        </section>
      </Suspense>
    </div>
  );
}

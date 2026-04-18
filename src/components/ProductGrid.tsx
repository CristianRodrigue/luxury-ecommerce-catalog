'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

interface ProductGridProps {
  categoryOverride?: string;
  isNewOnly?: boolean;
  onCountChange?: (count: number) => void;
}

export default function ProductGrid({ categoryOverride, isNewOnly, onCountChange }: ProductGridProps) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const category = categoryOverride || (mounted ? searchParams.get('category') : null);
  const sort = mounted ? (searchParams.get('sort') || 'newest') : 'newest';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (category && category !== 'All Collections') {
      result = result.filter(p => p.type.toLowerCase() === category.toLowerCase());
    }

    // 2. Filter by New Releases
    if (isNewOnly) {
      result = result.filter(p => p.isNew);
    }

    // 3. Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [category, sort, isNewOnly]);

  // Update parent with count for the Filter Bar
  useEffect(() => {
    if (mounted && onCountChange) {
      onCountChange(filteredProducts.length);
    }
  }, [filteredProducts.length, mounted, onCountChange]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/products/${product.id}`} className="group cursor-pointer flex flex-col h-full">
                {/* Image Container with aspect ratio */}
                <div className="relative aspect-[4/5] w-full overflow-hidden mb-6 transition-opacity duration-500 bg-zinc-950/5">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center z-10 transition-transform duration-1000 ease-out group-hover:scale-105"
                    unoptimized
                  />
                  
                  {/* NEW Badge - BoxRaw style */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-20 bg-foreground text-background font-sans text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-1">
                      New
                    </div>
                  )}
                  
                  {/* Overlay on hover - Subtle Boxraw Style CTA */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex justify-center">
                    <button className="font-sans uppercase text-[10px] tracking-[0.3em] bg-transparent border border-white text-white px-6 py-2 w-full max-w-[200px] hover:bg-white hover:text-black transition-colors">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Product Details - Kith Style Typography (Airy, Minimalist) */}
                <div className="flex flex-col space-y-2 px-1">
                  <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-foreground/40">
                    {product.type}
                  </span>
                  <h4 className="font-serif text-lg text-foreground/90">
                    {product.name}
                  </h4>
                  <span className="font-sans text-xs tracking-widest text-foreground/50 w-full mt-auto pt-2">
                    ${product.price}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

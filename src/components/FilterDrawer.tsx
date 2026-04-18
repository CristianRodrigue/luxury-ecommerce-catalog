'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hideSort?: boolean;
  forceDark?: boolean;
}

export default function FilterDrawer({ isOpen, onClose, hideSort = false, forceDark = false }: FilterDrawerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const currentCategory = mounted ? (searchParams.get('category') || 'All Collections') : 'All Collections';
  const currentSort = mounted ? (searchParams.get('sort') || 'newest') : 'newest';

  const categories = [
    { label: "All Collections", slug: "all" },
    { label: "Staples", slug: "staples" },
    { label: "Accessories", slug: "accessories" },
    { label: "Limited", slug: "limited" },
    { label: "Combat Gear", slug: "combat-gear" },
    { label: "Streetwear", slug: "streetwear" }
  ];

  const handleCategoryClick = (slug: string) => {
    if (slug === 'all') {
      router.push('/shop');
    } else {
      router.push(`/collections/${slug}`);
    }
    onClose(); // Auto-close as requested
  };

  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
    onClose(); // Auto-close as requested
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full max-w-sm h-full border-l shadow-2xl flex flex-col pt-24 ${
              forceDark ? 'bg-black text-white border-white/10' : 'bg-background text-foreground border-foreground/5'
            }`}
          >
            <div className="flex items-center justify-between px-8 mb-12">
              <h2 className={`font-sans text-[10px] uppercase tracking-[0.5em] ${forceDark ? 'opacity-50' : 'opacity-30'}`}>Filter & Sort</h2>
              <button onClick={onClose} className={`${forceDark ? 'text-white/40 hover:text-white' : 'text-foreground/40 hover:text-foreground'} p-2 text-xl`}>✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 space-y-16 pb-20">
              {/* Categories */}
              <section>
                <h3 className="font-sans text-[9px] uppercase tracking-[0.3em] opacity-20 mb-8">Collections</h3>
                <ul className="space-y-6">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <button 
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`text-left font-serif text-3xl transition-all duration-300 transform origin-left hover:scale-105 ${
                          currentCategory.toLowerCase() === cat.label.toLowerCase() 
                            ? 'italic opacity-100' 
                            : 'opacity-40 hover:opacity-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Sort - Hidden in hideSort mode (Home page) */}
              {!hideSort && (
                <section>
                  <h3 className="font-sans text-[9px] uppercase tracking-[0.3em] opacity-20 mb-8">Precision Sort</h3>
                  <div className="flex flex-col space-y-4">
                    {[
                      { label: 'Newest Arrivals', value: 'newest' },
                      { label: 'Price: High-End First', value: 'price-desc' },
                      { label: 'Price: Entry Level', value: 'price-asc' },
                    ].map((option) => (
                      <button 
                        key={option.value}
                        onClick={() => handleSortClick(option.value)}
                        className={`text-left font-serif text-xl transition-all duration-300 ${
                          currentSort === option.value ? 'italic opacity-100' : 'opacity-40 hover:opacity-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className={`p-8 border-t ${forceDark ? 'border-white/10' : 'border-foreground/5'}`}>
              <button 
                onClick={onClose}
                className={`w-full font-sans uppercase text-[10px] tracking-[0.3em] py-4 hover:opacity-90 transition-opacity ${
                  forceDark ? 'bg-white text-black' : 'bg-foreground text-background'
                }`}
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

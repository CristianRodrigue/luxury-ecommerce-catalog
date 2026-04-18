'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useState, useEffect } from 'react';

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
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
  };

  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full md:w-64 pb-8 md:pr-12 border-b md:border-b-0 md:border-r border-card-border">
      <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-30 mb-8">
        Inventory
      </h3>
      <ul className="space-y-6 font-serif text-xl opacity-70">
        {categories.map((cat, i) => (
          <li key={i}>
            <button 
              onClick={() => handleCategoryClick(cat.slug)}
              className={`text-left block transition-all duration-500 transform origin-left hover:scale-105 hover:opacity-100 ${
                currentCategory.toLowerCase() === cat.label.toLowerCase() 
                  ? 'italic opacity-100 underline underline-offset-8 decoration-current/20' 
                  : 'hover:italic'
              }`}
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-30 mb-8">
          Precision Sort
        </h3>
        <div className="flex flex-col space-y-4 font-sans text-[11px] tracking-[0.2em] uppercase opacity-50">
          {[
            { label: 'Newest Arrivals', value: 'newest' },
            { label: 'Price: High-End First', value: 'price-desc' },
            { label: 'Price: Entry Level', value: 'price-asc' },
          ].map((option) => (
            <button 
              key={option.value}
              onClick={() => handleSortClick(option.value)}
              className={`text-left transition-all duration-300 hover:opacity-100 ${
                currentSort === option.value ? 'opacity-100 font-bold tracking-[0.3em]' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

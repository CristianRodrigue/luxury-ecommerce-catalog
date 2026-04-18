'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Product, products } from '@/data/products';
import Link from 'next/link';

export default function ProductClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.image,
    });
  };

  // Get 3 random recommended products
  const recommendedProducts = products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12 lg:py-24 text-foreground">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32">
        {/* Gallery Section - Left */}
        <div className="flex-grow space-y-8 lg:w-3/5">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover object-center" priority unoptimized />
          </div>
        </div>

        {/* Info Section - Right */}
        <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit space-y-12">
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-40">{product.type}</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">{product.name}</h1>
            <p className="font-sans text-xl opacity-60 tracking-widest">${product.price}</p>
          </div>

          <div className="space-y-8">
            <p className="font-sans text-sm leading-relaxed opacity-70 max-w-md">{product.description}</p>

            <div className="space-y-4">
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40">Select Size</h3>
              <div className="flex flex-wrap gap-4">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border flex items-center justify-center font-sans text-xs tracking-widest transition-all duration-300
                      ${selectedSize === size 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-foreground/10 hover:border-foreground/40 text-foreground/60 hover:text-foreground'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-foreground text-background font-sans font-bold uppercase py-5 tracking-[0.3em] text-sm hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
              >
                {selectedSize ? 'Add To Cart' : 'Select a Size'}
              </button>
              <p className="text-center font-sans text-[9px] uppercase tracking-[0.2em] opacity-30">Free Shipping on Orders Over $200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="border-t border-foreground/10 pt-20">
        <h2 className="font-serif text-3xl mb-12 text-center">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {recommendedProducts.map(rec => (
            <Link key={rec.id} href={`/products/${rec.id}`} className="group block">
              <div className="relative aspect-[4/5] bg-transparent w-full overflow-hidden mb-4 transition-opacity group-hover:opacity-80">
                <Image src={rec.image} alt={rec.name} fill className="object-cover" unoptimized/>
              </div>
              <h4 className="font-serif text-lg opacity-90 text-center">{rec.name}</h4>
              <p className="font-sans text-xs tracking-widest opacity-50 text-center mt-2">${rec.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>

  );
}

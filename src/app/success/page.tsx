'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function SuccessPage() {
  const { cart, removeFromCart } = useCart();
  
  // Clear cart on successful order
  useEffect(() => {
    cart.forEach(item => removeFromCart(item.id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-2xl text-foreground">
        <h2 className="font-sans text-[10px] uppercase tracking-[0.4em] opacity-50 mb-6 border-b border-foreground/10 pb-4 inline-block">
          Transaction Complete
        </h2>
        
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-none mb-8">
          ORDER <span className="italic opacity-40">CONFIRMED.</span>
        </h1>
        
        <p className="font-sans text-xl md:text-2xl opacity-80 tracking-widest uppercase mb-4">
          Welcome to the Club.
        </p>
        
        <p className="font-sans text-sm opacity-40 leading-relaxed mb-16">
          Your gear is being prepared for battle. An email confirmation has been sent to your inbox.
        </p>

        <Link href="/">
          <button className="bg-foreground text-background font-sans font-bold uppercase px-12 py-5 tracking-[0.3em] text-sm hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
            Return to Frontline
          </button>
        </Link>
      </div>
    </div>

  );
}

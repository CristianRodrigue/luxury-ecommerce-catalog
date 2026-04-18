'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { cart, removeFromCart, isDrawerOpen, setIsDrawerOpen } = useCart();

  const cartTotal = cart.reduce((total, item) => total + (parseInt(item.price) * item.quantity), 0);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-background text-foreground h-full flex flex-col border-l border-foreground/10 shadow-2xl"
          >
        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
          <h2 className="font-serif text-2xl tracking-widest uppercase">Your Bag</h2>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="opacity-50 hover:opacity-100 transition-opacity p-2"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40 font-sans uppercase tracking-widest text-xs">
              <p>Your bag is empty.</p>
              <button onClick={() => setIsDrawerOpen(false)} className="text-foreground underline hover:no-underline">Continue Shopping</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-24 h-32 bg-background border border-foreground/5 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized/>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-lg">{item.name}</h3>
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-50 mt-1">Size: {item.size}</p>
                    <p className="font-sans text-[10px] uppercase tracking-widest opacity-50 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm">${item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="font-sans text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-foreground/10 space-y-6 bg-background">
            <div className="flex justify-between font-sans uppercase tracking-widest text-sm">
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsDrawerOpen(false)} className="block w-full">
              <button className="w-full bg-foreground text-background font-sans font-bold uppercase py-5 tracking-[0.3em] text-sm hover:opacity-90 transition-all shadow-lg">
                Checkout
              </button>
            </Link>
          </div>
        )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

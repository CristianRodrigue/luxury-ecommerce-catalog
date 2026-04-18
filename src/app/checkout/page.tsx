'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function CheckoutPage() {
  const { cart, cartCount } = useCart();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use 'dark' as default before mounting to prevent flicker, 
  // though the page is mostly and naturally dark.
  const currentTheme = !mounted ? 'dark' : theme;

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: ''
  });
  const [error, setError] = useState('');

  const subtotal = cart.reduce((total, item) => total + (parseInt(item.price) * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSimulatePayment = () => {
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city) {
      setError('Por favor, completa toda la información de envío antes de proceder al pago.');
      return;
    }
    setError('');
    setTimeout(() => {
      router.push('/success');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-16 text-foreground">
      {/* Left Column - User Info & Payment */}
      <div className="space-y-12">
        <div>
          <h1 className="font-serif text-3xl font-bold uppercase tracking-widest mb-8">Checkout</h1>
          <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6 border-b border-foreground/10 pb-2">1. Shipping Information</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-900/10 dark:bg-red-900/30 border border-red-500/50 text-red-600 dark:text-red-200 text-sm font-sans tracking-wide">
              {error}
            </div>
          )}

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="bg-transparent border border-foreground/10 p-4 font-sans text-sm outline-none focus:border-foreground w-full transition-colors" />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="bg-transparent border border-foreground/10 p-4 font-sans text-sm outline-none focus:border-foreground w-full transition-colors" />
            </div>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="bg-transparent border border-foreground/10 p-4 font-sans text-sm outline-none focus:border-foreground w-full transition-colors" />
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="bg-transparent border border-foreground/10 p-4 font-sans text-sm outline-none focus:border-foreground w-full transition-colors" />
          </form>
        </div>

        <div>
          <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6 border-b border-foreground/10 pb-2">2. Payment Method</h2>
          <div className="space-y-4">
            <div 
              onClick={handleSimulatePayment}
              className="w-full bg-[#FFC439] hover:bg-[#F4BB33] transition-colors cursor-pointer h-12 flex items-center justify-center rounded-sm"
            >
              <span className="text-[#003087] font-bold italic tracking-wide text-lg">Pay</span>
              <span className="text-[#0079C1] font-bold italic tracking-wide text-lg">Pal</span>
            </div>
            
            <div 
              onClick={handleSimulatePayment}
              className="w-full bg-[#0052FF] hover:bg-[#0045D8] transition-colors cursor-pointer h-12 flex items-center justify-center rounded-sm space-x-2"
            >
               <span className="text-white font-bold tracking-wide text-sm">Pay with Crypto</span>
            </div>
          </div>
          <p className="text-center font-sans text-[9px] uppercase tracking-[0.2em] opacity-30 mt-4">
            (Payments are in Sandbox mode)
          </p>
        </div>
      </div>

      {/* Right Column - Order Summary - THEMED BOX */}
      <div className={`p-8 border h-fit sticky top-32 transition-all duration-500 shadow-xl ${
        currentTheme === 'light' ? 'bg-[#F2F2F2] border-black/5' : 'bg-[#0A0A0A] border-white/5'
      }`}>
        <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 mb-8 border-b border-foreground/10 pb-2">Order Summary ({cartCount} items)</h2>
        
        <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-20 bg-background flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized/>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-sm">{item.name}</h3>
                  <p className="font-sans text-[9px] uppercase tracking-widest opacity-40 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                </div>
                <span className="font-sans text-xs">${item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 font-sans text-sm tracking-widest border-t border-foreground/10 pt-8">
          <div className="flex justify-between opacity-60">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between opacity-60">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-4 border-t border-foreground/10">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

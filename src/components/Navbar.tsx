'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const { cartCount, setIsDrawerOpen } = useCart();
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when shifting routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const currentCategory = mounted ? searchParams.get('category') : null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isHeroPage = pathname === '/' || pathname === '/about' || pathname === '/collections/new-releases';
  const displayTheme = !mounted ? 'dark' : theme;
  const isContrastMode = (isScrolled || !isHeroPage) && displayTheme === 'light' && pathname !== '/';
  
  const textColor = isContrastMode ? 'text-black' : 'text-white';
  const subTextColor = isContrastMode ? 'text-black/50' : 'text-white/50';
  const actionColor = isContrastMode ? 'text-black/80' : 'text-white/80';

  const navLinks = [
    { label: "New Releases", href: "/collections/new-releases" },
    { label: "Shop All", href: "/shop", isAll: true },
    { label: "Staples", href: "/collections/staples", category: "Staples" },
    { label: "Limited", href: "/collections/limited", category: "Limited" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
        animate={{
          backgroundColor: isScrolled 
            ? (displayTheme === 'dark' || pathname === '/' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(250, 250, 250, 0.95)') 
            : 'rgba(0, 0, 0, 0)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomColor: isScrolled 
            ? (displayTheme === 'dark' || pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') 
            : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full fixed top-0 z-50 border-b transition-none"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* MOBILE MENU TRIGGER */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 -ml-2 transition-colors duration-500 ${textColor}`}
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col space-y-1.5 w-6">
                <motion.div 
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`h-[1px] w-full bg-current`}
                />
                <motion.div 
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`h-[1px] w-full bg-current`}
                />
                <motion.div 
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`h-[1px] w-full bg-current`}
                />
              </div>
            </button>

            {/* LOGO */}
            <Link href="/" className={`font-sans font-bold text-2xl md:text-3xl tracking-widest uppercase transition-colors duration-500 ${textColor}`}>
              P4P
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className={`hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.4em] font-medium transition-colors duration-500 ${subTextColor}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`hover:opacity-100 transition-all duration-300 ${
                  (link.isAll && !currentCategory && mounted && pathname === '/shop') ||
                  (link.category && currentCategory === link.category)
                    ? 'opacity-100' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className={`flex items-center space-x-6 text-sm uppercase tracking-widest font-sans transition-colors duration-500 ${actionColor}`}>
            {pathname !== '/' && mounted && (
              <button 
                onClick={toggleTheme}
                className={`flex text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] font-medium items-center space-x-2 border px-2 md:px-3 py-1 md:py-1.5 transition-all duration-500 ${isContrastMode ? 'border-black/10 hover:border-black/40' : 'border-white/10 hover:border-white/40'}`}
              >
                <span className={theme === 'dark' ? 'opacity-100' : 'opacity-30'}>DRK</span>
                <span className="opacity-10">/</span>
                <span className={theme === 'light' ? 'opacity-100' : 'opacity-30'}>LGT</span>
              </button>
            )}

            <button onClick={() => setIsDrawerOpen(true)} className="hover:opacity-100 transition-opacity">
              Bag ({mounted ? cartCount : '0'})
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[49] md:hidden flex flex-col pt-32 px-10 ${
              displayTheme === 'dark' ? 'bg-black text-white' : 'bg-[#FAFAFA] text-black'
            }`}
          >
            <div className="flex flex-col space-y-10">
              <span className="font-sans text-[10px] uppercase tracking-[0.5em] opacity-30 mb-4">Universe Navigation</span>
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`font-serif text-5xl tracking-tighter transition-all duration-500 ${
                    (link.isAll && !currentCategory && pathname === '/shop') ||
                    (link.category && currentCategory === link.category)
                      ? 'italic opacity-100 underline decoration-current/30 underline-offset-8' : 'opacity-60'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-20 border-t border-current/10 flex flex-col space-y-8">
                <span className="font-sans text-[10px] uppercase tracking-[0.5em] opacity-30">Theme Preferences</span>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center space-x-6 text-left"
                >
                  <span className={`font-serif text-2xl ${displayTheme === 'dark' ? 'italic opacity-100' : 'opacity-30'}`}>Dark Ferrari</span>
                  <span className="opacity-10">/</span>
                  <span className={`font-serif text-2xl ${displayTheme === 'light' ? 'italic opacity-100' : 'opacity-30'}`}>Bone White</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

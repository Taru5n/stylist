'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStylistStore } from '@/stores/stylist-store';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Get Styled', href: '/questionnaire' },
  { label: 'Try-On Studio', href: '/try-on' },
  { label: 'Wardrobe', href: '/wardrobe' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { menuOpen, setMenuOpen } = useStylistStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-700',
          scrolled
            ? 'bg-ivory/80 backdrop-blur-xl border-b border-border/30'
            : 'bg-transparent'
        )}
      >
        <div className="page-padding flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
                <span className="text-ivory text-xs font-display font-bold">M</span>
              </div>
              <span className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                MINES
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group font-body text-sm tracking-wide text-ink/70 hover:text-ink transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Menu */}
          <div className="flex items-center gap-6">
            <Link
              href="/questionnaire"
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-ink text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold transition-colors duration-500"
            >
              Start Styling
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative z-[110] w-8 h-8 flex flex-col items-end justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                className="block h-[1.5px] bg-ink origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="block h-[1.5px] w-4 bg-ink"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 16 }}
                className="block h-[1.5px] bg-ink origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] bg-ivory flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl md:text-5xl text-ink hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-ink-muted text-sm tracking-wide">
                Your AI Personal Stylist
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

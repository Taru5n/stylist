'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/Animations';

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="page-padding py-20 md:py-32">
        {/* Large CTA */}
        <FadeIn>
          <div className="mb-20 md:mb-32">
            <h2 className="font-display text-display-md md:text-display-lg text-ivory/90 max-w-4xl">
              Ready to discover your{' '}
              <span className="italic text-gold">signature style</span>?
            </h2>
            <div className="mt-8">
              <Link
                href="/questionnaire"
                className="inline-flex items-center gap-3 text-gold hover:text-gold-light text-lg tracking-wide group transition-colors duration-300"
              >
                Begin Your Journey
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6 font-body font-medium">
              Experience
            </h4>
            <ul className="space-y-3">
              {['Style Discovery', 'AI Analysis', 'Virtual Try-On', 'Smart Wardrobe'].map((item) => (
                <li key={item}>
                  <Link href="/questionnaire" className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6 font-body font-medium">
              About
            </h4>
            <ul className="space-y-3">
              {['Our Story', 'Technology', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6 font-body font-medium">
              Connect
            </h4>
            <ul className="space-y-3">
              {['Instagram', 'Pinterest', 'Twitter', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300 cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-ivory/40 mb-6 font-body font-medium">
              Newsletter
            </h4>
            <p className="text-sm text-ivory/50 mb-4 leading-relaxed">
              Curated style insights, delivered weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-ivory/20 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="px-5 py-2.5 bg-gold text-ink text-xs uppercase tracking-wider font-medium hover:bg-gold-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-ivory/10">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
              <span className="text-ink text-[10px] font-display font-bold">M</span>
            </div>
            <span className="font-display text-lg text-ivory/70">MINES</span>
          </div>
          <p className="text-xs text-ivory/30 tracking-wide">
            © {new Date().getFullYear()} MINES. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShieldCheck } from 'lucide-react';

interface HeroSpecialSpotlightProps {
  imageSrc?: string;
}

export function HeroSpecialSpotlight({
  imageSrc = '/images/fashion/hero_special_look.jpg',
}: HeroSpecialSpotlightProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group flex justify-center items-center">
      {/* 1. Ambient Golden Aura Glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-gold/40 via-amber-200/30 to-gold/40 rounded-[2.5rem] blur-2xl pointer-events-none z-0"
        animate={{
          scale: isHovered ? 1.12 : [1, 1.05, 1],
          opacity: isHovered ? 0.9 : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 2. Rotating Conic Gradient Border Frame */}
      <div className="relative p-[3px] rounded-[2rem] overflow-hidden z-10 shadow-2xl">
        <motion.div
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#C7A96B,#FFF,#C7A96B,#8C703B,#C7A96B)] opacity-90"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* 3. Main Glass Container */}
        <motion.div
          className="relative bg-ink/90 backdrop-blur-xl rounded-[1.9rem] overflow-hidden border border-white/20 p-2 md:p-3"
          animate={{
            y: isHovered ? -10 : 0,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Top Signature Floating Badge */}
          <div className="absolute top-5 left-5 z-30 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-gold/40 text-gold text-[11px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-editorial">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>★ Special Featured Look</span>
          </div>

          {/* Top Right Editor's Choice Badge */}
          <div className="absolute top-5 right-5 z-30 flex items-center justify-center w-9 h-9 bg-gold text-ink rounded-full shadow-gold font-bold text-xs">
            <Star className="w-5 h-5 fill-ink" />
          </div>

          {/* Image Container with Inner Vignette & Shimmer */}
          <div className="relative aspect-[3/4.5] w-64 sm:w-72 md:w-80 overflow-hidden rounded-[1.5rem] bg-stone/20">
            <motion.img
              src={imageSrc}
              alt="Special Featured Outfit"
              className="w-full h-full object-cover object-center"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/20 opacity-80" />

            {/* Interactive Light Sweep Effect on Hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: isHovered
                  ? 'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%)'
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-ivory z-20">
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                  Editorial Spotlight
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-ivory leading-tight mb-1">
                Signature Streetwear
              </h3>
              <p className="text-xs text-ivory/70 font-body line-clamp-2 leading-relaxed">
                The ultimate statement ensemble — oversized graphic aesthetic with high-waist vintage denim.
              </p>

              {/* Special Tag Pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2.5 py-0.5 bg-white/10 backdrop-blur-md border border-white/15 text-[9px] text-ivory/90 uppercase tracking-wider rounded-full font-medium">
                  #1 Choice
                </span>
                <span className="px-2.5 py-0.5 bg-gold/20 border border-gold/30 text-[9px] text-gold uppercase tracking-wider rounded-full font-semibold">
                  Signature Look
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

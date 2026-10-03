'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/Animations';
import { Star } from 'lucide-react';

const fashionImages = [
  {
    src: '/images/fashion/graphic_tee_street.jpg',
    label: 'Oversized Graphic Streetwear',
    category: 'Editor’s Choice',
    isMain: true,
  },
  {
    src: '/images/fashion/burgundy_suit.png',
    label: 'Burgundy Power Suit',
    category: 'Tailored Luxury',
  },
  {
    src: '/images/fashion/red_gingham_shirt.jpg',
    label: 'Gingham Bow Shirt',
    category: 'Vintage Casual',
  },
  {
    src: '/images/fashion/white_linen_jeans.png',
    label: 'Linen & Denim Flow',
    category: 'Effortless Chic',
  },
  {
    src: '/images/fashion/chic_streetwear_white.jpg',
    label: 'Summer Layering',
    category: 'Contemporary Streetwear',
  },
  {
    src: '/images/fashion/shirt_dress.png',
    label: 'Elegant Shirt Dress',
    category: 'Classic Tailoring',
  },
  {
    src: '/images/fashion/ethnic_red.png',
    label: 'Rich Crimson Co-Ord',
    category: 'Contemporary Ethnic',
  },
  {
    src: '/images/fashion/white_shirt_jeans.png',
    label: 'Relaxed White Shirt',
    category: 'Effortless Casual',
  },
  {
    src: '/images/fashion/classic_white_shirt.jpg',
    label: 'Chic Oversized Shirt',
    category: 'Modern Minimalist',
  },
  {
    src: '/images/fashion/pink_dress.png',
    label: 'Embroidered Fuchsia Dress',
    category: 'Statement Romance',
  },
  {
    src: '/images/fashion/traditional.png',
    label: 'Traditional Elegance',
    category: 'Ethnic Wear',
  },
  {
    src: '/images/fashion/casual_pink.png',
    label: 'Casual Chic',
    category: 'Everyday Style',
  },
  {
    src: '/images/fashion/white_dress.png',
    label: 'Vintage Romance',
    category: 'Occasion Wear',
  },
  {
    src: '/images/fashion/back_design.png',
    label: 'Artistic Detail',
    category: 'Statement Pieces',
  },
  {
    src: '/images/fashion/denim_patches.png',
    label: 'Bold Expression',
    category: 'Street Fashion',
  },
];

function GalleryCard({
  image,
  index,
  mouseX,
  mouseY,
}: {
  image: (typeof fashionImages)[0];
  index: number;
  mouseX: number;
  mouseY: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardRect, setCardRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
  }, []);

  // Calculate subtle micro-tilt based on mouse position relative to card (max 2 degrees for legibility)
  const relX = cardRect.w ? (mouseX - cardRect.x - cardRect.w / 2) / cardRect.w : 0;
  const relY = cardRect.h ? (mouseY - cardRect.y - cardRect.h / 2) / cardRect.h : 0;

  const tiltX = relY * -2;
  const tiltY = relX * 2;

  // Layout positions
  const layouts = [
    { gridCol: 'col-span-1 md:col-start-1 md:row-start-1', z: 3, delay: 0 },
    { gridCol: 'col-span-1 md:col-start-2 md:row-start-1', z: 5, delay: 0.1 },
    { gridCol: 'col-span-1 md:col-start-3 md:row-start-1', z: 2, delay: 0.2 },
    { gridCol: 'col-span-1 md:col-start-1 md:row-start-2 md:col-span-1', z: 4, delay: 0.15 },
    { gridCol: 'col-span-1 md:col-start-2 md:row-start-2 md:col-span-2', z: 1, delay: 0.25 },
  ];

  const layout = layouts[index % layouts.length];

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer ${layout.gridCol}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: layout.delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        zIndex: isHovered ? 20 : layout.z,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl bg-card transition-all duration-300 ${
          image.isMain ? 'border-2 border-gold shadow-gold/20 shadow-xl' : 'border border-border/40'
        }`}
        animate={{
          rotateX: isHovered ? tiltX : 0,
          rotateY: isHovered ? tiltY : 0,
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.12), 0 0 25px rgba(199,169,107,0.25)'
            : image.isMain
            ? '0 10px 30px rgba(199,169,107,0.2)'
            : '0 4px 15px rgba(0,0,0,0.03)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main Pick Badge */}
        {image.isMain && (
          <div className="absolute top-3 left-3 z-30 bg-gold text-ink font-body text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-ink" />
            <span>★ Best & Main Look</span>
          </div>
        )}

        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-stone/20">
          <motion.img
            src={image.src}
            alt={image.label}
            className="w-full h-full object-cover object-center"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: image.isMain ? 0.85 : 0 }}
          animate={{ opacity: isHovered || image.isMain ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-[10px] uppercase tracking-[0.3em] text-gold font-medium mb-1"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isHovered || image.isMain ? 0 : 15, opacity: isHovered || image.isMain ? 1 : 0 }}
            transition={{ delay: 0.05, duration: 0.3 }}
          >
            {image.category}
          </motion.p>
          <motion.h4
            className="font-display text-xl md:text-2xl font-semibold text-ivory"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isHovered || image.isMain ? 0 : 15, opacity: isHovered || image.isMain ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {image.label}
          </motion.h4>
        </motion.div>

        {/* Delicate subtle glow line on top on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || image.isMain ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function FashionGallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="section-spacing page-padding relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
              Style Lookbook
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-display-md font-bold text-ink mb-4">
              Curated for every mood
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-editorial text-ink/50 max-w-xl mx-auto font-body">
              From traditional elegance to bold street fashion — explore diverse styles
              that inspire your unique identity.
            </p>
          </FadeIn>
        </div>

        {/* 3D Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {fashionImages.map((image, index) => (
            <GalleryCard
              key={index}
              image={image}
              index={index}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


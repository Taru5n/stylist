'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/Animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  {
    src: '/images/fashion/graphic_tee_street.jpg',
    title: 'Oversized Graphic Streetwear',
    subtitle: 'High-contrast graphic tee paired with vintage wide denim',
    tag: '★ Main Pick',
  },
  {
    src: '/images/fashion/burgundy_suit.png',
    title: 'Burgundy Power Suit',
    subtitle: 'Monochromatic tailored suit with waist cinching',
    tag: 'Tailored',
  },
  {
    src: '/images/fashion/red_gingham_shirt.jpg',
    title: 'Gingham Bow Shirt',
    subtitle: 'Classic red gingham button-down with sweet accent bow',
    tag: 'Casual',
  },
  {
    src: '/images/fashion/white_linen_jeans.png',
    title: 'Linen & Denim Flow',
    subtitle: 'Relaxed unbuttoned linen shirt with classic blue denim',
    tag: 'Chic',
  },
  {
    src: '/images/fashion/chic_streetwear_white.jpg',
    title: 'Summer Layering',
    subtitle: 'Cropped white tank, layered shirt & tailored white trousers',
    tag: 'Minimal',
  },
  {
    src: '/images/fashion/shirt_dress.png',
    title: 'Elegant Shirt Dress',
    subtitle: 'Classic pinstripes with a sophisticated silhouette',
    tag: 'Tailored',
  },
  {
    src: '/images/fashion/ethnic_red.png',
    title: 'Crimson Co-Ord',
    subtitle: 'Vibrant ethnic tunic paired with heart-printed palazzos',
    tag: 'Ethnic',
  },
  {
    src: '/images/fashion/white_shirt_jeans.png',
    title: 'Effortless Casual',
    subtitle: 'Relaxed crisp white shirt styled with wide-leg denim',
    tag: 'Casual',
  },
  {
    src: '/images/fashion/classic_white_shirt.jpg',
    title: 'Chic Minimalist',
    subtitle: 'Oversized white button-down with statement sunglasses',
    tag: 'Minimal',
  },
  {
    src: '/images/fashion/pink_dress.png',
    title: 'Statement Romance',
    subtitle: 'Fuchsia midi dress with contrast embroidered collar',
    tag: 'Romance',
  },
  {
    src: '/images/fashion/white_dress.png',
    title: 'Vintage Romance',
    subtitle: 'Flowing silhouettes with floral corset detailing',
    tag: 'Occasion',
  },
  {
    src: '/images/fashion/traditional.png',
    title: 'Heritage Luxe',
    subtitle: 'Rich textile traditions meet modern tailoring',
    tag: 'Ethnic',
  },
  {
    src: '/images/fashion/casual_pink.png',
    title: 'Effortless Cool',
    subtitle: 'Relaxed fits and soft pastels for everyday ease',
    tag: 'Casual',
  },
  {
    src: '/images/fashion/back_design.png',
    title: 'Detail Matters',
    subtitle: 'Intricate back embroidery on structured jackets',
    tag: 'Artisan',
  },
  {
    src: '/images/fashion/denim_patches.png',
    title: 'Self Expression',
    subtitle: 'Curated patches and personality-driven denim',
    tag: 'Street',
  },
];

function CarouselCard({
  image,
  position,
  onClick,
}: {
  image: (typeof carouselImages)[0];
  position: number; // -2, -1, 0 (center), 1, 2
  onClick: () => void;
}) {
  const isCenter = position === 0;

  // Calculate transforms based on position
  const x = position * 280;
  const scale = isCenter ? 1 : 0.75;
  const rotateY = position * -15;
  const z = isCenter ? 0 : -200;
  const opacity = Math.abs(position) > 2 ? 0 : Math.abs(position) > 1 ? 0.4 : 1;
  const blur = isCenter ? 0 : Math.abs(position) * 1.5;

  return (
    <motion.div
      className="absolute top-0 left-1/2 cursor-pointer"
      animate={{
        x: x - 140, // center the card (280/2)
        scale,
        rotateY,
        z,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        zIndex: 10 - Math.abs(position),
        width: 280,
      }}
    >
      <div
        className={`relative overflow-hidden rounded-2xl transition-shadow duration-500 ${
          isCenter ? 'shadow-editorial-lg' : 'shadow-editorial'
        }`}
      >
        {/* Image */}
        <div className="aspect-[3/4.5] overflow-hidden bg-stone">
          <img
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <motion.div
            animate={{ opacity: isCenter ? 1 : 0, y: isCenter ? 0 : 10 }}
            transition={{ duration: 0.4, delay: isCenter ? 0.2 : 0 }}
          >
            <span className="inline-block px-2.5 py-1 bg-gold/90 text-ink text-[9px] uppercase tracking-[0.2em] font-bold mb-3 rounded-full">
              {image.tag}
            </span>
            <h4 className="font-display text-lg font-semibold text-ivory leading-tight mb-1">
              {image.title}
            </h4>
            <p className="text-xs text-ivory/60 leading-relaxed line-clamp-2">
              {image.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Shine effect for center card */}
        {isCenter && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(199,169,107,0.05) 100%)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function StyleCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(goNext, 4500);
    return () => clearInterval(timer);
  }, [goNext]);

  // Drag handling
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
  };

  const getPosition = (index: number) => {
    let diff = index - activeIndex;
    // Wrap around for circular feel
    if (diff > Math.floor(carouselImages.length / 2)) diff -= carouselImages.length;
    if (diff < -Math.floor(carouselImages.length / 2)) diff += carouselImages.length;
    return diff;
  };

  return (
    <section className="section-spacing page-padding relative overflow-hidden bg-stone/20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 right-[5%] w-80 h-80 bg-pastel-pink-glow rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-[5%] w-96 h-96 bg-pastel-blue-glow rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
              Style Stories
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-display-md font-bold text-ink mb-4">
              Discover your aesthetic
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-editorial text-ink/50 max-w-lg mx-auto font-body">
              Swipe through curated looks — each tells a story of personal style and
              intentional fashion.
            </p>
          </FadeIn>
        </div>

        {/* 3D Carousel */}
        <div
          ref={containerRef}
          className="relative h-[520px] md:h-[580px] select-none"
          style={{ perspective: '1200px' }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {carouselImages.map((image, index) => (
            <CarouselCard
              key={index}
              image={image}
              position={getPosition(index)}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center transition-all duration-300 hover:bg-gold/10 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-ink/50 group-hover:text-gold transition-colors" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  animate={{
                    backgroundColor: index === activeIndex ? '#C7A96B' : '#DADADA',
                    scale: index === activeIndex ? 1.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border border-border hover:border-gold flex items-center justify-center transition-all duration-300 hover:bg-gold/10 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-ink/50 group-hover:text-gold transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}

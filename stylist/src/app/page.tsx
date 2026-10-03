'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from '@/components/ui/SplitText';
import { RevealImage } from '@/components/ui/RevealImage';
import { FloatingCard } from '@/components/ui/FloatingCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FashionGallery3D } from '@/components/ui/FashionGallery3D';
import { StyleCarousel3D } from '@/components/ui/StyleCarousel3D';
import {
  FadeIn,
  Parallax,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  HorizontalScroll,
} from '@/components/ui/Animations';
import { FlowerBlurBg } from '@/components/ui/FlowerBlurBg';
import { Sparkles, Scan, Shirt, Palette, Eye, Star } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────── */
/*                          HOME PAGE                              */
/* ─────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <PhilosophySection />
      <FeaturesSection />
      <FashionGallery3D />
      <HowItWorksSection />
      <GallerySection />
      <TestimonialsSection />
      <StyleCarousel3D />
      <CTASection />
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image Layer */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/10 to-ivory z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')`,
            filter: 'brightness(0.95) contrast(1.05)',
          }}
        />
      </motion.div>

      {/* Subtle Glowing Pastel Blobs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-pastel-blue-glow rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-pastel-pink-glow rounded-full blur-[140px] pointer-events-none z-1" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 page-padding w-full pt-32 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.3em] text-ink/50 mb-8 font-body font-medium"
          >
            Artificial Intelligence × High Fashion
          </motion.p>

          {/* Main Headline */}
          <div className="mb-8">
            <SplitText
              tag="h1"
              className="font-display text-display-xl font-bold text-ink"
              delay={1.6}
              stagger={0.05}
            >
              Your Style,
            </SplitText>
            <SplitText
              tag="h1"
              className="font-display text-display-xl font-bold text-ink"
              delay={1.9}
              stagger={0.05}
            >
              Reimagined
            </SplitText>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-editorial text-ink/60 max-w-xl mb-12 font-body"
          >
            MINES combines world-class AI with editorial fashion intelligence to craft
            your perfect personal style — down to every color, fit, and occasion.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <Link href="/questionnaire">
              <MagneticButton variant="primary" size="lg">
                Get Styled Instantly
              </MagneticButton>
            </Link>
            <Link href="#philosophy">
              <MagneticButton variant="ghost" size="lg">
                Learn More
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Floating Image Composition */}
        <div className="hidden lg:block">
          <Parallax speed={0.3} className="absolute top-28 right-[8%] w-64 h-80">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ delay: 2.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full shadow-editorial-lg overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80"
                alt="Fashion editorial"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Parallax>

          <Parallax speed={0.5} className="absolute bottom-24 right-[20%] w-48 h-64">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 5 }}
              transition={{ delay: 2.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full shadow-editorial overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80"
                alt="Style composition"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Parallax>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-ink/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Philosophy Section ─────────────────────────────────────── */
function PhilosophySection() {
  return (
    <section id="philosophy" className="relative section-spacing page-padding">
      {/* Animated blurred flower effect for empty white areas */}
      <FlowerBlurBg count={10} variant="roses" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative">
              <RevealImage
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Fashion philosophy"
                containerClassName="aspect-[3/4] w-full"
              />
              {/* Floating Label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="absolute -right-4 md:-right-8 bottom-12 glass-light px-6 py-4 shadow-editorial"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Est. 2025</p>
                <p className="text-sm text-ink/70 mt-1">AI Fashion Intelligence</p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn delay={0.2}>
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
                Our Philosophy
              </p>
            </FadeIn>

            <SplitText
              tag="h2"
              className="font-display text-display-md font-bold text-ink mb-8"
              delay={0.3}
            >
              Style is the silent language of identity
            </SplitText>

            <FadeIn delay={0.6}>
              <div className="space-y-6 text-editorial text-ink/60 font-body">
                <p>
                  We believe fashion should be effortless, personal, and deeply intentional.
                  Every color you wear tells a story about your undertone. Every silhouette
                  speaks to your proportions. Every choice reflects who you are.
                </p>
                <p>
                  MINES&apos;s AI doesn&apos;t just suggest clothes — it understands the
                  science of color harmony, the geometry of body proportion, and the art of
                  personal expression to create a style that&apos;s unmistakably yours.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="mt-10 flex items-center gap-12">
                <div>
                  <p className="font-display text-4xl font-bold text-gold">12+</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink/40 mt-1">Color Seasons</p>
                </div>
                <div className="w-[1px] h-10 bg-border" />
                <div>
                  <p className="font-display text-4xl font-bold text-gold">28</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink/40 mt-1">Style Categories</p>
                </div>
                <div className="w-[1px] h-10 bg-border" />
                <div>
                  <p className="font-display text-4xl font-bold text-gold">∞</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink/40 mt-1">Possibilities</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ───────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: <Scan className="w-6 h-6" />,
      title: 'AI Analysis',
      description:
        'Advanced image analysis detects your face shape, skin tone, undertone, and body proportions with remarkable precision.',
      accent: 'from-gold/20 to-gold/5',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Color Intelligence',
      description:
        'Based on 12-season color theory, we identify your ideal palette — the exact shades that make you radiant.',
      accent: 'from-forest/20 to-forest/5',
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      title: 'Virtual Try-On',
      description:
        'Preview outfits on yourself. Mix and match tops, bottoms, shoes, and accessories in our immersive studio.',
      accent: 'from-gold/20 to-forest/5',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Smart Wardrobe',
      description:
        'Build a digital wardrobe that evolves with you. Our AI remembers your preferences and refines recommendations.',
      accent: 'from-forest/20 to-gold/5',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Style Magazine',
      description:
        'Receive a personalized fashion magazine with 28+ curated sections covering every aspect of your style.',
      accent: 'from-gold/20 to-gold/5',
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Celebrity Match',
      description:
        'Discover which style icons share your features and learn how to achieve their signature looks.',
      accent: 'from-forest/20 to-forest/5',
    },
  ];

  return (
    <section className="relative section-spacing page-padding bg-stone/30">
      {/* Animated blurred flower effect for empty white areas */}
      <FlowerBlurBg count={8} variant="petals" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
              The Experience
            </p>
          </FadeIn>
          <SplitText
            tag="h2"
            className="font-display text-display-md font-bold text-ink"
          >
            Intelligence meets elegance
          </SplitText>
        </div>

        <StaggerContainer stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <FloatingCard depth={8} className="h-full">
                <div className="bg-card rounded-2xl p-8 md:p-10 shadow-editorial h-full group hover:shadow-editorial-lg transition-shadow duration-500">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center mb-6 text-ink group-hover:scale-110 transition-transform duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-ink/50 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>
              </FloatingCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Show Yourself',
      description:
        'Upload 1–3 clear photos and share a few basics like age, height, and weight. No tedious question lists.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    },
    {
      number: '02',
      title: 'AI Decodes You',
      description:
        'Our AI auto-scans your skin tone, face shape, and body proportions to decode your personal profile and seasonal palette.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
    },
    {
      number: '03',
      title: 'Bespoke Daily Wear',
      description:
        'Get a curated lookbook featuring effortless casual, office, and travel outfits chosen automatically to match your body and coloring.',
      image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
    },
  ];

  return (
    <section className="relative section-spacing page-padding">
      {/* Animated blurred flower effect for empty white areas */}
      <FlowerBlurBg count={9} variant="roses" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
              The Journey
            </p>
          </FadeIn>
          <SplitText
            tag="h2"
            className="font-display text-display-md font-bold text-ink"
          >
            How it works
          </SplitText>
        </div>

        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <FadeIn direction={index % 2 === 0 ? 'left' : 'right'}>
                <Parallax speed={0.2}>
                  <div className="relative">
                    <RevealImage
                      src={step.image}
                      alt={step.title}
                      containerClassName="aspect-[4/5] w-full rounded-2xl"
                      direction={index % 2 === 0 ? 'left' : 'right'}
                    />
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-gold">
                      <span className="font-display text-lg font-bold text-ink">{step.number}</span>
                    </div>
                  </div>
                </Parallax>
              </FadeIn>

              <div className={index % 2 === 1 ? 'lg:order-first' : ''}>
                <FadeIn delay={0.3}>
                  <span className="text-7xl md:text-8xl font-display font-bold text-border/50 block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-display text-display-sm font-bold text-ink mb-6">
                    {step.title}
                  </h3>
                  <p className="text-editorial text-ink/55 font-body max-w-md">
                    {step.description}
                  </p>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery Section ────────────────────────────────────────── */
function GallerySection() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80', label: 'Minimalist' },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', label: 'Editorial' },
    { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80', label: 'Contemporary' },
    { src: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=500&q=80', label: 'Classic' },
    { src: 'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=500&q=80', label: 'Avant-Garde' },
    { src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&q=80', label: 'Streetwear' },
  ];

  return (
    <section className="section-spacing overflow-hidden bg-ink">
      <div className="mb-12 page-padding">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4 font-body font-medium">
            Infinite Inspiration
          </p>
          <h2 className="font-display text-display-md font-bold text-ivory">
            Every style, curated
          </h2>
        </FadeIn>
      </div>

      {/* Infinite Marquee */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 md:w-96 h-[28rem] md:h-[36rem] mx-3 relative group overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <p className="text-ivory text-lg font-display font-semibold">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────── */
function TestimonialsSection() {
  return (
    <section className="relative section-spacing page-padding">
      {/* Animated blurred flower effect for empty white areas */}
      <FlowerBlurBg count={7} variant="roses" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-8 font-body font-medium">
            Editorial
          </p>
        </FadeIn>

        <TextReveal className="font-display text-display-sm md:text-display-md font-semibold text-ink leading-tight justify-center">
          The future of personal style is not about following trends — it is about understanding yourself so deeply that every choice becomes effortless
        </TextReveal>

        <FadeIn delay={0.4}>
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-[40px] h-[1px] bg-gold" />
            <p className="text-sm text-ink/40 italic font-display">MINES Manifesto</p>
            <div className="w-[40px] h-[1px] bg-gold" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80"
          alt="Fashion backdrop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 page-padding w-full">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6 font-body font-medium">
              Begin Your Transformation
            </p>
          </FadeIn>

          <SplitText
            tag="h2"
            className="font-display text-display-lg font-bold text-ivory mb-8"
          >
            Your perfect style awaits
          </SplitText>

          <FadeIn delay={0.4}>
            <p className="text-editorial text-ivory/60 mb-10 max-w-lg font-body">
              Discover the colors, fits, and styles designed for you automatically.
              No guesswork. No trends. Just you, perfected.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Link href="/questionnaire">
              <MagneticButton variant="secondary" size="lg">
                Upload Photo & Get Styled →
              </MagneticButton>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

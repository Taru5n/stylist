'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStylistStore } from '@/stores/stylist-store';
import { SplitText } from '@/components/ui/SplitText';
import { FadeIn } from '@/components/ui/Animations';
import { RevealImage } from '@/components/ui/RevealImage';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { ChevronDown } from 'lucide-react';
import { saveStyleProfile } from '@/lib/supabase/styling';

export default function ResultsPage() {
  const router = useRouter();
  const { analysisResult, recommendations, responses, isGeneratingRecs, setGeneratingRecs, setRecommendations, photoPreviewUrls } = useStylistStore();
  const [error, setError] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const coverY = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
  const coverOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  async function fetchRecommendations() {
    setError('');
    setGeneratingRecs(true);
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisResult, responses }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.error || 'Failed to generate recommendations');
      }
      
      const data = await res.json();
      setRecommendations(data);
      if (analysisResult) {
        try {
          await saveStyleProfile(analysisResult, data);
        } catch (saveError) {
          // The AI result is still usable if a signed-in user's database save fails.
          console.error('Unable to save style profile:', saveError);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recommendations');
    } finally {
      setGeneratingRecs(false);
    }
  }

  useEffect(() => {
    if (!analysisResult) {
      router.push('/questionnaire');
      return;
    }
    
    if (!recommendations && !isGeneratingRecs) {
      const timer = setTimeout(() => {
        void fetchRecommendations();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6">
        <p className="text-red-500 mb-4">{error}</p>
        <MagneticButton onClick={() => void fetchRecommendations()}>Try Again</MagneticButton>
      </div>
    );
  }

  if (isGeneratingRecs || !recommendations) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center pt-20 text-center px-6">
        <div className="w-16 h-16 border-t-2 border-gold rounded-full animate-spin mb-8" />
        <SplitText tag="h2" className="font-display text-3xl font-bold text-ink mb-4">
          Curating Your Personal Magazine
        </SplitText>
        <p className="text-ink/60 font-body max-w-md animate-pulse">
          Our AI is synthesizing thousands of fashion data points to create your bespoke style identity.
        </p>
      </div>
    );
  }

  if (!analysisResult || !recommendations) {
    return null;
  }

  return (
    <div ref={containerRef} className="bg-ivory text-ink relative">
      
      {/* --- Cover Spread --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <motion.div style={{ y: coverY, opacity: coverOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-ink/10 z-10" />
          {photoPreviewUrls?.[0] ? (
            <img src={photoPreviewUrls[0]} alt="User" className="w-full h-full object-cover blur-sm opacity-30" />
          ) : (
            <div className="w-full h-full bg-stone" />
          )}
        </motion.div>

        <div className="relative z-10 page-padding w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6">
                MINES Issue 01 — Volume I
              </p>
            </FadeIn>
            <SplitText tag="h1" className="font-display text-display-lg md:text-[8rem] font-bold leading-[0.85] mb-8 uppercase tracking-tighter">
              {recommendations.style_identity.archetype}
            </SplitText>
            <FadeIn delay={0.4}>
              <p className="text-editorial text-ink/70 max-w-xl mx-auto lg:mx-0 font-body mb-10">
                {recommendations.style_identity.description}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
                {recommendations.style_identity.keywords.map((kw, i) => (
                  <span key={i} className="px-4 py-2 border border-ink/20 rounded-full text-xs uppercase tracking-widest text-ink/80 bg-white/50 backdrop-blur-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.6} className="flex-1 w-full max-w-md hidden lg:block">
            <div className="aspect-[3/4] relative rounded-sm overflow-hidden shadow-editorial-lg p-3 bg-white">
               {photoPreviewUrls?.[0] ? (
                  <img src={photoPreviewUrls[0]} alt="Cover" className="w-full h-full object-cover grayscale contrast-125" />
               ) : (
                  <div className="w-full h-full bg-stone flex items-center justify-center text-ink/20 font-display">PORTRAIT</div>
               )}
               <div className="absolute inset-3 border border-white/40 pointer-events-none mix-blend-overlay" />
            </div>
          </FadeIn>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink/40"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* --- Analysis Summary --- */}
      <section className="section-spacing page-padding bg-stone/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Color Season', value: analysisResult.color_season },
              { label: 'Face Shape', value: analysisResult.face_shape },
              { label: 'Undertone', value: analysisResult.undertone },
              { label: 'Body Silhouette', value: analysisResult.body_type },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center md:text-left border-l-2 border-gold/30 pl-6">
                  <p className="text-xs uppercase tracking-widest text-ink/50 mb-2">{item.label}</p>
                  <p className="font-display text-2xl md:text-3xl font-medium text-ink capitalize">{item.value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Color Palette --- */}
      <section className="section-spacing page-padding">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 text-center">Your Palette</h2>
          </FadeIn>
          
          <div className="space-y-20">
            {/* Best Shirt Colors */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-ink/50 mb-8 border-b border-border pb-4">Core Colors (Tops & Shirts)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recommendations.color_guide.best_shirt_colors.map((color, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="up">
                    <div className="group cursor-pointer">
                      <div className="aspect-square rounded-2xl mb-4 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-editorial" style={{ backgroundColor: color.hex }} />
                      <p className="font-display text-lg font-medium mb-1">{color.name}</p>
                      <p className="text-xs text-ink/60 line-clamp-2">{color.reason}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-ink/50 mb-8 border-b border-border pb-4">Accent Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recommendations.color_guide.accent_colors.map((color, i) => (
                  <FadeIn key={i} delay={i * 0.1} direction="up">
                    <div className="group cursor-pointer">
                      <div className="h-24 rounded-2xl mb-4 shadow-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-editorial" style={{ backgroundColor: color.hex }} />
                      <p className="font-display text-md font-medium mb-1">{color.name}</p>
                      <p className="text-xs text-ink/60 line-clamp-2">{color.reason}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Wardrobe Essentials (Magazine Spread) --- */}
      <section className="section-spacing page-padding bg-ink text-ivory">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.4em] text-gold font-bold mb-6 text-center">The Wardrobe</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-20 text-center">Essential Pieces</h2>
          </FadeIn>

          <div className="space-y-32">
            {/* Tops */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <SplitText tag="h3" className="font-display text-4xl mb-6">Shirts & Tops</SplitText>
                <div className="space-y-8">
                  {recommendations.tops.slice(0,3).map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="border-t border-ivory/20 pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-display text-xl font-medium">{item.name}</h4>
                        {item.color_hex && (
                          <div className="w-6 h-6 rounded-full shadow-sm border border-ivory/20" style={{ backgroundColor: item.color_hex }} />
                        )}
                      </div>
                      <p className="text-sm text-ivory/60 mb-2">{item.description}</p>
                      <p className="text-xs text-gold/80 italic">{item.reason}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 h-full min-h-[500px]">
                <RevealImage src="https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80" alt="Tops" containerClassName="w-full h-full rounded-sm" scale={false} />
              </div>
            </div>

            {/* Bottoms */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center direction-rtl">
              <div className="lg:col-span-5 direction-ltr">
                <SplitText tag="h3" className="font-display text-4xl mb-6">Pants & Trousers</SplitText>
                <div className="space-y-8">
                  {recommendations.bottoms.slice(0,3).map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1} className="border-t border-ivory/20 pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-display text-xl font-medium">{item.name}</h4>
                      </div>
                      <p className="text-sm text-ivory/60 mb-2">{item.description}</p>
                      <p className="text-xs text-gold/80 italic">{item.reason}</p>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 h-full min-h-[500px] direction-ltr">
                <RevealImage src="https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80" alt="Bottoms" containerClassName="w-full h-full rounded-sm" direction="right" scale={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Occasions --- */}
      <section className="section-spacing page-padding">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 text-center">Everyday Lookbook</h2>
          </FadeIn>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Casual Daily', items: recommendations.occasion_outfits.daily },
              { title: 'Office / Smart Casual', items: recommendations.occasion_outfits.office },
              { title: 'Weekend / Travel', items: recommendations.occasion_outfits.travel },
              { title: 'Outings & Evening', items: recommendations.occasion_outfits.party },
              { title: 'Active & Gym', items: recommendations.occasion_outfits.gym },
              { title: 'Streetwear / Urban', items: recommendations.occasion_outfits.streetwear }
            ].map((section, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard variant="light" className="h-full border border-border/60 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-ink mb-6 pb-4 border-b border-border/40">{section.title}</h3>
                    <div className="space-y-6">
                      {section.items?.slice(0, 2).map((item, j) => (
                        <div key={j} className="border-b border-border/20 last:border-b-0 pb-4 last:pb-0">
                          <h4 className="font-display text-lg font-semibold mb-1">{item.name}</h4>
                          <p className="text-sm text-ink/70 mb-2 leading-relaxed">{item.description}</p>
                          <p className="text-xs text-ink/50 italic border-l-2 border-gold/60 pl-2">{item.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Grooming --- */}
      <section className="section-spacing page-padding bg-stone/20">
         <div className="max-w-5xl mx-auto">
            <FadeIn>
               <h2 className="font-display text-5xl md:text-7xl font-bold mb-16 text-center">Grooming & Details</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div>
                  <h3 className="text-2xl font-display font-semibold mb-6 border-b border-gold/30 pb-4">Hairstyles</h3>
                  <div className="space-y-6">
                     {recommendations.hairstyles.map((hair, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                           <h4 className="font-display text-xl mb-2">{hair.name}</h4>
                           <p className="text-sm text-ink/70 mb-3">{hair.description}</p>
                           <div className="flex gap-4 text-xs font-medium text-ink/50">
                              <span className="bg-stone px-2 py-1 rounded">Face Shape: {hair.face_shape_reason}</span>
                              <span className="bg-stone px-2 py-1 rounded">Maintenance: {hair.maintenance}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div>
                  <h3 className="text-2xl font-display font-semibold mb-6 border-b border-gold/30 pb-4">Signature Scent</h3>
                  <div className="space-y-6">
                     {recommendations.fragrances.map((frag, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                           <h4 className="font-display text-xl mb-1">{frag.name}</h4>
                           <p className="text-xs text-gold uppercase tracking-widest mb-3">{frag.family}</p>
                           <p className="text-sm text-ink/70 mb-3 line-clamp-2">{frag.reason}</p>
                           <p className="text-xs font-medium text-ink/50">Notes: {frag.notes.join(', ')}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- Bottom CTA --- */}
      <section className="section-spacing page-padding text-center">
         <FadeIn>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">Bring it to life</h2>
            <p className="text-editorial text-ink/60 max-w-xl mx-auto mb-10">
               Take these recommendations into our Virtual Try-On Studio. Mix, match, and visualize your new signature style.
            </p>
            <MagneticButton onClick={() => router.push('/try-on')} size="lg">
               Enter Try-On Studio →
            </MagneticButton>
         </FadeIn>
      </section>

    </div>
  );
}

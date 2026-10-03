'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStylistStore } from '@/stores/stylist-store';
import { SplitText } from '@/components/ui/SplitText';
import { FadeIn } from '@/components/ui/Animations';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { OutfitItem } from '@/types';
import { Wand2, X, BookmarkPlus } from 'lucide-react';
import { saveOutfit } from '@/lib/supabase/styling';

export default function TryOnStudio() {
  const router = useRouter();
  const { recommendations, photoPreviewUrls, loadDemoProfile } = useStylistStore();
  
  const [selectedTop, setSelectedTop] = useState<OutfitItem | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<OutfitItem | null>(null);
  const [selectedShoes, setSelectedShoes] = useState<OutfitItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<{ rating: number; vibe: string; description: string } | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-24 pb-32">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
            <Wand2 className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink mb-4">Unlock the Studio</h1>
          <p className="text-sm text-ink/65 font-body mb-10 leading-relaxed">
            Get personalized fashion curation chosen autonomously by AI to match your body proportions and skin tone.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => router.push('/questionnaire')}
              className="px-8 py-4 bg-ink text-ivory text-xs tracking-widest uppercase font-medium hover:bg-gold transition-colors duration-500 rounded-full"
            >
              Upload Photo & Get Styled
            </button>
            <button
              onClick={() => loadDemoProfile()}
              className="px-8 py-4 border border-ink/20 text-ink text-xs tracking-widest uppercase font-medium hover:bg-white transition-colors duration-500 rounded-full"
            >
              Explore with Demo Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleGeneratePreview = async () => {
    if (!selectedTop || !selectedBottom) return;
    
    setIsGenerating(true);
    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          top: selectedTop,
          bottom: selectedBottom,
          shoes: selectedShoes,
          occasion: 'Casual/Daily',
          styleArchetype: recommendations.style_identity.archetype
        }),
      });

      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();
      setPreview(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOutfit = async () => {
    if (!selectedTop || !selectedBottom || !preview) return;

    setSaveMessage(null);
    try {
      await saveOutfit({
        top: selectedTop,
        bottom: selectedBottom,
        shoes: selectedShoes,
        preview,
        occasion: 'Casual/Daily',
      });
      setSaveMessage('Saved to your wardrobe.');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Could not save this outfit.');
    }
  };

  return (
    <div className="min-h-screen bg-stone/20 pt-24 pb-32">
      <div className="page-padding max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <SplitText tag="h1" className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            Virtual Try-On Studio
          </SplitText>
          <p className="text-ink/60 font-body">Mix and match your AI-recommended pieces.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-[calc(100vh-250px)] min-h-[600px]">
          
          {/* --- Wardrobe Selection Panel --- */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm overflow-y-auto custom-scrollbar border border-border/50">
            <h3 className="font-display text-2xl font-semibold mb-6">Your Wardrobe</h3>
            
            {/* Tops */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-ink/50 mb-4 font-medium">Tops</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.tops.slice(0, 4).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTop(item)}
                    className={`p-4 rounded-2xl border text-left transition-all ${selectedTop?.name === item.name ? 'border-gold bg-gold/5 shadow-sm' : 'border-border/50 hover:border-gold/50'}`}
                  >
                    <div className="w-6 h-6 rounded-full mb-3 shadow-inner" style={{ backgroundColor: item.color_hex || '#E9E5DF' }} />
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottoms */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest text-ink/50 mb-4 font-medium">Bottoms</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.bottoms.slice(0, 4).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedBottom(item)}
                    className={`p-4 rounded-2xl border text-left transition-all ${selectedBottom?.name === item.name ? 'border-gold bg-gold/5 shadow-sm' : 'border-border/50 hover:border-gold/50'}`}
                  >
                    <div className="w-6 h-6 rounded-full mb-3 shadow-inner" style={{ backgroundColor: item.color_hex || '#E9E5DF' }} />
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Shoes */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-ink/50 mb-4 font-medium">Shoes</h4>
              <div className="grid grid-cols-2 gap-3">
                {recommendations.shoes.slice(0, 4).map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedShoes(item)}
                    className={`p-4 rounded-2xl border text-left transition-all ${selectedShoes?.name === item.name ? 'border-gold bg-gold/5 shadow-sm' : 'border-border/50 hover:border-gold/50'}`}
                  >
                    <div className="w-6 h-6 rounded-full mb-3 shadow-inner" style={{ backgroundColor: item.color_hex || '#E9E5DF' }} />
                    <p className="text-xs font-semibold leading-tight line-clamp-2">{item.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- Visualization Canvas --- */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-editorial relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-stone/30 opacity-50 z-0" />
            
            <div className="relative z-10 flex-1 p-8 flex flex-col items-center justify-center">
              {photoPreviewUrls?.[0] ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-8">
                  <img src={photoPreviewUrls[0]} alt="You" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-stone mb-8" />
              )}

              <div className="w-full max-w-sm space-y-4">
                {/* Visual Representation of Outfit */}
                <AnimatePresence mode="popLayout">
                  {selectedTop && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-white rounded-2xl shadow-sm border border-border flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedTop.color_hex || '#ccc' }} />
                       <div className="flex-1">
                         <p className="text-xs uppercase tracking-widest text-ink/40">Top</p>
                         <p className="font-semibold text-sm line-clamp-1">{selectedTop.name}</p>
                       </div>
                       <button onClick={() => setSelectedTop(null)} className="text-ink/30 hover:text-ink"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                  {selectedBottom && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-white rounded-2xl shadow-sm border border-border flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedBottom.color_hex || '#ccc' }} />
                       <div className="flex-1">
                         <p className="text-xs uppercase tracking-widest text-ink/40">Bottom</p>
                         <p className="font-semibold text-sm line-clamp-1">{selectedBottom.name}</p>
                       </div>
                       <button onClick={() => setSelectedBottom(null)} className="text-ink/30 hover:text-ink"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                  {selectedShoes && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-white rounded-2xl shadow-sm border border-border flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full" style={{ backgroundColor: selectedShoes.color_hex || '#ccc' }} />
                       <div className="flex-1">
                         <p className="text-xs uppercase tracking-widest text-ink/40">Shoes</p>
                         <p className="font-semibold text-sm line-clamp-1">{selectedShoes.name}</p>
                       </div>
                       <button onClick={() => setSelectedShoes(null)} className="text-ink/30 hover:text-ink"><X className="w-4 h-4" /></button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!selectedTop && !selectedBottom && (
                   <div className="text-center p-8 border-2 border-dashed border-border rounded-3xl mt-12">
                     <p className="text-ink/40 font-medium">Select items from your wardrobe to build an outfit.</p>
                   </div>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="relative z-10 p-6 bg-white border-t border-border flex justify-between items-center">
               <MagneticButton 
                 variant="primary" 
                 onClick={handleGeneratePreview}
                 disabled={!selectedTop || !selectedBottom || isGenerating}
               >
                 {isGenerating ? 'Synthesizing...' : 'Preview Look'}
                 <Wand2 className="w-4 h-4 ml-2" />
               </MagneticButton>
            </div>
          </div>

          {/* --- Output Panel --- */}
          <div className="lg:col-span-3 bg-ink text-ivory rounded-3xl p-8 flex flex-col">
            <h3 className="font-display text-2xl font-semibold mb-8 text-gold">AI Stylist Review</h3>
            
            {preview ? (
              <FadeIn>
                <div className="mb-8">
                  <div className="flex items-end gap-2 mb-4">
                     <span className="font-display text-6xl font-bold leading-none">{preview.rating}</span>
                     <span className="text-ivory/40 text-xl font-medium mb-1">/10</span>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-gold mb-4">{preview.vibe}</p>
                  <p className="text-sm text-ivory/80 leading-relaxed font-body">
                    {preview.description}
                  </p>
                </div>
                
                <button onClick={() => void handleSaveOutfit()} className="w-full py-4 rounded-xl border border-gold/30 text-gold hover:bg-gold hover:text-ink transition-colors flex items-center justify-center gap-2 font-medium">
                  <BookmarkPlus className="w-4 h-4" /> Save to Wardrobe
                </button>
                {saveMessage && <p className="mt-3 text-center text-xs text-ivory/70">{saveMessage}</p>}
              </FadeIn>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                 <Wand2 className="w-12 h-12 mb-4" />
                 <p className="text-sm font-medium">Compose an outfit and click Preview Look to get AI feedback.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

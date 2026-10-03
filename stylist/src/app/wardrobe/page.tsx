'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStylistStore } from '@/stores/stylist-store';
import { SplitText } from '@/components/ui/SplitText';
import { StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { BookmarkMinus, Shirt } from 'lucide-react';
import { loadSavedOutfits, loadStyleProfile, type SavedOutfit } from '@/lib/supabase/styling';

export default function WardrobePage() {
  const router = useRouter();
  const { recommendations, loadDemoProfile, setAnalysisResult, setRecommendations } = useStylistStore();
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWardrobe() {
      try {
        const [profile, outfits] = await Promise.all([loadStyleProfile(), loadSavedOutfits()]);
        if (profile) {
          setAnalysisResult(profile.analysis_result);
          setRecommendations(profile.recommendations);
        }
        setSavedOutfits(outfits);
      } catch (error) {
        console.error('Unable to load saved wardrobe:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadWardrobe();
  }, [setAnalysisResult, setRecommendations]);

  if (isLoading) {
    return <div className="min-h-screen bg-ivory flex items-center justify-center pt-24 text-ink/60">Loading your wardrobe…</div>;
  }

  if (!recommendations) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-24 pb-32">
        <div className="max-w-md mx-auto text-center px-6">
          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
            <Shirt className="w-8 h-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink mb-4">Unlock Your Wardrobe</h1>
          <p className="text-sm text-ink/65 font-body mb-10 leading-relaxed">
            View your personal wardrobe capsule and daily style guide chosen autonomously by AI to fit your tone and shape.
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

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-32">
      <div className="page-padding max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-border pb-8">
           <div>
             <SplitText tag="h1" className="font-display text-4xl md:text-5xl font-bold text-ink mb-2">
               Digital Wardrobe
             </SplitText>
             <p className="text-ink/50 font-body">Your curated collections and saved outfits.</p>
           </div>
        </div>

        <div className="space-y-20">
           
           {/* Saved Outfits Placeholder */}
           <section>
              <h2 className="font-display text-2xl font-semibold mb-8">Saved Looks</h2>
              {savedOutfits.length === 0 ? (
                <div className="bg-stone/30 rounded-3xl p-12 text-center border border-dashed border-border">
                  <p className="text-ink/40 font-medium">No saved looks yet. Build outfits in the Try-On Studio to save them here.</p>
                </div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedOutfits.map((outfit) => (
                    <StaggerItem key={outfit.id}>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
                        <p className="text-xs uppercase tracking-widest text-gold mb-4">{outfit.occasion}</p>
                        <p className="font-semibold text-sm">{outfit.top_item.name} + {outfit.bottom_item.name}</p>
                        {outfit.shoes_item && <p className="text-xs text-ink/50 mt-1">with {outfit.shoes_item.name}</p>}
                        {outfit.preview?.description && <p className="text-xs text-ink/60 mt-4 line-clamp-3">{outfit.preview.description}</p>}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
           </section>

           {/* Favorites / Essential Capsule */}
           <section>
              <h2 className="font-display text-2xl font-semibold mb-8">The Capsule Collection</h2>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {recommendations.capsule_wardrobe.essentials.map((item, i) => (
                    <StaggerItem key={i}>
                       <div className="bg-white rounded-2xl p-6 shadow-sm border border-border group relative overflow-hidden">
                          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="text-ink/30 hover:text-ink"><BookmarkMinus className="w-5 h-5" /></button>
                          </div>
                          <div className="w-12 h-12 rounded-full mb-4 shadow-inner border border-border" style={{ backgroundColor: item.color_hex || '#ccc' }} />
                          <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                          <p className="text-xs text-ink/50 line-clamp-2">{item.description}</p>
                       </div>
                    </StaggerItem>
                 ))}
              </StaggerContainer>
           </section>

        </div>
      </div>
    </div>
  );
}

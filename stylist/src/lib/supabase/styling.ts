import type { AnalysisResult, OutfitItem, StyleRecommendations } from '@/types';
import { createClient } from './client';

export interface SavedOutfit {
  id: string;
  top_item: OutfitItem;
  bottom_item: OutfitItem;
  shoes_item: OutfitItem | null;
  preview: { description?: string; vibe?: string; rating?: number } | null;
  occasion: string;
  created_at: string;
}

interface SavedStyleProfile {
  id: string;
  analysis_result: AnalysisResult;
  recommendations: StyleRecommendations;
}

async function getCurrentUserId() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) throw error;
  return { supabase, userId: user?.id ?? null };
}

export async function saveStyleProfile(
  analysisResult: AnalysisResult,
  recommendations: StyleRecommendations,
) {
  const { supabase, userId } = await getCurrentUserId();
  if (!userId) return false;

  const { error } = await supabase.from('style_profiles').upsert(
    {
      user_id: userId,
      analysis_result: analysisResult,
      recommendations,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) throw error;
  return true;
}

export async function loadStyleProfile(): Promise<SavedStyleProfile | null> {
  const { supabase, userId } = await getCurrentUserId();
  if (!userId) return null;

  const { data, error } = await supabase
    .from('style_profiles')
    .select('id, analysis_result, recommendations')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  return data as SavedStyleProfile | null;
}

export async function loadSavedOutfits(): Promise<SavedOutfit[]> {
  const { supabase, userId } = await getCurrentUserId();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('saved_outfits')
    .select('id, top_item, bottom_item, shoes_item, preview, occasion, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as SavedOutfit[];
}

export async function saveOutfit({
  top,
  bottom,
  shoes,
  preview,
  occasion,
}: {
  top: OutfitItem;
  bottom: OutfitItem;
  shoes: OutfitItem | null;
  preview: { description?: string; vibe?: string; rating?: number } | null;
  occasion: string;
}) {
  const { supabase, userId } = await getCurrentUserId();
  if (!userId) throw new Error('Please sign in to save this outfit.');

  const { data: profile, error: profileError } = await supabase
    .from('style_profiles')
    .select('id')
    .eq('user_id', userId)
    .maybeSingle();
  if (profileError) throw profileError;

  const { error } = await supabase.from('saved_outfits').insert({
    user_id: userId,
    style_profile_id: profile?.id ?? null,
    top_item: top,
    bottom_item: bottom,
    shoes_item: shoes,
    preview,
    occasion,
  });

  if (error) throw error;
}

// ─── User & Auth ────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Questionnaire ──────────────────────────────────────────────
export interface QuestionnaireResponse {
  age: number;
  gender?: string;
  height: number;
  weight: number;
  country: string;
  city: string;
  climate: string;
  profession: string;
  lifestyle: string;
  budget: string;
  favorite_brands: string[];
  preferred_colors: string[];
  colors_to_avoid: string[];
  favorite_clothing: string[];
  clothing_never_worn: string[];
  events_attended: string[];
  work_dress_code: string;
  personality: string[];
  fashion_inspiration: string[];
  comfort_preference: number;
  favorite_celebrities: string[];
  favorite_aesthetics: string[];
  photos: string[];
}

export type QuestionType =
  | 'slider'
  | 'card-select'
  | 'multi-card-select'
  | 'color-picker'
  | 'image-select'
  | 'text-input'
  | 'search-select'
  | 'range-slider'
  | 'photo-upload'
  | 'spectrum';

export interface Question {
  id: keyof QuestionnaireResponse;
  title: string;
  subtitle?: string;
  type: QuestionType;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required?: boolean;
  multiple?: boolean;
}

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
  image?: string;
  description?: string;
}

// ─── AI Analysis ────────────────────────────────────────────────
export interface AnalysisResult {
  id: string;
  face_shape: string;
  skin_tone: string;
  skin_tone_hex: string;
  undertone: 'warm' | 'cool' | 'neutral';
  eye_color: string;
  hair_color: string;
  body_type: string;
  body_proportions: {
    shoulder_width: string;
    torso_length: string;
    leg_length: string;
    overall: string;
  };
  color_season: string;
  color_sub_season: string;
  recommended_colors: ColorRecommendation[];
  style_personality: string;
  style_archetype: string;
}

export interface ColorRecommendation {
  hex: string;
  name: string;
  category: 'best' | 'good' | 'accent' | 'neutral';
  reason: string;
}

// ─── Recommendations ────────────────────────────────────────────
export interface StyleRecommendations {
  style_identity: StyleIdentity;
  clothing_fits: ClothingFit[];
  color_guide: ColorGuide;
  tops: OutfitItem[];
  bottoms: OutfitItem[];
  shoes: OutfitItem[];
  accessories: AccessoryRec[];
  watches: OutfitItem[];
  glasses: OutfitItem[];
  bags: OutfitItem[];
  hairstyles: HairstyleRec[];
  beard_suggestions: BeardRec[];
  fragrances: FragranceRec[];
  fabrics: FabricRec[];
  seasonal_wardrobe: SeasonalWardrobe;
  capsule_wardrobe: CapsuleWardrobe;
  occasion_outfits: OccasionOutfits;
  budget_guide: BudgetGuide;
  mistakes_to_avoid: StyleMistake[];
  why_these_work: string[];
  celebrity_matches: CelebrityMatch[];
}

export interface StyleIdentity {
  archetype: string;
  description: string;
  keywords: string[];
  mood: string;
  era_inspiration: string;
}

export interface ClothingFit {
  type: string;
  recommendation: string;
  reason: string;
  avoid: string;
}

export interface ColorGuide {
  best_shirt_colors: ColorRec[];
  best_pant_colors: ColorRec[];
  best_shoe_colors: ColorRec[];
  accent_colors: ColorRec[];
  colors_to_avoid: ColorRec[];
}

export interface ColorRec {
  hex: string;
  name: string;
  reason: string;
}

export interface OutfitItem {
  name: string;
  description: string;
  color?: string;
  color_hex?: string;
  occasion?: string;
  reason: string;
  budget_tier?: 'budget' | 'mid' | 'luxury';
}

export interface AccessoryRec extends OutfitItem {
  category: string;
}

export interface HairstyleRec {
  name: string;
  description: string;
  face_shape_reason: string;
  maintenance: string;
}

export interface BeardRec {
  name: string;
  description: string;
  face_shape_reason: string;
}

export interface FragranceRec {
  name: string;
  family: string;
  notes: string[];
  season: string;
  occasion: string;
  reason: string;
}

export interface FabricRec {
  name: string;
  properties: string;
  best_for: string;
  season: string;
}

export interface SeasonalWardrobe {
  spring: OutfitItem[];
  summer: OutfitItem[];
  fall: OutfitItem[];
  winter: OutfitItem[];
}

export interface CapsuleWardrobe {
  essentials: OutfitItem[];
  total_pieces: number;
  philosophy: string;
}

export interface OccasionOutfits {
  daily: OutfitItem[];
  office: OutfitItem[];
  party: OutfitItem[];
  wedding: OutfitItem[];
  travel: OutfitItem[];
  gym: OutfitItem[];
  traditional: OutfitItem[];
  streetwear: OutfitItem[];
  luxury: OutfitItem[];
}

export interface BudgetGuide {
  tier: string;
  monthly_budget: string;
  priority_items: string[];
  save_on: string[];
  splurge_on: string[];
  recommended_stores: string[];
}

export interface StyleMistake {
  mistake: string;
  why: string;
  instead: string;
}

export interface CelebrityMatch {
  name: string;
  similarity: string;
  key_pieces: string[];
  how_to_achieve: string;
}

// ─── Wardrobe ───────────────────────────────────────────────────
export interface WardrobeItem {
  id: string;
  user_id: string;
  name: string;
  category: string;
  color: string;
  image_url?: string;
  metadata?: Record<string, unknown>;
  is_favorite: boolean;
  created_at: string;
}

export interface WardrobeCollection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  items: string[];
  created_at: string;
}

// ─── Try-On ─────────────────────────────────────────────────────
export interface TryOnOutfit {
  id: string;
  top?: OutfitItem;
  bottom?: OutfitItem;
  shoes?: OutfitItem;
  accessories?: OutfitItem[];
  description: string;
  occasion: string;
}

// ─── UI State ───────────────────────────────────────────────────
export interface CursorState {
  x: number;
  y: number;
  variant: 'default' | 'hover' | 'click' | 'text' | 'image' | 'magnetic';
  text?: string;
}

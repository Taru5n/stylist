import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuestionnaireResponse, AnalysisResult, StyleRecommendations } from '@/types';
import { DEMO_ANALYSIS_RESULT, DEMO_RECOMMENDATIONS } from '@/lib/constants';

interface StylistState {
  // Questionnaire
  currentStep: number;
  responses: Partial<QuestionnaireResponse>;
  uploadedPhotos: File[];
  photoPreviewUrls: string[];

  // Analysis
  isAnalyzing: boolean;
  analysisProgress: number;
  analysisStatus: string;
  analysisResult: AnalysisResult | null;

  // Recommendations
  isGeneratingRecs: boolean;
  recommendations: StyleRecommendations | null;

  // UI
  cursorVariant: string;
  menuOpen: boolean;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateResponse: <K extends keyof QuestionnaireResponse>(
    key: K,
    value: QuestionnaireResponse[K]
  ) => void;
  setUploadedPhotos: (photos: File[]) => void;
  setPhotoPreviewUrls: (urls: string[]) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setAnalysisProgress: (progress: number) => void;
  setAnalysisStatus: (status: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  setGeneratingRecs: (generating: boolean) => void;
  setRecommendations: (recs: StyleRecommendations) => void;
  setCursorVariant: (variant: string) => void;
  setMenuOpen: (open: boolean) => void;
  reset: () => void;
  loadDemoProfile: () => void;
}

const initialState = {
  currentStep: 0,
  responses: {},
  uploadedPhotos: [],
  photoPreviewUrls: [],
  isAnalyzing: false,
  analysisProgress: 0,
  analysisStatus: '',
  analysisResult: null,
  isGeneratingRecs: false,
  recommendations: null,
  cursorVariant: 'default',
  menuOpen: false,
};

export const useStylistStore = create<StylistState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
      prevStep: () => set((s) => ({ currentStep: Math.max(0, s.currentStep - 1) })),
      updateResponse: (key, value) =>
        set((s) => ({ responses: { ...s.responses, [key]: value } })),
      setUploadedPhotos: (photos) => set({ uploadedPhotos: photos }),
      setPhotoPreviewUrls: (urls) => set({ photoPreviewUrls: urls }),
      setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
      setAnalysisProgress: (progress) => set({ analysisProgress: progress }),
      setAnalysisStatus: (status) => set({ analysisStatus: status }),
      setAnalysisResult: (result) => set({ analysisResult: result }),
      setGeneratingRecs: (generating) => set({ isGeneratingRecs: generating }),
      setRecommendations: (recs) => set({ recommendations: recs }),
      setCursorVariant: (variant) => set({ cursorVariant: variant }),
      setMenuOpen: (open) => set({ menuOpen: open }),
      reset: () => set(initialState),
      loadDemoProfile: () => set({
        analysisResult: DEMO_ANALYSIS_RESULT as AnalysisResult,
        recommendations: DEMO_RECOMMENDATIONS as StyleRecommendations,
        photoPreviewUrls: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80'],
        responses: {
          age: 28,
          height: 178,
          weight: 74,
          gender: 'male'
        }
      }),
    }),
    {
      name: 'stylist-storage',
      partialize: (state) => ({
        responses: state.responses,
        analysisResult: state.analysisResult,
        recommendations: state.recommendations,
        photoPreviewUrls: state.photoPreviewUrls,
      }),
    }
  )
);

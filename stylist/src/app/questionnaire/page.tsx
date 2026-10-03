'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStylistStore } from '@/stores/stylist-store';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitText } from '@/components/ui/SplitText';
import { FadeIn } from '@/components/ui/Animations';
import { PhotoUpload } from '@/components/questionnaire/QuestionTypes';
import { ArrowLeft, Sparkles, Camera, Ruler, User, Mars, Venus } from 'lucide-react';

export default function GetStyledPage() {
  const router = useRouter();
  const {
    responses,
    uploadedPhotos,
    photoPreviewUrls,
    updateResponse,
    setUploadedPhotos,
    setPhotoPreviewUrls,
  } = useStylistStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      if (responses.age === undefined) updateResponse('age', 25);
      if (responses.height === undefined) updateResponse('height', 170);
      if (responses.weight === undefined) updateResponse('weight', 70);
      if (responses.gender === undefined) updateResponse('gender', 'male');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePhotoUpload = (files: File[]) => {
    const newPhotos = [...uploadedPhotos, ...files].slice(0, 3);
    setUploadedPhotos(newPhotos);
    const newUrls = newPhotos.map(file => URL.createObjectURL(file));
    setPhotoPreviewUrls(newUrls);
  };

  const handlePhotoRemove = (index: number) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos.splice(index, 1);
    setUploadedPhotos(newPhotos);
    const newUrls = [...photoPreviewUrls];
    URL.revokeObjectURL(newUrls[index]);
    newUrls.splice(index, 1);
    setPhotoPreviewUrls(newUrls);
  };

  const handleAnalyze = () => {
    if (uploadedPhotos.length === 0) {
      alert('Please upload at least one photo for analysis.');
      return;
    }
    router.push('/analysis');
  };

  if (!isMounted) return null;

  const genderOptions = [
    { value: 'male', label: 'Male', icon: (active: boolean) => <Mars className={`w-6 h-6 mx-auto ${active ? 'text-ivory' : 'text-ink/65'}`} /> },
    { value: 'female', label: 'Female', icon: (active: boolean) => <Venus className={`w-6 h-6 mx-auto ${active ? 'text-ivory' : 'text-ink/65'}`} /> },
    { value: 'non-binary', label: 'Non-Binary', icon: (active: boolean) => <User className={`w-6 h-6 mx-auto ${active ? 'text-ivory' : 'text-ink/65'}`} /> },
  ];

  return (
    <div className="min-h-screen bg-ivory pt-28 pb-32 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pastel-blue-glow rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-pastel-pink-glow rounded-full blur-[140px] pointer-events-none" />



      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">
              AI-Powered Styling
            </p>
          </FadeIn>
          <SplitText
            tag="h1"
            className="font-display text-4xl md:text-6xl font-bold text-ink mb-6"
          >
            Let&apos;s Get You Styled
          </SplitText>
          <FadeIn delay={0.4}>
            <p className="text-ink/50 text-lg max-w-2xl mx-auto font-body">
              Upload your photos and share a few basics. Our AI will analyze your skin tone,
              face shape, body proportions, and color season to curate your perfect daily wardrobe —
              no questionnaire needed.
            </p>
          </FadeIn>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column - Photo Upload */}
          <FadeIn delay={0.2} direction="left">
            <div className="bg-white rounded-3xl p-8 shadow-editorial border border-border/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">Your Photos</h2>
                  <p className="text-xs text-ink/50">Upload 1–3 clear photos</p>
                </div>
              </div>

              <PhotoUpload
                photos={uploadedPhotos}
                urls={photoPreviewUrls}
                onUpload={handlePhotoUpload}
                onRemove={handlePhotoRemove}
              />
            </div>
          </FadeIn>

          {/* Right Column - Basic Info */}
          <FadeIn delay={0.4} direction="right">
            <div className="space-y-8">

              {/* Gender Selection */}
              <div className="bg-white rounded-3xl p-8 shadow-editorial border border-border/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest/20 to-forest/5 flex items-center justify-center">
                    <User className="w-5 h-5 text-ink" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-ink">Gender</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {genderOptions.map((g) => (
                    <button
                      key={g.value}
                      onClick={() => updateResponse('gender', g.value)}
                      className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                        responses.gender === g.value
                          ? 'bg-ink border-ink text-ivory shadow-editorial'
                          : 'bg-card border-border/50 hover:border-gold hover:shadow-sm text-ink'
                      }`}
                    >

                      <span className="text-xs font-medium uppercase tracking-wider">{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Body Measurements */}
              <div className="bg-white rounded-3xl p-8 shadow-editorial border border-border/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-forest/5 flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-ink" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-ink">Body Details</h2>
                </div>

                <div className="space-y-8">
                  {/* Age */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-ink/70">Age</label>
                      <span className="font-display text-2xl font-bold text-ink">
                        {(responses.age as number) || 25}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={16}
                      max={80}
                      step={1}
                      value={(responses.age as number) || 25}
                      onChange={(e) => updateResponse('age', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-border rounded-full appearance-none outline-none accent-gold"
                      style={{
                        background: `linear-gradient(to right, var(--color-gold) ${
                          (((responses.age as number || 25) - 16) / (80 - 16)) * 100
                        }%, var(--color-border) ${(((responses.age as number || 25) - 16) / (80 - 16)) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1 text-xs text-ink/30">
                      <span>16</span>
                      <span>80</span>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-ink/70">Height</label>
                      <span className="font-display text-2xl font-bold text-ink">
                        {(responses.height as number) || 170}<span className="text-sm text-ink/40 ml-1">cm</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={140}
                      max={220}
                      step={1}
                      value={(responses.height as number) || 170}
                      onChange={(e) => updateResponse('height', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-border rounded-full appearance-none outline-none accent-gold"
                      style={{
                        background: `linear-gradient(to right, var(--color-gold) ${
                          (((responses.height as number || 170) - 140) / (220 - 140)) * 100
                        }%, var(--color-border) ${(((responses.height as number || 170) - 140) / (220 - 140)) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1 text-xs text-ink/30">
                      <span>140cm</span>
                      <span>220cm</span>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-ink/70">Weight</label>
                      <span className="font-display text-2xl font-bold text-ink">
                        {(responses.weight as number) || 70}<span className="text-sm text-ink/40 ml-1">kg</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={150}
                      step={1}
                      value={(responses.weight as number) || 70}
                      onChange={(e) => updateResponse('weight', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-border rounded-full appearance-none outline-none accent-gold"
                      style={{
                        background: `linear-gradient(to right, var(--color-gold) ${
                          (((responses.weight as number || 70) - 40) / (150 - 40)) * 100
                        }%, var(--color-border) ${(((responses.weight as number || 70) - 40) / (150 - 40)) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1 text-xs text-ink/30">
                      <span>40kg</span>
                      <span>150kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.6}>
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={handleAnalyze}
              >
                <Sparkles className="w-5 h-5" />
                Analyze My Style
              </MagneticButton>
              <p className="text-xs text-ink/40 max-w-sm">
                Our AI examines your skin tone, face shape, body proportions &amp; color season
                to build your perfect daily wardrobe automatically.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="fixed bottom-8 left-8 flex items-center gap-2 text-sm uppercase tracking-widest text-ink/40 hover:text-ink transition-colors font-medium group z-40"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Home
        </button>
      </div>
    </div>
  );
}

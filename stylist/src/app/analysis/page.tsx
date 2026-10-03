'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStylistStore } from '@/stores/stylist-store';
import { SplitText } from '@/components/ui/SplitText';

export default function AnalysisPage() {
  const router = useRouter();
  const { uploadedPhotos, responses, setAnalysisResult, setAnalyzing } = useStylistStore();
  const [status, setStatus] = useState('Initializing AI Core...');
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  async function runAnalysis() {
    setAnalysisError(null);
    setProgress(0);
    setStatus('Initializing AI Core...');
    setShowResults(false);
    setAnalyzing(true);

    // Fake progress simulation while API runs
    const statuses = [
      'Scanning facial topography...',
      'Extracting exact skin hex codes...',
      'Determining undertone spectrum...',
      'Mapping body proportions...',
      'Cross-referencing 12-season color palettes...',
      'Synthesizing style identity...',
    ];
    
    let currentStatus = 0;
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 5;
        if (next > 90) return 90; // Wait at 90% for API
        return next;
      });
      
      if (currentStatus < statuses.length - 1 && Math.random() > 0.6) {
        currentStatus++;
        setStatus(statuses[currentStatus]);
      }
    }, 400);

    try {
      // Convert Files to Base64
      const getBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Images = await Promise.all(uploadedPhotos.map(getBase64));

      // Call API
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: base64Images,
          responses,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        throw new Error(errorBody?.error || 'Analysis failed');
      }
      
      const result = await res.json();
      setAnalysisResult(result);
      
      clearInterval(progressInterval);
      setProgress(100);
      setStatus('Analysis Complete.');
      
      setTimeout(() => {
        setShowResults(true);
      }, 1000);

    } catch (error) {
      console.error(error);
      clearInterval(progressInterval);
      const message = error instanceof Error ? error.message : 'Error during analysis. Please try again.';
      setStatus(message);
      setAnalysisError(message);
    } finally {
      setAnalyzing(false);
    }
  }

  useEffect(() => {
    if (!uploadedPhotos || uploadedPhotos.length === 0) {
      router.push('/questionnaire');
      return;
    }

    const timer = setTimeout(() => {
      void runAnalysis();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    router.push('/results');
  };

  return (
    <div className="min-h-screen bg-ink text-ivory relative overflow-hidden flex items-center justify-center pt-20">
      {/* Background Scanning FX */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent animate-scan-line" style={{ animationDuration: '3s' }} />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent animate-scan-line" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-gold to-transparent animate-scan-line" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="scanning"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="flex flex-col items-center justify-center text-center h-[60vh]"
            >
              {/* Spinning Ring */}
              <div className="relative w-48 h-48 mb-12">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-ivory/10 stroke-current"
                    strokeWidth="1"
                    cx="50" cy="50" r="48"
                    fill="transparent"
                  />
                  <motion.circle
                    className="text-gold stroke-current"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    cx="50" cy="50" r="48"
                    fill="transparent"
                    initial={{ strokeDasharray: "301", strokeDashoffset: "301" }}
                    animate={{ strokeDashoffset: 301 - (301 * progress) / 100 }}
                    transition={{ ease: "linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-display text-4xl text-ivory">
                    {Math.round(progress)}
                  </span>
                  <span className="text-xs text-gold mt-1">%</span>
                </div>
              </div>

              <motion.p
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono text-sm tracking-widest text-ivory/70 uppercase"
              >
                {status}
              </motion.p>
              {analysisError && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => void runAnalysis()}
                    className="rounded-full border border-gold px-5 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-ink"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/questionnaire')}
                    className="rounded-full border border-ivory/40 px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-ivory hover:text-ink"
                  >
                    Choose different photos
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="py-12"
            >
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium block mb-4">
                  Analysis Complete
                </span>
                <SplitText tag="h1" className="font-display text-4xl md:text-5xl font-bold">
                  Identity Initialized
                </SplitText>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-gold/50 hover:border-gold transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest uppercase text-ivory group-hover:text-ink transition-colors duration-500 font-medium">
                    View Your Magazine
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

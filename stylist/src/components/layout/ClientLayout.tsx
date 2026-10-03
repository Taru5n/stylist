'use client';

import React from 'react';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { cursorRef } = useCustomCursor();
  useSmoothScroll();

  return (
    <>
      <LoadingScreen />

      {/* Custom Cursor with Logo */}
      <div ref={cursorRef} className="custom-cursor">A</div>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'default';
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
}: GlassCardProps) {
  const variants = {
    default: 'glass',
    light: 'glass-light',
    dark: 'glass-dark text-white',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-8 md:p-12',
  };

  return (
    <div
      className={cn(
        'rounded-2xl',
        variants[variant],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

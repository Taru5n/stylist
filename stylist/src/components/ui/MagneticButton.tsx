'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !magnetic) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const variants = {
    primary:
      'bg-ink text-ivory hover:text-ivory border-ink',
    secondary:
      'bg-gold text-ink border-gold hover:bg-gold-dark',
    outline:
      'bg-transparent text-ink border-ink hover:bg-ink hover:text-ivory',
    ghost:
      'bg-transparent text-ink border-transparent hover:text-gold',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs tracking-[0.15em]',
    md: 'px-8 py-3.5 text-sm tracking-[0.15em]',
    lg: 'px-12 py-5 text-sm tracking-[0.2em]',
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative overflow-hidden font-body font-medium uppercase',
        'border transition-colors duration-500',
        'inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{ originX: isHovered ? 0 : 1 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

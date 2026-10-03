'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  scale?: boolean;
}

export function RevealImage({
  src,
  alt,
  className,
  containerClassName,
  direction = 'left',
  delay = 0,
  duration = 1.2,
  scale = true,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const clipPaths = {
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0% 0 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0%)' },
    up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0% 0 0 0)' },
    down: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
  };

  return (
    <div ref={ref} className={cn('overflow-hidden', containerClassName)}>
      <motion.div
        initial={{ clipPath: clipPaths[direction].hidden }}
        animate={isInView ? { clipPath: clipPaths[direction].visible } : {}}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: scale ? 1.3 : 1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: duration + 0.4, delay, ease: [0.76, 0, 0.24, 1] }}
          className={cn('w-full h-full object-cover', className)}
        />
      </motion.div>
    </div>
  );
}

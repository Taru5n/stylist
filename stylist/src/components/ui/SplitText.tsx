'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function SplitText({
  children,
  className,
  type = 'words',
  delay = 0,
  stagger = 0.04,
  duration = 0.8,
  once = true,
  tag = 'h2',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '-10%' });

  const elements = type === 'chars'
    ? children.split('')
    : type === 'words'
    ? children.split(' ')
    : children.split('\n');

  const Tag = tag;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={cn('overflow-hidden', className)}
      aria-label={children}
    >
      {elements.map((el, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4 }}
            animate={isInView ? { y: 0, rotate: 0 } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {el}
            {type === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

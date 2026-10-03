'use client';

import React, { useMemo } from 'react';

/* ─────────────────────────────────────────────────────────────────── */
/*  FlowerBlurBg                                                        */
/*  Renders recognizable rose / flower SVGs with gentle soft-edge blur  */
/*  and slow drift animation in empty white / ivory background areas.  */
/* ─────────────────────────────────────────────────────────────────── */

interface FlowerItem {
  id: number;
  x: number;        // % from left
  y: number;        // % from top
  size: number;     // px
  blur: number;     // px — kept low so shape is visible
  opacity: number;
  hue: number;      // HSL hue shift (around pink-rose range)
  duration: number;
  delay: number;
  rotate: number;
  type: 0 | 1 | 2; // 0 = full rose, 1 = open bloom, 2 = bud
  driftVariant: 0 | 1 | 2 | 3;
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFlowers(count: number): FlowerItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(2, 98),
    y: randomBetween(2, 98),
    size: randomBetween(90, 220),
    blur: randomBetween(2, 8),          // very low blur — flowers stay recognizable
    opacity: randomBetween(0.55, 0.85),
    hue: randomBetween(-10, 20),        // slight hue variation around base pink
    duration: randomBetween(10, 22),
    delay: randomBetween(0, 12),
    rotate: randomBetween(0, 360),
    type: pick([0, 1, 2]) as 0 | 1 | 2,
    driftVariant: pick([0, 1, 2, 3]) as 0 | 1 | 2 | 3,
  }));
}

/* ──────────────────────────────────────────
   Rose SVG — layered petals, realistic shape
   ────────────────────────────────────────── */
function RoseFull({ size, opacity, hue, rotate }: { size: number; opacity: number; hue: number; rotate: number }) {
  const p1 = `hsl(${345 + hue}, 70%, 82%)`;   // outer petals
  const p2 = `hsl(${348 + hue}, 72%, 78%)`;   // mid petals
  const p3 = `hsl(${350 + hue}, 75%, 73%)`;   // inner petals
  const p4 = `hsl(${352 + hue}, 78%, 68%)`;   // center
  const hi = `rgba(255,255,255,0.35)`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    >
      <defs>
        <radialGradient id={`rg-a-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p4} />
          <stop offset="100%" stopColor={p1} />
        </radialGradient>
      </defs>

      {/* Outermost petals — 5 petals around ring */}
      <ellipse cx="100" cy="30"  rx="22" ry="38" fill={p1} transform="rotate(0   100 100)" />
      <ellipse cx="100" cy="30"  rx="22" ry="38" fill={p1} transform="rotate(72  100 100)" />
      <ellipse cx="100" cy="30"  rx="22" ry="38" fill={p1} transform="rotate(144 100 100)" />
      <ellipse cx="100" cy="30"  rx="22" ry="38" fill={p1} transform="rotate(216 100 100)" />
      <ellipse cx="100" cy="30"  rx="22" ry="38" fill={p1} transform="rotate(288 100 100)" />

      {/* Mid layer petals — 5 rotated 36° */}
      <ellipse cx="100" cy="42"  rx="17" ry="30" fill={p2} transform="rotate(36  100 100)" />
      <ellipse cx="100" cy="42"  rx="17" ry="30" fill={p2} transform="rotate(108 100 100)" />
      <ellipse cx="100" cy="42"  rx="17" ry="30" fill={p2} transform="rotate(180 100 100)" />
      <ellipse cx="100" cy="42"  rx="17" ry="30" fill={p2} transform="rotate(252 100 100)" />
      <ellipse cx="100" cy="42"  rx="17" ry="30" fill={p2} transform="rotate(324 100 100)" />

      {/* Inner petals — 5 tighter */}
      <ellipse cx="100" cy="58"  rx="13" ry="22" fill={p3} transform="rotate(0   100 100)" />
      <ellipse cx="100" cy="58"  rx="13" ry="22" fill={p3} transform="rotate(72  100 100)" />
      <ellipse cx="100" cy="58"  rx="13" ry="22" fill={p3} transform="rotate(144 100 100)" />
      <ellipse cx="100" cy="58"  rx="13" ry="22" fill={p3} transform="rotate(216 100 100)" />
      <ellipse cx="100" cy="58"  rx="13" ry="22" fill={p3} transform="rotate(288 100 100)" />

      {/* Center bud */}
      <circle cx="100" cy="100" r="22" fill={p4} />
      <circle cx="100" cy="100" r="14" fill={`hsl(${355 + hue}, 80%, 65%)`} />

      {/* Highlight */}
      <ellipse cx="91" cy="91" rx="8" ry="6" fill={hi} />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Open Bloom — wide petals like a daisy/peony
   ────────────────────────────────────────── */
function OpenBloom({ size, opacity, hue, rotate }: { size: number; opacity: number; hue: number; rotate: number }) {
  const p1 = `hsl(${340 + hue}, 65%, 86%)`;
  const p2 = `hsl(${345 + hue}, 70%, 80%)`;
  const ctr = `hsl(${30 + hue / 2}, 80%, 75%)`;   // warm golden centre
  const hi = `rgba(255,255,255,0.4)`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    >
      {/* 8 outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="28"
          rx="18"
          ry="40"
          fill={p1}
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      {/* 8 inner petals offset 22.5° */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
        <ellipse
          key={deg}
          cx="100"
          cy="44"
          rx="13"
          ry="28"
          fill={p2}
          transform={`rotate(${deg} 100 100)`}
        />
      ))}
      {/* Centre */}
      <circle cx="100" cy="100" r="20" fill={ctr} />
      <circle cx="100" cy="100" r="12" fill={`hsl(${28 + hue / 2}, 85%, 68%)`} />
      {/* Highlight */}
      <ellipse cx="93" cy="93" rx="6" ry="5" fill={hi} />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Rose Bud — closed, pointed petals
   ────────────────────────────────────────── */
function RoseBud({ size, opacity, hue, rotate }: { size: number; opacity: number; hue: number; rotate: number }) {
  const p1 = `hsl(${343 + hue}, 68%, 80%)`;
  const p2 = `hsl(${348 + hue}, 72%, 74%)`;
  const leaf = `hsl(${140}, 45%, 55%)`;

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
    >
      {/* Stem */}
      <line x1="60" y1="130" x2="60" y2="155" stroke={leaf} strokeWidth="3" strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx="45" cy="138" rx="16" ry="8" fill={leaf} transform="rotate(-30 45 138)" />
      <ellipse cx="75" cy="142" rx="16" ry="8" fill={leaf} transform="rotate(30 75 142)" />
      {/* Sepals */}
      <ellipse cx="60" cy="115" rx="8" ry="18" fill={leaf} opacity="0.85" />
      <ellipse cx="48" cy="112" rx="6" ry="16" fill={leaf} opacity="0.8" transform="rotate(-20 48 112)" />
      <ellipse cx="72" cy="112" rx="6" ry="16" fill={leaf} opacity="0.8" transform="rotate(20 72 112)" />
      {/* Outer bud petals */}
      <ellipse cx="60" cy="72" rx="20" ry="42" fill={p1} />
      <ellipse cx="60" cy="72" rx="20" ry="42" fill={p1} transform="rotate(30 60 100)" />
      <ellipse cx="60" cy="72" rx="20" ry="42" fill={p1} transform="rotate(-30 60 100)" />
      {/* Inner petals */}
      <ellipse cx="60" cy="78" rx="14" ry="34" fill={p2} />
      <ellipse cx="60" cy="78" rx="14" ry="34" fill={p2} transform="rotate(18 60 100)" />
      <ellipse cx="60" cy="78" rx="14" ry="34" fill={p2} transform="rotate(-18 60 100)" />
      {/* Tip highlight */}
      <ellipse cx="55" cy="55" rx="5" ry="8" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

/* ──────────────────────────────────────────
   Main component
   ────────────────────────────────────────── */
interface FlowerBlurBgProps {
  count?: number;
  className?: string;
  variant?: 'roses' | 'petals' | 'mixed';
}

export function FlowerBlurBg({
  count = 10,
  className = '',
  variant = 'mixed',
}: FlowerBlurBgProps) {
  const flowers = useMemo(() => generateFlowers(count), [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {flowers.map((f) => {
        const resolvedType = variant === 'roses' ? 0 : variant === 'petals' ? 1 : f.type;
        return (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: f.size,
              height: resolvedType === 2 ? f.size * 1.3 : f.size,
              transform: 'translate(-50%, -50%)',
              filter: `blur(${f.blur}px)`,
              animation: `fbg-drift-${f.driftVariant} ${f.duration}s ${f.delay}s ease-in-out infinite alternate`,
              willChange: 'transform',
              zIndex: 0,
            }}
          >
            {resolvedType === 0 && (
              <RoseFull size={f.size} opacity={f.opacity} hue={f.hue} rotate={f.rotate} />
            )}
            {resolvedType === 1 && (
              <OpenBloom size={f.size} opacity={f.opacity} hue={f.hue} rotate={f.rotate} />
            )}
            {resolvedType === 2 && (
              <RoseBud size={f.size} opacity={f.opacity} hue={f.hue} rotate={f.rotate} />
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes fbg-drift-0 {
          0%   { transform: translate(-50%, -50%) translate(0px, 0px)    rotate(0deg)   scale(1);    }
          100% { transform: translate(-50%, -50%) translate(18px, -22px)  rotate(12deg)  scale(1.06); }
        }
        @keyframes fbg-drift-1 {
          0%   { transform: translate(-50%, -50%) translate(0px, 0px)    rotate(0deg)   scale(1);    }
          100% { transform: translate(-50%, -50%) translate(-20px, 18px)  rotate(-15deg) scale(1.04); }
        }
        @keyframes fbg-drift-2 {
          0%   { transform: translate(-50%, -50%) translate(0px, 0px)    rotate(0deg)   scale(1);    }
          100% { transform: translate(-50%, -50%) translate(24px, 14px)   rotate(18deg)  scale(0.95); }
        }
        @keyframes fbg-drift-3 {
          0%   { transform: translate(-50%, -50%) translate(0px, 0px)    rotate(0deg)   scale(1);    }
          100% { transform: translate(-50%, -50%) translate(-16px, -20px) rotate(-10deg) scale(1.08); }
        }
      `}</style>
    </div>
  );
}

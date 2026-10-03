'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UploadCloud, X } from 'lucide-react';
import { QuestionOption } from '@/types';

// ─── Number Slider ──────────────────────────────────────────────
export function NumberSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="mb-12 relative w-full flex justify-center">
        <span className="font-display text-8xl md:text-[9rem] font-bold text-ink leading-none">
          {value}
        </span>
        {unit && (
          <span className="absolute -right-4 md:-right-8 bottom-4 text-xl text-ink/50 font-medium">
            {unit}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-border rounded-full appearance-none outline-none accent-gold focus:outline-none"
        style={{
          background: `linear-gradient(to right, var(--color-gold) ${
            ((value - min) / (max - min)) * 100
          }%, var(--color-border) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <div className="flex justify-between w-full mt-4 text-sm font-medium text-ink/40">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// ─── Card Selector ──────────────────────────────────────────────
export function CardSelector({
  options,
  selected,
  onChange,
  multiple = false,
}: {
  options: QuestionOption[];
  selected: string | string[];
  onChange: (val: string | string[]) => void;
  multiple?: boolean;
}) {
  const toggleSelection = (val: string) => {
    if (!multiple) {
      onChange(val);
      return;
    }
    const current = (selected as string[]) || [];
    if (current.includes(val)) {
      onChange(current.filter((v) => v !== val));
    } else {
      onChange([...current, val]);
    }
  };

  const isSelected = (val: string) => {
    if (multiple) return ((selected as string[]) || []).includes(val);
    return selected === val;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => toggleSelection(option.value)}
          className={cn(
            'group relative p-6 rounded-2xl border transition-all duration-500 text-left overflow-hidden',
            isSelected(option.value)
              ? 'bg-ink border-ink text-ivory shadow-editorial'
              : 'bg-card border-border/50 hover:border-gold hover:shadow-gold'
          )}
        >
          {isSelected(option.value) && (
            <motion.div
              layoutId="selected-indicator"
              className="absolute inset-0 bg-ink z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <div className="relative z-10 flex flex-col h-full">
            {option.icon && (
              <span className="text-3xl mb-4 block transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-bottom-left">
                {option.icon}
              </span>
            )}
            <h4
              className={cn(
                'font-display text-lg font-semibold mb-2 transition-colors duration-300',
                isSelected(option.value) ? 'text-ivory' : 'text-ink'
              )}
            >
              {option.label}
            </h4>
            {option.description && (
              <p
                className={cn(
                  'text-xs leading-relaxed mt-auto',
                  isSelected(option.value) ? 'text-ivory/70' : 'text-ink/50'
                )}
              >
                {option.description}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Image Selector ─────────────────────────────────────────────
export function ImageSelector({
  options,
  selected,
  onChange,
  multiple = false,
}: {
  options: QuestionOption[];
  selected: string | string[];
  onChange: (val: string | string[]) => void;
  multiple?: boolean;
}) {
  const toggleSelection = (val: string) => {
    if (!multiple) {
      onChange(val);
      return;
    }
    const current = (selected as string[]) || [];
    if (current.includes(val)) {
      onChange(current.filter((v) => v !== val));
    } else {
      onChange([...current, val]);
    }
  };

  const isSelected = (val: string) => {
    if (multiple) return ((selected as string[]) || []).includes(val);
    return selected === val;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl mx-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => toggleSelection(option.value)}
          className={cn(
            'group relative aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500',
            isSelected(option.value) ? 'ring-2 ring-gold ring-offset-4 ring-offset-ivory' : ''
          )}
        >
          <img
            src={option.image}
            alt={option.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110"
          />
          <div
            className={cn(
              'absolute inset-0 transition-colors duration-500',
              isSelected(option.value)
                ? 'bg-ink/40'
                : 'bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-100'
            )}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center">
            <span
              className={cn(
                'font-display text-lg font-medium text-ivory tracking-wide',
                isSelected(option.value) ? 'text-gold drop-shadow-md' : ''
              )}
            >
              {option.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Color Picker ───────────────────────────────────────────────
export function ColorPicker({
  colors,
  selected,
  onChange,
  multiple = true,
}: {
  colors: { hex: string; name: string }[];
  selected: string[];
  onChange: (val: string[]) => void;
  multiple?: boolean;
}) {
  const toggleColor = (hex: string) => {
    const current = selected || [];
    if (current.includes(hex)) {
      onChange(current.filter((c) => c !== hex));
    } else {
      if (multiple) {
        onChange([...current, hex]);
      } else {
        onChange([hex]);
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
      {colors.map((color) => {
        const isSel = (selected || []).includes(color.hex);
        return (
          <button
            key={color.hex}
            onClick={() => toggleColor(color.hex)}
            className="group flex flex-col items-center gap-3"
          >
            <div
              className={cn(
                'w-14 h-14 md:w-16 md:h-16 rounded-full shadow-sm transition-all duration-300',
                'hover:scale-110 hover:shadow-md relative',
                isSel ? 'ring-2 ring-ink ring-offset-4 ring-offset-ivory scale-110' : 'ring-1 ring-border/50'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {isSel && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className={cn(
                      'w-3 h-3 rounded-full',
                      ['#FFFFFF', '#FFFACD', '#F5F5DC'].includes(color.hex) ? 'bg-ink' : 'bg-ivory'
                    )}
                  />
                </motion.div>
              )}
            </div>
            <span
              className={cn(
                'text-xs font-medium transition-colors',
                isSel ? 'text-ink' : 'text-ink/40 group-hover:text-ink/70'
              )}
            >
              {color.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Photo Upload ───────────────────────────────────────────────
export function PhotoUpload({
  photos,
  urls,
  onUpload,
  onRemove,
}: {
  photos: File[];
  urls: string[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles.slice(0, 3 - photos.length));
    },
    [onUpload, photos.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 3,
    disabled: photos.length >= 3,
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Upload Zone */}
      {photos.length < 3 && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer',
            isDragActive
              ? 'border-gold bg-gold/5 scale-[1.02]'
              : 'border-border hover:border-gold/50 hover:bg-card/50'
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-6">
            <UploadCloud className="w-8 h-8 text-ink/60" />
          </div>
          <h4 className="font-display text-xl font-medium text-ink mb-2">
            {isDragActive ? 'Drop photos here' : 'Upload your photos'}
          </h4>
          <p className="text-sm text-ink/50 font-body mb-6">
            Drag & drop, or click to browse. Up to 3 photos.
          </p>
          <ul className="text-xs text-ink/40 space-y-1 text-left inline-block">
            <li>• Face the camera directly in good lighting</li>
            <li>• Include at least one full-body shot</li>
            <li>• Avoid heavy filters or sunglasses</li>
          </ul>
        </div>
      )}

      {/* Previews */}
      {urls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {urls.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-editorial"
            >
              <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(i);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/80 text-ivory flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

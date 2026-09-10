'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DuolingoButton3DProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  showArrow?: boolean;
}

export default function DuolingoButton3D({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  className = '',
  showArrow = true,
}: DuolingoButton3DProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative inline-flex items-center justify-center gap-2 select-none
        font-extrabold text-[14px] sm:text-[15.5px] tracking-wide
        rounded-2xl transition-all duration-75 cursor-pointer
        ${isPrimary 
          ? disabled || isLoading
            ? 'bg-[#E5E7EB] border-2 border-[#D1D5DB] border-b-[4px] border-b-[#9CA3AF] text-[#9CA3AF] cursor-not-allowed transform-none'
            : 'bg-[#0172FD] hover:bg-[#1A80FE] border-2 border-[#0058C7] border-b-[4.5px] border-b-[#00459E] active:translate-y-[2.5px] active:border-b-[2px] text-white'
          : disabled || isLoading
            ? 'bg-[#F3F4F6] border-2 border-[#E5E7EB] border-b-[3.5px] border-b-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed transform-none'
            : 'bg-white hover:bg-[#F9FAFB] border-2 border-[#E5E7EB] border-b-[4px] border-b-[#D1D5DB] active:translate-y-[2px] active:border-b-[2px] text-[#374151]'
        }
        ${className}
      `}
    >
      <span>{isLoading ? 'Saving...' : children}</span>
      {!isLoading && showArrow && (
        <ArrowRight size={16} strokeWidth={2.5} className="shrink-0" />
      )}
    </button>
  );
}

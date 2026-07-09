'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Hand, Check } from 'lucide-react';

interface MatchCardProps {
  id: string;
  img: string;
  label: string;
  isMatched: boolean;
  onDragStart?: () => void;
  onDrag?: (event: any, info: any) => void;
  onDragEnd?: (event: any, info: any) => void;
  shake?: boolean;
}

export function MatchCard({
  id,
  img,
  label,
  isMatched,
  onDragStart,
  onDrag,
  onDragEnd,
  shake = false
}: MatchCardProps) {
  return (
    <div className="relative w-[18vw] h-[18vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 select-none">
      {!isMatched ? (
        <motion.div
          drag
          dragSnapToOrigin={true}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          animate={shake ? { x: [0, -10, 8, -8, 6, 0] } : { x: 0 }}
          transition={shake ? { duration: 0.35, ease: "easeInOut" } : { type: "spring", stiffness: 300, damping: 20 }}
          whileDrag={{
            scale: 1.08,
            rotate: 2.5,
            boxShadow: "0 20px 35px rgba(1,114,253,0.15)",
            zIndex: 100,
            cursor: 'grabbing'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute inset-0 bg-white border border-slate-100 rounded-[1.2rem] shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center cursor-grab active:cursor-grabbing z-30"
        >
          <div className="w-14 h-14 relative pointer-events-none">
            <Image src={img} alt={label} fill className="object-contain" />
          </div>
          <div className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center opacity-85 shadow-sm">
            <Hand className="w-2.5 h-2.5 text-slate-500" />
          </div>
        </motion.div>
      ) : (
        // Locked matched state placeholder
        <div className="absolute inset-0 bg-slate-100/40 border border-dashed border-slate-200 rounded-[1.2rem] flex items-center justify-center z-10">
          <Check className="w-6 h-6 text-slate-300 stroke-[3.5]" />
        </div>
      )}
    </div>
  );
}

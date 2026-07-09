'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

interface DropSlotProps {
  id: string;
  img: string;
  label: string;
  isMatched: boolean;
  isNear: boolean;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export function DropSlot({
  id,
  img,
  label,
  isMatched,
  isNear,
  targetRef
}: DropSlotProps) {
  const borderControls = useAnimation();

  // Glow pulse when element is near or when matches occur
  useEffect(() => {
    if (isMatched) {
      void borderControls.start({
        borderColor: '#0172FD',
        borderStyle: 'solid',
        scale: [1, 1.06, 1],
        boxShadow: [
          '0 0 0px rgba(1,114,253,0)',
          '0 0 15px rgba(1,114,253,0.35)',
          '0 0 0px rgba(1,114,253,0)'
        ],
        transition: { duration: 0.4 }
      });
    } else if (isNear) {
      void borderControls.start({
        borderColor: '#0172FD',
        borderStyle: 'solid',
        scale: 1.04,
        boxShadow: '0 0 12px rgba(1,114,253,0.22)',
        transition: { repeat: Infinity, repeatType: 'reverse' as const, duration: 0.5 }
      });
    } else {
      void borderControls.start({
        borderColor: 'rgb(203, 213, 225)', // slate-300
        borderStyle: 'dashed',
        scale: 1,
        boxShadow: 'none',
        transition: { duration: 0.25 }
      });
    }
  }, [isMatched, isNear, borderControls]);

  return (
    <div className="flex items-center justify-between gap-4 w-full">
      
      {/* Source shape container (Left) */}
      <div className="w-[18vw] h-[18vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-[1.2rem] flex items-center justify-center shadow-sm relative z-10">
        <div className="w-14 h-14 relative">
          <Image src={img} alt={label} fill className="object-contain" />
        </div>
      </div>

      {/* Dotted separator connector that draws from left to right */}
      <div className="flex-1 flex items-center justify-center relative px-2">
        {/* Underlay grey dotted line */}
        <div className="absolute inset-x-0 h-1.5 flex items-center">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="flex-1 border-t-2 border-dotted border-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-200 bg-white" />
        </div>

        {/* Overlay animated active drawing SVG line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <motion.line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="#0172FD"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isMatched ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Target Drop Zone (Right) */}
      <motion.div
        ref={targetRef}
        animate={borderControls}
        className={`w-[18vw] h-[18vw] max-w-[80px] max-h-[80px] sm:w-20 sm:h-20 rounded-[1.2rem] flex items-center justify-center relative transition-all duration-300 ${
          isMatched ? 'bg-[#F0F7FF]' : 'bg-white/40 backdrop-blur-sm'
        }`}
      >
        {isMatched ? (
          <motion.div
            initial={{ scale: 0.4, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15 }} // Spring bounce settle
            className="w-14 h-14 relative"
          >
            <Image src={img} alt={label} fill className="object-contain" />
          </motion.div>
        ) : (
          <span className="text-slate-300 font-bold text-[10px] md:text-xs tracking-wider">Empty</span>
        )}
      </motion.div>

    </div>
  );
}

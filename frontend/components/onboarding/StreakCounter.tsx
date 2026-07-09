'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Gem } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number; // Represents onboardingWins (e.g. 8 to 9)
  triggerCharge: boolean;
  gemsCount?: number;
  showGems?: boolean;
}

export function StreakCounter({ currentStreak, triggerCharge, gemsCount = 240, showGems = false }: StreakCounterProps) {
  const [displayedStreak, setDisplayedStreak] = useState(currentStreak - 1);
  const [displayedGems, setDisplayedGems] = useState(gemsCount);
  const emblemControls = useAnimation();

  // Streak count-up tween
  useEffect(() => {
    if (triggerCharge) {
      const timeout = setTimeout(() => {
        let start = currentStreak - 1;
        const end = currentStreak;
        const duration = 500; // 0.5s
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(start + (end - start) * progress);
          setDisplayedStreak(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);

        // Charge animation sequence for the Hexagon Streak Icon
        void emblemControls.start({
          scale: [1, 1.35, 1.15],
          rotate: [0, 15, -10, 0],
          filter: [
            "drop-shadow(0 0 0px rgba(1,114,253,0))",
            "drop-shadow(0 0 20px rgba(1,114,253,0.85))",
            "drop-shadow(0 0 8px rgba(1,114,253,0.45))"
          ],
          transition: { duration: 0.65, ease: "easeOut" }
        });
      }, 350);

      return () => clearTimeout(timeout);
    } else {
      setDisplayedStreak(currentStreak - 1);
    }
  }, [currentStreak, triggerCharge, emblemControls]);

  // Gems count-up tween
  useEffect(() => {
    if (triggerCharge) {
      const timeout = setTimeout(() => {
        let start = gemsCount - 10;
        const end = gemsCount;
        const duration = 500;
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const current = Math.floor(start + (end - start) * progress);
          setDisplayedGems(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setDisplayedGems(gemsCount);
    }
  }, [gemsCount, triggerCharge]);

  return (
    <div className="flex items-center gap-4 bg-white border border-slate-100/80 rounded-2xl px-5 py-2 shadow-sm min-w-[320px]">
      
      {/* Streak section */}
      <div className="flex items-center gap-2 shrink-0">
        <motion.div animate={emblemControls} className="w-5.5 h-5.5 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-full h-full transition-all duration-300">
            <defs>
              <linearGradient id="streakEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3A96FF" />
                <stop offset="100%" stopColor="#0172FD" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5L21.5 8v11L12 24.5 2.5 19V8L12 2.5z"
              fill={triggerCharge ? "url(#streakEmblemGrad)" : "rgba(1,114,253,0.12)"}
              stroke="#0172FD"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="12,7 15.5,9.5 15.5,13.5 12,16 8.5,13.5 8.5,9.5"
              fill={triggerCharge ? "#E0F2FE" : "rgba(1,114,253,0.05)"}
              className={triggerCharge ? 'animate-pulse' : ''}
            />
          </svg>
        </motion.div>
        
        <span className="text-[#071233] font-extrabold text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>
          Wins: {displayedStreak}
        </span>
      </div>

      {/* Progress dots - 15 dots representing onboarding steps */}
      <div className="flex-1 flex gap-0.5 items-center">
        {Array.from({ length: 15 }).map((_, idx) => {
          const stepNumber = idx + 1;
          const isFilled = stepNumber <= displayedStreak;
          return (
            <div 
              key={stepNumber} 
              className={`h-2.5 rounded-full flex-1 transition-all duration-500 ${
                isFilled
                  ? 'bg-gradient-to-r from-[#0172FD] to-[#3A96FF]' 
                  : 'bg-slate-100'
              }`} 
            />
          );
        })}
      </div>

      {/* XP/Gems counter if requested */}
      {showGems && (
        <div className="flex items-center gap-1.5 bg-blue-50/50 border border-blue-100/50 rounded-full px-2 py-0.5 ml-1 shrink-0">
          <Gem className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
          <span className="text-blue-600 font-extrabold text-xs">{displayedGems}</span>
        </div>
      )}
    </div>
  );
}

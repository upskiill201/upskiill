'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  color: string;
  size: number;
  rotation: number;
  scale: number[];
  delay: number;
}

const BRAND_COLORS = ['#3372EE', '#818CF8', '#A5B4FC', '#4F46E5', '#3B82F6'];

export function ConfettiBurst({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const fromLeft = i % 2 === 0;
      const startX = fromLeft ? '-5vw' : '105vw';
      const startY = '95vh';

      const endX = fromLeft 
        ? `${Math.random() * 40 + 20}vw` 
        : `${Math.random() * 40 + 40}vw`;
      const endY = `${Math.random() * 50 + 15}vh`;

      newParticles.push({
        id: i,
        startX,
        startY,
        endX,
        endY,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        size: Math.random() * 10 + 6,
        rotation: Math.random() * 360,
        scale: [0.2, 1, 0.8, 0],
        delay: Math.random() * 0.45
      });
    }

    setParticles(newParticles);
  }, [active]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {active && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 1, 
              x: p.startX, 
              y: p.startY,
              rotate: 0,
              scale: 0.1
            }}
            animate={{ 
              x: [p.startX, p.endX, p.endX],
              y: [p.startY, p.endY, '105vh'],
              rotate: [0, p.rotation, p.rotation * 2.5],
              scale: p.scale
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.8, 
              ease: [0.12, 0.8, 0.36, 1], // Launch-drift ease
              delay: p.delay 
            }}
            className="absolute rounded-sm"
            style={{
              backgroundColor: p.color,
              width: p.size,
              height: p.size * (Math.random() > 0.55 ? 1.6 : 1),
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

'use client';

/**
 * The lesson finished a unit — or the whole course.
 *
 * Tey stands on the pedestal (or leaps, for a whole course), the unit's
 * bar fills its last slice, and the bonus XP the server already paid is
 * shown as what it is: a bonus for finishing the unit.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Layers } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { playSound } from '@/lib/audio/lessonSounds';
import { fireConfetti } from '@/lib/confetti';
import type { UnitSummary } from '@/lib/lesson/completion';
import { TEY_POSE_SRC } from '../TeySays';

export function UnitComplete({ unit, line }: { unit: UnitSummary; line: string }) {
  const reducedMotion = useReducedMotion();
  const course = unit.courseComplete;
  const total = Math.max(1, unit.lessonsTotal);
  const color = course ? 'var(--lesson-gold)' : 'var(--color-brand)';

  useEffect(() => {
    playSound(course ? 'courseComplete' : 'unitComplete');
    if (!reducedMotion) {
      fireConfetti({ particleCount: course ? 160 : 100, spread: 110, startVelocity: 45, origin: { y: 0.35 } });
    }
  }, [course, reducedMotion]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
      <motion.div
        className="relative w-[180px] h-[200px] md:w-[220px] md:h-[244px]"
        initial={reducedMotion ? false : { scale: 0.3, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 15 }}
      >
        <Image
          src={TEY_POSE_SRC[course ? 'cheering' : 'welcome']}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="220px"
          className="object-contain object-bottom"
        />
      </motion.div>

      <motion.p
        className="mt-5 text-[14px] font-extrabold uppercase tracking-[0.1em]"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {course ? unit.courseTitle : unit.unitLabel}
      </motion.p>
      <motion.h1
        className="mt-1 text-[30px] md:text-[36px] font-extrabold leading-tight"
        style={{ color: course ? 'var(--lesson-gold-dark)' : 'var(--color-ink)', fontFamily: 'var(--font-jakarta)' }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 520, damping: 18 }}
      >
        {course ? 'Course complete!' : 'Unit complete!'}
      </motion.h1>
      <p className="mt-2 max-w-[420px] text-[16px] md:text-[17px] font-bold text-[var(--text-secondary)] leading-snug">
        {line}
      </p>

      <div className="mt-7 w-full max-w-[440px] rounded-[20px] border-2 border-[var(--border)] p-4 text-left">
        <p className="text-[16px] font-extrabold text-ink truncate">{unit.title}</p>
        <div className="mt-3 h-5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
          <motion.div
            className="relative h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: `${((unit.lessonsCompleted - 1) / total) * 100}%` }}
            animate={{ width: `${(unit.lessonsCompleted / total) * 100}%` }}
            transition={reducedMotion ? { duration: 0 } : { delay: 0.7, type: 'spring', stiffness: 120, damping: 18 }}
          >
            <span aria-hidden="true" className="absolute left-2 right-2 top-[4px] h-[5px] rounded-full bg-white/35" />
          </motion.div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[14px] font-bold text-[var(--text-secondary)]">
          <span>
            {unit.lessonsCompleted} / {unit.lessonsTotal} lessons
          </span>
          {unit.bonusXp > 0 && (
            <motion.span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-extrabold"
              style={{ backgroundColor: 'color-mix(in srgb, var(--lesson-gold) 22%, white)', color: 'var(--lesson-gold-dark)' }}
              initial={reducedMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1, type: 'spring', stiffness: 520, damping: 14 }}
            >
              <Image src="/Icons/gem.png" alt="" aria-hidden="true" width={16} height={16} />+{unit.bonusXp} bonus XP
            </motion.span>
          )}
        </div>
      </div>

      {course && (
        <div className="mt-3 w-full max-w-[440px] flex gap-3">
          {[
            { icon: Layers, label: 'Units', value: `${unit.sectionsCompleted}/${unit.sectionsTotal}` },
            { icon: BookOpen, label: 'Lessons', value: `${unit.courseLessonsCompleted}/${unit.courseLessonsTotal}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex-1 rounded-[18px] border-2 border-[var(--border)] p-3 flex items-center gap-2.5">
              <Icon className="w-5 h-5 stroke-[2.6] text-[var(--lesson-gold-dark)]" aria-hidden="true" />
              <span className="text-[14px] font-bold text-[var(--text-secondary)]">{label}</span>
              <span className="ml-auto text-[17px] font-extrabold text-ink tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UnitComplete;

'use client';

/**
 * CreatorRoleVisual — the terminology section's visual. Lighter than the
 * dashboard mocks on purpose: this section's job is definitional ("people
 * who teach on Teyro are Creators — Instructor works too"), not another
 * results showcase, so it's a single profile-style badge card rather than a
 * KPI grid. Same chunky-card visual language as the other Creator Studio
 * visuals on this page, reused here for consistency rather than introducing
 * a third style.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export default function CreatorRoleVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4 }}
      className="w-full rounded-card p-5"
      style={{ background: '#F8FAFC' }}
    >
      <div className="rounded-2xl bg-white p-5" style={{ border: '2px solid #E5E5E5', borderBottomWidth: 4 }}>
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full" style={{ border: '2px solid #E5E5E5' }}>
            <Image src="/dashboard tey.webp" alt="" fill className="object-contain" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#3c3c3c]">Amara O.</p>
            <span
              className="mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold"
              style={{ backgroundColor: '#DDF4FF', color: '#1899D6' }}
            >
              <GraduationCap size={12} /> Creator &middot; Instructor
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2.5 border-t border-slate-100 pt-3">
          <div className="flex flex-1 items-center gap-2 text-sm">
            <BookOpen size={16} color="#58A700" />
            <span className="font-semibold text-slate-500">3 courses live</span>
          </div>
          <div className="flex flex-1 items-center gap-2 text-sm">
            <Users size={16} color="#1899D6" />
            <span className="font-semibold text-slate-500">6.2K learners</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

'use client';

/**
 * TeachHero — the /teach page's own hero, structurally identical to the
 * homepage's Hero (components/homepage/v2/Hero.tsx: full bg-brand field,
 * heavy short headline, one sentence, a strong CTA, Tey as the visual) but
 * not a reuse of that component directly — the copy and single CTA here are
 * creator-facing, not learner-facing, and there's no install-links row.
 */

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function TeachHero() {
  const mascotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const heroVisible = useInView(mascotRef, { margin: '200px 0px 200px 0px' });

  return (
    <section className="flex min-h-[100dvh] w-full items-center bg-brand py-20">
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          <h1
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-celebration)' }}
          >
            Turn What You Know Into a Real Income
          </h1>

          <p className="mt-7 max-w-[38ch] text-lg leading-relaxed text-white/80 md:text-xl">
            Publish a course, teach on your own schedule, and get paid on one you can count on.
          </p>

          <div className="mt-9">
            <Link
              href="/creator/onboarding"
              className="flex h-14 w-fit items-center justify-center rounded-btn border-b-4 border-slate-200 bg-white px-8 text-base font-extrabold tracking-wide text-brand transition-colors hover:bg-slate-50 active:translate-y-[2px] active:border-b-0"
            >
              BECOME A CREATOR
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          className="order-1 lg:order-2"
        >
          <div ref={mascotRef} className="relative mx-auto aspect-square w-full max-w-[420px]">
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: heroVisible && !reducedMotion ? Infinity : 0,
                ease: 'easeInOut',
              }}
              className="relative h-full w-full"
            >
              <Image
                src="/dashboard tey.webp"
                alt="Tey, the Teyro mascot"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-contain"
              />
            </motion.div>

            {/* Earnings pill */}
            <div className="absolute right-0 top-6 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-lift ring-1 ring-black/4">
              <div className="leading-none">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">This month</div>
                <div className="mt-1 text-sm font-extrabold text-ink">$8,900.00</div>
              </div>
            </div>

            {/* Learners pill */}
            <div className="absolute bottom-10 left-0 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-lift ring-1 ring-black/4">
              <div className="leading-none">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">Learners</div>
                <div className="mt-1 text-sm font-extrabold text-brand">6.2K enrolled</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

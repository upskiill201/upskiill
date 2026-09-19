'use client';

/**
 * Hero — full viewport height, Coddy's structural rhythm applied to Teyro's
 * own product: heavy short headline, one sentence, a strong CTA, install
 * options right under it, and Tey as the visual — not decoration bolted on
 * beside the text, but the actual character learners meet in the product.
 *
 * /dashboard tey.webp is the real in-app Tey (the celebration mascot, the
 * streak modal's "Friends" tab, the community empty state) — not the
 * onboarding illustration this hero used before. Same character family,
 * but this is the one the product actually shows people.
 *
 * Runs on brand blue with white content, not white-with-blue-accents — the
 * same inversion FinalCta's wave uses, so the page opens and closes on the
 * same color instead of only using it as a button accent in between. The
 * primary CTA flips to white-filled/blue-text to stay legible against the
 * blue field, mirroring FinalCta's own button.
 */

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Smartphone } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const mascotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // The float is the page's only infinite loop. Gated on visibility so it
  // stops driving frames once the hero scrolls away.
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
          {/* Baloo 2, not the default h1 (Plus Jakarta via globals.css) —
              the marketing headline font, loaded scoped to this route in
              app/page.tsx. See that file for why. */}
          <h1
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-celebration)' }}
          >
            The fun and effective way to learn anything
          </h1>

          <p className="mt-7 max-w-[38ch] text-lg leading-relaxed text-white/80 md:text-xl">
            Short lessons, real practice, and a reason to come back tomorrow.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/start"
              className="flex h-14 items-center justify-center rounded-btn border-b-4 border-slate-200 bg-white px-8 text-base font-extrabold tracking-wide text-brand transition-colors hover:bg-slate-50 active:translate-y-[2px] active:border-b-0"
            >
              START LEARNING
            </Link>
            <Link
              href="/start"
              className="flex h-14 items-center justify-center rounded-btn border border-white/30 bg-transparent px-6 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              I already have an account
            </Link>
          </div>

          {/* Install options, directly under the CTA — Teyro is a PWA, not a
              store listing, so these are plain text links to /start (the
              real install gateway), never fake App Store / Play badges. */}
          <div className="mt-5 flex items-center gap-5">
            <Link href="/start" className="flex items-center gap-1.5 text-sm font-bold text-white/75 transition-colors hover:text-white">
              <Smartphone size={16} strokeWidth={2.5} />
              Install on iPhone
            </Link>
            <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden />
            <Link href="/start" className="flex items-center gap-1.5 text-sm font-bold text-white/75 transition-colors hover:text-white">
              <Smartphone size={16} strokeWidth={2.5} />
              Install on Android
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

            {/* Streak pill */}
            <div className="absolute right-0 top-6 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-lift ring-1 ring-black/4">
              <Image src="/Icons/burn.png" alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
              <div className="leading-none">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">Streak</div>
                <div className="mt-1 text-sm font-extrabold text-ink">7 days</div>
              </div>
            </div>

            {/* XP pill */}
            <div className="absolute bottom-10 left-0 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-2.5 shadow-lift ring-1 ring-black/4">
              <Image src="/Icons/gem.png" alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
              <div className="leading-none">
                <div className="text-[10px] font-extrabold uppercase tracking-wide text-ink-soft">Earned</div>
                <div className="mt-1 text-sm font-extrabold text-brand">+10 XP</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

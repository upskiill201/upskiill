'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { mutate } from 'swr';
import { playHaptic } from '@/lib/haptics';
import styles from './PullToRefresh.module.css';

const PULL_THRESHOLD = 70; // px of downward drag required to trigger a refresh
const MAX_PULL = 110; // px — indicator travel caps here even if the finger drags further
const RESISTANCE = 0.45; // rubber-band factor: 1px of finger movement = RESISTANCE px of pull

interface PullToRefreshProps {
  children: React.ReactNode;
  /** Called when the user releases past the threshold. Defaults to
   *  revalidating every SWR key currently on screen. */
  onRefresh?: () => Promise<unknown>;
}

/**
 * Facebook/Duolingo-style pull-to-refresh, scoped to student pages.
 *
 * Touch-only, and only takes over the gesture when the page is already
 * scrolled to the very top and the drag is downward — so it never fights
 * normal scrolling, and never intercepts the lesson player's horizontal
 * `drag="x"` section carousel (app/learn/[id]/section/[sectionIndex]/page.tsx).
 *
 * Refresh calls SWR's global `mutate()` (revalidate everything currently
 * cached) rather than `location.reload()` — a full reload would throw away
 * the whole React tree and repeat the auth/session waterfall this same
 * performance pass just removed.
 */
export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const trackingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only start tracking if the page (not some inner scroller) is at the top.
    if (window.scrollY > 0) {
      touchStartY.current = null;
      trackingRef.current = false;
      return;
    }
    touchStartY.current = e.touches[0].clientY;
    trackingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!trackingRef.current || touchStartY.current === null || isRefreshing) return;

    const delta = e.touches[0].clientY - touchStartY.current;
    // Only care about downward drags while still at the top of the page.
    if (delta <= 0 || window.scrollY > 0) {
      setPullDistance(0);
      return;
    }

    const resisted = Math.min(MAX_PULL, delta * RESISTANCE);
    setPullDistance(resisted);
  }, [isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!trackingRef.current) return;
    trackingRef.current = false;
    touchStartY.current = null;

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      playHaptic('medium');
      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          // Revalidate every SWR-cached key currently in use — the app-wide
          // default (dashboard, gamification, streak, missions, chest,
          // weekly progress, monthly quest, notifications, etc).
          await mutate(() => true, undefined, { revalidate: true });
        }
      } catch (err) {
        console.error('Pull-to-refresh failed:', err);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, isRefreshing, onRefresh]);

  const progress = Math.min(1, pullDistance / PULL_THRESHOLD);
  const showIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div
      ref={containerRef}
      className={styles.wrap}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {showIndicator && (
        <div
          className={styles.indicatorTrack}
          style={{ height: isRefreshing ? MAX_PULL / 1.6 : pullDistance }}
          aria-live="polite"
          aria-busy={isRefreshing}
        >
          <div
            className={`${styles.indicator} ${isRefreshing ? styles.spinning : ''}`}
            style={{
              transform: prefersReducedMotion.current
                ? undefined
                : `scale(${0.6 + progress * 0.4}) rotate(${isRefreshing ? undefined : progress * 360}deg)`,
              opacity: Math.max(0.3, progress),
            }}
          >
            <Image src="/Icons/burn.png" alt="" width={28} height={28} priority={false} />
          </div>
        </div>
      )}
      <div
        style={{
          transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
          transition: trackingRef.current ? undefined : 'transform 200ms ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

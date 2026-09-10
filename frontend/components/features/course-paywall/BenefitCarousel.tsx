'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CircleCheck } from 'lucide-react';
import { VALUE_PROPS } from './valueProps';
import styles from './BenefitCarousel.module.css';

interface BenefitCarouselProps {
  /**
   * Auto-advance interval in ms. Pass null to disable autoplay entirely
   * (e.g. inside a payment form where motion competes with input).
   */
  autoAdvanceMs?: number | null;
}

/**
 * Swipeable snap-carousel of the "Why Teyro works" benefit cards.
 * Replaces the old arrow/dots slide deck: no chrome, just swipe + dots.
 * Auto-advance is gated on prefers-reduced-motion, tab visibility, and any
 * user interaction (hover / focus / touch pauses or stops it).
 */
export default function BenefitCarousel({ autoAdvanceMs = 6000 }: BenefitCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const stoppedRef = useRef(false); // user took over — stop advancing for good
  const reducedMotionRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = VALUE_PROPS.length;

  // Track prefers-reduced-motion reactively.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  /** Distance between two adjacent cards (card width + gap). */
  const getStride = useCallback((el: HTMLDivElement): number => {
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    if (first && second) return second.offsetLeft - first.offsetLeft;
    return first ? first.offsetWidth : el.clientWidth;
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(count - 1, index));
      el.scrollTo({
        left: clamped * getStride(el),
        behavior: reducedMotionRef.current ? 'auto' : 'smooth',
      });
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [count, getStride],
  );

  // Auto-advance — one interval for the component's life; every tick re-checks
  // the pause/visibility/reduced-motion gates so state changes need no resets.
  // autoAdvanceMs === null opts out of autoplay altogether.
  useEffect(() => {
    if (autoAdvanceMs === null || autoAdvanceMs <= 0) return;
    const id = setInterval(() => {
      if (stoppedRef.current || pausedRef.current || document.hidden || reducedMotionRef.current) {
        return;
      }
      scrollToIndex((activeIndexRef.current + 1) % count);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [count, scrollToIndex, autoAdvanceMs]);

  // rAF-throttled scroll tracking → active dot.
  const handleScroll = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = trackRef.current;
      if (!el || el.children.length === 0) return;
      const stride = getStride(el);
      if (stride <= 0) return;
      const idx = Math.round(el.scrollLeft / stride);
      const clamped = Math.max(0, Math.min(count - 1, idx));
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    });
  };

  // A real user swipe also means "stop auto-advancing".
  const markUserTouched = () => {
    stoppedRef.current = true;
  };

  return (
    <section
      className={styles.carousel}
      aria-label="Why Teyro works"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
      onTouchStart={markUserTouched}
    >
      <div className={styles.headerRow}>
        <span className={styles.sectionLabel}>Why Teyro works</span>
        <div className={styles.dotsRow} role="tablist" aria-label="Benefit pages">
          {VALUE_PROPS.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show benefit ${i + 1} of ${count}`}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        onScroll={handleScroll}
        onTouchStart={markUserTouched}
      >
        {VALUE_PROPS.map((slide) => {
          const Icon = slide.icon;
          return (
            <article key={slide.id} className={styles.card}>
              <div
                className={styles.iconCircle}
                style={{ backgroundColor: slide.iconBg, color: slide.iconColor }}
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={2.25} />
              </div>

              <span className={styles.tag}>{slide.tag}</span>
              <h3 className={styles.headline}>{slide.headline}</h3>

              <ul className={styles.highlightsList}>
                {slide.highlights.map((h) => (
                  <li key={h} className={styles.highlightItem}>
                    <CircleCheck size={13} className={styles.checkIcon} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <p className={styles.takeaway}>&ldquo;{slide.takeaway}&rdquo;</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

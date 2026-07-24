'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import TeyroBrandedLoader from '../ui/TeyroBrandedLoader';

const BACKGROUND_RESUME_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
const GUARD_300MS = 300; // Do not show loader if load completes in < 300ms
const MIN_HOLD_600MS = 600; // Minimum time loader stays visible once shown

interface TeyroLoaderContextType {
  /** Trigger Pattern A full-screen branded loader manually */
  showLoader: (overrideText?: string) => void;
  /** Hide Pattern A loader with 600ms min hold & 300ms guard */
  hideLoader: () => void;
  /** Whether loader is active */
  isLoading: boolean;
}

const TeyroLoaderContext = createContext<TeyroLoaderContextType>({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
});

export const useTeyroLoader = () => useContext(TeyroLoaderContext);

export function TeyroLoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState(false);
  const [overrideText, setOverrideText] = useState<string | undefined>(undefined);

  const requestStartTimeRef = useRef<number | null>(null);
  const visibleStartTimeRef = useRef<number | null>(null);
  const guardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers helper
  const clearTimers = () => {
    if (guardTimerRef.current) clearTimeout(guardTimerRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  /**
   * Request showing Pattern A loader.
   * Enforces 300ms guard before making visible.
   */
  const showLoader = useCallback((customText?: string) => {
    clearTimers();
    setOverrideText(customText);
    requestStartTimeRef.current = Date.now();

    // 300ms Guard: only show loader if action takes longer than 300ms
    guardTimerRef.current = setTimeout(() => {
      visibleStartTimeRef.current = Date.now();
      setIsVisible(true);
    }, GUARD_300MS);
  }, []);

  /**
   * Hide Pattern A loader.
   * Enforces 600ms minimum hold time if loader was rendered.
   */
  const hideLoader = useCallback(() => {
    clearTimers();

    // If 300ms guard hasn't fired yet, cancel it so loader never shows
    if (!visibleStartTimeRef.current) {
      requestStartTimeRef.current = null;
      setIsVisible(false);
      return;
    }

    // Loader is visible — check if it has been visible for at least 600ms
    const elapsedTimeVisible = Date.now() - visibleStartTimeRef.current;
    const remainingHold = Math.max(0, MIN_HOLD_600MS - elapsedTimeVisible);

    holdTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      requestStartTimeRef.current = null;
      visibleStartTimeRef.current = null;
      setOverrideText(undefined);
    }, remainingHold);
  }, []);

  // 1. Cold Start & Route Change trigger
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Show loader on cold start for smooth hydration
      showLoader();
      const coldStartTimer = setTimeout(() => {
        hideLoader();
      }, 750);
      return () => clearTimeout(coldStartTimer);
    }
  }, [showLoader, hideLoader]);

  // 2. Hide loader on route changes
  useEffect(() => {
    hideLoader();
  }, [pathname, searchParams, hideLoader]);

  // 3. Background Session Resume Threshold (> 30 min)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const lastActive = localStorage.getItem('teyro_last_active_timestamp');
        const now = Date.now();

        if (lastActive && now - parseInt(lastActive, 10) > BACKGROUND_RESUME_THRESHOLD_MS) {
          // Session backgrounded > 30 mins — trigger Pattern A cold-start loader
          showLoader("Welcome back! Tey is restoring your session...");
          setTimeout(() => {
            hideLoader();
          }, 1200);
        }
        localStorage.setItem('teyro_last_active_timestamp', now.toString());
      } else {
        localStorage.setItem('teyro_last_active_timestamp', Date.now().toString());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showLoader, hideLoader]);

  return (
    <TeyroLoaderContext.Provider value={{ showLoader, hideLoader, isLoading: isVisible }}>
      {children}
      <TeyroBrandedLoader isVisible={isVisible} microcopyOverride={overrideText} />
    </TeyroLoaderContext.Provider>
  );
}

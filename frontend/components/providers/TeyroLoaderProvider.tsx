'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import TeyroBrandedLoader, { MascotPose } from '../ui/TeyroBrandedLoader';

const BACKGROUND_RESUME_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
const GUARD_300MS = 300; // Do not show loader if background load completes in < 300ms
const DEFAULT_MIN_HOLD_MS = 1400; // Default minimum time loader stays visible once shown (1.4s)

interface TeyroLoaderContextType {
  /** Trigger Pattern A branded loader with 300ms guard */
  showLoader: (overrideText?: string, fullScreen?: boolean, holdMs?: number, suppressCheck?: boolean, pose?: MascotPose) => void;
  /** Trigger Pattern A branded loader IMMEDIATELY (no 300ms guard) on user button clicks */
  showLoaderImmediate: (overrideText?: string, fullScreen?: boolean, holdMs?: number, suppressCheck?: boolean, pose?: MascotPose) => void;
  /** Hide Pattern A loader with configured min hold & smooth cross-fade */
  hideLoader: () => void;
  /** Whether loader is active */
  isLoading: boolean;
}

const TeyroLoaderContext = createContext<TeyroLoaderContextType>({
  showLoader: () => {},
  showLoaderImmediate: () => {},
  hideLoader: () => {},
  isLoading: false,
});

export const useTeyroLoader = () => useContext(TeyroLoaderContext);

/**
 * RouteChangeWatcher (Isolated in Suspense to prevent Next.js static export bailout)
 */
function RouteChangeWatcher({ onRouteChange }: { onRouteChange: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [pathname, searchParams, onRouteChange]);

  return null;
}

export function TeyroLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [overrideText, setOverrideText] = useState<string | undefined>(undefined);
  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(false);
  const [suppressCheck, setSuppressCheck] = useState<boolean>(false);
  const [selectedPose, setSelectedPose] = useState<MascotPose>('random');

  const requestStartTimeRef = useRef<number | null>(null);
  const visibleStartTimeRef = useRef<number | null>(null);
  const customHoldMsRef = useRef<number>(DEFAULT_MIN_HOLD_MS);
  const guardTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timers helper
  const clearTimers = () => {
    if (guardTimerRef.current) clearTimeout(guardTimerRef.current);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  /**
   * Request showing Pattern A loader IMMEDIATELY (e.g. on clicking CONTINUE button).
   */
  const showLoaderImmediate = useCallback((
    customText?: string,
    fullScreen = false,
    holdMs = DEFAULT_MIN_HOLD_MS,
    suppress = false,
    pose: MascotPose = 'random'
  ) => {
    clearTimers();
    setOverrideText(customText);
    setIsFullScreenMode(fullScreen);
    setSuppressCheck(suppress);
    setSelectedPose(pose);
    customHoldMsRef.current = holdMs;
    requestStartTimeRef.current = Date.now();
    visibleStartTimeRef.current = Date.now();
    setIsVisible(true);
  }, []);

  /**
   * Request showing Pattern A loader with 300ms guard.
   */
  const showLoader = useCallback((
    customText?: string,
    fullScreen = false,
    holdMs = DEFAULT_MIN_HOLD_MS,
    suppress = false,
    pose: MascotPose = 'random'
  ) => {
    clearTimers();
    setOverrideText(customText);
    setIsFullScreenMode(fullScreen);
    setSuppressCheck(suppress);
    setSelectedPose(pose);
    customHoldMsRef.current = holdMs;
    requestStartTimeRef.current = Date.now();

    // 300ms Guard
    guardTimerRef.current = setTimeout(() => {
      visibleStartTimeRef.current = Date.now();
      setIsVisible(true);
    }, GUARD_300MS);
  }, []);

  /**
   * Hide Pattern A loader.
   * Enforces configured minimum hold time once rendered.
   */
  const hideLoader = useCallback(() => {
    clearTimers();

    // If loader was never made visible (e.g. guard cancelled), hide immediately
    if (!visibleStartTimeRef.current) {
      requestStartTimeRef.current = null;
      setIsVisible(false);
      return;
    }

    // Loader is visible — hold until at least configured holdMs total visible duration
    const elapsedTimeVisible = Date.now() - visibleStartTimeRef.current;
    const requiredHold = customHoldMsRef.current || DEFAULT_MIN_HOLD_MS;
    const remainingHold = Math.max(0, requiredHold - elapsedTimeVisible);

    holdTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      requestStartTimeRef.current = null;
      visibleStartTimeRef.current = null;
      setOverrideText(undefined);
      setIsFullScreenMode(false);
      setSuppressCheck(false);
      setSelectedPose('random');
      customHoldMsRef.current = DEFAULT_MIN_HOLD_MS;
    }, remainingHold);
  }, []);

  // 1. Cold Start & First Mount
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // Show fullScreen loader on cold start
      showLoaderImmediate("Learning one small skill today is better than planning to learn everything tomorrow.", true);
      const coldStartTimer = setTimeout(() => {
        hideLoader();
      }, 1000);
      return () => clearTimeout(coldStartTimer);
    }
  }, [showLoaderImmediate, hideLoader]);

  // 2. Background Session Resume Threshold (> 30 min)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const lastActive = localStorage.getItem('teyro_last_active_timestamp');
        const now = Date.now();

        if (lastActive && now - parseInt(lastActive, 10) > BACKGROUND_RESUME_THRESHOLD_MS) {
          showLoaderImmediate("Welcome back! Tey is restoring your learning session...", true);
          setTimeout(() => {
            hideLoader();
          }, 1500);
        }
        localStorage.setItem('teyro_last_active_timestamp', now.toString());
      } else {
        localStorage.setItem('teyro_last_active_timestamp', Date.now().toString());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showLoaderImmediate, hideLoader]);

  return (
    <TeyroLoaderContext.Provider value={{ showLoader, showLoaderImmediate, hideLoader, isLoading: isVisible }}>
      <Suspense fallback={null}>
        <RouteChangeWatcher onRouteChange={hideLoader} />
      </Suspense>
      {children}
      <TeyroBrandedLoader
        isVisible={isVisible}
        microcopyOverride={overrideText}
        fullScreen={isFullScreenMode}
        suppressConnectionCheck={suppressCheck}
        mascotPose={selectedPose}
      />
    </TeyroLoaderContext.Provider>
  );
}

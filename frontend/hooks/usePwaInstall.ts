'use client';

import { useCallback, useEffect, useState } from 'react';

export type PwaPlatform = 'ios' | 'android' | 'desktop' | 'other';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function detectPlatform(): PwaPlatform {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
  if (isIOS) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Win64|Win32|Macintosh|X11|Linux/.test(ua)) return 'desktop';
  return 'other';
}

function detectStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia?.('(display-mode: standalone)').matches || nav.standalone === true;
}

/**
 * Wraps the Android/Chrome `beforeinstallprompt` flow and standalone-mode
 * detection. iOS never fires `beforeinstallprompt` — callers should branch
 * on `platform === 'ios'` and render a manual Add-to-Home-Screen guide.
 */
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [platform, setPlatform] = useState<PwaPlatform>('other');

  useEffect(() => {
    // Server always renders the false/'other' defaults (no window); this effect
    // reconciles to the real client-side values right after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsStandalone(detectStandalone());
    setPlatform(detectPlatform());

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!deferredPrompt) return 'unavailable';
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsStandalone(true);
    setDeferredPrompt(null);
    return outcome;
  }, [deferredPrompt]);

  return {
    platform,
    isStandalone,
    canPromptInstall: !!deferredPrompt,
    promptInstall,
  };
}

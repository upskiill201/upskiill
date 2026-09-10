'use client';

/**
 * The single installation service for Teyro.
 *
 * Wraps everything the install gateway (/start), the launch router (/launch),
 * onboarding step 15 and the dashboard nudge card need to know about getting
 * Teyro onto a home screen, so none of them has to re-derive it:
 *
 *   - which platform / browser we are on           (lib/pwa/platform.ts)
 *   - whether we are running installed right now   (display-mode, re-derived)
 *   - whether a native prompt is held and firable  (beforeinstallprompt)
 *   - how installation can happen here at all      (InstallMethod)
 *   - funnel analytics for each of those beats     (lib/pwa/analytics.ts)
 *
 * ── Two things that are easy to get wrong ──────────────────────────────────
 * 1. `beforeinstallprompt` can fire *after* first paint, and can fire again
 *    later after being consumed. So `canPromptInstall` is not a page-load
 *    constant; the UI has to react to it flipping. That is also why the event
 *    listener is attached before the first state reconciliation.
 * 2. `isStandalone` can change without a navigation: install from the Chrome
 *    menu on a desktop and the same tab is suddenly running in an app window.
 *    The display-mode media query is subscribed to, not just read once, so an
 *    open /start page notices and stops asking.
 *
 * `platform`, `isStandalone`, `canPromptInstall` and `promptInstall` keep the
 * exact shape the previous version of this hook exported — Step15Content and
 * PwaPushNudgeCard consume those and are unaffected by everything added here.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  detectBrowser,
  detectPlatform,
  detectStandalone,
  isInAppBrowser,
  resolveInstallMethod,
  type InstallMethod,
  type PwaBrowser,
  type PwaPlatform,
} from '@/lib/pwa/platform';
import { recordPromptDismissed, saveInstallFlowState } from '@/lib/pwa/installFlow';
import { trackInstallEvent } from '@/lib/pwa/analytics';

export type { PwaPlatform, PwaBrowser, InstallMethod };

export type PromptOutcome = 'accepted' | 'dismissed' | 'unavailable' | 'error';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PwaInstallState {
  platform: PwaPlatform;
  browser: PwaBrowser;
  isStandalone: boolean;
  canPromptInstall: boolean;
  installMethod: InstallMethod;
  isInstallable: boolean;
  isInAppBrowser: boolean;
  /**
   * False until the first client-side reconciliation has run.
   *
   * The server has no `window`, so the first render is always the neutral
   * default. Branching the UI on `platform` before this flips would flash the
   * desktop copy at an iPhone for a frame — on the single most important
   * first-impression screen in the product.
   */
  ready: boolean;
}

export function usePwaInstall() {
  const [state, setState] = useState<PwaInstallState>({
    platform: 'other',
    browser: 'other',
    isStandalone: false,
    canPromptInstall: false,
    installMethod: 'switch-browser',
    isInstallable: false,
    isInAppBrowser: false,
    ready: false,
  });

  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  /** Guards against double-firing `pwa_installed` (appinstalled + userChoice). */
  const installReportedRef = useRef(false);

  /** Recomputes the derived fields from the current primitives. */
  const reconcile = useCallback(
    (patch: Partial<Pick<PwaInstallState, 'isStandalone' | 'canPromptInstall'>> = {}) => {
      setState((prev) => {
        const platform = detectPlatform();
        const browser = detectBrowser();
        const isStandalone = patch.isStandalone ?? detectStandalone();
        const canPromptInstall = patch.canPromptInstall ?? prev.canPromptInstall;

        const installMethod = resolveInstallMethod({
          platform,
          browser,
          isStandalone,
          canPromptInstall,
        });

        return {
          platform,
          browser,
          isStandalone,
          canPromptInstall,
          installMethod,
          isInstallable:
            installMethod === 'native-prompt' ||
            installMethod === 'ios-share-sheet' ||
            installMethod === 'browser-menu',
          isInAppBrowser: isInAppBrowser(browser),
          ready: true,
        };
      });
    },
    [],
  );

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      // Suppressing the mini-infobar is the whole point: the gateway decides
      // when the prompt appears, so it lands on a deliberate tap rather than
      // ambushing someone mid-scroll.
      e.preventDefault();
      deferredPromptRef.current = e as BeforeInstallPromptEvent;
      trackInstallEvent('android_install_prompt_available', {
        platform: detectPlatform(),
        browser: detectBrowser(),
      });
      reconcile({ canPromptInstall: true });
    };

    const onInstalled = () => {
      deferredPromptRef.current = null;
      saveInstallFlowState({ stage: 'install-reported' });
      if (!installReportedRef.current) {
        installReportedRef.current = true;
        trackInstallEvent('pwa_installed', {
          platform: detectPlatform(),
          browser: detectBrowser(),
        });
      }
      // Note: `appinstalled` does NOT mean the current tab is now standalone —
      // on Android the browser tab stays a browser tab. isStandalone is left to
      // the media query rather than being force-set here.
      reconcile({ canPromptInstall: false });
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    // Standalone can flip in-place (desktop install from the browser menu),
    // so subscribe rather than sampling once.
    const mql = window.matchMedia?.('(display-mode: standalone)');
    const onDisplayModeChange = () => reconcile();
    mql?.addEventListener?.('change', onDisplayModeChange);

    // First client-side reconciliation. Runs after the listeners are attached
    // so a `beforeinstallprompt` that fires in between is not lost.
    //
    // This is the "subscribe to an external system" case the rule exists to
    // allow: the browser's display mode and install capability are not
    // knowable during render (no `window` on the server), so the first read
    // has to happen here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reconcile();

    if (detectStandalone()) saveInstallFlowState({ everStandalone: true });

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
      mql?.removeEventListener?.('change', onDisplayModeChange);
    };
  }, [reconcile]);

  /**
   * Fires the native install prompt. Must be called inside a user gesture.
   *
   * Returns `'unavailable'` rather than throwing when there is no held prompt,
   * so callers can fall through to a manual guide instead of dead-ending.
   */
  const promptInstall = useCallback(async (): Promise<PromptOutcome> => {
    const deferred = deferredPromptRef.current;
    if (!deferred) return 'unavailable';

    const context = { platform: detectPlatform(), browser: detectBrowser() };
    trackInstallEvent('android_install_prompt_shown', context);

    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;

      // The event is single-use whatever the answer. Chrome may hand us a
      // fresh one later; until then the UI must fall back to the manual guide.
      deferredPromptRef.current = null;
      reconcile({ canPromptInstall: false });

      if (outcome === 'accepted') {
        trackInstallEvent('android_install_accepted', context);
        saveInstallFlowState({ stage: 'install-reported' });
        if (!installReportedRef.current) {
          installReportedRef.current = true;
          trackInstallEvent('pwa_installed', context);
        }
      } else {
        trackInstallEvent('android_install_dismissed', context);
        recordPromptDismissed();
      }

      return outcome;
    } catch {
      // Chrome throws if prompt() is called twice, or outside a gesture.
      // Neither should reach the learner as a broken screen.
      deferredPromptRef.current = null;
      reconcile({ canPromptInstall: false });
      return 'error';
    }
  }, [reconcile]);

  /** Re-derives installed-ness on demand (e.g. when a tab regains focus). */
  const refresh = useCallback(() => reconcile(), [reconcile]);

  return {
    ...state,
    promptInstall,
    refresh,
  };
}

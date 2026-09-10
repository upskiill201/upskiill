/**
 * Platform & installation-environment detection for the Teyro install gateway.
 *
 * Deliberately framework-free and side-effect-free so it can be called from a
 * hook, an event handler or a one-off check without dragging React in. The
 * React surface lives in hooks/usePwaInstall.ts.
 *
 * ── Why not user-agent alone ───────────────────────────────────────────────
 * `isStandalone` is the only signal that actually answers "is the learner
 * inside the installed app right now", and it comes from the display mode, not
 * the UA. UA parsing is used only for the two things it can answer honestly:
 * which OS we are on (which decides *how* installation works) and which
 * browser (which decides whether installation is possible at all here).
 *
 * Nothing in this module reads or writes storage. A stored "installed = true"
 * flag is not evidence — the learner can uninstall, switch browsers, or open
 * the site on a second device — so installed-ness is always re-derived.
 */

export type PwaPlatform = 'ios' | 'android' | 'desktop' | 'other';

export type PwaBrowser =
  | 'safari'
  | 'chrome'
  | 'edge'
  | 'firefox'
  | 'samsung'
  | 'opera'
  | 'facebook'
  | 'instagram'
  | 'other';

/** How this environment can get Teyro onto the home screen / app list. */
export type InstallMethod =
  /** The browser fires `beforeinstallprompt`; one tap does it. */
  | 'native-prompt'
  /** iOS Safari: Share -> Add to Home Screen, performed by hand. */
  | 'ios-share-sheet'
  /** Installable, but only through a browser menu we cannot open for them. */
  | 'browser-menu'
  /** This browser cannot install at all — the learner must switch browsers. */
  | 'switch-browser'
  /** Already inside the installed app. */
  | 'installed';

export interface InstallEnvironment {
  platform: PwaPlatform;
  browser: PwaBrowser;
  /** Running as an installed/standalone app right now. The source of truth. */
  isStandalone: boolean;
  /** A `beforeinstallprompt` event is held and ready to fire. */
  canPromptInstall: boolean;
  /** True when installation is achievable here, by any route. */
  isInstallable: boolean;
  installMethod: InstallMethod;
  /** In-app webviews (Instagram, Facebook) can never install anything. */
  isInAppBrowser: boolean;
}

function ua(): string {
  if (typeof navigator === 'undefined') return '';
  return navigator.userAgent || '';
}

export function detectPlatform(): PwaPlatform {
  const agent = ua();
  if (!agent) return 'other';

  // iPadOS 13+ reports a desktop Macintosh UA. maxTouchPoints is the only
  // reliable tell, and it matters: an iPad on the desktop branch would be
  // offered a native prompt that can never fire.
  const isIOS =
    /iPad|iPhone|iPod/.test(agent) ||
    (agent.includes('Macintosh') &&
      typeof navigator !== 'undefined' &&
      navigator.maxTouchPoints > 1);

  if (isIOS) return 'ios';
  if (/Android/.test(agent)) return 'android';
  if (/Win64|Win32|Macintosh|X11|Linux|CrOS/.test(agent)) return 'desktop';
  return 'other';
}

export function detectBrowser(): PwaBrowser {
  const agent = ua();
  if (!agent) return 'other';

  // Order matters throughout: every Chromium browser also says "Chrome", and
  // every iOS browser also says "Safari", so the specific brands go first.
  if (/FBAN|FBAV|FB_IAB/.test(agent)) return 'facebook';
  if (/Instagram/.test(agent)) return 'instagram';
  if (/SamsungBrowser/.test(agent)) return 'samsung';
  if (/OPR\/|Opera|OPT\//.test(agent)) return 'opera';
  if (/Edg[A-Z]?\//.test(agent)) return 'edge';
  if (/Firefox\/|FxiOS/.test(agent)) return 'firefox';
  if (/CriOS|Chrome\//.test(agent)) return 'chrome';
  if (/Safari\//.test(agent)) return 'safari';
  return 'other';
}

/**
 * Are we inside the installed app?
 *
 * `display-mode: standalone` covers Android/desktop and iOS 16.4+. The legacy
 * `navigator.standalone` boolean is iOS-only and still the only signal on
 * older iOS versions, so both are checked. `minimal-ui` and `fullscreen` are
 * included because a manifest change (or a browser's own interpretation of
 * one) can land a launched app in either, and a learner in those modes has
 * unambiguously installed us.
 */
export function detectStandalone(): boolean {
  if (typeof window === 'undefined') return false;

  const legacyIosStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (legacyIosStandalone) return true;

  const mm = window.matchMedia;
  if (typeof mm !== 'function') return false;

  return (
    mm('(display-mode: standalone)').matches ||
    mm('(display-mode: minimal-ui)').matches ||
    mm('(display-mode: fullscreen)').matches
  );
}

/**
 * iPad specifically, not just "iOS".
 *
 * The Add-to-Home-Screen guide has to name where the Share button is, and it
 * is in opposite corners on the two devices: bottom toolbar on iPhone,
 * top-right on iPad. Testing `/iPad/` against the UA is not enough — iPadOS
 * 13+ reports a desktop Macintosh string, so a modern iPad would be told to
 * look at the bottom of the screen, where there is nothing.
 */
export function isIpad(): boolean {
  const agent = ua();
  if (!agent) return false;
  if (/iPad/.test(agent)) return true;
  return (
    agent.includes('Macintosh') &&
    typeof navigator !== 'undefined' &&
    navigator.maxTouchPoints > 1
  );
}

/** In-app webviews render a stripped browser with no install affordance. */
export function isInAppBrowser(browser: PwaBrowser = detectBrowser()): boolean {
  return browser === 'facebook' || browser === 'instagram';
}

/**
 * Resolves how — if at all — installation can happen in this environment.
 *
 * `canPromptInstall` is passed in rather than detected: only the hook holding
 * the deferred `beforeinstallprompt` event knows the answer, and it can flip
 * seconds after page load.
 */
export function resolveInstallMethod(opts: {
  platform: PwaPlatform;
  browser: PwaBrowser;
  isStandalone: boolean;
  canPromptInstall: boolean;
}): InstallMethod {
  const { platform, browser, isStandalone, canPromptInstall } = opts;

  if (isStandalone) return 'installed';
  if (isInAppBrowser(browser)) return 'switch-browser';

  // A held prompt beats every heuristic below — the browser has already told
  // us it will install.
  if (canPromptInstall) return 'native-prompt';

  if (platform === 'ios') {
    // Third-party iOS browsers run WebKit but do not expose Add to Home Screen
    // in a way that produces a real standalone PWA, so the honest answer is
    // "open this in Safari", not a guide they cannot follow.
    return browser === 'safari' ? 'ios-share-sheet' : 'switch-browser';
  }

  if (platform === 'android') {
    // Chromium-family Android browsers all carry a menu item even when the
    // prompt has not fired (or has already been consumed). Firefox Android
    // does too, under "Install".
    if (browser === 'other') return 'switch-browser';
    return 'browser-menu';
  }

  if (platform === 'desktop') {
    // Desktop Safari and Firefox cannot install a PWA at all. Chromium can,
    // via the address-bar icon.
    if (browser === 'chrome' || browser === 'edge' || browser === 'opera') return 'browser-menu';
    return 'switch-browser';
  }

  return 'switch-browser';
}

/** One call that answers everything except the deferred-prompt question. */
export function getInstallEnvironment(canPromptInstall = false): InstallEnvironment {
  const platform = detectPlatform();
  const browser = detectBrowser();
  const isStandalone = detectStandalone();
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
    isInstallable:
      installMethod === 'native-prompt' ||
      installMethod === 'ios-share-sheet' ||
      installMethod === 'browser-menu',
    installMethod,
    isInAppBrowser: isInAppBrowser(browser),
  };
}

/** Human-readable browser name for copy that has to name it ("Open in Safari"). */
export function browserLabel(browser: PwaBrowser): string {
  switch (browser) {
    case 'safari':
      return 'Safari';
    case 'chrome':
      return 'Chrome';
    case 'edge':
      return 'Edge';
    case 'firefox':
      return 'Firefox';
    case 'samsung':
      return 'Samsung Internet';
    case 'opera':
      return 'Opera';
    case 'facebook':
      return 'the Facebook browser';
    case 'instagram':
      return 'the Instagram browser';
    default:
      return 'your browser';
  }
}

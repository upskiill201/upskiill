import {
  browserLabel,
  detectBrowser,
  detectPlatform,
  detectStandalone,
  isInAppBrowser,
  resolveInstallMethod,
} from '../platform';

/**
 * The install gateway shows one of five completely different screens, and the
 * choice is made entirely by this module. Get it wrong and the failure is not
 * subtle: an iPhone shown an Android prompt that can never fire, or a learner
 * who already installed Teyro shown installation instructions forever.
 *
 * The UA strings below are real ones, kept verbatim — the point of the test is
 * that these exact strings, which is what actually arrives, are classified
 * correctly.
 */

const UA = {
  iphoneSafari:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
  iphoneChrome:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1',
  iphoneFirefox:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/123.0 Mobile/15E148 Safari/605.1.15',
  // iPadOS 13+ lies and claims to be a Mac. Only maxTouchPoints gives it away.
  ipadSafari:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
  androidChrome:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
  androidSamsung:
    'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
  androidFirefox:
    'Mozilla/5.0 (Android 13; Mobile; rv:123.0) Gecko/123.0 Firefox/123.0',
  androidFacebook:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/450.0.0.35.108;]',
  androidInstagram:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 Instagram 312.0.0.32.111',
  desktopChrome:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  desktopEdge:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.2365.52',
  desktopSafari:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
  desktopFirefox:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
} as const;

/** Installs a fake `navigator` (and optionally `window`) for one assertion. */
function withUa(userAgent: string, maxTouchPoints = 0) {
  (globalThis as unknown as { navigator: unknown }).navigator = {
    userAgent,
    maxTouchPoints,
  };
}

afterEach(() => {
  delete (globalThis as unknown as { navigator?: unknown }).navigator;
  delete (globalThis as unknown as { window?: unknown }).window;
});

describe('detectPlatform', () => {
  it.each([
    ['iPhone Safari', UA.iphoneSafari, 0, 'ios'],
    ['iPhone Chrome', UA.iphoneChrome, 0, 'ios'],
    ['Android Chrome', UA.androidChrome, 0, 'android'],
    ['Samsung Internet', UA.androidSamsung, 0, 'android'],
    ['desktop Chrome', UA.desktopChrome, 0, 'desktop'],
    ['desktop Safari', UA.desktopSafari, 0, 'desktop'],
  ])('classifies %s', (_label, ua, touch, expected) => {
    withUa(ua, touch as number);
    expect(detectPlatform()).toBe(expected);
  });

  it('classifies an iPad as iOS despite its Macintosh user agent', () => {
    // Regression guard: on the desktop branch an iPad would be offered a
    // native install prompt that can never fire on it.
    withUa(UA.ipadSafari, 5);
    expect(detectPlatform()).toBe('ios');
  });

  it('does not mistake a real Mac for an iPad', () => {
    withUa(UA.ipadSafari, 0);
    expect(detectPlatform()).toBe('desktop');
  });

  it('returns "other" with no navigator at all (server render)', () => {
    expect(detectPlatform()).toBe('other');
  });
});

describe('detectBrowser', () => {
  it.each([
    ['iPhone Safari', UA.iphoneSafari, 'safari'],
    ['iPhone Chrome', UA.iphoneChrome, 'chrome'],
    ['iPhone Firefox', UA.iphoneFirefox, 'firefox'],
    ['Android Chrome', UA.androidChrome, 'chrome'],
    ['Samsung Internet', UA.androidSamsung, 'samsung'],
    ['Android Firefox', UA.androidFirefox, 'firefox'],
    ['desktop Edge', UA.desktopEdge, 'edge'],
    ['desktop Safari', UA.desktopSafari, 'safari'],
    ['desktop Firefox', UA.desktopFirefox, 'firefox'],
  ])('classifies %s', (_label, ua, expected) => {
    withUa(ua);
    expect(detectBrowser()).toBe(expected);
  });

  it('recognises in-app webviews, which every Chromium check would swallow', () => {
    // Both of these also say "Chrome/122", so brand order in detectBrowser is
    // load-bearing, not cosmetic.
    withUa(UA.androidFacebook);
    expect(detectBrowser()).toBe('facebook');
    expect(isInAppBrowser()).toBe(true);

    withUa(UA.androidInstagram);
    expect(detectBrowser()).toBe('instagram');
    expect(isInAppBrowser()).toBe(true);
  });

  it('does not mistake Edge for Chrome', () => {
    withUa(UA.desktopEdge);
    expect(detectBrowser()).toBe('edge');
  });
});

describe('detectStandalone', () => {
  function withDisplayMode(matches: Record<string, boolean>, legacyIos?: boolean) {
    (globalThis as unknown as { window: unknown }).window = {
      navigator: legacyIos === undefined ? {} : { standalone: legacyIos },
      matchMedia: (q: string) => ({ matches: !!matches[q] }),
    };
  }

  it('is false in a normal browser tab', () => {
    withDisplayMode({});
    expect(detectStandalone()).toBe(false);
  });

  it('is true in display-mode: standalone', () => {
    withDisplayMode({ '(display-mode: standalone)': true });
    expect(detectStandalone()).toBe(true);
  });

  it.each(['(display-mode: minimal-ui)', '(display-mode: fullscreen)'])(
    'is true in %s, which a launched app can also land in',
    (mode) => {
      withDisplayMode({ [mode]: true });
      expect(detectStandalone()).toBe(true);
    },
  );

  it('honours the legacy iOS navigator.standalone flag', () => {
    // The only signal on iOS before 16.4 — dropping it would tell an installed
    // learner to install again, every launch.
    withDisplayMode({}, true);
    expect(detectStandalone()).toBe(true);
  });

  it('is false during server render', () => {
    expect(detectStandalone()).toBe(false);
  });
});

describe('resolveInstallMethod', () => {
  it('reports "installed" first, whatever else is true', () => {
    // The install loop this prevents is the single worst outcome of the whole
    // feature: instructions shown to someone who has already followed them.
    expect(
      resolveInstallMethod({
        platform: 'ios',
        browser: 'safari',
        isStandalone: true,
        canPromptInstall: true,
      }),
    ).toBe('installed');
  });

  it('prefers a held native prompt over every heuristic', () => {
    expect(
      resolveInstallMethod({
        platform: 'android',
        browser: 'firefox',
        isStandalone: false,
        canPromptInstall: true,
      }),
    ).toBe('native-prompt');
  });

  it('sends iOS Safari to the share-sheet guide', () => {
    expect(
      resolveInstallMethod({
        platform: 'ios',
        browser: 'safari',
        isStandalone: false,
        canPromptInstall: false,
      }),
    ).toBe('ios-share-sheet');
  });

  it.each(['chrome', 'firefox', 'edge'] as const)(
    'does not hand %s on iOS a guide it cannot complete',
    (browser) => {
      // Third-party iOS browsers cannot produce a real standalone PWA, so
      // walking them through Share -> Add to Home Screen would be a lie.
      expect(
        resolveInstallMethod({
          platform: 'ios',
          browser,
          isStandalone: false,
          canPromptInstall: false,
        }),
      ).toBe('switch-browser');
    },
  );

  it.each(['chrome', 'samsung', 'firefox', 'edge'] as const)(
    'falls back to the %s menu on Android when no prompt is held',
    (browser) => {
      expect(
        resolveInstallMethod({
          platform: 'android',
          browser,
          isStandalone: false,
          canPromptInstall: false,
        }),
      ).toBe('browser-menu');
    },
  );

  it('never offers installation inside an in-app webview', () => {
    for (const browser of ['facebook', 'instagram'] as const) {
      expect(
        resolveInstallMethod({
          platform: 'android',
          browser,
          isStandalone: false,
          // Even with a held prompt: the webview cannot honour it.
          canPromptInstall: true,
        }),
      ).toBe('switch-browser');
    }
  });

  it('tells desktop Safari and Firefox the truth: they cannot install', () => {
    for (const browser of ['safari', 'firefox'] as const) {
      expect(
        resolveInstallMethod({
          platform: 'desktop',
          browser,
          isStandalone: false,
          canPromptInstall: false,
        }),
      ).toBe('switch-browser');
    }
  });
});

describe('browserLabel', () => {
  it('names the browser the copy has to point at', () => {
    expect(browserLabel('safari')).toBe('Safari');
    expect(browserLabel('samsung')).toBe('Samsung Internet');
  });

  it('degrades to a generic phrase rather than an empty string', () => {
    expect(browserLabel('other')).toBe('your browser');
  });
});

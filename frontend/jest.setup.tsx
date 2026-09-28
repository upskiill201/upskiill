/**
 * jsdom test setup.
 *
 * Mocks the browser APIs the onboarding components touch that jsdom does not
 * implement. Each one is mocked at the boundary rather than inside a test so
 * a component can't accidentally pass by having its behaviour stubbed out.
 */

import '@testing-library/jest-dom';
import React from 'react';

// jsdom has no matchMedia; framer-motion's useReducedMotion calls it on mount.
// Defaults to "no preference" so components render their animated path, which
// is what most assertions want. Individual tests override it to test the
// reduced-motion branch.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// next/image renders a plain <img> in tests; the real one needs a Next runtime.
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, priority, sizes, ...rest } = props;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return React.createElement('img', rest);
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
  usePathname: () => '/onboarding/1',
  useSearchParams: () => new URLSearchParams(),
}));

// Audio is synthesised through a shared Web Audio bus that jsdom has no
// implementation for. Mocked wholesale so a failing cue can never be the
// reason a navigation assertion fails — which is itself something the tests
// assert, by making these throw.
jest.mock('@/lib/audio/onboardingAudio', () => ({
  playOnboardingCue: jest.fn(),
  playTeyReaction: jest.fn(),
  playCategoryCue: jest.fn(),
}));

jest.mock('@/lib/haptics', () => ({
  playHaptic: jest.fn(),
}));

// localStorage exists in jsdom but persists between tests in the same file.
afterEach(() => {
  window.localStorage.clear();
  jest.clearAllMocks();
});

/**
 * Lazily-loaded canvas-confetti.
 *
 * canvas-confetti was imported statically by three eagerly-rendered surfaces —
 * the lesson player (app/learn/[id]/section/[sectionIndex]), the public course
 * page (app/courses/[id]), and EnrollmentWizard — so every visitor downloaded
 * and parsed it up front for an effect that only fires on a celebration most
 * page views never reach.
 *
 * Everything below is type-only or dynamic, so importing this module does not
 * pull the library into the bundle.
 *
 * Note on typing: @types/canvas-confetti uses `export = confetti`, so the
 * module *is* the callable — there is no `default` member on the type. The
 * types are therefore derived from the callable module rather than a default
 * export, while the runtime unwraps `.default` if the bundler's interop added
 * one.
 */

type ConfettiFn = typeof import('canvas-confetti');
export type ConfettiOptions = Parameters<ConfettiFn>[0];

let confettiPromise: Promise<ConfettiFn> | null = null;

function load(): Promise<ConfettiFn> {
  if (!confettiPromise) {
    confettiPromise = import('canvas-confetti').then((mod) => {
      // `export =` modules arrive either as the callable itself or wrapped in
      // `.default`, depending on the bundler's interop. Accept both.
      const candidate = (mod as unknown as { default?: ConfettiFn }).default ?? mod;
      return candidate as ConfettiFn;
    });
  }
  return confettiPromise;
}

/**
 * Warms the chunk without firing anything.
 *
 * Call this when a celebration becomes *likely* but has not happened yet — e.g.
 * when the enrollment wizard opens — so the burst is not waiting on a network
 * round trip at the moment it is supposed to land. Safe to call repeatedly.
 */
export function preloadConfetti(): void {
  if (typeof window === 'undefined') return;
  void load().catch(() => {
    // A failed preload is not worth surfacing — fireConfetti() retries.
  });
}

/**
 * Fires a confetti burst. Never throws and never rejects: confetti is
 * decorative, so a failure here must not break the flow that triggered it.
 * This mirrors the try/catch the call sites already wrapped it in.
 */
export function fireConfetti(options: ConfettiOptions): void {
  if (typeof window === 'undefined') return;
  void load()
    .then((confetti) => {
      try {
        confetti(options);
      } catch {
        // canvas/WebGL unavailable — ignore, as the previous inline calls did
      }
    })
    .catch(() => {
      // chunk failed to load — ignore
    });
}

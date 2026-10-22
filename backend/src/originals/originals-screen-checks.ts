/**
 * The shape of a React Native screen check, and its validator. A mirror of
 * frontend/lib/code/screenChecks.ts (ScreenTest, screenTestIssue): keep the
 * two in step. The checks themselves are NOT re-implemented here: the loader
 * runs the frontend's built runtime (public/react-native/runtime.js) under
 * jsdom, so there's one copy of the grading rules (originals-rn-verify.ts).
 */

/** One screen check. Set at least one of text, noText, button, images, style, repeated. */
export interface ScreenTest {
  /** First press these buttons, in order, each found by its text. */
  tap?: string[];
  /** First type into text fields, each found by its placeholder or accessibility label. */
  fill?: { field: string; text: string }[];
  /** The screen shows this text (case and spacing don't matter). */
  text?: string;
  /** The screen doesn't show this text. */
  noText?: string;
  /** There's a pressable button whose text contains this. */
  button?: string;
  /** At least this many images are on the screen. */
  images?: number;
  /** A React Native style (fontSize, color...) on the element whose text contains `of`: an exact value, or min/max for numbers. */
  style?: { of: string; prop: string; value?: string; min?: number; max?: number; /** Only the component holding the text, not its parents. */ self?: boolean };
  /** This text appears at least `min` times, e.g. one per menu row. */
  repeated?: { text: string; min: number };
}

/** Problems with a ScreenTest as written. Mirrors screenTestIssue in the frontend. */
export function screenTestIssue(t: unknown): string | null {
  const s = t as Partial<ScreenTest> | null;
  if (!s || typeof s !== 'object') return 'A screen check is empty.';
  const asserts = ['text', 'noText', 'button', 'images', 'style', 'repeated'].filter((k) => (s as Record<string, unknown>)[k] !== undefined);
  if (asserts.length === 0) return 'A screen check needs something to check: text, noText, button, images, style or repeated.';
  if (s.tap !== undefined && (!Array.isArray(s.tap) || s.tap.some((x) => typeof x !== 'string' || !x.trim()))) return 'Screen check taps must be button texts.';
  if (s.fill !== undefined && (!Array.isArray(s.fill) || s.fill.some((x) => !x || typeof x.field !== 'string' || typeof x.text !== 'string'))) return 'Screen check typing needs a field and text.';
  if (s.images !== undefined && (!Number.isInteger(s.images) || s.images < 1)) return 'A screen check image count must be 1 or more.';
  if (s.style !== undefined && (typeof s.style.of !== 'string' || typeof s.style.prop !== 'string' || (s.style.value === undefined && s.style.min === undefined && s.style.max === undefined)))
    return 'A style check needs of, prop, and a value, min or max.';
  if (s.repeated !== undefined && (typeof s.repeated.text !== 'string' || !Number.isInteger(s.repeated.min) || s.repeated.min < 1)) return 'A repeated check needs text and a min of 1 or more.';
  return null;
}

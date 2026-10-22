/**
 * Checks on a rendered React Native screen (the React Native runner). The
 * screen is React Native rendered to the web by react-native-web, so these
 * read the DOM it produces: text, buttons, images, styles.
 *
 * This file is bundled into public/react-native/runtime.js (scripts/
 * build-rn-runtime.mjs), and that one runtime runs the checks in the learner's
 * phone preview AND in the course loader (backend originals-rn-verify.ts,
 * under jsdom). One copy of the rules, so a solution that passes when the
 * course is loaded passes for learners too. Rebuild the runtime after editing.
 *
 * Checks look at the screen, never the wording of the code, so different
 * correct answers pass. A test can first tap buttons and type into fields,
 * then check what the screen shows.
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
  /**
   * A style, in React Native terms, on the element whose text contains `of`
   * (the innermost one, or the nearest styled component around it, so a
   * View's backgroundColor counts for the text inside it). `prop` is the
   * React Native name (fontSize, color, backgroundColor, padding). Give
   * `value` for an exact match (colours are normalised: "#ff9600" matches
   * "rgb(255, 150, 0)"), or `min` / `max` for numbers. `self: true` only
   * looks at the component holding the text (e.g. flex: 1 on a name, not on
   * the screen around it).
   */
  style?: { of: string; prop: string; value?: string; min?: number; max?: number; self?: boolean };
  /** This text appears at least `min` times, e.g. one per menu row. */
  repeated?: { text: string; min: number };
}

type Win = Window & typeof globalThis;

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

/** Everything the screen says, for "the screen shows..." checks. */
export function screenText(root: Element): string {
  return root.textContent ?? '';
}

/** react-native-web renders Pressable, Touchable* and Button as focusable elements. */
const PRESSABLE = '[role="button"], button, [tabindex="0"]';

/** The innermost elements whose text contains `text`. */
function innermost(root: Element, text: string): Element[] {
  const want = loose(text);
  const all = Array.from(root.querySelectorAll('*')).filter((el) => loose(el.textContent ?? '').includes(want));
  return all.filter((el) => !Array.from(el.children).some((c) => loose(c.textContent ?? '').includes(want)));
}

/** The pressable that holds this text: an exact label first (so "Order" isn't "Add to order"), then the innermost containing it. */
export function findButton(root: Element, text: string): HTMLElement | null {
  const want = loose(text);
  const hits = Array.from(root.querySelectorAll<HTMLElement>(PRESSABLE)).filter((el) => loose(el.textContent ?? '').includes(want));
  const inner = hits.filter((el) => !hits.some((other) => other !== el && el.contains(other)));
  return inner.find((el) => loose(el.textContent ?? '') === want) ?? inner[0] ?? null;
}

const tick = (win: Win) => new Promise<void>((resolve) => win.setTimeout(resolve, 0));

/** Press like a finger: pointer and mouse down/up, then click (react-native-web listens to these). */
export async function press(el: HTMLElement, win: Win): Promise<void> {
  const opts = { bubbles: true, cancelable: true, composed: true, button: 0, buttons: 1, isPrimary: true, pointerId: 1, pointerType: 'touch' };
  const Pointer = (win as unknown as { PointerEvent?: typeof PointerEvent }).PointerEvent ?? win.MouseEvent;
  el.dispatchEvent(new Pointer('pointerdown', opts));
  el.dispatchEvent(new win.MouseEvent('mousedown', opts));
  el.dispatchEvent(new Pointer('pointerup', { ...opts, buttons: 0 }));
  el.dispatchEvent(new win.MouseEvent('mouseup', { ...opts, buttons: 0 }));
  el.dispatchEvent(new win.MouseEvent('click', { ...opts, buttons: 0 }));
  await tick(win);
  await tick(win);
}

/** The text field with this placeholder or accessibility label. */
function findField(root: Element, field: string): HTMLInputElement | HTMLTextAreaElement | null {
  const want = loose(field);
  const fields = Array.from(root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea'));
  return fields.find((f) => loose(f.getAttribute('placeholder') ?? '') === want || loose(f.getAttribute('aria-label') ?? '') === want) ?? null;
}

/** Type into a field the way React sees it (the native value setter, then an input event). */
export async function typeInto(el: HTMLInputElement | HTMLTextAreaElement, text: string, win: Win): Promise<void> {
  const proto = el.tagName === 'TEXTAREA' ? win.HTMLTextAreaElement.prototype : win.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value')?.set?.call(el, text);
  el.dispatchEvent(new win.Event('input', { bubbles: true }));
  el.dispatchEvent(new win.Event('change', { bubbles: true }));
  await tick(win);
}

/** A colour as this engine computes it, so "#ff9600", "rgb(255, 150, 0)" and named colours compare equal. */
function colour(doc: Document, win: Win, value: string): string {
  const probe = doc.createElement('div');
  probe.style.setProperty('color', value);
  doc.body.appendChild(probe);
  const out = win.getComputedStyle(probe).getPropertyValue('color').trim();
  probe.remove();
  return out || value.trim().toLowerCase();
}

/** Text styles: on a phone a Text only inherits these from a Text around it, never from a View. */
const TEXT_PROPS = new Set([
  'color',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'fontFamily',
  'lineHeight',
  'letterSpacing',
  'textAlign',
  'textDecorationLine',
  'textTransform',
]);

/**
 * The React Native style recorded on this element or the nearest styled
 * component around it (the runtime's tagStyle). Layout and box styles
 * (flexDirection, backgroundColor, padding) are found on any ancestor, so a
 * row's flexDirection counts for the text inside it. Text styles stop at the
 * first ancestor that isn't a Text, like React Native's own inheritance.
 */
function rnStyleValue(el: Element, prop: string, self = false): unknown {
  const textOnly = TEXT_PROPS.has(prop);
  let node: Element | null = el;
  while (node) {
    const kind = node.getAttribute('data-teyro-kind');
    if (textOnly && kind && kind !== 'Text') return undefined;
    const raw = node.getAttribute('data-teyro-style');
    if (raw) {
      try {
        const style = JSON.parse(raw) as Record<string, unknown>;
        if (style[prop] !== undefined) return style[prop];
      } catch {
        /* not ours */
      }
    }
    // self: stop at the first component (the one the text belongs to).
    if (self && node.getAttribute('data-teyro-kind')) return undefined;
    node = node.parentElement;
  }
  return undefined;
}

/** Do the assertions in this test hold for the screen as it is now? (Taps and typing are done by the caller.) */
export function screenPasses(root: Element, win: Win, t: ScreenTest): boolean {
  const doc = root.ownerDocument;
  const text = loose(screenText(root));
  if (t.text !== undefined && !text.includes(loose(t.text))) return false;
  if (t.noText !== undefined && text.includes(loose(t.noText))) return false;
  if (t.button !== undefined && !findButton(root, t.button)) return false;
  if (t.images !== undefined && root.querySelectorAll('img, [role="img"]').length < t.images) return false;
  if (t.repeated !== undefined) {
    const n = innermost(root, t.repeated.text).length;
    if (n < t.repeated.min) return false;
  }
  if (t.style !== undefined) {
    const s = t.style;
    const ok = innermost(root, s.of).some((el) => {
      const got = rnStyleValue(el, s.prop, s.self === true);
      if (got === undefined || got === null) return false;
      if (s.value !== undefined) {
        if (typeof got === 'number') return got === Number(s.value);
        if (/colou?r$/i.test(s.prop)) return colour(doc, win, String(got)) === colour(doc, win, s.value);
        return loose(String(got)) === loose(s.value);
      }
      const n = typeof got === 'number' ? got : parseFloat(String(got));
      if (Number.isNaN(n)) return false;
      if (s.min !== undefined && n < s.min) return false;
      if (s.max !== undefined && n > s.max) return false;
      return true;
    });
    if (!ok) return false;
  }
  return true;
}

/** Do the test's taps and typing. False if a button or field it names isn't there. */
export async function act(root: Element, win: Win, t: ScreenTest): Promise<boolean> {
  for (const f of t.fill ?? []) {
    const field = findField(root, f.field);
    if (!field) return false;
    await typeInto(field, f.text, win);
  }
  for (const label of t.tap ?? []) {
    const button = findButton(root, label);
    if (!button) return false;
    await press(button, win);
  }
  return true;
}

/** Problems with a ScreenTest as written (mirrored by the backend validator). */
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

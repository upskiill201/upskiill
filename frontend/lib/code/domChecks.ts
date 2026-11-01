/**
 * Checks on a rendered HTML page (the HTML & CSS runner). Pure: give it a
 * parsed document and the window it lives in, and it says which checks pass.
 * The browser runs it on the live preview's document (htmlRunner.ts); the
 * loader runs the SAME rules on jsdom (backend/src/originals/originals-html-verify.ts).
 * Keep the two in step.
 *
 * Checks look at the page, never the wording of the code, so different correct
 * answers pass. Style checks compare values after normalising both sides in the
 * same engine (so "#ff9600" and "rgb(255, 150, 0)" match), and should target the
 * element the style is set on: jsdom doesn't compute inherited values.
 */

/** One page check. `selector` finds elements; the other fields narrow what must be true. */
export interface DomTest {
  /** A CSS selector, e.g. "h1", "img", ".card". */
  selector: string;
  /** Exactly this many elements match. */
  count?: number;
  /** At least this many match (default 1 when nothing else counts). */
  min?: number;
  /** One matching element's text contains this (case and spacing don't matter). */
  text?: string;
  /** Every matching element has this attribute, not empty (e.g. alt on every img). */
  attr?: string;
  /** ...and at least one has it equal to this (case doesn't matter). */
  attrValue?: string;
  /** A CSS property one matching element has set, e.g. "color". */
  style?: string;
  /** ...equal to this value; leave it out for "set to anything other than the default". */
  styleValue?: string;
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();

type Win = { getComputedStyle(el: Element): CSSStyleDeclaration };

/** Normalise a CSS value the way this engine computes it (e.g. a colour to rgb()). */
function normalise(doc: Document, win: Win, tag: string, prop: string, value: string): string {
  const probe = doc.createElement(tag);
  probe.style.setProperty(prop, value);
  doc.body.appendChild(probe);
  const out = win.getComputedStyle(probe).getPropertyValue(prop);
  probe.remove();
  return out.trim();
}

/** What this engine gives a fresh element of the same tag, with no author styles. */
function defaultValue(win: Win, el: Element, prop: string, blank: Document): string {
  const fresh = blank.createElement(el.tagName.toLowerCase());
  blank.body.appendChild(fresh);
  const out = (blank.defaultView as unknown as Win | null)?.getComputedStyle(fresh).getPropertyValue(prop) ?? '';
  fresh.remove();
  return out.trim();
}

/**
 * Does the page pass this test? `blank` is an empty document from the same
 * engine, used to learn default styles (pass the same kind of document both
 * sides: a fresh iframe in the browser, a fresh JSDOM in the loader).
 */
export function passesDomTest(doc: Document, win: Win, t: DomTest, blank: Document): boolean {
  let els: Element[];
  try {
    els = Array.from(doc.querySelectorAll(t.selector));
  } catch {
    return false; // an invalid selector can never pass
  }
  if (t.count !== undefined && els.length !== t.count) return false;
  if (t.min !== undefined && els.length < t.min) return false;
  if (t.count === undefined && t.min === undefined && els.length === 0) return false;
  if (els.length === 0) return t.count === 0;

  if (t.text !== undefined) {
    const want = loose(t.text);
    if (!els.some((e) => loose(e.textContent ?? '').includes(want))) return false;
  }
  if (t.attr !== undefined) {
    const name = t.attr;
    if (!els.every((e) => (e.getAttribute(name) ?? '').trim() !== '')) return false;
    if (t.attrValue !== undefined) {
      const want = loose(t.attrValue);
      if (!els.some((e) => loose(e.getAttribute(name) ?? '') === want)) return false;
    }
  }
  if (t.style !== undefined) {
    const prop = t.style;
    const ok = els.some((e) => {
      const got = win.getComputedStyle(e).getPropertyValue(prop).trim();
      if (t.styleValue !== undefined) return got === normalise(doc, win, e.tagName.toLowerCase(), prop, t.styleValue);
      return got !== '' && got !== defaultValue(win, e, prop, blank);
    });
    if (!ok) return false;
  }
  return true;
}

/** The page's visible text, for "the page says..." checks. */
export function pageText(doc: Document): string {
  return doc.body?.textContent ?? '';
}

/** Problems with a DomTest as written (mirrors the backend validator). */
export function domTestIssue(t: unknown): string | null {
  const d = t as Partial<DomTest> | null;
  if (!d || typeof d.selector !== 'string' || !d.selector.trim()) return 'A page check needs a CSS selector.';
  if (d.count !== undefined && (!Number.isInteger(d.count) || d.count < 0)) return 'A page check count must be 0 or more.';
  if (d.min !== undefined && (!Number.isInteger(d.min) || d.min < 1)) return 'A page check minimum must be 1 or more.';
  if (d.attrValue !== undefined && d.attr === undefined) return 'attrValue needs attr.';
  if (d.styleValue !== undefined && d.style === undefined) return 'styleValue needs style.';
  return null;
}

/**
 * The HTML & CSS runner: renders a learner's page and checks it. Nothing runs
 * on Teyro's servers, and the page itself can't run anything either: every
 * frame is sandboxed with scripts, forms, popups and navigation off.
 *
 * The visible live preview (components/code/HtmlPad.tsx) is fully sandboxed.
 * Grading uses a separate hidden frame that adds only allow-same-origin, so
 * this code can read the rendered DOM; with scripts off that's still inert.
 * The check rules live in domChecks.ts and are mirrored by the loader.
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import { passesDomTest, pageText } from './domChecks';
import type { RawRunResult } from './pythonRunner';

/** Where a page's relative files (beat-1.mp3, cover.png) come from: the course's own assets. */
export const HTML_ASSET_BASE = '/originals/html-css/';

/** The learner's code, with a <base> so relative file names resolve to the course assets. */
export function withAssetBase(code: string, base = HTML_ASSET_BASE): string {
  const tag = `<base href="${base}">`;
  if (/<head[^>]*>/i.test(code)) return code.replace(/<head([^>]*)>/i, `<head$1>${tag}`);
  return tag + code;
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');

/** Render HTML into a hidden, sandboxed, same-origin frame and wait for it to load. */
function renderHidden(html: string): Promise<HTMLIFrameElement> {
  return new Promise((resolve) => {
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-same-origin');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    // Phone width, off screen: media queries see a phone, like the learner's preview.
    frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:390px;height:844px;border:0;visibility:hidden;';
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve(frame);
    };
    frame.addEventListener('load', finish);
    // A broken image or slow file must never hang the check.
    window.setTimeout(finish, 3000);
    frame.srcdoc = html;
    document.body.appendChild(frame);
  });
}

let blankFrame: Promise<HTMLIFrameElement> | null = null;
/** An empty page in the same kind of frame, for "different from the default style" checks. */
function blankDocument(): Promise<Document | null> {
  blankFrame ??= renderHidden('<!DOCTYPE html><html><head></head><body></body></html>');
  return blankFrame.then((f) => f.contentDocument);
}

export interface HtmlRunResult extends RawRunResult {
  checks: { message: string; passed: boolean }[];
}

/** Render the page and grade every check against it. Never throws. */
export async function renderAndCheckHtml(code: string, checks: CodeCheck[]): Promise<HtmlRunResult> {
  const started = performance.now();
  const frame = await renderHidden(withAssetBase(code));
  const doc = frame.contentDocument;
  const win = frame.contentWindow as unknown as { getComputedStyle(el: Element): CSSStyleDeclaration } | null;
  const blank = await blankDocument();
  const text = doc ? pageText(doc) : '';
  const results = checks.map((c) => {
    let passed = false;
    if (doc && win && blank) {
      if (c.dom) passed = passesDomTest(doc, win, c.dom, blank);
      else if (c.outputIncludes !== undefined) passed = loose(text).includes(loose(c.outputIncludes));
      else if (c.outputEquals !== undefined) passed = exact(text) === exact(c.outputEquals);
      else if (c.codeIncludes !== undefined) passed = code.includes(c.codeIncludes);
    }
    return { message: c.message, passed };
  });
  frame.remove();
  return {
    stdout: text.trim(),
    error: doc ? null : { type: 'RunnerError', message: "The page couldn't be shown.", line: null },
    exprResults: [],
    timedOut: false,
    ms: Math.round(performance.now() - started),
    checks: results,
  };
}

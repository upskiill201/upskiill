import type { AuthoredCodeCheck, OriginalTrackDef } from './originals-authoring.types';
import type { LintIssue } from './originals-lint';
import { passesDomTest, pageText } from './originals-dom-checks';

/**
 * Renders every page in an HTML & CSS track and checks it, the way the
 * learner's browser does (frontend/lib/code/htmlRunner.ts): parse the HTML,
 * apply its CSS, and run the same page checks (originals-dom-checks.ts, a
 * mirror of frontend/lib/code/domChecks.ts). Uses jsdom 26 (a dev dependency,
 * the same version the frontend tests use); scripts never run.
 *
 *   error    a Build it solution fails its own checks (learners could never pass it)
 *   warning  a starter already passes every check, or a check can never be
 *            graded the same way here as in the browser
 *
 * jsdom applies the cascade for properties set on an element and normalises
 * values like colours, but doesn't compute inherited values or lay out the
 * page: style checks must target the element the style is set on.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any -- jsdom is loaded lazily and untyped here */

let JSDOMClass: any = null;
function JSDOM(): any {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  JSDOMClass ??= require('jsdom').JSDOM;
  return JSDOMClass;
}

const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');

/** Render a page (scripts off) and grade its checks. Mirrors renderAndCheckHtml in htmlRunner.ts. */
export function gradeHtml(code: string, checks: AuthoredCodeCheck[]): { passed: boolean[]; text: string } {
  const Dom = JSDOM();
  const page = new Dom(code, { runScripts: undefined, resources: undefined, pretendToBeVisual: false });
  const blank = new Dom('<!DOCTYPE html><html><head></head><body></body></html>');
  const doc = page.window.document as Document;
  const text = pageText(doc);
  const passed = checks.map((c) => {
    if (c.dom) return passesDomTest(doc, page.window, c.dom, blank.window.document as Document);
    if (c.outputIncludes !== undefined) return loose(text).includes(loose(c.outputIncludes));
    if (c.outputEquals !== undefined) return exact(text) === exact(c.outputEquals);
    if (c.codeIncludes !== undefined) return code.includes(c.codeIncludes);
    return false;
  });
  page.window.close();
  blank.window.close();
  return { passed, text };
}

/** CSS properties whose value is inherited unless set: a check on them only works on the element that sets them. */
const INHERITED = new Set(['color', 'font-family', 'font-size', 'font-weight', 'line-height', 'text-align', 'letter-spacing', 'font-style']);

/** Check every Build it solution (and starter) in an HTML & CSS track. */
export function verifyHtmlTrack(track: OriginalTrackDef): LintIssue[] {
  const issues: LintIssue[] = [];
  for (const level of track.levels) {
    for (const unit of level.units) {
      for (const lesson of unit.lessons) {
        const where = `${track.slug} L${level.level} ${unit.key} ${lesson.key} "${lesson.title}"`;
        for (const [i, ex] of lesson.apply.items.entries()) {
          if (ex.kind !== 'writeCode') continue;
          const sol = gradeHtml(ex.solution, ex.checks);
          sol.passed.forEach((ok, j) => {
            if (!ok) issues.push({ level: 'error', where, message: `Exercise ${i + 1}: the solution fails its own check "${ex.checks[j].message}".` });
          });
          for (const c of ex.checks) {
            if (c.expr !== undefined || c.noTypeErrors || c.typeErrorIncludes !== undefined) {
              issues.push({ level: 'error', where, message: `Exercise ${i + 1}: "${c.message}" uses a program check; pages use dom, outputIncludes, outputEquals or codeIncludes.` });
            }
            if (c.dom?.style && INHERITED.has(c.dom.style) && c.dom.styleValue === undefined && /^(p|li|span|a|em|strong)$/i.test(c.dom.selector)) {
              issues.push({ level: 'warning', where, message: `Exercise ${i + 1}: "${c.message}" checks inherited ${c.dom.style} on ${c.dom.selector}. Check the element the style is set on.` });
            }
          }
          const starter = gradeHtml(ex.starter ?? '', ex.checks);
          if (starter.passed.length > 0 && starter.passed.every(Boolean)) {
            issues.push({ level: 'warning', where, message: `Exercise ${i + 1}: the starter code already passes every check, so there's nothing to do.` });
          }
        }
      }
    }
  }
  return issues;
}

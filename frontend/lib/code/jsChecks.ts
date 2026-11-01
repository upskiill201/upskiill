/**
 * Grading a JavaScript Write and run program, and explaining JavaScript
 * errors in plain words. The runner (jsRunner.ts) does the running; the
 * check rules are the same as Python's (checks.ts gradeChecks): `expr` is a
 * JavaScript expression run in the page after the code settles, and the
 * output checks read the console.
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import { gradeChecks, straightenQuotes, type CheckResult } from './checks';
import { runJs, type JsError, type JsRunOptions, type RawJsRun } from './jsRunner';

export interface GradedJsRun extends RawJsRun {
  checks: CheckResult[];
  allPassed: boolean;
}

/** Run a learner's program in a hidden practice page and grade it against the exercise's checks. */
export async function runJsAndCheck(
  code: string,
  checks: CodeCheck[],
  opts: Omit<JsRunOptions, 'exprs'> = {},
): Promise<GradedJsRun> {
  const clean = straightenQuotes(code);
  const exprs = checks.filter((c) => c.expr !== undefined).map((c) => c.expr as string);
  const run = await runJs(clean, { ...opts, exprs });
  const results = gradeChecks(checks, clean, run);
  return { ...run, checks: results, allPassed: results.length > 0 && results.every((r) => r.passed) };
}

/**
 * Tey's plain-words reading of a JavaScript error: what went wrong and what
 * to try. The browser's own message is still shown underneath, because
 * reading real error messages is part of the course.
 */
export function explainJsError(err: JsError): string {
  const m = err.message;
  const at = err.line ? ` on line ${err.line}` : '';
  switch (err.type) {
    case 'SyntaxError': {
      if (/Invalid or unexpected token|Unterminated string|unterminated string/i.test(m))
        return `A quote was opened${at} but never closed, or there's a character JavaScript can't read. Text needs a quote at both ends: "like this".`;
      if (/Unexpected end of input/i.test(m)) return `JavaScript got to the end while something was still open. Count your { } and ( ): one is missing a partner.`;
      if (/missing \) after argument list/i.test(m)) return `A ( was opened${at} but not closed. Check the brackets around what you pass in, like console.log("hi").`;
      if (/Unexpected token '?\)'?/i.test(m)) return `There's a ) too many${at}, or something missing just before it.`;
      if (/Unexpected token '?\}'?/i.test(m)) return `There's a } too many${at}, or something missing just before it.`;
      if (/Unexpected identifier/i.test(m)) return `JavaScript found a name where it didn't expect one${at}. A missing comma, operator or quote is the usual cause.`;
      if (/Identifier '([^']+)' has already been declared/i.test(m)) {
        const name = /Identifier '([^']+)'/.exec(m)?.[1];
        return `${name} is created twice${at}. Make it once with let or const, then change it without the keyword: ${name} = ...`;
      }
      if (/Unexpected string/i.test(m)) return `Two pieces of text are side by side${at} with nothing between them. Join them with + or a comma.`;
      if (/Unexpected number/i.test(m)) return `A number is in a place JavaScript didn't expect${at}. Is a comma or operator missing?`;
      if (/await is only valid/i.test(m)) return `await only works inside a function marked async${at}. Write async before the function.`;
      if (/Invalid left-hand side in assignment/i.test(m)) return `The left side of = must be a name you can save to${at}. To compare, use === instead.`;
      if (/Missing initializer in const/i.test(m)) return `A const needs its value straight away${at}: const price = 59;`;
      return `JavaScript couldn't read line ${err.line ?? '?'}. Look for a missing quote, bracket or comma there.`;
    }
    case 'ReferenceError': {
      const name = /^(\S+) is not defined/.exec(m)?.[1];
      if (/before initialization/i.test(m)) {
        const used = /access '([^']+)'/.exec(m)?.[1];
        return `${used ?? 'A name'} is used${at} before the line that creates it. Move the let or const above it.`;
      }
      if (name && ['Console', 'Document', 'Math'].includes(name)) return `JavaScript is case-sensitive: it's ${name.charAt(0).toLowerCase() + name.slice(1)}.`;
      return name
        ? `JavaScript doesn't know the name ${name}${at}. Did you create it first, and spell it exactly the same (capitals count)? If it's text, it needs quotes.`
        : `JavaScript doesn't know a name you used${at}. Check the spelling, and that you created it first.`;
    }
    case 'TypeError': {
      if (/Assignment to constant variable/i.test(m)) return `You tried to change a const${at}. Use let for values that change.`;
      if (/Cannot read propert(y|ies) of null/i.test(m))
        return `Something${at} is null, so it has no properties. Usually querySelector found nothing: check the selector matches the page (# for an id, . for a class).`;
      if (/Cannot read propert(y|ies) of undefined/i.test(m))
        return `Something${at} is undefined, so it has no properties. Check the name, and that the value really exists (is that index or key there?).`;
      if (/Cannot set propert(y|ies) of null/i.test(m)) return `You're setting a property on null${at}: querySelector found nothing. Check the selector.`;
      if (/is not a function/i.test(m)) {
        const what = /(\S+) is not a function/.exec(m)?.[1];
        return `${what ?? 'Something'}${at} is used like a function with () but isn't one. Check the spelling (capitals count) and that it's really a function.`;
      }
      if (/is not iterable/i.test(m)) return `for...of needs a list${at}, like an array. The value here isn't one.`;
      if (/Failed to fetch/i.test(m)) return `The request couldn't reach the server${at}. Check the address, or your internet connection for real APIs.`;
      if (/already read|body stream/i.test(m)) return `A response's body can only be read once${at}. Call .json() one time and keep the result.`;
      return `A value${at} isn't the kind this needs, like using a number as if it were text. Check what each value is with console.log.`;
    }
    case 'RangeError':
      if (/call stack/i.test(m)) return `A function keeps calling itself forever${at}. It needs a way to stop.`;
      return `A number${at} is outside what's allowed here.`;
    case 'LoopLimit':
      return `Your loop${at} never stopped, so I stopped it. Check that its condition can become false, or that i changes each time round.`;
    case 'SecurityError':
      return 'The practice page blocked that, to keep you safe. This runner keeps localStorage for you between runs instead.';
    default:
      return `JavaScript stopped with a ${err.type}${at}. Read the message under this: it says what went wrong.`;
  }
}

/** What to tell a learner whose page never answered (it froze or took too long). */
export const JS_TIMEOUT_MESSAGE =
  "Your page took too long to answer, so I stopped waiting. Is there a loop that never ends, or a lot of work in one go?";

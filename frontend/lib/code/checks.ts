/**
 * Grading a Write and run program, and explaining errors in plain words
 * (Python, and TypeScript's type errors and JavaScript's runtime errors).
 * Pure: the runners (pythonRunner.ts, tsRunner.ts) do the running; this
 * decides what passed and what to tell the learner.
 */

import type { CodeCheck, RunLanguage } from '@/lib/lesson/blocks';
import { runPython, type PythonError, type RawRunResult } from './pythonRunner';
import { runTypeScript, type TypeDiagnostic } from './tsRunner';
import { renderAndCheckHtml } from './htmlRunner';
import { renderAndCheckRn } from './rnRunner';

export interface CheckResult {
  message: string;
  passed: boolean;
}

export interface GradedRun extends RawRunResult {
  checks: CheckResult[];
  allPassed: boolean;
}

/** Phones love curly quotes and long dashes; Python doesn't. */
export function straightenQuotes(code: string): string {
  return code.replace(/[“”„‟″]/g, '"').replace(/[‘’‚‛′]/g, "'");
}

/** Case- and spacing-insensitive, for "the output contains...". */
const loose = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
/** Spacing at line ends and blank lines at the ends don't count, for "the output is exactly...". */
const exact = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .trim();

/**
 * Grade the checks, given the expression results the runner worked out.
 * TypeScript must type-check to pass, unless the exercise is about a type
 * error (it has a typeErrorIncludes check). Mirrors grade() in
 * backend/src/originals/originals-code-verify.ts.
 */
export function gradeChecks(checks: CodeCheck[], code: string, run: RawRunResult, language: RunLanguage = 'python'): CheckResult[] {
  const typeErrors = run.typeErrors ?? [];
  const deliberate = checks.some((c) => c.typeErrorIncludes !== undefined);
  const typeBlocked = language === 'typescript' && typeErrors.length > 0 && !deliberate;
  let exprIndex = 0;
  return checks.map((c) => {
    let passed = false;
    if (run.timedOut) passed = false;
    else if (c.noTypeErrors) passed = !run.error?.type.startsWith('Syntax') && typeErrors.length === 0;
    else if (c.typeErrorIncludes !== undefined) passed = typeErrors.some((d) => loose(d.message).includes(loose(c.typeErrorIncludes!)));
    else if (run.error || typeBlocked) passed = false;
    else if (c.expr !== undefined) passed = run.exprResults[exprIndex] === true;
    else if (c.outputIncludes !== undefined) passed = loose(run.stdout).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined) passed = exact(run.stdout) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined) passed = straightenQuotes(code).includes(c.codeIncludes);
    if (c.expr !== undefined) exprIndex += 1;
    return { message: c.message, passed };
  });
}

/** Run a learner's program and grade it against the exercise's checks. */
export async function runAndCheck(
  code: string,
  checks: CodeCheck[],
  stdin?: string[],
  language: RunLanguage = 'python',
): Promise<GradedRun> {
  const clean = straightenQuotes(code);
  if (language === 'html') {
    // A page, not a program: render it and check the result (htmlRunner.ts, domChecks.ts).
    const page = await renderAndCheckHtml(clean, checks);
    return { ...page, allPassed: page.checks.length > 0 && page.checks.every((r) => r.passed) };
  }
  if (language === 'react-native') {
    // A phone screen: render it offscreen and run the screen checks (rnRunner.ts, screenChecks.ts).
    const screen = await renderAndCheckRn(clean, checks);
    return { ...screen, allPassed: !screen.error && screen.checks.length > 0 && screen.checks.every((r) => r.passed) };
  }
  const exprs = checks.filter((c) => c.expr !== undefined).map((c) => c.expr as string);
  const run = language === 'typescript' ? await runTypeScript(clean, { exprs }) : await runPython(clean, { stdin, exprs });
  const results = gradeChecks(checks, clean, run, language);
  return { ...run, checks: results, allPassed: results.length > 0 && results.every((r) => r.passed) };
}

/** Does this code ask for input? (So the playground shows the Input box.) Python only. */
export function usesInput(code: string, language: RunLanguage = 'python'): boolean {
  return language === 'python' && /\binput\s*\(/.test(code);
}

/**
 * Tey's plain-words reading of a TypeScript type error. The real message is
 * still shown underneath: reading it is a skill the course teaches.
 */
export function explainTypeError(d: TypeDiagnostic): string {
  const m = d.message;
  const at = d.line ? ` on line ${d.line}` : '';
  const quoted = [...m.matchAll(/'([^']+)'/g)].map((x) => x[1]);
  switch (d.code) {
    case 2322:
    case 2345: {
      const [given, wanted] = quoted;
      if (given && wanted) return `The value${at} is a ${given}, but this spot needs a ${wanted}. Change the value, or check the type you wrote.`;
      return `A value${at} doesn't match the type it's meant to be.`;
    }
    case 2304:
    case 2552:
    case 2582:
      return quoted[0]
        ? `TypeScript doesn't know the name ${quoted[0]}${at}. Did you create it first, and spell it exactly the same (capitals count)?${quoted[1] ? ` Maybe you meant ${quoted[1]}.` : ''} If it's text, it needs quotes.`
        : `TypeScript doesn't know a name you used${at}. Check the spelling, and that you created it first.`;
    case 2339:
    case 2551:
      return quoted[0]
        ? `There's no ${quoted[0]} on that value${at}. Check the spelling${quoted[2] ? `: did you mean ${quoted[2]}?` : ', and what the value is.'}`
        : `That value doesn't have what you asked for${at}. Check the spelling.`;
    case 2588:
      return `${quoted[0] ?? 'That name'} was made with const${at}, so it can't change. Use let if it needs to change.`;
    case 2693:
      return quoted[0]
        ? `${quoted[0]}${at} is the name of a type, not something you can use. Capitals count: did you mean ${quoted[0].charAt(0).toLowerCase()}${quoted[0].slice(1)}?`
        : `That name${at} is a type, not a value. Check the capitals.`;
    case 2448:
    case 2454:
      return `${quoted[0] ?? 'A name'} is used${at} before it has a value. Give it a value first.`;
    case 2554:
    case 2555:
      return `This function${at} was given the wrong number of values. Check how many it expects.`;
    case 2367:
      return `These two can never be equal${at}: their types don't overlap. Check what you're comparing.`;
    case 2531:
    case 2532:
    case 18047:
    case 18048:
      return `This might be empty (null or undefined)${at}. Check it has a value before you use it.`;
    case 7006:
    case 7005:
    case 7034:
      return `TypeScript can't tell what type this is${at}. Add a type, like (name: string).`;
    case 2349:
      return `Something${at} is being used like a function with () but isn't one.`;
    case 2365:
    case 2362:
    case 2363:
      return `Maths${at} needs numbers on both sides. One side isn't a number.`;
    case 2769:
      return `None of the ways to call this function${at} match the values you gave it.`;
    case 2741:
    case 2739:
      return quoted[0] ? `Something${at} is missing ${quoted[0]}, which its type needs.` : `Something${at} is missing a property its type needs.`;
    case 2353:
      return quoted[0] ? `${quoted[0]} isn't part of this type${at}. Check the spelling, or add it to the type.` : `That property isn't part of this type${at}.`;
    case 2355:
      return `This function says it returns a value, but not every path returns one${at}.`;
    case 2366:
      return `Not every path through this function returns a value${at}.`;
    default:
      return `TypeScript spotted a problem${at}. Read the message below: it says which types don't match.`;
  }
}

/** Plain words for a JavaScript runtime error (or a syntax error) in a TypeScript program. */
export function explainJsError(err: PythonError): string {
  const m = err.message;
  const at = err.line ? ` on line ${err.line}` : '';
  switch (err.type) {
    case 'SyntaxError':
      if (/Unterminated string/i.test(m)) return `A quote was opened${at} but never closed. Text needs a quote at both ends: "like this".`;
      if (/'\)' expected/.test(m)) return `A bracket was opened${at} but never closed. Count your ( and ).`;
      if (/'}' expected/.test(m)) return `A curly bracket was opened${at} but never closed. Count your { and }.`;
      if (/';' expected|',' expected/.test(m)) return `TypeScript couldn't read line ${err.line ?? '?'}. Look for a missing quote, bracket or comma just before it.`;
      if (/Invalid character/i.test(m)) return `There's a character${at} TypeScript can't read. Curly quotes or symbols from your keyboard are the usual cause.`;
      return `TypeScript couldn't read line ${err.line ?? '?'}. Look for a missing quote, bracket or comma there.`;
    case 'ReferenceError':
      return 'Your code used a name that doesn\'t exist yet. Check the spelling, and that you created it first.';
    case 'TypeError':
      if (/Cannot read propert/i.test(m)) return 'Your code reached into something that was empty (undefined or null). Check it has a value first.';
      if (/is not a function/i.test(m)) return 'Something is being called like a function with () but isn\'t one.';
      if (/Assignment to constant/i.test(m)) return 'A const was changed. Use let if it needs to change.';
      return 'A value was used in a way its type doesn\'t allow.';
    case 'RangeError':
      return 'A number was out of range. If a function calls itself, make sure it can stop.';
    case 'RunnerError':
      return 'Something went wrong running your code. Try running it again.';
    default:
      return `Your program stopped with a ${err.type}. Read the message: it says what went wrong.`;
  }
}

/**
 * Tey's plain-words reading of a Python error: what went wrong and what to
 * try. The original message is still shown underneath, because reading real
 * error messages is a skill this course teaches.
 */
export function explainError(err: PythonError): string {
  const m = err.message;
  const at = err.line ? ` on line ${err.line}` : '';
  switch (err.type) {
    case 'SyntaxError': {
      if (/unterminated string|EOL while scanning|unterminated triple/i.test(m))
        return `A quote was opened${at} but never closed. Text needs a quote at both ends: "like this".`;
      if (/was never closed|unexpected EOF/i.test(m)) return `A bracket was opened${at} but never closed. Count your ( and ).`;
      if (/unmatched/i.test(m)) return `There's a closing bracket${at} with no opening one to match it.`;
      if (/expected ':'/i.test(m)) return `Python expected a colon${at}. Lines that start with if, else, for, while or def end with a :`;
      if (/invalid character/i.test(m)) return `There's a character${at} Python can't read. Curly quotes or symbols from your keyboard are the usual cause.`;
      if (/Missing parentheses in call to 'print'/i.test(m)) return 'In Python 3, print needs brackets: print("like this").';
      if (/cannot assign to|can't assign to/i.test(m)) return `The name you're saving to${at} has to be on the left of the =, like total = 5.`;
      if (/Perhaps you forgot a comma/i.test(m)) return `Python thinks a comma is missing${at}. Check between the items in your brackets.`;
      return `Python couldn't read line ${err.line ?? '?'}. Look for a missing quote, bracket, colon or comma there.`;
    }
    case 'IndentationError':
    case 'TabError':
      if (/expected an indented block/i.test(m)) return `The line after a colon needs to be indented${at}: push it in by 4 spaces.`;
      if (/unexpected indent/i.test(m)) return `Line ${err.line ?? '?'} is pushed in when it shouldn't be. Remove the spaces at its start.`;
      return `The spaces at the start of line ${err.line ?? '?'} don't line up with the lines around it.`;
    case 'NameError': {
      const name = /name '([^']+)' is not defined/.exec(m)?.[1];
      if (name && /^[A-Z]/.test(name) && ['print', 'input', 'len', 'int', 'str', 'range'].includes(name.toLowerCase()))
        return `Python is case-sensitive: it's ${name.toLowerCase()}, all lowercase.`;
      return name
        ? `Python doesn't know the name ${name}${at}. Did you create it first, and spell it exactly the same (capitals count)? If it's text, it needs quotes.`
        : `Python doesn't know a name you used${at}. Check the spelling, and that you created it first.`;
    }
    case 'TypeError':
      if (/can only concatenate str/i.test(m) || /unsupported operand type\(s\) for \+: 'int' and 'str'/i.test(m))
        return `You're joining text and a number${at}. Turn the number into text with str(), or use an f-string.`;
      if (/not callable/i.test(m)) return `Something${at} is being used like a function with () but isn't one. Did you reuse a name like print or input?`;
      if (/missing \d+ required positional argument/i.test(m)) return `A function${at} was called without all the values it needs.`;
      if (/takes \d+ positional argument/i.test(m)) return `A function${at} was given more values than it expects.`;
      return `Two kinds of value don't mix${at}, like text and a number. Check what type each one is.`;
    case 'ValueError':
      if (/invalid literal for int\(\)/i.test(m)) return `int() can only turn digits into a number${at}. "20" works, "twenty" doesn't.`;
      if (/could not convert string to float/i.test(m)) return `float() needs something that looks like a number${at}.`;
      return `A value${at} is the right type but not one Python can use here.`;
    case 'ZeroDivisionError':
      return `Your code divides by zero${at}. Nothing can be shared between zero people.`;
    case 'IndexError':
      return `That position doesn't exist${at}. Remember positions start at 0, so a list of 3 has positions 0, 1 and 2.`;
    case 'KeyError':
      return `That key isn't in the dictionary${at}. Check the spelling, or use .get() to be safe.`;
    case 'AttributeError':
      return `That value doesn't have the method you used${at}. Check the spelling, and what type the value is.`;
    case 'EOFError':
      return 'Your program asked for input, but there was none left. Add a line in the Input box for each input().';
    case 'ModuleNotFoundError':
    case 'ImportError':
      return `Python couldn't find that module${at}. Check the name; this runner has Python's standard library.`;
    case 'RecursionError':
      return `A function keeps calling itself forever${at}. It needs a way to stop.`;
    case 'RunnerError':
      return 'Something went wrong running your code. Try running it again.';
    default:
      return `Python stopped with a ${err.type}${at}. Read the last line of the message: it says what went wrong.`;
  }
}

/** What to tell a learner whose program ran past the time limit. */
export const TIMEOUT_MESSAGE =
  "Your code ran for too long, so I stopped it. Is there a loop that never ends? Check that a while loop's condition can become False.";

/** The same, for TypeScript (lowercase false, and no Python words). */
export const TIMEOUT_MESSAGE_TS =
  "Your code ran for too long, so I stopped it. Is there a loop that never ends? Check that a while loop's condition can become false.";

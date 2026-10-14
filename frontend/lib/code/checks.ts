/**
 * Grading a Write and run program, and explaining Python errors in plain
 * words. Pure: the runner (pythonRunner.ts) does the running; this decides
 * what passed and what to tell the learner.
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import { runPython, type PythonError, type RawRunResult } from './pythonRunner';

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

/** Grade the checks that don't need Python, given the expression results that did. */
export function gradeChecks(checks: CodeCheck[], code: string, run: RawRunResult): CheckResult[] {
  let exprIndex = 0;
  return checks.map((c) => {
    let passed = false;
    if (run.error || run.timedOut) passed = false;
    else if (c.expr !== undefined) passed = run.exprResults[exprIndex] === true;
    else if (c.outputIncludes !== undefined) passed = loose(run.stdout).includes(loose(c.outputIncludes));
    else if (c.outputEquals !== undefined) passed = exact(run.stdout) === exact(c.outputEquals);
    else if (c.codeIncludes !== undefined) passed = straightenQuotes(code).includes(c.codeIncludes);
    if (c.expr !== undefined) exprIndex += 1;
    return { message: c.message, passed };
  });
}

/** Run a learner's program and grade it against the exercise's checks. */
export async function runAndCheck(code: string, checks: CodeCheck[], stdin?: string[]): Promise<GradedRun> {
  const clean = straightenQuotes(code);
  const exprs = checks.filter((c) => c.expr !== undefined).map((c) => c.expr as string);
  const run = await runPython(clean, { stdin, exprs });
  const results = gradeChecks(checks, clean, run);
  return { ...run, checks: results, allPassed: results.length > 0 && results.every((r) => r.passed) };
}

/** Does this code ask for input? (So the playground shows the Input box.) */
export function usesInput(code: string): boolean {
  return /\binput\s*\(/.test(code);
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

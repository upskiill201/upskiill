/**
 * Grading a C Write and run program, and explaining C errors in plain words.
 * Grading is the same as Python's (checks.ts gradeChecks): output and code
 * checks only, since a C program leaves nothing to evaluate afterwards.
 * Mirrors backend/src/originals/originals-c-verify.ts; keep them in step.
 */

import type { CodeCheck } from '@/lib/lesson/blocks';
import { gradeChecks, straightenQuotes, type CheckResult } from './checks';
import { runC, type CError, type RawCRun } from './cRunner';

export interface GradedCRun extends RawCRun {
  checks: CheckResult[];
  allPassed: boolean;
}

/** Compile and run a learner's program, and grade it against the exercise's checks. */
export async function runCAndCheck(code: string, checks: CodeCheck[], stdin?: string[]): Promise<GradedCRun> {
  const clean = straightenQuotes(code);
  const run = await runC(clean, { stdin });
  const results = gradeChecks(checks, clean, run);
  return { ...run, checks: results, allPassed: results.length > 0 && results.every((r) => r.passed) };
}

/** Does this code read input? (So the pad shows the Input box.) */
export function usesCInput(code: string): boolean {
  return /\b(scanf|getchar|fgets|getline|fgetc|getc)\s*\(/.test(code);
}

/** The header each common library function lives in. */
const HEADER_FOR: Record<string, string> = {
  printf: 'stdio.h',
  scanf: 'stdio.h',
  puts: 'stdio.h',
  putchar: 'stdio.h',
  getchar: 'stdio.h',
  fgets: 'stdio.h',
  sprintf: 'stdio.h',
  snprintf: 'stdio.h',
  fopen: 'stdio.h',
  strlen: 'string.h',
  strcpy: 'string.h',
  strncpy: 'string.h',
  strcat: 'string.h',
  strcmp: 'string.h',
  strncmp: 'string.h',
  strchr: 'string.h',
  strstr: 'string.h',
  strcspn: 'string.h',
  memset: 'string.h',
  memcpy: 'string.h',
  malloc: 'stdlib.h',
  calloc: 'stdlib.h',
  realloc: 'stdlib.h',
  free: 'stdlib.h',
  rand: 'stdlib.h',
  srand: 'stdlib.h',
  abs: 'stdlib.h',
  atoi: 'stdlib.h',
  atof: 'stdlib.h',
  exit: 'stdlib.h',
  qsort: 'stdlib.h',
  sqrt: 'math.h',
  pow: 'math.h',
  floor: 'math.h',
  ceil: 'math.h',
  round: 'math.h',
  fabs: 'math.h',
  toupper: 'ctype.h',
  tolower: 'ctype.h',
  isdigit: 'ctype.h',
  isalpha: 'ctype.h',
  isspace: 'ctype.h',
  isupper: 'ctype.h',
  islower: 'ctype.h',
  bool: 'stdbool.h',
  true: 'stdbool.h',
  false: 'stdbool.h',
  INT_MAX: 'limits.h',
  INT_MIN: 'limits.h',
  time: 'time.h',
  NULL: 'stdio.h',
};

/**
 * Tey's plain-words reading of a C error: what went wrong and what to try.
 * The original message is still shown underneath, because reading real
 * compiler messages is a skill this course teaches.
 */
export function explainCError(err: CError): string {
  const m = err.message;
  const at = err.line ? ` on line ${err.line}` : '';
  switch (err.type) {
    case 'Compile error': {
      if (m === "';' expected") return `A semicolon is missing at the end of line ${err.line ?? 'the line before'}. In C, every statement ends with ;`;
      const undeclared = /^'(\w+)' undeclared$/.exec(m);
      if (undeclared) {
        const name = undeclared[1];
        const header = HEADER_FOR[name];
        if (header) return `C doesn't know ${name}${at} yet. It lives in ${header}: add #include <${header}> at the top.`;
        if (name === 'string') return `C has no string type. Text lives in an array of char, like char name[20] = "Mika";`;
        return `C doesn't know ${name}${at}. Declare it first (like int ${name} = 0;), or check the spelling: C cares about capitals.`;
      }
      if (/String not closed/i.test(m)) return `A string was opened${at} but never closed. Text needs a double quote at both ends: "like this".`;
      if (/Character not closed/i.test(m)) return `A character${at} is missing its closing quote. A single character goes in single quotes: 'A'.`;
      if (/Comma or `\)` expected|'\)' expected/.test(m)) return `A bracket was opened${at} but never closed. Count your ( and ).`;
      if (/ends before something it opened is closed/.test(m)) return 'Something you opened is never closed. Check that every { has its } and every ( has its ).';
      if (/no main\(\) function/.test(m)) return 'Every C program needs a main() function: that is where it starts. Check the spelling, in lowercase: int main(void)';
      if (/already defined/.test(m)) return `That name is declared twice${at}. Declare a variable once, then just use its name.`;
      if (/Cannot modify 'const'/.test(m)) return `That value is const${at}: it can't change after it's set. Remove const if it needs to change.`;
      if (/expect (\d+) arguments, but (\d+)/.test(m)) return `The function call${at} has the wrong number of values in its brackets. Match the function's parameters.`;
      if (/void function 'return' a value/.test(m)) return `A void function gives nothing back, so its return can't have a value${at}. Change void to a type, or just write return;`;
      if (/Cannot assign to array/.test(m)) return `You can't copy text into an array with =${at}. Use strcpy(name, "text"), or set it when you declare it.`;
      if (/cannot be used outside of loop/.test(m)) return `break and continue only work inside a loop (or a switch, for break)${at}.`;
      if (/doesn't exist in the struct/.test(m)) return `That struct has no field with that name${at}. Check the spelling against the struct's definition.`;
      if (/Cannot dereference/.test(m)) return `The * on line ${err.line ?? '?'} reads through a pointer, but that value isn't a pointer.`;
      if (/Cannot call except function/.test(m)) return `Something${at} is used like a function, with brackets after it, but it isn't one.`;
      if (/isn't something C knows/.test(m)) return `That # line${at} is misspelled. The usual one is #include <stdio.h>.`;
      if (/no header called/.test(m)) return `That header name${at} is misspelled. The common ones are stdio.h, stdlib.h, string.h, math.h and ctype.h.`;
      if (/Unexpected token|expected/i.test(m)) return `C got confused${at}. Look for a missing ; or bracket on this line or the line just before it.`;
      return `The program didn't compile${at}. Read the message below: it names the problem.`;
    }
    case 'Number too big':
      return m;
    case 'Division by zero':
      return 'Your program divided a whole number by zero, which C cannot do. Check the value you divide by before dividing.';
    case 'Overflow':
      return 'A calculation gave a number too big for its type. Use a bigger type (long long), or smaller numbers.';
    case 'Memory error':
      return "Your program used memory it doesn't own: usually an array index past the end, or a pointer that points nowhere. Check your indexes start at 0 and stop before the size.";
    case 'Stack overflow':
      return "A function kept calling itself and never stopped. Check that the recursion has a base case it always reaches.";
    case 'Missing function':
      return `${m} Use a different function for now.`;
    case 'Runner error':
      return 'Something went wrong running your code. Try running it again.';
    default:
      return `Your program stopped: ${err.type}${at}. Read the message below.`;
  }
}

/** What to tell a learner whose program ran past the time limit. */
export const C_TIMEOUT_MESSAGE =
  "Your program ran for too long, so I stopped it. Is there a loop that never ends? Check that the loop's condition can become false.";

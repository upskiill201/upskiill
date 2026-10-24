import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 9. Reading: join, slice and sort (and the number-sort trap). */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'join, slice and sort',
  summary: 'Christmas Day. The lodge sign wants trails in alphabetical order, separated by dots. The text alert wants only the first three. Arrays have tools for both, and one trap.',
  minutes: 10,
  outcomes: [
    'Turn an array into one string with join',
    'Take part of an array with slice',
    'Sort strings, and sort numbers safely with a compare function',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Three tools for a lodge sign',
      html: '<p><b>join</b> glues every item into one string, with whatever you put between them:</p><pre>["Bluebird", "Big Sky"].join(" · ")   // "Bluebird · Big Sky"</pre><p><b>slice(start, end)</b> copies part of an array: from <code>start</code> up to, but <i>not including</i>, <code>end</code>. The original is left alone.</p><pre>trails.slice(0, 3)   // the first three</pre><p><b>sort()</b> puts items in order, and it <i>changes</i> the array it\'s called on. For words, the plain version is fine:</p><pre>["Lone Pine", "Big Sky", "Bluebird"].sort()   // Big Sky, Bluebird, Lone Pine</pre><p><b>The trap.</b> Plain <code>sort()</code> compares everything as <i>text</i>, so numbers sort like words: <code>[22, 4, 18].sort()</code> gives <b>[18, 22, 4]</b>, because "1" comes before "2" before "4". Nora put that on the lift-line screen and Rafa noticed in a second.</p><p>For numbers, give sort a compare function: <code>(a, b) =&gt; a - b</code> for smallest first, or <code>(a, b) =&gt; b - a</code> for biggest first.</p><pre>[22, 4, 18].sort((a, b) =&gt; a - b)   // [4, 18, 22]</pre>',
    },
    {
      kind: 'tryIt',
      title: 'The lodge sign',
      code: 'const open = ["Lone Pine", "Big Sky", "Bluebird", "Schoolhouse", "Lazy Elk"];\n\nopen.sort();\nconsole.log(open.join(" · "));\nconsole.log(open.slice(0, 3).join(", "));\n\nconst waits = [22, 4, 18];\nconsole.log(waits.sort());\nconsole.log(waits.sort((a, b) => a - b));\n',
      caption: 'Watch the third line: plain sort on numbers gives a text order.',
      challenge: 'Sort the waits biggest first with (a, b) => b - a.',
    },
  ],
  apply: {
    scenario: 'The Christmas Day lodge sign.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(["Old Blue", "Bunny Carpet"].join(" / "));',
        language: 'javascript',
        options: [
          { text: 'Old Blue / Bunny Carpet' },
          { text: 'Old Blue,Bunny Carpet', why: 'That\'s join() with no separator given. Here it\'s " / ".' },
          { text: '["Old Blue" / "Bunny Carpet"]', why: 'join makes one plain string.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log([22, 4, 18].sort().join(","));',
        language: 'javascript',
        options: [
          { text: '4,18,22', why: 'Plain sort compares as text, where "18" < "22" < "4".' },
          { text: '22,18,4', why: 'That\'s biggest first. Plain sort doesn\'t do that either.' },
          { text: '18,22,4' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the method to what it does.',
        pairs: [
          ['join', 'Makes one string from all items'],
          ['slice', 'Copies part of the array'],
          ['sort', 'Puts items in order, in place'],
          ['(a, b) => a - b', 'Numbers, smallest first'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Sort the open trails alphabetically and print them joined with " · " (space, middle dot, space).',
        starter: 'const open = ["Lone Pine", "Big Sky", "Bluebird"];\n',
        solution: 'const open = ["Lone Pine", "Big Sky", "Bluebird"];\nopen.sort();\nconsole.log(open.join(" · "));\n',
        hint: 'open.sort(); then console.log(open.join(" · "));',
        checks: [
          { message: 'Print Big Sky · Bluebird · Lone Pine', outputEquals: 'Big Sky · Bluebird · Lone Pine' },
          { message: 'Use join', codeIncludes: '.join(' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Sort the waits from smallest to biggest.',
        template: 'waits.sort((a, b) => a [[1]] b);',
        blanks: [['-']],
        distractors: ['+', '>', '<'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Sort the waits biggest first with a compare function, then print the top two joined with ", ".',
        starter: 'const waits = [4, 9, 14, 22, 18, 11, 6];\n',
        solution: 'const waits = [4, 9, 14, 22, 18, 11, 6];\nwaits.sort((a, b) => b - a);\nconsole.log(waits.slice(0, 2).join(", "));\n',
        hint: 'waits.sort((a, b) => b - a); then waits.slice(0, 2)',
        checks: [
          { message: 'Print 22, 18', outputEquals: '22, 18' },
          { message: 'waits is sorted biggest first', expr: 'waits.join() === "22,18,14,11,9,6,4"' },
          { message: 'Use slice', codeIncludes: '.slice(' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The screen shows waits as 11, 22, 4, 6, 9. Which line is the cause?',
        lines: ['const waits = [4, 9, 22, 11, 6];', 'waits.sort();', 'console.log(waits.join(", "));'],
        bug: 1,
        fix: 'waits.sort((a, b) => a - b);',
        explanation: 'Plain sort orders numbers as text. Give it (a, b) => a - b.',
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'trails has 14 items. How many does trails.slice(0, 3) give you?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it change the original array?',
        groups: ['Changes it', 'Leaves it alone'],
        items: [
          { text: 'sort()', group: 0 },
          { text: 'slice(0, 3)', group: 1 },
          { text: 'join(", ")', group: 1 },
          { text: 'push("Big Sky")', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa spots the lift screen. Pick Nora\'s answer.',
        from: 'rafa',
        message: 'Your screen says the shortest wait is 11 minutes and the longest is 4. Want to try again?',
        options: [
          { text: 'Plain sort treats numbers as text. I\'ll use (a, b) => a - b' },
          { text: 'The clicker is broken', why: 'The data is fine. Plain sort orders numbers as text.' },
          { text: 'That\'s just how JavaScript is, nothing to do', why: 'There is: give sort a compare function.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Where have you seen a sort go wrong: files named 1, 10, 2, or a list in a strange order? Now you know why.',
    starters: ['I\'ve seen...', 'It happened because...'],
  },
  deepen: {
    title: 'toSorted',
    summary: 'Newer JavaScript has trails.toSorted(), which returns a sorted copy and leaves the original alone, like slice does. Older browsers lack it, so you\'ll often see [...trails].sort() instead: copy first, then sort the copy.',
  },
  notes: 'Array.prototype.join, slice, sort (default sort converts to strings, compares UTF-16 order), toSorted (ES2023): MDN. Fri 25 Dec 2026.',
};

export default lesson;

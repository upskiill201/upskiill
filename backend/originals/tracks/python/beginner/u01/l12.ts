import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — the Zen of Python: `import this`, readability, and why Python looks the way it does. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'The Zen of Python',
  summary: 'Type two words and Python prints its own philosophy. One line in it explains almost everything about how Python looks: "Readability counts."',
  minutes: 12,
  outcomes: [
    'Show the Zen of Python with import this',
    'Explain why Python cares so much about readable code',
    'Rewrite code so it is easier to read',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A philosophy you can print',
      html: `<p>In 1999, a long-time Python developer called Tim Peters wrote down the ideas behind Python's design as a short poem of guiding principles. It became known as <strong>the Zen of Python</strong>, and in 2004 it was recorded as PEP 20, one of Python's official design documents.</p>
<p>It is built into Python itself. Run these two words and it prints the whole thing:</p>
<p><code>import this</code></p>
<h3>Lines worth remembering</h3>
<ul>
<li><strong>"Beautiful is better than ugly."</strong> Code is read by people, so it should look tidy.</li>
<li><strong>"Simple is better than complex."</strong> If there's a simple way, use it.</li>
<li><strong>"Readability counts."</strong> The big one. Code is read far more often than it is written.</li>
<li><strong>"Errors should never pass silently."</strong> A loud error now beats a hidden mistake later. (Remember lesson 9.)</li>
<li><strong>"Now is better than never."</strong> Good advice for learners too.</li>
</ul>
<h3>Why it matters to you</h3>
<p>This is why Python uses plain words like <code>print</code>, <code>if</code> and <code>for</code> instead of lots of symbols, and why Arjun keeps going on about good names and comments. Readable code is code you can still understand next month, and code your teammates can trust.</p>`,
    },
    {
      kind: 'tryIt',
      title: 'Print the Zen',
      caption: 'Two words. Press Run and read the output.',
      code: 'import this\n',
      challenge: 'Find the line about errors. Do you agree with it after lesson 9?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Code is read far more often than it is written. Write for the next person, who is usually you.',
    },
  ],
  apply: {
    scenario: 'Ada learns why Python looks the way it does.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does import this do?',
        options: [
          { text: 'Imports the whole internet', why: 'It prints Python\'s guiding principles.' },
          { text: 'Shows an error', why: 'It is a real, built-in module.' },
          { text: 'Prints the Zen of Python' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the Zen line about readability, on its own',
        starter: '# Tip: run import this first to find the line, then print just that line.\n',
        solution: 'print("Readability counts.")\n',
        hint: 'It is two words long, and ends with a full stop.',
        checks: [{ message: 'Print exactly that one line', outputEquals: 'Readability counts.' }],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Readability ..." (finish the Zen line, one word)',
        answers: ['counts'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the spirit of the Zen, or not?',
        groups: ['Zen', 'Not Zen'],
        items: [
          { text: 'A clear name and a comment saying why', group: 0 },
          { text: 'Hiding an error so nobody sees it', group: 1 },
          { text: 'The simplest way that works', group: 0 },
          { text: 'A clever one-liner nobody can read', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which version is more readable?',
        options: [
          { text: 'print(20000*10)', why: 'Works, but a reader has no idea what the numbers mean.' },
          { text: '# Each member pays 20000\nprint("Pot:", 20000 * 10)' },
          { text: 'print( 20000*10 )#x', why: 'Odd spacing and a meaningless comment.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make this code readable',
        starter: 'print(15000*12)\n',
        solution: '# Each of the 12 members pays 15000\nprint("Pot:", 15000 * 12)\n',
        hint: 'Add a comment saying what the numbers are, and a label in the print.',
        checks: [
          { message: 'Add a comment explaining the numbers', codeIncludes: '#' },
          { message: 'Print a label before the number, like Pot: 180000', outputIncludes: ': 180000' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Zen line to what it means for your code.',
        pairs: [
          ['Readability counts', 'Write for the next reader'],
          ['Simple is better than complex', 'Use the simple way that works'],
          ['Errors should never pass silently', 'Let problems show, then fix them'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'My one-line version is shorter. Why rewrite it?',
        prompt: 'What would the Zen of Python say?',
        options: [
          { text: 'Shorter is always better.', why: 'Not if nobody can read it.' },
          { text: 'Longer is always better.', why: 'Simple is better than complex. Long is not the goal either.' },
          { text: 'Readability counts. Shorter is only better if it is still easy to read.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line that prints the Zen.',
        language: 'python',
        template: '[[1]] [[2]]',
        blanks: [['import'], ['this']],
        distractors: ['print', 'zen'],
      },
      {
        kind: 'mcq',
        prompt: 'Who wrote the Zen of Python?',
        options: [
          { text: 'Tim Peters, a long-time Python developer' },
          { text: 'Guido van Rossum', why: 'Guido created Python. The Zen was written by Tim Peters.' },
          { text: 'Monty Python', why: 'They inspired the name only.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick one Zen line from the output that you like. What would it mean outside of code, in your life?',
    starters: ['The line I like is...', 'In my life it means...'],
  },
  deepen: {
    title: 'Read the whole thing',
    summary: 'Run import this and read all of it. Some lines are jokes (look for the one about being Dutch).',
  },
  notes:
    'Zen of Python by Tim Peters: posted 1999 to the Python mailing list; PEP 20 created 2004; PEP 20 is in the public domain. `import this` module "this" ships with CPython. Quoted lines are from PEP 20. "Although that way may not be obvious at first unless you\'re Dutch" is the Dutch joke (about Guido).',
};

export default lesson;

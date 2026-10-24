import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Reading: truthy and falsy values. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Empty means false',
  summary: 'Someone leaves the name box empty and the website says "Welcome, !". Nora learns that if accepts more than true and false.',
  minutes: 10,
  outcomes: [
    'List the falsy values: false, 0, "", null, undefined, NaN',
    'Use if (name) to check that something was typed',
    'Spot when 0 being falsy causes a bug',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Welcome, !',
      html: '<p>The ski school page greets people by name. When someone skips the box, <code>name</code> is an empty string <code>""</code>, and the page says <b>Welcome, !</b></p><p>Nora could write <code>if (name !== "")</code>. But JavaScript has a shortcut: <b>if accepts any value</b>, not only <code>true</code> and <code>false</code>. It treats some values as false. They are called <b>falsy</b>:</p><ul><li><code>false</code></li><li><code>0</code></li><li><code>""</code> (an empty string)</li><li><code>null</code> and <code>undefined</code> (nothing there)</li><li><code>NaN</code></li></ul><p>Everything else is <b>truthy</b>: any non-empty text (even <code>"0"</code> and <code>"false"</code>), any number but 0, and every list and object.</p><p>So <code>if (name)</code> means "if a name was typed". That\'s shorter, and you\'ll see it everywhere.</p><p>Rafa\'s warning: <b>0 is falsy too</b>. If you check <code>if (trailsOpen)</code> to decide whether to show the number, a morning with zero open trails shows nothing at all, when "0 trails open" is exactly what people need to know. When 0 is a real answer, compare properly: <code>if (trailsOpen &gt;= 0)</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Welcome, someone',
      code: 'const name = "";\n\nif (name) {\n  console.log(`Welcome, ${name}!`);\n} else {\n  console.log("Welcome, skier!");\n}\n\nconsole.log(Boolean(""));\nconsole.log(Boolean("0"));\nconsole.log(Boolean(0));\n',
      caption: 'Boolean(x) shows how if will treat a value.',
      challenge: 'Put your name in the quotes and run it again.',
    },
  ],
  apply: {
    scenario: 'Fixing "Welcome, !"',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Truthy or falsy?',
        groups: ['Truthy', 'Falsy'],
        items: [
          { text: '""', group: 1 },
          { text: '"0"', group: 0 },
          { text: '0', group: 1 },
          { text: '"Nora"', group: 0 },
          { text: 'undefined', group: 1 },
          { text: '14', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const name = "";\nif (name) {\n  console.log("Hi " + name);\n} else {\n  console.log("Hi there");\n}',
        language: 'javascript',
        options: [
          { text: 'Hi ', why: 'An empty string is falsy, so the else runs.' },
          { text: 'Hi there' },
          { text: 'Nothing', why: 'One of the two branches always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const name = "Wes". If name is truthy print Welcome, Wes! (use ${name}), otherwise print Welcome, skier!',
        starter: 'const name = "Wes";\n',
        solution: 'const name = "Wes";\nif (name) {\n  console.log(`Welcome, ${name}!`);\n} else {\n  console.log("Welcome, skier!");\n}\n',
        hint: 'if (name) { ... } else { ... }',
        checks: [
          { message: 'Print Welcome, Wes!', outputEquals: 'Welcome, Wes!' },
          { message: 'Check if (name)', codeIncludes: 'if (name)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'On a morning with no open trails, the website shows nothing at all. Which line is the problem?',
        lines: ['const trailsOpen = 0;', 'if (trailsOpen) {', '  console.log(`${trailsOpen} trails open`);', '}'],
        bug: 1,
        fix: 'if (trailsOpen >= 0) {',
        explanation: '0 is falsy, so the block is skipped. When 0 is a real answer, compare with >= 0.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(Boolean("false"));',
        language: 'javascript',
        options: [
          { text: 'false', why: 'It\'s text with letters in it. Any non-empty string is truthy.' },
          { text: 'An error', why: 'Boolean() works on any value.' },
          { text: 'true' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Values that if treats as false are called...',
        answers: ['falsy', 'falsey'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const trailsOpen = 0. Print exactly: 0 trails open, using an if that still runs when the number is 0.',
        starter: 'const trailsOpen = 0;\n',
        solution: 'const trailsOpen = 0;\nif (trailsOpen >= 0) {\n  console.log(`${trailsOpen} trails open`);\n}\n',
        hint: 'if (trailsOpen >= 0) { ... }',
        checks: [
          { message: 'Print 0 trails open', outputEquals: '0 trails open' },
          { message: 'Use an if', codeIncludes: 'if (' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each value to how if treats it.',
        pairs: [
          ['null', 'Falsy: nothing there'],
          ['NaN', 'Falsy: not a number'],
          ['"Old Blue"', 'Truthy: non-empty text'],
          ['-5', 'Truthy: any number but 0'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Only greet if someone typed a name.',
        template: 'if ([[1]]) {\n  console.log(`Welcome, ${name}!`);\n}',
        blanks: [['name']],
        distractors: ['"name"', 'name === true', '!name'],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'Rafa asks a tricky one. Pick Nora\'s answer.',
        from: 'rafa',
        message: 'Someone types 0 in the "how many kids" box. Does if (kids) treat that as "no answer"?',
        options: [
          { text: 'No, 0 is truthy', why: '0 is one of the falsy values.' },
          { text: 'Yes, 0 is falsy. I\'ll check kids >= 0 instead, so 0 counts as an answer' },
          { text: 'It depends on the browser', why: 'Every browser treats 0 as falsy.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where would treating "empty" as "no" be helpful, and where would it be a mistake? Think of forms you\'ve filled in.',
    starters: ['Helpful when...', 'A mistake when...'],
  },
  deepen: {
    title: '|| for a default',
    summary: 'You\'ll see const shown = name || "skier"; It uses the first truthy value, so an empty name becomes "skier". But it also replaces 0. In Level 3 you\'ll meet ??, which only replaces null and undefined, and keeps 0 and "" as real answers.',
  },
  notes: 'Falsy values: MDN "Falsy" (false, 0, -0, 0n, "", null, undefined, NaN, document.all). Truthy: MDN "Truthy". Boolean(): MDN.',
};

export default lesson;

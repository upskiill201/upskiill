import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Before/After: the classic for loop with i, and while. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Counting with i',
  summary: 'Rafa wants the report numbered: "1. Schoolhouse, 2. Lazy Elk...". for...of gives Nora the trail, but not its number. Time for the loop every old tutorial uses.',
  minutes: 11,
  outcomes: [
    'Read and write a classic for loop with a counter i',
    'Use i to get both the position and the item',
    'Write a while loop that runs until a condition is false',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Numbering the report',
      before: {
        label: 'for...of: the item only',
        text: 'for (const trail of trails) {\n  console.log(trail);\n}\n\nSimple and clear, but there\'s no number. You know the trail, not where it is in the list.',
      },
      after: {
        label: 'for with i: the position too',
        text: 'for (let i = 0; i < trails.length; i++) {\n  console.log(`${i + 1}. ${trails[i]}`);\n}\n\nThree parts in the brackets: start (let i = 0), keep going while (i < trails.length), after each round (i++). trails[i] is the item.',
      },
      notes: [
        'i starts at 0 because indexes do. Add 1 when you show it to people.',
        'i < trails.length, not <=. With <= the last round reads trails[14], which is undefined.',
        'Use for...of when you just need each item. Use for with i when the position matters.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A numbered report, and a countdown',
      code: 'const trails = ["Schoolhouse", "Lazy Elk", "Bunny Hollow", "Old Mill"];\n\nfor (let i = 0; i < trails.length; i++) {\n  console.log(`${i + 1}. ${trails[i]}`);\n}\n\n// while: repeat as long as the condition is true\nlet chairs = 3;\nwhile (chairs > 0) {\n  console.log(`${chairs} chairs to go`);\n  chairs--;\n}\nconsole.log("Last chair!");\n',
      caption: 'while has only a condition. Something inside must change, or it never stops.',
      challenge: 'Change the for loop so it prints only the first two trails.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A loop whose condition never becomes false runs forever. Teyro\'s runner stops it after a couple of seconds; a real browser tab would freeze. Always check that something in the loop moves toward the end.',
    },
  ],
  apply: {
    scenario: 'Rafa\'s numbered report.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'for (let i = 0; i < 3; i++) {\n  console.log(i);\n}',
        language: 'javascript',
        options: [
          { text: '1\n2\n3', why: 'i starts at 0 and stops before 3.' },
          { text: '0\n1\n2' },
          { text: '0\n1\n2\n3', why: 'When i is 3, i < 3 is false, so the loop stops.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of for (let i = 0; i < trails.length; i++) to its job.',
        pairs: [
          ['let i = 0', 'Runs once, at the start'],
          ['i < trails.length', 'Checked before every round'],
          ['i++', 'Runs after every round'],
          ['trails[i]', 'The item this round'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Use a for loop with i to print each lift numbered from 1: 1. Old Blue, 2. Ridge T-Bar, 3. Bunny Carpet.',
        starter: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n',
        solution: 'const lifts = ["Old Blue", "Ridge T-Bar", "Bunny Carpet"];\n\nfor (let i = 0; i < lifts.length; i++) {\n  console.log(`${i + 1}. ${lifts[i]}`);\n}\n',
        hint: 'console.log(`${i + 1}. ${lifts[i]}`);',
        checks: [
          { message: 'Print the numbered list', outputEquals: '1. Old Blue\n2. Ridge T-Bar\n3. Bunny Carpet' },
          { message: 'Use a for loop with i', codeIncludes: 'let i = 0' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The report ends with "4. undefined". Which line?',
        lines: ['for (let i = 0; i <= trails.length; i++) {', '  console.log(`${i + 1}. ${trails[i]}`);', '}'],
        bug: 0,
        fix: 'for (let i = 0; i < trails.length; i++) {',
        explanation: 'With <=, the last round uses i = length, one past the last index. Use <.',
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'This loop never stops. Why?',
        code: 'let chairs = 3;\nwhile (chairs > 0) {\n  console.log(chairs);\n}',
        language: 'javascript',
        options: [
          { text: 'chairs never changes, so chairs > 0 is always true' },
          { text: 'while loops always run forever', why: 'They stop when the condition becomes false.' },
          { text: 'console.log is too slow', why: 'Nothing is moving the loop toward its end.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Count down from 5 to 1.',
        template: 'let n = 5;\n[[1]] (n > 0) {\n  console.log(n);\n  n[[2]];\n}',
        blanks: [['while'], ['--']],
        distractors: ['for', '++', 'if'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Write a while loop: let chairs = 3, and while chairs > 0, print chairs and take 1 off. After the loop, print Last chair!',
        starter: 'let chairs = 3;\n',
        solution: 'let chairs = 3;\n\nwhile (chairs > 0) {\n  console.log(chairs);\n  chairs--;\n}\n\nconsole.log("Last chair!");\n',
        hint: 'while (chairs > 0) { console.log(chairs); chairs--; }',
        checks: [
          { message: 'Print 3, 2, 1, then Last chair!', outputEquals: '3\n2\n1\nLast chair!' },
          { message: 'Use while', codeIncludes: 'while (' },
          { message: 'chairs ends at 0', expr: 'chairs === 0' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which loop fits best?',
        groups: ['for...of', 'for with i', 'while'],
        items: [
          { text: 'Print every trail name', group: 0 },
          { text: 'Print every trail with its number', group: 1 },
          { text: 'Keep loading chairs until the line is empty', group: 2 },
          { text: 'Add up every wait time', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the classic for loop, which one-letter variable name is used for the counter by tradition?',
        answers: ['i'],
        placeholder: 'One letter',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const t = ["A", "B", "C", "D"];\nfor (let i = 0; i < t.length; i += 2) {\n  console.log(t[i]);\n}',
        language: 'javascript',
        options: [
          { text: 'A\nB\nC\nD', why: 'i += 2 skips every other index.' },
          { text: 'B\nD', why: 'i starts at 0, so A comes first.' },
          { text: 'A\nC' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What do you repeat "until" something happens: stir until it boils, call until someone answers? That\'s a while loop. What\'s the condition?',
    starters: ['I keep ... while...', 'The condition is...'],
  },
  deepen: {
    title: 'break',
    summary: 'Inside any loop, break stops it straight away. Searching a list for the first black trail that\'s open? Loop, and break as soon as you find it. Next chapter you\'ll meet find(), which does exactly this for you.',
  },
  notes: 'for statement, while statement, break: MDN. Runner stops loops after 2.5 s (frontend/public/javascript/runner.js LOOP_LIMIT_MS).',
};

export default lesson;

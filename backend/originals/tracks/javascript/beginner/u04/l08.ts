import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Tap to explore: if inside a loop, finding the biggest value. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Loops that decide',
  summary: 'Christmas Eve. The lift-line clicker logs a wait every half hour. Mags wants the worst one of the day, and the times when it went over 15 minutes.',
  minutes: 10,
  outcomes: [
    'Put an if inside a loop to act on some items only',
    'Track the biggest value seen so far',
    'Build a new array from the items that pass a test',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The longest wait',
      text: 'Nora writes let longest = waits[0]; then for (const wait of waits) { if (wait > longest) { longest = wait; } } and keeps a second list too: const bad = []; with bad.push(wait) for every wait over 15.',
      hotspots: [
        { phrase: 'let longest = waits[0];', note: 'Start with the first value as "the biggest so far". Starting at 0 would be wrong if every value were negative; starting with a real item is always safe.' },
        { phrase: 'if (wait > longest)', note: 'Each time round, compare the current wait to the best so far.' },
        { phrase: 'longest = wait;', note: 'Found a bigger one? It becomes the new "biggest so far". After the loop, longest holds the biggest of all.' },
        { phrase: 'const bad = [];', note: 'An empty array to collect results. Even as a const, you can push into it.' },
        { phrase: 'bad.push(wait)', note: 'Only the waits that pass the test get added. After the loop, bad holds just those.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Christmas Eve on Old Blue',
      code: 'const waits = [4, 9, 14, 22, 18, 11, 6];  // minutes, every half hour from 9:00\n\nlet longest = waits[0];\nconst bad = [];\n\nfor (const wait of waits) {\n  if (wait > longest) {\n    longest = wait;\n  }\n  if (wait > 15) {\n    bad.push(wait);\n  }\n}\n\nconsole.log(`Longest wait: ${longest} min`);\nconsole.log(`Over 15 min: ${bad.length} times`);\n',
      caption: 'Two ifs in one loop: one tracks the biggest, one collects the bad ones.',
      challenge: 'Track the shortest wait too, with let shortest = waits[0] and a < comparison.',
    },
  ],
  apply: {
    scenario: 'Christmas Eve on Old Blue.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let longest = 0;\nfor (const w of [4, 22, 9]) {\n  if (w > longest) {\n    longest = w;\n  }\n}\nconsole.log(longest);',
        language: 'javascript',
        options: [
          { text: '9', why: 'That\'s the last item, but longest keeps the biggest.' },
          { text: '22' },
          { text: '35', why: 'This finds the biggest, it doesn\'t add.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Find the longest wait. Start with let longest = waits[0], loop, and print longest.',
        starter: 'const waits = [4, 9, 14, 22, 18, 11, 6];\n',
        solution: 'const waits = [4, 9, 14, 22, 18, 11, 6];\nlet longest = waits[0];\n\nfor (const wait of waits) {\n  if (wait > longest) {\n    longest = wait;\n  }\n}\n\nconsole.log(longest);\n',
        hint: 'if (wait > longest) { longest = wait; }',
        checks: [
          { message: 'Print 22', outputEquals: '22' },
          { message: 'longest is 22', expr: 'longest === 22' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Collect the waits over 15.',
        template: 'const bad = [];\nfor (const wait of waits) {\n  if (wait [[1]] 15) {\n    bad.[[2]](wait);\n  }\n}',
        blanks: [['>'], ['push']],
        distractors: ['<', 'pop', 'add'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'longest always ends up as the last wait. Which line is wrong?',
        lines: ['let longest = waits[0];', 'for (const wait of waits) {', '  longest = wait;', '}'],
        bug: 2,
        fix: '  if (wait > longest) { longest = wait; }',
        explanation: 'Without the if, every wait replaces longest. Only replace it when the new one is bigger.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const busy = [] and push every wait over 15 into it. Print busy.length.',
        starter: 'const waits = [4, 9, 14, 22, 18, 11, 6];\n',
        solution: 'const waits = [4, 9, 14, 22, 18, 11, 6];\nconst busy = [];\n\nfor (const wait of waits) {\n  if (wait > 15) {\n    busy.push(wait);\n  }\n}\n\nconsole.log(busy.length);\n',
        hint: 'if (wait > 15) { busy.push(wait); }',
        checks: [
          { message: 'Print 2', outputEquals: '2' },
          { message: 'busy holds 22 and 18', expr: 'busy.join() === "22,18"' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with longest = waits[0] instead of longest = 0?',
        options: [
          { text: 'It\'s faster', why: 'Speed isn\'t the reason.' },
          { text: 'It always starts from a real value, so it works even if every number is negative' },
          { text: '0 isn\'t allowed', why: '0 is allowed. It just gives the wrong answer for all-negative lists.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which pattern solves each job?',
        groups: ['Running total', 'Biggest so far', 'Collect matches'],
        items: [
          { text: 'Total snow this week', group: 0 },
          { text: 'The longest wait', group: 1 },
          { text: 'Every trail that\'s groomed', group: 2 },
          { text: 'The coldest morning', group: 1 },
          { text: 'All waits over 15 minutes', group: 2 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Find the coldest morning (the smallest temperature). Start with let coldest = temps[0] and print exactly: Coldest: 3°F',
        starter: 'const temps = [18, 11, 3, 9, 14];\n',
        solution: 'const temps = [18, 11, 3, 9, 14];\nlet coldest = temps[0];\n\nfor (const t of temps) {\n  if (t < coldest) {\n    coldest = t;\n  }\n}\n\nconsole.log(`Coldest: ${coldest}°F`);\n',
        hint: 'if (t < coldest) { coldest = t; }',
        checks: [
          { message: 'Print Coldest: 3°F', outputEquals: 'Coldest: 3°F' },
          { message: 'coldest is 3', expr: 'coldest === 3' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which array method adds a matching item to your results list?',
        answers: ['push', 'push()', '.push()'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags reads the numbers. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Twenty-two minutes at half past ten? And twice over fifteen? That settles it, I\'m putting a second operator on Old Blue on busy mornings.',
        options: [
          { text: 'And I can show you which mornings, if the clicker keeps logging' },
          { text: 'The numbers might be wrong', why: 'The code is checked. The numbers are what the clicker logged.' },
          { text: 'Twenty-two is fine', why: 'Mags decided it isn\'t, and the data backs her up.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a list in your life where you\'d want the biggest, the smallest, or only the ones over a limit. What would you do with the answer?',
    starters: ['I\'d want the biggest...', 'Only the ones over...'],
  },
  deepen: {
    title: 'Math.max',
    summary: 'For plain numbers there\'s a shortcut: Math.max(...waits) gives 22 and Math.min(...waits) gives 4. The ... spreads the array into separate arguments. Your loop does more, though: it can track the biggest thing by any rule you like.',
  },
  notes: 'Max-so-far pattern; Math.max / spread syntax: MDN. Thu 24 Dec 2026.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2 — Variables, lists, if and loops: the Python basics this course needs, in one go. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Variables, lists, if and loops',
  summary: 'Before pandas, Tey gives Halima the four Python ideas she\'ll use every day: a named box, a list, a decision, and a loop that repeats work. Five minutes, then they\'re hers.',
  minutes: 12,
  outcomes: [
    'Store values in variables and lists',
    'Make a decision with if',
    'Repeat work for every item with a for loop',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four ideas',
      steps: [
        { title: '1. Variables', body: 'A name for a value.', code: 'wait_days = 21\nclinic = "Yaba"', language: 'python' },
        { title: '2. Lists', body: 'Many values, in order, in square brackets. len() counts them.', code: 'waits = [3, 21, 5, 30]\nprint(len(waits))   # 4', language: 'python' },
        { title: '3. if', body: 'Run lines only when something is true. Note the colon and the indent.', code: 'if wait_days > 14:\n    print("Long wait")', language: 'python' },
        { title: '4. for loops', body: 'Do the same thing for every item in a list.', code: 'for w in waits:\n    print(w)', language: 'python' },
        { title: '5. Together', body: 'A loop with an if inside: print only the long waits.', code: 'for w in waits:\n    if w > 14:\n        print(w)   # 21, then 30', language: 'python' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Long waits',
      caption: 'Add more waits to the list and run it again.',
      code: 'waits = [3, 21, 5, 30, 16, 2]\n\nfor w in waits:\n    if w > 14:\n        print(f"{w} days: long wait")\n',
      challenge: 'Count the long waits instead of printing them.',
    },
  ],
  apply: {
    scenario: 'The Python basics.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'waits = [3, 21, 5, 30]\nprint(len(waits))',
        language: 'python',
        options: [
          { text: '59', why: 'len() counts items; it doesn\'t add them.' },
          { text: '30', why: 'That\'s the biggest item.' },
          { text: '4' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Loop over waits and print only the waits longer than 14 days',
        starter: 'waits = [3, 21, 5, 30]\n',
        solution: 'waits = [3, 21, 5, 30]\nfor w in waits:\n    if w > 14:\n        print(w)\n',
        hint: 'for w in waits:, then if w > 14: inside it',
        checks: [
          { message: 'Print 21 then 30', outputEquals: '21\n30' },
          { message: 'Use a for loop', codeIncludes: 'for ' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Count how many waits are longer than 14 days, and print the count',
        starter: 'waits = [3, 21, 5, 30, 16, 2]\ncount = 0\n',
        solution: 'waits = [3, 21, 5, 30, 16, 2]\ncount = 0\nfor w in waits:\n    if w > 14:\n        count = count + 1\nprint(count)\n',
        hint: 'Inside the if: count = count + 1. Print after the loop (no indent).',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Count in the loop', expr: 'count == 3' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the code.',
        pairs: [
          ['Variable', 'wait_days = 21'],
          ['List', '[3, 21, 5]'],
          ['Decision', 'if wait_days > 14:'],
          ['Loop', 'for w in waits:'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This crashes with an IndentationError. Which line?',
        language: 'python',
        lines: ['waits = [3, 21]', 'for w in waits:', 'print(w)'],
        bug: 2,
        fix: '    print(w)',
        explanation: 'Lines inside a loop must be indented (4 spaces).',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines to print the long waits.',
        language: 'python',
        lines: ['waits = [3, 21, 5, 30]', 'for w in waits:', '    if w > 14:', '        print(w)'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'total = 0\nfor w in [3, 21, 5]:\n    total = total + w\nprint(total)',
        language: 'python',
        options: [
          { text: '3', why: 'The loop adds every item, not just the first.' },
          { text: '29' },
          { text: '0', why: 'total grows inside the loop.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Repeat for every wait.',
        language: 'python',
        template: '[[1]] w [[2]] waits:\n    print(w)',
        blanks: [['for'], ['in']],
        distractors: ['if', 'of'],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Why learn loops if pandas does tables for me?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You don\'t need them, ever.', why: 'You\'ll write a loop in Chapter 3.' },
          { text: 'Loops are only for experts.', why: 'They\'re one of the first things every beginner learns.' },
          { text: 'pandas handles most table work, but in Chapter 3 you\'ll build a predictor yourself, and that needs a loop.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which function counts the items in a list? (no brackets)',
        answers: ['len', 'len()'],
        placeholder: 'Function name',
      },
    ],
  },
  reflect: {
    prompt: 'A loop repeats the same steps for every item. What do you do "for every item" in real life (every message, every customer, every receipt)?',
    starters: ['For every... I', 'A loop could...'],
  },
  deepen: {
    title: 'Want more Python?',
    summary: 'This is the short version. Teyro\'s Python for Beginners course covers these ideas slowly, over several chapters, if you want a deeper base.',
  },
  notes: 'Python tutorial §3 (lists), §4.1 (if), §4.2 (for). [3,21,5,30]: long waits 21, 30. [3,21,5,30,16,2]: 3 over 14. 3+21+5 = 29.',
};

export default lesson;

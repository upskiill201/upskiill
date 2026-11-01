import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9: type(), joining text, f-strings, numbers in f-strings. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: talking tracker',
  summary: 'The tracker now speaks in sentences: "11 members x 25000 = 275000. This month: Tunde." Ada sends a screenshot to the group chat. Quick check before converting types.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build sentences from variables with f-strings', 'Check a value\'s type'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, the group chat',
      beats: [
        { speaker: 'narrator', text: 'Ada posts a screenshot to the ajo group chat: "11 members x 25000 = 275000. This month: Tunde."' },
        { speaker: 'narrator', text: 'Tunde replies with a thumbs up. Bisi replies: "Finally, a pot we can all check."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: types and f-strings.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print This month: Tunde. Next: Bisi. with one f-string',
        starter: 'this_month = "Tunde"\nnext_up = "Bisi"\n',
        solution: 'this_month = "Tunde"\nnext_up = "Bisi"\nprint(f"This month: {this_month}. Next: {next_up}.")\n',
        hint: 'Two sets of braces in one f-string.',
        checks: [
          { message: 'Print This month: Tunde. Next: Bisi.', outputEquals: 'This month: Tunde. Next: Bisi.' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(type(25000 / 5))',
        language: 'python',
        options: [
          { text: "<class 'int'>", why: '/ always gives a float.' },
          { text: "<class 'float'>" },
          { text: '5000.0', why: 'type() shows the type.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes a TypeError?',
        language: 'python',
        lines: ['members = 11', 'print(f"Members: {members}")', 'print("Members: " + members)'],
        bug: 2,
        fix: 'print(f"Members: {members}")',
        explanation: '+ can\'t join text to a number. The f-string on the line above does it without fuss.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it prints.',
        pairs: [
          ['"Pay " + "day"', 'Pay day'],
          ['f"{3 * 4}"', '12'],
          ['"{3 * 4}"', '{3 * 4}'],
          ['f"{5 / 2:.1f}"', '2.5'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Each gets 25000, working it out from pot and members with :.0f',
        starter: 'pot = 275000\nmembers = 11\n',
        solution: 'pot = 275000\nmembers = 11\nprint(f"Each gets {pot / members:.0f}")\n',
        hint: 'f"Each gets {pot / members:.0f}"',
        checks: [
          { message: 'Print Each gets 25000', outputEquals: 'Each gets 25000' },
          { message: 'Divide inside the braces', codeIncludes: 'pot / members' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What type does each give?',
        groups: ['int', 'float', 'str'],
        items: [
          { text: '11 * 2', group: 0 },
          { text: '11 / 2', group: 1 },
          { text: 'f"{11}"', group: 2 },
          { text: '"Tunde" + "!"', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make this an f-string.',
        language: 'python',
        template: 'print([[1]]"Pot: {pot}")',
        blanks: [['f']],
        distractors: ['s', 'str'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "Bisi"\nprint("Hi " + name + "!")',
        language: 'python',
        options: [
          { text: 'Hi Bisi!' },
          { text: 'Hi name!', why: 'name is a variable, so Python uses its value.' },
          { text: 'HiBisi!', why: 'The space is inside "Hi ".' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the type of "25000" and the type of 25000, on two lines',
        starter: '',
        solution: 'print(type("25000"))\nprint(type(25000))\n',
        hint: 'print(type("25000")) then print(type(25000))',
        checks: [{ message: "Print <class 'str'> then <class 'int'>", outputEquals: "<class 'str'>\n<class 'int'>" }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Which would you use for "Members: 11": + with str(), or an f-string?',
        prompt: "Ada's best answer?",
        options: [
          { text: '+ without str().', why: 'That\'s the TypeError.' },
          { text: 'Neither, just type Members: 11.', why: 'Then it goes stale when members changes.' },
          { text: 'An f-string: f"Members: {members}". Shorter, and no str().' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: show the pot with two decimal places.',
        language: 'python',
        tiles: ['print(', 'f"{pot:.2f}"', ')'],
        distractors: ['"{pot:.2f}"', 'f"{pot:2}"'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print(f"{7 * 3}") show?',
        answers: ['21'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Bisi said "Finally, a pot we can all check." Why does showing the working build trust?',
    starters: ['Showing the working...', 'People trust it because...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 6-9. 25000 / 5 = 5000.0 (float); 275000 / 11 = 25000.0; 5 / 2 = 2.5.',
};

export default lesson;

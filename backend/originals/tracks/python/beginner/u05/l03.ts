import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3 — if: run lines only when a condition is True. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'if',
  summary: 'True and False aren\'t much use on their own. Ada wants the tracker to DO something when they\'re True: print "Paid in full" only for people who did. Welcome to if.',
  minutes: 11,
  outcomes: [
    'Write an if with a condition and a colon',
    'Indent the lines that belong to it',
    'Predict when the indented lines run',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Anatomy of an if',
      steps: [
        {
          title: '1. if and a condition',
          body: 'Start with if, then any question that gives True or False.',
          code: 'if paid >= SHARE',
          language: 'python',
        },
        {
          title: '2. A colon',
          body: 'The colon says "here comes what to do". Forgetting it is a SyntaxError.',
          code: 'if paid >= SHARE:',
          language: 'python',
        },
        {
          title: '3. Indented lines',
          body: 'Lines indented under the if (4 spaces) run only when the condition is True. That indented group is called a block.',
          code: 'if paid >= SHARE:\n    print("Paid in full")',
          language: 'python',
        },
        {
          title: '4. Back to the left',
          body: 'The next unindented line isn\'t part of the if. It always runs.',
          code: 'if paid >= SHARE:\n    print("Paid in full")\nprint("Checked")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Paid in full?',
      caption: 'Run it, then change paid to 15000. Which lines still print?',
      code: 'SHARE = 30000\npaid = 30000\n\nif paid >= SHARE:\n    print("Paid in full")\n    print("Thank you!")\nprint("Checked")\n',
      challenge: 'Add a second if that prints "Short" when paid < SHARE.',
    },
  ],
  apply: {
    scenario: 'The tracker\'s first decision.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 15000. What does this print?',
        code: 'if paid >= 30000:\n    print("Paid")\nprint("Done")',
        language: 'python',
        options: [
          { text: 'Paid then Done', why: 'The condition is False, so the indented line is skipped.' },
          { text: 'Nothing', why: 'print("Done") isn\'t indented, so it always runs.' },
          { text: 'Done' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'If paid is at least SHARE, print Paid in full',
        starter: 'SHARE = 30000\npaid = 30000\n',
        solution: 'SHARE = 30000\npaid = 30000\nif paid >= SHARE:\n    print("Paid in full")\n',
        hint: 'if paid >= SHARE: then an indented print.',
        checks: [
          { message: 'Print Paid in full', outputEquals: 'Paid in full' },
          { message: 'Use if', codeIncludes: 'if ' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines so "Short" prints only when paid is too little.',
        language: 'python',
        lines: ['paid = 15000', 'if paid < 30000:', '    print("Short")', 'print("Checked")'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a SyntaxError?',
        language: 'python',
        lines: ['paid = 30000', 'if paid >= 30000', '    print("Paid")'],
        bug: 1,
        fix: 'if paid >= 30000:',
        explanation: 'Every if line ends with a colon.',
      },
      {
        kind: 'writeCode',
        prompt: 'If the payment day is after PAY_DAY, print Late',
        starter: 'PAY_DAY = 25\nday = 27\n',
        solution: 'PAY_DAY = 25\nday = 27\nif day > PAY_DAY:\n    print("Late")\n',
        hint: 'if day > PAY_DAY:',
        checks: [{ message: 'Print Late', outputEquals: 'Late' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'paid = 30000. Does the indented print run?',
        groups: ['Runs', 'Skipped'],
        items: [
          { text: 'if paid >= 30000:', group: 0 },
          { text: 'if paid < 30000:', group: 1 },
          { text: 'if paid == 30000:', group: 0 },
          { text: 'if paid != 30000:', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the if line.',
        language: 'python',
        template: '[[1]] paid >= SHARE[[2]]',
        blanks: [['if'], [':']],
        distractors: ['when', ';'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a line part of the if?',
        options: [
          { text: 'It comes straight after it', why: 'Position isn\'t enough; indentation is what counts.' },
          { text: 'It\'s indented under the if line' },
          { text: 'It has a colon', why: 'The colon is on the if line itself.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So if is just "only do this when..."?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Exactly. The condition decides, the indented block is the "this". Everything else carries on as normal.' },
          { text: 'No, if repeats things.', why: 'That\'s loops, Chapter 7.' },
          { text: 'It\'s for errors only.', why: 'It\'s for any decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many spaces does Python style (PEP 8) use to indent a block?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write one "if" from your morning, in plain words: if it\'s raining, then...',
    starters: ['If...', 'then I...'],
  },
  deepen: {
    title: 'One-line if',
    summary: 'A very short if can sit on one line: if late: print("Late"). It works, but PEP 8 prefers the indented form for readability.',
  },
  notes: 'if statement syntax (Python Language Reference §8.1; tutorial §4.1). PEP 8: "Use 4 spaces per indentation level."',
};

export default lesson;

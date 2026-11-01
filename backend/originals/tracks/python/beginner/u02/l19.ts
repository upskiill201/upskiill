import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19 — Ada's member card: a multi-line card built from variables and f-strings. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: "Ada's member card",
  summary: 'Every member wants to see their own numbers: name, monthly share, and their payout month. Ada builds a member card from variables, so one card works for everyone.',
  minutes: 13,
  outcomes: [
    'Build a multi-line display from variables',
    'Combine constants, variables and f-strings',
    'Make one template work for every member',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Building the card',
      steps: [
        {
          title: '1. The settings',
          body: 'Constants at the top: they\'re the same for everyone.',
          code: 'GROUP_NAME = "OFFICE AJO"\nSHARE = 25000',
          language: 'python',
        },
        {
          title: '2. The member',
          body: 'Variables for the person on the card. Change these, and it\'s someone else\'s card.',
          code: 'name = "Tunde"\npayout_month = "June"\nmonths_paid = 4',
          language: 'python',
        },
        {
          title: '3. The edges',
          body: 'A line of dashes, made with *, top and bottom.',
          code: 'print("-" * 24)',
          language: 'python',
        },
        {
          title: '4. The lines',
          body: 'One f-string per line. The total paid is worked out in the braces.',
          code: 'print(f"{GROUP_NAME} | {name}")\nprint(f"Share: {SHARE}")\nprint(f"Paid so far: {months_paid * SHARE}")\nprint(f"Payout: {payout_month}")',
          language: 'python',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: "Tunde's card",
      caption: 'Change name, payout_month and months_paid to make Bisi\'s card.',
      code: 'GROUP_NAME = "OFFICE AJO"\nSHARE = 25000\n\nname = "Tunde"\npayout_month = "June"\nmonths_paid = 4\n\nprint("-" * 24)\nprint(f"{GROUP_NAME} | {name}")\nprint(f"Share: {SHARE}")\nprint(f"Paid so far: {months_paid * SHARE}")\nprint(f"Payout: {payout_month}")\nprint("-" * 24)\n',
      challenge: 'Add a line Still to pay: with the months left, if the ajo runs for 11 months.',
    },
  ],
  apply: {
    scenario: 'One card template for every member.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this line print?',
        code: 'SHARE = 25000\nmonths_paid = 4\nprint(f"Paid so far: {months_paid * SHARE}")',
        language: 'python',
        options: [
          { text: 'Paid so far: months_paid * SHARE', why: 'Inside the braces, Python does the sum.' },
          { text: 'Paid so far: 4', why: 'The braces hold the whole sum, 4 * 25000.' },
          { text: 'Paid so far: 100000' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: "Print Bisi's card top line: OFFICE AJO | Bisi",
        starter: 'GROUP_NAME = "OFFICE AJO"\nname = "Bisi"\n',
        solution: 'GROUP_NAME = "OFFICE AJO"\nname = "Bisi"\nprint(f"{GROUP_NAME} | {name}")\n',
        hint: 'f"{GROUP_NAME} | {name}"',
        checks: [
          { message: 'Print OFFICE AJO | Bisi', outputEquals: 'OFFICE AJO | Bisi' },
          { message: 'Use both variables', codeIncludes: '{name}' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card program.',
        language: 'python',
        lines: ['SHARE = 25000', 'name = "Bisi"', 'print("-" * 24)', 'print(f"Name: {name}")', 'print(f"Share: {SHARE}")'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Paid so far: 125000 for 5 months, worked out in the f-string',
        starter: 'SHARE = 25000\nmonths_paid = 5\n',
        solution: 'SHARE = 25000\nmonths_paid = 5\nprint(f"Paid so far: {months_paid * SHARE}")\n',
        hint: 'months_paid * SHARE inside the braces.',
        checks: [
          { message: 'Print Paid so far: 125000', outputEquals: 'Paid so far: 125000' },
          { message: 'Work it out in the braces', codeIncludes: 'months_paid * SHARE' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Same for every member, or different?',
        groups: ['Constant (same for all)', 'Variable (per member)'],
        items: [
          { text: 'GROUP_NAME', group: 0 },
          { text: 'name', group: 1 },
          { text: 'SHARE', group: 0 },
          { text: 'payout_month', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a line of 24 dashes.',
        language: 'python',
        template: 'print("-" [[1]] [[2]])',
        blanks: [['*'], ['24']],
        distractors: ['+', '"24"'],
      },
      {
        kind: 'findBug',
        prompt: 'Which card line has a bug?',
        language: 'python',
        lines: ['print(f"Name: {name}")', 'print("Share: {SHARE}")', 'print(f"Payout: {payout_month}")'],
        bug: 1,
        fix: 'print(f"Share: {SHARE}")',
        explanation: 'Missing the f, so the braces print as they are.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print Still to pay: 7 for a member who has paid 4 of 11 months',
        starter: 'TOTAL_MONTHS = 11\nmonths_paid = 4\n',
        solution: 'TOTAL_MONTHS = 11\nmonths_paid = 4\nprint(f"Still to pay: {TOTAL_MONTHS - months_paid}")\n',
        hint: 'TOTAL_MONTHS - months_paid inside the braces.',
        checks: [{ message: 'Print Still to pay: 7', outputEquals: 'Still to pay: 7' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'How many card programs do you need for 11 members?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Eleven, one each.', why: 'That\'s the retyping problem again.' },
          { text: 'One. Change the three member variables and it\'s someone else\'s card.' },
          { text: 'None, the notebook is fine.', why: 'The notebook is how the arguments started.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'SHARE = 25000, months_paid = 2. What does f"{months_paid * SHARE}" give?',
        answers: ['50000'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'A template with variables works for everyone. Where could one template save you writing the same thing many times?',
    starters: ['I keep writing...', 'A template would...'],
  },
  deepen: {
    title: 'Loops make every card at once',
    summary: 'Right now you change the variables by hand for each member. Chapter 7 prints all eleven cards with a loop.',
  },
  notes: '4 * 25000 = 100000; 5 * 25000 = 125000; 11 - 4 = 7; 2 * 25000 = 50000. Card layout uses str * int and f-strings (PEP 498).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7 — elif: more than two outcomes, checked in order. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'elif',
  summary: '"Paid" or "not paid" isn\'t enough. A payment can be in full, short, or nothing at all, and each needs a different message. Ada\'s decision grows a middle.',
  minutes: 12,
  outcomes: [
    'Add more conditions with elif',
    'Know Python checks them top to bottom and stops at the first True',
    'Order conditions from most specific to least',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three outcomes',
      text: 'if paid >= SHARE prints "Paid in full". elif paid > 0 prints "Part paid". else prints "Nothing yet". Python stops at the first True, so a full payment never reaches the elif.',
      hotspots: [
        { phrase: 'if paid >= SHARE', note: 'Checked first. If True, its block runs and the rest is skipped.' },
        { phrase: 'elif paid > 0', note: 'elif means "else if". Checked only when everything above it was False.' },
        { phrase: 'else prints "Nothing yet"', note: 'Catches whatever is left: here, paid is 0.' },
        { phrase: 'Python stops at the first True', note: 'That\'s why order matters. A full payment is also > 0, but it never gets that far.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Full, part or nothing',
      caption: 'Try paid = 30000, 12000 and 0.',
      code: 'SHARE = 30000\npaid = 12000\n\nif paid >= SHARE:\n    print("Paid in full")\nelif paid > 0:\n    print(f"Part paid: {SHARE - paid} to go")\nelse:\n    print("Nothing yet")\n',
      challenge: 'Add an elif for paying more than the share, printing "Overpaid". Where must it go?',
    },
  ],
  apply: {
    scenario: 'Full, part or nothing.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 12000. What does this print?',
        code: 'if paid >= 30000:\n    print("Full")\nelif paid > 0:\n    print("Part")\nelse:\n    print("None")',
        language: 'python',
        options: [
          { text: 'Full', why: '12000 >= 30000 is False.' },
          { text: 'Part then None', why: 'Python stops at the first True.' },
          { text: 'Part' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Paid in full, Part paid or Nothing yet, using if, elif and else',
        starter: 'SHARE = 30000\npaid = 0\n',
        solution: 'SHARE = 30000\npaid = 0\nif paid >= SHARE:\n    print("Paid in full")\nelif paid > 0:\n    print("Part paid")\nelse:\n    print("Nothing yet")\n',
        hint: 'if paid >= SHARE, elif paid > 0, else.',
        checks: [
          { message: 'Print Nothing yet', outputEquals: 'Nothing yet' },
          { message: 'Use elif', codeIncludes: 'elif ' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'A full payment of 30000 prints "Part paid". Which line is in the wrong place?',
        language: 'python',
        lines: ['if paid > 0:', '    print("Part paid")', 'elif paid >= 30000:', '    print("Paid in full")'],
        bug: 0,
        fix: 'Check paid >= 30000 first',
        explanation: '30000 > 0 is True, so the first branch wins. Put the most specific condition first.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which branch runs? (if >= 30000, elif > 0, else)',
        groups: ['if', 'elif', 'else'],
        items: [
          { text: 'paid = 30000', group: 0 },
          { text: 'paid = 5000', group: 1 },
          { text: 'paid = 0', group: 2 },
          { text: 'paid = 45000', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Days late: print On time (day <= 25), A little late (day <= 28), or Very late',
        starter: 'day = 27\n',
        solution: 'day = 27\nif day <= 25:\n    print("On time")\nelif day <= 28:\n    print("A little late")\nelse:\n    print("Very late")\n',
        hint: 'Check the earliest days first.',
        checks: [{ message: 'Print A little late', outputEquals: 'A little late' }],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the branches so every payment gets the right message.',
        language: 'python',
        lines: ['if paid > 30000:', '    print("Overpaid")', 'elif paid == 30000:', '    print("Exact")', 'else:', '    print("Short")'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The middle branch.',
        language: 'python',
        template: 'if paid >= SHARE:\n    print("Full")\n[[1]] paid > 0:\n    print("Part")',
        blanks: [['elif']],
        distractors: ['else if', 'else'],
      },
      {
        kind: 'mcq',
        prompt: 'How many elif branches can one if have?',
        options: [
          { text: 'One', why: 'You can add as many as you like.' },
          { text: 'As many as you need' },
          { text: 'None without an else', why: 'else is optional.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why not just write three separate ifs?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Separate ifs all get checked, so a payment could match two and print two messages. elif guarantees one answer.' },
          { text: 'Separate ifs are a SyntaxError.', why: 'They\'re allowed; they just behave differently.' },
          { text: 'No reason.', why: 'elif stops at the first match.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'elif is short for what two words?',
        answers: ['else if', 'elseif', 'else-if'],
        placeholder: 'Two words',
      },
    ],
  },
  reflect: {
    prompt: 'Order matters in elif chains: the first match wins. Where in life does the order you check things matter?',
    starters: ['I check first...', 'Because...'],
  },
  deepen: {
    title: 'match',
    summary: 'Python 3.10 added match/case for choosing between many exact values. For ranges like "a little late", if/elif is still the tool.',
  },
  notes: 'if/elif/else evaluated top to bottom; first true branch runs (Python Language Reference §8.1). Structural pattern matching: PEP 634 (Python 3.10).',
};

export default lesson;

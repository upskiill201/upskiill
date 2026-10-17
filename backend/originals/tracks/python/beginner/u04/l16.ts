import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 16 — Formatting a receipt: f-string widths and alignment (:<, :>, with commas). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Formatting a receipt',
  summary: 'Kemi wants every payment to end with a proper receipt: labels on the left, amounts lined up on the right. Spaces typed by hand never line up. f-string widths do.',
  minutes: 12,
  outcomes: [
    'Pad text to a width with :<10',
    'Right-align numbers with :>8',
    'Combine alignment with commas: :>8,',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Hand-typed vs formatted',
      before: {
        label: 'Spaces by hand',
        text: 'Share 30000\nLate fee 1500\nTotal 31500\n\nThe numbers wander left and right.',
      },
      after: {
        label: 'f-string widths',
        text: 'Share       30,000\nLate fee     1,500\nTotal       31,500\n\nLabels left, amounts right, always.',
      },
      notes: [
        'After the colon in the braces, < means left-align and > means right-align. The number is the width in characters.',
        'f"{label:<10}" pads the label with spaces to 10 characters. f"{amount:>8,}" puts commas in and right-aligns the amount in 8.',
        'Short labels get more padding, long ones less, so every amount ends in the same column.',
      ],
    },
    {
      kind: 'tryIt',
      title: "Kemi's receipt",
      caption: 'Same layout for every line.',
      code: 'share = 30000\nfee = 1500\n\nprint(f"{\'Share\':<10}{share:>8,}")\nprint(f"{\'Late fee\':<10}{fee:>8,}")\nprint("-" * 18)\nprint(f"{\'Total\':<10}{share + fee:>8,}")\n',
      challenge: 'Add a line for the bank fee, 50, between the late fee and the dashes.',
    },
  ],
  apply: {
    scenario: 'Lining up the receipt.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does :<10 do inside an f-string?',
        options: [
          { text: 'Keeps only the first 10 characters', why: 'It pads short values. It doesn\'t cut long ones.' },
          { text: 'Checks the value is less than 10', why: 'In a format spec, < means left-align.' },
          { text: 'Pads the value to 10 characters, aligned left' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the label padded to 10 characters, then a |, so the line is: Share     |',
        starter: 'label = "Share"\n',
        solution: 'label = "Share"\nprint(f"{label:<10}|")\n',
        hint: 'f"{label:<10}|"',
        checks: [
          { message: 'Print Share, 5 spaces, then |', outputEquals: 'Share     |' },
          { message: 'Use :<10', codeIncludes: ':<10' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the amount right-aligned in 8 characters with commas, then a |',
        starter: 'amount = 30000\n',
        solution: 'amount = 30000\nprint(f"{amount:>8,}|")\n',
        hint: 'f"{amount:>8,}|"',
        checks: [
          { message: 'Print two spaces, 30,000, then |', outputEquals: '  30,000|' },
          { message: 'Use :>8,', codeIncludes: ':>8,' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the format to what it does.',
        pairs: [
          [':<10', 'Left-align in 10'],
          [':>8', 'Right-align in 8'],
          [':,', 'Add thousands commas'],
          [':^10', 'Centre in 10'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print? (dots show spaces)',
        code: 'print(f"{\'Fee\':<6}|")',
        language: 'python',
        options: [
          { text: '...Fee|', why: '< puts the text on the left, spaces after.' },
          { text: 'Fee...|' },
          { text: 'Fee|', why: ':<6 pads it to 6 characters.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print one receipt line: Late fee padded to 10, then 1500 right-aligned in 8 with commas',
        starter: 'fee = 1500\n',
        solution: 'fee = 1500\nprint(f"{\'Late fee\':<10}{fee:>8,}")\n',
        hint: 'f"{\'Late fee\':<10}{fee:>8,}"',
        checks: [{ message: 'Print Late fee     1,500', outputEquals: 'Late fee     1,500' }],
      },
      {
        kind: 'findBug',
        prompt: 'Which line won\'t line up with the others?',
        language: 'python',
        lines: ['print(f"{\'Share\':<10}{30000:>8,}")', 'print(f"{\'Late fee\':<10}{1500:>8,}")', 'print(f"Total {31500:,}")'],
        bug: 2,
        fix: 'print(f"{\'Total\':<10}{31500:>8,}")',
        explanation: 'No widths, so the amount lands wherever the label ends.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Left-align the label, right-align the amount.',
        language: 'python',
        template: 'print(f"{label:[[1]]10}{amount:[[2]]8,}")',
        blanks: [['<'], ['>']],
        distractors: ['^', '='],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why not just type the spaces?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Because the amounts change length: 1,500 vs 30,000. Widths keep the columns lined up whatever the numbers are.' },
          { text: 'Typing spaces is a SyntaxError.', why: 'It works; it just doesn\'t stay lined up.' },
          { text: 'Spaces cost money.', why: 'It\'s about alignment, not cost.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In f"{amount:>8}", the > means align to the left, right or centre? (one word)',
        answers: ['right', 'right-align', 'right align', 'to the right'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'A neat receipt builds trust. Where has a messy layout made you doubt the numbers?',
    starters: ['I doubted...', 'It looked...'],
  },
  deepen: {
    title: 'Fill characters',
    summary: 'You can pad with something other than spaces: f"{\'Total\':.<12}" gives "Total.......", like a menu.',
  },
  notes: 'Format Specification Mini-Language: align < > ^, width, "," grouping (Python docs, string — Format Specification Mini-Language). f"{\'Share\':<10}{30000:>8,}" = "Share" + 5 spaces + "  30,000" = "Share       30,000"; f"{\'Late fee\':<10}{1500:>8,}" = "Late fee" + 2 spaces + "   1,500".',
};

export default lesson;

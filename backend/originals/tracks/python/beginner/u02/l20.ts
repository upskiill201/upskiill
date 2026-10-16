import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Chapter Challenge. Climax: the welcome screen, rebuilt from variables. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the welcome screen, rebuilt',
  summary: 'The share changes again, and this time Ada changes one line. Rebuild the v0.1 welcome screen from constants, variables and f-strings: everything from Chapter 2, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete screen from variables and f-strings', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'story',
      title: 'The next vote',
      beats: [
        { speaker: 'narrator', text: 'The group votes again: the share goes to 30000. Last month this meant hunting for eleven numbers.' },
        { speaker: 'narrator', text: 'Ada changes one line, SHARE = 30000, and presses Run. Every total on the screen updates.' },
        { speaker: 'arjun', text: '(on a call) That\'s the whole point of variables. You just felt it.' },
        { speaker: 'tey', text: 'Your turn. Rebuild the welcome screen so one change updates everything.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the welcome screen, from variables.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Rebuild the welcome screen from the variables',
        starter:
          'GROUP_NAME = "OFFICE AJO"\nVERSION = "v0.1"\nSHARE = 30000\nmembers = 11\nthis_month = "Bisi"\n# Print, in this order:\n# 1. a line of 20 = signs\n# 2. OFFICE AJO v0.1\n# 3. a line of 20 = signs\n# 4. Members: 11\n# 5. Pot: 330000 (worked out by Python)\n# 6. This month: Bisi\n',
        solution:
          'GROUP_NAME = "OFFICE AJO"\nVERSION = "v0.1"\nSHARE = 30000\nmembers = 11\nthis_month = "Bisi"\nprint("=" * 20)\nprint(f"{GROUP_NAME} {VERSION}")\nprint("=" * 20)\nprint(f"Members: {members}")\nprint(f"Pot: {members * SHARE}")\nprint(f"This month: {this_month}")\n',
        hint: 'Six prints. Use f-strings with the variables, and members * SHARE for the pot.',
        checks: [
          { message: 'Print the screen exactly, in order', outputEquals: '====================\nOFFICE AJO v0.1\n====================\nMembers: 11\nPot: 330000\nThis month: Bisi' },
          { message: 'Work the pot out from the variables', codeIncludes: 'members * SHARE' },
          { message: 'Use the GROUP_NAME constant', codeIncludes: '{GROUP_NAME}' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'share = "30000"\nprint(int(share) * 2)',
        language: 'python',
        options: [
          { text: '60000' },
          { text: '3000030000', why: 'int() turned it into a number first.' },
          { text: 'TypeError', why: 'After int(), it\'s a number.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix every bug in this draft',
        starter: 'SHARE = 30000\nmembers = 11\nprint("Members: {members}")\nprint(f"Pot: {member * SHARE}")\nprint("Share: " + SHARE)\n',
        solution: 'SHARE = 30000\nmembers = 11\nprint(f"Members: {members}")\nprint(f"Pot: {members * SHARE}")\nprint(f"Share: {SHARE}")\n',
        hint: 'Three bugs: a missing f, a misspelled name, and + between text and a number.',
        checks: [{ message: 'Print the three lines', outputEquals: 'Members: 11\nPot: 330000\nShare: 30000' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which error would each line cause?',
        groups: ['NameError', 'TypeError', 'No error'],
        items: [
          { text: 'print(f"{membrs}")', group: 0 },
          { text: 'print("Pot: " + 330000)', group: 1 },
          { text: 'print(f"Pot: {330000}")', group: 2 },
          { text: 'print(Share) when only SHARE exists', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Swap this_month and next_month, then print This month: Tunde',
        starter: 'this_month = "Bisi"\nnext_month = "Tunde"\n',
        solution: 'this_month = "Bisi"\nnext_month = "Tunde"\nthis_month, next_month = next_month, this_month\nprint(f"This month: {this_month}")\n',
        hint: 'One-line swap, then an f-string.',
        checks: [
          { message: 'Print This month: Tunde', outputEquals: 'This month: Tunde' },
          { message: 'next_month is now Bisi', expr: 'next_month == "Bisi"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to its job.',
        pairs: [
          ['=', 'Store a value'],
          ['f"{x}"', 'Put a value in text'],
          ['int()', 'Turn text into a number'],
          ['type()', 'Say what a value is'],
          ['CAPITALS', 'Mark a constant'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'fee = 100\ntotal = 30000 + fee\nfee = 0\nprint(total)',
        language: 'python',
        options: [
          { text: '30000', why: 'total was worked out while fee was 100.' },
          { text: '30100' },
          { text: '0', why: 'That\'s fee.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The pot should be 330000. Which line gives the wrong answer?',
        language: 'python',
        lines: ['SHARE = 30000', 'members = "11"', 'print(f"Pot: {int(members) * SHARE}")', 'print(f"Pot: {members * 2}")'],
        bug: 3,
        fix: 'print(f"Pot: {int(members) * SHARE}")',
        explanation: 'members is text, so members * 2 repeats it: 1111.',
      },
      {
        kind: 'orderLines',
        prompt: "Order Ada's chapter.",
        lines: ['Eleven 20000s to hunt for', 'Boxes with labels', 'Text vs numbers', 'f-strings', 'Converting the bank export', 'One line changes the share'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the pot line.',
        language: 'python',
        template: 'print([[1]]"Pot: {members [[2]] SHARE}")',
        blanks: [['f'], ['*']],
        distractors: ['+', 's'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Chapter 2 done. What\'s the single biggest idea?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Always use f-strings.', why: 'A useful tool, but variables are the big idea.' },
          { text: 'Never change anything.', why: 'Variables make change easy.' },
          { text: 'Store a value once, give it a clear name, and let everything else use the name.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints This month: Bisi from the variable.',
        language: 'python',
        tiles: ['print(', 'f"This month: {this_month}"', ')'],
        distractors: ['"This month: {this_month}"', 'Print('],
      },
      {
        kind: 'typeAnswer',
        prompt: 'members = 11, SHARE = 30000. What is members * SHARE?',
        answers: ['330000', '330,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 2 done. The tracker updates itself when the share changes. What part of your own work would you love to update with one change?',
    starters: ['I\'d love to...', 'One change would...'],
  },
  deepen: {
    title: 'Next: Chapter 3',
    summary: 'The bank charges a fee, someone pays half, and splitting 330000 seven ways doesn\'t come out even. Chapter 3: money maths.',
  },
  notes: 'Chapter Challenge for Chapter 2. 11 * 30000 = 330000; 30000 + 100 = 30100; "11" * 2 = "1111". 330000 / 7 = 47142.857... (Chapter 3 teaser: uneven splits).',
};

export default lesson;

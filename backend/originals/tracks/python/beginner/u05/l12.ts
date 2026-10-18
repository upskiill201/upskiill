import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 12 — Late fees with conditions: turning the group's written rules into code. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Late fees with conditions',
  summary: 'The group writes its late-fee rules on the office whiteboard. Kemi photographs them and sends them to Ada: "Make the tracker do exactly this." Turning words into conditions is most of programming.',
  minutes: 12,
  outcomes: [
    'Turn written rules into if/elif/else',
    'Check rules in the right order',
    'Keep rule numbers in named constants',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The whiteboard',
      html: '<p>The group\'s rules, as Kemi photographed them:</p><ol><li>Pay by the 25th: no fee.</li><li>Pay from the 26th to the 28th: 5% of the share (₦1,500).</li><li>Pay after the 28th: 10% of the share (₦3,000).</li><li>Anyone on approved leave pays no fee, whatever the day.</li></ol><p>Translating them:</p><ul><li><strong>Rule 4 overrides the rest</strong>, so it goes first: <code>if on_leave:</code>.</li><li>Then the days, earliest first: <code>elif day <= 25:</code> then <code>elif day <= 28:</code>, then <code>else:</code> for everything later.</li><li>Each number gets a name: <code>PAY_DAY = 25</code>, <code>GRACE_END = 28</code>, <code>LATE_PERCENT = 5</code>, <code>VERY_LATE_PERCENT = 10</code>. If the group changes a rule, it\'s one line.</li></ul><p>A good test: read the code back in plain English. If it doesn\'t say what the whiteboard says, it\'s wrong, even if it runs.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The whiteboard, in code',
      caption: 'Try day 24, 27 and 30, then on_leave = True.',
      code: 'SHARE = 30000\nPAY_DAY = 25\nGRACE_END = 28\non_leave = False\nday = 27\n\nif on_leave:\n    fee = 0\nelif day <= PAY_DAY:\n    fee = 0\nelif day <= GRACE_END:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\n\nprint(f"Fee: {fee}")\n',
      challenge: 'Rule 5 arrives: members paying for the first month never pay a fee. Add it.',
    },
  ],
  apply: {
    scenario: 'The whiteboard rules.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the on_leave check go first?',
        options: [
          { text: 'Alphabetical order', why: 'Order of importance, not the alphabet.' },
          { text: 'It overrides the day rules, so it must be checked before them' },
          { text: 'It doesn\'t matter', why: 'If the day rules come first, someone on leave gets charged.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the fee for day = 30 with the whiteboard rules, and print Fee: 3000',
        starter: 'SHARE = 30000\nday = 30\non_leave = False\n',
        solution: 'SHARE = 30000\nday = 30\non_leave = False\nif on_leave:\n    fee = 0\nelif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        hint: 'on_leave first, then <= 25, then <= 28, then else.',
        checks: [
          { message: 'Print Fee: 3000', outputEquals: 'Fee: 3000' },
          { message: 'Store the fee', expr: 'fee == 3000' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What fee? (not on leave)',
        groups: ['No fee', '₦1,500', '₦3,000'],
        items: [
          { text: 'Paid on the 25th', group: 0 },
          { text: 'Paid on the 26th', group: 1 },
          { text: 'Paid on the 28th', group: 1 },
          { text: 'Paid on the 29th', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Someone on leave pays on the 27th and gets charged ₦1,500. Which line is in the wrong place?',
        language: 'python',
        lines: ['if day <= 25:', '    fee = 0', 'elif day <= 28:', '    fee = 1500', 'elif on_leave:', '    fee = 0', 'else:', '    fee = 3000'],
        bug: 4,
        fix: 'Move the on_leave check to the top: if on_leave:',
        explanation: 'For the 27th, elif day <= 28 wins before on_leave is ever checked. The rule that overrides the others has to come first.',
      },
      {
        kind: 'writeCode',
        prompt: 'Someone on leave pays on the 27th. Print Fee: 0',
        starter: 'SHARE = 30000\nday = 27\non_leave = True\n',
        solution: 'SHARE = 30000\nday = 27\non_leave = True\nif on_leave:\n    fee = 0\nelif day <= 25:\n    fee = 0\nelif day <= 28:\n    fee = SHARE * 5 // 100\nelse:\n    fee = SHARE * 10 // 100\nprint(f"Fee: {fee}")\n',
        hint: 'Leave is checked first.',
        checks: [{ message: 'Print Fee: 0', outputEquals: 'Fee: 0' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the whiteboard rule to its code.',
        pairs: [
          ['On approved leave', 'if on_leave:'],
          ['By the 25th', 'elif day <= 25:'],
          ['26th to 28th', 'elif day <= 28:'],
          ['After the 28th', 'else:'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The grace-period fee.',
        language: 'python',
        template: 'elif day <= GRACE_END:\n    fee = SHARE * [[1]] // 100',
        blanks: [['5', 'LATE_PERCENT']],
        distractors: ['10', '0.05'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best test that the code matches the whiteboard?',
        options: [
          { text: 'It runs, so it\'s right', why: 'Wrong rules run perfectly well.' },
          { text: 'Ask Tunde', why: 'He might prefer the bug.' },
          { text: 'Read the code back in plain English and try a day from each rule' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Kemi wants me to "make the tracker do exactly this". What\'s the hardest part?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Not the code: the rules. Deciding which rule wins when two apply. Ask the group when the whiteboard doesn\'t say.' },
          { text: 'Typing the ifs.', why: 'The ifs are easy once the rules are clear.' },
          { text: 'Nothing, it\'s obvious.', why: 'Rule order isn\'t always obvious.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is 10% of 30000 in whole naira, with SHARE * 10 // 100?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rules written in words often leave gaps ("what about someone on leave who pays on the 30th?"). What rule in your life has a gap like that?',
    starters: ['The rule says...', 'It doesn\'t say what happens when...'],
  },
  deepen: {
    title: 'Edge cases',
    summary: 'Days 25, 28 and 29 are where rules change. Programmers call them edge cases, and they\'re where bugs live. Lesson 18 tests every one.',
  },
  notes: 'Whiteboard rules are a story decision by the ajo group. 30000 * 5 // 100 = 1500; 30000 * 10 // 100 = 3000.',
};

export default lesson;

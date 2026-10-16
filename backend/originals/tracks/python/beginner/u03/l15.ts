import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14: +=, percentages, formatting, averages. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: the late-fee month',
  summary: 'The first month of the late-fee rule. Two people pay late, the tracker adds 5% to each, and the summary reads ₦333,000 collected. Quick check before the payout calculator.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep running totals, percentages and averages', 'Format money for people to read'],
  learn: [
    {
      kind: 'story',
      title: 'The 28th',
      beats: [
        { speaker: 'narrator', text: 'Tunde and one other member pay on the 27th, two days late. The tracker adds ₦1,500 to each.' },
        { speaker: 'narrator', text: 'Ada\'s summary: "Collected: ₦333,000. Late fees: ₦3,000." Tunde pays the fee, grumbling, and is on time the next month.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: running totals, fees and formats.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Start collected_kobo at 0 and add three shares of 3000000 with +=. Print the total',
        starter: '',
        solution: 'collected_kobo = 0\ncollected_kobo += 3000000\ncollected_kobo += 3000000\ncollected_kobo += 3000000\nprint(collected_kobo)\n',
        hint: 'collected_kobo = 0, then += three times.',
        checks: [
          { message: 'Print 9000000', outputEquals: '9000000' },
          { message: 'Use +=', codeIncludes: '+=' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(f"{333000:,}")',
        language: 'python',
        options: [
          { text: '333,000' },
          { text: '333000', why: ':, adds commas.' },
          { text: '333.000', why: 'Python uses commas, not dots, for thousands.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Work out a 5% late fee on 3000000 kobo, and print it in naira',
        starter: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\n',
        solution: 'SHARE_KOBO = 3000000\nLATE_FEE_PERCENT = 5\nfee_kobo = SHARE_KOBO * LATE_FEE_PERCENT // 100\nprint(fee_kobo // 100)\n',
        hint: 'Fee in kobo, then // 100 for naira.',
        checks: [{ message: 'Print 1500', outputEquals: '1500' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the output.',
        pairs: [
          ['f"{1500:,}"', '1,500'],
          ['f"{1500:,.2f}"', '1,500.00'],
          ['f"{1500 / 4:.1f}"', '375.0'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line wipes out the running total?',
        language: 'python',
        lines: ['late_fees = 0', 'late_fees += 1500', 'late_fees = 1500', 'print(late_fees)'],
        bug: 2,
        fix: 'late_fees += 1500',
        explanation: '= replaces the total. += adds to it.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print the average of two late payments, 2 and 2 days late',
        starter: 'a = 2\nb = 2\n',
        solution: 'a = 2\nb = 2\nprint((a + b) / 2)\n',
        hint: '(a + b) / 2',
        checks: [{ message: 'Print 2.0', outputEquals: '2.0' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which operator?',
        groups: ['+=', '-=', '*='],
        items: [
          { text: 'A payment comes in', group: 0 },
          { text: 'The bank takes its fee', group: 1 },
          { text: 'The share doubles', group: 2 },
          { text: 'A late fee is added', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Show the collected total as ₦333,000.',
        language: 'python',
        template: 'print(f"₦{collected_kobo // 100[[1]]}")',
        blanks: [[':,']],
        distractors: [':.2', ','],
      },
      {
        kind: 'mcq',
        prompt: 'Days late: 1, 1, 1, 13. The average is 4.0. What\'s the honest summary?',
        options: [
          { text: 'Everyone was about 4 days late.', why: 'Nobody was 4 days late.' },
          { text: 'Nobody was late.', why: 'All four were late.' },
          { text: 'Most were 1 day late; one was 13. The average alone hides that.' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'How would you add 10% to the share if the group raises the late fee?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Rewrite the formula.', why: 'The constant makes it a one-line change.' },
          { text: 'Multiply by 10.', why: 'That\'s ten times the share, not 10%.' },
          { text: 'Change LATE_FEE_PERCENT to 10. The formula already uses it.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the late-fee program.',
        language: 'python',
        lines: ['SHARE_KOBO = 3000000', 'LATE_FEE_PERCENT = 5', 'fee_kobo = SHARE_KOBO * LATE_FEE_PERCENT // 100', 'owed_kobo = SHARE_KOBO + fee_kobo', 'print(f"₦{owed_kobo // 100:,}")'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'x = 100, then x -= 30. What is x?',
        answers: ['70'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Tunde was on time the month after paying a late fee. Why do small, clear rules change behaviour?',
    starters: ['Small rules work because...', 'I changed when...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 11-14. Collected 11 x 30000 + 2 x 1500 = 333000. 3000000 * 5 // 100 = 150000 kobo = 1500 naira; 1500 / 4 = 375.0.',
};

export default lesson;

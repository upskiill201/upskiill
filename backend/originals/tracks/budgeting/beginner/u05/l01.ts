import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story with a choice: month 3, the drift. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Month 3',
  summary: 'No crisis. No GH₵63. Money in the bank. And for the first time, Kofi skips his Sunday check. By the next Sunday, the plan has quietly drifted. What does he do?',
  minutes: 11,
  outcomes: [
    'Notice how budgets fade when there\'s no panic',
    'Get back on track after a drift',
    'Choose a habit over willpower',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Drift',
      beats: [
        { speaker: 'narrator', text: 'Month 3, first Sunday. Kofi has GH₵350 saved, a working phone and a full fridge shelf. He\'s tired from a match. He skips the Sunday check. "I know where everything is anyway."' },
        { speaker: 'narrator', text: 'Second Sunday. He opens the sheet. Food out: GH₵70 over. Fun: GH₵25 over. A GH₵40 "small things" line he doesn\'t remember.' },
        { speaker: 'kofi', text: 'How? I wasn\'t even stressed. Nothing happened.' },
        { speaker: 'miracle', text: 'That\'s exactly how. When money\'s tight, you\'re watching. When it\'s fine, you stop. My second-year budget died in a good month, not a bad one.' },
        { speaker: 'tey', text: 'This is the real test of a budget: not surviving a crisis, but keeping going when nothing is pushing you. What now?' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          { text: 'Do the check now, rebalance the GH₵135, and set a fixed time for the check every week.', outcome: 'Yes. Ten minutes tonight fixes the drift; a fixed time makes the habit stop depending on how he feels. He picks Sunday at 8 p.m., after dinner in the hall kitchen.', best: true },
          { text: 'Promise to "be more disciplined".', outcome: 'He promised himself that in month 1. Willpower fades when things feel fine. Habits don\'t need it.' },
          { text: 'Take the GH₵135 from savings and carry on.', outcome: 'It fixes the number and teaches him that drifting is free. Next month the drift is bigger.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Budgets rarely die in a crisis. They die in a good month, when the checking stops. A fixed weekly time keeps them alive.',
    },
  ],
  apply: {
    scenario: 'The drift.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Food out GH₵70 over, fun GH₵25 over, small things GH₵40. Total drift?',
        answers: ['135', 'GH₵135', '135 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did the drift happen in a good month?',
        options: [
          { text: 'Because prices rose', why: 'Nothing changed except the checking.' },
          { text: 'Because without stress, he stopped checking' },
          { text: 'Because the plan was bad', why: 'The plan worked in month 2. The checking stopped.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Habit or willpower?',
        groups: ['Habit', 'Willpower'],
        items: [
          { text: 'Sunday 8 p.m. check, every week', group: 0 },
          { text: '"I\'ll be more disciplined"', group: 1 },
          { text: 'A phone reminder for the check', group: 0 },
          { text: '"I\'ll just try harder"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I know where everything is. Do I really need to check every week?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'No, you\'re a pro now.', why: 'That\'s what she thought in her second year. The drift proves otherwise.' },
          { text: 'You thought you knew last Sunday too. GH₵135 says otherwise. Ten minutes a week is cheap.' },
          { text: 'Check every day instead.', why: 'Daily checks wear people out. Weekly is enough.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s warning.',
        template: 'Budgets rarely die in a [[1]]. They die in a [[2]] month.',
        blanks: [['crisis'], ['good']],
        distractors: ['bad', 'loan'],
      },
      {
        kind: 'findBug',
        prompt: 'Which fix will make the drift worse next month?',
        lines: [
          'Do the check tonight.',
          'Rebalance the GH₵135 from flexible lines.',
          'Cover it from savings so nothing has to change.',
          'Set Sunday 8 p.m. as check time.',
        ],
        bug: 2,
        fix: 'Rebalance from flexible lines only.',
        explanation: 'Paying for drift from savings makes drifting feel free.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the month to what pushed Kofi.',
        pairs: [
          ['Month 1', 'No plan at all'],
          ['Month 2', 'Fear of GH₵63 again'],
          ['Month 3', 'Nothing: needs a habit'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why a fixed time like Sunday 8 p.m.?',
        options: [
          { text: 'So the check happens whether he feels like it or not' },
          { text: 'Because banks update on Sundays', why: 'Nothing to do with banks. It\'s about routine.' },
          { text: 'Because Mum calls then', why: 'Not the reason; any fixed time works.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s recovery from the drift.',
        lines: ['Notice the drift', 'Do the check now', 'Rebalance from flexible lines', 'Fix a weekly time'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the real test of a budget?',
        options: [
          { text: 'Surviving a crisis', why: 'That\'s the easier test: crises keep you watching.' },
          { text: 'Keeping it going when nothing is pushing you' },
          { text: 'Saving 20%', why: 'A nice result, but not the test.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When have you stopped a good habit because things were going well? What fixed time could you give your money check?',
    starters: ['I stopped... when...', 'My money check time will be...'],
  },
  deepen: {
    title: 'Habits beat motivation',
    summary: 'Habits form when the same action happens in the same situation again and again. Linking your money check to something you already do every week (Sunday dinner, a weekly call home) makes it far more likely to stick than relying on remembering.',
  },
  notes: 'Fictional month 3: savings 350 at start (260 + 90 of the 140 leftover; 50 to bus fund). Drift 70 + 25 + 40 = 135. Habit formation: Lally et al. (2010); context-dependent repetition (Wood & Neal 2007), stated generally.',
};

export default lesson;

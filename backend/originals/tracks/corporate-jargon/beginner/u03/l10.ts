import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 plus earlier. Story beat: the budget meeting. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the budget meeting',
  summary: 'Thursday, 11 a.m. The CFO\'s team reviews the courier budget. Remi is there to answer one question about the KPIs. The other forty minutes are money words.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode numbers, money, title and business-model words in a real meeting', 'Explain a money sentence in plain words'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 11:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Finance\'s meeting room. Wanjiku, two people from the CFO\'s team, Emeka on the screen, and Remi, holding his KPI slide like a shield.' },
        { speaker: 'wanjiku', text: 'Headline: revenue is up 8% YoY, but courier costs are 20% over budget, so the delivery P&L is in the red this quarter. Thin margins. The question is ROI on the new courier.' },
        { speaker: 'emeka', text: 'And our OKR says 85% on-time by Q4. Financial Q4, before anyone asks.' },
        { speaker: 'narrator', text: 'Everyone turns to Remi. "You built the KPI slide. What does on-time delivery look like now?"' },
        { speaker: 'tey', text: "Three weeks ago, that paragraph would have been noise. Now? Let's see." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2. The courier budget review.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Revenue is up 8% YoY, but courier costs are 20% over budget." What\'s the real story?',
        options: [
          { text: 'Everything is going great', why: 'Revenue is up, but costs are growing faster than planned.' },
          { text: 'More money is coming in, but courier spending is well above the plan' },
          { text: 'Revenue fell 8%', why: 'Revenue went UP 8% compared with last year.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode Wanjiku\'s headline.',
        pairs: [
          ['Over budget', 'Spent more than planned'],
          ['P&L', 'Profit and loss'],
          ['In the red', 'Losing money'],
          ['Thin margins', 'Little profit on each sale'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'Remi, you built the KPI slide. Where is on-time delivery now?',
        prompt: 'Best answer?',
        options: [
          { text: 'It\'s really impactful and moving the needle.', why: 'She asked for a number.' },
          { text: '71% last quarter, against a 90% target. The courier test route is at 84% so far.' },
          { text: 'I\'d have to check.', why: 'He built the slide. He knows.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Emeka says "Financial Q4". Synergix\'s year runs July to June. Which months?',
        options: [
          { text: 'October to December', why: 'That\'s calendar Q4.' },
          { text: 'January to March', why: 'That\'s Synergix\'s Q3.' },
          { text: 'April to June' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'ROI = return on ... (one word)',
        answers: ['investment'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Who would you go to?',
        groups: ['CFO\'s team', 'CTO\'s team', 'HR'],
        items: [
          { text: 'The courier budget', group: 0 },
          { text: 'Invoice system access', group: 1 },
          { text: 'A question about your leave days', group: 2 },
          { text: 'Whether we\'re in the red', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s meeting notes. Which line is wrong?',
        lines: [
          'Revenue up 8% YoY.',
          'Courier costs 20% over budget.',
          'So profit must be up too.',
        ],
        bug: 2,
        fix: 'So the delivery P&L is in the red this quarter.',
        explanation: 'Costs grew faster than revenue, so profit went down.',
      },
      {
        kind: 'mcq',
        prompt: 'Someone calls Synergix "a B2B business". What does that mean?',
        options: [
          { text: 'It sells mainly to other businesses' },
          { text: 'It\'s based in two buildings', why: 'B2B = business to business.' },
          { text: 'It only sells software', why: 'That would be SaaS.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['EOD', 'End of day'],
          ['CC', 'Copy, visible to all'],
          ['TBC', 'To be confirmed'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi explains the meeting to Zanele in plain words.',
        template: 'We\'re earning [[1]] than last year, but spending too much on [[2]], so the delivery team is [[3]] money.',
        blanks: [['more'], ['couriers'], ['losing']],
        distractors: ['less', 'making'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Wanjiku\'s money story in order.',
        lines: ['Revenue went up.', 'Courier costs went up faster.', 'So profit went down.', 'So: was the new courier worth it? (ROI)'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s plain-words headline.',
        tiles: ['Sales', 'are', 'up,', 'but', 'couriers', 'cost', 'too', 'much.'],
        distractors: ['synergy', 'KPI'],
      },
    ],
  },
  reflect: {
    prompt: 'Which money or numbers word from this chapter would help you most in your own life: budget, margin, ROI, in the red? Write one real sentence using it.',
    starters: ['The word is...', 'My sentence: ...'],
  },
  deepen: {
    title: 'Your personal P&L',
    summary: 'For one month, write your own simple P&L: money in, money out, what\'s left. Are you in the red or the black? (General budgeting practice, not financial advice.)',
  },
  notes: 'Review of lessons 6–9 plus Chapters 1–2. General money vocabulary only; the Deepen is a general budgeting habit, not financial advice. Figures fictional.',
};

export default lesson;

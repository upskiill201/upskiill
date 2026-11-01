import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: two answers by Friday. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: two answers by Friday',
  summary: 'Zanele sends both rewritten emails on Wednesday morning. By Thursday lunchtime she has both answers. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write requests that get answered quickly', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'Wednesday to Thursday',
      html: '<p><strong>To Mr Kamau</strong>. Subject: <em>Decision needed by Friday: keep the Saturday pilot in June?</em> The ask in line one, why, cost, next step, and a one-line table of results.</p><p><strong>Reply, Wednesday 7:40 a.m.:</strong> <em>"Yes to June and both contracts. Good work."</em></p><p><strong>To Emeka</strong>. Subject: <em>Question: can Lagos share weekend order counts by Thursday?</em> One ask, a template attached, the reason ("to see if a Lagos pilot is worth it").</p><p><strong>Reply, Wednesday 11 a.m.:</strong> the template, filled in. Lagos has 140 weekend orders a month held until Monday.</p><p>Two answers, a day early.</p>',
    },
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'achieng', text: 'He replied before 8 a.m. That only happens when he can say yes from his phone.' },
        { speaker: 'zanele', text: 'Now he wants a full pilot report for the board. Twelve pages, Brian says.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: I need them to, BLUF, subject lines, easy replies, one ask. Next: documents people skim.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: two answers.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Mr Kamau reply?',
        options: [
          { text: '"?"', why: 'That was Chapter 1.' },
          { text: '"Yes to June and both contracts. Good work."' },
          { text: '"Let\'s discuss next month."', why: 'He said yes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Lagos weekend orders a month are held until Monday?',
        answers: ['140'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the email to what made it easy.',
        pairs: [
          ['To Mr Kamau', 'Yes/no decision in the subject'],
          ['To Emeka', 'A template attached'],
          ['Both', 'The ask in line one'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 skill is this?',
        groups: ['BLUF', 'Easy to reply'],
        items: [
          { text: 'Ask, why, cost, next', group: 0 },
          { text: 'A template with exact columns', group: 1 },
          { text: 'Bottom line first', group: 0 },
          { text: 'A yes/no question', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should I thank them both?',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'No, they\'re busy.', why: 'One line of thanks is welcome.' },
          { text: 'Send a long thank-you letter.', why: 'One line.' },
          { text: 'A short thanks to each, and say what happens next. Closing the loop builds trust for the next ask.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 in one line.',
        template: 'Ask [[1]], make replying [[2]].',
        blanks: [['first'], ['easy']],
        distractors: ['last', 'optional'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Mr Kamau reply? (e.g. 7:40)',
        answers: ['7:40', '7.40', '740', '7:40 am', '7:40 a.m.'],
        placeholder: 'A time',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the email to Emeka would have slowed his reply?',
        lines: [
          'Could you share weekend order counts by Thursday?',
          'Template attached: just fill in columns B and C.',
          'Also, could you review our whole delivery strategy?',
          'It\'s to see if a Lagos pilot is worth it.',
        ],
        bug: 2,
        fix: 'Delete it; ask separately if needed.',
        explanation: 'A big second ask buries the quick one.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Mr Kamau reply so early?',
        options: [
          { text: 'He had nothing else to do', why: 'He\'s very busy.' },
          { text: 'He could decide from his phone in seconds' },
          { text: 'Luck', why: 'The email made it easy.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Zanele\'s Wednesday.',
        lines: ['Send both emails', 'Kamau replies at 7:40', 'Emeka replies at 11', 'Thank them both', 'Plan the board report'],
      },
    ],
  },
  reflect: {
    prompt: 'Send one request this week using everything from Chapter 3. How fast was the reply?',
    starters: ['I asked...', 'The reply came...'],
  },
  deepen: {
    title: 'Speed as a signal',
    summary: 'Fast replies are a good sign you made the ask easy. If replies are slow or confused, check the subject, the first line and the effort you left for the reader.',
  },
  notes: 'Chapter 3 challenge (fictional): Kamau approves June and two contracts (7:40 a.m.); Lagos holds 140 weekend orders/month until Monday.',
};

export default lesson;

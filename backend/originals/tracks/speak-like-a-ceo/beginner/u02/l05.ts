import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: leaders',
  summary: 'The four questions, recommending not reporting, and disagreeing upward. A quick check before Lucía learns to speak up when nobody asks her.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Bring a recommendation', 'Disagree respectfully'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'lucia', text: 'I asked Carmen before the meeting. She listened. Mango-chili moves to spring.' },
        { speaker: 'carmen', text: 'Because you came with a fact and a plan, not a complaint.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: leaders.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a recommendation.',
        lines: ['What to do', 'Why', 'Risk and plan', 'What else we considered', 'The ask'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Carmen say made the difference?',
        options: [
          { text: 'A fact and a plan, not a complaint' },
          { text: 'Lucía being loud', why: 'A fact and a plan.' },
          { text: 'Luck', why: 'A fact and a plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Recommendation or report?',
        groups: ['Recommendation', 'Report'],
        items: [
          { text: '"I recommend spring for mango-chili."', group: 0 },
          { text: '"Week three had a stock issue."', group: 1 },
          { text: '"Can I have a yes today?"', group: 0 },
          { text: '"Sales went up, then up again."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions are on Carmen\'s list?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I think Carmen\'s new email plan is wrong, but she\'s the boss.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Ask her for five minutes. Start with the shared goal, give one fact, and offer an alternative. Then accept her call.' },
          { text: 'Say nothing, she\'s the boss.', why: 'Raise it respectfully.' },
          { text: 'Tell everyone else it\'s wrong.', why: 'Tell Carmen, with a fact.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The pyramid.',
        template: 'The [[1]] first, then the reasons, then [[2]] on request.',
        blanks: [['answer'], ['detail']],
        distractors: ['history', 'jokes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the answer type.',
        pairs: [
          ['What do you want?', 'A decision or approval'],
          ['What\'s the risk?', 'The main risk and plan'],
          ['What else?', 'Options you rejected'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s plan to disagree is the mistake?',
        lines: [
          'Ask Carmen for five minutes first.',
          'Start with the shared goal.',
          'Bring up all twelve things I dislike about her plans.',
          'Offer an alternative.',
        ],
        bug: 2,
        fix: 'One concern, one fact.',
        explanation: 'Twelve complaints sound like a grudge.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "disagree and commit" mean?',
        options: [
          { text: 'Argue your case before the decision, then back it fully' },
          { text: 'Never disagree', why: 'Disagree first.' },
          { text: 'Keep arguing after', why: 'Commit after.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When will mango-chili launch now? (a season)',
        answers: ['spring', 'Spring'],
        placeholder: 'A season',
      },
    ],
  },
  reflect: {
    prompt: 'Which is harder for you: bringing a recommendation, or disagreeing upward?',
    starters: ['Harder for me is...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4.',
};

export default lesson;

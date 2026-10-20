import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the preparation',
  summary: 'Three questions, five steps, positions vs interests, and an honest BATNA. Quick check before Ada works out a fair number and looks at things from Mr Adeyemi\'s side.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Prepare goal, walk-away and BATNA', 'Tell positions from interests'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'ada', text: 'Goal ₦1,300,000. Walk-away ₦1,450,000. Alternative: the flat near work.' },
        { speaker: 'lucia', text: 'Good. Now prove the ₦1,300,000 is fair, and think about what he needs.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the preparation.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Goal', 'What you aim for'],
          ['Walk-away', 'The worst you\'ll accept'],
          ['BATNA', 'What you\'ll do with no deal'],
          ['Interest', 'Why someone wants something'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Position or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"I want ₦600,000 a month."', group: 0 },
          { text: 'Wanting to feel valued', group: 1 },
          { text: '"No less than ₦1,500,000."', group: 0 },
          { text: 'Avoiding an empty flat', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Another option: ₦1,200,000 a year for 2 years, plus ₦300,000 to move. Total, in naira?',
        answers: ['2700000', '2,700,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'And so what walk-away per year does that option give?',
        options: [
          { text: '₦1,350,000' },
          { text: '₦1,200,000', why: 'That ignores the moving costs.' },
          { text: '₦1,500,000', why: '₦2,700,000 ÷ 2 is ₦1,350,000.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'ll decide my walk-away in the room, when I see his face.',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'In the room, you\'ll move it to please him. Decide it now, from your BATNA, and write it down.' },
          { text: 'Good idea.', why: 'Pressure moves walk-aways.' },
          { text: 'Don\'t have one.', why: 'Then any deal looks acceptable.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The five steps.',
        template: 'Goal, reasons, [[1]], walk-away, their [[2]].',
        blanks: [['alternative', 'BATNA'], ['side']],
        distractors: ['threat', 'mood'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this preparation is wrong?',
        lines: [
          'Goal: ₦1,300,000.',
          'BATNA: the flat near work.',
          'Walk-away: ₦1,000,000.',
          'His interest: no empty months.',
        ],
        bug: 2,
        fix: 'Walk-away: about ₦1,450,000.',
        explanation: 'A walk-away below the goal makes no sense; it\'s the worst she\'d accept.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five-part preparation.',
        lines: ['Your goal', 'Your reasons', 'Your alternative', 'Your walk-away', 'Their side'],
      },
      {
        kind: 'mcq',
        prompt: 'Which question best finds an interest?',
        options: [
          { text: '"What worries you most about this?"' },
          { text: '"Will you accept my number?"', why: 'That\'s about positions.' },
          { text: '"Final offer?"', why: 'That closes, not explores.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What word does the A in BATNA stand for?',
        answers: ['alternative', 'Alternative'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Write your goal, walk-away and BATNA for something you\'ll negotiate soon.',
    starters: ['Goal:...', 'BATNA:...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. 1,200,000 × 2 + 300,000 = 2,700,000 → 1,350,000/yr.',
};

export default lesson;

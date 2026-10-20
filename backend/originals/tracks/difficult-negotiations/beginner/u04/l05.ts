import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: your power',
  summary: 'Sources of power, a stronger BATNA, a walk-away that comes from it, and testing their alternatives. Quick check before Arjun decides whether to walk.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Build and number a BATNA', 'Estimate the other side\'s alternatives'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday',
      beats: [
        { speaker: 'arjun', text: 'Kinwell\'s offer is in writing. Two proposals are out. I feel different.' },
        { speaker: 'grace', text: 'You sound different too. Calmer.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: your power.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the source of power to an example.',
        pairs: [
          ['Alternatives', 'Kinwell\'s written offer'],
          ['Their need', 'App needed before spring'],
          ['Information', 'What the other quotes include'],
          ['Time', 'Spring is closer for them'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An alternative pays £20,000 with £8,000 costs. What\'s it worth to you, in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'A deal costs you £30,000 to deliver. To beat a £12,000 alternative, what\'s the walk-away, in pounds?',
        answers: ['42000', '42,000', '£42,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best fix for feeling powerless?',
        options: [
          { text: 'Actually improve your alternative' },
          { text: 'Act tough on the call', why: 'Acting isn\'t power.' },
          { text: 'Accept quickly', why: 'Check your alternative first.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'They say "other agencies are cheaper". What do I ask?',
        prompt: "Arjun's best reply?",
        options: [
          { text: '"Happy to compare like for like. Do they include till integration and launch in 12 weeks?"' },
          { text: '"Prove it."', why: 'Ask, don\'t demand.' },
          { text: '"Then go with them."', why: 'Test the claim first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real BATNA or just a hope?',
        groups: ['Real', 'Hope'],
        items: [
          { text: 'A signed offer from another client', group: 0 },
          { text: '"I\'ll find something"', group: 1 },
          { text: 'A job offer in writing', group: 0 },
          { text: '"They\'ll come round"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Comparing BATNAs.',
        template: 'Compare what you [[1]], not the [[2]] number.',
        blanks: [['keep'], ['headline']],
        distractors: ['spend', 'secret'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this BATNA working is wrong?',
        lines: [
          'Alternative: £18,000 revenue.',
          'Its costs: £6,000.',
          'Delivery cost of the main deal: £25,000.',
          'Walk-away: £25,000, just cover costs.',
        ],
        bug: 3,
        fix: 'Walk-away: £37,000, to beat the alternative.',
        explanation: 'The walk-away must beat what he\'d keep elsewhere.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might a cheaper competitor not be cheaper for Harlow & Finch?',
        options: [
          { text: 'If they miss spring, the lost season can cost more than the saving' },
          { text: 'Competitors are always more expensive', why: 'They might be cheaper on paper.' },
          { text: 'It always is cheaper', why: 'Delay has a cost.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to prepare your power.',
        lines: ['List alternatives', 'Make the best one real', 'Number it', 'Set the walk-away', 'Estimate their alternatives'],
      },
    ],
  },
  reflect: {
    prompt: 'Put a number on your BATNA for something you\'re negotiating. What walk-away does it give you?',
    starters: ['My BATNA is worth...', 'So my walk-away is...'],
  },
  notes: 'Checkpoint for Chapter 4 lessons 1-4. 20,000 − 8,000 = 12,000; 30,000 + 12,000 = 42,000.',
};

export default lesson;

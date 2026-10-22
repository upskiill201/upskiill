import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Chat: hands, posture and power poses. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Hands, posture and power poses',
  summary: 'Tomás tells Lucía to stand like a superhero for two minutes before the talk. She asks Tey whether it works.',
  minutes: 11,
  outcomes: [
    'Know what research says about power posing',
    'Use simple, natural hands and posture',
    'Focus on what actually helps',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Power posing became famous around 2010. A large replication by Ranehill and colleagues in 2015, with about 200 people, didn\'t find the hormone or risk-taking effects.', replies: ['So it does nothing?'] },
        { tey: 'People in that study did report feeling a bit more powerful. If it helps you feel ready, fine. Just don\'t count on it to change your body chemistry.', replies: ['What about my hands while I talk?'] },
        { tey: 'Let them move naturally when you gesture, and rest at your sides or lightly together when you don\'t. Avoid pens, clickers you fidget with, and pockets.', replies: ['And standing?'] },
        { tey: 'Feet about hip-width apart, weight even, still while you make a point. Move only when you change part: walk on the signpost, stand still on the message.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Power poses may help you feel ready but the big claims didn\'t replicate. Natural hands, steady feet, move on signposts.',
    },
  ],
  apply: {
    scenario: 'Hands and posture.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Ranehill et al. (2015) find?',
        options: [
          { text: 'Power poses double confidence hormones', why: 'That didn\'t replicate.' },
          { text: 'No hormone or risk-taking effects, though people felt a bit more powerful' },
          { text: 'Power poses make people nervous', why: 'They felt a bit more powerful.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many people were in the replication study?',
        answers: ['200', 'two hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps or distracts?',
        groups: ['Helps', 'Distracts'],
        items: [
          { text: 'Hands moving naturally with a point', group: 0 },
          { text: 'Clicking a pen', group: 1 },
          { text: 'Standing still on the message', group: 0 },
          { text: 'Pacing back and forth all talk', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the movement.',
        pairs: [
          ['Saying the message', 'Stand still'],
          ['A signpost', 'Walk to a new spot'],
          ['Not gesturing', 'Hands at rest'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'So power posing is fake? I\'ve been doing it for years.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'The big body-chemistry claims didn\'t hold up. If it helps you feel ready, keep it, but prepare your first line too.' },
          { text: 'It\'s magic, keep it up.', why: 'The big claims didn\'t replicate.' },
          { text: 'You\'ve wasted years.', why: 'Feeling ready still counts.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Movement.',
        template: 'Walk on the [[1]], stand still on the [[2]].',
        blanks: [['signpost'], ['message']],
        distractors: ['joke', 'chart'],
      },
      {
        kind: 'mcq',
        prompt: 'What should hands do when you\'re not gesturing?',
        options: [
          { text: 'Hide in pockets', why: 'Rest them openly.' },
          { text: 'Rest at your sides or lightly together' },
          { text: 'Hold a pen to click', why: 'That distracts.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s stage plan is the mistake?',
        lines: [
          'Feet hip-width apart.',
          'Hands natural when gesturing.',
          'Walk constantly to burn off nerves.',
          'Stand still on the message.',
        ],
        bug: 2,
        fix: 'Move only on signposts.',
        explanation: 'Constant walking pulls attention from the words.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the replication published?',
        answers: ['2015'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s movement in part 1.',
        lines: ['Stand still for the message', 'Signpost: walk left', 'Stand still for the story', 'Signpost: walk back to centre'],
      },
    ],
  },
  reflect: {
    prompt: 'Watch your last recording with the sound off. What are your hands doing?',
    starters: ['My hands...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Replication matters',
    summary: 'Some famous findings shrink when tested again with more people. That\'s science working. For speaking, the steadiest advice is the dullest: prepare, practise, record.',
  },
  notes: 'Ranehill, Dreber, Johannesson, Leiberg, Sul & Weber (2015), Psychological Science: n≈200; no effect on testosterone, cortisol or risk tolerance; increase in self-reported feelings of power. Hands/posture: common coaching advice.',
};

export default lesson;

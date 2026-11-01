import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 13 — talking about pay with a promotion. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Promotion and pay',
  summary: 'David asks: "When you get promoted, do you get more money automatically?" Clinton isn\'t sure. Tey explains how pay and promotions usually connect, and how to ask about it calmly.',
  minutes: 11,
  outcomes: ['Understand how pay often links to levels', 'Ask about the pay range for a level', 'Talk about pay calmly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'In many companies, each level has a pay range, sometimes called a band. A promotion usually moves you into the next band, but not always to the top of it. Did you know your level has a range?',
          replies: ['No', 'I guessed'],
        },
        {
          tey: 'It\'s fair to ask: "What\'s the pay range for Developer?" Some companies share bands openly; others don\'t. In some places, laws require pay ranges in job adverts. If they won\'t share, that\'s useful information too.',
          replies: ['Is a promotion always a raise?'],
        },
        {
          tey: 'Often, but not always. Some companies give a title first and adjust pay at the next review. That\'s why it\'s worth asking, before or at the promotion: "What would my pay be at the new level, and when would it change?"',
          replies: ['How do I ask without sounding greedy?'],
        },
        {
          tey: 'Calmly and factually, in a 1:1, after talking about the work. Asking how pay works isn\'t greedy; it\'s understanding your job. Then use the offer-stage skills: research, a reason, one clear ask.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Levels often have pay bands. Ask the range, and when pay changes with a promotion. Calm, factual, after the work talk.',
    },
  ],
  apply: {
    scenario: 'Clinton learns how pay and promotions connect.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a pay band?',
        options: [
          { text: 'A music group', why: 'Ha. A pay range for a level.' },
          { text: 'The pay range for a level' },
          { text: 'A bonus', why: 'A range for a level.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair pay question, or not appropriate?',
        groups: ['Fair', 'Not appropriate'],
        items: [
          { text: 'What\'s the pay range for Developer?', group: 0 },
          { text: 'How much does Paul earn?', group: 1 },
          { text: 'When would my pay change if promoted?', group: 0 },
          { text: 'Can you pay me more than Ngozi?', group: 1 },
          { text: 'How are pay reviews decided?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best question for Ngozi.',
        from: 'clinton',
        message: 'How do I ask about pay for the Developer level?',
        options: [
          { text: '"Show me everyone\'s salaries."', why: 'Ask about your own level.' },
          { text: 'Don\'t ask; hope.', why: 'Asking is fair.' },
          { text: '"If I move to Developer, what would my pay be in the new range, and when would it change?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misunderstanding.',
        lines: ['Levels often have pay ranges.', 'A promotion always means the top of the next band.', 'Pay can change at the next review.'],
        bug: 1,
        explanation: 'Usually you move into the band, not straight to the top.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the pay conversation in order.',
        lines: ['Talk about the work and the plan', 'Ask about the range for the level', 'Ask when pay would change', 'Use research and a reason if you ask for more'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Pay band', 'Range for a level'],
          ['Promotion', 'Move to a higher level'],
          ['Pay review', 'When pay is reconsidered'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Is asking how pay works greedy?',
        options: [
          { text: 'No: it\'s understanding your job' },
          { text: 'Yes, always', why: 'It\'s fair and normal.' },
          { text: 'Only for graduates', why: 'It\'s fair for everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Calm, [[1]], after the [[2]] talk.',
        blanks: [['factual'], ['work']],
        distractors: ['angry', 'gossip', 'lunch'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Another name for a pay range for a level is a pay ___. (one word)',
        answers: ['band', 'grade'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Check locally, or true in most places?',
        groups: ['Check locally', 'Most places'],
        items: [
          { text: 'Whether adverts must show pay ranges', group: 0 },
          { text: 'Calm, factual pay talks work better', group: 1 },
          { text: 'Pay transparency laws', group: 0 },
          { text: 'Research strengthens an ask', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do you know the pay range for your current or next role? How could you find out?',
    starters: ['I know / don\'t know...', 'I could find out by...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find out whether pay ranges are shared where you work, and whether your country has pay-transparency rules.',
  },
  notes: 'Pay bands and transparency practices vary by company and country (some jurisdictions require ranges in adverts). Kept general.',
};

export default lesson;

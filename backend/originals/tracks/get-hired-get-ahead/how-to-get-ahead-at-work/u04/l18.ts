import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 18 — Clinton's one-page career plan. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Clinton\'s one page',
  summary: 'Three months after Paul\'s question, Clinton\'s plan fits on one page. He prints it and pins it above his desk. Tap each line.',
  minutes: 11,
  outcomes: ['Recognise a strong one-page career plan', 'See how evidence shapes direction', 'Spot what makes a plan actionable'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s plan',
      text: 'Direction (2–3 years): help decide what we build for people like my mum\'s njangi and our drivers, probably in product.\nWhy: energy audit, Aïcha\'s feedback, my top value.\nSkills: user research; writing product specs.\nExperiences: Bafoussam workshop done; next, lead one small product decision.\nNext 3 months: two specs reviewed by Aïcha; talk to one engineer who moved into product.\nReview: first Saturday of every quarter.',
      hotspots: [
        { phrase: 'probably in product', note: '"Probably": honest uncertainty. The direction is clear; the exact title isn\'t fixed.' },
        { phrase: 'energy audit, Aïcha\'s feedback, my top value', note: 'The evidence behind the direction. Not a guess, not to impress.' },
        { phrase: 'user research; writing product specs', note: 'Two skills, not seventeen.' },
        { phrase: 'Bafoussam workshop done', note: 'Progress recorded. A plan that shows what\'s already happened feels real.' },
        { phrase: 'first Saturday of every quarter', note: 'An if-then trigger to keep it alive.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Direction, why, two skills, experiences, next three months, a review date. One page, pinned where you\'ll see it.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s one-page plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the plan in order.',
        lines: ['Direction', 'Why', 'Skills', 'Experiences', 'Next three months', 'Review date'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Clinton write "probably in product"?',
        options: [
          { text: 'He\'s unsure of everything', why: 'Direction is clear.' },
          { text: 'It\'s honest: the direction is clear, the title isn\'t fixed' },
          { text: 'No reason', why: 'It shows honest uncertainty.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the plan?',
        groups: ['Evidence (why)', 'Next three months'],
        items: [
          { text: 'Energy audit results', group: 0 },
          { text: 'Two specs reviewed by Aïcha', group: 1 },
          { text: 'Aïcha\'s feedback', group: 0 },
          { text: 'Talk to an engineer-turned-PM', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that doesn\'t belong in a good plan.',
        lines: ['Skills: user research; product specs.', 'Why: because it sounds impressive.', 'Review: first Saturday of every quarter.'],
        bug: 1,
        explanation: 'A reason to impress isn\'t evidence.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I pin my plan above my desk or keep it private?',
        options: [
          { text: 'Hide it forever.', why: 'Keep it visible to you.' },
          { text: 'Post it on every wall in the office.', why: 'Visible to you is enough.' },
          { text: 'Somewhere I\'ll see it often. Seeing it daily helps me choose well.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its purpose.',
        pairs: [
          ['Why', 'Grounds the direction in evidence'],
          ['Next three months', 'Turns it into action'],
          ['Review date', 'Keeps it alive'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s Clinton\'s next experience?',
        options: [
          { text: 'Lead one small product decision' },
          { text: 'Become a product manager tomorrow', why: 'One small decision first.' },
          { text: 'Nothing', why: 'Lead one small decision.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'One [[1]], pinned where you\'ll [[2]] it.',
        blanks: [['page'], ['see']],
        distractors: ['book', 'hide', 'lose'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many specs will Aïcha review in the next three months? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Actionable or not?',
        groups: ['Actionable', 'Not'],
        items: [
          { text: 'Two specs reviewed', group: 0 },
          { text: 'Be amazing', group: 1 },
          { text: 'One conversation with an engineer-turned-PM', group: 0 },
          { text: 'Find myself', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which line of Clinton\'s plan would be hardest for you to write about yourself? Why?',
    starters: ['The hardest line is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write the "why" line of your own plan: what evidence points you in your direction?',
  },
  notes: 'Ties together l01–l17.',
};

export default lesson;

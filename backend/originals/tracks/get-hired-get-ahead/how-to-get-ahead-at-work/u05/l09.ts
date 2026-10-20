import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 9 — reframing your profile for a new direction. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A headline for the new lane',
  summary: 'Clinton\'s LinkedIn headline still says what he wrote at university. Aïcha\'s panel will look. Miracle shows him how to update it for where he\'s heading, without pretending he\'s already there.',
  minutes: 11,
  outcomes: ['Update your profile for a new direction honestly', 'Lead with the bridge', 'Avoid claiming a title you don\'t have'],
  learn: [
    {
      kind: 'compare',
      title: 'Two headlines',
      before: { label: 'Stuck in the past', text: '"Developer at Njangi Pay | JavaScript | Built a savings tracker for my mum\'s njangi"\n\nTrue, but it only tells the developer story. Nothing hints at product.' },
      after: { label: 'Pointing forward, honestly', text: '"Developer at Njangi Pay | Offline payments for drivers on basic phones | User research and product specs for low-connectivity users"\n\nStill true. Still his current title. But it now shows the bridge: the work that points towards product.' },
      notes: [
        'Keep your real title. Never claim one you don\'t have.',
        'Add the skills and work that point to your new direction.',
        'Update the About section with your bridge story, briefly.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Real title, plus the bridge work. Point forward without pretending you\'ve arrived.',
    },
  ],
  apply: {
    scenario: 'Clinton updates his headline.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s missing from the old headline?',
        options: [
          { text: 'Any hint of the product work he\'s been doing' },
          { text: 'His real title', why: 'His title is there.' },
          { text: 'Nothing', why: 'It misses the bridge.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest forward-pointing, or overclaiming?',
        groups: ['Honest', 'Overclaiming'],
        items: [
          { text: 'User research for low-connectivity users', group: 0 },
          { text: 'Product Manager at Njangi Pay (not yet)', group: 1 },
          { text: 'Developer at Njangi Pay', group: 0 },
          { text: 'Head of Product (he isn\'t)', group: 1 },
          { text: 'Product specs for offline features', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the new headline in order.',
        lines: ['His real title', 'His core work', 'The product skills he\'s built'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the overclaim.',
        lines: ['Developer at Njangi Pay.', 'Senior Product Leader.', 'User research for drivers.'],
        bug: 1,
        explanation: 'He isn\'t one. Never claim a title you don\'t have.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best About-section line.',
        from: 'clinton',
        message: 'What should I add to my About section?',
        options: [
          { text: '"After a year building offline payments, I\'ve moved closer to users: research, specs, and deciding what we build next."' },
          { text: '"I\'m a product genius."', why: 'Show the bridge with facts.' },
          { text: 'Nothing.', why: 'Add the bridge story briefly.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each headline part to its purpose.',
        pairs: [
          ['Developer at Njangi Pay', 'His honest current title'],
          ['Offline payments for drivers', 'His core work'],
          ['User research and specs', 'Points towards product'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When can Clinton change his title on his profile?',
        options: [
          { text: 'When he actually has the new role' },
          { text: 'Now, to look ready', why: 'Only when it\'s true.' },
          { text: 'Never', why: 'When he has it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Real [[1]], plus the [[2]] work.',
        blanks: [['title'], ['bridge']],
        distractors: ['fake', 'old', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should you claim a job title you don\'t have yet? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Points to product, or only engineering?',
        groups: ['Points to product', 'Only engineering'],
        items: [
          { text: 'User research', group: 0 },
          { text: 'Refactored a module', group: 1 },
          { text: 'Product specs', group: 0 },
          { text: 'Upgraded a library', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you updated your profile headline for where you\'re heading, what bridge work would you add?',
    starters: ['My title:', 'Bridge work:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite your headline: real title, core work, and one skill that points where you\'re going.',
  },
  notes: 'Builds on How to Get Noticed, Ch5 (Be findable). Honesty rule: never claim a title you don\'t hold.',
};

export default lesson;

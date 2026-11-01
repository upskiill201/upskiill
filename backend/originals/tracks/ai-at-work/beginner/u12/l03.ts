import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 12 · Lesson 3 — free vs paid: what changes. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Free vs paid: what changes',
  summary: 'Tolu uses a free AI tool; Ada\'s team has a business plan. What actually changes when you pay? Not just "a smarter model".',
  minutes: 12,
  outcomes: [
    'Know what typically differs between free and paid plans',
    'Know why business plans matter for work data',
    'Decide when paying is worth it',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'A typical free plan vs a typical business plan',
      before: {
        label: 'Free plan (typical)',
        text: 'Usage limits that run out on busy days. Sometimes an older or smaller model. Chats may be used to improve the model unless you change settings. No admin controls. Fine for public, non-sensitive tasks.',
      },
      after: {
        label: 'Business plan (typical)',
        text: 'Higher limits and newer models. Business terms that usually limit training on your data. Admin controls: who has access, which features are on. Often approved by IT for work data.',
      },
      notes: [
        'Details vary a lot by tool: always read the actual terms.',
        'The biggest difference for work is often data terms, not cleverness.',
        'Pay when limits, data safety or admin control matter for your work.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Paying often buys higher limits, better models, safer data terms and admin control. For work data, the terms matter most.',
    },
  ],
  apply: {
    scenario: 'Tolu asks whether the paid plan is worth it.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'More typical of free, or business plans?',
        groups: ['Free', 'Business'],
        items: [
          { text: 'Usage limits that run out', group: 0 },
          { text: 'Admin controls', group: 1 },
          { text: 'Chats may train the model by default', group: 0 },
          { text: 'Terms limiting training on your data', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'For work, what\'s often the biggest difference in a business plan?',
        options: [
          { text: 'The colour scheme', why: 'Data terms.' },
          { text: 'The data terms and controls' },
          { text: 'Nothing', why: 'Often a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Why pay for AI when the free version is so good?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Free is always enough.', why: 'Not for work data.' },
          { text: 'Paid is always smarter.', why: 'Data terms matter more.' },
          { text: 'For public tasks, free can be fine. For work data, business plans usually have safer terms and controls. Check the actual terms.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'For work data, the [[1]] matter most. Always read the actual [[2]].',
        blanks: [['terms'], ['terms', 'contract']],
        distractors: ['colours', 'ads'],
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption is risky?',
        lines: [
          'Free plan: fine for public questions',
          'Business plan: check the data terms',
          'Paid means anything can go in, no rules',
          'Limits matter on busy days',
        ],
        bug: 2,
        fix: 'Paid plans still follow company data rules.',
        explanation: 'Paying doesn\'t remove your obligations.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to whether paying helps.',
        pairs: [
          ['Hitting limits daily', 'Higher limits'],
          ['Work data', 'Business data terms'],
          ['Managing a team\'s access', 'Admin controls'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which task is fine in a free tool?',
        options: [
          { text: 'Summarise this confidential client contract.', why: 'Needs approved tool.' },
          { text: 'Explain what a pivot table is.' },
          { text: 'Clean this list of customers\' phone numbers.', why: 'Personal data.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Read', 'the', 'actual', 'terms'],
        distractors: ['guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which kind of plan usually has admin controls? (one word)',
        answers: ['business', 'Business', 'paid', 'team', 'enterprise'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth paying for, or not needed?',
        groups: ['Worth paying', 'Not needed'],
        items: [
          { text: 'A team using AI on client work daily', group: 0 },
          { text: 'Someone asking one public question a month', group: 1 },
          { text: 'Work data needing safe terms', group: 0 },
          { text: 'Occasional public brainstorming', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s decision.',
        lines: ['List the tasks and data involved', 'Check free and paid terms', 'Ask IT', 'Decide'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "typical" about plans?',
        options: [
          { text: 'To sound unsure', why: 'Because they differ.' },
          { text: 'They\'re all identical', why: 'They differ.' },
          { text: 'Every tool\'s plans differ, so you must check each' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which plan does your team use? Do you know what its data terms say?',
    starters: ['We use...', 'The terms say...'],
  },
  deepen: { title: 'Try it today', summary: 'Find the data-use section of your AI tool\'s terms or help pages and read it.' },
  notes: 'Generalised comparison; actual features and terms vary by provider and change over time.',
};

export default lesson;

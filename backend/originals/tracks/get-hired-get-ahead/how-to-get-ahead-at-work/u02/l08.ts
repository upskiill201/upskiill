import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 8 — saying "not now" politely. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Saying "not now"',
  summary: 'A product manager from another team asks Clinton to build "a quick dashboard, just a few hours". It\'s not on the Q3 goals. Clinton has always said yes to everything. Here\'s how he says "not now" without burning a bridge.',
  minutes: 12,
  outcomes: ['Decline or delay a request politely', 'Offer an alternative', 'Involve your manager in priority clashes'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a good "not now"',
      steps: [
        { title: '1. Show you understand', body: '"That sounds useful for your team. I can see why you want it."' },
        { title: '2. Be honest about your priorities', body: '"I\'m focused on cutting failed confirmations this quarter, which is our team\'s main goal."' },
        { title: '3. Offer an alternative', body: '"I could show you the data source in 20 minutes so someone on your team can build it, or we could look at it next quarter."' },
        { title: '4. Escalate clashes, don\'t absorb them', body: 'If they push: "Let me check with Ngozi on priorities." It\'s her job to decide trade-offs, not yours alone.' },
        { title: '5. Follow up', body: 'If you promised the 20-minute walkthrough, do it this week. A kind "not now" plus a kept promise builds more trust than a resentful yes.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Understand, be honest about priorities, offer an alternative, involve your manager if needed, follow up.',
    },
  ],
  apply: {
    scenario: 'Clinton gets a request outside his goals.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Show you understand', 'Be honest about your priorities', 'Offer an alternative', 'Escalate clashes if needed', 'Follow up'],
      },
      {
        kind: 'mcq',
        prompt: 'Who should decide when two priorities clash?',
        options: [
          { text: 'Clinton\'s manager, Ngozi' },
          { text: 'Clinton alone, by working nights', why: 'Escalate; don\'t absorb.' },
          { text: 'Whoever shouts loudest', why: 'His manager.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good alternative, or not?',
        groups: ['Good alternative', 'Not good'],
        items: [
          { text: 'A 20-minute walkthrough of the data', group: 0 },
          { text: 'Building it secretly at night', group: 1 },
          { text: 'Looking at it next quarter', group: 0 },
          { text: 'Ignoring the message', group: 1 },
          { text: 'Pointing to an existing report', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that burns the bridge.',
        lines: ['That sounds useful for your team.', 'Not my problem.', 'I could show you the data source.'],
        bug: 1,
        explanation: 'Blunt and unhelpful. Offer an alternative.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s reply to the product manager.',
        from: 'clinton',
        message: 'He says it\'s "just a few hours". What do I write?',
        options: [
          { text: '"Sounds useful. I\'m focused on our failed-confirmation goal this quarter, but I can show you the data in 20 minutes so your team can build it. Would that help?"' },
          { text: '"Sure!" (then works until midnight)', why: 'A resentful yes hurts everyone.' },
          { text: '"No."', why: 'Be kind and offer an alternative.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to Clinton\'s line.',
        pairs: [
          ['Understand', 'I can see why you want it'],
          ['Priorities', 'Focused on failed confirmations'],
          ['Escalate', 'Let me check with Ngozi'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What builds more trust than a resentful yes?',
        options: [
          { text: 'A kind "not now" plus a kept promise' },
          { text: 'A silent no', why: 'Be clear and kind.' },
          { text: 'A yes you don\'t deliver', why: 'That breaks trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Escalate clashes; don\'t [[1]] them. Then [[2]] up.',
        blanks: [['absorb'], ['follow']],
        distractors: ['share', 'give', 'speak'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Clinton\'s walkthrough offer? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Yes, or "not now"?',
        groups: ['Yes', 'Not now'],
        items: [
          { text: 'A bug blocking failed confirmations', group: 0 },
          { text: 'A dashboard not on any goal', group: 1 },
          { text: 'Helping a teammate stuck on sync', group: 0 },
          { text: 'A new feature marked "not this quarter"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last say yes when you wanted to say "not now"? How could you have said it?',
    starters: ['I said yes to...', 'I could have said...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "not now" template: understand, priorities, alternative. Use it the next time a request doesn\'t fit.',
  },
  notes: 'Common workplace guidance. Where you live: how directly people say no varies a lot; the steps soften well.',
};

export default lesson;

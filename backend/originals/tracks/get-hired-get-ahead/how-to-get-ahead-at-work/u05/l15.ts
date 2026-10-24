import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: APM day one. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: APM day one',
  summary: 'Day one as associate product manager. Same building, new desk, a new glossary already started. Aïcha says, "What does success look like at 30, 60, 90 days? You tell me first." Clinton grins. Quiz: pay trade-offs, transitions, reversibility, changing from outside.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Weigh a pay trade-off', 'Make a transition well', 'Plan reversible changes and changes from outside'],
  learn: [
    {
      kind: 'story',
      title: 'New desk',
      beats: [
        { speaker: 'narrator', text: 'Day one, APM. Same building. New desk, by the window. A fresh glossary page.' },
        { speaker: 'narrator', text: 'Aïcha: "What does success look like at 30, 60, 90 days? You tell me first, then I\'ll add mine."' },
        { speaker: 'clinton', text: '(to himself) I\'ve done this before.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: APM day one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How did Clinton handle the pay dip?',
        options: [
          { text: 'Refused the role', why: 'He negotiated.' },
          { text: 'Asked to keep his pay, with a reason and a six-month review' },
          { text: 'Accepted without asking', why: 'He negotiated.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the transition in order.',
        lines: ['Write the handover doc', 'Pair with Kemi', 'Thank the team', 'Start a new 30-60-90 plan'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Reversible or hard to undo?',
        groups: ['Reversible', 'Hard to undo'],
        items: [
          { text: 'Internal move to product', group: 0 },
          { text: 'Quitting with no savings', group: 1 },
          { text: 'A side project', group: 0 },
          { text: 'Burning bridges', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unfair way to judge a change.',
        lines: ['Review at six months.', 'Decide after one bad meeting.', 'Ask: am I learning?'],
        bug: 1,
        explanation: 'Judge at the review.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s answer to Aïcha.',
        from: 'clinton',
        message: 'Aïcha asks what success looks like at 30 days. What do I say?',
        options: [
          { text: '"Ship a whole new product."', why: 'Learn first.' },
          { text: '"You tell me."', why: 'She asked him first; offer a draft.' },
          { text: '"Day 30: I know the product goals, I\'ve met every team we depend on, and I\'ve shadowed you on five driver calls."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step of changing from outside to an example.',
        pairs: [
          ['Overlap in current job', 'Automate the weekly cash report'],
          ['Side project', 'A public-data case study'],
          ['Bridge role', 'Reporting analyst at a bank'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does Clinton reuse on APM day one?',
        options: [
          { text: 'His first-90-days kit' },
          { text: 'Nothing', why: 'The same kit.' },
          { text: 'His old engineering tickets', why: 'His first-90-days kit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Hand over [[1]]. Judge at the [[2]].',
        blanks: [['properly'], ['review']],
        distractors: ['quickly', 'party', 'whim'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who did Clinton hand the sync service to? (one word)',
        answers: ['kemi'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good negotiation reason, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Offline expertise', group: 0 },
          { text: 'My mum will be upset', group: 1 },
          { text: 'Contributing from week one', group: 0 },
          { text: 'I deserve it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why stay connected to the engineering team?',
        options: [
          { text: 'To keep an exit', why: 'They\'re his partners.' },
          { text: 'No reason', why: 'They\'re his partners.' },
          { text: 'They\'re now his closest partners' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would you bring to day one of a new role, based on everything in this course?',
    starters: ['I\'d bring...', 'I\'d ask...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Draft your own day-30 success answer for your current or next role.',
  },
  notes: 'Checkpoint 3. Reviews l11–l14.',
};

export default lesson;

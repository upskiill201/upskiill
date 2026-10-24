import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: the table on the wall. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the table on the wall',
  summary: 'Clinton tapes the comparison table to his bedroom wall. Range, target, walk-away point underneath. Miracle checks it on a video call, then checks him. Offer calls, what\'s in an offer, comparing offers and fair pay.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Respond well to an offer call', 'Read and compare whole offers', 'Research a fair range'],
  learn: [
    {
      kind: 'story',
      title: 'The wall',
      beats: [
        { speaker: 'narrator', text: 'Wednesday evening. A table taped to the wall: two columns, eight rows. Underneath, in marker: "Range 280–340k. Target 330k. Walk away: below Kmer."' },
        { speaker: 'miracle', text: 'That\'s a real plan. Now prove you understand it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: Miracle checks the wall.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the offer-call reply in order.',
        lines: ['Thank them', 'Show you\'re excited', 'Ask for it in writing', 'Agree when you\'ll reply'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of an offer?',
        groups: ['Contract', 'Growth'],
        items: [
          { text: 'Notice period', group: 0 },
          { text: 'Training budget', group: 1 },
          { text: 'Probation', group: 0 },
          { text: 'Review date', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with "bigger number wins"?',
        options: [
          { text: 'Nothing', why: 'Pay is one row.' },
          { text: 'It ignores everything except pay' },
          { text: 'It takes too long', why: 'It\'s fast, but incomplete.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak salary source.',
        lines: ['Tchami\'s typical range.', 'A number that felt right.', 'Local adverts with pay ranges.'],
        bug: 1,
        explanation: 'Feelings aren\'t research.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Miracle.',
        from: 'miracle',
        message: 'What\'s the difference between your target and your walk-away point?',
        options: [
          { text: 'They\'re the same.', why: 'Target is the ask; walk-away is the limit.' },
          { text: 'I don\'t need either.', why: 'Both help you stay calm.' },
          { text: 'Target is what I\'ll ask for, with a reason. Walk-away is where I\'d choose Kmer instead.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to Clinton\'s number.',
        pairs: [
          ['Range', '280k to 340k'],
          ['Target', '330k'],
          ['Walk-away', 'Below Kmer\'s whole offer'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who can explain local contract rules?',
        options: [
          { text: 'A careers office, an industry contact or the labour office' },
          { text: 'A foreign forum', why: 'Use local, reliable sources.' },
          { text: 'Nobody', why: 'Several people can help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s summary.',
        template: 'Compare the [[1]] offer. Research a fair [[2]].',
        blanks: [['whole'], ['range']],
        distractors: ['biggest', 'wish', 'guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the commute to Njangi Pay? (a number)',
        answers: ['50', 'fifty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good on the offer call, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'I\'m really excited', group: 0 },
          { text: 'I accept, no need to send anything', group: 1 },
          { text: 'Could you send it in writing?', group: 0 },
          { text: 'That\'s an insult', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for a typical range instead of someone\'s salary?',
        options: [
          { text: 'It\'s required by law', why: 'It\'s just more comfortable.' },
          { text: 'Salaries are secret everywhere', why: 'Norms vary; ranges are easier to share.' },
          { text: 'It\'s more comfortable and more useful' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What would your own "wall" say: range, target, walk-away point?',
    starters: ['My range:', 'My walk-away point:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'For your next application, write your range, target and walk-away point before you get an offer.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;

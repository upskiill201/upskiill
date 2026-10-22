import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the wedding',
  summary: 'Chiamaka\'s wedding. Ada in the aso-ebi, sewn by Ngozi\'s tailor, dancing in every photo. Nobody asks about the gele. Check what you know: values, joy per naira, and generous vs ruthless.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use your values to decide', 'Score spending by joy per naira'],
  learn: [
    {
      kind: 'story',
      title: 'The dance floor',
      beats: [
        { speaker: 'narrator', text: 'Ada\'s aunt, mid-dance: "Ada! Where did you sew this? It\'s nicer than mine!"' },
        { speaker: 'ada', text: 'A secret, Auntie. A ₦30,000 secret.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: what matters.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When something truly matters to you, what\'s the best approach?',
        options: [
          { text: 'Find the version that honours it without overpaying' },
          { text: 'Cut it to zero', why: 'That costs something money can\'t fix.' },
          { text: 'Pay whatever is asked', why: 'Matters a lot isn\'t the same as overpay.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s values exercise.',
        lines: ['Imagine extra money', 'Find the themes', 'Rank your top four', 'Compare with spending', 'Find the gap'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A ₦20,000 line scored 4 out of 10. Naira per joy point?',
        answers: ['5000', '5,000', '₦5,000', '₦5000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Generous or ruthless, for Ada?',
        groups: ['Generous', 'Ruthless'],
        items: [
          { text: 'Family celebrations', group: 0 },
          { text: 'Latest phone', group: 1 },
          { text: 'Design growth', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each happy-spending pattern to an example.',
        pairs: [
          ['Experiences', 'Mexico City'],
          ['Spending on others', 'Aso-ebi for Chiamaka'],
          ['Making it a treat', 'Friday dinner'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Is it wrong that I spent ₦55,000 on aso-ebi while saving for Mexico?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'Yes, Mexico should come first.', why: 'Family ranks higher for her.' },
          { text: 'You should have paid ₦85,000.', why: 'She found a better version.' },
          { text: 'Not at all. Family is your top value. You honoured it and saved ₦30,000. That\'s exactly how values-based spending works.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Values-based spending.',
        template: 'Generous where it [[1]], ruthless where it [[2]].',
        blanks: [['matters'], ['doesn\'t', 'does not']],
        distractors: ['costs', 'shines'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion ignores joy per naira?',
        lines: [
          'Art class: 10 out of 10 for ₦15,000. Keep.',
          'Online shopping: 2 for ₦35,000. Cut most.',
          'Family support: 10 for ₦40,000. Cut, it\'s the biggest.',
        ],
        bug: 2,
        fix: 'Family support: keep. Top value, top score.',
        explanation: 'Biggest isn\'t worst. Joy per naira decides.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what are the big three?',
        options: [
          { text: 'Phones, clothes and gyms', why: 'Usually much smaller.' },
          { text: 'Housing, transport and food' },
          { text: 'Fun, friends and family', why: 'Important, but not the big cost lines.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what is lifestyle creep?',
        options: [
          { text: 'Spending quietly rising with income' },
          { text: 'Spending on what you value', why: 'That\'s values-based spending.' },
          { text: 'Earning less', why: 'It\'s about spending.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 2: Ada\'s monthly saving after the first cuts, in naira.',
        answers: ['85000', '85,000', '₦85,000', '₦85000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your highest joy-per-money spending? Are you protecting it?',
    starters: ['My highest:...', 'I\'m protecting it by...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review.',
};

export default lesson;

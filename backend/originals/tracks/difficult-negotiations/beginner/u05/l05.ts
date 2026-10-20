import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: closing a tough one',
  summary: 'Acceptable vs good, packaging, the statement of work and saving face. Quick check before Arjun learns how to repair a relationship after a hard round.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Package and price a deal', 'Close in writing and help the other side save face'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday',
      beats: [
        { speaker: 'narrator', text: 'The statement of work comes back signed. The first invoice, £16,800, is approved for payment.' },
        { speaker: 'joel', text: 'NOW can we start coding?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: closing a tough one.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five packaging steps.',
        lines: ['Put every issue on the table', 'Nothing agreed until everything agreed', 'Add value they need', 'Price the whole package', 'Check it beats both BATNAs'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A package of £30,000, costs of £20,000, extras costing £1,000. What do you keep, in pounds?',
        answers: ['9000', '9,000', '£9,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'They offer exactly your walk-away. What\'s the best move?',
        options: [
          { text: 'Look for value to add that makes it better for both' },
          { text: 'Accept immediately', why: 'Acceptable isn\'t good.' },
          { text: 'Walk away', why: 'It\'s acceptable; try to improve it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in a statement of work, or not?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'What\'s not included', group: 0 },
          { text: 'A joke about procurement', group: 1 },
          { text: 'Payment milestones', group: 0 },
          { text: '"Small extras free"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Signed! Can I post "We beat Harlow & Finch\'s procurement"?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'No. Let them feel they got a good deal, because they did. We celebrate with pizza, privately.' },
          { text: 'Yes, post it.', why: 'That makes a new client regret signing.' },
          { text: 'Post it next year.', why: 'Not at all.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the term to its meaning.',
        pairs: [
          ['Package', 'All issues negotiated together'],
          ['Statement of work', 'The written scope, price and terms'],
          ['Saving face', 'Letting them accept without looking beaten'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The package rule.',
        template: 'Nothing is [[1]] until [[2]] is agreed.',
        blanks: [['agreed'], ['everything']],
        distractors: ['signed', 'nobody'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this close is the mistake?',
        lines: [
          'Thank you for a strong package.',
          'Statement of work attached.',
          'We\'ll start coding tonight, before you sign.',
          'First invoice on signature.',
        ],
        bug: 2,
        fix: 'We\'ll start as soon as it\'s signed.',
        explanation: 'Never start before signature.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What was the first invoice, in pounds?',
        answers: ['16800', '16,800', '£16,800'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why add launch support to the package?',
        options: [
          { text: 'It\'s cheap for Arjun\'s team and valuable to the client' },
          { text: 'To give something away free', why: 'It\'s priced in.' },
          { text: 'No reason', why: 'It lifted the deal for both sides.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For a deal you\'re working on, what would your package and statement of work include?',
    starters: ['The package:...', 'Not included:...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4. 30,000 − 20,000 − 1,000 = 9,000.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: closing the stall',
  summary: 'Evening at Makola. Mum counts the day\'s takings in her notebook, and Kofi finally understands why she\'s never once said "last two". Check what you know: honest selling, scarcity, anchors and decoys.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot scarcity, anchors and decoys', 'Ask the right question of any seller'],
  learn: [
    {
      kind: 'story',
      title: 'The notebook',
      beats: [
        { speaker: 'narrator', text: 'Mum closes her notebook. "The blue-print woman came back with her sister. Two more pieces sold. That\'s what honest gets you."' },
        { speaker: 'kofi', text: 'Mum, you\'re basically a money course.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the tricks.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which trick is it?',
        groups: ['Scarcity', 'Anchor', 'Decoy'],
        items: [
          { text: '"Only 2 left!"', group: 0 },
          { text: '"Was GH₵900"', group: 1 },
          { text: 'A middle plan nobody should buy', group: 2 },
          { text: 'A countdown timer', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do you test a countdown timer?',
        options: [
          { text: 'Refresh the page and see if it restarts' },
          { text: 'Buy quickly before it ends', why: 'That\'s what it wants.' },
          { text: 'Trust it', why: 'Many reset on refresh.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A trader opens at GH₵200. Other stalls sell it for GH₵120. She offers "a special price" of GH₵170. How much above the usual price is that?',
        answers: ['50', 'GH₵50', '50 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'Free delivery over GH₵300! I\'m at GH₵260, so I\'ll add a GH₵60 cap.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'How much is delivery? If it\'s under GH₵60, just pay it. You\'re spending more to "save".' },
          { text: 'Smart move.', why: 'Only if he wanted the cap anyway.' },
          { text: 'Never order online.', why: 'Online is fine; the threshold is the trick.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mum\'s rule.',
        template: 'Never say "last two" when you have [[1]].',
        blanks: [['twenty']],
        distractors: ['two', 'none'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each trick to the best defence.',
        pairs: [
          ['Fake scarcity', 'Wait a day and check again'],
          ['Anchor price', 'Check two or three other prices'],
          ['Decoy option', 'Start from what you need'],
          ['Free-delivery threshold', 'Compare delivery cost with what you\'d add'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which thought is the anchor talking?',
        lines: [
          'Three shops sell it for GH₵100 to GH₵130.',
          'This one says "was GH₵400, now GH₵150" so it\'s a steal.',
          'GH₵150 is above the normal price.',
        ],
        bug: 1,
        fix: 'GH₵150 is more than other shops charge, whatever the "was" price says.',
        explanation: 'Judge against real prices, not the seller\'s anchor.',
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 2: what does HALT stand for?',
        options: [
          { text: 'Hungry, angry, lonely, tired' },
          { text: 'Happy, anxious, lazy, tense', why: 'Close in spirit, but not the letters.' },
          { text: 'Hold, ask, look, think', why: 'Good advice, but not HALT.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review, Chapter 1: what\'s the difference between wanting and liking?',
        options: [
          { text: 'Wanting is the pull before buying; liking is the pleasure of having' },
          { text: 'They\'re the same', why: 'They come from different systems.' },
          { text: 'Liking always beats wanting', why: 'Often wanting is stronger than liking turns out to be.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a flash-sale page.',
        lines: ['Notice the tricks', 'Ignore the anchor', 'Test the scarcity', 'Ask what you came for', 'Decide tomorrow'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Review, Chapter 2: after 10 p.m., Kofi\'s phone goes where? (One word.)',
        answers: ['door', 'by the door', 'across the room'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these tricks have worked on you most? How will you spot it next time?',
    starters: ['The trick that gets me is...', 'Next time I\'ll...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4 with Chapter 1 and 2 review.',
};

export default lesson;

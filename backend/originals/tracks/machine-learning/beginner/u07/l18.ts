import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 18 — Reading someone else's results. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading someone else\'s results',
  summary: 'A company emails Folake: "Our no-show AI has 90% precision!" It sounds better than v0.6. A short reading on how to question someone else\'s numbers, using everything in this chapter.',
  minutes: 11,
  outcomes: [
    'Question a reported metric',
    'Work out what\'s missing from a claim',
    'Turn a sales claim into the clinic\'s numbers',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ninety per cent',
      html: '<p>The email is short. "<strong>90% precision</strong> on a real clinic network. Book a demo."</p><p>Halima doesn\'t reply yet. She writes five questions.</p><p><strong>1. 90% of what?</strong> Precision means: of the bookings flagged, 9 in 10 really missed. It says nothing about how many no-shows were caught.</p><p><strong>2. How many flags?</strong> The small print says: 10 flags out of 1,000 bookings. 9 were right.</p><p><strong>3. How many no-shows were there?</strong> In that network, about 1 in 5 missed: around 200. So recall was 9 ÷ 200 = <strong>0.045</strong>. It warned about fewer than 1 no-show in 20.</p><p><strong>4. Tested how?</strong> On bookings the model had never seen? Chosen settings on the same data? The email doesn\'t say.</p><p><strong>5. Compared with what?</strong> No baseline anywhere.</p><p>Halima\'s reply to Folake: "Their model makes very few, very good calls. Ours makes more calls and reaches far more no-shows: 26 of 37 on our test week, recall 0.70. Ask them for their recall, how they tested it, and their baseline."</p>',
    },
    {
      kind: 'check',
      question: 'The vendor flagged 10 bookings and 9 missed, out of about 200 no-shows. What\'s missing from "90% precision"?',
      options: ['Nothing: 90% is complete', 'Recall: they caught only 9 of about 200', 'Accuracy'],
      answer: 1,
      explanation: 'Precision without recall hides how little the model catches.',
    },
    {
      kind: 'tryIt',
      title: 'Their numbers, our way',
      caption: 'Plain Python: no model needed.',
      code: 'flags = 10\nright = 9\nno_shows = 200\nprint("Precision:", right / flags)\nprint("Recall:", right / no_shows)\nprint("No-shows with no warning:", no_shows - right)\n',
      challenge: 'What precision and recall would v0.6\'s week-12 flag show in the same format? (63 flags, 26 right, 37 no-shows)',
    },
  ],
  apply: {
    scenario: 'Reading someone else\'s results.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'The vendor caught 9 of about 200 no-shows. Print their recall',
        starter: 'right = 9\nno_shows = 200\n',
        solution: 'right = 9\nno_shows = 200\nprint(right / no_shows)\n',
        hint: 'right / no_shows',
        checks: [{ message: 'Print 0.045', outputEquals: '0.045' }],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first question to ask about "90% precision"?',
        options: [
          { text: 'How many no-shows did it catch out of all of them (recall)?' },
          { text: 'Can it reach 100%?', why: 'The missing number is recall.' },
          { text: 'What colour is the dashboard?', why: 'Not relevant.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'v0.6\'s flag: 26 right out of 37 no-shows. Print its recall, rounded to 2 places',
        starter: 'right = 26\nno_shows = 37\n',
        solution: 'right = 26\nno_shows = 37\nprint(round(right / no_shows, 2))\n',
        hint: 'round(right / no_shows, 2)',
        checks: [{ message: 'Print 0.7', outputEquals: '0.7' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the claim complete?',
        groups: ['Missing something', 'Complete enough'],
        items: [
          { text: '"90% precision!"', group: 0 },
          { text: '"95% accurate on our data"', group: 0 },
          { text: 'Precision, recall, counts, unseen weeks, baseline', group: 1 },
          { text: '"Reached 26 of 37 no-shows with 63 calls, vs 0 doing nothing"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Their 90% beats our 41%. Should we buy it?',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, 90 is bigger.', why: 'Different measures, different call volumes.' },
          { text: 'Their 90% is precision from 10 calls; they reached 9 of about 200 no-shows. We reach 26 of 37. Ask for their recall before comparing.' },
          { text: 'Never buy anything.', why: 'Just ask the right questions first.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it protects against.',
        pairs: [
          ['90% of what?', 'Confusing precision with something else'],
          ['How many flags?', 'Tiny, cherry-picked lists'],
          ['Tested how?', 'Scores on training data'],
          ['Compared with what?', 'No baseline'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Halima\'s reply.',
        template: 'Please send your [[1]], how you [[2]] it, and your baseline.',
        blanks: [['recall'], ['tested']],
        distractors: ['logo', 'sold'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion doesn\'t follow from "90% precision"?',
        lines: ['Most of its flags were right.', 'It made few flags.', 'It catches most no-shows.'],
        bug: 2,
        fix: 'We don\'t know how many no-shows it catches.',
        explanation: 'Precision says nothing about recall.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'With 9 caught out of about 200, how many no-shows got no warning?',
        answers: ['191'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which claim would you trust most?',
        options: [
          { text: 'The highest single percentage', why: 'One number can be gamed.' },
          { text: 'The one with the best logo', why: 'Not evidence.' },
          { text: 'Tested on unseen weeks, with precision, recall, counts and a baseline' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Find a claim with a percentage in an advert or headline this week. Which of Halima\'s five questions does it fail?',
    starters: ['The claim was...', 'It fails...'],
  },
  deepen: {
    title: 'Reading papers and model cards',
    summary: 'The same five questions work for research papers and published model cards: what\'s measured, on how many, tested how, compared with what, and what\'s left out.',
  },
  notes: 'Fictional vendor: 10 flags of 1,000 bookings, 9 correct, ~200 no-shows -> precision 0.9, recall 0.045, 191 missed. v0.6 week 12 at 0.2: 26/37 = 0.70 recall, precision 0.41.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Reading: things vs experiences. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Things vs experiences',
  summary: 'Kofi can\'t remember what he bought last Black Friday. He can remember every minute of the Cape Coast day trip. Why do experiences often stay with us longer than things?',
  minutes: 12,
  outcomes: [
    'Explain why experiences often bring more lasting happiness',
    'Understand how we get used to new things',
    'Choose spending that lasts',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why the trip outlasts the boots',
      html: '<p>Psychologists Leaf Van Boven and Thomas Gilovich (2003) asked people about purchases they\'d made to be happier. Many said their <strong>experiences</strong> (a trip, a concert, a meal with friends) made them happier than their <strong>material purchases</strong> (clothes, gadgets).</p><p><strong>Why?</strong></p><ul><li><strong>We get used to things.</strong> New boots feel amazing for a week, then they\'re just boots. Psychologists call this <em>hedonic adaptation</em>: the lift from a new possession fades as it becomes normal.</li><li><strong>Experiences become stories.</strong> Kofi still tells the Cape Coast story: the castle, the fish, Yaw\'s terrible singing on the night bus. Memories often get better with time.</li><li><strong>Experiences are shared.</strong> They\'re usually with people, and time with people is one of the strongest links to happiness.</li><li><strong>Less comparison.</strong> It\'s easy to compare your phone with a newer one. It\'s harder to compare "my day at Cape Coast" with someone else\'s.</li></ul><p><strong>It\'s not a rule.</strong> Some things, like the audio interface, create experiences: every beat Kofi records with it. Tools, books and gear you use for something you love can be the best purchases of all.</p><p><strong>The useful question:</strong> "Will I still be glad about this in a year?" Things you use for things you love, and experiences with people, usually pass.</p>',
    },
    {
      kind: 'check',
      question: 'What is hedonic adaptation?',
      options: ['Getting used to a new thing until the lift fades', 'Enjoying things more over time', 'A type of discount'],
      answer: 0,
      explanation: 'The new becomes normal, and the good feeling fades.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Things fade; stories and shared time often grow. Ask: will I still be glad about this in a year?',
    },
  ],
  apply: {
    scenario: 'What lasts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Mostly a thing, or mostly an experience?',
        groups: ['Thing', 'Experience'],
        items: [
          { text: 'A new phone case', group: 0 },
          { text: 'The Cape Coast day trip', group: 1 },
          { text: 'A third pair of sneakers', group: 0 },
          { text: 'A concert with friends', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the boots lose their magic fast?',
        options: [
          { text: 'They were cheap', why: 'Price isn\'t why the feeling fades.' },
          { text: 'They didn\'t; he loves them', why: 'He sold them at a loss.' },
          { text: 'Hedonic adaptation, and in this case they didn\'t even fit' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reason to what it means.',
        pairs: [
          ['Hedonic adaptation', 'The new becomes normal'],
          ['Experiences become stories', 'Memories often improve'],
          ['Shared with people', 'Strong link to happiness'],
          ['Less comparison', 'Hard to rank one day against another'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'So I should never buy things, only experiences?',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Yes, never buy things.', why: 'Too strict; tools and gear can create experiences.' },
          { text: 'No. Things you use for things you love can be great, like my interface. Ask if you\'ll still be glad in a year.' },
          { text: 'Only buy things.', why: 'The research points the other way for many people.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The question.',
        template: 'Will I still be [[1]] about this in a [[2]]?',
        blanks: [['glad', 'happy'], ['year']],
        distractors: ['sad', 'minute'],
      },
      {
        kind: 'findBug',
        prompt: 'Which purchase will probably fade fastest?',
        lines: [
          'The audio interface he uses 4 times a week.',
          'A beach day with Efua and Yaw.',
          'A fifth phone case, because it was on sale.',
        ],
        bug: 2,
        fix: 'Skip it, or put it on the wishlist and see in 24 hours.',
        explanation: 'A fifth case adds almost nothing, and the lift will be gone by next week.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a tool like the interface be a great purchase?',
        options: [
          { text: 'It creates experiences: every beat he records with it' },
          { text: 'It\'s expensive', why: 'Price doesn\'t make it good.' },
          { text: 'Everyone has one', why: 'That\'s comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The Cape Coast day trip cost GH₵120. Kofi has told the story about 30 times. Cost per story, in cedis?',
        answers: ['4', 'GH₵4', '4 cedis'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the life of a new thing, for many people.',
        lines: ['Excitement when it arrives', 'Enjoyment for a few days', 'It becomes normal', 'Wanting the next new thing'],
      },
      {
        kind: 'mcq',
        prompt: 'Which purchase is most likely to pass the one-year test?',
        options: [
          { text: 'A flash-sale gadget you\'ll use twice', why: 'Probably forgotten.' },
          { text: 'A trip with friends, or gear used for something you love' },
          { text: 'Something bought to keep up with others', why: 'Comparison purchases fade fast.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a purchase from a year ago you\'re still glad about? And one you\'d forgotten?',
    starters: ['Still glad about...', 'Forgotten:...'],
  },
  deepen: {
    title: 'Read the study',
    summary: 'Van Boven and Gilovich (2003), "To Do or to Have? That Is the Question", Journal of Personality and Social Psychology. Later research added nuance: experiences that go badly don\'t bring happiness, and material things used for experiences can count as both.',
  },
  notes: 'Van Boven, L., & Gilovich, T. (2003). JPSP, 85(6), 1193–1202. Hedonic adaptation: Frederick & Loewenstein (1999). Nuance: e.g. Nicolao, Irwin & Goodman (2009); "experiential products" (Guevarra & Howell 2015).',
};

export default lesson;

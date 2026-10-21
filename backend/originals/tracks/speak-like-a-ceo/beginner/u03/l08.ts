import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8. Myth or fact: talks and slides. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Myth or fact: talks and slides',
  summary: 'Diego has opinions about slides, Tomás has others. Four beliefs about building a talk. Which ones hold up?',
  minutes: 11,
  outcomes: [
    'Separate talk-building myths from facts',
    'Know what the evidence says about stories',
    'Know what the evidence says about slide text',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Putting your full script on the slides helps people follow.',
          isFact: false,
          explain: 'Myth, usually. Mayer\'s redundancy principle: narration with a picture often beats narration plus the same printed words.',
        },
        {
          text: 'Cutting interesting but off-topic material can help people learn.',
          isFact: true,
          explain: 'Fact. Mayer\'s coherence principle: extra material, even interesting material, tends to get in the way.',
        },
        {
          text: 'People remember stories far better than statistics.',
          isFact: true,
          explain: 'Often, yes. In a classroom exercise described in Made to Stick (Heath and Heath, 2007), 63% of students recalled a story, but only 5% recalled a statistic.',
        },
        {
          text: 'A longer talk with more slides looks more professional.',
          isFact: false,
          explain: 'Myth. Clarity, not length, is what audiences notice. One message and well-chosen slides usually land better.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Cut extras, don\'t print your script, pair numbers with stories, and keep it as short as the message needs.',
    },
  ],
  apply: {
    scenario: 'Talk myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Full script on slides helps', group: 0 },
          { text: 'Cutting extras can help learning', group: 1 },
          { text: 'More slides look more professional', group: 0 },
          { text: 'Stories are often recalled better', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the Made to Stick exercise, what percentage recalled a story?',
        answers: ['63', '63%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'And what percentage recalled a statistic?',
        options: [
          { text: '5%' },
          { text: '63%', why: 'That was stories.' },
          { text: '50%', why: '5%.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to its source.',
        pairs: [
          ['Mayer', 'Redundancy and coherence'],
          ['Heath and Heath', '63% vs 5% recall'],
          ['Clark and Fox Tree', 'Fillers as signals'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'Stories are fluff. Leaders only care about numbers.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Numbers prove it. Stories make it memorable. I\'ll use both: Doña Rosa, then 140 of 200.' },
          { text: 'You\'re right, cut the story.', why: 'Use both.' },
          { text: 'Numbers are fluff.', why: 'Use both.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The callout.',
        template: 'Don\'t [[1]] your script. Pair numbers with [[2]].',
        blanks: [['print'], ['stories']],
        distractors: ['practise', 'fonts'],
      },
      {
        kind: 'mcq',
        prompt: 'Why can interesting extras hurt?',
        options: [
          { text: 'They pull attention away from the main point' },
          { text: 'They\'re too short', why: 'They distract.' },
          { text: 'They can\'t', why: 'They distract.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s advice is a myth?',
        lines: [
          'Pick one message.',
          'Use a story and a number.',
          'Put every word you\'ll say on the slides, so nobody misses anything.',
          'End with one action.',
        ],
        bug: 2,
        fix: 'Put your words in speaker notes.',
        explanation: 'That\'s the redundancy problem.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s rules for her slides.',
        lines: ['One message', 'Cut extras', 'Picture, not script', 'Story, then number'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Made to Stick published?',
        answers: ['2007'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you seen in talks at work? What would you change?',
    starters: ['I\'ve seen...', 'I\'d change...'],
  },
  deepen: {
    title: 'Why stories stick',
    summary: 'Stories give the brain a sequence and a person to picture. Numbers give neither, which is why a number travels best inside a story.',
  },
  notes: 'Mayer (redundancy, coherence). Heath & Heath (2007), Made to Stick: Stanford classroom exercise (63% recalled stories, 5% statistics); a teaching exercise, not a controlled study.',
};

export default lesson;

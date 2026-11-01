import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Myth or Fact: "I don't know" is allowed (honesty and composure in Q&A). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: '"I don\'t know" is allowed',
  summary: 'Ada is terrified a judge will ask something she can\'t answer. Speaker 5 tried to bluff: "Ads? Probably?" Tey: "Let\'s talk about what to do when you don\'t know."',
  minutes: 11,
  outcomes: [
    'Know when "I don\'t know" is the right answer',
    'Answer questions briefly and directly',
    'Stay calm when a question feels like an attack',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'You must have an answer to every question, or you look weak.', isFact: false, explain: 'Myth. Bluffing usually shows. "I don\'t know yet, but here\'s how I\'ll find out" sounds more confident than a guess.' },
        { text: 'A good answer is short: answer first, then one reason.', isFact: true, explain: 'Fact. In a two-minute Q&A, long answers mean fewer questions, and rambling sounds unprepared. Lead with the answer (like BLUF), then one reason or example.' },
        { text: 'Tough questions usually mean the judge doesn\'t like you.', isFact: false, explain: 'Myth. Tough questions often mean they\'re interested and want to see how you think. Nobody bothers to challenge a pitch they\'ve already dismissed.' },
        { text: 'You should prepare answers to the most likely questions.', isFact: true, explain: 'Fact. Most pitch questions are predictable: How do you make money? Who else does this? What if someone copies you? What\'s next? Prepare those and you\'ll handle most of the Q&A.' },
        { text: 'It\'s fine to pause briefly before answering.', isFact: true, explain: 'Fact. A second or two to think looks thoughtful. Blurting the first thing in your head is how "Ads? Probably?" happens.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pause. Answer first, then one reason. If you don\'t know: say so, and say how you\'ll find out.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: the Q&A.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A judge asks something Ada genuinely doesn\'t know. Best response?',
        options: [
          { text: 'Make up a confident-sounding number', why: 'Bluffing shows, and destroys trust if checked.' },
          { text: '"Sorry, I\'m so sorry, I should know that..."', why: 'Honest, but the apology shrinks her.' },
          { text: '"I don\'t know yet. I\'m testing that with two groups this month, and I\'ll have numbers by December."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You must answer everything', group: 0 },
          { text: 'Tough questions often mean interest', group: 1 },
          { text: 'Long answers impress judges', group: 0 },
          { text: 'Most pitch questions are predictable', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'What if Mrs Adeyemi\'s question sounds like an attack?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Attack back.', why: 'Never a good look on stage.' },
          { text: 'Assume interest, not attack. Pause, then answer calmly. Tough questions are usually a good sign.' },
          { text: 'Ignore the question.', why: 'Everyone notices.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Q&A, lead with the ___, then one reason. (one word)',
        answers: ['answer'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good Q&A answer in order.',
        lines: ['Pause for a second', 'Give the answer', 'Add one reason or example', 'Stop'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the likely question to Ada\'s prepared answer.',
        pairs: [
          ['How do you make money?', '₦2,000 a month per group, after a free first month'],
          ['Who else does this?', 'Notebooks and WhatsApp, mostly'],
          ['What\'s next?', 'A hundred offices by next year'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s practice answer to "How do you make money?" Which line is the problem?',
        lines: [
          'Each group pays ₦2,000 a month after a free first month.',
          'Ten offices have already signed up.',
          'Also, maybe ads, or selling data, or something, I\'m not sure, possibly crypto?',
        ],
        bug: 2,
        fix: 'Delete it: the first two lines answer the question.',
        explanation: 'Guessing after a clear answer makes the clear answer look uncertain. Answer, reason, stop.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a short pause before answering fine?',
        options: [
          { text: 'It looks thoughtful, and stops you blurting a weak answer' },
          { text: 'It wastes time', why: 'One or two seconds is nothing.' },
          { text: 'Judges hate pauses', why: 'Pauses look thoughtful.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The honest "I don\'t know".',
        template: 'I don\'t [[1]] yet. I\'m testing that this [[2]], and I\'ll have numbers by [[3]].',
        blanks: [['know'], ['month'], ['December']],
        distractors: ['guess', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s rule.',
        tiles: ['Answer', 'first,', 'then', 'one', 'reason.'],
        distractors: ['guess'],
      },
    ],
  },
  reflect: {
    prompt: 'List the four most likely questions about your pitch. Write a short answer (answer first, one reason) for each, and one honest "I don\'t know yet".',
    starters: ['Q1: ... A: ...', 'Q2: ... A: ...', 'I don\'t know yet: ...'],
  },
  deepen: {
    title: 'The question drill',
    summary: 'Give a friend your list of likely questions and ask them to fire them at you in random order. Practise answering in under 20 seconds each.',
  },
  notes: 'Q&A guidance (prepare predictable questions, brief direct answers, honest uncertainty, pausing) is standard presentation and pitch coaching. Ada\'s pricing is fictional.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: prepared beats passionate (Chen, Yao & Kotha 2009; Clark 2008). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Prepared beats passionate',
  summary: 'Ada thinks the answer is to act more excited: big smile, big voice, big energy. Arjun sends her two studies about what investors actually respond to. They change her plan.',
  minutes: 12,
  outcomes: [
    'Know what research says about passion vs preparation in pitches',
    'Know that delivery shapes judgements more than people admit',
    'Focus your practice where it counts',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What investors respond to',
      html: "<p>Ada has a plan: be the most passionate person on stage. Arjun replies with two studies.</p><h3>Study 1: Preparedness, not displayed passion</h3><p>In a 2009 study, researchers Xiao-Ping Chen, Xin Yao and Suresh Kotha asked investors to rate founders pitching at a business-plan competition. They measured two things separately:</p><ul><li><strong>Displayed passion:</strong> energy, animated gestures, an excited voice.</li><li><strong>Preparedness:</strong> how well the founder had thought through the business, and how clearly that came across.</li></ul><p>The result: how <strong>prepared</strong> founders seemed was linked to investors' decisions to fund them. How much passion they <em>displayed</em> was not.</p><h3>Study 2: Delivery counts, more than people admit</h3><p>In a smaller 2008 study, business angels in the UK rated entrepreneurs' pitches. Their interest in investing tracked how well the pitch was <em>presented</em>. Yet when asked why, the angels mostly talked about content: the market, the product, the money. Delivery seemed to shape their views more than they realised, or admitted.</p><h3>What this means for Ada</h3><ul><li>Don't act excited. <strong>Be prepared</strong>, and let it show: know your pitch, your numbers and your answers cold.</li><li>Delivery still matters a lot. But good delivery comes mostly from preparation, not performance.</li><li>Real enthusiasm is fine. Fake enthusiasm on top of shaky preparation doesn't help.</li></ul>",
    },
    {
      kind: 'check',
      question: 'In the 2009 study, what was linked to investors\' funding decisions?',
      options: ['How prepared the founder seemed', 'How much passion the founder displayed', 'How long the pitch was'],
      answer: 0,
      explanation: 'Perceived preparedness predicted funding; displayed passion did not.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Don\'t perform passion. Be so prepared that confidence shows on its own.',
    },
  ],
  apply: {
    scenario: 'Arjun\'s two studies.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the 2009 investor study find about displayed passion?',
        options: [
          { text: 'It was the most important factor', why: 'The opposite.' },
          { text: 'It wasn\'t linked to funding decisions; preparedness was' },
          { text: 'It made investors leave', why: 'It just didn\'t predict funding.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What was surprising about the 2008 business angels study?',
        options: [
          { text: 'Delivery shaped their interest, but they mostly explained decisions by content' },
          { text: 'They ignored the pitch entirely', why: 'They rated it closely.' },
          { text: 'They only cared about the founder\'s clothes', why: 'Not what it found.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Displayed passion, or preparedness?',
        groups: ['Displayed passion', 'Preparedness'],
        items: [
          { text: 'Big arm gestures', group: 0 },
          { text: 'Knowing your numbers instantly', group: 1 },
          { text: 'An excited voice', group: 0 },
          { text: 'A clear answer to "How do you make money?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I shouldn\'t be enthusiastic at all?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Never smile on stage.', why: 'Overcorrecting.' },
          { text: 'Be twice as excited.', why: 'Displayed passion didn\'t predict funding.' },
          { text: 'Real enthusiasm is great. Just don\'t use it to cover gaps. Preparation first; let the energy be real.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Don\'t perform passion. Be ___. (one word)',
        answers: ['prepared', 'ready'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s new plan in order.',
        lines: ['Know the pitch beats cold', 'Know every number instantly', 'Prepare answers to likely questions', 'Let real confidence show'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s old plan. Which line does the research NOT support?',
        lines: [
          'Know my numbers so well I never hesitate.',
          'Shout and wave my arms so the judges see my passion.',
          'Practise until it sounds like a conversation.',
        ],
        bug: 1,
        fix: 'Rehearse my answers to the hardest questions.',
        explanation: 'Displayed passion didn\'t predict funding. Preparation did.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the study to its finding.',
        pairs: [
          ['2009 investor study', 'Preparedness predicted funding'],
          ['2008 angels study', 'Delivery mattered more than admitted'],
          ['Both together', 'Prepare, and it shows in delivery'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'Don\'t [[1]] passion. Be so [[2]] that confidence shows on its [[3]].',
        blanks: [['perform', 'fake'], ['prepared'], ['own']],
        distractors: ['shout', 'loud'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the lesson in four words.',
        tiles: ['Prepared', 'beats', 'passionate.'],
        distractors: ['loud'],
      },
    ],
  },
  reflect: {
    prompt: 'What would "fully prepared" mean for your pitch? List what you need to know cold: numbers, answers, examples.',
    starters: ['I need to know...', 'The hardest question I could get: ...'],
  },
  deepen: {
    title: 'The cold-knowledge list',
    summary: 'Write down every number and fact in your pitch. Ask a friend to quiz you randomly. Anything you hesitate on, learn until you don\'t.',
  },
  notes: 'Chen, Yao & Kotha (2009), Academy of Management Journal 52(1): investors\' perceived preparedness (not displayed affective passion) predicted funding decisions in business-plan competition pitches. Clark (2008), Venture Capital 10(3): 24 UK business angels; presentational factors strongly shaped interest, while stated reasons focused on substance (small sample, noted as "smaller").',
};

export default lesson;

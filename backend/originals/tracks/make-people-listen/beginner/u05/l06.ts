import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. "Rewind" (Before/After): ask, don't tell (open questions that let people reach their own conclusions). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Rewind: ask, don\'t tell',
  summary: 'The producer replays a call from last month: Miracle telling Mama all the reasons Lagos is safe. Then Tey replays it with questions instead of statements. Same facts. Very different Mama.',
  minutes: 11,
  outcomes: [
    'Swap statements for open questions in a disagreement',
    'Let people reach conclusions themselves',
    'Avoid questions that are really arguments in disguise',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Rewind: Miracle and Mama',
      before: {
        label: 'Telling',
        text: '"Mama, Lagos is safe. Lots of people live there. The company has funding. You\'re worrying for nothing. You need to stop worrying."',
      },
      after: {
        label: 'Asking',
        text: '"Mama, what would you need to know to feel okay about Lagos? ... What if you could meet the founder on a video call? ... What would make you feel I\'m looked after?"',
      },
      notes: [
        'Telling dismisses her worry: "for nothing", "stop worrying".',
        'Asking invites her to name exactly what she needs.',
        'Her answers become the plan, so it\'s partly hers.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Why asking works:</strong> people tend to trust conclusions they reach themselves more than conclusions handed to them. A good question lets Mama think it through, and an answer she gives is one she's more likely to stand behind.</p><p><strong>Careful: fake questions.</strong> \"Don't you think you're overreacting?\" is a statement wearing a question mark. Real questions are open and curious: <em>What</em>, <em>How</em>, <em>What would it take</em>.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Ask open, curious questions. Let them name what they need. Avoid arguments wearing question marks.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Rewind.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "You\'re worrying for nothing" make Mama worry more?',
        options: [
          { text: 'It dismissed her worry instead of taking it seriously' },
          { text: 'It was too quiet', why: 'Volume wasn\'t the issue.' },
          { text: 'It had too many facts', why: 'The facts were fine. The dismissal wasn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real question, or fake question?',
        groups: ['Real question', 'Fake question'],
        items: [
          { text: 'What would help you feel okay about it?', group: 0 },
          { text: 'Don\'t you think you\'re overreacting?', group: 1 },
          { text: 'What worries you most?', group: 0 },
          { text: 'Isn\'t it obvious Lagos is fine?', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s asking conversation in order.',
        lines: ['"What would you need to know to feel okay?"', 'Listen to Mama\'s answer.', '"What if you could meet the founder on a video call?"', '"What would make you feel I\'m looked after?"'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Mama said: "I\'d want to speak to the boss myself." Isn\'t that a bit much?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, refuse.', why: 'She just told you exactly what she needs.' },
          { text: 'Pretend to be the boss.', why: 'Absolutely not.' },
          { text: 'It\'s a clear, doable request, and it came from her. Set up the video call.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People tend to trust conclusions they reach ___. (one word)',
        answers: ['themselves', 'alone'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What makes a question a "fake question"?',
        options: [
          { text: 'It starts with "What"', why: '"What" questions are usually real ones.' },
          { text: 'It\'s too short', why: 'Length isn\'t the issue.' },
          { text: 'It\'s really an argument or judgement with a question mark at the end' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s questions for Papa. Which is a fake question?',
        lines: [
          'What would make you feel more sure about the company?',
          'Why can\'t you just trust me for once?',
          'How did you decide on your first job?',
        ],
        bug: 1,
        fix: 'What would help you trust this decision?',
        explanation: '"Why can\'t you just..." is a complaint. Open "what" and "how" questions invite real answers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Position', '"Take the bank job"'],
          ['Interest', 'Wanting her safe'],
          ['Open question', '"What would help?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s question.',
        template: 'Mama, [[1]] would you need to [[2]] to feel [[3]] about Lagos?',
        blanks: [['what'], ['know', 'see'], ['okay', 'better', 'safe']],
        distractors: ['why', 'stop'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an open question.',
        tiles: ['What', 'would', 'help', 'you', 'feel', 'okay?'],
        distractors: ['Don\'t', 'overreacting'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you\'ve been "telling" someone that isn\'t landing. Rewrite it as one open question.',
    starters: ['I\'ve been telling them...', 'My question instead: ...'],
  },
  deepen: {
    title: 'Three questions before one statement',
    summary: 'In your next disagreement, ask three genuine "what" or "how" questions before you make a single statement of your own view. Notice what you learn, and how the other person softens.',
  },
  notes: 'Self-generated conclusions and open questions: grounded in motivational interviewing practice and self-persuasion research (e.g. Aronson); stated with "tend to". Fake/leading questions are a standard communication pitfall.',
};

export default lesson;

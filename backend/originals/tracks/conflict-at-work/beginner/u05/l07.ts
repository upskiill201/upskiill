import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Myth or Fact: boundary myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Boundary myths',
  summary: 'Grace worries boundaries make her selfish. Femi thinks you can\'t have them with a boss. Priya, the manager, has a view. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop beliefs that stop you setting boundaries',
    'See clear limits as kind, not selfish',
    'Know that boundaries with managers are normal',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Setting boundaries is selfish.',
          isFact: false,
          explain: 'Myth. Grace working until 10 p.m. put the launch at risk. Clear limits protect your work and the people who depend on it.',
        },
        {
          text: 'Clear is kind; unclear is unkind.',
          isFact: true,
          explain: 'Fact, as Brené Brown puts it. Vague yeses and silent overload leave others guessing. Saying your limit clearly is kinder.',
        },
        {
          text: 'You can\'t set boundaries with your manager.',
          isFact: false,
          explain: 'Myth. "Which should move to make room?" is a boundary. Good managers want to know your capacity.',
        },
        {
          text: 'A boundary only works if you keep it.',
          isFact: true,
          explain: 'Fact. If Grace lends the car anyway when Jayden doesn\'t ask, the boundary disappears. Keep it calmly, every time.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Clear is kind. Boundaries protect your work and your relationships, and they only work if you keep them.',
    },
  ],
  apply: {
    scenario: 'Boundary myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Boundaries are selfish', group: 0 },
          { text: 'Clear is kind', group: 1 },
          { text: 'No boundaries with managers', group: 0 },
          { text: 'Boundaries only work if kept', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Grace\'s lack of boundaries a risk to others?',
        options: [
          { text: 'Overload put the launch work at risk' },
          { text: 'It wasn\'t', why: 'Tired people make mistakes.' },
          { text: 'It annoyed Priya', why: 'It risked the work.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'I can\'t tell my manager no. She\'d hate me.',
        prompt: "Priya's best reply?",
        options: [
          { text: 'As a manager: I\'d much rather hear "I\'m at capacity, what should move?" than find out later. Ask it that way.' },
          { text: 'Yes, never say no to managers.', why: 'A kind boundary helps managers.' },
          { text: 'Just stop answering her.', why: 'That\'s not a boundary.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Boundaries are selfish"', 'They protect the work'],
          ['"Not with managers"', 'Managers want honest capacity'],
          ['"Say it once and done"', 'Keep it every time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Brené Brown\'s line.',
        template: 'Clear is [[1]]. Unclear is [[2]].',
        blanks: [['kind'], ['unkind']],
        distractors: ['rude', 'safe'],
      },
      {
        kind: 'mcq',
        prompt: 'What happens if Grace lends the car anyway when Jayden doesn\'t ask?',
        options: [
          { text: 'The boundary disappears and he learns it wasn\'t real' },
          { text: 'He asks next time', why: 'He learns asking isn\'t needed.' },
          { text: 'Nothing', why: 'Unkept boundaries vanish.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Grace\'s old notes is a myth?',
        lines: [
          'Clear is kind.',
          'Keep the boundary calmly.',
          'Saying no makes me a bad colleague.',
          'Managers want to know my capacity.',
        ],
        bug: 2,
        fix: 'Saying no kindly makes me a reliable colleague.',
        explanation: 'Overload, not honesty, is what lets people down.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Whose phrase is "Clear is kind"? Type her surname.',
        answers: ['Brown', 'brown', 'Brené Brown', 'Brene Brown'],
        placeholder: 'A surname',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeping the boundary, or dropping it?',
        groups: ['Keeping', 'Dropping'],
        items: [
          { text: 'Keys stay with Grace that week', group: 0 },
          { text: '"Oh fine, take it."', group: 1 },
          { text: 'Not replying after 7 p.m.', group: 0 },
          { text: 'Answering at midnight "just this once"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how a boundary becomes real.',
        lines: ['Decide it', 'Say it clearly and kindly', 'Keep it calmly', 'Keep it again next time'],
      },
    ],
  },
  reflect: {
    prompt: 'Which boundary myth has stopped you? What would "clear is kind" look like for you this week?',
    starters: ['I believed...', 'Clear and kind would be...'],
  },
  deepen: {
    title: 'Clear is kind',
    summary: 'In Dare to Lead (2018), Brené Brown argues that avoiding clear conversations, to be "nice", usually causes more harm. Being clear about limits and expectations is a form of respect.',
  },
  notes: 'Brown, Dare to Lead (2018): "Clear is kind. Unclear is unkind." Myth/fact synthesis.',
};

export default lesson;

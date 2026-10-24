import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: misunderstanding myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Misunderstanding myths',
  summary: 'Jayden says "if someone\'s upset, they\'ll tell you". Grace used to think asking "what did you mean?" was confrontational. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop beliefs that keep misunderstandings alive',
    'See checking as a kindness, not a challenge',
    'Know that most misunderstandings are nobody\'s fault',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If someone is upset with you, they\'ll tell you.',
          isFact: false,
          explain: 'Myth. Many people go quiet instead, like Grace did. Silence is often the first sign of a misunderstanding.',
        },
        {
          text: 'Asking "what did you mean?" is confrontational.',
          isFact: false,
          explain: 'Myth, if asked lightly. "Just checking I read that right" shows you care about getting it right.',
        },
        {
          text: 'Most workplace misunderstandings involve nobody behaving badly.',
          isFact: true,
          explain: 'Fact. Femi wasn\'t rude and Grace wasn\'t paranoid. A short message, a stressful week and no tone did the rest.',
        },
        {
          text: 'Saying what you heard back to someone helps you both understand.',
          isFact: true,
          explain: 'Fact. Paraphrasing catches mistakes early and shows the other person you were listening.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Most misunderstandings are no one\'s fault. Checking is a kindness, not a challenge.',
    },
  ],
  apply: {
    scenario: 'Misunderstanding myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Upset people always tell you', group: 0 },
          { text: 'Asking what they meant is confrontational', group: 0 },
          { text: 'Most misunderstandings are no one\'s fault', group: 1 },
          { text: 'Paraphrasing helps both sides', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s often the first sign of a misunderstanding?',
        options: [
          { text: 'A loud argument', why: 'Often it starts with silence.' },
          { text: 'A thank-you note', why: 'Silence is the usual first sign.' },
          { text: 'Someone going quiet' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Mum, if Femi was upset he\'d just say so.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You\'re right.', why: 'Many people go quiet.' },
          { text: 'Would you? You go quiet when you\'re annoyed with me. Lots of people do. That\'s why I check now.' },
          { text: 'What would you know?', why: 'Unkind, and he has a point to learn from.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"They\'d tell me"', 'Many go quiet'],
          ['"Asking is confrontational"', 'Asking lightly is kind'],
          ['"Someone must be to blame"', 'Usually no one is'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Checking is a [[1]], not a [[2]].',
        blanks: [['kindness'], ['challenge']],
        distractors: ['weakness', 'gift'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does it help to believe most misunderstandings are no one\'s fault?',
        options: [
          { text: 'So nobody ever apologises', why: 'You can still repair the impact.' },
          { text: 'It doesn\'t help', why: 'It lowers defensiveness.' },
          { text: 'You can fix it together without anyone defending themselves' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which belief in Grace\'s old notes is a myth?',
        lines: [
          'Tone gets lost in writing.',
          'Paraphrasing helps.',
          'If Femi\'s upset, he\'ll tell me himself.',
          'Most misunderstandings are no one\'s fault.',
        ],
        bug: 2,
        fix: 'If it feels off, I\'ll check lightly.',
        explanation: 'Many people go quiet instead.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days did Grace and Femi\'s cold war last?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'A kind check, or a challenge?',
        groups: ['Kind check', 'Challenge'],
        items: [
          { text: '"Just checking I read that right."', group: 0 },
          { text: '"Explain yourself."', group: 1 },
          { text: '"Did I upset you earlier?"', group: 0 },
          { text: '"Why would you write that?"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good response to someone going quiet.',
        lines: ['Notice the silence', 'Don\'t assume the worst', 'Check in lightly, privately', 'Listen to the answer'],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life goes quiet when something\'s wrong? How could you check in lightly?',
    starters: ['When ... goes quiet...', 'I could say...'],
  },
  deepen: {
    title: 'Assume good intent, then check',
    summary: 'Many teams use "assume positive intent" as a rule. It works best paired with checking: assume the best, then ask, so you don\'t replace one guess with another.',
  },
  notes: 'Myth/fact synthesis from Difficult Conversations (Stone, Patton & Heen) and active-listening research.',
};

export default lesson;

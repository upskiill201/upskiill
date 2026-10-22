import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: why "next year" happens. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Why "next year" happens to everyone',
  summary: 'Sunday. Miracle and her dad go through his numbers. He isn\'t careless; he\'s like most people. Why do so many of us put off long-term saving, and what breaks the cycle?',
  minutes: 12,
  outcomes: [
    'Explain why people delay long-term saving',
    'Recognise the same patterns in yourself',
    'Use the three things that break the cycle',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Dad\'s 35 "next years"',
      html: '<p>On the video call, Dad is honest. "Every January I said: this is the year. Then the school fees came. Then your mother\'s medicine. Then the roof. And retirement felt like a problem for an old man. I wasn\'t an old man."</p><p>Dad\'s story isn\'t unusual. Research points to a few reasons almost everyone delays:</p><ul><li><strong>Now feels urgent; later feels far.</strong> Present bias (from How to Save Money on a Low Income): today\'s needs always seem bigger than a retirement 30 years away.</li><li><strong>Future-you feels like a stranger.</strong> It\'s hard to sacrifice for someone you can\'t picture.</li><li><strong>No system.</strong> Saving depended on deciding, every month, to do it. Most months something else won.</li><li><strong>"I\'ll catch up later."</strong> People expect to earn more later and save then. Later usually brings bigger costs too.</li></ul><p><strong>What breaks the cycle:</strong></p><ol><li><strong>Automate it.</strong> Money that leaves on payday never has to win a monthly argument. Workplace pensions work this way, which is why they\'re so powerful.</li><li><strong>Start small, now.</strong> 5% this month beats 20% "next year". It can grow with every raise.</li><li><strong>Make future-you real.</strong> A specific picture: "60-year-old Miracle, in a house in Buea, helping her nieces with school fees." Specific futures get saved for.</li></ol>',
    },
    {
      kind: 'check',
      question: 'Why does automatic saving break the "next year" cycle?',
      options: ['It earns more interest', 'It\'s compulsory', 'It doesn\'t need a monthly decision that something else can win'],
      answer: 2,
      explanation: 'When saving happens by default, "next year" has nothing to delay.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'We delay because now feels bigger, future-us feels distant, and there\'s no system. Automate it, start small now, and make future-you real.',
    },
  ],
  apply: {
    scenario: 'Dad\'s "next years".',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each reason to its description.',
        pairs: [
          ['Present bias', 'Today\'s needs feel bigger'],
          ['Future self as a stranger', 'Hard to sacrifice for someone you can\'t picture'],
          ['No system', 'Saving depends on deciding every month'],
          ['"Catch up later"', 'Expecting to save more when you earn more'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the "next year" cycle going, or breaks it?',
        groups: ['Keeps it going', 'Breaks it'],
        items: [
          { text: 'Automatic saving on payday', group: 1 },
          { text: 'Deciding each month whether to save', group: 0 },
          { text: 'A specific picture of future-you', group: 1 },
          { text: '"I\'ll save more when I earn more"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Was Dad careless?',
        options: [
          { text: 'Yes, totally', why: 'He paid for school fees, medicine and a roof.' },
          { text: 'No: he faced the same pulls everyone does, with real costs every year' },
          { text: 'He didn\'t care about the future', why: 'He cared; the system was missing.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Papa, it\'s not your fault. But it\'s not too late to do something. Can we make a plan?',
        prompt: 'Why is this a good thing to say?',
        options: [
          { text: 'It\'s untrue', why: 'He wasn\'t careless; and it isn\'t too late.' },
          { text: 'It\'s pointless', why: 'A plan at 59 still matters.' },
          { text: 'It removes blame and moves straight to action' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The three breakers.',
        template: '[[1]] it, start [[2]] now, make future-you [[3]].',
        blanks: [['Automate'], ['small'], ['real']],
        distractors: ['Delay', 'big'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle could start with 5% extra of her ₦900,000. How much a month?',
        answers: ['45000', '45,000', '₦45,000', '₦45000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which plan is "next year" in disguise?',
        lines: [
          'Set up an automatic transfer this Friday.',
          'Start with 5% and raise it with every raise.',
          'Start saving properly once my staff loan is fully paid in two years.',
        ],
        bug: 2,
        fix: 'Start small now, alongside paying the loan.',
        explanation: '"Once X is done" usually becomes "once Y is done" too.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do workplace pensions work so well against delay?',
        options: [
          { text: 'They\'re taken from pay automatically, before you decide' },
          { text: 'They\'re always the best investment', why: 'It\'s about automation.' },
          { text: 'They don\'t work', why: 'Automatic enrolment raises saving a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Miracle\'s plan to avoid Dad\'s path.',
        lines: ['Check her pension', 'Automate extra saving on payday', 'Start small and raise it with raises', 'Write a picture of 60-year-old Miracle'],
      },
      {
        kind: 'mcq',
        prompt: 'What picture of future-you is most likely to get saved for?',
        options: [
          { text: '"Being comfortable someday"', why: 'Too vague to feel real.' },
          { text: 'No picture at all', why: 'Then future-you stays a stranger.' },
          { text: 'A specific one: a place, an age, people, what you\'re doing' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Describe 60-year-old you in three specific sentences. Where are you? What are you doing? Who\'s with you?',
    starters: ['I\'m in...', 'I\'m...', 'With...'],
  },
  deepen: {
    title: 'Automatic enrolment',
    summary: 'When employers enrol workers in pensions automatically (with the option to leave), participation rises dramatically compared with asking people to opt in. Madrian and Shea (2001) found this in a classic study, and several countries now use automatic enrolment nationally.',
  },
  notes: 'Madrian, B. C., & Shea, D. F. (2001). The power of suggestion. QJE. UK auto-enrolment (2012–). Present bias / future self as in Course 2.',
};

export default lesson;

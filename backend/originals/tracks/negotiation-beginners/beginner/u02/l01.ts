import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: "What's your walk-away?" */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"What\'s your walk-away?"',
  summary: 'Mr Adeyemi agrees to meet on Saturday. Ada is ready to "just talk". Then Lucía asks three questions Ada can\'t answer, and the meeting suddenly feels very close.',
  minutes: 11,
  outcomes: [
    'See why "just talking" isn\'t preparation',
    'Know the questions to answer before a negotiation',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Three questions',
      beats: [
        { speaker: 'ada', text: 'He said yes to Saturday! I\'ll just go and talk to him.' },
        { speaker: 'lucia', text: 'Great. Three questions. What rent do you want? What\'s the most you\'d pay before you move?' },
        { speaker: 'lucia', text: 'And if you moved, where would you go, and what would it cost?' },
        { speaker: 'ada', text: '...I want it lower. I don\'t know the most. And I haven\'t looked at other flats.' },
        { speaker: 'lucia', text: 'Then on Saturday, he\'s prepared and you\'re guessing. Guessers agree to the first number they hear.' },
        { speaker: 'tey', text: 'This chapter: set a goal, find the reasons behind it, know your walk-away and your alternative, and understand his side.' },
      ],
      choice: {
        prompt: 'Ada has three days. What should she do first?',
        options: [
          { text: 'Look at what similar flats nearby cost, and what moving would really cost', outcome: 'Right. Facts first. Every other number comes from them.', best: true },
          { text: 'Practise sounding confident in the mirror', outcome: 'Confidence helps, but without facts she\'ll still guess.' },
          { text: 'Decide to offer ₦1,000,000 and see what happens', outcome: 'A number with no reason behind it. He\'ll laugh, and she won\'t know why.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before any important negotiation, answer three questions: what do I want, what\'s the most (or least) I\'ll accept, and what will I do if we don\'t agree?',
    },
  ],
  apply: {
    scenario: 'Lucía\'s three questions.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s three questions.',
        lines: ['What rent do you want?', 'What\'s the most you\'d pay?', 'What would you do if you moved?'],
      },
      {
        kind: 'mcq',
        prompt: 'What happens to people who negotiate without preparing?',
        options: [
          { text: 'They get better deals', why: 'Usually the opposite.' },
          { text: 'They tend to accept the first number they hear' },
          { text: 'Nothing different', why: 'Preparation changes the result.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Preparation, or not really?',
        groups: ['Preparation', 'Not really'],
        items: [
          { text: 'Checking what similar flats cost', group: 0 },
          { text: 'Hoping he\'s in a good mood', group: 1 },
          { text: 'Working out the cost of moving', group: 0 },
          { text: 'Deciding to "just talk"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Isn\'t it a bit cold to plan a talk with someone I like?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, don\'t plan.', why: 'Unprepared people panic and give in.' },
          { text: 'Plan to beat him.', why: 'The plan is for a fair deal.' },
          { text: 'Planning is respect. You\'ll be calmer, kinder and clearer if you know your numbers.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it\'s called in this chapter.',
        pairs: [
          ['What do I want?', 'Your goal'],
          ['What\'s the most I\'ll pay?', 'Your walk-away'],
          ['What will I do if we don\'t agree?', 'Your alternative'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Facts first.',
        template: 'Every number you use should come from [[1]], not from a [[2]].',
        blanks: [['facts', 'research'], ['guess']],
        distractors: ['feelings', 'friend'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days does Ada have to prepare before Saturday?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is offering ₦1,000,000 "to see what happens" a weak plan?',
        options: [
          { text: 'It\'s too high', why: 'It\'s very low, with no facts behind it.' },
          { text: 'It has no reason behind it, so it\'s easy to dismiss' },
          { text: 'It\'s a strong plan', why: 'Numbers need reasons.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s plan is the mistake?',
        lines: [
          'Check three similar flats nearby.',
          'Work out what moving would cost.',
          'Decide my walk-away when I\'m in the room.',
          'Think about what he needs.',
        ],
        bug: 2,
        fix: 'Decide my walk-away before Saturday.',
        explanation: 'In the room, under pressure, she\'ll move it.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Ada\'s side or his side?',
        groups: ['Ada\'s side', 'His side'],
        items: [
          { text: 'What she can afford', group: 0 },
          { text: 'How long an empty flat costs him', group: 1 },
          { text: 'Where she\'d move', group: 0 },
          { text: 'Why he wants more', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a negotiation coming up in your life, can you answer Lucía\'s three questions? Which is hardest?',
    starters: ['I want...', 'The hardest question is...'],
  },
  deepen: {
    title: 'Preparation is most of it',
    summary: 'Many negotiation teachers say most of a negotiation\'s outcome is decided before anyone speaks. Prepared people anchor better, concede less and walk away when they should.',
  },
  notes: 'Fictional: meeting with Mr Adeyemi on Saturday. Three-question preparation (target, reservation point, BATNA) follows standard negotiation teaching (Fisher & Ury; Thompson, The Mind and the Heart of the Negotiator).',
};

export default lesson;

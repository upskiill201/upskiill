import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 13 — family pressure and comparison. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: '"So, have you got a job yet?"',
  summary: 'Clinton\'s uncle asks at Sunday lunch, in front of everyone. Then a classmate posts "Thrilled to announce..." Tey helps Clinton handle other people\'s questions, and other people\'s highlights.',
  minutes: 11,
  outcomes: ['Answer family questions calmly', 'Limit comparison with others online', 'Ask the people around you for the help you actually want'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Family usually ask because they care, even when it doesn\'t feel like it. Having a short answer ready helps. Want one?',
          replies: ['Yes please'],
        },
        {
          tey: 'Something like: "Not yet. I was close with one company, I\'ve got an offer I\'m thinking about, and I\'m working on testing." True, short, and it ends on progress.',
          replies: ['And the LinkedIn posts?'],
        },
        {
          tey: 'Posts show the offer, not the 30 noes before it. Comparison mostly drains energy. Some people mute announcements for a few weeks, or only check at set times. Do what keeps you steady.',
          replies: ['My mum keeps worrying'],
        },
        {
          tey: 'Tell her what would actually help. "Mum, I\'m OK. What helps most is if you ask about the work, not the result." People can\'t help the way you want unless you tell them.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A short, true answer that ends on progress. Fewer comparisons. Tell people what help you want.',
    },
  ],
  apply: {
    scenario: 'Sunday lunch, and a LinkedIn post.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do family members keep asking?',
        options: [
          { text: 'To embarrass you', why: 'Usually they care.' },
          { text: 'Usually because they care' },
          { text: 'No reason', why: 'They usually care, even if it\'s awkward.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s answer to his uncle in order.',
        lines: ['Not yet', 'I was close with one company', 'I have an offer I\'m considering', 'I\'m working on testing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps him steady, or drains him?',
        groups: ['Steady', 'Drains'],
        items: [
          { text: 'Muting announcements for a few weeks', group: 0 },
          { text: 'Reading every "Thrilled to announce" post', group: 1 },
          { text: 'Checking LinkedIn at set times', group: 0 },
          { text: 'Comparing salaries at midnight', group: 1 },
          { text: 'A short answer ready for family', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to his uncle.',
        from: 'clinton',
        message: 'My uncle says, "Still no job? Your cousin started at the bank last month." What do I say?',
        options: [
          { text: '"Leave me alone!"', why: 'A short, calm answer works better.' },
          { text: '"Yes, I have a great job." (untrue)', why: 'Never lie. Say the true "not yet".' },
          { text: '"Not yet. I was close with one company and I have an offer I\'m thinking about. I\'ll tell you when I decide."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unhelpful thought.',
        lines: ['Posts show the offer, not the noes before it.', 'Everyone online is doing better than me.', 'I can mute announcements for now.'],
        bug: 1,
        explanation: 'Posts are highlights. You\'re comparing your middle to their best moment.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to a good response.',
        pairs: [
          ['Uncle asks at lunch', 'Short, true, ends on progress'],
          ['A classmate\'s announcement', 'Congratulate them, then mute for a while'],
          ['Mum keeps worrying', 'Tell her what help you want'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does Clinton ask his mum for?',
        options: [
          { text: 'To ask about the work, not the result' },
          { text: 'To stop talking to him', why: 'He asks for a specific kind of help.' },
          { text: 'To find him a job', why: 'He asks her to ask about the work.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s advice.',
        template: 'Posts show the [[1]], not the noes [[2]] it.',
        blanks: [['offer'], ['before']],
        distractors: ['truth', 'after', 'salary'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete Clinton\'s first words to his uncle: "Not ___." (one word)',
        answers: ['yet'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Kind to a friend\'s good news, or not?',
        groups: ['Kind', 'Not kind'],
        items: [
          { text: 'Congratulations, well deserved!', group: 0 },
          { text: 'They probably got lucky', group: 1 },
          { text: 'A quick congratulations, then mute for a while', group: 0 },
          { text: 'Leave a jealous comment', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life asks the questions that sting? What short answer could you give them, and what help could you ask for?',
    starters: ['They ask...', 'I could say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your short, true "not yet" answer for family. Then tell one person close to you what kind of support you actually want.',
  },
  notes: 'Family expectations around first jobs are strong in many cultures; the advice is about calm, honest answers and asking for specific support.',
};

export default lesson;

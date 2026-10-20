import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: the 14 new features. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The 14 new features',
  summary: 'Monday. Harlow & Finch likes option B, the core app in 12 weeks. Then Ms Okafor-Lane sends "a few small additions": 14 of them, same price, same date.',
  minutes: 11,
  outcomes: [
    'Recognise an unreasonable request disguised as a small one',
    'See the cost of saying yes to everything',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: '"A few small additions"',
      beats: [
        { speaker: 'narrator', text: 'Monday, 4 p.m. Ms Okafor-Lane: "We love option B! Just a few small additions for launch." Attached: 14 features.' },
        { speaker: 'kavya', text: 'Birthday rewards. Gift cards. A referral scheme. A staff dashboard. Fourteen. That\'s another two months of work.' },
        { speaker: 'joel', text: 'But she was so nice on the call. Can\'t we squeeze them in?' },
        { speaker: 'arjun', text: 'If we say yes to all 14 for the same price and date, we miss the date, or we work every night for free.' },
        { speaker: 'grace', text: 'Then don\'t say yes or no yet. Find out which ones matter for the spring launch.' },
        { speaker: 'tey', text: 'This chapter: yes, no or yes-if; saying no kindly; trade-offs; scope creep; and a simple change-request process.' },
      ],
      choice: {
        prompt: 'How should Arjun reply first?',
        options: [
          { text: '"Thanks for these! Could we have 20 minutes to sort them into must-have for spring and nice-to-have later?"', outcome: 'Good. He doesn\'t say yes or no; he starts sorting, together.', best: true },
          { text: '"Sure, we\'ll fit them all in."', outcome: 'That\'s about eight extra weeks of work, unpaid, against a fixed date.' },
          { text: '"No. The scope was agreed."', outcome: 'True, but it shuts down someone who matters to the deal.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A request isn\'t "small" because someone calls it small. Find out what it costs before you answer.',
    },
  ],
  apply: {
    scenario: 'Fourteen features.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many extra features did Ms Okafor-Lane ask for?',
        answers: ['14', 'fourteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What happens if Arjun says yes to all 14 at the same price and date?',
        options: [
          { text: 'They miss the date, or the team works for free' },
          { text: 'Everyone is happy', why: 'Until the date slips.' },
          { text: 'Nothing changes', why: 'It\'s roughly two more months of work.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first reply or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: '"Let\'s sort them into must-have and later."', group: 0 },
          { text: '"Sure, all 14!"', group: 1 },
          { text: '"Which ones matter most for spring?"', group: 0 },
          { text: '"No, the scope is closed."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'She was nice to us. Saying no feels mean.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Not saying no to her, just to doing two months of work for free. You can be kind and still say what it costs.' },
          { text: 'Then say yes to everything.', why: 'That fails the launch and the team.' },
          { text: 'Be mean then.', why: 'Kind and clear, not mean.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reply to what it leads to.',
        pairs: [
          ['Yes to all', 'Missed date or unpaid work'],
          ['Flat no', 'A shut door with someone important'],
          ['Sort them together', 'A plan both can accept'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s advice.',
        template: 'Don\'t say yes or no [[1]]. Find out which ones [[2]].',
        blanks: [['yet'], ['matter']],
        distractors: ['ever', 'sparkle'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "a few small additions" misleading?',
        options: [
          { text: 'Calling them small doesn\'t make them small: together they\'re about two months\' work' },
          { text: 'They are small', why: 'Kavya estimated two months.' },
          { text: 'It isn\'t misleading', why: 'The label hides the real size.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Joel\'s draft reply causes trouble?',
        lines: [
          'Thanks for sending these over!',
          'No problem, we\'ll include them all.',
          'Could we have a quick call this week?',
          'We want the spring launch to go well.',
        ],
        bug: 1,
        fix: 'Let\'s sort them into must-have and later.',
        explanation: 'It agrees to two months of unpaid work.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter teaches.',
        lines: ['Yes, no or yes-if', 'Saying no kindly', 'Trade-offs', 'Scope creep', 'Change requests'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks is option B?',
        answers: ['12', 'twelve'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "small" request that turned out big. How could you have found the real size first?',
    starters: ['The request was...', 'I could have asked...'],
  },
  deepen: {
    title: 'Unreasonable requests',
    summary: 'Most unreasonable requests aren\'t meant to be unreasonable. People don\'t know what things cost. Your job is to show them the cost kindly, and offer a choice.',
  },
  notes: 'Fictional: 14 added features (birthday rewards, gift cards, referrals, staff dashboard, etc.), ~2 months extra work by Kavya\'s estimate; option B core app, 12 weeks.',
};

export default lesson;

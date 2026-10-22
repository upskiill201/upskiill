import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: the final meeting. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The final meeting',
  summary: 'Wednesday. Ms Okafor-Lane wants the app. Mr Pryce wants a saving he can report. Arjun wants a deal that beats Kinwell. Pryce opens: "£37,000, and we\'re done." It\'s exactly Arjun\'s walk-away.',
  minutes: 11,
  outcomes: [
    'See that a deal at your walk-away isn\'t a good deal',
    'Notice what each side needs to say yes',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 2 p.m. UK',
      beats: [
        { speaker: 'narrator', text: 'Ms Okafor-Lane: "We want you. The board wants you. Let\'s finish this today."' },
        { speaker: 'narrator', text: 'Mr Pryce: "£37,000 for phase one, and we\'re done. That\'s a big move from £35,000."' },
        { speaker: 'joel', text: '(in the team chat) That\'s our walk-away! Take it!' },
        { speaker: 'kavya', text: '(in the team chat) At the walk-away we\'re only just better off than Kinwell. That\'s not a win.' },
        { speaker: 'grace', text: '(earlier that morning) She also said they need help through the spring sale. Don\'t forget that.' },
        { speaker: 'tey', text: 'This chapter: package the deal, put it in writing, help both sides save face, repair after a hard round, and start well.' },
      ],
      choice: {
        prompt: 'What should Arjun say?',
        options: [
          { text: '"Thank you, that\'s a real move. Can I suggest a package: phase one plus support through the spring sale?"', outcome: 'Good. He adds value they need instead of haggling over £37,000.', best: true },
          { text: '"Deal!"', outcome: 'Barely better than Kinwell, and they\'ll need support in spring that isn\'t paid for.' },
          { text: '"No. £48,000 or nothing."', outcome: 'Back to the start, after weeks of progress.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A deal at your walk-away is acceptable, not good. Before you agree, look for value you can add for both sides.',
    },
  ],
  apply: {
    scenario: 'The final meeting.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'At £37,000 with £25,000 costs, how much does Arjun keep, in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is £37,000 "acceptable, not good"?',
        options: [
          { text: 'It\'s below his walk-away', why: 'It\'s exactly at it.' },
          { text: 'It only matches what he\'d keep at Kinwell' },
          { text: 'It\'s a great deal', why: 'It\'s just level with his BATNA.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to what they need to say yes.',
        pairs: [
          ['Ms Okafor-Lane', 'The app live, with help through spring'],
          ['Mr Pryce', 'A saving he can report'],
          ['Arjun', 'A deal that beats Kinwell'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Adding value, or haggling?',
        groups: ['Adding value', 'Haggling'],
        items: [
          { text: 'Offer support through the spring sale', group: 0 },
          { text: '"£38,000?" "£37,500?"', group: 1 },
          { text: 'A phase-two review after launch', group: 0 },
          { text: 'Arguing over £500', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'It\'s our walk-away. Why not just take it?',
        prompt: "Kavya's best reply?",
        options: [
          { text: 'You\'re right, take it.', why: 'There\'s value left on the table.' },
          { text: 'Walk out now.', why: 'There\'s a better deal to find.' },
          { text: 'At the walk-away we\'re no better off than Kinwell. And they need spring support. Let\'s package that in.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A deal at your walk-away is [[1]], not [[2]].',
        blanks: [['acceptable'], ['good']],
        distractors: ['illegal', 'secret'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace remind Arjun about?',
        options: [
          { text: 'Harlow & Finch needs help through the spring sale' },
          { text: 'To ask for £48,000 again', why: 'She pointed to an unmet need.' },
          { text: 'To be tougher', why: 'She pointed to value.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Joel\'s team-chat advice is the mistake?',
        lines: [
          'They\'ve moved from £35,000 to £37,000.',
          'Ms Okafor-Lane wants to finish today.',
          'So take it before they change their minds.',
          'They also need spring support.',
        ],
        bug: 2,
        fix: 'So package in the spring support.',
        explanation: 'Rushing at the walk-away leaves value behind.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter teaches.',
        lines: ['Package the deal', 'Put it in writing', 'Help both sides save face', 'Repair after a hard round', 'Start well'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did Pryce move, from £35,000 to £37,000, in pounds?',
        answers: ['2000', '2,000', '£2,000'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a deal you accepted right at your limit. Was there value you could have added for both sides?',
    starters: ['I accepted...', 'I could have added...'],
  },
  deepen: {
    title: 'Don\'t stop at "acceptable"',
    summary: 'Research on negotiations often finds deals that leave joint value unclaimed. When you reach a number both can accept, it\'s worth one more question: is there anything that would make this better for both of us?',
  },
  notes: 'Fictional: Pryce offers £37,000 (Arjun\'s walk-away); costs £25,000; Ms Okafor-Lane needs support through the spring sale.',
};

export default lesson;

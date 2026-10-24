import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: deadlines and exploding offers. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Deadlines and exploding offers',
  summary: '"Answer by Friday, or we go elsewhere." Joel wants to say yes by Thursday morning. Kavya wants to ignore it. Arjun tries a third way: test the deadline.',
  minutes: 12,
  outcomes: [
    'Recognise artificial deadlines and exploding offers',
    'Test a deadline with questions',
    'Avoid rushed concessions',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Racing the deadline vs testing it',
      before: {
        label: 'Racing it',
        text: '"Friday! We\'d better accept before we lose it."\nThe team rushes.\nNobody checks if Friday is real.\nThey give away scope and price to beat the clock.',
      },
      after: {
        label: 'Testing it',
        text: '"Thanks. What\'s driving Friday? Is it the board meeting, or the spring launch plan?"\nPryce: "Er... finance closes the quarter\'s approvals next week."\nSo the real deadline is next week, and the real driver is the launch.\nArjun sends options on Thursday, as planned, with no panic.',
      },
      notes: [
        'An exploding offer is one that expires fast to stop you comparing.',
        'Research suggests people under time pressure tend to concede more and explore less.',
        'Ask what\'s behind the date. Real deadlines have reasons; artificial ones get vague.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Test a deadline before you race it: "What\'s driving that date?" Real deadlines have reasons.',
    },
  ],
  apply: {
    scenario: 'Friday.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Racing the deadline or testing it?',
        groups: ['Racing', 'Testing'],
        items: [
          { text: '"Accept before we lose it!"', group: 0 },
          { text: '"What\'s driving Friday?"', group: 1 },
          { text: 'Cutting the price to finish faster', group: 0 },
          { text: 'Asking what happens if it slips', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is an exploding offer?',
        options: [
          { text: 'A very high offer', why: 'It\'s about time, not size.' },
          { text: 'An offer that changes every day', why: 'It\'s about a short expiry.' },
          { text: 'An offer that expires quickly so you can\'t compare it with others' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it reveals.',
        pairs: [
          ['"What\'s driving Friday?"', 'The real reason'],
          ['"What happens if we need till Monday?"', 'Whether the date is firm'],
          ['"Who decides on Friday?"', 'Who has the real authority'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'If we miss Friday, it\'s gone!',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'You\'re right, accept £30,000 now.', why: 'That\'s exactly what the deadline is for.' },
          { text: 'We\'re sending options on Thursday. And the real driver is the spring launch, which still needs a team. Let\'s not panic.' },
          { text: 'Ignore Friday completely.', why: 'Answer calmly and on time.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'Real deadlines have [[1]]. Artificial ones get [[2]].',
        blanks: [['reasons'], ['vague']],
        distractors: ['flowers', 'louder'],
      },
      {
        kind: 'mcq',
        prompt: 'What does research suggest about time pressure?',
        options: [
          { text: 'It always helps everyone', why: 'It usually narrows thinking.' },
          { text: 'It has no effect', why: 'It changes behaviour.' },
          { text: 'People under time pressure tend to concede more and explore less' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day will Arjun send his options?',
        answers: ['Thursday', 'thursday'],
        placeholder: 'A day',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the team\'s plan races the deadline?',
        lines: [
          'Ask what\'s driving Friday.',
          'Send options on Thursday as planned.',
          'Drop the price tonight so we don\'t miss it.',
          'Keep the spring launch at the centre.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A rushed price cut is what the deadline is designed to get.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Probably real deadline, or probably artificial?',
        groups: ['Real', 'Artificial'],
        items: [
          { text: 'The spring sale starts in March', group: 0 },
          { text: '"Decide in the next hour or the price doubles"', group: 1 },
          { text: 'Finance approvals close next week', group: 0 },
          { text: '"This offer is only for today" with no reason', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to handle a deadline.',
        lines: ['Notice the pressure', 'Ask what\'s driving the date', 'Check if it\'s firm', 'Answer on your own plan'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a deadline that pushed you into a quick decision. Was it real? What could you have asked?',
    starters: ['The deadline was...', 'I could have asked...'],
  },
  deepen: {
    title: 'Time pressure',
    summary: 'A meta-analysis by Alice Stuhlmacher and colleagues (1998) found time pressure changes how people negotiate: more concessions, less exploration. Slowing down is often worth more than speed.',
  },
  notes: 'Stuhlmacher, Gillespie & Champagne (1998), "The impact of time pressure in negotiation: A meta-analysis", International Journal of Conflict Management 9(2). Exploding offers: Malhotra, Negotiating the Impossible (2016), and Harvard PON. Fictional dialogue.',
};

export default lesson;

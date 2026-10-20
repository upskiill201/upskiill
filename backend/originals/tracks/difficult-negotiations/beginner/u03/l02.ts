import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Before/After: yes, no, or yes-if. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Yes, no, or yes-if',
  summary: 'Arjun has three ways to answer the 14 features. Two of them hurt someone. The third, "yes, if", is the professional\'s answer to almost every unreasonable request.',
  minutes: 12,
  outcomes: [
    'Turn a yes-or-no request into "yes, if"',
    'Attach a cost or a trade to every extra',
    'Keep the relationship and the boundaries',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Yes or no vs yes-if',
      before: {
        label: 'Yes or no',
        text: '"Yes, we\'ll do all 14." (Team burns out, date slips.)\nor\n"No, the scope is agreed." (Ms Okafor-Lane feels blocked.)\nBoth answers treat the request as all or nothing.',
      },
      after: {
        label: 'Yes, if...',
        text: '"Yes, we can build all 14, if we either add six weeks and £12,000, or launch with the four that matter most for spring and do the other ten in phase two."\nShe gets a real choice. The team gets paid for real work. The date is protected.',
      },
      notes: [
        '"Yes, if" says yes to the goal and names the condition: more time, more money, or less scope.',
        'It hands the decision back to the person who wants the extra, with the cost visible.',
        'It works for clients, managers, family: almost any unreasonable request.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"Yes, if": yes to the goal, with the condition visible: more time, more money, or less scope.',
    },
  ],
  apply: {
    scenario: 'Yes-if.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Yes, no, or yes-if?',
        groups: ['Plain yes or no', 'Yes-if'],
        items: [
          { text: '"Sure, all 14!"', group: 0 },
          { text: '"Yes, if we add six weeks and £12,000."', group: 1 },
          { text: '"No, the scope\'s agreed."', group: 0 },
          { text: '"Yes, if four go in now and ten in phase two."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What three conditions can a "yes, if" usually offer?',
        options: [
          { text: 'More time, more money, or less scope' },
          { text: 'Yes, no or maybe', why: 'Those aren\'t conditions.' },
          { text: 'Free work, extra work or overtime', why: 'Those are costs to the team.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Six extra weeks at £2,000 a week. How much does that add, in pounds?',
        answers: ['12000', '12,000', '£12,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to a good "yes, if".',
        pairs: [
          ['All 14 features', 'Yes, if six weeks and £12,000 more'],
          ['Launch on time', 'Yes, if four now, ten in phase two'],
          ['Weekend work', 'Yes, if it\'s paid as extra time'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Why not just say no? We agreed the scope.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'A plain no makes you the obstacle. "Yes, if" makes you the helper, and she chooses what she\'s willing to pay for.' },
          { text: 'Yes, say no.', why: 'It blocks someone important.' },
          { text: 'Say yes to keep her happy.', why: 'Then the team pays.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'What yes-if does.',
        template: 'Yes to the [[1]], with the [[2]] visible.',
        blanks: [['goal'], ['condition', 'cost']],
        distractors: ['person', 'secret'],
      },
      {
        kind: 'mcq',
        prompt: 'Who decides after a "yes, if"?',
        options: [
          { text: 'The person making the request, now that they can see the cost' },
          { text: 'Nobody', why: 'They choose an option.' },
          { text: 'Only Arjun', why: 'He hands the choice back.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line spoils Arjun\'s yes-if reply?',
        lines: [
          'Yes, we can build all 14.',
          'If we add six weeks and £12,000,',
          'or launch with four now and ten in phase two.',
          'Or, honestly, we\'ll just do them all anyway.',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'It removes the condition and gives everything away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'If four features go in phase one, how many go in phase two?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a yes-if reply.',
        lines: ['Say yes to the goal', 'Name the condition', 'Offer a second option', 'Let them choose'],
      },
    ],
  },
  reflect: {
    prompt: 'Turn one request you usually say yes or no to into a "yes, if".',
    starters: ['The request:...', 'Yes, if...'],
  },
  deepen: {
    title: 'Conditional yes',
    summary: 'Linking a yes to a condition is a core negotiation skill: it turns every concession into a trade. In project work it\'s how scope, time and budget stay in balance.',
  },
  notes: 'Fictional: 14 features = ~6 extra weeks at £2,000/week = £12,000; or 4 in phase one and 10 in phase two. Conditional concessions: standard negotiation teaching (if-then linking).',
};

export default lesson;

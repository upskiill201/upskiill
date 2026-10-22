import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: "We have three other quotes." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"We have three other quotes"',
  summary: 'The board approved the budget, and Mr Pryce calls: "Three other agencies quoted around £30,000. £35,000 for phase one is our final offer. Friday." Arjun feels tiny. Grace asks one question.',
  minutes: 11,
  outcomes: [
    'Feel how a weak alternative makes you panic',
    'See that power depends on alternatives on both sides',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The squeeze',
      beats: [
        { speaker: 'narrator', text: 'Mr Pryce: "Three agencies quoted about £30,000. We\'re being generous at £35,000. Final offer. Friday."' },
        { speaker: 'joel', text: 'They\'re a giant company. We\'re three people. They have all the power.' },
        { speaker: 'arjun', text: 'Phase one costs us £25,000. At £35,000 I\'d earn £10,000 for twelve weeks. Is that... OK?' },
        { speaker: 'grace', text: 'Compared with what? What will you do if you walk away?' },
        { speaker: 'arjun', text: '...I haven\'t really thought about it. I\'ve been thinking about them.' },
        { speaker: 'tey', text: 'This chapter: where power really comes from, how to improve your alternative, test theirs, and walk away well.' },
      ],
      choice: {
        prompt: 'What should Arjun do before Friday?',
        options: [
          { text: 'Work out and improve his alternative, and find out what those "three quotes" really are', outcome: 'Right. Power comes from alternatives, on both sides.', best: true },
          { text: 'Accept £35,000 before it disappears', outcome: 'He doesn\'t know yet if that beats his alternative.' },
          { text: 'Tell Pryce he\'s bluffing', outcome: 'He might be, but saying so starts a fight he can\'t prove.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you feel powerless, ask: "What will I do if I walk away?" Your answer is your power.',
    },
  ],
  apply: {
    scenario: 'The squeeze.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Phase one costs £25,000. At £35,000, what would Arjun keep, in pounds?',
        answers: ['10000', '10,000', '£10,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What question did Grace ask?',
        options: [
          { text: '"What will you do if you walk away?"' },
          { text: '"Why are they so mean?"', why: 'She asked about his alternative.' },
          { text: '"How fast can you sign?"', why: 'She slowed him down.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Something that gives Arjun power, or not really?',
        groups: ['Gives power', 'Not really'],
        items: [
          { text: 'Another client who wants him', group: 0 },
          { text: 'Being a small team', group: 1 },
          { text: 'Their spring deadline', group: 0 },
          { text: 'Hoping they like him', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'They\'re huge. We have no power.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'You\'re right, accept.', why: 'Power depends on alternatives.' },
          { text: 'Then threaten them.', why: 'Threats without alternatives are bluffs.' },
          { text: 'Size isn\'t power. Alternatives are. They need an app by spring, and their board has seen your demo. What\'s yours if you walk?' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the claim to what Arjun should check.',
        pairs: [
          ['"Three other quotes"', 'What do they include?'],
          ['"Final offer"', 'Is it above my walk-away?'],
          ['"Friday"', 'What\'s driving the date?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s point.',
        template: 'Your [[1]] is your power. Ask: what will I do if I [[2]] away?',
        blanks: [['alternative', 'BATNA'], ['walk']],
        distractors: ['size', 'run'],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Arjun "thinking about them" a problem?',
        options: [
          { text: 'It wasn\'t a problem', why: 'Focusing only on them made him feel powerless.' },
          { text: 'He was focused on their power and forgot to look at his own alternatives' },
          { text: 'He should ignore them completely', why: 'He needs both views.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Arjun\'s notes is the panic talking?',
        lines: [
          'Phase one costs us £25,000.',
          'They offered £35,000.',
          'We have no alternative, so we must accept.',
          'Check what the other quotes include.',
        ],
        bug: 2,
        fix: 'Work out and improve our alternative.',
        explanation: 'He hasn\'t looked yet.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter teaches.',
        lines: ['Where power comes from', 'Improve your alternative', 'Test their alternatives', 'When to walk away', 'Walk away well'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many other agencies does Mr Pryce say quoted?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'In a negotiation where you felt powerless, what was your alternative? Did you know it at the time?',
    starters: ['I felt powerless when...', 'My alternative was...'],
  },
  deepen: {
    title: 'Power is relative',
    summary: 'Negotiation power isn\'t about size. It depends on how much each side needs the deal compared with their alternatives. A small team with a good alternative can be strong.',
  },
  notes: 'Fictional: Pryce cites three quotes ~£30,000; offers £35,000 for phase one, final, Friday. Phase one costs £25,000 (Kavya £7,500, Joel £7,500, till-integration contractor £6,000, devices/testing £4,000). Power and BATNA: Fisher & Ury.',
};

export default lesson;

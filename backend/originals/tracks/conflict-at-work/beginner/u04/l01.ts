import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: "Just opinions." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Just opinions"',
  summary: 'Callum, the new product manager, joins the planning meeting, glances at Grace\'s report, and says it to the whole room: "This is just opinions. Six people isn\'t research." Grace feels 18 years of experience being waved away.',
  minutes: 11,
  outcomes: [
    'Notice your reaction to criticism that feels unfair',
    'Separate the sting from the content',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday planning',
      beats: [
        { speaker: 'narrator', text: 'Callum, the new product manager, flicks through Grace\'s step 3 report in front of eight people.' },
        { speaker: 'narrator', text: '"With respect, this is just opinions. Six people isn\'t research. We can\'t delay a launch on anecdotes."' },
        { speaker: 'narrator', text: 'Grace\'s face burns. In her head: "I watched 5 of 6 of them fail. I\'m not making this up."' },
        { speaker: 'femi', text: '(quietly, to Grace, after) That was harsh. But he did say one thing I\'ve wondered too: is six enough?' },
        { speaker: 'grace', text: 'Part of me wants to fight him. Part of me wants to hide. Neither feels right.' },
        { speaker: 'tey', text: 'This chapter: your triggers, what\'s right in the criticism, responding instead of reacting, disagreeing calmly, and public criticism.' },
      ],
      choice: {
        prompt: 'What should Grace have said in the meeting?',
        options: [
          { text: '"Fair question about sample size. Can I come back to you this week with how six sessions compare with our usage data?"', outcome: 'Good. Calm, takes the real question seriously, and buys time to answer with evidence.', best: true },
          { text: '"I have 18 years of experience. I know what I saw."', outcome: 'Understandable, but it makes it about her, not the evidence.' },
          { text: 'Nothing', outcome: 'Silence lets "just opinions" stand as the room\'s view.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When criticism stings, you don\'t have to answer it fully on the spot. Take the fair part seriously, and say when you\'ll come back.',
    },
  ],
  apply: {
    scenario: '"Just opinions."',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Part of Callum\'s criticism that\'s fair, or unfair?',
        groups: ['Fair point', 'Unfair'],
        items: [
          { text: 'Six is a small number', group: 0 },
          { text: '"Just opinions"', group: 1 },
          { text: 'Is six enough to delay a launch?', group: 0 },
          { text: 'Dismissing it in front of eight people', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I have 18 years of experience" a weak reply here?',
        options: [
          { text: 'It isn\'t true', why: 'It\'s true; it just doesn\'t answer the question.' },
          { text: 'It\'s too humble', why: 'It\'s defensive.' },
          { text: 'It makes the argument about her, not the evidence' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people were in the meeting when Callum spoke?',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'He was harsh, but is six people enough?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Whose side are you on?', why: 'Femi is raising a real question.' },
          { text: 'It\'s a fair question. Small tests find most usability problems, but let me check it against our usage data too.' },
          { text: 'Of course it is.', why: 'Answer the question with evidence.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Grace\'s possible reply to its effect.',
        pairs: [
          ['"Fair question, let me come back to you"', 'Calm, takes it seriously'],
          ['"I know what I saw"', 'Makes it personal'],
          ['Silence', 'Lets "just opinions" stand'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Take the [[1]] part seriously, and say [[2]] you\'ll come back.',
        blanks: [['fair'], ['when']],
        distractors: ['loud', 'if'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace feel was being "waved away"?',
        options: [
          { text: 'Her experience and her professional judgement' },
          { text: 'Her lunch', why: 'Her expertise.' },
          { text: 'Nothing', why: 'She felt dismissed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Grace\'s planned reply would escalate things?',
        lines: [
          'Fair question about sample size.',
          'Let me come back to you this week.',
          'Maybe if you\'d read it properly, you\'d understand.',
          'I\'ll compare it with our usage data.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It attacks Callum in front of everyone.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Your triggers', 'What\'s right in it', 'Responding, not reacting', 'Disagreeing calmly', 'Public criticism'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people took part in Grace\'s usability sessions?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of criticism that felt unfair. Was any small part of it fair?',
    starters: ['The criticism was...', 'The fair part might be...'],
  },
  deepen: {
    title: 'Unfair isn\'t the same as useless',
    summary: 'Criticism can be badly delivered, partly wrong and still contain something useful. Separating the delivery from the content is the first skill of this chapter.',
  },
  notes: 'Fictional: Callum (new PM, narrated) dismisses six usability sessions as "just opinions" in a meeting of eight.',
};

export default lesson;

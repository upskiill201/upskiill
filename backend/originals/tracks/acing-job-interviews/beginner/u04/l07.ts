import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Myth or Fact: hard-question myths. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Hard-question myths',
  summary: '"Never admit a weakness." "The first to name a number loses." "If you can\'t solve it, you\'re out." Remi\'s friends have rules. Fact or myth?',
  minutes: 11,
  outcomes: [
    'Drop myths about tough interview questions',
    'Handle weakness and salary questions honestly',
    'Know that approach often matters more than the answer',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Never admit a real weakness in an interview.',
          isFact: false,
          explain: 'Myth. A real, safe weakness with clear improvement is more convincing than a fake one.',
        },
        {
          text: 'In technical interviews, how you approach a problem often matters as much as the final answer.',
          isFact: true,
          explain: 'Fact. Interviewers watch how you clarify, try ideas and recover. A clear approach can do well even without a perfect solution.',
        },
        {
          text: 'Whoever names a salary number first always loses.',
          isFact: false,
          explain: 'Myth. A researched, ambitious range can anchor well. If you have no idea, asking for their range first is also fine.',
        },
        {
          text: 'You can ask for a moment to think before a hard question.',
          isFact: true,
          explain: 'Fact. "Let me think about that for a second" is calm and professional.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Honest beats clever. Approach counts. Research your number. Taking a moment is fine.',
    },
  ],
  apply: {
    scenario: 'Hard-question myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Never admit a real weakness', group: 0 },
          { text: 'Approach matters as much as the answer', group: 1 },
          { text: 'First to name a number always loses', group: 0 },
          { text: 'You can take a moment to think', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is asking "what range do you have in mind?" a good move?',
        options: [
          { text: 'When you can\'t find good research on pay' },
          { text: 'Never', why: 'It\'s fine when unsure.' },
          { text: 'Only after accepting', why: 'Ask before.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I didn\'t fully solve the duplicates problem. Am I out?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Not necessarily. You clarified, gave a simple solution and improved it. That\'s a lot of what they score.' },
          { text: 'Yes, definitely.', why: 'Approach is scored too.' },
          { text: 'Email them the answer at midnight.', why: 'Wait for their feedback.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Hide all weaknesses"', 'Show a real one improving'],
          ['"Must solve it fully"', 'Approach counts'],
          ['"Never name a number"', 'A researched range can help'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The summary.',
        template: '[[1]] beats clever. Approach [[2]].',
        blanks: [['Honest', 'Honesty'], ['counts']],
        distractors: ['Fake', 'hides'],
      },
      {
        kind: 'mcq',
        prompt: 'Which line buys thinking time calmly?',
        options: [
          { text: '"Let me think about that for a second."' },
          { text: '"Next question."', why: 'That dodges it.' },
          { text: '"Um, um, um..."', why: 'Silence or a calm line is better.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of the friends\' rules is a myth?',
        lines: [
          'Research a salary range first.',
          'Practise thinking out loud.',
          'Say you have no weaknesses, ever.',
          'Prepare a calm redirect for personal questions.',
        ],
        bug: 2,
        fix: 'Prepare a real, safe weakness.',
        explanation: 'No weaknesses isn\'t believable.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remi\'s own salary range starts at how many KES?',
        answers: ['30000', '30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm under pressure, or panicked?',
        groups: ['Calm', 'Panicked'],
        items: [
          { text: 'Clarifying the question', group: 0 },
          { text: 'Talking very fast to fill silence', group: 1 },
          { text: 'Taking a breath before answering', group: 0 },
          { text: 'Saying "anything is fine"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to meet any hard question.',
        lines: ['Breathe', 'Take a moment if needed', 'Work out what it\'s testing', 'Answer honestly and specifically'],
      },
    ],
  },
  reflect: {
    prompt: 'Which hard-question myth have you believed? What will you do instead?',
    starters: ['I believed...', 'Instead I\'ll...'],
  },
  deepen: {
    title: 'Interviewers are people',
    summary: 'Most interviewers want you to do well; hiring is expensive. Hard questions are there to understand you, not to trip you up.',
  },
  notes: 'Myth/fact synthesis. First-offer anchoring: Galinsky & Mussweiler (2001), as in Negotiation Skills for Beginners.',
};

export default lesson;

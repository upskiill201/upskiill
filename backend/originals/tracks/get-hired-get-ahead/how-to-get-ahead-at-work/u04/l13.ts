import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 13 — sharing your career plan with your manager. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Telling your manager',
  summary: 'Clinton\'s plan points towards product. Ngozi is an engineering manager who just promoted him to Developer. Will she feel betrayed? Tey helps him see why telling her is usually the smart move.',
  minutes: 11,
  outcomes: ['Decide whether to share your plan with your manager', 'Frame it so it helps the team', 'Ask for specific support'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Many people hide their plans from their manager, afraid it looks disloyal. What do you think happens if Ngozi finds out later?',
          replies: ['She\'d feel surprised', 'She\'d feel hurt'],
        },
        {
          tey: 'Probably both. Most good managers would rather know, because they can help: stretch tasks, introductions, timing. A plan she knows about can include her team\'s needs too.',
          replies: ['How do I say it?'],
        },
        {
          tey: 'Frame it as growth, not escape: "I\'ve been doing an energy audit and talking to Aïcha. I\'m drawn to the product side. I\'d love to keep doing great engineering work and test product skills here. Could you help?"',
          replies: ['What if she says no?'],
        },
        {
          tey: 'Then you\'ve learned something about your options here. But many managers say yes to a small experiment, especially when it helps the team. Ask for something specific: one research task, one product meeting a month.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Share your plan, framed as growth. Show how it helps the team. Ask for one specific kind of support.',
    },
  ],
  apply: {
    scenario: 'Clinton tells Ngozi about his plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is telling your manager usually smart?',
        options: [
          { text: 'They can help with tasks, introductions and timing' },
          { text: 'They\'ll promote you instantly', why: 'They can help in practical ways.' },
          { text: 'It isn\'t smart', why: 'Hidden plans cause surprises.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s message in order.',
        lines: ['What he\'s been exploring', 'What he\'s drawn to', 'His commitment to current work', 'A specific ask for support'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Growth framing, or escape framing?',
        groups: ['Growth', 'Escape'],
        items: [
          { text: 'I\'d love to test product skills here', group: 0 },
          { text: 'I\'m bored of engineering', group: 1 },
          { text: 'I\'ll keep doing great engineering work', group: 0 },
          { text: 'I want out of this team', group: 1 },
          { text: 'Could you help me try a research task?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best opening.',
        from: 'clinton',
        message: 'What do I say to Ngozi?',
        options: [
          { text: '"I\'ve been exploring what I enjoy most, and I\'m drawn to product. I want to keep doing great work here and test it. Could you help?"' },
          { text: '"I\'m leaving engineering."', why: 'He hasn\'t decided; frame it as growth.' },
          { text: 'Say nothing for a year.', why: 'Hidden plans cause surprises.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that worries Ngozi unnecessarily.',
        lines: ['I\'m drawn to product.', 'I\'ll probably stop caring about my current work.', 'Could I take one research task?'],
        bug: 1,
        explanation: 'Commit to current work; that makes the experiment easy to support.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ask to the support it gives.',
        pairs: [
          ['One research task', 'Real product experience'],
          ['One product meeting a month', 'Learn how decisions are made'],
          ['An intro to Aïcha\'s manager', 'A wider view of product'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'If Ngozi says no, what has Clinton learned?',
        options: [
          { text: 'Something useful about his options here' },
          { text: 'That he\'s a failure', why: 'He\'s learned about options.' },
          { text: 'Nothing', why: 'He\'s learned about options.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Frame it as [[1]], not [[2]].',
        blanks: [['growth'], ['escape']],
        distractors: ['revenge', 'promotion', 'quitting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who is Njangi Pay\'s product manager? (one word)',
        answers: ['aicha', 'aïcha'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific ask, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'One research task this quarter', group: 0 },
          { text: 'Help me somehow', group: 1 },
          { text: 'One product meeting a month', group: 0 },
          { text: 'Make me a product person', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Does your manager or teacher know where you want to go? What specific support could you ask for?',
    starters: ['They know / don\'t know...', 'I could ask for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Share one line of your career plan with your manager or mentor this week, with one specific ask.',
  },
  notes: 'Where you live and where you work: in some workplaces, sharing plans to move teams carries real risk; read your manager and culture. Most guidance favours openness with a trusted manager.',
};

export default lesson;

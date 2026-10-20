import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Chat with Tey: what to say when it's heating up. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'What to say when it\'s heating up',
  summary: 'Grace knows the steps. But in the moment, words vanish. Tey gives her five short lines she can use in any heated conversation, and one she should never use.',
  minutes: 12,
  outcomes: [
    'Have short lines ready for heated moments',
    'Slow a conversation down without shutting it down',
    'Avoid lines that make things worse',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Under stress, you won\'t remember a theory. You\'ll remember a sentence. So have five ready.', replies: ['Go on.'] },
        { tey: 'One: "Help me understand what\'s worrying you most." Two: "I want to get this right. Can you say that again, slower?"', replies: ['And three?'] },
        { tey: 'Three: "You might be right about that part." Four: "What would a good outcome look like for you?" Five: "Let\'s take ten minutes and come back to it."', replies: ['And the one never to use?'] },
        { tey: '"You need to calm down." It tells them their feelings are the problem. Almost nobody has ever calmed down because they were told to.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep five lines ready: help me understand; say that again, slower; you might be right about that part; what would a good outcome be; let\'s take ten minutes.',
    },
  ],
  apply: {
    scenario: 'Five lines.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it does.',
        pairs: [
          ['"Help me understand what\'s worrying you."', 'Finds the real concern'],
          ['"Can you say that again, slower?"', 'Slows things down'],
          ['"You might be right about that part."', 'Lowers defences'],
          ['"What would a good outcome look like?"', 'Moves to the future'],
          ['"Let\'s take ten minutes."', 'Creates a pause'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why have sentences ready rather than rely on theory?',
        options: [
          { text: 'Under stress you remember sentences, not theories' },
          { text: 'Theory is useless', why: 'The sentences come from it.' },
          { text: 'To sound like a robot', why: 'Short lines come out naturally.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A helpful line, or one that makes it worse?',
        groups: ['Helpful', 'Worse'],
        items: [
          { text: '"Help me understand."', group: 0 },
          { text: '"You need to calm down."', group: 1 },
          { text: '"You might be right about that part."', group: 0 },
          { text: '"Whatever."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '(heated) Nobody here understands how much pressure I\'m under!',
        prompt: "Grace's best reply?",
        options: [
          { text: '"Help me understand. What\'s worrying you most right now?"' },
          { text: '"We\'re all under pressure, Femi."', why: 'True, but it dismisses him.' },
          { text: '"You need to calm down."', why: 'The one line never to use.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Lowering defences.',
        template: '"You [[1]] be right about that [[2]]."',
        blanks: [['might'], ['part']],
        distractors: ['never', 'whole'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "you might be right about that part" help?',
        options: [
          { text: 'Agreeing with what\'s true makes people less defensive about the rest' },
          { text: 'It means you give up', why: 'Only about "that part".' },
          { text: 'It doesn\'t help', why: 'It lowers defences.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ready lines does Tey give Grace?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Grace\'s list doesn\'t belong?',
        lines: [
          'Help me understand what\'s worrying you most.',
          'Can you say that again, slower?',
          'You need to calm down.',
          'What would a good outcome look like for you?',
        ],
        bug: 2,
        fix: 'Let\'s take ten minutes and come back.',
        explanation: '"Calm down" tells them their feelings are the problem.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which line would you use?',
        groups: ['Slow it down', 'Move forward'],
        items: [
          { text: '"Say that again, slower?"', group: 0 },
          { text: '"What would a good outcome be?"', group: 1 },
          { text: '"Let\'s take ten minutes."', group: 0 },
          { text: '"What\'s the smallest next step?"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the lines in a typical heated moment.',
        lines: ['"Help me understand."', '"You might be right about that part."', '"What would a good outcome look like?"', 'Agree the next step'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick the two lines you\'re most likely to use. Write them on a sticky note, or as your phone lock screen.',
    starters: ['My two lines:...'],
  },
  deepen: {
    title: 'Scripts under stress',
    summary: 'Crisis negotiators and emergency staff rely on short, practised phrases because stress narrows thinking. A few rehearsed lines give you something to say when your mind goes blank.',
  },
  notes: 'Phrases synthesised from de-escalation and crisis-communication practice (e.g. Richmond et al. 2012) and Ury, Getting Past No.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: five days to launch, and half the bags have the wrong barcode. A leader's first minute in a crisis. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Five days to launch',
  summary: 'Day 85. Five days to the chili-lime launch. 4,200 pre-orders already. Then the supplier calls: half the bags have the wrong barcode. Shops won\'t be able to scan them. Carmen is in Monterrey. Five faces turn to Lucía.',
  minutes: 11,
  outcomes: [
    'See how a leader\'s first reaction sets the tone in a crisis',
    'Know that calm is something you show on purpose',
    'Know this chapter\'s goal: lead through the hardest week, then learn from it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 85, Thursday, 2:10 p.m.',
      beats: [
        { speaker: 'lucia', text: '(putting the phone down) Okay. Half the bags have the wrong barcode. Around 20,000 bags. Shops can\'t scan them.' },
        { speaker: 'tomas', text: 'Oh no. Oh no no no. Is the launch cancelled?' },
        { speaker: 'diego', text: 'In twelve years, I\'ve seen this twice. It was not fun either time.' },
        { speaker: 'narrator', text: 'Marta has already opened a spreadsheet. Sofía is very still. Everyone is watching Lucía\'s face, the way she watched it on Day 1, and Tomás watched it on the newsletter Friday.' },
      ],
      choice: {
        prompt: 'What should Lucía say first?',
        options: [
          {
            text: '"This is fixable, and we\'ll fix it together. Give me ten minutes to get the facts, then we\'ll plan in the meeting room."',
            outcome: 'Shoulders drop around the room. Tomás breathes. By 2:20, Lucía knows the supplier can print barcode stickers. By 2:30, there\'s a plan on the whiteboard.',
            best: true,
          },
          {
            text: '"This is a disaster. Carmen is going to kill me."',
            outcome: 'Honest, and contagious. Within a minute, three people are panicking, and nobody is thinking.',
          },
          {
            text: '"Leave it with me," then disappear into a meeting room alone.',
            outcome: 'The team sits in silence, imagining the worst. Nobody knows what to do, so nobody does anything.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>In a crisis, people look at the leader to decide how worried to be. Calm doesn't mean pretending everything's fine. It means: this is serious, and we can handle it. <strong>This chapter:</strong> how your mood spreads, managing up, leading through a crisis, being a leader rather than a hero, looking after yourself, and learning from it all. Then launch day, and Lucía's 90-day review.</p>",
    },
  ],
  apply: {
    scenario: 'Day 85, 2:10 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the team watching Lucía\'s face?',
        options: [
          { text: 'They want to see if she cries', why: 'They want to know how serious it is.' },
          { text: 'They look to the leader to decide how worried to be' },
          { text: 'Habit', why: 'In a crisis, the leader\'s reaction sets the tone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the team think, or spreads panic?',
        groups: ['Helps them think', 'Spreads panic'],
        items: [
          { text: '"This is fixable."', group: 0 },
          { text: '"This is a disaster."', group: 1 },
          { text: '"Ten minutes for facts, then we plan."', group: 0 },
          { text: 'Disappearing without a word', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Is the launch cancelled?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Probably. I don\'t know.', why: 'Panic before facts.' },
          { text: 'No, everything\'s fine!', why: 'Fake calm. He can see it\'s not fine.' },
          { text: 'Not yet, and I don\'t think it will be. Let\'s get the facts first.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Calm doesn\'t mean "it\'s fine". It means: this is serious, and we can ___ it. (one word)',
        answers: ['handle', 'fix', 'Handle', 'Fix'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s first ten minutes in order.',
        lines: ['Stay calm and say it\'s fixable', 'Get the facts', 'Bring the team together', 'Make a plan'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s this chapter\'s goal?',
        options: [
          { text: 'Lead through the hardest week, then learn from it' },
          { text: 'Never let anything go wrong', why: 'Things will go wrong. Leading through it is the job.' },
          { text: 'Do everything yourself in a crisis', why: 'That\'s the hero trap.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s first message to the team chat. Which line spreads panic?',
        lines: [
          'Barcode problem on half the bags. It\'s fixable.',
          'Honestly, I think this might be the end of chili-lime.',
          'Meeting room in ten minutes. Bring ideas.',
        ],
        bug: 1,
        fix: 'The supplier and I are on it. More facts in ten minutes.',
        explanation: 'A guess at the worst case, before the facts, travels faster than any plan.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 4 review.',
        pairs: [
          ['SBI', 'Situation, Behaviour, Impact'],
          ['Ruinous empathy', 'Care, no challenge'],
          ['Asking for feedback', 'Say only thank you'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Serious, and [[1]]. Facts [[2]], then a [[3]].',
        blanks: [['fixable'], ['first'], ['plan']],
        distractors: ['hopeless', 'later'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s first words.',
        tiles: ['This', 'is', 'fixable.'],
        distractors: ['over.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a moment when something went badly wrong around you. How did the person in charge react? How did it affect everyone else?',
    starters: ['When it went wrong...', 'The person in charge...'],
  },
  deepen: {
    title: 'The first sentence',
    summary: 'Prepare your crisis first sentence now, before you need it: "This is serious, and we can handle it. Facts first." Saying it calms you as well as them.',
  },
  notes: 'Story setup. Followers take emotional cues from leaders in uncertain situations (emotional contagion; see lesson 2). Fictional figures (4,200 pre-orders, 20,000 bags).',
};

export default lesson;

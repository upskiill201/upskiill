import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Chapter Challenge: talking to Diego, round two (the comment happens again). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: talking to Diego',
  summary: 'Day 80. Diego has been brilliant all week. Then, in stand-up, Tomás suggests a launch idea and Diego says: "Sure, and maybe we\'ll get a pony too." Tomás laughs it off. Diego catches Lucía\'s eye. He knows. She knows. This is round two.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool in one live moment',
    'Handle a repeated behaviour, firmly and fairly',
    'Keep a good relationship while holding the line',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 80, 9:40 a.m. Stand-up.',
      beats: [
        { speaker: 'tomas', text: 'What if we send a free bag to the first 100 people who share the map?' },
        { speaker: 'diego', text: 'Sure, and maybe we\'ll get a pony too.' },
        { speaker: 'narrator', text: 'Tomás laughs it off, a little too fast. Diego catches Lucía\'s eye and winces. He knows. She knows. Ten days ago they agreed this would change.' },
        { speaker: 'narrator', text: 'A second time is different. It\'s not a slip anymore. It\'s a pattern. You\'re with Lucía.' },
      ],
    },
  ],
  apply: {
    scenario: 'Stand-up, Day 80.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Lucía do in the stand-up?',
        options: [
          { text: '"Interesting idea, Tomás. What would it cost?" Then talk to Diego privately, today.' },
          { text: 'Ignore it, since Diego has been great all week.', why: 'Ruinous empathy. Tomás saw it.' },
          { text: '"Diego, we talked about this!" in front of everyone.', why: 'Public criticism; the stand-up becomes about him.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool?',
        groups: ['SBI', 'Push back', 'Praise'],
        items: [
          { text: '"In stand-up, you said \'pony\'..."', group: 0 },
          { text: '"Tell me more about what\'s going on."', group: 1 },
          { text: '"You\'ve been brilliant with the map this week."', group: 2 },
          { text: '"...and Tomás laughed it off too fast."', group: 0 },
          { text: '"You\'re right that it was smaller this time."', group: 1 },
          { text: '"Your discount-code checks saved us twice."', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'I know, I know. It slipped out. Old habits.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'It\'s fine, don\'t worry.', why: 'It\'s a pattern now. "Fine" lets it continue.' },
          { text: 'One more and you\'re off the launch.', why: 'A threat, with no help to change.' },
          { text: 'I appreciate you saying that. It\'s the second time, so it matters. What would help you catch it before it slips out?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The second time, it\'s not a slip anymore; it\'s a ___. (one word)',
        answers: ['pattern', 'Pattern', 'habit'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put round two in order.',
        lines: ['In the moment: back Tomás\'s idea', 'Privately: SBI about the comment', 'Name that it\'s the second time', 'Agree a specific change, and follow up'],
      },
      {
        kind: 'mcq',
        prompt: 'Should Lucía also mention that Diego has been great this week?',
        options: [
          { text: 'No, only the problem', why: 'Real praise matters. Just don\'t use it as padding.' },
          { text: 'Yes, as a sandwich around the SBI', why: 'Separate, not a sandwich.' },
          { text: 'Yes, honestly and separately: both are true, and he should hear both' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s private message to Diego. Which line breaks Chapter 4?',
        lines: [
          'In stand-up, you said "pony" after Tomás\'s idea. He laughed it off fast.',
          'Honestly, you just can\'t help yourself, can you?',
          'It\'s the second time, so I want to get it right. What would help?',
        ],
        bug: 1,
        fix: 'I know you\'ve been working on it, which I really appreciate.',
        explanation: 'A label about who he is. Stay on what he did.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter?',
        pairs: [
          ['"Yes, if"', 'Chapter 3'],
          ['Thank people for bad news', 'Chapter 2'],
          ['Care personally, challenge directly', 'Chapter 4'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Diego suggests: "If I do it again, just say \'pony\' and I\'ll stop." What should Lucía say?',
        options: [
          { text: 'No, I\'ll handle it my way.', why: 'His own idea is the one he\'ll stick to.' },
          { text: 'Love it. A shared signal, his idea. Agreed.' },
          { text: 'That\'s silly.', why: 'It\'s actually a great, specific change.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4, in one line.',
        template: 'Care [[1]], challenge [[2]], and follow [[3]].',
        blanks: [['personally'], ['directly'], ['up']],
        distractors: ['never', 'loudly'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s line to Tomás in stand-up.',
        tiles: ['Interesting', 'idea.', 'What', 'would', 'it', 'cost?'],
        distractors: ['pony'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a behaviour that keeps happening around you. If you raised it the second time, what would you say differently from the first?',
    starters: ['The behaviour is...', 'The second time, I\'d say...'],
  },
  deepen: {
    title: 'Next: Day 90, launch week',
    summary: 'Five days to launch. The supplier calls: half the chili-lime bags have the wrong barcode. Carmen is in Monterrey. The team looks at Lucía. Chapter 5: Launch week.',
  },
  notes: 'Chapter 4 challenge. Repeated behaviour handled with SBI, naming the pattern, self-generated change and follow-up; separate genuine praise (no sandwich); radical candor (Scott). Fictional events.',
};

export default lesson;

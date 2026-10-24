import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Compare: eye contact. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Eyes on people',
  summary: 'Lucía\'s second fix: stop talking to the screen. Two versions of the same 30 seconds: one to the slide, one to the room.',
  minutes: 12,
  outcomes: [
    'Talk to people, not slides',
    'Use "one thought, one person" for eye contact',
    'Glance at slides without turning away',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The same 30 seconds',
      before: {
        label: 'To the screen',
        text: 'Lucía turns to the slide and reads the chart to it: "So here you can see sales against target over nine weeks, and the orange part is..." Her back is half to the room. Her voice goes into the screen. People start checking their phones.',
      },
      after: {
        label: 'To the room',
        text: 'Lucía glances at the slide, points to the orange gap, then turns back. To one person on the left: "This orange gap..." To one person in the middle: "...is what shop owners told us to make." Pause. To someone at the back: "38% above target."',
      },
      notes: [
        'Glance, point, turn back: the slide is for them, not her.',
        'One thought to one person, then move to another.',
        'Her voice travels to the room, not into the screen.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Glance at the slide, then turn back. One thought, one person. Move around the room.',
    },
  ],
  apply: {
    scenario: 'Eye contact.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "one thought, one person" mean?',
        options: [
          { text: 'Talk to only one person all talk', why: 'Move around the room.' },
          { text: 'Think about one person', why: 'It\'s about where you look.' },
          { text: 'Finish a phrase looking at one person, then move to another' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'To the room, or to the screen?',
        groups: ['To the room', 'To the screen'],
        items: [
          { text: 'Glance, point, turn back', group: 0 },
          { text: 'Reading the chart to the slide', group: 1 },
          { text: 'A phrase to someone at the back', group: 0 },
          { text: 'Back half-turned to the audience', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds are compared in this lesson?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to its effect.',
        pairs: [
          ['Glance and turn back', 'The slide supports, you lead'],
          ['One thought, one person', 'Each person feels spoken to'],
          ['Moving around the room', 'Everyone feels included'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'With 300 people, I can\'t look at everyone.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'You don\'t need to. Pick one person in each part of the room. Everyone near them feels you\'re looking their way.' },
          { text: 'Then look at the ceiling.', why: 'Pick people around the room.' },
          { text: 'Look at the screen instead.', why: 'Talk to people.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: '[[1]] at the slide, then turn [[2]].',
        blanks: [['Glance'], ['back']],
        distractors: ['Stare', 'away'],
      },
      {
        kind: 'mcq',
        prompt: 'What happened when Lucía talked to the screen?',
        options: [
          { text: 'People cheered', why: 'They drifted off.' },
          { text: 'Nothing changed', why: 'They drifted off.' },
          { text: 'People started checking their phones' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Lucía\'s eye-contact plan is the mistake?',
        lines: [
          'Glance at the slide, then turn back.',
          'One thought to one person.',
          'Look only at Carmen for the whole talk.',
          'Pick people on the left, middle and back.',
        ],
        bug: 2,
        fix: 'Move around the room.',
        explanation: 'One person all talk leaves 299 out.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to present a chart slide.',
        lines: ['Glance at the slide', 'Point to the key part', 'Turn back to the room', 'Say the point to one person'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good or bad habit?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Pausing while you move to a new person', group: 0 },
          { text: 'Reading notes the whole time', group: 1 },
          { text: 'Pointing to the orange gap', group: 0 },
          { text: 'Speaking into the screen', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Practise a short talk to three objects in a room: left, middle, back. One thought to each. How did it feel?',
    starters: ['It felt...'],
  },
  deepen: {
    title: 'Notes without hiding',
    summary: 'A small talk card is fine. Look down, take the next point, look up, then speak. Talking only while you look up keeps your voice with the room.',
  },
  notes: '"One thought, one person": common speaking-coach technique. Fictional scene.',
};

export default lesson;

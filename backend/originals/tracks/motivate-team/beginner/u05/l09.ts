import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: Miracle's rollout note to the team, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the rollout note',
  summary: 'Saturday, 9:30 a.m. Rollout is done. Before the dinner, Miracle sends the team a short note. Bisi prints it and sticks it next to the "MY CLINICS" column. Tap through to see the whole course in one note.',
  minutes: 11,
  outcomes: [
    'See the whole course in one short note',
    'Thank a team so every person feels seen',
    'End a hard season so it\'s remembered well',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle to Clinic Success, Saturday 9:30 a.m.',
      text: 'Eight weeks ago our motivation score was 2.1 and we had six broken headsets. This morning, 300 clinics are live. Nurse Adaeze says Ikorodu sent 400 results this week. Chidi kept 40 northern clinics online through power cuts nobody else could beat. Halima trained Kano in Hausa. Bisi\'s script took 7 clinics live in one day. Emmanuel went from 4 clinics a week to 16 in a day. You did this in normal hours. Monday morning is off. Thank you.',
      hotspots: [
        { phrase: 'our motivation score was 2.1 and we had six broken headsets', note: 'Telling the story back: the ending means more when you remember the start.' },
        { phrase: 'This morning, 300 clinics are live.', note: 'The outcome goal, met. Clinics, not tickets.' },
        { phrase: 'Ikorodu sent 400 results this week', note: 'Task significance: the people helped, at the very end of the work.' },
        { phrase: 'Chidi kept 40 northern clinics online', note: 'Competence: the hard problem that kept him from leaving.' },
        { phrase: 'Halima trained Kano in Hausa.', note: 'Belonging and self-efficacy: what made her different became her strength.' },
        { phrase: 'Emmanuel went from 4 clinics a week to 16 in a day.', note: 'Growth, named. Theory Y, proved.' },
        { phrase: 'You did this in normal hours.', note: 'A hard week, run humanely. Proof it didn\'t need midnight.' },
        { phrase: 'Monday morning is off.', note: 'Rest after the peak: the effort was seen, and won\'t become the new normal.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good thank-you note: where you started, the outcome, who it helped, each person by name, how you did it, and the rest that follows.',
    },
  ],
  apply: {
    scenario: 'Line check, the rollout note.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Bisi stick it next to "MY CLINICS"?',
        options: [
          { text: 'It was short', why: 'Short helped. Specific mattered more.' },
          { text: 'Folake told her to', why: 'She chose to.' },
          { text: 'It saw every person, specifically, and told the team\'s story' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter taught it?',
        groups: ['Chapters 1 and 2', 'Chapter 3', 'Chapters 4 and 5'],
        items: [
          { text: 'Six broken headsets fixed', group: 0 },
          { text: 'Chidi\'s hard problem', group: 1 },
          { text: 'Normal hours, Monday off', group: 2 },
          { text: 'Ikorodu\'s 400 results', group: 0 },
          { text: 'Bisi\'s script, owned', group: 1 },
          { text: 'Every person named', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'You put the power cuts in. Nobody\'s ever written down anything I did before.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'It deserved writing down. That fix is the reason 40 clinics are live. Thank you for staying, Chidi.' },
          { text: 'It was nothing.', why: 'It was everything. Don\'t shrink it.' },
          { text: 'Don\'t get a big head.', why: 'A toxin on a perfect day.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"You did this in normal hours" proves the week was run ___. (one word)',
        answers: ['humanely', 'Humanely', 'well', 'fairly'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why start with "2.1 and six broken headsets"?',
        options: [
          { text: 'To embarrass the team', why: 'It\'s to celebrate the journey.' },
          { text: 'Remembering the start makes the ending mean more' },
          { text: 'For accuracy only', why: 'It\'s for meaning.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the note. Which line undoes the course?',
        lines: [
          'This morning, 300 clinics are live.',
          'Great job, everyone!',
          'Halima trained Kano in Hausa.',
        ],
        bug: 1,
        fix: 'Emmanuel went from 4 clinics a week to 16 in a day.',
        explanation: 'The line Chapter 4 started with: equal, not seen.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the thank-you note in order.',
        lines: ['Where we started', 'What we achieved', 'Who it helped', 'Each person by name', 'Rest'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"Ikorodu sent 400 results"', 'Grant: task significance'],
          ['"4 a week to 16 in a day"', 'Bandura: mastery'],
          ['"Monday morning is off"', 'Peak-end: end well'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Where you [[1]], who you [[2]], and every [[3]].',
        blanks: [['started'], ['helped'], ['name', 'person']],
        distractors: ['failed', 'boss'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the last words.',
        tiles: ['Monday', 'morning', 'is', 'off.', 'Thank', 'you.'],
        distractors: ['Overtime.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-sentence thank-you to a group you\'ve worked with: where you started, what you achieved, who it helped, each person, and what\'s next.',
    starters: ['We started...', 'Thank you...'],
  },
  deepen: {
    title: 'Send it',
    summary: 'Send that thank-you to the group this week. Specific beats long.',
  },
  notes: 'Synthesis of the whole course: hygiene factors, task significance, outcome goals, mastery and self-efficacy, belonging, recognition, humane workload and the peak-end rule. Fictional note.',
};

export default lesson;

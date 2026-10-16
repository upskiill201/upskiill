import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: my clinics',
  summary: 'Week 2, Thursday. Something has changed on the whiteboard. The ticket counts are gone. In their place, five columns, one per person, with clinic names. Bisi wrote "MY CLINICS" at the top of hers. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use purpose and job-design tools without notes', 'Connect them to Chapter 1'],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Thursday, 4:00 p.m.',
      beats: [
        { speaker: 'bisi', text: 'My clinics. Twelve. I know every nurse\'s name. Ikorodu is my favourite, don\'t tell the others.' },
        { speaker: 'halima', text: 'I took the Kano clinics. I speak Hausa. Two of them called me today just to say hello.' },
        { speaker: 'chidi', text: '(not looking up) The northern 40 are mine. I found out why they drop off. It\'s the power cuts.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 2.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What changed when each person got their own clinics?',
        options: [
          { text: 'Pay went up', why: 'No pay change.' },
          { text: 'Task identity: a whole piece of work they could call theirs' },
          { text: 'Fewer clinics', why: 'Same clinics, owned differently.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put building task significance in order.',
        lines: ['Find a real person helped', 'Let them tell it', 'Connect it to someone\'s work', 'Make it regular'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which job feature is it?',
        groups: ['Task identity', 'Task significance', 'Autonomy'],
        items: [
          { text: 'Bisi\'s 12 clinics', group: 0 },
          { text: 'Nurse Adaeze\'s thank-you', group: 1 },
          { text: 'Chidi investigating his own way', group: 2 },
          { text: 'Halima\'s Kano clinics', group: 0 },
          { text: 'Mrs Lawal\'s two-hour result', group: 1 },
          { text: 'Choosing how to onboard', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'The northern 40 drop off because of power cuts. The app logs them out.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Good. Back to the queue.', why: 'He just found his challenge. Feed it.' },
          { text: 'I\'ll tell the developers.', why: 'Let Chidi own it, with help.' },
          { text: 'Nobody has figured that out in a year. What would you need to fix it?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Knowing your work has a real effect on people: task ___. (one word)',
        answers: ['significance', 'Significance'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What happened to callers who met a scholarship student (Grant)?',
        options: [
          { text: 'Much more phone time and much more money a month later' },
          { text: 'Nothing changed', why: 'Big changes.' },
          { text: 'They asked for raises', why: 'They worked harder.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Friday plan. Which line breaks Chapter 2?',
        lines: [
          'Monday: a new clinic story from Halima\'s Kano clinics.',
          'Put the ticket counts back up, next to the clinic names.',
          'Ask Chidi what he needs for the power-cut fix.',
        ],
        bug: 1,
        fix: 'Add each clinic\'s status: live, stuck or happy.',
        explanation: 'Ticket counts pull attention back to activity, not people.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Hygiene factor', 'Stops unhappiness'],
          ['Job crafting', 'Reshaping your own job'],
          ['Stay interview', 'Why do you stay?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Halima taking the Kano clinics a big deal?',
        options: [
          { text: 'Kano is easy', why: 'It\'s about her strengths.' },
          { text: 'It uses what makes her different, which builds belonging' },
          { text: 'Nobody else wanted them', why: 'She chose them.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far.',
        template: 'Meet the people you [[1]]. Own a [[2]] piece of work. Purpose from [[3]], not posters.',
        blanks: [['help'], ['whole'], ['experiences', 'experience']],
        distractors: ['ignore', 'tiny'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Bisi wrote.',
        tiles: ['MY', 'CLINICS'],
        distractors: ['TICKETS'],
      },
    ],
  },
  reflect: {
    prompt: 'What would it mean to write "MY" at the top of something in your work or studies? What would you want to own?',
    starters: ['I\'d want to own...', 'Because...'],
  },
  deepen: {
    title: 'Names, not numbers',
    summary: 'If your team tracks work, try replacing one number on the board with the names of the people or customers it\'s for. See how conversations change.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1.',
};

export default lesson;

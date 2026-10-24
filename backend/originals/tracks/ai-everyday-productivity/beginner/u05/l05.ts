import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mateo\'s turn',
  summary: 'Day 26. Mateo calls: the mariachi can\'t do 7 p.m., only 9 p.m. or not at all. And for once, he asks Lucía how she\'d solve it. Check what you know about problem-solving, planning and deciding with AI.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Solve a problem with the six steps', 'Plan and decide with AI'],
  learn: [
    {
      kind: 'story',
      title: 'Day 26, Mateo calls',
      beats: [
        { speaker: 'narrator', text: 'Mateo: "Mariachi says 9 p.m. or nothing. Abuela leaves at 9. What do I do?"' },
        { speaker: 'lucia', text: 'One sentence first. Then what\'s fixed. I\'ll show you.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: plan and solve with AI.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the one-sentence version of Mateo\'s problem?',
        options: [
          { text: 'The mariachi can only play at 9 p.m., but Abuela leaves at 9 and should hear them' },
          { text: 'Everything is ruined', why: 'Panic, not a problem.' },
          { text: 'Mariachis are unreliable', why: 'A complaint, not the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed or flexible?',
        groups: ['Fixed', 'Flexible'],
        items: [
          { text: 'Abuela leaves at 9', group: 0 },
          { text: 'Live music for Abuela', group: 0 },
          { text: 'Which musicians play', group: 1 },
          { text: 'When the toast happens', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mateo: "Okay, so what do I type?" Lucía\'s advice?',
        options: [
          { text: '"What do I do?!"', why: 'Panic gets stress tips.' },
          { text: 'The problem, what\'s fixed, what\'s flexible, and "give me at least 5 options".' },
          { text: '"Cancel the mariachi."', why: 'That\'s a decision, not a question.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the option to its catch.',
        pairs: [
          ['Mariachi at 9 p.m.', 'Abuela misses it'],
          ['A trio at 7, mariachi at 9', 'Costs more'],
          ['Ask the mariachi to start at 8:45', 'They may say no'],
          ['Recorded music only', 'Mamá would be sad'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The six steps, first half.',
        template: 'One [[1]]. Fixed and flexible. Many [[2]].',
        blanks: [['sentence'], ['options']],
        distractors: ['email', 'excuses'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line from Mateo\'s plan breaks a fixed point?',
        lines: [
          'Ask Abuela to stay until 10.',
          'Ask if they can play 2 songs at 8:45 for Abuela.',
          'Plan B: a guitarist friend at 7.',
        ],
        bug: 0,
        fix: 'Abuela leaving at 9 is fixed; work around it.',
        explanation: 'She\'s 89 and needs her rest. Options must respect what\'s fixed.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt is the best decision prompt for Mateo?',
        options: [
          { text: 'Which is better?', why: 'No criteria.' },
          { text: 'The 8:45 option is great, right?', why: 'Leading.' },
          { text: 'Compare these 3 options. Must have: Abuela hears live music. Important: under MX$1,500 extra. I like the 8:45 idea: argue against it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time does Abuela leave the party? (A time.)',
        answers: ['9', '9 p.m.', '9pm', '21:00', '9 pm', 'nine'],
        placeholder: 'A time',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Mateo\'s fix.',
        lines: ['Say it in one sentence', 'List what\'s fixed', 'Get 5 options', 'Argue against his favourite', 'Call the mariachi'],
      },
      {
        kind: 'mcq',
        prompt: 'The mariachi agree to start at 8:45 instead, same price. What\'s Mateo\'s next step?',
        options: [
          { text: 'Get it in writing and add it to the plan with a time' },
          { text: 'Assume it\'s fine', why: 'Get it in writing.' },
          { text: 'Ask AI if they\'ll turn up', why: 'It can\'t know that.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life could you teach the six steps to? What problem would you start them on?',
    starters: ['I\'d teach...', 'Starting with...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1–4. Mateo is narrated (not a CastId), so his lines are in prompts, not chatReply.',
};

export default lesson;

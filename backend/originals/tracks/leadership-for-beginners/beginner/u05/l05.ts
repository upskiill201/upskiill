import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Saturday, 4 p.m.',
  summary: 'Saturday, 4 p.m. 14,000 bags re-labelled. 6,000 to go. Diego has put music on in the warehouse. Tomás is doing a terrible dance. A quick check before the last push.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use crisis, mood and managing-up tools without notes', 'Connect them to Chapters 1 to 4'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 4 p.m., the warehouse',
      beats: [
        { speaker: 'lucia', text: 'Check-in. 14,000 done, 6,000 to go. Diego, shops?' },
        { speaker: 'diego', text: 'All told. Two were grumpy. One sent us a photo of their empty chili-lime shelf, waiting.' },
        { speaker: 'narrator', text: 'Tomás is dancing badly to Diego\'s music. Sofía is laughing. Lucía realises it\'s the first time she\'s seen Sofía laugh at work.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Saturday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Barsade\'s "ripple effect" study show?',
        options: [
          { text: 'Moods never spread', why: 'They do.' },
          { text: 'One person\'s mood can spread through a group' },
          { text: 'Only bosses have moods', why: 'Everyone does. The leader\'s spreads furthest.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the five crisis steps in order.',
        lines: ['Stop it getting worse', 'Get the facts', 'One person, one job', 'Tell people early', 'Set a rhythm'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good or bad managing up?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Telling Carmen the same day', group: 0 },
          { text: 'A long story before the point', group: 1 },
          { text: '"We\'ll know by 5 p.m."', group: 0 },
          { text: 'Hoping she doesn\'t notice', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'How\'s it going down there?',
        prompt: 'Lucía\'s best update?',
        options: [
          { text: 'It\'s chaos but we\'re surviving!', why: 'Spreads worry, and no facts.' },
          { text: 'Great!', why: 'Too thin. Give her the numbers.' },
          { text: '14,000 of 20,000 done. All shops told. On track for Monday. Next update at 9 tomorrow.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Managing up rule number one: no ___. (one word)',
        answers: ['surprises', 'Surprises'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In a crisis, why not show fake cheer?',
        options: [
          { text: 'People notice. Calm and honest works better' },
          { text: 'Cheer is banned at work', why: 'Real cheer is great.' },
          { text: 'It\'s fine to fake it', why: 'Fake cheer feels wrong to people.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s Sunday plan. Which line breaks this course?',
        lines: [
          'Check-in at 9, same as Saturday.',
          'I\'ll do the last 6,000 bags alone overnight so everyone can rest.',
          'Thank everyone by name at 4 p.m.',
        ],
        bug: 1,
        fix: 'Same jobs, same rhythm. Everyone goes home by 6.',
        explanation: '"I\'ll just do it myself", Chapter 1\'s trap, in its crisis costume.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter?',
        pairs: [
          ['Stop-doing list', 'Chapter 3'],
          ['Radical candor', 'Chapter 4'],
          ['Managing up', 'Chapter 5'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Diego\'s music and Tomás\'s dancing help?',
        options: [
          { text: 'It didn\'t; it was a distraction', why: 'Good moods spread as well.' },
          { text: 'A lighter mood spreads too, and helps people keep going' },
          { text: 'Because Lucía told them to', why: 'It came from the team.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'Lead with [[1]]. No [[2]] for your boss. One [[3]] each.',
        blanks: [['calm'], ['surprises'], ['job', 'role']],
        distractors: ['panic', 'secrets'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s update.',
        tiles: ['On', 'track', 'for', 'Monday.'],
        distractors: ['maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'When things get hard, what helps you keep going? Who in your group makes it lighter?',
    starters: ['What helps me is...', 'The person who makes it lighter is...'],
  },
  deepen: {
    title: 'Notice the lighteners',
    summary: 'In your next hard stretch, notice who lightens the mood. Thank them. It\'s a real contribution.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–4.',
};

export default lesson;

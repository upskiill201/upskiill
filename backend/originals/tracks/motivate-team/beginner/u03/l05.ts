import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: three ways',
  summary: 'Week 4, Thursday. Bisi\'s script is official. Halima onboarded two Kano clinics her own way, in Hausa. Chidi has found three ways to survive power cuts and is testing them on five clinics. Folake dropped the ₦5,000 idea. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use autonomy, reward and mastery tools without notes', 'Connect them to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'Week 4, Thursday, 5:30 p.m.',
      beats: [
        { speaker: 'chidi', text: 'Three ways. Offline caching, a text-message fallback, and auto-login after power returns. Testing all three on five clinics. One of them will work.' },
        { speaker: 'halima', text: 'My Kano clinics took 35 minutes each this week. In Week 1 it was an hour.' },
        { speaker: 'bisi', text: 'Seven clinics live today on my script. Seven. Somebody write that on the board.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 4.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Chidi\'s learning goal work better than a hard target?',
        options: [
          { text: 'Targets are always bad', why: 'Targets come later.' },
          { text: 'On a new, complex problem, exploring options first leads to better results' },
          { text: 'He got lucky', why: 'It\'s a known research finding.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put giving autonomy in order.',
        lines: ['Say what\'s fixed, and why', 'Say what\'s free', 'Offer more than one kind', 'Match it to experience', 'Agree how you\'ll stay in touch'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool is it?',
        groups: ['Autonomy', 'Rewards', 'Mastery'],
        items: [
          { text: 'Halima\'s own way, in Hausa', group: 0 },
          { text: 'Dropping ₦5,000 per script', group: 1 },
          { text: 'Chidi\'s three ways', group: 2 },
          { text: 'Bisi owns the script', group: 0 },
          { text: 'Thank after, not before', group: 1 },
          { text: 'An hour down to 35 minutes', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Seven clinics live today on my script. Somebody write that on the board.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Good, but it should be ten.', why: 'Celebrate the win first.' },
          { text: 'Here\'s ₦5,000.', why: 'Turns the joy into a transaction.' },
          { text: 'Writing it now! Seven in one day on your script. That\'s a record for this team.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Incentives drive quantity; intrinsic motivation drives ___. (one word)',
        answers: ['quality', 'Quality'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Halima "In Week 1, an hour; now, 35 minutes"?',
        options: [
          { text: 'People often can\'t see their own progress; showing it feeds competence' },
          { text: 'To make her go faster', why: 'It\'s to show growth.' },
          { text: 'For the report', why: 'It\'s for her.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Friday plan. Which line breaks Chapter 3?',
        lines: [
          'Write Bisi\'s seven clinics on the board.',
          'Tell Chidi to pick one fix by Monday and stop testing.',
          'Ask Halima which technique she\'ll try next.',
        ],
        bug: 1,
        fix: 'Ask Chidi what the five-clinic test is showing so far.',
        explanation: 'Cutting the learning short turns his learning goal back into a rushed target.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Hygiene factor', 'Stops unhappiness'],
          ['Task significance', 'Seeing who you help'],
          ['Overjustification', 'A reward replacing the reason'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Folake drop the ₦5,000 idea?',
        options: [
          { text: 'It was too expensive', why: 'It was the evidence.' },
          { text: 'Miracle showed that paying for work people love can make them care less' },
          { text: 'Bisi refused it', why: 'Miracle made the case first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'Clear limits, real [[1]]. Thank [[2]], not before. Learning first, then [[3]].',
        blanks: [['freedom'], ['after'], ['targets']],
        distractors: ['rules', 'bribes'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Bisi\'s request.',
        tiles: ['Write', 'it', 'on', 'the', 'board.'],
        distractors: ['wall'],
      },
    ],
  },
  reflect: {
    prompt: 'Where are you right now: bored, stretched or overwhelmed? What would move you to "stretched"?',
    starters: ['Right now I\'m...', 'I\'d be stretched if...'],
  },
  deepen: {
    title: 'Write the win down',
    summary: 'When someone hits a personal record, write it where everyone can see it. It costs nothing and feeds competence.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;

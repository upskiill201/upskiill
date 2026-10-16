import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the goal on the wall',
  summary: 'Friday, Week 3. The goal is printed on A3 and taped to the Finance door, the warehouse office and Emeka\'s screen in Lagos. Remi has done five pre-meetings. The workshop is Monday. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use shared-goal, pre-wiring and co-creation tools without notes', 'Connect them to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'Week 3, Friday, 5:15 p.m.',
      beats: [
        { speaker: 'njeri', text: 'Remi. Someone in my team asked what "no new audit errors" means. I explained it. Me. Explaining audit.' },
        { speaker: 'remi', text: 'How did it go?' },
        { speaker: 'njeri', text: 'Better than you would have. Now they want to know when the new form comes. They\'ve got changes.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is it good news that Njeri explained the goal herself?',
        options: [
          { text: 'It saved Remi time', why: 'Nice, but not the point.' },
          { text: 'When others repeat the goal, it\'s truly shared' },
          { text: 'It means she\'s in charge now', why: 'It means she owns it too.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put writing a shared goal in order.',
        lines: ['Start from the problem people feel', 'One sentence, with a number', 'Add the guardrail', 'Check everyone sees their part', 'Say it every time'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 3 tool?',
        groups: ['Shared goal', 'Pre-wiring', 'Co-creation'],
        items: [
          { text: '"Within 5 days, no new audit errors"', group: 0 },
          { text: 'Chatting with Felix before the workshop', group: 1 },
          { text: 'Njeri\'s team changing the form', group: 2 },
          { text: 'The goal taped on three doors', group: 0 },
          { text: '"What would worry you?"', group: 1 },
          { text: 'A strong draft with gaps', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'pauline',
        message: 'Before Monday: I want to promise customers 5-day refunds in next week\'s newsletter.',
        prompt: 'Remi\'s best reply (a pre-wiring moment)?',
        options: [
          { text: 'Sure, go ahead!', why: 'A promise the pilot hasn\'t proven, and a surprise for Wanjiku.' },
          { text: 'No, absolutely not.', why: 'Shutting down an ally. Explore it together.' },
          { text: 'I love the energy. Wanjiku will worry, since the pilot isn\'t done. Can we talk wording on Monday, with her in the room?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What must not get worse while you chase the goal is the ___. (one word)',
        answers: ['guardrail', 'Guardrail'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What makes pre-wiring honest rather than sneaky?',
        options: [
          { text: 'Saying the same thing to everyone, and really listening' },
          { text: 'Doing it in secret', why: 'That\'s the sneaky version.' },
          { text: 'Only talking to people who agree', why: 'Talk to the worried ones most.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s weekend plan. Which line breaks the IKEA effect?',
        lines: [
          'Add Njeri\'s team\'s changes to the form.',
          'Polish the whole plan so there\'s nothing left to discuss Monday.',
          'Leave the email wording open for Pauline and Wanjiku.',
        ],
        bug: 1,
        fix: 'Bring a strong draft, with the open questions clearly marked.',
        explanation: 'A finished plan leaves nothing for anyone to build, or own.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Listening tour', 'Go to them first'],
          ['Small test', 'Easy to say yes to'],
          ['Shared goal', 'One sentence everyone repeats'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Pauline and Wanjiku may clash on Monday. What\'s the pre-wiring move?',
        options: [
          { text: 'Hope it doesn\'t come up', why: 'It will.' },
          { text: 'Know it now, and plan time for it in the agenda' },
          { text: 'Uninvite one of them', why: 'You need both.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'One [[1]] goal. No [[2]] in the big room. People back what they [[3]].',
        blanks: [['shared'], ['surprises'], ['build']],
        distractors: ['secret', 'buy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Njeri\'s news.',
        tiles: ['They\'ve', 'got', 'changes.'],
        distractors: ['complaints.'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last hear someone else repeat a goal you set? If never, what would make your goals easier to repeat?',
    starters: ['I heard...', 'To make it easier...'],
  },
  deepen: {
    title: 'Listen for the echo',
    summary: 'This week, notice whether anyone repeats a goal or idea you\'ve shared, in their own words. That echo is the sign it\'s shared.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;

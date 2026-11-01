import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: Lucía's 90-day note to Carmen, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the 90-day note',
  summary: 'Before her 90-day review, Carmen asked Lucía for "a short note on how it\'s gone". Lucía wrote six sentences. Carmen printed it. Tap through to see the whole course in one note.',
  minutes: 11,
  outcomes: [
    'See the whole course in one short note',
    'Write a 90-day reflection of your own',
    'Report results and give credit at the same time',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía to Carmen, Day 90',
      text: 'We launched chili-lime on time with 5,300 pre-orders, past our 5,000 goal. The map was Sofía\'s idea, and Diego helped her build it. Tomás ran the launch email; his test sends caught two errors. Marta held the sticker weekend together. My biggest mistake: promising you June 1 without asking the team. I now check dates with them first. Next quarter, I\'d like us to choose one fewer project, and finish it better.',
      hotspots: [
        { phrase: 'past our 5,000 goal', note: 'A specific goal from Chapter 3, reported as a number. Not "it went well".' },
        { phrase: 'The map was Sofía\'s idea, and Diego helped her build it.', note: 'Credit, named. And a quiet sign that the Chapter 4 conversation worked.' },
        { phrase: 'his test sends caught two errors', note: 'Specific praise: what he did and why it mattered. The newsletter Friday, fixed for good.' },
        { phrase: 'Marta held the sticker weekend together.', note: 'Her best friend, credited by her boss to her boss. Chapter 1, full circle.' },
        { phrase: 'My biggest mistake: promising you June 1 without asking the team.', note: 'Owning her own mistake, upwards. Psychological safety starts with the leader.' },
        { phrase: 'I now check dates with them first.', note: 'Blame vs learn: she changed the process, not just felt bad.' },
        { phrase: 'one fewer project, and finish it better', note: 'Priorities and the stop-doing list: managing up with a clear ask.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good 90-day note: the result in numbers, credit by name, one mistake owned, what you changed, one clear ask.',
    },
  ],
  apply: {
    scenario: 'Line check, Day 90.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Carmen print Lucía\'s note?',
        options: [
          { text: 'It was very long', why: 'Six sentences.' },
          { text: 'It only had good news', why: 'It included her biggest mistake.' },
          { text: 'It gave results, credit and an honest mistake in six sentences' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the note is it?',
        groups: ['Result', 'Credit', 'Learning'],
        items: [
          { text: '5,300 pre-orders', group: 0 },
          { text: 'The map was Sofía\'s idea', group: 1 },
          { text: 'I now check dates first', group: 2 },
          { text: 'Launched on time', group: 0 },
          { text: 'Marta held the weekend together', group: 1 },
          { text: 'My biggest mistake was...', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Why put your mistake in a note to me?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Because I want my team to be honest with me, so I should be honest with you.' },
          { text: 'You\'d have found out anyway.', why: 'True, but it misses the real reason.' },
          { text: 'I shouldn\'t have. Delete it.', why: 'Owning it is the strongest part.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Report the result as a ___, not "it went well". (one word)',
        answers: ['number', 'Number', 'figure'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why credit people by name to Carmen?',
        options: [
          { text: 'To avoid credit herself', why: 'It\'s about making their work visible.' },
          { text: 'It makes their work visible to the person who decides their future' },
          { text: 'Carmen asked her to', why: 'She chose to.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s first draft. Which line undoes the course?',
        lines: [
          'We hit 5,300 pre-orders.',
          'I managed to save the launch more or less single-handed.',
          'The map was Sofía\'s idea.',
        ],
        bug: 1,
        fix: 'The team saved the launch; Diego\'s shop idea finished it.',
        explanation: 'The hero story, in writing. And it\'s not even true.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a 90-day note in order.',
        lines: ['The result, in numbers', 'Credit, by name', 'One mistake, owned', 'One clear ask'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the chapter.',
        pairs: [
          ['"Marta held it together"', 'Chapter 1: leading your friend'],
          ['"I now check dates first"', 'Chapter 2: blame vs learn'],
          ['"One fewer project"', 'Chapter 3: priorities'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The note.',
        template: 'The [[1]] in numbers. [[2]] by name. One [[3]], owned.',
        blanks: [['result'], ['Credit', 'credit'], ['mistake']],
        distractors: ['excuse', 'hero'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s ask.',
        tiles: ['One', 'fewer', 'project,', 'finished', 'better.'],
        distractors: ['more'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own six-sentence note about something you\'ve led or done: result, credit, mistake, change, ask.',
    starters: ['Result: ...', 'Credit: ...', 'My mistake: ...'],
  },
  deepen: {
    title: 'Six sentences',
    summary: 'At the end of your next big piece of work, write six sentences like Lucía\'s, even if nobody asked. Send it to the person who most needs to see it.',
  },
  notes: 'Synthesis of the whole course: specific goals (Locke & Latham), recognition, psychological safety and leader fallibility (Edmondson), blameless learning, priorities, managing up (Gabarro & Kotter).',
};

export default lesson;

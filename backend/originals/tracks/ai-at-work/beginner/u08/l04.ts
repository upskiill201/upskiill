import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 4 — speaker notes with AI. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Speaker notes with AI',
  summary: 'Ada\'s slides are clean now. But what will she say? AI can draft speaker notes, as long as they sound like Ada, not a robot reading a script.',
  minutes: 12,
  outcomes: [
    'Get AI to draft short speaker notes',
    'Make notes sound like you',
    'Use notes as prompts, not a script',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Paste your outline and ask: "Write speaker notes for each slide: 3 short bullet points, what I\'d say out loud, in plain spoken English."', replies: ['Why bullets, not full sentences?'] },
        { tey: 'Full sentences turn into reading aloud. Bullets remind you of the point and let you speak naturally.', replies: ['They sound too formal.'] },
        { tey: 'Tell it how you talk: "I speak warmly and simply. Use short words. No phrases like \'leverage synergies\'." Then read them aloud and change anything you\'d never say.', replies: ['Should I memorise them?'] },
        { tey: 'Just the first and last sentence of the talk. Everything in between: know the point of each slide, and talk.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three short bullets per slide, in your voice. Read them aloud and fix what you\'d never say. Memorise only your first and last line.',
    },
  ],
  apply: {
    scenario: 'Ada writes speaker notes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why bullets instead of full sentences in speaker notes?',
        options: [
          { text: 'Full sentences turn into reading aloud' },
          { text: 'Bullets are shorter to type', why: 'It\'s about speaking naturally.' },
          { text: 'Founders can see the notes', why: 'They can\'t; it\'s for you.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful notes?',
        options: [
          { text: 'Write my speech.', why: 'You\'ll end up reading it.' },
          { text: 'For each slide, write 3 short bullets of what I\'d say out loud. I speak warmly and simply, with short words and no jargon.' },
          { text: 'Make notes impressive.', why: 'Impressive often means stiff.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sounds like Ada talking, or a robot?',
        groups: ['Sounds like Ada', 'Robot'],
        items: [
          { text: '"Shops kept coming back every week"', group: 0 },
          { text: '"We leveraged synergies across markets"', group: 1 },
          { text: '"Here\'s the surprising part"', group: 0 },
          { text: '"It is imperative to note that"', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s voice instruction.',
        tiles: ['Use', 'short', 'words,', 'no', 'jargon'],
        distractors: ['leverage'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Are you going to read your notes in the meeting?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No: just a glance. They\'re three bullets per slide. I\'ve memorised only my first and last line.' },
          { text: 'Yes, word for word.', why: 'Reading sounds stiff.' },
          { text: 'I won\'t have notes.', why: 'Short notes help.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Memorise only your [[1]] and [[2]] line.',
        blanks: [['first'], ['last']],
        distractors: ['every', 'favourite'],
      },
      {
        kind: 'findBug',
        prompt: 'Which speaker note should Ada rewrite?',
        lines: [
          'Shops told us fees were confusing',
          'So we made fees one flat number',
          'It is hereby noted that utilisation metrics exhibited positive momentum',
          'Payments grew by half in four weeks',
        ],
        bug: 2,
        fix: 'Shops used it more every week',
        explanation: 'Nobody talks like that. Notes should be in your spoken voice.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s notes process.',
        lines: ['Ask AI for 3 bullets per slide', 'Describe how she talks', 'Read them aloud', 'Change what she\'d never say'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bullets per slide does Tey suggest?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the note habit to its benefit.',
        pairs: [
          ['Bullets, not sentences', 'You speak, not read'],
          ['Your own voice', 'Sounds natural'],
          ['First and last line memorised', 'Confident start and finish'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good note or bad note?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"Pause after the chart"', group: 0 },
          { text: 'A full paragraph to read out', group: 1 },
          { text: '"Mention the 6 at-risk shops"', group: 0 },
          { text: 'Text in 8-point font', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read the notes aloud before the meeting?',
        options: [
          { text: 'You hear what sounds unnatural and fix it' },
          { text: 'To memorise every word', why: 'To sound natural, not memorise.' },
          { text: 'No reason', why: 'It catches stiff wording.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'How do you naturally talk at work? Write one instruction to give AI so notes sound like you.',
    starters: ['I talk...', 'My instruction:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for 3-bullet speaker notes for one slide. Read them aloud. Rewrite one line.' },
  notes: 'General presentation guidance.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: Remi's closing slide, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the closing slide',
  summary: 'Friday morning. Remi\'s whole presentation ends on one slide. Zanele says it\'s the only slide she\'s ever seen with more names than numbers on it. Tap through to see the whole course on one slide.',
  minutes: 11,
  outcomes: [
    'See the whole course on one closing slide',
    'End a presentation with credit, honesty and a clear ask',
    'Make the change outlive the project',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Refunds: 21 days to 4',
      text: 'Business refunds: 21 days to 4. Audit errors: zero. Mama Mboga Fresh is staying. Fixed by Njeri\'s warehouse team, Wanjiku\'s sample-check, Emeka\'s Lagos reference field, Felix\'s Saturday change and Pauline\'s customer messages, with Zanele\'s tracking. Still fragile: the new screen waits for next quarter. Owners from Monday: warehouse, Finance, Lagos logistics. Two asks: Finance owns the sample-check for good, and the screen goes first in next quarter\'s IT plan.',
      hotspots: [
        { phrase: 'Business refunds: 21 days to 4.', note: 'Answer first: the result before anything else.' },
        { phrase: 'Audit errors: zero.', note: 'The guardrail, reported to the end. Wanjiku\'s interest, kept.' },
        { phrase: 'Mama Mboga Fresh is staying.', note: 'Why it matters to the CEO: the customer, in four words.' },
        { phrase: 'Fixed by Njeri\'s warehouse team', note: 'Credit by name, to the most senior person in the company. Every fix has a face.' },
        { phrase: 'with Zanele\'s tracking', note: 'The Chapter 4 repair, kept: the giver who did the most is named too.' },
        { phrase: 'Still fragile: the new screen waits for next quarter.', note: 'The honest bit. Showing the risk yourself builds trust.' },
        { phrase: 'Owners from Monday: warehouse, Finance, Lagos logistics.', note: 'Anchoring: the change no longer depends on Remi.' },
        { phrase: 'Two asks', note: 'One clear close, with decisions only the CEO can make.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A closing slide that leads without a title: the result, the guardrail, why it matters, every name, the honest risk, the owners, the ask.',
    },
  ],
  apply: {
    scenario: 'Line check, the closing slide.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the slide have more names than numbers?',
        options: [
          { text: 'Remi ran out of numbers', why: 'He had plenty.' },
          { text: 'To fill space', why: 'Every name earned its place.' },
          { text: 'The result was built by those people, and the CEO should know them' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the course is it?',
        groups: ['Senior presenting', 'Credit', 'Making it last'],
        items: [
          { text: '"21 days to 4" first', group: 0 },
          { text: '"Fixed by Njeri\'s warehouse team"', group: 1 },
          { text: '"Owners from Monday"', group: 2 },
          { text: 'Two clear asks', group: 0 },
          { text: '"With Zanele\'s tracking"', group: 1 },
          { text: 'Sample-check owned by Finance for good', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'You put my name on the CEO slide.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Of course. None of the numbers exist without your tracking. And I owed you one.' },
          { text: 'Brian told me to.', why: 'He didn\'t, and it shrinks the thank-you.' },
          { text: 'Don\'t get used to it.', why: 'Joking away a real thank-you.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Still fragile" is the ___ bit. (one word)',
        answers: ['honest', 'Honest'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why name the owners "from Monday"?',
        options: [
          { text: 'To hand over blame', why: 'It\'s ownership, not blame.' },
          { text: 'So the change keeps working after the project ends' },
          { text: 'Because Remi is leaving the company', why: 'He\'s not. The project is ending.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the slide. Which line undoes the course?',
        lines: [
          'Business refunds: 21 days to 4.',
          'Project led and delivered by Remi.',
          'Owners from Monday: warehouse, Finance, Lagos logistics.',
        ],
        bug: 1,
        fix: 'Fixed by Njeri, Wanjiku, Emeka, Felix and Pauline, with Zanele.',
        explanation: 'The one line that would spend six weeks of trust.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the closing slide in order.',
        lines: ['The result', 'Why it matters', 'Who did it', 'What\'s still fragile', 'The asks'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the chapter.',
        pairs: [
          ['"Audit errors: zero"', 'Chapter 2: interests'],
          ['"Fixed by Njeri\'s team"', 'Chapter 3: credit'],
          ['"Owners from Monday"', 'Chapter 5: making it last'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The slide.',
        template: 'The [[1]] first. Every [[2]]. The honest [[3]]. The ask.',
        blanks: [['result', 'answer'], ['name'], ['risk', 'bit']],
        distractors: ['story', 'excuse'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the slide title.',
        tiles: ['Refunds:', '21', 'days', 'to', '4'],
        distractors: ['5'],
      },
    ],
  },
  reflect: {
    prompt: 'Design the closing slide for something you\'ve worked on with others: the result, the names, the honest risk, the ask.',
    starters: ['Result: ...', 'Names: ...', 'Ask: ...'],
  },
  deepen: {
    title: 'More names than numbers',
    summary: 'On your next summary of group work, try to include more names than numbers. See how people react when they read it.',
  },
  notes: 'Synthesis of the whole course: answer first (Minto), guardrail (goal-setting), credit as currency (Cohen & Bradford), honesty and trust (Maister et al.), anchoring change (Kotter). Fictional slide.',
};

export default lesson;

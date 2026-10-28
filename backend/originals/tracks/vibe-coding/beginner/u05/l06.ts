import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Tap to explore: tables for the band. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Tables for the band',
  summary: 'The AI proposes the band\'s database: three tables. Ruth, who designed bank databases for decades, reads it in silence, then taps one column. "Why is the phone number in here twice?"',
  minutes: 12,
  outcomes: [
    'Read a table: rows, columns, an id',
    'See how one table points to another',
    'Spot data that shouldn\'t be stored, or stored twice',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The AI\'s proposed tables',
      text:
        'gigs:     id · title · date · place · drivers_needed\n           7  · Jazz brunch · Sat Nov 7 · Audubon Park · 3\n\nsignups:  id · gig_id · user_id · role · created_at\n           41 · 7 · u-benny · driver · Nov 1, 8:02 p.m.\n\nprofiles: id · name · phone\n           u-benny · Benny Castillo · (504) 555-0142',
      hotspots: [
        { phrase: 'gigs:', note: 'A table is like one sheet in a spreadsheet: one kind of thing per table. Here, gigs.' },
        { phrase: 'id · title · date · place · drivers_needed', note: 'Columns: the facts stored about each gig. Each row below is one gig.' },
        { phrase: '7  · Jazz brunch', note: 'Every row gets an id, a unique number, so other tables can point to it.' },
        { phrase: 'gig_id', note: 'This sign-up points at gig 7. That\'s how tables connect: by storing another row\'s id, not copying its details.' },
        { phrase: 'user_id', note: 'Which logged-in person signed up. Supabase\'s login gives each person a user id.' },
        { phrase: 'profiles: id · name · phone', note: 'Names and phone numbers live once, here. The AI\'s first draft also copied phone into signups; Ruth had it removed. Store things once.' },
        { phrase: '(504) 555-0142', note: 'Personal data. Every column like this needs a reason to exist, and rules about who can read it (Chapter 7).' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask for the design before the code: "Propose the tables and columns for this, with one example row each. Don\'t create anything yet." Then read it like Ruth.',
    },
  ],
  apply: {
    scenario: 'Ruth reads the tables.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the word to its meaning.',
        pairs: [
          ['Table', 'One kind of thing, like gigs'],
          ['Row', 'One item, like one gig'],
          ['Column', 'One fact about each item, like date'],
          ['id', 'A unique number for each row'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How does a sign-up know which gig it\'s for?',
        options: [
          { text: 'It copies the gig\'s title and date', why: 'Copying means two places to update. It points instead.' },
          { text: 'It stores the gig\'s id in gig_id' },
          { text: 'It guesses', why: 'It points at the gig\'s id.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ruth\'s question: which column shouldn\'t be in signups?',
        lines: ['id', 'gig_id', 'user_id', 'role', 'phone'],
        bug: 4,
        fix: 'Keep phone only in profiles.',
        explanation: 'Store things once. Two copies of a phone number drift apart, and double the places it can leak from.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which table does each column belong in?',
        groups: ['gigs', 'profiles'],
        items: [
          { text: 'date', group: 0 },
          { text: 'name', group: 1 },
          { text: 'place', group: 0 },
          { text: 'phone', group: 1 },
          { text: 'drivers_needed', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Should we save everyone\'s home address too? Might be useful.',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Only store what the app needs. We don\'t need addresses, so we don\'t collect them.' },
          { text: 'Sure, more data is better.', why: 'Every extra private detail is a risk with no benefit.' },
          { text: 'Store it but hide it.', why: 'Hidden data can still leak.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best way to get the database designed?',
        options: [
          { text: 'Create whatever tables you need', why: 'You won\'t see the design until it exists.' },
          { text: 'Make a database', why: 'Too vague.' },
          { text: 'Propose the tables and columns for gig sign-ups, with one example row each. Don\'t create anything yet.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s two rules.',
        template: 'Store things [[1]]. Only store what the app [[2]].',
        blanks: [['once'], ['needs']],
        distractors: ['twice', 'might like'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which column in signups points to the gig?',
        answers: ['gig_id', 'gig id', 'gigid'],
        placeholder: 'Column name',
      },
      {
        kind: 'mcq',
        prompt: 'Gig 7 needs 3 drivers. There are 2 driver sign-ups for gig 7. How many more drivers are needed?',
        options: [
          { text: '1' },
          { text: '3', why: 'Two have signed up already.' },
          { text: '5', why: 'That adds instead of subtracting.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 2: the AI wants to add a "fan_wall" table now. What does Hazel say?',
        options: [
          { text: 'Yes, more tables', why: 'Not in this step.' },
          { text: 'Later list. This step is gigs and sign-ups only.' },
          { text: 'Delete the database', why: 'Just say no to the extra.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Sketch the tables for your own app: what are the "things"? What facts does each need? Which details could you not collect at all?',
  },
  deepen: {
    title: 'On your computer: design first',
    summary: 'Ask Claude Code: "Propose the tables and columns for my app, with one example row each. Don\'t create anything yet." Remove anything stored twice or not needed. Then ask it how to create them in Supabase, and do it.',
  },
  notes: 'Relational design basics: one entity per table, foreign keys (gig_id, user_id), avoid duplication, data minimisation. Supabase Auth gives each user a UUID; a profiles table keyed by user id is a common Supabase pattern. 555-01xx numbers are reserved fictional numbers.',
};

export default lesson;

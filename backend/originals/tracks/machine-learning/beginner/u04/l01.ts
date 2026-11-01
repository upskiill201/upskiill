import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LOAD, WEEK_SPLIT } from './code';

/** Chapter 4 · Lesson 1 — Memorising vs learning: Emmanuel's lookup table. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Memorising vs learning',
  summary: 'Emmanuel has a "faster model": a table that remembers every past booking and its answer. It\'s right about almost every booking it has seen. Then week 12 arrives, and 84 of the 200 bookings aren\'t in the table at all.',
  minutes: 12,
  outcomes: [
    'Tell memorising apart from learning',
    'Build a lookup table and see where it breaks',
    'Explain why a model must handle bookings it has never seen',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Emmanuel\'s table',
      beats: [
        { speaker: 'emmanuel', text: 'Why all this distance maths? I made a table. Every past booking, its four clues, and whether they came. New booking? Look it up.' },
        { speaker: 'miracle', text: 'How often is it right?' },
        { speaker: 'emmanuel', text: 'On the training weeks, 2,041 of 2,200. That\'s 93%.' },
        { speaker: 'halima', text: 'And on week 12?' },
        { speaker: 'narrator', text: 'Emmanuel looks. 116 of the 200 new bookings have an exact match in the table. The other 84 have never been seen. The table has nothing to say about them.' },
        { speaker: 'tey', text: 'That\'s the difference between memorising and learning. A memory answers questions it has seen. A model has to answer the ones it hasn\'t. What should the team do with the table?' },
      ],
      choice: {
        prompt: 'What should the team do with Emmanuel\'s table?',
        options: [
          { text: 'Judge every predictor on bookings it has never seen, and keep v0.3, which can answer any booking.', outcome: 'Yes. v0.3 finds similar patients, so it can answer all 200. And the only score that matters is on new bookings.', best: true },
          { text: 'Use the table: 93% is a great score.', outcome: 'That 93% is on bookings it memorised. On new bookings it can\'t even answer 84 of 200.' },
          { text: 'Add week 12 to the table, then test again.', outcome: 'Then it would score well on week 12 by remembering it, and still fail on week 13.' },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Emmanuel\'s table',
      caption: 'A dictionary from four clues to the answer.',
      code: LOAD + WEEK_SPLIT + '\ntable = {}\nfor _, r in train.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    table[key] = r["no_show"]\n\nprint(len(table), "different bookings remembered")\nfound = 0\nfor _, r in test.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    if key in table:\n        found += 1\nprint(found, "of", len(test), "new bookings are in the table")\n',
      challenge: 'How many week-12 bookings does the table have no answer for?',
    },
  ],
  apply: {
    scenario: 'Memory, or learning?',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Build Emmanuel\'s table from the training weeks and print how many different bookings it remembers',
        starter: LOAD + WEEK_SPLIT + 'table = {}\nfor _, r in train.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n',
        solution: LOAD + WEEK_SPLIT + 'table = {}\nfor _, r in train.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    table[key] = r["no_show"]\nprint(len(table))\n',
        hint: 'table[key] = r["no_show"], then print(len(table))',
        checks: [{ message: 'Print 1310', outputEquals: '1310' }],
      },
      {
        kind: 'mcq',
        prompt: 'The table is right about 2,041 of 2,200 training bookings. What does that tell you about week 12?',
        options: [
          { text: 'It will be 93% right on week 12', why: 'It can\'t even answer 84 of the 200.' },
          { text: 'Very little: those are bookings it has already seen' },
          { text: 'Week 12 will be easier', why: 'A training score says nothing about new bookings.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Memorising or learning?',
        groups: ['Memorising', 'Learning'],
        items: [
          { text: 'Looking up an exact past booking', group: 0 },
          { text: 'Finding the most similar past patients', group: 1 },
          { text: 'Stuck when a booking is new', group: 0 },
          { text: 'Can answer any booking', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Count how many week-12 bookings have an exact match in the table, and print it',
        starter: LOAD + WEEK_SPLIT + 'table = {}\nfor _, r in train.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    table[key] = r["no_show"]\nfound = 0\nfor _, r in test.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n',
        solution: LOAD + WEEK_SPLIT + 'table = {}\nfor _, r in train.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    table[key] = r["no_show"]\nfound = 0\nfor _, r in test.iterrows():\n    key = (r["wait_days"], r["distance_km"], r["previous_no_shows"], r["sms_reminder"])\n    if key in table:\n        found += 1\nprint(found)\n',
        hint: 'if key in table: found += 1',
        checks: [{ message: 'Print 116', outputEquals: '116' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many of the 200 week-12 bookings does the table have no answer for?',
        answers: ['84'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'Fine, I\'ll add week 12 to the table. Then it knows everything.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Great, then it\'s perfect.', why: 'It would still be stuck on every new booking next week.' },
          { text: 'Tables are against the rules.', why: 'They\'re fine for memory. They just can\'t answer new questions.' },
          { text: 'Then it remembers week 12. Next Monday brings week 13, full of bookings it has never seen. That\'s the only week that matters.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test that matters.',
        template: 'A model is judged on bookings it has [[1]] seen, because tomorrow\'s bookings are always [[2]].',
        blanks: [['never'], ['new']],
        distractors: ['already', 'old'],
      },
      {
        kind: 'findBug',
        prompt: 'Emmanuel\'s report. Which line oversells the table?',
        lines: ['Table built from weeks 1 to 11.', 'Right on 2,041 of 2,200 training bookings.', 'So it will be 93% right on new bookings.'],
        bug: 2,
        fix: 'On new bookings it has no answer for 84 of 200.',
        explanation: 'A score on remembered bookings doesn\'t carry over to new ones.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can v0.3 answer a booking the table can\'t?',
        options: [
          { text: 'It looks for the most similar past patients, not an exact match' },
          { text: 'It has a bigger table', why: 'It has no table: it measures distance to every past booking.' },
          { text: 'It guesses at random', why: 'It uses the 15 nearest patients.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the number to what it means.',
        pairs: [
          ['1,310', 'Different bookings the table remembers'],
          ['116', 'Week-12 bookings it can look up'],
          ['84', 'Week-12 bookings it can\'t answer'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you memorised answers for a test instead of understanding them. What happened when the questions changed?',
    starters: ['I memorised...', 'When the questions changed...'],
  },
  deepen: {
    title: 'Generalisation',
    summary: 'The word for doing well on new examples is "generalisation". Every idea in this chapter, from test sets to leaks, is about measuring it honestly.',
  },
  notes: 'Lookup table keyed on (wait_days, distance_km, previous_no_shows, sms_reminder) from weeks 1-11: 1,310 distinct keys; 2,041 of 2,200 training rows right (duplicate keys with mixed labels, last wins); week 12: 116 of 200 found, 100 of those right; 84 not found.',
};

export default lesson;

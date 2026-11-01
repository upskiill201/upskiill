import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 2 · Lesson 8 — the weekly update: done, next, stuck, one question. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The Friday update',
  summary: 'At the second check-in, Samuel talks for ten minutes about everything he did. Mr Tamba looks at his phone. Clinton takes 90 seconds, and Mr Tamba writes something down. Here\'s Clinton\'s format.',
  minutes: 12,
  outcomes: ['Give a short, clear weekly update', 'Lead with results, not activity', 'Flag problems early'],
  learn: [
    {
      kind: 'steps',
      title: 'Four lines, 90 seconds',
      steps: [
        { title: '1. Done (results, not activity)', body: '"Confirmations now save on the phone with no data. I tested it in airplane mode on two phones." Not "I worked really hard on storage".' },
        { title: '2. Next', body: '"Next week: syncing when data comes back, then a test with one driver on Saturday."' },
        { title: '3. Stuck or at risk', body: '"Risk: two drivers have very old phones. I may need a lighter version." Saying it early means it\'s a plan, not a surprise.' },
        { title: '4. One question or decision', body: '"Can I ride with Driver Ekane on Saturday to test it on the real route?" One clear ask he can answer with yes or no.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Done, next, risk, one question. Results, not hours. Say problems early, while they\'re still small.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s Friday update.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the update in order.',
        lines: ['Done (results)', 'Next', 'Stuck or at risk', 'One question or decision'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Result or just activity?',
        groups: ['Result', 'Activity'],
        items: [
          { text: 'Confirmations save with no data', group: 0 },
          { text: 'I worked really hard', group: 1 },
          { text: 'Tested in airplane mode on two phones', group: 0 },
          { text: 'I was very busy', group: 1 },
          { text: 'I spent hours on storage', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why mention the old-phones risk now?',
        options: [
          { text: 'To make excuses', why: 'It\'s planning, not excuses.' },
          { text: 'Early, it\'s a plan; late, it\'s a surprise' },
          { text: 'It doesn\'t matter', why: 'Two drivers might not be able to use it.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes Samuel\'s update weak.',
        lines: ['Done: the login screen works.', 'Then I had lunch, then I fixed some colours, then I read about Kotlin, then...', 'Next: the delivery list.'],
        bug: 1,
        explanation: 'A list of activity. Say the results.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best one-question line.',
        from: 'clinton',
        message: 'What one question should I end my update with?',
        options: [
          { text: '"Do you like me?"', why: 'Ask something about the work.' },
          { text: '"What should I do with my life?"', why: 'Too big for 90 seconds.' },
          { text: '"Can I ride with Driver Ekane on Saturday to test it on the real route?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its part.',
        pairs: [
          ['Saves with no data, tested on two phones', 'Done'],
          ['Sync, then a test with one driver', 'Next'],
          ['Old phones may need a lighter version', 'Risk'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long should the update take?',
        options: [
          { text: 'About 90 seconds' },
          { text: 'Ten minutes', why: 'Mr Tamba checked his phone. Keep it short.' },
          { text: 'One word', why: 'Too short to be useful.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Results, not [[1]]. Say problems [[2]].',
        blanks: [['hours', 'activity'], ['early']],
        distractors: ['late', 'never', 'colours'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many lines are in Clinton\'s update? (a number)',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good update habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Mentioning a risk early', group: 0 },
          { text: 'Hiding a problem until the deadline', group: 1 },
          { text: 'Ending with one clear question', group: 0 },
          { text: 'Listing every task you touched', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-line update for something you did this week: done, next, risk, one question.',
    starters: ['Done:', 'Risk:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Send a four-line update to someone you work or study with this week, even unasked. Notice how they respond.',
  },
  notes: 'Weekly update formats like this are common workplace practice. Driver Ekane is a named extra.',
};

export default lesson;

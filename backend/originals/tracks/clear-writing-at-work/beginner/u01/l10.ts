import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: the week-3 rewrite. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the week-3 rewrite',
  summary: 'Zanele\'s week-3 draft is back to 700 words and four jobs. She runs the plain checklist and turns it into three short messages. Everything from Chapter 1.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Turn a long mixed draft into clear messages', 'Use everything from Chapter 1 together'],
  learn: [
    {
      kind: 'reading',
      title: 'From one draft to three messages',
      html: '<p><strong>The draft</strong> (700 words, to everyone): a weather update, the history of the pilot, how she cleaned the data, the week-3 result in paragraph four, a question for Emeka buried in paragraph six, Felix\'s export bug at the end, and the team lunch.</p><p><strong>After the checklist:</strong></p><ol><li><strong>To Mr Kamau</strong> (90 words). Subject: <em>Saturday pilot, week 3: late deliveries at 21%</em>. Result, no decision needed, one risk (the export bug may affect week 4), next update Friday.</li><li><strong>To Emeka</strong> (40 words). Subject: <em>Lagos delivery data needed by Thursday</em>. The ask, the format, the deadline, thanks.</li><li><strong>To Felix</strong> (50 words). Subject: <em>Export bug: 14 orders missing dates</em>. What\'s wrong, an example, when she needs it fixed.</li></ol><p>Lunch went in the team chat.</p>',
    },
    {
      kind: 'story',
      title: 'Friday afternoon',
      beats: [
        { speaker: 'narrator', text: 'Emeka replies in an hour with the Lagos data. Felix fixes the bug the same afternoon.' },
        { speaker: 'achieng', text: 'Three replies before 5 p.m. That has never happened with your emails.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: busy readers, cut it down, draft two, one purpose. Next: plain words.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: the week-3 rewrite.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to their message length.',
        pairs: [
          ['Mr Kamau', '90 words'],
          ['Emeka', '40 words'],
          ['Felix', '50 words'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The three new messages: 90 + 40 + 50 words. Total?',
        answers: ['180'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'The original draft was 700 words. How much shorter are the three messages combined?',
        options: [
          { text: '520 words shorter' },
          { text: '180 words shorter', why: '180 is the new total.' },
          { text: 'The same', why: 'Much shorter.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which message does this belong in?',
        groups: ['Mr Kamau', 'Emeka', 'Felix'],
        items: [
          { text: 'Week-3 result', group: 0 },
          { text: 'Lagos data by Thursday', group: 1 },
          { text: '14 orders missing dates', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should Mr Kamau know about the export bug?',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'One line, as a risk: it may affect week 4. Felix gets the detail.' },
          { text: 'Send him Felix\'s whole email.', why: 'Just the risk.' },
          { text: 'Never tell him.', why: 'It\'s a real risk.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: 'Point [[1]], cut the rest, one [[2]] per message.',
        blanks: [['first'], ['purpose', 'job']],
        distractors: ['last', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'Where did the team lunch go?',
        options: [
          { text: 'The team chat' },
          { text: 'Mr Kamau\'s email', why: 'Not his business.' },
          { text: 'Nowhere', why: 'Team chat.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the email to Emeka is unnecessary?',
        lines: [
          'Hi Emeka, could you send the Lagos delivery data?',
          'A CSV with dates and routes is perfect.',
          'As you may recall, the pilot began after a long analysis that...',
          'By Thursday would be great. Thanks!',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'History he doesn\'t need.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How quickly did Emeka reply, in hours?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Zanele\'s rewrite.',
        lines: ['List the jobs in the draft', 'Find each reader', 'Write one short message each', 'Run the checklist', 'Send'],
      },
    ],
  },
  reflect: {
    prompt: 'Take a long, mixed email you need to send. Turn it into one-purpose messages using the checklist.',
    starters: ['Message 1:...', 'Message 2:...'],
  },
  deepen: {
    title: 'Responses as a measure',
    summary: 'A good test of clear writing is simple: do people reply, act and stop asking follow-up questions? Zanele\'s three replies before 5 p.m. are the result.',
  },
  notes: 'Chapter 1 challenge (fictional): 700-word draft split into 90 + 40 + 50 = 180 words.',
};

export default lesson;

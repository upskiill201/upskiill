import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Before/After: 900 words vs 120. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '900 words vs 120',
  summary: 'The same week-one update, twice. Zanele reads both on her phone, as Mr Kamau would, and finally sees it from his side.',
  minutes: 11,
  outcomes: [
    'Compare a padded and a clear update',
    'Write a short update a busy reader can act on',
    'Read your own messages as the reader would',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The week-one update',
      before: {
        label: '900 words (opening)',
        text: '"Dear Mr Kamau, I hope this email finds you well. It has been a very busy week at the Nairobi depot, and the weather has been quite rainy, which may be relevant. As you may recall, the Saturday dispatch pilot was approved following the analysis that I presented, in which I found that..." (five more paragraphs; the result is in paragraph five)',
      },
      after: {
        label: 'About 120 words',
        text: 'Subject: Saturday pilot, week 1: late deliveries down to 23%\n"Dear Mr Kamau,\nWeek 1 of the Saturday pilot at Nairobi: late deliveries fell from 34% to 23%.\nNo decision needed yet. One risk: two Saturday drivers are on short contracts ending in May.\nI\'ll send week 2 next Friday. Full numbers attached.\nZanele"',
      },
      notes: [
        'The subject line alone tells him the news.',
        'Result, decision needed, one risk, next step. Nothing else.',
        'The detail is still there, in the attachment, for anyone who wants it.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'An update: the result, any decision needed, the main risk, the next step. Detail goes in the attachment.',
    },
  ],
  apply: {
    scenario: 'Two updates.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'From the 900-word version or the 120-word version?',
        groups: ['900 words', '120 words'],
        items: [
          { text: '"I hope this email finds you well."', group: 0 },
          { text: '"No decision needed yet."', group: 1 },
          { text: '"The weather has been quite rainy."', group: 0 },
          { text: '"I\'ll send week 2 next Friday."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the short update.',
        lines: ['Result', 'Decision needed', 'Main risk', 'Next step'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the subject line do in the short version?',
        options: [
          { text: 'Tells him the news before he even opens it' },
          { text: 'Nothing special', why: 'It carries the result.' },
          { text: 'Asks for approval', why: 'It reports the result.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its job.',
        pairs: [
          ['"Fell from 34% to 23%"', 'Result'],
          ['"No decision needed yet"', 'What he must do'],
          ['"Two drivers on short contracts"', 'Risk'],
          ['"Week 2 next Friday"', 'Next step'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Is it rude to start without "I hope this finds you well"?',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: '"Dear Mr Kamau" is polite. The kindest thing after that is the point.' },
          { text: 'Yes, always add three pleasantries.', why: 'They push the point down.' },
          { text: 'Skip "Dear" too.', why: 'A greeting is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'An update.',
        template: 'Result, [[1]] needed, main [[2]], next step.',
        blanks: [['decision'], ['risk']],
        distractors: ['weather', 'greeting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In week 1, late deliveries fell from 34% to what percentage?',
        answers: ['23', '23%'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this short update doesn\'t belong?',
        lines: [
          'Week 1: late deliveries fell from 34% to 23%.',
          'No decision needed yet.',
          'Also, the canteen has new chairs.',
          'Week 2 next Friday; numbers attached.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'One message, one purpose.',
      },
      {
        kind: 'mcq',
        prompt: 'Why read your email on your phone before sending?',
        options: [
          { text: 'Many busy readers will see it there first, where only a few lines show' },
          { text: 'Phones check spelling better', why: 'It\'s about what the reader sees.' },
          { text: 'No reason', why: 'It shows what\'s above the fold.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many Saturday drivers are on short contracts?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite your last update email as result, decision, risk, next step.',
    starters: ['Result:...', 'Decision:...', 'Risk:...', 'Next:...'],
  },
  deepen: {
    title: 'The phone test',
    summary: 'Open your draft on a phone. Whatever shows without scrolling is what most busy people will read. Put the point there.',
  },
  notes: 'Fictional update; week-1 late rate 23% (from 34% in March, Data Science for Beginners).',
};

export default lesson;

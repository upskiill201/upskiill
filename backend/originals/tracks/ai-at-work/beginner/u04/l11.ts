import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 11 — what to always check before sending. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'What to always check before sending',
  summary: 'Six things to check in any AI-assisted message before it leaves your hands. Most take seconds.',
  minutes: 12,
  outcomes: [
    'Run a six-point pre-send check',
    'Catch the most common AI slips in real messages',
    'Make the check a habit, not a chore',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Before any AI-assisted message goes out, Ada checks six things:</p>' +
        '<table><tr><th>Check</th><th>What can go wrong</th></tr>' +
        '<tr><td><strong>Names</strong></td><td>Wrong name, wrong spelling, wrong person\'s title</td></tr>' +
        '<tr><td><strong>Numbers</strong></td><td>Invented, miscalculated, or out of date</td></tr>' +
        '<tr><td><strong>Dates and times</strong></td><td>Wrong day of the week, wrong time zone</td></tr>' +
        '<tr><td><strong>Promises</strong></td><td>The AI promised something you can\'t deliver ("we\'ll refund in 24 hours")</td></tr>' +
        '<tr><td><strong>Leftovers</strong></td><td>[Insert name], "As an AI...", or notes meant for you</td></tr>' +
        '<tr><td><strong>Tone</strong></td><td>Too formal, too cheerful, or not you</td></tr></table>' +
        '<p>Read it once, slowly, as the person receiving it. That one read catches most problems.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Names, numbers, dates, promises, leftovers, tone. Then read it once as the person receiving it.',
    },
  ],
  apply: {
    scenario: 'Ada is about to send three AI-assisted messages.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s six checks.',
        lines: ['Names', 'Numbers', 'Dates and times', 'Promises', 'Leftovers', 'Tone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is a leftover?',
        lines: [
          'Hi Lucía,',
          'The slides are attached for Thursday.',
          '[Insert key result here]',
          'Thanks, Ada',
        ],
        bug: 2,
        fix: 'Sign-ups are up 18% since the redesign.',
        explanation: 'A placeholder the AI left for Ada to fill.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the slip it catches.',
        pairs: [
          ['Names', '"Dear Lucia" instead of Lucía'],
          ['Promises', '"Full refund within 24 hours"'],
          ['Dates', '"Tuesday 14 March" when the 14th is a Thursday'],
          ['Leftovers', '"As an AI, I cannot..."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI wrote "We will fix this by tomorrow." Ada doesn\'t know if that\'s true. What should she do?',
        options: [
          { text: 'Change it to what she can promise, or check with the team first' },
          { text: 'Send it; it sounds reassuring', why: 'A broken promise is worse than none.' },
          { text: 'Remove the whole message', why: 'Just fix the promise.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine, or fix before sending?',
        groups: ['Fine', 'Fix'],
        items: [
          { text: '"See you at 3pm Lagos time (2pm Accra)"', group: 0 },
          { text: '"Dear [Client Name]"', group: 1 },
          { text: '"We guarantee 100% uptime"', group: 1 },
          { text: '"Thanks for your patience"', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the final step.',
        template: 'Read it once, slowly, as the [[1]] [[2]] it.',
        blanks: [['person'], ['receiving']],
        distractors: ['AI', 'deleting'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your last email to my boss said "Dear Carmin". It\'s Carmen!',
        prompt: 'Which check would have caught it?',
        options: [
          { text: 'Names: check every name against the original.' },
          { text: 'Tone', why: 'It\'s a name error.' },
          { text: 'Numbers', why: 'It\'s a name error.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s six checks in order.',
        tiles: ['Names,', 'numbers,', 'dates,', 'promises,', 'leftovers,', 'tone'],
        distractors: ['fonts,'],
      },
      {
        kind: 'mcq',
        prompt: 'Which time zone line is safest for a Lagos–Accra call?',
        options: [
          { text: '"3pm Lagos time (2pm Accra)"' },
          { text: '"3pm"', why: 'Lagos and Accra are an hour apart.' },
          { text: '"Afternoon-ish"', why: 'Too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on Ada\'s pre-send list?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which check is this?',
        groups: ['Promises', 'Tone'],
        items: [
          { text: '"We\'ll have it live by Friday"', group: 0 },
          { text: '"Super excited!!!" to an angry client', group: 1 },
          { text: '"Free upgrade for all users"', group: 0 },
          { text: 'Far too formal for a teammate', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why read it "as the person receiving it"?',
        options: [
          { text: 'You notice what they\'ll notice: wrong names, odd tone, unclear asks' },
          { text: 'It\'s polite', why: 'It\'s practical.' },
          { text: 'To make it longer', why: 'To catch problems.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the six checks do you skip most often?',
    starters: ['I skip...', 'From now on...'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next AI-assisted email, run the six checks. Note what you caught.' },
  notes: 'Lagos (WAT, UTC+1) is one hour ahead of Accra (GMT, UTC+0). Carmen is Lucía\'s boss (CAST.md).',
};

export default lesson;

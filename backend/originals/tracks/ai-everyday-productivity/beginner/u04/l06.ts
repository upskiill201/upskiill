import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Walkthrough: a realistic study plan. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Ten days, twenty minutes',
  summary: 'The AI\'s first study plan has Lucía studying 2 hours a day, including the day she moves flat. Walk through how she builds a plan that fits her real life, and fixes it when life gets in the way.',
  minutes: 12,
  outcomes: [
    'Give AI your real constraints before it plans',
    'Build review days and rest days into a study plan',
    'Adjust a plan after a few days instead of abandoning it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A plan she\'ll actually follow',
      steps: [
        { title: '1. The fantasy plan', body: '"Make me a study plan for Portuguese." The reply: 2 hours a day, grammar on Mondays, films on Fridays. She has a move, a party and a job. It lasts one evening.' },
        { title: '2. Give it the real limits', body: '"I have 20 minutes a day, on the metro, with headphones. I move on Day 27 (no study that day). The call is Day 29. Goal: a 60-second opening and answering 3 simple questions."' },
        { title: '3. Ask for review built in', body: '"Start every session with 5 minutes reviewing earlier lines. Make Days 24 and 28 review-only."' },
        { title: '4. Make it checkable', body: '"Give me the plan as a table: day, what I learn, how I\'ll test myself." Each day ends with a mini test, so she knows it\'s working.' },
        { title: '5. Put it where she\'ll see it', body: 'She copies each day into her phone calendar at 8:10, her metro time. A plan in a chat she never reopens is just a nice idea.' },
        { title: '6. Fix it on Day 3', body: 'Day 21 is chaos and she misses it. Instead of quitting: "I missed Day 21. Adjust the rest of the plan so I still finish by Day 29." The plan bends; it doesn\'t break.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A study plan prompt: goal + real time + days off + review built in + a test for each day. Then put it in your calendar, and adjust it instead of quitting.',
    },
  ],
  apply: {
    scenario: 'Lucía\'s study plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the first plan fail?',
        options: [
          { text: 'Portuguese is too hard', why: 'The plan was the problem.' },
          { text: 'It ignored her real life: no time limit, no days off' },
          { text: 'It had too few films', why: 'It had too many hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps of a plan that works.',
        lines: ['Give the goal and real limits', 'Build in review', 'Ask for a daily test', 'Put it in the calendar', 'Adjust after missed days'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real limit to include, or not needed?',
        groups: ['Include', 'Not needed'],
        items: [
          { text: '20 minutes a day', group: 0 },
          { text: 'No study on moving day', group: 0 },
          { text: 'Her favourite colour', group: 1 },
          { text: 'The call is on Day 29', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I missed two days of my plan, so I deleted it. No point now.',
        prompt: 'Lucía\'s advice?',
        options: [
          { text: 'Yes, start a new course next month.', why: 'The goal is still reachable.' },
          { text: 'Missed days are normal.', why: 'True, but say what to do about it.' },
          { text: 'Tell the AI which days you missed and ask it to adjust the rest. Plans bend.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Review days.',
        template: 'Start every session with [[1]] minutes of review. Make Days 24 and 28 [[2]]-only.',
        blanks: [['5', 'five'], ['review']],
        distractors: ['60', 'film'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan feature to why it matters.',
        pairs: [
          ['20 minutes, on the metro', 'Fits her real day'],
          ['Daily mini test', 'She knows it\'s working'],
          ['Review-only days', 'Spacing and retrieval'],
          ['Calendar at 8:10', 'She actually sees it'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes a day does Lucía study? (A number.)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which day of the plan should be changed?',
        lines: [
          'Day 26: lines 5 and 6, quiz on all.',
          'Day 27: 45 minutes of new grammar.',
          'Day 28: review only, full opening twice.',
        ],
        bug: 1,
        fix: 'Day 27: no study, it\'s moving day.',
        explanation: 'She told it no study on moving day. Always check the plan against your real limits.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt gets a plan Marta will follow for her driving theory test?',
        options: [
          { text: 'I have 15 minutes at lunch on weekdays, my test is in 3 weeks, and I\'m weakest on road signs. Make a plan as a table with a quick self-test each day and review days.' },
          { text: 'Make me a driving study plan.', why: 'No time, date or weak spots.' },
          { text: 'How do I pass a driving test?', why: 'Advice, not a plan.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Day 21 is chaos and Lucía misses it. What\'s the best prompt?',
        options: [
          { text: '"Start the plan again from Day 1."', why: 'She\'d lose days she doesn\'t have.' },
          { text: '"I missed Day 21. Adjust the rest so I still finish by Day 29."' },
          { text: 'No prompt: give up on the opening', why: 'It\'s still reachable.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a plan you abandoned after missing a day or two? What would "adjust, don\'t quit" have looked like?',
    starters: ['I abandoned...', 'Adjusting would have meant...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for a study or habit plan with your real time, your days off, review days and a daily self-test. Put the first three days in your calendar now.',
  },
  notes: 'Planning principles: realistic constraints, distributed practice (spacing) and retrieval checks; implementation intentions (a set time and place) improve follow-through (Gollwitzer, 1999).',
};

export default lesson;

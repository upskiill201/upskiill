import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 11 — measuring time saved. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Measuring time saved',
  summary: 'Tobi asks: "Is all this AI actually saving us time?" Ada realises she doesn\'t know. Here\'s what research says, and how to measure your own.',
  minutes: 12,
  outcomes: [
    'Know what research says about AI and productivity',
    'Measure your own time saved simply',
    'Report it honestly',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What the research says',
      html:
        '<ul>' +
        '<li>In a 2023 experiment published in <em>Science</em>, Noy and Zhang found professionals using ChatGPT finished writing tasks about <strong>40% faster</strong>, with quality rated higher.</li>' +
        '<li>In a 2023 study of more than 5,000 customer-support agents, Brynjolfsson, Li and Raymond found an AI assistant raised issues resolved per hour by about <strong>14%</strong> on average, and by about <strong>34%</strong> for the least experienced workers.</li>' +
        '</ul>' +
        '<p>Big averages don\'t tell you about your own work. Measure it:</p>' +
        '<ol>' +
        '<li>Pick 3 tasks you do weekly.</li>' +
        '<li>Note how long each took before (roughly) and with AI, including checking time.</li>' +
        '<li>Note quality: fewer corrections? Faster replies?</li>' +
        '</ol>' +
        '<p>Count the checking time. An answer in 2 minutes that takes 20 to fix hasn\'t saved anything.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Measure 3 weekly tasks: time before, time with AI (including checking), and quality. Report honestly, including where AI didn\'t help.',
    },
  ],
  apply: {
    scenario: 'Ada measures her time saved for Tobi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Noy and Zhang (2023) find?',
        options: [
          { text: 'AI made people slower', why: 'Faster.' },
          { text: 'Writing tasks were about 40% faster with ChatGPT' },
          { text: 'No difference', why: 'About 40% faster.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'For the least experienced support agents, productivity rose by about what percentage?',
        answers: ['34', '34%'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Include when measuring time with AI?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'Time writing the prompt', group: 0 },
          { text: 'Time checking the answer', group: 0 },
          { text: 'Time fixing mistakes', group: 0 },
          { text: 'Time spent on lunch', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An AI answer takes 2 minutes but 20 to fix. Time saved, compared to 15 minutes by hand?',
        options: [
          { text: '13 minutes', why: 'Count the fixing time.' },
          { text: '20 minutes', why: 'It took longer overall.' },
          { text: 'None: it took 22 minutes, longer than doing it by hand' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen wants to know if AI is worth it for our team. What should I measure?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Pick three weekly tasks. Time them before and with AI, including checking, and note quality. Two weeks of data tells you a lot.' },
          { text: 'Just say it saves 40%.', why: 'Measure your own.' },
          { text: 'You can\'t measure it.', why: 'You can, simply.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Count the [[1]] time. Report where AI didn\'t [[2]] too.',
        blanks: [['checking'], ['help']],
        distractors: ['lunch', 'sleep'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s report to Tobi is misleading?',
        lines: [
          'Follow-ups: 25 min to 8 min, including checks',
          'Status update: 40 min to 10 min',
          'Research briefs: AI saves 40%, according to a study',
          'Contract review: no time saved; I don\'t use AI for it',
        ],
        bug: 2,
        fix: 'Research briefs: 3 hours to 1.5 hours, including checks',
        explanation: 'Use your own measurement, not someone else\'s average.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the study to its finding.',
        pairs: [
          ['Noy and Zhang (2023)', 'Writing about 40% faster'],
          ['Brynjolfsson et al. (2023)', 'Support agents about 14% more productive'],
          ['Your own measurement', 'What it means for your work'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s measurement rule.',
        tiles: ['Time', 'before,', 'time', 'with', 'AI,', 'quality'],
        distractors: ['guess'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Follow-ups went from 25 minutes to 8. How many minutes saved each time?',
        answers: ['17'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s measurement.',
        lines: ['Pick 3 weekly tasks', 'Note time before', 'Note time with AI, incl. checks', 'Note quality', 'Report honestly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why report where AI didn\'t help?',
        options: [
          { text: 'To look modest', why: 'To be accurate.' },
          { text: 'No reason', why: 'It\'s useful information.' },
          { text: 'It makes the whole report more trustworthy and guides where not to use it' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Pick three weekly tasks. Roughly how long do they take with and without AI, including checking?',
    starters: ['Task 1:', 'With AI:'],
  },
  deepen: { title: 'Try it today', summary: 'Time one AI-assisted task today, including checking. Compare with your usual time.' },
  notes: 'Noy & Zhang (2023), Science. Brynjolfsson, Li & Raymond (2023), NBER Working Paper 31161 "Generative AI at Work": 5,179 agents; +14% average, +34% for novice and low-skilled workers.',
};

export default lesson;

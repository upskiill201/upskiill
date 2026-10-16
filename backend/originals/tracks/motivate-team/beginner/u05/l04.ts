import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Step-by-step: running a hard week humanely. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'A hard week, run well',
  summary: 'Rollout week has five days and 59 clinics. Miracle wants to hit the goal AND have a team left on Monday. Tey walks her through running a hard week so people come out of it proud, not broken.',
  minutes: 12,
  outcomes: [
    'Run an intense week in five steps',
    'Protect people\'s energy while pushing hard',
    'Keep everyone informed without endless meetings',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A hard week in five steps',
      steps: [
        { title: '1. One clear daily target', body: '"13 a day." One number everyone can see and say. It turns a frightening total into a doable today.' },
        { title: '2. Share the hard parts', body: 'The worst clinics get split by the rota, not dumped on the best person. Chidi takes the north, Bisi the angriest, Halima the Hausa ones, Emmanuel the stuck logins. Nobody gets all the hard ones.' },
        { title: '3. Protect the basics', body: 'Real lunch, away from screens. Short breaks every two hours. Home by 7 p.m. The on-call phone covers evenings. Rested people make fewer mistakes, and these mistakes reach patients.' },
        { title: '4. Two short check-ins a day', body: '9 a.m.: today\'s target and who\'s doing what. 4 p.m.: how far, what\'s stuck, what Miracle can clear. Ten minutes each. Then Miracle sends Folake one line, so nobody else gets interrupted.' },
        { title: '5. Make progress visible, hourly', body: 'A big number on the board, updated every time a clinic goes live. Bisi rings a little bell. It sounds silly. It works.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Rollout week, two ways',
      before: { label: 'Push through', text: 'No target, just "as many as possible". Late nights. The best people take the hardest clinics. Folake messages everyone directly. By Thursday, mistakes and tears.' },
      after: { label: 'Run well', text: '13 a day. Hard clinics shared. Home by 7. Two 10-minute check-ins. One line to Folake. A bell for every clinic. By Thursday, 284 live, and the team is tired but laughing.' },
      notes: ['Same week, same team, same goal.', 'Protecting energy is a strategy, not a luxury.', 'Miracle absorbs the pressure from above, so the team can work.'],
    },
  ],
  apply: {
    scenario: 'Planning rollout week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['One clear daily target', 'Share the hard parts', 'Protect the basics', 'Two short check-ins a day', 'Make progress visible, hourly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Miracle send Folake one line instead of letting her message everyone?',
        options: [
          { text: 'Folake is annoying', why: 'She just wants to know. One line answers it.' },
          { text: 'The leader absorbs pressure from above, so the team can focus' },
          { text: 'To hide problems', why: 'The line is honest.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Runs the week well, or burns people out?',
        groups: ['Runs it well', 'Burns people out'],
        items: [
          { text: 'Home by 7, on-call covers evenings', group: 0 },
          { text: '"As many as possible", no target', group: 1 },
          { text: 'Hard clinics shared by rota', group: 0 },
          { text: 'Best person takes all the hard ones', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'Can I ring a bell every time a clinic goes live? Is that too silly?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Too silly, we need to focus.', why: 'Small celebrations help a hard week.' },
          { text: 'Only for the hard ones.', why: 'Every clinic counts this week.' },
          { text: 'Not silly at all. Ring it loud. Visible progress is one of the best things we can do this week.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Protecting energy is a ___, not a luxury. (one word)',
        answers: ['strategy', 'Strategy'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the move.',
        pairs: [
          ['One clear target', '13 a day'],
          ['Protect the basics', 'Home by 7'],
          ['Visible progress', 'Bisi\'s bell'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why only two 10-minute check-ins a day?',
        options: [
          { text: 'Enough to coordinate, short enough to protect working time' },
          { text: 'Meetings are banned', why: 'Two short ones help.' },
          { text: 'Miracle is busy', why: 'It\'s for the team\'s time.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s rollout plan. Which line breaks it?',
        lines: [
          '9 a.m. and 4 p.m. check-ins, 10 minutes each.',
          'Chidi takes all the hardest clinics, he\'s fastest.',
          'Home by 7; on-call covers evenings.',
        ],
        bug: 1,
        fix: 'Hard clinics shared by the rota.',
        explanation: 'Dumping every hard one on the best person is how the best person burns out.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Push [[1]] on the goal. Go [[2]] on the people.',
        blanks: [['hard'], ['easy', 'gentle']],
        distractors: ['soft', 'harder'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the daily target.',
        tiles: ['Thirteen', 'clinics', 'today.'],
        distractors: ['forty'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your next intense week. What\'s one daily target, one basic you\'ll protect, and one way you\'ll make progress visible?',
    starters: ['Daily target: ...', 'I\'ll protect...', 'Progress shown by...'],
  },
  deepen: {
    title: 'Protect one basic',
    summary: 'In your next hard week, pick one basic you won\'t sacrifice: lunch away from screens, home by a set time, or real breaks. Keep it every day.',
  },
  notes: 'Practices for sustained high-demand periods: clear proximal goals (Locke & Latham), workload sharing and recovery (Bakker & Demerouti; Sonnentag), leader buffering of upward pressure, visible progress (Amabile & Kramer). Fictional details.',
};

export default lesson;

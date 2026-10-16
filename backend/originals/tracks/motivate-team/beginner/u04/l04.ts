import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Myth or Fact: workload and burnout (Maslach; job demands–resources model, Bakker & Demerouti 2007). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Burnout isn\'t a personal failing',
  summary: 'Bisi did 19 clinics this week. She also answered clinic messages at 11 p.m. four nights running. Folake suggests a "resilience workshop" for the team. Miracle isn\'t sure that\'s the fix. Myth or fact?',
  minutes: 11,
  outcomes: [
    'Know what causes burnout at work',
    'Know the balance of demands and resources',
    'Fix workload, not just people\'s coping',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Burnout is mainly caused by people not being resilient enough.', isFact: false, explain: 'Myth. Researchers like Christina Maslach, who has studied burnout for decades, point mainly to the job: too much work, too little control, too little recognition, unfairness, a poor community or values that clash. The World Health Organization also describes burnout as coming from chronic workplace stress that hasn\'t been well managed.' },
        { text: 'Burnout depends on the balance between job demands and job resources.', isFact: true, explain: 'Fact. In the job demands–resources model (Arnold Bakker and Evangelia Demerouti, 2007), high demands (workload, pressure) wear people down, while resources (support, autonomy, feedback, recognition) protect them. Too many demands and too few resources lead to burnout.' },
        { text: 'A resilience workshop will fix a team that\'s overloaded.', isFact: false, explain: 'Myth, mostly. Coping skills can help a bit, but they don\'t remove the cause. Teaching Bisi to cope better with 11 p.m. messages is less useful than stopping 11 p.m. messages.' },
        { text: 'Your best people are often the most at risk.', isFact: true, explain: 'Fact, broadly. The most capable and committed people tend to get given more, say yes more, and care more, so they can burn out first. Bisi\'s 19 clinics are a warning sign as much as a win.' },
        { text: 'Resources like autonomy and recognition can protect people from high demands.', isFact: true, explain: 'Fact. That\'s why the earlier chapters matter: autonomy, feedback, recognition and support are resources, not extras. They help people handle demanding work.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Burnout comes mostly from the job, not weak people. Balance demands with resources. Fix the workload, not just the coping. Watch your best people.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: the resilience workshop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What mainly causes burnout, according to Maslach\'s research?',
        options: [
          { text: 'Weak personalities', why: 'That\'s the myth.' },
          { text: 'The job: workload, control, recognition, fairness, community, values' },
          { text: 'Not enough holidays only', why: 'Holidays help, but the job itself is the main cause.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Job demand or job resource?',
        groups: ['Demand', 'Resource'],
        items: [
          { text: '11 p.m. clinic messages', group: 0 },
          { text: 'Choosing how to onboard', group: 1 },
          { text: '19 clinics in a week', group: 0 },
          { text: 'Specific recognition', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Let\'s book a resilience workshop for Clinic Success.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Great idea, that\'ll fix it.', why: 'It treats the symptom, not the cause.' },
          { text: 'Workshops are useless.', why: 'Too strong. Lead with the real fix.' },
          { text: 'Happy to, if they want it. But the bigger fix is workload: Bisi did 19 clinics and 11 p.m. messages. Can we set out-of-hours rules first?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bakker and Demerouti\'s model: job demands and job ___. (one word)',
        answers: ['resources', 'Resources'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the researchers.',
        pairs: [
          ['Six causes of burnout', 'Christina Maslach'],
          ['Demands and resources', 'Bakker and Demerouti'],
          ['Chronic workplace stress', 'World Health Organization'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is Bisi\'s 19-clinic week a warning sign?',
        options: [
          { text: 'The most committed people often get given more and burn out first' },
          { text: 'She\'s showing off', why: 'She\'s committed.' },
          { text: 'It isn\'t', why: 'Combined with 11 p.m. messages, it is.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s workload plan. Which line treats the symptom, not the cause?',
        lines: [
          'Clinic messages after 8 p.m. go to an on-call rota.',
          'Teach Bisi breathing exercises for late-night stress.',
          'No one carries more than 15 clinics a week.',
        ],
        bug: 1,
        fix: 'Spread Bisi\'s clinics so her load matches everyone\'s.',
        explanation: 'Breathing exercises help with stress. They don\'t stop the 11 p.m. messages.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put preventing burnout in order.',
        lines: ['Spot who\'s overloaded', 'Reduce the demands', 'Add resources', 'Check again next week'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Fix the [[1]], not just the [[2]].',
        blanks: [['workload', 'job', 'demands'], ['coping', 'person']],
        distractors: ['pizza', 'rota'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s new rule.',
        tiles: ['No', 'clinic', 'messages', 'after', '8', 'p.m.'],
        distractors: ['before'],
      },
    ],
  },
  reflect: {
    prompt: 'What are the biggest demands in your work or studies right now? What resources help you handle them? Which is missing?',
    starters: ['My biggest demands are...', 'What helps is...', 'What\'s missing is...'],
  },
  deepen: {
    title: 'Check your best person',
    summary: 'If you lead people, check on the person who always says yes. Look at their actual workload this week, not their mood.',
  },
  notes: 'Christina Maslach & Michael P. Leiter (e.g. "Understanding the burnout experience", World Psychiatry 2016): six areas of worklife (workload, control, reward, community, fairness, values). Arnold B. Bakker & Evangelia Demerouti (2007), "The Job Demands-Resources model: state of the art", J. Managerial Psychology 22(3). WHO ICD-11 (2019) burn-out definition. Limited effect of individual-only interventions on organisational causes: e.g. Fleming (2024), hedged.',
};

export default lesson;

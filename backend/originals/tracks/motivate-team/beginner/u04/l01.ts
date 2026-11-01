import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story: the same "great job" for everyone, and Halima doing every Saturday. Fairness. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Great job, everyone"',
  summary: 'Week 6, Friday stand-up. Miracle says, warmly: "Great job, everyone!" Bisi onboarded 19 clinics this week. Emmanuel onboarded four. Same words. Then Bisi notices the weekend rota: Halima has done every Saturday since she joined.',
  minutes: 11,
  outcomes: [
    'See how unfairness quietly drains motivation',
    'Notice that identical praise can feel unfair',
    'Know this chapter\'s goal: make sure everyone is treated fairly and seen',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 6, Friday, 9:05 a.m.',
      beats: [
        { speaker: 'miracle', text: 'Great job, everyone! What a week.' },
        { speaker: 'bisi', text: '(after stand-up, quietly) Nineteen clinics. Emmanuel did four. "Great job, everyone." And have you seen the Saturday rota? Halima\'s done every one since she started. Because she\'s new and won\'t say no.' },
        { speaker: 'narrator', text: 'Miracle checks the rota. It\'s true. Nobody planned it. It just happened, because the old rule was "whoever\'s free", and Halima always says she\'s free.' },
        { speaker: 'halima', text: '(later) It\'s fine. I don\'t mind Saturdays.' },
      ],
      choice: {
        prompt: 'What should Miracle do?',
        options: [
          {
            text: 'Thank Bisi for telling her, recognise each person\'s week specifically, and fix the rota with the whole team.',
            outcome: 'Monday: a new rota, built together, one Saturday each a month. Bisi\'s 19 clinics get named at stand-up. Halima says, very quietly, "Thank you."',
            best: true,
          },
          {
            text: 'Take Halima at her word: she said she doesn\'t mind.',
            outcome: 'Halima keeps doing Saturdays. In Week 9 she stops saying she\'s free for anything.',
          },
          {
            text: 'Tell Emmanuel he needs to catch up to Bisi.',
            outcome: 'Emmanuel feels singled out. Bisi still hasn\'t been recognised. The rota still isn\'t fixed.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Unfairness rarely announces itself. It shows up as identical praise for very different weeks, a rota that quietly lands on the person least likely to complain, or a rule like \"whoever's free\" that punishes the helpful. People notice. And when work feels unfair, motivation drains fast. <strong>This chapter:</strong> fairness, recognition that works, workload and burnout, fair rotas, and belonging.</p>",
    },
  ],
  apply: {
    scenario: 'Friday, after stand-up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "Great job, everyone!" bother Bisi?',
        options: [
          { text: 'She doesn\'t like praise', why: 'She wanted her work seen.' },
          { text: 'Very different weeks got identical praise, so her work went unseen' },
          { text: 'She dislikes Emmanuel', why: 'It\'s about fairness, not him.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair or unfair?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'One Saturday each a month', group: 0 },
          { text: '"Whoever\'s free" every Saturday', group: 1 },
          { text: 'Each person\'s week named specifically', group: 0 },
          { text: 'The same praise for 19 and 4 clinics', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'It\'s fine. I don\'t mind Saturdays.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Great, you can keep them then.', why: 'New people often say "fine" when they don\'t mean it.' },
          { text: 'Why didn\'t you complain?', why: 'Makes her feel it was her fault.' },
          { text: 'Thank you for doing them. But it shouldn\'t all fall on you. We\'re making a fair rota on Monday, together.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A rule like "whoever\'s free" quietly punishes the most ___. (one word)',
        answers: ['helpful', 'Helpful', 'willing', 'generous'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s fix in order.',
        lines: ['Thank Bisi for telling her', 'Check the facts', 'Recognise each week specifically', 'Build a fair rota together'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not just tell Emmanuel to catch up?',
        options: [
          { text: 'It singles him out without fixing recognition or the rota' },
          { text: 'He\'s doing fine', why: 'Maybe not, but that\'s a separate conversation.' },
          { text: 'He\'d quit', why: 'It\'s about fixing the real problems.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s Monday plan. Which line keeps the unfairness?',
        lines: [
          'Build a rota with the whole team: one Saturday each a month.',
          'Keep "whoever\'s free" for extra weekend cover.',
          'At stand-up, name what each person did this week.',
        ],
        bug: 1,
        fix: 'Extra weekend cover rotates too, and is paid back with time off.',
        explanation: '"Whoever\'s free" will land on Halima again.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 3 review.',
        pairs: [
          ['Overjustification', 'A reward replacing the reason'],
          ['Learning goal', 'Find ways before a target'],
          ['Progress principle', 'Small wins on meaningful work'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Make sure everyone is treated [[1]] and [[2]].',
        blanks: [['fairly'], ['seen', 'noticed']],
        distractors: ['equally', 'paid'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s promise to Halima.',
        tiles: ['It', 'shouldn\'t', 'all', 'fall', 'on', 'you.'],
        distractors: ['me.'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever done more than others and received the same thanks? Or been given the jobs nobody wanted? How did it affect you?',
    starters: ['I did more when...', 'It made me feel...'],
  },
  deepen: {
    title: 'Check the rota',
    summary: 'If you organise any shared work (shifts, chores, group tasks), check who\'s actually been doing the unpopular parts. Is it the person least likely to complain?',
  },
  notes: 'Story setup. Perceived fairness and motivation: equity theory and organisational justice (lesson 2). Fictional details.',
};

export default lesson;

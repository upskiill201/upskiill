import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 13 — turning goals into steps (implementation intentions). */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Turning goals into steps',
  summary: '"Get 50 active shops" is a goal. Goals don\'t do themselves. Learn the "when-then" trick that makes plans far more likely to happen.',
  minutes: 12,
  outcomes: [
    'Turn a goal into concrete steps',
    'Write "when-then" plans',
    'Use AI to make goals specific and measurable',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Tolu\'s goal, before and after',
      before: {
        label: 'Goal only',
        text: '"Keep shops active during the pilot."',
      },
      after: {
        label: 'Goal with when-then steps',
        text: 'Goal: at least 40 of 50 shops make a payment every week.\n- When it\'s Monday 9am, then I check last week\'s active shops in the dashboard.\n- When a shop has no payments for 7 days, then I call them that day.\n- When a shop says the app is confusing, then I book a 10-minute visit within 2 days.',
      },
      notes: [
        'The goal now has a number: 40 of 50, every week.',
        'Each step says when it happens and what to do.',
        'Research on these "if-then plans" (implementation intentions) shows they make people much more likely to follow through.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make the goal measurable, then write "When [situation], then I [action]." Ask AI to suggest the situations you\'ll face.',
    },
  ],
  apply: {
    scenario: 'Tolu turns his goal into steps.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes "40 of 50 shops pay every week" better than "keep shops active"?',
        options: [
          { text: 'It\'s longer', why: 'Measurability is the point.' },
          { text: 'It\'s measurable: you can tell if it happened' },
          { text: 'It sounds harder', why: 'It\'s checkable.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build one of Tolu\'s when-then steps.',
        tiles: ['When', 'a', 'shop', 'is', 'silent', 'for', '7', 'days,', 'then', 'I', 'call'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'When-then plan, or vague intention?',
        groups: ['When-then', 'Vague'],
        items: [
          { text: 'When it\'s Monday 9am, then I check the dashboard', group: 0 },
          { text: 'I\'ll keep an eye on things', group: 1 },
          { text: 'When a shop reports a problem, then I visit within 2 days', group: 0 },
          { text: 'I\'ll try to call shops sometimes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns the goal into steps best?',
        options: [
          { text: 'Help me keep shops active.', why: 'Too vague.' },
          { text: 'My goal: 40 of 50 shops pay every week. List the 5 most likely situations that will threaten it, and for each write a "When ..., then I ..." step.' },
          { text: 'Motivate me.', why: 'Not a plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What\'s Tolu\'s plan if shops stop using the app?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'He\'ll try his best.', why: 'Give the concrete plan.' },
          { text: 'They won\'t stop.', why: 'Plan for it anyway.' },
          { text: 'When a shop has no payments for 7 days, he calls them that day. If it\'s confusion, he visits within 2 days.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the pattern.',
        template: '[[1]] [situation], [[2]] I [action].',
        blanks: [['When'], ['then']],
        distractors: ['Maybe', 'perhaps'],
      },
      {
        kind: 'findBug',
        prompt: 'Which step isn\'t a real when-then plan?',
        lines: [
          'When it\'s Monday 9am, then I check active shops.',
          'When a shop is silent 7 days, then I call.',
          'I will be more proactive with shops.',
          'When a shop is confused, then I visit within 2 days.',
        ],
        bug: 2,
        fix: 'When a new shop signs up, then I call them on day 3.',
        explanation: 'No situation, no specific action.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tolu\'s goal: at least how many of 50 shops pay every week?',
        answers: ['40', 'forty'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to Tolu\'s action.',
        pairs: [
          ['Monday 9am', 'Check the dashboard'],
          ['Shop silent 7 days', 'Call them'],
          ['Shop finds it confusing', 'Visit within 2 days'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the goal-to-steps process.',
        lines: ['Make the goal measurable', 'List likely situations', 'Write a when-then for each', 'Put them in your calendar'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Measurable goal, or not?',
        groups: ['Measurable', 'Not measurable'],
        items: [
          { text: '40 of 50 shops pay weekly', group: 0 },
          { text: 'Shops are happy', group: 1 },
          { text: 'Support calls answered within 1 hour', group: 0 },
          { text: 'Great customer experience', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do when-then plans work?',
        options: [
          { text: 'The situation becomes a cue that triggers the action' },
          { text: 'They\'re longer', why: 'It\'s the cue-action link.' },
          { text: 'They don\'t', why: 'Research shows they help.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick one goal you have. Write two "When..., then I..." plans for it.',
    starters: ['The goal:', 'When..., then I...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for the 5 situations that threaten your goal, and write a when-then for each.' },
  notes: 'Gollwitzer & Sheeran (2006), Advances in Experimental Social Psychology: meta-analysis of 94 studies found implementation intentions had a medium-to-large effect on goal attainment (d = 0.65). Pilot figures fictional.',
};

export default lesson;

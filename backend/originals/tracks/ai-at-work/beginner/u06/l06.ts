import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 6 — estimating how long things take (the planning fallacy). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Estimating how long things take',
  summary: 'Tolu says the shop sign-ups will take "a week". Research says almost everyone underestimates. Here\'s how to estimate more honestly, with AI\'s help.',
  minutes: 12,
  outcomes: [
    'Explain the planning fallacy',
    'Estimate from past cases, not hope',
    'Use AI to find hidden steps that add time',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why we underestimate',
      html:
        '<p>In a famous 1994 study, psychologists Roger Buehler, Dale Griffin and Michael Ross asked students when they\'d finish their thesis. On average they predicted about <strong>34 days</strong>. It actually took about <strong>56 days</strong>. Even their "worst case" guesses were too optimistic.</p>' +
        '<p>This is the <strong>planning fallacy</strong>: we imagine the task going smoothly and forget delays, waiting and other work.</p>' +
        '<h3>Three fixes</h3>' +
        '<ol>' +
        '<li><strong>Look at past cases.</strong> "How long did the last pilot\'s sign-ups actually take?"</li>' +
        '<li><strong>Find hidden steps.</strong> Ask AI: "List every step and every wait in this task, including things that usually get forgotten."</li>' +
        '<li><strong>Add a buffer</strong> and say it out loud: "Two weeks, likely, three at worst."</li>' +
        '</ol>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Estimate from what actually happened last time, list the hidden steps and waits, then give a range, not a single date.',
    },
  ],
  apply: {
    scenario: 'Tolu is estimating the shop sign-ups.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the planning fallacy?',
        options: [
          { text: 'Planning too much', why: 'It\'s about time estimates.' },
          { text: 'Underestimating how long tasks will take' },
          { text: 'Refusing to plan', why: 'It\'s about optimism.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Buehler\'s study, students predicted about 34 days. About how many did it really take?',
        answers: ['56', '55', '55.5'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Hidden step or wait that often gets forgotten?',
        groups: ['Often forgotten', 'Usually remembered'],
        items: [
          { text: 'Waiting for Tobi\'s sign-off', group: 0 },
          { text: 'Visiting the shops', group: 1 },
          { text: 'Shops asking to "come back next week"', group: 0 },
          { text: 'Printing flyers', group: 1 },
          { text: 'A public holiday that week', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best uncovers hidden time?',
        options: [
          { text: 'How long will this take?', why: 'Gets one optimistic number.' },
          { text: 'List every step and every wait in signing up 50 market shops, including things that are usually forgotten. Then suggest a likely and a worst-case time.' },
          { text: 'Make it faster.', why: 'Doesn\'t estimate.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tolu says sign-ups take one week. Can I tell Carmen that?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, one week.', why: 'Likely optimistic.' },
          { text: 'We can\'t estimate it.', why: 'A range is honest and useful.' },
          { text: 'Let\'s say two weeks likely, three at worst. Shops ask to come back later, and there\'s a holiday that week.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Estimate from what [[1]] happened last time, and give a [[2]], not a single date.',
        blanks: [['actually'], ['range']],
        distractors: ['hopefully', 'guess'],
      },
      {
        kind: 'findBug',
        prompt: 'Which estimate shows the planning fallacy?',
        lines: [
          'Bank call: 30 min (done many times)',
          'Flyer: 2 days including Lucía\'s review',
          'Sign 50 shops: 2 days, assuming everyone says yes first time',
          'Budget sign-off: up to a week (Tobi travels)',
        ],
        bug: 2,
        fix: 'Sign 50 shops: 2 weeks likely, 3 at worst.',
        explanation: '"Everyone says yes first time" is the smooth-path fantasy.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fix to how it helps.',
        pairs: [
          ['Past cases', 'Replace hope with evidence'],
          ['Hidden steps', 'Find forgotten time'],
          ['A range', 'Be honest about uncertainty'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s honest estimate.',
        tiles: ['Two', 'weeks', 'likely,', 'three', 'at', 'worst'],
        distractors: ['definitely'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a better estimate.',
        lines: ['Check past cases', 'List hidden steps and waits', 'Add a buffer', 'Give a range'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest estimate, or optimistic?',
        groups: ['Honest', 'Optimistic'],
        items: [
          { text: '"2 weeks likely, 3 at worst"', group: 0 },
          { text: '"Easy, a couple of days"', group: 1 },
          { text: '"Last time it took 16 days"', group: 0 },
          { text: '"If nothing goes wrong, Friday"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why were even the students\' "worst case" guesses too short?',
        options: [
          { text: 'People still imagine things going fairly smoothly' },
          { text: 'They were lazy', why: 'It\'s a general human bias.' },
          { text: 'They were right', why: 'They took longer.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a task you underestimated. What hidden steps or waits did you forget?',
    starters: ['The task:', 'I forgot...'],
  },
  deepen: { title: 'Try it today', summary: 'For your next estimate, ask AI for every step and wait, then give a likely and worst-case time.' },
  notes: 'Buehler, Griffin & Ross (1994), Journal of Personality and Social Psychology: predicted ~33.9 days, actual ~55.5 days for thesis completion. Planning fallacy coined by Kahneman & Tversky (1979).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 9 — planning an event or launch. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Planning an event or launch',
  summary: 'The pilot opens with a launch morning at Makola market. Plan it backwards from the day, with AI filling in the details you\'d forget.',
  minutes: 12,
  outcomes: [
    'Plan an event backwards from the date',
    'Use AI to build a run-of-show and a "things to bring" list',
    'Add a plan B for the most likely problems',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Plan the launch morning backwards',
      steps: [
        { title: '1. Fix the date and the goal', body: '1 September, 8am-12pm: 20 shops make their first live payment, with the partner bank there to see it.' },
        { title: '2. Work backwards', body: 'Ask AI: "Our launch is 1 September. List what must be done by 1 week, 3 days and the day before."' },
        { title: '3. Run of show', body: 'Who does what, minute by minute on the morning: setup 7am, welcome 8am, first payments 8:30...' },
        { title: '4. Things to bring', body: 'Phones charged, printed flyers, a banner, power banks, the support number on every table. AI is great at this list.' },
        { title: '5. Plan B', body: '"What are the 3 most likely problems, and what do we do?" Network down? Bring a backup mobile data plan.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fix the date and goal, work backwards, write a run of show, list what to bring, and have a plan B for the top three problems.',
    },
  ],
  apply: {
    scenario: 'Tolu plans the Makola launch morning.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the planning steps.',
        lines: ['Fix the date and goal', 'Work backwards', 'Run of show', 'Things to bring', 'Plan B'],
      },
      {
        kind: 'mcq',
        prompt: 'Why plan backwards from the date?',
        options: [
          { text: 'You can see what must be done by when, so nothing is left too late' },
          { text: 'It\'s more fun', why: 'It shows deadlines clearly.' },
          { text: 'Forwards is impossible', why: 'Backwards just shows the deadlines.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Run of show, or things to bring?',
        groups: ['Run of show', 'Things to bring'],
        items: [
          { text: '8:00 welcome by Tolu', group: 0 },
          { text: 'Power banks', group: 1 },
          { text: '8:30 first live payments', group: 0 },
          { text: 'Printed flyers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the best plan B?',
        options: [
          { text: 'What could go wrong?', why: 'You\'ll get a long, generic list.' },
          { text: 'For a launch morning in an outdoor Accra market with 20 shops making first payments, what are the 3 most likely problems, and a simple fix for each?' },
          { text: 'Will it go well?', why: 'It can\'t know.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if the mobile network goes down during the launch?',
        prompt: 'Best reply from Tolu\'s plan?',
        options: [
          { text: 'Plan B: we\'ll have a backup data plan on a second network, and we\'ll do the first payments again in the afternoon if needed.' },
          { text: 'It won\'t.', why: 'Plan for the likely problems.' },
          { text: 'Then we cancel the pilot.', why: 'Plan B, not cancel.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the plan B request.',
        template: 'What are the [[1]] most likely problems, and what do we [[2]]?',
        blanks: [['3', 'three'], ['do']],
        distractors: ['30', 'cry'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops make their first live payment at the launch?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which item on the backwards plan is too late?',
        lines: [
          '1 week before: confirm the bank\'s attendance',
          '3 days before: print flyers',
          'The morning of: order the banner',
          'Day before: charge phones and power banks',
        ],
        bug: 2,
        fix: '1 week before: order the banner',
        explanation: 'You can\'t order a banner on the morning and have it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the plan B.',
        pairs: [
          ['Network down', 'Backup data plan'],
          ['Phones die', 'Power banks'],
          ['Shop owner can\'t come', 'Two reserve shops on standby'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s backwards-planning request.',
        tiles: ['List', 'what', 'must', 'be', 'done', 'by', 'when'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'AI can draft it, or Tolu must confirm with people?',
        groups: ['AI drafts', 'Confirm with people'],
        items: [
          { text: 'A "things to bring" list', group: 0 },
          { text: 'Whether the bank will attend', group: 1 },
          { text: 'A first run of show', group: 0 },
          { text: 'Which 20 shops take part', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why limit plan B to the top three problems?',
        options: [
          { text: 'You can actually prepare for three; a list of thirty gets ignored' },
          { text: 'Only three things can go wrong', why: 'Many can; prepare for the likeliest.' },
          { text: 'It\'s a superstition', why: 'It\'s practical.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of an event or launch you have coming. What\'s its most likely problem, and plan B?',
    starters: ['The event:', 'Plan B:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for a "things to bring" list for your next event or big meeting. Note what you\'d have forgotten.' },
  notes: 'Dates and details fictional.',
};

export default lesson;

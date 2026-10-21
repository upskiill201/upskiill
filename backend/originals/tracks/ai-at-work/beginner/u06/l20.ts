import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 20 — Unit Challenge. Launch month. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: launch month',
  summary: 'From Tolu\'s three pages of notes to launch morning at Makola market, with a bank delay in the middle. Every Unit 6 skill, under pressure.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 6 skill on one real project', 'Prove you can plan, adapt and report with AI'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 6\'s final challenge. Launch month: plan, prepare, replan, launch.', replies: ['Let\'s go'] },
        { tey: 'The theme: AI drafts the plan; people agree it; honest updates keep it on track. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Week 1. Tolu\'s three pages of notes.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Week 1, Monday. Which request turns the notes into a plan?',
        options: [
          { text: 'Plan the pilot.', why: 'No shape.' },
          { text: 'From these notes, plan a 3-month pilot: phases, tasks, owner roles, rough dates. Then list questions the notes don\'t answer.' },
          { text: 'Write the final plan.', why: 'AI drafts; people agree.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 1. Clear action or wish?',
        groups: ['Action', 'Wish'],
        items: [
          { text: 'Book a call with the bank (10 min)', group: 0 },
          { text: 'Bank?', group: 1 },
          { text: 'List 60 Makola shops (1 hr)', group: 0 },
          { text: 'Shops', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Week 1. Which estimate shows the planning fallacy?',
        lines: ['Flyer: 2 days incl. review', 'Bank call: 30 min', 'Sign 50 shops: 2 days, all say yes first time', 'Sign-off: up to a week'],
        bug: 2,
        fix: 'Sign 50 shops: 2 weeks likely, 3 at worst.',
        explanation: 'The smooth-path fantasy.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Week 1. Build the pre-mortem opener.',
        tiles: ['It\'s', 'December.', 'The', 'pilot', 'failed.', 'Why?'],
        distractors: ['worked.'],
      },
      {
        kind: 'findBug',
        prompt: 'Week 2. Which plan row has an ownership problem?',
        lines: ['Flyers: Tolu, 25 Aug', 'Settlement: Ada, 20 Aug', 'Support rota: everyone', 'Banner: Tolu, 22 Aug'],
        bug: 2,
        fix: 'Support rota: Tolu owns; Ada helps.',
        explanation: '"Everyone" means no one.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 2, Monday. Sort the tasks.',
        groups: ['Do now', 'Schedule', 'Drop'],
        items: [
          { text: 'Budget to Tobi by Thursday', group: 0 },
          { text: 'Pilot review template', group: 1 },
          { text: 'Rename old files', group: 2 },
          { text: 'Fix the sign-up form', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Week 2. Order Tolu\'s sign-up checklist test.',
        lines: ['Write out the process', 'Ask AI for easy-to-miss steps', 'Try it at one shop', 'Trim it'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Week 3. The bank says settlement is two weeks late! Is the launch off?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Not off. We\'re taking two options to Tobi today: on time with manual daily settlement, or two weeks later. Decision tonight.' },
          { text: 'Yes, it\'s off.', why: 'There are options.' },
          { text: 'What delay?', why: 'Don\'t hide it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Week 3. Which replanning request?',
        options: [
          { text: 'Fix it.', why: 'Too vague.' },
          { text: 'Here\'s the plan and the bank\'s email. Which tasks does this affect, and what are 3 realistic options with their costs and risks?' },
          { text: 'Rewrite everything.', why: 'Replan only what\'s affected.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Week 3, Friday. Complete Tolu\'s status.',
        template: 'Status: [[1]]. Settlement delayed; manual settlement agreed. Help needed: Tobi to [[2]] the extra bank fee.',
        blanks: [['amber', 'Amber'], ['approve']],
        distractors: ['green', 'ignore'],
      },
      {
        kind: 'orderLines',
        prompt: 'Week 4. Order the launch planning.',
        lines: ['Fix date and goal', 'Work backwards', 'Run of show', 'Things to bring', 'Plan B'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Week 4. Match the launch problem to the plan B.',
        pairs: [
          ['Network down', 'Backup data plan'],
          ['Phones die', 'Power banks'],
          ['Shop owner absent', 'Reserve shops on standby'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Launch morning: 18 of the 20 planned shops made a first payment. How many didn\'t?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Week 5. Build a when-then plan for the pilot.',
        tiles: ['When', 'a', 'shop', 'is', 'silent', '7', 'days,', 'then', 'I', 'call'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 5, Friday. Useful review note or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Mornings sign up faster; visit before 11am', group: 0 },
          { text: 'Busy week', group: 1 },
          { text: 'Sign-offs slow; ask Mondays', group: 0 },
          { text: 'Things happened', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Month 5. The pilot\'s data is in: 3,000 rows of sign-ups and payments. Carmen wants the story in tomorrow\'s 9am meeting. Help?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes. Send me the spreadsheet tonight. I\'ll use AI to help clean it and find the main trends, and check every number before 9.' },
          { text: 'I\'ll let the AI read it and send whatever it says.', why: 'Numbers need checking.' },
          { text: 'Spreadsheets aren\'t my thing.', why: 'That\'s exactly what Unit 7 teaches.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 6?',
        options: [
          { text: 'AI drafts plans fast; people agree owners and priorities; honest updates and quick replans keep it on track' },
          { text: 'A perfect plan never changes', why: 'Plans change; replan fast.' },
          { text: 'AI should run the project', why: 'People run it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 6! What\'s one planning habit you\'ll start this week?',
    starters: ['The habit:', 'I\'ll start on...'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 7: the spreadsheet nobody understood. 3,000 rows of pilot data and a meeting at nine.' },
  notes: 'Review of the whole unit. Content fictional.',
};

export default lesson;

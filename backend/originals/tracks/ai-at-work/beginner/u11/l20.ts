import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 20 — Unit Challenge. Playbook month. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: playbook month',
  summary: 'Four weeks to turn 300 scattered chats into a team playbook: saved prompts, templates, chains, a routine, an automation and an honest report to Tobi.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 11 skill to build a real playbook', 'Prove your AI habits save time and stay safe'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 11\'s final challenge. Playbook month, week by week.', replies: ['Let\'s go'] },
        { tey: 'The theme: save what works, make it reusable, measure it, keep it improving. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Week 1. 300 chats.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Week 1. Save it, or not?',
        groups: ['Save', 'Don\'t'],
        items: [
          { text: 'Weekly follow-up prompt', group: 0 },
          { text: 'One-off birthday poem', group: 1 },
          { text: 'Daily pre-send check', group: 0 },
          { text: 'A prompt that failed', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Week 1. Order a library entry.',
        lines: ['Name', 'When to use it', 'The prompt', 'What to check', 'Last updated'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Week 1. Which template is best?',
        options: [
          { text: 'Summarise this.', why: 'No blanks or rules.' },
          { text: 'Summarise [DOCUMENT] for [READER, ROLE] in [NUMBER] bullets. Use only the document, with page numbers. Flag anything unclear.' },
          { text: 'Summarise the pilot report for Lucía.', why: 'One-off.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Week 1. Which custom instruction line must go?',
        lines: ['Product designer at a Lagos startup', 'Plain British English', 'Partner bank login and password', 'Never invent figures'],
        bug: 2,
        fix: 'Delete it and change the password.',
        explanation: 'Stored and sent with every chat.',
      },
      {
        kind: 'orderLines',
        prompt: 'Week 2. Order the monthly report chain.',
        lines: ['Summarise the table', 'Check it', 'Pick three points', 'Draft the one-pager', 'Pre-send check'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 2. Continue the chat, or start fresh?',
        groups: ['Continue', 'Fresh'],
        items: [
          { text: 'One more tweak, same report', group: 0 },
          { text: 'A new, unrelated task', group: 1 },
          { text: 'Shorten what you just got', group: 0 },
          { text: 'A drifting 80-message chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Week 2. I removed "only include what we agreed" from the follow-up. It\'s cleaner!',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Great, cleaner is better.', why: 'Key rule removed.' },
          { text: 'That line stops invented promises. I\'ve added a "why" note. Want to suggest a shorter version that keeps it?' },
          { text: 'Never edit anything.', why: 'Suggestions welcome.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Week 3. Match the shared-library rule to what it prevents.',
        pairs: [
          ['Owner approves', 'Accidental breakage'],
          ['"Why" notes', 'Key lines removed'],
          ['Dates', 'Version confusion'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Week 3. Order the Friday automation.',
        lines: ['Trigger: Friday 3pm', 'Export numbers', 'AI drafts the update', 'Draft to inbox', 'Ada checks and sends'],
      },
      {
        kind: 'mcq',
        prompt: 'Week 3. The tool updated and the summary template now rambles. Fix?',
        options: [
          { text: 'Stop using summaries', why: 'It\'s fixable.' },
          { text: 'Ignore it', why: 'It wastes time.' },
          { text: 'Add "exactly 5 bullets, no introduction", test it, update the library with a date' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Week 4. Follow-ups went from 25 to 8 minutes, five times a week. Minutes saved per week?',
        answers: ['85'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Week 4. Which line in Ada\'s report to Tobi is misleading?',
        lines: ['Follow-ups: 85 min saved a week, incl. checks', 'Status: 30 min saved a week', 'Research: "AI saves 40%", per a study', 'Contracts: no AI; legal handles them'],
        bug: 2,
        fix: 'Research: 1.5 hours saved a week, incl. checks.',
        explanation: 'Use her own measurements.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Week 4. Faster with AI, or yourself?',
        groups: ['AI', 'Yourself'],
        items: [
          { text: 'Long report summary', group: 0 },
          { text: '"Thanks!"', group: 1 },
          { text: 'Proposal first draft', group: 0 },
          { text: 'One typo', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Week 4. Tolu says he can\'t write a summary without AI anymore. Is that a problem?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'A little. He\'s drafting one a week himself now and comparing with AI. His judgement is what catches its mistakes.' },
          { text: 'No, AI does it.', why: 'Skills matter.' },
          { text: 'Ban AI for him.', why: 'Balance.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Friday. Complete Ada\'s AI review.',
        template: 'What helped, what didn\'t, what to [[1]], one [[2]].',
        blanks: [['save'], ['change']],
        distractors: ['delete', 'excuse'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Month 10. Carmen got pitched five new AI tools this week. She wants your view on which, if any, our teams should use. Help?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Pick the newest one.', why: 'Next unit: choosing well.' },
          { text: 'Use all five.', why: 'Too many tools.' },
          { text: 'Happy to. Let\'s start from the tasks your team does, then compare tools on those, including cost and data safety.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the one idea behind all of Unit 11?',
        options: [
          { text: 'Write every prompt from scratch', why: 'Save and reuse.' },
          { text: 'Save what works, make it reusable and shareable, measure it honestly, and keep improving it' },
          { text: 'Automate everything', why: 'Automate with checks.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 11! What\'s the first page of your own playbook going to say?',
    starters: ['My first prompts:', 'My don\'ts:'],
  },
  deepen: { title: 'Coming next', summary: 'Unit 12: too many tools. Every week a new AI tool. Which ones are worth it?' },
  notes: 'Review of the whole unit. Content fictional.',
};

export default lesson;

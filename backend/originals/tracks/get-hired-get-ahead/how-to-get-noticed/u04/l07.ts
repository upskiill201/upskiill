import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 7 — why them: researching a company honestly. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Why them',
  summary: '"Why do you want to work here?" Clinton\'s honest answer is "because I need a job and you\'re famous." Tey shows him how 20 minutes of research turns that into a real, specific reason.',
  minutes: 11,
  outcomes: ['Research a company in 20 minutes', 'Pick one or two real details to mention', 'Connect them to your own story honestly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Paragraph two is "why them". Clinton writes: "Njangi Pay is a leading fintech with a great reputation." Swap-the-name test?',
          replies: ['Fails', 'Could be any company'],
        },
        {
          tey: 'Fails. So, research. Twenty minutes, four places. Their website: what they actually do, and for whom. Their news: a recent launch, an expansion, an award. Their social posts: what they\'re proud of this month. And their people: what employees say on LinkedIn.',
          replies: ['What do I do with it?'],
        },
        {
          tey: 'Pick one or two details that genuinely connect to you. Clinton finds that Njangi Pay just launched contribution reminders, the very thing his mum\'s treasurer wanted. That\'s gold: "Your new reminders feature is the thing my mum\'s treasurer asked me for in week one."',
          replies: ['What if nothing connects?'],
        },
        {
          tey: 'Then be honest about what draws you: the problem they solve, the customers they serve, the way they work. Never invent a connection or pretend you\'ve used a product you haven\'t. Real, small and specific beats big and fake.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Twenty minutes: their website, their news, their posts, their people. Then one or two real details that connect to you.',
    },
  ],
  apply: {
    scenario: 'Clinton researches Njangi Pay.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each research place to what you find there.',
        pairs: [
          ['Their website', 'What they do and for whom'],
          ['Their news', 'A recent launch or expansion'],
          ['Their people on LinkedIn', 'What employees say about working there'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which "why them" sentence is best?',
        options: [
          { text: '"Njangi Pay is a leading fintech with a great reputation."', why: 'Fails the swap-the-name test.' },
          { text: '"Your new contribution reminders are exactly what my mum\'s treasurer asked me for in week one."' },
          { text: '"I need a job and you\'re famous."', why: 'Honest, but not the reason to lead with.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good "why them" detail, or not?',
        groups: ['Good detail', 'Not useful'],
        items: [
          { text: 'They just launched contribution reminders', group: 0 },
          { text: 'They are "innovative"', group: 1 },
          { text: 'They serve savings groups in rural areas too', group: 0 },
          { text: 'Their office has nice chairs', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I say I\'ve used their app? I haven\'t, but it would sound good.',
        options: [
          { text: 'No. I\'ll download it today, try it, and then say honestly what I noticed.' },
          { text: 'Yes, they\'ll never know.', why: 'They might ask what he thought of it. Honesty first.' },
          { text: 'Say I helped build it.', why: 'That\'s a lie.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the invented connection.',
        lines: ['Your reminders feature is what my mum\'s treasurer wanted.', 'I have used Njangi Pay every day for five years.', 'You serve groups like the one my mum belongs to.'],
        bug: 1,
        explanation: 'He hasn\'t, and they could easily find out. Only say what\'s true.',
      },
      {
        kind: 'mcq',
        prompt: 'What if nothing about the company connects to your life?',
        options: [
          { text: 'Be honest about what draws you: the problem, the customers, the way they work' },
          { text: 'Invent a connection', why: 'Never. Small and true beats big and fake.' },
          { text: 'Don\'t apply', why: 'You can still have a genuine reason. Find it.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s 20-minute research in order.',
        lines: ['Read their website', 'Check their recent news', 'Look at their social posts', 'Read what employees say', 'Pick one or two real details'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Real, small and [[1]] beats big and [[2]].',
        blanks: [['specific'], ['fake']],
        distractors: ['long', 'true', 'vague'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes of research does Tey suggest? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: '"I tried your app this week and liked the reminders."', group: 0 },
          { text: '"I\'ve been a loyal customer for years" (never used it)', group: 1 },
          { text: '"The problem you solve is one my family lives with."', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Spend 20 minutes on a company you\'d like to work for. What one detail genuinely connects to you?',
    starters: ['The detail is...', 'It connects to me because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do the four-place research for one real company. Write your "why them" paragraph in three sentences, using one real detail.',
  },
  notes: 'Company research for applications (website, news, social, employees) is standard careers advice. Njangi Pay\'s reminders launch is a fictional story detail. Reused in Ch8 for "Why do you want to work here?"',
};

export default lesson;

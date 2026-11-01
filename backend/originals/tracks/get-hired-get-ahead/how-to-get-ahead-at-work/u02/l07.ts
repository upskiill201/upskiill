import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 7 — prioritising: urgent vs. important. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Urgent or important?',
  summary: 'Clinton\'s day is full of pings: "quick question", "can you look at this?", "urgent!!" By 6pm, he\'s answered everything and done nothing on Goal 1. Tey shows him a simple way to sort his day.',
  minutes: 11,
  outcomes: ['Tell urgent from important', 'Protect time for important work', 'Handle interruptions without being rude'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Urgent means "needs attention now". Important means "matters for the goals". They\'re different. A ping saying "urgent!!" about a typo is urgent-looking, not important. What do you think usually gets done first?',
          replies: ['The urgent stuff', 'The important stuff'],
        },
        {
          tey: 'Usually the urgent stuff, because it shouts. A simple fix: sort tasks into four boxes. Urgent and important: do now. Important, not urgent: schedule it, in your best hours. Urgent, not important: handle quickly or hand off. Neither: drop it.',
          replies: ['Where does Goal 1 work go?'],
        },
        {
          tey: 'Important, not urgent. That\'s the box that gets squeezed. Block two hours every morning for it, mute chat, and tell the team: "I check messages at 11 and 3." Anyone with a real emergency can still call.',
          replies: ['Won\'t people think I\'m ignoring them?'],
        },
        {
          tey: 'Not if you\'re clear and reliable about when you\'ll reply. Most "quick questions" can wait an hour. And a production problem is urgent and important; that breaks the block, always.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Important-but-not-urgent work gets squeezed. Block time for it, say when you\'ll reply, and let real emergencies through.',
    },
  ],
  apply: {
    scenario: 'Clinton sorts his day.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Important for the goals, or just urgent-looking?',
        groups: ['Important', 'Just urgent-looking'],
        items: [
          { text: 'Fixing failed confirmations', group: 0 },
          { text: '"Urgent!!" about a typo in a slide', group: 1 },
          { text: 'Lighter sync for 2 GB phones', group: 0 },
          { text: 'A meeting invite for a meeting he doesn\'t need', group: 1 },
          { text: 'A production outage', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which box gets squeezed most often?',
        options: [
          { text: 'Urgent and important', why: 'That one usually gets done.' },
          { text: 'Important, not urgent' },
          { text: 'Neither', why: 'The important-not-urgent box gets squeezed.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each box to what to do.',
        pairs: [
          ['Urgent and important', 'Do it now'],
          ['Important, not urgent', 'Schedule it in your best hours'],
          ['Neither', 'Drop it'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best message to the team.',
        from: 'clinton',
        message: 'How do I tell the team about my focus block?',
        options: [
          { text: 'Mute everything and say nothing.', why: 'Tell them when you\'ll reply.' },
          { text: '"Don\'t message me ever."', why: 'Be clear and reliable, not unreachable.' },
          { text: '"I\'m focusing on Goal 1 from 9 to 11 each morning. I check messages at 11 and 3; call me for anything urgent."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the thing that should break his focus block.',
        lines: ['A question about a meeting next week.', 'Payments are failing in production right now.', 'A link to an interesting article.'],
        bug: 1,
        explanation: 'Urgent and important. Production problems always break the block.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s morning in order.',
        lines: ['Check for real emergencies', 'Mute chat', 'Two hours on Goal 1', 'Reply to messages at 11'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What makes a focus block acceptable to the team?',
        options: [
          { text: 'Being clear and reliable about when he\'ll reply' },
          { text: 'Never telling anyone', why: 'Tell them.' },
          { text: 'Only doing it when Ngozi is away', why: 'Be open about it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s definitions.',
        template: '[[1]] means "needs attention now". [[2]] means "matters for the goals".',
        blanks: [['Urgent'], ['Important']],
        distractors: ['Easy', 'Fun', 'Loud'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many hours does Clinton block each morning for Goal 1? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Handle quickly, or schedule?',
        groups: ['Handle quickly', 'Schedule'],
        items: [
          { text: 'A two-minute access request', group: 0 },
          { text: 'Designing the lighter sync', group: 1 },
          { text: 'Confirming a meeting time', group: 0 },
          { text: 'Writing the failed-confirmation analysis', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What important-but-not-urgent work keeps getting squeezed in your week? When could you block time for it?',
    starters: ['It\'s...', 'I could block...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Block two hours this week for one important, not urgent task. Tell people when you\'ll reply. Notice what you get done.',
  },
  notes: 'The urgent/important matrix is often called the Eisenhower matrix and was popularised by Stephen Covey\'s The 7 Habits of Highly Effective People (1989). Focus-block norms vary by team; agree them with your manager.',
};

export default lesson;

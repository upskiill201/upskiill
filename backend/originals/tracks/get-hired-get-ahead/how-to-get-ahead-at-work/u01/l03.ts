import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 3 — free. The first one-to-one with your manager: vague vs. specific. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The Thursday chat',
  summary: 'Thursday, Clinton\'s first proper chat with Ngozi. He has two ways to open it. One is polite and useless. The other gets him a clear picture of his first three months in fifteen minutes.',
  minutes: 11,
  outcomes: ['Open a first conversation with your manager well', 'Ask about expectations at 30, 60, 90 days', 'Agree how you\'ll check in'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to open',
      before: { label: 'Polite and vague', text: '"Everything\'s great, thanks! Let me know if you need anything."\n\nFriendly, but Ngozi now has to work out what to tell him. Fifteen minutes of small talk, and he leaves knowing almost nothing new.' },
      after: { label: 'Clear and specific', text: '"Thanks for this. I\'d love to understand what success looks like for me. What would you want to see from me at 30, 60 and 90 days? And how would you like me to keep you updated?"\n\nNgozi lights up. By the end he knows: learn the sync service by day 30, ship a small fix by day 60, own a small feature by day 90. Weekly 1:1s on Tuesdays.' },
      notes: [
        'Ask what success looks like, by time.',
        'Ask how they like to be updated.',
        'Write it down and send a short summary afterwards.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Success at 30, 60, 90 days. How to update them. Then send a three-line summary.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s first chat with Ngozi.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s opening in order.',
        lines: ['Thank her for her time', 'Ask what success looks like', 'Ask about 30, 60 and 90 days', 'Ask how she\'d like updates'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Let me know if you need anything" weak here?',
        options: [
          { text: 'It\'s rude', why: 'It\'s polite, just unhelpful.' },
          { text: 'It leaves Ngozi to work out what to tell him' },
          { text: 'It\'s too specific', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each milestone to Ngozi\'s answer.',
        pairs: [
          ['Day 30', 'Learn the sync service'],
          ['Day 60', 'Ship a small fix'],
          ['Day 90', 'Own a small feature'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question for the first chat, or not?',
        groups: ['Good', 'Not now'],
        items: [
          { text: 'What does success look like at 90 days?', group: 0 },
          { text: 'When can I be promoted?', group: 1 },
          { text: 'How would you like me to update you?', group: 0 },
          { text: 'Who should I get to know first?', group: 0 },
          { text: 'Can I work from home every day?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best follow-up email.',
        from: 'clinton',
        message: 'What should I send Ngozi after the chat?',
        options: [
          { text: 'Nothing.', why: 'A short summary avoids misunderstandings.' },
          { text: 'A five-page plan by tonight.', why: 'Three lines is enough.' },
          { text: '"Thanks! My notes: day 30 learn sync, day 60 small fix, day 90 own a small feature. Tuesdays 1:1. Did I get that right?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the question that\'s too early.',
        lines: ['What does success look like at 30 days?', 'When do I get promoted?', 'Who should I meet first?'],
        bug: 1,
        explanation: 'A fair question later. In week one, focus on doing the job well.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When are Clinton\'s weekly 1:1s?',
        options: [
          { text: 'Tuesdays' },
          { text: 'Fridays', why: 'Ngozi said Tuesdays.' },
          { text: 'Never', why: 'Weekly, on Tuesdays.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s question.',
        template: 'How would you like me to keep you [[1]]? What does [[2]] look like?',
        blanks: [['updated'], ['success']],
        distractors: ['quiet', 'failure', 'busy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day should Clinton own a small feature? (a number)',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Ship a small fix by day 60', group: 0 },
          { text: 'Just do your best', group: 1 },
          { text: 'Weekly 1:1 on Tuesdays', group: 0 },
          { text: 'We\'ll see how it goes', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you started a new role next week, what three questions would you ask your manager in the first chat?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own first-chat questions and a three-line summary template. Keep them for your next new role.',
  },
  notes: 'Expectation-setting conversations are standard onboarding practice. Where you live: how directly people talk to managers varies; keep the questions, adjust the tone.',
};

export default lesson;

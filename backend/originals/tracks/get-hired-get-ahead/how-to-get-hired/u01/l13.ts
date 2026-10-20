import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 13 — your gaps are a plan: find missing skills and close them. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Your gaps are a plan',
  summary: 'Clinton compares his list to Njangi Pay\'s advert and panics: they want "experience with APIs" and "testing". He has neither. Tey shows him that a gap is just a to-do list with a deadline.',
  minutes: 11,
  outcomes: ['Compare your skills to what a role asks for', 'Turn a gap into a small, specific plan', 'Talk about a gap honestly and positively'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Clinton puts his skills next to the Njangi Pay advert. Seven of the ten things match. Two don\'t: "APIs" and "automated testing". One is "a plus": French. What does he feel?',
          replies: ['Panic', 'Seven out of ten is good!'],
        },
        {
          tey: 'Panic, mostly. But here\'s a secret recruiters know: adverts are wish lists. Very few people match every line. Seven out of ten is a real application.',
          replies: ['What about the gaps?'],
        },
        {
          tey: 'A gap is just a to-do list. Make each one small and specific: not "learn APIs", but "build one tiny app that gets the weather from a free API, by the end of the month". Small enough to actually finish.',
          replies: ['And if they ask in the interview?'],
        },
        {
          tey: 'Then you say the gap and the plan in one breath: "I haven\'t used testing at work yet. I\'m writing tests for my fixtures app this month, and I can show you." An honest gap with a plan sounds like someone who learns. That\'s on the WEF list too.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Gap + small plan + deadline. Say the gap honestly, and say what you\'re doing about it.',
    },
  ],
  apply: {
    scenario: 'Clinton maps his gaps.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Clinton matches 7 of 10 things in an advert. Should he apply?',
        options: [
          { text: 'Yes: adverts are wish lists, and 7 of 10 is a real application' },
          { text: 'No, only apply if you match all 10', why: 'Very few people match every line. Waiting for 10 of 10 means never applying.' },
          { text: 'Only if he lies about the other 3', why: 'Never. Apply honestly and show a plan for the gaps.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good gap plan, or too vague?',
        groups: ['Good plan', 'Too vague'],
        items: [
          { text: 'Build one small app using a free weather API by month end', group: 0 },
          { text: 'Learn APIs someday', group: 1 },
          { text: 'Write tests for my fixtures app this month', group: 0 },
          { text: 'Get better at everything', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'Have you done any automated testing?',
        options: [
          { text: 'Yes, lots.', why: 'He hasn\'t. One follow-up question and it unravels.' },
          { text: 'Not at work yet. I\'m adding tests to my fixtures app this month, so I can show you how I\'m learning it.' },
          { text: 'No.', why: 'Honest, but stops there. Add the plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the gap plan in order.',
        lines: ['Compare your skills to the advert', 'Circle the gaps', 'Make each gap a small, specific task', 'Give each task a deadline'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the gap plan Clinton will never finish.',
        lines: ['This month: build a tiny weather app using a free API.', 'This year: become an expert in every programming language.', 'This week: watch one testing tutorial and write three tests.'],
        bug: 1,
        explanation: 'Too big and too vague to ever be "done". Small and specific gets finished.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each gap to a small, specific plan.',
        pairs: [
          ['APIs', 'Build one app that uses a free API'],
          ['Testing', 'Write tests for the fixtures app'],
          ['French', 'Practise 15 minutes a day with an app'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does an honest gap with a plan sound good to employers?',
        options: [
          { text: 'It shows you learn and act, which is exactly what they want in a graduate' },
          { text: 'It doesn\'t, gaps always lose you the job', why: 'Most graduates have gaps. A plan shows curiosity and drive.' },
          { text: 'Because they feel sorry for you', why: 'It\'s about showing you can learn, not sympathy.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the formula.',
        template: 'Gap + small [[1]] + [[2]].',
        blanks: [['plan'], ['deadline']],
        distractors: ['excuse', 'lie', 'apology'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey calls job adverts "wish ___". (one word)',
        answers: ['lists', 'list'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I found five gaps. That\'s too many. Maybe I\'m not ready.',
        options: [
          { text: 'Pick the two that matter most for the role, make them small plans, and apply anyway.' },
          { text: 'Wait a year until you have no gaps.', why: 'Nobody has no gaps. Apply while you close the important ones.' },
          { text: 'Ignore all five.', why: 'Pick the important ones and plan for them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find a job advert you\'d love. Which two gaps matter most, and what small task could you finish this month for each?',
    starters: ['Gap 1: ... Plan: ...', 'Gap 2: ... Plan: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your two gap plans on a card with deadlines. Put a reminder in your phone for the day each is due.',
  },
  notes: 'Adverts as "wish lists": common recruiter advice; a widely cited Hewlett-Packard internal finding about applicants meeting 100% vs 60% of criteria is second-hand and not used here. Links back to curiosity and lifelong learning (WEF 2025, l12).',
};

export default lesson;

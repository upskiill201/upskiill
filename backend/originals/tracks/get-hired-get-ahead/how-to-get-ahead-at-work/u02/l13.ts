import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 13 — making others better. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Making others better',
  summary: 'A new graduate joins the team: Kemi. She\'s lost, just like Clinton was. Helping her will take time away from his own goals. Is it worth it? Tey thinks it might be one of the most valuable things he does all quarter.',
  minutes: 11,
  outcomes: ['Explain why helping others is real value', 'Help without doing their work for them', 'Make help reusable'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'If Clinton spends an hour helping Kemi, his own work slows. If Kemi becomes productive two weeks sooner, the team gains far more. Which do you think a good manager notices?',
          replies: ['The team gain', 'Clinton\'s own output'],
        },
        {
          tey: 'Both, but people who make the whole team faster are often the ones managers can\'t do without. They\'re sometimes called "multipliers".',
          replies: ['How do I help without losing my week?'],
        },
        {
          tey: 'Make help reusable. Clinton shares his notes doc and glossary first, so Kemi\'s questions are the hard ones. He answers in a shared channel, so others learn too. And he asks, "What have you tried?" before answering, which teaches her to think.',
          replies: ['Should I just fix things for her?'],
        },
        {
          tey: 'Usually not. Pair with her, let her drive. It\'s slower today and much faster next month. And tell Ngozi in your 1:1 that you\'re onboarding Kemi; it\'s real work and it belongs in your impact record.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Helping others is real value. Make help reusable, let them drive, and record it as impact.',
    },
  ],
  apply: {
    scenario: 'Clinton helps Kemi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a "multiplier"?',
        options: [
          { text: 'Someone who makes the whole team faster' },
          { text: 'Someone who does maths', why: 'Someone who makes others better.' },
          { text: 'Someone who works twice the hours', why: 'Someone who makes others faster.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reusable help, or one-off?',
        groups: ['Reusable', 'One-off'],
        items: [
          { text: 'Sharing his notes doc and glossary', group: 0 },
          { text: 'Fixing her bug silently', group: 1 },
          { text: 'Answering in the shared channel', group: 0 },
          { text: 'Explaining the same thing in five private chats', group: 1 },
          { text: 'Pairing while she drives', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best first reply to Kemi\'s question.',
        from: 'clinton',
        message: 'Kemi asks how sync works. What do I say first?',
        options: [
          { text: '"Have a look at the notes doc first, then tell me what\'s still unclear and what you\'ve tried."' },
          { text: 'Explain everything for two hours.', why: 'Share the doc first; answer the hard parts.' },
          { text: '"Figure it out yourself."', why: 'Help, but make it reusable.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that slows Kemi down later.',
        lines: ['Asks what she\'s tried first.', 'Fixes all her bugs himself.', 'Pairs while she types.'],
        bug: 1,
        explanation: 'She doesn\'t learn. Let her drive.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s approach in order.',
        lines: ['Share the notes doc and glossary', 'Ask what she\'s tried', 'Pair while she drives', 'Tell Ngozi it\'s part of his work'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to why it helps.',
        pairs: [
          ['Shared channel', 'Others learn too'],
          ['"What have you tried?"', 'Teaches her to think'],
          ['She drives', 'Faster next month'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Should onboarding Kemi go in Clinton\'s impact record?',
        options: [
          { text: 'Yes, it\'s real work that helps the team' },
          { text: 'No, only code counts', why: 'Making others better counts.' },
          { text: 'Only if Kemi complains', why: 'It\'s impact; record it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Make help [[1]]. Let them [[2]].',
        blanks: [['reusable'], ['drive']],
        distractors: ['secret', 'watch', 'leave'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name of the new graduate? (one word)',
        answers: ['kemi'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes others better, or not?',
        groups: ['Makes others better', 'Doesn\'t'],
        items: [
          { text: 'Kind, clear code reviews', group: 0 },
          { text: 'Keeping knowledge in his head', group: 1 },
          { text: 'Updating the onboarding doc', group: 0 },
          { text: 'Mocking beginner questions', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who could you help become better at something this month? How could you make that help reusable?',
    starters: ['I could help...', 'To make it reusable...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Answer one question this week in a shared place (a doc, a group channel) instead of privately, so others benefit too.',
  },
  notes: '"Multipliers" is from Liz Wiseman, Multipliers (2010), originally about leaders; used loosely here. Kemi is a named extra (new graduate on the offline team).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 18 — Kofi's speculative email to a bakery that got him his first paid website. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Kofi\'s bakery email',
  summary: 'Clinton asks Kofi how he got his first paid website job in Accra. Kofi forwards the email he sent to a bakery that had never advertised anything. It\'s seven lines. Tap each one.',
  minutes: 11,
  outcomes: ['Recognise every part of a strong speculative message', 'Lead with the other person\'s problem', 'Offer something small and concrete'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Kofi\'s email',
      text: 'Subject: An idea for Auntie Esi\'s online orders\nHi Auntie Esi,\nI buy your bofrot every Saturday, and I noticed customers keep asking on WhatsApp what\'s left and when you close.\nI\'m a student who builds websites, and I made one for a youth club with an opening-hours page and a menu that updates in a minute.\nI could make you a simple one-page site with today\'s menu and hours, so the WhatsApp questions slow down.\nCould I show you a two-minute demo on my phone next Saturday?\nKofi',
      hotspots: [
        { phrase: 'Subject: An idea for Auntie Esi\'s online orders', note: 'A subject about her business, not "Job request". It tells her this message is about her.' },
        { phrase: 'I noticed customers keep asking on WhatsApp what\'s left and when you close.', note: 'The problem he spotted, in her words. It shows he\'s paid attention.' },
        { phrase: 'I made one for a youth club', note: 'Proof. One real example beats a list of skills.' },
        { phrase: 'so the WhatsApp questions slow down', note: 'The result for her, not what he wants. Their problem, not his need.' },
        { phrase: 'Could I show you a two-minute demo on my phone next Saturday?', note: 'A small, concrete ask that fits her life: she\'s at the shop on Saturdays anyway.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Subject about them. The problem you noticed. One proof. The result for them. One small ask.',
    },
  ],
  apply: {
    scenario: 'Clinton studies Kofi\'s email.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s email in order.',
        lines: ['A subject about her business', 'The problem he noticed', 'One piece of proof', 'The result for her', 'A small ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the subject line "An idea for Auntie Esi\'s online orders" strong?',
        options: [
          { text: 'It\'s about her business, so she wants to open it' },
          { text: 'It\'s long', why: 'It\'s about her, that\'s why.' },
          { text: 'It mentions money', why: 'It mentions her business.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'About Auntie Esi, or about Kofi?',
        groups: ['About her', 'About him'],
        items: [
          { text: 'Customers keep asking what\'s left', group: 0 },
          { text: 'I need money for my fees', group: 1 },
          { text: 'So the WhatsApp questions slow down', group: 0 },
          { text: 'I want to build my portfolio', group: 1 },
          { text: 'An idea for your online orders', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line Kofi wisely left out.',
        lines: ['I noticed customers keep asking what\'s left.', 'Please give me a job, I am very hardworking.', 'Could I show you a two-minute demo?'],
        bug: 1,
        explanation: 'Begging and adjectives. Kofi showed proof and a result instead.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'She said yes to the demo, then paid me to build it. Now three shops on her street want one.',
        options: [
          { text: 'That\'s brilliant. So one small, specific message turned into four jobs.' },
          { text: 'Lucky.', why: 'Not luck. He noticed a problem and offered a fix.' },
          { text: 'You should have charged more.', why: 'Maybe, but the method is the lesson.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Kofi\'s line to Clinton\'s version for Kmer.',
        pairs: [
          ['Customers keep asking what\'s left', 'More deliveries means more tracking'],
          ['I made one for a youth club', 'I built a tracker that 60 people use'],
          ['A two-minute demo next Saturday', 'A 15-minute call this week'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which ask is the best fit for Auntie Esi?',
        options: [
          { text: 'A two-minute demo at her shop on Saturday' },
          { text: 'A one-hour video call on a weekday', why: 'She\'s running a bakery. Keep it short and where she is.' },
          { text: 'Read a ten-page proposal', why: 'Too much. A quick demo.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'One real [[1]] beats a list of [[2]].',
        blanks: [['example', 'proof'], ['skills']],
        distractors: ['excuse', 'friends', 'prices'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Kofi\'s demo? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good subject line or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'An idea for your delivery tracking', group: 0 },
          { text: 'Job request', group: 1 },
          { text: 'Tchami suggested I write', group: 0 },
          { text: 'URGENT PLS READ', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a small business you use often. What problem have you noticed that you could help with?',
    starters: ['I use...', 'I\'ve noticed...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a subject line and the "problem I noticed" sentence for one business you know. Keep both about them.',
  },
  notes: 'Kofi (shared cast) is at university in Accra; his web skills come from HTML & CSS for Beginners ("Kofi Goes Live", the youth-club site). Auntie Esi and the bakery are named extras. Bofrot is a Ghanaian doughnut.',
};

export default lesson;

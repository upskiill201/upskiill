import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 13 — the speculative application. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Applying when there\'s no advert',
  summary: 'Tchami says Kmer Logistics "might" need a part-time developer, but there\'s no advert. Can Clinton apply for a job that doesn\'t officially exist? Tey explains the speculative application.',
  minutes: 11,
  outcomes: ['Explain what a speculative application is', 'Spot a real problem you could help with', 'Send a short, specific pitch to the right person'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A speculative application is when you write to a company that hasn\'t advertised a role, and offer to help. Do you think that\'s pushy?',
          replies: ['A bit', 'Not if it\'s done well'],
        },
        {
          tey: 'Done well, it\'s welcome, especially at small companies. The trick is to be about their problem, not your need. Kmer Logistics just won a supermarket contract. More deliveries means more tracking. What might they need?',
          replies: ['Someone to help with the tracking tools?'],
        },
        {
          tey: 'Exactly. So write to the person who decides, usually the founder at a start-up, not a general inbox. Say what you noticed, how you could help, and the proof: "I built a payment tracker that 60 people use." Then a small ask: "Could we have a 15-minute call?"',
          replies: ['Should I attach my CV?'],
        },
        {
          tey: 'Yes, attach it, but the message must stand on its own. Keep it under 150 words. And if Tchami agrees, mention him: "Tchami suggested I get in touch." A name they trust makes it much more likely they\'ll read on.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Their problem, not your need. The right person. Proof. A small ask. A mutual name, with permission.',
    },
  ],
  apply: {
    scenario: 'Clinton writes to Kmer Logistics.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a speculative application?',
        options: [
          { text: 'Guessing the answers on an application form', why: 'It\'s applying without an advert.' },
          { text: 'Writing to a company that hasn\'t advertised a role, offering to help' },
          { text: 'Applying to every job on a board', why: 'That\'s mass applying. This is one targeted pitch.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'About their problem, or only his need?',
        groups: ['Their problem', 'His need'],
        items: [
          { text: 'More deliveries means more tracking: I could help', group: 0 },
          { text: 'I really need a job', group: 1 },
          { text: 'I built a tracker that 60 people use', group: 0 },
          { text: 'My rent is due', group: 1 },
          { text: 'Congratulations on the supermarket contract', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the pitch in order.',
        lines: ['A mutual name, if they agreed', 'What you noticed about them', 'How you could help, with proof', 'A small ask: a 15-minute call'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I send it to info@kmerlogistics.cm?',
        options: [
          { text: 'Yes, general inboxes always get read.', why: 'They often don\'t. Find the decision-maker.' },
          { text: 'Send it to every email on their site.', why: 'Spammy. One right person.' },
          { text: 'Better to find the founder, Tchami\'s friend, and write to him directly.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the pitch about Clinton\'s need, not theirs.',
        lines: ['Congratulations on the supermarket contract.', 'I really need this job because I graduate soon.', 'I built a tracker that 60 people use.'],
        bug: 1,
        explanation: 'True, but it\'s his problem. Focus on how he can help them.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which opening line is best?',
        options: [
          { text: '"Tchami suggested I get in touch: congratulations on the supermarket contract."' },
          { text: '"Dear Hiring Manager, I am seeking any position."', why: 'Generic, and there\'s no hiring manager at a start-up.' },
          { text: '"You don\'t know me, but I\'m desperate."', why: 'About his need. Lead with theirs.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s line.',
        pairs: [
          ['What he noticed', 'More deliveries means more tracking'],
          ['Proof', 'A tracker that 60 people use'],
          ['Small ask', 'Could we have a 15-minute call?'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Keep a speculative message under how many words? (a number)',
        answers: ['150', 'one hundred and fifty', 'one hundred fifty'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Write about their [[1]], not your [[2]].',
        blanks: [['problem'], ['need']],
        distractors: ['logo', 'salary', 'office'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place for a speculative pitch, or poor?',
        groups: ['Good', 'Poor'],
        items: [
          { text: 'A small, growing start-up', group: 0 },
          { text: 'A company that just froze all hiring', group: 1 },
          { text: 'A founder Tchami knows', group: 0 },
          { text: 'A random company with no link to your skills', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a small company you admire. What problem might they have that you could help with?',
    starters: ['A company I admire is...', 'They might need help with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one company. Find one piece of recent news about it, and write a two-sentence "what I noticed, how I could help" pitch.',
  },
  notes: 'Speculative (unsolicited) applications are standard careers advice and common for small firms. Where you live: in some countries and large companies, speculative applications go through a formal portal; check locally. Kmer Logistics and its domain are invented (.cm used for Cameroon flavour; the address is fictional).',
};

export default lesson;

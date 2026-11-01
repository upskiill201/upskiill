import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 12 — mentors and sponsors. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Mentors and sponsors',
  summary: 'Miracle tells Clinton something she wishes she\'d known earlier: "I had great mentors for years. What I didn\'t have was a sponsor." Here\'s the difference, and why both matter.',
  minutes: 11,
  outcomes: ['Tell a mentor from a sponsor', 'Know how sponsors help with promotions', 'Earn sponsorship through visible work'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>A mentor gives you advice.</strong> They help you think, learn and improve. Miracle is Clinton\'s mentor. Mentors can be anywhere, inside or outside your company.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>A sponsor speaks up for you.</strong> They use their influence where decisions are made: "Clinton should lead this", "Clinton is ready for Developer." Sponsors are usually senior people inside your organisation who have seen your work.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Why sponsors matter for promotions.</strong> Many promotion decisions are discussed in rooms you\'re not in. A sponsor is your voice there. Ngozi is the obvious one; Paul could become another.</p>',
    },
    {
      kind: 'check',
      question: 'Paul says to another manager: "Give Clinton the sync-service split. He\'s ready." What is Paul being?',
      options: ['A mentor', 'A sponsor', 'A rival'],
      answer: 1,
      explanation: 'He\'s using his influence to speak up for Clinton. That\'s sponsorship.',
    },
    {
      kind: 'text',
      html: '<p><strong>How sponsorship is earned.</strong> Not by asking "Will you sponsor me?" but by doing excellent, visible work that senior people see, being reliable, and making them look good for backing you.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>You need both.</strong> Mentors help you grow; sponsors help others see that you\'ve grown. Later in your career, you can be both for someone else.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Mentors advise. Sponsors speak up for you. Earn sponsors with visible, excellent, reliable work.',
    },
  ],
  apply: {
    scenario: 'Clinton thinks about mentors and sponsors.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Mentor or sponsor behaviour?',
        groups: ['Mentor', 'Sponsor'],
        items: [
          { text: 'Helps you think through a bug', group: 0 },
          { text: 'Recommends you for a big project', group: 1 },
          { text: 'Gives career advice on video calls', group: 0 },
          { text: 'Says "He\'s ready" in a promotion meeting', group: 1 },
          { text: 'Reviews your CV', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do sponsors matter for promotions?',
        options: [
          { text: 'They pay your salary', why: 'They speak up for you.' },
          { text: 'Decisions are often discussed in rooms you\'re not in' },
          { text: 'They write your code', why: 'They speak up for you.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to their role for Clinton.',
        pairs: [
          ['Miracle', 'Mentor'],
          ['Ngozi', 'Main sponsor'],
          ['Paul', 'Possible future sponsor'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I just ask Paul, "Will you sponsor me?"',
        options: [
          { text: 'Yes, demand it.', why: 'Sponsorship is earned through work.' },
          { text: 'Ignore Paul.', why: 'He could become a sponsor.' },
          { text: 'Probably not directly. I\'ll do excellent work he sees, like the design doc, and let him decide to back me.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the wrong idea.',
        lines: ['Mentors can be outside the company.', 'A sponsor and a mentor are exactly the same.', 'Sponsors use influence for you.'],
        bug: 1,
        explanation: 'Mentors advise; sponsors speak up for you.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put how sponsorship is earned in order.',
        lines: ['Do excellent work', 'Make it visible to senior people', 'Be reliable', 'Make them look good for backing you'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Miracle lack early in her career?',
        options: [
          { text: 'A sponsor' },
          { text: 'A mentor', why: 'She had great mentors; she lacked a sponsor.' },
          { text: 'A laptop', why: 'A sponsor.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Mentors [[1]]. Sponsors speak [[2]] for you.',
        blanks: [['advise'], ['up']],
        distractors: ['pay', 'down', 'over'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is Miracle Clinton\'s mentor or sponsor? (one word)',
        answers: ['mentor'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps earn a sponsor, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'A design doc a senior reviews', group: 0 },
          { text: 'Hiding your best work', group: 1 },
          { text: 'Always delivering on time', group: 0 },
          { text: 'Badmouthing senior people', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who are your mentors? Who could become a sponsor for you, and what work would they need to see?',
    starters: ['My mentors:', 'A possible sponsor:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'List one mentor and one possible sponsor. For the sponsor, write one piece of excellent work they could see this quarter.',
  },
  notes: 'The mentor/sponsor distinction is widely discussed (e.g., Sylvia Ann Hewlett, Forget a Mentor, Find a Sponsor, 2013). Kept qualitative.',
};

export default lesson;

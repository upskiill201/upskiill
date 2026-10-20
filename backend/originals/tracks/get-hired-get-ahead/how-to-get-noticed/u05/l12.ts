import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 12 — staying safe: job scams and privacy. Card deck. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Staying safe',
  summary: 'Two days after his profile goes live, Clinton gets a message: "Congratulations! You\'ve been selected for a remote job paying 800,000 francs a month. Just pay a 25,000-franc training fee to start." It\'s his first job scam. It won\'t be his last.',
  minutes: 11,
  outcomes: ['Recognise the signs of a job scam', 'Protect your personal information online', 'Know what to do if something feels wrong'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Being findable means scammers can find you too.</strong> Fake job offers are common worldwide, and graduates are a favourite target because they\'re eager and hopeful. The good news: most scams share the same signs.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Red flags:</strong></p><ul><li><strong>They ask you to pay</strong>: a "training fee", "registration", equipment or a visa. Real employers don\'t charge you to work for them.</li><li><strong>Too good to be true</strong>: a big salary, no interview, "you\'ve been selected" for a job you never applied for.</li><li><strong>Pressure and secrecy</strong>: "reply in one hour", "don\'t tell anyone".</li><li><strong>Odd contact</strong>: only WhatsApp or a personal email, a company you can\'t find online, a recruiter profile with no history.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p><strong>Protect your information.</strong> Never send your ID, bank details, passwords or one-time codes to someone you met online, until you\'ve confirmed the company is real and you have an actual offer. Keep your personal phone number and address off public profiles.</p>',
    },
    {
      kind: 'check',
      question: 'A "recruiter" asks for a 25,000-franc training fee before you start. What is it?',
      options: ['A normal step', 'Almost certainly a scam', 'A good deal'],
      answer: 1,
      explanation: 'Real employers don\'t charge you to work for them.',
    },
    {
      kind: 'text',
      html: '<p><strong>If something feels wrong:</strong> stop replying, don\'t pay, look the company up yourself (not through their links), report the profile on the platform, and tell someone you trust, like a careers adviser.</p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Real employers never ask you to pay to get a job. If they ask for money, walk away.',
    },
  ],
  apply: {
    scenario: 'Clinton spots a scam.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Red flag or normal?',
        groups: ['Red flag', 'Normal'],
        items: [
          { text: 'They ask for a training fee', group: 0 },
          { text: 'An interview before an offer', group: 1 },
          { text: '"You\'ve been selected" for a job you never applied to', group: 0 },
          { text: 'An email from a company address you can find online', group: 1 },
          { text: '"Reply within one hour or lose the job"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What do real employers never ask you to do?',
        options: [
          { text: 'Pay money to get the job' },
          { text: 'Come to an interview', why: 'Interviews are normal.' },
          { text: 'Send your CV', why: 'Normal.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The message says "800,000 francs a month, no interview, just pay the training fee". Should I pay?',
        options: [
          { text: 'No. Paying to work, no interview and a huge salary are three red flags. I\'ll report it and stop replying.' },
          { text: 'Yes, 25,000 is nothing compared to 800,000.', why: 'That\'s exactly how the scam works.' },
          { text: 'Send my ID first to show I\'m serious.', why: 'Never send ID to an unverified contact.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the request a real employer wouldn\'t make at this stage.',
        lines: ['Can you do a 30-minute video interview on Thursday?', 'Please send your bank details and a one-time code to confirm your application.', 'Could you share a portfolio link?'],
        bug: 1,
        explanation: 'Bank details and one-time codes are how accounts get emptied. Never share them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each red flag to a safe response.',
        pairs: [
          ['Asked to pay a fee', 'Walk away, don\'t pay'],
          ['Company not findable online', 'Look it up yourself first'],
          ['Pressure to reply now', 'Slow down and check'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How should Clinton check whether a company is real?',
        options: [
          { text: 'Search for it himself, not through links in the message' },
          { text: 'Click the link they sent', why: 'Their link could be fake. Search yourself.' },
          { text: 'Ask the scammer if they\'re real', why: 'They\'ll say yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'If they ask for [[1]], walk [[2]].',
        blanks: [['money', 'payment'], ['away']],
        distractors: ['help', 'faster', 'in'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should you never share with an online contact? Your one-time ___. (one word)',
        answers: ['code', 'codes', 'password'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to share early, or never share early?',
        groups: ['Safe to share', 'Never share early'],
        items: [
          { text: 'Your CV', group: 0 },
          { text: 'Your ID card photo', group: 1 },
          { text: 'Your portfolio link', group: 0 },
          { text: 'Your bank password', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'After spotting a scam, what\'s the best next step?',
        options: [
          { text: 'Report the profile on the platform and tell a careers adviser' },
          { text: 'Argue with the scammer', why: 'Waste of time. Report and move on.' },
          { text: 'Pay a little to see if it\'s real', why: 'Never pay.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you or someone you know ever received a message like this? What gave it away, or what would have?',
    starters: ['I once got...', 'The red flag was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your profile\'s visibility settings, remove any personal phone number or address, and save your careers office\'s contact for when something feels wrong.',
  },
  notes: 'Advance-fee job scams and fake recruiter messages are widely reported worldwide (e.g. warnings from consumer-protection agencies such as the US FTC on job scams, and platforms\' own safety pages). Principles, not legal advice. 800,000 XAF/month is an implausibly high graduate salary for the region, used as a "too good to be true" signal.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Card deck: giving credit (credit as currency; "we" not "I"; visible recognition upwards). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Give the credit away',
  summary: 'Brian forwards Remi a message from Kamau: "Heard the refund project is moving. Well done, Remi." Remi did not fix one refund. Five other people did. What he does with this message will decide whether they keep helping. Tey deals the credit cards.',
  minutes: 11,
  outcomes: [
    'Know why credit is one of your most valuable currencies',
    'Give credit specifically, in public and upwards',
    'Use "we" without disappearing',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>When you lead without a title, the people helping you get nothing official for it: it's not in their job description, and their boss may not even know. Credit is how they get paid. Here are the cards.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Credit is a currency</h3><p>Remember Cohen and Bradford: recognition and visibility are position currencies. You can give them away for free, and they're worth a lot to the person receiving them.</p><h3>Card 2: Be specific</h3><p>Not \"thanks to the team\". Instead: \"Njeri found the signature delay, a third of the problem.\" Specific credit is believable, and it teaches others what good looks like.</p><h3>Card 3: Send it upwards</h3><p>The most valuable credit goes to someone's boss. A two-line note to Emeka's manager in Lagos means more than ten thank-yous to Emeka.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Say \"we\", and name names</h3><p>\"We cut eight days\" is right. But \"we\" alone can blur who did what. Say \"we\", then say who.</p><h3>Card 5: Don't hide your part either</h3><p>Giving credit away isn't pretending you did nothing. \"I pulled it together; they did the hard parts\" is honest. Credibility includes being honest about your own work.</p><h3>Card 6: Credit early, not just at the end</h3><p>Small, specific credit along the way keeps people going. Waiting for the final presentation means weeks of silence.</p>",
    },
    {
      kind: 'check',
      question: 'Kamau thanked Remi. What\'s the best thing to do?',
      options: ['Reply naming who did what, and copy their managers', 'Say thank you and leave it', 'Forward it to the team with "we did it!"'],
      answer: 0,
      explanation: 'Specific credit, sent upwards, where it counts most.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Credit is their pay. Be specific. Send it upwards. Say "we", then name names. Be honest about your part. Credit early.',
    },
  ],
  apply: {
    scenario: 'Kamau\'s message.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is credit so valuable when you lead without a title?',
        options: [
          { text: 'It makes Remi look good', why: 'It\'s about them.' },
          { text: 'It\'s often the only "pay" helpers get for work outside their job' },
          { text: 'It isn\'t valuable', why: 'It\'s one of the most valuable currencies.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good credit, or weak credit?',
        groups: ['Good credit', 'Weak credit'],
        items: [
          { text: '"Njeri found a third of the problem."', group: 0 },
          { text: '"Thanks, team!"', group: 1 },
          { text: 'A note to Emeka\'s manager', group: 0 },
          { text: 'Saving all thanks for the final day', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Kamau\'s impressed with you. Enjoy it!',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Thank you. Could I reply to him with who actually did what? Njeri, Wanjiku and Felix did the hard parts.' },
          { text: 'Thanks! I\'ve worked really hard on this.', why: 'True, but five people did the fixing.' },
          { text: 'Ha, great.', why: 'A chance to send credit upwards, missed.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The most valuable credit goes to someone\'s ___. (one word)',
        answers: ['boss', 'manager', 'Boss', 'Manager'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the line.',
        pairs: [
          ['Be specific', '"Njeri found the signature delay."'],
          ['Send it upwards', 'A note to Emeka\'s manager'],
          ['Be honest about your part', '"I pulled it together."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "we", then name names?',
        options: [
          { text: 'Names make it longer', why: 'They make it real.' },
          { text: '"We" alone can blur who did what' },
          { text: 'To blame people later', why: 'It\'s credit.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s reply to Kamau. Which line hides the team?',
        lines: [
          'Thank you. Eight days are already gone.',
          'It\'s been a lot of work, but I\'ve managed to pull it off.',
          'Wanjiku\'s sample-check and Njeri\'s form did it.',
        ],
        bug: 1,
        fix: 'I pulled it together; they did the hard parts.',
        explanation: '"I\'ve managed to pull it off" takes the credit five people earned.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put giving credit well in order.',
        lines: ['Name the person', 'Say exactly what they did', 'Say why it mattered', 'Send it where it counts'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Credit is their [[1]]. Say "we", then name [[2]].',
        blanks: [['pay', 'currency'], ['names']],
        distractors: ['debt', 'nobody'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s honest line.',
        tiles: ['They', 'did', 'the', 'hard', 'parts.'],
        distractors: ['I'],
      },
    ],
  },
  reflect: {
    prompt: 'Who helped you with something recently that their boss doesn\'t know about? How could you send credit upwards?',
    starters: ['They helped by...', 'I could tell their boss...'],
  },
  deepen: {
    title: 'Two lines upwards',
    summary: 'Write two lines to someone\'s manager this week: what they did and why it mattered. It\'s one of the most valuable things you can give.',
  },
  notes: 'Credit and recognition as position currencies: Cohen & Bradford. Specific recognition effects: Gallup & Workhuman (2023). Credibility and honesty: Kouzes & Posner. Fictional events.',
};

export default lesson;

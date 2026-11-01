import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 3 · Lesson 1 — opens the chapter: Clinton asks for a promotion and hears "not yet". Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Not yet"',
  summary: 'Month six: probation passed, and the salary review he negotiated brings him to 330,000 francs. Feeling brave, Clinton says: "I\'d like to be promoted to Developer." Ngozi pauses. "Not yet." His face goes hot.',
  minutes: 11,
  outcomes: ['Respond well to "not yet"', 'Turn a no into a clear next step', 'Avoid arguing or sulking'],
  learn: [
    {
      kind: 'story',
      title: 'The review',
      beats: [
        { speaker: 'narrator', text: 'Month six. Probation passed. The salary review brings Clinton to 330,000 francs, the number he hoped for at the offer stage.' },
        { speaker: 'clinton', text: 'Thank you. And... I\'d like to be promoted to Developer.' },
        { speaker: 'ngozi', text: 'I can see why you\'re asking, and your record is strong. But not yet.' },
        { speaker: 'tey', text: '"Not yet" isn\'t "never". It often means there are specific things the person needs to see. What you do in the next minute matters a lot.' },
      ],
      choice: {
        prompt: 'What should Clinton say next?',
        options: [
          {
            text: '"Thank you for being straight with me. What would you need to see from me to say yes?"',
            outcome: 'Ngozi opens the career ladder doc: "Two things. Lead a piece of work that needs other people, and make design decisions without me checking every step. Let\'s build a plan."',
            best: true,
          },
          {
            text: '"But I\'ve done more than anyone else on the team."',
            outcome: 'Ngozi gets defensive, the conversation turns into a debate about other people, and he leaves without knowing what to change.',
          },
          {
            text: 'Say "OK" and go quiet for the rest of the week.',
            outcome: 'He sulks. Ngozi notices and wonders whether he\'s ready for more responsibility.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'After "not yet": thank them, then ask, "What would you need to see from me to say yes?"',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> how promotions work, finding the criteria, turning "not yet" into a plan, asking clearly, stretch projects, sponsors, talking about pay, and building a promotion case. Your kit piece: a promotion case.</p>',
    },
  ],
  apply: {
    scenario: 'Clinton hears "not yet".',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "not yet" usually mean?',
        options: [
          { text: 'Never', why: '"Not yet" isn\'t "never".' },
          { text: 'There are specific things they need to see first' },
          { text: 'They don\'t like you', why: 'It usually means specific gaps.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response to "not yet", or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'What would you need to see to say yes?', group: 0 },
          { text: 'I\'ve done more than anyone', group: 1 },
          { text: 'Thank you for being straight with me', group: 0 },
          { text: 'Sulking all week', group: 1 },
          { text: 'Can we build a plan together?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply.',
        from: 'ngozi',
        message: 'Your record is strong. But not yet.',
        options: [
          { text: '"That\'s unfair."', why: 'Ask what she needs to see.' },
          { text: '"OK." (then silence)', why: 'Turn it into a plan.' },
          { text: '"Thank you for being straight with me. What would you need to see from me to say yes?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that turns it into a debate.',
        lines: ['Thank you for the honesty.', 'Kemi gets more praise and does less than me.', 'What would you need to see?'],
        bug: 1,
        explanation: 'Comparing to others makes it a debate. Focus on your criteria.',
      },
      {
        kind: 'mcq',
        prompt: 'What two things did Ngozi say Clinton needs to show?',
        options: [
          { text: 'Lead work that needs others, and make design decisions independently' },
          { text: 'Work longer hours and attend more meetings', why: 'Leading work and independent decisions.' },
          { text: 'Nothing specific', why: 'She named two things.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each response to its result.',
        pairs: [
          ['Ask what she\'d need to see', 'A clear plan'],
          ['Argue about others', 'A defensive debate'],
          ['Sulk', 'Doubts about readiness'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s point.',
        template: '"Not [[1]]" isn\'t "[[2]]".',
        blanks: [['yet'], ['never']],
        distractors: ['now', 'always', 'maybe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s Clinton\'s new monthly salary, in francs? (a number)',
        answers: ['330000', '330,000', '330 000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Ngozi open to explain her answer?',
        options: [
          { text: 'Clinton\'s salary slip', why: 'The career ladder.' },
          { text: 'Nothing', why: 'The career ladder doc.' },
          { text: 'The career ladder doc' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shows readiness for more responsibility, or not?',
        groups: ['Shows readiness', 'Doesn\'t'],
        items: [
          { text: 'Calmly asking for criteria', group: 0 },
          { text: 'Sulking after a no', group: 1 },
          { text: 'Building a plan', group: 0 },
          { text: 'Blaming colleagues', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a "not yet" you\'ve heard (a job, a place, a grade). Did you ask what it would take?',
    starters: ['I heard "not yet" when...', 'I could have asked...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down your "not yet" reply: thank them, ask what they\'d need to see, offer to build a plan together. Keep it ready.',
  },
  notes: 'Opens L3 Ch3 (founder topic: How to Ask for a Promotion). Outline: "asks too early and hears not yet". The 330,000 XAF salary review pays off the offer-stage negotiation (L2 Ch5).',
};

export default lesson;

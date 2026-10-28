import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 6 — anatomy of a good outreach message to a stranger-ish contact. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'A message worth answering',
  summary: 'Tchami was easy: they\'d met. Next on Clinton\'s list is Arjun, a freelance developer in Bengaluru he\'s never met, who wrote a post about payment APIs. His message is six lines long. Tap each line to see why it works.',
  minutes: 11,
  outcomes: ['Write a short message to someone you\'ve never met', 'Give a real reason for reaching out to them', 'End with one small, clear ask'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Clinton\'s message to Arjun',
      text: 'Hi Arjun,\nI read your post on handling failed mobile-money payments. The bit about retrying with the same reference saved me an afternoon on my savings-group tracker.\nI\'m a final-year CS student at the University of Buea, hoping to work in fintech after June.\nCould I ask you one question? What do you wish you\'d known when you started building payment systems?\nNo worries at all if you\'re busy.\nClinton',
      hotspots: [
        { phrase: 'I read your post on handling failed mobile-money payments.', note: 'The reason he\'s writing to him, not anyone. It shows he actually read his work.' },
        { phrase: 'saved me an afternoon on my savings-group tracker', note: 'Specific thanks. People love hearing their work helped someone, and it quietly shows he builds things.' },
        { phrase: 'I\'m a final-year CS student at the University of Buea, hoping to work in fintech after June.', note: 'Who he is in one line. No life story.' },
        { phrase: 'Could I ask you one question?', note: 'The smallest possible ask. One question by message is easy to answer on a phone.' },
        { phrase: 'No worries at all if you\'re busy.', note: 'An easy way out. Taking the pressure off makes a reply more likely, not less.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'With someone you\'ve never met: a real reason, specific thanks, one line about you, one small question, an easy way out.',
    },
  ],
  apply: {
    scenario: 'Clinton writes to people he\'s never met.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the message to Arjun in order.',
        lines: ['A real reason for writing to him', 'Specific thanks', 'One line about who he is', 'One small question', 'An easy way out'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Clinton mention Arjun\'s post?',
        options: [
          { text: 'To flatter him into giving him a job', why: 'It\'s genuine thanks, not flattery. And he isn\'t asking for a job.' },
          { text: 'It shows why he\'s writing to him specifically, and that he read his work' },
          { text: 'It\'s required on LinkedIn', why: 'It isn\'t required, it\'s just what makes the message worth answering.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak line for a first message?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Your post on retries saved me an afternoon', group: 0 },
          { text: 'Dear Sir/Madam, I am a hardworking student', group: 1 },
          { text: 'Could I ask you one question?', group: 0 },
          { text: 'Please reply urgently', group: 1 },
          { text: 'No worries if you\'re busy', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the message harder to answer.',
        lines: ['I read your post on failed payments.', 'Here is my full CV, my transcript and my five-year plan for you to review.', 'Could I ask you one question?'],
        bug: 1,
        explanation: 'Too much homework for a stranger. Keep the first message small.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should I send Arjun the same message I sent Tchami?',
        options: [
          { text: 'Yes, copy-paste saves time.', why: 'Each message needs its own reason.' },
          { text: 'Don\'t message Arjun at all.', why: 'A good message to a stranger can work.' },
          { text: 'No: Tchami knows me from the meet-up; Arjun needs a reason I\'m writing to him, like his post.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to what it does.',
        pairs: [
          ['Mentioning his post', 'Shows why him, specifically'],
          ['One line about him', 'Says who he is without a life story'],
          ['"No worries if you\'re busy"', 'Takes the pressure off'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the message.',
        template: 'Could I ask you [[1]] question? No worries at all if you\'re [[2]].',
        blanks: [['one'], ['busy']],
        distractors: ['ten', 'angry', 'rich'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Clinton ask Arjun in his first message? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question is best for a first message?',
        options: [
          { text: '"What do you wish you\'d known when you started building payment systems?"' },
          { text: '"Can you tell me everything about your career?"', why: 'Too big to answer on a phone.' },
          { text: '"Is your company hiring? Can you refer me?"', why: 'Too big too soon. Ask for advice first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A good reason to message a stranger, or not?',
        groups: ['Good reason', 'Weak reason'],
        items: [
          { text: 'You read and used their post', group: 0 },
          { text: 'They have a fancy job title', group: 1 },
          { text: 'You both went to the same university', group: 0 },
          { text: 'You\'re messaging everyone at their company', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you\'ve never met whose work you\'ve read, watched or used. What specific thing could you thank them for?',
    starters: ['I could write to...', 'I\'d thank them for...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find one post, video or project by someone in your field. Draft a five-part message to them. Keep it under 80 words.',
  },
  notes: 'Arjun (shared cast) is a freelance developer in Bengaluru listed in CAST.md for this track. Here he\'s a weak tie Clinton has never met; his late reply comes in l17. Message structure is common networking guidance.',
};

export default lesson;

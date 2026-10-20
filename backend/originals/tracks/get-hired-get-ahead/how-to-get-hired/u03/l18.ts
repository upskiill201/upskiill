import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 18 — the thank-you email after the interview. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The thank-you email',
  summary: 'That evening, Clinton writes Brenda a five-line thank-you. Miracle reads it and says, "Send it." Tap each line to see what it does.',
  minutes: 11,
  outcomes: ['Write a short thank-you after an interview', 'Refer back to something specific', 'Add one thing you forgot to say'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s email',
      text: 'Subject: Thank you, Graduate Developer interview\nHi Brenda,\nThank you for today, and for moving the time when my bus broke down.\nI really enjoyed hearing about the offline mode. The problem of drivers confirming with no data is exactly what I\'ve been working on at Kmer.\nOne thing I didn\'t mention: I\'ve written up how my sync handles duplicates, in case it\'s useful for the team (link).\nI\'d love to be part of what you\'re building.\nClinton',
      hotspots: [
        { phrase: 'Subject: Thank you, Graduate Developer interview', note: 'Easy to find: what it is and which role.' },
        { phrase: 'and for moving the time when my bus broke down', note: 'Thanks for a specific kindness. Short, and it closes the bus story gracefully.' },
        { phrase: 'I really enjoyed hearing about the offline mode.', note: 'A specific moment from the conversation. It shows he listened.' },
        { phrase: 'One thing I didn\'t mention:', note: 'A useful addition, not a whole new pitch. One thing, with proof.' },
        { phrase: 'I\'d love to be part of what you\'re building.', note: 'Clear interest, without pressure or "when will I hear back?".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Send within a day. Thank them, mention one specific moment, add one useful thing, show interest. Five lines.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his thank-you.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the thank-you in order.',
        lines: ['A clear subject', 'Thanks, with one specific kindness', 'A moment from the conversation', 'One useful addition', 'Clear interest'],
      },
      {
        kind: 'mcq',
        prompt: 'When should Clinton send it?',
        options: [
          { text: 'Within a day' },
          { text: 'A month later', why: 'Too late. Within a day.' },
          { text: 'During the interview', why: 'After, within a day.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the thank-you, or not?',
        groups: ['Belongs', 'Leave out'],
        items: [
          { text: 'A specific moment from the conversation', group: 0 },
          { text: 'When will I hear back???', group: 1 },
          { text: 'One useful thing he forgot to say', group: 0 },
          { text: 'His full CV again', group: 1 },
          { text: 'Clear interest in the role', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that adds pressure.',
        lines: ['Thank you for today.', 'Please tell me by Friday because I have other offers.', 'I enjoyed hearing about the offline mode.'],
        bug: 1,
        explanation: 'Pressure (and possibly untrue). Show interest, not deadlines.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I forgot to mention three projects. Should I add them all to the thank-you?',
        options: [
          { text: 'Just one, the most relevant, with a link. Keep it short.' },
          { text: 'All three, with long explanations.', why: 'One thing. Keep it short.' },
          { text: 'None, ever.', why: 'One useful addition is fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does.',
        pairs: [
          ['Thanks for moving the time', 'Closes the bus story gracefully'],
          ['Hearing about the offline mode', 'Shows he listened'],
          ['Write-up on duplicates', 'Adds proof he forgot'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which closing line is best?',
        options: [
          { text: '"I\'d love to be part of what you\'re building."' },
          { text: '"Hire me pls."', why: 'Too pushy.' },
          { text: '"Whatever, thanks."', why: 'Show real interest.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Send within a [[1]]. Five [[2]].',
        blanks: [['day'], ['lines']],
        distractors: ['month', 'pages', 'year'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many useful additions should a thank-you include? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good subject line, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Thank you, Graduate Developer interview', group: 0 },
          { text: 'hi', group: 1 },
          { text: 'Thank you for this morning\'s interview', group: 0 },
          { text: 'URGENT', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'After your last interview or important meeting, did you send a thank-you? What specific moment could you have mentioned?',
    starters: ['I did / didn\'t...', 'I could have mentioned...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a five-line thank-you template you can adapt after any interview. Leave gaps for the specific moment and the one addition.',
  },
  notes: 'Thank-you notes are common practice; expectations vary by country and industry. Keep it short everywhere.',
};

export default lesson;

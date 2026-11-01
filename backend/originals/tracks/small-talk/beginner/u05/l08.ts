import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Before/After: the thank-you that people remember (Kumar & Epley 2018). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The thank-you people remember',
  summary: 'Eight weeks ago, Femi laughed at Nurse Mode and became Grace\'s first friend at Kinwell. She has never properly thanked him. She drafts a message, deletes it, drafts it again. "He\'ll think it\'s weird."',
  minutes: 11,
  outcomes: [
    'Know what research says about how thank-yous are received',
    'Write a specific, warm thank-you',
    'Send it, even when it feels awkward',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Grace\'s message to Femi',
      before: {
        label: 'Draft 1 (deleted)',
        text: 'Thanks for everything lol.',
      },
      after: {
        label: 'Draft 2 (sent)',
        text: 'Femi, I\'ve been meaning to say this. On my first morning, I asked you about your pain levels and you laughed instead of running away. Every meetup, every "five hellos" dare, every time you dragged me out from the snack table: it made the hardest job change of my life feel possible. Thank you. Lunch is on me, goat story included.',
      },
      notes: [
        'Specific moments instead of "everything".',
        'What difference it made to her, not just what he did.',
        'Warm and a bit funny, which is very Femi.',
        'A small, real offer at the end: lunch.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Grace nearly didn't send it. \"He'll think it's weird.\" Here's what researchers found when they asked people to write thank-you letters:</p><ul><li>Writers <strong>underestimated</strong> how surprised and happy the recipients would feel.</li><li>Writers <strong>overestimated</strong> how awkward the recipients would feel.</li><li>Writers worried about getting the words exactly right. Recipients cared about the warmth.</li></ul><p>Sound familiar? It's the liking gap again: we judge our own warmth too harshly. The thank-you you're nervous to send is almost always better received than you think.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A thank-you that lands: a specific moment, the difference it made, and warmth. And send it: people feel happier and less awkward than you expect.',
    },
  ],
  apply: {
    scenario: 'Thursday night. The message to Femi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the thank-you research find?',
        options: [
          { text: 'Senders underestimated how happy recipients would be, and overestimated the awkwardness' },
          { text: 'Recipients found thank-you letters awkward', why: 'Less than senders expected.' },
          { text: 'Thank-you letters make no difference', why: 'Recipients felt better than senders predicted.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Thanks for everything lol', group: 1 },
          { text: 'Thanks for laughing at Nurse Mode on my first morning', group: 0 },
          { text: 'You\'re great', group: 1 },
          { text: 'Dragging me away from the snack table made the meetup possible', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '...Grace. I just read your message on the bus and I\'m not crying, you\'re crying.',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'Sorry, was it weird? I can delete it.', why: 'It clearly landed. Let it.' },
          { text: 'Ha! I meant every word. Lunch Monday?' },
          { text: 'ok', why: 'He just said something lovely.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Senders worried about getting the words right. Recipients cared about the ___. (one word)',
        answers: ['warmth'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does "a specific moment" matter so much?',
        options: [
          { text: 'It makes the message longer', why: 'It makes it meaningful, not just long.' },
          { text: 'It\'s a writing rule', why: 'It\'s about how it feels to receive.' },
          { text: 'It proves you noticed and remembered what they did' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s thank-you to Priya. Which line undoes it?',
        lines: [
          'Thank you for the lunch where you told me about your grandmother.',
          'Your introvert rules got me through two meetups.',
          'Anyway, sorry, this is probably weird, ignore it.',
        ],
        bug: 2,
        fix: 'Thank you for being the best manager I could have hoped for.',
        explanation: 'Apologising for a thank-you shrinks it. The research says it\'s far less weird than you think.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the thank-you to the example.',
        pairs: [
          ['A specific moment', '"On my first morning, you laughed..."'],
          ['The difference it made', '"...made the job change feel possible."'],
          ['A small offer', '"Lunch is on me."'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Callback', '"How did the interview go?"'],
          ['People note', 'Name, detail, what\'s coming up'],
          ['5-second recovery', 'Acknowledge, apologise once, move on'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A thank-you formula.',
        template: 'Thank you for [[1]] (a moment). It [[2]] (the difference). [[3]] is on me.',
        blanks: [['laughing', 'helping'], ['made', 'helped'], ['Lunch', 'Coffee']],
        distractors: ['everything', 'lol'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the opening of a real thank-you.',
        tiles: ['I\'ve', 'been', 'meaning', 'to', 'say', 'thank', 'you.'],
        distractors: ['lol', 'sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Who helped you through something, and never got a proper thank-you? Write the message now: a specific moment, the difference it made, and warmth.',
    starters: ['Dear ...,', 'I\'ve been meaning to say...', 'It made...'],
  },
  deepen: {
    title: 'Send one this week',
    summary: 'Send one specific thank-you this week, by message, letter or in person. You\'ll probably feel nervous. The research says the person will be happier and less awkward about it than you expect.',
  },
  notes: 'Kumar & Epley (2018), "Undervaluing gratitude: Expressers misunderstand the consequences of showing appreciation", Psychological Science 29(9) — expressers underestimated recipients\' surprise and positive mood and overestimated awkwardness; expressers focused on competence (wording), recipients on warmth. Link to liking gap (Boothby et al. 2018).',
};

export default lesson;

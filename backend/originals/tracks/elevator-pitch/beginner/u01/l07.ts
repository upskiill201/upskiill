import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Card deck: 60 seconds is about 140 words (speech rate, cutting, timing). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '60 seconds is about 140 words',
  summary: 'Ada times her new pitch with her phone\'s stopwatch. It takes two minutes and 12 seconds. Pitch night allows sixty. Arjun: "Time to cut."',
  minutes: 11,
  outcomes: [
    'Know roughly how many words fit in 30 and 60 seconds',
    'Cut a pitch without losing the point',
    'Always time your pitch out loud',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Ada's pitch is 300 words. On pitch night, the microphone switches off at 60 seconds. Here's how timing actually works.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: How fast people talk</h3><p>Most people speak somewhere around <strong>130 to 150 words a minute</strong> in a presentation. So a 60-second pitch is roughly <strong>140 words</strong>, and a 30-second pitch is about <strong>70</strong>. Nervous people speak faster, so leave room for pauses.</p><h3>Card 2: Count, then time it</h3><p>Count your words as a first check. Then say it out loud with a stopwatch. Reading silently is always faster than speaking.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 3: Cut from the middle</h3><p>Keep your first sentence and your ask. Cut the middle: background, extra features, a second example. Ask of every line: \"If I deleted this, would they notice?\"</p><h3>Card 4: Cut the warm-up</h3><p>\"So, um, hi, thank you so much for having me, I'm really excited to be here...\" can eat 10 of your 60 seconds. Start with something that matters.</p>",
    },
    {
      kind: 'check',
      question: 'Roughly how many words fit in a 60-second spoken pitch?',
      options: ['About 140', 'About 400', 'About 30'],
      answer: 0,
      explanation: 'At around 130–150 words a minute, 60 seconds is about 140 words. Leave room for pauses.',
    },
    {
      kind: 'text',
      html: "<h3>Card 5: Have three lengths</h3><p>Know your <strong>one sentence</strong> (about 5 seconds), your <strong>30-second</strong> version (about 70 words), and your <strong>60-second</strong> version (about 140 words). Chapter 5 shows you how to stretch and shrink them on the spot.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '30 seconds ≈ 70 words. 60 seconds ≈ 140 words. Cut the middle and the warm-up, never the first line or the ask. Time it out loud.',
    },
  ],
  apply: {
    scenario: 'Ada\'s stopwatch: 2:12.',
    items: [
      {
        kind: 'mcq',
        prompt: 'About how many words fit in a 30-second pitch?',
        options: [
          { text: 'About 300', why: 'That\'s over two minutes.' },
          { text: 'About 70' },
          { text: 'About 10', why: 'That\'s your one sentence.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'The one sentence', group: 0 },
          { text: '"So, um, hi, thanks so much for having me..."', group: 1 },
          { text: 'The ask', group: 0 },
          { text: 'A second example of the same point', group: 1 },
          { text: 'The full history of the app', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I timed it reading in my head: 55 seconds! Perfect, right?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Reading in your head is faster than speaking. Say it out loud with the stopwatch.' },
          { text: 'Perfect, done.', why: 'Out loud will be longer.' },
          { text: 'Read it faster on the night.', why: 'Rushing makes it harder to follow.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When cutting, ask of every line: "If I deleted this, would they ___?" (one word)',
        answers: ['notice', 'care', 'miss'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the timing process in order.',
        lines: ['Count the words', 'Say it out loud with a stopwatch', 'Cut the warm-up and the middle', 'Time it again'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the length to its rough size.',
        pairs: [
          ['One sentence', 'About 5 seconds'],
          ['30-second pitch', 'About 70 words'],
          ['60-second pitch', 'About 140 words'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why leave room for pauses?',
        options: [
          { text: 'To fill time', why: 'Pauses are for impact, not filler.' },
          { text: 'Nervous people speak faster, and pauses help the important parts land' },
          { text: 'You don\'t need any', why: 'Without pauses, a pitch becomes a blur.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s cut. Which part should she NOT have cut?',
        lines: [
          'Cut: "So, um, hi, I\'m really excited to be here."',
          'Cut: the second example about Tunde.',
          'Cut: "I\'m looking for a mentor to reach 100 offices."',
        ],
        bug: 2,
        fix: 'Keep the ask. Cut the history of the app instead.',
        explanation: 'Never cut the first line or the ask. They\'re the two most important parts.',
      },
      {
        kind: 'fillBlank',
        prompt: 'The timing rule.',
        template: '30 seconds is about [[1]] words. 60 seconds is about [[2]]. Always time it out [[3]].',
        blanks: [['70', 'seventy'], ['140'], ['loud']],
        distractors: ['400', 'silently'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the cutting rule.',
        tiles: ['Cut', 'the', 'middle,', 'never', 'the', 'ask.'],
        distractors: ['first'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your pitch, then count the words. Is it closer to 30 or 60 seconds? What could you cut?',
    starters: ['My word count: ...', 'I could cut...'],
  },
  deepen: {
    title: 'Stopwatch it',
    summary: 'Say your pitch out loud three times with a stopwatch. Write down each time. Most people are surprised how long it really takes.',
  },
  notes: 'Typical presentation speech rate roughly 130–150 words per minute (standard speech-rate guidance; varies by speaker and language). Word counts are approximations.',
};

export default lesson;

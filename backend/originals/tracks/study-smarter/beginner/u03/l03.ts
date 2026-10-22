import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — summaries at three lengths: one sentence, three bullets, one paragraph. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Summaries at three lengths',
  summary: 'Squeeze a topic into one sentence, three bullets and one paragraph. Each length makes you decide what really matters.',
  minutes: 12,
  outcomes: [
    'Write a topic summary at three lengths',
    'Decide what matters most in a topic',
    'Use the AI to compare your summary with the key points',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The three-length summary (Efua\'s method)',
      steps: [
        { title: 'One paragraph (5 minutes)', body: 'Close your notes. Write everything important about the topic in one paragraph, about 80 words.' },
        { title: 'Three bullets (2 minutes)', body: 'Cut it to the three most important points. This forces you to decide what really matters.' },
        { title: 'One sentence (1 minute)', body: 'The whole topic in one sentence. "Osmosis is water moving across a membrane towards where there\'s less water."' },
        { title: 'Check with AI', body: '"Here are my three summaries of osmosis for final-year Biology. Did I miss any key point? Is anything wrong? Don\'t rewrite them."' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Why three lengths? Because <strong>shortening is thinking</strong>. To cut 80 words down to three bullets, you have to decide what\'s essential and what\'s detail. That decision is what makes the topic stick.</p><p>Notice the order: long to short, and <strong>from memory</strong>. If you write a summary while looking at your notes, you\'re copying again.</p><p>The one-sentence version is gold for revision: write them on the front of flashcards, or at the top of each page of notes.</p>',
    },
    {
      kind: 'check',
      question: 'Why write the summaries from memory?',
      options: ['It is faster', 'Writing while looking is just copying again', 'Notes are not allowed'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi summarises Biology topics three ways.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the three-length summary in order.',
        lines: ['Close your notes', 'One paragraph', 'Three bullets', 'One sentence', 'Ask the AI what you missed'],
      },
      {
        kind: 'mcq',
        prompt: 'Which is the best one-sentence summary of osmosis?',
        options: [
          { text: 'Osmosis is water moving across a membrane towards where there is less water.' },
          { text: 'Osmosis is a Biology topic.', why: 'True, but it says nothing.' },
          { text: 'Osmosis is when things move.', why: 'Too vague. What moves, and which way?' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has written his three summaries. Which request is best?',
        options: [
          { text: 'Write three summaries of osmosis for me.', why: 'He already wrote his. Now he needs a check.' },
          { text: "Here are my three summaries of osmosis for final-year Biology. Did I miss a key point? Is anything wrong? Don't rewrite them." },
          { text: 'Make my summaries longer.', why: 'Shortening is the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Key point or detail for a 3-bullet summary of photosynthesis?',
        groups: ['Key point', 'Detail'],
        items: [
          { text: 'Plants make glucose using light energy', group: 0 },
          { text: 'It needs carbon dioxide and water, and releases oxygen', group: 0 },
          { text: 'It happens in chloroplasts', group: 0 },
          { text: 'A scientist studied it in the 1700s', group: 1 },
          { text: 'Some leaves are darker green than others', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "Kofi, your one-sentence summary is 47 words long.",
        prompt: 'What should Kofi do?',
        options: [
          { text: 'Keep it, more words means more learning.', why: 'Shortening is the learning here.' },
          { text: "Cut it again. If it's that long, he hasn't decided what matters most yet." },
          { text: 'Ask the AI to write the sentence.', why: 'Then the AI decides what matters, not him.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Photosynthesis takes in carbon dioxide and water, and gives out glucose and which gas? (one word)',
        answers: ['oxygen', 'o2'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: "Which step of Clinton's summary routine is wrong?",
        lines: ['Opened his notes beside him.', 'Wrote one paragraph, one sentence at a time from the notes.', 'Cut it to three bullets.'],
        bug: 0,
        fix: 'Closed his notes first, and wrote from memory.',
        explanation: 'With the notes open, his summary is just shorter copying.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the length to what it is good for.',
        pairs: [
          ['One paragraph', 'Checking you remember the whole topic'],
          ['Three bullets', 'Deciding what matters most'],
          ['One sentence', 'Flashcard fronts and page headings'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete the lesson's big idea.",
        template: '[[1]] is thinking. Write it from [[2]], long to short.',
        blanks: [['Shortening', 'Cutting'], ['memory']],
        distractors: ['Copying', 'the slides'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the order of the summaries.',
        tiles: ['Paragraph,', 'bullets,', 'sentence'],
        distractors: ['essay,', 'book,'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a one-sentence summary of a topic you studied this week, from memory.',
    starters: ['Topic:', 'In one sentence:'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Do the three-length summary on one topic, from memory, then ask the AI what you missed.',
  },
  notes: 'Photosynthesis: CO2 + H2O → glucose + O2 (light, chlorophyll, in chloroplasts). Summarising rated "low utility" by Dunlosky 2013 when students lack training; framed here as a trained, from-memory activity checked with AI, which is closer to retrieval practice.',
};

export default lesson;

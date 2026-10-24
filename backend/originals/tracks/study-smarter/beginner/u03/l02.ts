import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — make notes first, then improve them with AI (never the other way round). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Make notes first, then improve them',
  summary: "AI can write beautiful notes in seconds. That's exactly the problem. Write yours first, then let the AI find what's missing.",
  minutes: 12,
  outcomes: [
    'Write your own notes before involving AI',
    'Ask the AI to check and improve them, not replace them',
    'Keep track of what the AI added',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to use AI for notes',
      before: {
        label: 'AI first',
        text: 'Clinton pastes the topic in: "Make me notes on osmosis." Perfect notes appear. He saves them. A week later he can\'t remember a single line, because he never wrote one.',
      },
      after: {
        label: 'You first',
        text: 'Kofi writes half a page on osmosis in his own words, from memory and the lesson. Then: "Here are my notes on osmosis for final-year Biology. What\'s missing or wrong? Don\'t rewrite them. List the problems."',
      },
      notes: ['Kofi\'s brain did the work first.', 'The AI checks instead of replacing.', 'He fixes the problems himself, so they stick too.'],
    },
    {
      kind: 'text',
      html: '<p>Your notes are useful because <strong>you made them</strong>. AI-made notes look better and teach you less.</p><p>So the order is always: <strong>you write, AI checks, you fix.</strong></p><ul><li><strong>You write:</strong> from the lesson and your memory, in your own words.</li><li><strong>AI checks:</strong> "What\'s missing or wrong? Don\'t rewrite them, list the problems."</li><li><strong>You fix:</strong> add what was missing in a <strong>different colour</strong>, so you can see what you didn\'t know. Those coloured bits are your weak spots.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Add the AI\'s corrections in a different colour. At revision time, the coloured bits show you exactly what you didn\'t know.',
    },
    {
      kind: 'check',
      question: 'What is the right order?',
      options: ['AI writes, you read', 'You write, AI checks, you fix', 'AI writes, you copy'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi improves his own notes with AI.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the notes routine in order.',
        lines: ['Write your own notes', 'Ask the AI to list what is missing or wrong', 'Add the fixes in a different colour', 'Quiz yourself on the coloured bits'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best after Kofi writes his notes?',
        options: [
          { text: 'Rewrite my notes so they are better.', why: 'Then they are not his any more.' },
          { text: "Here are my notes on osmosis for final-year Biology. What's missing or wrong? Don't rewrite them. List the problems." },
          { text: 'Are my notes good?', why: 'Probably gets "yes!", not the problems.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "Why would I write notes when the AI writes better ones in 5 seconds?",
        prompt: 'What should Kofi say?',
        options: [
          { text: "You're right, let the AI do it.", why: 'Then he remembers nothing.' },
          { text: 'AI notes are always wrong.', why: 'Often they are good. That is not the problem.' },
          { text: "Because the notes aren't the point, the thinking is. If the AI writes them, the AI did the thinking." },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the key instruction.',
        tiles: ["Don't", 'rewrite', 'them.', 'List', 'the', 'problems.'],
        distractors: ['Replace', 'everything'],
      },
      {
        kind: 'sortGroups',
        prompt: 'You first, or AI first?',
        groups: ['You first', 'AI first'],
        items: [
          { text: 'Write half a page, then ask for gaps', group: 0 },
          { text: '"Make me notes on osmosis"', group: 1 },
          { text: 'Fix the problems it lists yourself', group: 0 },
          { text: 'Save the AI notes as your own', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you use to show what the AI added, so you can spot your weak points? A different ... (one word)',
        answers: ['colour', 'color', 'pen'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The AI checked Kofi\'s osmosis notes. Which suggestion should he question?',
        lines: ['Missing: the membrane is partially permeable.', 'Missing: an example, like plant roots taking in water.', 'Wrong: water moves from concentrated to dilute.'],
        bug: 2,
        fix: 'Check the textbook: water moves from dilute (more water) to concentrated (less water).',
        explanation: 'Kofi\'s original was right. The AI can be wrong too, so check any "correction" against your textbook.',
      },
      {
        kind: 'mcq',
        prompt: 'Why are AI-made notes less useful even when they are better written?',
        options: [
          { text: 'They are too short', why: 'Length is not the issue.' },
          { text: "You didn't do the thinking that makes things stick" },
          { text: 'They are against the rules', why: 'Not necessarily. They just teach you less.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to who does it.',
        pairs: [
          ['Writing the first draft', 'You, in your own words'],
          ['Listing what is missing', 'The AI, as a checker'],
          ['Adding the fixes', 'You, after checking'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the order.',
        template: 'You [[1]], AI [[2]], you [[3]].',
        blanks: [['write'], ['checks', 'check'], ['fix']],
        distractors: ['copy', 'sleep'],
      },
    ],
  },
  reflect: {
    prompt: 'Take notes you made recently. What would you expect the AI to say is missing?',
    starters: ['My notes are on...', 'Probably missing...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Write half a page on one topic from memory, then ask the AI to list what is missing. Add the fixes in a different colour.',
  },
  notes: 'Generation effect (self-generated material remembered better) stated generally. Osmosis in roots: root hair cells take in water by osmosis.',
};

export default lesson;

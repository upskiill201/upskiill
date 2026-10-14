import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 12 — one topic, three ways: explanation, a picture in words, then a quiz. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'One topic, three ways',
  summary: 'Read it, picture it, test it. Three quick passes beat one long one, and AI can do all three in ten minutes.',
  minutes: 13,
  outcomes: [
    'Run a three-pass study session on one topic',
    'Ask for a picture in words or a simple diagram',
    'Finish every session by testing yourself',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The three-pass session (10 minutes)',
      steps: [
        {
          title: 'Pass 1: the words (3 minutes)',
          body: 'Ask for a short explanation using the recipe. "Final year. Topic: how particles move in solids, liquids and gases. Explain it in under 100 words."',
        },
        {
          title: 'Pass 2: the picture (3 minutes)',
          body: '"Now describe it as a picture I could draw: what each state looks like, in boxes." Then draw it yourself on paper. Drawing it is the point.',
        },
        {
          title: 'Pass 3: the test (4 minutes)',
          body: '"Now ask me 4 questions on this, one at a time. Don\'t show the answers. Tell me which ones I got wrong and why."',
        },
        {
          title: 'Close: one line',
          body: 'Write one sentence that sums up the topic, without looking. If you can\'t, that tells you to come back to it tomorrow.',
        },
      ],
    },
    {
      kind: 'text',
      html: '<p>Why three passes? Each one makes your brain do something different. Words give you the idea. A picture gives you a second way to remember it: researchers call this <strong>dual coding</strong>, words plus visuals. And the test is retrieval practice, the strongest habit from the last lesson.</p><p>Here\'s the picture for particles, in words:</p><ul><li><strong>Solid:</strong> particles packed tightly in rows, vibrating on the spot.</li><li><strong>Liquid:</strong> particles close together but jumbled, sliding past each other.</li><li><strong>Gas:</strong> particles far apart, moving fast in every direction.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Draw the picture yourself. The AI describing it is not the same as your hand drawing it.',
    },
    {
      kind: 'check',
      question: 'What is the last pass of the session?',
      options: ['Rereading the explanation', 'Testing yourself', 'Drawing the picture'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi tries a three-pass session on particles.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the three-pass session in order.',
        lines: ['Ask for a short explanation', 'Ask for a picture in words and draw it', 'Ask for 4 questions, one at a time', 'Write one summary line without looking'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each state to its picture.',
        pairs: [
          ['Solid', 'Packed in rows, vibrating on the spot'],
          ['Liquid', 'Close but jumbled, sliding past each other'],
          ['Gas', 'Far apart, moving fast everywhere'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why add a picture to the words?',
        options: [
          { text: 'Words plus a visual give you two ways to remember it' },
          { text: 'Because some people are visual learners', why: 'That is the learning styles myth. Words plus pictures help everyone.' },
          { text: 'It looks nicer in your notes', why: 'Maybe, but that is not why it works.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which pass is this?',
        groups: ['Words', 'Picture', 'Test'],
        items: [
          { text: 'Explain it in under 100 words', group: 0 },
          { text: 'Describe it as boxes I could draw', group: 1 },
          { text: 'Ask me 4 questions, one at a time', group: 2 },
          { text: 'Tell me which ones I got wrong', group: 2 },
          { text: 'What would it look like if I could see it?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I did the words and the picture for circuits. Do I really need the test part? I think I've got it.",
        prompt: 'What should Kofi say?',
        options: [
          { text: "Yes. Feeling like you've got it isn't the same as remembering it. The test shows you." },
          { text: 'No, if you feel it, you know it.', why: "That's the same trap as rereading." },
          { text: 'Do the words again instead.', why: 'That is rereading.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which state are the particles far apart and moving fast? (one word)',
        answers: ['gas', 'gases', 'a gas'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: "Which step of Clinton's session misses the point?",
        lines: ['Asked for a 100-word explanation of osmosis.', 'Asked the AI to describe a diagram, then looked at it.', 'Answered 4 questions without notes.'],
        bug: 1,
        fix: 'Asked the AI to describe a diagram, then drew it himself.',
        explanation: 'Drawing it yourself is what makes the picture stick.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the session plan.',
        template: 'Read it, [[1]] it, [[2]] it.',
        blanks: [['picture', 'draw'], ['test']],
        distractors: ['copy', 'highlight'],
      },
      {
        kind: 'mcq',
        prompt: "Kofi can't write the one summary line without looking. What does that tell him?",
        options: [
          { text: 'Come back to this topic tomorrow' },
          { text: 'He is bad at chemistry', why: 'It just means it hasn\'t stuck yet. That is normal.' },
          { text: 'Copy the summary from the AI', why: 'That skips the test.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the Pass 2 request.',
        tiles: ['Describe', 'it', 'as', 'a', 'picture', 'I', 'could', 'draw'],
        distractors: ['for', 'me'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick one topic for tomorrow. Write your Pass 1, Pass 2 and Pass 3 requests.',
    starters: ['Topic:', 'Pass 1:', 'Pass 2:', 'Pass 3:'],
  },
  deepen: {
    title: 'Try it tomorrow',
    summary: 'Run one 10-minute three-pass session. Draw the picture on paper and keep it in your notes.',
  },
  notes: 'Dual coding (Paivio; applied by Mayer, multimedia learning) stated generally. Particle model descriptions are standard school-level descriptions.',
};

export default lesson;

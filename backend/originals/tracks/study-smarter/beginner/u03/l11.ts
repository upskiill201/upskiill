import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — notes from a video lesson: pause, predict, note from memory. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Notes from a video lesson',
  summary: 'David watches two hours of Physics videos a night and remembers almost nothing. A pause button and a question change everything.',
  minutes: 12,
  outcomes: [
    'Turn video watching into active note-taking',
    'Use pause-and-predict to stay switched on',
    'Use AI on a transcript carefully',
  ],
  learn: [
    {
      kind: 'story',
      title: "David's video marathon",
      beats: [
        { speaker: 'narrator', text: 'Thursday call. David looks exhausted.' },
        { speaker: 'david', text: "I watched two hours of Physics videos last night. Electricity. I couldn't tell you one thing from them this morning." },
        { speaker: 'miracle', text: "Did you pause it? Ever?" },
        { speaker: 'david', text: "...At 1.5x speed? No." },
        { speaker: 'miracle', text: "Watching feels like learning because someone clever is talking. But your brain is just along for the ride. Try this: pause every few minutes and write what you just learned, from memory. And before each new part, guess what's coming." },
        { speaker: 'tey', text: "Watch what happens next week." },
        { speaker: 'narrator', text: 'Next Thursday: David watched one 12-minute video in 30 minutes, with five pauses. He can explain series and parallel circuits to the whole group.' },
      ],
      choice: {
        prompt: 'David has a 20-minute video on resistance. What is the best plan?',
        options: [
          {
            text: 'Pause every 3 to 5 minutes, write what he learned from memory, and guess what comes next before pressing play.',
            outcome: 'It takes him 45 minutes. He remembers it the next day, and his guesses show where his thinking is off.',
            best: true,
          },
          { text: 'Watch it at 2x speed to save time, then watch another one.', outcome: 'Done in 10 minutes. Gone by bedtime.' },
          { text: 'Get the AI to summarise the transcript instead of watching.', outcome: 'A neat summary he has read, not learned. And the summary may have errors he can\'t spot.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>The video routine:</p><ul><li><strong>Before:</strong> write what you already know about the topic, and one question you want answered.</li><li><strong>Pause every 3 to 5 minutes:</strong> write what you just learned, in your own words, without rewinding.</li><li><strong>Predict:</strong> before pressing play, guess what comes next.</li><li><strong>After:</strong> answer your opening question, then ask the AI to quiz you on your notes.</li></ul><p>If a video has a transcript, AI can turn it into questions for you: <em>"Here\'s a transcript. Make 5 questions to check I understood it. Don\'t summarise it."</em> Transcripts can contain errors, so check anything surprising.</p>',
    },
    {
      kind: 'check',
      question: 'What do you do at each pause?',
      options: ['Rewind and rewatch', 'Write what you learned from memory', 'Check your phone'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'David learns from videos properly.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the video routine in order.',
        lines: ['Write what you know and one question', 'Watch 3 to 5 minutes', 'Pause and write from memory', 'Predict what comes next', 'Ask the AI to quiz you at the end'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does watching a video feel like learning even when it isn\'t?',
        options: [
          { text: 'Someone clever is talking, so your brain feels busy without doing the work' },
          { text: 'Videos are always better than books', why: 'They are not, on their own.' },
          { text: 'Because it takes a long time', why: 'Time spent is not learning.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Active watching or passive watching?',
        groups: ['Active', 'Passive'],
        items: [
          { text: 'Pausing to write from memory', group: 0 },
          { text: 'Watching at 2x with no pauses', group: 1 },
          { text: 'Guessing what comes next', group: 0 },
          { text: 'Autoplaying the next video', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'David has a transcript of the video. Which request is best?',
        options: [
          { text: "Here's a transcript. Make 5 questions to check I understood it. Don't summarise it." },
          { text: 'Summarise this transcript so I can skip the video.', why: 'Replaces the learning.' },
          { text: 'Is this video good?', why: 'Not a study question.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "I watch my Maths videos at 2x. Same content, half the time.",
        prompt: 'What should Kofi say?',
        options: [
          { text: "Same content in, but how much comes out? Try pausing to write from memory. If you can't, the speed cost you." },
          { text: 'Try 3x.', why: 'Faster is not the fix.' },
          { text: 'Videos are useless.', why: 'They are useful when you use them actively.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How often should you pause the video? Every 3 to ... minutes (number)',
        answers: ['5', 'five'],
        placeholder: 'Number',
      },
      {
        kind: 'findBug',
        prompt: "Which step of Clinton's video plan is passive?",
        lines: ['Wrote one question he wants answered.', 'Watched the whole video, then rewound to copy the slides.', 'Asked the AI to quiz him.'],
        bug: 1,
        fix: 'Paused every few minutes and wrote from memory.',
        explanation: 'Rewinding to copy slides is copying, just from a screen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to why it helps.',
        pairs: [
          ['A question before you start', 'Gives you something to look for'],
          ['Pause and write from memory', 'Retrieval practice'],
          ['Predict what comes next', 'Keeps your brain switched on'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Miracle's point.",
        template: 'Watching feels like [[1]], but your brain is just along for the [[2]].',
        blanks: [['learning'], ['ride']],
        distractors: ['sleeping', 'test'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the transcript instruction.',
        tiles: ['Make', '5', 'questions.', "Don't", 'summarise', 'it.'],
        distractors: ['Copy', 'everything'],
      },
    ],
  },
  reflect: {
    prompt: 'What was the last video you learned from? What would you have written at the first pause?',
    starters: ['The video was about...', 'At the first pause I would write...'],
  },
  deepen: {
    title: 'Try it this week',
    summary: 'Watch one study video with the full routine: a question first, pauses, predictions, and an AI quiz at the end.',
  },
  notes: 'Prediction and pausing to retrieve are active-learning techniques; illusion of fluency from watching expert explanations stated generally. Auto-generated transcripts can contain recognition errors.',
};

export default lesson;

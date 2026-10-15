import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — the most common study-prompt mistakes, explored on one bad prompt. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The most common study-prompt mistakes',
  summary: "Clinton's prompt makes six classic mistakes in four lines. Tap each one to see what goes wrong and how to fix it.",
  minutes: 12,
  outcomes: [
    'Spot the six most common study-prompt mistakes',
    'Fix each one with a move from this chapter',
    'Rewrite a weak prompt into a strong one',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Clinton's prompt. Tap each mistake.",
      text: 'Explain photosynthesis. Make it detailed and also give me some questions with the answers. Write it like a textbook. I need to know everything for my test.',
      hotspots: [
        { phrase: 'Explain photosynthesis.', note: 'Mistake 1: no level. Is this for age 10 or a PhD? Fix: say your stage and what you already know.' },
        { phrase: 'Make it detailed', note: 'Mistake 2: asking for more volume. Detail is what makes walls of text. Fix: "simply, one idea at a time".' },
        { phrase: 'also give me some questions', note: 'Mistake 3: two jobs at once. Fix: one job per prompt. Explain first, quiz after.' },
        { phrase: 'with the answers', note: 'Mistake 4: answers on screen. You will read them, not answer them. Fix: "one at a time, wait for my answer".' },
        { phrase: 'Write it like a textbook', note: 'Mistake 5: asking for the style that already did not work. Fix: an everyday example or an analogy.' },
        { phrase: 'I need to know everything', note: 'Mistake 6: no syllabus. "Everything" is too much. Fix: paste the syllabus line for what the test covers.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Fixed',
      before: { label: "Clinton's version", text: 'Explain photosynthesis. Make it detailed and also give me some questions with the answers. Write it like a textbook. I need to know everything for my test.' },
      after: {
        label: 'Fixed version',
        text: "I'm in my final year and I know plants need sunlight. Syllabus line: 'describe photosynthesis and its word equation'. Explain it simply with one everyday example, then stop. (Next prompt: quiz me, one at a time.)",
      },
      notes: ['Level and what he knows.', 'Syllabus line instead of "everything".', 'One job, simple, then stop.'],
    },
    {
      kind: 'check',
      question: 'Which mistake is "give me questions with the answers"?',
      options: ['No level', 'Answers on screen', 'No syllabus'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi helps fix the group\'s prompts.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to its fix.',
        pairs: [
          ['No level', 'Say your stage and what you know'],
          ['Asking for detail', 'Simply, one idea at a time'],
          ['Two jobs at once', 'One job per prompt'],
          ['Answers on screen', 'One at a time, wait for my answer'],
          ['"Everything"', 'Paste the syllabus line'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which line of David's prompt is the mistake?",
        lines: ["I'm in my final year and I know Ohm's law.", 'Topic: series and parallel circuits.', 'Explain it, quiz me, and mark my homework.'],
        bug: 2,
        fix: 'Explain it, simply. (Quiz in the next prompt.)',
        explanation: 'Three jobs in one prompt gets a muddled answer.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Mistake or good move?',
        groups: ['Mistake', 'Good move'],
        items: [
          { text: 'Make it detailed', group: 0 },
          { text: 'Stop after the first idea', group: 1 },
          { text: 'I need to know everything', group: 0 },
          { text: 'Here is my syllabus line', group: 1 },
          { text: 'Include the answers', group: 0 },
          { text: 'One question at a time', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many jobs should one study prompt have? (number)',
        answers: ['1', 'one'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt makes NONE of the six mistakes?',
        options: [
          { text: 'Explain photosynthesis in detail, like a textbook.', why: 'No level, asks for detail, textbook style.' },
          { text: "Final year, I know plants need light. Syllabus: 'describe photosynthesis'. Explain it simply with one example, then stop." },
          { text: 'Tell me everything about photosynthesis and quiz me.', why: '"Everything" and two jobs.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'OK OK, my prompt was bad. Which ONE fix matters most?',
        prompt: 'What would Kofi say from his own experience?',
        options: [
          { text: "Tell it your level. That's what fixed my wall of text on day one." },
          { text: 'Add "please".', why: 'Politeness is nice, but it is not what changes the answer.' },
          { text: 'Use a different app.', why: 'Same prompt, same guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete the fixed version of Clinton's prompt.",
        template: "I'm in my [[1]] year and I know plants need sunlight. [[2]] line: describe photosynthesis. Explain it [[3]], then stop.",
        blanks: [['final', 'last'], ['Syllabus'], ['simply']],
        distractors: ['textbook', 'detailed'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the fixed prompt.',
        lines: ['Your stage and what you know', 'The syllabus line', 'One job: explain it', 'The shape: simply, one example, stop'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Write it like a textbook" a mistake for Clinton?',
        options: [
          { text: "The textbook style is what he didn't understand in the first place" },
          { text: 'Textbooks are always wrong', why: 'They are usually right. The style just did not work for him.' },
          { text: 'AI cannot write like a textbook', why: 'It can. That is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the fix for "with the answers".',
        tiles: ['One', 'at', 'a', 'time,', 'wait', 'for', 'my', 'answer'],
        distractors: ['show', 'all'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last study question you asked an AI. Which of the six mistakes did it make? Rewrite it.',
    starters: ['My last question was...', 'It made the mistake of...', 'Rewritten:'],
  },
  deepen: {
    title: 'Fix one for a friend',
    summary: "Ask a friend to show you their last study prompt. Find the mistakes together and fix it.",
  },
  notes: 'Photosynthesis word equation: carbon dioxide + water → glucose + oxygen (light, chlorophyll). Consolidation lesson.',
};

export default lesson;

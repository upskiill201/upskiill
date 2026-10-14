import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The hook for the whole course: the question is the problem, not the AI. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: "Kofi's first question",
  summary: 'Kofi asks an AI to explain moles and gets a wall of text. The problem was never the AI. It was the question.',
  minutes: 11,
  outcomes: [
    'See why a short question gets a long, generic answer',
    'Name the three things an AI needs to help you study',
    'Turn a one-line question into a useful one',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Forty weeks to go',
      beats: [
        { speaker: 'narrator', text: 'Monday, first week of term, Accra. Kofi Mensah, 17, final year. Forty weeks until his final exams.' },
        { speaker: 'asante', text: 'Chemistry test in three weeks. Moles and molar mass. No excuses this time, Kofi.' },
        { speaker: 'narrator', text: 'Moles. The topic Kofi skipped last year because football practice clashed with the lesson. He never caught up.' },
        { speaker: 'narrator', text: 'That night he opens an AI chat and types four words: "explain moles in chemistry".' },
        { speaker: 'narrator', text: 'Eleven seconds later: Avogadro, 6.022 × 10²³, "the SI base unit for amount of substance", three formulas and a history paragraph. Kofi reads it twice. He understands less than before.' },
        { speaker: 'kofi', text: "Even the AI thinks I'm supposed to know this already." },
        { speaker: 'tey', text: "Not quite. It had no idea who was asking. A professor and a student who missed the lesson typed the same four words. So it answered for nobody in particular." },
      ],
      choice: {
        prompt: 'What should Kofi do next?',
        options: [
          {
            text: 'Tell it more: "I\'m in my final year of school, I missed the moles lesson, and I don\'t get what a mole even is. Explain it simply, with an everyday example, and stop after the first idea."',
            outcome: 'The answer starts with eggs: a dozen means 12 of anything, and a mole means 6.022 × 10²³ of anything. One idea, one example. For the first time, Kofi gets it.',
            best: true,
          },
          {
            text: 'Try a different AI app.',
            outcome: 'Another wall of text, worded differently. Same four words in, same guess out.',
          },
          {
            text: 'Copy the answer into his notes and hope it makes sense later.',
            outcome: 'Three weeks later it still doesn\'t make sense. Copying an explanation isn\'t the same as understanding it.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Here's what happened. When you ask a short question, the AI has to <strong>guess</strong> everything you didn't say: how much you already know, why you're asking, and what kind of answer helps.</p><p>When it guesses, it aims for the middle: a textbook-style answer for nobody in particular. That's why AI answers so often feel long, generic and slightly too hard.</p><p>Three things fix most of it:</p><ul><li><strong>Your level:</strong> what year you're in and what you already know.</li><li><strong>Your gap:</strong> where exactly you're stuck.</li><li><strong>The shape you need:</strong> simple, short, one idea at a time, with an example.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A short question gets an answer for nobody. Tell it who you are and where you are stuck, and it answers for you.',
    },
    {
      kind: 'check',
      question: 'Why did Kofi get a wall of text?',
      options: ['The AI was broken', 'His question gave it nothing about him, so it guessed', 'Moles are impossible to explain'],
      answer: 1,
      explanation: 'Four words told it the topic but nothing about who was asking.',
    },
  ],
  apply: {
    scenario: "Kofi's first week back. Forty weeks to go.",
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an AI do with everything your question leaves out?',
        options: [
          { text: 'It guesses, and aims for a middle-of-the-road answer' },
          { text: 'It asks you every time', why: 'Sometimes it does, but usually it just guesses.' },
          { text: 'It looks up your school records', why: 'It can\'t see anything about you unless you tell it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which detail is which?',
        groups: ['Your level', 'Your gap', 'The shape you need'],
        items: [
          { text: "I'm in my final year of school", group: 0 },
          { text: "I don't get what a mole actually is", group: 1 },
          { text: 'Use an everyday example', group: 2 },
          { text: 'I know atoms, but not molar mass', group: 0 },
          { text: 'Keep it under 100 words', group: 2 },
          { text: 'I get the formula but not why it works', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question will get Kofi the most useful answer?',
        options: [
          { text: 'explain moles', why: 'Topic only. The AI has to guess everything else.' },
          { text: 'Explain moles in chemistry in full detail.', why: '"Full detail" is the opposite of what he needs right now.' },
          { text: "I'm in my last year of school and missed the moles lesson. Explain what a mole is simply, with an everyday example." },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Bro, AI is useless for chemistry. I asked it about moles and it gave me an essay. A whole essay.',
        prompt: 'Kofi met Clinton in Miracle\'s study group. What should Kofi reply?',
        options: [
          { text: 'Same! What did you ask it? Mine got way better when I told it my level and where I was stuck.' },
          { text: 'Yeah, AI is useless.', why: "Kofi just found out it isn't. The question was the problem." },
          { text: 'Ask it ten times until it\'s shorter.', why: 'The same question gets the same kind of guess.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the part of the question that tells the AI your gap.',
        tiles: ['I', "don't", 'get', 'what', 'a', 'mole', 'is'],
        distractors: ['explain', 'everything'],
      },
      {
        kind: 'findBug',
        prompt: "Spot the line that will make Kofi's answer too hard.",
        lines: [
          "I'm in my final year and Chemistry is my weak subject.",
          'Explain molar mass using university-level terms.',
          'Use one everyday example.',
        ],
        bug: 1,
        fix: 'Explain molar mass in plain words, as if I missed the lesson.',
        explanation: 'University terms are the reason the first answer was a wall of text.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'When your question leaves things out, the AI has to ... (one word)',
        answers: ['guess', 'assume'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: "Match what Kofi tells the AI to what it changes in the answer.",
        pairs: [
          ['"I\'m in my final year"', 'The level of the words'],
          ['"I missed the lesson"', 'Where it starts from'],
          ['"Use an everyday example"', 'How it explains'],
          ['"Stop after the first idea"', 'How long it is'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's better question.",
        template: "I'm in my [[1]] year of school. I [[2]] the moles lesson. Explain it simply with an [[3]] example.",
        blanks: [['final', 'last'], ['missed'], ['everyday']],
        distractors: ['first', 'loved', 'advanced'],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi copies the AI\'s answer into his notes without understanding it. What\'s the problem?',
        options: [
          { text: 'Copying an explanation is not the same as understanding it' },
          { text: 'Nothing, notes are notes', why: 'Notes he doesn\'t understand won\'t help him in the test.' },
          { text: 'The AI will be offended', why: "It won't. But Kofi's test result might suffer." },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: "Think of a topic you're stuck on right now. Write the one-line question you'd normally ask, then add your level, your gap and the shape you need.",
    starters: ['The topic I am stuck on is...', 'My better question is...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Ask an AI about one topic you find hard. Ask it twice: once in a few words, once with your level, your gap and the shape you need. Compare the answers.',
  },
  notes: "Avogadro constant 6.022 × 10²³ per mole (SI, exact by definition since 2019: 6.02214076 × 10²³). The 'dozen' analogy is a standard teaching analogy.",
};

export default lesson;

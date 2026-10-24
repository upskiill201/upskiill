import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Unit Challenge. The whole chapter, harder. Story climax: test day. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: test day',
  summary: "Monday, 8am. Mrs Asante hands out the moles test, with a surprise question at the end. Everything from Chapter 1, harder.",
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use every study move from Chapter 1 together', 'Show you can get from "I don\'t get it" to "I can do it"'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8am',
      beats: [
        { speaker: 'narrator', text: 'Monday. Kofi\'s phone is in his bag, switched off. No AI in the exam room. Only what he actually learned.' },
        { speaker: 'asante', text: 'Five questions. And one extra at the end, on limiting reagents, because some of you think I forgot about it.' },
        { speaker: 'narrator', text: 'Kofi turns the page. Moles from mass. Molar mass of CO₂: count every atom. And the extra question... a recipe in disguise.' },
        { speaker: 'tey', text: "Three weeks ago, he typed four words and got a wall of text. Let's see what you would do in his seat." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: test day.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Test question 1. C = 12, O = 16. What is the molar mass of CO₂ in g/mol?',
        answers: ['44', '44g/mol', '44 g/mol'],
        placeholder: 'Number',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Test question 2. How many moles are in 132 g of CO₂?',
        answers: ['3', 'three', '3 mol', '3 moles'],
        placeholder: 'Number',
        explanation: '132 ÷ 44 = 3.',
      },
      {
        kind: 'mcq',
        prompt: 'Looking back: which change made the biggest difference to Kofi\'s first AI answer?',
        options: [
          { text: 'Telling it his level and where he was stuck' },
          { text: 'Switching to a different AI', why: 'The same question gets the same guess anywhere.' },
          { text: 'Asking for more detail', why: 'More detail made it worse.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The extra question. A reaction needs 1 unit of A for every 2 units of B. You have 4 units of A and 6 units of B. How many times can the reaction happen?',
        answers: ['3', 'three'],
        placeholder: 'Number',
        explanation: 'B runs out first: 6 ÷ 2 = 3. B is the limiting reagent.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'After the test, Kofi starts the next topic: rates of reaction (red on his syllabus). Which first prompt is best?',
        options: [
          { text: 'Rates of reaction, detailed, like a textbook, with questions and answers.', why: 'Four mistakes in one line.' },
          {
            text: "Final year. I know moles and particles. Syllabus line: 'explain the effect of temperature on rate'. Explain it simply with one everyday example, then stop.",
          },
          { text: 'Will rates of reaction be on my exam?', why: "The AI can't know." },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which prompt from the five fits this moment?',
        groups: ['Explain it', 'Quiz me', 'Find my gaps'],
        items: [
          { text: 'A brand new, red topic', group: 0 },
          { text: 'Instead of rereading before bed', group: 1 },
          { text: 'Finished a topic, checking against the syllabus', group: 2 },
          { text: 'On the trotro with a photo of notes', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: 'You got 6 out of 6?! Kofi. How. You were failing moles three weeks ago.',
        prompt: "What's the most honest reply?",
        options: [
          { text: 'AI did it for me.', why: 'It did not. Kofi did the test alone. AI helped him learn.' },
          { text: "I'm just a genius.", why: 'Funny, but not the real reason.' },
          { text: 'I used AI to explain it at my level, then made it quiz me every day. And your jollof explanation saved me.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: "Spot the weak line in Clinton's plan for his Physics test.",
        lines: [
          'Colour the syllabus: red, amber, green.',
          'Reds first, with "Explain it" and "Show me, now me".',
          'Night before: reread all my notes for 4 hours.',
          'Quiz on ambers, one question at a time.',
        ],
        bug: 2,
        fix: 'Short quizzes spread over the week instead.',
        explanation: 'Rereading plus cramming: two weak habits in one line.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the move that fixes it.',
        pairs: [
          ['A wall of text', 'Tell it your level'],
          ['A method you used wrong in class', 'Textbook first, same method'],
          ["An explanation that doesn't click", 'Change the angle'],
          ['A formula you keep forgetting', 'Ask why it works'],
          ["Notes you're about to reread", 'Turn them into questions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI says the answer to a homework question is 2.5 moles. Kofi\'s working says 25. What should he do?',
        options: [
          { text: 'Copy 2.5', why: "He still wouldn't know which is right, or why." },
          { text: 'Compare his working with the AI\'s step by step, and check against his textbook' },
          { text: 'Trust his own answer, AI is useless', why: 'Either could be wrong. Check the steps.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter in one sentence.',
        template: 'Tell it your [[1]], ask [[2]], test yourself, and always [[3]] first.',
        blanks: [['level'], ['why'], ['think']],
        distractors: ['age', 'copy', 'cheat'],
      },
      {
        kind: 'orderLines',
        prompt: "Put Kofi's whole three-week journey in order.",
        lines: [
          'Four words, a wall of text',
          'Tells it his level and uses the recipe',
          'Asks why, uses his textbook, learns by example',
          'Colours his syllabus and quizzes his reds',
          'Takes the test with no AI, and passes',
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Think first or AI first?',
        groups: ['Think first', 'AI first'],
        items: [
          { text: 'Write a guess, then ask why', group: 0 },
          { text: 'Paste homework in before reading it', group: 1 },
          { text: 'Try the question, then ask for a check', group: 0 },
          { text: 'Ask for answers, then call it revision', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the quick test from Miracle\'s story.',
        tiles: ['Could', 'I', 'do', 'this', 'without', 'the', 'AI?'],
        distractors: ['faster', 'copy'],
      },
    ],
  },
  reflect: {
    prompt: 'Chapter 1 done. What is one thing you will do differently the next time you study with AI?',
    starters: ['Before this chapter I...', 'Now I will...'],
  },
  deepen: {
    title: 'Next: Chapter 2',
    summary: 'Kofi passed moles. Next comes stoichiometry, the topic that wouldn\'t click, and the day he has to explain it in front of the class.',
  },
  notes: 'CO2 = 44 g/mol; 132 ÷ 44 = 3. A:B 1:2, A=4, B=6 → B limits: 3. "6 out of 6" = five questions plus the extra one.',
};

export default lesson;

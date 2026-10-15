import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17 — the five saved prompts for every study session (card deck). */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Five prompts for every study session',
  summary: "Kofi's phone notes hold five prompts. Between them they cover almost every study session he'll have this year.",
  minutes: 12,
  outcomes: [
    'Save five prompts you can reuse in any subject',
    'Pick the right prompt for what you need right now',
    'Fill in the blanks fast',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p><strong>Prompt 1: Explain it</strong></p><p><em>\"I'm in [my stage] and I know [what I know]. Topic: [syllabus line]. Explain it simply, with one everyday example. Stop after the first idea.\"</em></p><p>Use it when something is new or red on your syllabus.</p>",
    },
    {
      kind: 'text',
      html: "<p><strong>Prompt 2: Check my why</strong></p><p><em>\"Why does [idea] work? My guess: [my guess]. Is it right? What did I miss?\"</em></p><p>Use it after any explanation, so you understand it instead of memorising it.</p>",
    },
    {
      kind: 'text',
      html: "<p><strong>Prompt 3: Show me, now me</strong></p><p><em>\"Give me one worked example of [method], one line per step. Then give me a similar question with different numbers, and hide the answer until I try.\"</em></p><p>Use it for any method: calculations, essay plans, grammar rules.</p>",
    },
    {
      kind: 'text',
      html: "<p><strong>Prompt 4: Quiz me</strong></p><p><em>\"Quiz me on [topic], [my level]. One question at a time, wait for my answer. If I'm wrong, explain why. Two right in a row, make it harder.\"</em></p><p>Use it in every session, especially instead of rereading.</p>",
    },
    {
      kind: 'text',
      html: "<p><strong>Prompt 5: Find my gaps</strong></p><p><em>\"Here's everything I can remember about [topic]: [my notes from memory]. Compared with this syllabus line: [line], what have I missed or got wrong?\"</em></p><p>Use it at the end of a topic, to find out what to colour amber or red.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Save all five in your phone notes with the blanks in square brackets. Fill the blanks, paste, done.',
    },
    {
      kind: 'check',
      question: 'Kofi finished a topic and wants to know what he has missed. Which prompt?',
      options: ['Explain it', 'Find my gaps', 'Show me, now me'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi picks the right prompt for the moment.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the prompt.',
        pairs: [
          ['A new, red topic', 'Explain it'],
          ['You got an explanation but not the reason', 'Check my why'],
          ['You need to learn a method', 'Show me, now me'],
          ['Instead of rereading', 'Quiz me'],
          ['At the end of a topic', 'Find my gaps'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fill the blanks in the Quiz me prompt.',
        template: 'Quiz me on [[1]], final-year level. One question at a [[2]], wait for my [[3]].',
        blanks: [['moles', 'molar mass', 'limiting reagents'], ['time'], ['answer']],
        distractors: ['week', 'friend'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which prompt is this part of?',
        groups: ['Explain it', 'Quiz me', 'Find my gaps'],
        items: [
          { text: 'Stop after the first idea', group: 0 },
          { text: 'Two right in a row, make it harder', group: 1 },
          { text: "Here's everything I can remember", group: 2 },
          { text: 'With one everyday example', group: 0 },
          { text: 'What have I missed or got wrong?', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Can you send me your five prompts? I keep forgetting how to word things.',
        prompt: 'What should Kofi send?',
        options: [
          { text: 'The five prompts with blanks in square brackets, so David can fill in his own topics' },
          { text: 'His own answers to the prompts', why: 'David needs the prompts, not Kofi\'s answers.' },
          { text: 'Just "ask the AI stuff"', why: 'Not much help.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why does Prompt 5 ask you to write what you remember BEFORE comparing?',
        options: [
          { text: 'Writing from memory is retrieval practice, and it shows your real gaps' },
          { text: 'The AI needs a long message', why: 'It does not. You need the practice.' },
          { text: 'To make your notes longer', why: 'The point is to test your memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which version of "Show me, now me" is broken?',
        lines: [
          'Give me one worked example, one line per step.',
          'Then a similar question with different numbers.',
          'Put its answer right under it.',
        ],
        bug: 2,
        fix: 'Hide the answer until I try.',
        explanation: 'A visible answer turns "now me" back into "show me".',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which prompt number is "Quiz me"? (number)',
        answers: ['4', 'four'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi needs to learn how to balance equations. Which prompt fits best?',
        options: [
          { text: 'Find my gaps', why: "He hasn't learned it yet, so there is nothing to compare." },
          { text: 'Show me, now me: one worked example, then a similar equation with the answer hidden' },
          { text: 'Quiz me', why: 'Quizzing comes after he has seen the method.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the end of Prompt 1.',
        tiles: ['Stop', 'after', 'the', 'first', 'idea'],
        distractors: ['every', 'chapter'],
      },
      {
        kind: 'orderLines',
        prompt: 'A typical study session for a new topic. Put the prompts in order.',
        lines: ['Explain it', 'Check my why', 'Quiz me', 'Find my gaps'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five prompts will you use most? Write it out with the blanks filled in for a real topic.',
    starters: ['The prompt I will use most is...', 'Filled in:'],
  },
  deepen: {
    title: 'Save them now',
    summary: 'Copy all five prompts into your phone notes with the blanks in square brackets. Share them with a study friend.',
  },
  notes: 'Consolidates lessons 1–16. No new claims.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 17. Learning to code with AI, honestly: use it to explain errors and ideas, not to write your answers; AI code still gets checked. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Learning to code with AI, honestly',
  summary: 'Jayden says: "Just get AI to write the whole thing, Mum." It\'s tempting. Here is how to use AI so it makes you better, not dependent.',
  minutes: 12,
  outcomes: ['Use AI to explain an error or an idea', 'Spot when AI help would stop you learning', 'Check AI-written code like any other code'],
  learn: [
    {
      kind: 'story',
      title: 'The shortcut',
      beats: [
        { speaker: 'narrator', text: 'Tuesday night. Grace is stuck on a red line. Jayden leans over her shoulder.' },
        { speaker: 'jayden', text: 'Why are you even doing this by hand? Ask an AI to write the whole booker. Done in a minute.' },
        { speaker: 'grace', text: 'And then what? Kinwell\'s patients rely on it, and I wouldn\'t understand a single line.' },
        { speaker: 'narrator', text: 'She thinks of the ward. Nobody gives a drug they can\'t explain.' },
        { speaker: 'tey', text: 'AI is a brilliant tutor and a terrible replacement. Ask it to explain, not to do it for you, and always check what it gives you. Even AI code gets red lines.' },
      ],
      choice: {
        prompt: 'Grace is stuck on a type error. What should she ask the AI?',
        options: [
          {
            text: '"Explain this error message in simple words. Don\'t fix it for me."',
            outcome: 'The AI explains that text was given where a number goes. Grace fixes it herself, and understands it next time.',
            best: true,
          },
          {
            text: '"Write me a complete booking app in TypeScript."',
            outcome: 'She gets 300 lines she can\'t read, with two type errors she can\'t fix. She learned nothing, and Kinwell can\'t trust it.',
          },
          {
            text: '"Fix my code." Then paste the answer without reading it.',
            outcome: 'It works this time. Next time, the same error stops her again, because she never found out why.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'AI code gets checked too',
      caption: 'Pretend an AI suggested this. Run it: TypeScript still catches the AI\'s mistake.',
      code: '// Suggested by an AI\nlet sessionTime: number = "10:00";\nconsole.log("Session at " + sessionTime);\n',
      challenge: 'The label is the problem: a time like 10:00 is text. Change number to string and run it again.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'Using AI the honest way.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Helps you learn, or does the learning for you?',
        groups: ['Helps you learn', 'Does it for you'],
        items: [
          { text: '"Explain this error in simple words"', group: 0 },
          { text: '"Write the whole exercise for me"', group: 1 },
          { text: '"What does : number mean?"', group: 0 },
          { text: '"Give me the answer, no explanation"', group: 1 },
          { text: '"Why is my output 4515 instead of 60?"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'An AI gives you code. What should you do before using it?',
        options: [
          { text: 'Read it, run it, and make sure you can explain every line' },
          { text: 'Paste it straight in: AI is always right', why: 'AI makes mistakes, including type errors. Reading and running it catches them.' },
          { text: 'Delete the comments', why: 'Comments are helpful. What matters is understanding and checking the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the AI\'s suggestion: a time is text, so give the label that fits. Show Session at 10:00 with no type errors.',
        starter: '// Suggested by an AI\nlet sessionTime: number = "10:00";\nconsole.log("Session at " + sessionTime);\n',
        solution: '// Suggested by an AI\nlet sessionTime: string = "10:00";\nconsole.log("Session at " + sessionTime);\n',
        hint: '"10:00" has a colon, so it\'s text. Change : number to : string.',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show Session at 10:00', outputIncludes: 'Session at 10:00' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'jayden',
        message: 'Seriously, why not let AI write it? It\'s faster.',
        options: [
          { text: 'You\'re right, I\'ll never type code again.', why: 'Then Grace couldn\'t fix it, change it, or trust it. Understanding is the point.' },
          { text: 'Because I need to understand and check every line. AI can explain things to me, but I\'m the one Kinwell trusts.' },
          { text: 'AI is cheating and nobody should use it.', why: 'AI is a useful tutor. The problem is only using it to skip the learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'An AI wrote this. Will TypeScript accept it?',
        code: 'let rooms: number = "three";\nconsole.log(rooms);',
        language: 'typescript',
        options: [
          { text: 'Yes: AI code is always correct', why: 'TypeScript checks AI code exactly like yours, and this has a type error.' },
          { text: 'Yes: it shows three', why: 'It may run, but TypeScript reports the type error first.' },
          { text: 'No: Type \'string\' is not assignable to type \'number\'' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the honest way to use AI for an error in order.',
        lines: ['Read the error yourself first', 'Ask AI to explain it in simple words', 'Fix it yourself', 'Run it again to check'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each AI request to what you learn from it.',
        pairs: [
          ['"Explain this error"', 'Why it happened, for next time'],
          ['"Write it all for me"', 'Nothing about how it works'],
          ['"Give me a hint, not the answer"', 'How to solve it yourself'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Fix the label the AI got wrong.',
        language: 'typescript',
        template: 'let room: [[1]] = "Room 2";',
        blanks: [['string']],
        distractors: ['number', 'room'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Finish the rule: use AI to ... errors, not to write your answers (one word).',
        answers: ['explain', 'understand'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'An AI wrote one line with two mistakes. Fix both so it shows Room 2 is free with no errors.',
        starter: 'Console.log("Room 2 is free);\n',
        solution: 'console.log("Room 2 is free");\n',
        hint: 'console is all lowercase, and the text needs its closing quote.',
        checks: [
          { message: 'No errors', noTypeErrors: true },
          { message: 'Show Room 2 is free', outputIncludes: 'Room 2 is free' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'How do you want to use AI while you learn to code? Write one rule for yourself.',
    starters: ['My rule is...', 'I\'ll use AI to... but not to...'],
  },
  deepen: {
    title: 'Go further',
    summary: 'Teyro\'s Study Smarter with AI course goes deeper on learning with AI without letting it do the thinking for you.',
  },
  notes: 'Links to Study Smarter with AI (responsible AI use). Console.log("x); fails first as a syntax error (unterminated string); after the quote fix, TS2693 for Console. Both must be fixed for noTypeErrors.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4: console.log, strings, maths, let/const, template literals. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the price board',
  summary: 'Friday, 3:45 p.m. Mags wants tomorrow\'s prices on the website before the Saturday crowd. Rafa wants to see Nora do it without notes.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Store prices in variables and print them', 'Build price messages with template literals'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:45 p.m.',
      beats: [
        { speaker: 'mags', text: 'Saturday\'s the big one. If the website says the prices, maybe the phone gets a rest.' },
        { speaker: 'nora', text: 'Every price in a variable. Every message built from them. Change one number, the whole board follows.' },
        { speaker: 'rafa', text: 'Show me. No notes. If it\'s wrong, eight hundred people read it wrong.' },
        { speaker: 'nora', text: 'Come on, Old Blue. Help me out.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Nora builds tomorrow\'s price board while Rafa watches.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log("Lifts: " + 3);',
        language: 'javascript',
        options: [
          { text: 'Lifts: 3' },
          { text: 'Lifts: + 3', why: 'The + is outside the quotes, so it joins the two parts.' },
          { text: 'An error', why: 'Joining text and a number works. You get text.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const adultPrice = 59, const kidPrice = 39 and const seniorPrice = 29. Print each one on its own line, in that order.',
        starter: '',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconst seniorPrice = 29;\nconsole.log(adultPrice);\nconsole.log(kidPrice);\nconsole.log(seniorPrice);\n',
        hint: 'Three const lines, then three console.log lines.',
        checks: [
          { message: 'Print 59, 39 and 29 on three lines', outputEquals: '59\n39\n29' },
          { message: 'adultPrice is 59', expr: 'adultPrice === 59' },
          { message: 'kidPrice is 39', expr: 'kidPrice === 39' },
          { message: 'seniorPrice is 29', expr: 'seniorPrice === 29' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(4 + 4 * 2);',
        language: 'javascript',
        options: [
          { text: '16', why: 'That adds first. * goes before +.' },
          { text: '12' },
          { text: '442', why: 'These are numbers, not text, so nothing gets glued.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Store the price and print a message with it.',
        template: '[[1]] adultPrice = 59;\nconsole.log(`Adults: $[[2]]adultPrice}`);',
        blanks: [['const', 'let'], ['${']],
        distractors: ['print', '{', '#{'],
        language: 'javascript',
      },
      {
        kind: 'findBug',
        prompt: 'Rafa points at the screen. Which line breaks the board?',
        lines: ['const kidPrice = 39;', 'console.log(`Kids: $${kidprice}`);', 'console.log("Under 6: free");'],
        bug: 1,
        fix: 'console.log(`Kids: $${kidPrice}`);',
        explanation: 'kidprice with a small p was never made. Names must match exactly, capitals included.',
        language: 'javascript',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['console.log()', 'Prints a line'],
          ['const', 'Makes a name that won\'t change'],
          ['let', 'Makes a name that can change'],
          ['`...${x}...`', 'Drops a value into text'],
          ['%', 'Gives the remainder'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'With the prices below, print exactly two lines:\nAdults: $59\nKids 6-12: $39\nUse template literals with the variables.',
        starter: 'const adultPrice = 59;\nconst kidPrice = 39;\n',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconsole.log(`Adults: $${adultPrice}`);\nconsole.log(`Kids 6-12: $${kidPrice}`);\n',
        hint: 'console.log(`Adults: $${adultPrice}`);',
        checks: [
          { message: 'Print the two lines exactly', outputEquals: 'Adults: $59\nKids 6-12: $39' },
          { message: 'Use ${adultPrice}', codeIncludes: '${adultPrice}' },
          { message: 'Use ${kidPrice}', codeIncludes: '${kidPrice}' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Text or number? Sort what each value is.',
        groups: ['String (text)', 'Number'],
        items: [
          { text: '"Old Blue"', group: 0 },
          { text: '59', group: 1 },
          { text: '"59"', group: 0 },
          { text: '14', group: 1 },
          { text: '`Trails: 14`', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: the cost of 3 seniors, worked out from seniorPrice.',
        tiles: ['console.log', '(', 'seniorPrice', '*', '3', ')', ';'],
        distractors: ['"seniorPrice"', 'x'],
        language: 'javascript',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the price board program in a working order.',
        lines: [
          'const adultPrice = 59;',
          'const kidPrice = 39;',
          'const family = adultPrice * 2 + kidPrice * 2;',
          'console.log(`Family of four: $${family}`);',
        ],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does console.log("Silver Pine".length) print?',
        answers: ['11'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'Tomorrow, a family of 2 adults and 3 kids. Make const adultPrice = 59 and const kidPrice = 39, store the total in a const called total, and print exactly: Total: $235',
        starter: 'const adultPrice = 59;\nconst kidPrice = 39;\n',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconst total = adultPrice * 2 + kidPrice * 3;\nconsole.log(`Total: $${total}`);\n',
        hint: 'const total = adultPrice * 2 + kidPrice * 3;',
        checks: [
          { message: 'Print Total: $235', outputEquals: 'Total: $235' },
          { message: 'Store it in total', expr: 'total === 235' },
          { message: 'Work it out from the prices', codeIncludes: 'kidPrice * 3' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Five lessons ago, you had never written JavaScript. Which part felt hardest, and which clicked fastest?',
    starters: ['The hardest bit was...', 'It clicked when...'],
  },
  notes: 'Checkpoint for lessons 1–4. Family of 2 adults + 3 kids = 2 × 59 + 3 × 39 = 235. "Silver Pine".length === 11.',
};

export default lesson;

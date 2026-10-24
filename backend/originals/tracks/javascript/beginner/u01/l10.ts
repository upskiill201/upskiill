import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge. The whole chapter: the website answers "How much for a family of four?" */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the family-of-four total',
  summary: 'Saturday, 7:58 a.m. The most-asked question of the season is "How much for a family of four?" Nora has two minutes before the window opens to make the website answer it.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Write a full price program from variables to message',
    'Find and fix errors without help',
    'Keep the code readable for the next person',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 7:58 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Cars are parked down to the county road. The phone has already rung nine times.' },
        { speaker: 'mags', text: '"How much for a family of four?" That\'s the question. Every single time.' },
        { speaker: 'nora', text: 'Then the website answers it. Prices in variables, the sum worked out, one clear sentence.' },
        { speaker: 'rafa', text: 'And when Mags changes a price at noon?' },
        { speaker: 'nora', text: 'One line. Everything else follows.' },
        { speaker: 'wes', text: 'what if the family is like 2 grandparents and a baby' },
        { speaker: 'nora', text: 'Then I\'m glad the baby\'s free.' },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge: two minutes to opening.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const adultPrice = 59;\nconst kidPrice = 39;\nconsole.log(adultPrice * 2 + kidPrice * 2);',
        language: 'javascript',
        options: [
          { text: '196' },
          { text: '5939', why: 'These are numbers, not strings, so nothing is glued.' },
          { text: '4798', why: 'The * parts are worked out first: 118 + 78.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make const adultPrice = 59 and const kidPrice = 39. Store 2 adults and 2 kids in const familyTotal. Print exactly: A family of four pays $196.',
        starter: '',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconst familyTotal = adultPrice * 2 + kidPrice * 2;\nconsole.log(`A family of four pays $${familyTotal}.`);\n',
        hint: 'const familyTotal = adultPrice * 2 + kidPrice * 2;\nconsole.log(`A family of four pays $${familyTotal}.`);',
        checks: [
          { message: 'Print the sentence exactly', outputEquals: 'A family of four pays $196.' },
          { message: 'familyTotal is 196', expr: 'familyTotal === 196' },
          { message: 'Work it out from adultPrice and kidPrice', codeIncludes: 'kidPrice * 2' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This prints "A family of four pays $11878". Which line is wrong?',
        lines: [
          'const adults = "118";',
          'const kids = 78;',
          'console.log(`A family of four pays $${adults + kids}`);',
        ],
        bug: 0,
        fix: 'const adults = 118;',
        explanation: '"118" is a string, so + glues 78 onto it. Store numbers without quotes.',
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'Sort each line by what happens when it runs.',
        groups: ['Runs fine', 'ReferenceError', 'SyntaxError'],
        items: [
          { text: 'console.log(`Kids: $${kidPrice}`);  // kidPrice exists', group: 0 },
          { text: 'console.log(familytotal);  // made as familyTotal', group: 1 },
          { text: 'console.log("Adults: $59);', group: 2 },
          { text: 'console.log(59 * 2);', group: 0 },
          { text: 'console.log(59 * 2;', group: 2 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the senior line.',
        template: '[[1]] seniorPrice = 29;\nconsole.log([[2]]Seniors 70+: $${seniorPrice}[[3]]);',
        blanks: [['const'], ['`'], ['`']],
        distractors: ['let seniorPrice', '"', 'var'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Wes\'s family: 2 grandparents (seniors, $29 each) and a baby (under 6, free). Make const seniorPrice = 29, store the total in const total, and print exactly: Total: $58',
        starter: '',
        solution: 'const seniorPrice = 29;\nconst total = seniorPrice * 2;\nconsole.log(`Total: $${total}`);\n',
        hint: 'The baby is $0, so the total is just seniorPrice * 2.',
        checks: [
          { message: 'Print Total: $58', outputEquals: 'Total: $58' },
          { message: 'total is 58', expr: 'total === 58' },
          { message: 'Use seniorPrice', codeIncludes: 'seniorPrice *' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool to the lesson it came from.',
        pairs: [
          ['console.log', 'Printing a line'],
          ['* and /', 'Doing maths'],
          ['let', 'A value that changes'],
          ['${ }', 'Filling in a sentence'],
          ['Number()', 'Turning text into a number'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let sold = 0;\nsold += 4;\nsold++;\nconsole.log(`Tickets sold: ${sold}`);',
        language: 'javascript',
        options: [
          { text: 'Tickets sold: 4', why: 'sold++ adds one more.' },
          { text: 'Tickets sold: 5' },
          { text: 'Tickets sold: ${sold}', why: 'It\'s a template literal (backticks), so the slot gets filled.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Count the morning: make let sold = 0. A family buys 4 tickets (+= 4), then a couple buys 2 (+= 2), then one rider buys 1 (++). Print exactly: Tickets sold: 7',
        starter: 'let sold = 0;\n',
        solution: 'let sold = 0;\nsold += 4;\nsold += 2;\nsold++;\nconsole.log(`Tickets sold: ${sold}`);\n',
        hint: 'sold += 4;\nsold += 2;\nsold++;',
        checks: [
          { message: 'Print Tickets sold: 7', outputEquals: 'Tickets sold: 7' },
          { message: 'sold ends at 7', expr: 'sold === 7' },
          { message: 'Use ++ for the one rider', codeIncludes: '++' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that turns the typed "4" into a number and stores it.',
        tiles: ['const', 'people', '=', 'Number(', 'typed', ')', ';'],
        distractors: ['"typed"', 'let people'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Noon: Mags drops the adult price to $55 for the afternoon. Fix the program by changing ONE line, so it prints: A family of four pays $188.',
        starter: 'const adultPrice = 59;\nconst kidPrice = 39;\nconst familyTotal = adultPrice * 2 + kidPrice * 2;\nconsole.log(`A family of four pays $${familyTotal}.`);\n',
        solution: 'const adultPrice = 55;\nconst kidPrice = 39;\nconst familyTotal = adultPrice * 2 + kidPrice * 2;\nconsole.log(`A family of four pays $${familyTotal}.`);\n',
        hint: 'Only the first line needs to change.',
        checks: [
          { message: 'Print the new total', outputEquals: 'A family of four pays $188.' },
          { message: 'adultPrice is 55', expr: 'adultPrice === 55' },
          { message: 'Keep working it out from the prices', codeIncludes: 'adultPrice * 2' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the website\'s answer program in a working order.',
        lines: [
          '// Saturday prices, in dollars',
          'const adultPrice = 59;',
          'const kidPrice = 39;',
          'const familyTotal = adultPrice * 2 + kidPrice * 2;',
          'console.log(`A family of four pays $${familyTotal}.`);',
        ],
        language: 'javascript',
      },
      {
        kind: 'chatReply',
        prompt: 'The phone rings at 8:01. Pick Mags\'s best answer.',
        from: 'mags',
        message: 'Nora, a man on the phone says "how much for a family of four?" What do I tell him?',
        options: [
          { text: 'Tell him to check the website. It says $196 and it\'s always up to date' },
          { text: 'Tell him $5959', why: 'That was Thursday\'s bug. It\'s fixed.' },
          { text: 'Tell him it depends on JavaScript', why: 'True, but he just wants a number.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'You wrote a program that answers a real question. What question from your own life or work could a ten-line program answer?',
    starters: ['People always ask me...', 'A program could tell them...'],
  },
  deepen: {
    title: 'Where this code will live',
    summary: 'Right now the answer prints in the console. In Level 2, Nora puts it on the actual web page with document.querySelector, so visitors see it without opening anything. The variables and the sum stay exactly the same.',
  },
  notes: 'Unit Challenge covering u01. 2 × 59 + 2 × 39 = 196; with adult at 55: 110 + 78 = 188. 2 seniors at 29 = 58; under 6 free.',
};

export default lesson;

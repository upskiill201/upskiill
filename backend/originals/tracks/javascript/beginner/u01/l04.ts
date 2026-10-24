import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Before/After: template literals, .length, toUpperCase(). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Text that fills itself in',
  summary: 'Nora\'s price messages are a mess of quotes and plus signs. Backticks let the numbers drop straight into the sentence.',
  minutes: 10,
  outcomes: [
    'Build a sentence with a template literal',
    'Put a variable or a sum inside ${ }',
    'Use .length and .toUpperCase() on a string',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The price message',
      before: {
        label: 'Gluing with +',
        text: '"Adults: $" + adultPrice + ", kids: $" + kidPrice + "."\n\nEvery space and every quote has to be in the right place. Miss one and the sentence reads "Adults: $59,kids: $39".',
      },
      after: {
        label: 'A template literal',
        text: '`Adults: $${adultPrice}, kids: $${kidPrice}.`\n\nOne string, written as you\'d say it. The values go where the ${ } is.',
      },
      notes: [
        'A template literal uses backticks ` instead of quotes. On most phone keyboards, it\'s behind the \' key or in the symbols page.',
        '${ } can hold a variable or a whole sum: ${adultPrice * 2}.',
        'The $ just before ${ is a normal dollar sign that gets printed. The ${ starts the slot.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fill in the blanks',
      code: 'const adultPrice = 59;\nconst kidPrice = 39;\n\nconsole.log(`Adults: $${adultPrice}, kids: $${kidPrice}.`);\nconsole.log(`A family of four pays $${adultPrice * 2 + kidPrice * 2}.`);\n',
      caption: 'Each ${ } is worked out, then dropped into the sentence.',
      challenge: 'Add a line: `Seniors (70+): $29.` using a seniorPrice variable.',
    },
    {
      kind: 'text',
      html: '<p>Strings also come with handy tools, used with a dot:</p><ul><li><code>"Old Blue".length</code> is <b>8</b>, the number of characters (the space counts).</li><li><code>"Old Blue".toUpperCase()</code> is <b>OLD BLUE</b>.</li></ul>',
    },
  ],
  apply: {
    scenario: 'Nora rewrites the price board messages.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const lift = "Old Blue";\nconsole.log(`${lift} is open`);',
        language: 'javascript',
        options: [
          { text: '${lift} is open', why: 'Inside backticks, ${lift} is replaced by its value.' },
          { text: 'Old Blue is open' },
          { text: 'lift is open', why: 'It\'s the value of lift that goes in, not its name.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Finish the template literal.',
        template: 'console.log([[1]]Trails open: [[2]]openTrails}[[3]]);',
        blanks: [['`'], ['${'], ['`']],
        distractors: ['"', '{', '$('],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'With const lift = "Old Blue"; print exactly: Old Blue opens at 9 a.m. Use a template literal.',
        starter: 'const lift = "Old Blue";\n',
        solution: 'const lift = "Old Blue";\nconsole.log(`${lift} opens at 9 a.m.`);\n',
        hint: 'console.log(`${lift} opens at 9 a.m.`);',
        checks: [
          { message: 'Print Old Blue opens at 9 a.m.', outputEquals: 'Old Blue opens at 9 a.m.' },
          { message: 'Use ${lift} in a template literal', codeIncludes: '${lift}' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log("Old Blue".length);',
        language: 'javascript',
        options: [
          { text: '7', why: 'The space counts as a character too.' },
          { text: '2', why: '.length counts characters, not words.' },
          { text: '8' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'This prints the ${ } as plain text. Which line is wrong?',
        lines: ['const kidPrice = 39;', 'console.log("Kids: $${kidPrice}");'],
        bug: 1,
        fix: 'console.log(`Kids: $${kidPrice}`);',
        explanation: '${ } only works inside backticks. In normal quotes it is printed as it is.',
        language: 'javascript',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the shout for the radio: print the lift name in capitals.',
        tiles: ['console.log', '(', 'lift', '.toUpperCase()', ')', ';'],
        distractors: ['.upper', '"lift"'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const adultPrice = 59 and const kidPrice = 39. Print exactly: Family of four: $196 by working the sum out inside ${ }.',
        starter: 'const adultPrice = 59;\nconst kidPrice = 39;\n',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconsole.log(`Family of four: $${adultPrice * 2 + kidPrice * 2}`);\n',
        hint: 'console.log(`Family of four: $${adultPrice * 2 + kidPrice * 2}`);',
        checks: [
          { message: 'Print Family of four: $196', outputEquals: 'Family of four: $196' },
          { message: 'Work it out from adultPrice and kidPrice', codeIncludes: 'adultPrice * 2' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to what it gives.',
        pairs: [
          ['"Mags".length', '4'],
          ['"mags".toUpperCase()', 'MAGS'],
          ['`${2 + 2} chairs`', '4 chairs'],
          ['"2" + "2"', '22'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name for strings written with backticks that can hold ${ } slots? (two words)',
        answers: ['template literal', 'template literals', 'template string', 'template strings'],
        placeholder: 'Two words',
      },
      {
        kind: 'mcq',
        prompt: 'Nora wants to show "$59". Which line prints it?',
        options: [
          { text: 'console.log(`$${adultPrice}`);' },
          { text: 'console.log(`${$adultPrice}`);', why: 'That looks for a variable called $adultPrice, which doesn\'t exist.' },
          { text: 'console.log("$${adultPrice}");', why: 'Normal quotes print the ${ } as it is.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What message do you send often with only one detail changing (a name, a date, an amount)? Write it as a template literal in your head.',
    starters: ['Hi ${name}, your...', 'I always send...'],
  },
  deepen: {
    title: 'More string tools',
    summary: 'Strings have dozens of tools: .toLowerCase(), .trim() (cuts spaces off the ends), .includes("Blue") (true or false) and .replace("Blue", "Red"). MDN lists them all under "String". You\'ll use .trim() and .toLowerCase() a lot when checking what people type.',
  },
  notes: 'Template literals: MDN "Template literals". String length counts UTF-16 code units (MDN, String.length); "Old Blue".length === 8. toUpperCase: MDN.',
};

export default lesson;

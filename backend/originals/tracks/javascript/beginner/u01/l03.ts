import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Chat with Tey: variables, let and const. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Boxes with names',
  summary: 'Nora has typed 59 eleven times. Then Mags asks what happens when the price changes. Time to give values a name.',
  minutes: 10,
  outcomes: [
    'Store a value in a variable with const',
    'Use let for values that will change',
    'Use a variable\'s name instead of its value',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Nora\'s code has 59 written in eleven places. Next season the adult ticket goes up to $62. What does she have to do?',
          replies: ['Change all eleven', 'Hope she finds them all'],
        },
        {
          tey: 'Exactly, and she\'ll miss one. So give the number a name, once: const adultPrice = 59; Now the code says adultPrice everywhere, and there\'s one place to change it.',
          replies: ['So a variable is a named box?', 'Why const?'],
        },
        {
          tey: 'A variable is a name stuck on a value. const means "this name always points at this value". Prices for today don\'t change while the program runs, so const fits.',
          replies: ['What if it does change?'],
        },
        {
          tey: 'Then use let. let riders = 0; can become 1, 2, 3 as people get on Old Blue. Rule of thumb: start with const. Switch to let only when the value really changes.',
          replies: ['Got it'],
        },
      ],
    },
    {
      kind: 'code',
      language: 'javascript',
      code: 'const adultPrice = 59;\nconst kidPrice = 39;\nlet riders = 0;\n\nconsole.log(adultPrice * 2 + kidPrice * 2); // 196',
      caption: 'Make the variable once, with const or let. After that, just use its name.',
    },
    {
      kind: 'tryIt',
      title: 'Name the prices',
      code: 'const adultPrice = 59;\nconst kidPrice = 39;\n\nconsole.log(adultPrice);\nconsole.log(adultPrice * 2 + kidPrice * 2);\n',
      caption: 'The name stands in for the value everywhere it appears.',
      challenge: 'Change adultPrice to 62 and run it. Both lines update.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'No quotes around a variable\'s name. console.log(adultPrice) prints 59. console.log("adultPrice") prints the word adultPrice.',
    },
  ],
  apply: {
    scenario: 'Nora names every price at the window.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const kidPrice = 39;\nconsole.log(kidPrice);',
        language: 'javascript',
        options: [
          { text: '39' },
          { text: 'kidPrice', why: 'No quotes, so JavaScript looks up the value stored under that name.' },
          { text: 'const kidPrice', why: 'const just makes the variable. It isn\'t printed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Store the senior price, which won\'t change today.',
        template: '[[1]] seniorPrice = [[2]];',
        blanks: [['const'], ['29']],
        distractors: ['"29"', 'var', 'make'],
        language: 'javascript',
      },
      {
        kind: 'sortGroups',
        prompt: 'const or let? Sort each value by how you\'d store it.',
        groups: ['const (stays the same)', 'let (changes)'],
        items: [
          { text: 'Today\'s adult price', group: 0 },
          { text: 'Riders on Old Blue so far', group: 1 },
          { text: 'The hill\'s name', group: 0 },
          { text: 'Minutes waited in the lift line', group: 1 },
          { text: 'The year Silver Pine opened', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a const called adultPrice set to 59, then print it.',
        starter: '',
        solution: 'const adultPrice = 59;\nconsole.log(adultPrice);\n',
        hint: 'const adultPrice = 59;\nconsole.log(adultPrice);',
        checks: [
          { message: 'Print 59', outputEquals: '59' },
          { message: 'Make adultPrice with const', codeIncludes: 'const adultPrice' },
          { message: 'adultPrice holds 59', expr: 'adultPrice === 59' },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'const kidPrice = 39;\nconsole.log("kidPrice");',
        language: 'javascript',
        options: [
          { text: '39', why: 'The quotes turn it into text. It prints the word, not the value.' },
          { text: 'kidPrice' },
          { text: 'An error', why: 'Printing a string is always fine.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line stops the program?',
        lines: ['const adultPrice = 59;', 'console.log(adultprice);'],
        bug: 1,
        fix: 'console.log(adultPrice);',
        explanation: 'JavaScript cares about capital letters. adultprice and adultPrice are two different names, and adultprice was never made.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'Make const adultPrice = 59 and const kidPrice = 39. Print the total for 2 adults and 2 kids using the names, not the numbers.',
        starter: 'const adultPrice = 59;\nconst kidPrice = 39;\n',
        solution: 'const adultPrice = 59;\nconst kidPrice = 39;\nconsole.log(adultPrice * 2 + kidPrice * 2);\n',
        hint: 'console.log(adultPrice * 2 + kidPrice * 2);',
        checks: [
          { message: 'Print 196', outputEquals: '196' },
          { message: 'Use adultPrice in the sum', codeIncludes: 'adultPrice *' },
          { message: 'Use kidPrice in the sum', codeIncludes: 'kidPrice *' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which word should you start with for a new variable, and only change when the value really changes?',
        answers: ['const'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Mags doesn\'t see the point. Pick Nora\'s reply.',
        from: 'mags',
        message: 'Why does it matter if 59 is written once or eleven times? It\'s the same number!',
        options: [
          { text: 'It doesn\'t, really', why: 'It does the day the price changes.' },
          { text: 'When the price changes, I change one line, not hunt for eleven' },
          { text: 'Because JavaScript only lets you type a number once', why: 'You can type 59 as often as you like. It\'s just harder to keep right.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Make the price, then use it. Put the lines in a working order.',
        lines: ['const seniorPrice = 29;', 'const total = seniorPrice * 2;', 'console.log(total);'],
        language: 'javascript',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a number you use a lot: your rent, your hourly rate, a bus fare. What name would you give it in code?',
    starters: ['I\'d call it...', 'It would be a const because...'],
  },
  deepen: {
    title: 'What about var?',
    summary: 'Older code uses var to make variables. It still works, but it has odd rules about where the name can be seen. Modern JavaScript uses const and let, and so does every lesson here. When you see var in a tutorial, read it as let.',
  },
  notes: 'let and const: MDN "let", "const". Names are case-sensitive (MDN, Lexical grammar). var vs let scoping: MDN "var".',
};

export default lesson;

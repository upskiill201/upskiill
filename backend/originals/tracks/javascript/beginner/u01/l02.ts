import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Walkthrough: numbers, + - * /, order of operations, %. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Numbers that do maths',
  summary: 'A family of four is at the window and the calculator is out of batteries. JavaScript does sums without quotes.',
  minutes: 10,
  outcomes: [
    'Do maths with + - * and /',
    'Know which part of a sum runs first',
    'Use % to find what is left over',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'The ticket window, 10:15 a.m.',
      steps: [
        {
          title: 'Numbers have no quotes',
          body: 'A number is written as it is: 59, not "59". Put it in console.log and JavaScript prints it.',
          code: 'console.log(59);\nconsole.log(39);',
          language: 'javascript',
        },
        {
          title: 'Add and subtract',
          body: 'Two adult tickets, then take off a $10 voucher. JavaScript works the answer out before printing it.',
          code: 'console.log(59 + 59);      // 118\nconsole.log(118 - 10);     // 108',
          language: 'javascript',
        },
        {
          title: 'Multiply and divide',
          body: 'The star * multiplies. The slash / divides. Four adults is 59 * 4. A $196 bill split between two parents is 196 / 2.',
          code: 'console.log(59 * 4);       // 236\nconsole.log(196 / 2);      // 98',
          language: 'javascript',
        },
        {
          title: 'Which part goes first',
          body: 'Like school maths: * and / happen before + and -. Brackets go first of all.',
          code: 'console.log(2 + 3 * 10);   // 32, not 50\nconsole.log((2 + 3) * 10); // 50',
          language: 'javascript',
        },
        {
          title: 'What is left over: %',
          body: 'The % sign gives the remainder after dividing. Old Blue seats 2 per chair. 7 people in line means one person rides alone.',
          code: 'console.log(7 % 2);        // 1',
          language: 'javascript',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The family at the window',
      code: '// Two adults ($59) and two kids ($39)\nconsole.log(59 * 2 + 39 * 2);\n',
      caption: 'Run it. JavaScript does the * parts first, then adds them.',
      challenge: 'A grandparent joins them (seniors are $29). Add + 29 and run it again.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The // part is a comment: a note for people. JavaScript skips everything after // on that line.',
    },
  ],
  apply: {
    scenario: 'The calculator is dead. Nora does the window maths in the console.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(59 + 39);',
        language: 'javascript',
        options: [
          { text: '5939', why: 'That would happen with text in quotes. These are numbers, so they add up.' },
          { text: '98' },
          { text: '59 + 39', why: 'Without quotes, JavaScript works the sum out instead of printing it as text.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each sign to what it does.',
        pairs: [
          ['+', 'Add'],
          ['-', 'Subtract'],
          ['*', 'Multiply'],
          ['/', 'Divide'],
          ['%', 'Remainder'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'console.log(10 + 2 * 5);',
        language: 'javascript',
        options: [
          { text: '60', why: 'That treats it as (10 + 2) * 5. The * happens first.' },
          { text: '17', why: 'Close, but 2 * 5 is 10, not 7.' },
          { text: '20' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the price of 3 adult tickets at $59 each. Let JavaScript do the maths.',
        starter: '',
        solution: 'console.log(59 * 3);\n',
        hint: 'console.log(59 * 3);',
        checks: [
          { message: 'Print 177', outputEquals: '177' },
          { message: 'Use * to multiply', codeIncludes: '*' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make it print 50: add first, then multiply.',
        template: 'console.log([[1]]2 + 3[[2]] * 10);',
        blanks: [['('], [')']],
        distractors: ['[', ']', '"'],
        language: 'javascript',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Old Blue seats 2 people per chair. What does console.log(9 % 2) print?',
        answers: ['1'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Nora wants the total for two kids, but gets the wrong number. Which line is wrong?',
        lines: ['console.log("Two kids:");', 'console.log("39" + "39");'],
        bug: 1,
        fix: 'console.log(39 + 39);',
        explanation: 'With quotes, 39 is text, and + glues text together: 3939. Drop the quotes to add numbers.',
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'A $196 family bill is split between 2 parents. Print what each one pays.',
        starter: 'console.log();\n',
        solution: 'console.log(196 / 2);\n',
        hint: 'Put 196 / 2 inside the brackets.',
        checks: [
          { message: 'Print 98', outputEquals: '98' },
          { message: 'Use / to divide', codeIncludes: '/' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints the cost of 2 adults and 1 kid.',
        tiles: ['console.log', '(', '59 * 2', '+', '39', ')', ';'],
        distractors: ['"59"', 'x'],
        language: 'javascript',
      },
      {
        kind: 'mcq',
        prompt: 'Why is it worth letting JavaScript do the sum, instead of typing 196?',
        options: [
          { text: 'It looks more impressive', why: 'It does, but that is not the point.' },
          { text: 'When a price changes, you change one number and the total stays right' },
          { text: 'JavaScript can\'t print numbers you type yourself', why: 'It can. console.log(196) works fine.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Where in your week do you do the same sum again and again? A bill, a timesheet, a recipe for more people?',
    starters: ['Every week I work out...', 'I always redo the maths when...'],
  },
  deepen: {
    title: 'When decimals look strange',
    summary: 'Try console.log(0.1 + 0.2). You get 0.30000000000000004. Computers store decimals in binary, so a few look slightly off. For money, many apps count in cents (whole numbers) and divide by 100 only when they show the price.',
  },
  notes: 'Arithmetic operators and precedence: MDN, "Operator precedence". % is the remainder operator (MDN). 0.1 + 0.2 = 0.30000000000000004 (IEEE 754 doubles). Prices from the outline: adult $59, kid $39, senior $29.',
};

export default lesson;

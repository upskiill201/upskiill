import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Myth or Fact: reassigning, +=, ++, and the const error. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Changing values',
  summary: 'Saturday. Nora counts riders onto Old Blue: one, two, two hundred. A number that keeps changing needs let, and a few shortcuts.',
  minutes: 10,
  outcomes: [
    'Give a let variable a new value',
    'Use += and ++ to add to a count',
    'Explain why changing a const stops the program',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Once a variable has a value, it can never change.',
          isFact: false,
          explain: 'A let variable can get a new value any time: riders = 5; No let in front the second time, because the variable already exists.',
        },
        {
          text: 'riders = riders + 1 adds one to riders.',
          isFact: true,
          explain: 'JavaScript works out the right side first (riders + 1), then stores the answer back in riders.',
        },
        {
          text: 'riders += 4 is a short way to write riders = riders + 4.',
          isFact: true,
          explain: 'Same for -=, *= and /=. And riders++ adds exactly one.',
        },
        {
          text: 'You can change a const later if you really need to.',
          isFact: false,
          explain: 'Giving a const a new value stops the program with "TypeError: Assignment to constant variable." That\'s the point of const: it protects values that shouldn\'t move.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count the chairs',
      code: 'let riders = 0;\n\nriders = riders + 2;   // first chair\nriders += 2;           // second chair\nriders++;              // one person rides alone\n\nconsole.log(`Riders so far: ${riders}`);\n',
      caption: 'Each line changes riders, top to bottom. Predict the number before you run it.',
      challenge: 'Add a line that takes off 1 (a rider got off at the mid station) with -=, then run it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'let only goes in front the first time. After that, just write the name: riders = 10;',
    },
  ],
  apply: {
    scenario: 'Nora keeps the Saturday count for Old Blue.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let riders = 10;\nriders = 12;\nconsole.log(riders);',
        language: 'javascript',
        options: [
          { text: '10', why: 'The second line gives riders a new value before it\'s printed.' },
          { text: '22', why: 'riders = 12 replaces the value. It doesn\'t add.' },
          { text: '12' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'let riders = 10;\nriders += 5;\nriders++;\nconsole.log(riders);',
        language: 'javascript',
        options: [
          { text: '16' },
          { text: '15', why: 'riders++ adds one more after the += 5.' },
          { text: '11', why: 'riders += 5 adds 5 first, then ++ adds 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to what it does to riders.',
        pairs: [
          ['riders++', 'Adds 1'],
          ['riders += 4', 'Adds 4'],
          ['riders -= 2', 'Takes off 2'],
          ['riders = 0', 'Starts again at 0'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make let riders = 0. Add 2 with +=, then 1 with ++. Print riders.',
        starter: 'let riders = 0;\n',
        solution: 'let riders = 0;\nriders += 2;\nriders++;\nconsole.log(riders);\n',
        hint: 'riders += 2;\nriders++;\nconsole.log(riders);',
        checks: [
          { message: 'Print 3', outputEquals: '3' },
          { message: 'Use +=', codeIncludes: '+=' },
          { message: 'Use ++', codeIncludes: '++' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This stops with "Assignment to constant variable". Which line causes it?',
        lines: ['const riders = 0;', 'riders += 2;', 'console.log(riders);'],
        bug: 1,
        fix: 'Change the first line to let riders = 0;',
        explanation: 'riders is a const, so it can\'t be given a new value. A count changes, so it should be let.',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a count that can change, then add 3 to it.',
        template: '[[1]] liftLine = 20;\nliftLine [[2]] 3;',
        blanks: [['let'], ['+=']],
        distractors: ['const', '=+', '++'],
        language: 'javascript',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that takes 5 off the lift line.',
        tiles: ['liftLine', '-=', '5', ';'],
        distractors: ['let', '=-', '--'],
        language: 'javascript',
      },
      {
        kind: 'writeCode',
        prompt: 'The lift line starts at 40 people. 12 get on, then 7 join. Make let liftLine = 40, change it with -= and +=, and print exactly: In line: 35',
        starter: 'let liftLine = 40;\n',
        solution: 'let liftLine = 40;\nliftLine -= 12;\nliftLine += 7;\nconsole.log(`In line: ${liftLine}`);\n',
        hint: 'liftLine -= 12;\nliftLine += 7;',
        checks: [
          { message: 'Print In line: 35', outputEquals: 'In line: 35' },
          { message: 'liftLine ends at 35', expr: 'liftLine === 35' },
          { message: 'Use -=', codeIncludes: '-=' },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'riders is 7. After riders *= 2; what is riders?',
        answers: ['14'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        prompt: 'Wes has a question. Pick the best answer.',
        from: 'wes',
        message: 'why not just make everything let?? then nothing ever breaks',
        options: [
          { text: 'Good idea, const is pointless', why: 'const catches real mistakes, like changing a price by accident.' },
          { text: 'const makes JavaScript stop the moment something changes a value that shouldn\'t move. That\'s a feature' },
          { text: 'let is slower', why: 'Speed isn\'t the reason. It\'s about catching mistakes.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What do you count during your day: steps, messages, cups of coffee? Which ones would be let, and which would be const?',
    starters: ['I count...', 'It would be let because...'],
  },
  deepen: {
    title: 'riders++ vs ++riders',
    summary: 'Both add one. The difference only shows if you use them inside another expression: riders++ gives the old value then adds, ++riders adds then gives the new value. Most code uses ++ on its own line, where they behave the same.',
  },
  notes: 'Assignment operators and increment: MDN "Assignment operators", "Increment (++)". Reassigning a const throws TypeError "Assignment to constant variable." in V8 (MDN "const").',
};

export default lesson;

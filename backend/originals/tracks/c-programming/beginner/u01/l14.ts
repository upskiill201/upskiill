import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14. Card deck: %d placeholders, printing whole numbers and simple sums. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Printing numbers with %d',
  summary: 'Sol 1, 22:30. Under the grow lights, Tomoko counts 48 tomato plants and 12 lettuce trays, and wants the board to add them up. printf can do sums, if you give it a place to put the answer.',
  minutes: 11,
  outcomes: [
    'Print a whole number with %d',
    'Let C do a calculation inside printf',
    'Use several %d placeholders in one line, in order',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>So far, printf has printed fixed text. To print a <strong>number</strong>, put a placeholder in the text and give the number after a comma:</p><p><code>printf("Plants: %d\\n", 48);</code> prints <strong>Plants: 48</strong></p><p><code>%d</code> means "a whole number goes here". The number after the comma fills it.</p>',
    },
    {
      kind: 'text',
      html: '<p>The value can be a calculation. C works it out first, then prints the answer:</p><p><code>printf("Total: %d\\n", 48 + 12);</code> prints <strong>Total: 60</strong></p><p>Several placeholders are filled <strong>in order</strong>, left to right:</p><p><code>printf("%d tomatoes, %d lettuce\\n", 48, 12);</code></p>',
    },
    {
      kind: 'tryIt',
      title: 'Tomoko\'s count',
      code: '#include <stdio.h>\n\nint main(void) {\n    printf("Tomato plants: %d\\n", 48);\n    printf("Lettuce trays: %d\\n", 12);\n    printf("Total: %d\\n", 48 + 12);\n    return 0;\n}\n',
      caption: 'Run it. The last line is a sum the board worked out.',
      challenge: 'Tomoko plants 6 more tomatoes. Change the numbers so both lines and the total are right.',
    },
    {
      kind: 'check',
      question: 'What does printf("%d\\n", 7 * 6); print?',
      options: ['7 * 6', '42', '%d'],
      answer: 1,
      explanation: 'C calculates 7 * 6 first, then puts 42 where %d is. In C, * means multiply.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 22:30. Counting in the GreenHab.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does %d mean inside printf\'s text?',
        options: [
          { text: 'Print the letter d', why: '%d is a placeholder, not text.' },
          { text: 'A whole number goes here' },
          { text: 'Delete the next character', why: 'Nothing gets deleted. %d is filled with a number.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("Crew: %d\\n", 4);',
        language: 'c',
        options: [
          { text: 'Crew: %d', why: 'The %d is replaced by the number after the comma.' },
          { text: 'Crew: 4' },
          { text: 'Crew: 4, 4', why: 'The number fills the placeholder once.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print Tomato plants: 48 using %d (put the 48 after the comma, not in the text).',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Tomato plants: \\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Tomato plants: %d\\n", 48);\n    return 0;\n}\n',
        hint: 'printf("Tomato plants: %d\\n", 48);',
        checks: [
          { message: 'Print Tomato plants: 48', outputIncludes: 'Tomato plants: 48' },
          { message: 'Use %d', codeIncludes: '%d' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the line so it prints Total: 60',
        template: 'printf("Total: [[1]]\\n", 48 [[2]] 12);',
        blanks: [['%d'], ['+']],
        distractors: ['%', 'd', '-'],
        language: 'c',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'printf("%d and %d\\n", 3, 9);',
        language: 'c',
        options: [
          { text: '9 and 3', why: 'Placeholders are filled left to right: the first number goes in the first %d.' },
          { text: '3 and 9' },
          { text: '12', why: 'Nothing is added: each %d gets its own number.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'This should print Lettuce: 12. Which line is wrong?',
        lines: ['#include <stdio.h>', 'int main(void) {', '    printf("Lettuce: %d\\n");', '    return 0;', '}'],
        bug: 2,
        fix: '    printf("Lettuce: %d\\n", 12);',
        explanation: 'The %d has no number to fill it. Give printf the value after a comma.',
        language: 'c',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it prints.',
        pairs: [
          ['printf("%d\\n", 5 + 5);', '10'],
          ['printf("%d\\n", 5 * 5);', '25'],
          ['printf("%d\\n", 50 - 5);', '45'],
          ['printf("5 + 5\\n");', '5 + 5'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomoko',
        message: 'Why not just type "Total: 60" myself?',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'Because when the numbers change, the board recalculates. You\'d have to redo it by hand.' },
          { text: 'printf can\'t print numbers typed in the text.', why: 'It can. But then the number never updates when the counts change.' },
          { text: 'There\'s no reason; both are the same.', why: 'They print the same today. Only one stays right tomorrow.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does printf("%d\\n", 48 + 12); print?',
        answers: ['60'],
        placeholder: 'A number',
      },
      {
        kind: 'writeCode',
        prompt: 'With one printf and two %d, print: 48 tomatoes, 12 lettuce',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("%d tomatoes, %d lettuce\\n", 48, 12);\n    return 0;\n}\n',
        hint: 'printf("%d tomatoes, %d lettuce\\n", 48, 12);',
        checks: [
          { message: 'Print 48 tomatoes, 12 lettuce', outputIncludes: '48 tomatoes, 12 lettuce' },
          { message: 'Use two %d placeholders', codeIncludes: '%d tomatoes, %d lettuce' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The board does the maths: print Plants in total: followed by 48 + 12 + 6, worked out by C.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("Plants in total: %d\\n", 48 + 12 + 6);\n    return 0;\n}\n',
        hint: 'Put the sum after the comma: printf("Plants in total: %d\\n", 48 + 12 + 6);',
        checks: [
          { message: 'Print Plants in total: 66', outputIncludes: 'Plants in total: 66' },
          { message: 'Let C add them up', codeIncludes: '48 + 12 + 6' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What numbers in your own life would you like a program to add up for you every day?',
    starters: ['I\'d like a program that counts...', 'It would save me...'],
  },
  deepen: {
    title: 'Next sol: numbers that change',
    summary: 'Typing 48 into printf works until the count changes. Chapter 2 stores numbers in variables, so one change updates every line that uses it.',
  },
  notes: '%d conversion for int (ISO C 7.21.6.1). Integer arithmetic in arguments is evaluated before the call.',
};

export default lesson;

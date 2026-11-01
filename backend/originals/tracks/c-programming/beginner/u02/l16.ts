import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16. Story: Lars's 1998 overflow bug. INT_MAX, wrapping, and choosing a bigger type. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'When numbers overflow',
  summary: 'Sol 2, 22:40. Ines asks Lars why HABCON\'s old log says it rebooted every nine hours in 1998. His answer is one word: "Overflow." A number got too big for its box.',
  minutes: 12,
  outcomes: [
    'Explain what overflow is',
    'Find the limits of int with INT_MAX and INT_MIN',
    'Pick a type big enough for the values you\'ll store',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Sol 2, 22:40. From Lars',
      beats: [
        { speaker: 'lars', text: 'In 1998 HABCON counted seconds since boot in a 2-byte int. The biggest number that fits is 32,767.' },
        { speaker: 'ines', text: '32,767 seconds is... nine hours and six minutes.' },
        { speaker: 'lars', text: 'Correct. At 32,768 the count did not get bigger. It jumped to minus 32,768. The fan logic saw negative time and rebooted the board. Every nine hours, for a month.' },
        { speaker: 'mateus', text: 'So the box was full and the number went round the back?' },
        { speaker: 'lars', text: 'Like a car odometer rolling past 99999. Learn the size of your boxes.' },
      ],
      choice: {
        prompt: 'Ines needs to count seconds for a whole 10-sol mission (about 888,000). What does she use?',
        options: [
          { text: 'A 4-byte int: its limit is over 2 billion, far more than 888,000.', outcome: 'Right. Check the limit against the biggest value you\'ll ever store, then pick the type.', best: true },
          { text: 'A 2-byte number, like Lars did.', outcome: 'It would overflow after nine hours, exactly like 1998.' },
          { text: 'A double, just in case.', outcome: 'It would work, but a count of whole seconds is an int\'s job. Pick the type that matches the value.' },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>Every type has a <strong>biggest</strong> and <strong>smallest</strong> value. For a 4-byte int they\'re in <code>limits.h</code>: <code>INT_MAX</code> is 2,147,483,647 and <code>INT_MIN</code> is -2,147,483,648.</p><p>Go past the limit and you get <strong>overflow</strong>. On most machines the value wraps round to the other end, like Lars\'s clock. Strictly, C says overflowing a signed int is <strong>undefined behaviour</strong>: anything may happen. Either way, it\'s a bug. The fix is to pick a type big enough before it happens.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The edge of an int',
      code: '#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    int biggest = INT_MAX;\n    printf("Biggest int:  %d\\n", biggest);\n    printf("Smallest int: %d\\n", INT_MIN);\n\n    int seconds = biggest;\n    seconds = seconds + 1;\n    printf("One more:     %d\\n", seconds);\n    return 0;\n}\n',
      caption: 'Run it. Watch what happens one step past the biggest int.',
      challenge: 'Store 888000 (ten sols of seconds) in an int and print it. Is it safe?',
    },
  ],
  apply: {
    scenario: 'Sol 2, 22:40. Lars\'s nine-hour bug.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is overflow?',
        options: [
          { text: 'A value too big (or too small) for its type' },
          { text: 'A program that prints too much', why: 'That\'s just long output. Overflow is about a value not fitting its box.' },
          { text: 'Running out of water', why: 'Wrong kind of overflow.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which header gives you INT_MAX?',
        options: [
          { text: 'stdio.h', why: 'stdio.h is for input and output.' },
          { text: 'limits.h' },
          { text: 'math.h', why: 'math.h has functions like sqrt. Limits are in limits.h.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Include limits.h and print Biggest int: 2147483647 using INT_MAX.',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    printf("Biggest int: %d\\n", INT_MAX);\n    return 0;\n}\n',
        hint: 'Add #include <limits.h>, then printf("Biggest int: %d\\n", INT_MAX);',
        checks: [
          { message: 'Print Biggest int: 2147483647', outputIncludes: 'Biggest int: 2147483647' },
          { message: 'Use INT_MAX', codeIncludes: 'INT_MAX' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fits in a 4-byte int, or overflows?',
        groups: ['Fits', 'Overflows'],
        items: [
          { text: 'Seconds in 10 sols: about 888,000', group: 0 },
          { text: 'Litres in the tank: 1,610', group: 0 },
          { text: 'INT_MAX + 1', group: 1 },
          { text: 'Five billion', group: 1 },
          { text: '-2,000,000,000', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A 2-byte int counting seconds overflows after 32,767. About how long is that?',
        options: [
          { text: 'About 9 hours' },
          { text: 'About 9 minutes', why: '32,767 seconds is 546 minutes: about 9 hours.' },
          { text: 'About 9 days', why: 'Much less: 32,767 / 3600 is about 9.1 hours.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['INT_MAX', 'Biggest value an int holds'],
          ['INT_MIN', 'Smallest value an int holds'],
          ['Overflow', 'Going past a type\'s limit'],
          ['Undefined behaviour', 'C promises nothing about what happens'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'mateus',
        message: 'Easy fix: always use the biggest type for everything.',
        prompt: 'Ines\'s answer?',
        options: [
          { text: 'On a 32 KB board, bytes matter. Work out the biggest value you\'ll store, then pick the type that fits it.' },
          { text: 'Big types can\'t overflow.', why: 'Every type has a limit. Bigger types just have bigger limits.' },
          { text: 'Agreed, Lars was wrong to save memory.', why: 'In 1998 his board had very little memory. He picked the wrong size, not the wrong idea.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A car odometer at 99999 adds one kilometre. What does it show?',
        answers: ['00000', '0', 'zero'],
        placeholder: 'What the dial shows',
      },
      {
        kind: 'findBug',
        prompt: 'Lars\'s 1998 design, in one line. Which choice caused the bug?',
        lines: ['Counting seconds since boot', 'In a 2-byte int (limit 32,767)', 'Checked by the fan logic every second'],
        bug: 1,
        fix: 'In a 4-byte int (limit over 2 billion)',
        explanation: 'Counting seconds is fine. The box was too small for nine hours of them.',
      },
      {
        kind: 'writeCode',
        prompt: 'Work out the seconds in 10 sols as 10 * 24 * 60 * 60 (ignore Mars\'s extra minutes) and print Mission seconds: 864000',
        starter: '#include <stdio.h>\n\nint main(void) {\n\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    int mission_seconds = 10 * 24 * 60 * 60;\n    printf("Mission seconds: %d\\n", mission_seconds);\n    return 0;\n}\n',
        hint: 'int mission_seconds = 10 * 24 * 60 * 60;',
        checks: [
          { message: 'Print Mission seconds: 864000', outputIncludes: 'Mission seconds: 864000' },
          { message: 'Let C do the multiplying', codeIncludes: '10 * 24 * 60 * 60' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars\'s bug came from a box that was big enough on day one and too small later. What in your life outgrew its "box" (a phone\'s storage, a bag, a plan)?',
    starters: ['Something that outgrew its box was...', 'I should have planned for...'],
  },
  deepen: {
    title: 'The year 2038',
    summary: 'Many systems once counted seconds since 1 January 1970 in a 4-byte signed int. That count reaches INT_MAX on 19 January 2038. Search for "Year 2038 problem" to see how it was fixed.',
  },
  notes: 'INT_MAX/INT_MIN: limits.h (ISO C 5.2.4.2.1); for 32-bit two\'s complement int: 2147483647 / -2147483648. Signed integer overflow is undefined behaviour (6.5p5). 16-bit int max 32767; 32767 s = 9.1 h. Mission of 10 sols at 24h39m35s = 887,750 s ("about 888,000"). Year 2038 problem: 32-bit time_t overflow at 03:14:07 UTC, 19 Jan 2038. Lars\'s bug is fictional.',
};

export default lesson;

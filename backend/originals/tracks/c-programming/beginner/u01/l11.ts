import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11. Tap to explore: Lars's commented code; // and slash-star comments. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Comments for humans',
  summary: 'Sol 1, 20:10. Lars\'s first email has no greeting, just a piece of old HABCON code. Half the lines aren\'t code at all. They\'re notes to whoever reads it next.',
  minutes: 10,
  outcomes: [
    'Write comments with // and /* */',
    'Explain that the compiler ignores comments',
    'Use a comment to switch a line off while testing',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'From: Lars Eriksen. Subject: read this first',
      text: '/* HABCON boot message\n   Lars Eriksen, 1998 */\n#include <stdio.h>\n\nint main(void) {\n    // Tell the crew the board is alive\n    printf("HABCON ready\\n");\n    // printf("DEBUG: boot ok\\n");\n    return 0; // 0 = all good\n}',
      hotspots: [
        { phrase: '/* HABCON boot message\n   Lars Eriksen, 1998 */', note: 'A block comment: everything from /* to */ is ignored by the compiler, even across several lines.' },
        { phrase: '// Tell the crew the board is alive', note: 'A line comment: from // to the end of the line is ignored. It explains WHY the next line exists.' },
        { phrase: '// printf("DEBUG: boot ok\\n");', note: 'A line of code switched off by putting // in front. Programmers call this "commenting out". Handy for testing.' },
        { phrase: '// 0 = all good', note: 'A comment can sit at the end of a line of code. The code before // still runs.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Lars, in his email: "Comment the why, not the what. printf prints; I can see that. Tell me why it prints."',
    },
    {
      kind: 'tryIt',
      title: 'Comments change nothing',
      code: '#include <stdio.h>\n\nint main(void) {\n    // Greet the crew\n    printf("HABCON ready\\n");\n    // printf("DEBUG: boot ok\\n");\n    return 0; /* all good */\n}\n',
      caption: 'Run it: only one line prints. The commented-out printf never runs.',
      challenge: 'Remove the // in front of the DEBUG line and run it again. Now both lines print.',
    },
  ],
  apply: {
    scenario: 'Sol 1, 20:10. Lars\'s first email.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the compiler do with a comment?',
        options: [
          { text: 'Prints it', why: 'Comments are never printed. Only printf prints.' },
          { text: 'Ignores it completely' },
          { text: 'Runs it as code', why: 'That\'s the point of a comment: it\'s for people, not the computer.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: '// printf("A\\n");\nprintf("B\\n"); // printf("C\\n");',
        language: 'c',
        options: [
          { text: 'A, B and C', why: 'Everything after // on a line is ignored.' },
          { text: 'B only' },
          { text: 'B and C', why: 'The C printf comes after // on the same line, so it\'s part of the comment.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the comment style to how it works.',
        pairs: [
          ['//', 'Ignores the rest of the line'],
          ['/* ... */', 'Ignores everything between, even many lines'],
          ['// before a line of code', 'Switches that line off'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Switch off the DEBUG line with a comment, so only HABCON ready prints.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("HABCON ready\\n");\n    printf("DEBUG: boot ok\\n");\n    return 0;\n}\n',
        solution: '#include <stdio.h>\n\nint main(void) {\n    printf("HABCON ready\\n");\n    // printf("DEBUG: boot ok\\n");\n    return 0;\n}\n',
        hint: 'Put // at the start of the DEBUG line.',
        checks: [
          { message: 'Print only HABCON ready', outputEquals: 'HABCON ready' },
          { message: 'Keep the DEBUG line, commented out', codeIncludes: 'DEBUG' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good comment or useless comment?',
        groups: ['Useful', 'Useless'],
        items: [
          { text: '// Fans stay on: CO2 builds up fast at night', group: 0 },
          { text: '// this is printf', group: 1 },
          { text: '// Hal asked for this line on the airlock screen', group: 0 },
          { text: '// return 0', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This won\'t compile. Which line breaks it?',
        lines: ['#include <stdio.h>', '/* Water report', 'int main(void) {', '    printf("Water OK\\n");', '    return 0;', '}'],
        bug: 1,
        fix: '/* Water report */',
        explanation: 'The block comment never closes with */, so the compiler ignores everything after it, main included.',
        language: 'c',
      },
      {
        kind: 'fillBlank',
        prompt: 'Turn this into a block comment.',
        template: '[[1]] Written on Sol 1\n   by Ines Moreau [[2]]',
        blanks: [['/*'], ['*/']],
        distractors: ['//', '<!--'],
        language: 'c',
      },
      {
        kind: 'chatReply',
        from: 'lars',
        message: 'Your code has no comments. Why should the next engineer trust it?',
        prompt: 'Ines\'s best reply?',
        options: [
          { text: 'I\'ll add comments that say why each part is there, not just what it does.' },
          { text: 'I\'ll put a comment on every single line.', why: '"this is printf" on every line is noise. Lars wants the why.' },
          { text: 'The code explains itself.', why: 'Sometimes. But why a value is 62, or why a line exists, is never in the code itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Putting // in front of a line of code to switch it off is called "commenting it ___".',
        answers: ['out'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a // comment above the printf that says why it\'s there, and a /* */ comment with your name at the top. Keep the output the same.',
        starter: '#include <stdio.h>\n\nint main(void) {\n    printf("Fans: ON\\n");\n    return 0;\n}\n',
        solution: '/* Fan status, by Ines */\n#include <stdio.h>\n\nint main(void) {\n    // The crew checks this before sleeping\n    printf("Fans: ON\\n");\n    return 0;\n}\n',
        hint: 'A block comment starts with /* and ends with */. A line comment starts with //.',
        checks: [
          { message: 'Still print Fans: ON', outputEquals: 'Fans: ON' },
          { message: 'Add a // comment', codeIncludes: '//' },
          { message: 'Add a /* */ comment', codeIncludes: '*/' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lars says: comment the why, not the what. Think of instructions someone left you (a recipe, a note on a machine). Did they explain why? Did it help?',
    starters: ['A note that explained why was...', 'A note that didn\'t was...'],
  },
  notes: 'Comments: // (since C99) and /* */ (ISO C 6.4.9). Comments are removed before compilation. Lars\'s advice is a fictional character\'s; it reflects common style guidance (e.g. "comment why, not what").',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7 — Joining text with +: concatenation, spaces, and why numbers need str(). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Joining text',
  summary: 'Ada wants the tracker to say "This month: Tunde" using a variable for the name. She tries + and gets "This month:Tunde". Spaces, it turns out, are her job.',
  minutes: 11,
  outcomes: [
    'Join strings with +',
    'Add the spaces yourself',
    'Know why "Pot: " + 200000 fails',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'To join two strings, use +. "This month: " + "Tunde" gives "This month: Tunde". Joining text is called concatenation.', replies: ['Mine came out squashed'] },
        { tey: '+ adds nothing in between. If you want a space, it has to be inside the quotes: "This month: " with a space before the closing quote.', replies: ['Can I join a variable?'] },
        { tey: 'Yes, as long as it holds text. name = "Tunde" then "This month: " + name. Python looks inside the box and joins what it finds.', replies: ['What about the pot?'] },
        { tey: '"Pot: " + 200000 is a TypeError: + can\'t join text to a number. You could write str(200000) to turn the number into text, but f-strings, next lesson, make all of this much easier.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Whose turn?',
      caption: 'Run it. Then delete the space after the colon and run it again.',
      code: 'name = "Tunde"\nprint("This month: " + name)\nprint("Next: " + "Bisi")\n',
      challenge: 'Make it print Thank you, Tunde! using + twice.',
    },
  ],
  apply: {
    scenario: 'Whose turn is it?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Ada" + "Tunde")',
        language: 'python',
        options: [
          { text: 'Ada Tunde', why: '+ adds no space by itself.' },
          { text: 'An error', why: 'Joining two strings is fine.' },
          { text: 'AdaTunde' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Print This month: Tunde, joining text and the name variable with +',
        starter: 'name = "Tunde"\n',
        solution: 'name = "Tunde"\nprint("This month: " + name)\n',
        hint: 'Put the space inside the quotes: "This month: " + name',
        checks: [
          { message: 'Print This month: Tunde', outputEquals: 'This month: Tunde' },
          { message: 'Join with +', codeIncludes: '+ name' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line causes a TypeError?',
        language: 'python',
        lines: ['name = "Bisi"', 'print("Next: " + name)', 'print("Pot: " + 275000)'],
        bug: 2,
        fix: 'print("Pot: " + str(275000))',
        explanation: '+ can\'t join text and a number. Turn the number into text first, or use an f-string (next lesson).',
      },
      {
        kind: 'fillBlank',
        prompt: 'Join a greeting and the name.',
        language: 'python',
        template: 'print("Hello, " [[1]] name)',
        blanks: [['+']],
        distractors: [',', '&'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Thank you, Tunde! using + twice',
        starter: 'name = "Tunde"\n',
        solution: 'name = "Tunde"\nprint("Thank you, " + name + "!")\n',
        hint: '"Thank you, " + name + "!"',
        checks: [
          { message: 'Print Thank you, Tunde!', outputEquals: 'Thank you, Tunde!' },
          { message: 'Use the name variable', codeIncludes: 'name' },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that prints Next: Bisi',
        language: 'python',
        tiles: ['print(', '"Next: "', '+', 'name', ')'],
        distractors: ['"name"', '-'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Works, or TypeError?',
        groups: ['Works', 'TypeError'],
        items: [
          { text: '"Ajo " + "v0.1"', group: 0 },
          { text: '"Pot: " + 200000', group: 1 },
          { text: '"Members: " + str(11)', group: 0 },
          { text: '11 + " members"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does concatenation mean?',
        options: [
          { text: 'Adding numbers', why: 'That\'s addition. + does both, depending on the type.' },
          { text: 'Joining strings end to end' },
          { text: 'Repeating text', why: 'That\'s * on a string.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My output says This month:Tunde. Where did the space go?',
        prompt: "Arjun's best reply?",
        options: [
          { text: '+ never adds a space. Put one inside the quotes: "This month: ".' },
          { text: 'Python deletes spaces.', why: 'It keeps exactly what you type.' },
          { text: 'Use two + signs.', why: 'That adds nothing. The space has to be in a string.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("v0" + ".1") show?',
        answers: ['v0.1'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Spaces matter to Python because it does exactly what you say. Where else does a missing space or comma change the meaning?',
    starters: ['A missing space once...', 'It changed...'],
  },
  deepen: {
    title: 'str() turns numbers into text',
    summary: 'str(275000) gives "275000", which + can join. You\'ll use str() and int() properly in lesson 11.',
  },
  notes: 'String concatenation with + (Python tutorial §3.1.2 Text). str + int raises TypeError: can only concatenate str (not "int") to str. str() converts to text (Built-in Functions: str).',
};

export default lesson;

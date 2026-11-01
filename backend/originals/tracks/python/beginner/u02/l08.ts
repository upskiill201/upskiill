import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — f-strings: put variables straight into text. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'f-strings',
  summary: 'Arjun looks at Ada\'s "Members: " + str(members) + " | Pot: " + str(pot) and winces. "Let me show you the thing I use fifty times a day."',
  minutes: 12,
  outcomes: [
    'Write an f-string with f before the quotes',
    'Put variables inside {curly brackets}',
    'Mix text and numbers without str()',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>An <strong>f-string</strong> is a string with an <code>f</code> right before the opening quote. Inside it, anything in <code>{curly brackets}</code> is replaced by its value:</p><p><code>name = "Tunde"</code><br/><code>print(f"This month: {name}")</code> prints <code>This month: Tunde</code>.</p><p>Numbers work too, with no <code>str()</code> needed: <code>f"Members: {members}"</code>. The f stands for <em>formatted</em>. f-strings arrived in Python 3.6, in 2016, and quickly became the usual way to build text.</p>',
    },
    {
      kind: 'text',
      html: '<p>Two mistakes everyone makes once:</p><ul><li><strong>Forgetting the f.</strong> <code>"Members: {members}"</code> prints the braces as they are: <code>Members: {members}</code>.</li><li><strong>Quotes inside the braces.</strong> <code>{"name"}</code> puts the word name in, not Tunde. Inside the braces goes the variable, with no quotes.</li></ul>',
    },
    {
      kind: 'tryIt',
      title: 'Before and after',
      caption: 'Both lines print the same thing. Which would you rather type on a phone?',
      code: 'members = 11\npot = 275000\n\nprint("Members: " + str(members) + " | Pot: " + str(pot))\nprint(f"Members: {members} | Pot: {pot}")\n',
      challenge: 'Remove the f from the second print and run it. Then put it back.',
    },
  ],
  apply: {
    scenario: 'Ada rewrites her messages as f-strings.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'name = "Bisi"\nprint(f"Next: {name}")',
        language: 'python',
        options: [
          { text: 'Next: {name}', why: 'With the f, the braces are replaced by the value.' },
          { text: 'Next: Bisi' },
          { text: 'Next: name', why: 'Inside the braces is the variable, so Python uses its value.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print This month: Tunde with an f-string',
        starter: 'name = "Tunde"\n',
        solution: 'name = "Tunde"\nprint(f"This month: {name}")\n',
        hint: 'print(f"This month: {name}")',
        checks: [
          { message: 'Print This month: Tunde', outputEquals: 'This month: Tunde' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line prints the braces instead of the value?',
        language: 'python',
        lines: ['print(f"Members: {members}")', 'print("Pot: {pot}")', 'print(f"Share: {share}")'],
        bug: 1,
        fix: 'print(f"Pot: {pot}")',
        explanation: 'No f before the quotes, so it\'s an ordinary string.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the f-string.',
        language: 'python',
        template: 'print([[1]]"Pot: [[2]]pot[[3]]")',
        blanks: [['f'], ['{'], ['}']],
        distractors: ['(', ')', '"'],
      },
      {
        kind: 'writeCode',
        prompt: 'Print Members: 11 | Pot: 275000 with one f-string',
        starter: 'members = 11\npot = 275000\n',
        solution: 'members = 11\npot = 275000\nprint(f"Members: {members} | Pot: {pot}")\n',
        hint: 'Two sets of braces in one f-string.',
        checks: [
          { message: 'Print Members: 11 | Pot: 275000', outputEquals: 'Members: 11 | Pot: 275000' },
          { message: 'Use an f-string', codeIncludes: 'f"' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'name = "Ada". Match the code to what it prints.',
        pairs: [
          ['f"Hi {name}"', 'Hi Ada'],
          ['"Hi {name}"', 'Hi {name}'],
          ['f"Hi {\'name\'}"', 'Hi name'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are f-strings easier than + for Ada?',
        options: [
          { text: 'They run faster on phones', why: 'Readability is the point, not speed.' },
          { text: 'They don\'t need quotes', why: 'They need quotes, plus an f.' },
          { text: 'Numbers go straight in, and the spaces are just part of the text' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that prints Next: Bisi from the name variable.',
        language: 'python',
        tiles: ['print(', 'f"Next: {name}"', ')'],
        distractors: ['"Next: {name}"', 'f"Next: name"'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What does the f in f-string stand for?',
        prompt: "Ada's answer?",
        options: [
          { text: 'Formatted: the braces get filled in with values.' },
          { text: 'Fast.', why: 'Good guess, but no.' },
          { text: 'Fun.', why: 'They are, but no.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'v = 1. What does print(f"v0.{v}") show?',
        answers: ['v0.1'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'f-strings are a template with gaps. Where else do you fill in a template (forms, messages, invoices)?',
    starters: ['I fill in...', 'The gaps are...'],
  },
  deepen: {
    title: 'PEP 498',
    summary: 'f-strings were proposed in PEP 498 ("Literal String Interpolation") and shipped in Python 3.6 in December 2016.',
  },
  notes: 'f-strings: PEP 498, Python 3.6 (released 23 December 2016). Python tutorial §7.1.1 Formatted String Literals.',
};

export default lesson;

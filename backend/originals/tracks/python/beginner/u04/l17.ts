import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17 — Splitting and joining: .split() and .join(), a first look at lists. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Splitting and joining',
  summary: 'Someone pastes the whole group into the chat as one line: "Ada, Tunde, Bisi, Kemi". Ada needs the names separately, and later back together with a different separator.',
  minutes: 12,
  outcomes: [
    'Break text into pieces with .split()',
    'Put pieces back together with .join()',
    'Know that .split() gives a list (Chapter 6)',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: '"Ada,Tunde,Bisi".split(",") gives three separate strings, in a list.',
          isFact: true,
          explain: 'Fact. It gives [\'Ada\', \'Tunde\', \'Bisi\']: a list, which holds many values in order. Lists get a whole chapter soon (Chapter 6).',
        },
        {
          text: '.split() with nothing in the brackets splits on commas.',
          isFact: false,
          explain: 'Myth. With no argument, .split() splits on any run of spaces (and new lines). "Ngozi  Okafor".split() is [\'Ngozi\', \'Okafor\'].',
        },
        {
          text: 'To join a list back into one string, you write ", ".join(names).',
          isFact: true,
          explain: 'Fact, and it looks backwards at first: the separator goes first, then .join(), with the list in the brackets.',
        },
        {
          text: '"a, b".split(",") gives [\'a\', \'b\'] with no spaces.',
          isFact: false,
          explain: 'Myth. It splits only at the comma, so the space stays: [\'a\', \' b\']. Split on ", " (comma and space), or strip each piece.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Splitting the group',
      caption: 'One line in, a list out, then back to one line.',
      code: 'pasted = "Ada, Tunde, Bisi, Kemi"\n\nnames = pasted.split(", ")\nprint(names)\nprint(len(names))\nprint(" | ".join(names))\n',
      challenge: 'Join the names with " and " instead.',
    },
  ],
  apply: {
    scenario: 'Splitting the pasted list.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("Ada,Tunde,Bisi".split(","))',
        language: 'python',
        options: [
          { text: 'Ada Tunde Bisi', why: '.split() gives a list, printed with brackets and quotes.' },
          { text: "['Ada', 'Tunde', 'Bisi']" },
          { text: "['Ada,Tunde,Bisi']", why: 'It split at each comma.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Split the pasted names on ", " and print how many there are',
        starter: 'pasted = "Ada, Tunde, Bisi, Kemi, Ngozi"\n',
        solution: 'pasted = "Ada, Tunde, Bisi, Kemi, Ngozi"\nnames = pasted.split(", ")\nprint(len(names))\n',
        hint: 'names = pasted.split(", "), then len(names).',
        checks: [
          { message: 'Print 5', outputEquals: '5' },
          { message: 'Use .split()', codeIncludes: '.split(' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Join the names with " | " and print them',
        starter: 'names = ["Ada", "Tunde", "Bisi"]\n',
        solution: 'names = ["Ada", "Tunde", "Bisi"]\nprint(" | ".join(names))\n',
        hint: '" | ".join(names)',
        checks: [
          { message: 'Print Ada | Tunde | Bisi', outputEquals: 'Ada | Tunde | Bisi' },
          { message: 'Use .join()', codeIncludes: '.join(' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the code to the result.',
        pairs: [
          ['"a b c".split()', "['a', 'b', 'c']"],
          ['"a-b".split("-")', "['a', 'b']"],
          ['"-".join(["a", "b"])', 'a-b'],
          ['len("a,b,c".split(","))', '3'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is backwards?',
        language: 'python',
        lines: ['names = ["Ada", "Tunde"]', 'print(", ".join(names))', 'print(names.join(", "))'],
        bug: 2,
        fix: 'print(", ".join(names))',
        explanation: 'The separator comes first: ", ".join(names). Lists have no .join().',
      },
      {
        kind: 'sortGroups',
        prompt: 'What does each give back?',
        groups: ['A list', 'A string'],
        items: [
          { text: 'text.split(",")', group: 0 },
          { text: '", ".join(names)', group: 1 },
          { text: 'text.strip()', group: 1 },
          { text: '"a b".split()', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Split, then join with a new separator.',
        language: 'python',
        template: 'names = pasted.[[1]](", ")\nprint(" / ".[[2]](names))',
        blanks: [['split'], ['join']],
        distractors: ['strip', 'replace'],
      },
      {
        kind: 'writeCode',
        prompt: 'Tidy a name with extra spaces: split it, then join it with one space',
        starter: 'raw = "Ngozi    Okafor"\n',
        solution: 'raw = "Ngozi    Okafor"\nprint(" ".join(raw.split()))\n',
        hint: '" ".join(raw.split())',
        checks: [{ message: 'Print Ngozi Okafor', outputEquals: 'Ngozi Okafor' }],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why does ", ".join(names) put the separator first? It looks backwards.',
        prompt: "Ada's best guess?",
        options: [
          { text: 'It\'s a typo in Python.', why: 'It\'s deliberate, and common in Python code.' },
          { text: 'It doesn\'t matter which way.', why: 'names.join(", ") is an error.' },
          { text: 'Because joining is something the separator does: "use this between every item". It works on any list.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does print("-".join(["03", "2026"])) show?',
        answers: ['03-2026'],
        placeholder: 'Output',
      },
    ],
  },
  reflect: {
    prompt: 'Splitting and joining is how you move between "one line of text" and "many items". Where do you do that by hand today?',
    starters: ['I often copy a list...', 'It would be easier to...'],
  },
  deepen: {
    title: 'Lists are next-but-one',
    summary: 'You just made your first list without trying. Chapter 6 is all about lists: adding, removing, sorting and whose turn it is.',
  },
  notes: 'str.split(sep=None) splits on runs of whitespace when sep is None; with a sep it splits exactly at sep (String Methods). str.join(iterable) (String Methods). "a, b".split(",") = [\'a\', \' b\'].',
};

export default lesson;

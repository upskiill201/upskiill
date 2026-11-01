import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 13 — Swapping values: the lost-value trap, a temp variable, and a, b = b, a. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Swapping values',
  summary: 'Tunde needs the pot early for his sister\'s wedding. Bisi agrees to swap months with him. Ada swaps the two variables, and both of them end up as Bisi.',
  minutes: 11,
  outcomes: [
    'See why a = b then b = a loses a value',
    'Swap with a temporary variable',
    'Swap in one line with a, b = b, a',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada has this_month = "Bisi" and next_month = "Tunde". They want to swap. Her first try: this_month = next_month, then next_month = this_month.', replies: ['Why are both Tunde?'] },
        { tey: 'The first line puts "Tunde" in this_month, and "Bisi" is gone. By the second line, this_month already says "Tunde", so next_month gets "Tunde" too. One value got overwritten before it was saved.', replies: ['How do I save it?'] },
        { tey: 'With a spare box. temp = this_month keeps "Bisi" safe. Then this_month = next_month, then next_month = temp. Three lines, nothing lost.', replies: ['Is there a shortcut?'] },
        { tey: 'Python has a neat one: this_month, next_month = next_month, this_month. Python reads both values on the right first, then stores them on the left. One line, no temp.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Tunde and Bisi swap',
      caption: 'Run it. Then try swapping back with the same line.',
      code: 'this_month = "Bisi"\nnext_month = "Tunde"\n\nthis_month, next_month = next_month, this_month\n\nprint(f"This month: {this_month}")\nprint(f"Next month: {next_month}")\n',
      challenge: 'Swap them with a temp variable instead, in three lines.',
    },
  ],
  apply: {
    scenario: 'Tunde and Bisi swap months.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'a = "Bisi"\nb = "Tunde"\na = b\nb = a\nprint(a, b)',
        language: 'python',
        options: [
          { text: 'Tunde Bisi', why: '"Bisi" was overwritten on the third line, before it was saved.' },
          { text: 'Tunde Tunde' },
          { text: 'Bisi Bisi', why: 'a = b happens first, so both end up as Tunde.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Swap this_month and next_month in one line, then print them',
        starter: 'this_month = "Bisi"\nnext_month = "Tunde"\n# Swap them\n\nprint(this_month, next_month)\n',
        solution: 'this_month = "Bisi"\nnext_month = "Tunde"\nthis_month, next_month = next_month, this_month\nprint(this_month, next_month)\n',
        hint: 'this_month, next_month = next_month, this_month',
        checks: [
          { message: 'Print Tunde Bisi', outputEquals: 'Tunde Bisi' },
          { message: 'this_month is Tunde', expr: 'this_month == "Tunde"' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the swap that uses a temp variable.',
        language: 'python',
        lines: ['temp = this_month', 'this_month = next_month', 'next_month = temp'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the one-line swap.',
        language: 'python',
        template: 'a, b = [[1]], [[2]]',
        blanks: [['b'], ['a']],
        distractors: ['temp', 'a + b'],
      },
      {
        kind: 'writeCode',
        prompt: 'Swap with a temp variable, in three lines',
        starter: 'this_month = "Bisi"\nnext_month = "Tunde"\n# Use temp to swap\n\nprint(this_month, next_month)\n',
        solution: 'this_month = "Bisi"\nnext_month = "Tunde"\ntemp = this_month\nthis_month = next_month\nnext_month = temp\nprint(this_month, next_month)\n',
        hint: 'temp = this_month, then this_month = next_month, then next_month = temp.',
        checks: [
          { message: 'Print Tunde Bisi', outputEquals: 'Tunde Bisi' },
          { message: 'Use a temp variable', codeIncludes: 'temp' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'This swap loses Bisi. Which line should come first?',
        language: 'python',
        lines: ['this_month = next_month', 'temp = this_month', 'next_month = temp'],
        bug: 1,
        fix: 'Move temp = this_month to the top',
        explanation: 'Save the value before overwriting it. Here temp copies "Tunde", because this_month was already changed.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it swap correctly?',
        groups: ['Swaps', "Loses a value"],
        items: [
          { text: 'a, b = b, a', group: 0 },
          { text: 'a = b then b = a', group: 1 },
          { text: 'temp = a, a = b, b = temp', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why does a, b = b, a work when a = b then b = a doesn\'t?',
        prompt: "Ada's best answer?",
        options: [
          { text: 'Commas make Python run faster.', why: 'It\'s about order, not speed.' },
          { text: 'It doesn\'t really work.', why: 'It does. Try it.' },
          { text: 'Python reads both values on the right before storing anything, so nothing is overwritten too early.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the one-line swap of x and y.',
        language: 'python',
        tiles: ['x, y', '=', 'y, x'],
        distractors: ['x = y', 'temp'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'x = 1, y = 2, then x, y = y, x. What is x now?',
        answers: ['2'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'The swap bug is "overwriting before saving". Where else have you lost something by replacing it before keeping a copy?',
    starters: ['I once overwrote...', 'Now I...'],
  },
  deepen: {
    title: 'Tuples',
    summary: 'The a, b on each side are tuples: a few values bundled together. You\'ll meet them properly with lists in Chapter 6.',
  },
  notes: 'Tuple assignment evaluates the right-hand side fully before assigning (Python Language Reference §7.2; tutorial §5.3 "Tuples and Sequences", sequence unpacking).',
};

export default lesson;

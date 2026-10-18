import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 11 — Slicing lists: the next three to collect, the first half of the year. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Slicing lists',
  summary: 'The group chat wants to know who\'s next: "Just tell us the next three." Ada already knows how to slice a string. A list slices the same way.',
  minutes: 11,
  outcomes: [
    'Take part of a list with list[start:stop]',
    'Leave out start or stop to go from the beginning or to the end',
    'Know that a slice is a new list',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Slices, the list version',
      html: '<p>In Chapter 4 you sliced text: <code>"Ngozi"[0:3]</code> is <code>"Ngo"</code>. Lists follow exactly the same rules:</p><ul><li><code>members[0:3]</code>: positions 0, 1 and 2. <strong>The stop is not included.</strong> That\'s the first three members.</li><li><code>members[:3]</code>: the same thing. Leave out the start and Python starts at 0.</li><li><code>members[3:]</code>: from position 3 to the end. Everyone except the first three.</li><li><code>members[-3:]</code>: the last three.</li><li><code>members[:6]</code> and <code>members[6:]</code>: with 12 members, the first half of the year and the second.</li></ul><p>Two differences from picking one item:</p><ol><li>A slice is always a <strong>list</strong>, even if it has one item: <code>members[0:1]</code> is <code>[\'Ada\']</code>, not <code>\'Ada\'</code>.</li><li>A slice <strong>never</strong> gives an IndexError. <code>members[10:50]</code> on a 12-item list just gives the last two.</li></ol><p>And a slice is a new list. Changing it doesn\'t change <code>members</code>.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The next three',
      caption: 'The payout order, in pieces.',
      code: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf",\n           "Ifeoma", "Segun", "Amaka", "Dayo", "Tobi", "Chika"]\n\nprint("Next three:", members[:3])\nprint("First half:", members[:6])\nprint("Second half:", members[6:])\nprint("Last three:", members[-3:])\n',
      challenge: 'Ada and Tunde have collected. Print the next three after them.',
    },
  ],
  apply: {
    scenario: 'Who\'s next?',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]\nprint(members[1:3])',
        language: 'python',
        options: [
          { text: "['Tunde', 'Bisi']" },
          { text: "['Tunde', 'Bisi', 'Kemi']", why: 'The stop (3) is not included.' },
          { text: "['Ada', 'Tunde', 'Bisi']", why: 'It starts at position 1, Tunde.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the first three members with a slice',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nprint(members[:3])\n',
        hint: 'members[:3]',
        checks: [
          { message: "Print ['Ada', 'Tunde', 'Bisi']", outputEquals: "['Ada', 'Tunde', 'Bisi']" },
          { message: 'Use a slice', codeIncludes: ':' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the last two members with a negative slice',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi"]\nprint(members[-2:])\n',
        hint: 'members[-2:]',
        checks: [
          { message: "Print ['Kemi', 'Ngozi']", outputEquals: "['Kemi', 'Ngozi']" },
          { message: 'Count from the end', codeIncludes: '[-2:]' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'members = ["Ada", "Tunde", "Bisi", "Kemi"]. Match the slice to the result.',
        pairs: [
          ['members[:2]', "['Ada', 'Tunde']"],
          ['members[2:]', "['Bisi', 'Kemi']"],
          ['members[-1:]', "['Kemi']"],
          ['members[1:2]', "['Tunde']"],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'members[0] and members[0:1]. What\'s the difference?',
        options: [
          { text: "members[0] is 'Ada'; members[0:1] is ['Ada'], a list" },
          { text: 'No difference', why: 'A slice is always a list.' },
          { text: 'members[0:1] is an error', why: 'It\'s a valid one-item slice.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'members has 4 items. Works, or IndexError?',
        groups: ['Works', 'IndexError'],
        items: [
          { text: 'members[2:10]', group: 0 },
          { text: 'members[10]', group: 1 },
          { text: 'members[5:]', group: 0 },
          { text: 'members[4]', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'With 12 members: the second half of the year.',
        language: 'python',
        template: 'second_half = members[[[1]][[2]]]',
        blanks: [['6'], [':']],
        distractors: ['7', ','],
      },
      {
        kind: 'writeCode',
        prompt: 'Ada and Tunde have collected. Print the next three: positions 2, 3 and 4',
        starter: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\n',
        solution: 'members = ["Ada", "Tunde", "Bisi", "Kemi", "Ngozi", "Yusuf"]\nprint(members[2:5])\n',
        hint: 'Start at 2; the stop is one past the last one you want.',
        checks: [{ message: "Print ['Bisi', 'Kemi', 'Ngozi']", outputEquals: "['Bisi', 'Kemi', 'Ngozi']" }],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why does [2:5] stop at 4? It feels like it should include 5.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'The stop is where you stop, not the last one you take. A bonus: 5 - 2 = 3, the number of items you get.' },
          { text: 'It\'s a bug that nobody fixed.', why: 'It\'s deliberate and consistent everywhere in Python.' },
          { text: 'Use [2:5+1] every time.', why: 'Then you\'d get four items, not three.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'members = ["Ada", "Tunde", "Bisi"]. How many items are in members[0:2]?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Slicing strings in Chapter 4 made slicing lists almost free. What other idea have you learned once and then reused somewhere new?',
    starters: ['I learned... once', 'Then I used it for...'],
  },
  deepen: {
    title: 'Steps',
    summary: 'members[::2] takes every second member: positions 0, 2, 4... members[::-1] reverses the list as a new copy.',
  },
  notes: 'List slicing (Python tutorial §3.1.3). Slices return a new list; out-of-range slice bounds are clipped, so they never raise IndexError.',
};

export default lesson;

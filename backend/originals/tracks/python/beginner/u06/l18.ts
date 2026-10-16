import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 18 — IndexError, explained: reading the error, and three ways to avoid it. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'IndexError, explained',
  summary: 'Yusuf left, the list has 11 members now, and the tracker crashes on a line that worked yesterday: IndexError: list index out of range. Ada reads it calmly, the way she learned in Chapter 1.',
  minutes: 11,
  outcomes: [
    'Read an IndexError message and find the line',
    'Know why a list shrinking can cause one',
    'Avoid it with [-1], len() checks, or %',
  ],
  learn: [
    {
      kind: 'story',
      title: 'It worked yesterday',
      beats: [
        { speaker: 'narrator', text: 'Ada\'s tracker has a line: print(f"Last to collect: {members[11]}"). With 12 members it printed Chika. Yusuf left. Now it crashes.' },
        { speaker: 'ada', text: 'IndexError: list index out of range. Line 7. So position 11 doesn\'t exist any more.' },
        { speaker: 'arjun', text: 'Right. 11 members means positions 0 to 10. The 11 was a guess about the list that stopped being true.' },
        { speaker: 'ada', text: 'members[-1] doesn\'t care how long the list is. And I should never type 11 for a position.' },
        { speaker: 'tey', text: 'Three fixes, one idea: let the list tell you its size. [-1] for the last, len() to check, % to wrap.' },
      ],
      choice: {
        prompt: 'What\'s the best fix for that line?',
        options: [
          {
            text: 'print(f"Last to collect: {members[-1]}")',
            outcome: 'Works for any length. Nothing to update when people join or leave.',
            best: true,
          },
          {
            text: 'print(f"Last to collect: {members[10]}")',
            outcome: 'Works today. Breaks again when someone joins or leaves.',
          },
          {
            text: 'Ask Yusuf to come back.',
            outcome: 'He\'s in Abuja. Fix the code.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Read the error',
      caption: 'This crashes on purpose. Read the last line of the error.',
      code: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members[3])\n',
      challenge: 'Fix it so it prints the last member, whatever the length.',
      expectError: true,
    },
  ],
  apply: {
    scenario: 'IndexError.',
    items: [
      {
        kind: 'mcq',
        prompt: 'IndexError: list index out of range. What does it mean?',
        options: [
          { text: 'You asked for a position the list doesn\'t have' },
          { text: 'The item isn\'t in the list', why: 'That\'s .remove()\'s ValueError.' },
          { text: 'The list is the wrong type', why: 'That would be a TypeError.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'members has 11 items. Works, or IndexError?',
        groups: ['Works', 'IndexError'],
        items: [
          { text: 'members[10]', group: 0 },
          { text: 'members[11]', group: 1 },
          { text: 'members[-11]', group: 0 },
          { text: 'members[-12]', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the crash so it prints the last member: Bisi',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members[3])\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members[-1])\n',
        hint: '[-1] always means the last item.',
        checks: [
          { message: 'Print Bisi', outputEquals: 'Bisi' },
          { message: 'Use [-1]', codeIncludes: '[-1]' },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print members[position] if it exists, otherwise "No one at that position"',
        starter: 'members = ["Ada", "Tunde", "Bisi"]\nposition = 5\n',
        solution: 'members = ["Ada", "Tunde", "Bisi"]\nposition = 5\nif position < len(members):\n    print(members[position])\nelse:\n    print("No one at that position")\n',
        hint: 'if position < len(members):',
        checks: [
          { message: 'Print No one at that position', outputEquals: 'No one at that position' },
          { message: 'Check with len()', codeIncludes: 'len(members)' },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'After Yusuf left, this crashes. Which line?',
        language: 'python',
        lines: ['members.remove("Yusuf")', 'print(len(members))', 'print(members[11])'],
        bug: 2,
        fix: 'print(members[-1])',
        explanation: 'With 11 members, the last position is 10. A typed position breaks when the list changes.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the error to its cause.',
        pairs: [
          ['IndexError', 'A position that doesn\'t exist'],
          ['ValueError from .remove()', 'An item that isn\'t there'],
          ['TypeError: \'str\' object does not support item assignment', 'Changing a letter of a string'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'members = ["Ada", "Tunde", "Bisi"]\nprint(members[1:10])',
        language: 'python',
        options: [
          { text: "['Tunde', 'Bisi']" },
          { text: 'IndexError', why: 'Slices never raise IndexError; they stop at the end.' },
          { text: "['Tunde']", why: 'It runs to the end of the list.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Only read the position if it exists.',
        language: 'python',
        template: 'if position [[1]] len(members):\n    print(members[position])',
        blanks: [['<']],
        distractors: ['<=', '=='],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'The error said line 7. But the real mistake was writing 11 weeks ago.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Exactly. The traceback tells you where it crashed; the cause is often an assumption made earlier.' },
          { text: 'Then the error is wrong.', why: 'It\'s right about where. Why is your job.' },
          { text: 'Ignore line numbers.', why: 'They\'re where to start looking.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list has 11 items. What is the biggest valid positive position?',
        answers: ['10'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Ada\'s 11 was true when she wrote it. What assumption in your work or life was true once and quietly stopped being true?',
    starters: ['I assumed...', 'It stopped being true when...'],
  },
  deepen: {
    title: 'Empty lists and [-1]',
    summary: '[-1] is safe for any length except zero: [][-1] is still an IndexError. Check "if members:" first when the list might be empty.',
  },
  notes: 'IndexError: list index out of range (Python docs, Built-in Exceptions). Slices clip and never raise IndexError. Valid negative indices for length n are -1..-n.',
};

export default lesson;

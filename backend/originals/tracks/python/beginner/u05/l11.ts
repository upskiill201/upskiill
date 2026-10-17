import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 11 — Nested decisions: an if inside an if, and when to flatten it. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Nested decisions',
  summary: 'Some questions only make sense after another one. "Was it late?" only matters if someone has paid in full. Ada puts one decision inside another, and learns to keep the nesting shallow.',
  minutes: 12,
  outcomes: [
    'Put an if inside another if',
    'Read nested blocks by their indentation',
    'Flatten simple nesting with and',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Two questions, in order',
      beats: [
        { speaker: 'narrator', text: 'Ada\'s rules: first, has the member paid in full? If yes, then: did they pay on time? If not in full, the late question doesn\'t even matter yet.' },
        { speaker: 'arjun', text: '(on the call) That\'s a decision inside a decision. Indent the second if inside the first one\'s block: it only runs when the first is True.' },
        { speaker: 'ada', text: 'And if it gets three levels deep?' },
        { speaker: 'arjun', text: 'Then it\'s getting hard to read. Often you can flatten it with and. Two levels is fine; four is a warning sign.' },
      ],
      choice: {
        prompt: 'How should the tracker check "paid in full AND on time"?',
        options: [
          {
            text: 'Nest it: if paid in full, then inside it, if on time / else late.',
            outcome: 'It gives a different message for each case, and the late check only runs for full payments.',
            best: true,
          },
          {
            text: 'Check lateness first, for everyone.',
            outcome: 'Then people who paid nothing get told "on time". That\'s confusing.',
          },
          {
            text: 'Write two separate, unrelated ifs.',
            outcome: 'Someone who paid half on time gets "On time!" with no mention of the half.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'An if inside an if',
      caption: 'Try paid 30000 / day 24, then 30000 / day 27, then 10000.',
      code: 'SHARE = 30000\nPAY_DAY = 25\npaid = 30000\nday = 27\n\nif paid >= SHARE:\n    if day <= PAY_DAY:\n        print("Paid in full, on time")\n    else:\n        print("Paid in full, but late")\nelse:\n    print(f"Short by {SHARE - paid}")\n',
      challenge: 'Count the spaces before each print. Which block is each one in?',
    },
  ],
  apply: {
    scenario: 'Questions that depend on other questions.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'paid = 30000, day = 27. What does this print?',
        code: 'if paid >= 30000:\n    if day <= 25:\n        print("On time")\n    else:\n        print("Late")\nelse:\n    print("Short")',
        language: 'python',
        options: [
          { text: 'On time', why: '27 <= 25 is False.' },
          { text: 'Short', why: 'The outer condition is True.' },
          { text: 'Late' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'If paid in full: print On time or Late depending on day. Otherwise print Short',
        starter: 'SHARE = 30000\nPAY_DAY = 25\npaid = 30000\nday = 24\n',
        solution: 'SHARE = 30000\nPAY_DAY = 25\npaid = 30000\nday = 24\nif paid >= SHARE:\n    if day <= PAY_DAY:\n        print("On time")\n    else:\n        print("Late")\nelse:\n    print("Short")\n',
        hint: 'The inner if/else is indented 4 more spaces, inside the outer if.',
        checks: [{ message: 'Print On time', outputEquals: 'On time' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which message for each case? (nested as in the Try it card)',
        groups: ['On time', 'Late', 'Short'],
        items: [
          { text: 'paid 30000, day 20', group: 0 },
          { text: 'paid 30000, day 28', group: 1 },
          { text: 'paid 10000, day 20', group: 2 },
          { text: 'paid 10000, day 28', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The inner else belongs to the inner if. Which line is indented wrong?',
        language: 'python',
        lines: ['if paid >= 30000:', '    if day <= 25:', '        print("On time")', 'else:', '        print("Late")'],
        bug: 3,
        fix: '    else:',
        explanation: 'At the left margin, else pairs with the outer if. Indent it to match the inner if.',
      },
      {
        kind: 'writeCode',
        prompt: 'Flatten it: print Perfect if paid in full AND on time, with one if and and',
        starter: 'paid = 30000\nday = 25\n',
        solution: 'paid = 30000\nday = 25\nif paid >= 30000 and day <= 25:\n    print("Perfect")\n',
        hint: 'if paid >= 30000 and day <= 25:',
        checks: [
          { message: 'Print Perfect', outputEquals: 'Perfect' },
          { message: 'Use and', codeIncludes: ' and ' },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When is nesting better than one if with and?',
        options: [
          { text: 'Always', why: 'Deep nesting gets hard to read.' },
          { text: 'When each combination needs a different message' },
          { text: 'Never', why: 'It\'s the clearest way to give different answers per case.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the spaces to the level.',
        pairs: [
          ['0 spaces', 'Outside any if'],
          ['4 spaces', 'Inside the outer if'],
          ['8 spaces', 'Inside the inner if'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the nested decision.',
        language: 'python',
        lines: ['if paid >= 30000:', '    if day <= 25:', '        print("On time")', '    else:', '        print("Late")', 'else:', '    print("Short")'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My code is four ifs deep and I can\'t follow it.',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Flatten what you can with and, or check the "bad" cases first with elif. Deep nesting is a sign to simplify.' },
          { text: 'Add a fifth.', why: 'That makes it worse.' },
          { text: 'Remove the indentation.', why: 'Then Python can\'t tell the blocks apart.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many spaces in front of a print inside an if inside another if? (PEP 8 style)',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Some decisions only matter after another one ("if I get the job, then where will I live?"). What\'s a nested decision in your life?',
    starters: ['First I decide...', 'Then, only if...'],
  },
  deepen: {
    title: 'Flat is better than nested',
    summary: 'It\'s a line from the Zen of Python (import this). When you can say it with and, or an early elif, do.',
  },
  notes: 'Nested if statements; else binds to the if at the same indentation (Python Language Reference §8.1). Zen of Python (PEP 20): "Flat is better than nested."',
};

export default lesson;

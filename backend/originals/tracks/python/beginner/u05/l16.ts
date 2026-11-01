import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 16 — Reading decision code: trace which branch runs before running it. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Reading decision code',
  summary: 'The startup\'s app has a discount rule Arjun wrote two years ago. A customer complains they didn\'t get it. Ada traces the conditions by hand, branch by branch, and finds who\'s right.',
  minutes: 12,
  outcomes: [
    'Trace an if/elif/else chain by hand',
    'Find which branch a given input reaches',
    'Spot a branch that can never run',
  ],
  learn: [
    {
      kind: 'explore',
      title: "Arjun's discount rule",
      text: 'if months >= 12 gives 10% off. elif months >= 24 gives 20% off. else gives no discount. A loyal customer of 30 months gets only 10%, because the 20% branch can never run.',
      hotspots: [
        { phrase: 'if months >= 12', note: 'Checked first. 30 >= 12 is True, so this branch wins and everything below is skipped.' },
        { phrase: 'elif months >= 24', note: 'Only reached when months < 12. But then months can\'t be >= 24. This branch is unreachable: dead code.' },
        { phrase: 'else gives no discount', note: 'Runs for anyone under 12 months.' },
        { phrase: 'the 20% branch can never run', note: 'The fix: check the bigger threshold first: if months >= 24, then elif months >= 12.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Trace it, then run it',
      caption: 'Predict the output for 30 months before running. Then fix the order.',
      code: 'months = 30\n\nif months >= 12:\n    print("10% off")\nelif months >= 24:\n    print("20% off")\nelse:\n    print("No discount")\n',
      challenge: 'Swap the first two conditions so 30 months gets 20% off.',
    },
  ],
  apply: {
    scenario: 'Tracing Arjun\'s discount rule.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'months = 30. What does this print?',
        code: 'if months >= 12:\n    print("10%")\nelif months >= 24:\n    print("20%")\nelse:\n    print("0%")',
        language: 'python',
        options: [
          { text: '20%', why: 'The first True branch wins, and 30 >= 12.' },
          { text: '10%' },
          { text: '10% then 20%', why: 'Only one branch runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the order so 30 months prints 20% off',
        starter: 'months = 30\nif months >= 12:\n    print("10% off")\nelif months >= 24:\n    print("20% off")\nelse:\n    print("No discount")\n',
        solution: 'months = 30\nif months >= 24:\n    print("20% off")\nelif months >= 12:\n    print("10% off")\nelse:\n    print("No discount")\n',
        hint: 'Check the bigger threshold first.',
        checks: [{ message: 'Print 20% off', outputEquals: '20% off' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'With the FIXED order (>= 24, then >= 12, else), which discount?',
        groups: ['20%', '10%', 'None'],
        items: [
          { text: '30 months', group: 0 },
          { text: '24 months', group: 0 },
          { text: '15 months', group: 1 },
          { text: '6 months', group: 2 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which branch can never run?',
        language: 'python',
        lines: ['if paid > 0:', '    print("Something paid")', 'elif paid >= 30000:', '    print("Paid in full")', 'else:', '    print("Nothing")'],
        bug: 2,
        explanation: 'Any amount >= 30000 is also > 0, so the first branch always catches it first.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s "dead code"?',
        options: [
          { text: 'Code with a SyntaxError', why: 'Dead code runs fine; it just never gets reached.' },
          { text: 'Old code', why: 'Age has nothing to do with it.' },
          { text: 'Code that can never run, whatever the input' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Trace it: store which message prints for day = 28 in a variable called answer, then print answer',
        starter: '# if day <= 25: "On time" / elif day <= 28: "Grace" / else: "Late"\nday = 28\n',
        solution: '# if day <= 25: "On time" / elif day <= 28: "Grace" / else: "Late"\nday = 28\nif day <= 25:\n    answer = "On time"\nelif day <= 28:\n    answer = "Grace"\nelse:\n    answer = "Late"\nprint(answer)\n',
        hint: 'Write the chain, storing a string in answer in each branch.',
        checks: [
          { message: 'Print Grace', outputEquals: 'Grace' },
          { message: 'Store it in answer', expr: 'answer == "Grace"' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the steps for tracing a decision.',
        lines: ['Write down the input values', 'Check the first condition', 'If False, move to the next', 'Stop at the first True', 'That branch is the answer'],
      },
      {
        kind: 'matchPairs',
        prompt: 'months = 18 with the broken order (>= 12, then >= 24). Match the line to what happens.',
        pairs: [
          ['if months >= 12:', 'True: this runs'],
          ['elif months >= 24:', 'Never checked'],
          ['else:', 'Skipped'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'So the customer was right? My code was wrong for two years?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, but only for customers over 24 months, and it\'s a two-line fix. Let\'s swap the order and test every threshold.' },
          { text: 'No, the customer is confused.', why: 'Tracing shows the 20% branch can never run.' },
          { text: 'Delete the discount.', why: 'Fix the order instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In an if/elif chain, does Python stop at the first True or check them all? (first / all)',
        answers: ['first', 'the first', 'first true'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Tracing by hand found a bug that ran for two years. What decision in your work has never been checked against its edge cases?',
    starters: ['We\'ve never checked...', 'An edge case would be...'],
  },
  deepen: {
    title: 'Biggest first',
    summary: 'For "at least" thresholds (>=), check the biggest first. For "at most" thresholds (<=), check the smallest first. Write the rule down at the top of the chain.',
  },
  notes: 'First true branch wins in if/elif (Python Language Reference §8.1). Unreachable branches ("dead code") arise when an earlier condition is a superset of a later one. The discount rule is a fictional example from Arjun\'s client work.',
};

export default lesson;

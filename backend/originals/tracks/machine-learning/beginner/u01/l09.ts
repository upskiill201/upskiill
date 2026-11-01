import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — Your first model: the sticky-note rule as Python if-statements. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Your first model: if-statements',
  summary: 'Miracle: "Let\'s put your sticky note into code." Five lines of Python, and Halima\'s rule can check any patient in a blink. It\'s a model written by hand, and it\'s where every ML project should start.',
  minutes: 12,
  outcomes: [
    'Read a rule written as a Python if-statement',
    'Change the inputs and predict the output',
    'Add a new clue to the rule',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Here is Halima\'s rule in Python. You don\'t need to know Python yet: read it out loud and it says what it does.</p><pre><code>wait_days = 21\nreminder = False\n\nif wait_days &gt; 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")</code></pre><ul><li><code>wait_days = 21</code> stores a feature in a <strong>variable</strong>, a named box.</li><li><code>reminder = False</code>: <code>True</code> means a reminder was sent, <code>False</code> means it wasn\'t.</li><li><code>if ... and not reminder:</code> checks both parts of the rule. The indented line runs only if both are true.</li><li><code>else:</code> covers every other patient.</li></ul><p>Change the numbers at the top and the prediction changes. That\'s the whole model. (Chapter 2 covers the Python you need properly.)</p>',
    },
    {
      kind: 'tryIt',
      title: 'Halima\'s model',
      caption: 'Change wait_days and reminder, then run it again.',
      code: 'wait_days = 21\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
      challenge: 'Try Ireti: wait_days = 18, reminder = True. What does it predict?',
    },
  ],
  apply: {
    scenario: 'The rule as code.',
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'wait_days = 25\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")',
        language: 'python',
        options: [
          { text: 'Likely to come', why: '25 > 14 and no reminder: both parts true.' },
          { text: 'Likely to miss' },
          { text: 'Nothing', why: 'One of the two print lines always runs.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'wait_days = 20\nreminder = True\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")',
        language: 'python',
        options: [
          { text: 'Likely to miss', why: 'A reminder was sent, so "not reminder" is False.' },
          { text: 'An error', why: 'It runs fine.' },
          { text: 'Likely to come' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Change wait_days to 25 so the model predicts "Likely to miss"',
        starter: 'wait_days = 3\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        solution: 'wait_days = 25\nreminder = False\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'Only the first line changes: wait_days = 25',
        checks: [
          { message: 'Print Likely to miss', outputEquals: 'Likely to miss' },
          { message: 'wait_days is 25', expr: 'wait_days == 25' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        language: 'python',
        template: 'if wait_days [[1]] 14 [[2]] not reminder:\n    print("Likely to miss")',
        blanks: [['>'], ['and']],
        distractors: ['<', 'or'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to what it does.',
        pairs: [
          ['wait_days = 21', 'Stores a feature'],
          ['if ... :', 'Checks the rule'],
          ['else:', 'Every other patient'],
          ['print("Likely to miss")', 'Shows the prediction'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Obi: 9 days, no reminder, 14 km. He missed. Add "or distance_km > 12" to the rule so it predicts a miss for him',
        starter: 'wait_days = 9\nreminder = False\ndistance_km = 14\n\nif wait_days > 14 and not reminder:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        solution: 'wait_days = 9\nreminder = False\ndistance_km = 14\n\nif (wait_days > 14 and not reminder) or distance_km > 12:\n    print("Likely to miss")\nelse:\n    print("Likely to come")\n',
        hint: 'if (wait_days > 14 and not reminder) or distance_km > 12:',
        checks: [
          { message: 'Print Likely to miss for Obi', outputEquals: 'Likely to miss' },
          { message: 'Use the distance clue', codeIncludes: 'distance_km >' },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the model in order.',
        language: 'python',
        lines: ['wait_days = 16', 'reminder = False', 'if wait_days > 14 and not reminder:', '    print("Likely to miss")', 'else:', '    print("Likely to come")'],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'This is just if-statements. That\'s not machine learning.',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Right: it\'s a rule Halima found by hand. It\'s our starting point. Every learned model has to beat it, or it isn\'t worth using.' },
          { text: 'It is machine learning.', why: 'The rule was written by a person, so the computer didn\'t learn it.' },
          { text: 'Then let\'s delete it.', why: 'A simple hand-made rule is the yardstick for everything that comes next.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'With the rule "wait > 14 and no reminder", what does it predict?',
        groups: ['Likely to miss', 'Likely to come'],
        items: [
          { text: 'wait_days = 30, reminder = False', group: 0 },
          { text: 'wait_days = 30, reminder = True', group: 1 },
          { text: 'wait_days = 10, reminder = False', group: 1 },
          { text: 'wait_days = 15, reminder = False', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Python, which word means "no reminder was sent": True or False?',
        answers: ['False'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'The rule was written by Halima, not learned. Why might it still be worth keeping, even when we have a "real" model later?',
    starters: ['It\'s worth keeping because...', 'A real model should...'],
  },
  deepen: {
    title: 'Start simple',
    summary: 'Experienced teams often begin with a simple rule like this one, because any model that can\'t beat it isn\'t worth using. You\'ll call it a baseline in Chapter 7.',
  },
  notes: 'Python if/and/not/else (Python tutorial §4.1). With "or distance_km > 12" the rule fits all 12 notebook patients (Chioma is exactly 12 km, already caught by the first part; Sani 15 km and Obi 14 km missed). Lesson 20 tests it on new patients.',
};

export default lesson;

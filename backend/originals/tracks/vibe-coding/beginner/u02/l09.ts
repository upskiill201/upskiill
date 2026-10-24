import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Reading: reading a plan before you say yes. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Read the plan before you say yes',
  summary: 'The calculator plan looks great. Ruth reads it over Hazel\'s shoulder and finds three problems in thirty seconds. Here\'s how she reads a plan, and the four things she always looks for.',
  minutes: 12,
  outcomes: [
    'Read a plan against your brief',
    'Spot extras, missing pieces and risky steps',
    'Ask for changes to the plan in one message',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Ruth\'s four questions for any plan',
      html:
        '<p>Ruth spent 32 years reviewing other people\'s plans. She reads every one with four questions:</p>' +
        '<ol><li><strong>Is everything in my brief here?</strong> Each part of the goal and the "done when" should have a step.</li>' +
        '<li><strong>Is anything here that I didn\'t ask for?</strong> Extra features, extra pages, "while I\'m at it" improvements.</li>' +
        '<li><strong>Which files does it touch?</strong> If it plans to change a file your limits protect, stop it.</li>' +
        '<li><strong>Is any step risky?</strong> Deleting, installing new things, anything with real money or real people\'s details.</li></ol>' +
        '<p>Here\'s the plan Ruth read:</p>' +
        '<p><em>1. Create gigs.html with inputs for hours and miles. 2. Work out the fee: $400 first hour, $150 each extra hour, $2 per mile outside the city. 3. Restyle index.html to match. 4. Install a date-picker package. 5. Show the total.</em></p>' +
        '<p>Her notes: <strong>Missing:</strong> the brief said "done when the 3-hour example shows $700", and no step checks it. <strong>Extra:</strong> step 3 changes index.html, which the limits protect. <strong>Risky:</strong> step 4 installs a package nobody asked for.</p>' +
        '<p>One message fixed all three: "Remove steps 3 and 4. Add a last step: check that 3 hours and 0 miles shows $700. Keep the rest."</p>',
    },
    {
      kind: 'check',
      question: 'Step 3 restyles index.html, but the brief says don\'t touch it. Which of Ruth\'s questions catches that?',
      options: ['Is everything here?', 'Which files does it touch?', 'Is any step risky?'],
      answer: 1,
      explanation: 'Files touched vs the limits in your brief.',
    },
  ],
  apply: {
    scenario: 'Reading the calculator plan.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match Ruth\'s question to what it catches.',
        pairs: [
          ['Is everything here?', 'A missing "done when" check'],
          ['Anything I didn\'t ask for?', 'An extra feature'],
          ['Which files?', 'Touching a protected file'],
          ['Anything risky?', 'Installing an unknown package'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Brief: "Thermometer bar only. Don\'t touch index.html." Which plan step is wrong?',
        lines: [
          '1. Add a bar to thermometer.html',
          '2. Fill it based on the total',
          '3. Add the same bar to index.html',
          '4. Check: $9,000 fills it halfway',
        ],
        bug: 2,
        fix: 'Remove step 3.',
        explanation: 'index.html is protected by the brief\'s limits.',
      },
      {
        kind: 'mcq',
        prompt: 'A plan has no step that checks the "done when". What should Hazel ask?',
        options: [
          { text: 'Nothing, it\'s probably fine', why: 'Then "done" is just its word.' },
          { text: 'Start over', why: 'Just add a step.' },
          { text: 'Add a last step that checks the done-when, with real numbers' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Risky plan step, or normal?',
        groups: ['Risky: look closely', 'Normal'],
        items: [
          { text: 'Delete the old pledges file', group: 0 },
          { text: 'Add a heading', group: 1 },
          { text: 'Install a new package', group: 0 },
          { text: 'Show the total', group: 1 },
          { text: 'Email every parent automatically', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'The plan looks long and smart. Just say yes?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Long and smart isn\'t the same as right. Thirty seconds with Ruth\'s four questions first.' },
          { text: 'Yes, smart plans are always right.', why: 'Ruth found three problems in a smart-looking plan.' },
          { text: 'I\'ll read only the first step.', why: 'Problems hide in later steps too.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Three problems in the plan. Best way to ask for changes?',
        options: [
          { text: 'Three separate new chats', why: 'One clear message to the same session is simpler.' },
          { text: 'One message: "Remove steps 3 and 4. Add a check that 3 hours shows $700. Keep the rest."' },
          { text: '"Fix the plan"', why: 'Fix what? It doesn\'t know what Ruth found.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s second question.',
        template: 'Is anything here that I didn\'t [[1]] for?',
        blanks: [['ask']],
        distractors: ['pay', 'wish'],
      },
      {
        kind: 'typeAnswer',
        prompt: '4 hours, 10 miles outside the city. $400 first hour, $150 each extra, $2 a mile. Total? (Number only.)',
        answers: ['870', '$870'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'Review: why plan first at all?',
        options: [
          { text: 'A wrong plan takes seconds to fix; wrong code takes hours' },
          { text: 'Plans make the code longer', why: 'It\'s about catching mistakes early.' },
          { text: 'The AI can\'t code without one', why: 'It can. It just builds the wrong thing more often.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Ruth\'s plan-reading routine, in order.',
        lines: [
          'Put the brief next to the plan',
          'Tick each brief item that has a step',
          'Circle anything extra or risky',
          'Send one message with all the fixes',
          'Approve when it matches',
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of Ruth\'s four questions do you think you\'d forget most? Why?',
  },
  deepen: {
    title: 'On your computer: review a plan',
    summary: 'Ask Claude Code (in plan mode) for a plan for your next step. Read it with the four questions. Write down what you found, send one message with the fixes, then approve.',
  },
  notes: 'Plan review checklist; fee example consistent with lesson 8 (3h = $700; 4h + 10 mi = $400 + $450 + $20 = $870).',
};

export default lesson;

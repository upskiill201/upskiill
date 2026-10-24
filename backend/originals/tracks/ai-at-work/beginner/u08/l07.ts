import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 7 — diagrams and flowcharts from words. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Diagrams and flowcharts from words',
  summary: 'Ada needs a flowchart for "what happens when a payment fails". She describes it in words, and AI turns it into a diagram she can edit.',
  minutes: 12,
  outcomes: [
    'Describe a process clearly enough to diagram',
    'Ask AI for a diagram in an editable format',
    'Check the diagram matches reality',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'From words to a flowchart',
      html:
        '<p>Many AI assistants can turn a description into a diagram, or into text that a diagram tool can draw (for example, a format called Mermaid that many tools understand).</p>' +
        '<p>Ada describes it in plain steps:</p>' +
        '<ol>' +
        '<li>Payment fails.</li>' +
        '<li>App shows "try again" to the shopper.</li>' +
        '<li>If it fails twice, the app suggests cash and logs the error.</li>' +
        '<li>Support checks errors each morning.</li>' +
        '<li>If it\'s a bank problem, Ada contacts the bank.</li>' +
        '</ol>' +
        '<p>Then asks: <em>"Turn these steps into a simple flowchart with one decision diamond. Give it in a format I can paste into a diagram tool, and keep labels under five words."</em></p>' +
        '<p><strong>Then check it with the people who do the work.</strong> A neat diagram of the wrong process is worse than none.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write the steps and decisions in plain words, ask for an editable diagram with short labels, then check it with the people who do the work.',
    },
  ],
  apply: {
    scenario: 'Ada makes a "failed payment" flowchart.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the failed-payment steps.',
        lines: ['Payment fails', 'App shows "try again"', 'Fails twice: suggest cash, log error', 'Support checks errors each morning'],
      },
      {
        kind: 'mcq',
        prompt: 'What shape usually marks a decision in a flowchart?',
        options: [
          { text: 'A circle', why: 'Usually start or end.' },
          { text: 'A diamond' },
          { text: 'A star', why: 'Not a standard flowchart shape.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful diagram?',
        options: [
          { text: 'Draw a flowchart.', why: 'Of what?' },
          { text: 'Turn these 5 steps into a simple flowchart with one decision. Give it in a format I can paste into a diagram tool. Labels under five words.' },
          { text: 'Make a beautiful picture of payments.', why: 'Not a process diagram.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step or decision?',
        groups: ['Step', 'Decision'],
        items: [
          { text: 'App shows "try again"', group: 0 },
          { text: 'Did it fail twice?', group: 1 },
          { text: 'Support checks errors', group: 0 },
          { text: 'Is it a bank problem?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The flowchart looks great. Is that really how it works?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'The AI made it, so yes.', why: 'Check with the people who do it.' },
          { text: 'Roughly.', why: 'It should be checked.' },
          { text: 'I\'ve checked it with Tolu and our support lead; they corrected one step. Now it matches what really happens.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Ask for an [[1]] diagram, then [[2]] it with the people who do the work.',
        blanks: [['editable'], ['check']],
        distractors: ['framed', 'hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Which flowchart label is too long?',
        lines: [
          'Payment fails',
          'Show "try again"',
          'In the event that a second failure occurs, the application will recommend an alternative method',
          'Log the error',
        ],
        bug: 2,
        fix: 'Failed twice? Suggest cash',
        explanation: 'Labels should be under five words.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the flowchart shape to its meaning.',
        pairs: [
          ['Rectangle', 'A step'],
          ['Diamond', 'A decision'],
          ['Arrow', 'What happens next'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s rule: labels under how many words?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the decision question.',
        tiles: ['Did', 'it', 'fail', 'twice?'],
        distractors: ['maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good diagram habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Checking with the people who do it', group: 0 },
          { text: 'Trusting the AI version as is', group: 1 },
          { text: 'One decision per diamond', group: 0 },
          { text: 'Thirty boxes on one slide', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a neat diagram of the wrong process dangerous?',
        options: [
          { text: 'It looks trustworthy, so people follow it' },
          { text: 'It isn\'t dangerous', why: 'People act on it.' },
          { text: 'It uses too much colour', why: 'It\'s about accuracy.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What process at work has no diagram? Write its steps and decisions in plain words.',
    starters: ['The process:', 'Step 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Describe one process in 5 steps and ask AI for an editable flowchart. Check it with a colleague.' },
  notes: 'Mermaid is an open-source text-to-diagram format supported by many tools. Process fictional.',
};

export default lesson;

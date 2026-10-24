import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 4 — ask it to show its working. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Ask it to show its working',
  summary: 'An answer with its steps and assumptions laid out is much easier to check than a bare conclusion. Ask for the working, then check the weakest step.',
  minutes: 12,
  outcomes: [
    'Ask AI to show steps, assumptions and sources',
    'Find the weakest step in an answer',
    'Separate what the AI knows from what it assumed',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'How many support staff for the Ghana launch?',
      before: {
        label: 'Bare answer',
        text: '"You will need 6 support staff."',
      },
      after: {
        label: 'Answer with working',
        text: '"Assumptions (please check): 5,000 users in month one (you didn\'t give a number, so I guessed); 1 in 10 contacts support each month; one agent handles 100 tickets a month.\nSteps: 5,000 x 10% = 500 tickets. 500 / 100 = 5 agents, plus 1 for leave = 6.\nWeakest point: the 5,000 users. If it\'s 2,000, you need 3."',
      },
      notes: [
        'The bare answer can\'t be checked. The working can.',
        'The AI admits it guessed the user number: that\'s the step to fix.',
        'Change one assumption and you can redo the answer yourself.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: "Show your steps, list your assumptions, and tell me the weakest point." Then check that point first.',
    },
  ],
  apply: {
    scenario: 'Ada is estimating support staff for Lucía\'s launch.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is the answer with working better?',
        options: [
          { text: 'It\'s longer, so it\'s more accurate', why: 'Length doesn\'t make it right; checkability does.' },
          { text: 'You can check each step and fix the wrong assumption' },
          { text: 'It gives a different number', why: 'Same number, but now you can check it.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s follow-up request.',
        tiles: ['Show', 'your', 'steps', 'and', 'list', 'your', 'assumptions'],
        distractors: ['quickly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the example, how many users did the AI guess for month one?',
        answers: ['5000', '5,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Known fact or assumption?',
        groups: ['From Ada', 'Assumed by the AI'],
        items: [
          { text: 'The launch is in Ghana', group: 0 },
          { text: '5,000 users in month one', group: 1 },
          { text: '1 in 10 users contact support', group: 1 },
          { text: 'Support is open weekdays only', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step should Ada check first?',
        lines: [
          'Users in month one: 5,000 (guessed)',
          'Contact rate: 10% (typical)',
          'Tickets: 5,000 x 10% = 500',
          'Agents: 500 / 100 = 5',
        ],
        bug: 0,
        fix: 'Replace it with the real forecast from Lucía.',
        explanation: 'The AI says it guessed this, and everything after depends on it.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'We forecast 2,000 users in month one, not 5,000.',
        prompt: 'With the same working, how many agents (before leave cover)?',
        options: [
          { text: '5', why: 'That was with 5,000 users.' },
          { text: '20', why: '2,000 x 10% = 200 tickets; 200 / 100 = 2.' },
          { text: '2' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'Show your [[1]], list your [[2]], and tell me the [[3]] point.',
        blanks: [['steps'], ['assumptions'], ['weakest']],
        distractors: ['feelings', 'strongest', 'jokes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the working to its use.',
        pairs: [
          ['Assumptions', 'Where guesses hide'],
          ['Steps', 'Where maths can be checked'],
          ['Weakest point', 'What to check first'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most checkable answer?',
        options: [
          { text: 'How many staff do we need?', why: 'Invites a bare number.' },
          { text: 'How many staff do we need? Show your steps, list assumptions separately from facts I gave you, and say which assumption matters most.' },
          { text: 'Give me a big enough number to be safe.', why: 'Not checkable at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada uses the working.',
        lines: ['Ask for steps and assumptions', 'Find the weakest assumption', 'Replace it with a real number', 'Redo the calculation'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to check, or hard to check?',
        groups: ['Easy to check', 'Hard to check'],
        items: [
          { text: '"500 / 100 = 5"', group: 0 },
          { text: '"You will need about 6."', group: 1 },
          { text: '"Assumption: 10% contact support"', group: 0 },
          { text: '"Experts agree this is right."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does showing working make the AI correct?',
        options: [
          { text: 'No, but it shows you where it might be wrong' },
          { text: 'Yes, always', why: 'Steps can still be wrong; now you can see them.' },
          { text: 'It makes it slower and worse', why: 'It makes checking much easier.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a recent AI answer you used. What assumption might it have made without telling you?',
    starters: ['The answer was...', 'It probably assumed...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you ask for an estimate, add "show your steps and list your assumptions". Check the weakest one.' },
  notes: 'All figures are fictional. Asking for reasoning and assumptions does not guarantee correctness, but makes errors easier to spot.',
};

export default lesson;

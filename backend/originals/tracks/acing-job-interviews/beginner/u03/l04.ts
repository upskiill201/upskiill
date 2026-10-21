import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Before/After: vague vs STAR with numbers. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Vague vs specific',
  summary: 'The hackathon story, twice. Once vague, once in STAR with numbers. Remi can hear which one an interviewer could actually score.',
  minutes: 11,
  outcomes: [
    'Turn a vague story into a specific one',
    'Use numbers to make results concrete',
    'Use "I" for your actions',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The hackathon, two ways',
      before: {
        label: 'Vague',
        text: '"At a hackathon our demo kind of crashed, which was bad, but we learned a lot as a team and it was a good experience overall."',
      },
      after: {
        label: 'Specific (STAR)',
        text: 'S: "At a hackathon in Kigali, our app crashed three minutes into the final demo."\nT: "I\'d built the part that failed."\nA: "I told the judges honestly what broke, showed screenshots of it working, and that night I tested it on five cheap phones and found a memory bug."\nR: "We didn\'t place, but two judges asked for our contacts. Since then I test on real low-end phones before every demo."',
      },
      notes: [
        'Numbers ("three minutes", "five phones") make it real and memorable.',
        '"I" for your actions; "we" only for what the team did together.',
        'A failure story is strong when the action and the lesson are clear.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Add numbers, say "I" for your actions, and end failure stories with what you changed.',
    },
  ],
  apply: {
    scenario: 'The hackathon.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Vague or specific?',
        groups: ['Vague', 'Specific'],
        items: [
          { text: '"It kind of crashed."', group: 0 },
          { text: '"Three minutes into the final demo."', group: 1 },
          { text: '"We learned a lot."', group: 0 },
          { text: '"I tested it on five cheap phones."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say "I" instead of "we" for actions?',
        options: [
          { text: 'The interviewer is assessing you, so they need to hear what you did' },
          { text: 'To take credit for the team', why: 'Use "we" for team work, "I" for yours.' },
          { text: 'It doesn\'t matter', why: 'Your actions are what\'s scored.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On how many cheap phones did Remi test the app?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its STAR part.',
        pairs: [
          ['"Crashed three minutes into the demo."', 'Situation'],
          ['"I\'d built the part that failed."', 'Task'],
          ['"I found a memory bug."', 'Action'],
          ['"I test on real phones before every demo."', 'Result and learning'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'We didn\'t even win. Is it a good story?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes. Failure stories aren\'t about winning. They show honesty, what you did next and what you changed. Yours has all three.' },
          { text: 'No, only tell winning stories.', why: 'Failure questions are common.' },
          { text: 'Say you won.', why: 'Never change the facts.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Say "[[1]]" for your actions; "[[2]]" for what the team did together.',
        blanks: [['I'], ['we']],
        distractors: ['they', 'you'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a failure story strong?',
        options: [
          { text: 'Clear actions and a real change you made afterwards' },
          { text: 'Blaming someone else', why: 'Ownership matters.' },
          { text: 'Making the failure sound small', why: 'Honesty works better.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens the hackathon story?',
        lines: [
          'Our app crashed three minutes into the final demo.',
          'Honestly, it was mostly my teammate\'s fault.',
          'That night I tested on five cheap phones.',
          'Now I test on real phones before every demo.',
        ],
        bug: 1,
        fix: 'I\'d built the part that failed.',
        explanation: 'Blaming others undoes a failure story.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many judges asked for their contacts?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to sharpen a vague story.',
        lines: ['Write it in STAR', 'Add numbers', 'Change "we" to "I" for your actions', 'Add what you changed'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite one vague story from your life with numbers and "I" for your actions.',
    starters: ['Before:...', 'After:...'],
  },
  deepen: {
    title: 'Results don\'t have to be huge',
    summary: 'Honest small results ("two days early", "120 users") are better than big vague ones. Interviewers trust specifics.',
  },
  notes: 'Fictional hackathon in Kigali (CAST: Remi and Ada met at a Kigali hackathon). Advice on "I" vs "we" and numbers is common STAR coaching.',
};

export default lesson;

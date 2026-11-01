import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 2, plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the booster meeting',
  summary: 'Thursday, the school library. Eleven parents, one projector. Ruth asks Hazel to brief the AI live, in front of everyone. Show what you know about briefs, examples and plans.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a brief under pressure', 'Catch a bad plan before it builds'],
  learn: [
    {
      kind: 'story',
      title: 'The library, 6 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The booster club. Folding chairs, a tray of pralines, eleven parents who\'ve heard "the app" mentioned twice.' },
        { speaker: 'ruth', text: 'Hazel\'s going to show us how she tells the computer what to build. Live.' },
        { speaker: 'hazel', text: '(quietly) No pressure.' },
        { speaker: 'tey', text: 'Brief card in hand. Help her through it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: live in front of the booster club.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the brief part to Hazel\'s line.',
        pairs: [
          ['Goal', 'A page showing pledges toward $18,000'],
          ['Context', 'Ruth enters them on her laptop'],
          ['Limits', 'One file, don\'t touch index.html'],
          ['Done when', 'Three pledges total correctly'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'A parent shouts: "Make it show who gave the most!" Best way to add it?',
        options: [
          { text: 'Add a leaderboard and badges and a shop', why: 'One idea became three.' },
          { text: 'Under the total, show the three biggest pledges, like "Crescent Bakery · $200". Keep everything else the same.' },
          { text: 'Make it competitive', why: 'Vague: it will guess.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The plan on the projector. Which step goes beyond the brief?',
        lines: [
          '1. Create thermometer.html',
          '2. Form: name and amount',
          '3. Add a login page for every parent',
          '4. Show the total and the amount to go',
        ],
        bug: 2,
        fix: 'No login: Ruth is the only user.',
        explanation: 'The brief says one user. A login is a whole extra feature.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Why didn\'t you just let it build straight away?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'I was scared.', why: 'It\'s a method, not fear.' },
          { text: 'So I could catch steps like that login before it wrote any code.' },
          { text: 'The AI told me to.', why: 'Hazel chose to plan first.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Vague or clear?',
        groups: ['Vague', 'Clear'],
        items: [
          { text: 'Make it look professional', group: 0 },
          { text: 'Total: $1,200 of $18,000 · $16,800 to go', group: 1 },
          { text: 'Do everything for the band', group: 0 },
          { text: 'Newest pledge at the top', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s closing line on the projector.',
        template: 'Plan [[1]]. Don\'t write any code yet.',
        blanks: [['first']],
        distractors: ['later', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Raised $3,500. Goal $18,000. How much to go? (Number only.)',
        answers: ['14500', '14,500', '$14,500', '$14500'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        prompt: 'Which done-when could a parent actually check?',
        options: [
          { text: 'It works well', why: 'What does "well" look like?' },
          { text: 'Everyone likes it', why: 'Hard to test on a Thursday.' },
          { text: 'Adding $50 and $200 shows a total of $250 and $17,750 to go' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s live demo, in order.',
        lines: [
          'cd hazel-site, then claude',
          'Shift+Tab into plan mode',
          'Paste the brief card',
          'Fix the login step',
          'Approve and watch it build',
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Can I add the fan wall to the brief while she\'s up there?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'It goes on the later list. Tonight is pledges.' },
          { text: 'Yes, add everything!', why: 'That\'s the 14-file mess again.' },
          { text: 'No ideas allowed.', why: 'Ideas are welcome. On the later list.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: what should Hazel do when the page appears?',
        options: [
          { text: 'Trust the "Done!" message', why: '"Done" is a claim.' },
          { text: 'Open it and test it with three pledges, in front of everyone' },
          { text: 'Close the laptop quickly', why: 'Show it. That\'s the point.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Could you explain your own project\'s brief to a room of strangers in 30 seconds? Try saying it out loud now.',
  },
  deepen: {
    title: 'On your computer: approve your plan',
    summary: 'Go back to the plan from lesson 4. Make sure every step matches your brief, then approve it (keep approving edits yourself) and let it build. Test the result against your "done when".',
  },
  notes: 'Review of Chapter 2 lessons 1–4 and Chapter 1.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Explain cards: the last week and the big day. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The last week and the big day',
  summary: 'Carmen hands Lucía a plan for the final days, and a short list for the morning itself. No new slides allowed.',
  minutes: 12,
  outcomes: [
    'Plan your final rehearsals',
    'Prepare the practical details',
    'Have a simple morning routine',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>The last week is for practice, not new content. Carmen\'s plan:</p><table><tr><th>When</th><th>What</th></tr><tr><td><strong>5 days before</strong></td><td>Freeze the slides. No new ones after today.</td></tr><tr><td><strong>4 days before</strong></td><td>Full run-through, recorded. Self-check, pick one fix.</td></tr><tr><td><strong>3 days before</strong></td><td>Q&A drill: the team fires the ten dreaded questions.</td></tr><tr><td><strong>2 days before</strong></td><td>Run the open and close five times each. Those matter most.</td></tr><tr><td><strong>1 day before</strong></td><td>One easy run-through. Check the room, clicker and microphone. Sleep.</td></tr></table><p><strong>The morning:</strong> eat something, arrive early, test the clicker, find water, walk the stage once. Backstage: "I am excited", then the first line. Then go.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Freeze the slides, rehearse the open and close most, drill questions, check the room, then rest.',
    },
  ],
  apply: {
    scenario: 'The last week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Carmen\'s plan.',
        lines: ['Freeze the slides', 'Recorded run-through', 'Q&A drill', 'Open and close five times', 'Easy run and room check'],
      },
      {
        kind: 'mcq',
        prompt: 'Why rehearse the open and close the most?',
        options: [
          { text: 'They matter most: first impressions and what people remember' },
          { text: 'They\'re the longest parts', why: 'They\'re the most important.' },
          { text: 'They don\'t matter', why: 'They matter most.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good last-week move or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Freezing the slides five days out', group: 0 },
          { text: 'Adding ten new slides the night before', group: 1 },
          { text: 'Checking the clicker the day before', group: 0 },
          { text: 'Rehearsing until 2 a.m. the night before', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days before should the slides be frozen?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the day to the task.',
        pairs: [
          ['3 days before', 'Q&A drill'],
          ['2 days before', 'Open and close five times'],
          ['1 day before', 'Room, clicker, microphone'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I just had a great idea for a new slide. It\'s two days before.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'Add it, and three more.', why: 'Slides are frozen.' },
          { text: 'Redo the whole talk.', why: 'Freeze means freeze.' },
          { text: 'Write it down for the follow-up email. Slides are frozen. New slides now mean new nerves.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The morning.',
        template: 'Arrive [[1]], test the clicker, walk the [[2]] once.',
        blanks: [['early'], ['stage']],
        distractors: ['late', 'street'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the last thing Lucía says to herself backstage?',
        options: [
          { text: 'Her whole script', why: 'Just the first line.' },
          { text: 'Her first line' },
          { text: '"Calm down"', why: '"I am excited", then the first line.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Tomás\'s last-week plan is the mistake?',
        lines: [
          'Freeze the slides on Monday.',
          'Drill questions on Wednesday.',
          'Rewrite the whole talk on Thursday night.',
          'Check the room on Thursday.',
        ],
        bug: 2,
        fix: 'One easy run-through, then sleep.',
        explanation: 'The last week is for practice, not new content.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many times should Lucía run the open and close two days before?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Write your own last-week plan for a talk or big meeting coming up.',
    starters: ['5 days before:...', 'The morning:...'],
  },
  deepen: {
    title: 'Sleep is rehearsal',
    summary: 'A tired brain finds words more slowly. One easy run and a proper night\'s sleep usually beat a late-night cram.',
  },
  notes: 'Final-week plan: practical presentation advice, not a study.',
};

export default lesson;

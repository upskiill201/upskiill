import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: headline first',
  summary: 'Headline first, 30 seconds, fillers and the rule of three. A quick check before Lucía learns to answer questions.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Lead with the headline', 'Use three points and fewer fillers'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday practice',
      beats: [
        { speaker: 'lucia', text: 'I recorded my 30 seconds on my phone. 41 seconds, four ums, three points.' },
        { speaker: 'diego', text: 'Last week it was four minutes and 23 ums. That\'s real progress.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: headline first.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a 30-second point.',
        lines: ['Headline', 'Why it matters', 'What you need', 'Stop'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best swap for "um" in a talk?',
        options: [
          { text: '"Like"', why: 'Another filler.' },
          { text: 'A silent pause' },
          { text: 'Talking faster', why: 'A pause.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Headline first, or buried?',
        groups: ['Headline first', 'Buried'],
        items: [
          { text: '"Sales are 38% above target. Three things..."', group: 0 },
          { text: '"So this week started with the agency..."', group: 1 },
          { text: '"I need a yes on the reorder by Thursday."', group: 0 },
          { text: '"Before I get to the point, some background..."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds did Lucía\'s recording take?',
        answers: ['41', 'forty-one', 'forty one'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I have nine updates for the team meeting. How do I fit them in?',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Pick three, say "three things", number them. Put the other six in a message after.' },
          { text: 'Say all nine as fast as you can.', why: 'Nobody will hold nine.' },
          { text: 'Skip the meeting.', why: 'Pick three.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Fillers.',
        template: 'Fillers signal [[1]]. Reduce them, don\'t [[2]] them.',
        blanks: [['thinking'], ['ban']],
        distractors: ['boredom', 'count'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its source.',
        pairs: [
          ['"Uh" and "um" are signals', 'Clark and Fox Tree (2002)'],
          ['About four chunks in working memory', 'Cowan (2001)'],
          ['"Lead with it"', 'Diego\'s note'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Tomás\'s update is the mistake?',
        lines: [
          'Three things today.',
          'First, the email went to 40,000 people.',
          'Second, um, um, so, basically, like, um, the opens.',
          'Third, I need two more days for the report.',
        ],
        bug: 2,
        fix: 'Second, 22% opened it.',
        explanation: 'He didn\'t know his line, so the fillers piled up.',
      },
      {
        kind: 'mcq',
        prompt: 'Why stop after your point?',
        options: [
          { text: 'To seem rude', why: 'It keeps the point strong.' },
          { text: 'Extra detail weakens it; silence invites questions' },
          { text: 'You shouldn\'t stop', why: 'Stopping helps.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many ums were in Lucía\'s recording?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Record your own 30-second point. How long did it take, and how many fillers?',
    starters: ['It took...', 'Fillers:...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. Fictional: Tomás\'s email to 40,000 people, 22% opened.',
};

export default lesson;

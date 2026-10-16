import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: one direction',
  summary: 'Day 48. Lucía asks the team again: "What\'s the most important thing this month?" Five people, one answer: "Chili-lime, June 17." Diego adds: "And my report is one page now. I\'ve never been happier." Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use goal, expectation and priority tools without notes', 'Connect them to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'Day 48, Monday stand-up',
      beats: [
        { speaker: 'lucia', text: 'Same question as last week. What\'s the most important thing this month?' },
        { speaker: 'narrator', text: 'All five, almost together: "Chili-lime, June 17." Tomás adds "and 5,000 pre-orders" a second late, and looks very proud of himself.' },
        { speaker: 'diego', text: 'And my report is one page now. I\'ve never been happier.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Day 48.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which goal does goal-setting research favour?',
        options: [
          { text: '"Do your best this summer"', why: 'No finish line.' },
          { text: '"5,000 pre-orders by July 1"' },
          { text: '"Sell a million bags by Friday"', why: 'Impossible goals make people give up.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the five expectation steps in order.',
        lines: ['The what', 'The why', 'What done looks like', 'By when, and how much freedom', 'Check understanding'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clarity or confusion?',
        groups: ['Clarity', 'Confusion'],
        items: [
          { text: 'One ranked top priority', group: 0 },
          { text: '"Everything is urgent"', group: 1 },
          { text: 'Describing done before work starts', group: 0 },
          { text: '"Make it better"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Should I also start on the autumn campaign? Just to get ahead?',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, start everything!', why: 'Starting ten beats finishing three? No.' },
          { text: 'Why would you even ask that?', why: 'Chapter 2: make it safe to ask.' },
          { text: 'Love the energy. Not yet: finish the test sends for June 17 first.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"___ three things beats starting ten." (one word)',
        answers: ['Finishing', 'finishing'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Diego\'s mood improve?',
        options: [
          { text: 'He stopped work nobody needed and could focus on what mattered' },
          { text: 'He got a raise', why: 'Not in this story.' },
          { text: 'He was told to work harder', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s Monday message. Which line breaks Chapter 2?',
        lines: [
          'Top priority: chili-lime, June 17.',
          'Anyone who misses a deadline gets named in the team chat.',
          'If something\'s blocking you, tell me early.',
        ],
        bug: 1,
        fix: 'If a deadline looks at risk, flag it early and we\'ll fix it together.',
        explanation: 'Public shaming kills psychological safety, and people start hiding problems again.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter?',
        pairs: [
          ['Early wins', 'Chapter 1'],
          ['Active listening', 'Chapter 2'],
          ['Stop-doing list', 'Chapter 3'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a goal need, besides being specific and challenging?',
        options: [
          { text: 'A very long document', why: 'Short is fine.' },
          { text: 'A reason why, and regular feedback on progress' },
          { text: 'Nothing else', why: 'Commitment and feedback matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'Clear [[1]]. Describe [[2]]. Rank [[3]].',
        blanks: [['goals', 'goal'], ['done'], ['priorities']],
        distractors: ['wishes', 'everything'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the team\'s answer.',
        tiles: ['Chili-lime,', 'June', '17.'],
        distractors: ['July'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of this chapter\'s tools would help you most right now: clear goals, describing done, or ranking priorities? Why?',
    starters: ['The one I need most is...', 'Because...'],
  },
  deepen: {
    title: 'Ask the question again',
    summary: 'If you did the one-question test last lesson, ask it again after you\'ve set a clear priority. See if the answers line up.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;

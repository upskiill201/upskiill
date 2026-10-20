import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 4 · Lesson 4 — the energy audit: what gives and drains energy. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The energy audit',
  summary: 'Paul\'s question has no answer yet. Miracle suggests Clinton gather data on himself first: two weeks noticing which work gives him energy and which drains it. The results surprise him.',
  minutes: 12,
  outcomes: ['Run a two-week energy audit', 'Find patterns in what you enjoy', 'Use the patterns to choose a direction'],
  learn: [
    {
      kind: 'steps',
      title: 'Two weeks of data on yourself',
      steps: [
        { title: '1. Each evening, two lines', body: 'Energy up: "Support call about drivers losing confirmations; I asked a lot of questions." Energy down: "Three hours debugging a flaky test."' },
        { title: '2. Note the kind of work', body: 'Talking to people? Solving puzzles? Deciding what to build? Writing? Clinton tags each line.' },
        { title: '3. After two weeks, count', body: 'Clinton\'s tags: "talking to users" 8 times up; "deciding what to build" 6 up; "deep debugging" 5 down; "writing code" mixed.' },
        { title: '4. Look for the surprise', body: 'He expected coding to win. Instead, his best moments were with support and in the design meeting. That\'s worth knowing.' },
        { title: '5. Test, don\'t jump', body: 'One audit isn\'t a verdict. Next step: try more of the energising work in small ways and see if the pattern holds.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Two weeks, two lines a day, tag the work, count, look for the surprise, then test it in small ways.',
    },
  ],
  apply: {
    scenario: 'Clinton runs his energy audit.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the audit in order.',
        lines: ['Two lines each evening', 'Tag the kind of work', 'Count after two weeks', 'Look for the surprise', 'Test it in small ways'],
      },
      {
        kind: 'mcq',
        prompt: 'What surprised Clinton?',
        options: [
          { text: 'His best moments were with users and deciding what to build, not coding' },
          { text: 'He hates everything', why: 'He found clear energy patterns.' },
          { text: 'Debugging was his favourite', why: 'Debugging drained him.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Energy up or down for Clinton?',
        groups: ['Up', 'Down'],
        items: [
          { text: 'Support calls about drivers', group: 0 },
          { text: 'Three hours on a flaky test', group: 1 },
          { text: 'The design meeting', group: 0 },
          { text: 'Deep debugging', group: 1 },
          { text: 'Deciding what to build', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that jumps too fast.',
        lines: ['Notices a pattern after two weeks.', 'Quits coding the next day.', 'Tries more product work in small ways.'],
        bug: 1,
        explanation: 'One audit isn\'t a verdict. Test first.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Writing code came out "mixed". Does that mean I\'m in the wrong job?',
        options: [
          { text: 'Not necessarily. It means I should test more of the user-facing work and see if the pattern holds.' },
          { text: 'Yes, quit today.', why: 'Test first.' },
          { text: 'Ignore the audit.', why: 'It\'s useful data.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its count.',
        pairs: [
          ['Talking to users', '8 times up'],
          ['Deciding what to build', '6 times up'],
          ['Deep debugging', '5 times down'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why tag the kind of work, not just the task?',
        options: [
          { text: 'Patterns show across different tasks' },
          { text: 'To fill time', why: 'To see patterns.' },
          { text: 'Tags are required', why: 'They reveal patterns.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Look for the [[1]], then [[2]] it in small ways.',
        blanks: [['surprise'], ['test']],
        distractors: ['excuse', 'ignore', 'quit'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks does the audit last? (a number)',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good audit habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Writing lines every evening', group: 0 },
          { text: 'Guessing at the end from memory', group: 1 },
          { text: 'Tagging the kind of work', group: 0 },
          { text: 'Only noting bad days', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Without an audit, what do you guess gives you most energy at work or study? What do you think drains you?',
    starters: ['Energy up:', 'Energy down:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a two-week energy audit tonight: one up, one down, with a tag for the kind of work.',
  },
  notes: 'Energy audits are a common career-coaching tool; similar to the "Good Time Journal" in Burnett & Evans, Designing Your Life (2016).',
};

export default lesson;

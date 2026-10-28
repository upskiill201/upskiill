import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Chapter Challenge: the thermometer. Build: a small tool of the learner's own. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the thermometer',
  summary: 'Saturday car wash fundraiser. Ruth wants to type pledges in as they arrive and show the crowd the thermometer climbing. Brief, interview, plan, one step at a time: get it built by noon.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Take a small tool from brief to working', 'Use plan mode, CLAUDE.md and step-by-step building together'],
  learn: [
    {
      kind: 'story',
      title: 'Car wash, 8 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Hoses, buckets, a hand-painted sign: CAR WASH $10 FOR D.C. Ruth sets up a folding table with Hazel\'s laptop.' },
        { speaker: 'ruth', text: 'I want to type each pledge and turn the screen to the street. By noon.' },
        { speaker: 'hazel', text: 'Brief card. Plan first. One step at a time.' },
        { speaker: 'tey', text: 'Everything from Chapter 2, on a deadline. Let\'s go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the car wash thermometer.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which brief does Hazel paste in?',
        options: [
          { text: 'Make a fundraising thermometer, make it fun', why: 'No context, limits or done-when.' },
          { text: 'Thermometer for the band with logins and a shop', why: 'Scope creep.' },
          { text: 'Goal: thermometer.html shows pledges toward $18,000 with a gold bar. Context: Ruth only, whole dollars. Limits: one file, no frameworks. Done when: $9,000 fills the bar halfway.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Hazel\'s morning, in order.',
        lines: [
          'Start claude in hazel-site',
          'Shift+Tab into plan mode',
          'Paste the brief and ask for a plan',
          'Read it with Ruth\'s four questions',
          'Approve, then build one step at a time',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'The plan. Which step breaks the brief?',
        lines: [
          '1. Form for name and amount',
          '2. Save pledges in the browser',
          '3. Gold bar that fills toward $18,000',
          '4. Install a charting framework for the bar',
        ],
        bug: 3,
        fix: 'Remove it: "no frameworks" is in the limits.',
        explanation: 'A plain HTML bar does the job. The limits said no frameworks.',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Step 2 is done, it says. How do we know?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'It said so.', why: '"Done" is a claim.' },
          { text: 'Let\'s add a pledge, refresh the page, and see if it\'s still there.' },
          { text: 'We\'ll find out at noon.', why: 'Check now, while it\'s one small step.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'House rule for CLAUDE.md, or one-off request?',
        groups: ['CLAUDE.md', 'One-off'],
        items: [
          { text: 'No frameworks', group: 0 },
          { text: 'Make this bar a little taller', group: 1 },
          { text: 'Money like $1,200', group: 0 },
          { text: 'Add a pledge from the Cajun Grill', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rhythm.',
        template: 'Do step 3 [[1]], then stop. I\'ll [[2]] it before step 4.',
        blanks: [['only'], ['check', 'test']],
        distractors: ['and 4', 'skip'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Raised $4,500 of $18,000. What fraction of the bar should be full? (e.g. half)',
        answers: ['a quarter', 'quarter', 'one quarter', '1/4', '25%', '25'],
        placeholder: 'Fraction',
      },
      {
        kind: 'mcq',
        prompt: 'A parent asks for "a donate button that takes cards". Best answer?',
        options: [
          { text: 'Add it now, quickly', why: 'Payments are a big, risky feature. Not on a deadline.' },
          { text: 'Ask the AI to just do it', why: 'Real money needs a real plan and checks.' },
          { text: 'Put it on the later list; today we show pledges' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to the job.',
        pairs: [
          ['Plan mode', 'Read and plan, no changes'],
          ['CLAUDE.md', 'House rules every session'],
          ['"Ask me questions first"', 'Find the gaps in a brief'],
          ['"Then stop"', 'One step at a time'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'It\'s working! Can we add confetti when it hits $18,000?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'One step: when the total reaches $18,000, show "WE\'RE GOING TO D.C.!" in big gold letters. Keep everything else the same.' },
          { text: 'Add confetti and fireworks and music.', why: 'Three things at once.' },
          { text: 'No fun allowed.', why: 'Fun is allowed. One step at a time.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: the screen faces the street. What must never be on it?',
        options: [
          { text: 'The total', why: 'That\'s the point of the screen.' },
          { text: 'Private details like phone numbers or addresses' },
          { text: 'The band\'s name', why: 'That\'s fine to show.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Hazel\'s done-when.',
        tiles: ['Done when:', '$9,000 fills the bar halfway', 'and "to go" says $9,000'],
        distractors: ['it looks fine', 'Benny likes it'],
      },
    ],
  },
  reflect: {
    prompt: 'Which Chapter 2 habit made the biggest difference for you: the brief, examples, plan mode, CLAUDE.md, questions, or one step at a time?',
  },
  deepen: {
    title: 'Build it: your small tool',
    summary: 'Build your own small tool (a tracker, a calculator, a countdown) from your brief.md: interview, plan mode, Ruth\'s four questions, then one step at a time with a check for each. When your done-when passes, Chapter 2 is shipped.',
  },
  notes: 'Chapter 2 review. $4,500 / $18,000 = 25%.',
};

export default lesson;

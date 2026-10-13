import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 16 — from "now I know" to "now I do": so-what, impact vs effort, owners and dates. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Turning summaries into next steps',
  summary: 'A summary you do not act on is just reading. Turn understanding into a short, ranked list of next steps.',
  minutes: 13,
  outcomes: [
    'Ask "so what for me?" after every summary',
    'Rank next steps by impact and effort',
    'Turn the top ones into real actions',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From summary to next steps',
      steps: [
        {
          title: 'Ask "so what for me?"',
          body: 'Give the AI your role and goal.',
          code: "Here is the research summary. I'm the designer on the sign-up flow, and our goal is more completed sign-ups before launch. What does this mean for my work? List possible next steps.",
          language: 'plaintext',
        },
        {
          title: 'Rank by impact and effort',
          body: 'Ask it to place each step on an impact/effort grid, then check the ranking with your own knowledge.',
          code: 'Rate each step: impact (high/low) and effort (high/low). Explain each rating in one line.',
          language: 'plaintext',
        },
        { title: 'Pick the quick wins first', body: 'High impact, low effort. Then plan the high impact, high effort ones. Question the rest.' },
        { title: 'Make them real actions', body: 'Owner, verb, deliverable, date. From Lesson 4.' },
      ],
    },
    {
      kind: 'reading',
      title: 'The impact/effort grid',
      html:
        '<table><thead><tr><th></th><th>Low effort</th><th>High effort</th></tr></thead><tbody>' +
        '<tr><td><strong>High impact</strong></td><td><strong>Quick wins:</strong> do these first</td><td><strong>Big bets:</strong> plan these properly</td></tr>' +
        '<tr><td><strong>Low impact</strong></td><td><strong>Fill-ins:</strong> only if there is spare time</td><td><strong>Time sinks:</strong> usually skip</td></tr>' +
        '</tbody></table>' +
        '<p>It is a simple tool, used in product teams everywhere, because it forces the question "is this worth it?".</p>' +
        '<p>A caution: the AI can only guess effort and impact from general knowledge. You know your team, your code and your users. Use its ratings as a first draft, then correct them.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'After any summary, ask: "So what does this mean for me, and what is the first step?"',
    },
    {
      kind: 'check',
      question: 'High impact, low effort steps are called...',
      options: ['Time sinks', 'Quick wins', 'Big bets'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is turning research into a plan.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Place each step on the grid.',
        groups: ['Quick win', 'Big bet', 'Time sink'],
        items: [
          { text: 'Make the error message bigger (1 hour, fixes the top complaint)', group: 0 },
          { text: 'Rebuild sign-up from scratch (6 weeks, big improvement)', group: 1 },
          { text: 'Redesign the footer nobody looks at (2 weeks, no impact)', group: 2 },
          { text: 'Move the Next button above the keyboard (2 hours, big fix)', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the summary-to-steps routine.',
        lines: ['Ask "so what for me?"', 'Rank by impact and effort', 'Pick quick wins first', 'Turn them into real actions'],
      },
      {
        kind: 'mcq',
        prompt: 'Why should Ada correct the AI\'s effort ratings?',
        options: [
          { text: 'She knows her team and codebase; the AI only guesses from general knowledge' },
          { text: 'The AI is always wrong', why: 'Its first draft is useful; it just lacks your context.' },
          { text: 'Ratings do not matter', why: 'They decide what gets done first.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "so what" question.',
        tiles: ['What', 'does', 'this', 'mean', 'for', 'my', 'work?'],
        distractors: ['nothing'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the grid square to what to do.',
        pairs: [
          ['Quick wins', 'Do first'],
          ['Big bets', 'Plan properly'],
          ['Fill-ins', 'Only with spare time'],
          ['Time sinks', 'Usually skip'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Our survey summary lists 12 improvements. Where do we even start?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Rate each on impact and effort, start with the quick wins, plan the big bets, and drop the time sinks.' },
          { text: 'Do all 12 at once.', why: 'Nothing finishes that way.' },
          { text: 'Start with the easiest, whatever the impact.', why: 'Easy but useless is a fill-in.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: "I'm the [[1]] on sign-up; our goal is more completed sign-ups. What does this mean for my work? Rate each step on [[2]] and [[3]].",
        blanks: [['designer'], ['impact'], ['effort']],
        distractors: ['astronaut', 'colour', 'mood'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step that is probably a time sink.',
        lines: ['Bigger error message: 1 hour, top complaint.', 'Move Next button: 2 hours, big fix.', 'Animate the footer logo: 2 weeks, nobody asked.'],
        bug: 2,
        explanation: 'High effort, low impact. Skip it or park it.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'High impact, high effort steps are big ... (one word)',
        answers: ['bets', 'bet'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns a summary into the most useful plan?',
        options: [
          { text: 'What should we do?', why: 'No role, no goal, no ranking.' },
          { text: "I'm the designer; our goal is more completed sign-ups before launch. List next steps from this summary, rated impact and effort, quick wins first." },
          { text: 'List everything we could ever do.', why: 'A wish list, not a plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Next step ready to go, or still vague?',
        groups: ['Ready', 'Vague'],
        items: [
          { text: 'Ada: enlarge the error message, Wednesday', group: 0 },
          { text: 'Improve sign-up somehow', group: 1 },
          { text: 'Grace: move the Next button, Thursday', group: 0 },
          { text: 'Look into user feedback', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI rated 'add a progress bar' as low effort, but your developers say it's two weeks.",
        prompt: 'What should Ada do?',
        options: [
          { text: "Trust the developers, move it to 'big bet' (or time sink), and re-rank." },
          { text: 'Trust the AI.', why: 'The team knows their effort; the AI guessed.' },
          { text: 'Drop the grid.', why: 'Correct it; the grid still helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary you do not act on is just ... (one word)',
        answers: ['reading'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Ada\'s example.',
        pairs: [
          ['So what for me?', '"I\'m the designer on sign-up"'],
          ['Rank', '"Impact high, effort low"'],
          ['Real action', '"Ada: bigger error text, Wed"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give the AI your role and goal before asking for next steps?',
        options: [
          { text: 'So the steps are about your work, not generic advice' },
          { text: 'It is polite', why: 'It is about relevance.' },
          { text: 'No reason', why: 'Without them you get generic steps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take something you read or learned this week. What is one quick win it suggests for your work?',
    starters: ['I learned...', 'My quick win:'],
  },
  deepen: { title: 'Try it today', summary: 'Put your current to-do list on an impact/effort grid. What is your best quick win?' },
  notes: 'Impact/effort matrix is a common prioritisation tool. Effort estimates are fictional.',
};

export default lesson;

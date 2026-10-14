import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 12 — big tasks: outline first, then build piece by piece. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Break a big task into steps',
  summary: 'Ask for everything at once and you get a bit of everything. Ask in steps and you get something good.',
  minutes: 13,
  outcomes: [
    'Spot a request that is too big for one go',
    'Ask for an outline first, then build it section by section',
    'Check each step before moving to the next',
  ],
  learn: [
    {
      kind: 'steps',
      title: "Ada's launch plan, in steps",
      steps: [
        {
          title: 'Ask for the outline only',
          body: '"Outline a one-page launch plan for our new sign-up flow. Just the section headings, nothing else yet."',
        },
        {
          title: 'Fix the outline',
          body: 'Remove what you do not need, add what is missing. "Drop Budget, add Who to tell, keep the rest." Cheap to change now.',
        },
        {
          title: 'Fill one section at a time',
          body: '"Now write the Timeline section: launch on the 14th, testing ends on the 10th, 5 bullets max."',
        },
        {
          title: 'Review, then put it together',
          body: '"Read the whole plan as my manager would. What is unclear or missing?" Then fix and combine.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'All at once vs in steps',
      before: { label: 'All at once', text: 'Write our complete launch plan with timeline, risks, messaging, budget and team roles.' },
      after: { label: 'In steps', text: 'Step 1: outline. Step 2: fix the outline. Step 3: write each section with its real facts. Step 4: review as my manager.' },
      notes: [
        'All at once: shallow everywhere, and you find problems at the end.',
        'In steps: each part gets its own facts and attention.',
        'Mistakes get caught early, when they are cheap to fix.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'If a request has the word "and" in it more than twice, it is probably several requests.',
    },
    {
      kind: 'check',
      question: 'What should Ada ask for first when the task is big?',
      options: ['The finished document', 'An outline', 'A title'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is splitting big jobs into steps.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What usually happens when you ask for a big task in one go?',
        options: [
          { text: 'You get a little of everything and not enough of anything' },
          { text: 'You get a perfect document', why: 'Rarely. Each part gets less attention and fewer facts.' },
          { text: 'The AI refuses', why: 'It will try. The result is just shallow.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s steps in order.',
        lines: ['Ask for an outline only', 'Fix the outline', 'Write one section at a time', 'Review the whole thing'],
      },
      {
        kind: 'sortGroups',
        prompt: 'One request, or too big for one go?',
        groups: ['Fine as one request', 'Split it up'],
        items: [
          { text: 'Write a 3-line reply to Lucía', group: 0 },
          { text: 'Write our full launch plan, budget, messaging and hiring plan', group: 1 },
          { text: 'Summarise these notes in 5 bullets', group: 0 },
          { text: 'Plan, write and design our whole website', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s first-step request.',
        tiles: ['Just', 'the', 'section', 'headings', 'for', 'now'],
        distractors: ['everything', 'final'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you draft our whole joint launch announcement plan? Blog post, emails, social posts, timeline. By Friday!',
        prompt: "What is Ada's best first move with the AI?",
        options: [
          { text: 'Ask for an outline of the plan first, agree it with Lucía, then draft each piece.' },
          { text: 'Ask for all of it in one request.', why: 'Four big pieces in one go will all be shallow.' },
          { text: 'Start with the social posts.', why: 'Without an agreed plan, the posts may not fit it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'If a request has the word "[[1]]" in it more than [[2]], it is probably several requests.',
        blanks: [['and'], ['twice']],
        distractors: ['please', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a big task, ask for an ... first (one word)',
        answers: ['outline', 'outline first', 'structure'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step that is in the wrong place.',
        lines: ['Ask for the outline.', 'Send the finished plan to the manager.', 'Fill in each section.', 'Review it as my manager would.'],
        bug: 1,
        fix: 'Send it only after the review.',
        explanation: 'Sending before writing and reviewing skips the steps that make it good.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it helps.',
        pairs: [
          ['Outline first', 'Cheap to change the shape'],
          ['One section at a time', 'Each part gets its real facts'],
          ['Review as the reader', 'Catches what is unclear'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Ada is writing the Timeline section. Which request is best?',
        options: [
          { text: 'Write the timeline.', why: 'With which dates? It will invent them.' },
          { text: 'Write the Timeline section: testing ends on the 10th, launch on the 14th, announcement email on the 15th. Max 5 bullets.' },
          { text: 'Write the timeline and the risks and the budget.', why: 'That is three sections at once again.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Outline step or section step?',
        groups: ['Outline step', 'Section step'],
        items: [
          { text: 'Just the headings for now', group: 0 },
          { text: 'Write the Risks section with these 3 risks', group: 1 },
          { text: 'Drop Budget, add Who to tell', group: 0 },
          { text: 'Write the Timeline with these dates', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The outline looks good but we don't need a Budget section, and we're missing who to tell internally.",
        prompt: 'Which follow-up should Ada send the AI?',
        options: [
          { text: 'Remove Budget, add a "Who to tell" section after Timeline, keep everything else.' },
          { text: 'Write the whole plan now.', why: 'Fix the outline first, it is cheap now.' },
          { text: 'Start again from scratch.', why: 'The outline is nearly right. Steer it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mistakes are cheapest to fix ... (one word: early or late?)',
        answers: ['early'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the big task to its first step.',
        pairs: [
          ['A launch plan', 'Outline the sections'],
          ['A long report', 'List the main findings first'],
          ['A presentation', 'Draft the slide titles'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the best final step for a big document?',
        options: [
          { text: '"Read it as my manager would. What is unclear or missing?"' },
          { text: '"Is it perfect?"', why: 'It will probably just say yes.' },
          { text: 'Skip the review to save time', why: 'The review is where problems show up.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What big task is on your list right now? Write the first step you would ask an AI tool for.',
    starters: ['My big task is...', 'Step 1 would be...'],
  },
  deepen: { title: 'Try it today', summary: 'Pick one big task and ask an AI tool for the outline only. Fix it before writing anything else.' },
  notes: 'Task decomposition presented generally. Dates in examples are fictional.',
};

export default lesson;

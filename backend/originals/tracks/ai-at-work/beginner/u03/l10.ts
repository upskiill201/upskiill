import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 10 — Checkpoint 2. Decisions, jargon, learning, comparing. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: decide, decode, learn, compare',
  summary: 'Decisions vs discussion, jargon in context, real understanding, and like-for-like comparisons.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can separate decisions from discussion', 'Show you can learn and compare with AI'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint two of Unit 3. This one is about understanding, not just shortening.', replies: ['Go'] },
        { tey: 'Warm-up: if you cannot explain it simply, you...', replies: ["Don't understand it yet", 'Need coffee'] },
        { tey: "Don't understand it yet. Coffee optional. Let's go." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the supplier decision.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Decision, discussion or idea?',
        groups: ['Decision', 'Discussion', 'Idea'],
        items: [
          { text: 'Agreed by the director: Supplier B', group: 0 },
          { text: 'We went back and forth on timelines', group: 1 },
          { text: 'Grace suggested a trial month', group: 2 },
          { text: 'There were views on budget', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a decision log entry.',
        lines: ['What was decided', 'When', 'Who decided', 'Why', 'What was rejected'],
      },
      {
        kind: 'mcq',
        prompt: 'In a software team, "QA" usually means...',
        options: [{ text: 'Quality assurance (testing)' }, { text: 'Quick answer', why: 'Not in software teams.' }, { text: 'Quarterly audit', why: 'Context says testing.' }],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the comparison that is not like for like.',
        lines: ['Supplier A: $1,500 per month', 'Supplier B: $15,000 per year', 'A is cheaper: 1,500 is less than 15,000.'],
        bug: 2,
        fix: 'A is $18,000 per year, so B is cheaper.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the same-day confirmation.',
        tiles: ['Confirming', 'what', 'we', 'decided', 'today:'],
        distractors: ['discussed'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your devs say the fix 'is in a PR'. Is that a press release?",
        prompt: 'Which reply?',
        options: [
          { text: 'Yes, a press release.', why: 'Wrong context.' },
          { text: "Ha, no! Here PR means 'pull request': a proposed code change waiting for review. It should be live by Friday." },
          { text: 'It is in a PR.', why: 'Repeats the jargon.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the learn-it step to why it works.',
        pairs: [
          ['Say your level', 'Fits the explanation to you'],
          ['Explain back', 'Finds your gaps'],
          ['Get quizzed', 'Recall makes it last'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'If a proposal does not mention cancellation, the table says "not ..." (one word)',
        answers: ['stated', 'mentioned', 'specified'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the change-list request.',
        template: 'List every change from Version 1 to Version 2: [[1]], removed, and changed. [[2]] the before and after wording.',
        blanks: [['added'], ['Quote']],
        distractors: ['eaten', 'Hide'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ask the AI, or ask a colleague?',
        groups: ['AI', 'Colleague'],
        items: [
          { text: 'What "churn" means in this report', group: 0 },
          { text: 'What "Project Falcon" is', group: 1 },
          { text: 'What MVP stands for', group: 0 },
          { text: 'How our team usually signs off designs', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request untangles messy meeting notes?',
        options: [
          { text: 'Summarise this meeting.', why: 'Mixes decisions with talk.' },
          { text: 'Separate explicit decisions from discussion and ideas; mark anything unclear. Only use the notes.' },
          { text: 'Mark everything as decided.', why: 'Creates false decisions.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Contract v3 is 'just tidied up', we promise!",
        prompt: 'What should Ada do?',
        options: [
          { text: 'Sign it.', why: '"Tidied up" can hide real changes.' },
          { text: 'Ignore v3.', why: 'It still needs reviewing.' },
          { text: 'Get a change list from v2 to v3 with before/after quotes, and check money, dates and obligations herself.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the jargon routine.',
        lines: ['Copy the sentence', 'Ask for definition, example, why it matters', 'Add to glossary', 'Still unclear? Ask a colleague'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Only explicit ... counts as a decision (one word)',
        answers: ['agreement', 'approval'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what it probably is.',
        pairs: [
          ['"Agreed: Supplier B"', 'Decision'],
          ['"We talked about timelines"', 'Discussion'],
          ['"What if we trialled it first?"', 'Idea'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step that skips real learning.',
        lines: ['Ask for an explanation at my level.', 'Ask for an analogy and its limits.', 'Re-read the explanation five times instead of testing myself.'],
        bug: 2,
        fix: 'Explain it back and get quizzed.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Check yourself, or glance is fine?',
        groups: ['Check yourself', 'Glance is fine'],
        items: [
          { text: 'A changed price', group: 0 },
          { text: 'A fixed typo', group: 1 },
          { text: 'A new penalty clause', group: 0 },
          { text: 'A changed font', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why record what was rejected in a decision log?',
        options: [
          { text: 'So nobody re-opens it later without knowing why it was dropped' },
          { text: 'To embarrass people', why: 'It is about memory.' },
          { text: 'No reason', why: 'It saves real arguments later.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I need to understand 'conversion funnels' before a meeting in an hour. Help?",
        prompt: 'Which approach?',
        options: [
          { text: 'Read a summary once.', why: 'Feels like understanding, often is not.' },
          { text: 'Skip it and nod in the meeting.', why: 'Costly later.' },
          { text: 'Say your level, ask for a simple explanation and analogy, explain it back, then a 3-question quiz.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the trade-off question.',
        tiles: ['What', 'would', 'I', 'give', 'up', 'with', 'A?'],
        distractors: ['win'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the jargon request.',
        template: 'In this [[1]]: "[sentence]", what does PR mean? Definition, an [[2]], and why it [[3]] for me.',
        blanks: [['conversation', 'sentence'], ['example'], ['matters']],
        distractors: ['song', 'sleeps'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Confirm decisions in writing the same ... (one word)',
        answers: ['day'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Decisions', 'Separate them from talk, log them'],
          ['Jargon', 'Context, example, glossary'],
          ['Learning', 'Explain back, get quizzed'],
          ['Comparing', 'Your criteria, like for like'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'The same acronym can mean different things', group: 0 },
          { text: 'Long discussion means a decision was made', group: 1 },
          { text: '"Not stated" can be a red flag', group: 0 },
          { text: 'Re-reading is the best way to learn', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which comparison request is best?',
        options: [
          { text: 'Which supplier is best?', why: 'It chooses criteria and decides for you.' },
          { text: 'Table: A vs B on yearly price, delivery time, support hours, cancellation terms. Same units. "Not stated" if missing. Cite sections.' },
          { text: 'Describe both suppliers.', why: 'Descriptions, not a comparison.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four would have saved you time or an argument in the last month?',
    starters: ['Last month...', 'This would have helped because...'],
  },
  deepen: { title: 'Keep going', summary: 'Start a decision log and a glossary this week. Both take one minute a day.' },
  notes: 'Review only. Prices fictional.',
};

export default lesson;

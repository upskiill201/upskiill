import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 1 — preparing for a meeting. Story: the call in an hour. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Preparing for a meeting',
  summary: 'Month 7. A bug stopped pilot shops taking payments for two hours. Carmen is furious and the call is in an hour. Ada uses AI to prepare in twenty minutes.',
  minutes: 12,
  outcomes: [
    'Prepare for a meeting in 20 minutes with AI',
    'Know your goal, facts and likely questions',
    'Walk in with a plan, not just worry',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The call in an hour',
      beats: [
        { speaker: 'narrator', text: 'Month 7, Monday, 10:15. From 8 to 10am, 120 payments failed at both markets. Carmen\'s email: "Unacceptable. Call at 11:30."' },
        { speaker: 'ada', text: 'My heart is racing. Where do I even start?' },
        { speaker: 'tey', text: 'With three things: your goal for the call, the facts, and her likely questions. AI can help with all three in twenty minutes.' },
        { speaker: 'narrator', text: 'Ada pastes the incident notes: "My goal: keep Carmen\'s trust. Summarise the facts in five lines and list the 8 questions she\'s most likely to ask, hardest first."' },
        { speaker: 'ada', text: 'Question one: "How do I know it won\'t happen again?" I need Tolu for that answer, now.' },
      ],
      choice: {
        prompt: 'What should Ada do first?',
        options: [
          { text: 'Write her goal for the call, then the facts and likely questions', outcome: 'Yes. A clear goal shapes everything else.', best: true },
          { text: 'Write a long apology email right away', outcome: 'The call is in an hour; prepare for it.' },
          { text: 'Ask AI to handle the call', outcome: 'AI can prepare her; Ada has to talk to Carmen.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Before any meeting: goal, facts, likely questions. Ask AI for a five-line fact summary and the hardest questions first.',
    },
  ],
  apply: {
    scenario: '10:15. The call is at 11:30.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation.',
        lines: ['Write the goal', 'Summarise the facts', 'List likely questions', 'Get answers to the hardest'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request prepares Ada best?',
        options: [
          { text: 'Help me with a meeting.', why: 'No goal or facts.' },
          { text: 'Here are the incident notes. My goal is to keep the client\'s trust. Summarise the facts in five lines and list the 8 questions she\'s most likely to ask, hardest first.' },
          { text: 'Write my excuses.', why: 'Not the goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many payments failed?',
        answers: ['120'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact for the call, or not needed?',
        groups: ['Fact', 'Not needed'],
        items: [
          { text: 'Payments failed from 8 to 10am', group: 0 },
          { text: 'What Ada had for breakfast', group: 1 },
          { text: 'Cause: a bank system update', group: 0 },
          { text: 'Tolu\'s commute', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen is really angry. Are you ready for 11:30?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Nearly. I have the facts, her likely questions, and Tolu is getting me the answer on preventing it again.' },
          { text: 'I\'ll just wing it.', why: 'Prepare.' },
          { text: 'Can you take the call instead?', why: 'It\'s Ada\'s to handle.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Before any meeting: [[1]], facts, likely [[2]].',
        blanks: [['goal'], ['questions']],
        distractors: ['lunch', 'jokes'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s goal is a problem?',
        lines: [
          'Keep Carmen\'s trust',
          'Explain what happened, briefly',
          'Prove it was the bank\'s fault, not ours',
          'Agree what we\'ll do for affected shops',
        ],
        bug: 2,
        fix: 'Own our part and explain the fix.',
        explanation: 'Blaming others in an angry call loses trust.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the preparation part to its purpose.',
        pairs: [
          ['Goal', 'What success looks like'],
          ['Facts', 'What happened, clearly'],
          ['Likely questions', 'No surprises'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s goal.',
        tiles: ['Keep', 'Carmen\'s', 'trust'],
        distractors: ['win'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for the hardest questions first?',
        options: [
          { text: 'They need the most preparation, and the right people to help answer' },
          { text: 'To feel worse', why: 'To prepare.' },
          { text: 'Order doesn\'t matter', why: 'Hard ones need more time.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'AI can help, or Ada must do it?',
        groups: ['AI helps', 'Ada does it'],
        items: [
          { text: 'Summarise the incident notes', group: 0 },
          { text: 'Talk to Carmen', group: 1 },
          { text: 'List likely questions', group: 0 },
          { text: 'Decide what to offer the shops', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Tey say the preparation takes?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For your next important meeting, write the goal in one sentence.',
    starters: ['The meeting:', 'My goal:'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next meeting, ask AI for the five hardest questions you might get.' },
  notes: 'Fictional incident.',
};

export default lesson;

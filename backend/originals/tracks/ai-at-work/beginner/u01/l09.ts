import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 9 — follow-ups: steer in the same conversation, and know when to start fresh. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: "Steer, don't start over",
  summary: 'The first answer is a draft. A good follow-up gets you to the final version in one or two steps.',
  minutes: 12,
  outcomes: [
    'Write follow-ups that say exactly what to change',
    'Say what to keep, so good parts survive',
    'Know when to start a fresh conversation instead',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Confession time. When an AI answer is nearly right, what do you usually do?",
          replies: ['Start a new chat', 'Rewrite it myself', 'Ask again'],
        },
        {
          tey: "All understandable. But you're throwing away a draft that's 80% there. The chat remembers what you asked, so you can steer it.",
        },
        {
          tey: 'The trick is being specific. "Make it better" is a coin toss. "Make paragraph 2 shorter and keep everything else" is an instruction.',
          replies: ['Say what to keep?', 'Why does keeping matter?'],
        },
        {
          tey: "Because if you don't protect the good parts, it may rewrite those too. Name what stays, then name what changes.",
        },
        {
          tey: "And sometimes you SHOULD start fresh: when the chat has gone off on a tangent, or you're switching to a different task. Old context can leak into new answers.",
          replies: ['Got it'],
        },
        {
          tey: 'So: nearly right, steer it. Totally wrong or a new topic, start fresh.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Vague vs specific follow-up',
      before: { label: 'Vague', text: 'Make it better.' },
      after: { label: 'Specific', text: 'Keep the first two lines. Make the ending shorter, and replace "deliverables" with plain words.' },
      notes: ['Protects what already works.', 'Names exactly what changes.', 'Leaves nothing to guess.'],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Keep what works, change what does not, and say both out loud.',
    },
    {
      kind: 'check',
      question: 'The answer is 90% right but too long. What should Ada do?',
      options: ['Start a new chat', 'Follow up: "Keep the content, cut it to half the length"', 'Accept it as it is'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is steering drafts towards the final version.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why steer in the same conversation instead of starting over?',
        options: [
          { text: 'The chat remembers what you asked, so you can fix just what is wrong' },
          { text: 'New chats cost money', why: 'Not the point. It is about keeping a good draft.' },
          { text: 'You can never start a new chat', why: 'You can, and sometimes should.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific follow-up, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Make it better', group: 1 },
          { text: 'Cut the second paragraph to one sentence', group: 0 },
          { text: 'Try again', group: 1 },
          { text: 'Keep the opening, make the ending friendlier', group: 0 },
          { text: 'Fix it', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a follow-up that protects the good part.',
        tiles: ['Keep', 'the', 'opening,', 'shorten', 'the', 'ending'],
        distractors: ['delete', 'everything'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The draft is great, but please lose the word "synergy". And it feels a bit long.',
        prompt: 'Which follow-up should Ada send to the AI?',
        options: [
          { text: 'Keep everything else. Remove "synergy" and cut it by about a third.' },
          { text: 'Write a new email.', why: 'Lucía said it is great. Fix the two things she mentioned.' },
          { text: 'Make it better.', why: 'Lucía gave two specific changes. Pass them on.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['Nearly right', 'Steer with a follow-up'],
          ['Totally off', 'Start fresh with a clearer request'],
          ['New, unrelated task', 'Start a new chat'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Keep what [[1]], change what does [[2]], and say [[3]] out loud.',
        blanks: [['works'], ['not'], ['both']],
        distractors: ['nothing', 'secretly'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the follow-up that will probably undo the good parts.',
        lines: [
          'Keep the subject line as it is.',
          'Rewrite the whole thing in a totally different way.',
          'Make the last sentence a question.',
        ],
        bug: 1,
        fix: 'Shorten the middle paragraph only.',
        explanation: 'If most of it is good, a full rewrite throws the good parts away.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'When the chat goes off on a tangent, you should start ... (one word)',
        answers: ['fresh', 'over', 'again', 'new'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'The AI\'s summary is good but uses jargon. Which follow-up is best?',
        options: [
          { text: 'No jargon.', why: 'Better, but it may rewrite everything to get there.' },
          { text: 'Keep the structure and the bullet points. Replace any technical terms with plain words a client would understand.' },
          { text: 'This is bad, redo it.', why: 'It is not bad. One thing needs fixing.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good follow-up.',
        lines: ['Say what to keep', 'Say exactly what to change', 'Say any new limit (length, tone)'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of an AI answer you threw away recently. What follow-up could have fixed it instead?',
    starters: ['I threw away...', 'A better follow-up would have been...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Next time an answer is nearly right, write one follow-up that says what to keep and what to change.',
  },
  notes: '"80% there" is a figure of speech in dialogue, not a statistic. Context-leak behaviour described generally.',
};

export default lesson;

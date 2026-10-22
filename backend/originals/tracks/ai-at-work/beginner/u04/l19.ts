import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 19 — myths about AI accuracy. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Myths about AI accuracy',
  summary: 'Lucía\'s team has strong opinions about AI accuracy, in both directions. Sort the myths from the facts.',
  minutes: 12,
  outcomes: [
    'Correct common myths about AI accuracy',
    'Explain the realistic middle view',
    'Talk about AI accuracy calmly with colleagues',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Newer, paid AI tools never make things up.',
          isFact: false,
          explain: 'Better tools make fewer mistakes, but every current AI assistant can still state false things confidently.',
        },
        {
          text: 'AI is useless because it makes mistakes.',
          isFact: false,
          explain: 'People make mistakes too. AI is very useful for drafts, ideas and structure, as long as you check what matters.',
        },
        {
          text: 'Giving AI your own documents and asking it to use only them reduces made-up answers.',
          isFact: true,
          explain: 'Grounding the answer in your sources helps, though you should still check quotes and numbers against the original.',
        },
        {
          text: 'If you ask "are you sure?", the AI will reliably correct itself.',
          isFact: false,
          explain: 'It may confirm a wrong answer, or change a right one. Checking a real source is the reliable fix.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Not magic, not useless. Very useful for drafts and thinking; checked by you for anything that matters.',
    },
  ],
  apply: {
    scenario: 'A debate about AI accuracy in Lucía\'s team meeting.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Paid tools never make things up', group: 0 },
          { text: 'AI is useless because it makes mistakes', group: 0 },
          { text: 'Using only your documents reduces made-up answers', group: 1 },
          { text: '"Are you sure?" reliably fixes errors', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the realistic view of AI accuracy?',
        options: [
          { text: 'Always right if you pay', why: 'All tools can be wrong.' },
          { text: 'Very useful, but anything important needs checking' },
          { text: 'Never worth using', why: 'It saves real time.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My colleague says we should ban AI because of the fake statistic. Thoughts?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Agreed, ban it.', why: 'Overreaction; checking worked.' },
          { text: 'Fake statistics don\'t matter.', why: 'They matter a lot.' },
          { text: 'The fix was a check, not a ban. We caught it because we asked for the source. That habit is what keeps it safe.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request reduces made-up answers most?',
        options: [
          { text: 'Tell me about our Q2 results.', why: 'It has to guess.' },
          { text: 'Using only the Q2 report I pasted, list the three key results with the page each comes from. Say "not in the report" if something isn\'t there.' },
          { text: 'Are you sure? Are you really sure?', why: 'Doesn\'t ground it in anything.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the reality.',
        pairs: [
          ['"Paid tools are always right"', 'All tools can be wrong'],
          ['"AI is useless"', 'Useful when checked'],
          ['"Are you sure?" fixes it', 'Check a real source'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the callout.',
        template: 'Not [[1]], not [[2]].',
        blanks: [['magic'], ['useless']],
        distractors: ['fast', 'blue'],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement in the team\'s notes is a myth?',
        lines: [
          'AI helps us draft faster.',
          'We check numbers against sources.',
          'The premium plan guarantees accurate facts.',
          'We give it our own documents when we can.',
        ],
        bug: 2,
        fix: 'Premium plans may be better, but we still check facts.',
        explanation: 'No current tool guarantees accuracy.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Does asking "are you sure?" reliably fix errors? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps accuracy, or doesn\'t?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'Pasting the source document', group: 0 },
          { text: 'Asking for page numbers', group: 0 },
          { text: 'Saying "be accurate please"', group: 1 },
          { text: 'Asking the same question louder', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the most reliable way to get facts from a document.',
        lines: ['Paste the document', 'Ask it to use only that', 'Ask for page numbers', 'Check the key ones yourself'],
      },
      {
        kind: 'mcq',
        prompt: 'Why might "are you sure?" make things worse?',
        options: [
          { text: 'The AI may change a right answer to a wrong one' },
          { text: 'It deletes the chat', why: 'It can flip answers.' },
          { text: 'It can\'t make things worse', why: 'It can flip a right answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s summary of AI accuracy.',
        tiles: ['Useful,', 'and', 'checked', 'when', 'it', 'matters'],
        distractors: ['perfect'],
      },
    ],
  },
  reflect: {
    prompt: 'Which myth have you heard most at work? How would you answer it now?',
    starters: ['The myth:', 'My answer:'],
  },
  deepen: { title: 'Try it today', summary: 'Next time you need facts from a document, paste it and ask for page numbers. Check two of them.' },
  notes: 'General, well-documented properties of current AI assistants; accuracy varies by model and task.',
};

export default lesson;

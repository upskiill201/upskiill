import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 16 — career-change myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Career change myths',
  summary: '"It\'s too late to change after 25." "You need a brand-new degree." "Changing means starting at the bottom." Clinton\'s uncle has views again. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common career-change myths', 'Know what usually helps a change', 'Encourage others realistically'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'It\'s too late to change careers after your twenties.', isFact: false, explain: 'People change direction at every age. Experience often makes later changes easier, not harder.' },
        { text: 'You always need a brand-new degree to change fields.', isFact: false, explain: 'Some fields require qualifications (medicine, law). Many don\'t: experiments, projects and bridge roles often matter more.' },
        { text: 'Testing a direction before committing usually lowers the risk.', isFact: true, explain: 'Small experiments show what the work is really like before you bet savings and momentum.' },
        { text: 'Changing means starting from the very bottom.', isFact: false, explain: 'Transferable skills often let you start higher than a beginner, as Clinton\'s offline expertise did.' },
        { text: 'A change can involve a short-term trade-off, like pay or seniority.', isFact: true, explain: 'Sometimes. It\'s worth weighing and negotiating, not fearing.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'It\'s rarely too late. Qualifications matter in some fields, not all. Test first. Skills carry. Trade-offs are negotiable.',
    },
  ],
  apply: {
    scenario: 'Clinton answers his uncle.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Testing first lowers risk', group: 0 },
          { text: 'Too late after 25', group: 1 },
          { text: 'Always need a new degree', group: 1 },
          { text: 'Short-term trade-offs can happen', group: 0 },
          { text: 'You start from the very bottom', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My uncle says it\'s too late for my aunt to change careers at 45. True?',
        options: [
          { text: 'Yes, too late.', why: 'It\'s rarely too late.' },
          { text: 'No: people change at every age, and her experience can help. Small experiments are a good start.' },
          { text: 'Only if she gets three degrees.', why: 'Not always needed.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When is a new qualification really needed?',
        options: [
          { text: 'Always', why: 'Many fields don\'t require one.' },
          { text: 'Never', why: 'Some fields require it.' },
          { text: 'In some regulated fields, like medicine or law' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Transferable skills carry over.', 'Changing always means starting at the very bottom.', 'Testing first lowers risk.'],
        bug: 1,
        explanation: 'Transferable skills often let you start higher.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Too late after 25', 'People change at every age'],
          ['Always need a new degree', 'Only some fields require one'],
          ['Start at the bottom', 'Skills often let you start higher'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What let Clinton start higher than a beginner in product?',
        options: [
          { text: 'His offline expertise and experiments' },
          { text: 'Luck', why: 'His expertise and experiments.' },
          { text: 'A new degree', why: 'He didn\'t get one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'It\'s rarely too [[1]]. Test [[2]].',
        blanks: [['late'], ['first']],
        distractors: ['early', 'never', 'blindly'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Can people change careers at any age? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful encouragement, or unrealistic?',
        groups: ['Helpful', 'Unrealistic'],
        items: [
          { text: 'Try a small project first', group: 0 },
          { text: 'You\'ll definitely be rich in a month', group: 1 },
          { text: 'Your experience helps', group: 0 },
          { text: 'Quit today, it\'ll all work out', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I\'m thinking of moving from medicine into health tech one day. Would my degree be wasted?',
        options: [
          { text: 'Yes, completely.', why: 'It\'s a rare advantage.' },
          { text: 'You\'d need to start from zero.', why: 'Skills carry over.' },
          { text: 'Not at all: clinical knowledge is rare in tech. Start with a small health-tech project.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which career-change myth have you believed, about yourself or someone else?',
    starters: ['I believed...', 'Now I think...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find one person who changed careers after 30. Ask them what made it possible.',
  },
  notes: 'Myths reflect common beliefs; kept qualitative. Regulated professions vary by country; check locally.',
};

export default lesson;

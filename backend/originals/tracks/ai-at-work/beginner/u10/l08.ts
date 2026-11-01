import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 8 — copyright and AI content. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Copyright and AI content',
  summary: 'The agency wants blog posts for the campaign. Can Ada use AI-written text? Who owns it? Can it copy someone else\'s work? Sort the myths from the facts.',
  minutes: 12,
  outcomes: [
    'Know the basics of copyright and AI content',
    'Avoid publishing copied material',
    'Add your own work so content is truly yours',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Anything an AI writes for you is automatically yours and fully protected by copyright.',
          isFact: false,
          explain: 'In the US, the Copyright Office says material generated entirely by AI isn\'t protected; human creative contribution can be. Rules vary by country.',
        },
        {
          text: 'AI tools can sometimes produce text very close to existing published work.',
          isFact: true,
          explain: 'This is part of several lawsuits, including The New York Times\' 2023 case against OpenAI and Microsoft. Check before publishing.',
        },
        {
          text: 'Asking AI to write "in the style of" a living author and publishing it is always fine.',
          isFact: false,
          explain: 'Imitating a living writer\'s or artist\'s distinctive work raises legal and ethical issues. Write in your own brand\'s voice.',
        },
        {
          text: 'Adding your own facts, examples and editing makes AI-assisted content more original and more useful.',
          isFact: true,
          explain: 'Your pilot data, shop stories and voice are things no one else has.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Use AI to draft, then make it yours: your facts, examples, edits and voice. Check public content for copied passages, and never imitate a living creator.',
    },
  ],
  apply: {
    scenario: 'Ada prepares campaign blog posts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'All AI text is automatically yours and protected', group: 0 },
          { text: 'AI can produce text close to published work', group: 1 },
          { text: 'Copying a living author\'s style is always fine', group: 0 },
          { text: 'Your own facts make content more original', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the US Copyright Office say about fully AI-generated material?',
        options: [
          { text: 'The user owns full copyright automatically', why: 'Human authorship is required.' },
          { text: 'It isn\'t protected without human creative contribution' },
          { text: 'It\'s illegal to publish', why: 'It\'s not illegal; just not protected alone.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did The New York Times sue OpenAI and Microsoft?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the most original blog draft?',
        options: [
          { text: 'Write a blog post about mobile payments in the style of a famous journalist.', why: 'Imitation risk.' },
          { text: 'Draft a blog post in our friendly brand voice using these pilot facts and two shop owner quotes we have permission to use.' },
          { text: 'Copy a popular article and reword it.', why: 'That\'s copying.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The agency says AI blog posts are free content we can publish anywhere. True?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, totally free.', why: 'Check for copying and add your work.' },
          { text: 'AI content can never be published.', why: 'It can, with care.' },
          { text: 'We can use AI to draft, but let\'s add our own data and stories, edit properly, and check nothing is copied before publishing.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Use AI to [[1]], then make it [[2]].',
        blanks: [['draft'], ['yours']],
        distractors: ['publish', 'longer'],
      },
      {
        kind: 'findBug',
        prompt: 'Which plan for the blog is a problem?',
        lines: [
          'Draft with AI using our pilot facts',
          'Add two real shop stories, with permission',
          'Publish the AI paragraph that matches a news article word for word',
          'Edit into our brand voice',
        ],
        bug: 2,
        fix: 'Rewrite it, or quote and credit the article properly.',
        explanation: 'Copied text is a copyright risk.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the fix.',
        pairs: [
          ['Copied passage', 'Rewrite or quote and credit'],
          ['Imitating a living writer', 'Use your own brand voice'],
          ['Generic AI text', 'Add your own facts and stories'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s publishing rule.',
        tiles: ['Draft', 'with', 'AI,', 'make', 'it', 'ours'],
        distractors: ['copy'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Adds originality, or not?',
        groups: ['Adds originality', 'Doesn\'t'],
        items: [
          { text: 'Pilot data', group: 0 },
          { text: 'Regenerating the same generic text', group: 1 },
          { text: 'A shop owner\'s real quote', group: 0 },
          { text: 'More adjectives', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s blog process.',
        lines: ['Draft with AI from our facts', 'Add real stories', 'Edit into our voice', 'Check for copied passages', 'Publish'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check public content for copied passages?',
        options: [
          { text: 'AI can sometimes reproduce existing text closely' },
          { text: 'Never necessary', why: 'It can happen.' },
          { text: 'To fill time', why: 'It\'s a real risk.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What do you have that no one else does (data, stories, experience) that could make AI-assisted work yours?',
    starters: ['I have...', 'I could add...'],
  },
  deepen: { title: 'Try it today', summary: 'Take one AI draft and add one real fact and one real example only you could provide.' },
  notes: 'US Copyright Office registration guidance (March 2023). The New York Times v. OpenAI and Microsoft, filed December 2023. Not legal advice; laws differ by country.',
};

export default lesson;

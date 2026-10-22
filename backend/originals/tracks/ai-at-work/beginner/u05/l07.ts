import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 7 — researching a company or client. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Researching a company or client',
  summary: 'Before meeting a possible partner bank in Accra, Ada needs a quick, accurate picture of who they are. AI helps her prepare; sources keep her honest.',
  minutes: 12,
  outcomes: [
    'Build a one-page company profile with AI',
    'Know which company facts to verify',
    'Prepare smart questions for a meeting',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Ada meets a possible partner bank in Accra on Thursday. She has an hour to prepare.', replies: ['Where does she start?'] },
        { tey: 'With the company\'s own sources: their website, annual report, press releases. Paste the key parts into the AI and ask for a profile using only those.', replies: ['Why not just ask the AI about the bank?'] },
        { tey: 'It may know old facts, or mix them up with another bank. Leaders change, products change. Their own pages are the current version.', replies: ['And then?'] },
        { tey: 'Ask the AI for five smart questions to ask them, based on the profile. Questions show you did your homework, and they can\'t be wrong.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Profile from the company\'s own pages, pasted in. Then ask AI for smart meeting questions. Verify names and titles before the meeting.',
    },
  ],
  apply: {
    scenario: 'Ada is preparing for the partner bank meeting.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation.',
        lines: ['Collect the company\'s own pages', 'Paste them into the AI', 'Ask for a profile from only those', 'Ask for smart meeting questions', 'Verify names and titles'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not just ask the AI "Tell me about this bank"?',
        options: [
          { text: 'AI can\'t talk about banks', why: 'It can, but may be out of date.' },
          { text: 'It may give old or mixed-up facts' },
          { text: 'It takes too long', why: 'Speed isn\'t the issue; accuracy is.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Verify before the meeting, or fine as background?',
        groups: ['Verify', 'Background is fine'],
        items: [
          { text: 'The CEO\'s name', group: 0 },
          { text: 'What a partner bank usually does', group: 1 },
          { text: 'Their latest product launch', group: 0 },
          { text: 'General trends in African banking', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best profile?',
        options: [
          { text: 'Tell me everything about this bank.', why: 'Relies on the AI\'s memory.' },
          { text: 'Using only the pages I pasted, write a one-page profile: what they do, who leads them, recent news, and what they might want from a partner. Mark anything not in the pages.' },
          { text: 'Make the bank sound impressive.', why: 'Not a research request.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says their head of partnerships is Mr Mensah. Can I address the email to him?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, the AI knows.', why: 'Names and titles go stale fast.' },
          { text: 'Just write "Dear Sir".', why: 'Check the name instead.' },
          { text: 'Let\'s check their website or LinkedIn first. People change roles, and a wrong name is a bad start.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Profile from the company\'s [[1]] pages. Verify names and [[2]].',
        blanks: [['own'], ['titles']],
        distractors: ['rival', 'jokes'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it tells you.',
        pairs: [
          ['Annual report', 'Results and strategy'],
          ['Press releases', 'Recent news and launches'],
          ['Leadership page', 'Who runs the company now'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the profile most needs checking?',
        lines: [
          'Offers business accounts and mobile banking',
          'Has branches in Accra and Kumasi',
          'Their CEO is Mr Asare (from AI memory)',
          'Launched an SME loan product this year (press release)',
        ],
        bug: 2,
        fix: 'CEO: (checked on their leadership page today)',
        explanation: 'From AI memory, not their pages. Leaders change.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question request.',
        tiles: ['Suggest', 'five', 'smart', 'questions', 'to', 'ask', 'them'],
        distractors: ['rude'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Smart meeting question, or one Ada should already know?',
        groups: ['Smart question', 'Should already know'],
        items: [
          { text: 'How do you choose fintech partners?', group: 0 },
          { text: 'What does your bank do?', group: 1 },
          { text: 'What would make a pilot a success for you?', group: 0 },
          { text: 'Where are you based?', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long does Ada have to prepare? (in hours)',
        answers: ['1', 'one', 'an hour'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why are questions safer than facts in a meeting?',
        options: [
          { text: 'A good question shows homework and can\'t be factually wrong' },
          { text: 'Facts are boring', why: 'Questions can\'t be wrong; facts can.' },
          { text: 'They aren\'t safer', why: 'A wrong fact embarrasses; a question doesn\'t.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who is the next person or company you\'ll meet for work? Which three facts would you verify first?',
    starters: ['I\'m meeting...', 'I\'d verify...'],
  },
  deepen: { title: 'Try it today', summary: 'Paste a company\'s "About" page into AI and ask for five smart questions to ask them.' },
  notes: 'The bank, Mr Mensah and Mr Asare are fictional (narrated only).',
};

export default lesson;

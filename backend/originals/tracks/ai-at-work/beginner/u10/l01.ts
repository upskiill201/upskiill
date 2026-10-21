import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 1 — what happens to what you type. Story: the paste. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'What happens to what you type',
  summary: 'Month 8. Tolu\'s cursor is over "paste": 50 shop owners\' names and phone numbers, into a free AI tool. Ada stops him. Where does typed text actually go?',
  minutes: 12,
  outcomes: [
    'Know what can happen to text you put into an AI tool',
    'Know why free and work versions can differ',
    'Pause before pasting anything sensitive',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The paste that almost happened',
      beats: [
        { speaker: 'narrator', text: 'Month 8. The agency wants a tidy contact list by tomorrow. Tolu has the raw sheet open and a free AI chat in the next tab.' },
        { speaker: 'ada', text: 'Wait. Before you paste: whose data is that, and where does it go once it\'s in there?' },
        { speaker: 'tey', text: 'Good question. What you type leaves your computer. Depending on the tool and your settings, it may be stored, reviewed by people, or used to train future models.' },
        { speaker: 'narrator', text: 'In 2023, Samsung engineers pasted confidential code into a public AI chat. The company then restricted staff use of these tools.' },
        { speaker: 'ada', text: 'So it\'s not like typing in a notebook. It\'s more like emailing it to a company we haven\'t checked.' },
      ],
      choice: {
        prompt: 'What should Tolu do?',
        options: [
          { text: 'Stop, check company rules and the tool\'s settings, and remove personal data first', outcome: 'Yes. A two-minute pause can save a data breach.', best: true },
          { text: 'Paste it; it\'s just a tidy-up', outcome: 'The purpose doesn\'t change where the data goes.' },
          { text: 'Paste it into a different free tool', outcome: 'Same problem, different company.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Treat pasting into an AI tool like sending it to that company. Free, personal and work versions can handle your data very differently.',
    },
  ],
  apply: {
    scenario: 'Tolu is about to paste the contact list.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What can happen to text typed into an AI tool?',
        options: [
          { text: 'Depending on tool and settings, it may be stored, reviewed or used for training' },
          { text: 'Nothing; it disappears', why: 'It leaves your computer.' },
          { text: 'It\'s always deleted instantly', why: 'Not guaranteed.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to paste into an unchecked free tool, or not?',
        groups: ['Fine', 'Not safe'],
        items: [
          { text: 'A public news article to summarise', group: 0 },
          { text: 'Shop owners\' phone numbers', group: 1 },
          { text: 'Your own draft email with no names', group: 0 },
          { text: 'A confidential contract', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Samsung staff paste confidential code into a public AI chat?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The agency needs the list tomorrow. Can\'t Tolu just paste it into the AI to tidy it?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Not until we check: it\'s personal data. I\'m checking what we\'re allowed to share and which tools are approved. You\'ll hear by noon.' },
          { text: 'Sure, it\'s fast.', why: 'Personal data needs checks first.' },
          { text: 'We can never share anything.', why: 'Check what\'s allowed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Treat pasting into an AI tool like [[1]] it to that [[2]].',
        blanks: [['sending'], ['company']],
        distractors: ['deleting', 'friend'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool type to what to check.',
        pairs: [
          ['Free personal tool', 'Whether chats are used for training'],
          ['Company-approved tool', 'What the company agreement covers'],
          ['Any tool', 'Its privacy settings'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief is the risky one?',
        lines: [
          'What I type leaves my computer',
          'Settings can change how data is used',
          'If I delete the chat, the data never existed',
          'Work and free versions can differ',
        ],
        bug: 2,
        fix: 'Deleting a chat may not remove every copy; don\'t paste sensitive data in the first place.',
        explanation: 'Once sent, you may not control every copy.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question before any paste.',
        tiles: ['Whose', 'data', 'is', 'this?'],
        distractors: ['Who', 'cares'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Samsung do after the incident?',
        options: [
          { text: 'Restricted staff use of public AI tools' },
          { text: 'Nothing', why: 'It restricted use.' },
          { text: 'Gave staff more AI tools with no rules', why: 'It restricted use.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause before pasting.',
        lines: ['Ask whose data it is', 'Check company rules', 'Check the tool and settings', 'Remove anything sensitive'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Same as a private notebook, or like sending to a company?',
        groups: ['Private notebook', 'Sending to a company'],
        items: [
          { text: 'Writing on paper', group: 0 },
          { text: 'Typing into a web AI chat', group: 1 },
          { text: 'A file saved only on your laptop', group: 0 },
          { text: 'Uploading to an online AI tool', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can free and work versions differ?',
        options: [
          { text: 'Business agreements often set different rules for data use' },
          { text: 'They don\'t', why: 'They often do.' },
          { text: 'Free tools are always safer', why: 'Usually the opposite.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last thing you pasted into an AI tool. Would you have emailed it to that company?',
    starters: ['I pasted...', 'Would I email it?'],
  },
  deepen: { title: 'Try it today', summary: 'Open the settings of the AI tool you use most. Find what it says about storing chats and training.' },
  notes: 'Samsung (April-May 2023): engineers pasted source code and meeting notes into ChatGPT; Samsung restricted generative AI use. Data handling varies by provider, plan and settings.',
};

export default lesson;

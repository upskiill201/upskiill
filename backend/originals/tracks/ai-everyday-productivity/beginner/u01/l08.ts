import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: what never goes in the box. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'What never goes in the box',
  summary: 'Tomás pastes a whole spreadsheet into an AI tool: 60 guests, phone numbers, home addresses. It\'s not even his party. Read what never goes in, and how to get the same help safely.',
  minutes: 12,
  outcomes: [
    'Know what never to paste into an AI tool',
    'Swap private details for placeholders',
    'Check a tool\'s privacy settings',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The box remembers more than you think',
      html: '<p>Tomás offered to help Lucía with the seating plan. Helpfully, he pasted the entire guest spreadsheet into an AI tool: names, phone numbers, home addresses, and a column called "who doesn\'t speak to who".</p><p>The seating plan was great. The paste wasn\'t.</p><h3>Where your words go</h3><p>When you type into an AI chat tool, your words go to the company that runs it. Depending on the tool and your settings, chats may be <strong>stored</strong>, may be <strong>seen by staff</strong> checking for problems, and may be <strong>used to train future versions</strong>. Many tools let you turn some of this off. Few people check.</p><h3>Never paste</h3><ul><li><strong>Passwords</strong> and security codes. Ever.</li><li><strong>ID numbers</strong>: passport, national ID, tax numbers.</li><li><strong>Bank and card details</strong>.</li><li><strong>Other people\'s private information</strong>: phone numbers, addresses, health, family arguments. They didn\'t agree to it.</li><li><strong>Confidential work</strong> your employer hasn\'t approved for AI tools.</li></ul><h3>The placeholder trick</h3><p>You almost never need the real details to get the help. Lucía\'s safe version: "I have 60 guests: 12 older relatives, 8 children, 2 people who don\'t get along (call them A and B). Suggest a seating plan for 8 tables of 8." Same plan. Nothing private.</p><blockquote>Ask yourself: would I be fine if this chat were read by a stranger? If not, swap the details for placeholders.</blockquote><h3>Two minutes, once</h3><p>Open your AI tool\'s settings and look for chat history and whether your chats are used for training. Choose what you\'re comfortable with. Settings change between tools, so check each one you use.</p>',
    },
    {
      kind: 'check',
      question: 'Lucía needs a seating plan. What\'s the safe way?',
      options: [
        'Paste the guest spreadsheet with phone numbers',
        'Describe the groups with placeholders: "12 older relatives, A and B don\'t get along"',
        'Paste it but delete the chat afterwards',
      ],
      answer: 1,
      explanation: 'Same help, nothing private. Deleting afterwards may not undo what was already sent.',
    },
  ],
  apply: {
    scenario: 'Keeping private things private.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Fine to paste, or never paste?',
        groups: ['Fine', 'Never'],
        items: [
          { text: '"60 guests, 8 tables"', group: 0 },
          { text: 'Tía Carmela\'s home address', group: 1 },
          { text: 'Your bank card number', group: 1 },
          { text: 'Your own draft invitation', group: 0 },
          { text: 'Your email password', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main problem with Tomás\'s paste?',
        options: [
          { text: 'The seating plan was bad', why: 'The plan was fine. The privacy wasn\'t.' },
          { text: 'It was too long for the AI', why: 'Length wasn\'t the issue.' },
          { text: '60 people\'s private details went to a company without their say' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The safe swap.',
        template: 'Swap real details for [[1]]: call them A and B, not their real [[2]].',
        blanks: [['placeholders'], ['names']],
        distractors: ['passwords', 'emojis'],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'But I deleted the chat afterwards. So it\'s fine now?',
        prompt: 'Lucía\'s honest answer?',
        options: [
          { text: 'Yes, deleting undoes everything.', why: 'It may already have been stored or reviewed.' },
          { text: 'Not necessarily. It was already sent. Next time, use placeholders before you paste.' },
          { text: 'Delete your account too.', why: 'The fix is a habit, not panic.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which prompt shares too much?',
        lines: [
          'Help me plan transport for 5 older guests from one hotel.',
          'Suggest a seating plan for 8 tables; guests A and B must sit apart.',
          'Here is Tía Carmela\'s passport number so you can check her flight.',
        ],
        bug: 2,
        fix: 'Never share ID numbers. Ask "how do I check a flight booking?" instead.',
        explanation: 'ID numbers are on the never-paste list, and it\'s someone else\'s.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one thing you should never paste into an AI tool.',
        answers: ['password', 'passwords', 'bank details', 'card number', 'id number', 'passport number', 'pin', 'security code', 'card details', 'bank card'],
        placeholder: 'One thing',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the private detail to a safe placeholder.',
        pairs: [
          ['"Tía Carmela, 84"', '"An older relative"'],
          ['"Uncle Pepe and Aunt Luz hate each other"', '"Guests A and B"'],
          ['"Calle Reforma 112"', '"A hotel in the centre"'],
          ['"My salary is MX$38,000"', '"A budget of about MX$40,000"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the two-minute habit from the reading?',
        options: [
          { text: 'Check your AI tool\'s settings for chat history and training use' },
          { text: 'Never use AI', why: 'Use it, with care.' },
          { text: 'Change your password every day', why: 'Different topic.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s safe-paste check.',
        lines: ['Write the prompt', 'Spot any private details', 'Swap them for placeholders', 'Ask: fine if a stranger read it?', 'Send'],
      },
      {
        kind: 'mcq',
        prompt: 'Carmen asks Lucía to summarise a confidential Nopal contract with AI. What should she do first?',
        options: [
          { text: 'Paste it; summaries are harmless', why: 'Confidential work needs permission first.' },
          { text: 'Check whether Nopal allows that tool for confidential documents' },
          { text: 'Paste half of it', why: 'Half a confidential contract is still confidential.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever pasted something into an app or chat that you wouldn\'t want a stranger to read? What would the placeholder version look like?',
    starters: ['I once pasted...', 'The safe version would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open the settings of the AI tool you use. Find chat history and anything about using your chats to improve the model. Decide what you\'re comfortable with. It takes two minutes.',
  },
  notes: 'General privacy guidance: providers\' privacy policies commonly describe storing chats, human review for safety, and optional use for training with opt-out controls; details vary by tool and plan, so stated as "depending on the tool and your settings". No products named.',
};

export default lesson;

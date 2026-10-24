import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 7 · Lesson 14 — when data is private. Story: the phone-number column. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When data is private',
  summary: 'Tolu wants AI to find which shops are going quiet. The sheet has owners\' names and phone numbers. Here\'s how to get the analysis without leaking anyone\'s details.',
  minutes: 12,
  outcomes: [
    'Spot personal data in a spreadsheet',
    'Remove or replace it before using AI',
    'Know when to use your company\'s approved tool',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The phone-number column',
      beats: [
        { speaker: 'narrator', text: 'Tolu is about to paste 50 rows into a free AI chat: owner names, phone numbers, ID numbers and weekly payments.' },
        { speaker: 'ada', text: 'Stop. Those are real people\'s details. Delete the names, phones and IDs. Keep the Shop ID and the weekly numbers.' },
        { speaker: 'narrator', text: 'Tolu pastes the cleaned rows. The AI spots 6 shops whose payments fell three weeks in a row.' },
        { speaker: 'ada', text: 'Now look up those 6 Shop IDs in our own sheet to see who to call. The AI never needed to know who they are.' },
        { speaker: 'tey', text: 'The analysis needed the pattern, not the people. Strip the personal details first, every time.' },
      ],
      choice: {
        prompt: 'What should Tolu paste?',
        options: [
          { text: 'Shop ID and weekly payments only', outcome: 'Yes. Enough for the analysis, nothing personal.', best: true },
          { text: 'Everything; the AI needs context', outcome: 'It needs the pattern, not names and phone numbers.' },
          { text: 'Nothing; AI can\'t be used for data', outcome: 'It can, once personal details are removed and if your company allows it.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Remove names, phone numbers, IDs, addresses and account numbers before pasting. Use IDs instead. Follow your company\'s rules on which AI tools are approved.',
    },
  ],
  apply: {
    scenario: 'Tolu prepares data for AI analysis.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Personal data, or safe to keep?',
        groups: ['Remove', 'Safe to keep'],
        items: [
          { text: 'Owner\'s phone number', group: 0 },
          { text: 'Shop ID (S-014)', group: 1 },
          { text: 'Owner\'s ID card number', group: 0 },
          { text: 'Weekly payment count', group: 1 },
          { text: 'Owner\'s full name', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did the AI not need names?',
        options: [
          { text: 'AI can\'t read names', why: 'It can; it just doesn\'t need them.' },
          { text: 'The analysis was about patterns; Shop IDs were enough' },
          { text: 'Names were wrong', why: 'They weren\'t needed.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Tolu\'s safe process.',
        lines: ['Copy the sheet', 'Delete personal columns', 'Paste IDs and numbers only', 'Look up results in your own sheet'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safe and useful?',
        options: [
          { text: 'Here\'s our shop list with names and phones. Who\'s going quiet?', why: 'Leaks personal data.' },
          { text: 'Here are Shop IDs and weekly payment counts for 4 weeks. Which shops fell three weeks in a row?' },
          { text: 'Guess which shops are unhappy.', why: 'No data, no basis.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you send the AI the full customer list so it can write personal messages?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Sure, paste it all.', why: 'Personal data.' },
          { text: 'AI can\'t write messages.', why: 'It can, with a template.' },
          { text: 'Not with their details in a public AI tool. I\'ll get it to write a template with a [name] blank, and we\'ll fill names in our own system.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Use [[1]] instead of names. Follow your company\'s rules on [[2]] tools.',
        blanks: [['IDs'], ['approved']],
        distractors: ['emojis', 'banned'],
      },
      {
        kind: 'findBug',
        prompt: 'Which column is still personal data?',
        lines: ['Shop ID', 'Market', 'Owner mobile number', 'Week 4 payments'],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A phone number identifies a real person.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shops did the AI find falling three weeks in a row?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the personal detail to a safe replacement.',
        pairs: [
          ['Owner name', 'Shop ID'],
          ['Phone number', 'Removed'],
          ['Exact address', 'Market name'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s rule.',
        tiles: ['Strip', 'personal', 'details', 'first'],
        distractors: ['later'],
      },
      {
        kind: 'sortGroups',
        prompt: 'OK to do, or not?',
        groups: ['OK', 'Not OK'],
        items: [
          { text: 'Pasting Shop IDs and counts', group: 0 },
          { text: 'Pasting ID card numbers', group: 1 },
          { text: 'Asking for a message template with blanks', group: 0 },
          { text: 'Pasting the full customer list into a free tool', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Ada look up who the 6 shops are?',
        options: [
          { text: 'In the company\'s own sheet, using the Shop IDs' },
          { text: 'Ask the AI', why: 'It never had the names.' },
          { text: 'On social media', why: 'Use your own records.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which spreadsheet at work has personal data in it? Which columns would you remove before using AI?',
    starters: ['The sheet:', 'I\'d remove...'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next AI data task, make a copy with all personal columns deleted, and use that.' },
  notes: 'Data-protection laws in Ghana (Data Protection Act, 2012) and Nigeria (NDPA, 2023) cover personal data; follow employer policy. Unit 10 covers this in depth. Content fictional.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 14. Before/After: sounding professional on the phone — answering, holding, transferring, voicemail. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Sounding professional on the phone',
  summary: 'Brian\'s desk phone rings while he\'s in a meeting. Remi answers: "Hello? ...Who? ...He\'s not here. ...Dunno. Bye." The caller was Ms Wekesa.',
  minutes: 12,
  outcomes: [
    'Answer a work phone call professionally',
    'Put someone on hold, take a message and end a call politely',
    'Leave a clear voicemail',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Brian\'s phone, two ways',
      before: {
        label: 'What Remi said',
        text: '"Hello?" ... "Who?" ... "He\'s not here." ... "Dunno when." ... "Bye."',
      },
      after: {
        label: 'What he could have said',
        text: '"Good afternoon, Brian Otieno\'s phone, Remi speaking." ... "May I ask who\'s calling?" ... "I\'m afraid Brian is in a meeting until about 4:30. Can I take a message, or ask him to call you back?" ... "Thank you, Ms Wekesa. I\'ll make sure he gets it. Have a good afternoon."',
      },
      notes: [
        'The greeting says whose phone it is and who\'s answering.',
        '"Who?" became "May I ask who\'s calling?"',
        '"He\'s not here" became where he is and when he\'s back, plus two options.',
        '"Bye" became a promise and a polite close.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>Phone phrases worth knowing:</strong></p><ul><li><strong>Answering:</strong> \"Good morning, [name/team], [your name] speaking.\"</li><li><strong>Asking who:</strong> \"May I ask who's calling?\" \"Could I take your name?\"</li><li><strong>Holding:</strong> \"Could you hold for a moment, please?\" (not \"hold on\").</li><li><strong>Transferring:</strong> \"I'll put you through to Finance.\"</li><li><strong>Bad line:</strong> \"Sorry, the line is a bit bad. Could you repeat that?\"</li><li><strong>Taking a message:</strong> name, number, what it's about, when they'd like a call back. Read the number back.</li><li><strong>Closing:</strong> \"Thank you for calling. Have a good afternoon.\"</li></ul><p><strong>Voicemail:</strong> name, why you're calling, your number (said slowly, twice), when you're free. Under 30 seconds.</p>",
    },
  ],
  apply: {
    scenario: 'Thursday, 3:40. Brian\'s phone is ringing again.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Best way to answer Brian\'s phone?',
        options: [
          { text: '"Hello?"', why: 'The caller doesn\'t know whose phone it is or who you are.' },
          { text: '"Good afternoon, Brian Otieno\'s phone, Remi speaking."' },
          { text: '"Yeah?"', why: 'Too casual for a work phone.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Upgrade each phone phrase.',
        pairs: [
          ['Who?', 'May I ask who\'s calling?'],
          ['Hold on.', 'Could you hold for a moment, please?'],
          ['He\'s not here.', 'I\'m afraid he\'s in a meeting until 4:30.'],
          ['What?', 'Sorry, the line is bad. Could you repeat that?'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put a phone message in order.',
        lines: ['Who called', 'Their number (read back to check)', 'What it\'s about', 'When they\'d like a call back'],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Back from my meeting! Did anyone call?',
        prompt: 'Remi passes on the message.',
        options: [
          { text: 'Ms Wekesa called at 3:40 about the delivery plan. She\'d like a call back before 5. Her number is on your desk.' },
          { text: 'Someone. Dunno who.', why: 'That\'s why we take messages.' },
          { text: 'Yeah, loads of people.', why: 'Who? About what?' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Polite way to ask someone to wait: "Could you ___ for a moment, please?" (one word)',
        answers: ['hold'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s voicemail to Kestrel. Which part is a problem?',
        lines: [
          'Hello, this is Remi from Synergix, about the delivery trial.',
          'Call me back on 0712345678 (said in one fast breath).',
          'I\'m free until 5 today. Thank you.',
        ],
        bug: 1,
        fix: 'My number is 0712 345 678, that\'s 0712 345 678.',
        explanation: 'Numbers said fast get lost. Say them slowly, in groups, twice.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Professional on the phone, or not?',
        groups: ['Professional', 'Not quite'],
        items: [
          { text: 'I\'ll put you through to Finance.', group: 0 },
          { text: 'Dunno, try someone else.', group: 1 },
          { text: 'Thank you for calling.', group: 0 },
          { text: 'Bye.', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How long should a voicemail be?',
        options: [
          { text: 'As long as it takes', why: 'Long voicemails get skipped.' },
          { text: 'Under 30 seconds: name, reason, number twice, when you\'re free' },
          { text: 'Just your name', why: 'They won\'t know why to call back.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['30-second intro', 'Name, role, work, link'],
          ['Specific thanks', 'What they did, why it mattered'],
          ['Kindly', 'Normal in Kenyan and Nigerian business English'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite close to a call.',
        tiles: ['Thank', 'you', 'for', 'calling.', 'Have', 'a', 'good', 'afternoon.'],
        distractors: ['Bye', 'Yo'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you answer the phone at work or for important calls? Write the greeting you\'ll use from now on.',
    starters: ['I usually say...', 'From now on: "..."'],
  },
  deepen: {
    title: 'Practise your voicemail',
    summary: 'Record a practice voicemail on your own phone: name, reason, number twice (slowly), when you\'re free. Listen back. Would you call yourself back?',
  },
  notes: 'Standard business telephone etiquette phrases. Example number is a placeholder format, not a real number.',
};

export default lesson;

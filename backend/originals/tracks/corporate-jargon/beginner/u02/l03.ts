import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Tap to explore: a meeting invite from Mrs Achieng — required/optional, tentative, hard stop, pre-read, time zones. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Reading a meeting invite',
  summary: 'An invite lands from Mrs Achieng, the CEO\'s assistant. Mr Kamau, Friday, "hard stop", "pre-read", and Remi is "optional". Does that mean he should go?',
  minutes: 12,
  outcomes: [
    'Decode a meeting invite: organiser, required, optional, tentative, hard stop, pre-read',
    'Reply to an invite the right way',
    'Avoid the time-zone trap',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Monday, 11:02 a.m. A new invite',
      text: 'Supplier review with Mr Kamau. Friday, 10:00 to 10:45 EAT. Organiser: Mrs Achieng. Required: Brian Otieno, Wanjiku (Finance). Optional: Remi. Agenda attached. Pre-read: supplier summary, by Thursday. Please note Mr Kamau has a hard stop at 10:45. Accept, Decline or Tentative?',
      hotspots: [
        { phrase: 'EAT', note: 'East Africa Time, the time zone for Nairobi. Invites with people in other cities show a time zone. Lagos is two hours behind Nairobi, so 10:00 EAT is 8:00 in Lagos.' },
        { phrase: 'Organiser', note: 'The person who set up the meeting. Questions about the meeting go to them.' },
        { phrase: 'Required', note: 'People the meeting needs. If you\'re required and can\'t come, tell the organiser.' },
        { phrase: 'Optional', note: 'Welcome, but not essential. Go if it helps your work and you have time. Remi wrote the pre-read, so it\'s a good one to go to.' },
        { phrase: 'Agenda', note: 'The list of topics, in order. Read it before you go.' },
        { phrase: 'Pre-read', note: 'A document everyone should read BEFORE the meeting, so the meeting can be spent deciding, not reading.' },
        { phrase: 'hard stop', note: 'A fixed time the person must leave, no matter what. Plan to finish the important things before it.' },
        { phrase: 'Tentative', note: 'A reply that means "maybe": you might come, but you\'re not sure yet.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'Optional. So I can skip it?' },
        { speaker: 'achieng', text: 'You can. You wrote the pre-read. If Mr Kamau asks a question about it and you\'re not there, who answers?' },
        { speaker: 'remi', text: '...Accepting now.' },
        { speaker: 'tey', text: "Mrs Achieng: 25 years at Synergix, never once wasted a word. Notice that \"optional\" doesn't mean \"unimportant\". It means \"your call\". Make the call based on whether you can help." },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Time zones catch everyone once. With colleagues in other cities, always check whose time the invite is in. "10:00" in Nairobi is "8:00" in Lagos.',
    },
  ],
  apply: {
    scenario: 'Monday. Mrs Achieng\'s invite is open.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Remi is "optional" on the invite. What does that mean?',
        options: [
          { text: 'He\'s not allowed to speak', why: 'Optional attendees can speak. It\'s about whether to come.' },
          { text: 'He\'s welcome, but the meeting can go ahead without him' },
          { text: 'He must come', why: 'That would be "required".' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the invite words.',
        pairs: [
          ['Organiser', 'Who set up the meeting'],
          ['Pre-read', 'Read this before the meeting'],
          ['Hard stop', 'Must leave at a fixed time'],
          ['Tentative', 'Maybe coming'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mr Kamau has a hard stop at 10:45. What does that mean for the meeting?',
        options: [
          { text: 'Get the important decisions done before 10:45, because he will leave then' },
          { text: 'The meeting will be very hard', why: 'It\'s about time, not difficulty.' },
          { text: 'They can run over if needed', why: 'A hard stop is exactly the time they can\'t run over.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The meeting is at 10:00 EAT (Nairobi). Lagos is two hours behind. What time is it in Lagos? (e.g. 9:00)',
        answers: ['8:00', '08:00', '8', '8am', '8 am', '8.00'],
        placeholder: 'Time',
      },
      {
        kind: 'sortGroups',
        prompt: 'Before or during the meeting?',
        groups: ['Before', 'During'],
        items: [
          { text: 'Read the pre-read', group: 0 },
          { text: 'Read the agenda', group: 0 },
          { text: 'Answer Mr Kamau\'s questions', group: 1 },
          { text: 'Reply Accept, Decline or Tentative', group: 0 },
          { text: 'Note the decisions', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I clicked Tentative on all fourteen of my meetings. That\'s polite, right?',
        prompt: 'What should Remi say?',
        options: [
          { text: 'Totally, very polite.', why: 'Tentative on everything leaves fourteen organisers guessing.' },
          { text: 'Tentative means "maybe". Better to decide: accept the ones you need, decline the rest with a short note.' },
          { text: 'Tentative means yes.', why: 'It means maybe.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan for Friday. Which line is a mistake?',
        lines: [
          'Thursday: send the pre-read to Mrs Achieng.',
          'Friday 9:55: join the meeting.',
          'Friday 10:40: bring up the most important question.',
        ],
        bug: 2,
        fix: 'Friday 10:05: bring up the most important question early.',
        explanation: 'With a hard stop at 10:45, the big question at 10:40 might never get answered.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Must-have', 'The plan fails without it'],
          ['Heads-up', 'An advance warning'],
          ['Sign-off', 'Official approval'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi can\'t make a meeting he\'s REQUIRED at. What should he do?',
        options: [
          { text: 'Just not turn up', why: 'If you\'re required, the organiser needs to know.' },
          { text: 'Click Tentative and hope', why: 'Leaves the organiser guessing.' },
          { text: 'Decline with a short note to the organiser and offer a fix, like sending his update in writing' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s note when declining an optional meeting.',
        tiles: ['Sorry,', 'I', 'can\'t', 'make', 'it.', 'Could', 'you', 'share', 'the', 'notes?'],
        distractors: ['tentative'],
      },
    ],
  },
  reflect: {
    prompt: 'Open your calendar, timetable or a group chat with an upcoming meeting. What would you check now that you didn\'t before: time zone, agenda, pre-read, hard stop?',
    starters: ['I\'d check...', 'Last time I got caught out by...'],
  },
  deepen: {
    title: 'The 60-second invite check',
    summary: 'Before every meeting this week: who\'s the organiser, am I required or optional, is there an agenda or pre-read, what time zone is it, and does anyone have a hard stop?',
  },
  notes: 'EAT = East Africa Time (UTC+3). Lagos = West Africa Time (UTC+1), two hours behind Nairobi. Required/optional/tentative = standard calendar invite terms (Outlook, Google Calendar). "Hard stop" (business jargon: an end time that can\'t be moved). "Pre-read" (Collins: material to read before a meeting).',
};

export default lesson;

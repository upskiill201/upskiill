import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 19. Tap to explore: Mrs Achieng's 9:15 briefing — level-set, the ask, table it (UK vs US!), take the temperature, land the plane. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The meeting phrasebook',
  summary: 'Friday, 9:15. Mrs Achieng gives Remi a five-minute briefing before the CEO meeting. It is short, dry, and full of phrases Remi has never heard. Tap each one.',
  minutes: 12,
  outcomes: [
    'Decode level-set, the ask, table it, take the temperature and land the plane',
    'Know that "table it" means opposite things in the UK and the US',
    'Prepare for an important meeting in five minutes',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Mrs Achieng\'s briefing, Friday 9:15',
      text: 'Let\'s level-set. Mr Kamau has read your pre-read. He will want the ask in the first two minutes, so lead with the numbers. If Emeka tables the Mombasa route, it is for discussion, not a decision. Take the temperature before you push for anything. And with ten minutes left, help him land the plane before his hard stop. Questions? Good.',
      hotspots: [
        { phrase: 'level-set', note: 'Make sure everyone starts with the same basic information. "Let\'s level-set" = let me make sure you know what I know.' },
        { phrase: 'the ask', note: 'What you\'re asking for: a decision, approval, money, help. "What\'s the ask?" = what do you want from us?' },
        { phrase: 'lead with', note: 'Start with. "Lead with the numbers" = say the numbers first.' },
        { phrase: 'tables', note: 'Careful! In British, Kenyan and most Commonwealth English, to "table" something means to PUT IT FORWARD for discussion. In American English it means the opposite: to POSTPONE it. If it matters, check which one people mean.' },
        { phrase: 'Take the temperature', note: 'Find out how people feel about something before pushing it. Picture checking a room\'s temperature before deciding what to wear.' },
        { phrase: 'land the plane', note: 'Bring a discussion to a conclusion: reach a decision before time runs out.' },
        { phrase: 'hard stop', note: 'A fixed time someone must leave. Mr Kamau leaves at 10:45, decision or not.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'remi', text: 'So: give the ask early, numbers first, check how people feel, and get a decision before 10:45.' },
        { speaker: 'achieng', text: 'Yes. You just said in fifteen words what took me forty-eight.' },
        { speaker: 'remi', text: 'Was that... a compliment?' },
        { speaker: 'achieng', text: 'It is 9:20, Remi. Go and land a plane.' },
        { speaker: 'tey', text: "In Mrs Achieng's language, that was a standing ovation." },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: '"Table it" is the most dangerous phrase in global business English: in the UK and Kenya it means "discuss it now", in the US it means "postpone it". With mixed teams, say what you mean in plain words.',
    },
  ],
  apply: {
    scenario: 'Friday, 9:20. Forty minutes to the CEO meeting.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match Mrs Achieng\'s phrases.',
        pairs: [
          ['Level-set', 'Make sure everyone starts from the same facts'],
          ['The ask', 'What you want from the meeting'],
          ['Take the temperature', 'Check how people feel'],
          ['Land the plane', 'Reach a conclusion'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In Nairobi, Emeka says, "I\'d like to table the Mombasa route." What does he mean?',
        options: [
          { text: 'He wants to postpone it', why: 'That\'s the American meaning. In Kenyan and British English, it\'s the opposite.' },
          { text: 'He wants to bring it up for discussion now' },
          { text: 'He wants to buy a table', why: 'Remi\'s literal brain is back.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Our client in New York just emailed: "Let\'s table the pricing discussion." Great, so we discuss it on Monday\'s call?',
        prompt: 'What should Remi point out?',
        options: [
          { text: 'Yes, they want to discuss it Monday.', why: 'In American English, table means postpone.' },
          { text: 'They want to cancel the contract.', why: 'Postpone a topic, not cancel a contract.' },
          { text: 'In American English, "table" usually means postpone. Best to check: "Just to confirm, shall we leave pricing for now?"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"What\'s the ___?" means "What do you want from us?" (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'When in the CEO meeting should Remi do each thing?',
        groups: ['Early', 'Late'],
        items: [
          { text: 'State the ask', group: 0 },
          { text: 'Lead with the numbers', group: 0 },
          { text: 'Land the plane', group: 1 },
          { text: 'Recap the decision', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s plan. Which line ignores the briefing?',
        lines: [
          '10:00: The ask, in one sentence.',
          '10:02: The three key numbers.',
          '10:40: Start explaining the background history.',
        ],
        bug: 2,
        fix: '10:35: Help Mr Kamau land the plane: decision and next steps.',
        explanation: 'With a hard stop at 10:45, the last ten minutes are for deciding, not background.',
      },
      {
        kind: 'mcq',
        prompt: 'Why "take the temperature before you push"?',
        options: [
          { text: 'The office air conditioning is unreliable', why: 'Possibly. But it means checking how people feel.' },
          { text: 'To check how people feel before asking them to agree' },
          { text: 'To make the meeting longer', why: 'It usually makes decisions faster.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s fifteen-word summary.',
        template: 'Give the [[1]] early, [[2]] with the numbers, check how people feel, then [[3]] the plane.',
        blanks: [['ask'], ['lead', 'start'], ['land']],
        distractors: ['table', 'fly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Rabbit hole', 'A detour that wastes time'],
          ['AOB', 'Any other business'],
          ['Sorry to jump in', 'Polite interruption'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the plain-words version of "Let\'s table it" for a mixed UK/US team.',
        tiles: ['Let\'s', 'discuss', 'this', 'now.'],
        distractors: ['table', 'postpone'],
      },
    ],
  },
  reflect: {
    prompt: 'Before your next important meeting, exam or conversation: what\'s your "ask", what will you lead with, and how will you "land the plane"?',
    starters: ['My ask is...', 'I\'ll lead with...', 'I\'ll land it by...'],
  },
  deepen: {
    title: 'Watch out for false friends',
    summary: 'Some phrases mean different things in different Englishes: "table it", "quite good" (UK: fairly good; US: very good), "I\'m coming" (in parts of West Africa: I\'ll be right back). Start a list of the ones you meet.',
  },
  notes: '"Table" — Cambridge/Merriam-Webster: UK = present for discussion; US = postpone consideration. "Level-set" (business jargon: establish a common baseline), "the ask" (noun use, Merriam-Webster), "take the temperature" (gauge opinion), "land the plane" (business jargon: bring to conclusion). "I\'m coming" (Nigerian/Ghanaian English: I\'ll be back shortly) — widely documented in West African English usage.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge: the big minute, the judges' questions, and one more lift ride. Ends the course. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final Challenge: the big minute',
  summary: '"Speaker seven: Ada, with Ajo Tracker." Three hundred people. Three judges. One microphone. One minute. Then two minutes of questions from Mrs Adeyemi. And after that, one more lift ride.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one high-stakes moment',
    'Pitch, handle questions and close strong',
    'Turn a pitch into the next conversation',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Lagos Tech Fest, pitch night. 7:48 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The host: "Speaker seven: Ada, with Ajo Tracker." In row 3, Tunde holds up his sign: NO HOSTAGES.' },
        { speaker: 'ada', text: '(walking on, breathing out slowly) I\'m excited. Feet planted. Find a friendly face.' },
        { speaker: 'narrator', text: 'The spotlight. The silence. Mrs Adeyemi, in the middle of the judges\' table, looks up from her notes. The stopwatch on the big screen reads 0:60.' },
        { speaker: 'narrator', text: 'Five weeks ago, Ada talked about databases for thirty floors. Tonight, you\'re with her for every second.' },
      ],
    },
  ],
  apply: {
    scenario: 'Pitch night. The big minute.',
    items: [
      {
        kind: 'mcq',
        prompt: '0:60 on the clock. What are Ada\'s first words?',
        options: [
          { text: '"Ten colleagues. Two hundred thousand naira a month. One notebook. What could possibly go wrong?"' },
          { text: '"Hello, my name is Ada and my app is Ajo Tracker."', why: 'The name badge. The host already said it.' },
          { text: '"Sorry, I\'m a bit nervous..."', why: 'No apologies in the first ten seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'The room laughs at "Tunde swore he\'d paid in March." What does Ada do?',
        options: [
          { text: 'Talks over the laugh to save time', why: 'The next line gets lost in the noise.' },
          { text: 'Adds another joke', why: 'Stick to the beats.' },
          { text: 'Pauses, smiles, lets the laugh finish, then carries on' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s minute in order.',
        lines: ['The hook', 'Tunde\'s story', 'What the app does', 'The treasurer in two seconds', 'Growth numbers', 'The ask', 'The rhyme, then silence'],
      },
      {
        kind: 'sortGroups',
        prompt: 'On stage: do it, or don\'t?',
        groups: ['Do it', 'Don\'t'],
        items: [
          { text: 'One sentence to one face, then move', group: 0 },
          { text: 'Read from the card', group: 1 },
          { text: 'Step forward for the ask', group: 0 },
          { text: '"So yeah, that\'s basically it"', group: 1 },
          { text: 'Ask before second 55', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '(second 0:52, in her head) Ask done. Rhyme done. The room is silent. Do I fill it?',
        prompt: 'Your advice?',
        options: [
          { text: 'Yes, explain the database.', why: 'Five weeks of work, gone.' },
          { text: 'Say "So yeah, that\'s it."', why: 'Speaker 6\'s ending.' },
          { text: 'No. Stop, smile, wait. The silence means they\'re about to clap.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s closing rhyme: "No more fights about who\'s ___." (one word)',
        answers: ['paid'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Q&A. Mrs Adeyemi: "How do you make money?" Best answer?',
        options: [
          { text: '"Ads? Probably?"', why: 'Speaker 5\'s answer.' },
          { text: '"Each group pays ₦2,000 a month after a free first month. Ten offices have already signed up."' },
          { text: 'A five-minute explanation of pricing theory', why: 'Answer first, one reason, stop.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Mrs Adeyemi: "You\'re very early in your career. Can you really grow this?" Best answer?',
        options: [
          { text: '"Fair question. I\'m early, yes. But I grew it from one group to three alone, and that\'s exactly why I\'m asking for a mentor."' },
          { text: '"I\'m just a junior designer, so maybe not."', why: 'The "just" is back.' },
          { text: '"That\'s a silly question."', why: 'Defensive, on stage.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A judge asks something Ada doesn\'t know: "What\'s your cost per new group?" Which reply is a mistake?',
        lines: [
          'I don\'t know yet.',
          'Let me guess: probably about ₦47.39, roughly, I think.',
          'I\'m tracking it with the ten new offices, and I\'ll know by December.',
        ],
        bug: 1,
        fix: 'Delete the guess. Honest "not yet", then how she\'ll find out.',
        explanation: 'A precise-sounding guess is a bluff. Honesty plus a plan sounds more confident.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Results. Second place from the judges. But I won the AUDIENCE vote. Tunde is crying. Arjun is calling. Mrs Adeyemi just... walked towards the lift.',
        prompt: 'What should Ada do?',
        options: [
          { text: 'Let her go; second place is fine.', why: 'The ask was a mentor, not first place.' },
          { text: 'Follow her. A lift is where this started, and she has a 10-second version ready.' },
          { text: 'Shout across the hall.', why: 'Walk calmly. Lifts are slow.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'The lift. Floor 1 to 32. Mrs Adeyemi: "Well. The database girl." What does Ada say?',
        options: [
          { text: '"Let me explain the database properly this time."', why: 'Full circle in the wrong direction.' },
          { text: '"Sorry about the first lift..."', why: 'No apologies. She\'s earned this.' },
          { text: '"Not tonight. I help savings groups track who\'s paid. You\'ve grown three fintechs from one office. Would you be my mentor?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment of the night to the chapter that prepared it.',
        pairs: [
          ['The hook and the Tunde story', 'Chapter 3: Make it stick'],
          ['Breathing and "I\'m excited"', 'Chapter 4: Say it like you mean it'],
          ['"Fair question. I\'m early, yes."', 'Chapter 5: Tough questions'],
          ['The one-sentence lift pitch', 'Chapter 1: Your one sentence'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Floor 32. Ding. She said: "Yes. Send me your numbers by Friday. And Ada? That was the best lift pitch I\'ve heard all year." ARJUN. TUNDE. EVERYONE.',
        prompt: 'What does Arjun reply?',
        options: [
          { text: 'Five weeks ago she walked out on you in that lift. Tonight she said yes in the same one. You didn\'t change who you are. You changed how you say it.' },
          { text: 'Now explain the database to her.', why: 'Never.' },
          { text: 'You should have won first place.', why: 'She got exactly what she asked for.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course in one line.',
        template: 'One clear [[1]]. A story that [[2]]. Say it like you mean it, and end with an [[3]].',
        blanks: [['sentence'], ['sticks'], ['ask']],
        distractors: ['database', 'apology'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mrs Adeyemi\'s answer.',
        tiles: ['Yes.', 'Send', 'me', 'your', 'numbers', 'by', 'Friday.'],
        distractors: ['Hmm.'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you want to pitch to in the next month, and what\'s your ask? Write your 10-second version and your 60-second version. Then go and give it.',
    starters: ['I\'ll pitch to...', 'My ask: ...', '10 seconds: ...', '60 seconds: ...'],
  },
  deepen: {
    title: 'Your big minute',
    summary: 'Ada\'s big minute was pitch night. Yours might be an interview, a careers fair, a meeting with your boss, a scholarship panel or a stranger at a wedding. One sentence. A story. A clear ask. Then stop, smile and wait. Good luck.',
  },
  notes: 'Final Challenge: reviews all five chapters. Milestone uses UNIT_CHALLENGE (the type has no separate final value). Results (second place, audience vote, mentorship) are fictional; the ending deliberately rewards the specific ask rather than "winning".',
};

export default lesson;

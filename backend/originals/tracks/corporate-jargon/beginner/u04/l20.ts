import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: Remi's message to Mr Kamau. Cliffhanger into Chapter 5 (reply all). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: the message to Mr Kamau',
  summary: 'Friday, 3:00. Mrs Achieng\'s deadline. Remi has to write to the CEO himself, asking for ten minutes to show the tracker. Last time he tried, it started with "hey bro".',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Write a short, professional request to a very senior person',
    'Choose every word for the reader: greeting, request, reason, sign-off',
    'Handle the reply, whatever it is',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:00 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi\'s screen. A blank email. To: Peter Kamau. Subject: (empty). On a sticky note by the screen, Mrs Achieng\'s rule: "When in doubt, one step more formal. Use their name."' },
        { speaker: 'zanele', text: 'Want me to read it before you send? I promise no fire emojis.' },
        { speaker: 'remi', text: 'Give me fifteen minutes.' },
        { speaker: 'tey', text: "Four days ago this email started with \"hey bro\". Let's write the one that ends this chapter. Every tool, all at once." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. The email to the CEO.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Subject line?',
        options: [
          { text: 'hey', why: 'Tells him nothing, and the lift memory returns.' },
          { text: 'Request: 10 minutes to show the delivery tracker' },
          { text: 'URGENT PLEASE READ', why: 'It isn\'t urgent.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Greeting?',
        options: [
          { text: 'Dear Mr Kamau,' },
          { text: 'Hi Peter,', why: 'He hasn\'t invited first names.' },
          { text: 'Yo Mr K,', why: 'We\'ve been here before.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the body of the email in order.',
        lines: [
          'I hope you\'re well.',
          'I\'d like to show you the delivery tracker I\'ve built for the Mombasa route.',
          'It shows why deliveries are late, and Ms Wekesa has already found it useful.',
          'Would you have ten minutes next week?',
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1. Which line goes?',
        lines: [
          'Dear Mr Kamau,',
          'Sorry sorry to bother you, I know you\'re super busy and this is probably not important.',
          'Would you have ten minutes next week to see the delivery tracker?',
        ],
        bug: 1,
        fix: 'I hope you\'re well.',
        explanation: 'Stacked apologies undersell the work. A short, polite line is enough.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in the email to the CEO, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'One sentence on why the tracker matters', group: 0 },
          { text: 'A joke about the lift', group: 1 },
          { text: 'A clear request for ten minutes', group: 0 },
          { text: 'gonna / stuff / tbh', group: 1 },
          { text: 'An offer to fit his diary', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How should Remi ask for the time?',
        options: [
          { text: '"Give me ten minutes."', why: 'An order to the CEO.' },
          { text: '"u free?"', why: 'Register: missing.' },
          { text: '"Would you have ten minutes next week? I\'m happy to fit around your diary."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sign-off for the CEO: "Kind ___, Remi" (one word)',
        answers: ['regards'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the email to the chapter tool behind it.',
        pairs: [
          ['Dear Mr Kamau', 'Names and titles'],
          ['Would you have...?', 'The request ladder'],
          ['No "sorry sorry"', 'Saying sorry the right amount'],
          ['Kind regards', 'Sign-offs that fit'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Read it. It\'s perfect. Maybe ONE emoji at the end? A small one?',
        prompt: 'Remi\'s reply?',
        options: [
          { text: 'Fine, one fire.', why: 'Mrs Achieng\'s sticky note disagrees.' },
          { text: 'Three emojis.', why: 'Mrs Achieng would retire.' },
          { text: 'No emoji. Thank you though, really.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Remi wants to mention the lift. Should he?',
        options: [
          { text: 'Yes, a full apology paragraph', why: 'It turns a tiny moment into a big one.' },
          { text: 'No: lunch already reset it. Let the professional email speak for itself' },
          { text: 'Yes, as a joke: "Sorry for the yo lol"', why: 'Not in a formal request.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Final check. Which line still slipped?',
        lines: [
          'Dear Mr Kamau,',
          'I\'d like to show you the delivery tracker I\'ve built.',
          'Would you have ten minutes next week? Lemme know.',
          'Kind regards, Remi',
        ],
        bug: 2,
        fix: 'Would you have ten minutes next week? I\'m happy to fit around your diary.',
        explanation: '"Lemme know" is one casual word too many for the CEO.',
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'Dear Remi, Thank you. Tuesday at 9:00, my office. Bring Brian. Regards, Peter Kamau',
        prompt: 'He signed "Peter Kamau". How does Remi reply?',
        options: [
          { text: 'Dear Mr Kamau, Thank you. Tuesday at 9:00 is perfect; I\'ll bring Brian. Kind regards, Remi' },
          { text: 'thx Peter!!', why: 'Signing a full name isn\'t an invitation to "thx Peter!!"' },
          { text: 'Noted.', why: 'Cold, to the CEO who just said yes.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Tuesday, 8:58, the lift again. Mr Kamau steps in. Remi says:',
        options: [
          { text: '"Yo."', why: 'The universe is testing you.' },
          { text: '"Good morning, Mr Kamau. Looking forward to showing you the tracker."' },
          { text: 'Nothing; he stares at the floor numbers', why: 'A greeting is kinder.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'The whole week: which register for each?',
        groups: ['Casual', 'Neutral', 'Formal'],
        items: [
          { text: 'Zanele in chat', group: 0 },
          { text: 'Brian, everyday update', group: 1 },
          { text: 'Mr Kamau, first request', group: 2 },
          { text: 'Ms Wekesa, a client', group: 2 },
          { text: 'Wanjiku, asking for numbers', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mrs Achieng\'s sticky note, from memory.',
        template: 'When in [[1]], one step more [[2]]. Use their [[3]].',
        blanks: [['doubt'], ['formal'], ['name']],
        distractors: ['casual', 'emoji'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review across the course.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Pre-read', 'Read before the meeting'],
          ['ROI', 'Return on investment'],
          ['Register', 'How formal your language is'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Did you email the CEO?? What did you write?? Please tell me it wasn\'t "yo".',
        prompt: 'Remi\'s voice note to Ada.',
        options: [
          { text: 'It was "yo" again.', why: 'It wasn\'t. He\'s grown.' },
          { text: 'Can\'t talk, very important now.', why: 'Too much success, too fast.' },
          { text: '"Dear Mr Kamau." Ten minutes, Tuesday at nine. And I said good morning in the lift. Like a professional.' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the subject line Remi sent.',
        tiles: ['Request:', '10', 'minutes', 'to', 'show', 'the', 'delivery', 'tracker'],
        distractors: ['hey', 'URGENT'],
      },
    ],
  },
  reflect: {
    prompt: 'Who is the most senior person you could write to about something that matters to you? Draft the email: subject, greeting, two sentences, a polite request, a sign-off.',
    starters: ['Subject: ...', 'Dear ...,', 'Would you have...?'],
  },
  deepen: {
    title: 'Coming up in Chapter 5: reply all',
    summary: 'Monday, 9:14 a.m. Felix, back from the beach, sends a note about the new printer to "All Synergix Staff". All 900 of them. By 9:20, someone has replied to everyone: "Please remove me from this list." By 9:21, forty people have replied to everyone asking to be removed. Remi\'s finger is hovering over Reply All.',
  },
  notes: 'Unit Challenge: reviews all of Chapter 4 plus earlier. Mr Kamau signs as "Peter Kamau" (CAST.md: first name Peter).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: the lift incident, then the "hey bro" message. Why the same words land differently with different people. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The lift incident',
  summary: 'Monday, 8:01. The lift doors open. Mr Kamau steps in. Remi says "Yo." Then, to make it better, he sends the CEO a message. It makes it worse.',
  minutes: 12,
  outcomes: [
    'See why the same words can be fine with a friend and wrong with the CEO',
    'Know what "register" means: how formal your English is',
    'Recover from a too-casual moment',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 8:01 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The lift doors open on the ground floor. Inside: Mr Kamau, the CEO, alone, holding a coffee. Remi steps in. Friday\'s KPI deck went perfectly. He is feeling unstoppable.' },
        { speaker: 'remi', text: 'Yo.' },
        { speaker: 'narrator', text: 'Mr Kamau looks at him. Nods once. "Good morning." The doors close. Seven floors. Nobody speaks. It is the longest lift ride in the history of Nairobi.' },
        { speaker: 'narrator', text: 'At his desk, Remi decides to fix it. He opens the company chat and types to Mr Kamau: "hey bro sorry abt the lift lol. u got a sec this week? wanna show u my tracker thing".' },
        { speaker: 'tey', text: "Remi. Remi, no. Put the phone down. Let's think about this together." },
      ],
      choice: {
        prompt: 'The message is typed. What should Remi do?',
        options: [
          {
            text: 'Send it. Mr Kamau seemed relaxed.',
            outcome: 'Ten minutes later, Mrs Achieng appears at Remi\'s desk. She doesn\'t say anything. She just looks at him, for a long time. Then: "My office. Two minutes."',
          },
          {
            text: 'Delete it, and ask someone how to write to the CEO.',
            outcome: 'Remi asks Brian. Brian laughs for a full minute, then says: "Ask Mrs Achieng. She\'s trained three CEOs and about two hundred interns." It\'s the start of a very useful week.',
            best: true,
          },
          {
            text: 'Send it to Zanele instead, for a second opinion.',
            outcome: 'Zanele replies: "PERFECT. Add a fire emoji." Remi realises he needs a different second opinion.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Nothing Remi said was rude. \"Yo\" and \"hey bro\" are friendly. The problem is <strong>register</strong>: how formal or casual your language is.</p><p>You change register all the time without thinking. You talk to your grandmother differently from your best friend. At work, it's the same skill, just with more people to judge it:</p><ul><li><strong>Casual:</strong> friends, close teammates. \"Hey, got a sec?\"</li><li><strong>Neutral:</strong> most colleagues, most of the time. \"Hi Brian, do you have a minute?\"</li><li><strong>Formal:</strong> senior people you don't know well, clients, first contact. \"Good morning, Mr Kamau. Would you have ten minutes this week?\"</li></ul><p>This chapter is about choosing the right one, quickly, and switching without sounding stiff.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you\'re not sure, go one step more formal than you think. It\'s easy to relax later. It\'s hard to take back "yo".',
    },
  ],
  apply: {
    scenario: 'Monday, 8:09. The message is still unsent.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the problem with "Yo" in the lift?',
        options: [
          { text: 'It\'s a rude word', why: 'It\'s friendly. It just didn\'t fit the person.' },
          { text: 'The register was too casual for the CEO, someone Remi barely knows' },
          { text: 'Remi should have stayed silent', why: 'A greeting is good. The choice of word was the issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Casual, neutral or formal?',
        groups: ['Casual', 'Neutral', 'Formal'],
        items: [
          { text: 'Yo!', group: 0 },
          { text: 'Hi Brian, do you have a minute?', group: 1 },
          { text: 'Good morning, Mr Kamau.', group: 2 },
          { text: 'u got a sec?', group: 0 },
          { text: 'Would you have ten minutes this week?', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "register" mean, when we talk about language?',
        options: [
          { text: 'Signing your name at reception', why: 'Different register. Ha.' },
          { text: 'How loud you speak', why: 'It\'s about formality, not volume.' },
          { text: 'How formal or casual your language is' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Your message to Mr Kamau is PERFECT. Add a fire emoji and send!!',
        prompt: 'What does Remi reply?',
        options: [
          { text: 'I think I need a more... formal second opinion. Asking Brian.' },
          { text: 'Sending with two fire emojis!', why: 'That message is not getting better with emojis.' },
          { text: 'You\'re right, I\'m sending it.', why: 'Think about who\'s reading it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Not sure how formal to be? Go one step MORE ... (one word)',
        answers: ['formal'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft to the CEO. Which part is most too casual?',
        lines: [
          'hey bro',
          'I\'d like to show you a delivery tracker I\'ve built.',
          'Would you have ten minutes this week?',
        ],
        bug: 0,
        fix: 'Good morning, Mr Kamau,',
        explanation: '"Bro" is for friends. For the CEO, start with a proper greeting and his name.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the same request in three registers.',
        pairs: [
          ['Casual', 'got a sec?'],
          ['Neutral', 'Do you have a minute?'],
          ['Formal', 'Would you have ten minutes this week?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'It\'s Tuesday. Remi sees Mr Kamau in the lift again. Best greeting?',
        options: [
          { text: '"Yo again!"', why: 'Bold. Not recommended.' },
          { text: '"Good morning, Mr Kamau."' },
          { text: 'Pretend to be on the phone', why: 'Tempting. But a simple greeting fixes everything.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['EOD', 'End of day'],
          ['Hard stop', 'Must leave at a fixed time'],
          ['Circle back', 'Come back to it later'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s Tuesday lift greeting.',
        tiles: ['Good', 'morning,', 'Mr', 'Kamau.'],
        distractors: ['Yo', 'bro'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you used the wrong register: too casual with someone senior, or too formal with a friend. What happened?',
    starters: ['It happened when...', 'Now I\'d say...'],
  },
  deepen: {
    title: 'Listen for register',
    summary: 'This week, notice how people around you change their language: with a manager, a client, a friend, a parent. Everyone switches. Notice the words that change.',
  },
  notes: 'Register (linguistics: variety of language used for a particular purpose or social setting; Cambridge). Formality norms vary by culture and company; the lesson recommends erring formal when unsure.',
};

export default lesson;

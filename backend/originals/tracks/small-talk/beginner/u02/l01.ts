import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story with a choice: the nine-second conversation at Friday drinks. Starting is easy; keeping it going is the skill. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The nine-second conversation',
  summary: 'Friday drinks. Grace opens a conversation with Dan from Sales. Nine seconds later it\'s dead. She has opened the door; she just doesn\'t know how to walk through it.',
  minutes: 12,
  outcomes: [
    'See why most small talk dies after the opener',
    'Know the three moves that keep a conversation alive: ask, listen, share',
    'Rescue a conversation that\'s stalling',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 5:20 p.m., the pub round the corner',
      beats: [
        { speaker: 'grace', text: 'Hi, I\'m Grace. I started on Monday.' },
        { speaker: 'narrator', text: 'Dan from Sales: "Oh hi. I\'m Dan."' },
        { speaker: 'grace', text: '...Nice.' },
        { speaker: 'narrator', text: 'Dan: "...Yeah." He looks at his drink. Grace looks at hers. Somewhere, a glass breaks. Nine seconds in total.' },
        { speaker: 'tey', text: "Grace did the hard part: she started it. Then she gave Dan nothing to hold. Here's the thing: a conversation is a game of catch. You threw the ball, he caught it and threw it back. Now you have to catch it and throw again." },
      ],
      choice: {
        prompt: 'Dan is about to drift away. What should Grace do?',
        options: [
          {
            text: 'Ask about him and share a little: "What do you do in Sales? I\'m still working out who does what. I used to be a nurse, so it\'s all new."',
            outcome: 'Dan perks up. "A nurse? No way. My mum\'s a midwife." Twenty minutes later they\'re still talking, about hospitals, sales targets and terrible night shifts.',
            best: true,
          },
          {
            text: 'Say "Well, nice to meet you" and walk off.',
            outcome: 'Polite, but over. Dan thinks she wasn\'t interested. Grace thinks HE wasn\'t. Neither is true.',
          },
          {
            text: 'Fill the silence with a long story about her first week.',
            outcome: 'Dan nods for four minutes. He learns a lot about Grace\'s lanyard. She learns nothing about him.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Most conversations don't die because people are boring. They die because <strong>nobody throws the ball back</strong>.</p><p>\"Hi, I'm Grace.\" \"I'm Dan.\" \"Nice.\" That's three catches and no throws.</p><p>This chapter is about the three moves that keep a conversation alive:</p><ul><li><strong>Ask:</strong> questions, especially follow-up questions.</li><li><strong>Listen:</strong> really listen, and catch the hooks people give you.</li><li><strong>Share:</strong> give a little of yourself, so the other person has something to ask about.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A conversation is a game of catch. Every time you answer, throw something back: a question, or a little detail about you.',
    },
  ],
  apply: {
    scenario: 'Friday drinks. Nine seconds.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Grace\'s conversation with Dan die so fast?',
        options: [
          { text: 'Dan is rude', why: 'He answered. Nobody threw the ball back.' },
          { text: 'Neither of them gave the other anything to respond to' },
          { text: 'Pubs are too loud for talking', why: 'Loud, yes. Not the reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to what it sounds like.',
        pairs: [
          ['Ask', '"What do you do in Sales?"'],
          ['Share', '"I used to be a nurse, so it\'s all new."'],
          ['Listen', 'Catching "my mum\'s a midwife"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Throws the ball back, or drops it?',
        groups: ['Throws it back', 'Drops it'],
        items: [
          { text: 'Nice.', group: 1 },
          { text: 'What made you go into Sales?', group: 0 },
          { text: 'Cool.', group: 1 },
          { text: 'I\'m new too. How long have you been here?', group: 0 },
          { text: 'Yeah.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Dan) "Yeah, I\'ve been in Sales about three years."',
        prompt: 'Grace\'s best next line?',
        options: [
          { text: 'Okay.', why: 'Dropped.' },
          { text: 'I hate sales.', why: 'Honest, maybe. Not the way to keep it going.' },
          { text: 'Three years! What keeps you there? I\'m still working out what Sales actually does here.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A conversation is a game of ... (one word)',
        answers: ['catch'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Grace tells a four-minute story about her lanyard. What went wrong?',
        options: [
          { text: 'She shared, but never asked, so it became a speech' },
          { text: 'The story wasn\'t funny enough', why: 'Length and balance were the problem, not humour.' },
          { text: 'Nothing, Dan loved it', why: 'Dan nodded politely for four minutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s second try. Which line drops the ball?',
        lines: [
          'Hi Dan, how was your week?',
          'Oh, a big client meeting? How did it go?',
          'Right. Anyway.',
        ],
        bug: 2,
        fix: 'Mine was a lot of new names. Are client meetings always that stressful?',
        explanation: '"Right. Anyway." gives Dan nothing back. Share a little or ask a follow-up.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Notice + ask', 'The all-purpose opener'],
          ['Liking gap', 'People like you more than you think'],
          ['Open question', 'Invites a story'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three moves.',
        template: '[[1]], listen, [[2]].',
        blanks: [['Ask'], ['share', 'Share']],
        distractors: ['Leave', 'Lecture'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a line that asks AND shares.',
        tiles: ['What', 'do', 'you', 'do?', 'I\'m', 'new', 'in', 'research.'],
        distractors: ['Nice.', 'Okay.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a conversation that died quickly. Was it a dropped ball? What could you have thrown back?',
    starters: ['The conversation was with...', 'I could have thrown back...'],
  },
  deepen: {
    title: 'Count the throws',
    summary: 'In your next small talk, notice: after each answer, did you throw something back? A question or a detail. It\'s harder than it sounds, and it changes everything.',
  },
  notes: 'Ask/listen/share is a teaching framework; question-asking and reciprocity research in lessons 2 and 4 (Huang et al. 2017). Dan is a named extra (lines narrated).',
};

export default lesson;

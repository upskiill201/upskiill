import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 plus earlier. Story beat: Mrs Achieng's office, and a red pen. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mrs Achieng\'s lesson',
  summary: 'Tuesday, 8:30. Mrs Achieng\'s office. She has printed five of Remi\'s messages from the past week, and a red pen is involved.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Choose the right register for the reader', 'Fix greetings, requests and sign-offs without notes'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 8:30 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Mrs Achieng\'s office has one plant, one framed photo of three former CEOs, and five printed messages on the desk. All of them are Remi\'s.' },
        { speaker: 'achieng', text: 'Sit. You are not in trouble. You are in training. There is a difference, and I decide which.' },
        { speaker: 'achieng', text: 'Each of these is fine for someone. None of them is fine for everyone. Your job is to know who is reading. Begin.' },
        { speaker: 'tey', text: "Mrs Achieng's red pen has trained three CEOs. Let's see how you do." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. Mrs Achieng\'s five messages.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Message 1, to Zanele: "hey can u send me the drone thing lol". Mrs Achieng\'s verdict?',
        options: [
          { text: 'Rewrite it formally', why: 'For a close teammate in chat, casual is fine.' },
          { text: 'Never use "lol" with anyone', why: 'With friends and close teammates, it\'s fine.' },
          { text: 'Fine: Zanele is a close teammate, and it\'s a casual chat' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Message 2, to Mr Kamau. Which line gets the red pen?',
        lines: [
          'hey bro sorry abt the lift lol',
          'I\'d like to show you the delivery tracker.',
          'Would you have ten minutes this week?',
        ],
        bug: 0,
        fix: 'Good morning, Mr Kamau,',
        explanation: 'For the CEO: a proper greeting, his name and title, full words.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which register for which reader?',
        groups: ['Casual', 'Neutral', 'Formal'],
        items: [
          { text: 'Zanele, in chat', group: 0 },
          { text: 'Wanjiku, a colleague', group: 1 },
          { text: 'Mr Kamau, first message', group: 2 },
          { text: 'A new client', group: 2 },
          { text: 'Brian, everyday', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'Message 3: "Send me the board calendar." Rewrite it. For me.',
        prompt: 'Remi\'s rewrite?',
        options: [
          { text: 'Good morning, Mrs Achieng. Would you be able to share the board calendar when you have a moment? Many thanks, Remi' },
          { text: 'Board calendar pls?', why: 'Still a bit casual for Mrs Achieng.' },
          { text: 'Yo, calendar?', why: 'The red pen trembles.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to the ladder step.',
        pairs: [
          ['Can you...?', 'Casual and direct'],
          ['Could you...?', 'Everyday polite'],
          ['Would you mind...?', 'Softer, extra work'],
          ['Is there any chance...?', 'A difficult ask'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mrs Achieng: "You must know who is ___ ." (one word)',
        answers: ['reading'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Message 4 is to a new client and ends "Cheers mate, R". The fix?',
        options: [
          { text: '"Cheers mate, Remi"', why: 'The name helps, but "cheers mate" is still very casual.' },
          { text: '"Kind regards, Remi"' },
          { text: '"Bye"', why: 'Too abrupt.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Message 5, from Emeka in Lagos: "Kindly confirm receipt." How should Remi read it?',
        options: [
          { text: 'As rude', why: '"Kindly" is normal, polite business English in Nigeria.' },
          { text: 'As a polite request to confirm he received it' },
          { text: 'As a joke', why: 'It\'s a real, simple request: confirm you got it.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Pre-read', 'Read before the meeting'],
          ['TBC', 'To be confirmed'],
          ['Take it offline', 'Discuss it separately'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Mrs Achieng\'s rule, written on a sticky note.',
        template: 'When in [[1]], go one step more [[2]]. Use their [[3]].',
        blanks: [['doubt'], ['formal'], ['name']],
        distractors: ['casual', 'nickname'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s answer to Mrs Achieng.',
        tiles: ['Thank', 'you,', 'Mrs', 'Achieng.', 'I\'ll', 'rewrite', 'them', 'today.'],
        distractors: ['bro', 'lol'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at five messages you sent this week. Who were they to? Was each one on the right step of the ladder?',
    starters: ['The best one was...', 'The one I\'d rewrite is...'],
  },
  deepen: {
    title: 'Find your Mrs Achieng',
    summary: 'Every workplace has someone who knows how things are really done. Find them, be polite, and ask one question a week. It\'s the best free training there is.',
  },
  notes: 'Review of lessons 1–4 plus Chapters 1–3.',
};

export default lesson;

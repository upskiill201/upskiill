import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Chat with Tey: small talk on video calls — Grace's first call with Arjun in Bengaluru. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Small talk on video calls',
  summary: 'Wednesday, 2 p.m. in Manchester, 6:30 p.m. in Bengaluru. Grace\'s first call with Arjun, the freelance developer. The first thirty seconds: two faces, a lag, and nobody sure who speaks first.',
  minutes: 12,
  outcomes: [
    'Start a video call warmly in the first thirty seconds',
    'Use time zones, backgrounds and days as easy openers',
    'Handle the lag and the "you go, no you go"',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Wednesday, 2:00 p.m. Grace joins the call. Arjun's face appears, frozen mid-blink. Then he unfreezes. Two seconds of silence, then they both say \"Hi!\" at the same time, then both say \"Sorry, you go!\" Classic. What now?",
          replies: ['Laugh about it?', 'Just start the meeting.'],
        },
        {
          tey: "Laugh about it. It happens on every call. \"Ha, the famous video-call dance. Hi Arjun! Lovely to finally meet you.\" Then use what's special about video: you can see a bit of each other's world.",
          replies: ['Like what?'],
        },
        {
          tey: "Time zones are gold: it's 6:30 p.m. for Arjun. \"Thanks for staying late! Is this the end of your day?\" Backgrounds are hooks: Arjun has a guitar behind him. \"Is that a guitar? Do you play?\" Even the weather works, because it's probably different: \"Is it as grey there as it is here?\"",
          replies: ['How long should it last?'],
        },
        {
          tey: "On a work call, thirty seconds to two minutes, depending on the call. Video small talk is shorter than in person, because everyone can see the clock. Then move on clearly: \"Shall we jump in?\"",
          replies: ['What about the lag?'],
        },
        {
          tey: "Pause a little longer than feels natural before you speak, so you don't talk over each other. And if you do: \"Sorry, go ahead.\" With people in other countries, slow down slightly and avoid local slang. \"Mint\" and \"buzzin'\" are Manchester gold, and Bengaluru mysteries.",
        },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'grace', text: 'Is that a guitar behind you? Do you play?' },
        { speaker: 'arjun', text: 'Badly. But precisely. I practise the same four chords every evening.' },
        { speaker: 'grace', text: 'Precisely badly. That\'s my approach to tech so far.' },
        { speaker: 'arjun', text: 'Then we will get on very well. Shall we jump in?' },
      ],
    },
  ],
  apply: {
    scenario: 'Wednesday, 2 p.m. First call with Arjun.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Grace and Arjun both say "Hi!" at once, then "Sorry, you go!" Best response?',
        options: [
          { text: 'Stay silent until he speaks', why: 'You\'ll both wait forever.' },
          { text: 'Hang up and call again', why: 'A bit dramatic.' },
          { text: 'Laugh it off: "The famous video-call dance! Hi Arjun, lovely to meet you."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good video-call opener, or not?',
        groups: ['Good opener', 'Not great'],
        items: [
          { text: 'Thanks for staying late! Is this the end of your day?', group: 0 },
          { text: 'Your room is really messy.', group: 1 },
          { text: 'Is that a guitar behind you?', group: 0 },
          { text: 'Is it as grey there as it is here?', group: 0 },
          { text: 'Why is your internet so bad?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Good afternoon Grace. Or for me, good evening. The connection is a little slow.',
        prompt: 'Grace\'s warm opener?',
        options: [
          { text: 'Let\'s start the agenda immediately.', why: 'A few seconds of warmth first.' },
          { text: 'Thanks for staying late for this! Is it the end of your working day?' },
          { text: 'Is it, like, mint there or what?', why: 'Manchester slang won\'t travel.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'To move from small talk to work on a call: "Shall we jump ___?" (one word)',
        answers: ['in'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is video-call small talk usually shorter?',
        options: [
          { text: 'Everyone can see the clock, and calls are booked for a purpose' },
          { text: 'Video small talk is rude', why: 'A little is warm and normal.' },
          { text: 'Cameras use battery', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s call plan with Arjun. Which line could confuse him?',
        lines: [
          'Thank him for joining late in his day.',
          'Say "I\'m buzzin\' to meet you, it\'s mint."',
          'Ask about the guitar, then jump in.',
        ],
        bug: 1,
        fix: 'Say "I\'m really glad to meet you."',
        explanation: 'Local slang can puzzle people from other places. Plain warm words travel.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the video-call hook to an opener.',
        pairs: [
          ['Time zone', '"Is this the end of your day?"'],
          ['Background', '"Is that a guitar behind you?"'],
          ['Weather', '"Is it as grey there as here?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'They talk over each other because of the lag. What helps?',
        options: [
          { text: 'Talk faster', why: 'That makes the lag worse.' },
          { text: 'Pause a little longer before speaking, and say "Sorry, go ahead" when it happens' },
          { text: 'Turn the camera off', why: 'The lag is in the sound too.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Talk to the room', 'Group small talk before a meeting'],
          ['A word, a detail, a question', 'Answering about your weekend'],
          ['Follow-up', 'About what they just said'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a time-zone opener.',
        tiles: ['Thanks', 'for', 'staying', 'late!', 'Is', 'this', 'your', 'evening?'],
        distractors: ['mint'],
      },
    ],
  },
  reflect: {
    prompt: 'Who do you talk to on video calls? Write one opener you could use with them based on their time zone, background or day.',
    starters: ['I often call...', 'I could open with...'],
  },
  deepen: {
    title: 'The thirty-second warm-up',
    summary: 'On your next video call, spend the first thirty seconds on one human thing: their day, their background, their weather. Then "Shall we jump in?"',
  },
  notes: 'Video-call small talk guidance (brief warm-up, lag management, plain language across cultures) is practical advice; Methot et al. (2021) note small talk benefits and the AOM coverage discussed Zoom small talk. Time zones: India (IST, UTC+5:30) is 4h30 ahead of UK summer time (BST, UTC+1) and 5h30 ahead of GMT. 2 p.m. Manchester = 6:30 p.m. Bengaluru assumes UK summer time.',
};

export default lesson;

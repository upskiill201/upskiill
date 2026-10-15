import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint, the last free lesson. "The Phone-In Quiz". Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'The Phone-In Quiz: Clinton\'s first try',
  summary: 'Clinton sends his new message to the group chat, live on air. Forty people. Muted. Will anyone see it? While we wait, the Tey FM Phone-In Quiz.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the one-point test without notes', 'Spot the myths and habits that get people tuned out'],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:41 p.m.',
      beats: [
        { speaker: 'clinton', text: 'Okay. Sending it. "Exam in two weeks. Study session: library, Sunday 4 p.m. What topics are you stuck on?" Sent.' },
        { speaker: 'tey', text: "One message. Nine-ish words plus a question. The studio holds its breath. While we wait, it's time for... the Tey FM Phone-In Quiz!" },
        { speaker: 'narrator', text: '(A jingle plays. It is not a good jingle.)' },
        { speaker: 'tey', text: "Producer, you're on. Show Clinton what we've learned tonight." },
      ],
    },
  ],
  apply: {
    scenario: 'The Tey FM Phone-In Quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Question 1: Why did forty people mute Clinton?',
        options: [
          { text: 'Too many messages, no clear point, and no listening back' },
          { text: 'Humans have 8-second attention spans', why: 'That\'s the goldfish myth.' },
          { text: 'He wasn\'t loud enough', why: 'Twelve messages in capitals says otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or mic drop?',
        groups: ['Myth', 'Mic drop'],
        items: [
          { text: 'Only 7% of meaning is words', group: 0 },
          { text: 'People listen to those who listen to them', group: 1 },
          { text: 'Louder gets you heard', group: 0 },
          { text: 'Attention follows relevance', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'The Studio Whiteboard, in order.',
        lines: ['Dump it all out', 'What do I want them to do?', 'Why should they care?', 'Write one sentence', 'Cut the rest'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Nobody\'s replied in two minutes. Should I send it again? Maybe in capitals?',
        prompt: 'Producer, what do you tell him?',
        options: [
          { text: 'Yes, capitals, now.', why: 'That\'s the old Clinton.' },
          { text: 'Delete the group.', why: 'Patience first.' },
          { text: 'Two minutes is nothing. Wait, and reply warmly to the first person who answers.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey FM\'s motto: "The station that ___ back." (one word)',
        answers: ['listens'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Which message passes the one-point test?',
        options: [
          { text: '"So I was thinking, football maybe, at some point, if people want, let me know"', why: 'No time, no place, no clear action.' },
          { text: '"FOOTBALL!!!!"', why: 'Loud, and empty.' },
          { text: '"Football Saturday 10 a.m., the field behind the library. Who\'s in?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s message draft. Which line breaks the "listen first" rule?',
        lines: [
          'What topics are you stuck on?',
          'Never mind, I\'ve already picked the topics, it\'s calculus.',
          'Library, Sunday 4 p.m.',
        ],
        bug: 1,
        fix: 'I\'ll build the session around your answers.',
        explanation: 'Asking and then ignoring the answers tells people the question was fake.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fix to the problem.',
        pairs: [
          ['Too much', 'One message, one point'],
          ['No clear point', 'What do I want them to do?'],
          ['Not listening back', 'Ask first, use their answers'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'BING. A reply! "Sunday works. I\'m stuck on integrals, send help" (from Brenda). Clinton\'s best response?',
        options: [
          { text: '"Cool." (and then 20 more messages about other topics)', why: 'Old habits.' },
          { text: '"Integrals it is, Brenda! See you Sunday."' },
          { text: 'Nothing, he got what he wanted', why: 'Replying by name is what turns one reply into ten.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tonight\'s lesson, in one line.',
        template: 'Say [[1]] point, give their [[2]], then [[3]] back.',
        blanks: [['one'], ['reason'], ['listen']],
        distractors: ['ten', 'shout'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Clinton\'s reply to Brenda.',
        tiles: ['Integrals', 'it', 'is,', 'Brenda!', 'See', 'you', 'Sunday.'],
        distractors: ['URGENT'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of tonight\'s ideas will change how you message people this week?',
    starters: ['The idea is...', 'I\'ll use it when...'],
  },
  deepen: {
    title: 'Send one one-point message',
    summary: 'This week, send one message to a group using the whiteboard: one point, their reason, one question. Then reply to the first person by name.',
  },
  notes: 'Checkpoint: reviews lessons 1–4. Brenda is a named extra (Clinton\'s classmate).',
};

export default lesson;

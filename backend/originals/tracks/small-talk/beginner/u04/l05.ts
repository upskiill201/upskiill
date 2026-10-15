import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus earlier. Story beat: the client breakfast and the name badges. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the name badge',
  summary: 'Tuesday, 8 a.m. Kinwell hosts a breakfast for hospital clients. Everyone wears a name badge. Grace is on welcome duty, which means forty introductions before her first coffee.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Welcome strangers, join groups and answer "what do you do?" in one event', 'Keep names, with or without badges'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 8:00 a.m., Kinwell\'s big meeting room',
      beats: [
        { speaker: 'priya', text: 'You\'re on welcome duty. My rule: a job gives you a reason to talk to everyone.' },
        { speaker: 'narrator', text: 'Forty guests from hospitals across the North West. Name badges, pastries, very strong coffee. Grace stands by the door with a list.' },
        { speaker: 'grace', text: '(Pause, scan, smile. Say their name back. Don\'t say "just". Don\'t ask anyone about their pain.)' },
        { speaker: 'tey', text: "Welcome duty is Chapter 4 on fast-forward. Let's go." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint. Welcome duty at the client breakfast.',
    items: [
      {
        kind: 'mcq',
        prompt: 'A guest arrives, badge says "Dr Hannah Reid, Salford Royal". Best welcome?',
        options: [
          { text: '"Name?"', why: 'It\'s on her badge. And it\'s cold.' },
          { text: '"Any pain at all?"', why: 'Nurse Mode, at a client breakfast.' },
          { text: '"Morning, Dr Reid! I\'m Grace from Kinwell. How was the journey in from Salford?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Dr Reid) "Fine, thanks. So what do you do at Kinwell?"',
        prompt: 'Grace\'s answer, Chapter 4 style?',
        options: [
          { text: 'I make sure our app works for patients. I was a ward nurse for eighteen years. Which part of Salford Royal are you in?' },
          { text: 'I\'m just a junior, sorry.', why: 'The shrink.' },
          { text: 'Long story.', why: 'Closes the door with a client.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill from this chapter is it?',
        groups: ['Walking into a room', 'Joining a group', 'What do you do'],
        items: [
          { text: 'Pause, scan, find someone alone', group: 0 },
          { text: 'Stand in the gap, catch an eye', group: 1 },
          { text: 'What you do + who it helps', group: 2 },
          { text: 'Listen first, add at a pause', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A job at an event (like welcome duty) gives you a ___ to talk to everyone. (one word)',
        answers: ['reason', 'excuse'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'A guest\'s badge is flipped round. Grace has forgotten his name from two minutes ago. What does she do?',
        options: [
          { text: 'Lean in and try to flip his badge', why: 'Awkward, and close.' },
          { text: '"Sorry, your badge flipped, and my memory\'s gone with it. Remind me of your name?"' },
          { text: 'Call him "mate"', why: 'Not with a hospital client.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Three consultants stand in a tight circle, talking quietly. A fourth guest stands alone by the pastries. Who does Grace approach?',
        options: [
          { text: 'The person alone by the pastries' },
          { text: 'The tight circle', why: 'Closed shape, private conversation.' },
          { text: 'Neither; she stays by the door', why: 'She\'s on welcome duty: welcome someone.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s welcome script. Which line breaks a rule from this chapter?',
        lines: [
          'Morning! I\'m Grace. Help yourself to coffee.',
          'Come and meet Dr Reid; she\'s also from Salford.',
          'Sorry, I\'m just a junior, I don\'t really know anything.',
        ],
        bug: 2,
        fix: 'I was a nurse for eighteen years, so ask me anything about wards.',
        explanation: 'No "just", no "sorry". Lead with what you bring.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['First time at one of these?', 'Honest event opener'],
          ['Home base', 'Somewhere to return to'],
          ['What brings you here?', 'Friendlier than "What do you do?"'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Follow-up', 'About what they just said'],
          ['Weak ties', 'Acquaintances who brighten your day'],
          ['Kind exit', 'Warm words, a reason, a later time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s welcome line.',
        template: 'Morning, Dr [[1]]! I\'m Grace from Kinwell. How was the [[2]] in?',
        blanks: [['Reid'], ['journey', 'drive', 'commute']],
        distractors: ['pain', 'salary'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s introduction of two guests.',
        tiles: ['Come', 'and', 'meet', 'Dr', 'Reid;', 'she\'s', 'from', 'Salford', 'too.'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Could you volunteer for a job at your next event: welcome, badges, coffee? How would it change the evening for you?',
    starters: ['At my next event, I could...', 'It would help because...'],
  },
  deepen: {
    title: 'Volunteer once',
    summary: 'Offer to help at your next work event, community meeting or class social. Welcoming people is the easiest small talk there is: everyone is glad to see you.',
  },
  notes: 'Review of lessons 1–4 plus earlier. Salford Royal is a real hospital; Dr Hannah Reid is a fictional named extra.',
};

export default lesson;

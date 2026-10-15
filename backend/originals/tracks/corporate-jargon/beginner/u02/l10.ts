import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 plus earlier. Story beat: Remi is double-booked. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: two meetings at once',
  summary: 'Wednesday, 2 p.m. Remi is double-booked: his first 1:1 with Brian, and a video call where he has to open the meeting. He can\'t be in two rooms. Or can he?',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Use opening, thread, interruption and video-call phrases without notes', 'Handle a double-booking politely'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 1:55 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Two calendar blocks, side by side, both at 2:00. "1:1 Brian / Remi". "Courier tab, take two (Remi to kick off)".' },
        { speaker: 'remi', text: '(I said yes to both. When did I say yes to both?)' },
        { speaker: 'zanele', text: 'You promised you\'d open my meeting! Welcome, purpose, plan! I wrote an AGENDA this time!' },
        { speaker: 'tey', text: "Double-bookings happen to everyone. The fix is the same as everything this week: say it early, say it plainly, offer a solution. Let's see what you've got." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2. Two meetings, one Remi.',
    items: [
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'See you at 2 for our 1:1!',
        prompt: 'Remi is double-booked. Best message to Brian?',
        options: [
          { text: 'Hi Brian, I\'ve double-booked myself at 2: I\'m kicking off Zanele\'s courier meeting. Could I join our 1:1 at 2:10, or move it to 3?' },
          { text: 'See you!', why: 'Then he either misses Zanele\'s meeting or is late for Brian.' },
          { text: 'Sorry, can\'t make it.', why: 'It\'s his first 1:1. Offer another time.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Remi opens Zanele\'s meeting in 30 seconds. Put it in order.',
        lines: ['Hi everyone, thanks for joining.', 'The purpose today is to agree the three courier costs we track.', 'Zanele will walk us through the tab, then we decide.', 'Could someone take notes?'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the video-call phrase.',
        pairs: [
          ['You\'re on mute', 'Nobody can hear you'],
          ['You\'re breaking up', 'Bad connection'],
          ['I have to jump', 'I need to leave'],
          ['Drop it in the chat', 'Paste it in the chat box'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi has to leave Zanele\'s meeting at 2:10. What does he say at the start?',
        options: [
          { text: 'Nothing; he just leaves at 2:10', why: 'Vanishing mid-meeting confuses everyone.' },
          { text: '"Heads-up: I\'ll have to jump at 2:10 for my 1:1. Zanele will take it from there."' },
          { text: '"This meeting isn\'t important, so I\'m off soon."', why: 'True for Remi\'s diary, unkind to Zanele.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Adding to the thread, or changing topic?',
        groups: ['Adding to the thread', 'Changing topic'],
        items: [
          { text: 'Building on what Zanele said...', group: 0 },
          { text: 'On a slightly different note...', group: 1 },
          { text: 'To piggyback on that...', group: 0 },
          { text: 'Going back to the cost question...', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The three parts of an opening: welcome, purpose, ... (one word)',
        answers: ['plan'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'A colleague in Lagos is planning with last month\'s numbers. Which interruption is best?',
        options: [
          { text: '"Stop, those numbers are wrong."', why: 'Right fact, but it feels like a slap.' },
          { text: 'Say nothing and fix it after the meeting', why: 'By then the whole plan is built on the old numbers.' },
          { text: '"Sorry to jump in. I think those are last month\'s numbers. Shall I drop the new ones in the chat?"' },
        ],
        answer: 2,
        explanation: 'It signals, softens, turns the correction into a question, and offers help.',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to Zanele about the double-booking. Which line is the problem?',
        lines: [
          'Hi Zanele, I\'ve double-booked myself at 2.',
          'I\'ll still kick off your meeting and give the welcome, purpose and plan.',
          'Then I\'ll just disappear without saying anything.',
        ],
        bug: 2,
        fix: 'Then I\'ll jump at 2:10, and you can take it from there.',
        explanation: 'Leaving silently confuses everyone. A heads-up at the start fixes it.',
      },
      {
        kind: 'mcq',
        prompt: 'Two people start speaking at once on the call. Remi is one of them. What does he say?',
        options: [
          { text: '"Sorry, go ahead."' },
          { text: 'Keeps talking, louder', why: 'The delay makes this worse for everyone.' },
          { text: '"I was first."', why: 'Even if true, "go ahead" keeps things friendly.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Brian moves the 1:1 to 3 p.m. What should Remi bring?',
        options: [
          { text: 'Nothing, Brian will lead', why: 'A 1:1 is his meeting too.' },
          { text: 'A presentation about Synergix\'s history', why: 'A 1:1 is a conversation, not a lecture.' },
          { text: 'His questions, and anything that\'s blocking him' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review: the invite words.',
        pairs: [
          ['Optional', 'Your call whether to go'],
          ['Pre-read', 'Read this beforehand'],
          ['Hard stop', 'Must leave at a fixed time'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The double-booking fix.',
        template: 'Say it [[1]], say it [[2]], offer a [[3]].',
        blanks: [['early'], ['plainly', 'clearly'], ['solution', 'fix']],
        distractors: ['loudly', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s heads-up to Zanele\'s meeting.',
        tiles: ['I\'ll', 'have', 'to', 'jump', 'at', '2:10,', 'sorry!'],
        distractors: ['froze', 'mute'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been in two places at once, double-booked, or late for one thing because of another? How would you handle it now?',
    starters: ['It happened when...', 'Now I\'d send...'],
  },
  deepen: {
    title: 'The 9 a.m. calendar check',
    summary: 'Every morning, look at today\'s calendar for clashes before anything else. Fixing a double-booking at 9 a.m. is easy. At 1:59 p.m., it\'s a scramble.',
  },
  notes: 'Review of lessons 6–9, plus 1–4 and Chapter 1.',
};

export default lesson;

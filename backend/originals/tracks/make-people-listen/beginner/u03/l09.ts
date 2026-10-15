import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. "Line Check" (Tap to explore): David's notes card for the presentation. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line Check: David\'s notes card',
  summary: 'The group has chosen who presents the project to the professor next week. Not Junior. David. He sends Tey a photo of his notes card. Tey reads it on air, line by line.',
  minutes: 11,
  outcomes: [
    'See every Chapter 3 tool on one small card',
    'Write speaking notes that help, not hide',
    'Plan where to breathe, pause and look up',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'David\'s notes card',
      text: 'BREATHE. Look up. Headline: 214 students signed up to donate blood. PAUSE. Donor buddies: sign up with a friend. Slow. Story: Ama brought four friends. Number: about one in three donors came with a buddy. PAUSE. Ask: run it every term? Stop. No sorry.',
      hotspots: [
        { phrase: 'BREATHE. Look up.', note: 'The first two words on the card are about delivery, not content. A full breath and eyes up before speaking.' },
        { phrase: 'Headline: 214 students signed up to donate blood.', note: 'The headline first. The best news of the project in one sentence.' },
        { phrase: 'PAUSE. Donor buddies: sign up with a friend. Slow.', note: 'The key idea, with a pause before it and a reminder to slow down. This is the moment that was stolen last time.' },
        { phrase: 'Story: Ama brought four friends.', note: 'A story about one person. People remember stories (Chapter 2).' },
        { phrase: 'about one in three donors came with a buddy', note: 'A number people can feel: rounded, "1 in X" (Chapter 2).' },
        { phrase: 'Ask: run it every term?', note: 'One clear next step for the professor.' },
        { phrase: 'Stop. No sorry.', note: 'The ending. No "that\'s it, I guess, sorry". Just stop and let it land.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good notes card has keywords, not sentences, plus reminders for how to say it: breathe, pause, slow, stop.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line Check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does David\'s card start with "BREATHE. Look up."?',
        options: [
          { text: 'It\'s the title of the project', why: 'It\'s a reminder for David.' },
          { text: 'To fill space', why: 'Every word on the card has a job.' },
          { text: 'To remind him about delivery before he says a word' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Content, or delivery reminder?',
        groups: ['Content', 'Delivery reminder'],
        items: [
          { text: '214 students signed up', group: 0 },
          { text: 'PAUSE', group: 1 },
          { text: 'Ama brought four friends', group: 0 },
          { text: 'Slow', group: 1 },
          { text: 'No sorry', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s talk in order.',
        lines: ['Breathe, look up', 'The headline: 214 students', 'The key idea: donor buddies', 'A story: Ama', 'A number: one in three', 'The ask, then stop'],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Should I write my whole speech on the card, word for word? In case I forget?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Keywords only. Full sentences tempt you to read with your head down.' },
          { text: 'Yes, every word, tiny font.', why: 'Then you\'re reading to the card, not the professor.' },
          { text: 'No card at all.', why: 'A keyword card is a great safety net.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good notes card has ___, not full sentences. (one word)',
        answers: ['keywords', 'keyword', 'key words'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'David\'s first draft card. Which line breaks this chapter\'s advice?',
        lines: [
          'BREATHE. Look up.',
          'Headline: 214 students signed up.',
          'End with: "Sorry, that\'s it, I guess, sorry."',
        ],
        bug: 2,
        fix: 'Ask: run it every term? Stop.',
        explanation: 'Shrinkers at the end undo everything. Ask, then stop.',
      },
      {
        kind: 'mcq',
        prompt: 'Which Chapter 2 tools appear on David\'s card?',
        options: [
          { text: 'Technical diagrams', why: 'Not on this card.' },
          { text: 'A story about one person and a number people can feel' },
          { text: 'Twelve risks', why: 'That was Arjun.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Headline first', '"Good news: the hospital said yes"'],
          ['Shrinkers', '"Sorry, kind of, I guess"'],
          ['Look up', 'For the key idea'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'David\'s card, the ending.',
        template: 'Ask: run it every [[1]]? [[2]]. No [[3]].',
        blanks: [['term'], ['Stop'], ['sorry']],
        distractors: ['Mumble', 'year'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first line of the card.',
        tiles: ['BREATHE.', 'Look', 'up.'],
        distractors: ['down.', 'Sorry.'],
      },
    ],
  },
  reflect: {
    prompt: 'Make a notes card for something you need to say soon. Keywords only, plus at least two delivery reminders (breathe, pause, slow, look up, stop).',
    starters: ['My card: ...', 'Delivery reminders: ...'],
  },
  deepen: {
    title: 'The index card test',
    summary: 'For your next talk or important conversation, fit all your notes on one small card. If they don\'t fit, you probably have too many points (remember: three, not twelve).',
  },
  notes: 'Synthesis of Chapter 3 tools on a speaking-notes card, plus Chapter 2 callbacks (story, natural frequency). Keyword notes vs scripts is standard public-speaking advice. Ama is a named extra. Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;

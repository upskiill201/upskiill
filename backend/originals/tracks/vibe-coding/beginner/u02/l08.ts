import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Myth or Fact: letting the AI ask you questions. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Let it ask you',
  summary: 'Hazel wants a gig-fee calculator for weddings and parties, but doesn\'t know what she doesn\'t know. One line flips it: "Ask me questions first." It asks six. She hadn\'t thought of four.',
  minutes: 11,
  outcomes: [
    'Ask the AI to interview you before it builds',
    'Answer its questions and fold them into the brief',
    'Know when questions help most',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'If you don\'t know every detail, you can\'t write a good brief.', isFact: false, explain: 'Say what you do know, then add: "Ask me questions first, one at a time." It finds the gaps for you.' },
        { text: 'An AI coding tool will happily guess anything you leave out.', isFact: true, explain: 'It fills gaps silently, with reasonable-sounding guesses. Questions turn guesses into your decisions.' },
        { text: 'Asking it to ask questions wastes your usage.', isFact: false, explain: 'A few questions cost far less than building the wrong thing and rebuilding it.' },
        { text: '"One at a time" makes the questions easier to answer.', isFact: true, explain: 'A list of twelve questions at once is a homework sheet. One at a time is a conversation.' },
        { text: 'You must answer every question it asks.', isFact: false, explain: '"You decide" or "Keep it simple for now" are fine answers. You\'re still the director.' },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Goal: a gig-fee calculator page, gigs.html, for parents booking the band.\nAsk me up to 6 questions first, one at a time. Then write the brief back to me before you build.',
      caption: 'Hazel\'s interview request.',
    },
    {
      kind: 'text',
      html: '<p>It asked: How many players? Hourly or flat fee? Travel outside New Orleans? Deposit? Weekday or weekend rates? What should the page show at the end?</p><p>Hazel answered four, said "you decide" to one, and "keep it simple" to the last. Then it wrote the brief back. She fixed one line and said go.</p>',
    },
  ],
  apply: {
    scenario: 'The gig-fee calculator.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Hazel doesn\'t know everything the calculator needs. What\'s the best move?',
        options: [
          { text: 'Wait until she knows every detail', why: 'She may never know them all. Let it ask.' },
          { text: 'Say what she knows, then "Ask me questions first, one at a time"' },
          { text: 'Let it guess', why: 'Guesses become bugs she finds at a wedding.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A useful question for the calculator, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'Is the fee hourly or flat?', group: 0 },
          { text: 'Do you charge for travel outside the city?', group: 0 },
          { text: 'What\'s your favourite colour?', group: 1 },
          { text: 'Is there a deposit?', group: 0 },
          { text: 'Do you like jazz?', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The interview line.',
        template: 'Ask me [[1]] first, one at a [[2]].',
        blanks: [['questions'], ['time']],
        distractors: ['nothing', 'once'],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'It asked "Do you want weekday and weekend rates?" I have no idea.',
        prompt: 'Tey\'s suggestion?',
        options: [
          { text: 'Ignore it and hope it doesn\'t notice.', why: 'It will guess. Answer instead.' },
          { text: 'Say "One rate for now, keep it simple." That\'s a real decision.' },
          { text: 'Quit the calculator.', why: '"Keep it simple" is a perfectly good answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why ask it to "write the brief back to me before you build"?',
        options: [
          { text: 'So Hazel can check it understood, and fix any line before code exists' },
          { text: 'To make it slower', why: 'It\'s a ten-second check.' },
          { text: 'It\'s required by law', why: 'It\'s just a good habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A three-word answer that hands a small choice back to the AI.',
        answers: ['you decide', 'you choose', 'your call', 'up to you'],
        placeholder: '...',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s written-back brief should Hazel fix?',
        lines: [
          'Goal: gigs.html works out a fee for parents booking the band.',
          'Fee: $400 for the first hour, $150 for each extra hour.',
          'Travel: $2 per mile outside New Orleans.',
          'Also: take card payments on the page.',
        ],
        bug: 3,
        fix: 'Remove it: the page only works out a fee.',
        explanation: 'Taking payments is a big, risky feature nobody asked for. Writing it back is how she caught it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the answer type to when to use it.',
        pairs: [
          ['A real answer', 'You know: "$400 for the first hour"'],
          ['"You decide"', 'A small choice you don\'t mind'],
          ['"Keep it simple"', 'A feature you don\'t need yet'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '3 hours, $400 first hour, $150 each extra. What should the calculator say?',
        options: [
          { text: '$550', why: 'That\'s only one extra hour.' },
          { text: '$1,200', why: 'That treats every hour as $400.' },
          { text: '$700' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the interview request.',
        tiles: ['Ask me up to 6 questions first,', 'one at a time.', 'Then write the brief back', 'before you build.'],
        distractors: ['Just guess.', 'Build it now.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your real project. What are two questions you haven\'t answered yet that an AI would need to know?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'On your computer: get interviewed',
    summary: 'Start claude in your project. Give it your goal, then: "Ask me up to 6 questions first, one at a time. Then write the brief back to me before you build." Answer them. Update brief.md with what you decided.',
  },
  notes: 'Interview-style prompting; gig-fee numbers are story-only.',
};

export default lesson;

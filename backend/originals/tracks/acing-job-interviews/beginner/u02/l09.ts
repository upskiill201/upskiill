import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: interview card v2, Mtaa Labs. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interview card v2',
  summary: 'Monday, 10:45 p.m. Remi\'s interview card for Mtaa Labs. One hour of research, on one page. Tap each line.',
  minutes: 11,
  outcomes: [
    'Turn research into an interview card',
    'Link each line to a lesson from this chapter',
    'Build version 2 of your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s interview card v2: Mtaa Labs',
      text: 'Facts: delivery tracking for 3,000 shop owners; first funding round; expanding to Mombasa. Interviewer: Wanjiru, CTO, wrote about slow phones. Why us: light app on slow phones, my uncle\'s shop, building for small businesses. Must-haves: JavaScript (booking app), Git (club repo), communication (club talks). Honest gap: React Native, keen to learn. Questions: a great first month? biggest challenge? Swahili for shop owners? Set-up: books, window, earphones, hotspot.',
      hotspots: [
        { phrase: 'expanding to Mombasa', note: 'Lesson 2: ten minutes of company research.' },
        { phrase: 'wrote about slow phones', note: 'Lesson 2: public, relevant work is fine to mention.' },
        { phrase: 'Why us:', note: 'Lesson 3: only true of this company, linked to Remi\'s life.' },
        { phrase: 'Honest gap: React Native', note: 'Lesson 4: be honest about nice-to-haves.' },
        { phrase: 'Questions:', note: 'Lesson 7: about the work, not on the website.' },
        { phrase: 'Set-up:', note: 'Lesson 6: the video checklist.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v2 adds facts, the interviewer, "why us?", evidence for must-haves, honest gaps, questions and set-up.',
    },
  ],
  apply: {
    scenario: 'Interview card v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the card line to the lesson.',
        pairs: [
          ['Facts', 'Research in an hour'],
          ['Why us', '"Why us?"'],
          ['Honest gap', 'Decoding the ad'],
          ['Set-up', 'The video set-up'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many questions does Remi plan to ask?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v2 compared with v1?',
        options: [
          { text: 'Company-specific research, evidence for must-haves, questions and set-up' },
          { text: 'A new life story', why: 'The one-minute answer stays.' },
          { text: 'Nothing', why: 'v2 adds research for Mtaa Labs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'From the research, or from Remi\'s own life?',
        groups: ['Research', 'His own life'],
        items: [
          { text: 'Expanding to Mombasa', group: 0 },
          { text: 'Uncle\'s shop', group: 1 },
          { text: 'Wanjiru\'s post', group: 0 },
          { text: 'Booking app', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Should I keep the card open on screen during the call?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Keep a few keywords beside the camera. Glance, don\'t read. You know this stuff now.' },
          { text: 'Read it out.', why: 'It shows on camera.' },
          { text: 'Hide it completely.', why: 'Keywords are fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Honest gap.',
        template: 'React [[1]]: not yet, [[2]] to learn.',
        blanks: [['Native'], ['keen']],
        distractors: ['Basic', 'refuse'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Swahili for shop owners?" a strong question?',
        options: [
          { text: 'It comes from using the app and shows he thinks about users' },
          { text: 'It criticises them', why: 'It\'s framed as curiosity.' },
          { text: 'It\'s random', why: 'It comes from his research.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of the card is wrong?',
        lines: [
          'Facts: 3,000 shop owners.',
          'Why us: it\'s a startup.',
          'Must-haves: JavaScript, Git, communication.',
          'Set-up: books, window, earphones.',
        ],
        bug: 1,
        fix: 'Why us: light app, uncle\'s shop, small businesses.',
        explanation: '"It\'s a startup" is the generic answer.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many shop owners use Mtaa Labs, according to the card?',
        answers: ['3000', '3,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the card sections.',
        lines: ['Facts', 'Interviewer', 'Why us', 'Must-haves', 'Questions', 'Set-up'],
      },
    ],
  },
  reflect: {
    prompt: 'Build version 2 of your own card for one employer: facts, why us, evidence, gaps, questions.',
    starters: ['Facts:...', 'Why us:...'],
  },
  notes: 'Interview card v2 (fictional), Mtaa Labs research.',
};

export default lesson;

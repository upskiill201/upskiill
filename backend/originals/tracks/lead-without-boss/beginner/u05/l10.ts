import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge: the review with Mr Kamau. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: Mr Kamau',
  summary: 'Week 6, Friday, 3:00 p.m. The boardroom. Five owners, two minutes each, all perfect. Mr Kamau has listened without a word. Then he puts down his pen. "Very good. Now. Who actually led this?"',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one final moment',
    'Accept recognition honestly, without taking or refusing it all',
    'Say yes to the next challenge, on terms that work',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 6, Friday, 3:14 p.m.',
      beats: [
        { speaker: 'kamau', text: 'Very good. Now. Who actually led this?' },
        { speaker: 'narrator', text: 'Five heads turn. Njeri points at Remi. Felix points at Remi. Emeka, on the screen, points at Remi and then at himself, then laughs. Wanjiku says nothing but looks at him over her glasses.' },
        { speaker: 'kamau', text: 'I started in that warehouse. I know how hard it is to get five teams to agree on lunch. Remi, our delivery times are next. Eight teams. Will you lead it?' },
        { speaker: 'narrator', text: 'Six weeks ago, nobody came to Remi\'s meeting. One last time, you\'re with Remi.' },
      ],
    },
  ],
  apply: {
    scenario: 'The boardroom, 3:14 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Who actually led this?" What\'s Remi\'s best answer?',
        options: [
          { text: '"I pulled it together. They did the hard parts, and they\'re the reason it\'ll last."' },
          { text: '"Nobody, really. It was everyone."', why: 'Five people just pointed at him. Be honest.' },
          { text: '"Me. It was a lot of work."', why: 'True, and it spends everything he built.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter taught it?',
        groups: ['Chapters 1 and 2', 'Chapter 3', 'Chapters 4 and 5'],
        items: [
          { text: 'The listening tour', group: 0 },
          { text: 'Pre-wiring the workshop', group: 1 },
          { text: 'Joint escalation', group: 2 },
          { text: 'Currencies', group: 0 },
          { text: 'The shared goal', group: 1 },
          { text: 'The trust equation', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'Delivery times are next. Eight teams. Will you lead it?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'Yes! I\'ll have a plan by Monday.', why: 'A plan before listening: Week 1\'s trap, back again.' },
          { text: 'I\'m not sure I\'m ready.', why: 'He just did it. Say yes, on terms that work.' },
          { text: 'Yes, thank you. Could I start with a listening tour of the eight teams, and could Brian sponsor it again?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remi\'s first step on any new cross-team project: a listening ___. (one word)',
        answers: ['tour', 'Tour'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s six weeks in order.',
        lines: ['Week 1: nobody works for me', 'Week 2: what\'s in it for them', 'Week 3: make it our idea', 'Week 5: when it stalls', 'Week 6: show, don\'t tell'],
      },
      {
        kind: 'mcq',
        prompt: 'Kamau asks: "Should Zanele work with you on deliveries?" What should Remi say?',
        options: [
          { text: '"Yes, she\'s great with spreadsheets."', why: 'Chapter 4: ask her, and protect her time.' },
          { text: '"No, I\'ll do it alone."', why: 'The solo trap.' },
          { text: '"I\'d love that, if she wants it, and with time for it in her job, not on top of it."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to the five afterwards. Which line forgets the course?',
        lines: [
          'Kamau said yes to both asks. Finance owns the sample-check from Monday.',
          'He\'s asked me to lead deliveries, so I\'ll be too busy to check in on refunds.',
          'Thank you. None of this happens without each of you.',
        ],
        bug: 1,
        fix: 'I\'ll check in once next month, then it\'s yours.',
        explanation: 'Anchoring means a planned step back, not disappearing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their six-week story.',
        pairs: [
          ['Njeri', 'From "another one" to the box story'],
          ['Wanjiku', 'From "no" to owning the sample-check'],
          ['Felix', 'From "maybe" to the Saturday change'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What turned Remi from "the new guy" into someone people followed?',
        options: [
          { text: 'Kamau backed him', why: 'Kamau only saw it at the end.' },
          { text: 'He listened, gave first, built the goal with them, kept promises and shared the credit' },
          { text: 'He was the cleverest person in the room', why: 'Mrs Achieng: "It wasn\'t your cleverness."' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course, in one line.',
        template: 'No title? [[1]] first, give [[2]], build it [[3]], and share the credit.',
        blanks: [['Listen', 'listen'], ['first'], ['together']],
        distractors: ['Talk', 'alone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s last line in the boardroom.',
        tiles: ['They', 'did', 'the', 'hard', 'parts.'],
        distractors: ['I'],
      },
    ],
  },
  reflect: {
    prompt: 'Look back at the whole course. Which one idea will you use this month, and on which project or group?',
    starters: ['The idea I\'ll use is...', 'On...'],
  },
  deepen: {
    title: 'Your six-week fix',
    summary: 'You\'ve finished How to Lead Without Being the Boss. Pick one thing that crosses people you don\'t manage. This week: do a listening tour, draw a stakeholder map, and find each person\'s currency.',
  },
  notes: 'Final challenge: synthesis of the whole course. Mr Kamau\'s warehouse background is fixed in CAST.md. Fictional events.',
};

export default lesson;

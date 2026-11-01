import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Ada\'s first week',
  summary: 'Friday. Tunde corners Ada at the water cooler: "So? What\'s the pitch?" Ada says her one sentence. Tunde: "Oh. That\'s actually good." Time to check what you\'ve learned this week.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the five-part pitch and the one sentence without notes', 'Spot the lift mistakes in a new pitch'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, the office water cooler',
      beats: [
        { speaker: 'narrator', text: 'Tunde: "So, finalist. What\'s the pitch? Thirty floors of databases again?"' },
        { speaker: 'ada', text: '"I help office savings groups track who\'s paid, so nobody argues about money."' },
        { speaker: 'narrator', text: 'Tunde: "Oh. That\'s... actually good. Short. Also, I\'d like to point out that I have paid on time for four months."' },
        { speaker: 'ada', text: 'Thanks to the app, Tunde.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: week one.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Ada\'s biggest mistake in the lift?',
        options: [
          { text: 'She spoke too slowly', why: 'Speed wasn\'t the issue.' },
          { text: 'She explained how it\'s built, not what it does or who it\'s for' },
          { text: 'She mentioned Tunde', why: 'The databases were the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the five-part pitch in order.',
        lines: ['Who it\'s for', 'The problem', 'What you do', 'Why you', 'The ask'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The one-sentence pattern.',
        template: 'I [[1]] office savings groups track who\'s [[2]], so nobody argues about [[3]].',
        blanks: [['help'], ['paid'], ['money']],
        distractors: ['code', 'tables'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quick quiz: what\'s the realistic goal of a 30-second pitch?',
        prompt: 'Your answer?',
        options: [
          { text: 'To close the deal on the spot.', why: 'That\'s a lot for 30 seconds.' },
          { text: 'To explain every feature.', why: 'That\'s the lift disaster.' },
          { text: 'To earn the next conversation.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Pitch material, or save for later?',
        groups: ['In the pitch', 'Save for later'],
        items: [
          { text: 'Who it\'s for', group: 0 },
          { text: 'The database tables', group: 1 },
          { text: 'Ten people, zero arguments', group: 0 },
          { text: 'How dates are stored', group: 1 },
          { text: 'The ask', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A pitch isn\'t a sales speech. It\'s a conversation ___. (one word)',
        answers: ['starter', 'opener'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'A new finalist\'s pitch. Which line repeats Ada\'s lift mistake?',
        lines: [
          'I help farmers sell vegetables directly to restaurants.',
          'It runs on a React front end with a Node back end and a Redis cache.',
          'Forty farmers already use it.',
        ],
        bug: 1,
        fix: 'Farmers earn more because there\'s no middleman.',
        explanation: 'Tech stack instead of benefit: exactly the lift mistake.',
      },
      {
        kind: 'mcq',
        prompt: 'Which "ask" is best?',
        options: [
          { text: '"Could I send you a two-minute demo this week?"' },
          { text: '"Any help would be nice."', why: 'Too vague to say yes to.' },
          { text: '"Please fund everything."', why: 'Too big, too vague.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the box to Ada\'s line.',
        pairs: [
          ['The problem', 'Someone always swears they paid'],
          ['Why you', 'Ten people, zero arguments'],
          ['The ask', 'A mentor to reach 100 offices'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who needs an elevator pitch?',
        options: [
          { text: 'Only founders', why: 'Everyone gets asked "What do you do?"' },
          { text: 'Anyone pitching themselves, an idea or a business' },
          { text: 'Only salespeople', why: 'Far more people than that.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s verdict.',
        tiles: ['That\'s', 'actually', 'good.', 'Short.'],
        distractors: ['databases'],
      },
    ],
  },
  reflect: {
    prompt: 'Say your one sentence out loud right now. Then write down one thing you\'d change after hearing it.',
    starters: ['My sentence: ...', 'I\'d change...'],
  },
  deepen: {
    title: 'The water-cooler test',
    summary: 'Try your one sentence on a colleague, classmate or friend who doesn\'t know what you do. Their first question afterwards tells you what to put next in your pitch.',
  },
  notes: 'Checkpoint: reviews lessons 1–4.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: five visits',
  summary: 'Wednesday evening. Five teams visited. Remi\'s notebook is full, and the refund problem looks completely different from the folder. Quick check before he plans the kick-off.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use power, credibility and listening tools without notes', 'Spot the solo trap'],
  learn: [
    {
      kind: 'story',
      title: 'Week 1, Wednesday, 7:30 p.m.',
      beats: [
        { speaker: 'remi', text: 'Okay. Twenty-one days. A week waiting for Njeri\'s signature form. Eight days in Wanjiku\'s approval queue. Six days because Emeka\'s team and ours use different reference numbers. The folder didn\'t mention any of that.' },
        { speaker: 'zanele', text: 'So you were going to fix the wrong thing.' },
        { speaker: 'remi', text: 'Beautifully. With a really nice form.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 1.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Without a title, which kinds of power can Remi build?',
        options: [
          { text: 'Legitimate and coercive', why: 'Those come from position.' },
          { text: 'Expert, informational and referent' },
          { text: 'None', why: 'He can build three.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the listening tour in order.',
        lines: ['Go to them', 'Say why', 'Ask and listen', 'Ask what they need', 'Close the loop'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds credibility, or costs it?',
        groups: ['Builds it', 'Costs it'],
        items: [
          { text: 'Keeping a small promise', group: 0 },
          { text: 'A confident wrong guess', group: 1 },
          { text: '"I don\'t know yet, I\'ll find out."', group: 0 },
          { text: 'Name-dropping the CEO', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'You came all the way to Finance just to ask questions?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Brian told me to.', why: 'True, maybe, but it makes it a chore, not respect.' },
          { text: 'I was passing anyway.', why: 'Undersells why you came.' },
          { text: 'You know refund approvals better than anyone. I\'d rather start with you than guess.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Credibility rule: do what you ___ you will do. (one word)',
        answers: ['say', 'Say'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did the listening tour change?',
        options: [
          { text: 'Remi found the real causes of the delay, and he\'d been about to fix the wrong thing' },
          { text: 'Nothing; the folder was right', why: 'The folder missed all three big delays.' },
          { text: 'It wasted three days', why: 'It saved him weeks.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Thursday plan. Which line brings the solo trap back?',
        lines: [
          'Thank each person and share one thing I learned.',
          'Now I know the causes, design the fix alone tonight.',
          'Invite all five to a 30-minute kick-off.',
        ],
        bug: 1,
        fix: 'Bring the three causes to the kick-off and fix them together.',
        explanation: 'Knowing the problem isn\'t the same as owning the fix together.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the delay to who knows it.',
        pairs: [
          ['Signature form', 'Njeri'],
          ['Approval queue', 'Wanjiku'],
          ['Reference numbers', 'Emeka'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which kind of power did the tour build most?',
        options: [
          { text: 'Coercive', why: 'Nobody was threatened.' },
          { text: 'Expert and referent: he understands it now, and people liked being asked' },
          { text: 'Legitimate', why: 'He still has no title.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 so far.',
        template: 'Build [[1]] and [[2]] power. Listen before you [[3]].',
        blanks: [['expert'], ['referent'], ['propose', 'pitch']],
        distractors: ['coercive', 'shout'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Zanele\'s line.',
        tiles: ['You', 'were', 'fixing', 'the', 'wrong', 'thing.'],
        distractors: ['right'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever started fixing something before you understood it? What did listening first, or not, cost you?',
    starters: ['I started fixing...', 'If I\'d listened first...'],
  },
  deepen: {
    title: 'Find the real cause',
    summary: 'Pick a problem you\'re about to solve. Ask two people who live with it every day what really causes it. Compare their answers with yours.',
  },
  notes: 'Checkpoint: reviews lessons 1–4. Fictional delay breakdown (7 + 8 + 6 days).',
};

export default lesson;

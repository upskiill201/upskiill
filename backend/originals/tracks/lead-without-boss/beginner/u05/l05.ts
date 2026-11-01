import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Thursday rehearsal',
  summary: 'Thursday, 5 p.m. A full run-through in the empty boardroom. Njeri tells the box story and Felix actually claps. Emeka is unmuted on the first try. Wanjiku checks her number three times. Quick check before tomorrow.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use trust, senior-presentation and multiplier tools without notes', 'Connect them to Chapters 1 to 4'],
  learn: [
    {
      kind: 'story',
      title: 'Week 6, Thursday, 5:00 p.m.',
      beats: [
        { speaker: 'njeri', text: '...and the boxes just sat there, a whole week, waiting for one signature. Nobody asked us. Until him.' },
        { speaker: 'felix', text: '(clapping) Okay, that\'s better than anything on my slide.' },
        { speaker: 'emeka', text: 'Can you hear me? I\'m unmuted! First time in six weeks!' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Week 6.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Remi\'s first sentence tomorrow be?',
        options: [
          { text: '"So, six weeks ago, Brian gave me a folder..."', why: 'Story first. Answer first.' },
          { text: '"Business refunds now take 4 days, down from 21, with zero new audit errors."' },
          { text: '"Thanks for having us!"', why: 'Polite, but the CEO wants the answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the senior presentation in order.',
        lines: ['Answer first', 'Why it matters to them', 'How, in three parts', 'The honest bit', 'The ask'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the trust equation?',
        groups: ['Reliability', 'Intimacy', 'Self-orientation'],
        items: [
          { text: 'The Friday update, every Friday', group: 0 },
          { text: 'Zanele telling Remi she\'s overloaded', group: 1 },
          { text: 'Asking to share the stage', group: 2 },
          { text: 'Ticket numbers for Felix weekly', group: 0 },
          { text: 'Emeka admitting the sign-off', group: 1 },
          { text: 'No slide about Remi\'s career', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'What if Mr Kamau asks something about audit I can\'t answer?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'He won\'t.', why: 'He might. Give her a plan.' },
          { text: 'Just guess.', why: 'A wrong guess would cost her credibility.' },
          { text: 'Then say "I\'ll find out and tell you by Monday", or look at me. You know this better than anyone in the room.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'End a senior presentation with one clear ___. (one word)',
        answers: ['ask', 'Ask', 'decision'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Felix clap for Njeri\'s story?',
        options: [
          { text: 'The person who lived it told it better than any slide could' },
          { text: 'To be polite', why: 'He meant it.' },
          { text: 'Remi told him to', why: 'He didn\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s final notes for Friday. Which line breaks this chapter?',
        lines: [
          'Open with the answer. Introduce each owner with credit.',
          'Close with: "I\'m proud of what I achieved here."',
          'End with the two asks.',
        ],
        bug: 1,
        fix: 'Close with: "Five people did this. Here\'s what keeps it working."',
        explanation: '"What I achieved" raises self-orientation at the last moment.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Listening tour', 'Go to them first'],
          ['Implementation intention', 'When X, I will Y'],
          ['Answer first', 'The point before the story'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s "the honest bit" for tomorrow?',
        options: [
          { text: 'Remi was nervous in Week 1', why: 'True, but not what the CEO needs.' },
          { text: 'The screen waits for next quarter, and the sample-check needs a permanent owner' },
          { text: 'Nothing; it all went perfectly', why: 'Showing risks builds trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 5 so far.',
        template: 'Share the [[1]]. Answer [[2]]. Make them [[3]].',
        blanks: [['stage', 'spotlight'], ['first'], ['shine']],
        distractors: ['blame', 'last'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Emeka\'s big moment.',
        tiles: ['I\'m', 'unmuted!'],
        distractors: ['muted'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a moment you\'re preparing for. What\'s your answer-first sentence, and who could you help shine in it?',
    starters: ['My first sentence: ...', 'I could help...'],
  },
  deepen: {
    title: 'Run it once',
    summary: 'Before your next big moment, do one full run-through with someone you trust. Ask them only one question: "What was the point?"',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–4.',
};

export default lesson;

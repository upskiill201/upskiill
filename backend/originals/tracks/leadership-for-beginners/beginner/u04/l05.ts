import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapters 1–3. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: before 4 p.m.',
  summary: '3:58 p.m. Lucía has her SBI written on a sticky note, her opening line memorised, and her phone in her bag. Two minutes. One last check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use feedback and hard-conversation tools without notes', 'Connect them to Chapters 1 to 3'],
  learn: [
    {
      kind: 'story',
      title: 'Day 70, 3:58 p.m.',
      beats: [
        { speaker: 'lucia', text: 'Opening: what we both want. SBI. Then stop talking. Ask. Listen. Agree one thing.' },
        { speaker: 'narrator', text: 'The sticky note says: "Review. Kids\' menu. Sofía went quiet." Through the glass, Diego is walking over, carrying two coffees.' },
        { speaker: 'lucia', text: 'He brought me a coffee. Of course he did.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: 3:58 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does SBI stand for?',
        options: [
          { text: 'Start, Blame, Improve', why: 'No blame in SBI.' },
          { text: 'Situation, Behaviour, Impact' },
          { text: 'Sandwich, Bread, Ingredients', why: 'Definitely not the sandwich.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the hard conversation in order.',
        lines: ['What we both want', 'SBI', 'Ask and listen', 'Agree what changes', 'Follow up'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good feedback or bad feedback?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"You said \'kids\' menu\' and people laughed."', group: 0 },
          { text: '"You\'re disrespectful."', group: 1 },
          { text: 'Given the same day', group: 0 },
          { text: 'Saved up for the yearly review', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'Brought you a coffee. So what\'s this about?',
        prompt: 'Lucía\'s best opening?',
        options: [
          { text: 'Your behaviour this morning.', why: 'The ambush opening.' },
          { text: 'Oh, nothing really. How\'s your day?', why: 'Avoiding it, again.' },
          { text: 'Thank you. I want to talk about the review, because I want everyone sharing ideas here, and you matter a lot to that.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Praise in public; tough feedback in ___. (one word)',
        answers: ['private', 'Private'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the problem with the feedback sandwich?',
        options: [
          { text: 'The real message gets lost, and praise starts to sound like a warning' },
          { text: 'It\'s too direct', why: 'It\'s the opposite.' },
          { text: 'Nothing', why: 'It often backfires.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s sticky note. Which line breaks this chapter?',
        lines: [
          'Review. Kids\' menu. Sofía went quiet.',
          'Tell him the whole team thinks he\'s a bully.',
          'Ask: what did you mean by it?',
        ],
        bug: 1,
        fix: 'Speak for myself: what I saw and why it matters to me.',
        explanation: 'A label, and "the whole team" makes him feel ganged up on.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter?',
        pairs: [
          ['One-on-ones', 'Chapter 2'],
          ['Two-way doors', 'Chapter 3'],
          ['SBI', 'Chapter 4'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes praise count?',
        options: [
          { text: 'Being loud', why: 'Volume doesn\'t add meaning.' },
          { text: 'Being specific: what they did and why it mattered' },
          { text: 'Being rare', why: 'Most people get too little, not too much.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: 'What they [[1]], not who they [[2]]. Kind and [[3]].',
        blanks: [['did'], ['are'], ['clear']],
        distractors: ['feel', 'vague'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s last reminder.',
        tiles: ['SBI,', 'then', 'stop', 'talking.'],
        distractors: ['shout'],
      },
    ],
  },
  reflect: {
    prompt: 'Which part of a hard conversation is hardest for you: starting it, staying calm, or following up? Why?',
    starters: ['The hardest part is...', 'Because...'],
  },
  deepen: {
    title: 'The sticky note',
    summary: 'Before your next hard conversation, write the SBI on a sticky note. Three short lines. It keeps you on one issue.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–3.',
};

export default lesson;

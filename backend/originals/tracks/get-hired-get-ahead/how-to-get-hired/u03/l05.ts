import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: practice run two. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: practice run two',
  summary: 'David puts the tie back on. "Mr Clinton. Tell me about yourself." This time Clinton takes 55 seconds and David forgets to look serious. Then David starts firing questions. Preparation, how interviews work, present-past-future and STAR.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Give a three-part "Tell me about yourself"', 'Recognise what each question checks', 'Tell a STAR story'],
  learn: [
    {
      kind: 'story',
      title: 'Round two',
      beats: [
        { speaker: 'narrator', text: 'Same room, same chair, same tie.' },
        { speaker: 'david', text: 'Mr Clinton. Tell me about yourself.' },
        { speaker: 'narrator', text: 'Present, past, future. 55 seconds. David\'s serious face cracks into a grin.' },
        { speaker: 'david', text: 'OK, that was actually good. Now I\'m going to be difficult.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: David\'s rapid-fire round.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put "Tell me about yourself" in order.',
        lines: ['Present: what you do now, with proof', 'Past: what led here, with results', 'Future: what you want next', 'Why this job fits'],
      },
      {
        kind: 'mcq',
        prompt: 'Best way to prepare answers?',
        options: [
          { text: 'Plan the shape, practise out loud, don\'t memorise every word' },
          { text: 'Memorise a script', why: 'It breaks when interrupted.' },
          { text: 'Wing it', why: 'Talking isn\'t answering.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to what it checks.',
        pairs: [
          ['Walk me through your code', 'Can you do the job?'],
          ['A time you missed a deadline', 'Will you do it well?'],
          ['How do you like feedback?', 'Will you work well here?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of STAR?',
        groups: ['Situation', 'Result'],
        items: [
          { text: 'Drivers had no data in some areas', group: 0 },
          { text: 'Zero lost confirmations', group: 1 },
          { text: 'At my internship at Kmer', group: 0 },
          { text: 'Updates by 2pm', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak STAR line.',
        lines: ['I tested in airplane mode on two phones.', 'And then it was fine, I guess.', 'Eleven drivers use it now.'],
        bug: 1,
        explanation: 'A vague ending. Give the result with a number.',
      },
      {
        kind: 'chatReply',
        prompt: 'David asks a behavioural question. Pick the best start.',
        from: 'david',
        message: 'Tell me about a time you had to learn something fast.',
        options: [
          { text: '"At Kmer, I had two weeks to learn offline storage. My task was..."' },
          { text: '"I\'m a very fast learner."', why: 'A claim, not a story. Start with the situation.' },
          { text: '"Hmm, never happened."', why: 'Everyone has one. Use STAR.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which part of STAR should be longest?',
        options: [
          { text: 'Action' },
          { text: 'Situation', why: 'Keep it short.' },
          { text: 'Task', why: 'One sentence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the STAR letters.',
        template: 'Situation, [[1]], Action, [[2]].',
        blanks: [['Task'], ['Result']],
        distractors: ['Talk', 'Reason', 'Story'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the A in STAR stand for? (one word)',
        answers: ['action'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in "Tell me about yourself", or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Eleven drivers use my tool', group: 0 },
          { text: 'My favourite food', group: 1 },
          { text: 'Why this role', group: 0 },
          { text: 'I\'m a hard worker', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do companies ask "Tell me about a time when..."?',
        options: [
          { text: 'Past behaviour is good evidence of future behaviour' },
          { text: 'To trick you', why: 'It\'s evidence, not a trick.' },
          { text: 'They have no other questions', why: 'It\'s a deliberate method.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Practise "Tell me about yourself" out loud once more. What changed from your first recording?',
    starters: ['This time...', 'I still need to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a friend to play the interviewer for ten minutes: "Tell me about yourself", then one "Tell me about a time..." question.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;

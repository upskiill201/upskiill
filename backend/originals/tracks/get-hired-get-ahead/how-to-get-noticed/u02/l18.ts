import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 18 — read a great case study, part by part. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Read a great case study',
  summary: 'Before Clinton writes his final version, Miracle sends him the case study that got Halima, a former nurse with no tech experience, her job on Miracle\'s team at Afiya. Tap each part to see why it got her the interview.',
  minutes: 12,
  outcomes: ['Recognise every part of a strong case study', 'See how a non-tech background becomes a strength', 'Borrow the structure for your own piece'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Halima\'s case study',
      text: 'Clinic sign-in, without the queue. At the clinic where I worked in Kano, patients waited up to two hours just to sign in, and the paper register got lost twice a month. I asked six patients and two nurses what slowed things down, then designed a one-page numbered ticket system with a simple wall chart. Waiting time to sign in fell from about two hours to 25 minutes in the first month, and the register hasn\'t been lost since. What I learned: the nurses\' ideas were better than mine; I now ask the people doing the work first. Tools: paper, a spreadsheet for the weekly count.',
      hotspots: [
        { phrase: 'Clinic sign-in, without the queue.', note: 'A title that says the benefit. You know what she solved before you read a word more.' },
        { phrase: 'patients waited up to two hours just to sign in', note: 'The problem, with a number. Two sentences, and you can picture it.' },
        { phrase: 'I asked six patients and two nurses what slowed things down', note: 'What she did, starting with listening. "I", and specific numbers.' },
        { phrase: 'fell from about two hours to 25 minutes in the first month', note: 'The result: before and after, with a timeframe. Impossible to miss.' },
        { phrase: 'the nurses\' ideas were better than mine', note: 'What she learned. Honest and humble, and it shows she works well with people.' },
        { phrase: 'Tools: paper, a spreadsheet', note: 'Tools at the end, one line. No technology needed for proof.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Halima had no tech job, and her proof was paper and a spreadsheet. Proof is about the problem and the result, not the tools.',
    },
  ],
  apply: {
    scenario: 'Clinton studies Halima\'s case study.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Halima\'s words.',
        pairs: [
          ['Title', 'Clinic sign-in, without the queue'],
          ['Problem', 'Patients waited up to two hours'],
          ['Result', 'Down to 25 minutes in the first month'],
          ['What I learned', 'The nurses\' ideas were better than mine'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What tools did Halima use?',
        options: [
          { text: 'Paper and a spreadsheet' },
          { text: 'A custom app', why: 'No app. Proof doesn\'t need fancy tools.' },
          { text: 'AI', why: 'No AI either. Paper and a spreadsheet.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why does "What I learned" help Halima so much?',
        options: [
          { text: 'It shows she listens to colleagues and keeps improving' },
          { text: 'It admits she was bad at her job', why: 'It shows growth, not failure.' },
          { text: 'It makes it longer', why: 'It\'s one line. It shows character.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Halima\'s case study do this, or not?',
        groups: ['Did it', 'Didn\'t'],
        items: [
          { text: 'Led with the problem', group: 0 },
          { text: 'Gave a before-and-after number', group: 0 },
          { text: 'Listed her tools first', group: 1 },
          { text: 'Used adjectives about herself', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Halima\'s project wasn\'t even tech. Why did Afiya hire her for a tech company?',
        options: [
          { text: 'Because it proves she solves real problems with users, which is what Afiya\'s Clinic Success team does all day.' },
          { text: 'Luck.', why: 'Her case study made the case. It wasn\'t luck.' },
          { text: 'They felt sorry for her.', why: 'Her proof was strong. That\'s why.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would weaken Halima\'s case study.',
        lines: ['Waiting fell from about two hours to 25 minutes.', 'I am a highly motivated, dynamic professional.', 'I asked six patients and two nurses first.'],
        bug: 1,
        explanation: 'Adjectives add nothing. The rest already shows she\'s motivated.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Halima\'s result.',
        template: 'Waiting fell from about two [[1]] to 25 minutes in the first [[2]].',
        blanks: [['hours'], ['month']],
        distractors: ['days', 'year', 'patients'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Halima\'s title starts "Clinic sign-in, without the ___". (one word)',
        answers: ['queue', 'line', 'wait'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton borrow from Halima for his Njangi Tracker write-up?',
        options: [
          { text: 'A clear before-and-after result, and asking users first' },
          { text: 'Her exact words', why: 'Borrow the structure, not the words.' },
          { text: 'Nothing, his is different', why: 'The structure works for any project.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Halima\'s case study in order.',
        lines: ['Title: Clinic sign-in, without the queue', 'Problem: two-hour waits, lost registers', 'What I did: asked patients and nurses, designed tickets', 'Result: 25-minute waits', 'What I learned: ask the people doing the work'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a problem you\'ve helped fix, at work, at home or in a group, that could become a case study like Halima\'s, with no tech at all?',
    starters: ['A problem I helped fix was...', 'Before: ... After: ...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite one of your own experiences in Halima\'s exact structure: title, problem, what I did, result, what I learned, tools.',
  },
  notes: 'Halima is shared cast (How to Motivate a Team: "Newest on Clinic Success at Afiya, a former nurse from Kano"). Her case study and numbers are a fictional story detail consistent with her profile. Miracle shares it with permission in-story.',
};

export default lesson;

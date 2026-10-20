import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Ngum's letter. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Ngum\'s letter',
  summary: 'Ngum is applying for a Junior Accountant role at a Douala bakery chain and sends Clinton her letter at midnight: "Be honest. Is it bad?" It\'s... not great. Openings, research, proof and closes, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Fix an opening paragraph', 'Add a real "why them" detail', 'Strengthen "why you" and the close'],
  learn: [
    {
      kind: 'story',
      title: 'Midnight',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 11:58pm. A message from Ngum, with a file attached: "Cover-letter-final-FINAL.docx".' },
        { speaker: 'narrator', text: '"Applying to Mbanga Bakeries, Junior Accountant. Deadline tomorrow. Be honest. Is it bad?"' },
        { speaker: 'clinton', text: '(reading) "I am writing to apply... I am a hardworking and detail-oriented person... I know there are many better candidates..." Okay. Okay. We can fix this.' },
        { speaker: 'tey', text: 'Ngum\'s letter has every classic mistake. Clinton knows all the fixes now. Let\'s help her before the deadline.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: fix Ngum\'s letter.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Pick Ngum\'s new opening.',
        options: [
          { text: '"I am writing to apply for the Junior Accountant position."', why: 'The most-read line, wasted.' },
          { text: '"Last season my netball club\'s money lived in three notebooks and a WhatsApp chat. I built one cash book and we finished with a 40,000-franc surplus. Mbanga Bakeries runs 12 shops on tight margins, which is why I\'m applying to be your Junior Accountant."' },
          { text: '"I am a hardworking and detail-oriented person."', why: 'Adjectives, no story.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good "why them" detail for Mbanga Bakeries, or not?',
        groups: ['Good', 'Not useful'],
        items: [
          { text: 'They opened their 12th shop this year', group: 0 },
          { text: 'They are a leading company', group: 1 },
          { text: 'They buy flour from local farmers', group: 0 },
          { text: 'Their bread is nice', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the "why you" sentence that proves nothing.',
        lines: ['You need someone who keeps records accurate.', 'I am very detail-oriented and accurate.', 'As treasurer, I traced every payment for a season and cut overdue fees from 14 to 2.'],
        bug: 1,
        explanation: 'The claim. The next sentence proves it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Mbanga must-have to Ngum\'s proof.',
        pairs: [
          ['Accurate records', 'Traced every netball club payment'],
          ['Excel skills', 'Built the club\'s cash book in Excel'],
          ['Working to deadlines', 'Monthly accounts on time all season'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Ngum asks: her last line is "I know there are many better candidates." Too honest? What do I tell her?',
        options: [
          { text: 'Cut it: it talks you down. End with "I\'d love to talk about how I could help Mbanga keep its 12 shops on budget."' },
          { text: 'Keep it, it\'s humble.', why: 'It plants doubt. Let them decide.' },
          { text: 'Say "I am the best candidate".', why: 'Too far the other way. Confident invitation instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ngum\'s opening in order.',
        lines: ['Her club\'s money lived in three notebooks', 'She built one cash book; they finished with a surplus', 'Mbanga runs 12 shops on tight margins', 'So she\'s applying to be their Junior Accountant'],
      },
      {
        kind: 'mcq',
        prompt: 'Ngum doesn\'t know the hiring manager\'s name. Which greeting?',
        options: [
          { text: '"Dear Mbanga Bakeries team,"' },
          { text: '"Dear Sir,"', why: 'Assumes a man. A team greeting is better.' },
          { text: '"Yo,"', why: 'Too casual.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngum\'s proof.',
        template: 'You need someone who keeps records [[1]]. As treasurer, I traced every [[2]] for a season.',
        blanks: [['accurate'], ['payment']],
        distractors: ['secret', 'grade', 'photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ngum\'s file was called "Cover-letter-final-FINAL.docx". What should it start with instead? (her first name)',
        answers: ['ngum', 'ngum fru'],
        placeholder: 'Her name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed or still needs work?',
        groups: ['Fixed', 'Still needs work'],
        items: [
          { text: 'Opening with the netball cash book story', group: 0 },
          { text: '"Many better candidates"', group: 1 },
          { text: 'Proof with 14 to 2 overdue fees', group: 0 },
          { text: '"Leading company" in why them', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which sign-off should Ngum use?',
        options: [
          { text: '"Kind regards, Ngum Fru", then her email and phone' },
          { text: '"Bye!"', why: 'Too casual.' },
          { text: 'No sign-off', why: 'Sign off with your full name and contact details.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Ngum made every classic mistake at midnight. Which one are you most likely to make when you\'re in a rush?',
    starters: ['In a rush I\'d probably...', 'To avoid it I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Swap cover letters with a friend and do what Clinton did for Ngum: fix the opening, the "why them", one proof and the close.',
  },
  notes: 'Checkpoint 2 of Chapter 4 reviews l06–l09. Ngum Fru is a named extra (not a cast id), so her question is relayed by Clinton in the chatReply. Mbanga Bakeries is fictional (Mbanga is a town in Cameroon\'s Littoral region). These exercises double as Jump ahead / placement questions.',
};

export default lesson;

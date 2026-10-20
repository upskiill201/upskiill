import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 14 — proofread like a pro: read aloud, second reader, file names, PDF. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Proofread like a pro',
  summary: 'Clinton\'s CV is finally good. Then David reads it out loud over the phone and finds "Univeristy" and "attention to detial". Four steps that catch what your eyes skip.',
  minutes: 11,
  outcomes: ['Proofread a CV with four reliable checks', 'Name and save the file professionally', 'Know which mistakes matter most'],
  learn: [
    {
      kind: 'steps',
      title: 'Four checks before you send',
      steps: [
        { title: '1. Read it out loud', body: 'Your eyes fill in what you meant. Your voice doesn\'t. Read every word aloud, slowly. You\'ll hear missing words and stumble on typos like "Univeristy".' },
        { title: '2. Get a second reader', body: 'Someone who didn\'t write it: a friend, a mentor, a careers adviser. Ask them to check spelling, dates and whether every bullet makes sense to someone who wasn\'t there.' },
        { title: '3. Check the facts and the details', body: 'Same date format everywhere (Jan 2025 or 01/2025, not both). Links that work, opened in a private window. Phone and email exactly right. Numbers that match your documents.' },
        { title: '4. Name and save it properly', body: 'Save as a PDF unless the advert asks for Word. Name the file with your name: "Clinton-Ndi-CV.pdf", not "final_FINAL_v3.pdf". Open the PDF once to check it looks right.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'The most damaging typo is in your contact details. A wrong digit in your phone number means they can\'t call you.',
    },
  ],
  apply: {
    scenario: 'Clinton proofreads before sending.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four checks in order.',
        lines: ['Read it out loud', 'Get a second reader', 'Check facts and details', 'Name and save it properly'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the typo.',
        lines: ['BSc Computer Science, University of Buea', 'Strong attention to detial and accuracy', 'Built the Njangi Tracker, used by 42 members'],
        bug: 1,
        fix: 'Strong attention to detail and accuracy',
        explanation: '"Detial". A typo in a line about attention to detail is the worst kind. (Better still: show the detail, don\'t claim it.)',
      },
      {
        kind: 'mcq',
        prompt: 'Why read it out loud?',
        options: [
          { text: 'Your eyes fill in what you meant; your voice catches what\'s really there' },
          { text: 'To practise for the interview', why: 'Nice bonus, but the point is catching mistakes.' },
          { text: 'It\'s faster', why: 'It\'s slower, and that\'s why it works.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good file name or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Clinton-Ndi-CV.pdf', group: 0 },
          { text: 'final_FINAL_v3.docx', group: 1 },
          { text: 'Ngum-Fru-CV-Accounting.pdf', group: 0 },
          { text: 'cv.pdf', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Your CV says "Jan 2025" up here and "03/2024" down there. Why are they different?',
        options: [
          { text: 'Good catch! I\'ll use the same date format everywhere.' },
          { text: 'It doesn\'t matter.', why: 'Mixed formats look careless. David noticed in seconds.' },
          { text: 'Dates are boring.', why: 'Boring and important. Make them consistent.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Which typo does the most damage?',
        options: [
          { text: 'A wrong digit in your phone number or email' },
          { text: 'A missing comma', why: 'Small. A wrong phone number means no call at all.' },
          { text: 'A capital letter in the wrong place', why: 'Worth fixing, but contact details matter most.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each check to what it catches.',
        pairs: [
          ['Reading out loud', 'Missing words and typos'],
          ['A second reader', 'Bullets that don\'t make sense to others'],
          ['Opening links privately', 'Links recruiters can\'t open'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the file name.',
        template: '[[1]]-Ndi-[[2]].pdf',
        blanks: [['Clinton'], ['CV']],
        distractors: ['final', 'v3', 'new'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Unless the advert asks for Word, save your CV as a ___. (three letters)',
        answers: ['pdf'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who\'s the best second reader for Clinton\'s CV?',
        options: [
          { text: 'Someone who didn\'t write it and will be honest, like Mrs Ewane or Miracle' },
          { text: 'Himself, again', why: 'He\'ll skip the same mistakes. Get fresh eyes.' },
          { text: 'Nobody, it\'s fine', why: 'David found two typos in one minute.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a mistake you\'ve sent before (a message, an email, an assignment) that a quick proofread would have caught?',
    starters: ['I once sent...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do all four checks on your CV today. Then rename the file "Firstname-Lastname-CV.pdf".',
  },
  notes: 'Proofreading practice from careers-service guidance. Ngum\'s surname Fru is introduced as an example file name.',
};

export default lesson;

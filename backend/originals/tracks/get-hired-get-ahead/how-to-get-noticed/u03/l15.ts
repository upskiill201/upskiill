import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Brenda's tips. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Brenda\'s tips',
  summary: 'Brenda answers Clinton\'s message from the careers talk: "You asked what I look for on a graduate CV. Here are five things, and five things that make me close the file." Honest numbers, global norms, ATS and proofreading, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Keep every number honest and exact', 'Adjust a CV for different countries', 'Make a CV readable for software and people, and error-free'],
  learn: [
    {
      kind: 'story',
      title: 'Five and five',
      beats: [
        { speaker: 'narrator', text: 'Monday. An email from Brenda Fon. Subject: "Your question from the careers talk".' },
        { speaker: 'brenda', text: 'What I look for: proof of projects, numbers that are real, a clean page, the words from our advert where they\'re true, and a file named with your name. What makes me close the file: invented numbers, typos in contact details, scrambled layouts, buzzwords, and "final_v3.pdf".' },
        { speaker: 'clinton', text: 'She actually answered. She actually ANSWERED.' },
        { speaker: 'tey', text: 'Brenda just summarised the last four lessons. Let\'s make sure Clinton\'s CV passes all ten.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: pass Brenda\'s five and five.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Tap the line that would make Brenda close the file.',
        lines: ['Njangi Tracker: used by 42 members (link)', 'GPA: 3.0 (transcript: 2.94)', 'French: intermediate'],
        bug: 1,
        explanation: 'An invented number. Write 2.94 or leave it off.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Brenda\'s "look for" list or "close the file" list?',
        groups: ['Looks for', 'Closes the file'],
        items: [
          { text: 'Real numbers', group: 0 },
          { text: 'A typo in the phone number', group: 1 },
          { text: 'A clean page', group: 0 },
          { text: '"final_v3.pdf"', group: 1 },
          { text: 'The advert\'s words, where true', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton also applies to a company in Toronto. What changes?',
        options: [
          { text: 'Nothing at all', why: 'The core stays, but naming and photo norms differ.' },
          { text: 'It\'s called a résumé there, and he leaves the photo off' },
          { text: 'He adds his date of birth', why: 'Usually avoided in Canada.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'A course says 75% of CVs get rejected by robots and I should pay to fix mine. Should I?',
        options: [
          { text: 'Yes, pay now.', why: 'The claim has no study behind it.' },
          { text: 'Give up on online applications.', why: 'They work fine with a clear CV.' },
          { text: 'That number came from a 2012 sales pitch. A clean layout and honest keywords are free.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the proofreading checks in order.',
        lines: ['Read it out loud', 'Get a second reader', 'Check facts and details', 'Name and save it properly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to its fix.',
        pairs: [
          ['Mixed date formats', 'One format everywhere'],
          ['Text inside images', 'Plain text only'],
          ['"Preferred" GPA you miss', 'Leave it off or write it exactly'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does an applicant tracking system mostly do?',
        options: [
          { text: 'Stores CVs so recruiters can search and sort them' },
          { text: 'Rejects most CVs automatically', why: 'That\'s the myth.' },
          { text: 'Interviews you', why: 'No. It stores and searches applications.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Brenda\'s first rule.',
        template: 'Numbers that are [[1]], and a file named with your [[2]].',
        blanks: [['real', 'true'], ['name']],
        distractors: ['round', 'date', 'photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the US and Canada, the one-page job document is called a ___. (one word)',
        answers: ['resume', 'résumé'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Never on a CV, or depends on the country?',
        groups: ['Never', 'Depends'],
        items: [
          { text: 'National ID number', group: 0 },
          { text: 'A photo', group: 1 },
          { text: 'Marital status', group: 1 },
          { text: 'An invented grade', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'P.S. Send me your CV when applications open. Make sure it\'s the one with no typos.',
        options: [
          { text: 'Can I send it now, unfinished?', why: 'She asked for it when applications open, and polished.' },
          { text: 'My CV never has typos.', why: 'David found two last week.' },
          { text: 'I will. Thank you for the tips, they changed my whole CV.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Check your CV against Brenda\'s five and five. Which one would she flag first?',
    starters: ['She\'d flag...', 'I\'ll fix it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write Brenda\'s ten points as a checklist and tick your CV against each one.',
  },
  notes: 'Checkpoint 3 of Chapter 3 reviews l11–l14. Brenda (course-only, Njangi Pay recruiter). These exercises double as Jump ahead / placement questions.',
};

export default lesson;

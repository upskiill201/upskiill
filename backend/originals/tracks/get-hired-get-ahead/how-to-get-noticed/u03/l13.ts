import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 13 — applicant tracking systems: what they do, and the "75%" myth. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'The software that reads CVs',
  summary: 'A video in Clinton\'s feed says "75% of CVs are rejected by robots before a human ever sees them!" and sells a CV-fixing course. Tey explains what that software really does, and where that number came from.',
  minutes: 11,
  outcomes: ['Explain what an applicant tracking system (ATS) does', 'Spot the "75% rejected" myth', 'Make a CV that software and people can both read'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'When you apply on a company\'s website, your CV usually goes into an applicant tracking system, or ATS. It\'s software that stores applications so recruiters can sort, search and track them. Njangi Pay uses one for its 900 applications.',
          replies: ['Does it reject people?', 'What about the 75%?'],
        },
        {
          tey: 'That "75% of CVs are rejected by robots" line is everywhere. People who traced it found it came from a 2012 sales pitch by a company selling CV-fixing services, which closed soon after. There\'s no study behind it.',
          replies: ['So it\'s fake?'],
        },
        {
          tey: 'The number is. The software is real. Most of the time a recruiter searches it for words like "JavaScript" or "customer support" and reads what comes up. Some systems rank or filter by knockout questions ("Do you have the right to work here?"). Messy formatting can scramble your CV inside it.',
          replies: ['So what do I do?'],
        },
        {
          tey: 'What you\'ve already learned. A clean one-column layout, plain headings, the advert\'s real words where they\'re true, and a PDF or Word file as asked. You don\'t need to "beat the robot". You need a CV that\'s easy to read for software and for people.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An ATS stores and searches CVs. The "75% rejected" claim has no study behind it. Clear layout plus honest keywords works for both software and people.',
    },
  ],
  apply: {
    scenario: 'Clinton checks the claim.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does an applicant tracking system mainly do?',
        options: [
          { text: 'Rejects 75% of CVs automatically', why: 'That claim has no study behind it.' },
          { text: 'Stores applications so recruiters can sort, search and track them' },
          { text: 'Writes your CV for you', why: 'It reads and stores CVs. It doesn\'t write them.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Where did the "75% rejected" number come from?',
        options: [
          { text: 'A large government study', why: 'No study found. It traces to a sales pitch.' },
          { text: 'Ladders\' eye-tracking study', why: 'That study measured the first look, not software rejections.' },
          { text: 'A 2012 sales pitch by a company selling CV services' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps with an ATS, or not needed?',
        groups: ['Helps', 'Not needed'],
        items: [
          { text: 'Plain headings', group: 0 },
          { text: 'The advert\'s real words, where true', group: 0 },
          { text: 'Hidden white text full of keywords', group: 1 },
          { text: 'A clean one-column layout', group: 0 },
          { text: 'Paying for a "beat the robot" course', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone said to paste the whole advert in white text at the bottom of my CV so the robot loves it. Genius?',
        options: [
          { text: 'No: recruiters see it when they copy or search the text, and it looks like cheating. Use true keywords in real bullets.' },
          { text: 'Genius, do it.', why: 'Hidden text tricks are easy to spot and look dishonest.' },
          { text: 'Paste it in big red text instead.', why: 'Still copying the advert. Use your true experience.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the false statement about ATS software.',
        lines: ['Recruiters often search it for skills from the advert.', '75% of CVs are rejected by it before a human sees them.', 'Messy formatting can scramble a CV inside it.'],
        bug: 1,
        explanation: 'A widely repeated claim with no study behind it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ATS fact to what Clinton should do.',
        pairs: [
          ['Recruiters search by keyword', 'Use the advert\'s true words'],
          ['Complex layouts can scramble', 'One column, plain headings'],
          ['Knockout questions exist', 'Answer them honestly and carefully'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a "knockout question"?',
        options: [
          { text: 'A trick interview question', why: 'It\'s an application form question.' },
          { text: 'A boxing question', why: 'Ha. A screening question on the application.' },
          { text: 'A yes/no screening question like "Do you have the right to work here?"' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s advice.',
        template: 'You don\'t need to beat the [[1]]. You need a CV that\'s easy to [[2]].',
        blanks: [['robot', 'software'], ['read']],
        distractors: ['recruiter', 'hide', 'print'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does ATS stand for? Applicant ___ System. (one word)',
        answers: ['tracking'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'The video sells a course to "beat the ATS". What should Clinton do?',
        options: [
          { text: 'Buy it immediately', why: 'It\'s selling a fix for a problem built on a myth.' },
          { text: 'Skip it; use a clean layout and honest keywords, which is free' },
          { text: 'Stop applying online', why: 'Online applications work. Just keep the CV clean.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen a scary statistic about job hunting online? How could you check where it came from?',
    starters: ['I saw...', 'I could check by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search for "75% of resumes rejected ATS myth" and read one article that traces it. Notice how many sites still repeat the number.',
  },
  notes: 'The "75% of resumes are rejected by ATS" figure traces to a 2012 sales pitch by Preptel, a resume-optimisation company that went out of business the following year; no study supports it (traced by HR consultant Christine Assaf and others; e.g. HiringThing, "Applicant Tracking System Myths"). ATS store, search and sometimes rank or apply knockout questions; formatting can affect parsing. Checked 2026-10-20.',
};

export default lesson;

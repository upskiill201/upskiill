import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 12 — letters that look right: email vs attachment, greetings, length, subject lines. Card deck. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Letters that look right',
  summary: 'Some jobs want the letter in a form box. Some want it attached. Some want an email to a real person. Clinton\'s first email had no subject line and the letter pasted in size 8 font. Here are the rules for each.',
  minutes: 11,
  outcomes: ['Format a letter for a form box, an attachment or an email', 'Write a clear email subject line', 'Address the letter correctly'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Three ways letters arrive, three sets of rules.</strong> Always follow the advert first: if it says "attach a PDF" or "paste into the box", do exactly that.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>1. A form box.</strong> Paste plain text: no fancy formatting survives. Keep the four paragraphs, with a blank line between each. Skip addresses and dates at the top; the greeting is enough.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>2. An attachment.</strong> One page, same font and style as your CV, saved as a PDF unless they ask for Word. Name it like your CV: "Clinton-Ndi-Cover-Letter-Njangi-Pay.pdf". At the top: your name and contact details, the date, and the greeting.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>3. An email to a person.</strong> The email itself can be the letter, shortened a little, with the CV attached. The <strong>subject line</strong> does a job: "Graduate Developer application: Clinton Ndi". Never leave it blank, and never write just "Hi" or "Job".</p>',
    },
    {
      kind: 'check',
      question: 'Which email subject line is best?',
      options: ['Hi', 'Graduate Developer application: Clinton Ndi', 'URGENT: PLEASE READ'],
      answer: 1,
      explanation: 'It tells them exactly what it is and who it\'s from.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Send it to yourself first. Check how it looks on a phone, because that\'s often where it\'s read first.',
    },
  ],
  apply: {
    scenario: 'Clinton formats his letter three ways.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each way of sending to its rule.',
        pairs: [
          ['A form box', 'Plain text, blank line between paragraphs'],
          ['An attachment', 'One-page PDF, named with your name'],
          ['An email to a person', 'A clear subject line, CV attached'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good subject line or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Graduate Developer application: Clinton Ndi', group: 0 },
          { text: '(no subject)', group: 1 },
          { text: 'Junior Accountant application, Ngum Fru', group: 0 },
          { text: 'Job', group: 1 },
          { text: 'URGENT!!!', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should you always do first?',
        options: [
          { text: 'Follow exactly what the advert asks for' },
          { text: 'Use your favourite format', why: 'Their instructions come first.' },
          { text: 'Send it three ways to be safe', why: 'One way, the way they asked.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the formatting mistake.',
        lines: ['Subject: Graduate Developer application: Clinton Ndi', 'Attachment: final_v3.docx', 'Body: a short version of the letter, signed with his full name'],
        bug: 1,
        fix: 'Attachment: Clinton-Ndi-Cover-Letter-Njangi-Pay.pdf',
        explanation: 'Name files with your name, and save as PDF unless asked for Word.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The form box removed all my bold text and bullet points!',
        options: [
          { text: 'Form boxes take plain text. I\'ll use four clear paragraphs with blank lines between them.' },
          { text: 'I\'ll type it all in capitals instead.', why: 'Capitals read as shouting. Plain paragraphs.' },
          { text: 'I\'ll paste a screenshot of my letter.', why: 'Most boxes take text only, and images can\'t be read.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why send the email to yourself first?',
        options: [
          { text: 'To see how it looks, especially on a phone, before they see it' },
          { text: 'To have a copy', why: 'Your sent folder does that. It\'s to check how it looks.' },
          { text: 'It\'s required', why: 'Not required, just smart.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Top of an attached letter: include or not?',
        groups: ['Include', 'Not needed'],
        items: [
          { text: 'Your name and contact details', group: 0 },
          { text: 'The date', group: 0 },
          { text: 'Your photo', group: 1 },
          { text: 'The greeting', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the subject line.',
        template: 'Graduate Developer [[1]]: Clinton [[2]]',
        blanks: [['application'], ['Ndi']],
        distractors: ['urgent', 'hello', 'job'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Unless they ask for Word, save an attached letter as a ___. (three letters)',
        answers: ['pdf'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Brenda gave Clinton her email. What does he send?',
        options: [
          { text: 'A short email that\'s the letter itself, with a clear subject line and his CV attached' },
          { text: 'An empty email with two attachments', why: 'Use the email body. Don\'t make her open files to find out who you are.' },
          { text: 'A voice note', why: 'Not for a formal application.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last formal email you sent. Did it have a clear subject line, a greeting and your full name? What would you change?',
    starters: ['My last email...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write an application email to yourself: subject line, greeting, a short version of your letter, sign-off, CV attached. Open it on your phone and fix what looks wrong.',
  },
  notes: 'Formatting conventions (plain text for form fields, PDF attachments, descriptive subject lines) follow common careers-service guidance.',
};

export default lesson;

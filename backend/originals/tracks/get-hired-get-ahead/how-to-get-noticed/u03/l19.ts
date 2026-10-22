import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 19 — the learner writes their own CV (career kit, piece 3). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your CV',
  summary: 'Piece 3 of your career kit. You have a skills inventory (Chapter 1) and a portfolio piece (Chapter 2). Now they become a one-page CV, step by step, in about an hour.',
  minutes: 13,
  outcomes: ['Turn your inventory and portfolio into a CV', 'Write a profile and four to six formula bullets', 'Check it against the chapter\'s rules before you send it'],
  learn: [
    {
      kind: 'steps',
      title: 'Your CV in six steps',
      steps: [
        { title: '1. Start clean', body: 'A blank document, one column, one readable font (10 to 12 point). Your name big at the top, then one contact line: email with your name, phone, city, one link.' },
        { title: '2. Write the two-line profile', body: 'Line 1: who you are, plainly. Line 2: your best proof, with a number. Take it from your inventory\'s starred skills.' },
        { title: '3. Add sections in your best order', body: 'Education, Projects, Experience, Skills (and Extras if they add proof). Put your strongest section right after the profile.' },
        { title: '4. Write four to six formula bullets', body: 'From your evidence bank and portfolio piece: strong verb, what you did, result. One or two lines each.' },
        { title: '5. Skills with honest levels', body: 'Grouped, no bars or percentages: "Languages: ... Tools: ...". Every level something you could prove tomorrow.' },
        { title: '6. Check and save', body: 'Seven-second test with a friend. Read aloud. Second reader. Dates consistent. Links work. Save as "Firstname-Lastname-CV.pdf". This is your master CV: tailor copies from it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before you send it anywhere: every number matches your documents, and nothing is invented or rounded up.',
    },
  ],
  apply: {
    scenario: 'You build your CV.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put your six steps in order.',
        lines: ['Start clean: name and contact', 'Write the two-line profile', 'Add sections in your best order', 'Write formula bullets', 'Skills with honest levels', 'Check and save'],
      },
      {
        kind: 'mcq',
        prompt: 'Where do your profile\'s proof and your bullets come from?',
        options: [
          { text: 'A CV template\'s example text', why: 'Templates have someone else\'s words. Use your own proof.' },
          { text: 'Your skills inventory, evidence bank and portfolio piece' },
          { text: 'Your imagination', why: 'Only real proof. Your kit already has it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready to send, or fix first?',
        groups: ['Ready', 'Fix first'],
        items: [
          { text: 'Two-line profile with a number', group: 0 },
          { text: 'A bullet starting "Responsible for"', group: 1 },
          { text: 'File named Firstname-Lastname-CV.pdf', group: 0 },
          { text: 'A grade rounded up', group: 1 },
          { text: 'Dates in one consistent format', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks this chapter\'s rules.',
        lines: ['Volunteer, church choir sign-ups: built a sheet that cut confusion over trip places.', 'Skills: Leadership 95%, Teamwork 90%.', 'Profile: Business student who organises people; ran a 30-person trip on budget.'],
        bug: 1,
        fix: 'Skills: Excel (intermediate), English (native), Swahili (fluent).',
        explanation: 'Made-up percentages prove nothing. List skills with honest levels.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Is this the CV you\'ll send to every job?',
        options: [
          { text: 'Yes, same for all.', why: 'Generic CVs match nothing in particular. Tailor copies.' },
          { text: 'I\'ll make a totally new one each time.', why: 'No need. Copy and tailor from the master.' },
          { text: 'No, it\'s my master CV. I\'ll tailor a copy for each role in about 15 minutes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your career kit to where it goes on your CV.',
        pairs: [
          ['Starred skills from your inventory', 'Profile and Skills'],
          ['Your portfolio piece', 'Projects'],
          ['Evidence bank entries', 'Formula bullets'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many formula bullets should a first graduate CV aim for?',
        options: [
          { text: 'About four to six' },
          { text: 'One', why: 'Too thin. Four to six shows range.' },
          { text: 'Twenty-five', why: 'Too many to fit on one strong page.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete your profile line.',
        template: 'Line 1: who you [[1]]. Line 2: your best [[2]], with a number.',
        blanks: [['are'], ['proof']],
        distractors: ['want', 'hobby', 'photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first test with a friend lasts how many seconds? (a number)',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of step 6 (check and save), or not?',
        groups: ['Step 6', 'Not part of it'],
        items: [
          { text: 'Read it aloud', group: 0 },
          { text: 'Open links in a private window', group: 0 },
          { text: 'Add a skills wheel', group: 1 },
          { text: 'Ask a second reader', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your profile and your two best bullets now. Then do the seven-second test on yourself: what would a stranger remember?',
    starters: ['Profile: ...', 'Bullet 1: ...', 'Bullet 2: ...'],
  },
  deepen: {
    title: 'Your career kit, piece 3',
    summary: 'Finish your one-page master CV with all six steps. Get one second reader. Save it as "Firstname-Lastname-CV.pdf". Chapter 4 adds the cover letter.',
  },
  notes: 'Learner\'s career kit, piece 3 (outline engagement point 1). Swahili in the example keeps the audience global.',
};

export default lesson;

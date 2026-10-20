import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 20 — Chapter Challenge: one page, no red ink. Clinton's tailored one-page CV. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: one page, no red ink',
  summary: 'Njangi Pay\'s graduate applications open next month. Clinton builds the tailored one-page CV he\'ll send, then takes it to Mrs Ewane, whose red pen has never once stayed capped. Everything from this chapter, on one page.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a tailored one-page CV', 'Use the top third, formula bullets and honest numbers', 'Pass a full check before you send'],
  learn: [
    {
      kind: 'story',
      title: 'The red pen',
      beats: [
        { speaker: 'narrator', text: 'Thursday. Six months to graduation. Clinton walks into the careers office with one sheet of paper, not three.' },
        { speaker: 'ewane', text: 'One page. Interesting. Sit. Pen.' },
        { speaker: 'narrator', text: 'She reads. The pen hovers. It hovers some more. She puts it down, capped.' },
        { speaker: 'ewane', text: 'Nothing to circle. In fourteen years, that has happened twice. Don\'t tell anyone, it will ruin my reputation.' },
        { speaker: 'tey', text: 'Let\'s build the CV that made Mrs Ewane put her pen down.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The kit so far',
      steps: [
        { title: 'Piece 1 (Chapter 1)', body: 'Skills inventory: every skill with proof.' },
        { title: 'Piece 2 (Chapter 2)', body: 'The Njangi Tracker case study: proof you can see.' },
        { title: 'Piece 3 (tonight)', body: 'A one-page CV tailored to Njangi Pay, built from pieces 1 and 2.' },
        { title: 'Next chapter', body: 'The cover letter. Clinton\'s first draft starts "I am writing to apply..." and says nothing at all.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: build the CV for Njangi Pay.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Step 1: pick Clinton\'s profile.',
        options: [
          { text: '"Career Objective: a challenging role in a dynamic fintech."', why: 'Red pen: an objective.' },
          { text: '"Final-year CS student who builds tools people use. Built a savings tracker now used by 42 members; grew a campus meet-up from 6 to 40."' },
          { text: '"Passionate, motivated developer."', why: 'Red pen: adjectives.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Step 2: order the sections for Njangi Pay.',
        lines: ['Name and contact', 'Profile', 'Projects', 'Education', 'Experience', 'Skills'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Step 3: build the Njangi Tracker bullet.',
        tiles: ['Built', 'a payment tracker', 'for a 12-member', 'savings group,', 'ending', 'monthly disputes'],
        distractors: ['responsible', 'passionate'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 4: Njangi Pay\'s advert wants these. Which bullet goes first in Experience?',
        groups: ['Lead with it', 'Lower down'],
        items: [
          { text: 'Explained repairs to customers at the phone stall (advert: "explain technical ideas")', group: 0 },
          { text: 'Captain, football team', group: 1 },
          { text: 'Moved 40 people to the library when the venue cancelled (advert: "calm when things break")', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Step 5: the honesty check. Tap the line that must change.',
        lines: ['GPA: 3.0', 'French: intermediate', 'Njangi Tracker: used by 42 members'],
        bug: 0,
        fix: 'Leave the GPA off, or write the exact 2.94.',
        explanation: 'His transcript says 2.94. Numbers must match documents exactly.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Step 6: match each layout choice to why it\'s there.',
        pairs: [
          ['One column, plain headings', 'Easy for people and software to read'],
          ['Dates on the right, one format', 'The eye finds them instantly'],
          ['No photo, no skill bars', 'Space for proof'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Step 7: Miracle\'s seven-second test.',
        from: 'miracle',
        message: 'Timer\'s done. What do I remember? CS final year, a tracker 42 people use, and a meet-up he grew to 40. That\'s exactly what I needed. What\'s the file called?',
        options: [
          { text: 'Clinton-Ndi-CV-Njangi-Pay.pdf' },
          { text: 'final_FINAL_v3.pdf', why: 'Brenda closes those.' },
          { text: 'cv.pdf', why: 'Which of 900 cv.pdf files is his?' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 8: the last checks. Done, or not needed?',
        groups: ['Done', 'Not needed'],
        items: [
          { text: 'Read aloud', group: 0 },
          { text: 'Second reader (Mrs Ewane)', group: 0 },
          { text: 'Links opened in a private window', group: 0 },
          { text: 'Pasting the advert in white text', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 9: complete Clinton\'s skills line.',
        template: 'Languages: English (native), French ([[1]]). Technical: [[2]], Python, Git.',
        blanks: [['intermediate'], ['JavaScript']],
        distractors: ['fluent', '85%', 'expert'],
      },
      {
        kind: 'mcq',
        prompt: 'Step 10: Clinton also sees a data internship. What does he do with this CV?',
        options: [
          { text: 'Keep it as the master, and tailor a copy that leads with his data bullet' },
          { text: 'Send this exact CV to both', why: 'Tailor each. Fifteen minutes.' },
          { text: 'Add "SQL expert" for the data role', why: 'Never add what isn\'t true.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many pages is Clinton\'s finished CV? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If Mrs Ewane read your CV today, would her pen stay capped? What would she circle first?',
    starters: ['She\'d circle...', 'After this chapter, I\'ll fix...'],
  },
  deepen: {
    title: 'Your career kit, piece 3: done',
    summary: 'Make sure your master CV passes every check from this chapter, then tailor one copy for a real role you want. Chapter 4 writes the cover letter that goes with it.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: a tailored one-page CV; Mrs Ewane hands it back without a red mark. "Kit so far" uses a neutral steps card. These exercises double as Jump ahead / placement questions.',
};

export default lesson;

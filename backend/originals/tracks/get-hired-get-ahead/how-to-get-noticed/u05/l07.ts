import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 7 — experience, projects and Featured. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Experience, projects and Featured',
  summary: 'Clinton\'s Experience section is empty because "I\'ve never had a job". Tey shows him that the meet-up, the phone stall and the njangi all belong on his profile, and where to pin his best proof so nobody can miss it.',
  minutes: 11,
  outcomes: ['Add non-job experience honestly', 'Use the Projects and Featured sections', 'Reuse your CV bullets without copying the whole CV'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Clinton\'s Experience section is empty. "I\'ve never had a real job." Is that true for LinkedIn?',
          replies: ['Probably not', 'I don\'t know'],
        },
        {
          tey: 'Experience isn\'t only paid jobs. Volunteer roles, leadership roles and part-time work all go there, with honest titles: "Organiser, CS Tech Meet-up". "Weekend assistant, phone-repair stall". Add each one with dates and one or two achievement bullets from your CV.',
          replies: ['And the Njangi Tracker?'],
        },
        {
          tey: 'Two places. The Projects section, with the same short case study as your portfolio. And Featured: a box at the top of your profile where you can pin links, posts or documents. Pin the tracker\'s case study there, and it\'s the first proof anyone sees.',
          replies: ['Can I just paste my whole CV?'],
        },
        {
          tey: 'Use your CV\'s best bullets, but keep each entry short. Your profile is something people scan on a phone. And keep it consistent: same titles, same dates, same numbers as your CV. Recruiters compare.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Experience includes volunteer and leadership roles. Projects and Featured show your proof. Keep everything matching your CV.',
    },
  ],
  apply: {
    scenario: 'Clinton fills in his profile.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Can it go in LinkedIn Experience?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Organiser, CS Tech Meet-up', group: 0 },
          { text: 'Weekend assistant, phone-repair stall', group: 0 },
          { text: 'A job he hasn\'t started yet', group: 1 },
          { text: 'Volunteer, church women\'s group tracker', group: 0 },
          { text: '"CEO" of a company that doesn\'t exist', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the Featured section for?',
        options: [
          { text: 'Pinning your best proof, like a case study or post, near the top' },
          { text: 'Your hobbies', why: 'It\'s for your best work.' },
          { text: 'Paying for ads', why: 'It\'s free. Pin your best proof.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I\'ve never had a real job, so I\'ll leave Experience empty. Right?',
        options: [
          { text: 'No: I\'ll add the meet-up, the phone stall and the church tracker, with honest titles and dates.' },
          { text: 'Right, leave it empty.', why: 'Volunteer and leadership roles count.' },
          { text: 'I\'ll invent an internship.', why: 'Never invent. Use what\'s real.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the entry that doesn\'t match Clinton\'s CV.',
        lines: ['Organiser, CS Tech Meet-up · 2024 to now', 'Weekend assistant, phone stall · 2022 to now', 'Organiser, CS Tech Meet-up · 2020 to now'],
        bug: 2,
        explanation: 'His CV says 2024. Dates must match everywhere.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of proof to the best profile section.',
        pairs: [
          ['The meet-up role', 'Experience'],
          ['The Njangi Tracker case study', 'Featured and Projects'],
          ['JavaScript, Python', 'Skills'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which Experience bullet works best on LinkedIn?',
        options: [
          { text: '"Grew weekly attendance from 6 to 40 members in one year."' },
          { text: '"Responsible for the meet-up."', why: 'A duty. Use the achievement.' },
          { text: 'A 300-word paragraph about the meet-up\'s history', why: 'Too long to scan on a phone.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why keep profile entries short?',
        options: [
          { text: 'People scan profiles on phones' },
          { text: 'LinkedIn deletes long entries', why: 'It doesn\'t. Short is just easier to read.' },
          { text: 'Long entries cost money', why: 'Free either way. Short reads better.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Same titles, same [[1]], same numbers as your [[2]].',
        blanks: [['dates'], ['CV']],
        distractors: ['photo', 'friends', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which section lets you pin your best proof near the top of your profile? (one word)',
        answers: ['featured'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Pin in Featured, or not?',
        groups: ['Pin it', 'Don\'t'],
        items: [
          { text: 'The Njangi Tracker case study', group: 0 },
          { text: 'A post about the meet-up\'s 40th member', group: 0 },
          { text: 'A random meme', group: 1 },
          { text: 'A screenshot with members\' real names', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What non-job experience do you have that belongs in a LinkedIn Experience section? What honest title would you give it?',
    starters: ['I could add...', 'Its title would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add one non-job experience to your profile with an honest title, dates and one achievement bullet. Pin your best proof in Featured.',
  },
  notes: 'LinkedIn sections (Experience incl. volunteer/leadership, Projects, Featured) per current platform structure (2026). Consistency with the CV links back to Ch3.',
};

export default lesson;

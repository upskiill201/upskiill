import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 8 — one CV, many jobs: tailoring honestly. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'One CV, many jobs',
  summary: 'Clinton has one CV and three adverts: Njangi Pay\'s graduate developer, a support role at a telecom, and a data internship. Miracle shows him how to adjust one master CV for each, in fifteen minutes, without inventing anything.',
  minutes: 12,
  outcomes: ['Keep a master CV and tailor copies', 'Use an advert\'s own words, honestly', 'Reorder bullets to match what each role cares about'],
  learn: [
    {
      kind: 'steps',
      title: 'Tailor in four steps',
      steps: [
        { title: '1. Keep a master CV', body: 'One longer document with everything: every project, role and achievement, each with its best bullet. You never send it. You copy from it.' },
        { title: '2. Highlight the advert', body: 'Mark the must-haves and the words the advert repeats. Njangi Pay says "learn quickly", "explain technical ideas", "JavaScript or Python", "stay calm when things break".' },
        { title: '3. Match and reorder', body: 'Copy the master CV and move the bullets that match up to the top of each section. For Njangi Pay, the tracker and the phone-stall "explaining repairs" bullet go first. For the support role, the phone stall leads.' },
        { title: '4. Use their words, if they\'re true', body: 'If the advert says "customer support" and you wrote "helped customers", use "customer support" so the match is obvious, to people and to software. Never add a skill you don\'t have just because the advert mentions it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Tailoring means choosing and ordering what\'s true. It never means adding things that aren\'t.',
    },
  ],
  apply: {
    scenario: 'Clinton tailors for three roles.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the tailoring steps in order.',
        lines: ['Keep a master CV', 'Highlight the advert', 'Match and reorder bullets', 'Use their words, if true'],
      },
      {
        kind: 'mcq',
        prompt: 'What is a master CV?',
        options: [
          { text: 'One longer document with everything, which you copy from but never send' },
          { text: 'Your best CV, sent to every job', why: 'You tailor copies. The master stays private.' },
          { text: 'A CV for senior jobs', why: 'It\'s your private source of every bullet.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest tailoring, or crossing the line?',
        groups: ['Honest tailoring', 'Crossing the line'],
        items: [
          { text: 'Moving the phone-stall bullet up for a support role', group: 0 },
          { text: 'Adding "SQL expert" because the advert mentions SQL', group: 1 },
          { text: 'Changing "helped customers" to "customer support"', group: 0 },
          { text: 'Inventing an internship to match the advert', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each role to the bullet Clinton should put first.',
        pairs: [
          ['Njangi Pay graduate developer', 'Built the Njangi Tracker, used by 42 people'],
          ['Telecom customer support', 'Diagnosed faults and explained repairs to customers'],
          ['Data internship', 'Tracked meet-up attendance and found which topics drew the most people'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'The data internship wants SQL. I\'ve never used it. Should I just add it?',
        options: [
          { text: 'No. I\'ll lead with my data bullet and mention I\'m learning SQL, with a gap plan.' },
          { text: 'Yes, they\'ll never test it.', why: 'They often do. And it\'s a lie.' },
          { text: 'Don\'t apply.', why: 'Most must-haves fit. Apply honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the tailoring mistake.',
        lines: ['Moved the tracker bullet to the top of Projects.', 'Used the advert\'s phrase "explain technical ideas" for his phone-stall bullet.', 'Added "3 years of professional experience" to match the advert.'],
        bug: 2,
        explanation: 'He has no professional years. Tailoring chooses and orders what\'s true; it never adds.',
      },
      {
        kind: 'mcq',
        prompt: 'Why use the advert\'s own words (when they\'re true)?',
        options: [
          { text: 'The match is obvious to the reader, and to software that searches CVs' },
          { text: 'To copy the advert', why: 'Not copying: matching true experience to their language.' },
          { text: 'It makes the CV longer', why: 'Same length. Clearer match.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s warning.',
        template: 'Tailoring means [[1]] and ordering what\'s true. It never means [[2]] things that aren\'t.',
        blanks: [['choosing'], ['adding']],
        distractors: ['deleting', 'hiding', 'copying'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The full private CV you copy from is called the ___ CV. (one word)',
        answers: ['master', 'main', 'base'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long should tailoring take once the master CV exists?',
        options: [
          { text: 'About 15 minutes: highlight, reorder, swap a few words' },
          { text: 'A whole week per job', why: 'With a master CV, it\'s quick.' },
          { text: 'No time: send the same CV everywhere', why: 'Generic CVs match nothing in particular. Lesson 17 shows why.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Pick two different jobs you might apply for. Which of your bullets would go first for each?',
    starters: ['For ___, I\'d lead with...', 'For ___, I\'d lead with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start your master CV: every project, role and achievement you have, each with its best formula bullet. Don\'t worry about length. It\'s just for you.',
  },
  notes: 'Master CV + tailored copies is standard careers-service practice. Using an advert\'s terms helps human readers and applicant tracking systems that search by keyword (l13). Honesty line per the course\'s values (Ch1 l11).',
};

export default lesson;

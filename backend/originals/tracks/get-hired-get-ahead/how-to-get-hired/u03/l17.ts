import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 17 — forty applications in one night: generic CV everywhere vs tailoring fewer. Story with a choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Forty applications in one night',
  summary: 'A job site has an "Easy Apply" button. Clinton realises he could send the same CV to forty companies before midnight. It feels incredibly productive. Is it?',
  minutes: 12,
  outcomes: ['Weigh volume against tailored applications', 'Choose which roles deserve a tailored CV', 'Track your applications so nothing gets lost'],
  learn: [
    {
      kind: 'story',
      title: 'Easy Apply',
      beats: [
        { speaker: 'narrator', text: 'Friday night. A job site shows forty graduate roles in Cameroon and remote. Every one has a blue button: "Easy Apply".' },
        { speaker: 'clinton', text: 'Forty applications before midnight. Same CV. If 10% reply, that\'s four interviews. It\'s maths!' },
        { speaker: 'miracle', text: 'When I hire, I can tell in two seconds if a CV was sent to everyone. It matches nothing in our advert. Those go to the bottom.' },
        { speaker: 'tey', text: 'Here\'s the trap: it feels like work, because it\'s busy. But a generic CV sent to forty places often gets fewer replies than a tailored one sent to five. Recruiters look for a match to their role.' },
      ],
      choice: {
        prompt: 'What should Clinton do tonight?',
        options: [
          {
            text: 'Pick the five roles he fits best, tailor each CV in fifteen minutes, and track them in a sheet.',
            outcome: 'Two hours, five strong applications, all in a tracker with dates. Two reply within two weeks, including a Douala start-up offering an internship interview (that\'s Chapter 7).',
            best: true,
          },
          {
            text: 'Send the same CV to all forty.',
            outcome: 'One automated "thank you for applying". Silence from the rest. And a week later he can\'t remember which forty he applied to.',
          },
          {
            text: 'Apply to nothing until his CV is perfect.',
            outcome: 'Perfect never comes. Five good applications beat zero perfect ones.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fewer, tailored applications usually beat many generic ones. Track every one: company, role, date, version of CV, next step.',
    },
  ],
  apply: {
    scenario: 'Clinton plans his applications.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can forty generic applications do worse than five tailored ones?',
        options: [
          { text: 'Generic CVs match no advert in particular, so they sink to the bottom' },
          { text: 'Recruiters hate the number 40', why: 'Ha. It\'s about matching the role.' },
          { text: 'Job sites block you after five', why: 'Usually not. The issue is quality of match.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a tailored application, or skip?',
        groups: ['Tailor and apply', 'Skip'],
        items: [
          { text: 'Njangi Pay graduate developer (strong fit)', group: 0 },
          { text: 'Senior manager, 10 years required', group: 1 },
          { text: 'Douala start-up internship, JavaScript', group: 0 },
          { text: 'A role in a field he has no interest in', group: 1 },
          { text: 'Telecom support role using his phone-stall skills', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But if I only send five, I\'m putting all my eggs in five baskets!',
        options: [
          { text: 'Five strong baskets this week, five more next week. Steady and tailored beats one huge generic night.' },
          { text: 'True, send forty.', why: 'Forty weak applications are forty weak baskets.' },
          { text: 'Send one only.', why: 'Too few. A steady handful each week works.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s evening in order.',
        lines: ['Pick the five roles he fits best', 'Tailor his CV for each (15 minutes)', 'Apply', 'Log each one in his tracker'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tracker column to an example.',
        pairs: [
          ['Company and role', 'Njangi Pay, graduate developer'],
          ['Date applied', '14 March'],
          ['CV version', 'CV-Njangi-Pay.pdf'],
          ['Next step', 'Follow up on 28 March'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the habit that will cause problems later.',
        lines: ['Logs each application in a sheet.', 'Applies, then forgets which company had which CV.', 'Saves each tailored CV with the company\'s name.'],
        bug: 1,
        explanation: 'When a company calls in three weeks, he won\'t know what he sent them. Track it.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with waiting until the CV is perfect?',
        options: [
          { text: 'Perfect never arrives; good, tailored applications get sent and get replies' },
          { text: 'Nothing, wait as long as it takes', why: 'Deadlines pass. Good is enough.' },
          { text: 'Perfect CVs are rejected', why: 'Not rejected, just never sent.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: '[[1]], tailored applications usually beat many [[2]] ones.',
        blanks: [['Fewer'], ['generic']],
        distractors: ['More', 'tailored', 'perfect'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Miracle say tailoring takes with a master CV? (a number)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s a steady plan for Clinton\'s next month?',
        options: [
          { text: 'Five tailored applications a week, all tracked, with follow-ups' },
          { text: 'One night of forty, then nothing', why: 'Burst then silence. Steady wins.' },
          { text: 'Wait until graduation', why: 'Many graduate roles close before graduation.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which five roles would you apply to first, and why do you fit each one?',
    starters: ['1. ___ because...', 'My best fit is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make an application tracker today: a sheet with company, role, link, date applied, CV version, contact, next step. Add one row for a role you\'ll apply to this week.',
  },
  notes: 'Quality-over-volume guidance is common careers advice; no response-rate statistic is claimed (Clinton\'s "10%" is his own guess in-story). Sets up Ch7 (the Douala start-up internship) and Ch6 (hidden jobs).',
};

export default lesson;

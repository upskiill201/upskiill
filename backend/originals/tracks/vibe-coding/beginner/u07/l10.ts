import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 10. Chapter Challenge: Ruth's security pass. Build: the learner's security pass. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: Ruth\'s security pass',
  summary: 'Ruth prints her old bank checklist and crosses out the bank parts. What\'s left is seven questions. The app doesn\'t go live until every answer is yes. Get Hazel through it.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Run a full security pass on an AI-built app', 'Fix what fails, one change at a time'],
  learn: [
    {
      kind: 'story',
      title: 'Ruth\'s kitchen, Sunday',
      beats: [
        { speaker: 'narrator', text: 'Gumbo on the stove. A printed checklist on the table with seven questions. A red pen.' },
        { speaker: 'ruth', text: 'Secrets. Database rules. People\'s text. Real locks, not hidden buttons. Packages. Permissions. Proof. Seven yeses and I\'ll sign.' },
        { speaker: 'hazel', text: 'And if one\'s a no?' },
        { speaker: 'ruth', text: 'Then we fix it before a single parent opens the link. That\'s the whole job.' },
        { speaker: 'tey', text: 'Everything from Chapter 7. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ruth\'s seven questions.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match Ruth\'s question to how Hazel proves it.',
        pairs: [
          ['Secrets out of code and GitHub?', 'Search the project and history'],
          ['Database rules on every table?', 'Security advisor, then stranger test'],
          ['People\'s text shown safely?', 'No innerHTML with typed text'],
          ['Packages checked?', 'Every dependency looked up'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Hazel\'s results. Which one is a no?',
        lines: [
          'Logged out: can\'t read profiles. Yes.',
          'Benny can\'t delete Ruth\'s sign-up. Yes.',
          'Only Hazel can delete gigs: Delete button hidden for others.',
          'No secrets in git history (old key rotated). Yes.',
        ],
        bug: 2,
        fix: 'Add a database rule: only Hazel\'s account can delete gigs. Then test it.',
        explanation: 'A hidden button isn\'t a lock. The database has to refuse.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Real secret, or public by design?',
        groups: ['Real secret', 'Public by design'],
        items: [
          { text: 'Supabase secret key', group: 0 },
          { text: 'Supabase anon key', group: 1 },
          { text: 'Email service key', group: 0 },
          { text: 'Project URL', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI\'s fix for a failing rule: "disable RLS on gigs temporarily". What does Hazel do?',
        options: [
          { text: 'Approve, it\'s temporary', why: 'Temporary is how fix 3 happened.' },
          { text: 'Approve and set a reminder', why: 'Still opens the door.' },
          { text: 'Refuse. Ask why the rule fails, and fix the rule.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'If a secret turns up in git history, in order.',
        lines: [
          'Replace the key in its service',
          'Store the new one only where it\'s needed, git-ignored',
          'Stop tracking the file, add it to .gitignore',
          'Commit and push',
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I set my name to <b>BENNY</b> and it shows as <b>BENNY</b>, with the brackets. Is that bad?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'That\'s good: your text is shown as text, not run as code.' },
          { text: 'That\'s bad, it should be bold.', why: 'Bold would mean it ran as code.' },
          { text: 'Change it to innerHTML so it looks nicer.', why: 'That reopens the hole.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'package.json has a dependency nobody recognises. What now?',
        options: [
          { text: 'Leave it, it\'s probably fine', why: 'Unknown code in your app needs checking.' },
          { text: 'Look it up on npmjs.com and ask the AI why it\'s there; remove it if it isn\'t needed' },
          { text: 'Delete package.json', why: 'That breaks the app.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Ruth\'s rule.',
        template: '"It [[1]]" and "it\'s [[2]]" are different tests.',
        blanks: [['works'], ['safe']],
        distractors: ['looks', 'fast'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The kind of attack where hidden text gives the AI orders. (Two words.)',
        answers: ['prompt injection'],
        placeholder: '... ...',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request starts the security pass best?',
        options: [
          { text: 'Make the app secure', why: 'Vague. It may change lots of things.' },
          { text: 'Review the project for: secrets in code or history, tables without RLS, innerHTML with user text, checks only in the page, unknown packages. List each with file and line. Don\'t fix yet.' },
          { text: 'Is it secure?', why: 'It will probably say yes.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Last question. Who checks all this next month, after you\'ve added more?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'The AI.', why: 'The AI switched the rules off in Chapter 6.' },
          { text: 'Nobody, it\'s done.', why: 'Every new change can open a new hole.' },
          { text: 'We run this checklist again before every launch. It lives in tests.md now.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 6: a rule fix fails twice. What now?',
        options: [
          { text: 'Stop, go back to the last good version, get the exact error, and start a fresh session' },
          { text: 'Turn the rules off until it works', why: 'Never.' },
          { text: 'Keep asking', why: 'That\'s the loop.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of Ruth\'s seven questions did your own app fail first? What did you change?',
  },
  deepen: {
    title: 'Build it: your security pass',
    summary: 'Run Ruth\'s seven questions on your app: secrets (code and history), RLS on every table with the stranger test, people\'s text shown as text, real locks in the database, packages checked, permission rules set, and proof written in tests.md. Fix each no, one at a time. Commit. Chapter 7 shipped.',
  },
  notes: 'Chapter 7 review. Checklist adapted from common web security basics (OWASP) for a beginner app.',
};

export default lesson;

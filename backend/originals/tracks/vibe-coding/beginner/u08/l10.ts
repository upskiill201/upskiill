import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 10. Chapter Challenge (course finale): opening night. Build: the learner's app, live. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: opening night',
  summary: 'Saturday, the fundraiser dinner. Two hundred guests, the live app on the big screen, the thermometer at $14,200. Everything from all eight chapters, one last time. Then the bus.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole card on a live app under pressure', 'Ship your own app live'],
  learn: [
    {
      kind: 'story',
      title: 'The school gym, Saturday, 7 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Strings of lights, red beans and rice, the Esplanade Brass in gold shirts. On the big screen: the live app, a QR code, and the thermometer at $14,200 of $18,000.' },
        { speaker: 'hazel', text: '(on the mic) Scan the code, log in with your email, pledge what you can. Every dollar gets a kid on that bus.' },
        { speaker: 'narrator', text: 'Phones come out. The thermometer starts to climb. At 8:15, a guest says her login email hasn\'t arrived. At 8:40, Benny wants to push a "quick fix". At 9:02, the bar touches $18,000.' },
        { speaker: 'tey', text: 'Get Hazel through the night. Then it\'s your turn: your app, live.' },
      ],
    },
  ],
  apply: {
    scenario: 'Course finale: opening night.',
    items: [
      {
        kind: 'chatReply',
        from: 'hazel',
        message: '8:15. A guest\'s login email hasn\'t arrived. Everyone else\'s has.',
        prompt: 'Tey\'s first move?',
        options: [
          { text: 'Ask the AI to rewrite the login, live, during the dinner.', why: 'Never change a live app on a guess, mid-event.' },
          { text: 'Evidence: ask her to check spam and the spelling of her email, and check the email service\'s log. One person, everyone else fine: probably not the code.' },
          { text: 'Turn off logins for the night.', why: 'Then anyone can pledge as anyone.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: '8:40. Benny wants to push a "quick fix" for the font size straight to main. What does Hazel say?',
        options: [
          { text: 'Not tonight. main is live on the big screen. Branch, test, merge tomorrow.' },
          { text: 'Sure, it\'s only a font', why: 'Every push to main redeploys, mid-dinner.' },
          { text: 'Push it with --force', why: 'Definitely not.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'The thermometer at 9:02. Which line shows a problem?',
        lines: [
          'Pledges tonight: 142',
          'Total: $18,000 of $18,000',
          'Still to go: -$0',
          'Message: WE\'RE GOING TO D.C.!',
        ],
        bug: 2,
        fix: 'Show "$0 to go" (and never a minus sign) once the goal is reached.',
        explanation: 'A small edge case at the exact limit. Not a disaster tonight; a test and a fix on a branch tomorrow.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each chapter to the habit it gave Hazel.',
        pairs: [
          ['Too Many Ideas', 'A brief with a done-when'],
          ['It Looks Right', 'Tests are the judge'],
          ['The Night It Broke', 'Commit, branch, push'],
          ['Locks on the Doors', 'Database rules and no secrets'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it tonight, or tomorrow on a branch?',
        groups: ['Tonight', 'Tomorrow, on a branch'],
        items: [
          { text: 'Help one guest find their login email', group: 0 },
          { text: 'Fix the "-$0 to go" edge case', group: 1 },
          { text: 'Change the font size', group: 1 },
          { text: 'Watch the thermometer and cheer', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A guest asks: "Is my email address safe in this app?" Hazel can honestly say yes because...',
        options: [
          { text: 'The AI said it was secure', why: 'A claim.' },
          { text: 'It\'s hidden on the page', why: 'Hiding isn\'t a lock.' },
          { text: 'Database rules let each person see only their own details, and Ruth tested it as a stranger' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Fixing the "-$0" bug tomorrow, in order.',
        lines: [
          'git switch -c fix-to-go',
          'Add a test: at exactly $18,000, "to go" shows $0',
          'Ask for the fix: change only the "to go" line',
          'Run the tests and check the diff',
          'Merge into main and push',
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Hazel\'s card, the short version.',
        template: 'Brief it. [[1]] first. Check the diff. [[2]] are the judge. Commit little. Evidence before fixes. Keep it [[3]].',
        blanks: [['Plan'], ['Tests'], ['safe']],
        distractors: ['Guess', 'Vibes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Raised: $18,000. Goal: $18,000. How much to go? (Number only.)',
        answers: ['0', '$0', 'zero'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Thirty-two years of bank software, and this is the first launch I\'ve enjoyed. What changed?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'The AI got better.', why: 'Same AI all along.' },
          { text: 'Luck.', why: 'It was the checking, not luck.' },
          { text: 'We checked everything it did. You taught me that.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 1: in one sentence, what is vibe coding done well?',
        options: [
          { text: 'You describe what you want, the AI writes the code, and you stay the director: you brief, check, test and keep it safe' },
          { text: 'Letting the AI do everything and hoping', why: 'That\'s vibe coding done badly.' },
          { text: 'Typing code very fast', why: 'The AI types. You direct.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 8: what\'s Hazel\'s first job on Monday?',
        options: [
          { text: 'Delete the app, the fundraiser is over', why: 'It still runs the gigs. And the bus leaves next week.' },
          { text: 'Fix the "-$0" bug on a branch with a test, update her cost sheet, and check her plan usage' },
          { text: 'Add Benny\'s 40 features', why: 'One real need at a time.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Eight chapters ago you had never used an AI coding tool. What can you build now that you couldn\'t then? Who will you build it for?',
    starters: ['Now I can...', 'I\'ll build it for...'],
  },
  deepen: {
    title: 'Ship it: your app, live',
    summary: 'Put your own app live: security pass all yes, deployed to Vercel with its settings, Supabase Site URL pointing at the live address, a proper email sender, tests.md passing on a phone off your Wi-Fi, and three real people using it. Send the link to someone you\'re proud to show. Course shipped.',
  },
  notes: 'Course finale, reviewing all eight chapters. Epilogue for the outline: the Esplanade Brass board the Crescent Coach Lines bus to D.C. the following Thursday.',
};

export default lesson;

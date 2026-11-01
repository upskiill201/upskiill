import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 3. Walkthrough: the browser console. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'The browser\'s secret window',
  summary: 'How did Hazel find "email rate limit exceeded" when the page showed nothing? Every browser has a hidden window where errors go. Ruth calls it "the black box recorder".',
  minutes: 12,
  outcomes: [
    'Open the browser\'s developer tools and the Console',
    'Find and copy a red error message',
    'Know where terminal errors show up too',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Finding the real error',
      steps: [
        { title: '1. Open developer tools', body: 'In Chrome or Edge: press F12, or right-click the page and choose Inspect. On a Mac: Cmd+Option+I. (Firefox and Safari have them too; Safari needs "Show features for web developers" turned on in its settings.)' },
        { title: '2. Click the Console tab', body: 'This is where the page\'s errors and messages go. Errors are shown in red.' },
        { title: '3. Do the thing that breaks', body: 'With the Console open, tap "Send me a link" again. Watch for a new red line.' },
        { title: '4. Copy the whole error', body: 'Right-click the red line and copy it, or select it all. Word for word, including any numbers like (429).' },
        { title: '5. Also check the terminal', body: 'The terminal running npm run dev shows errors from building the app. If the page is blank, look there too.' },
        { title: '6. Paste it with your report', body: 'What I did, what I expected, what happened, plus the exact error. "Explain before changing code."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Errors can contain private details (an email address, a key). Before pasting, glance through it. Swap anything private for [hidden].',
    },
  ],
  apply: {
    scenario: 'Opening the black box recorder.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Finding an error, in order.',
        lines: [
          'Open developer tools (F12)',
          'Click the Console tab',
          'Do the thing that breaks',
          'Copy the new red error exactly',
          'Paste it into a three-line bug report',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The page looks fine but nothing happens when Hazel taps the button. Where does she look first?',
        options: [
          { text: 'The browser Console, for a red error' },
          { text: 'Her email', why: 'Errors from the page go to the Console.' },
          { text: 'Nowhere: if nothing shows, nothing is wrong', why: 'Most errors are invisible on the page itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which key opens developer tools in Chrome on Windows?',
        answers: ['f12'],
        placeholder: 'Key',
      },
      {
        kind: 'sortGroups',
        prompt: 'Where would this error show up?',
        groups: ['Browser Console', 'Terminal (npm run dev)'],
        items: [
          { text: 'An error when you tap a button', group: 0 },
          { text: 'The app fails to build after a code change', group: 1 },
          { text: 'A login request that fails', group: 0 },
          { text: 'A missing package when starting the app', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Hazel is about to paste this error. Which line should she hide first?',
        lines: [
          'POST https://abcd.supabase.co/auth/v1/otp 429',
          'AuthApiError: email rate limit exceeded',
          'email: mrs.castillo@example.com',
        ],
        bug: 2,
        fix: 'email: [hidden]',
        explanation: 'A parent\'s email address doesn\'t need to go into a chat. The error is just as useful without it.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'There are like 40 yellow warnings in the console. Is everything broken?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, fix all 40.', why: 'Warnings are often harmless. Start with the red error.' },
          { text: 'Yellow warnings are often harmless. We\'re looking for the red error that appears when the button breaks.' },
          { text: 'Close the console, it\'s scary.', why: 'It\'s the best clue we have.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Errors are shown in [[1]]. Copy them [[2]] for word.',
        blanks: [['red'], ['word']],
        distractors: ['green', 'roughly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the place to what it\'s for.',
        pairs: [
          ['Console tab', 'The page\'s errors and messages'],
          ['Terminal', 'Errors starting or building the app'],
          ['Your bug report', 'The error, plus did / expected / happened'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel\'s Mac. Which keys open developer tools in Chrome?',
        options: [
          { text: 'Cmd+Q', why: 'That quits the app.' },
          { text: 'Ctrl+Alt+Delete', why: 'That\'s Windows, and not developer tools.' },
          { text: 'Cmd+Option+I' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from lesson 2: after pasting the error, what does Hazel add?',
        options: [
          { text: '"Don\'t change any code yet. Explain what this means."' },
          { text: '"Fix it fast."', why: 'Explain first, fix second.' },
          { text: 'Nothing', why: 'Asking for an explanation first prevents guessing.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Open the Console on any website you use (it\'s safe to look). How many red errors does even a big website have?',
  },
  deepen: {
    title: 'On your computer: open the console',
    summary: 'Run your app (npm run dev) and open it. Press F12 (or Cmd+Option+I on Mac) and click Console. Tap every button in your app and watch for red lines. Copy one error, if you find one, and write a three-line bug report.',
  },
  notes: 'DevTools shortcuts: F12 / Ctrl+Shift+I (Windows/Linux Chrome, Edge), Cmd+Option+I (Mac Chrome). Safari requires enabling web developer features in Settings > Advanced.',
};

export default lesson;

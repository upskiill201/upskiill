import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 3. Walkthrough: deploy to Vercel. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Deploy it',
  summary: 'Wednesday night, kitchen table, Ruth on video call. Hazel connects GitHub to Vercel, adds two settings, presses Deploy. Ninety seconds. Then a blank white page. Here\'s every step, and the step she missed.',
  minutes: 13,
  outcomes: [
    'Import a GitHub repository into Vercel',
    'Add the app\'s settings in Vercel, not in code',
    'Check the live app and read the build log',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From GitHub to a live address',
      steps: [
        { title: '1. Sign up at vercel.com', body: 'Sign up with your GitHub account. The free Hobby plan is for personal, non-commercial projects; check Vercel\'s terms for yours.' },
        { title: '2. Add a new project', body: 'Choose "Import" next to your app\'s GitHub repository. Vercel spots that it\'s a Vite app and fills in the build settings.' },
        { title: '3. Add the settings', body: 'In Environment Variables, add the same two names as .env.local, with the same public values: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Never the secret key.' },
        { title: '4. Deploy', body: 'Press Deploy. Watch the build log. In about a minute you get an address ending in .vercel.app.' },
        { title: '5. Open it and test', body: 'On your phone, off your home Wi-Fi. Run your tests.md checks on the live address.' },
        { title: 'Hazel\'s blank page', body: 'She skipped step 3. Without the settings, the app couldn\'t reach Supabase. She added them, then chose Redeploy (settings only apply to new builds). It loaded.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Stuck? Copy the build log\'s red error into a three-line report, same as Chapter 6. "Explain before changing code."',
    },
  ],
  apply: {
    scenario: 'Wednesday night deploy.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Deploying, in order.',
        lines: [
          'Sign up at vercel.com with GitHub',
          'Import the app\'s repository',
          'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY',
          'Deploy and watch the build log',
          'Open the .vercel.app address on a phone and test',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The live page is blank, but it works on the laptop. Most likely cause?',
        options: [
          { text: 'The settings weren\'t added in Vercel, so it can\'t reach Supabase' },
          { text: 'Vercel is broken', why: 'The build worked. Settings were missing.' },
          { text: 'Phones can\'t show apps', why: 'They can. The app is missing its settings.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Add it to Vercel\'s settings, or never?',
        groups: ['Add to Vercel', 'Never'],
        items: [
          { text: 'VITE_SUPABASE_URL', group: 0 },
          { text: 'VITE_SUPABASE_ANON_KEY', group: 0 },
          { text: 'The Supabase secret key', group: 1 },
          { text: 'Your GitHub password', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'I added the settings but the page is still blank!',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Delete the project.', why: 'It just needs a new build.' },
          { text: 'Settings only apply to new builds. Redeploy, then refresh.' },
          { text: 'Wait a week.', why: 'A redeploy takes a minute.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule for live settings.',
        template: 'Settings go in the host\'s [[1]], with the same [[2]] as .env.local.',
        blanks: [['dashboard', 'settings'], ['names']],
        distractors: ['GitHub', 'passwords'],
      },
      {
        kind: 'findBug',
        prompt: 'The build log. Which line is the real error?',
        lines: [
          'Installing dependencies...',
          'Running "npm run build"',
          'Error: Could not resolve "./src/gigz.js"',
          'Build failed',
        ],
        bug: 2,
        fix: 'A file name typo: gigz.js should be gigs.js. Fix, commit, push.',
        explanation: '"Build failed" is the result; the line before it says why. (A name that works on a laptop can fail on the host if the letters or capitals differ.)',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the free Vercel address end with?',
        answers: ['.vercel.app', 'vercel.app'],
        placeholder: '.....',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Blank live page', 'Add the settings, redeploy'],
          ['Build failed', 'Read the red line in the log'],
          ['Old version showing', 'Check the push reached main'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Is the band fundraiser fine on the free Hobby plan?',
        options: [
          { text: 'Yes, always', why: 'Hobby is for personal, non-commercial use. A fundraiser may not fit.' },
          { text: 'Check Vercel\'s terms; if it\'s commercial use, it needs a paid plan' },
          { text: 'Hosting is never free', why: 'Personal projects can be.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 3: the app is live. What now?',
        options: [
          { text: 'Run the tests.md checks on the live address, on a phone' },
          { text: 'Celebrate, it deployed', why: 'Deployed isn\'t tested.' },
          { text: 'Send the link to everyone first', why: 'Test it before thirty parents do.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who\'s the first person you\'ll send your live link to? What\'s the first thing you\'ll ask them to try?',
  },
  deepen: {
    title: 'On your computer: deploy',
    summary: 'Sign up at vercel.com with GitHub, import your app\'s repository, add your two VITE_ settings, and deploy. Open the address on your phone, off your Wi-Fi. If the page is blank, check the settings and redeploy.',
  },
  notes: 'Vercel (October 2026): import Git repository, framework preset detects Vite, Environment Variables in project settings apply to new deployments (redeploy needed), *.vercel.app address. Hobby plan restricted to non-commercial personal use per Vercel fair use guidelines. Linux build hosts are case-sensitive on file names.',
};

export default lesson;

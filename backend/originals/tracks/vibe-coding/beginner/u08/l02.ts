import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 2. Card deck: what "live" means. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'What "live" means',
  summary: 'Benny asks where the app will "actually be". On a computer Hazel will never see, run by a hosting company, at an address with a padlock. Here\'s the picture before the steps.',
  minutes: 11,
  outcomes: [
    'Explain hosting, building and a web address',
    'Know how pushing to GitHub updates the live app',
    'Know what a custom domain is',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Going live has three pieces:</p><ul><li><strong>Build:</strong> Vite turns your project into a small set of ready files (<code>npm run build</code> makes a <code>dist</code> folder).</li><li><strong>Host:</strong> a hosting service keeps those files on its computers and sends them to anyone who visits. Hazel uses <strong>Vercel</strong>.</li><li><strong>Address:</strong> the host gives you a free address like <code>esplanade-brass.vercel.app</code>, with https (the padlock). You can buy your own name later.</li></ul>',
    },
    {
      kind: 'text',
      html: '<p>The nicest part: connect Vercel to your GitHub repository once, and every time you <strong>push to main</strong>, it builds and puts the new version live by itself. Your git habits now control the live app.</p><p>That\'s also the scary part. A bad push to main is a bad live app. Branches and tests matter more than ever.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The database doesn\'t move. Supabase was always online. Only the pages move from your laptop to the host.',
    },
    {
      kind: 'check',
      question: 'Hazel pushes a fix to main. What happens to the live app?',
      options: ['Nothing until she emails Vercel', 'Vercel builds it and puts the new version live', 'It goes offline'],
      answer: 1,
      explanation: 'Once connected, every push to main redeploys automatically.',
    },
  ],
  apply: {
    scenario: 'Where will the app actually be?',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each piece to its job.',
        pairs: [
          ['npm run build', 'Turns the project into ready files'],
          ['Vercel', 'Hosts the files for everyone'],
          ['esplanade-brass.vercel.app', 'The address people open'],
          ['Supabase', 'The database, already online'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the padlock (https) in the address mean?',
        options: [
          { text: 'The connection between the phone and the site is encrypted' },
          { text: 'The app has no bugs', why: 'It\'s about the connection, not the code.' },
          { text: 'The data is safe from everyone', why: 'Database rules do that. https protects the connection.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Moves to the host, or was already online?',
        groups: ['Moves to the host', 'Already online'],
        items: [
          { text: 'The pages', group: 0 },
          { text: 'The database', group: 1 },
          { text: 'The login service', group: 1 },
          { text: 'The JavaScript for the buttons', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'So if I push my dark mode experiment to main, it goes live?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Yes, so experiments stay on branches. main is what parents see.' },
          { text: 'No, pushing never changes anything.', why: 'With Vercel connected, pushing to main redeploys.' },
          { text: 'Only on weekends.', why: 'Every push to main.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The build command.',
        template: 'npm run [[1]]',
        blanks: [['build']],
        distractors: ['dev', 'live'],
        language: 'bash',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a custom domain?',
        options: [
          { text: 'A free address from Vercel', why: 'That\'s the vercel.app address.' },
          { text: 'Your own name, like esplanadebrass.org, bought from a domain seller' },
          { text: 'A secret address', why: 'It\'s public, just yours.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which folder does npm run build create in a Vite project?',
        answers: ['dist', '/dist', 'dist/'],
        placeholder: 'Folder name',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Benny\'s explanation is wrong?',
        lines: [
          'Vercel hosts the pages.',
          'Pushing to main updates the live app.',
          'The database moves to Vercel too.',
          'We get a free .vercel.app address.',
        ],
        bug: 2,
        fix: 'The database stays on Supabase.',
        explanation: 'Only the pages move. Supabase was online all along.',
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: why do branches matter more once the app is live?',
        options: [
          { text: 'They don\'t', why: 'main is now what everyone sees.' },
          { text: 'Because main goes live on every push, so untested work must stay off it' },
          { text: 'Vercel requires ten branches', why: 'It\'s about keeping main safe.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 7: does https make the database rules unnecessary?',
        options: [
          { text: 'Yes, the padlock protects everything', why: 'It protects the connection only.' },
          { text: 'No: https protects the connection; database rules protect the data' },
          { text: 'Only for phones', why: 'It\'s the same for all devices.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What would you call your app\'s address, if you could choose any name?',
  },
  deepen: {
    title: 'On your computer: build it once',
    summary: 'In your app folder, run npm run build. Check a dist folder appears. Then run npm run preview and open the address it prints: that\'s what the live site will serve.',
  },
  notes: 'Vite: `npm run build` outputs to dist/; `npm run preview` serves the build locally. Vercel (vercel.com): Git integration deploys on every push to the production branch; free *.vercel.app subdomain with HTTPS; custom domains supported.',
};

export default lesson;

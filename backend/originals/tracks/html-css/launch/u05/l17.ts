import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 17 — a bug during the show: stay calm, find the cause, fix, re-upload, re-test. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'A bug at 12:05',
  summary: 'Midnight: "Mensah Beats v2.0 is live!" At 12:05, Ama runs backstage. "The booking form says page not found!" Kofi is on again in fifteen minutes. Choose what he does.',
  minutes: 11,
  outcomes: ['Stay calm and find the cause of a live bug', 'Fix it with the smallest safe change', 'Re-test before saying it\'s fixed'],
  learn: [
    {
      kind: 'story',
      title: 'Page not found',
      beats: [
        { speaker: 'ama', text: 'I sent a booking and got "page not found"!' },
        { speaker: 'kofi', text: 'But I tested it this afternoon!' },
        { speaker: 'miracle', text: 'On your computer. Let\'s look at the live folder.' },
        { speaker: 'narrator', text: 'The form sends to /thanks.html. The file online is called Thanks.html, with a capital T. On his computer, that didn\'t matter. On the server, it does.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Rename the file to thanks.html, upload just that file, send a test booking, then tell Ama it\'s fixed.',
            outcome: 'Fixed in four minutes. The test booking arrives. Kofi walks back on stage on time.',
            best: true,
          },
          {
            text: 'Panic and re-upload the whole site from his phone.',
            outcome: 'The same Thanks.html goes up again. Still broken, and now he\'s late on stage.',
          },
          {
            text: 'Take the whole site down until tomorrow.',
            outcome: 'Everyone who heard the announcement finds nothing at all.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>When something breaks live:</strong> breathe, find the cause (what exactly happens, on which page?), make the smallest safe fix, upload only what changed, and test it on the live site before saying it\'s fixed. If you can\'t fix it quickly, put the backup back. Then add the fix to the changelog.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The form and the file',
      caption: 'The form\'s action must match the file name exactly, capitals included.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  label { display: block; margin-top: 8px; }\n  button { margin-top: 16px; padding: 12px 24px; background-color: #FF9600; color: #14213D; border: none; border-radius: 999px; font-weight: bold; }\n</style>\n<form action="/thanks.html" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name" required>\n  <button type="submit">Send booking</button>\n</form>\n<p>The file online must be called thanks.html, all lowercase.</p>\n',
      challenge: 'What would happen if the file were called Thanks.HTML?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Breathe, find the cause, smallest fix, upload what changed, test live.',
    },
  ],
  apply: {
    scenario: 'A bug at 12:05.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the form work on Kofi\'s computer but not online?',
        options: [
          { text: 'The internet was slow', why: 'It\'s the file name.' },
          { text: 'His computer ignored the capital T; the server treats Thanks.html and thanks.html as different files' },
          { text: 'Forms never work online', why: 'They work when the names match.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the form send to the lowercase file: action "/thanks.html", method "post"',
        starter: '<form action="/Thanks.html" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name" required>\n  <button type="submit">Send booking</button>\n</form>\n',
        solution: '<form action="/thanks.html" method="post">\n  <label for="name">Your name</label>\n  <input id="name" name="name" required>\n  <button type="submit">Send booking</button>\n</form>\n',
        hint: 'Change Thanks to thanks.',
        checks: [
          { message: 'All lowercase', dom: { selector: 'form[action^="/t"]', count: 1 } },
          { message: 'Still a post form', dom: { selector: 'form', attr: 'method', attrValue: 'post' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the fix in order.',
        lines: ['Breathe', 'Find the cause', 'Make the smallest fix', 'Upload only what changed', 'Test it live', 'Tell people it\'s fixed'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Rename, upload one file, test', 'Fixed in four minutes'],
          ['Re-upload everything in a panic', 'Still broken, and late'],
          ['Take the site down', 'Nothing for anyone'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Is it fixed? Can I send my booking again?',
        options: [
          { text: 'Probably, I didn\'t check.', why: 'Test before you say it\'s fixed.' },
          { text: 'Try tomorrow.', why: 'It\'s fixed and tested now.' },
          { text: 'I just sent a test and it worked. Yes, send it again.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the link that will break on many servers.',
        language: 'html',
        lines: ['<a href="gigs.html">Upcoming gigs</a>', '<a href="Book.html">Book Kofi</a>  <!-- file is book.html -->', '<a href="beats.html">All beats</a>'],
        bug: 1,
        explanation: 'Book.html and book.html are different on many servers. Match the file name exactly.',
        fix: '<a href="book.html">Book Kofi</a>',
      },
      {
        kind: 'sortGroups',
        prompt: 'Calm fix, or panic?',
        groups: ['Calm fix', 'Panic'],
        items: [
          { text: 'Find which page and what happens', group: 0 },
          { text: 'Change ten things at once', group: 1 },
          { text: 'Test on the live site', group: 0 },
          { text: 'Say "fixed!" without checking', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Make the [[1]] safe fix, and test it [[2]].',
        blanks: [['smallest'], ['live']],
        distractors: ['biggest', 'tomorrow', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should file names always be, to avoid this bug? (one word, about letters)',
        answers: ['lowercase', 'lower case', 'lower-case'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What if Kofi couldn\'t fix it in time?',
        options: [
          { text: 'Leave it broken and say nothing', why: 'Give people a working way to book.' },
          { text: 'Put the backup back, add an email address for bookings, and fix it calmly after the show' },
          { text: 'Delete the site', why: 'Use the backup.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When something breaks, what do you usually do first? What will you do now?',
    starters: ['I usually...', 'Now I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check every file name on your site: all lowercase, no spaces, and every href, src and action matching exactly.',
  },
  notes: 'Windows and macOS file systems are case-insensitive by default; most Linux web servers are case-sensitive, so a mismatched case 404s only once deployed. The preview sandbox blocks form submission, so the tryIt only shows the form.',
};

export default lesson;

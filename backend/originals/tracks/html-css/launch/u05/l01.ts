import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 1 — opens the final chapter: launch night; check before you launch. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Launch night',
  summary: 'Tonight is the end-of-year show, and tomorrow Kofi leaves for university. He wants to relaunch the whole site as Mensah Beats v2.0 at midnight, live from the stage. "It\'s fine, just upload it," he says. Choose how launch night goes.',
  minutes: 11,
  outcomes: ['Explain why a launch needs a checklist', 'Name the main things to check before going live', 'Plan a calm launch'],
  learn: [
    {
      kind: 'story',
      title: 'The last night',
      beats: [
        { speaker: 'narrator', text: 'Launch night. The end-of-year show at Sound Up Saturdays. Tomorrow morning, a bus to university.' },
        { speaker: 'kofi', text: 'At midnight I\'ll say "the new site is live!" from the stage. I\'ll just upload it before I go on.' },
        { speaker: 'miracle', text: 'Hundreds of people will open it at once. What if the booking form is broken?' },
        { speaker: 'tey', text: 'Every big launch has a checklist. Let\'s build yours.' },
      ],
      choice: {
        prompt: 'How should launch night go?',
        options: [
          {
            text: 'Run a launch checklist this afternoon, fix what it finds, upload early, then announce at midnight.',
            outcome: 'When the crowd opens the site, everything works. Kofi enjoys his show instead of fixing things backstage.',
            best: true,
          },
          {
            text: 'Upload at 11:59 without checking. Fix anything later.',
            outcome: 'A broken link and a form that won\'t send, found by 300 people at once, while Kofi is on stage.',
          },
          {
            text: 'Don\'t launch until it\'s perfect.',
            outcome: 'It\'s never perfect. He leaves for uni and the new site never goes live.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A launch checklist</strong> is everything you\'ve learned, as questions: does every link work, does the form work, does it work on phones, can everyone use it, will it be found, does it share well, is it fast? You check, fix, check again, and only then launch. Not perfect: ready.</p>',
    },
    {
      kind: 'tryIt',
      title: 'The checklist, as a page',
      caption: 'Kofi\'s launch checklist. Each item is a whole chapter you\'ve done.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  h1 { color: #FF9600; }\n</style>\n<h1>Launch checklist</h1>\n<ol>\n  <li>Every link and button works</li>\n  <li>The booking form works, with a fallback email</li>\n  <li>It works on a small phone and a laptop</li>\n  <li>Keyboard, zoom and screen reader checks pass</li>\n  <li>Titles, descriptions and previews are right</li>\n  <li>Images are fast</li>\n</ol>\n',
      challenge: 'Add one more item you think matters for launch night.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Check, fix, check again, then launch. Ready, not perfect.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> the launch checklist, a friendly 404 page, your own web address, a proper footer, a tidy folder with backups, the launch post, fixing a launch-night bug calmly, keeping it alive afterwards, and your own "how I built it" page. The finale: Mensah Beats v2.0, and the whole HTML and CSS track complete.</p>',
    },
  ],
  apply: {
    scenario: 'Launch night.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why run a checklist before a big launch?',
        options: [
          { text: 'Checklists make the site faster', why: 'They catch problems.' },
          { text: 'Launches don\'t need checking', why: 'Hundreds of people arrive at once.' },
          { text: 'Problems found before launch are fixed calmly; problems found by hundreds of visitors aren\'t' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a seventh item to the checklist: "Share preview looks right in a chat"',
        starter: '<ol>\n  <li>Every link and button works</li>\n  <li>The booking form works</li>\n  <li>It works on a small phone</li>\n  <li>Keyboard and zoom checks pass</li>\n  <li>Titles and descriptions are right</li>\n  <li>Images are fast</li>\n\n</ol>\n',
        solution: '<ol>\n  <li>Every link and button works</li>\n  <li>The booking form works</li>\n  <li>It works on a small phone</li>\n  <li>Keyboard and zoom checks pass</li>\n  <li>Titles and descriptions are right</li>\n  <li>Images are fast</li>\n  <li>Share preview looks right in a chat</li>\n</ol>\n',
        hint: '<li>Share preview looks right in a chat</li>',
        checks: [
          { message: 'Seven items', dom: { selector: 'ol li', count: 7 } },
          { message: 'Including the preview', dom: { selector: 'li', text: 'preview' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Checklist, fix, upload early', 'Everything works at midnight'],
          ['Upload at 11:59 unchecked', '300 people find the bugs'],
          ['Wait until perfect', 'Never launches'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter taught you to check it?',
        groups: ['Responsive / layout', 'Forms, access, search'],
        items: [
          { text: 'Works on a small phone', group: 0 },
          { text: 'The form sends or has a fallback', group: 1 },
          { text: 'Nothing scrolls sideways', group: 0 },
          { text: 'Preview card looks right', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can\'t I just check it after the show?',
        options: [
          { text: 'After the show, 300 people will already have opened it. Checking this afternoon means the show is just a show.' },
          { text: 'Yes, nobody will notice.', why: 'Everyone opens it at midnight.' },
          { text: 'Don\'t check at all.', why: 'That\'s how launches go wrong.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the launch plan that\'s most likely to go wrong.',
        lines: ['Check this afternoon, upload at 6pm, announce at midnight.', 'Upload during the show without checking.', 'Upload early and ask Ama to test on her phone.'],
        bug: 1,
        explanation: 'No checking, and no time to fix anything before the crowd arrives.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many checklist items are in this list?',
        code: '<ol>\n  <li>Links work</li>\n  <li>Form works</li>\n  <li>Phones work</li>\n</ol>',
        language: 'html',
        options: [
          { text: 'One', why: 'Count the li elements.' },
          { text: 'Four', why: 'There are three items.' },
          { text: 'Three' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the launch rule.',
        template: 'Check, [[1]], check again, then [[2]].',
        blanks: [['fix'], ['launch']],
        distractors: ['panic', 'delete', 'wait'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version number does the relaunched site get? (e.g. v1.9)',
        answers: ['v2.0', '2.0', 'v2'],
        placeholder: 'A version',
      },
      {
        kind: 'mcq',
        prompt: 'What does "ready, not perfect" mean?',
        options: [
          { text: 'Launch with known big bugs', why: 'Important things must work.' },
          { text: 'Everything important works and has been checked; small improvements can come later' },
          { text: 'Never launch', why: 'Ready means you launch.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What would be on your own launch checklist?',
    starters: ['I\'d check...', 'The thing I\'d worry about most is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own launch checklist for your site: one line per thing that must work before you share it.',
  },
  notes: 'Opens Course 3, Chapter 5 (Launch night), the last chapter of the HTML & CSS track. v2.0 combines every earlier chapter.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 13 — testing a responsive site: device mode, real phones, 320px, zoom, big text. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'How do I know it works?',
  summary: 'Kofi only has his own phone and laptop. How can he be sure the site works on every screen his fans use? Tey gives him a testing routine he can do in ten minutes.',
  minutes: 11,
  outcomes: ['Test a page in the browser\'s device mode', 'Check a page at 320px wide and at 200% zoom', 'Test with real phones and bigger text settings'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Start on a computer. Most browsers\' developer tools have a device or responsive mode: open Inspect, find the phone-and-tablet icon, and drag the page width from narrow to wide. Watch for the moment anything breaks.',
          replies: ['How narrow should I go?'],
        },
        {
          tey: 'Down to 320px. The accessibility guidelines ask that pages work at 320px wide without scrolling sideways. If nothing sticks out there, most phones are covered.',
          replies: ['Is that enough?'],
        },
        {
          tey: 'Two more. Zoom the page to 200% on a laptop: people with low vision do this, and your media queries should kick in as if the screen were smaller. And try Grandma\'s big-text setting on a real phone.',
          replies: ['And real devices?'],
        },
        {
          tey: 'Always finish on real phones: yours, Ama\'s old one, Grandma\'s. Device mode is a good guess; a real thumb on a real screen is the truth. Menus differ between browsers, so check locally where yours keeps device mode.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Your test checklist',
      caption: 'Kofi\'s testing routine, as a page. Make one for your own site.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  li { margin-bottom: 8px; }\n</style>\n<h2>Responsive test</h2>\n<ol>\n  <li>Device mode: drag from 320px to wide</li>\n  <li>Nothing scrolls sideways at 320px</li>\n  <li>Zoom to 200%: still readable</li>\n  <li>Big-text setting on a real phone</li>\n  <li>Real phones: mine, Ama\'s, Grandma\'s</li>\n</ol>\n',
      challenge: 'Add a sixth step: "Turn the phone sideways".',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Device mode down to 320px, 200% zoom, big text, then real phones. Every time you change the layout.',
    },
  ],
  apply: {
    scenario: 'The ten-minute test.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Tey\'s routine in order.',
        lines: ['Drag the width in device mode', 'Check 320px for sideways scrolling', 'Zoom to 200% on a laptop', 'Test on real phones with big text'],
      },
      {
        kind: 'mcq',
        prompt: 'How narrow should a page still work without sideways scrolling?',
        options: [
          { text: '320px' },
          { text: '700px', why: 'That\'s Kofi\'s breakpoint. Pages should work down to 320px.' },
          { text: '1000px', why: 'That\'s a laptop.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a sixth step to the checklist: Turn the phone sideways',
        starter: '<ol>\n  <li>Device mode: drag from 320px to wide</li>\n  <li>Nothing scrolls sideways at 320px</li>\n  <li>Zoom to 200%: still readable</li>\n  <li>Big-text setting on a real phone</li>\n  <li>Real phones: mine, Ama\'s, Grandma\'s</li>\n\n</ol>\n',
        solution: '<ol>\n  <li>Device mode: drag from 320px to wide</li>\n  <li>Nothing scrolls sideways at 320px</li>\n  <li>Zoom to 200%: still readable</li>\n  <li>Big-text setting on a real phone</li>\n  <li>Real phones: mine, Ama\'s, Grandma\'s</li>\n  <li>Turn the phone sideways</li>\n</ol>\n',
        hint: '<li>Turn the phone sideways</li>',
        checks: [
          { message: 'Six steps', dom: { selector: 'li', count: 6 } },
          { message: 'Including sideways', dom: { selector: 'li', text: 'sideways' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the test, or not?',
        groups: ['Test it', 'Not a test'],
        items: [
          { text: '200% zoom on a laptop', group: 0 },
          { text: 'Only looking on my own laptop', group: 1 },
          { text: 'A real, older phone', group: 0 },
          { text: 'Assuming it works because the CSS looks right', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Device mode looks perfect. Do I still need real phones?',
        options: [
          { text: 'Yes: device mode is a good guess, but real screens, thumbs and text settings are the truth.' },
          { text: 'No, device mode is exactly the same.', why: 'It can\'t copy every real phone.' },
          { text: 'Only if a fan complains.', why: 'Test before fans find the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each test to what it catches.',
        pairs: [
          ['320px width', 'Things sticking out sideways'],
          ['200% zoom', 'Layouts that break for low-vision users'],
          ['Big-text setting', 'Text that doesn\'t grow'],
          ['Real old phone', 'Problems device mode misses'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the step that isn\'t really testing.',
        lines: ['Drag device mode from 320px to wide.', 'Look at it once on my own laptop and call it done.', 'Try it on Grandma\'s phone with big text.'],
        bug: 1,
        explanation: 'One screen tells you about one screen. Most visitors use something else.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A laptop 1000px wide, zoomed to 200%. Does @media (min-width: 700px) apply?',
        code: '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }',
        language: 'css',
        options: [
          { text: 'No: at 200% zoom the page is about 500px wide in CSS pixels, so it shows the phone layout' },
          { text: 'Yes, the screen is still 1000px', why: 'Zooming shrinks the CSS width.' },
          { text: 'Only half of it', why: 'A query is either true or false.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s routine.',
        template: 'Test down to [[1]]px, zoom to [[2]]%, then use real phones.',
        blanks: [['320'], ['200']],
        distractors: ['700', '100', '50'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which browser tool lets you drag the page width to test it? (two words: ___ mode)',
        answers: ['device', 'device mode', 'responsive', 'responsive mode'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Whose phones could you borrow to test your site? Which is the oldest?',
    starters: ['I could borrow...', 'The oldest is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Run the full routine on your own site: device mode to 320px, 200% zoom, big text, and two real phones. (Device mode menus vary by browser; check locally.)',
  },
  notes: 'WCAG 2.1/2.2 SC 1.4.10 Reflow: content at 320 CSS px wide without two-dimensional scrolling; SC 1.4.4 Resize Text to 200%. Browser zoom reduces the CSS viewport width, so width media queries respond.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 8 — names for things: link text, alt review, icon-only links with aria-label, the first rule of ARIA. Card deck (text). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Everything needs a name',
  summary: 'Kofi\'s footer has three little round icons: Instagram, TikTok and YouTube. They look clear. To Kwesi, they\'re three links called nothing at all. Tey explains how to give things a name.',
  minutes: 11,
  outcomes: ['Explain that every link, button and image needs an accessible name', 'Give icon-only links a name with aria-label', 'Prefer visible text over ARIA when you can'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Everything you can use needs a name:</strong> the words a screen reader says for it. For a link or button, that\'s its text. For an image, its alt. A link that contains only an icon image with alt="", or no text at all, is announced as just "link".</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Best: visible text.</strong> "Instagram" next to the icon helps everyone, including people who don\'t recognise the icon. If the design really needs icons only, give the link a name with <strong>aria-label</strong>: &lt;a href="..." aria-label="Mensah Beats on Instagram"&gt;.</p>',
    },
    {
      kind: 'check',
      question: 'A link contains only an icon image with alt="". What does a screen reader say?',
      options: ['"Instagram, link"', 'Just "link", or the web address', 'Nothing, it\'s skipped'],
      answer: 1,
      explanation: 'With no text and an empty alt, the link has no name.',
    },
    {
      kind: 'text',
      html: '<p><strong>The first rule of ARIA:</strong> if a normal HTML element or attribute can do the job, use that instead. ARIA attributes only change what screen readers hear, nothing else. Use them sparingly, like aria-label for an icon-only link.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Named icons',
      caption: 'The first link has visible text. The second is icon-only, named with aria-label. Both have a name.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  a { color: #FF9600; display: inline-flex; align-items: center; gap: 8px; margin-right: 16px; }\n  img { width: 32px; height: 32px; border-radius: 50%; }\n</style>\n<footer>\n  <a href="https://example.com/instagram"><img src="cover-1.png" alt="" width="32" height="32">Instagram</a>\n  <a href="https://example.com/youtube" aria-label="Mensah Beats on YouTube"><img src="cover-2.png" alt="" width="32" height="32"></a>\n</footer>\n',
      challenge: 'Delete the aria-label. What would the second link be called now?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Every link, button and image needs a name. Visible text first; aria-label only when you must.',
    },
  ],
  apply: {
    scenario: 'The nameless icons.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an element\'s "name" to a screen reader?',
        options: [
          { text: 'The words it says for it: link text, button text or alt' },
          { text: 'Its id', why: 'ids aren\'t read out.' },
          { text: 'Its class', why: 'Classes are for CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Name the icon-only link: add aria-label="Mensah Beats on Instagram"',
        starter: '<a href="https://example.com/instagram"><img src="cover-1.png" alt="" width="32" height="32"></a>\n',
        solution: '<a href="https://example.com/instagram" aria-label="Mensah Beats on Instagram"><img src="cover-1.png" alt="" width="32" height="32"></a>\n',
        hint: 'aria-label="Mensah Beats on Instagram" on the a tag.',
        checks: [
          { message: 'The link has a name', dom: { selector: 'a', attr: 'aria-label' } },
          { message: 'Saying where it goes', dom: { selector: 'a[aria-label*="Instagram"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Has a name, or nameless?',
        groups: ['Has a name', 'Nameless'],
        items: [
          { text: '<a href="...">Instagram</a>', group: 0 },
          { text: '<a href="..."><img src="ig.png" alt=""></a>', group: 1 },
          { text: '<a href="..." aria-label="YouTube"><img alt=""></a>', group: 0 },
          { text: '<button></button>', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each element to where its name comes from.',
        pairs: [
          ['A text link', 'Its text'],
          ['An image', 'Its alt'],
          ['An icon-only link', 'aria-label'],
          ['A form field', 'Its label'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I add aria-label to every link, to be safe?',
        options: [
          { text: 'No: a text link already has a name. aria-label is only for when there\'s no visible text, and it replaces what\'s visible.' },
          { text: 'Yes, more ARIA is better.', why: 'Unneeded ARIA can confuse.' },
          { text: 'Put aria-label on the body.', why: 'It belongs on the unnamed element.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the button with no name.',
        language: 'html',
        lines: ['<button type="submit">Send booking request</button>', '<button type="submit"><img src="send.png" alt=""></button>', '<a href="#gigs">Gigs</a>'],
        bug: 1,
        explanation: 'Only an image with empty alt: the button is called nothing. Give the image alt="Send", or add text.',
        fix: '<button type="submit"><img src="send.png" alt="Send booking request"></button>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader say for this link?',
        code: '<a href="https://example.com/tiktok" aria-label="Mensah Beats on TikTok"><img src="tiktok.png" alt=""></a>',
        language: 'html',
        options: [
          { text: '"Mensah Beats on TikTok, link"' },
          { text: '"Link"', why: 'aria-label gives it a name.' },
          { text: '"tiktok.png"', why: 'The image alt is empty; the label names the link.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name an icon-only link.',
        language: 'html',
        template: '<a href="https://example.com/youtube" [[1]]="Mensah Beats on [[2]]">...</a>',
        blanks: [['aria-label'], ['YouTube']],
        distractors: ['title', 'alt', 'name'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute gives an icon-only link a name for screen readers? (hyphenated)',
        answers: ['aria-label'],
        placeholder: 'An attribute',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first rule of ARIA?',
        options: [
          { text: 'If normal HTML can do the job, use HTML instead' },
          { text: 'Add ARIA to everything', why: 'Use it sparingly.' },
          { text: 'ARIA makes things look nicer', why: 'It only changes what screen readers hear.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Are there any icon-only links or buttons on your page? What should each be called?',
    starters: ['My... should be called...', 'I\'ll add text...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find every link and button on your page that has no text. Add visible text, or an aria-label if it must stay icon-only.',
  },
  notes: 'Accessible name computation (WAI-ARIA, HTML-AAM). First rule of ARIA use (W3C "Using ARIA"). example.com links stand in for real social profile URLs. Icons are the course\'s cover images for demonstration; real icons would come from the site\'s own image files.',
};

export default lesson;

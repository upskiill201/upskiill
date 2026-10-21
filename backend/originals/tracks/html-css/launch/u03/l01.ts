import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 1 — opens the chapter: a screen reader user's message; accessibility is for everyone; main. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"It reads as link, link, image"',
  summary: 'The organiser forwards a message from Kwesi, a fan who is blind and uses a screen reader: "Love the beats. But your site reads out as link, link, image, image, link. I can\'t tell where anything is." Choose what Kofi does.',
  minutes: 11,
  outcomes: ['Explain who web accessibility is for', 'Describe how a screen reader user experiences a page', 'Mark the main content with main'],
  learn: [
    {
      kind: 'story',
      title: 'Five days to uni',
      beats: [
        { speaker: 'narrator', text: 'Five days to uni. A forwarded message from a fan called Kwesi, who is blind and listens to websites with a screen reader.' },
        { speaker: 'narrator', text: '"Love the beats. But your site reads as link, link, image, image, link. I can\'t tell where the gigs are."' },
        { speaker: 'kofi', text: 'I thought it was finished. It looks finished.' },
        { speaker: 'miracle', text: 'It looks finished. Now let\'s make it work for everyone: people who can\'t see it, people who can\'t use a mouse, people who zoom in. That\'s accessibility.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Fix the real site: clear structure, headings, labels and keyboard access, then test it the ways people actually use it.',
            outcome: 'Kwesi can jump straight to the gigs. So can the keyboard user, the person zoomed to 200%, and Grandma.',
            best: true,
          },
          {
            text: 'Make a separate "accessible version" page.',
            outcome: 'It falls out of date within a week, and disabled fans get a second-class copy.',
          },
          {
            text: 'Do nothing. It\'s only one fan.',
            outcome: 'It isn\'t one fan. Around 1 in 6 people worldwide have a significant disability, and many more have a broken arm, an old phone or bright sunlight.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Accessibility</strong> means everyone can use your site: people who are blind or have low vision, who are deaf, who can\'t use a mouse, who find reading hard, or who get dizzy from motion. You\'ve already done a lot of it: contrast, rem sizes, labels, alt text, reduced motion. This chapter adds <strong>structure</strong>, so people can find their way. First piece: wrap the main content in <strong>main</strong>, so screen reader users can jump straight to it.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A page with a main',
      caption: 'Screen readers can jump straight to the main element, skipping the header.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  header, main { padding: 16px; }\n  header { background-color: #1F2E52; }\n</style>\n<header><strong>Mensah Beats</strong></header>\n<main>\n  <h1>Beats from Accra</h1>\n  <p>New every Friday.</p>\n</main>\n',
      challenge: 'Add a short paragraph inside main about the next gig.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Accessibility = everyone can use it. Wrap the main content in main.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> landmarks, headings, keyboard use, link and image text, a skip link, the page\'s language, how screen readers work, and a testing routine. The climax: Mensah Beats v1.8, a site Kwesi can find his way around.</p>',
    },
  ],
  apply: {
    scenario: 'Kwesi\'s message.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who is web accessibility for?',
        options: [
          { text: 'Everyone, including disabled people and anyone in a tough situation like sunlight or a broken arm' },
          { text: 'Only blind people', why: 'It helps many disabilities and situations.' },
          { text: 'Only older people', why: 'People of every age benefit.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Wrap the main content (the h1 and paragraph) in a main element',
        starter: '<header>Mensah Beats</header>\n<h1>Beats from Accra</h1>\n<p>New every Friday.</p>\n',
        solution: '<header>Mensah Beats</header>\n<main>\n  <h1>Beats from Accra</h1>\n  <p>New every Friday.</p>\n</main>\n',
        hint: '<main> before the h1, </main> after the p.',
        checks: [
          { message: 'A main element', dom: { selector: 'main', count: 1 } },
          { message: 'Holding the heading', dom: { selector: 'main h1', count: 1 } },
          { message: 'The header stays outside', dom: { selector: 'main header', count: 0 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Fix the real site', 'Everyone can find the gigs'],
          ['A separate accessible page', 'Out of date in a week'],
          ['Do nothing', 'Shuts out around 1 in 6 people'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Something you\'ve already done for accessibility, or new this chapter?',
        groups: ['Already done', 'New this chapter'],
        items: [
          { text: 'Contrast that passes 4.5 to 1', group: 0 },
          { text: 'A skip link', group: 1 },
          { text: 'Labels on form fields', group: 0 },
          { text: 'A proper heading outline', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'How does Kwesi use a website if he can\'t see it?',
        options: [
          { text: 'A screen reader reads the page aloud and lets him jump between headings, links and landmarks with the keyboard or gestures.' },
          { text: 'He can\'t.', why: 'Screen readers make it possible, if the page is built well.' },
          { text: 'Someone reads it to him.', why: 'Software does, if the structure is there.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['About 1 in 6 people worldwide have a significant disability.', 'Accessibility only matters for blind people.', 'Good structure helps screen reader users find things.'],
        bug: 1,
        explanation: 'It helps people with many disabilities, and everyone in tough situations.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A screen reader user asks to jump to the main content. Where do they land?',
        code: '<header>Mensah Beats</header>\n<main>\n  <h1>Beats from Accra</h1>\n</main>',
        language: 'html',
        options: [
          { text: 'At the start of main, on "Beats from Accra"' },
          { text: 'On "Mensah Beats" in the header', why: 'The header isn\'t main.' },
          { text: 'Nowhere, there\'s nothing to jump to', why: 'main is a landmark they can jump to.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark the main content.',
        language: 'html',
        template: '<[[1]]>\n  <h1>Beats from Accra</h1>\n</[[2]]>',
        blanks: [['main'], ['main']],
        distractors: ['section', 'body', 'div'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What software reads a web page aloud for blind users? (two words: screen ___)',
        answers: ['reader', 'screen reader'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'How many main elements should a page have?',
        options: [
          { text: 'One' },
          { text: 'One per section', why: 'Only one main per page.' },
          { text: 'As many as you like', why: 'One main, for the main content.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Imagine using your own page without seeing it. Where would you get lost?',
    starters: ['I\'d get lost at...', 'I\'d need...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Wrap your page\'s main content in a single main element. Then try your phone\'s screen reader for one minute (VoiceOver on iPhone, TalkBack on Android; check locally how to turn it on and off first).',
  },
  notes: 'Opens Course 3, Chapter 3 (Everyone can use it). WHO (2023): an estimated 1.3 billion people, about 1 in 6, experience significant disability. Kwesi is a fan in the story (narrator only).',
};

export default lesson;

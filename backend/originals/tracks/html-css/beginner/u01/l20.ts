import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Chapter Challenge: Mensah Beats v0.1, Kofi's first real page, built from his plan. Efua reviews it. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v0.1',
  summary: 'The flyer for Sound Up Saturdays is ready, and Kofi\'s name is on it. Tonight he builds his first real page from his plan, and shows it to Efua, who has never said anything nice about anything.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a complete page from a plan', 'Use the skeleton, headings, paragraphs, strong, comments and lang together', 'Find and fix every bug in a page'],
  learn: [
    {
      kind: 'story',
      title: 'The flyer',
      beats: [
        { speaker: 'narrator', text: 'Friday, 6pm. The organiser sends the flyer. Yellow, loud, and in the middle: LIVE: MENSAH BEATS.' },
        { speaker: 'kofi', text: 'My name is on a flyer. My NAME. Is on a FLYER.' },
        { speaker: 'miracle', text: 'Congratulations. Now the people who see it will look for your website. Build version 0.1 tonight. Your plan, your page.' },
        { speaker: 'narrator', text: 'Kofi opens his sketch: title, About me, Gigs, Book me. Ama sits next to him to supervise.' },
        { speaker: 'tey', text: 'Everything from this chapter, in one page. When it\'s done, Efua gets to see it. Brave.' },
      ],
    },
    {
      kind: 'image',
      url: '/originals/html-css/sound-up-saturdays.png',
      alt: 'A bright yellow flyer: SOUND UP SATURDAYS, LIVE: MENSAH BEATS, Osu, Accra, 8pm, free entry.',
      caption: 'The flyer. Kofi\'s site needs to be ready for everyone who sees it.',
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'Lesson 1', body: 'One line. A heading and nothing else.', code: '<h1>Mensah Beats</h1>', language: 'html' },
        { title: 'Lesson 11', body: 'A real skeleton: a head with a title for the tab, and a body for the page.', code: '<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>', language: 'html' },
        { title: 'Tonight', body: 'A complete page: language, title, sections, paragraphs, and the gig details standing out. Twenty lessons ago you had never written a tag.', code: '<html lang="en">\n...\n  <h1>Mensah Beats</h1>\n  <h2>About me</h2>\n  <p>...</p>\n  <h2>Gigs</h2>\n  <p><strong>...</strong></p>\n...', language: 'html' },
        { title: 'Next chapter', body: 'Lists, line breaks and emphasis, so people actually read to the end. Efua is waiting.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: build Mensah Beats v0.1.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Start from the skeleton. Put it in order.',
        language: 'html',
        lines: ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<title>Mensah Beats</title>', '</head>', '<body>', '</body>', '</html>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 1: give the page its language (English) and its title (Mensah Beats)',
        starter: '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'lang="en" in the html tag. <title>Mensah Beats</title> inside the head.',
        checks: [
          { message: 'The page is in English', dom: { selector: 'html', attr: 'lang', attrValue: 'en' } },
          { message: 'The title is Mensah Beats', dom: { selector: 'head title', text: 'Mensah Beats' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s plan has a title and three sections: About me, Gigs, Book me. Which tags?',
        options: [
          { text: 'Four h1s', why: 'One h1 per page. The sections are h2s.' },
          { text: 'One h1 for the title, and an h2 for each section' },
          { text: 'An h1, an h2, an h3 and an h4', why: 'The three sections are equally important, so they\'re all h2.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: build the sections. Under the h1, add an About me section with a paragraph, then a Gigs section with a paragraph',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<p>I make beats on my phone in Accra.</p>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays, Osu</p>\n',
        hint: 'h2 About me, a p, h2 Gigs, a p.',
        checks: [
          { message: 'An About me section', dom: { selector: 'h2', text: 'About me' } },
          { message: 'A Gigs section', dom: { selector: 'h2', text: 'Gigs' } },
          { message: 'At least two paragraphs', dom: { selector: 'p', min: 2 } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 3: make the gig details stand out.',
        language: 'html',
        template: '<p>[[1]]Saturday, 8pm[[2]] at Sound Up Saturdays</p>',
        blanks: [['<strong>'], ['</strong>']],
        distractors: ['<h1>', '</p>', '<!--'],
      },
      {
        kind: 'findBug',
        prompt: 'Ama spots a bug. Tap the broken line.',
        language: 'html',
        lines: ['<h2>Gigs</h2>', '<p><strong>Saturday, 8pm</strong> at Sound Up Saturdays</p>', '<h2>Book me<h2>', '<p>Message Mensah Beats on Instagram.</p>'],
        bug: 2,
        fix: '<h2>Book me</h2>',
        explanation: 'The closing tag is missing its slash, so the next paragraph turns into a heading too.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter skills are in Kofi\'s v0.1?',
        groups: ['In v0.1', 'Coming in later chapters'],
        items: [
          { text: 'A title for the tab', group: 0 },
          { text: 'Colours from his album art', group: 1 },
          { text: 'Sections with h2 headings', group: 0 },
          { text: 'A play button for his beats', group: 1 },
          { text: 'Comments to label sections', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Hm. It\'s plain. Very plain. But it\'s clear, and nothing is broken. That\'s more than most websites.',
        options: [
          { text: 'Plain? I\'m deleting it.', why: 'Efua just said it\'s clear and works. That\'s high praise from Efua. Colour comes in Chapter 4.' },
          { text: 'Thanks. Colours and pictures are coming. Will you review it again then?' },
          { text: 'You\'re just jealous.', why: 'Efua gave honest, useful feedback. Better to keep her as a reviewer.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.1 to the lesson where you learned it.',
        pairs: [
          ['<h1>Mensah Beats</h1>', 'Your first tag'],
          ['<p>', 'Paragraphs'],
          ['<title>', 'The shape of every page'],
          ['lang="en"', 'Elements and attributes'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this part of v0.1 show?',
        code: '<!-- Book me -->\n<h2>Book me</h2>\n<p>Message <strong>Mensah Beats</strong> on Instagram.</p>',
        language: 'html',
        options: [
          { text: 'Book me, Book me, and the message', why: 'The first Book me is a comment, so it doesn\'t show.' },
          { text: 'Just the paragraph', why: 'The h2 shows too, as a section heading.' },
          { text: 'A Book me heading, then the message with Mensah Beats in bold' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the comment that labels the Book me section',
        language: 'html',
        tiles: ['<!--', 'Book me', '-->'],
        distractors: ['<--', '//'],
      },
      {
        kind: 'writeCode',
        prompt: 'The whole thing: build Mensah Beats v0.1 from the plan. Skeleton, English, title, one h1, About me, Gigs (with strong) and Book me sections',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title></title>\n</head>\n<body>\n  <!-- Title -->\n\n  <!-- About me -->\n\n  <!-- Gigs -->\n\n  <!-- Book me -->\n\n</body>\n</html>\n',
        solution:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <!-- Title -->\n  <h1>Mensah Beats</h1>\n  <!-- About me -->\n  <h2>About me</h2>\n  <p>I make beats on my phone in Accra.</p>\n  <!-- Gigs -->\n  <h2>Gigs</h2>\n  <p><strong>Saturday, 8pm</strong> at Sound Up Saturdays</p>\n  <!-- Book me -->\n  <h2>Book me</h2>\n  <p>Message Mensah Beats on Instagram.</p>\n</body>\n</html>\n',
        hint: 'Under each comment: the h1 first, then for each section an h2 and a p. Put strong around the gig time. Title in the head.',
        checks: [
          { message: 'The title is Mensah Beats', dom: { selector: 'head title', text: 'Mensah Beats' } },
          { message: 'One main heading Mensah Beats', dom: { selector: 'h1', count: 1, text: 'Mensah Beats' } },
          { message: 'Three sections: About me, Gigs and Book me', dom: { selector: 'h2', min: 3 } },
          { message: 'A Book me section', dom: { selector: 'h2', text: 'Book me' } },
          { message: 'A paragraph in each section', dom: { selector: 'p', min: 3 } },
          { message: 'The gig details are strong, inside a paragraph', dom: { selector: 'p strong', min: 1 } },
          { message: 'No heading swallows a paragraph', dom: { selector: 'h1 p, h2 p', count: 0 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You built a real web page from nothing this chapter. What are you proudest of, and what do you want your page to do next?',
    starters: ['I\'m proudest of...', 'Next I want my page to...'],
  },
  deepen: {
    title: 'Your page, v0.1',
    summary: 'Give your own page the same treatment: a title, lang="en", your name as the h1, and two sections with a paragraph each. Keep it in the playground. Chapter 2 adds lists and more.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: Mensah Beats v0.1 shown to Efua, who says something almost nice. Flyer art: frontend/public/originals/html-css/sound-up-saturdays.png (made by Teyro, scratchpad art.cjs). The "site so far" compare is the chapter-end moment from the outline\'s engagement plan.',
};

export default lesson;

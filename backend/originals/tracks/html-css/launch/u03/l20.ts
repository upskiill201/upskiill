import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 20 — Chapter Challenge: Mensah Beats v1.8, a site everyone can use. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.8',
  summary: 'Kwesi has bought a ticket to the end-of-year show, through the site, on his own. He sends Kofi a voice note. Build v1.8 from memory: the version he used.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build an accessible page skeleton', 'Give every control a name', 'Make the site work by keyboard, zoom and screen reader'],
  learn: [
    {
      kind: 'story',
      title: 'On his own',
      beats: [
        { speaker: 'narrator', text: 'Five days to uni. A voice note from Kwesi: "Found the gigs in two seconds. Booked my ticket without asking anyone for help. See you on the 20th."' },
        { speaker: 'kofi', text: 'He booked it himself. That\'s the whole point.' },
        { speaker: 'david', text: 'And I did it one-handed. Skip link, Tab, Enter.' },
        { speaker: 'miracle', text: 'And Grandma at 200%. That\'s a site for everyone.' },
        { speaker: 'tey', text: 'Build v1.8 from memory. Next chapter: helping people find the site on search, and making links look good when shared.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.6 and v1.7', body: 'A booking form, then purposeful motion with a reduced-motion safety net.' },
        { title: 'v1.8 (tonight)', body: 'Landmarks, a clean heading outline, real links and buttons, names for everything, a skip link, lang and titles, boxes that grow, and a testing routine.', code: '<a class="skip-link" href="#main">Skip to main content</a>', language: 'html' },
        { title: 'Next chapter', body: 'Found on search: page titles and descriptions, sharing previews, fast images, and a site map.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.8.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the skeleton. A skip link (class skip-link, href="#main") first, then header with a nav, main with id="main" and an h1 "Mensah Beats", then a footer',
        starter: '\n',
        solution: '<a class="skip-link" href="#main">Skip to main content</a>\n<header><nav><a href="#gigs">Gigs</a></nav></header>\n<main id="main">\n  <h1>Mensah Beats</h1>\n</main>\n<footer><small>v1.8</small></footer>\n',
        hint: 'Skip link, header > nav, main#main > h1, footer.',
        checks: [
          { message: 'A skip link before the header', dom: { selector: 'a.skip-link[href="#main"] ~ header', count: 1 } },
          { message: 'A nav in the header', dom: { selector: 'header nav', count: 1 } },
          { message: 'main with the h1', dom: { selector: 'main#main h1', text: 'Mensah Beats' } },
          { message: 'A footer', dom: { selector: 'footer', count: 1 } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the outline. Fix the headings: one h1, and Beats and Gigs as h2',
        starter: '<main id="main">\n  <h1>Mensah Beats</h1>\n  <h1>Beats</h1>\n  <h3>Gigs</h3>\n</main>\n',
        solution: '<main id="main">\n  <h1>Mensah Beats</h1>\n  <h2>Beats</h2>\n  <h2>Gigs</h2>\n</main>\n',
        hint: 'Beats and Gigs both become h2.',
        checks: [
          { message: 'One h1', dom: { selector: 'h1', count: 1 } },
          { message: 'Two section headings', dom: { selector: 'h2', count: 2 } },
          { message: 'No skipped levels', dom: { selector: 'h3', count: 0 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which test finds it?',
        groups: ['Keyboard test', 'Screen reader test'],
        items: [
          { text: 'A span pretending to be a button', group: 0 },
          { text: 'A link called "click here"', group: 1 },
          { text: 'An invisible focus outline', group: 0 },
          { text: 'An icon link with no name', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: names. Give the image alt "Sunrise in Osu cover: an orange sun rising over the sea" and the icon link aria-label "Mensah Beats on Instagram"',
        starter: '<img src="cover-1.png" width="400" height="400">\n<a href="https://example.com/ig"><img src="cover-2.png" alt="" width="32" height="32"></a>\n',
        solution: '<img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n<a href="https://example.com/ig" aria-label="Mensah Beats on Instagram"><img src="cover-2.png" alt="" width="32" height="32"></a>\n',
        hint: 'alt on the cover, aria-label on the link.',
        checks: [
          { message: 'The cover is described', dom: { selector: 'img[src="cover-1.png"][alt*="Sunrise in Osu"]', count: 1 } },
          { message: 'The icon link has a name', dom: { selector: 'a[aria-label*="Instagram"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Kwesi opens the Gigs page. What does he hear first?',
        code: '<html lang="en">\n<title>Gigs | Mensah Beats</title>',
        language: 'html',
        options: [
          { text: '"Gigs, Mensah Beats", in an English voice' },
          { text: 'The footer', why: 'The title comes first.' },
          { text: 'Nothing', why: 'The title is announced.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would lock David out.',
        language: 'html',
        lines: ['<a href="#book">Book Kofi for your event</a>', '<span class="button">Buy ticket</span>', '<button type="submit">Send booking request</button>'],
        bug: 1,
        explanation: 'A span can\'t be reached or pressed with a keyboard. Use a real link or button.',
        fix: '<a class="button" href="#tickets">Buy ticket</a>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Should Kofi add that one-line accessibility widget now, just in case?',
        options: [
          { text: 'No. The site already works with people\'s own tools, and widgets can get in their way.' },
          { text: 'Yes, to be safe.', why: 'It can make things worse.' },
          { text: 'Add two widgets.', why: 'Even more in the way.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['"link, link, image" with no map', 'Landmarks and headings'],
          ['Nine Tabs every page', 'A skip link'],
          ['Akwaaba mispronounced', 'lang="tw"'],
          ['Zoomed text spilling', 'min-height'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: the language. Give html lang="en" and mark Akwaaba with a span lang="tw"',
        starter: '<!DOCTYPE html>\n<html>\n<head><meta charset="utf-8"><title>Home | Mensah Beats</title></head>\n<body><h1>Akwaaba! Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Home | Mensah Beats</title></head>\n<body><h1><span lang="tw">Akwaaba!</span> Mensah Beats</h1></body>\n</html>\n',
        hint: '<html lang="en"> and <span lang="tw">Akwaaba!</span>',
        checks: [
          { message: 'The page is English', dom: { selector: 'html[lang="en"]', count: 1 } },
          { message: 'The greeting is Twi', dom: { selector: 'span[lang="tw"]', text: 'Akwaaba' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the fifteen-minute check.',
        template: 'Automated tool, [[1]] only, 200% zoom, and a [[2]] minute.',
        blanks: [['keyboard'], ['screen reader']],
        distractors: ['mouse', 'colour', 'loading'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats did Kwesi use to book his ticket? (e.g. v1.7)',
        answers: ['v1.8', '1.8'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Who could use your site now who couldn\'t before this chapter?',
    starters: ['Now... can use it', 'Because I added...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Run the fifteen-minute check on your own site one more time, upload it, and if you can, ask a screen reader user for feedback.',
  },
  notes: 'Chapter 3 finale of Course 3. Next chapter: Found on search (2 days to uni).',
};

export default lesson;

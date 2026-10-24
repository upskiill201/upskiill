import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 20 — Chapter Challenge: Mensah Beats v1.9, ready to be found. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.9',
  summary: 'The wedding planner from Kumasi searches again, and this time Mensah Beats is there, with a clear title and description. She books him for March. Build v1.9 from memory.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Write a search-ready head', 'Add sharing previews and a favicon', 'Make images fast'],
  learn: [
    {
      kind: 'story',
      title: 'Found',
      beats: [
        { speaker: 'narrator', text: 'Two days to uni. The wedding planner searches "beat producer Accra wedding" again. A result: "Mensah Beats | Beat producer in Accra. Highlife-inspired beats... book Kofi for your event."' },
        { speaker: 'narrator', text: 'She books him for a wedding in March. Through the form. With every detail filled in.' },
        { speaker: 'kofi', text: 'A stranger found me. That\'s the whole chapter.' },
        { speaker: 'efua', text: 'And the preview card looked great when she sent it to the bride.' },
        { speaker: 'tey', text: 'Build v1.9 from memory. Next chapter: launch night.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.6 to v1.8', body: 'A booking form, purposeful motion, and a site everyone can use.' },
        { title: 'v1.9 (tonight)', body: 'Specific titles and descriptions, plain words and clear links, preview cards, a favicon, fast images and a sitemap.', code: '<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">', language: 'html' },
        { title: 'Next chapter', body: 'Launch night: putting it all together as Mensah Beats v2.0, a final check, and the big share.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.9.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the search basics. Title "Mensah Beats | Beat producer in Accra" and a meta description',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>index</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Highlife-inspired beats from Accra. Listen free, see gigs, and book Kofi for your event.">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'Change the title; add <meta name="description" content="...">.',
        checks: [
          { message: 'A specific title', dom: { selector: 'title', text: 'Beat producer in Accra' } },
          { message: 'A description', dom: { selector: 'meta[name="description"]', attr: 'content' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the preview card. og:title, og:image (full https:// address) and og:url',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'Three meta tags with property="og:...".',
        checks: [
          { message: 'A preview title', dom: { selector: 'meta[property="og:title"]', attr: 'content' } },
          { message: 'A preview image with a full address', dom: { selector: 'meta[property="og:image"][content^="https://"]', count: 1 } },
          { message: 'A preview address', dom: { selector: 'meta[property="og:url"]', attr: 'content' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the site get found and shared, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'A clear title per page', group: 0 },
          { text: 'Bought reviews', group: 1 },
          { text: 'A link from the venue\'s site', group: 0 },
          { text: 'Hidden keyword lists', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the tab icon. link rel="icon" href="favicon.png" type="image/png"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <link rel="icon" href="favicon.png" type="image/png">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<link rel="icon" href="favicon.png" type="image/png">',
        checks: [
          { message: 'A favicon', dom: { selector: 'link[rel="icon"]', attr: 'href', attrValue: 'favicon.png' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shows in search results if there\'s no meta description?',
        code: '<title>Mensah Beats | Beat producer in Accra</title>',
        language: 'html',
        options: [
          { text: 'Nothing at all', why: 'It picks some text.' },
          { text: 'The og:description always', why: 'Search usually uses page text or the meta description.' },
          { text: 'The title, plus text the search engine picks from the page' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that will slow the page and make it jump.',
        language: 'html',
        lines: ['<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">', '<img src="covers/kente-code-ORIGINAL.png" alt="Kente Code cover">', '<img src="covers/labadi-waves.webp" alt="Labadi Waves cover" width="600" height="600" loading="lazy">'],
        bug: 1,
        explanation: 'A full-size original with no width or height. Resize it, use WebP, and add width, height and loading="lazy".',
        fix: '<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600" loading="lazy">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Now buy the "number 1 on Google" package to finish it off!',
        options: [
          { text: 'Yes, finish strong.', why: 'Guarantees are a red flag.' },
          { text: 'Nobody can guarantee that. The site is clear, fast and honest; now it\'s about time and real links.' },
          { text: 'Buy two packages.', why: 'Still a red flag.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem from this chapter to its fix.',
        pairs: [
          ['Tab says "index"', 'A specific title'],
          ['Grey link in the chat', 'Open Graph tags'],
          ['Slow gallery', 'Resize, WebP, lazy'],
          ['Pages nobody links to', 'Links and a sitemap'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: speed. Give the lower cover width 600, height 600 and loading lazy',
        starter: '<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">\n<p>More beats below.</p>\n<img src="covers/kente-code.webp" alt="Kente Code cover">\n',
        solution: '<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover" width="600" height="600">\n<p>More beats below.</p>\n<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600" loading="lazy">\n',
        hint: 'width="600" height="600" loading="lazy" on the second image.',
        checks: [
          { message: 'The lower cover is lazy', dom: { selector: 'img[src="covers/kente-code.webp"][loading="lazy"]', count: 1 } },
          { message: 'Every image has a size', dom: { selector: 'img[width][height]', count: 2 } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A sitemap entry.',
        language: 'html',
        template: '<url><[[1]]>https://mensahbeats.example.app/[[2]].html</loc></url>',
        blanks: [['loc'], ['gigs', 'book', 'beats']],
        distractors: ['href', 'page2', 'link'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats did the wedding planner find? (e.g. v1.8)',
        answers: ['v1.9', '1.9'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'If a stranger searched for what you do, would they find your site? What\'s still missing?',
    starters: ['They\'d find...', 'I still need...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Finish your site\'s search setup: titles, descriptions, previews, favicon, fast images and a sitemap. Upload it, and check your search console in a week.',
  },
  notes: 'Chapter 4 finale of Course 3. The broken-image file name uses capitals for the bad example on purpose. Next chapter: Launch night (v2.0).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 18 — the learner's own site gets found: head, previews, fast images, sitemap. Steps. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Get your own site found',
  summary: 'Your turn. Four steps to make your own site easy to find, good-looking when shared, and fast, plus a small file that lists all your pages for search engines.',
  minutes: 12,
  outcomes: ['Give every page a title, description and preview tags', 'Make images fast', 'Create a simple sitemap and tell a search console about it'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps for your site',
      steps: [
        { title: '1. Every page\'s head', body: 'A specific title, a one-sentence description, a favicon, and the four og: tags with full addresses.', code: '<title>Projects | Your Name</title>\n<meta name="description" content="Things I\'ve built and made.">\n<link rel="icon" href="favicon.png" type="image/png">', language: 'html' },
        { title: '2. Plain words and clear links', body: 'Headings that say what each section is, link text that says where it goes, and every page linked from another.' },
        { title: '3. Fast images', body: 'Resize to about twice the shown size, compress, WebP if you can, loading="lazy" below the first screen, width and height always.' },
        { title: '4. A sitemap', body: 'A file called sitemap.xml lists every page\'s address. Upload it with your site, then tell a search console where it is (check its current terms).', code: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://yourname.example.app/</loc></url>\n  <url><loc>https://yourname.example.app/projects.html</loc></url>\n</urlset>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A search-ready page like yours',
      caption: 'A complete head for your home page. Swap in your own name, words and addresses.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Your Name | Student and maker</title>\n  <meta name="description" content="I build websites and make things. See my projects and get in touch.">\n  <link rel="icon" href="favicon.png" type="image/png">\n  <meta property="og:title" content="Your Name | Student and maker">\n  <meta property="og:description" content="I build websites and make things.">\n  <meta property="og:image" content="https://yourname.example.app/share.jpg">\n  <meta property="og:url" content="https://yourname.example.app/">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body><main><h1>Your Name</h1><p>Student and maker.</p></main></body>\n</html>\n',
      challenge: 'Replace every "Your Name" and the example addresses with your own.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Head, words and links, fast images, sitemap. Then be patient: new sites take time.',
    },
  ],
  apply: {
    scenario: 'Your own site.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Fill in every page\'s head', 'Use plain words and clear links', 'Make images fast', 'Add a sitemap and tell a search console'],
      },
      {
        kind: 'writeCode',
        prompt: 'Complete your home page head: a meta description and a favicon link (href favicon.png)',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Your Name | Student and maker</title>\n\n</head>\n<body><h1>Your Name</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Your Name | Student and maker</title>\n  <meta name="description" content="I build websites and make things. See my projects and get in touch.">\n  <link rel="icon" href="favicon.png" type="image/png">\n</head>\n<body><h1>Your Name</h1></body>\n</html>\n',
        hint: '<meta name="description" content="..."> and <link rel="icon" href="favicon.png" type="image/png">',
        checks: [
          { message: 'A description', dom: { selector: 'meta[name="description"]', attr: 'content' } },
          { message: 'A favicon', dom: { selector: 'link[rel="icon"]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is sitemap.xml for?',
        options: [
          { text: 'Drawing a map on the page', why: 'It\'s a list for search engines.' },
          { text: 'Making the site faster', why: 'It helps discovery, not speed.' },
          { text: 'Listing every page\'s address so search engines can find them all' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'In each page\'s head, or a separate file?',
        groups: ['In the head', 'Separate file'],
        items: [
          { text: 'The title', group: 0 },
          { text: 'The sitemap', group: 1 },
          { text: 'og:image', group: 0 },
          { text: 'The share image itself', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line in the sitemap that won\'t work.',
        language: 'html',
        lines: ['<url><loc>https://yourname.example.app/</loc></url>', '<url><loc>projects.html</loc></url>', '<url><loc>https://yourname.example.app/contact.html</loc></url>'],
        bug: 1,
        explanation: 'Sitemap addresses must be full addresses, starting with https://.',
        fix: '<url><loc>https://yourname.example.app/projects.html</loc></url>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'How long until your site shows up in search?',
        options: [
          { text: 'It can take days to weeks. The search console will show when pages are indexed.' },
          { text: 'Instantly.', why: 'Crawling and indexing take time.' },
          { text: 'Never, it\'s too small.', why: 'Small sites get indexed too.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to where it goes.',
        pairs: [
          ['<title>', 'Every page\'s head'],
          ['sitemap.xml', 'The top folder of the site'],
          ['favicon.png', 'Uploaded with the site, linked from the head'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many pages does this sitemap list?',
        code: '<urlset>\n  <url><loc>https://yourname.example.app/</loc></url>\n  <url><loc>https://yourname.example.app/projects.html</loc></url>\n  <url><loc>https://yourname.example.app/contact.html</loc></url>\n</urlset>',
        language: 'html',
        options: [
          { text: 'One', why: 'Count the url entries.' },
          { text: 'It depends on the search engine', why: 'It lists three.' },
          { text: 'Three' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'One sitemap entry.',
        language: 'html',
        template: '<[[1]]><loc>https://yourname.example.app/projects.html</[[2]]></url>',
        blanks: [['url'], ['loc']],
        distractors: ['page', 'link', 'href'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the usual file name for a sitemap? (file name)',
        answers: ['sitemap.xml'],
        placeholder: 'A file name',
      },
    ],
  },
  reflect: {
    prompt: 'What would you like people to find when they search for you in a year\'s time?',
    starters: ['I\'d like them to find...', 'So I\'ll...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Run the four steps on your own site, upload a sitemap.xml, and add the site to a search console (check its current terms). Then wait, and check back in a week.',
  },
  notes: 'Sitemaps protocol (sitemaps.org): absolute URLs in loc. Sitemap can be submitted in Google Search Console or referenced from robots.txt. The sitemap is XML, shown with the html code style for highlighting only.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 2 — a vague result vs a specific title and meta description. Before / After. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The search result you\'d click',
  summary: 'A search result is a tiny advert for your page: a title and a short description. Here\'s what Kofi\'s looked like, and what it looks like with a real title and a meta description.',
  minutes: 11,
  outcomes: ['Write a meta description that sums up a page', 'Write titles and descriptions people want to click', 'Keep them honest and specific'],
  learn: [
    {
      kind: 'compare',
      title: 'Vague vs specific',
      before: { label: 'What the search result showed', text: 'index\nmensah-beats.example.app\nMy beats. Beats Gigs Videos Merch Book me Instagram TikTok YouTube...\n\nNo real title, and no description, so the search engine grabbed some text from the page: the nav links. Nobody knows what this is.' },
      after: { label: 'With a title and meta description', text: '<title>Mensah Beats | Beat producer in Accra</title>\n<meta name="description" content="Kofi Mensah makes highlife-inspired beats in Accra. Listen free, see upcoming gigs, and book him for weddings, parties and club nights.">\n\nMensah Beats | Beat producer in Accra\nKofi Mensah makes highlife-inspired beats in Accra. Listen free, see upcoming gigs, and book him...' },
      notes: [
        'The meta description sums up the page in a sentence or two.',
        'Search engines may show it under the title, but sometimes choose other text.',
        'Write it for people: what the page is and why they\'d click.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'A head that sells the page',
      caption: 'The description doesn\'t show on the page itself. It lives in the head for search engines and link previews.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Kofi Mensah makes highlife-inspired beats in Accra. Listen free, see upcoming gigs, and book him for weddings, parties and club nights.">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>(The description is in the head, not here.)</p>\n</body>\n</html>\n',
      challenge: 'Rewrite the description in your own words, in under two sentences.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '<meta name="description" content="..."> in the head: one or two honest sentences about the page.',
    },
  ],
  apply: {
    scenario: 'The search result you\'d click.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a meta description do?',
        options: [
          { text: 'Sums up the page, and may be shown under the title in search results' },
          { text: 'Shows a big heading on the page', why: 'It doesn\'t appear on the page.' },
          { text: 'Guarantees a top ranking', why: 'Nothing guarantees ranking.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a meta description to the head: "Kofi Mensah makes beats in Accra. Listen free and book him for your event."',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Kofi Mensah makes beats in Accra. Listen free and book him for your event.">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta name="description" content="...">',
        checks: [
          { message: 'A meta description', dom: { selector: 'meta[name="description"]', count: 1 } },
          { message: 'With content', dom: { selector: 'meta[name="description"]', attr: 'content' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good description, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: '"Highlife-inspired beats from Accra. Listen free and book Kofi for your event."', group: 0 },
          { text: '"Welcome to my website."', group: 1 },
          { text: '"Upcoming gigs in Accra and Kumasi, with dates, venues and tickets."', group: 0 },
          { text: '"beats beats Accra beats producer best beats"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of a search result to where it comes from.',
        pairs: [
          ['The clickable line', 'Usually the title'],
          ['The text underneath', 'Often the meta description'],
          ['The web address', 'The page\'s URL'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can the description say "The best producer in Ghana"?',
        options: [
          { text: 'Better to say what\'s true and specific: what I make, where, and what people can do on the page.' },
          { text: 'Yes, bigger claims get more clicks.', why: 'Untrue claims break trust.' },
          { text: 'Leave it empty.', why: 'Then the search engine guesses.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken description tag.',
        language: 'html',
        lines: ['<meta charset="utf-8">', '<meta description="Beats from Accra.">', '<title>Mensah Beats | Beat producer in Accra</title>'],
        bug: 1,
        explanation: 'It needs name="description" and content="...".',
        fix: '<meta name="description" content="Beats from Accra.">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where does the description appear on the page itself?',
        code: '<head>\n  <meta name="description" content="Beats from Accra.">\n</head>',
        language: 'html',
        options: [
          { text: 'Nowhere visible: it\'s for search engines and previews' },
          { text: 'At the top of the page', why: 'meta tags in the head aren\'t shown.' },
          { text: 'In the footer', why: 'It isn\'t shown on the page.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the description tag.',
        language: 'html',
        template: '<meta [[1]]="description" [[2]]="Beats from Accra. Book Kofi for your event.">',
        blanks: [['name'], ['content']],
        distractors: ['property', 'value', 'text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which part of the page does the meta description go? (one word)',
        answers: ['head', 'the head', '<head>'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Does every search engine always show your meta description?',
        options: [
          { text: 'No: they may pick other text from the page if they think it fits the search better' },
          { text: 'Yes, always word for word', why: 'They sometimes choose other text.' },
          { text: 'Never', why: 'They often use it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write a one-sentence description of your own site that would make a stranger click.',
    starters: ['My site...', 'Visitors can...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a meta description to every page on your site, one or two honest sentences each.',
  },
  notes: 'Meta descriptions are used for snippets when they fit the query; search engines may generate snippets from page content instead (Google Search Central, "snippets"). No exact length is given because display limits vary.',
};

export default lesson;

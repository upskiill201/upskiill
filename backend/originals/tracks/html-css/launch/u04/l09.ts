import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 9 — a bare shared link vs an Open Graph preview card. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'When someone shares your link',
  summary: 'Efua shares Mensah Beats in her group chat. It shows up as a plain grey address with no picture. Her friend\'s bakery link, right above, shows a big photo and a title. Here\'s the difference, and the tags behind it.',
  minutes: 11,
  outcomes: ['Explain what a link preview is', 'Add Open Graph title, description, image and URL tags', 'Check that the preview matches the page'],
  learn: [
    {
      kind: 'compare',
      title: 'Bare link vs preview card',
      before: { label: 'No preview tags', text: 'mensahbeats.example.app\n\nIn the chat, it\'s just an address. Some apps grab a random bit of text or no image at all. Nobody can tell it\'s a music producer, so nobody taps.' },
      after: { label: 'Open Graph tags', text: '<meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n<meta property="og:description" content="Listen free, see gigs, and book Kofi for your event.">\n<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n<meta property="og:url" content="https://mensahbeats.example.app/">\n\nThe chat shows a card: Kofi\'s cover image, the title and a line of description. It looks like a real music site.' },
      notes: [
        'Open Graph tags tell chat and social apps what to show when your link is shared.',
        'og:image needs a full address, starting with https://.',
        'Many messaging and social apps read them.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'The sharing tags',
      caption: 'These tags live in the head. They don\'t change the page; they change how the link looks when shared.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta name="description" content="Listen free, see gigs, and book Kofi for your event.">\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:description" content="Listen free, see gigs, and book Kofi for your event.">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
      challenge: 'Change og:description to a line Efua\'s friends would want to tap.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'og:title, og:description, og:image (full https:// address) and og:url give your link a proper preview card.',
    },
  ],
  apply: {
    scenario: 'The grey link in the group chat.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are Open Graph tags for?',
        options: [
          { text: 'Ranking higher in search', why: 'They\'re mainly for share previews.' },
          { text: 'Telling chat and social apps what title, text and image to show when the link is shared' },
          { text: 'Showing a picture on the page', why: 'They don\'t change the page itself.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the preview title and image: og:title "Mensah Beats | Beat producer in Accra" and og:image "https://mensahbeats.example.app/share.jpg"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:title" content="Mensah Beats | Beat producer in Accra">\n  <meta property="og:image" content="https://mensahbeats.example.app/share.jpg">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<meta property="og:title" content="..."> and <meta property="og:image" content="https://...">',
        checks: [
          { message: 'A preview title', dom: { selector: 'meta[property="og:title"]', attr: 'content' } },
          { message: 'A preview image', dom: { selector: 'meta[property="og:image"]', attr: 'content' } },
          { message: 'With a full address', dom: { selector: 'meta[property="og:image"][content^="https://"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to what it sets in the preview.',
        pairs: [
          ['og:title', 'The bold heading'],
          ['og:description', 'The line underneath'],
          ['og:image', 'The picture'],
          ['og:url', 'The address it links to'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Uses name=, or property=?',
        groups: ['name="..."', 'property="..."'],
        items: [
          { text: 'description', group: 0 },
          { text: 'og:title', group: 1 },
          { text: 'viewport', group: 0 },
          { text: 'og:image', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Why didn\'t the image show when I put og:image="share.jpg"?',
        options: [
          { text: 'Chats can\'t show images.', why: 'They can, with a full address.' },
          { text: 'Use a bigger file.', why: 'The address is the problem.' },
          { text: 'Apps fetch the image from outside your site, so they need the full address: https://mensahbeats.example.app/share.jpg.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the tag that won\'t show an image.',
        language: 'html',
        lines: ['<meta property="og:title" content="Mensah Beats">', '<meta property="og:image" content="share.jpg">', '<meta property="og:url" content="https://mensahbeats.example.app/">'],
        bug: 1,
        explanation: 'og:image needs a full address starting with https://.',
        fix: '<meta property="og:image" content="https://mensahbeats.example.app/share.jpg">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Does adding Open Graph tags change how the page itself looks?',
        code: '<meta property="og:title" content="Mensah Beats">',
        language: 'html',
        options: [
          { text: 'No: only how the link looks when shared' },
          { text: 'Yes, it adds a heading', why: 'Meta tags aren\'t shown on the page.' },
          { text: 'Yes, it adds an image', why: 'They only affect previews.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the preview tag.',
        language: 'html',
        template: '<meta [[1]]="og:description" [[2]]="Listen free and book Kofi.">',
        blanks: [['property'], ['content']],
        distractors: ['name', 'value', 'og'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the set of og: tags called? (two words: Open ___)',
        answers: ['graph', 'open graph'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should the preview title and description match?',
        options: [
          { text: 'Something more exciting than the page', why: 'Mismatched previews feel like a trick.' },
          { text: 'Nothing in particular', why: 'They should match the page.' },
          { text: 'What the page really is, like its title and description' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Share your own site\'s link to yourself in a chat app. What does the preview look like?',
    starters: ['It shows...', 'I\'d like it to show...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add og:title, og:description, og:image (full address) and og:url to your home page. Upload, then paste the link into a chat to see the preview. Apps may cache old previews for a while.',
  },
  notes: 'Open Graph protocol (ogp.me). Many messaging and social apps read og: tags; exact behaviour and caching vary. og:image must be an absolute URL.',
};

export default lesson;

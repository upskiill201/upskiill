import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Chapter Challenge: Mensah Beats v0.3. Climax: the organiser presses play and replies "Booked." */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v0.3',
  summary: 'The organiser is choosing her headliner tonight. Kofi rebuilds his page so she can tap, look and listen: a jump menu, his photo, his covers, playable beats and a one-tap booking email.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a page with links, pictures and sound', 'Use alt, sizes, credits and kind players', 'Add jump links and booking links'],
  learn: [
    {
      kind: 'story',
      title: 'The headliner',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 6pm. Ten weeks to uni. A message from the organiser: "Deciding my headliner tonight. Two names left. One is you. Send me the link again?"' },
        { speaker: 'kofi', text: 'HEADLINER. Okay. Jump menu. David\'s photo, credited. Covers with captions. Players, no autoplay. Booking email. Go.' },
        { speaker: 'ama', text: 'I\'m testing it. If I can press play in three seconds, you win.' },
        { speaker: 'tey', text: 'Everything from this chapter, on one page. Let\'s build v0.3.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v0.1 (Chapter 1)', body: 'A skeleton, headings and paragraphs.', code: '<h1>Mensah Beats</h1>\n<p>...</p>', language: 'html' },
        { title: 'v0.2 (Chapter 2)', body: 'Built for scanners: lists, a gig card, real quotes, a read more.', code: '<ol>...</ol>\n<dl>...</dl>\n<details>...</details>', language: 'html' },
        { title: 'v0.3 (tonight)', body: 'Connected and alive: links out, jump links in, his photo, his covers and beats you can press play on.', code: '<a href="#beats">...</a>\n<img src="..." alt="...">\n<audio controls src="..."></audio>', language: 'html' },
        { title: 'Next chapter', body: 'CSS. Colours from his album art, fonts, and a page that stops looking like 1996.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: build Mensah Beats v0.3.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the jump menu. A paragraph with links to #beats and #book, and two h2 sections with those ids: My beats and Book me',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<p><a href="#beats">My beats</a> · <a href="#book">Book me</a></p>\n<h2 id="beats">My beats</h2>\n<h2 id="book">Book me</h2>\n',
        hint: 'A p with two # links, then two h2 with matching ids.',
        checks: [
          { message: 'A jump link to #beats', dom: { selector: 'a[href="#beats"]', count: 1 } },
          { message: 'A jump link to #book', dom: { selector: 'a[href="#book"]', count: 1 } },
          { message: 'A My beats section with id beats', dom: { selector: 'h2#beats', count: 1 } },
          { message: 'A Book me section with id book', dom: { selector: 'h2#book', count: 1 } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: Kofi\'s photo. images/kofi.png at 200 by 200 with alt text, and a small credit Photo by David',
        starter: '',
        solution: '<img src="images/kofi.png" alt="Kofi (Mensah Beats) smiling in big headphones" width="200" height="200">\n<p><small>Photo by David</small></p>\n',
        hint: 'img with src, alt, width and height; then p > small.',
        checks: [
          { message: 'Kofi\'s photo', dom: { selector: 'img[src="images/kofi.png"]', count: 1 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'It has a size', dom: { selector: 'img[width][height]', count: 1 } },
          { message: 'David is credited', dom: { selector: 'small', text: 'Photo by David' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 3: which belongs in v0.3?',
        groups: ['In v0.3', 'Leave it out'],
        items: [
          { text: 'Players with controls', group: 0 },
          { text: 'autoplay on Jollof Bounce', group: 1 },
          { text: 'Covers with alt text and captions', group: 0 },
          { text: 'A crowd photo from an image search', group: 1 },
          { text: 'A one-tap booking email', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 4: one release. A figure with cover-2.png (with alt), a figcaption Jollof Bounce, and a player for beat-2.mp3',
        starter: '<h2 id="beats">My beats</h2>\n',
        solution: '<h2 id="beats">My beats</h2>\n<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="150" height="150">\n  <figcaption>Jollof Bounce</figcaption>\n  <audio controls src="beat-2.mp3"></audio>\n</figure>\n',
        hint: 'figure > img, figcaption, audio controls.',
        checks: [
          { message: 'A figure with the cover', dom: { selector: 'figure img[src="cover-2.png"]', count: 1 } },
          { message: 'The cover has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'A caption', dom: { selector: 'figcaption', text: 'Jollof Bounce' } },
          { message: 'A player in the figure', dom: { selector: 'figure audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama spots a bug before the organiser does. Tap it.',
        language: 'html',
        lines: ['<a href="#book">Book me</a>', '<figure>', '  <img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="150" height="150">', '  <audio autoplay src="beat-1.mp3"></audio>', '</figure>'],
        bug: 3,
        fix: '  <audio controls src="beat-1.mp3"></audio>',
        explanation: 'autoplay and no controls: it plays at her, and she can\'t stop it.',
      },
      {
        kind: 'mcq',
        prompt: 'The Book me link should open an email to book@mensahbeats.com. Which href?',
        options: [
          { text: 'book@mensahbeats.com', why: 'Without mailto:, the browser looks for a file with that name.' },
          { text: '#book', why: 'That jumps to the section. Inside the section, the email link needs mailto:.' },
          { text: 'mailto:book@mensahbeats.com' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Make every link open a new tab AND autoplay Jollof Bounce. Trust me. Headliner energy.',
        options: [
          { text: 'Headliner energy is a page she can use in three seconds. Same tab, and she presses play.' },
          { text: 'Okay, both.', why: 'A surprise tab and a surprise beat, between meetings. That\'s how you lose a headline slot.' },
          { text: 'I\'ll remove the players instead.', why: 'The players are the whole point. Just no autoplay.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.3 to the lesson where you learned it.',
        pairs: [
          ['The jump menu', 'Jump to the gigs'],
          ['Photo by David', 'Whose photo is it?'],
          ['The play buttons', 'Press play'],
          ['The booking email', 'Email, call, new tab'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the booking link.',
        language: 'html',
        template: '<a href="[[1]]book@mensahbeats.com">Email book@mensahbeats.com</a>',
        blanks: [['mailto:']],
        distractors: ['tel:', '#', 'https://'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The organiser taps "My beats" in the menu. What happens?',
        code: '<a href="#beats">My beats</a>\n...\n<h2 id="beats">My beats</h2>\n<audio controls src="beat-2.mp3"></audio>',
        language: 'html',
        options: [
          { text: 'The beat starts playing', why: 'The link only jumps. She presses play herself.' },
          { text: 'It jumps to My beats, where she can press play' },
          { text: 'It opens a new tab', why: 'A # link stays on the page, in the same tab.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'The whole thing: Mensah Beats v0.3. Fill in the plan: the jump menu, Kofi\'s photo with credit, two releases (figures with cover, caption and player), and a booking email',
        starter: '<h1>Mensah Beats</h1>\n<!-- jump menu: links to #beats and #book -->\n\n<!-- Kofi\'s photo (images/kofi.png) and a credit to David -->\n\n<h2 id="beats">My beats</h2>\n<!-- two releases: figure + img + figcaption + audio -->\n\n<h2 id="book">Book me</h2>\n<!-- email link to book@mensahbeats.com -->\n\n',
        solution:
          '<h1>Mensah Beats</h1>\n<p><a href="#beats">My beats</a> · <a href="#book">Book me</a></p>\n<img src="images/kofi.png" alt="Kofi (Mensah Beats) smiling in big headphones" width="200" height="200">\n<p><small>Photo by David</small></p>\n<h2 id="beats">My beats</h2>\n<figure>\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="150" height="150">\n  <figcaption>Sunrise in Osu</figcaption>\n  <audio controls src="beat-1.mp3"></audio>\n</figure>\n<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="150" height="150">\n  <figcaption>Jollof Bounce</figcaption>\n  <audio controls src="beat-2.mp3"></audio>\n</figure>\n<h2 id="book">Book me</h2>\n<p><a href="mailto:book@mensahbeats.com">Email book@mensahbeats.com</a></p>\n',
        hint: 'Under each comment, add its part. Every img gets alt, width and height; every audio gets controls.',
        checks: [
          { message: 'Jump links to both sections', dom: { selector: 'a[href="#beats"], a[href="#book"]', count: 2 } },
          { message: 'Kofi\'s photo', dom: { selector: 'img[src="images/kofi.png"]', count: 1 } },
          { message: 'David is credited', dom: { selector: 'small', text: 'David' } },
          { message: 'Every picture has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'Two releases with captions', dom: { selector: 'figure figcaption', min: 2 } },
          { message: 'Two players with play buttons', dom: { selector: 'figure audio[controls]', min: 2 } },
          { message: 'No autoplay anywhere', dom: { selector: 'audio[autoplay]', count: 0 } },
          { message: 'A booking email link', dom: { selector: 'a[href="mailto:book@mensahbeats.com"]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'The organiser replied with one word: "Booked." What would you want someone to reply after visiting your page?',
    starters: ['I\'d want them to say...', 'My page would earn that by...'],
  },
  deepen: {
    title: 'Your page, v0.3',
    summary: 'Give your own page the v0.3 treatment: a jump menu, a picture with good alt, and links to three things you love. Chapter 4 adds colour.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: the organiser presses play and replies "Booked." (in the reflect prompt). "Site so far" uses a neutral steps card.',
};

export default lesson;

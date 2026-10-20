import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — figure and figcaption; a cover picture that's also a link. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Covers with captions',
  summary: 'Kofi wants each beat to look like a release: the cover, a caption with the name and year, and the player underneath. figure groups them, and figcaption gives the cover its label.',
  minutes: 12,
  outcomes: ['Group a picture with its caption using figure and figcaption', 'Put a player in a figure', 'Make a picture into a link'],
  learn: [
    {
      kind: 'steps',
      title: 'A beat, packaged like a release',
      steps: [
        { title: '1. Start with the cover', body: 'A picture with alt text and a size.', code: '<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">', language: 'html' },
        { title: '2. Wrap it in a figure', body: 'figure groups a picture (or a player, or a chart) with things that belong to it. It\'s a box that says "these go together".', code: '<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n</figure>', language: 'html' },
        { title: '3. Add a caption', body: 'figcaption is the label for the whole figure, like the text under a photo in a newspaper. It goes inside the figure, first or last.', code: '<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n  <figcaption>Jollof Bounce (2026)</figcaption>\n</figure>', language: 'html' },
        { title: '4. A cover you can tap', body: 'Put the img inside an a, and the picture becomes a link. Its alt now describes where the link goes.', code: '<a href="https://instagram.com/mensahbeats">\n  <img src="cover-2.png" alt="Jollof Bounce on Instagram" width="200" height="200">\n</a>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A release',
      caption: 'Cover, caption and player in one figure. That\'s how a beat looks on a real artist\'s site.',
      code: '<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n  <figcaption>Jollof Bounce (2026)</figcaption>\n  <audio controls src="beat-2.mp3"></audio>\n</figure>\n',
      challenge: 'Make a second figure for Sunrise in Osu: cover-1.png and beat-1.mp3.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'alt says what the picture shows. figcaption is a caption everyone sees. They don\'t repeat each other: one describes, one labels.',
    },
  ],
  apply: {
    scenario: 'Kofi packages each beat like a release.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['figure', 'Groups a picture with what belongs to it'],
          ['figcaption', 'The caption everyone sees'],
          ['alt', 'Words read out instead of the picture'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Wrap the cover in a figure and add the caption Jollof Bounce (2026)',
        starter: '<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n',
        solution: '<figure>\n  <img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n  <figcaption>Jollof Bounce (2026)</figcaption>\n</figure>\n',
        hint: '<figure>, the img, <figcaption>...</figcaption>, </figure>.',
        checks: [
          { message: 'The cover is inside a figure', dom: { selector: 'figure img', count: 1 } },
          { message: 'A caption inside the figure', dom: { selector: 'figure figcaption', text: 'Jollof Bounce (2026)' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does figcaption go?',
        options: [
          { text: 'Anywhere on the page', why: 'It labels a figure, so it goes inside that figure.' },
          { text: 'Inside the figure, first or last' },
          { text: 'Inside the img', why: 'img is empty: nothing goes inside it.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the release in order.',
        language: 'html',
        lines: ['<figure>', '<img src="cover-3.png" alt="Album cover for Night Bus to Kumasi">', '<figcaption>Night Bus to Kumasi</figcaption>', '<audio controls src="beat-3.mp3"></audio>', '</figure>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the cover a link to https://instagram.com/mensahbeats, with alt text that says where it goes: Jollof Bounce on Instagram',
        starter: '<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n',
        solution: '<a href="https://instagram.com/mensahbeats">\n  <img src="cover-2.png" alt="Jollof Bounce on Instagram" width="200" height="200">\n</a>\n',
        hint: 'Wrap the img in <a href="...">...</a> and change the alt.',
        checks: [
          { message: 'The cover is inside a link', dom: { selector: 'a[href*="instagram.com"] img', count: 1 } },
          { message: 'The alt says where it goes', dom: { selector: 'a img[alt*="Instagram" i]', count: 1 } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Your caption says the same thing as your alt text. Why say it twice?',
        options: [
          { text: 'Good point. The alt describes the picture; the caption labels it with the name and year.' },
          { text: 'To be safe.', why: 'Screen readers would read it twice. Let each one do its own job.' },
          { text: 'I\'ll delete the alt then.', why: 'Keep the alt: it describes what the picture looks like. Change the caption to label it.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Alt text, or caption?',
        groups: ['alt', 'figcaption'],
        items: [
          { text: 'An orange sun rising over the sea', group: 0 },
          { text: 'Sunrise in Osu (2026)', group: 1 },
          { text: 'A red cover with yellow circles', group: 0 },
          { text: 'Photo by David', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the figure.',
        language: 'html',
        template: '<[[1]]>\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu">\n  <[[2]]>Sunrise in Osu</figcaption>\n</figure>',
        blanks: [['figure'], ['figcaption']],
        distractors: ['caption', 'div', 'label'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which tag holds the caption of a figure?',
        answers: ['figcaption', '<figcaption>'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'A full release for Sunrise in Osu: a figure with cover-1.png (with alt), a figcaption Sunrise in Osu (2026), and a player for beat-1.mp3',
        starter: '',
        solution: '<figure>\n  <img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="200" height="200">\n  <figcaption>Sunrise in Osu (2026)</figcaption>\n  <audio controls src="beat-1.mp3"></audio>\n</figure>\n',
        hint: 'figure, then img, figcaption and audio inside it.',
        checks: [
          { message: 'The cover is in a figure', dom: { selector: 'figure img[src="cover-1.png"]', count: 1 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'A caption', dom: { selector: 'figure figcaption', text: 'Sunrise in Osu' } },
          { message: 'A player in the figure', dom: { selector: 'figure audio[controls]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would you package as a "release" on your own page: a photo, a drawing, a project? What would its caption say?',
    starters: ['I\'d show...', 'Its caption would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make all three beats into figures with covers, captions and players. That\'s a whole discography.',
  },
  notes: 'HTML Living Standard §4.4.12 figure ("self-contained content, potentially with an optional caption"), §4.4.13 figcaption (first or last child of figure). Linked images: alt describes the link destination (W3C WAI, "Functional images").',
};

export default lesson;

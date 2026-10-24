import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 16 — myths about links, pictures and sound. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Links and media myths',
  summary: 'Clinton has a lot of opinions about links and pictures, and most of them are wrong. Myth or fact: the things people believe about links, pictures and sound on the web.',
  minutes: 12,
  outcomes: ['Spot common wrong beliefs about links, pictures and sound', 'Explain the right way in each case', 'Fix a page built on the myths'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Every picture needs a long, detailed alt text.', isFact: false, explain: 'Short and meaningful wins: what the picture is and why it\'s there. Decoration gets alt="".' },
        { text: 'A link can wrap a picture, not just words.', isFact: true, explain: 'Put the img inside the a. Then the alt text describes where the link goes.' },
        { text: 'Setting width and height on a big picture makes the file smaller to download.', isFact: false, explain: 'It changes how big it shows, not how big the file is. A huge file is still a huge download. Make the file itself the right size.' },
        { text: 'Links should always open in a new tab so people stay on your site.', isFact: false, explain: 'People expect the same tab, and have a Back button. New tabs only when they really help, and say so.' },
        { text: 'Browsers block most sound that tries to play by itself.', isFact: true, explain: 'Most browsers stop autoplaying sound until the visitor interacts. Another reason to just give people a play button.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page built on myths',
      caption: 'Clinton built this. It has a vague link, a picture with no alt, and autoplay. Fix all three.',
      code: '<p>Beats <a href="https://instagram.com/mensahbeats">here</a></p>\n<img src="cover-1.png" width="150" height="150">\n<audio controls autoplay src="beat-1.mp3"></audio>\n',
      challenge: 'Make the link say Hear my beats on Instagram, add an alt, and remove autoplay.',
    },
  ],
  apply: {
    scenario: 'Kofi busts Clinton\'s myths.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix Clinton\'s page: give the link clear text (Hear my beats on Instagram), give the picture alt text, and remove autoplay',
        starter: '<p>Beats <a href="https://instagram.com/mensahbeats">here</a></p>\n<img src="cover-1.png" width="150" height="150">\n<audio controls autoplay src="beat-1.mp3"></audio>\n',
        solution: '<p><a href="https://instagram.com/mensahbeats">Hear my beats on Instagram</a></p>\n<img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="150" height="150">\n<audio controls src="beat-1.mp3"></audio>\n',
        hint: 'Three fixes: the link text, an alt on the img, and delete autoplay.',
        checks: [
          { message: 'The link says where it goes', dom: { selector: 'a', text: 'Hear my beats on Instagram' } },
          { message: 'The picture has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'No autoplay', dom: { selector: 'audio[autoplay]', count: 0 } },
          { message: 'Still a play button', dom: { selector: 'audio[controls]', count: 1 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s cover file is huge (5,000 pixels wide). He sets width="200". What happens?',
        options: [
          { text: 'It shows small, but visitors still download the huge file' },
          { text: 'The file shrinks automatically', why: 'width changes the display size, not the file. Resize the file itself.' },
          { text: 'It won\'t show', why: 'It shows fine, at 200 wide. It\'s just a slow download.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'A picture can be a link', group: 0 },
          { text: 'Anything in an image search is free to use', group: 1 },
          { text: 'Decorative pictures should have alt=""', group: 0 },
          { text: 'Sound should play as soon as the page opens', group: 1 },
          { text: 'Link text should say where the link goes', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Alt text is only for blind people, so it doesn\'t matter for your fans.',
        options: [
          { text: 'True, I\'ll skip it.', why: 'Some of Kofi\'s fans use screen readers. And alt shows for everyone when a picture fails to load.' },
          { text: 'Some fans use screen readers. And when the network is slow, everyone sees the alt.' },
          { text: 'Alt text is only for search engines.', why: 'It helps search engines too, but people come first.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line built on a myth.',
        language: 'html',
        lines: ['<a href="gigs.html">See all my gigs</a>', '<img src="wave.png" alt="">', '<a href="https://instagram.com/mensahbeats" target="_blank">Instagram</a>'],
        bug: 2,
        fix: '<a href="https://instagram.com/mensahbeats">Mensah Beats on Instagram</a>',
        explanation: 'A surprise new tab with vague text. Same tab and clear text are kinder.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader do with this picture?',
        code: '<img src="wave.png" alt="">',
        language: 'html',
        options: [
          { text: 'Reads out "wave.png"', why: 'With alt="", it skips the picture.' },
          { text: 'Skips it, because it\'s decoration' },
          { text: 'Says "empty"', why: 'It doesn\'t announce it at all.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Longer alt is always better', 'Short and meaningful wins'],
          ['width shrinks the file', 'It only changes the display size'],
          ['Always open a new tab', 'Same tab, unless it really helps'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the linked cover.',
        language: 'html',
        template: '<[[1]] href="https://instagram.com/mensahbeats"><img src="cover-2.png" alt="Jollof Bounce on Instagram"></[[2]]>',
        blanks: [['a'], ['a']],
        distractors: ['img', 'link', 'figure'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What alt value does a purely decorative picture get? (describe it in one word)',
        answers: ['empty', 'nothing', 'blank'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'A decorative wave picture (wave.png) and a cover link: show wave.png with an empty alt, then cover-3.png inside a link to https://instagram.com/mensahbeats with alt Night Bus to Kumasi on Instagram',
        starter: '',
        solution: '<img src="wave.png" alt="">\n<a href="https://instagram.com/mensahbeats"><img src="cover-3.png" alt="Night Bus to Kumasi on Instagram" width="150" height="150"></a>\n',
        hint: 'One img with alt="", then an a wrapping the cover img.',
        checks: [
          { message: 'The wave has an empty alt', dom: { selector: 'img[src="wave.png"][alt=""]', count: 1 } },
          { message: 'The cover is inside a link', dom: { selector: 'a img[src="cover-3.png"]', count: 1 } },
          { message: 'The cover\'s alt says where it goes', dom: { selector: 'a img[alt*="Instagram" i]', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths did you believe before today?',
    starters: ['I used to think...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your playground page against every myth here. Fix anything that was built on one.',
  },
  notes: 'width/height don\'t change transfer size (web.dev, "Serve images with correct dimensions"). Autoplay policies: Chrome, Safari, Firefox block audible autoplay by default. alt="" for decorative images (W3C WAI images tutorial). wave.png doesn\'t exist in the assets: it renders as a broken (empty-alt) image, which is fine for the exercise.',
};

export default lesson;

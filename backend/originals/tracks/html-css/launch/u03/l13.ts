import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 13 — how screen readers work and how people navigate with them; trying one yourself. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Try a screen reader yourself',
  summary: 'Kofi has fixed the structure, but he\'s never actually listened to a website. Tey explains how screen readers work, which ones come free with his devices, and how to try one without getting stuck.',
  minutes: 11,
  outcomes: ['Describe how people move through a page with a screen reader', 'Name the free screen readers on common devices', 'Try a screen reader safely on your own page'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A screen reader turns the page into speech, or braille. People don\'t usually listen top to bottom. They jump: to the next heading, the next landmark, the next link, the next form field. That\'s why structure matters so much.',
          replies: ['Do I need to buy one?'],
        },
        {
          tey: 'Most devices have one built in. iPhones and Macs have VoiceOver. Android phones have TalkBack. Windows has Narrator, and NVDA is a popular free one for Windows. Check locally how to turn yours on.',
          replies: ['What should I try first?'],
        },
        {
          tey: 'Learn how to turn it OFF before you turn it on, because the gestures change while it\'s running. Then open your page and listen to the first minute. Try jumping by headings. Notice anything that sounds confusing.',
          replies: ['Will I hear what Kwesi hears?'],
        },
        {
          tey: 'Roughly. Experienced users go much faster and use shortcuts you won\'t know yet. Your quick test catches the big problems: missing names, a messy heading outline, images with no alt. For anything important, ask real screen reader users, like Kwesi, for feedback.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A page that\'s easy to listen to',
      caption: 'Landmarks, a heading outline, named links and alt text. Try it with a screen reader on your device.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Home | Mensah Beats</title>\n<style> body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; } a { color: #FF9600; } </style></head>\n<body>\n  <header><nav><ul><li><a href="#beats">Beats</a></li><li><a href="#gigs">Gigs</a></li></ul></nav></header>\n  <main id="main">\n    <h1>Mensah Beats</h1>\n    <h2 id="beats">Beats</h2>\n    <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="200" height="200">\n    <h2 id="gigs">Gigs</h2>\n    <p>End-of-year show, Saturday 20 December.</p>\n  </main>\n</body>\n</html>\n',
      challenge: 'Close your eyes and listen with a screen reader. Can you find the gigs?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Learn to turn it off first. Then listen, jump by headings, and note anything confusing.',
    },
  ],
  apply: {
    scenario: 'Trying a screen reader.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How do most screen reader users move through a page?',
        options: [
          { text: 'They jump between headings, landmarks, links and fields' },
          { text: 'They always listen from top to bottom', why: 'They jump, using the structure.' },
          { text: 'They can\'t move around', why: 'They navigate by structure.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each device to its built-in screen reader.',
        pairs: [
          ['iPhone and Mac', 'VoiceOver'],
          ['Android phone', 'TalkBack'],
          ['Windows (built in)', 'Narrator'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page easier to jump around: give the two section headings ids beats and gigs, matching the nav links',
        starter: '<nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav>\n<main>\n  <h2>Beats</h2>\n  <h2>Gigs</h2>\n</main>\n',
        solution: '<nav><a href="#beats">Beats</a> <a href="#gigs">Gigs</a></nav>\n<main>\n  <h2 id="beats">Beats</h2>\n  <h2 id="gigs">Gigs</h2>\n</main>\n',
        hint: '<h2 id="beats"> and <h2 id="gigs">',
        checks: [
          { message: 'Beats can be jumped to', dom: { selector: 'h2#beats', count: 1 } },
          { message: 'Gigs can be jumped to', dom: { selector: 'h2#gigs', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A quick screen reader test catches it, or needs real users?',
        groups: ['Quick test catches it', 'Ask real users'],
        items: [
          { text: 'An image with no alt', group: 0 },
          { text: 'Whether the booking process feels easy at full speed', group: 1 },
          { text: 'A link called "click here"', group: 0 },
          { text: 'Which shortcuts experienced users rely on', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I turned on VoiceOver and now I can\'t unlock my phone!',
        options: [
          { text: 'Throw the phone away.', why: 'It just needs turning off properly.' },
          { text: 'Wait a week.', why: 'Turn it off with the right gesture or shortcut.' },
          { text: 'The gestures change while it\'s on. Look up how to turn it off for your device (often a triple-click shortcut) before trying again.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the thing that will sound confusing to a screen reader user.',
        language: 'html',
        lines: ['<h2 id="gigs">Gigs</h2>', '<img src="poster-final-v3.png">', '<a href="#book">Book Kofi for your event</a>'],
        bug: 1,
        explanation: 'No alt: it may be read as "poster-final-v3 dot png".',
        fix: '<img src="poster-final-v3.png" alt="Poster for the end-of-year show, 20 December">',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A screen reader user jumps to the next heading from the top. Where do they land?',
        code: '<main>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra.</p>\n  <h2>Gigs</h2>\n</main>',
        language: 'html',
        options: [
          { text: 'On the paragraph', why: 'Paragraphs aren\'t headings.' },
          { text: 'On "Mensah Beats", then "Gigs" on the next jump' },
          { text: 'Nowhere', why: 'There are two headings.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s advice.',
        template: 'Learn how to turn it [[1]] first. Then jump by [[2]].',
        blanks: [['off'], ['headings']],
        distractors: ['on', 'colours', 'pictures'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the built-in screen reader on Android called? (one word)',
        answers: ['talkback'],
        placeholder: 'A name',
      },
      {
        kind: 'mcq',
        prompt: 'Who gives the best feedback on how usable your site is with a screen reader?',
        options: [
          { text: 'People who use screen readers every day' },
          { text: 'Only automated tools', why: 'They catch some issues, not the real experience.' },
          { text: 'Nobody can tell', why: 'Regular users can.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Listen to your own page for one minute with a screen reader. What surprised you?',
    starters: ['I was surprised that...', 'I\'ll fix...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find out how to turn your device\'s screen reader on and off (check locally), then listen to your page and jump by headings.',
  },
  notes: 'VoiceOver (Apple), TalkBack (Android), Narrator (Windows built-in), NVDA (free, open source, Windows). Turning-off shortcuts vary by device and settings, hence "check locally".',
};

export default lesson;

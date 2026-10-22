import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: Ama's picture test. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Ama\'s picture test',
  summary: 'Ama invents a game: she closes her eyes, Kofi\'s page is read aloud, and she has to guess every picture. Then she opens her eyes and checks none are broken. Pictures, alt, paths and sizes, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Add pictures with src and alt', 'Fix broken paths', 'Give pictures a size so the page doesn\'t jump'],
  learn: [
    {
      kind: 'story',
      title: 'Eyes closed',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Ama has invented a game called "Guess the Picture". The rules: eyes closed, phone reads the page, guess every picture.' },
        { speaker: 'ama', text: 'Picture one: "Album cover for Sunrise in Osu: an orange sun rising over the sea." EASY. Picture two: "image." That\'s not a picture, that\'s a word.' },
        { speaker: 'kofi', text: 'Picture two is a new one. I forgot the alt.' },
        { speaker: 'ama', text: 'And picture three is broken. I opened one eye.' },
        { speaker: 'tey', text: 'Let\'s win Ama\'s game: every picture described, found and the right size.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: win Ama\'s picture game.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Picture two has no alt. Add alt text: Album cover for Jollof Bounce',
        starter: '<img src="cover-2.png" width="200" height="200">\n',
        solution: '<img src="cover-2.png" alt="Album cover for Jollof Bounce" width="200" height="200">\n',
        hint: 'Add alt="Album cover for Jollof Bounce" inside the tag.',
        checks: [{ message: 'The picture has alt text', dom: { selector: 'img', attr: 'alt' } }],
      },
      {
        kind: 'findBug',
        prompt: 'Picture three is broken. The file is images/cover-3.png. Tap the line.',
        language: 'html',
        lines: ['<img src="images/cover-1.png" alt="Sunrise in Osu cover">', '<img src="images/cover-2.png" alt="Jollof Bounce cover">', '<img src="image/cover-3.png" alt="Night Bus to Kumasi cover">'],
        bug: 2,
        fix: '<img src="images/cover-3.png" alt="Night Bus to Kumasi cover">',
        explanation: 'The folder is images, with an s.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the path so it points at images/cover-3.png',
        starter: '<img src="Images/Cover3.png" alt="Album cover for Night Bus to Kumasi">\n',
        solution: '<img src="images/cover-3.png" alt="Album cover for Night Bus to Kumasi">\n',
        hint: 'All lowercase, and a dash: images/cover-3.png.',
        checks: [{ message: 'The path is images/cover-3.png', dom: { selector: 'img[src="images/cover-3.png"]', count: 1 } }],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which alt would win Ama\'s game?',
        options: [
          { text: 'image', why: 'Ama would say "that\'s a word, not a picture".' },
          { text: 'cover-3.png', why: 'A file name tells a listener nothing.' },
          { text: 'Album cover for Night Bus to Kumasi: a lit road at night' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real alt or empty alt?',
        groups: ['Real alt', 'alt=""'],
        items: [
          { text: 'Kofi\'s photo', group: 0 },
          { text: 'A decorative wavy line', group: 1 },
          { text: 'The gig flyer', group: 0 },
          { text: 'A sparkle shape in the corner', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each attribute to its job.',
        pairs: [
          ['src', 'Where the file is'],
          ['alt', 'What it shows'],
          ['width', 'How wide it shows'],
          ['height', 'How tall it shows'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give every picture a width and height?',
        options: [
          { text: 'So the page doesn\'t jump while pictures load' },
          { text: 'So the picture loads faster', why: 'They don\'t change loading speed. They save the space.' },
          { text: 'It\'s required, or the picture won\'t show', why: 'Pictures show without them, but the page jumps.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why do you write the picture\'s size AND the file already knows its size?',
        options: [
          { text: 'No reason.', why: 'There\'s a very good reason: Ama tapped the wrong thing last lesson.' },
          { text: 'The browser only learns the file\'s size when it arrives. Writing it first saves the space, so nothing jumps.' },
          { text: 'To make it bigger.', why: 'The point is saving space before it loads, not making it bigger.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s photo.',
        language: 'html',
        template: '<img [[1]]="images/kofi.png" [[2]]="Kofi wearing headphones" width="200" height="200">',
        blanks: [['src'], ['alt']],
        distractors: ['href', 'title', 'path'],
      },
      {
        kind: 'writeCode',
        prompt: 'Win the game: show images/kofi.png at 200 by 200, with alt text that describes Kofi',
        starter: '',
        solution: '<img src="images/kofi.png" alt="Kofi (Mensah Beats) smiling in big headphones" width="200" height="200">\n',
        hint: 'img with src, alt, width="200" and height="200".',
        checks: [
          { message: 'Kofi\'s photo from the images folder', dom: { selector: 'img[src="images/kofi.png"]', count: 1 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'It\'s 200 by 200', dom: { selector: 'img[width="200"][height="200"]', count: 1 } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A decorative picture gets alt equal to what? (describe it in words)',
        answers: ['nothing', 'empty', 'an empty string', 'empty quotes', 'blank'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Play Ama\'s game with a page you use. Close your eyes and have the alt text read to you. Would you win?',
    starters: ['I\'d win on...', 'I\'d lose on...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give every picture in your playground page an alt, a width and a height, and check none of the paths are broken.',
  },
  notes: 'Checkpoint 2 of Chapter 3: reviews img (l06), alt text (l07), paths (l08), width/height (l09).',
};

export default lesson;

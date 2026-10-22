import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 16 — accessibility myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Accessibility: myth or fact?',
  summary: 'Clinton\'s uncle runs a shop website and has strong opinions about accessibility. Most of them are wrong. Sort them out.',
  minutes: 11,
  outcomes: ['Separate accessibility myths from facts', 'Explain why accessible sites aren\'t ugly or expensive', 'Know what automated tools can\'t prove'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Accessibility is only for blind people.', isFact: false, explain: 'It helps people with many disabilities: low vision, deafness, motor and cognitive disabilities, and anyone in a tough situation.' },
        { text: 'Accessible sites have to be plain and ugly.', isFact: false, explain: 'Mensah Beats is colourful and lively, and accessible. Good structure and contrast are invisible to most people.' },
        { text: 'It\'s cheapest to build it in from the start.', isFact: true, explain: 'Using the right elements from day one costs almost nothing. Fixing a finished site costs much more.' },
        { text: 'A perfect automated score means the site is fully accessible.', isFact: false, explain: 'Tools catch only some problems. Keyboard, zoom and screen reader tests, and real users, find the rest.' },
        { text: 'Adding ARIA everywhere makes a site more accessible.', isFact: false, explain: 'Unneeded ARIA can make things worse. Use real HTML first; ARIA only to fill gaps.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Lively and accessible',
      caption: 'Colour, a big name, a bold button, and all of it accessible: contrast passes, the link has a name, the structure is clear.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  main { padding: 24px; }\n  h1 { font-family: Georgia, serif; font-size: 3rem; color: #FF9600; margin: 0; }\n  .button { display: inline-block; margin-top: 16px; padding: 12px 20px; background-color: #FFC83D; color: #14213D; border-radius: 8px; }\n  :focus-visible { outline: 3px solid #FFF6E5; outline-offset: 3px; }\n</style>\n<main>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra, made late at night.</p>\n  <a class="button" href="#book">Book Kofi for your event</a>\n</main>\n',
      challenge: 'Find one thing on this page that makes it accessible, and one that makes it lively.',
    },
  ],
  apply: {
    scenario: 'The shop owner\'s opinions.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Accessible sites must be ugly', group: 0 },
          { text: 'Building it in from the start is cheapest', group: 1 },
          { text: 'More ARIA is always better', group: 0 },
          { text: 'Tools catch only some problems', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is it cheaper to build accessibility in from the start?',
        options: [
          { text: 'It isn\'t', why: 'Retrofitting is much more work.' },
          { text: 'Because tools are free', why: 'It\'s about doing it right first time.' },
          { text: 'Choosing the right elements first costs almost nothing; fixing later means rework' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Lively and accessible: give the button a visible keyboard focus outline, :focus-visible with outline 3px solid #FFF6E5',
        starter: '<style>\n  .button { background-color: #FFC83D; color: #14213D; padding: 12px 20px; }\n\n</style>\n<a class="button" href="#book">Book Kofi for your event</a>\n',
        solution: '<style>\n  .button { background-color: #FFC83D; color: #14213D; padding: 12px 20px; }\n  .button:focus-visible { outline: 3px solid #FFF6E5; }\n</style>\n<a class="button" href="#book">Book Kofi for your event</a>\n',
        hint: '.button:focus-visible { outline: 3px solid #FFF6E5; }',
        checks: [
          { message: 'A focus style', codeIncludes: ':focus-visible' },
          { message: 'A visible outline', codeIncludes: 'outline' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Only for blind people"', 'Helps many disabilities and situations'],
          ['"Must be ugly"', 'Mostly invisible to most people'],
          ['"100 score = done"', 'People still need to test'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My uncle says disabled people don\'t shop online.',
        options: [
          { text: 'He\'s right.', why: 'Disabled people shop online like everyone.' },
          { text: 'Lots do, and they leave sites that don\'t work for them. That\'s customers he\'s losing without knowing.' },
          { text: 'It doesn\'t matter.', why: 'It matters to them, and to his shop.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Good contrast helps people in bright sunlight.', 'Captions only help deaf people.', 'Keyboard access helps people with injuries.'],
        bug: 1,
        explanation: 'Captions also help people in noisy places, people watching with the sound off, and people learning a language.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'This button has a perfect automated score. A keyboard user presses Tab to it. What do they see?',
        code: '.button:focus { outline: none; }',
        language: 'css',
        options: [
          { text: 'No sign of where they are: the tool missed a real problem' },
          { text: 'A clear outline', why: 'outline: none removes it.' },
          { text: 'The button turns red', why: 'Nothing shows focus.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Use real [[1]] first. Use [[2]] only to fill gaps.',
        blanks: [['HTML', 'html'], ['ARIA', 'aria']],
        distractors: ['divs', 'CSS', 'images'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "accessible sites must be ugly" a myth or a fact? (one word)',
        answers: ['myth'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'Who benefits from captions on a video?',
        options: [
          { text: 'Only deaf people', why: 'Many others use them too.' },
          { text: 'Deaf people, and anyone watching without sound or in a noisy place' },
          { text: 'Nobody', why: 'Many people rely on them.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these myths have you heard someone say? How would you answer them now?',
    starters: ['I\'ve heard...', 'I\'d say...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "W3C WAI business case for digital accessibility" and read why organisations invest in it.',
  },
  notes: 'Captions benefit people beyond deaf and hard-of-hearing users (W3C WAI). Automated testing coverage is partial. First rule of ARIA, as in lesson 8.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 11 — fonts: font-family, fallback stacks, a fancy font only for headings. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'The curly font problem',
  summary: 'Kofi finds a gorgeous curly script font and sets the whole page in it. It looks like a wedding invitation, and nobody can read the track list. Choose how he uses fonts.',
  minutes: 11,
  outcomes: ['Set a font with font-family', 'Write a fallback list of fonts', 'Keep fancy fonts for headings only'],
  learn: [
    {
      kind: 'story',
      title: 'Wedding invitation',
      beats: [
        { speaker: 'narrator', text: 'Every word on Mensah Beats is now in a swirly script font. The track names loop into each other.' },
        { speaker: 'clinton', text: 'Is that "Jollof Bounce" or "Tallest Bounce"?' },
        { speaker: 'kofi', text: 'But it looks so stylish!' },
        { speaker: 'tey', text: 'It does, in big letters. The question is where a fancy font belongs.' },
      ],
      choice: {
        prompt: 'How should Kofi use his fonts?',
        options: [
          {
            text: 'A clear, plain font for all the reading, and the stylish one only for the big "Mensah Beats" name.',
            outcome: 'The name has personality, the track list is easy to read, and the page still feels like him.',
            best: true,
          },
          {
            text: 'Keep the script font everywhere. Style wins.',
            outcome: 'Fans squint at the track list and give up. Nobody presses play on a song they can\'t read.',
          },
          {
            text: 'Use five different fonts so every section feels different.',
            outcome: 'The page looks like a ransom note. Efua: "It wobbles again."',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Remember font-family from Chapter 4:</strong> a list separated by commas, where the browser uses the first font it has and falls back to the next, ending with a general family like <strong>sans-serif</strong> or <strong>serif</strong>. The new question is where each font goes: one plain font for reading, and at most one special font for the name and headings.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Plain for reading, special for the name',
      caption: 'The body uses a plain font list. Only the h1 gets the fancy one, with a fallback.',
      code: '<style>\n  body { font-family: Verdana, sans-serif; }\n  h1 { font-family: Georgia, serif; }\n</style>\n<h1>Mensah Beats</h1>\n<ul><li>Sunrise in Osu</li><li>Jollof Bounce</li></ul>\n',
      challenge: 'Change the h1\'s font-family to cursive. Readable as a big name? Now try it on the list.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One plain font for reading, at most one special font for headings. Always end the list with a general family.',
    },
  ],
  apply: {
    scenario: 'The curly font.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does a fancy script font belong?',
        options: [
          { text: 'Every paragraph', why: 'Long text in script is hard to read.' },
          { text: 'Big headings, like the name at the top' },
          { text: 'Small print', why: 'Hardest place of all to read it.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the page body the font list Verdana, sans-serif',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        solution: '<style>\n  body { font-family: Verdana, sans-serif; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        hint: 'body { font-family: Verdana, sans-serif; }',
        checks: [
          { message: 'Body uses Verdana, then sans-serif', dom: { selector: 'body', style: 'font-family', styleValue: 'Verdana, sans-serif' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Plain for reading, fancy for the name', 'Readable and still his style'],
          ['Script font everywhere', 'Nobody can read the tracks'],
          ['Five different fonts', 'Looks like a ransom note'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The device doesn\'t have Georgia. What font does the h1 use?',
        code: 'h1 { font-family: Georgia, serif; }',
        language: 'css',
        options: [
          { text: 'No font, the text disappears', why: 'It falls back to the next in the list.' },
          { text: 'Georgia anyway', why: 'It can\'t use a font it doesn\'t have.' },
          { text: 'The device\'s own serif font' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for long reading, or only for big headings?',
        groups: ['Long reading', 'Big headings only'],
        items: [
          { text: 'Verdana, sans-serif', group: 0 },
          { text: 'A swirly script font', group: 1 },
          { text: 'Georgia, serif', group: 0 },
          { text: 'A heavy decorative font', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the font list with no fallback.',
        language: 'css',
        lines: ['body { font-family: Verdana, sans-serif; }', 'h1 { font-family: FancyScript; }', 'small { font-family: Verdana, sans-serif; }'],
        bug: 1,
        explanation: 'If a device doesn\'t have FancyScript, there\'s nothing planned. End the list with a general family.',
        fix: 'h1 { font-family: FancyScript, cursive; }',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'How many fonts is too many?',
        options: [
          { text: 'More than two. One for reading, maybe one special one for the name and headings.' },
          { text: 'There\'s no limit.', why: 'Five fonts looked like a ransom note.' },
          { text: 'One per section.', why: 'That\'s how the page started wobbling.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the font list.',
        language: 'css',
        template: 'body { [[1]]: Verdana, [[2]]; }',
        blanks: [['font-family'], ['sans-serif']],
        distractors: ['font-size', 'font', 'Verdana'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which CSS property sets the font? (hyphenated)',
        answers: ['font-family'],
        placeholder: 'A property',
      },
      {
        kind: 'writeCode',
        prompt: 'Give only the h1 the font list Georgia, serif',
        starter: '<style>\n  body { font-family: Verdana, sans-serif; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        solution: '<style>\n  body { font-family: Verdana, sans-serif; }\n  h1 { font-family: Georgia, serif; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New every Friday.</p>\n',
        hint: 'Add h1 { font-family: Georgia, serif; }',
        checks: [
          { message: 'h1 uses Georgia, then serif', dom: { selector: 'h1', style: 'font-family', styleValue: 'Georgia, serif' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your favourite poster or album cover. How many fonts does it use, and where?',
    starters: ['It uses...', 'The fancy one is only...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Free font libraries, like Google Fonts, give you a <link> line to paste into your page\'s head. Browse one and notice how most fonts are made for reading, and only a few for headings.',
  },
  notes: 'font-family fallback lists and generic families (serif, sans-serif, cursive, monospace) per MDN. Web fonts mentioned only, not taught; check a library\'s licence before using a font.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 6 — choosing breakpoints by the content, not by device names. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Where should it break?',
  summary: 'Kofi finds a list online: "iPhone width, iPad width, laptop width". He\'s about to add a media query for each. Tey suggests a better way to decide where a layout should change.',
  minutes: 11,
  outcomes: ['Choose breakpoints where the content starts to look wrong', 'Explain why device-name breakpoints go out of date', 'Keep the number of breakpoints small'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'There are thousands of screen sizes, and new phones every year. If you aim at one device\'s width, the next model breaks your plan.',
          replies: ['So how do I choose?'],
        },
        {
          tey: 'Let the content tell you. Start with the phone layout and slowly make the preview wider. When it starts to look stretched or empty, like lines too long to read or a lonely column, that\'s a breakpoint.',
          replies: ['How many should I have?'],
        },
        {
          tey: 'As few as the content needs. Many sites manage with one or two. Each extra breakpoint is another layout to test.',
          replies: ['And what about lines that are too long?'],
        },
        {
          tey: 'Text is easiest to read at roughly 45 to 75 characters a line. A max-width on your column, like the 640px from Chapter 1, stops lines getting too long on huge screens, without another media query.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Find the breakpoint',
      caption: 'Widen the preview slowly. Where does the single column of text start to feel too wide? That\'s where a layout change belongs.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  main { padding: 16px; }\n  @media (min-width: 760px) {\n    main { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }\n  }\n</style>\n<main>\n  <section><h2>About Kofi</h2><p>Kofi Mensah makes beats in Accra, mostly late at night on a phone. His music mixes highlife guitar loops with heavy drums, and he plays Sound Up Saturdays every month.</p></section>\n  <aside><h2>Next gig</h2><p>Sound Up Saturdays, 25 Oct.</p></aside>\n</main>\n',
      challenge: 'Try 600px instead of 760px. Is the two-column version comfortable that early?',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Breakpoints go where the content needs them, not where a device happens to be. Fewer is better.',
    },
  ],
  apply: {
    scenario: 'Where should it break?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are breakpoints named after devices a bad plan?',
        options: [
          { text: 'Media queries can\'t use device widths', why: 'They can. The widths keep changing.' },
          { text: 'There are thousands of sizes and new devices every year, so the list goes out of date' },
          { text: 'Phones don\'t have widths', why: 'They do; they just vary.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the way to find a breakpoint in order.',
        lines: ['Build the phone layout first', 'Slowly widen the preview', 'Notice where it starts to look wrong', 'Add a min-width query there'],
      },
      {
        kind: 'writeCode',
        prompt: 'The text looks too stretched past 760px. Add a query there: from 760px, main becomes a grid with columns 2fr 1fr',
        starter: '<style>\n  main { padding: 16px; }\n\n</style>\n<main><section>About Kofi</section><aside>Next gig</aside></main>\n',
        solution: '<style>\n  main { padding: 16px; }\n  @media (min-width: 760px) {\n    main { display: grid; grid-template-columns: 2fr 1fr; }\n  }\n</style>\n<main><section>About Kofi</section><aside>Next gig</aside></main>\n',
        hint: '@media (min-width: 760px) { main { display: grid; grid-template-columns: 2fr 1fr; } }',
        checks: [
          { message: 'A query at 760px', codeIncludes: '760px' },
          { message: 'For wider screens', codeIncludes: 'min-width' },
          { message: 'Two columns', codeIncludes: '2fr 1fr' },
          { message: 'Padding kept for phones', dom: { selector: 'main', style: 'padding-top', styleValue: '16px' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good reason for a breakpoint, or not?',
        groups: ['Good reason', 'Not a good reason'],
        items: [
          { text: 'The text lines get too long to read', group: 0 },
          { text: 'A new phone model just came out', group: 1 },
          { text: 'The cards look lonely in one wide column', group: 0 },
          { text: 'A list online said so', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I\'ve got seven breakpoints now. Is that good?',
        options: [
          { text: 'Probably too many. Each one is another layout to test. Keep only the ones the content really needs.' },
          { text: 'Yes, more is better.', why: 'More breakpoints, more to test and maintain.' },
          { text: 'You need at least ten.', why: 'Many sites manage with one or two.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each problem to the fix.',
        pairs: [
          ['Lines too long on huge screens', 'max-width on the column'],
          ['One column looks empty on a laptop', 'A min-width breakpoint'],
          ['Too many layouts to test', 'Fewer breakpoints'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the breakpoint chosen the wrong way.',
        lines: ['Added at 760px, where the text looked stretched.', 'Added at 393px, because that\'s one particular phone model.', 'Added at 1100px, where the gallery looked sparse.'],
        bug: 1,
        explanation: 'That targets one device. The next model will be a different width.',
      },
      {
        kind: 'mcq',
        prompt: 'About how many characters per line are easiest to read?',
        options: [
          { text: '10 to 20', why: 'That\'s very short and choppy.' },
          { text: 'Roughly 45 to 75' },
          { text: '200 or more', why: 'Very long lines are hard to follow.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Stop lines getting too long without a media query.',
        language: 'css',
        template: 'main { [[1]]: 640px; margin: 0 [[2]]; }',
        blanks: [['max-width'], ['auto']],
        distractors: ['width', 'center', '640px'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What should decide where your breakpoints go: the devices or the content? (one word)',
        answers: ['content', 'the content'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Widen your own page slowly. Where does it first start to look wrong?',
    starters: ['At about...', 'It looks wrong because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find your page\'s real breakpoint by widening the preview slowly, and move your media query there.',
  },
  notes: 'Content-based breakpoints are standard responsive guidance. 45–75 characters per line is a common typographic guideline (Bringhurst). The 393px example is illustrative of a single device width.',
};

export default lesson;

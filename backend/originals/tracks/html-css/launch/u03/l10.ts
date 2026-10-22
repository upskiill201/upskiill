import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 (keyboard, WCAG history, names and aria-label, min-height). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: David, Kwesi, Grandma',
  summary: 'David gets through the whole site with only a keyboard. Kwesi hears "Mensah Beats on Instagram, link". Grandma zooms to 200% and nothing spills. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Make everything reachable by keyboard', 'Give every control a name', 'Let text boxes grow'],
  learn: [
    {
      kind: 'story',
      title: 'Three tests, three passes',
      beats: [
        { speaker: 'david', text: 'Tab, Tab, Enter. I booked a fake gig with one hand. Nice.' },
        { speaker: 'narrator', text: 'Kwesi messages: "Your footer icons have names now. Instagram, YouTube, TikTok."' },
        { speaker: 'tey', text: 'And Grandma\'s zoomed cards grow instead of spilling. Check it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: reachable, named, flexible.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the fake button: change the span to a real link with href="#play", keeping the class listen',
        starter: '<span class="listen">Listen to Rain on Zinc</span>\n',
        solution: '<a class="listen" href="#play">Listen to Rain on Zinc</a>\n',
        hint: '<a class="listen" href="#play">...</a>',
        checks: [
          { message: 'A real link', dom: { selector: 'a.listen[href]', count: 1 } },
          { message: 'No span left', dom: { selector: 'span', count: 0 } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does a screen reader call this link?',
        code: '<a href="https://example.com/youtube"><img src="yt.png" alt=""></a>',
        language: 'html',
        options: [
          { text: '"YouTube"', why: 'There\'s no text, no alt and no aria-label.' },
          { text: '"Image"', why: 'The image is marked as decoration.' },
          { text: 'Nothing useful: it has no name' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reachable with the keyboard, or not?',
        groups: ['Reachable', 'Not reachable'],
        items: [
          { text: '<a href="#gigs">Gigs</a>', group: 0 },
          { text: '<span class="button">Play</span>', group: 1 },
          { text: '<button type="submit">Send</button>', group: 0 },
          { text: '<a>Play</a> with no href', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that will cut off zoomed text.',
        language: 'css',
        lines: ['.gig-card { min-height: 120px; }', '.bio { height: 60px; overflow: hidden; }', '.card { padding: 16px; }'],
        bug: 1,
        explanation: 'A fixed height plus overflow hidden: zoomed text disappears. Use min-height.',
        fix: '.bio { min-height: 60px; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['WAI starts', '1997'],
          ['WCAG 1.0', '1999'],
          ['WCAG 2.2', '2023'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Should I put tabindex="1" on Book me so it comes first?',
        options: [
          { text: 'Yes.', why: 'It confuses keyboard users.' },
          { text: 'No: move Book me earlier in the HTML. Positive tabindex scrambles the order.' },
          { text: 'Use tabindex="-5".', why: 'Negative removes it from Tab altogether.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When should you use aria-label?',
        options: [
          { text: 'On every element', why: 'Only where a name is missing.' },
          { text: 'Instead of labels on form fields', why: 'Use a real label for fields.' },
          { text: 'When something has no visible text, like an icon-only link' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Name an icon-only link.',
        language: 'html',
        template: '<a href="https://example.com/instagram" [[1]]="Mensah Beats on [[2]]"><img src="ig.png" alt=""></a>',
        blanks: [['aria-label'], ['Instagram']],
        distractors: ['alt', 'title', 'class'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which key presses a button or ticks a checkbox? (one word)',
        answers: ['space', 'spacebar', 'space bar'],
        placeholder: 'A key',
      },
      {
        kind: 'writeCode',
        prompt: 'Let the bio grow: change height: 60px to min-height: 60px and remove overflow: hidden',
        starter: '<style>\n  .bio { height: 60px; overflow: hidden; }\n</style>\n<p class="bio">Kofi Mensah makes beats in Accra, mostly late at night on a phone.</p>\n',
        solution: '<style>\n  .bio { min-height: 60px; }\n</style>\n<p class="bio">Kofi Mensah makes beats in Accra, mostly late at night on a phone.</p>\n',
        hint: '.bio { min-height: 60px; }',
        checks: [
          { message: 'A minimum height', dom: { selector: '.bio', style: 'min-height', styleValue: '60px' } },
          { message: 'Uses min-height', codeIncludes: 'min-height' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Run three tests on your page: keyboard only, a screen reader minute, and 200% zoom. Which failed?',
    starters: ['The keyboard test...', 'At 200% zoom...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Fix whatever your three tests found: fake buttons, nameless icons, fixed heights.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09. david is Kofi\'s friend from Course 1 (cast).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9 — lists inside lists: a nested list goes inside an li. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Lists inside lists',
  summary: 'Kofi\'s genre list needs sub-lists: which beats are afrobeats, which are amapiano. A list can live inside another list, as long as it sits inside an item, not between them.',
  minutes: 12,
  outcomes: ['Put a list inside a list item', 'Spot a nested list in the wrong place', 'Build a two-level list'],
  learn: [
    {
      kind: 'compare',
      title: 'Where the inner list goes',
      before: { label: 'Wrong place', text: '<ul>\n  <li>Afrobeats</li>\n  <ul>\n    <li>Jollof Bounce</li>\n  </ul>\n</ul>\n\nThe inner ul sits BETWEEN items, directly inside the outer ul. Only li is allowed there, so screen readers get confused about which genre Jollof Bounce belongs to.' },
      after: { label: 'Right place', text: '<ul>\n  <li>Afrobeats\n    <ul>\n      <li>Jollof Bounce</li>\n    </ul>\n  </li>\n</ul>\n\nThe inner ul is INSIDE the Afrobeats li, before its </li>. Now Jollof Bounce clearly belongs to Afrobeats.' },
      notes: [
        'A nested list goes inside an li, after that item\'s text.',
        'The li closes AFTER its inner list: </ul> then </li>.',
        'Indenting the code doesn\'t change the page, but it makes the levels easy to see.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Genres and their beats',
      caption: 'Two levels: genres on the outside, beats on the inside. The browser indents the inner list and changes its bullet.',
      code: '<ul>\n  <li>Afrobeats\n    <ul>\n      <li>Jollof Bounce</li>\n    </ul>\n  </li>\n  <li>Amapiano\n    <ul>\n      <li>Sunrise in Osu</li>\n    </ul>\n  </li>\n</ul>\n',
      challenge: 'Add Night Bus to Kumasi under Amapiano.',
    },
  ],
  apply: {
    scenario: 'Kofi organises his beats by genre.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where does a nested list go?',
        options: [
          { text: 'Between two li elements', why: 'Only li can go directly inside a list. The inner list goes inside an li.' },
          { text: 'Inside an li, after its text' },
          { text: 'After the outer </ul>', why: 'Then it\'s not nested at all, just a second list.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Put Jollof Bounce in a list inside the Afrobeats item',
        starter: '<ul>\n  <li>Afrobeats</li>\n  <li>Amapiano</li>\n</ul>\n',
        solution: '<ul>\n  <li>Afrobeats\n    <ul>\n      <li>Jollof Bounce</li>\n    </ul>\n  </li>\n  <li>Amapiano</li>\n</ul>\n',
        hint: 'Move </li> after Afrobeats down, and put <ul><li>Jollof Bounce</li></ul> before it.',
        checks: [
          { message: 'A list inside a list item', dom: { selector: 'li > ul > li', min: 1 } },
          { message: 'Jollof Bounce is in the inner list', dom: { selector: 'li li', text: 'Jollof Bounce' } },
          { message: 'Still two genres on the outside', dom: { selector: 'body > ul > li', count: 2 } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line where the inner list is in the wrong place.',
        language: 'html',
        lines: ['<ul>', '  <li>Amapiano</li>', '  <ul><li>Sunrise in Osu</li></ul>', '</ul>'],
        bug: 2,
        fix: 'Move it inside the Amapiano li, before </li>.',
        explanation: 'The inner ul sits directly in the outer ul, between items. It belongs inside the Amapiano li.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the nested list in order.',
        language: 'html',
        lines: ['<ul>', '<li>Highlife', '<ul>', '<li>Night Bus to Kumasi</li>', '</ul>', '</li>', '</ul>'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many bullets are on the outside (first level)?',
        code: '<ul>\n  <li>Afrobeats\n    <ul><li>Jollof Bounce</li><li>Lagos Run</li></ul>\n  </li>\n  <li>Drill</li>\n</ul>',
        language: 'html',
        options: [
          { text: 'Four', why: 'Two of them are inside Afrobeats, on the second level.' },
          { text: 'Three', why: 'Count only the li directly in the outer ul: Afrobeats and Drill.' },
          { text: 'Two' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your nested list looks fine on your phone. Why should you care where the inner ul goes?',
        options: [
          { text: 'I shouldn\'t, it looks fine.', why: 'Looks aren\'t everything: screen readers and other browsers rely on the structure.' },
          { text: 'Because screen readers and other browsers read the structure, not just the looks.' },
          { text: 'Because it makes the page load faster.', why: 'Speed isn\'t the reason. Correct structure is how everyone understands the list.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Close the nested list in the right order.',
        language: 'html',
        template: '<li>Drill\n  <ul>\n    <li>Night Bus</li>\n  [[1]]\n[[2]]',
        blanks: [['</ul>'], ['</li>']],
        distractors: ['</ol>', '<li>', '</p>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A nested list goes inside which element? (two letters)',
        answers: ['li', '<li>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of a nested list, or not?',
        groups: ['Good use', 'Not needed'],
        items: [
          { text: 'Genres, with the beats in each', group: 0 },
          { text: 'One list of three gigs', group: 1 },
          { text: 'Gig cities, with dates in each city', group: 0 },
          { text: 'A single list of things to bring', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Build a two-level list: Afrobeats with Jollof Bounce inside it, and Amapiano with Sunrise in Osu inside it',
        starter: '',
        solution: '<ul>\n  <li>Afrobeats\n    <ul><li>Jollof Bounce</li></ul>\n  </li>\n  <li>Amapiano\n    <ul><li>Sunrise in Osu</li></ul>\n  </li>\n</ul>\n',
        hint: 'One outer ul with two li. Inside each li, after the genre, a small ul with one li.',
        checks: [
          { message: 'Two genres on the outside', dom: { selector: 'body > ul > li', count: 2 } },
          { message: 'Two inner lists, each inside a genre', dom: { selector: 'li > ul', count: 2 } },
          { message: 'Sunrise in Osu is in an inner list', dom: { selector: 'li li', text: 'Sunrise in Osu' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What on your own page could have two levels? Hobbies with favourites inside, places with memories inside?',
    starters: ['On my page I could nest...', 'Inside each one I\'d put...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make a list of three countries you\'d like to visit, with two places inside each one.',
  },
  notes: 'HTML Living Standard §4.4.6: ul content model is zero or more li (and script-supporting elements); nested lists belong in an li\'s flow content. Lagos Run is a named-only beat in an mcq.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 1 — opens the chapter: three featured beats; the class attribute and .class selector. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Only three of them',
  summary: 'The organiser is featuring three of Kofi\'s beats on the next poster, and he wants those three cards to stand out with a pink border. But article { } changes every card at once. He needs a way to say "just these three".',
  minutes: 11,
  outcomes: ['Add a class to an element', 'Style a class with a . selector', 'Explain why classes beat element selectors for picking some, not all'],
  learn: [
    {
      kind: 'story',
      title: 'Six weeks to uni',
      beats: [
        { speaker: 'narrator', text: 'Six weeks to uni. Three of Kofi\'s six beats are going on the next Sound Up Saturdays poster.' },
        { speaker: 'kofi', text: 'I want those three cards pink. But when I change article, all six go pink.' },
        { speaker: 'efua', text: 'Because article means every article. You need a label for the special ones.' },
        { speaker: 'miracle', text: 'That label is called a class. It\'s the most-used tool in CSS.' },
      ],
      choice: {
        prompt: 'How should Kofi make just three cards pink?',
        options: [
          {
            text: 'Give those three a class, class="featured", and write one .featured rule.',
            outcome: 'Three cards turn pink. When the poster changes next month, he moves the class to three different cards in seconds.',
            best: true,
          },
          {
            text: 'Write style="border-color: #F0438A" on each of the three.',
            outcome: 'It works, until Efua asks for a slightly different pink. He edits three places, misses one, and the cards don\'t match.',
          },
          {
            text: 'Change the three into a different element, like aside, so article doesn\'t catch them.',
            outcome: 'They lose all their card styles, and an aside means something else in HTML. Two problems instead of one.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>A class is a label you choose.</strong> In HTML, add class="featured" to any element. In CSS, a dot means "everything with this class": .featured { }. Any number of elements can share a class, and only they are styled.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Just the featured ones',
      caption: 'Every card gets the orange border. Only the cards with class="featured" turn pink.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n<article class="featured"><h2>Night Bus to Kumasi</h2></article>\n',
      challenge: 'Move class="featured" from Sunrise in Osu to Jollof Bounce.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'HTML: class="featured". CSS: .featured { }. The dot means "class".',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> classes, ids, which rule wins when two disagree, naming things well, and keeping a stylesheet easy to change. The climax: Kofi restyles every card on the site by changing one line.</p>',
    },
  ],
  apply: {
    scenario: 'The three featured beats.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did article { } turn all six cards pink?',
        options: [
          { text: 'An element selector picks every element of that type' },
          { text: 'Pink spreads to nearby cards', why: 'It picks every article.' },
          { text: 'The browser made a mistake', why: 'It did exactly what article means.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the first card the class featured',
        starter: '<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<article class="featured"><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: '<article class="featured">',
        checks: [
          { message: 'One featured card', dom: { selector: '.featured', count: 1 } },
          { message: 'It\'s Sunrise in Osu', dom: { selector: '.featured h2', text: 'Sunrise in Osu' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['A featured class', 'Easy to move next month'],
          ['style="" on each card', 'The pinks stop matching'],
          ['Swap to aside', 'Cards lose their styles'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML or CSS?',
        groups: ['HTML', 'CSS'],
        items: [
          { text: 'class="featured"', group: 0 },
          { text: '.featured { border-color: #F0438A; }', group: 1 },
          { text: '<article class="featured">', group: 0 },
          { text: '.featured', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'In CSS I wrote featured { border-color: #F0438A; } and nothing happened.',
        options: [
          { text: 'It needs a dot: .featured. Without it, CSS looks for a featured element, and there isn\'t one.' },
          { text: 'Classes only work in HTML.', why: 'You style them in CSS with a dot.' },
          { text: 'Try FEATURED in capitals.', why: 'The missing dot is the problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that won\'t style the featured cards.',
        language: 'css',
        lines: ['article { border: 2px solid #FF9600; }', 'featured { border-color: #F0438A; }', 'h2 { margin-top: 0; }'],
        bug: 1,
        explanation: 'A class selector starts with a dot.',
        fix: '.featured { border-color: #F0438A; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many cards turn pink?',
        code: '.featured { border-color: #F0438A; }\n\n<article class="featured">A</article>\n<article>B</article>\n<article class="featured">C</article>',
        language: 'html',
        options: [
          { text: 'Two: A and C' },
          { text: 'Three', why: 'B has no class.' },
          { text: 'One', why: 'Any number of elements can share a class.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the class rule.',
        language: 'css',
        template: '[[1]]featured { border-color: #F0438A; }',
        blanks: [['.']],
        distractors: ['#', '*', '@'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which HTML attribute gives an element a reusable label for CSS? (one word)',
        answers: ['class'],
        placeholder: 'An attribute',
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the featured cards pink: a .featured rule with border-color #F0438A',
        starter: '<style>\n  article { border: 2px solid #FF9600; }\n\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  article { border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        hint: '.featured { border-color: #F0438A; }',
        checks: [
          { message: 'The featured card is pink', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#F0438A' } },
          { message: 'The other card stays orange', dom: { selector: 'article:not(.featured)', style: 'border-top-color', styleValue: '#FF9600' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'On your own page, which few things should look different from the rest? What would you call their class?',
    starters: ['I\'d label...', 'The class would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick two or three elements on your page that deserve to stand out. Give them a class and style it.',
  },
  notes: 'Opens Course 2, Chapter 2 (Classes and the cascade). Class selectors per MDN. aside means content tangential to the main content (HTML spec), hence "means something else".',
};

export default lesson;

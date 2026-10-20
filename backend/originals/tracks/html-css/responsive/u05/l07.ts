import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 5 · Lesson 7 — history: m. sites, the iPhone, "Responsive Web Design" (2010), mobile overtaking desktop (2016). Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'How the web learned to bend',
  summary: 'Miracle remembers when big companies had two websites: one for computers and a cut-down one for phones. Here\'s how the web went from that to one page that fits every screen.',
  minutes: 12,
  outcomes: ['Describe how sites handled phones before responsive design', 'Name the three ingredients of responsive design', 'Explain why phones-first became the normal approach'],
  learn: [
    {
      kind: 'reading',
      title: 'From m-dot sites to responsive design',
      html:
        '<p>In the 2000s, phone browsers were basic, and many companies built a second, simpler website just for phones, often at an address starting with <strong>m.</strong>, like m.example.com. Two sites meant twice the work, and the phone version usually had less in it.</p>' +
        '<p>In 2007 the iPhone arrived with a browser that could show full websites, zoomed out to fit the screen (which is why phones still pretend to be about 980px wide without a viewport tag). It worked, but readers had to pinch and zoom to read anything.</p>' +
        '<p>In May 2010, web designer <strong>Ethan Marcotte</strong> published an article called "Responsive Web Design" in the online magazine A List Apart. His idea: one site that responds to the screen it\'s on, using three ingredients: <strong>fluid grids</strong> (widths that stretch, like fr and %), <strong>flexible images</strong> (max-width: 100%), and <strong>media queries</strong>. The name stuck, and it\'s the name of this course.</p>' +
        '<p>Phones kept growing. In late 2016, StatCounter reported that for the first time, more web pages worldwide were being opened on phones and tablets than on computers. Designing for the small screen first stopped being a nice idea and became the normal way to build.</p>' +
        '<p>Kofi\'s visitor stats tell the same story. Most of his fans meet Mensah Beats on a phone.</p>',
    },
    {
      kind: 'tryIt',
      title: 'All three ingredients',
      caption: 'A fluid grid, a flexible image and a media query, in one small page.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  main { display: grid; gap: 16px; }\n  img { max-width: 100%; border-radius: 8px; }\n  @media (min-width: 700px) {\n    main { grid-template-columns: 1fr 2fr; }\n  }\n</style>\n<main>\n  <img src="cover-3.png" alt="Night Bus to Kumasi cover">\n  <section><h2>Night Bus to Kumasi</h2><p>Made on a 4-hour bus ride, headphones on, phone in hand.</p></section>\n</main>\n',
      challenge: 'Remove max-width: 100% from the image and shrink the preview. What breaks?',
    },
  ],
  apply: {
    scenario: 'How the web learned to bend.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['Separate m-dot sites for phones', 'The iPhone shows zoomed-out full websites', '"Responsive Web Design" is published', 'Phones and tablets overtake computers'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ingredient to an example.',
        pairs: [
          ['Fluid grids', 'grid-template-columns: 1fr 2fr'],
          ['Flexible images', 'img { max-width: 100%; }'],
          ['Media queries', '@media (min-width: 700px)'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who named the idea "responsive web design", and when?',
        options: [
          { text: 'Ethan Marcotte, in 2010' },
          { text: 'Tim Berners-Lee, in 1991', why: 'He invented the web. Marcotte named responsive design.' },
          { text: 'Apple, in 2007', why: '2007 was the iPhone. The name came in 2010.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the flexible-image ingredient: img gets max-width 100%',
        starter: '<style>\n  main { display: grid; }\n\n</style>\n<main><img src="cover-3.png" alt="Night Bus to Kumasi cover"></main>\n',
        solution: '<style>\n  main { display: grid; }\n  img { max-width: 100%; }\n</style>\n<main><img src="cover-3.png" alt="Night Bus to Kumasi cover"></main>\n',
        hint: 'img { max-width: 100%; }',
        checks: [
          { message: 'Flexible images', dom: { selector: 'img', style: 'max-width', styleValue: '100%' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Old approach or responsive approach?',
        groups: ['Old approach', 'Responsive'],
        items: [
          { text: 'A separate m. site for phones', group: 0 },
          { text: 'One page with media queries', group: 1 },
          { text: 'Pinch and zoom to read', group: 0 },
          { text: 'Images that shrink to fit', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Why did m-dot sites go out of fashion?',
        options: [
          { text: 'Two sites meant double the work, and phone visitors often got less. One responsive site serves everyone.' },
          { text: 'Phones stopped working with them.', why: 'They still work. They\'re just more work.' },
          { text: 'They were illegal.', why: 'They were just harder to keep up to date.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Responsive design uses fluid grids, flexible images and media queries.', 'Responsive design means building a separate site for each device.', 'In 2016, phones and tablets overtook computers for web pages opened.'],
        bug: 1,
        explanation: 'Responsive design is one site that adapts to every screen.',
      },
      {
        kind: 'mcq',
        prompt: 'Why do phones pretend to be about 980px wide without a viewport tag?',
        options: [
          { text: 'Early phone browsers showed full desktop sites zoomed out, and that stayed the default' },
          { text: 'Phones are 980px wide', why: 'They\'re much narrower. It\'s a leftover default.' },
          { text: 'It makes pages faster', why: 'It was about fitting old desktop sites.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the three ingredients.',
        template: 'Fluid [[1]], flexible images, and media [[2]].',
        blanks: [['grids'], ['queries']],
        distractors: ['fonts', 'tables', 'colours'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did many old phone-only websites start with, before the domain? (one letter and a dot)',
        answers: ['m.', 'm'],
        placeholder: 'Letter and dot',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever used a website that was terrible on a phone? What was wrong with it?',
    starters: ['I used...', 'It was hard because...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search "A List Apart Responsive Web Design Ethan Marcotte" and read the opening of the 2010 article.',
  },
  notes: 'Ethan Marcotte, "Responsive Web Design", A List Apart, 25 May 2010 (three ingredients: fluid grids, flexible images, media queries). iPhone 2007 with Mobile Safari rendering full pages at ~980px. StatCounter, Nov 2016: mobile + tablet 51.3% of worldwide web page loads in October 2016, overtaking desktop.',
};

export default lesson;

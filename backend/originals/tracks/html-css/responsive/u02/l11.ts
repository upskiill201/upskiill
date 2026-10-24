import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 11 — naming classes for what things are, not how they look. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'When the names lie',
  summary: 'Kofi named his classes .pink-box, .big-orange and .box2. Then Efua decided featured cards should be gold. Now .pink-box is gold, .big-orange is small, and nobody knows what .box2 is. Choose how he names things.',
  minutes: 11,
  outcomes: ['Name classes for their role, not their looks', 'Spot names that will become wrong', 'Rename classes safely'],
  learn: [
    {
      kind: 'story',
      title: '.pink-box is gold',
      beats: [
        { speaker: 'efua', text: 'Featured cards should be gold, to match the new poster.' },
        { speaker: 'narrator', text: 'Kofi changes the colour inside .pink-box to gold. It works. It also makes no sense.' },
        { speaker: 'clinton', text: 'So the pink box is gold, and the big orange heading is small and cream?' },
        { speaker: 'miracle', text: 'Names that describe looks go out of date the day the looks change.' },
      ],
      choice: {
        prompt: 'How should Kofi name his classes?',
        options: [
          {
            text: 'By what each thing is: .featured, .beat-card, .section-title.',
            outcome: 'Gold, pink or green, .featured is still true. Anyone reading the HTML knows what each part is.',
            best: true,
          },
          {
            text: 'Keep naming by looks, and rename every time the design changes.',
            outcome: 'Every redesign means editing the CSS and every HTML file. He misses two, and they lose their styles.',
          },
          {
            text: 'Short numbered names: .b1, .b2, .b3.',
            outcome: 'Short, but a week later even Kofi can\'t remember which is which.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Name the role, not the paint.</strong> Ask "what is this?", not "what does it look like?". .featured, .gig-card, .play-button stay true through any redesign. .pink-box, .big-text and .left-column turn into lies as soon as the design changes.</p>',
    },
    {
      kind: 'tryIt',
      title: 'An honest name',
      caption: 'The class says what it is. Change the colour to anything: the name stays true.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .beat-card { border: 2px solid #FF9600; border-radius: 12px; padding: 16px; margin-bottom: 16px; }\n  .featured { border-color: #FFC83D; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Jollof Bounce</h2></article>\n',
      challenge: 'Change #FFC83D to #F0438A. The name featured is still right.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask "what is it?", not "what does it look like?". Then the name survives every redesign.',
    },
  ],
  apply: {
    scenario: 'The names that lie.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did .pink-box become a problem?',
        options: [
          { text: 'It described a colour, and the colour changed' },
          { text: 'Hyphens aren\'t allowed', why: 'They are. The name described looks.' },
          { text: 'Pink is too bright', why: 'The name stopped matching the look.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Rename the class: change pink-box to featured in both the HTML and the CSS',
        starter: '<style>\n  .pink-box { border: 2px solid #FFC83D; }\n</style>\n<article class="pink-box"><h2>Sunrise in Osu</h2></article>\n',
        solution: '<style>\n  .featured { border: 2px solid #FFC83D; }\n</style>\n<article class="featured"><h2>Sunrise in Osu</h2></article>\n',
        hint: 'Two places: class="featured" and .featured.',
        checks: [
          { message: 'No pink-box left in the HTML', dom: { selector: '.pink-box', count: 0 } },
          { message: 'The card is featured', dom: { selector: '.featured', count: 1 } },
          { message: 'And still styled', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#FFC83D' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Names the role, or names the looks?',
        groups: ['The role', 'The looks'],
        items: [
          { text: '.play-button', group: 0 },
          { text: '.big-orange', group: 1 },
          { text: '.gig-card', group: 0 },
          { text: '.left-column', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Names by role', 'Still true after any redesign'],
          ['Names by looks', 'Renaming everywhere, missing some'],
          ['Numbered names', 'Nobody remembers which is which'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'What should I call the class for the orange Play links?',
        options: [
          { text: '.orange-link', why: 'That breaks when it turns pink.' },
          { text: '.thing3', why: 'Nobody will know what it is.' },
          { text: '.play-button: it says what it is, whatever colour it ends up.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the class name that will lie after a redesign.',
        language: 'html',
        lines: ['<article class="gig-card">', '<a class="play-button">', '<p class="small-grey-text">'],
        bug: 2,
        explanation: 'It describes looks. Name what it is, like .card-note or .credit.',
        fix: '<p class="credit">',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the best name for the "Sold out" label on a gig?',
        options: [
          { text: '.red-text', why: 'Describes looks, not meaning.' },
          { text: '.sold-out' },
          { text: '.label7', why: 'Says nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the gig card an honest name.',
        language: 'html',
        template: '<article class="[[1]]">Sound Up Saturdays</article>',
        blanks: [['gig-card', 'gig']],
        distractors: ['blue-box', 'card2', 'big-text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Should a class name describe the thing\'s role or its looks? (one word)',
        answers: ['role', 'its role', 'the role'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When renaming a class, what must you change?',
        options: [
          { text: 'Every HTML class attribute and every CSS selector that uses it' },
          { text: 'Only the CSS', why: 'The HTML would still say the old name.' },
          { text: 'Only the HTML', why: 'The CSS would still target the old name.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Read your own class names. Which ones would lie if you changed your colours tomorrow?',
    starters: ['I\'d rename...', 'To...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rename any look-based classes on your page to role-based ones. Change both the HTML and the CSS.',
  },
  notes: '#FFC83D is a gold for the new poster; night-blue text on it and it on night blue both exceed 4.5:1. Role-based ("semantic") class naming is long-standing CSS guidance.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 20 — Chapter Challenge: Mensah Beats v1.2; restyle every card by changing one line. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v1.2',
  summary: 'An hour before the poster goes to print, the organiser asks: "Can your cards match the poster\'s gold?" Last month that would have meant editing every card. Tonight it\'s one line. Build v1.2 from memory.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Style a site with base and extra classes', 'Win the cascade without ids or !important', 'Restyle every card by changing one line'],
  learn: [
    {
      kind: 'story',
      title: 'One line',
      beats: [
        { speaker: 'narrator', text: 'Friday, 5pm. Six weeks to uni. The organiser: "The poster is gold this month. Can your cards match before we print?"' },
        { speaker: 'kofi', text: 'One line. .card, border-color... gold.' },
        { speaker: 'narrator', text: 'He presses save. Every beat card on the site turns gold at once. The featured ones stay pink, and the gig cards stay cream: their extras still win.' },
        { speaker: 'efua', text: 'That took you four seconds.' },
        { speaker: 'tey', text: 'The site finally changes as fast as you do. Next chapter: lining things up side by side.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v1.0 (Course 1)', body: 'Live: his colours, readable text, style.css.' },
        { title: 'v1.1', body: 'Beat cards with room to breathe, a centred column, thumb-sized buttons.', code: 'main { max-width: 640px; margin: 0 auto; }', language: 'css' },
        { title: 'v1.2 (tonight)', body: 'Classes: one .card base, gig and featured extras, play buttons, tags. No ids or !important for styling.', code: '.card { border: 2px solid #FFC83D; }', language: 'css' },
        { title: 'Next chapter', body: 'Flexbox: putting things side by side, centring, and a proper navigation bar.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Mensah Beats v1.2.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the base. Give both cards class="card", and write .card with 16px padding and a 2px solid #FF9600 border',
        starter: '<style>\n\n</style>\n<article><h2>Sunrise in Osu</h2></article>\n<article><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n</style>\n<article class="card"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Jollof Bounce</h2></article>\n',
        hint: 'class="card" on both, then a .card rule.',
        checks: [
          { message: 'Two cards', dom: { selector: 'article.card', count: 2 } },
          { message: 'Room inside', dom: { selector: '.card', style: 'padding-top', styleValue: '16px' } },
          { message: 'Orange border', dom: { selector: '.card', style: 'border-top-color', styleValue: '#FF9600' } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 2: the extra. Make Sunrise in Osu featured, with a .featured rule setting border-color #F0438A',
        starter: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n\n</style>\n<article class="card"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Jollof Bounce</h2></article>\n',
        solution: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card featured"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Jollof Bounce</h2></article>\n',
        hint: 'class="card featured", then .featured { border-color: #F0438A; }',
        checks: [
          { message: 'One featured card', dom: { selector: '.card.featured', count: 1 } },
          { message: 'It\'s Sunrise in Osu', dom: { selector: '.featured h2', text: 'Sunrise in Osu' } },
          { message: 'It\'s pink', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which colour wins on the heading?',
        code: 'article h2 { color: #FF9600; }\n.card h2 { color: #FFF6E5; }\n\n<article class="card"><h2>Jollof Bounce</h2></article>',
        language: 'html',
        options: [
          { text: 'Cream: 0-1-1 beats 0-0-2' },
          { text: 'Orange: it\'s first', why: 'The class rule is more specific.' },
          { text: 'Both', why: 'One wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fits the v1.2 plan, or breaks it?',
        groups: ['Fits', 'Breaks it'],
        items: [
          { text: '.gig-card { border-color: #FFF6E5; }', group: 0 },
          { text: '#sunrise { color: pink !important; }', group: 1 },
          { text: '<span class="tag">Sold out</span>', group: 0 },
          { text: 'style="padding: 16px" on every card', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the one line. Turn every card\'s border gold by changing .card\'s border colour to #FFC83D',
        starter: '<style>\n  .card { padding: 16px; border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card featured"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Jollof Bounce</h2></article>\n<article class="card"><h2>Night Bus to Kumasi</h2></article>\n',
        solution: '<style>\n  .card { padding: 16px; border: 2px solid #FFC83D; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card featured"><h2>Sunrise in Osu</h2></article>\n<article class="card"><h2>Jollof Bounce</h2></article>\n<article class="card"><h2>Night Bus to Kumasi</h2></article>\n',
        hint: 'Change #FF9600 to #FFC83D inside .card.',
        checks: [
          { message: 'Every plain card is gold', dom: { selector: '.card:not(.featured)', style: 'border-top-color', styleValue: '#FFC83D' } },
          { message: 'Featured stays pink', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'After the change, one card stays orange. Tap why.',
        language: 'html',
        lines: ['<article class="card">Jollof Bounce</article>', '<article class="card featured">Sunrise in Osu</article>', '<article style="border-color: #FF9600;" class="card">Night Bus to Kumasi</article>'],
        bug: 2,
        explanation: 'A leftover style attribute beats .card. Remove it and the card follows the class.',
        fix: '<article class="card">Night Bus to Kumasi</article>',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The featured card didn\'t turn gold. Bug?',
        options: [
          { text: 'No, that\'s right: .featured comes after .card, so it still sets the pink.' },
          { text: 'Yes, add !important to .card.', why: 'Then featured could never be pink again.' },
          { text: 'Delete the featured class.', why: 'It\'s working as planned.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea from this chapter to its meaning.',
        pairs: [
          ['class', 'A reusable label'],
          ['id', 'One unique name'],
          ['Specificity', 'How precise a selector is'],
          ['Inheritance', 'Text styles passed down'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Score the selectors.',
        template: '.card h2 is 0-1-[[1]]. #gigs is [[2]]-0-0.',
        blanks: [['1'], ['1']],
        distractors: ['0', '2', '3'],
      },
      {
        kind: 'writeCode',
        prompt: 'Final step: tag the gig. Wrap "Sold out" in a span with class="tag"',
        starter: '<article class="card gig-card"><h2>Sound Up Saturdays Sold out</h2></article>\n',
        solution: '<article class="card gig-card"><h2>Sound Up Saturdays <span class="tag">Sold out</span></h2></article>\n',
        hint: '<span class="tag">Sold out</span>',
        checks: [
          { message: 'A tag', dom: { selector: 'span.tag', count: 1 } },
          { message: 'Saying Sold out', dom: { selector: '.tag', text: 'Sold out' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Mensah Beats uses classes? (e.g. v1.1)',
        answers: ['v1.2', '1.2'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Run the one-line test on your own site. What happened?',
    starters: ['When I changed one line...', 'Next I want to...'],
  },
  deepen: {
    title: 'Do it for real',
    summary: 'Switch your own site to a class plan, run the one-line test, then upload it and check it on a phone.',
  },
  notes: 'Chapter 2 finale of Course 2. Gold #FFC83D border on night/#1F2E52 is decorative (non-text); contrast well above 3:1. Next chapter: Flexbox ("Lining things up", 5 weeks).',
};

export default lesson;

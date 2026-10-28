import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4 (class, .selector, one class vs copies, naming, two classes). */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the poster three',
  summary: 'Kofi moves "featured" onto the three beats the organiser picked. Three edits in the HTML, zero in the CSS. The poster three glow pink. Quick checkpoint.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Label elements with classes', 'Style a class with a . selector', 'Combine a base class with an extra one'],
  learn: [
    {
      kind: 'story',
      title: 'Zero edits in the CSS',
      beats: [
        { speaker: 'narrator', text: 'The organiser sends the final three. Kofi moves the word "featured" in the HTML. The CSS doesn\'t change at all.' },
        { speaker: 'kofi', text: 'Thirty seconds. Last month that would have been an hour.' },
        { speaker: 'tey', text: 'That\'s the power of a class. Let\'s lock it in.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: classes.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Make the second card featured too, and write .featured with border-color #F0438A',
        starter: '<style>\n  .beat-card { border: 2px solid #FF9600; padding: 16px; }\n\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card"><h2>Night Bus to Kumasi</h2></article>\n',
        solution: '<style>\n  .beat-card { border: 2px solid #FF9600; padding: 16px; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="beat-card featured"><h2>Sunrise in Osu</h2></article>\n<article class="beat-card featured"><h2>Night Bus to Kumasi</h2></article>\n',
        hint: 'Add featured to the second card\'s class, then a .featured rule.',
        checks: [
          { message: 'Two featured beat cards', dom: { selector: '.beat-card.featured', count: 2 } },
          { message: 'They\'re pink', dom: { selector: '.featured', style: 'border-top-color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which selector picks every element with class="featured"?',
        options: [
          { text: '.featured' },
          { text: 'featured', why: 'Without a dot it looks for a featured element.' },
          { text: '#featured', why: '# is for ids, coming next.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good class name, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'beat-card', group: 0 },
          { text: 'pink-box', group: 1 },
          { text: 'featured', group: 0 },
          { text: '3rd', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which cards get a 16px padding?',
        code: '.beat-card { padding: 16px; }\n\n<article class="beat-card featured">A</article>\n<article class="featured">B</article>\n<article class="beat-card">C</article>',
        language: 'html',
        options: [
          { text: 'Only C', why: 'A has beat-card too.' },
          { text: 'A and C' },
          { text: 'All three', why: 'B isn\'t a beat-card.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken HTML.',
        language: 'html',
        lines: ['<article class="beat-card">', '<article class=".featured">', '<article class="beat-card featured">'],
        bug: 1,
        explanation: 'No dot in the HTML. The dot is only for the CSS selector.',
        fix: '<article class="featured">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Next month the poster picks three different beats. How much work is that?',
        options: [
          { text: 'Rewrite the stylesheet.', why: 'The class keeps the look in one rule.' },
          { text: 'Change six style attributes.', why: 'No style attributes: just move the class.' },
          { text: 'Move the word featured onto three other cards. The CSS doesn\'t change.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each selector to what it picks.',
        pairs: [
          ['.beat-card', 'Every beat card'],
          ['.beat-card.featured', 'Beat cards that are also featured'],
          ['.beat-card h2', 'Headings inside beat cards'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Give the card both classes.',
        language: 'html',
        template: '<article class="[[1]] [[2]]">Jollof Bounce</article>',
        blanks: [['beat-card'], ['featured']],
        distractors: ['.featured', 'beat card', 'style'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What symbol starts a class selector in CSS? (name it)',
        answers: ['dot', 'full stop', 'period', 'a dot'],
        placeholder: 'A symbol name',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps for a new class in order.',
        lines: ['Choose a name that says what it is', 'Add class="name" in the HTML', 'Write .name { } in the CSS', 'Check it on the page'],
      },
    ],
  },
  reflect: {
    prompt: 'What did classes let you do on your own page that element selectors couldn\'t?',
    starters: ['Now I can...', 'Before, I had to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give your page a base class and an extra class, and practise moving the extra between elements.',
  },
  notes: 'Checkpoint 1. Reviews l01–l04.',
};

export default lesson;

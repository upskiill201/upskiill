import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 16 — class and cascade myths. Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Classes: myth or fact?',
  summary: 'Clinton has a new list of "CSS rules everyone knows". Half of them would break Kofi\'s site. Sort the myths from the facts.',
  minutes: 11,
  outcomes: ['Separate class and cascade myths from facts', 'Remember that class names are case-sensitive', 'Explain why order alone doesn\'t decide every winner'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'An element can only have one class.', isFact: false, explain: 'It can have as many as you like, separated by spaces: class="card gig-card".' },
        { text: 'Class names are case-sensitive.', isFact: true, explain: 'Featured and featured are different classes. Stick to lowercase and you never have to think about it.' },
        { text: 'The last rule in the file always wins.', isFact: false, explain: 'Only when the selectors are equally specific. A class beats an element, wherever they are.' },
        { text: 'Class names change how the browser behaves.', isFact: false, explain: 'To the browser, .featured means nothing until you write CSS for it. Names are for people.' },
        { text: 'The same class can be used on different kinds of element.', isFact: true, explain: 'class="tag" works on a span, a p or an li. The rule applies to all of them.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Case matters',
      caption: 'The HTML says Featured, the CSS says featured. In a page that starts with <!DOCTYPE html>, like every real page, they don\'t match.',
      code: '<!DOCTYPE html>\n<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .card { border: 2px solid #FF9600; padding: 16px; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card Featured"><h2>Sunrise in Osu</h2></article>\n',
      challenge: 'Change Featured to featured in the HTML. Now it turns pink.',
    },
  ],
  apply: {
    scenario: 'Clinton\'s list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'One class per element', group: 0 },
          { text: 'Class names are case-sensitive', group: 1 },
          { text: 'The last rule always wins', group: 0 },
          { text: 'One class can go on different elements', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the case so the card turns pink: the HTML should say featured, in lowercase',
        starter: '<!DOCTYPE html>\n<style>\n  .card { border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card Featured"><h2>Sunrise in Osu</h2></article>\n',
        solution: '<!DOCTYPE html>\n<style>\n  .card { border: 2px solid #FF9600; }\n  .featured { border-color: #F0438A; }\n</style>\n<article class="card featured"><h2>Sunrise in Osu</h2></article>\n',
        hint: 'class="card featured"',
        checks: [
          { message: 'The card is pink', dom: { selector: '.card', style: 'border-top-color', styleValue: '#F0438A' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the class name .featured make the browser do on its own?',
        options: [
          { text: 'Highlight the element', why: 'Names mean nothing to the browser.' },
          { text: 'Move it to the top', why: 'Only CSS changes how it looks.' },
          { text: 'Nothing, until you write CSS for it' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"One class per element"', 'As many as you like'],
          ['"Last always wins"', 'Only on a tie'],
          ['"Case doesn\'t matter"', 'Featured and featured differ'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Can I use class="tag" on a p and on a span?',
        options: [
          { text: 'No, only one kind of element per class.', why: 'Any element can share it.' },
          { text: 'Yes, a class works on any element. Both get the .tag styles.' },
          { text: 'Only on spans.', why: 'Any element can have it.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap Clinton\'s myth.',
        lines: ['A class beats an element selector.', 'An element can have one class at most.', 'Ids must be unique on a page.'],
        bug: 1,
        explanation: 'Elements can have many classes, separated by spaces.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which elements get a gold background?',
        code: '.tag { background-color: #FFC83D; }\n\n<span class="tag">Sold out</span>\n<p class="tag">New</p>\n<li>Old</li>',
        language: 'html',
        options: [
          { text: 'The span and the p' },
          { text: 'Only the span', why: 'The p has the class too.' },
          { text: 'All three', why: 'The li has no class.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the facts.',
        template: 'Class names are case-[[1]]. The last rule wins only on a [[2]].',
        blanks: [['sensitive'], ['tie']],
        distractors: ['proof', 'Monday', 'free'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Is "an element can have many classes" a myth or a fact? (one word)',
        answers: ['fact'],
        placeholder: 'Myth or fact',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the easiest way to never get bitten by case-sensitivity?',
        options: [
          { text: 'Always use capitals', why: 'Mixing is the trap. Lowercase everywhere is simplest.' },
          { text: 'Always write class names in lowercase' },
          { text: 'Avoid classes', why: 'Just keep names lowercase.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these did you believe before?',
    starters: ['I thought...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Check your class names for capitals. Make them all lowercase in both the HTML and the CSS.',
  },
  notes: 'Class selectors match case-sensitively in standards-mode documents (Selectors Level 4); quirks mode differs, so the course always uses a doctype in full pages.',
};

export default lesson;

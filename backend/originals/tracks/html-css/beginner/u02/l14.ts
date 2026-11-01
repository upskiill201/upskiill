import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14 — description lists: dl, dt, dd, for gig details. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Gig details',
  summary: 'Every gig has the same details: date, time, place, price. Kofi keeps writing "Date: ..." in paragraphs. HTML has a list made exactly for names and their values.',
  minutes: 12,
  outcomes: ['Build a description list with dl, dt and dd', 'Use it for name and value pairs', 'Choose between ul, ol and dl'],
  learn: [
    {
      kind: 'steps',
      title: 'Names and their values',
      steps: [
        { title: '1. Spot the pairs', body: 'Gig details come in pairs: a name (Date) and its value (Saturday the 14th). That\'s a description list.', code: '<p>Date: Saturday the 14th</p>\n<p>Time: 8pm</p>', language: 'html' },
        { title: '2. Open a dl', body: 'dl means "description list". It holds the pairs.', code: '<dl>\n</dl>', language: 'html' },
        { title: '3. dt for the name, dd for the value', body: 'dt is the term (the name). dd is its description (the value). The browser indents each dd under its dt.', code: '<dl>\n  <dt>Date</dt>\n  <dd>Saturday the 14th</dd>\n  <dt>Time</dt>\n  <dd>8pm</dd>\n</dl>', language: 'html' },
        { title: '4. One name, several values', body: 'A dt can have more than one dd. Two opening acts? Two dd under one dt.', code: '<dt>Opening acts</dt>\n<dd>Mensah Beats</dd>\n<dd>DJ Ama (age 10, guest)</dd>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The gig card',
      caption: 'All the gig details as a description list. Each name sits above its value.',
      code: '<h2>Next gig</h2>\n<dl>\n  <dt>Where</dt>\n  <dd>Sound Up Saturdays, Osu</dd>\n  <dt>When</dt>\n  <dd>Saturday the 14th, 8pm</dd>\n  <dt>Price</dt>\n  <dd>Free before 9pm</dd>\n</dl>\n',
      challenge: 'Add a fourth pair: Dress code, with the value Come as you are.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'ul: things in any order. ol: things in order. dl: names and their values, like a gig card or a profile.',
    },
  ],
  apply: {
    scenario: 'Kofi builds a gig card.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['dl', 'The description list'],
          ['dt', 'A name, like Date'],
          ['dd', 'Its value, like Saturday the 14th'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a description list with two pairs: Date / Saturday the 14th, and Time / 8pm',
        starter: '<dl>\n</dl>\n',
        solution: '<dl>\n  <dt>Date</dt>\n  <dd>Saturday the 14th</dd>\n  <dt>Time</dt>\n  <dd>8pm</dd>\n</dl>\n',
        hint: 'Inside the dl: dt Date, dd Saturday the 14th, dt Time, dd 8pm.',
        checks: [
          { message: 'Two names', dom: { selector: 'dl > dt', count: 2 } },
          { message: 'Two values', dom: { selector: 'dl > dd', count: 2 } },
          { message: 'A value says 8pm', dom: { selector: 'dd', text: '8pm' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'ul, ol or dl?',
        groups: ['ul', 'ol', 'dl'],
        items: [
          { text: 'Genres Kofi makes', group: 0 },
          { text: 'Tonight\'s set, in order', group: 1 },
          { text: 'Date, time and price of a gig', group: 2 },
          { text: 'Steps to buy a ticket', group: 1 },
          { text: 'A profile: name, city, instrument', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In <dt>Price</dt><dd>Free before 9pm</dd>, which part is the name?',
        options: [
          { text: 'Free before 9pm', why: 'That\'s the value, in dd.' },
          { text: 'dl', why: 'dl is the list itself. The name is in dt.' },
          { text: 'Price' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the gig card in order.',
        language: 'html',
        lines: ['<dl>', '<dt>Where</dt>', '<dd>Osu</dd>', '<dt>When</dt>', '<dd>8pm</dd>', '</dl>'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s the wrong tag.',
        language: 'html',
        lines: ['<dl>', '  <dt>Price</dt>', '  <li>Free before 9pm</li>', '</dl>'],
        bug: 2,
        fix: '  <dd>Free before 9pm</dd>',
        explanation: 'Values in a description list go in dd, not li.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Why not just write "Date: Saturday" in a paragraph?',
        options: [
          { text: 'No reason, paragraphs are better.', why: 'A dl tells browsers and screen readers which name goes with which value.' },
          { text: 'Because a dl keeps each name with its value, and screen readers can read them as pairs.' },
          { text: 'Because paragraphs are banned.', why: 'They aren\'t. But for name and value pairs, dl is the right shape.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the pair.',
        language: 'html',
        template: '<dl>\n  <[[1]]>Where</dt>\n  <[[2]]>Osu, Accra</dd>\n</dl>',
        blanks: [['dt'], ['dd']],
        distractors: ['li', 'dl', 'p'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a description list, which tag holds the value? (two letters)',
        answers: ['dd', '<dd>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'writeCode',
        prompt: 'The full gig card: an h2 Next gig, then a dl with Where, When and Price, each with a value',
        starter: '',
        solution: '<h2>Next gig</h2>\n<dl>\n  <dt>Where</dt>\n  <dd>Sound Up Saturdays, Osu</dd>\n  <dt>When</dt>\n  <dd>Saturday the 14th, 8pm</dd>\n  <dt>Price</dt>\n  <dd>Free before 9pm</dd>\n</dl>\n',
        hint: 'An h2, then a dl with three dt and three dd.',
        checks: [
          { message: 'A heading Next gig', dom: { selector: 'h2', text: 'Next gig' } },
          { message: 'Three names', dom: { selector: 'dt', count: 3 } },
          { message: 'Three values', dom: { selector: 'dd', min: 3 } },
          { message: 'One of the names is Price', dom: { selector: 'dt', text: 'Price' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What would a description list about you look like? Name, city, favourite food...?',
    starters: ['My dl would have...', 'The most fun pair would be...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, make a "profile card" description list about yourself: three names and three values.',
  },
  notes: 'HTML Living Standard §4.4.9 dl ("an association list consisting of zero or more name-value groups"), §4.4.10 dt, §4.4.11 dd; a name can have multiple values. "DJ Ama" is a joke guest act (Kofi\'s sister).',
};

export default lesson;

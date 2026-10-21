import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 1 · Lesson 7 — history: forms in HTML 2.0 (1995), the web becoming two-way, HTML5 input types and validation. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'When the web learned to listen',
  summary: 'The first web pages could only be read. Forms changed that: suddenly a page could ask you something. Here\'s how forms arrived, and how they got smarter.',
  minutes: 12,
  outcomes: ['Explain why forms made the web two-way', 'Describe when forms became part of HTML', 'Explain what HTML5 added to forms'],
  learn: [
    {
      kind: 'reading',
      title: 'From read-only to two-way',
      html:
        '<p>The very first websites were like a library: you could read pages and follow links, but you couldn\'t send anything back. Then browsers added <strong>forms</strong>, and pages could ask questions. Search boxes, sign-up pages, orders and comments all grew from that one idea.</p>' +
        '<p>Forms were written into <strong>HTML 2.0</strong>, the first formal HTML standard, published in <strong>1995</strong>. It had text boxes, checkboxes, radio buttons, menus and a submit button: much of what Kofi uses today.</p>' +
        '<p>For years after that, every box was basically a text box. If you wanted a date or a valid email, developers wrote extra code to check it, and people typed dates in every format imaginable.</p>' +
        '<p><strong>HTML5</strong>, which became a W3C Recommendation in <strong>2014</strong>, added new input types like email, date, number and tel, and built-in checks like required and min. That\'s why one word, type="date", now gives Grandma a calendar on her phone.</p>' +
        '<p>One thing hasn\'t changed since 1995: a form needs somewhere to send its answers. That\'s a server, or a service that collects form answers for you. You\'ll see the options later in this chapter.</p>',
    },
    {
      kind: 'tryIt',
      title: '1995 vs today',
      caption: 'The top box is how a date worked for years: type anything. The bottom one is HTML5.',
      code: '<style>\n  * { box-sizing: border-box; }\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  label { display: block; margin: 12px 0 4px; }\n  input { width: 100%; padding: 12px; font-size: 1rem; }\n</style>\n<form>\n  <label for="old">Date (the old way)</label>\n  <input type="text" id="old" name="old">\n  <label for="new">Date (HTML5)</label>\n  <input type="date" id="new" name="new">\n</form>\n',
      challenge: 'Tap each box. Which would Grandma rather use?',
    },
  ],
  apply: {
    scenario: 'When the web learned to listen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did forms change about the web?',
        options: [
          { text: 'Pages could ask questions and receive answers, not just be read' },
          { text: 'Pages got colours', why: 'That\'s CSS. Forms made the web two-way.' },
          { text: 'Pages could play music', why: 'Forms are about sending answers.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['Read-only web pages', 'Forms in HTML 2.0', 'Every box is basically a text box', 'HTML5 adds email, date and required'],
      },
      {
        kind: 'sortGroups',
        prompt: 'In HTML 2.0 (1995), or added by HTML5?',
        groups: ['HTML 2.0', 'HTML5'],
        items: [
          { text: 'Text boxes and a submit button', group: 0 },
          { text: 'type="date"', group: 1 },
          { text: 'Checkboxes and radio buttons', group: 0 },
          { text: 'The required attribute', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Upgrade the old date box to HTML5: change its type to date',
        starter: '<form>\n  <label for="date">Date</label>\n  <input type="text" id="date" name="date">\n</form>\n',
        solution: '<form>\n  <label for="date">Date</label>\n  <input type="date" id="date" name="date">\n</form>\n',
        hint: 'type="date"',
        checks: [
          { message: 'An HTML5 date box', dom: { selector: 'input#date[type="date"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['HTML 2.0, with forms', '1995'],
          ['HTML5 becomes a W3C Recommendation', '2014'],
          ['CSS Grid in major browsers', '2017'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'If forms are from 1995, why does Kofi\'s form still need somewhere to send?',
        options: [
          { text: 'A form only collects answers. Something has to receive them: a server or a form service.' },
          { text: 'It doesn\'t, forms email themselves.', why: 'They need somewhere to send.' },
          { text: 'Because it\'s old.', why: 'It\'s how forms have always worked.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Forms made the web two-way.', 'HTML5 removed forms from HTML.', 'HTML5 added input types like email and date.'],
        bug: 1,
        explanation: 'HTML5 made forms better: new types and built-in checks.',
      },
      {
        kind: 'mcq',
        prompt: 'Before HTML5, how did sites check a date or an email?',
        options: [
          { text: 'Developers wrote extra code to check it' },
          { text: 'They couldn\'t at all', why: 'They could, with extra code.' },
          { text: 'The browser did it automatically', why: 'That came with HTML5.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the summary.',
        template: 'Forms arrived in HTML [[1]]. HTML[[2]] added types like email and date.',
        blanks: [['2.0', '2'], ['5']],
        distractors: ['1.0', '3', '4'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was HTML 2.0, with forms, published? (a year)',
        answers: ['1995'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'Think of three forms you\'ve used this week. What did each one ask?',
    starters: ['I filled in...', 'It asked for...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN your first form" and read the introduction to how forms send data.',
  },
  notes: 'HTML 2.0 = RFC 1866 (November 1995), the first formal HTML standard, including FORM, INPUT, SELECT, TEXTAREA. Forms first appeared in browsers (e.g. NCSA Mosaic) in 1993. HTML5 W3C Recommendation 28 October 2014.',
};

export default lesson;

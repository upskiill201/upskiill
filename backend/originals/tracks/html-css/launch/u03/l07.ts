import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 7 — history: Tim Berners-Lee on access, WAI (1997), WCAG versions, laws. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The web was meant for everyone',
  summary: 'Accessibility isn\'t an extra someone bolted on later. It was part of the idea of the web from the start, and it\'s now written into guidelines and laws around the world.',
  minutes: 12,
  outcomes: ['Explain why access for everyone was part of the web\'s idea', 'Describe what WAI and WCAG are', 'Explain why many countries have accessibility laws'],
  learn: [
    {
      kind: 'reading',
      title: 'From an idea to guidelines and laws',
      html:
        '<p>Tim Berners-Lee, who invented the web, has said that the power of the web is in its universality, and that access by everyone regardless of disability is an essential part of it. A web page is just text and structure, so it can be shown on a screen, read aloud, printed in braille, or enlarged. That only works if the page is built properly.</p>' +
        '<p>In <strong>1997</strong> the W3C started the <strong>Web Accessibility Initiative (WAI)</strong> to help. It published the first <strong>Web Content Accessibility Guidelines (WCAG 1.0)</strong> in <strong>1999</strong>. WCAG 2.0 followed in 2008, 2.1 in 2018 and 2.2 in 2023. You\'ve already met parts of it: contrast ratios, the three-flashes rule, text that can grow, labels on forms.</p>' +
        '<p>WCAG has levels: <strong>A</strong> (the essentials), <strong>AA</strong> (what most laws and organisations aim for) and <strong>AAA</strong> (the highest). Many countries now have laws that require public sites, and often businesses, to meet accessibility standards, usually by pointing to WCAG AA. In the European Union, for example, the European Accessibility Act has applied to many products and services since June 2025.</p>' +
        '<p>Laws differ from country to country, and they change, so if you build sites for clients, check the rules where they work. But the reason to do it is simpler than any law: Kwesi wants to hear the beats too.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Built properly, shown any way',
      caption: 'The same structured text can be shown, enlarged or read aloud. Try zooming the preview, or setting a bigger font size.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; font-size: 1rem; line-height: 1.6; }\n</style>\n<main>\n  <h1>Mensah Beats</h1>\n  <h2>Gigs</h2>\n  <p>End-of-year show, Saturday 20 December, Accra.</p>\n</main>\n',
      challenge: 'Change font-size to 1.5rem. The structure doesn\'t change at all; only the look does.',
    },
  ],
  apply: {
    scenario: 'The web was meant for everyone.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['The W3C starts WAI', 'WCAG 1.0 is published', 'WCAG 2.0', 'WCAG 2.2'],
      },
      {
        kind: 'mcq',
        prompt: 'What is WCAG?',
        options: [
          { text: 'The Web Content Accessibility Guidelines, published by the W3C\'s WAI' },
          { text: 'A screen reader', why: 'It\'s a set of guidelines.' },
          { text: 'A law in one country', why: 'It\'s international guidelines that many laws point to.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each WCAG level to what it means.',
        pairs: [
          ['A', 'The essentials'],
          ['AA', 'What most laws aim for'],
          ['AAA', 'The highest level'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of WCAG that you\'ve already met?',
        groups: ['Met it already', 'Not met yet'],
        items: [
          { text: 'Contrast of 4.5 to 1', group: 0 },
          { text: 'No more than three flashes a second', group: 0 },
          { text: 'Labels for form fields', group: 0 },
          { text: 'Captions for videos', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make sure the structure is there: wrap the heading and paragraph in main',
        starter: '<h1>Mensah Beats</h1>\n<p>End-of-year show, 20 December.</p>\n',
        solution: '<main>\n  <h1>Mensah Beats</h1>\n  <p>End-of-year show, 20 December.</p>\n</main>\n',
        hint: '<main> ... </main>',
        checks: [
          { message: 'A main landmark', dom: { selector: 'main h1', count: 1 } },
          { message: 'With the paragraph', dom: { selector: 'main p', count: 1 } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Is accessibility a law in Ghana too?',
        options: [
          { text: 'Laws differ by country and change over time, so check locally. Either way, it\'s the right thing to do for fans like Kwesi.' },
          { text: 'No country has any law.', why: 'Many do. Check the local rules.' },
          { text: 'It\'s the same law everywhere.', why: 'Laws differ by country.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['WAI was started by the W3C in 1997.', 'Accessibility was added to the web only last year.', 'Many laws point to WCAG level AA.'],
        bug: 1,
        explanation: 'Access for everyone was part of the web\'s idea from the start, and WCAG dates from 1999.',
      },
      {
        kind: 'mcq',
        prompt: 'Why can a well-built page be read aloud, enlarged or printed in braille?',
        options: [
          { text: 'It\'s structured text, so any tool can present it in its own way' },
          { text: 'Because of its colours', why: 'Structure, not colour.' },
          { text: 'Only pictures can be enlarged', why: 'Text can be presented many ways.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the names.',
        template: 'WAI = Web Accessibility [[1]]. WCAG = Web Content Accessibility [[2]].',
        blanks: [['Initiative'], ['Guidelines']],
        distractors: ['Institute', 'Grades', 'Group'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which WCAG level do most laws aim for? (two letters)',
        answers: ['aa'],
        placeholder: 'Two letters',
      },
    ],
  },
  reflect: {
    prompt: 'Why do you think access for everyone was part of the web\'s idea from the start?',
    starters: ['Because...', 'It means...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "W3C WAI introduction to web accessibility" and read the short introduction.',
  },
  notes: 'Berners-Lee quote ("The power of the Web is in its universality...") paraphrased, not quoted in full. WAI launched 1997; WCAG 1.0 May 1999, 2.0 Dec 2008, 2.1 June 2018, 2.2 Oct 2023. European Accessibility Act applies from 28 June 2025. Laws vary; "check locally".',
};

export default lesson;

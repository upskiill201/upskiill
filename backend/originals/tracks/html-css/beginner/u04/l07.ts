import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7 — where CSS came from: Håkon Wium Lie, CERN, 1994; Bert Bos; CSS1 in 1996. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'CSS was born at CERN too',
  summary: 'In Chapter 1 you met Tim Berners-Lee, who made the web at CERN. Five years later, someone in the same building had a problem: the web had no good way to make pages look good. His fix is the CSS you\'re writing now.',
  minutes: 12,
  outcomes: ['Explain where CSS came from and why', 'Name who proposed it and when', 'Explain what "cascading" means in the name'],
  learn: [
    {
      kind: 'reading',
      title: 'Style sheets for the web',
      html:
        '<p>The early web was a mess to look at. HTML described documents, but people wanted colours, fonts and layout, so browsers started adding their own tags for looks. Pages became hard to read, hard to change, and different in every browser.</p>' +
        '<p>On <strong>10 October 1994</strong>, <strong>Håkon Wium Lie</strong>, working at <strong>CERN</strong> with Tim Berners-Lee, published a proposal for <strong>Cascading HTML Style Sheets</strong>. The big idea: keep HTML for what things <em>are</em>, and put how they <em>look</em> in a separate set of rules.</p>' +
        '<p><strong>Bert Bos</strong>, who had been designing his own style language, joined him, and together they shaped what became CSS. The first official version, <strong>CSS level 1</strong>, became a W3C recommendation in <strong>December 1996</strong>.</p>' +
        '<p>Why "cascading"? Because styles can come from several places at once: the browser\'s defaults, the site\'s rules, and more specific rules. They flow down and combine, like water down steps, and CSS has rules for which one wins. You\'ll meet those rules in lesson 13.</p>' +
        '<p>Thirty years later, the idea still holds. The same HTML can look completely different with a different stylesheet, which is exactly what you\'re about to do to Mensah Beats.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Same HTML, new look',
      caption: 'The HTML doesn\'t change. Only the CSS does. Swap the two colours and run it again.',
      code: '<style>\n  body { background-color: darkslateblue; color: gold; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Same HTML. A whole new look.</p>\n',
      challenge: 'Make a third look: background-color: seashell; color: maroon;',
    },
  ],
  apply: {
    scenario: 'Where CSS came from.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who proposed CSS, and when?',
        options: [
          { text: 'Håkon Wium Lie, in October 1994' },
          { text: 'Tim Berners-Lee, in 1989', why: 'He made the web. CSS was proposed by Håkon Wium Lie in 1994.' },
          { text: 'A browser company, in 2010', why: 'It was 1994, at CERN.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each date to what happened.',
        pairs: [
          ['1989', 'Berners-Lee proposes the web'],
          ['October 1994', 'Lie proposes style sheets'],
          ['December 1996', 'CSS level 1 becomes a W3C recommendation'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What problem was CSS made to solve?',
        options: [
          { text: 'Pages mixed looks into HTML, so they were hard to read and change' },
          { text: 'Pages couldn\'t play music', why: 'That came later, with audio.' },
          { text: 'There were too many websites', why: 'It was about keeping looks separate from content.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Same HTML, new look: give the page a darkslateblue background and gold text',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  body { background-color: darkslateblue; color: gold; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'body { background-color: darkslateblue; color: gold; }',
        checks: [
          { message: 'A darkslateblue page', dom: { selector: 'body', style: 'background-color', styleValue: 'darkslateblue' } },
          { message: 'Gold text', dom: { selector: 'body', style: 'color', styleValue: 'gold' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false about CSS?',
        groups: ['True', 'False'],
        items: [
          { text: 'It was proposed at CERN', group: 0 },
          { text: 'It replaced HTML', group: 1 },
          { text: 'Bert Bos helped shape it', group: 0 },
          { text: 'It was invented last decade', group: 1 },
          { text: 'One HTML page can have many looks', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Why is it called "cascading"?',
        options: [
          { text: 'Styles come from several places and flow together, with rules for which one wins.' },
          { text: 'Because it\'s about waterfalls.', why: 'Nice image, but it\'s about styles combining.' },
          { text: 'No reason.', why: 'There\'s a reason: styles cascade and combine.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the false statement.',
        lines: ['CSS keeps looks separate from HTML.', 'CSS 1 arrived in December 1996.', 'You must rewrite the HTML to change a page\'s colours.'],
        bug: 2,
        explanation: 'Change the CSS, keep the HTML. That was the whole idea.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the name of the original proposal.',
        template: '[[1]] HTML [[2]] Sheets',
        blanks: [['Cascading'], ['Style']],
        distractors: ['Colour', 'Page', 'Font'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At which research centre was CSS proposed? (one word)',
        answers: ['cern'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which sentence best sums up the idea behind CSS?',
        options: [
          { text: 'HTML says what things are; CSS says how they look' },
          { text: 'CSS is a faster HTML', why: 'They do different jobs.' },
          { text: 'CSS is only for colours', why: 'Also fonts, spacing, layout and more.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Lie and Berners-Lee gave their ideas away for everyone to use. What do you think the web would look like if they hadn\'t?',
    starters: ['If they hadn\'t...', 'I think...'],
  },
  deepen: {
    title: 'Read the source',
    summary: 'Search "Cascading HTML Style Sheets proposal Håkon Wium Lie 1994". The original proposal is still online and surprisingly short.',
  },
  notes: 'Lie, H. W. (10 Oct 1994), "Cascading HTML style sheets – a proposal", CERN. Bert Bos co-developed CSS. CSS level 1 became a W3C Recommendation on 17 December 1996. Checked against W3C\'s CSS history pages.',
};

export default lesson;

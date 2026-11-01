import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 3 · Lesson 17 — "one-line accessibility" overlay widgets vs fixing the HTML. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The one-line fix that isn\'t',
  summary: 'An ad pops up for Kofi: "Make your website 100% accessible with ONE line of code! Just add our widget." It costs a monthly fee. His site is already nearly there. Choose what he does.',
  minutes: 11,
  outcomes: ['Recognise claims that a widget can make a site accessible', 'Explain why fixing the HTML is the real solution', 'Ask disabled users for feedback instead of guessing'],
  learn: [
    {
      kind: 'story',
      title: '"100% accessible!"',
      beats: [
        { speaker: 'narrator', text: 'The ad shows a little floating button with a person icon. "One line of code. Instant compliance. Monthly plan."' },
        { speaker: 'kofi', text: 'Could I skip all the testing and just add that?' },
        { speaker: 'narrator', text: 'Kofi asks Kwesi. His reply: "Please don\'t. Those widgets often get in my way. My screen reader already does what I need, if your HTML is good."' },
        { speaker: 'miracle', text: 'There\'s no shortcut. The structure has to be right in the page itself.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Skip the widget. Keep fixing the HTML and CSS, run the checks, and ask Kwesi and others for feedback.',
            outcome: 'The site works with the tools disabled people already use. No monthly fee, and nothing gets in the way.',
            best: true,
          },
          {
            text: 'Add the widget and stop testing.',
            outcome: 'The overlay can\'t fix missing structure or bad link text, and it can clash with Kwesi\'s screen reader. Kofi pays monthly for a worse site.',
          },
          {
            text: 'Add the widget AND keep fixing things.',
            outcome: 'The fixes help; the widget still gets in the way of some users. It\'s spending money to add a problem.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Why there\'s no one-line fix:</strong> accessibility lives in the page itself: the right elements, headings, names, labels, contrast and keyboard access. A widget added on top can\'t truly fix a missing label or a meaningless link. Many disabled users and accessibility experts have spoken out against "overlay" widgets that promise instant compliance. Disabled people already have their own tools, like screen readers and zoom, which work best on well-built pages.</p>',
    },
    {
      kind: 'tryIt',
      title: 'What really fixes it',
      caption: 'Every fix on this card is in the HTML and CSS itself: a heading, a named link, alt text, contrast, a focus outline.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  article { background-color: #1F2E52; border-radius: 12px; padding: 16px; max-width: 280px; }\n  img { width: 100%; height: auto; border-radius: 8px; }\n  a { color: #FFC83D; }\n  a:focus-visible { outline: 3px solid #FFF6E5; outline-offset: 3px; }\n</style>\n<article>\n  <h2>Sunrise in Osu</h2>\n  <img src="cover-1.png" alt="Sunrise in Osu cover: an orange sun rising over the sea" width="400" height="400">\n  <p><a href="#play">Play Sunrise in Osu</a></p>\n</article>\n',
      challenge: 'Name each accessibility fix on the card, one by one.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'No widget makes a site accessible. Build it right, test it, and ask disabled users.',
    },
  ],
  apply: {
    scenario: 'The one-line fix that isn\'t.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t an add-on widget make a site fully accessible?',
        options: [
          { text: 'Widgets are too expensive', why: 'The problem is what they can\'t do.' },
          { text: 'It can, instantly', why: 'Missing structure can\'t be bolted on.' },
          { text: 'Accessibility depends on the page\'s own structure, names and labels, which a widget can\'t truly fix' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the real fix: give the link a name that says where it goes, "Play Sunrise in Osu", instead of "Click"',
        starter: '<article>\n  <h2>Sunrise in Osu</h2>\n  <p><a href="#play">Click</a></p>\n</article>\n',
        solution: '<article>\n  <h2>Sunrise in Osu</h2>\n  <p><a href="#play">Play Sunrise in Osu</a></p>\n</article>\n',
        hint: '<a href="#play">Play Sunrise in Osu</a>',
        checks: [
          { message: 'A clear link name', dom: { selector: 'a[href="#play"]', text: 'Play Sunrise in Osu' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Fix the HTML and ask users', 'Works with their own tools'],
          ['Widget instead of testing', 'Paying for a worse site'],
          ['Widget plus fixes', 'Still gets in some users\' way'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A real fix, or a shortcut that doesn\'t work?',
        groups: ['Real fix', 'Fake shortcut'],
        items: [
          { text: 'Adding a label to a form field', group: 0 },
          { text: 'A floating "accessibility" button over a broken page', group: 1 },
          { text: 'A clean heading outline', group: 0 },
          { text: '"One line of code, 100% compliant"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The ad says it guarantees legal compliance.',
        options: [
          { text: 'Then buy it.', why: 'The guarantee doesn\'t make the site work.' },
          { text: 'No widget can guarantee that. What counts is whether the site actually works for disabled people.' },
          { text: 'Ignore laws completely.', why: 'Build it right instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the fake fix.',
        lines: ['Give every image meaningful alt text.', 'Add a widget so you don\'t need alt text.', 'Make every link say where it goes.'],
        bug: 1,
        explanation: 'A widget can\'t know what your pictures mean. Write the alt text yourself.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A widget is added, but this image still has no alt. What does Kwesi hear?',
        code: '<img src="IMG_2041.jpg">',
        language: 'html',
        options: [
          { text: 'A perfect description', why: 'Only the author knows what the picture means.' },
          { text: 'A song', why: 'He hears what\'s in the HTML.' },
          { text: 'Probably the file name, or nothing useful' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s advice.',
        template: 'Build it [[1]], test it, and ask [[2]] users.',
        blanks: [['right', 'properly'], ['disabled']],
        distractors: ['fast', 'random', 'widget'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who knows best whether your site works with a screen reader? (two words: ___ users)',
        answers: ['screen reader', 'screen reader users', 'disabled', 'disabled users'],
        placeholder: 'Who',
      },
      {
        kind: 'mcq',
        prompt: 'Where does accessibility really live?',
        options: [
          { text: 'In the page\'s own HTML and CSS' },
          { text: 'In a widget on top', why: 'It has to be in the page itself.' },
          { text: 'In the hosting plan', why: 'It\'s in the code you write.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you seen ads that promise to fix something hard with one click? Why do they work on people?',
    starters: ['I\'ve seen...', 'They work because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "accessibility overlay fact sheet" and read why many disabled people and experts oppose overlay widgets.',
  },
  notes: 'The Overlay Fact Sheet (2021) signed by hundreds of accessibility practitioners and disabled users opposes overlay products. No specific product is named. Legal compliance depends on the site itself; kept general.',
};

export default lesson;

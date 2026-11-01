import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1 — opens the chapter: Efua says the page "looks like 1996". The first CSS rule, live. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"It looks like 1996"',
  summary: 'Mensah Beats works: links, photos, beats you can play. Efua opens it, scrolls once and says: "It works. It also looks like 1996." Black text, white page, blue links. Time to meet CSS.',
  minutes: 11,
  outcomes: ['Explain what CSS does that HTML doesn\'t', 'Write your first CSS rule and see it change the page', 'Keep HTML for meaning and CSS for looks'],
  learn: [
    {
      kind: 'story',
      title: 'Efua\'s review',
      beats: [
        { speaker: 'narrator', text: 'Nine weeks to uni. The organiser has booked Kofi. Efua opens Mensah Beats on her phone and scrolls in silence.' },
        { speaker: 'efua', text: 'It works. Everything plays. It also looks like 1996. Black on white, blue links, Times New Roman. Your beats sound like sunset in Osu. Your page looks like a tax form.' },
        { speaker: 'kofi', text: 'HTML doesn\'t do colours!' },
        { speaker: 'tey', text: 'Correct, and that\'s on purpose. HTML says what things are. Another language says how they look: CSS. One line of CSS and that page changes colour. Want to see?' },
      ],
      choice: {
        prompt: 'How should Kofi make his page look good?',
        options: [
          {
            text: 'Learn CSS, starting with one small rule, and keep his HTML clean.',
            outcome: 'One rule turns his heading orange. Then another sets the background. Twenty minutes later Efua says, "Okay. Now it\'s a website."',
            best: true,
          },
          {
            text: 'Make the important words bigger by using h1 everywhere.',
            outcome: 'The page gets louder, not better, and Ama\'s screen reader announces nine main headings.',
          },
          {
            text: 'Give up and screenshot a nice-looking website template instead.',
            outcome: 'A picture of a website isn\'t a website. Nothing on it can be clicked, played or found.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Your first rule',
      caption: 'The style tag holds CSS. Run it, then change orange to any colour you like.',
      code: '<style>\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>\n',
      challenge: 'Change orange to deeppink. Then try tomato.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'HTML says what things are. CSS says how they look. Your first rule: h1 { color: orange; }',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> where CSS came from, how a rule works, where styles live, colours, text and fonts, which rule wins, and how to find a broken style. The climax: Mensah Beats v0.4, a page that finally looks like Kofi\'s music.</p>',
    },
  ],
  apply: {
    scenario: 'Kofi meets CSS.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does CSS do?',
        options: [
          { text: 'Says what things on the page are', why: 'That\'s HTML\'s job.' },
          { text: 'Says how the page looks: colours, fonts, spacing' },
          { text: 'Makes beats play', why: 'audio does that, in HTML.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Turn Kofi\'s heading orange with one CSS rule inside the style tag',
        starter: '<style>\n\n</style>\n<h1>Mensah Beats</h1>\n',
        solution: '<style>\n  h1 { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n',
        hint: 'h1 { color: orange; }',
        checks: [
          { message: 'The heading is orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'HTML\'s job or CSS\'s job?',
        groups: ['HTML', 'CSS'],
        items: [
          { text: 'This is the main heading', group: 0 },
          { text: 'The heading is orange', group: 1 },
          { text: 'This is a list of beats', group: 0 },
          { text: 'The page background is dark blue', group: 1 },
          { text: 'The font is rounded and friendly', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can\'t I just put everything in h1 so it\'s big?',
        options: [
          { text: 'Headings are for meaning. If I want big text, CSS makes it big.' },
          { text: 'Yes, h1 means big.', why: 'h1 means "the main heading". Size is CSS.' },
          { text: 'Only on Saturdays.', why: 'Ha. Meaning in HTML, looks in CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that uses HTML for looks.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h1>Made in Accra</h1>', '<p>Beats for late nights.</p>'],
        bug: 1,
        explanation: 'A second h1 just to make text big. Use p, then make it bigger with CSS if you want.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Learn CSS, one rule at a time', '"Now it\'s a website"'],
          ['h1 everywhere', 'Nine main headings for Ama\'s reader'],
          ['A screenshot of a template', 'Nothing to click or play'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this page show?',
        code: '<style>\n  p { color: deeppink; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Beats from Accra.</p>',
        language: 'html',
        options: [
          { text: 'A pink heading and black paragraph', why: 'The rule picks p, not h1.' },
          { text: 'A black heading and a pink paragraph' },
          { text: 'Everything pink', why: 'Only p elements are picked.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule that makes the heading tomato red.',
        language: 'css',
        template: 'h1 { [[1]]: tomato; }',
        blanks: [['color']],
        distractors: ['colour', 'paint', 'text'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which HTML tag holds CSS inside a page? (one word, no brackets)',
        answers: ['style'],
        placeholder: 'A tag name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it belong in the page\'s HTML?',
        groups: ['Yes', 'No, that\'s CSS'],
        items: [
          { text: 'An audio player for Jollof Bounce', group: 0 },
          { text: 'Orange headings', group: 1 },
          { text: 'A link to Instagram', group: 0 },
          { text: 'A rounded font', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a website you love the look of. What three things make it look that way?',
    starters: ['The site is...', 'It looks good because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open the Code playground and give your own page one rule: your favourite colour on your h1.',
  },
  notes: 'Opens Chapter 4 (Hello, CSS). Default browser styles (black text, blue links, a serif font) are why unstyled pages look "1996". Named colours like orange and deeppink are standard CSS colour keywords.',
};

export default lesson;

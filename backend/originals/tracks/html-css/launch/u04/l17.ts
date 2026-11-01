import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 17 — fake reviews and bought links vs honest growth and Search Console. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: '"500 five-star reviews, GHS 150"',
  summary: 'A message arrives: "Boost your music site! 500 five-star reviews and 1,000 backlinks, only GHS 150." The launch is in two days and Kofi is tempted. Choose what he does.',
  minutes: 11,
  outcomes: ['Explain why fake reviews and bought links are harmful', 'Grow honestly: real testimonials and real links', 'Use a search console to see how the site is found'],
  learn: [
    {
      kind: 'story',
      title: 'A tempting offer',
      beats: [
        { speaker: 'narrator', text: 'The message has a lot of exclamation marks. "500 five-star reviews! 1,000 backlinks! Top of Google!"' },
        { speaker: 'kofi', text: 'It\'s only GHS 150, and the launch is in two days.' },
        { speaker: 'efua', text: 'You\'d have 500 reviews from people who\'ve never heard your music.' },
        { speaker: 'miracle', text: 'And search engines are good at spotting exactly this. It\'s the fastest way to lose trust, from people and from search.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Decline. Ask the organiser and two real clients for short quotes he can show, ask partner sites to link to him, and add the site to a search console to see how it\'s found.',
            outcome: 'Three real quotes from real people, a link from the Sound Up Saturdays site, and a free dashboard showing which searches bring people in.',
            best: true,
          },
          {
            text: 'Buy the package: 500 reviews and 1,000 links.',
            outcome: 'The reviews are obviously fake, the links come from spam sites, and search engines can lower the site in results or ignore it.',
          },
          {
            text: 'Write a few glowing reviews himself under made-up names.',
            outcome: 'It\'s dishonest, it\'s fake reviews either way, and if anyone finds out, nobody trusts the real ones.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Honest growth:</strong> real quotes from real people, with their permission ("Kofi had the whole room dancing." Organiser, Sound Up Saturdays). Real links from sites you actually work with. And a free <strong>search console</strong>, like Google Search Console, which shows which searches lead to your site, which pages are indexed, and any problems. Check its current terms when you sign up.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Real words from real people',
      caption: 'A quote with permission, marked up with blockquote and a clear source.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  blockquote { border-left: 4px solid #FFC83D; margin: 16px 0; padding: 4px 16px; }\n</style>\n<section>\n  <h2>What people say</h2>\n  <blockquote>\n    <p>"Kofi had the whole room dancing until the lights came on."</p>\n    <footer>The organiser, Sound Up Saturdays</footer>\n  </blockquote>\n</section>\n',
      challenge: 'Add a second real-sounding quote from Efua, as a client who booked him for a party.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never buy reviews or links, and never write fake ones. Ask real people, with permission.',
    },
  ],
  apply: {
    scenario: 'The tempting offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why are bought reviews and links a bad idea?',
        options: [
          { text: 'They\'re fake, they mislead people, and search engines treat them as spam' },
          { text: 'They\'re too expensive', why: 'The problem is they\'re dishonest and spammy.' },
          { text: 'They\'re fine if cheap', why: 'Price isn\'t the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a real quote: a blockquote with the paragraph "Kofi had the whole room dancing." and a footer "The organiser, Sound Up Saturdays"',
        starter: '<section>\n  <h2>What people say</h2>\n\n</section>\n',
        solution: '<section>\n  <h2>What people say</h2>\n  <blockquote>\n    <p>"Kofi had the whole room dancing."</p>\n    <footer>The organiser, Sound Up Saturdays</footer>\n  </blockquote>\n</section>\n',
        hint: '<blockquote><p>...</p><footer>...</footer></blockquote>',
        checks: [
          { message: 'A quote', dom: { selector: 'blockquote p', text: 'dancing' } },
          { message: 'Saying who said it', dom: { selector: 'blockquote footer', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Real quotes, real links, search console', 'Trust and useful data'],
          ['Buy the package', 'Spam signals, site can drop'],
          ['Write fake reviews himself', 'Nobody trusts any of them'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest growth, or not?',
        groups: ['Honest', 'Not honest'],
        items: [
          { text: 'A quote from the organiser, with permission', group: 0 },
          { text: '500 bought five-star reviews', group: 1 },
          { text: 'A link from the venue\'s website', group: 0 },
          { text: 'Reviews written under made-up names', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Everyone buys reviews. How would anyone know?',
        options: [
          { text: 'Nobody would know.', why: 'Fake reviews are often spotted.' },
          { text: 'People and search engines spot fake patterns, and in many places fake reviews break consumer rules. Real quotes are worth more.' },
          { text: 'Buy even more so it looks real.', why: 'More fakes, more risk.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the quote Kofi shouldn\'t publish.',
        language: 'html',
        lines: ['<blockquote>"Kofi had the whole room dancing." The organiser, Sound Up Saturdays</blockquote>', '<blockquote>"Best producer in the world!!!" A. Customer</blockquote>', '<blockquote>"Easy to book, arrived on time." Efua, party host</blockquote>'],
        bug: 1,
        explanation: 'No real person said it. Only publish real quotes, with permission.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What can a search console show Kofi?',
        code: 'Search console: mensahbeats.example.app',
        language: 'html',
        options: [
          { text: 'His bank balance', why: 'It\'s about search.' },
          { text: 'Who visited by name', why: 'It shows search data, not names.' },
          { text: 'Which searches lead to his site, which pages are indexed, and problems to fix' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Mark up a real quote.',
        language: 'html',
        template: '<[[1]]>\n  <p>"Easy to book."</p>\n  <[[2]]>Efua, party host</footer>\n</blockquote>',
        blanks: [['blockquote'], ['footer']],
        distractors: ['quote', 'cite-box', 'header'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What free tool shows which searches lead people to your site? (two words: search ___)',
        answers: ['console', 'search console'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Before publishing someone\'s quote, what should Kofi do?',
        options: [
          { text: 'Nothing, quotes are free to use', why: 'Ask first.' },
          { text: 'Ask their permission' },
          { text: 'Change the words to sound better', why: 'Keep their real words.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Who could give you a real quote for your own site?',
    starters: ['I could ask...', 'They\'d say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one or two real people for a short quote you can show, with permission. If you want search data, sign up for a search console (check its current terms) and add your site.',
  },
  notes: 'Fake reviews are prohibited by many consumer protection regulators; link schemes and spam are against search engine spam policies. Google Search Console is free. blockquote with footer for attribution is common HTML practice.',
};

export default lesson;

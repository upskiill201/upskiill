import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. Where the web came from: Berners-Lee at CERN, the first website, and why it's free. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The web was born at CERN',
  summary: 'In 1989 a scientist at a physics lab near Geneva got tired of losing documents. His fix became the World Wide Web, and he gave it away for free. That\'s why Kofi can build a website tonight.',
  minutes: 11,
  outcomes: ['Say who invented the web, where and when', 'Explain what HTML stands for', 'Say why anyone can make a website for free'],
  learn: [
    {
      kind: 'reading',
      title: 'A scientist who kept losing things',
      html:
        '<p>In 1989, <strong>Tim Berners-Lee</strong>, a British scientist, was working at <strong>CERN</strong>, the huge physics lab on the border of France and Switzerland, near Geneva. Thousands of researchers came and went, and their documents lived on different computers that couldn\'t talk to each other. Information got lost all the time.</p>' +
        '<p>So he wrote a proposal: documents on any computer, <strong>linked</strong> to each other, so you could jump from one to the next. His boss wrote three words on the cover: "Vague but exciting."</p>' +
        '<p>He built it anyway. He wrote the first <strong>web browser</strong>, the first <strong>web server</strong> (the computer that hands out pages), and a simple language to write the pages in: <strong>HTML</strong>, HyperText Markup Language. "Hypertext" means text with links in it. "Markup" means labels around your words, like <code>&lt;h1&gt;</code>.</p>' +
        '<p>On <strong>6 August 1991</strong> the first website went public, at <strong>info.cern.ch</strong>. It explained what the web was and how to make your own pages. It\'s been restored, and you can still visit it.</p>' +
        '<p>Then came the decision that changed everything. In 1993, CERN made the web\'s software free for anyone to use, forever, with no fees. That\'s why a 17-year-old in Accra can build a website tonight without asking anyone\'s permission.</p>',
    },
    {
      kind: 'image',
      url: '/originals/html-css/phone-studio.png',
      alt: 'A phone showing a sound wave and a red record button, Kofi\'s whole music studio.',
      caption: 'Kofi\'s studio: one phone. His website will be one file. Same energy.',
    },
    {
      kind: 'tryIt',
      title: 'Make it like 1991',
      caption: 'The first website was mostly a heading and plain text. Here\'s Kofi\'s version. It already works.',
      code: '<h1>Mensah Beats</h1>\nBeats made on a phone in Accra.\n',
      challenge: 'Change the second line to say where YOU are from.',
    },
  ],
  apply: {
    scenario: 'Kofi tells Clinton and David what he learned.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who invented the World Wide Web?',
        options: [
          { text: 'Tim Berners-Lee, at CERN' },
          { text: 'A team at Google', why: 'Google came along in 1998. The web was already nine years old.' },
          { text: 'Mark Zuckerberg', why: 'Facebook came in 2004, built on top of the web. The web itself came from Tim Berners-Lee at CERN.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each date to what happened.',
        pairs: [
          ['1989', 'Berners-Lee proposes the web'],
          ['6 August 1991', 'The first website goes public'],
          ['1993', 'CERN makes the web free for everyone'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'What HTML stands for.',
        template: '[[1]] Markup Language',
        blanks: [['HyperText', 'Hypertext']],
        distractors: ['Hyper', 'Home', 'Huge'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a main heading that says The first website',
        starter: '',
        solution: '<h1>The first website</h1>\n',
        hint: '<h1>, the words, then </h1>.',
        checks: [{ message: 'A main heading that says The first website', dom: { selector: 'h1', text: 'The first website' } }],
      },
      {
        kind: 'mcq',
        prompt: 'What does "hypertext" mean?',
        options: [
          { text: 'Very large text', why: 'Hyper here means "beyond": text that goes beyond the page, through links.' },
          { text: 'Text that moves', why: 'Moving text came much later. Hypertext is about links.' },
          { text: 'Text with links in it, so you can jump to other pages' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Bro, websites cost money. My cousin paid a guy 2,000 cedis for one.',
        options: [
          { text: 'You\'re right, I\'ll give up.', why: 'Clinton is half right: people pay for design, but the web itself is free to build on.' },
          { text: 'The web is free for anyone to build on. CERN made sure of that in 1993. I\'m writing mine myself.' },
          { text: 'I\'ll ask for 2,000 cedis for my birthday.', why: 'He could, but HTML is free, and so are browsers. Kofi just needs time.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The first website\'s address was info.____.ch. What goes in the gap?',
        answers: ['cern'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Did Tim Berners-Lee make it, or did it come later?',
        groups: ['Berners-Lee made it', 'Came later'],
        items: [
          { text: 'The first web browser', group: 0 },
          { text: 'HTML', group: 0 },
          { text: 'Instagram', group: 1 },
          { text: 'The first web server', group: 0 },
          { text: 'Smartphones', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can Kofi build a website without paying anyone?',
        options: [
          { text: 'Because CERN made the web free for everyone to use and build on' },
          { text: 'Because he is a student', why: 'Students get no special deal. The web is free for everyone.' },
          { text: 'Because websites are illegal to sell', why: 'People sell websites all the time. Building one yourself just costs nothing.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a 1991-style page: a main heading that says Mensah Beats, and under it the words Made in Accra',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\nMade in Accra\n',
        hint: 'Keep the heading. On a new line under it, type Made in Accra. No tags needed for plain text.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The page says Made in Accra', outputIncludes: 'Made in Accra' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Berners-Lee could have charged money for the web. He gave it away. What do you think the internet would look like if he hadn\'t?',
    starters: ['If the web cost money...', 'I think...'],
  },
  deepen: {
    title: 'Visit the first website',
    summary: 'Open info.cern.ch in your browser. That\'s the restored first website. Notice how simple it is: headings, text and links. That\'s exactly what you\'re learning now.',
  },
  notes: 'Sources: CERN, "A short history of the Web" (home.cern/science/computing/birth-web/short-history-web) and "The birth of the Web": proposal March 1989 ("Information Management: A Proposal"); supervisor Mike Sendall wrote "Vague but exciting" on the cover; first browser/editor WorldWideWeb and first server (httpd) on a NeXT computer, 1990; info.cern.ch first site; Berners-Lee posted the project publicly to alt.hypertext on 6 August 1991; CERN put the web software in the public domain on 30 April 1993. info.cern.ch restored by CERN in 2013.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The hook: a gig offer that needs a website, and Kofi's first live page. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Send me your website"',
  summary: 'A gig offer lands in Kofi\'s DMs with one condition: send a website. He has beats, fans and no website. You put his name on a real web page in the first two minutes.',
  minutes: 11,
  outcomes: ['Say what a website is', 'Put words on a real web page', 'Change your page and watch it update'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday, 11:12pm',
      beats: [
        { speaker: 'narrator', text: 'Osu, Accra. Twelve weeks before university. Kofi is in bed, headphones on, making a beat on his phone, when a message arrives.' },
        { speaker: 'narrator', text: '"Hi Mensah Beats! We run Sound Up Saturdays. We\'d love you to play a set. Send me your website so I can share it with our crowd."' },
        { speaker: 'kofi', text: 'A gig. A REAL gig. Okay. Website. I have a... I have a WhatsApp status.' },
        { speaker: 'narrator', text: 'His beats are scattered across forty-two voice notes in four group chats. He video-calls Miracle in Lagos.' },
        { speaker: 'miracle', text: 'Kofi, it\'s nearly midnight. Somebody had better be on fire.' },
        { speaker: 'kofi', text: 'Sound Up Saturdays wants my website. I don\'t have one. Do I need an app? A designer? Money?' },
        { speaker: 'miracle', text: 'You need one file and some patience. A website is just pages, and a page is just text with labels on it. I can show you tonight.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: '"Show me. I want to build it myself."',
            outcome: 'Miracle shares her screen. Good call: a site you build yourself is one you can change the night before a gig.',
            best: true,
          },
          {
            text: '"I\'ll pay someone on Instagram to make it."',
            outcome: 'That can work, but every change means paying and waiting again. And Kofi has about zero cedis.',
          },
          {
            text: '"I\'ll just send him my voice notes."',
            outcome: 'Organisers share links, not forty-two voice notes. A website is one link that has everything.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A website is a set of pages. Each page is a file written in HTML: your words, with labels that tell the browser what each part is.',
    },
    {
      kind: 'tryIt',
      title: 'Your first web page',
      caption: 'This is a real web page. The label h1 means "the main heading", so the browser shows it big and bold. Look at the page under the code.',
      code: '<h1>Mensah Beats</h1>\n',
      challenge: 'Change Mensah Beats to your own name. Watch the page change as you type.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s first night of building.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a website?',
        options: [
          { text: 'An app you download from a store', why: 'You open a website in a browser. Nothing to download.' },
          { text: 'A set of pages, each one a file written in HTML' },
          { text: 'A WhatsApp status that stays up', why: 'Kofi wishes. A status disappears after a day; a website stays up for anyone with the link.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a main heading that says Mensah Beats',
        starter: '',
        solution: '<h1>Mensah Beats</h1>\n',
        hint: 'Start with <h1>, then the words, then </h1>.',
        checks: [{ message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } }],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this page show?',
        code: '<h1>Sound Up Saturdays</h1>',
        language: 'html',
        options: [
          { text: '<h1>Sound Up Saturdays</h1>', why: 'The labels in angle brackets are instructions for the browser. They are not shown.' },
          { text: 'Nothing, it needs an app', why: 'Every browser understands HTML on its own.' },
          { text: 'Sound Up Saturdays, big and bold' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does Kofi need it to make a website?',
        groups: ['Needs it', 'Doesn\'t need it'],
        items: [
          { text: 'A file written in HTML', group: 0 },
          { text: 'A paid designer', group: 1 },
          { text: 'A browser to look at it', group: 0 },
          { text: 'An app from an app store', group: 1 },
          { text: 'Something to say', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the heading.',
        language: 'html',
        template: '<[[1]]>Mensah Beats</[[2]]>',
        blanks: [['h1'], ['h1']],
        distractors: ['head', 'big', 'p'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Before we start: what do you want people to DO on your website?',
        options: [
          { text: 'Look at it, I guess?', why: 'Miracle wants something more specific. A clear goal tells you what to build first.' },
          { text: 'Hear my beats, find my next gig, and book me.' },
          { text: 'I don\'t know yet, let\'s just make it look cool.', why: 'Cool is good, but a page with a clear job is easier to build and works better.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a main heading that says Beats',
        language: 'html',
        tiles: ['<h1>', 'Beats', '</h1>'],
        distractors: ['<h1/>', '</p>'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What letters go inside the brackets to make a main heading? < ? >',
        answers: ['h1'],
        placeholder: 'Two characters',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Website', 'A set of pages with one address'],
          ['Page', 'One file written in HTML'],
          ['Browser', 'The app that shows pages, like Chrome'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Kofi wants the page to shout about the gig. Change the heading to Live at Sound Up Saturdays',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Live at Sound Up Saturdays</h1>\n',
        hint: 'Keep <h1> and </h1>. Only change the words between them.',
        checks: [{ message: 'The heading says Live at Sound Up Saturdays', dom: { selector: 'h1', text: 'Live at Sound Up Saturdays' } }],
      },
    ],
  },
  reflect: {
    prompt: 'If you had your own website tomorrow, what would it be for? Your work, a hobby, a business, something you love?',
    starters: ['My website would be for...', 'I\'d want people to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open the Code playground, switch to HTML & CSS, and make a page with your name as the main heading.',
  },
  notes: 'Kofi, Miracle, Clinton and David are shared cast (docs/originals/CAST.md); this course is the summer after Study Smarter with AI, before Kofi starts university. Miracle has just joined Afiya in Lagos. Sound Up Saturdays is fictional. h1 = top-level heading (HTML Living Standard, §4.3.6).',
};

export default lesson;

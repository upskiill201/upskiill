import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — the learner's own page begins: their name and a line about them. Grows every chapter. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Your own page begins',
  summary: 'Miracle has a challenge for you, not just Kofi: start your OWN page. Your name, a line about you, the things you love. It grows every chapter, and in the last one you put it on the internet.',
  minutes: 12,
  outcomes: ['Start a personal page with your name', 'Write a few true lines about yourself in HTML', 'Plan what your page will grow into'],
  learn: [
    {
      kind: 'steps',
      title: 'Two pages, one course',
      steps: [
        { title: 'Kofi\'s page', body: 'Kofi\'s site is for his music: beats, gigs, bookings. You\'ve been helping him build it, and you\'ll keep going.', code: '<h1>Mensah Beats</h1>\n<p>Beats made on a phone in Accra.</p>', language: 'html' },
        { title: 'Your page', body: 'From today, you build your own page too, about whatever you like: your work, a hobby, your city, your dog. It\'s yours.', code: '<h1>Your name</h1>\n<p>One true line about you.</p>', language: 'html' },
        { title: 'It grows every chapter', body: 'Every Chapter Challenge adds something to your page: lists, links, pictures, colours, layout. By the last chapter it\'s a real website, and you publish it on the internet with a link to share.' },
        { title: 'Keep it safe', body: 'Use your first name, a nickname or a made-up one. Never put your address, phone number or anything private on a public page.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Start yours',
      caption: 'This is the start of your page. Replace the words with yours.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My page</title>\n</head>\n<body>\n  <h1>Your name</h1>\n  <p>One true line about you.</p>\n</body>\n</html>\n',
      challenge: 'Put your name in the h1 and the title, and write a line about yourself.',
    },
  ],
  apply: {
    scenario: 'You start your own page.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Put your name (or a nickname) in the main heading',
        starter: '<h1></h1>\n',
        solution: '<h1>Ada</h1>\n',
        hint: 'Type your name between <h1> and </h1>.',
        checks: [{ message: 'A main heading with your name in it', dom: { selector: 'h1:not(:empty)', count: 1 } }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to put on your public page, or keep private?',
        groups: ['Fine to share', 'Keep private'],
        items: [
          { text: 'Your first name or a nickname', group: 0 },
          { text: 'Your home address', group: 1 },
          { text: 'Things you love doing', group: 0 },
          { text: 'Your phone number', group: 1 },
          { text: 'The city you live in', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What will happen to your page by the end of the course?',
        options: [
          { text: 'It gets deleted after each lesson', why: 'Your page keeps growing, chapter by chapter.' },
          { text: 'It stays a one-line page', why: 'Each chapter adds something: lists, links, pictures, colours, layout.' },
          { text: 'It grows every chapter, and you publish it on the internet' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a paragraph under your name with one true line about you',
        starter: '<h1>Your name</h1>\n',
        solution: '<h1>Your name</h1>\n<p>I love football and jollof.</p>\n',
        hint: 'A <p> with any sentence about you, under the h1.',
        checks: [
          { message: 'Your main heading', dom: { selector: 'h1', count: 1 } },
          { message: 'A paragraph about you', dom: { selector: 'p:not(:empty)', min: 1 } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'So, what\'s YOUR page going to be about?',
        options: [
          { text: 'Something I actually care about, so I want to keep building it.' },
          { text: 'Whatever is easiest.', why: 'Easy pages are boring to build. Pick something you care about and you\'ll keep going.' },
          { text: 'A copy of Kofi\'s page.', why: 'Kofi\'s page is about Kofi. Yours should be about you.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put your page\'s skeleton in order.',
        language: 'html',
        lines: ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<title>My page</title>', '</head>', '<body>', '<h1>Your name</h1>', '</body>', '</html>'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete your page\'s first two lines.',
        language: 'html',
        template: '<[[1]]>Your name</h1>\n<[[2]]>One true line about you.</p>',
        blanks: [['h1'], ['p']],
        distractors: ['title', 'h6', 'head'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your page to its tag.',
        pairs: [
          ['Your name on the tab', 'title'],
          ['Your name on the page', 'h1'],
          ['A line about you', 'p'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your page is in English. What attribute and value go on the html tag? (like name=value, without quotes)',
        answers: ['lang=en', 'lang en', 'langen'],
        placeholder: 'name=value',
      },
      {
        kind: 'writeCode',
        prompt: 'Make your page complete: put your name in the title (for the tab) and in the h1',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title></title>\n</head>\n<body>\n  <h1></h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Ada</title>\n</head>\n<body>\n  <h1>Ada</h1>\n</body>\n</html>\n',
        hint: 'Type your name between <title> and </title>, and again between <h1> and </h1>.',
        checks: [
          { message: 'A title for the tab', dom: { selector: 'head title:not(:empty)', count: 1 } },
          { message: 'Your name in the main heading', dom: { selector: 'body h1:not(:empty)', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do you want your page to be about by the end of the course? Write the one sentence it\'s for.',
    starters: ['My page is for...', 'By the end, I want it to have...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Copy your page into the Code playground (HTML & CSS) so you can keep working on it outside lessons. It saves on your device as you type.',
  },
  notes: 'Starts the learner\'s own page (outline decision 2, approved 2026-10-19). Checks use :not(:empty) so any name passes but an empty tag doesn\'t (CSS Selectors 4 :empty, supported by jsdom and every browser). Privacy line per playbook safety rules.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: the organiser's voice note. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the voice note',
  summary: 'The Sound Up Saturdays organiser sends a voice note: "How is the website coming?" Kofi needs to show something. Everything from your first four lessons, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how a page gets from a server to your screen', 'Write headings with opening and closing tags', 'Fix a missing closing tag'],
  learn: [
    {
      kind: 'story',
      title: 'The voice note',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 4:30pm. Kofi\'s phone buzzes. A voice note from the Sound Up Saturdays organiser, 41 seconds long.' },
        { speaker: 'narrator', text: '"Hey Mensah Beats! How is the website coming? No pressure. Okay, small pressure. The flyers go out in a few weeks."' },
        { speaker: 'kofi', text: 'Small pressure. Okay. I know what a tag is. I know where the web came from. I can do this.' },
        { speaker: 'tey', text: 'Let\'s prove it. Four lessons, one quiz, and a page at the end that Kofi could actually show someone.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: show the organiser some progress.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where and when was the World Wide Web invented?',
        options: [
          { text: 'At Google, in 1998', why: 'Google arrived in 1998, nine years after the web was proposed.' },
          { text: 'At CERN, in 1989' },
          { text: 'At Apple, in 2007', why: '2007 is the first iPhone. The web was already 18 years old.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a main heading that says Mensah Beats is coming',
        starter: '',
        solution: '<h1>Mensah Beats is coming</h1>\n',
        hint: '<h1>, the words, </h1>.',
        checks: [{ message: 'A main heading that says Mensah Beats is coming', dom: { selector: 'h1', text: 'Mensah Beats is coming' } }],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Kofi types the address', 'The browser asks the server for the page', 'The server sends back the HTML file', 'The browser draws the page'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the mistake.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', 'Beats made on a phone', '<h1>Sound Up Saturdays<h1>'],
        bug: 2,
        fix: '<h1>Sound Up Saturdays</h1>',
        explanation: 'The closing tag is missing its slash.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['HTML', 'The language pages are written in'],
          ['Server', 'The computer that sends the page'],
          ['Closing tag', 'Says where an element ends'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this page show?',
        code: '<h1>Gig night</h1>\nSaturday, 8pm',
        language: 'html',
        options: [
          { text: 'Gig night and Saturday, 8pm, both as big headings', why: 'The heading ends at </h1>, so the second line is normal text.' },
          { text: 'Gig night as a big heading, then Saturday, 8pm in normal text' },
          { text: 'The tags and the words, exactly as typed', why: 'The browser reads the tags and doesn\'t show them.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the page so only Sound Up Saturdays is a heading',
        starter: '<h1>Sound Up Saturdays<h1>\nFree entry\n',
        solution: '<h1>Sound Up Saturdays</h1>\nFree entry\n',
        hint: 'The second <h1> needs a slash: </h1>.',
        checks: [
          { message: 'Only one main heading', dom: { selector: 'h1', count: 1 } },
          { message: 'The heading says Sound Up Saturdays', dom: { selector: 'h1', text: 'Sound Up Saturdays' } },
          { message: 'The page says Free entry', outputIncludes: 'Free entry' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True of HTML, or not?',
        groups: ['True', 'Not true'],
        items: [
          { text: 'It\'s free for anyone to use', group: 0 },
          { text: 'You need an app from a store to write it', group: 1 },
          { text: 'It labels words so the browser knows what they are', group: 0 },
          { text: 'The browser shows the tags on the page', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Kofi\'s heading.',
        language: 'html',
        template: '[[1]]Mensah Beats[[2]]',
        blanks: [['<h1>'], ['</h1>']],
        distractors: ['<h1/>', '<\\h1>', '<head>'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'So what are you telling the organiser?',
        options: [
          { text: 'I\'ll say it\'s done!', why: 'It isn\'t done. Promising too early means a very awkward Saturday.' },
          { text: 'I\'ll pretend I didn\'t hear the voice note.', why: 'Funny, but the organiser might give the slot to someone else.' },
          { text: 'That it\'s coming along, and I\'ll send the link before the flyers go out.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page Kofi could show today: a main heading Mensah Beats, then the text Website coming soon',
        starter: '',
        solution: '<h1>Mensah Beats</h1>\nWebsite coming soon\n',
        hint: 'One h1 element, then the plain text on the next line.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'Only one main heading', dom: { selector: 'h1', count: 1 } },
          { message: 'The page says Website coming soon', outputIncludes: 'Website coming soon' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Your first checkpoint is done. Which part of this first week clicked best for you: the history, how pages travel, or writing tags?',
    starters: ['What clicked was...', 'I want more practice with...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Make a "coming soon" page for something of your own: a heading with its name, and one line saying when it\'s coming.',
  },
  notes: 'Checkpoint 1 = last free lesson (playbook §3). Reviews l01–l04: what a website is, CERN 1989 / first site 1991, browser–server–file–draw, tags (opening, content, closing).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 4 · Lesson 1 — opens the chapter: not found on search; titles that say what each page is. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Nobody can find it',
  summary: 'A wedding planner in Kumasi tells the organiser she searched "beat producer Accra" and found nothing about Kofi. When Kofi searches the same words himself, Mensah Beats isn\'t on the first page, and his own browser tab just says "index". Choose what he does.',
  minutes: 11,
  outcomes: ['Explain what search engines need from a page', 'Write a page title that says what the page is', 'Give each page its own title'],
  learn: [
    {
      kind: 'story',
      title: 'Two days to uni',
      beats: [
        { speaker: 'narrator', text: 'Two days to uni. A wedding planner searched "beat producer Accra" and didn\'t find Mensah Beats.' },
        { speaker: 'kofi', text: 'I searched my own name and my site came up. Isn\'t that enough?' },
        { speaker: 'miracle', text: 'People who already know your name can find you. This chapter is about the people who don\'t. Start with the tab: what does it say?' },
        { speaker: 'kofi', text: '..."index".' },
      ],
      choice: {
        prompt: 'What should Kofi do first?',
        options: [
          {
            text: 'Give every page a clear, specific title and description, and make sure the words people search for are really on the page.',
            outcome: 'Search engines and people can both tell what each page is about. Over the following weeks, Mensah Beats starts appearing for searches like his.',
            best: true,
          },
          {
            text: 'Repeat "beat producer Accra" fifty times in tiny text at the bottom.',
            outcome: 'Search engines treat that as spam and can rank the page lower. And it looks broken to visitors.',
          },
          {
            text: 'Pay for an ad and forget the rest.',
            outcome: 'The ad shows while he pays. The site itself still says "index" and can\'t be found the moment he stops.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>Search engines read pages a bit like Kwesi\'s screen reader does:</strong> the title, the headings, the words, the links. The <strong>title</strong> is often the big clickable line in search results, so it should say what the page is: "Mensah Beats | Beat producer in Accra", not "index". Every page gets its own.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A title that says something',
      caption: 'Look at what would appear in a search result: the title, then a description. Change the title and imagine it in a list of results.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <style>body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }</style>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p>Beats from Accra, made late at night. Book Kofi for weddings, parties and club nights.</p>\n</body>\n</html>\n',
      challenge: 'Change the title to "index". Would you click that in a list of results?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Search engines read the title, headings and words. Every page gets its own clear title.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> how search works, titles and descriptions, writing for people, good file names and links, previews when your link is shared, a tab icon, fast images, honest practice, and telling search engines your site exists. The climax: Mensah Beats v1.9, ready to be found.</p>',
    },
  ],
  apply: {
    scenario: 'Nobody can find it.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the wedding planner not find Mensah Beats?',
        options: [
          { text: 'The site didn\'t clearly say what it is, so search engines couldn\'t match it to her search' },
          { text: 'Search engines only show big companies', why: 'Small sites appear when they clearly match the search.' },
          { text: 'Her phone was broken', why: 'The site itself needed clearer titles and words.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the title "index" with "Mensah Beats | Beat producer in Accra"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>index</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: '<title>Mensah Beats | Beat producer in Accra</title>',
        checks: [
          { message: 'The title names the site', dom: { selector: 'title', text: 'Mensah Beats' } },
          { message: 'And says what it is', dom: { selector: 'title', text: 'Beat producer in Accra' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Clear titles and real words', 'Starts appearing in searches'],
          ['Keyword stuffing', 'Treated as spam'],
          ['Ads only', 'Gone when the money stops'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A helpful title, or not?',
        groups: ['Helpful', 'Not helpful'],
        items: [
          { text: 'Mensah Beats | Beat producer in Accra', group: 0 },
          { text: 'index', group: 1 },
          { text: 'Gigs | Mensah Beats', group: 0 },
          { text: 'Home Home Home beats beats Accra', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'My site comes up when I search my name. Isn\'t that enough?',
        options: [
          { text: 'It helps people who already know me. New fans search for things like "beat producer Accra", so the site needs those words, honestly.' },
          { text: 'Yes, that\'s all you need.', why: 'New fans don\'t know your name yet.' },
          { text: 'Search engines can\'t read titles.', why: 'They use them a lot.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the title that will look worst in search results.',
        language: 'html',
        lines: ['<title>Book me | Mensah Beats</title>', '<title>Untitled</title>', '<title>Gigs | Mensah Beats</title>'],
        bug: 1,
        explanation: '"Untitled" tells nobody anything. Say what the page is.',
        fix: '<title>About Kofi | Mensah Beats</title>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Where might this title appear?',
        code: '<title>Mensah Beats | Beat producer in Accra</title>',
        language: 'html',
        options: [
          { text: 'In the browser tab and as the clickable line in search results' },
          { text: 'As the big heading on the page', why: 'That\'s the h1.' },
          { text: 'Nowhere', why: 'Tabs and search results use it.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'A specific title for the gigs page.',
        language: 'html',
        template: '<title>[[1]] | Mensah [[2]]</title>',
        blanks: [['Gigs'], ['Beats']],
        distractors: ['index', 'Page', 'Untitled'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which element is often the clickable line in search results? (tag name)',
        answers: ['title', '<title>'],
        placeholder: 'A tag',
      },
      {
        kind: 'mcq',
        prompt: 'Should every page on the site have the same title?',
        options: [
          { text: 'No: each page gets its own, saying what it is' },
          { text: 'Yes, to look consistent', why: 'Identical titles make pages hard to tell apart.' },
          { text: 'Only the home page needs one', why: 'Every page does.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would a stranger type into a search engine to find something like your site?',
    starters: ['They might type...', 'My title should say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give every page on your site its own clear title: the page first, then your site\'s name and what you do.',
  },
  notes: 'Opens Course 3, Chapter 4 (Found on search). Search engines use the title element heavily for result titles (Google Search Central, "title links"), though they may rewrite them. Keyword stuffing violates search spam policies.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19 — the most common beginner mistakes: closing tags, nesting, curly quotes, file names with spaces. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'The most common beginner mistakes',
  summary: 'Kofi copies a line from his notes app and the page breaks for no visible reason. The culprit: curly quotes. Myth or fact, the mistakes every beginner makes, and how to spot them fast.',
  minutes: 12,
  outcomes: ['Spot curly quotes and replace them', 'Name files without spaces', 'Check closing tags and nesting quickly'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Quotes are quotes. “ and " are the same thing.', isFact: false, explain: 'Notes apps and word processors turn " into curly quotes like “ and ”. HTML only understands straight quotes, so lang=“en” doesn\'t work. Type code in a code editor, not a notes app.' },
        { text: 'A file called my page.html can cause problems on a website.', isFact: true, explain: 'Spaces in file names turn into %20 in web addresses and break links easily. Use lowercase and dashes: my-page.html.' },
        { text: 'If the page looks right on your phone, the HTML must be correct.', isFact: false, explain: 'Browsers quietly fix many mistakes, and a different browser might fix them differently. Correct code works everywhere.' },
        { text: 'Most beginner bugs are a missing closing tag or a typo in a tag name.', isFact: true, explain: 'By far the most common two. When a page looks wrong, check those first.' },
        { text: 'Tag names must be in capital letters, like <H1>.', isFact: false, explain: 'HTML doesn\'t care, but everyone writes lowercase. It\'s easier to read and it\'s what you\'ll see everywhere.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The invisible bug',
      caption: 'Kofi pasted this from his notes app. The paragraph should be marked as Twi, but the curly quotes broke the attribute. Can you spot them?',
      code: '<h1>Mensah Beats</h1>\n<p lang=“tw”>Akwaaba!</p>\n',
      challenge: 'Replace the curly quotes with straight ones (").',
    },
  ],
  apply: {
    scenario: 'Kofi\'s bug-spotting drill.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix the curly quotes so the page\'s language is English',
        starter: '<!DOCTYPE html>\n<html lang=“en”>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Delete “ and ” and type straight quotes: lang="en".',
        checks: [{ message: 'The page\'s language is English', dom: { selector: 'html', attr: 'lang', attrValue: 'en' } }],
      },
      {
        kind: 'mcq',
        prompt: 'Which file name is best for a web page?',
        options: [
          { text: 'My Beats Page.html', why: 'Spaces and capitals make addresses messy and links fragile.' },
          { text: 'my-beats.html' },
          { text: 'my beats!!.html', why: 'Spaces and symbols break links. Stick to lowercase letters, numbers and dashes.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the curly quotes.',
        language: 'html',
        lines: ['<html lang="en">', '<p lang=“tw”>Akwaaba!</p>', '<p>Welcome.</p>'],
        bug: 1,
        fix: '<p lang="tw">Akwaaba!</p>',
        explanation: 'Those are curly quotes from a notes app. HTML needs straight ones.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good file name or bad file name?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'index.html', group: 0 },
          { text: 'about me.html', group: 1 },
          { text: 'gigs-2026.html', group: 0 },
          { text: 'Book Me!.html', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each symptom to the beginner mistake behind it.',
        pairs: [
          ['An attribute does nothing', 'Curly quotes'],
          ['Everything below a heading is huge', 'A missing closing tag'],
          ['A link to the page breaks', 'Spaces in the file name'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this page show?',
        code: '<H1>Mensah Beats</H1>',
        language: 'html',
        options: [
          { text: 'Nothing, capitals aren\'t allowed', why: 'HTML doesn\'t mind capitals. It\'s just that everyone writes lowercase.' },
          { text: 'The tags as plain text', why: 'H1 and h1 mean the same thing to the browser.' },
          { text: 'Mensah Beats as a main heading' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Two classic mistakes in one page: a typo in the heading tag, and a heading that never closes. Fix both',
        starter: '<hl>Mensah Beats</hl>\n<h2>Gigs\n<p>Sound Up Saturdays</p>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays</p>\n',
        hint: 'hl → h1 (the number one). Then close the h2 after Gigs.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The Gigs heading closes before the paragraph', dom: { selector: 'h2 p', count: 0 } },
          { message: 'A section heading Gigs', dom: { selector: 'h2', text: 'Gigs' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I copied your code from WhatsApp into my notes and now nothing works. Why?',
        options: [
          { text: 'WhatsApp deletes HTML.', why: 'WhatsApp doesn\'t delete anything, but apps like notes change straight quotes into curly ones.' },
          { text: 'Your notes app probably turned the quotes curly. Paste it into a code editor instead.' },
          { text: 'HTML only works on my phone.', why: 'HTML works everywhere. The problem is the curly quotes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of spaces in file names, what should you use? (one word)',
        answers: ['dashes', 'dash', 'hyphens', 'hyphen'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Final drill: fix the curly quotes AND the crossed tags',
        starter: '<p lang=“tw”>Akwaaba!</p>\n<p><strong>Free entry</p></strong>\n',
        solution: '<p lang="tw">Akwaaba!</p>\n<p><strong>Free entry</strong></p>\n',
        hint: 'Straight quotes around tw. Then close strong before p: </strong></p>.',
        checks: [
          { message: 'The first paragraph is marked as Twi', dom: { selector: 'p[lang]', attr: 'lang', attrValue: 'tw' } },
          { message: 'Free entry is strong, inside a paragraph', dom: { selector: 'p strong', text: 'Free entry' } },
          { message: 'The tags close in the right order', codeIncludes: '</strong></p>' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these mistakes do you think you\'re most likely to make? What will you check first next time?',
    starters: ['The mistake I\'d make is...', 'I\'ll check...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a quote in your phone\'s notes app and look closely: are the quotes curly? Now you know to never write code there.',
  },
  notes: 'Curly quotes: unquoted attribute value “en” (with U+201C/U+201D) is not "en", so lang fails. File names: spaces become %20 in URLs; MDN "Dealing with files" recommends lowercase and hyphens. HTML tag names are case-insensitive (§13.1.2). attr checks require EVERY match to have the attribute, so the last exercise targets p[lang].',
};

export default lesson;

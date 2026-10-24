import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 13 — elements and attributes: lang, and attributes as extra information on a tag. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Elements and attributes',
  summary: 'Kofi\'s screen reader test reads "Akwaaba" like an English word and gets it badly wrong. Attributes add extra information to a tag, like which language the words are in.',
  minutes: 12,
  outcomes: ['Say what an attribute is', 'Write an attribute with a name and a value', 'Set the language of a page and a paragraph'],
  learn: [
    {
      kind: 'compare',
      title: 'Same words, more information',
      before: { label: 'No attribute', text: '<html>\n<p>Akwaaba!</p>\n\nThe browser doesn\'t know which language this is. A screen reader guesses, and reads the Twi word "Akwaaba" (welcome) as if it were English.' },
      after: { label: 'With attributes', text: '<html lang="en">\n<p lang="tw">Akwaaba!</p>\n\nlang="en" says the page is in English. lang="tw" says this one paragraph is in Twi. Screen readers and translators now know exactly what they\'re reading.' },
      notes: [
        'An attribute is extra information inside an opening tag.',
        'It has a name, an equals sign, and a value in quotes: lang="en".',
        'The element is the whole thing: opening tag (with its attributes), content and closing tag.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Welcome in two languages',
      caption: 'The page is in English, and one paragraph is in Twi. The attributes don\'t change how it looks, but they change how it\'s read aloud and translated.',
      code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n  <p lang="tw">Akwaaba!</p>\n  <p>Welcome to my page.</p>\n</body>\n</html>\n',
      challenge: 'Add a paragraph that says hello in another language you know, with its lang attribute.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Attributes always go in the opening tag, never the closing one: <p lang="tw">, not </p lang="tw">.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s page learns which language it speaks.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of <html lang="en">.',
        pairs: [
          ['html', 'The tag name'],
          ['lang', 'The attribute name'],
          ['"en"', 'The attribute value'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Tell the browser Kofi\'s page is in English: add lang="en" to the html tag',
        starter: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Mensah Beats</title>\n</head>\n<body>\n  <h1>Mensah Beats</h1>\n</body>\n</html>\n',
        hint: 'Change <html> to <html lang="en">.',
        checks: [{ message: 'The page\'s language is English', dom: { selector: 'html', attr: 'lang', attrValue: 'en' } }],
      },
      {
        kind: 'mcq',
        prompt: 'Where does an attribute go?',
        options: [
          { text: 'In the opening tag' },
          { text: 'In the closing tag', why: 'Closing tags never have attributes. They go in the opening tag.' },
          { text: 'Between the tags, with the words', why: 'That\'s the content. Attributes go inside the opening tag itself.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line where the attribute is written wrong.',
        language: 'html',
        lines: ['<html lang="en">', '<p lang=tw">Akwaaba!</p>', '<p>Welcome.</p>'],
        bug: 1,
        fix: '<p lang="tw">Akwaaba!</p>',
        explanation: 'The value needs quotes on both sides: lang="tw".',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an opening tag for a paragraph in Twi',
        language: 'html',
        tiles: ['<p', ' lang', '=', '"tw"', '>'],
        distractors: ['</p', ':'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Your page says Akwaaba but the phone read it out like "a-KWAY-ba". That\'s SO wrong.',
        options: [
          { text: 'Phones can\'t speak Twi.', why: 'Many can, if the page tells them which language a word is in.' },
          { text: 'Then I\'ll take Akwaaba off the page.', why: 'No need. One attribute fixes it, and the greeting is part of who Kofi is.' },
          { text: 'I\'ll add lang="tw" to that paragraph, so it knows it\'s Twi.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the attribute.',
        language: 'html',
        template: '<html [[1]]="[[2]]">',
        blanks: [['lang'], ['en']],
        distractors: ['language', 'english', 'title'],
      },
      {
        kind: 'mcq',
        prompt: 'Does lang="en" change how the page looks?',
        options: [
          { text: 'Yes, it makes the text bigger', why: 'lang doesn\'t change looks. It tells browsers, screen readers and translators the language.' },
          { text: 'No, but it tells screen readers and translators which language it is' },
          { text: 'Yes, it translates the page into English', why: 'It doesn\'t translate anything. It says what language the page is already in.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the name of the attribute that sets a language?',
        answers: ['lang'],
        placeholder: 'Four letters',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a paragraph that says Akwaaba! and mark it as Twi with lang="tw"',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<p lang="tw">Akwaaba!</p>\n',
        hint: '<p lang="tw">Akwaaba!</p>',
        checks: [
          { message: 'A paragraph that says Akwaaba!', dom: { selector: 'p', text: 'Akwaaba' } },
          { message: 'The paragraph is marked as Twi', dom: { selector: 'p', attr: 'lang', attrValue: 'tw' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which languages would your own page need? Is there a greeting from your language you\'d want on it?',
    starters: ['My page would be in...', 'The greeting I\'d use is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask your phone to read a web page aloud (most phones have this in their accessibility settings). Listen for how it handles words in other languages.',
  },
  notes: 'HTML Living Standard §3.2.6.2 lang attribute (BCP 47 tags). "tw" is the ISO 639-1 code for Twi; "ak" is Akan. "Akwaaba" = welcome in Twi/Akan. Screen readers (VoiceOver, TalkBack, NVDA) switch voices based on lang where a voice is installed; translation tools use it too (W3C, "Declaring language in HTML").',
};

export default lesson;

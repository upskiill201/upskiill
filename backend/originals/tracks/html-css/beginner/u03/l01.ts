import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1 — opens the chapter: the organiser can't click or hear anything. Links: a and href. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Where do I click?"',
  summary: 'The organiser opens Mensah Beats on her phone and sends two questions: "Where\'s your Instagram? Can I hear anything?" The page has words and nothing else. Time for the tag that made the web a web: the link.',
  minutes: 12,
  outcomes: ['Make a link with a and href', 'Explain what the href holds', 'Turn plain text into a link'],
  learn: [
    {
      kind: 'story',
      title: 'Two questions',
      beats: [
        { speaker: 'narrator', text: 'Monday. Ten weeks to uni. The organiser of Sound Up Saturdays has opened Kofi\'s page. A message arrives.' },
        { speaker: 'narrator', text: '"Nice page! Two things. Where\'s your Instagram? I want to tag you on the flyer. And can I hear anything? I need to know what you sound like."' },
        { speaker: 'kofi', text: 'My Instagram is right there! It says "instagram.com/mensahbeats".' },
        { speaker: 'miracle', text: 'It says it. Can she tap it?' },
        { speaker: 'narrator', text: 'Kofi taps it on his own phone. Nothing happens. It\'s just text.' },
        { speaker: 'tey', text: 'Remember the H in HTML? HyperText: text with links. Berners-Lee\'s whole idea was pages you can jump between. A page with no links is a dead end. Let\'s fix that.' },
      ],
      choice: {
        prompt: 'What should Kofi do first?',
        options: [
          {
            text: 'Turn his Instagram address into a real link she can tap.',
            outcome: 'One tag later, the organiser taps it, follows him, and tags him on the flyer. Links are how people move around the web.',
            best: true,
          },
          {
            text: 'Tell her to copy the address and paste it in her browser.',
            outcome: 'She could. Most people won\'t bother. Every extra step loses visitors.',
          },
          {
            text: 'Send her a screenshot of his Instagram.',
            outcome: 'A screenshot can\'t be followed. She needs something she can tap.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Your first link',
      caption: 'a means "anchor", the link. href holds where it goes. The words between the tags are what people tap. Tap it in the page: the preview tells you where it would go.',
      code: '<p>Follow me: <a href="https://instagram.com/mensahbeats">Mensah Beats on Instagram</a></p>\n',
      challenge: 'Change the link text to Follow Mensah Beats.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '<a href="where it goes">what people tap</a>. The href is the address. The content is the link text.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s first links.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of <a href="https://instagram.com/mensahbeats">My Instagram</a>.',
        pairs: [
          ['a', 'The link (anchor) tag'],
          ['href', 'The attribute that holds the address'],
          ['My Instagram', 'The words people tap'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Turn the Instagram line into a link to https://instagram.com/mensahbeats, with the text My Instagram',
        starter: '<p>My Instagram</p>\n',
        solution: '<p><a href="https://instagram.com/mensahbeats">My Instagram</a></p>\n',
        hint: 'Wrap My Instagram in <a href="https://instagram.com/mensahbeats"> and </a>.',
        checks: [
          { message: 'A link to Kofi\'s Instagram', dom: { selector: 'a[href*="instagram.com/mensahbeats"]', count: 1 } },
          { message: 'The link says My Instagram', dom: { selector: 'a', text: 'My Instagram' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does href hold?',
        options: [
          { text: 'The words people tap', why: 'Those go between the tags. href holds the address.' },
          { text: 'The address the link goes to' },
          { text: 'The colour of the link', why: 'Colours are CSS. href is the address.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What can the visitor tap?',
        code: '<p>Follow <a href="https://tiktok.com/@mensahbeats">me on TikTok</a> today</p>',
        language: 'html',
        options: [
          { text: 'The whole sentence', why: 'Only the words inside the a are the link.' },
          { text: 'Only "me on TikTok"' },
          { text: 'Nothing, links need a button', why: 'The a tag is the link. No button needed.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a link to https://teyro.app with the text Teyro',
        language: 'html',
        tiles: ['<a', ' href="https://teyro.app"', '>', 'Teyro', '</a>'],
        distractors: ['<link>', ' src="https://teyro.app"'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why is that bit blue and underlined?',
        options: [
          { text: 'It\'s a link. Tap it and it takes you to my Instagram.' },
          { text: 'It\'s a spelling mistake.', why: 'Browsers show links blue and underlined by default, so people know they can tap them.' },
          { text: 'I coloured it blue for fun.', why: 'Kofi didn\'t: browsers style links that way so they stand out.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the link.',
        language: 'html',
        template: '<a [[1]]="https://instagram.com/mensahbeats">My Instagram</[[2]]>',
        blanks: [['href'], ['a']],
        distractors: ['src', 'link', 'url'],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the broken link.',
        language: 'html',
        lines: ['<a href="https://instagram.com/mensahbeats">Instagram</a>', '<a link="https://tiktok.com/@mensahbeats">TikTok</a>', '<a href="https://teyro.app">Teyro</a>'],
        bug: 1,
        fix: '<a href="https://tiktok.com/@mensahbeats">TikTok</a>',
        explanation: 'The address goes in href, not "link". Without href, it isn\'t a link at all.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which attribute holds a link\'s address?',
        answers: ['href'],
        placeholder: 'Four letters',
      },
      {
        kind: 'writeCode',
        prompt: 'Add a Find me section: an h2 Find me, then a paragraph with a link to https://tiktok.com/@mensahbeats that says TikTok',
        starter: '',
        solution: '<h2>Find me</h2>\n<p><a href="https://tiktok.com/@mensahbeats">TikTok</a></p>\n',
        hint: 'h2, then <p><a href="...">TikTok</a></p>.',
        checks: [
          { message: 'A heading Find me', dom: { selector: 'h2', text: 'Find me' } },
          { message: 'A link to TikTok', dom: { selector: 'a[href*="tiktok.com"]', text: 'TikTok' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which links would your own page need? Where would you want people to go next?',
    starters: ['I\'d link to...', 'Because people should...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Count the links on the first screen of any news site. Then imagine it with none. That\'s the difference a tags make.',
  },
  notes: 'HTML Living Standard §4.5.1 a (with href = hyperlink). "a" = anchor, from early HTML. instagram.com/mensahbeats and tiktok.com/@mensahbeats are fictional handles for Kofi\'s fictional act. The preview catches link taps (components/code/HtmlPad.tsx catchLinks) and says where they would go.',
};

export default lesson;

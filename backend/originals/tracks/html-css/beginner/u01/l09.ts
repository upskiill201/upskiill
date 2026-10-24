import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9 — the broken page: typos in tag names, missing closing tags, what browsers do with mistakes. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'The broken page',
  summary: 'Kofi proudly shows Clinton and David his page on a video call. It\'s a mess: a heading that isn\'t one, and a paragraph swallowed by a title. Time to play detective.',
  minutes: 12,
  outcomes: ['Spot a typo in a tag name', 'Spot a missing closing tag', 'Explain what browsers do with mistakes'],
  learn: [
    {
      kind: 'story',
      title: 'The group call',
      beats: [
        { speaker: 'narrator', text: 'Thursday night. Kofi shares his screen with Clinton and David in Buea. "Behold. Mensah Beats."' },
        { speaker: 'clinton', text: 'Behold WHAT? Why is your title tiny and your About section enormous?' },
        { speaker: 'david', text: 'There\'s also a sentence just floating at the top. It\'s not in anything.' },
        { speaker: 'narrator', text: 'Kofi looks at his code. On his phone screen, at 1am, it looked fine.' },
        { speaker: 'tey', text: 'Here\'s a secret about browsers: they never show you an error. If the HTML is wrong, they quietly guess what you meant and draw SOMETHING. So the page doesn\'t crash. It just looks wrong, and you have to find out why.' },
        { speaker: 'kofi', text: 'So the browser is basically Ama. It doesn\'t tell me I\'m wrong, it just does something weird.' },
      ],
      choice: {
        prompt: 'How should Kofi find the problem?',
        options: [
          {
            text: 'Read the code slowly, tag by tag, and check each one opens and closes.',
            outcome: 'Two minutes later he finds it: <hl> with the letter L instead of the number 1, and an h1 with no closing tag. Detective work beats panic.',
            best: true,
          },
          {
            text: 'Delete everything and start again.',
            outcome: 'That works, but it throws away an hour of work, and he\'ll probably make the same typo again.',
          },
          {
            text: 'Tell Clinton it\'s meant to look like that.',
            outcome: 'Clinton has screenshotted it for the group chat. There\'s no hiding now.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Find the two mistakes',
      caption: 'This is Kofi\'s broken page. One tag name has a typo, and one tag is never closed. Fix both and watch the page snap into shape.',
      code: '<hl>Mensah Beats</hl>\n<h2>About me\n<p>I make beats on my phone in Accra.</p>\n',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Browsers never show an error for broken HTML. When a page looks wrong, check each tag: is the name spelled right, and does it close?',
    },
  ],
  apply: {
    scenario: 'Detective work on Kofi\'s page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a browser do when the HTML has a mistake?',
        options: [
          { text: 'Shows a red error message', why: 'Browsers never show errors for HTML. They guess and draw something.' },
          { text: 'Shows a blank page', why: 'Almost never. The browser keeps going and draws its best guess.' },
          { text: 'Guesses what you meant and draws something, sometimes wrong' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line with the typo.',
        language: 'html',
        lines: ['<hl>Mensah Beats</hl>', '<p>I make beats.</p>', '<p>I live in Accra.</p>'],
        bug: 0,
        fix: '<h1>Mensah Beats</h1>',
        explanation: 'That\'s a letter l, not the number 1. The browser doesn\'t know a tag called hl, so it shows plain text.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the typo so Mensah Beats becomes a real main heading',
        starter: '<hl>Mensah Beats</hl>\n<p>I make beats on my phone.</p>\n',
        solution: '<h1>Mensah Beats</h1>\n<p>I make beats on my phone.</p>\n',
        hint: 'hl has a letter L. Change it to h1, with the number one, in both tags.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'The paragraph is still there', dom: { selector: 'p', text: 'I make beats on my phone' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Will this break the page?',
        groups: ['Breaks it', 'Fine'],
        items: [
          { text: '<h2>About me with no closing tag', group: 0 },
          { text: '<hl> with a letter l', group: 0 },
          { text: 'Extra spaces between two tags', group: 1 },
          { text: 'An empty line between paragraphs', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens to the paragraph?',
        code: '<h2>About me\n<p>I make beats.</p>',
        language: 'html',
        options: [
          { text: 'It looks normal', why: 'The h2 never closes, so the paragraph ends up inside the heading.' },
          { text: 'It ends up inside the heading, in big bold text' },
          { text: 'It disappears', why: 'It\'s still there, just inside the unclosed heading.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Close the h2 so the paragraph is no longer swallowed by the heading',
        starter: '<h2>About me\n<p>I make beats on my phone.</p>\n',
        solution: '<h2>About me</h2>\n<p>I make beats on my phone.</p>\n',
        hint: 'Add </h2> right after About me.',
        checks: [
          { message: 'A heading that says About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'The paragraph is not inside the heading', dom: { selector: 'h2 p', count: 0 } },
          { message: 'The paragraph is still on the page', dom: { selector: 'p', text: 'I make beats on my phone' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Your page is broken, bro. Just admit HTML is too hard.',
        options: [
          { text: 'It\'s two typos. Give me five minutes.' },
          { text: 'You\'re right, I quit.', why: 'Two small typos aren\'t a reason to quit. Every developer makes them every day.' },
          { text: 'My page is perfect, your phone is broken.', why: 'Clinton has a screenshot. Better to find the typos.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each symptom to its cause.',
        pairs: [
          ['The title shows as plain text', 'A typo in the tag name'],
          ['Everything below is giant', 'A heading with no closing tag'],
          ['Stray words with no style', 'Text outside any tag'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi typed <hl>. Which letter did he type instead of the number 1?',
        answers: ['l', 'L', 'the letter l', 'lowercase l'],
        placeholder: 'One letter',
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will swallow the rest of the page.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>My beats', '<p>Sunrise in Osu</p>', '<p>Jollof Bounce</p>'],
        bug: 1,
        fix: '<h2>My beats</h2>',
        explanation: 'The h2 never closes, so both paragraphs end up inside it.',
      },
      {
        kind: 'writeCode',
        prompt: 'Fix both mistakes in Kofi\'s page',
        starter: '<hl>Mensah Beats</hl>\n<h2>About me\n<p>I make beats in Accra.</p>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<p>I make beats in Accra.</p>\n',
        hint: 'First: hl should be h1 (the number one). Second: close the h2.',
        checks: [
          { message: 'A main heading that says Mensah Beats', dom: { selector: 'h1', text: 'Mensah Beats' } },
          { message: 'A section heading that says About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'The paragraph is not inside the heading', dom: { selector: 'h2 p', count: 0 } },
          { message: 'The paragraph is on the page', dom: { selector: 'p', text: 'I make beats in Accra' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When something you make goes wrong, are you a "start again" person or a "find the problem" person? Which one do you want to be?',
    starters: ['I usually...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write a short page, then break it on purpose three ways: a typo, a missing closing tag, crossed tags. Learn what each one looks like.',
  },
  notes: 'Browsers use error-tolerant HTML parsing (HTML Living Standard §13.2, parse errors are recovered from, never shown). Unknown element <hl> is an HTMLUnknownElement with no default styling. An unclosed h2 followed by <p>: p is not a heading-closing tag, so p becomes a child of h2 and inherits heading styles.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8 — special characters: &amp;, &lt;, &gt;, &copy;. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Special characters',
  summary: 'Kofi wants his page to say "I learned the <h1> tag this week", and the browser turns half the sentence into a giant heading. Some characters mean something to HTML, so you write them a special way.',
  minutes: 11,
  outcomes: ['Show < and > as text with &lt; and &gt;', 'Write & safely as &amp;', 'Add a copyright line with &copy;'],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>The browser reads &lt; as "a tag starts here".</strong> So if you type <code>&lt;h1&gt;</code> in a sentence, it doesn\'t show those characters: it starts a heading. To show the characters themselves, you write a code for them, called a <strong>character reference</strong> (most people say "entity").</p>',
    },
    {
      kind: 'code',
      language: 'html',
      code: '<p>I learned the &lt;h1&gt; tag this week.</p>',
      caption: 'This shows: I learned the <h1> tag this week. No heading starts.',
    },
    {
      kind: 'text',
      html: '<p><strong>Four you\'ll use.</strong> Each starts with &amp; and ends with a semicolon:</p><ul><li><code>&amp;lt;</code> shows &lt; ("less than")</li><li><code>&amp;gt;</code> shows &gt; ("greater than")</li><li><code>&amp;amp;</code> shows &amp; (the ampersand itself)</li><li><code>&amp;copy;</code> shows &copy; (copyright)</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Browsers usually forgive a plain & in text like R&B, but &amp; always works. Writing it properly is a good habit.',
    },
    {
      kind: 'tryIt',
      title: 'Show the tag, don\'t start it',
      caption: 'The first line shows the tag as text. The second line accidentally starts a real heading. Fix the second line.',
      code: '<p>I learned the &lt;h1&gt; tag.</p>\n<p>Then I learned the <h2> tag.</p>\n',
      challenge: 'Change <h2> in the second line to &lt;h2&gt;.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s page talks about HTML.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each code to what it shows.',
        pairs: [
          ['&lt;', '<'],
          ['&gt;', '>'],
          ['&amp;', '&'],
          ['&copy;', 'The copyright sign (a C in a circle)'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page say I learned the <h1> tag, without starting a real heading',
        starter: '<p>I learned the <h1> tag.</p>\n',
        solution: '<p>I learned the &lt;h1&gt; tag.</p>\n',
        hint: 'Replace < with &lt; and > with &gt;.',
        checks: [
          { message: 'The page shows <h1> as text', outputIncludes: 'I learned the <h1> tag' },
          { message: 'No real heading starts', dom: { selector: 'h1', count: 0 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t you just type < in your text?',
        options: [
          { text: 'The browser reads it as the start of a tag' },
          { text: 'It\'s not on phone keyboards', why: 'It is. The problem is that HTML uses < to start tags.' },
          { text: 'It\'s a rude symbol', why: 'Not rude, just special: HTML uses it for tags.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: '<p>Beats &amp; vibes</p>',
        language: 'html',
        options: [
          { text: 'Beats &amp; vibes', why: 'The browser turns &amp; into &.' },
          { text: 'Beats & vibes' },
          { text: 'Beats vibes', why: '&amp; shows an ampersand, it doesn\'t disappear.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add a copyright line at the bottom: a paragraph with the copyright sign, then 2026 Mensah Beats',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<p>&copy; 2026 Mensah Beats</p>\n',
        hint: '<p>&copy; 2026 Mensah Beats</p>',
        checks: [
          { message: 'The page says 2026 Mensah Beats', outputIncludes: '2026 Mensah Beats' },
          { message: 'It starts with the copyright sign, written as &copy;', codeIncludes: '&copy; 2026' },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the code for <.',
        template: '&[[1]];',
        blanks: [['lt']],
        distractors: ['gt', 'amp', 'less'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a special code, or fine as it is?',
        groups: ['Needs a code', 'Fine as it is'],
        items: [
          { text: 'The < in "the <p> tag"', group: 0 },
          { text: 'The letter A', group: 1 },
          { text: 'The copyright symbol (no key for it)', group: 0 },
          { text: 'A full stop', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Why does your page say "I learned the" and then the rest is HUGE?',
        options: [
          { text: 'The browser saw <h1> in my sentence and started a heading. I\'ll write it as &lt;h1&gt;.' },
          { text: 'It\'s a design choice.', why: 'Ama isn\'t buying it. The browser read the < as a tag.' },
          { text: 'Your phone zoomed in.', why: 'The phone is fine. The < in the text started a real heading.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every special code starts with & and ends with which character?',
        answers: ['semicolon', 'a semicolon', '; semicolon'],
        placeholder: 'Its name',
      },
      {
        kind: 'writeCode',
        prompt: 'Make the page say Genres: R&B & highlife, writing both ampersands as &amp;',
        starter: '',
        solution: '<p>Genres: R&amp;B &amp; highlife</p>\n',
        hint: 'Each & becomes &amp;.',
        checks: [
          { message: 'The page shows Genres: R&B & highlife', outputIncludes: 'Genres: R&B & highlife' },
          { message: 'The ampersands are written as &amp;', codeIncludes: 'R&amp;B &amp; highlife' },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever seen a web page or email with weird symbols like &amp; showing in it? Now you know what went wrong.',
    starters: ['I\'ve seen...', 'Now I know...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write a sentence explaining one HTML tag to a friend, with the tag shown as text using &lt; and &gt;.',
  },
  notes: 'HTML Living Standard §13.1.4 character references and §13.5 named character references (lt, gt, amp, copy). A bare & followed by a space is not a parse error; "R&B" renders as R&B in browsers. textContent decodes references, so outputIncludes checks the visible characters.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7 — why contrast matters: WCAG, who it helps, sunlight and screens. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Designing for every pair of eyes',
  summary: 'Contrast isn\'t a matter of taste. It\'s written into the guidelines the whole web uses for accessibility. Here\'s where those numbers come from, and who they protect.',
  minutes: 12,
  outcomes: ['Explain what WCAG is', 'Describe who low contrast shuts out', 'Apply the contrast rules to big and small text'],
  learn: [
    {
      kind: 'reading',
      title: 'WCAG and contrast',
      html:
        '<p>The <strong>Web Content Accessibility Guidelines (WCAG)</strong> are published by the W3C, the same group that looks after HTML and CSS. They describe how to make websites work for people with disabilities, and many countries use them in their laws.</p>' +
        '<p>One of the best-known rules is about <strong>contrast</strong>. Normal text should have a contrast ratio of at least <strong>4.5 to 1</strong> with its background. Large text (roughly 24px, or about 19px if bold) can go down to <strong>3 to 1</strong>, because bigger letters are easier to make out.</p>' +
        '<p>Who does it help? People with low vision or colour blindness, and older readers whose eyes need more contrast. But also anyone reading in bright sunlight, on a cracked or dim screen, or at 2am with the brightness down. In other words: almost everyone, some of the time.</p>' +
        '<p>Colour should never be the only signal, either. A link shown only by being a different colour can be missed by someone who can\'t see that difference. Browsers underline links by default, and that\'s a good thing to keep.</p>' +
        '<p>For Kofi, the rule is simple: his fans read on phones, outside, often at night. Contrast isn\'t a nice extra. It\'s whether they can find the play button.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Big text gets a little more room',
      caption: 'Pink on night blue is fine for a big label, but too faint for small print. Compare them.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  h1 { color: #F0438A; font-size: 40px; }\n  small { color: #F0438A; }\n</style>\n<h1>New beat</h1>\n<p><small>Out Friday at 6pm</small></p>\n',
      challenge: 'Make the small text cream (#FFF6E5) instead. Easier?',
    },
  ],
  apply: {
    scenario: 'Why contrast matters.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is WCAG?',
        options: [
          { text: 'A colour-picking app', why: 'It\'s a set of accessibility guidelines.' },
          { text: 'Guidelines for making websites accessible, published by the W3C' },
          { text: 'A font', why: 'It\'s the Web Content Accessibility Guidelines.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Normal text needs 4.5 to 1. Does this pair pass?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Cream on night blue (about 15)', group: 0 },
          { text: 'Pink on night blue (about 4.47)', group: 1 },
          { text: 'Orange on night blue (about 7.3)', group: 0 },
          { text: 'White on orange (about 2.2)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can big text have a lower ratio (3 to 1)?',
        options: [
          { text: 'Bigger letters are easier to make out' },
          { text: 'Big text is less important', why: 'It\'s about how easy letters are to see.' },
          { text: 'It can\'t, all text needs 10 to 1', why: 'Big text needs at least 3 to 1.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the small print readable: change it from pink to Kofi\'s cream #FFF6E5',
        starter: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  small { color: #F0438A; }\n</style>\n<p><small>Out Friday at 6pm</small></p>\n',
        solution: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  small { color: #FFF6E5; }\n</style>\n<p><small>Out Friday at 6pm</small></p>\n',
        hint: 'small { color: #FFF6E5; }',
        checks: [
          { message: 'Cream small print', dom: { selector: 'small', style: 'color', styleValue: '#FFF6E5' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each reader to why contrast helps them.',
        pairs: [
          ['Someone with low vision', 'Letters need to stand out more'],
          ['A fan outside at noon', 'Sunlight washes out the screen'],
          ['Ama on her old phone', 'A dim, older screen'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'I removed the underline from links so it looks cleaner. Only colour shows they\'re links now.',
        options: [
          { text: 'Cleaner is always better.', why: 'Colour shouldn\'t be the only signal.' },
          { text: 'Some people can\'t see that colour difference. Keep the underline so links are obvious.' },
          { text: 'Remove the colour too.', why: 'Then nobody can find the links.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['Contrast helps people reading in sunlight.', 'Contrast only matters for people with perfect eyesight.', 'Large text can use 3 to 1.'],
        bug: 1,
        explanation: 'It matters most for people who struggle to see, and helps everyone.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the name.',
        template: 'Web Content [[1]] Guidelines',
        blanks: [['Accessibility']],
        distractors: ['Colour', 'Design', 'Contrast'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which organisation publishes WCAG, HTML and CSS standards? (three letters)',
        answers: ['w3c'],
        placeholder: 'Three letters',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which pair should Kofi use for small print?',
        options: [
          { text: 'Pink on night blue', why: 'Just under 4.5 to 1: too faint for small text.' },
          { text: 'Night blue on night blue', why: 'Invisible.' },
          { text: 'Cream on night blue' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you know who would find low-contrast text hard. How would your page work for them?',
    starters: ['I\'m thinking of...', 'My page would...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "WCAG contrast minimum 1.4.3" and read the short explanation of the 4.5 to 1 rule.',
  },
  notes: 'WCAG 2.1/2.2 SC 1.4.3 Contrast (Minimum), Level AA: 4.5:1 normal text; 3:1 for large text (at least 18pt, or 14pt bold, ≈ 24px / 18.66px). SC 1.4.1 Use of Color. Many jurisdictions reference WCAG in law; kept general.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — line breaks: br for lines that belong together; empty (void) elements. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Line breaks',
  summary: 'Kofi wants the hook of Jollof Bounce on his page, four short lines. Four paragraphs look wrong, and one paragraph squashes it flat. The br tag breaks a line without starting a new paragraph.',
  minutes: 11,
  outcomes: ['Break a line with br', 'Know when to use br and when to use p', 'Recognise an empty element with no closing tag'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Kofi wants the hook of Jollof Bounce on his page. Four lines that belong together, like a verse. He tries four p elements. What goes wrong?',
          replies: ['Too much space?', 'No idea'],
        },
        {
          tey: 'Too much space. Each p is its own paragraph, with a gap around it, so the verse falls apart into four separate thoughts. One p squashes it into one long line instead, because the browser ignores Enter.',
          replies: ['So what fixes it?'],
        },
        {
          tey: 'br, the line break. Put it where you want a new line, inside the paragraph. The lines stay together as one verse, but each starts on a new line. Addresses work the same way: one paragraph, with a br after each line.',
          replies: ['Where\'s its closing tag?'],
        },
        {
          tey: 'Good eye. br has no closing tag, because it has no content: it\'s just a break. Tags like that are called empty elements. You write <br> and that\'s it.',
          replies: ['Can I use br for spacing?'],
        },
        {
          tey: 'Please don\'t. Stacking br br br to push things down is a classic beginner trick, and it breaks on other screens. Spacing is CSS\'s job, coming in Chapter 6. br is only for lines that belong together.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The hook of Jollof Bounce',
      caption: 'One paragraph, four lines. The br tags keep them together as one verse.',
      code: '<h2>Jollof Bounce (the hook)</h2>\n<p>Pot on the fire,<br>\nmusic getting higher,<br>\nAccra on a Friday,<br>\neverybody bounce.</p>\n',
      challenge: 'Delete one br and watch two lines join together.',
    },
  ],
  apply: {
    scenario: 'Kofi puts lyrics and an address on his page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does br do?',
        options: [
          { text: 'Starts a new paragraph', why: 'That\'s p. br starts a new line inside the same paragraph.' },
          { text: 'Breaks the line, inside the same paragraph' },
          { text: 'Makes text bold', why: 'That\'s strong (or b). br is a line break.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Keep the hook as one paragraph, but put each line on its own line with br',
        starter: '<p>Pot on the fire,\nmusic getting higher,\neverybody bounce.</p>\n',
        solution: '<p>Pot on the fire,<br>\nmusic getting higher,<br>\neverybody bounce.</p>\n',
        hint: 'Add <br> at the end of the first two lines.',
        checks: [
          { message: 'Still one paragraph', dom: { selector: 'p', count: 1 } },
          { message: 'Two line breaks inside it', dom: { selector: 'p br', count: 2 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'br or a new p?',
        groups: ['br', 'New p'],
        items: [
          { text: 'The next line of a lyric', group: 0 },
          { text: 'A new idea about his story', group: 1 },
          { text: 'The next line of an address', group: 0 },
          { text: 'A separate paragraph about his gigs', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does br have no closing tag?',
        options: [
          { text: 'Someone forgot to invent one', why: 'It\'s on purpose: br has no content to wrap.' },
          { text: 'It\'s optional, like a comment', why: 'It\'s not optional; it simply has no content, so there\'s nothing to close.' },
          { text: 'It has no content, so there\'s nothing to close' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I want a big gap above my gig section. Five br tags should do it, right?',
        options: [
          { text: 'Spacing is CSS\'s job. br is only for lines that belong together.' },
          { text: 'Ten br tags, to be safe.', why: 'Stacked br tags look different on every screen. CSS spacing is coming.' },
          { text: 'Use five empty p tags instead.', why: 'Same trick, same problem. Leave spacing to CSS.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many lines does this show?',
        code: '<p>Osu<br>Accra<br>Ghana</p>',
        language: 'html',
        options: [
          { text: 'One', why: 'Each br starts a new line.' },
          { text: 'Three' },
          { text: 'Two', why: 'Two breaks make three lines.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Write the gig address as one paragraph on three lines: Sound Up Saturdays, Osu, Accra',
        starter: '',
        solution: '<p>Sound Up Saturdays<br>\nOsu<br>\nAccra</p>\n',
        hint: 'One p. A <br> after the first two lines.',
        checks: [
          { message: 'One paragraph', dom: { selector: 'p', count: 1 } },
          { message: 'Two line breaks', dom: { selector: 'p br', count: 2 } },
          { message: 'It says Sound Up Saturdays', dom: { selector: 'p', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two-letter tag breaks a line?',
        answers: ['br', '<br>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to whether it needs a closing tag.',
        pairs: [
          ['<br>', 'No closing tag, it\'s empty'],
          ['<p>', 'Closes with </p>'],
          ['<!-- -->', 'A comment, not an element'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that uses br the wrong way.',
        language: 'html',
        lines: ['<p>Pot on the fire,<br>', 'music getting higher</p>', '<br><br><br><br>', '<h2>Gigs</h2>'],
        bug: 2,
        explanation: 'Four br tags just to make space. Spacing belongs in CSS; br is for lines that belong together.',
      },
    ],
  },
  reflect: {
    prompt: 'Is there a poem, lyric or quote you love that you\'d put on your page? Where would its lines break?',
    starters: ['The words I\'d use are...', 'They break after...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write your own address (a made-up one is fine) as one paragraph with line breaks.',
  },
  notes: 'HTML Living Standard §4.5.27 br: "must be used only for line breaks that are actually part of the content, as in poems or addresses"; br is a void element (§13.1.2). Lyrics are original to this course (Teyro-made beats).',
};

export default lesson;

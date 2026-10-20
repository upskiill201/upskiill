import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 15 — Checkpoint 3. Reviews lessons 11–14. Story beat: Ama reads the page aloud. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: Ama reads it aloud',
  summary: 'Ama turns on her phone\'s screen reader and lets it read Kofi\'s page out loud. Every tag changes what she hears. Quotes, breaks, small print, highlights and gig details, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Mark up real quotes with blockquote and cite', 'Use hr, small and mark for their meaning', 'Build a description list of gig details'],
  learn: [
    {
      kind: 'story',
      title: 'The robot voice',
      beats: [
        { speaker: 'narrator', text: 'Sunday. Ama has discovered her phone can read web pages out loud, and she thinks it\'s the funniest thing in the world.' },
        { speaker: 'ama', text: 'Listen! It says "Heading level 2, What people say. Block quote. Hardest beat in Buea." It KNOWS it\'s a quote!' },
        { speaker: 'kofi', text: 'Because I used blockquote. The tags tell it what everything is.' },
        { speaker: 'ama', text: 'Then why did it say "separator" three times in a row at the bottom?' },
        { speaker: 'tey', text: 'Ama just found a bug with her ears. Let\'s go through Kofi\'s page the way her phone does.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 3: make the page sound right.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The screen reader said "separator" three times. What\'s on the page?',
        options: [
          { text: 'Three hr elements in a row' },
          { text: 'Three paragraphs', why: 'Paragraphs aren\'t read as separators. hr is.' },
          { text: 'Three quotes', why: 'Quotes are announced as block quotes. "Separator" is hr.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the bug Ama heard: keep only one hr between the sections',
        starter: '<h2>Gigs</h2>\n<p>Saturday, 8pm.</p>\n<hr>\n<hr>\n<hr>\n<h2>Book me</h2>\n',
        solution: '<h2>Gigs</h2>\n<p>Saturday, 8pm.</p>\n<hr>\n<h2>Book me</h2>\n',
        hint: 'Delete two of the three hr lines.',
        checks: [
          { message: 'Only one break', dom: { selector: 'hr', count: 1 } },
          { message: 'Both sections are still there', dom: { selector: 'h2', count: 2 } },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the phone announce it as a quote: put This one slaps in a blockquote',
        starter: '<h2>What people say</h2>\n<p>This one slaps.</p>\n',
        solution: '<h2>What people say</h2>\n<blockquote>\n  <p>This one slaps.</p>\n</blockquote>\n',
        hint: 'Wrap the p in blockquote.',
        checks: [{ message: 'The comment is in a blockquote', dom: { selector: 'blockquote', text: 'This one slaps' } }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tag?',
        groups: ['mark', 'small', 'blockquote'],
        items: [
          { text: 'The date moved to the 14th', group: 0 },
          { text: 'Under-16s with an adult', group: 1 },
          { text: 'Clinton\'s words about the beat', group: 2 },
          { text: 'Terms apply', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to what it\'s for.',
        pairs: [
          ['hr', 'A change of topic'],
          ['cite', 'The title of a work'],
          ['dt', 'A name in a description list'],
          ['dd', 'Its value'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the gig card.',
        language: 'html',
        lines: ['<dl>', '  <dt>When</dt>', '  <dd>Saturday the 14th</dd>', '  <p>Free before 9pm</p>', '</dl>'],
        bug: 3,
        fix: '  <dt>Price</dt>\n  <dd>Free before 9pm</dd>',
        explanation: 'A dl holds dt and dd pairs. A loose p has no name to belong to.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'Can you make the phone say MY name in the quotes section?',
        options: [
          { text: 'Only if you really said something about my beats. Real quotes only.' },
          { text: 'Sure, I\'ll make something up for you.', why: 'Even for Ama: real quotes only. That\'s the rule from lesson 11.' },
          { text: 'No, children can\'t be quoted.', why: 'Anyone can be quoted, if they really said it.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What shows with a yellow highlight?',
        code: '<p>Gig <mark>moved to the 14th</mark>. <small>Free before 9pm.</small></p>',
        language: 'html',
        options: [
          { text: 'Free before 9pm', why: 'That\'s small: smaller text, not highlighted.' },
          { text: 'moved to the 14th' },
          { text: 'The whole sentence', why: 'Only the words inside mark are highlighted.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Build the gig card Ama\'s phone can read as pairs: a dl with When / Saturday the 14th and Price / Free before 9pm',
        starter: '',
        solution: '<dl>\n  <dt>When</dt>\n  <dd>Saturday the 14th</dd>\n  <dt>Price</dt>\n  <dd>Free before 9pm</dd>\n</dl>\n',
        hint: 'dl, then dt/dd, dt/dd.',
        checks: [
          { message: 'Two names', dom: { selector: 'dt', count: 2 } },
          { message: 'Two values', dom: { selector: 'dd', count: 2 } },
          { message: 'Price is one of the names', dom: { selector: 'dt', text: 'Price' } },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the credit.',
        language: 'html',
        template: '<p>David, on <[[1]]>Night Bus to Kumasi</[[2]]></p>',
        blanks: [['cite'], ['cite']],
        distractors: ['quote', 'mark', 'dt'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which empty element does a screen reader call a "separator"?',
        answers: ['hr', '<hr>'],
        placeholder: 'Two letters',
      },
    ],
  },
  reflect: {
    prompt: 'Ama found a bug just by listening. Have you ever tried a phone\'s screen reader? What do you think it would say about your page?',
    starters: ['I think it would say...', 'I\'d want it to say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Turn on your phone\'s screen reader for one minute (TalkBack on Android, VoiceOver on iPhone) and listen to any web page. Then turn it off the same way.',
  },
  notes: 'Checkpoint 3 of Chapter 2: reviews blockquote/cite (l11), hr (l12), small/mark (l13), dl/dt/dd (l14). Screen readers announce hr as "separator" (VoiceOver, TalkBack, NVDA; ARIA role separator) and blockquote as "block quote".',
};

export default lesson;

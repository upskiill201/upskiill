import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Clinton's track list. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Clinton\'s track list',
  summary: 'Clinton sends Kofi his "official ranking" of every Mensah Beats track, as one enormous voice note. Kofi turns it into a page people can actually read. Scanning, emphasis and lists, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Make a page scannable with headings and short paragraphs', 'Use strong and em for meaning', 'Build bullet and numbered lists'],
  learn: [
    {
      kind: 'story',
      title: 'The official ranking',
      beats: [
        { speaker: 'narrator', text: 'Thursday. A voice note from Clinton, six minutes long, titled "OFFICIAL MENSAH BEATS RANKING (do not argue)".' },
        { speaker: 'clinton', text: 'Number one, Jollof Bounce, obviously. Number two, Sunrise in Osu, it\'s a vibe. Number three, Night Bus, it\'s sad but in a good way. Put this on your website. I\'m serious. Do not argue.' },
        { speaker: 'kofi', text: 'I\'m not putting a six-minute voice note on my website.' },
        { speaker: 'tey', text: 'But a "Fan favourites" section? That he could build in two minutes. Let\'s see if the first week of this chapter stuck.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: turn Clinton\'s voice note into a page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Clinton\'s ranking has an order: 1, 2, 3. Which list?',
        options: [
          { text: 'ul', why: 'A ranking is ordered, so it\'s ol.' },
          { text: 'A long paragraph', why: 'That\'s exactly the voice-note problem. A numbered list is faster to read.' },
          { text: 'ol' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Build Clinton\'s ranking: an h2 Fan favourites, then a numbered list: Jollof Bounce, Sunrise in Osu, Night Bus to Kumasi',
        starter: '',
        solution: '<h2>Fan favourites</h2>\n<ol>\n  <li>Jollof Bounce</li>\n  <li>Sunrise in Osu</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n',
        hint: 'An h2, then an ol with three li, in Clinton\'s order.',
        checks: [
          { message: 'A heading Fan favourites', dom: { selector: 'h2', text: 'Fan favourites' } },
          { message: 'A numbered list of three tracks', dom: { selector: 'ol > li', count: 3 } },
          { message: 'Jollof Bounce is in the ranking', dom: { selector: 'ol li', text: 'Jollof Bounce' } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the list.',
        language: 'html',
        lines: ['<ol>', '  <li>Jollof Bounce</li>', '  <p>Sunrise in Osu</p>', '  <li>Night Bus to Kumasi</li>', '</ol>'],
        bug: 2,
        fix: '  <li>Sunrise in Osu</li>',
        explanation: 'Only li goes directly inside a list. A p there breaks the numbering.',
      },
      {
        kind: 'sortGroups',
        prompt: 'strong or em?',
        groups: ['strong', 'em'],
        items: [
          { text: 'Do not argue (Clinton is serious)', group: 0 },
          { text: 'It\'s sad but in a *good* way', group: 1 },
          { text: 'Free entry before 9pm', group: 0 },
          { text: 'I *told* you it was the best', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add Clinton\'s note under the list: a paragraph Do not argue, with not in em',
        starter: '<ol>\n  <li>Jollof Bounce</li>\n</ol>\n',
        solution: '<ol>\n  <li>Jollof Bounce</li>\n</ol>\n<p>Do <em>not</em> argue.</p>\n',
        hint: 'A new p under the list: <p>Do <em>not</em> argue.</p>',
        checks: [
          { message: 'A paragraph that says Do not argue', dom: { selector: 'p', text: 'Do not argue' } },
          { message: 'not is stressed', dom: { selector: 'p em', text: 'not' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why would a six-minute voice note make a bad web page?',
        options: [
          { text: 'People scan pages; a long block with no structure gets skipped' },
          { text: 'Voice notes are illegal on websites', why: 'They aren\'t. But a long unstructured block, spoken or written, loses people.' },
          { text: 'It wouldn\'t, it\'s perfect', why: 'Efua would close the tab in five seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tag to its job.',
        pairs: [
          ['ol', 'A ranking or steps'],
          ['ul', 'Things in no particular order'],
          ['strong', 'Something important'],
          ['em', 'A word said with stress'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: '<ul>\n  <li>Afrobeats</li>\n  <li>Drill</li>\n</ul>',
        language: 'html',
        options: [
          { text: '1. Afrobeats 2. Drill', why: 'ul gives bullets, not numbers.' },
          { text: 'Afrobeats and Drill, each with a bullet' },
          { text: 'Afrobeats Drill on one line', why: 'Each li gets its own line and bullet.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the gig line.',
        language: 'html',
        template: '<p>Doors open at [[1]]8pm[[2]].</p>',
        blanks: [['<strong>'], ['</strong>']],
        distractors: ['<em>', '<li>', '</p>'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'You changed my voice note into a LIST? Where\'s the passion?',
        options: [
          { text: 'The passion is in the ranking. Now people can actually read it.' },
          { text: 'There was no passion.', why: 'There was a lot of passion. Kofi kept it, just in a shape people read.' },
          { text: 'I\'ll put the voice note back.', why: 'Six minutes of audio is how fans get lost. The list works.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'A What I make section: an h2 What I make, a short paragraph, then a bullet list of three genres',
        starter: '',
        solution: '<h2>What I make</h2>\n<p>Beats for every mood.</p>\n<ul>\n  <li>Afrobeats</li>\n  <li>Amapiano</li>\n  <li>Highlife</li>\n</ul>\n',
        hint: 'h2, then p, then a ul with three li.',
        checks: [
          { message: 'A heading What I make', dom: { selector: 'h2', text: 'What I make' } },
          { message: 'A short paragraph', dom: { selector: 'p', min: 1 } },
          { message: 'A bullet list of three genres', dom: { selector: 'ul > li', count: 3 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Lists, emphasis and short paragraphs. Which one will change your own page the most?',
    starters: ['The one I\'ll use most is...', 'Because my page has...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rank something with a friend (songs, footballers, snacks) and turn your ranking into a numbered list in the playground.',
  },
  notes: 'Checkpoint 1 of Chapter 2: reviews scanning (l01), strong/em (l02), ul (l03), ol (l04).',
};

export default lesson;

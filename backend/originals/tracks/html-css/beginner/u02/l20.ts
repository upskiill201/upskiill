import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Chapter Challenge: Mensah Beats v0.2. Climax: Ama reads it to the end, out loud, without being asked. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Mensah Beats v0.2',
  summary: 'Ten days to the gig. Kofi rebuilds his page with everything from this chapter: a short About, a track list, gig details, real quotes and the full story behind a tap. Then Ama gets her phone out.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a full text page people read to the end', 'Choose the right list and emphasis for each job', 'Use quotes, details and fine print correctly'],
  learn: [
    {
      kind: 'story',
      title: 'Ten days to go',
      beats: [
        { speaker: 'narrator', text: 'Thursday. Ten days to Sound Up Saturdays. The flyers are out. People are going to look for Mensah Beats online.' },
        { speaker: 'kofi', text: 'Okay. Short About. Track list. Gig card. Real quotes. Full story behind a tap. Small print at the bottom. No walls.' },
        { speaker: 'efua', text: 'If I can find the price in three seconds, I\'ll share it with my cousins.' },
        { speaker: 'tey', text: 'Everything from this chapter, in one page. Let\'s build v0.2.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The site so far',
      steps: [
        { title: 'v0.1 (Chapter 1)', body: 'A skeleton, a title, headings and paragraphs. Clear, but plain. Efua: "It\'s a wall of text."', code: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<p>A very, very long paragraph...</p>', language: 'html' },
        { title: 'v0.2 (tonight)', body: 'Built for scanners: a three-line About, a numbered set list, a gig card, real quotes, a read more and fine print.', code: '<ol>...</ol>\n<dl>...</dl>\n<blockquote>...</blockquote>\n<details>...</details>\n<small>...</small>', language: 'html' },
        { title: 'Next chapter', body: 'Links to his socials, his album art with alt text, and a beat you can actually press play on.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: build Mensah Beats v0.2.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Step 1: the short About. An h2 About me and one front-loaded paragraph with Producer from Osu, Accra',
        starter: '<h1>Mensah Beats</h1>\n',
        solution: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<p>Producer from Osu, Accra. Beats made on a phone.</p>\n',
        hint: 'h2 About me, then a p that starts with Producer from Osu, Accra.',
        checks: [
          { message: 'A heading About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'A short About', dom: { selector: 'p', text: 'Producer from Osu, Accra' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 2: pick the right tag for each part.',
        groups: ['ol', 'dl', 'blockquote'],
        items: [
          { text: 'Tonight\'s set, in order', group: 0 },
          { text: 'Where, When, Price', group: 1 },
          { text: 'Clinton\'s words', group: 2 },
          { text: 'Fan favourites, ranked', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Step 3: the set list. An h2 Tonight\'s set and a numbered list of the three tracks',
        starter: '',
        solution: '<h2>Tonight\'s set</h2>\n<ol>\n  <li>Sunrise in Osu</li>\n  <li>Jollof Bounce</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n',
        hint: 'h2, then ol with three li: Sunrise in Osu, Jollof Bounce, Night Bus to Kumasi.',
        checks: [
          { message: 'A heading Tonight\'s set', dom: { selector: 'h2', text: 'Tonight\'s set' } },
          { message: 'A numbered list of three tracks', dom: { selector: 'ol > li', count: 3 } },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Ama spots a bug in the gig card. Tap it.',
        language: 'html',
        lines: ['<dl>', '  <dt>When</dt>', '  <dd>Saturday the 14th, 8pm</dd>', '  <dt>Price</dt>', '  Free before 9pm', '</dl>'],
        bug: 4,
        fix: '  <dd>Free before 9pm</dd>',
        explanation: 'The price value isn\'t in a dd, so it floats loose inside the list.',
      },
      {
        kind: 'writeCode',
        prompt: 'Step 4: the gig card Efua wants. A dl with When / Saturday the 14th, 8pm and Price / Free before 9pm',
        starter: '<h2>Next gig</h2>\n',
        solution: '<h2>Next gig</h2>\n<dl>\n  <dt>When</dt>\n  <dd>Saturday the 14th, 8pm</dd>\n  <dt>Price</dt>\n  <dd>Free before 9pm</dd>\n</dl>\n',
        hint: 'dl, with dt/dd for When and dt/dd for Price.',
        checks: [
          { message: 'A Price name', dom: { selector: 'dt', text: 'Price' } },
          { message: 'Its value', dom: { selector: 'dd', text: 'Free before 9pm' } },
          { message: 'Two pairs', dom: { selector: 'dt', count: 2 } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kofi\'s long injury story. Where does it go in v0.2?',
        options: [
          { text: 'At the top, so everyone reads it', why: 'Most visitors want the short version. The full story goes behind a tap.' },
          { text: 'In a details, behind a summary people can tap' },
          { text: 'Deleted', why: 'It\'s the best story on the page. Keep it for the fans who want it.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Put my quote on it. And say a famous DJ called you a genius. Nobody will check.',
        options: [
          { text: 'Your quote, yes. The DJ one, no. Real quotes only.' },
          { text: 'Okay, both.', why: 'Kofi decided this in lesson 11: invented quotes cost more than they bring.' },
          { text: 'Neither, quotes are cringe.', why: 'Real quotes from real fans are great. Only the fake one goes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 5: the fine print at the bottom.',
        language: 'html',
        template: '<hr>\n<p><[[1]]>&copy; 2026 Mensah Beats</small></p>',
        blanks: [['small']],
        distractors: ['mark', 'strong', 'cite'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of v0.2 to the lesson where you learned it.',
        pairs: [
          ['The gig card', 'Gig details'],
          ['Tonight\'s set', 'Numbered lists'],
          ['The full story on tap', 'Less is more'],
          ['Clinton\'s quote', 'Real quotes only'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does Efua see first, before tapping anything?',
        code: '<h2>About me</h2>\n<p>Producer from Osu, Accra.</p>\n<details>\n  <summary>How a broken ankle started Mensah Beats</summary>\n  <p>At 14...</p>\n</details>',
        language: 'html',
        options: [
          { text: 'The heading, the short About, and the summary line to tap' },
          { text: 'Everything, including the full story', why: 'The story inside details stays hidden until she taps.' },
          { text: 'Only the heading', why: 'The paragraph and summary are visible too.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'The whole thing: Mensah Beats v0.2. Fill in the plan: an About paragraph, the set list (ol), the gig card (dl), one quote, the full story in details, and the fine print in small',
        starter: '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<!-- short About paragraph -->\n\n<!-- the full story: details + summary -->\n\n<h2>Tonight\'s set</h2>\n<!-- numbered list -->\n\n<h2>Next gig</h2>\n<!-- gig card: dl -->\n\n<h2>What people say</h2>\n<!-- one real quote -->\n\n<hr>\n<!-- fine print -->\n',
        solution:
          '<h1>Mensah Beats</h1>\n<h2>About me</h2>\n<p>Producer from Osu, Accra. Beats made on a phone.</p>\n<details>\n  <summary>How a broken ankle started Mensah Beats</summary>\n  <p>At 14 I broke my ankle and made a beat every day.</p>\n</details>\n<h2>Tonight\'s set</h2>\n<ol>\n  <li>Sunrise in Osu</li>\n  <li>Jollof Bounce</li>\n  <li>Night Bus to Kumasi</li>\n</ol>\n<h2>Next gig</h2>\n<dl>\n  <dt>When</dt>\n  <dd>Saturday the 14th, 8pm</dd>\n  <dt>Price</dt>\n  <dd>Free before 9pm</dd>\n</dl>\n<h2>What people say</h2>\n<blockquote>\n  <p>Hardest beat in Buea.</p>\n</blockquote>\n<hr>\n<p><small>&copy; 2026 Mensah Beats</small></p>\n',
        hint: 'Under each comment, add its part: p; details with summary and p; ol with li; dl with dt and dd; blockquote with p; p with small.',
        checks: [
          { message: 'A short About paragraph', dom: { selector: 'body > p:not(:empty)', min: 1 } },
          { message: 'The full story behind a tap', dom: { selector: 'details > summary:not(:empty)', count: 1 } },
          { message: 'A numbered set list', dom: { selector: 'ol > li', min: 3 } },
          { message: 'A gig card with a Price', dom: { selector: 'dl dt', text: 'Price' } },
          { message: 'A real quote', dom: { selector: 'blockquote', min: 1 } },
          { message: 'Fine print at the bottom', dom: { selector: 'small', min: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Ama read Kofi\'s page to the end without being asked. What would make someone read YOUR page to the end?',
    starters: ['They\'d keep reading because...', 'The first thing they\'d see is...'],
  },
  deepen: {
    title: 'Your page, v0.2',
    summary: 'Give your own page the same treatment: a short About, a list, one thing in strong, and one "read more" behind a details. Chapter 3 adds links, pictures and sound.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: Mensah Beats v0.2; Ama reads it to the end. "Site so far" uses a neutral steps card (compare marks the left side wrong).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1 — opens the chapter: Efua's verdict, and why people scan web pages. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"It\'s a wall of text"',
  summary: 'Kofi sends Efua his new About section: one giant paragraph about his whole life. She replies with five words. People don\'t read web pages, they scan them, so the page has to be built for scanning.',
  minutes: 12,
  outcomes: ['Explain why people scan web pages instead of reading them', 'Break a wall of text into short paragraphs', 'Add headings so people find what they want'],
  learn: [
    {
      kind: 'story',
      title: 'Five words',
      beats: [
        { speaker: 'narrator', text: 'Monday. Eleven weeks to uni. Kofi has written his story for the About section: how he started making beats on his uncle\'s old phone, his first track, the football injury that gave him three months indoors, everything.' },
        { speaker: 'narrator', text: 'It\'s one paragraph. Four hundred words. He sends Efua the link, very proud.' },
        { speaker: 'efua', text: 'It\'s a wall of text.' },
        { speaker: 'kofi', text: 'That\'s five words. I wrote four hundred.' },
        { speaker: 'efua', text: 'I read the first line and then I looked for your gig date. I couldn\'t find it, so I left. That\'s what everyone will do.' },
        { speaker: 'tey', text: 'Efua is harsh, but she\'s right. On a screen, most people don\'t read every word. They scan: the first line, the headings, anything that stands out. If the thing they want isn\'t easy to spot, they leave.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Break it into short paragraphs under clear headings, with the gig date easy to find.',
            outcome: 'Efua scans it again and finds the gig in two seconds. "Better. Still long. But better."',
            best: true,
          },
          {
            text: 'Make the text bigger so people read it.',
            outcome: 'Bigger text is still a wall, just a bigger one. The problem is the shape, not the size.',
          },
          {
            text: 'Tell Efua to read it properly.',
            outcome: 'Kofi can\'t sit next to every visitor and ask them to read properly. The page has to work for people who scan.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'Wall vs. scannable',
      caption: 'Same words, two shapes. The first half is a wall. The second half has headings and short paragraphs. Which one would you actually read?',
      code: '<p>I started making beats on my uncle\'s old phone when I was 14. My first track was terrible but my friends loved it. I play my next gig at Sound Up Saturdays in Osu this Saturday at 8pm and entry is free.</p>\n\n<h2>How I started</h2>\n<p>I started making beats on my uncle\'s old phone when I was 14.</p>\n<h2>Next gig</h2>\n<p>Sound Up Saturdays, Osu. Saturday, 8pm. Free entry.</p>\n',
      challenge: 'Delete the wall at the top, so only the scannable version is left.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People scan pages: headings, first lines, anything that stands out. Short paragraphs and clear headings help them find what they came for.',
    },
  ],
  apply: {
    scenario: 'Kofi rescues his About section.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How do most people read a web page?',
        options: [
          { text: 'Every word, from top to bottom', why: 'Some do, but most people scan: headings, first lines, things that stand out.' },
          { text: 'They scan it, looking for what they came for' },
          { text: 'Backwards, from the bottom', why: 'People start at the top, but they skip a lot on the way down.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Split Kofi\'s wall into two paragraphs: one about how he started, one about his next gig',
        starter: '<p>I started making beats on my uncle\'s phone. My next gig is Saturday at 8pm.</p>\n',
        solution: '<p>I started making beats on my uncle\'s phone.</p>\n<p>My next gig is Saturday at 8pm.</p>\n',
        hint: 'Close the first p after phone. and start a new p before My next gig.',
        checks: [
          { message: 'Two paragraphs', dom: { selector: 'p', count: 2 } },
          { message: 'One paragraph about the gig', dom: { selector: 'p', text: 'My next gig is Saturday' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to scan, or a wall?',
        groups: ['Easy to scan', 'A wall'],
        items: [
          { text: 'A heading for each topic', group: 0 },
          { text: 'One 400-word paragraph', group: 1 },
          { text: 'Paragraphs of two or three sentences', group: 0 },
          { text: 'The gig date hidden in the middle of a sentence', group: 1 },
          { text: 'The most important thing first', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Why should I read your whole life story to find one date?',
        options: [
          { text: 'You shouldn\'t. I\'ll give the gig its own heading so you can find it in a second.' },
          { text: 'Because it\'s a good story.', why: 'It might be, but Efua came for the date. Make the date easy to find.' },
          { text: 'Just press Ctrl+F.', why: 'Most visitors won\'t search a page. If they can\'t see it, they leave.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What do people look at first when they scan a page?',
        options: [
          { text: 'The last paragraph', why: 'Most people never reach the last paragraph. They look at headings and first lines.' },
          { text: 'The tags in the code', why: 'Visitors never see the tags, only the page.' },
          { text: 'Headings and the first words of paragraphs' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the gig its own section: add an h2 Next gig above the gig paragraph',
        starter: '<h2>About me</h2>\n<p>I make beats on my phone.</p>\n<p>Sound Up Saturdays, Saturday 8pm.</p>\n',
        solution: '<h2>About me</h2>\n<p>I make beats on my phone.</p>\n<h2>Next gig</h2>\n<p>Sound Up Saturdays, Saturday 8pm.</p>\n',
        hint: 'Put <h2>Next gig</h2> on its own line, just above the Sound Up Saturdays paragraph.',
        checks: [
          { message: 'A section heading Next gig', dom: { selector: 'h2', text: 'Next gig' } },
          { message: 'Two sections', dom: { selector: 'h2', count: 2 } },
          { message: 'The gig paragraph is still there', dom: { selector: 'p', text: 'Sound Up Saturdays' } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kofi\'s scannable page in order.',
        language: 'html',
        lines: ['<h1>Mensah Beats</h1>', '<h2>Next gig</h2>', '<p>Saturday, 8pm, Osu.</p>', '<h2>About me</h2>', '<p>I make beats on my phone.</p>'],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'People [[1]] pages, so put the most [[2]] thing first.',
        blanks: [['scan'], ['important']],
        distractors: ['print', 'boring', 'delete'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'One word for how most people read web pages: they ____ them.',
        answers: ['scan', 'skim'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each fix to the problem it solves.',
        pairs: [
          ['Short paragraphs', 'One giant block of text'],
          ['Clear headings', 'Can\'t find the gig date'],
          ['Important thing first', 'Visitors leave after one line'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Rebuild the About section to be scannable: an h2 About me, then two short paragraphs',
        starter: '',
        solution: '<h2>About me</h2>\n<p>I make beats on my phone in Accra.</p>\n<p>I started at 14.</p>\n',
        hint: 'One h2, then two p lines with a short sentence each.',
        checks: [
          { message: 'A section heading About me', dom: { selector: 'h2', text: 'About me' } },
          { message: 'Two short paragraphs', dom: { selector: 'p', min: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last web page you left quickly. Was it a wall of text? What would have kept you reading?',
    starters: ['The last page I left was...', 'I would have stayed if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open a news article and only read the headings and first lines. How much of the story do you get? That\'s how your visitors read.',
  },
  notes: 'Scanning: Nielsen Norman Group, "How Users Read on the Web" (Nielsen, 1997: 79% of test users scanned, 16% read word by word) and "F-Shaped Pattern For Reading Web Content" (eye-tracking, 2006). Efua is course-only (Study Smarter with AI); here she is the page critic.',
};

export default lesson;

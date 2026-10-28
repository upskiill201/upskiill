import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 3 — getting sources you can check (and lateral reading). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Getting sources you can check',
  summary: 'Good research rests on sources you can open, trust and cite. Learn how to ask for them, and how professional fact-checkers judge a website in seconds.',
  minutes: 13,
  outcomes: [
    'Ask AI for sources in a checkable way',
    'Rank sources from strongest to weakest',
    'Use lateral reading to judge an unfamiliar site',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Strong sources, and how to judge them',
      html:
        '<h3>Stronger to weaker</h3>' +
        '<ol>' +
        '<li><strong>Official and primary:</strong> regulators, central banks, statistics offices, a company\'s own reports.</li>' +
        '<li><strong>Respected research:</strong> universities, well-known industry bodies.</li>' +
        '<li><strong>Reputable news</strong> reporting on the above.</li>' +
        '<li><strong>Blogs, forums and marketing pages:</strong> useful for ideas, weak as evidence.</li>' +
        '</ol>' +
        '<h3>Lateral reading</h3>' +
        '<p>Researchers at Stanford (Wineburg and McGrew) studied how professional fact-checkers judge websites. Instead of reading a page closely, they quickly <strong>open new tabs to see what others say about the source</strong>: who runs it, who funds it. They judged reliability faster and more accurately than students or even historians.</p>' +
        '<p>Ask AI: <em>"List official or primary sources that would have this data, with links. Mark anything you\'re unsure exists."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Prefer official and primary sources. For an unfamiliar site, leave it: check what others say about who runs it.',
    },
  ],
  apply: {
    scenario: 'Ada is collecting sources for the Ghana brief.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order these from strongest to weakest source.',
        lines: ['The central bank\'s annual report', 'A university study', 'A news article about the report', 'An anonymous blog post'],
      },
      {
        kind: 'mcq',
        prompt: 'What is lateral reading?',
        options: [
          { text: 'Reading a page very slowly', why: 'Fact-checkers leave the page instead.' },
          { text: 'Checking what other sources say about a website and who runs it' },
          { text: 'Reading only the headings', why: 'It\'s about checking the source.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong evidence, or ideas only?',
        groups: ['Strong evidence', 'Ideas only'],
        items: [
          { text: 'Telecom regulator\'s subscriber statistics', group: 0 },
          { text: 'A forum thread about fintech in Accra', group: 1 },
          { text: 'A competitor\'s own annual report', group: 0 },
          { text: 'A sponsored "Top 10 apps" list', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most checkable sources?',
        options: [
          { text: 'Give me some sources.', why: 'Invites anything, including invented ones.' },
          { text: 'List official or primary sources that would have data on mobile money use in Ghana, with links. Mark anything you\'re unsure exists.' },
          { text: 'Give me 20 sources quickly.', why: 'Quantity over quality.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I found a site called "Ghana Fintech Facts". It has great numbers! Use them?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, the numbers look great.', why: 'Looking great isn\'t evidence.' },
          { text: 'No, websites are never reliable.', why: 'Some are; check who runs it.' },
          { text: 'Let me check who runs it first: if it\'s anonymous or selling something, I\'ll find the official source for those numbers instead.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'For an unfamiliar site, [[1]] it: check what [[2]] say about who runs it.',
        blanks: [['leave'], ['others']],
        distractors: ['trust', 'robots'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it\'s best for.',
        pairs: [
          ['Regulator website', 'Current rules'],
          ['Statistics office', 'Population and usage data'],
          ['Company annual report', 'That company\'s own figures'],
          ['Forum thread', 'Ideas and complaints to explore'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which source in Ada\'s list is the weakest for a statistic?',
        lines: [
          'Bank of Ghana report (opened, p.41)',
          'National statistics office data (opened)',
          '"Best Apps 2024" sponsored blog',
          'Competitor annual report (opened)',
        ],
        bug: 2,
        fix: 'Use it for ideas only; take statistics from official sources.',
        explanation: 'Sponsored lists are marketing, not evidence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which university\'s researchers studied how fact-checkers read websites?',
        answers: ['Stanford', 'stanford', 'Stanford University'],
        placeholder: 'A university',
      },
      {
        kind: 'sortGroups',
        prompt: 'Lateral reading move, or not?',
        groups: ['Lateral reading', 'Not'],
        items: [
          { text: 'Searching the site\'s name plus "funding"', group: 0 },
          { text: 'Reading the site\'s own "About us" only', group: 1 },
          { text: 'Checking what news says about the organisation', group: 0 },
          { text: 'Judging by how professional the design looks', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question for any new site.',
        tiles: ['Who', 'runs', 'this,', 'and', 'who', 'funds', 'it?'],
        distractors: ['cares'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not trust a site because it looks professional?',
        options: [
          { text: 'Anyone can make a professional-looking site; design isn\'t evidence' },
          { text: 'Professional sites are always wrong', why: 'Design tells you nothing either way.' },
          { text: 'You should trust it', why: 'Check who runs it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a site you trust for work. Who runs it, and who funds it? Do you know?',
    starters: ['The site is...', 'It\'s run by...'],
  },
  deepen: { title: 'Try it today', summary: 'Pick one unfamiliar site you used recently and spend two minutes reading laterally about it.' },
  notes: 'Wineburg & McGrew (2019), Teachers College Record, "Lateral reading and the nature of expertise" (Stanford History Education Group): fact-checkers outperformed historians and students at judging websites. "Ghana Fintech Facts" and "Best Apps 2024" are fictional.',
};

export default lesson;

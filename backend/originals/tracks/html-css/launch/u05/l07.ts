import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 7 — history: the first website (1991), "release early, release often", shipping. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The first website was one page',
  summary: 'Kofi is nervous that v2.0 isn\'t "finished". Miracle tells him about the very first website, and why people who build things for a living say "ship it".',
  minutes: 12,
  outcomes: ['Describe the first website and how simple it was', 'Explain "release early, release often"', 'Explain what it means to ship'],
  learn: [
    {
      kind: 'reading',
      title: 'Ship it, then make it better',
      html:
        '<p>In <strong>1991</strong>, Tim Berners-Lee, working at CERN in Switzerland, put the first website online. It was plain text and links: no colours, no pictures, no layout. It explained what the World Wide Web was and how to make your own pages. That simple page started everything you\'ve learned in this track.</p>' +
        '<p>The original page wasn\'t kept, but in <strong>2013</strong> CERN rebuilt it from the earliest copy they could find, at its first address, so anyone can still visit it today. Search "first website CERN" and look: it\'s mostly words and blue links.</p>' +
        '<p>In <strong>1997</strong>, the programmer Eric S. Raymond wrote an essay called <em>The Cathedral and the Bazaar</em>. One idea from it became a motto: <strong>"release early, release often"</strong>. Put your work out, let real people use it, learn from them, and improve it in small steps.</p>' +
        '<p>People who build software call putting work out <strong>shipping</strong>. A shipped site that\'s good enough helps people today. A perfect site that never launches helps nobody.</p>' +
        '<p>Shipping isn\'t the same as being careless. You still check everything important. Then you launch, listen, and make the next version better.</p>',
    },
    {
      kind: 'tryIt',
      title: 'A page like the first one',
      caption: 'Something like the first website: words and links, no CSS at all. It still works today.',
      code: '<h1>World Wide Web</h1>\n<p>The WorldWideWeb (W3) is a way to share documents across the internet.</p>\n<p>See <a href="#how">how to make your own pages</a> and <a href="#people">who is working on it</a>.</p>\n',
      challenge: 'Add one line of CSS. You\'ve just done something the first website didn\'t.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The first website was words and links. Check what matters, ship it, then improve it.',
    },
  ],
  apply: {
    scenario: 'The first website was one page.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the events in order.',
        lines: ['The first website goes online at CERN', '"Release early, release often" is written', 'CERN rebuilds the first website', 'Mensah Beats v2.0 launches'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to its year.',
        pairs: [
          ['The first website', '1991'],
          ['The Cathedral and the Bazaar', '1997'],
          ['CERN rebuilds the first site', '2013'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the first website look like?',
        options: [
          { text: 'Plain text and links, no colours or pictures' },
          { text: 'A full colour site with video', why: 'It was words and links.' },
          { text: 'Nobody knows', why: 'CERN rebuilt it from early copies.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Make a page like the first one: an h1 "World Wide Web" and a paragraph with one link to "#how"',
        starter: '\n',
        solution: '<h1>World Wide Web</h1>\n<p>See <a href="#how">how to make your own pages</a>.</p>\n',
        hint: '<h1>World Wide Web</h1> then <p>...<a href="#how">...</a></p>',
        checks: [
          { message: 'The heading', dom: { selector: 'h1', text: 'World Wide Web' } },
          { message: 'A link inside a paragraph', dom: { selector: 'p a[href="#how"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Shipping, or being careless?',
        groups: ['Shipping', 'Careless'],
        items: [
          { text: 'Check what matters, launch, then improve', group: 0 },
          { text: 'Upload without opening it once', group: 1 },
          { text: 'Launch v2.0, plan v2.1', group: 0 },
          { text: 'Ignore a broken booking form', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'v2.0 still isn\'t finished. There\'s so much more I want to add.',
        options: [
          { text: 'It never will be. The first website was one page of links. Ship it, then make v2.1.' },
          { text: 'Then don\'t launch.', why: 'Ready beats perfect.' },
          { text: 'Add everything tonight.', why: 'That\'s how launches break.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['The first website went online in 1991.', 'The first website had colourful pictures.', 'CERN rebuilt it in 2013.'],
        bug: 1,
        explanation: 'It was plain text and links.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the motto.',
        template: 'Release [[1]], release [[2]].',
        blanks: [['early'], ['often']],
        distractors: ['never', 'late', 'once'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do builders call putting their work out for people to use? (one word)',
        answers: ['shipping', 'ship', 'Shipping'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main idea of "release early, release often"?',
        options: [
          { text: 'Put work out, learn from real people, improve in small steps' },
          { text: 'Never check anything', why: 'You still check what matters.' },
          { text: 'Release once and stop', why: 'Often means again and again.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there something you\'ve been waiting to make "perfect" before sharing?',
    starters: ['I\'ve been holding back...', 'I could ship it if...'],
  },
  deepen: {
    title: 'Look it up',
    summary: 'Search "first website CERN" and open the restored page. Compare it with your own site.',
  },
  notes: 'First website: info.cern.ch, Tim Berners-Lee, 1991 (commonly cited 6 Aug 1991). CERN restored it at its original URL in 2013. Eric S. Raymond, The Cathedral and the Bazaar (1997), "Release early. Release often."',
};

export default lesson;

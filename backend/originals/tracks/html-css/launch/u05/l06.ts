import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 6 — your own web address: domains, registrars, yearly renewal, pointing it at your host. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your own web address',
  summary: 'Kofi wants to announce a short address from the stage, not a long free one with a hosting name in it. Tey explains what a domain is, what it costs, and how it points at his site.',
  minutes: 11,
  outcomes: ['Explain what a domain name is', 'Know that domains are rented yearly from a registrar', 'Describe how a domain is pointed at your host'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'A domain is the name people type, like mensahbeats.example.app. You don\'t buy it forever. You rent it, usually a year at a time, from a company called a registrar.',
          replies: ['How much does it cost?'],
        },
        {
          tey: 'It depends on the ending (.com, .app, .com.gh and so on) and the registrar, and the first year is often cheaper than renewals. Check current prices locally before you choose, and look at the renewal price, not just the first year.',
          replies: ['Then how does it reach my site?'],
        },
        {
          tey: 'Your host (where your files live) tells you what to set. You add a record or two in the registrar\'s settings, called DNS records, that point the name at your host. It can take a little while to work everywhere.',
          replies: ['Do I need one?'],
        },
        {
          tey: 'No. The free address your host gives you works fine. A domain is easier to say on stage and keeps working if you ever move host. Just remember to renew it, or someone else can take it.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'One address, every page',
      caption: 'Once the domain points at your host, every file gets an address on it.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; }\n  code { color: #FFC83D; }\n</style>\n<h1>Where each file lives</h1>\n<ul>\n  <li>index.html is <code>https://mensahbeats.example.app/</code></li>\n  <li>gigs.html is <code>https://mensahbeats.example.app/gigs.html</code></li>\n  <li>book.html is <code>https://mensahbeats.example.app/book.html</code></li>\n</ul>\n',
      challenge: 'Add the address for beats.html.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A domain is rented, usually yearly. Check the renewal price, and set a reminder to renew.',
    },
  ],
  apply: {
    scenario: 'Your own web address.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a registrar?',
        options: [
          { text: 'The program that shows web pages', why: 'That\'s a browser.' },
          { text: 'The place your files are stored', why: 'That\'s your host.' },
          { text: 'A company you rent a domain name from' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Domain', 'The name people type'],
          ['Registrar', 'Where you rent the name'],
          ['Host', 'Where your files live'],
          ['DNS record', 'Points the name at the host'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Update the og:url to the new domain: "https://mensahbeats.example.app/"',
        starter: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:url" content="https://kofi-mensah.free-host.example/">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Mensah Beats | Beat producer in Accra</title>\n  <meta property="og:url" content="https://mensahbeats.example.app/">\n</head>\n<body><h1>Mensah Beats</h1></body>\n</html>\n',
        hint: 'Change the content to https://mensahbeats.example.app/',
        checks: [
          { message: 'The new address', dom: { selector: 'meta[property="og:url"]', attr: 'content', attrValue: 'https://mensahbeats.example.app/' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'Domains are usually rented a year at a time', group: 0 },
          { text: 'You own a domain forever after one payment', group: 1 },
          { text: 'Renewal can cost more than the first year', group: 0 },
          { text: 'You must have a domain to be online', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'This registrar has a domain for almost nothing in year one!',
        options: [
          { text: 'Check what it costs to renew in year two. That\'s the price you\'ll keep paying.' },
          { text: 'Buy ten.', why: 'Check the renewal first.' },
          { text: 'Renewals are always free.', why: 'They usually aren\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the risky plan.',
        lines: ['Pay for one year and set a renewal reminder.', 'Pay for one year and forget about it.', 'Use the free host address for now.'],
        bug: 1,
        explanation: 'If it expires, the site stops working at that address, and someone else can register it.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The domain points at Kofi\'s host. What address opens this file?',
        code: 'Folder:\n  index.html\n  gigs.html\n  book.html',
        language: 'html',
        options: [
          { text: 'gigs.html has no address', why: 'Every uploaded file gets one.' },
          { text: 'Only index.html is online', why: 'All uploaded files are.' },
          { text: 'gigs.html opens at https://mensahbeats.example.app/gigs.html' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s summary.',
        template: 'You rent a domain from a [[1]], and DNS records point it at your [[2]].',
        blanks: [['registrar'], ['host']],
        distractors: ['browser', 'editor', 'validator'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the name people type in the address bar called? (one word)',
        answers: ['domain', 'Domain'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why might Kofi want his own domain rather than the free address?',
        options: [
          { text: 'Free addresses don\'t work', why: 'They work fine.' },
          { text: 'It\'s easier to say on stage, and keeps working if he moves host' },
          { text: 'It makes the site rank first', why: 'A domain alone doesn\'t do that.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Would you get your own domain, or keep the free address for now? Why?',
    starters: ['I\'d...', 'Because...'],
  },
  deepen: {
    title: 'Look it up',
    summary: 'Search your host\'s help pages for "custom domain". Read the steps, and check current domain prices and renewal prices locally before you decide.',
  },
  notes: 'Prices vary by TLD, registrar and country, and change over time: always "check locally". DNS propagation can take minutes to hours.',
};

export default lesson;

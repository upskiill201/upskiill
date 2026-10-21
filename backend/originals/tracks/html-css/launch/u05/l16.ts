import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 16 — launch myths: "it must be perfect", "if you build it they will come", "done means done". Myth or fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Launch myths',
  summary: 'Backstage, the other acts share what they "know" about websites. "Once it\'s up, it\'s done." "People will just find it." Tey sorts myth from fact.',
  minutes: 11,
  outcomes: ['Spot common myths about launching a site', 'Explain why launching is a beginning, not an end', 'Set honest expectations for a new site'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'A site has to be perfect before you launch.', isFact: false, explain: 'It has to be ready: the important things checked and working. Improvements come in later versions.' },
        { text: 'If you build it, people will come.', isFact: false, explain: 'People find sites through links, shares, search and word of mouth. You still have to tell them.' },
        { text: 'Once it\'s launched, the work is done.', isFact: false, explain: 'Launch is the start: updates, fixes and new content keep it useful.' },
        { text: 'Real people using it will find things you missed.', isFact: true, explain: 'That\'s normal. Listen, fix, and ship the next version.' },
        { text: 'A small, honest site can be more useful than a big, flashy one.', isFact: true, explain: 'What matters is that it does its job well for the people who use it.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask for feedback',
      caption: 'A small, kind way to hear what people missed: a feedback line in the footer.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; line-height: 1.6; padding: 16px; }\n  a { color: #FFC83D; }\n  footer { border-top: 1px solid #1F2E52; padding-top: 16px; }\n</style>\n<main><h1>Mensah Beats</h1></main>\n<footer>\n  <p>Found something broken? <a href="mailto:kofi@mensahbeats.example.app">Tell Kofi</a>.</p>\n  <p>&copy; 2026 Mensah Beats</p>\n</footer>\n',
      challenge: 'Rewrite the feedback line in your own voice.',
    },
  ],
  apply: {
    scenario: 'Launch myths.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'It must be perfect first', group: 0 },
          { text: 'Real users find things you missed', group: 1 },
          { text: 'Launch means the work is over', group: 0 },
          { text: 'Small and honest can beat big and flashy', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a feedback link to the footer: href "mailto:kofi@mensahbeats.example.app", text "Tell Kofi"',
        starter: '<footer>\n  <p>Found something broken? </p>\n</footer>\n',
        solution: '<footer>\n  <p>Found something broken? <a href="mailto:kofi@mensahbeats.example.app">Tell Kofi</a>.</p>\n</footer>\n',
        hint: '<a href="mailto:kofi@mensahbeats.example.app">Tell Kofi</a>',
        checks: [
          { message: 'An email link', dom: { selector: 'footer a[href^="mailto:"]', count: 1 } },
          { message: 'With clear text', dom: { selector: 'footer a', text: 'Tell Kofi' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "if you build it, they will come" a myth?',
        options: [
          { text: 'People find sites through links, shares and search, so you have to tell them' },
          { text: 'Sites are invisible', why: 'They\'re visible, but people need to hear about them.' },
          { text: 'It\'s true', why: 'Nobody finds a site nobody mentions.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Someone told me there\'s a typo on your gigs page. Embarrassing!',
        options: [
          { text: 'Thanks for telling me. That\'s normal after a launch. I\'ll fix it and add it to the changelog.' },
          { text: 'There can\'t be, I checked.', why: 'Real users always find things.' },
          { text: 'Take the site down.', why: 'Fix the typo; keep the site up.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['It must be perfect', 'It must be ready'],
          ['They will just come', 'You have to tell them'],
          ['Launch is the end', 'Launch is the start'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Real users will find things I missed.', 'Once it\'s up, I never need to touch it again.', 'A small, honest site can do its job well.'],
        bug: 1,
        explanation: 'Sites need small updates: new content, fixes, old dates removed.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when a visitor taps this link?',
        code: '<a href="mailto:kofi@mensahbeats.example.app">Tell Kofi</a>',
        language: 'html',
        options: [
          { text: 'Their email app opens with Kofi\'s address filled in' },
          { text: 'It opens a web page', why: 'mailto opens email.' },
          { text: 'Nothing', why: 'It opens an email.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s line.',
        template: 'Launch is the [[1]], not the [[2]].',
        blanks: [['start', 'beginning'], ['end']],
        distractors: ['perfect', 'final', 'last'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A site doesn\'t need to be perfect to launch. It needs to be what? (one word)',
        answers: ['ready', 'Ready'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should Kofi do when people report problems after launch?',
        options: [
          { text: 'Thank them, fix it, and ship the next version' },
          { text: 'Ignore them', why: 'They\'re helping.' },
          { text: 'Start again from scratch', why: 'Fix in small steps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which launch myth have you believed? What do you think now?',
    starters: ['I used to think...', 'Now I think...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a small feedback line to your site\'s footer, so people can tell you when something\'s wrong.',
  },
  notes: 'mailto links open the default email app. Feedback email uses the placeholder domain.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2 — link text that says where it goes; never "click here". */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Links people can read',
  summary: 'Kofi\'s page now has three links that all say "click here". Ama\'s screen reader lists them: "click here, click here, click here". Good link text tells you where you\'re going before you tap.',
  minutes: 11,
  outcomes: ['Write link text that says where the link goes', 'Explain why "click here" fails', 'Fix vague links'],
  learn: [
    {
      kind: 'compare',
      title: 'Click here vs. saying where',
      before: { label: '"Click here"', text: '<p>For my Instagram, <a href="...">click here</a>.</p>\n<p>To book me, <a href="...">click here</a>.</p>\n\nScreen readers can list every link on a page. This one hears "click here, click here". Scanners skip it too: "click here" says nothing about where it goes.' },
      after: { label: 'Says where it goes', text: '<p><a href="...">Follow Mensah Beats on Instagram</a></p>\n<p><a href="...">Book Mensah Beats for your event</a></p>\n\nThe link text makes sense on its own. Read out in a list, scanned, or tapped: you always know where you\'re going.' },
      notes: [
        'Link text should make sense on its own, out of the sentence.',
        'Put the destination in the words: "Book Mensah Beats", not "click here".',
        'On phones, people tap, they don\'t click. "Click here" is wrong twice.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'Fix the vague link',
      caption: 'The first link says "here". The second says where it goes. Rewrite the first one.',
      code: '<p>My new beat is <a href="https://instagram.com/mensahbeats">here</a>.</p>\n<p><a href="https://instagram.com/mensahbeats">Hear Night Bus to Kumasi on Instagram</a></p>\n',
      challenge: 'Change the first link\'s text to Hear my new beat on Instagram.',
    },
  ],
  apply: {
    scenario: 'Kofi fixes his "click here" links.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which link text is best?',
        options: [
          { text: 'Click here', why: 'Says nothing about where it goes, and phone users tap, not click.' },
          { text: 'Here', why: 'Even vaguer. Out of the sentence, "here" means nothing.' },
          { text: 'Book Mensah Beats for your event' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the vague link: change click here to Follow Mensah Beats on Instagram',
        starter: '<p>For my Instagram, <a href="https://instagram.com/mensahbeats">click here</a>.</p>\n',
        solution: '<p><a href="https://instagram.com/mensahbeats">Follow Mensah Beats on Instagram</a></p>\n',
        hint: 'Change the words between <a ...> and </a>.',
        checks: [
          { message: 'The link says where it goes', dom: { selector: 'a', text: 'Follow Mensah Beats on Instagram' } },
          { message: 'It still goes to Instagram', dom: { selector: 'a[href*="instagram.com"]', count: 1 } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good link text, or vague?',
        groups: ['Good', 'Vague'],
        items: [
          { text: 'Listen to Jollof Bounce', group: 0 },
          { text: 'Click here', group: 1 },
          { text: 'See all my gigs', group: 0 },
          { text: 'More', group: 1 },
          { text: 'Read more', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ama',
        message: 'My phone just said "link, click here. Link, click here. Link, click here." Which one do I tap?',
        options: [
          { text: 'Good question. I\'ll make each link say where it goes.' },
          { text: 'Tap the middle one.', why: 'Ama can\'t see which is which from "click here". Fix the text.' },
          { text: 'Turn your phone off.', why: 'The phone is doing its job. The links need better words.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why is "click here" bad for screen reader users?',
        options: [
          { text: 'Screen readers can list all the links, and every one says the same thing' },
          { text: 'Screen readers can\'t read links', why: 'They can. That\'s why the text matters so much.' },
          { text: 'It\'s too short to hear', why: 'Length isn\'t the problem. It says nothing about the destination.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the link with vague text.',
        language: 'html',
        lines: ['<a href="gigs.html">See all my gigs</a>', '<a href="book.html">Click here</a>', '<a href="beats.html">Listen to my beats</a>'],
        bug: 1,
        fix: '<a href="book.html">Book me for your event</a>',
        explanation: '"Click here" says nothing. Say where it goes: Book me for your event.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Link text should make [[1]] on its own, and say [[2]] the link goes.',
        blanks: [['sense'], ['where']],
        distractors: ['noise', 'when', 'colour'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each vague link to a better one.',
        pairs: [
          ['Click here', 'Book Mensah Beats'],
          ['More', 'See all my gigs'],
          ['This', 'Listen to Jollof Bounce'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On phones, people don\'t click. What do they do? (one word)',
        answers: ['tap', 'touch', 'press'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Write a paragraph with a link to https://instagram.com/mensahbeats whose text says Hear my beats on Instagram',
        starter: '',
        solution: '<p><a href="https://instagram.com/mensahbeats">Hear my beats on Instagram</a></p>\n',
        hint: '<p><a href="...">Hear my beats on Instagram</a></p>',
        checks: [
          { message: 'A link to Instagram', dom: { selector: 'a[href*="instagram.com"]', count: 1 } },
          { message: 'Its text says where it goes', dom: { selector: 'a', text: 'Hear my beats on Instagram' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Read only the links on a page you use often. Do they make sense on their own?',
    starters: ['The links on... say...', 'They would be clearer if...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write three links to your favourite sites, each with link text that says exactly where it goes.',
  },
  notes: 'WCAG 2.2 Success Criterion 2.4.4 Link Purpose (In Context) and 2.4.9 (Link Only); WebAIM, "Links and Hypertext": avoid "click here". Screen readers offer a links list (NVDA Elements List, VoiceOver rotor).',
};

export default lesson;

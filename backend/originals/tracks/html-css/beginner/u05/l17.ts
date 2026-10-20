import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 17 — privacy before publishing: no personal phone number or home area; a booking email instead. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Before the whole world sees it',
  summary: 'Kofi\'s contact section has his personal phone number, the name of his street and his school. It was fine on his phone. Once it\'s live, anyone in the world can read it. Choose what stays.',
  minutes: 11,
  outcomes: ['Spot personal details that shouldn\'t be published', 'Offer a safer way to be contacted', 'Check a page for privacy before going live'],
  learn: [
    {
      kind: 'story',
      title: 'The contact section',
      beats: [
        { speaker: 'narrator', text: 'Under "Book me": Kofi\'s mobile number as a tap-to-call link. "Find me in my street, near the junction." And his school\'s name.' },
        { speaker: 'efua', text: 'Kofi. This is going on a poster. With a link. That strangers will open.' },
        { speaker: 'kofi', text: 'But the organiser needs to reach me.' },
        { speaker: 'tey', text: 'They do. The question is how, without handing your number and your street to everyone who walks past the poster.' },
      ],
      choice: {
        prompt: 'What should the contact section say?',
        options: [
          {
            text: 'A booking email made just for Mensah Beats, and only "Accra" as the location.',
            outcome: 'The organiser can book him, and a stranger learns nothing about where he lives or goes to school.',
            best: true,
          },
          {
            text: 'Keep everything. More ways to reach him means more bookings.',
            outcome: 'His number ends up in group chats he\'s never heard of. The calls start at midnight.',
          },
          {
            text: 'Remove all contact details. No way to book him at all.',
            outcome: 'Safe, but the organiser can\'t book him, and the page\'s main job is gone.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The safer contact section',
      caption: 'A mailto: link opens an email to his booking address. No phone number, no street.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; }\n  a { color: #FF9600; }\n</style>\n<h2 id="book">Book me</h2>\n<p>Based in Accra. For gigs and collabs:</p>\n<p><a href="mailto:bookings@example.com">bookings@example.com</a></p>\n',
      challenge: 'Tap the link. What does it try to open?',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Before going live, read your page as a stranger would. No personal phone number, home address, street or school. Use a separate email for bookings.',
    },
  ],
  apply: {
    scenario: 'The privacy check.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe to publish, or keep private?',
        groups: ['Safe to publish', 'Keep private'],
        items: [
          { text: 'A booking email', group: 0 },
          { text: 'His personal phone number', group: 1 },
          { text: 'His city, Accra', group: 0 },
          { text: 'His street and school', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Replace the phone link with an email link to bookings@example.com',
        starter: '<h2 id="book">Book me</h2>\n<p><a href="tel:+233000000000">Call me</a></p>\n',
        solution: '<h2 id="book">Book me</h2>\n<p><a href="mailto:bookings@example.com">bookings@example.com</a></p>\n',
        hint: '<a href="mailto:bookings@example.com">bookings@example.com</a>',
        checks: [
          { message: 'No phone link', dom: { selector: 'a[href^="tel:"]', count: 0 } },
          { message: 'An email link', dom: { selector: 'a[href^="mailto:"]', count: 1 } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Booking email and "Accra"', 'Bookable and safe'],
          ['Keep everything', 'Midnight calls from strangers'],
          ['Remove all contact', 'Nobody can book him'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use a separate email just for bookings?',
        options: [
          { text: 'If it gets spam or strangers, his personal accounts stay private' },
          { text: 'Hosts only allow one email', why: 'It\'s about keeping his own email private.' },
          { text: 'Emails are faster than calls', why: 'It\'s about privacy.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Can I just delete my number later if it\'s a problem?',
        options: [
          { text: 'I can remove it from the page, but people may already have copied it. Better never to publish it.' },
          { text: 'Yes, deleting undoes everything.', why: 'Copies and screenshots stay out there.' },
          { text: 'Numbers can\'t be copied.', why: 'Anything on a page can be copied.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that shares too much.',
        language: 'html',
        lines: ['<p>Based in Accra.</p>', '<p>Find me near the junction on my street, after school.</p>', '<p><a href="mailto:bookings@example.com">Email me</a></p>'],
        bug: 1,
        explanation: 'It tells strangers where he lives and when he\'s there. "Based in Accra" is enough.',
        fix: '<p>Based in Accra.</p>',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What happens when a fan taps this?',
        code: '<a href="mailto:bookings@example.com">Email me</a>',
        language: 'html',
        options: [
          { text: 'Their email app opens with the address filled in' },
          { text: 'It calls Kofi', why: 'tel: calls. mailto: emails.' },
          { text: 'Nothing, it\'s not a link', why: 'mailto: links open an email.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the email link.',
        language: 'html',
        template: '<a href="[[1]]:bookings@example.com">Email me</a>',
        blanks: [['mailto']],
        distractors: ['tel', 'email', 'http'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which link type opens an email? (the word before the colon)',
        answers: ['mailto', 'mailto:'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the privacy check in order.',
        lines: ['Read the page as a stranger would', 'Remove personal numbers and addresses', 'Add a booking email instead', 'Check the page again before uploading'],
      },
    ],
  },
  reflect: {
    prompt: 'Read your own page as a stranger. What does it tell them that you\'d rather it didn\'t?',
    starters: ['It tells them...', 'I\'ll change...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do the stranger test on your page. Remove anything personal, and if you want to be contactable, set up a separate email just for your site.',
  },
  notes: 'Privacy guidance kept general: avoid publishing personal phone numbers, home address or school, especially for young people. example.com is reserved for documentation (RFC 2606). The tel: number in the starter is a placeholder.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 12 — hr: a break between topics, not decoration. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Breaks between topics',
  summary: 'Kofi\'s page jumps from his story straight to his gigs with no pause. The hr element marks a change of topic, and draws a line that tells readers "something new starts here".',
  minutes: 11,
  outcomes: ['Use hr to mark a change of topic', 'Know when hr helps and when it\'s clutter', 'Recognise hr as another empty element'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap the parts of Kofi\'s page',
      text: '<h2>My story</h2>\n<p>I started making beats at 14.</p>\n<hr>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays, Osu.</p>\n<hr>\n<hr>\n<hr>',
      hotspots: [
        { phrase: '<p>I started making beats at 14.</p>\n<hr>', note: 'hr means "thematic break": the story is over, a new topic starts. Browsers draw a thin line across the page.' },
        { phrase: '<h2>Gigs</h2>', note: 'A new section after the break. The hr plus the heading make the change of topic obvious to scanners.' },
        { phrase: '<hr>\n<hr>\n<hr>', note: 'Three in a row is decoration, not a change of topic. It also tells screen readers "new topic" three times for nothing.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A pause between topics',
      caption: 'The hr draws a line between the story and the gigs. Like br, it\'s an empty element: no closing tag.',
      code: '<h2>My story</h2>\n<p>I started making beats at 14.</p>\n<hr>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays, Osu.</p>\n',
      challenge: 'Add another hr and a third section: Book me.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Use hr where the topic really changes. If you just want a pretty line, that\'s a job for CSS later.',
    },
  ],
  apply: {
    scenario: 'Kofi separates the topics on his page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does hr mean?',
        options: [
          { text: 'A heading row', why: 'It\'s a "thematic break": the topic changes here.' },
          { text: 'A change of topic' },
          { text: 'Hide the rest', why: 'Nothing is hidden. It marks a break between topics.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Mark the change of topic: put an hr between the story and the Gigs section',
        starter: '<h2>My story</h2>\n<p>I started at 14.</p>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays.</p>\n',
        solution: '<h2>My story</h2>\n<p>I started at 14.</p>\n<hr>\n<h2>Gigs</h2>\n<p>Sound Up Saturdays.</p>\n',
        hint: 'One <hr> on its own line, just above <h2>Gigs</h2>.',
        checks: [
          { message: 'One break between topics', dom: { selector: 'hr', count: 1 } },
          { message: 'The break comes right before the Gigs heading', dom: { selector: 'hr + h2', text: 'Gigs' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good place for an hr, or not?',
        groups: ['Good place', 'Not needed'],
        items: [
          { text: 'Between his story and his gigs', group: 0 },
          { text: 'Between every paragraph', group: 1 },
          { text: 'Before the copyright line at the end', group: 0 },
          { text: 'Five in a row for decoration', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does hr have a closing tag?',
        options: [
          { text: 'Yes, </hr>', why: 'hr is empty, like br. There\'s nothing to close.' },
          { text: 'Only sometimes', why: 'Never: it has no content.' },
          { text: 'No, it\'s an empty element like br' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Why is there a line between every single paragraph? It looks like lined paper.',
        options: [
          { text: 'Lined paper is a vibe.', why: 'Efua disagrees. An hr everywhere means nothing stands out as a real break.' },
          { text: 'You\'re right. I\'ll keep hr only where the topic actually changes.' },
          { text: 'I\'ll make them thicker so you notice them.', why: 'The problem is how many, not how thick.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s clutter, not a change of topic.',
        language: 'html',
        lines: ['<p>I started at 14.</p>', '<hr>', '<h2>Gigs</h2>', '<p>Saturday, 8pm.</p>', '<hr><hr><hr>'],
        bug: 4,
        explanation: 'Three hr in a row is decoration. One is enough, and only where a topic changes.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each empty element to its job.',
        pairs: [
          ['<br>', 'A new line inside a paragraph'],
          ['<hr>', 'A change of topic'],
          ['<p>', 'Not empty: a paragraph with content'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which two-letter element marks a change of topic?',
        answers: ['hr', '<hr>'],
        placeholder: 'Two letters',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the page.',
        language: 'html',
        template: '<p>That\'s my story.</p>\n[[1]]\n<h2>Gigs</h2>',
        blanks: [['<hr>']],
        distractors: ['</hr>', '<br>', '<line>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Three sections, two breaks: My story, Gigs and Book me, each an h2 with a paragraph, with an hr between each section',
        starter: '',
        solution: '<h2>My story</h2>\n<p>I started at 14.</p>\n<hr>\n<h2>Gigs</h2>\n<p>Saturday, 8pm.</p>\n<hr>\n<h2>Book me</h2>\n<p>Weddings and parties.</p>\n',
        hint: 'h2, p, hr, h2, p, hr, h2, p.',
        checks: [
          { message: 'Three sections', dom: { selector: 'h2', count: 3 } },
          { message: 'Two breaks', dom: { selector: 'hr', count: 2 } },
          { message: 'Each break comes right before a heading', dom: { selector: 'hr + h2', count: 2 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Where does your own page change topic? Is there one place a break would really help?',
    starters: ['My page changes topic when...', 'A break would help between...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, write two short sections about two hobbies, with one hr between them.',
  },
  notes: 'HTML Living Standard §4.4.2 hr: "a paragraph-level thematic break, e.g., a scene change in a story, or a transition to another topic within a section". Void element. Adjacent sibling selector hr + h2 checks placement.',
};

export default lesson;

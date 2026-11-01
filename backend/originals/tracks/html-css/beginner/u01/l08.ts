import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8 — tags inside tags (nesting), and closing them in the right order. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Tags inside tags',
  summary: 'Kofi wants ONE word in his paragraph to stand out. That means putting a tag inside a tag, and closing them in the right order, like boxes inside boxes.',
  minutes: 12,
  outcomes: ['Put an element inside another one', 'Close nested tags in the right order', 'Use strong for important words'],
  learn: [
    {
      kind: 'steps',
      title: 'Boxes inside boxes',
      steps: [
        { title: '1. Start with a paragraph', body: 'Here\'s a normal paragraph. The p element is a box with words in it.', code: '<p>Free entry before 9pm</p>', language: 'html' },
        { title: '2. Put a tag inside it', body: 'Kofi wants "Free entry" to stand out. The strong tag marks words as important, and browsers show them in bold. It goes inside the p box, around just those words.', code: '<p><strong>Free entry</strong> before 9pm</p>', language: 'html' },
        { title: '3. Close the inside box first', body: 'Open p, open strong, close strong, close p. The last box you opened is the first one you close, like putting a small box inside a big one and closing the small lid first.', code: '<p> <strong> ... </strong> </p>', language: 'html' },
        { title: '4. Never cross them', body: 'This is crossed: strong opens inside p but closes outside it. Browsers try to guess what you meant, and sometimes guess wrong. Always close in the right order.', code: '<p><strong>Free entry</p></strong>', language: 'html' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Make one word stand out',
      caption: 'strong is inside the paragraph, around one word only.',
      code: '<h1>Sound Up Saturdays</h1>\n<p><strong>Free entry</strong> before 9pm</p>\n',
      challenge: 'Add a second paragraph with the word Saturday inside strong tags.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s gig details need to stand out.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which one is nested correctly?',
        options: [
          { text: '<p><strong>Live</p></strong>', why: 'Crossed: strong opened last, so it has to close first.' },
          { text: '<p><strong>Live</strong></p>' },
          { text: '<strong><p>Live</strong></p>', why: 'Crossed again: p opened last, so </p> comes before </strong>.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Make the words Free entry important: put them inside strong tags, inside the paragraph',
        starter: '<p>Free entry before 9pm</p>\n',
        solution: '<p><strong>Free entry</strong> before 9pm</p>\n',
        hint: '<strong> goes right before Free, and </strong> right after entry.',
        checks: [
          { message: 'Free entry is inside strong tags', dom: { selector: 'strong', text: 'Free entry' } },
          { message: 'The strong is inside the paragraph', dom: { selector: 'p strong', text: 'Free entry' } },
          { message: 'Before 9pm is not bold', dom: { selector: 'strong', count: 1 } },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the tags in the right order.',
        lines: ['<p>', '<strong>', 'Live tonight', '</strong>', '</p>'],
        language: 'html',
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line where the tags are crossed.',
        language: 'html',
        lines: ['<h1>Gig night</h1>', '<p><strong>Saturday</p></strong>', '<p>Osu, Accra</p>'],
        bug: 1,
        fix: '<p><strong>Saturday</strong></p>',
        explanation: 'strong was opened last, so it closes first: </strong></p>.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Nesting', 'Putting one element inside another'],
          ['strong', 'Marks words as important (bold)'],
          ['Crossed tags', 'Closing the outside box before the inside one'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build: a paragraph with the word Tonight in strong',
        language: 'html',
        tiles: ['<p>', '<strong>', 'Tonight', '</strong>', '</p>'],
        distractors: ['<bold>', '</>'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'The browser fixed my crossed tags anyway. So it doesn\'t matter, right?',
        options: [
          { text: 'Right, browsers always fix everything.', why: 'Sometimes they guess right, sometimes not, and different browsers can guess differently.' },
          { text: 'It matters. Browsers guess, and a wrong guess breaks the page somewhere you won\'t notice.' },
          { text: 'Just use a different browser.', why: 'Your visitors use every browser there is. Correct code works in all of them.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which word shows in bold?',
        code: '<p>New beat <strong>Friday</strong> at 6pm</p>',
        language: 'html',
        options: [
          { text: 'The whole sentence', why: 'strong only wraps Friday.' },
          { text: 'New beat', why: 'New beat is outside the strong tags.' },
          { text: 'Friday' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Close the tags in the right order.',
        language: 'html',
        template: '<p><strong>Book now[[1]][[2]]',
        blanks: [['</strong>'], ['</p>']],
        distractors: ['<strong>', '<p>', '</b>'],
      },
      {
        kind: 'writeCode',
        prompt: 'Make a paragraph that says Next gig: Saturday, with only the word Saturday in strong',
        starter: '',
        solution: '<p>Next gig: <strong>Saturday</strong></p>\n',
        hint: '<p>Next gig: <strong>Saturday</strong></p>',
        checks: [
          { message: 'A paragraph that says Next gig: Saturday', dom: { selector: 'p', text: 'Next gig: Saturday' } },
          { message: 'Saturday is in strong, inside the paragraph', dom: { selector: 'p strong', text: 'Saturday' } },
          { message: 'Only Saturday is strong', dom: { selector: 'strong', count: 1 } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you could make only one word on your page stand out, which word would it be, and why?',
    starters: ['The word I\'d make stand out is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a short paragraph about your favourite song, and make the song\'s name strong. Then try crossing the tags on purpose and see what the browser does.',
  },
  notes: 'HTML Living Standard §4.5.3 strong ("strong importance, seriousness, or urgency"), rendered bold by default. Misnested formatting tags are handled by the "adoption agency algorithm" (§13.2.6.4.7); results vary by structure, which is the point of the lesson.',
};

export default lesson;

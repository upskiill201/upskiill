import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 2 · Chapter 2 · Lesson 17 — pasted CSS full of !important breaks overrides; debugging and cleaning it. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The snippet that took over',
  summary: 'Clinton found a "free gorgeous button CSS" snippet online and pasted it into Kofi\'s style.css. Now every link on the site is purple, and nothing Kofi writes can change it. Choose what to do.',
  minutes: 11,
  outcomes: ['Recognise CSS that overrides everything with !important and broad selectors', 'Debug which rule is winning', 'Clean up pasted code instead of fighting it'],
  learn: [
    {
      kind: 'story',
      title: 'Everything is purple',
      beats: [
        { speaker: 'narrator', text: 'The snippet is forty lines long. One of them says: a { color: purple !important; background-color: lavender !important; }' },
        { speaker: 'kofi', text: 'My .play-button rule says orange. It\'s still purple!' },
        { speaker: 'clinton', text: 'But the website said it was gorgeous...' },
        { speaker: 'miracle', text: 'Pasted CSS doesn\'t just add things. It competes with everything you\'ve already written.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Read the snippet, find the !important rules on broad selectors like a, and delete the parts he doesn\'t need.',
            outcome: 'Six lines stay, forty go. His own classes win again, and he understands every line in his stylesheet.',
            best: true,
          },
          {
            text: 'Add !important to his own .play-button rule too.',
            outcome: 'The play buttons turn orange, but every other link is still purple, and the next fix needs yet another !important.',
          },
          {
            text: 'Keep pasting more snippets until something looks right.',
            outcome: 'Three snippets later, nobody knows which rule does what. The site is slower to change than ever.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'The takeover',
      caption: 'The pasted a rule uses !important, so it beats Kofi\'s class even though the class is more specific.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .play-button { display: inline-block; padding: 12px 16px; background-color: #FF9600; color: #14213D; }\n  /* pasted snippet */\n  a { color: purple !important; background-color: lavender !important; }\n</style>\n<p><a class="play-button" href="#play">Play</a></p>\n',
      challenge: 'Delete the pasted line. Kofi\'s orange button comes back.',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Only paste CSS you\'ve read. Watch for !important and broad selectors like a, p or *: they affect every element, not just yours.',
    },
  ],
  apply: {
    scenario: 'The snippet that took over.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can\'t .play-button win against the pasted rule?',
        options: [
          { text: 'The pasted rule uses !important, which beats normal rules whatever their specificity' },
          { text: 'Classes are weaker than elements', why: 'Classes are stronger, but !important comes first.' },
          { text: 'Purple is a stronger colour', why: 'Colours have no strength.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Clean up: remove the pasted a rule so the Play button is orange (#FF9600) again',
        starter: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; }\n  a { color: purple !important; background-color: lavender !important; }\n</style>\n<p><a class="play-button" href="#play">Play</a></p>\n',
        solution: '<style>\n  .play-button { background-color: #FF9600; color: #14213D; }\n</style>\n<p><a class="play-button" href="#play">Play</a></p>\n',
        hint: 'Delete the line that starts with a {.',
        checks: [
          { message: 'Orange button again', dom: { selector: '.play-button', style: 'background-color', styleValue: '#FF9600' } },
          { message: 'Night-blue text', dom: { selector: '.play-button', style: 'color', styleValue: '#14213D' } },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Read and trim the snippet', 'His classes win again'],
          ['Add his own !important', 'Every other link still purple'],
          ['Paste more snippets', 'Nobody knows what does what'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'A warning sign in pasted CSS, or fine?',
        groups: ['Warning sign', 'Fine'],
        items: [
          { text: 'a { color: purple !important; }', group: 0 },
          { text: '.fancy-button { padding: 12px; }', group: 1 },
          { text: '* { margin: 0 !important; }', group: 0 },
          { text: '.fancy-button:focus { outline: 2px solid; }', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Sorry! How do I check a snippet before pasting it next time?',
        options: [
          { text: 'Read every line. Look for !important and rules on a, p, body or *. Try it in a test page first.' },
          { text: 'Check it has lots of stars.', why: 'Popularity doesn\'t tell you what it overrides.' },
          { text: 'Paste it at the very top, then it can\'t win.', why: '!important wins wherever it is.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the pasted line that will hijack every link.',
        language: 'css',
        lines: ['.fancy-button { border-radius: 8px; }', 'a { text-decoration: none !important; }', '.fancy-button { padding: 12px 16px; }'],
        bug: 1,
        explanation: 'It removes every link\'s underline, everywhere, and nothing normal can bring it back.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What colour is the Play link?',
        code: 'a { color: purple !important; }\n.play-button { color: #14213D; }\n\n<a class="play-button">Play</a>',
        language: 'html',
        options: [
          { text: 'Purple: !important beats the more specific class' },
          { text: 'Night blue: the class is more specific', why: 'Importance is checked before specificity.' },
          { text: 'Mixed', why: 'One value wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the warning.',
        template: 'Watch for [[1]] and broad selectors like [[2]].',
        blanks: [['!important', 'important'], ['a', '*', 'p']],
        distractors: ['.play-button', 'comments', '#FF9600'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before pasting CSS from the internet, what should you do with every line? (one word)',
        answers: ['read', 'read it', 'understand'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why is a rule on a broad selector like a risky in pasted code?',
        options: [
          { text: 'It affects every link on your site, not just the snippet\'s buttons' },
          { text: 'a is not allowed in CSS', why: 'It is. It\'s just very broad.' },
          { text: 'It only affects the first link', why: 'It affects every link.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever copied code you didn\'t fully understand? What happened?',
    starters: ['I copied...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'If your stylesheet has any pasted code, read it line by line. Delete what you don\'t need, and anything with !important on a broad selector.',
  },
  notes: 'Importance is resolved before specificity in the cascade. purple and lavender are CSS named colours. The :focus rule appears only as a "fine" example; focus styles are taught in Course 3.',
};

export default lesson;

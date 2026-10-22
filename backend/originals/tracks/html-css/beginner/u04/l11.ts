import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 11 — story choice: Kofi wants every colour at once (outline choice). */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Every colour at once',
  summary: 'Kofi discovers he can colour anything. By midnight his page has a lime heading, a purple background, red paragraphs, yellow links and a cyan footer. He sends it to the group chat, very proud. Efua replies first.',
  minutes: 11,
  outcomes: ['Recognise when colour is helping and when it\'s hurting', 'Use one accent colour with purpose', 'Keep colour choices consistent across the page'],
  learn: [
    {
      kind: 'story',
      title: 'Midnight',
      beats: [
        { speaker: 'narrator', text: 'Midnight. Kofi\'s page: lime heading, purple background, red paragraphs, yellow links, a cyan footer, and one orange word for luck.' },
        { speaker: 'kofi', text: '(in the group chat) BEHOLD. Mensah Beats, now in colour.' },
        { speaker: 'efua', text: 'My eyes. Kofi, what is the most important thing on this page?' },
        { speaker: 'kofi', text: '...The play buttons?' },
        { speaker: 'efua', text: 'Then why is everything else shouting louder than them?' },
        { speaker: 'tey', text: 'Colour is how a page says "look here". If everything says it at once, nothing gets noticed. Fewer colours, used on purpose, guide the eye.' },
      ],
      choice: {
        prompt: 'What should Kofi do with his rainbow page?',
        options: [
          {
            text: 'Strip back to a background, a text colour and one accent, used only for headings, links and players.',
            outcome: 'The orange accent now lands on exactly the things you can tap. Ama finds the play button in two seconds. Efua: "There it is."',
            best: true,
          },
          {
            text: 'Keep it. It\'s his site and he likes it.',
            outcome: 'It\'s his site, but it\'s for his fans. The organiser messages: "Where do I press play?"',
          },
          {
            text: 'Remove all colour and go back to black and white.',
            outcome: 'Calm, but it no longer sounds like his music. Colour isn\'t the problem; too much of it is.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'One accent, on purpose',
      caption: 'The accent colour only goes on things you can tap or need to notice. Everything else stays calm.',
      code: '<style>\n  body { background-color: midnightblue; color: white; }\n  h1, a { color: orange; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New beat every Friday.</p>\n<p><a href="#beats">Listen now</a></p>\n',
      challenge: 'Add p { color: lime; } and notice how the accent stops standing out. Then delete it again.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Colour means "look here". Use one accent, on purpose, for what matters most.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s rainbow page.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the rainbow page hide the play buttons?',
        options: [
          { text: 'The players were broken', why: 'They worked. They just didn\'t stand out.' },
          { text: 'Everything was shouting, so nothing stood out' },
          { text: 'Purple can\'t show buttons', why: 'Too many colours competed for attention.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Calm the page down: one rule that makes the paragraphs use the page\'s white text, and keep the orange accent on h1 and links',
        starter: '<style>\n  body { background-color: midnightblue; color: white; }\n  h1, a { color: orange; }\n  p { color: lime; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New beat every <a href="#beats">Friday</a>.</p>\n',
        solution: '<style>\n  body { background-color: midnightblue; color: white; }\n  h1, a { color: orange; }\n  p { color: white; }\n</style>\n<h1>Mensah Beats</h1>\n<p>New beat every <a href="#beats">Friday</a>.</p>\n',
        hint: 'Change p { color: lime; } to white, or delete that rule.',
        checks: [
          { message: 'Paragraphs are white', dom: { selector: 'p', style: 'color', styleValue: 'white' } },
          { message: 'The heading is still orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
          { message: 'Links are still orange', dom: { selector: 'a', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Should it get the accent colour?',
        groups: ['Accent', 'Stay calm'],
        items: [
          { text: 'The Listen now link', group: 0 },
          { text: 'A long paragraph about his story', group: 1 },
          { text: 'The main heading', group: 0 },
          { text: 'The footer\'s small print', group: 1 },
          { text: 'The Book me link', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'But it\'s MY site. Shouldn\'t it look how I like?',
        options: [
          { text: 'No, do what Efua says.', why: 'It\'s his style, used with purpose.' },
          { text: 'Add even more colours.', why: 'More colours, less noticed.' },
          { text: 'Yes, and it\'s also for fans. Keep your colours, just use fewer, so they can find the beats.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the rule that fights the accent.',
        language: 'css',
        lines: ['body { background-color: midnightblue; color: white; }', 'h1, a { color: orange; }', 'p { color: yellow; }'],
        bug: 2,
        explanation: 'Bright yellow paragraphs compete with the orange accent. Let text stay calm.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Three colours, one accent', 'Ama finds play in two seconds'],
          ['Keep the rainbow', '"Where do I press play?"'],
          ['Black and white only', 'No longer sounds like his music'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which thing stands out most on this page?',
        code: '<style>\n  body { background-color: midnightblue; color: white; }\n  a { color: orange; }\n</style>\n<p>Long story about Kofi...</p>\n<p><a href="#">Listen now</a></p>',
        language: 'html',
        options: [
          { text: 'The story paragraph', why: 'It\'s calm white like the rest.' },
          { text: 'The orange Listen now link' },
          { text: 'They all look the same', why: 'The accent sets the link apart.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule of thumb.',
        template: 'Colour means "look [[1]]". Use one [[2]], on purpose.',
        blanks: [['here'], ['accent']],
        distractors: ['away', 'rainbow', 'font'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many colours did Kofi strip back to? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps people find things, or gets in the way?',
        groups: ['Helps', 'Gets in the way'],
        items: [
          { text: 'One accent for tappable things', group: 0 },
          { text: 'A different colour per paragraph', group: 1 },
          { text: 'Calm body text', group: 0 },
          { text: 'Neon everything', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the single most important thing on your page? Does your colour point people to it?',
    starters: ['The most important thing is...', 'My colour...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look at your page in the playground. Give the accent colour only to links and headings, and see if it feels calmer.',
  },
  notes: 'Outline choice for Chapter 4: "Kofi wants every colour at once." Using colour for emphasis sparingly is standard visual design guidance (visual hierarchy).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 11 — the gig countdown banner: never flash; pulse gently a few times. Story choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '"3 DAYS LEFT!!!"',
  summary: 'The end-of-year show is close, and Clinton wants a banner across the top: "3 DAYS LEFT!!!" in red, flashing on and off as fast as possible. "Nobody will miss it." Choose how the banner gets attention.',
  minutes: 11,
  outcomes: ['Explain why fast flashing is dangerous', 'Get attention with a gentle animation that stops', 'Keep a countdown readable'],
  learn: [
    {
      kind: 'story',
      title: 'Nobody will miss it',
      beats: [
        { speaker: 'clinton', text: 'Flash it red and white, ten times a second. Nobody will miss it!' },
        { speaker: 'miracle', text: 'Some people could have a seizure from that. It\'s not a joke: fast flashing is one of the few things on a website that can physically hurt someone.' },
        { speaker: 'kofi', text: 'So how do I make people notice?' },
        { speaker: 'tey', text: 'Contrast and position do most of the work. Motion can add a gentle nudge, then stop.' },
      ],
      choice: {
        prompt: 'How should the countdown banner get attention?',
        options: [
          {
            text: 'A bold, high-contrast banner at the top that pulses gently two or three times when the page opens, then stays still.',
            outcome: 'Everyone sees it, nobody is hurt or annoyed, and it\'s easy to read while still.',
            best: true,
          },
          {
            text: 'Flash it red and white ten times a second.',
            outcome: 'It\'s painful to look at, impossible to read, and could trigger a seizure in someone with photosensitive epilepsy.',
          },
          {
            text: 'Make it bounce up and down forever.',
            outcome: 'People can\'t read the gig details below it without the banner tugging at their eyes.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>The flashing rule:</strong> the web\'s accessibility guidelines say nothing should flash more than three times in any one second. Safest of all: don\'t flash. Use colour and size to make the banner stand out, and if you animate it, use a slow, gentle pulse with a count, so it stops.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Noticed, not shouted',
      caption: 'A gold banner that gently grows and settles twice when the page opens, then stays still and readable.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .countdown { background-color: #FFC83D; color: #14213D; text-align: center; padding: 12px; font-weight: bold; animation: nudge 1.5s ease-in-out 2; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n</style>\n<p class="countdown">3 days to the end-of-year show: Sat 20 Dec, Accra</p>\n',
      challenge: 'Change the count from 2 to 1. Still noticeable?',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never flash more than three times a second; best of all, never flash. Pulse gently, a few times, then stop.',
    },
  ],
  apply: {
    scenario: 'The countdown banner.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is fast flashing dangerous?',
        options: [
          { text: 'It uses too much battery', why: 'The real danger is to people.' },
          { text: 'It can trigger seizures in people with photosensitive epilepsy' },
          { text: 'It isn\'t dangerous', why: 'Fast flashing can cause seizures.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Give the banner a gentle nudge: animation nudge 1.5s ease-in-out 2',
        starter: '<style>\n  .countdown { background-color: #FFC83D; color: #14213D; padding: 12px; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n</style>\n<p class="countdown">3 days to the end-of-year show</p>\n',
        solution: '<style>\n  .countdown { background-color: #FFC83D; color: #14213D; padding: 12px; animation: nudge 1.5s ease-in-out 2; }\n  @keyframes nudge { 50% { transform: scale(1.03); } }\n</style>\n<p class="countdown">3 days to the end-of-year show</p>\n',
        hint: 'animation: nudge 1.5s ease-in-out 2;',
        checks: [
          { message: 'The banner is animated', dom: { selector: '.countdown', style: 'animation' } },
          { message: 'Slowly', codeIncludes: '1.5s' },
          { message: 'Twice, then it stops', codeIncludes: 'ease-in-out 2' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Bold banner, gentle pulse, stops', 'Seen and readable'],
          ['Ten flashes a second', 'Painful and dangerous'],
          ['Bouncing forever', 'Tugs at your eyes'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe way to get attention, or not?',
        groups: ['Safe', 'Not safe or not kind'],
        items: [
          { text: 'High contrast and a top position', group: 0 },
          { text: 'Flashing five times a second', group: 1 },
          { text: 'A slow pulse, twice', group: 0 },
          { text: 'An endless bounce', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'What if it only flashes for a second?',
        options: [
          { text: 'Even a second of fast flashing can cause harm. Make it stand out with colour and size instead.' },
          { text: 'One second is fine.', why: 'The limit is about flashes in any one second.' },
          { text: 'Then flash it faster.', why: 'More dangerous.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the dangerous animation.',
        language: 'css',
        lines: ['.countdown { animation: nudge 1.5s ease-in-out 2; }', '.countdown { animation: flash 0.1s linear infinite; }', '.new { animation: pulse 1.2s ease-in-out 3; }'],
        bug: 1,
        explanation: 'A 0.1s flash forever is ten flashes a second, endlessly. Never do this.',
        fix: '.countdown { animation: nudge 1.5s ease-in-out 2; }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'How many times does this flash per second?',
        code: '@keyframes flash { 50% { opacity: 0; } }\n.banner { animation: flash 0.25s linear infinite; }',
        language: 'css',
        options: [
          { text: 'Once a second', why: 'Each flash takes 0.25s, so four per second.' },
          { text: 'Four times a second: too many' },
          { text: 'Never', why: 'It flashes every 0.25s.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the safety rule.',
        template: 'Never flash more than [[1]] times in one [[2]].',
        blanks: [['three', '3'], ['second']],
        distractors: ['ten', 'minute', 'hour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the safest number of flashes on a website? (a number)',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does most of the work in making a banner noticeable?',
        options: [
          { text: 'Flashing', why: 'Dangerous, and not needed.' },
          { text: 'Constant movement', why: 'It distracts more than it helps.' },
          { text: 'Contrast, size and position' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something on your page you want people to notice? How can colour and position do the work?',
    starters: ['I want them to notice...', 'I\'ll make it...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "WCAG three flashes or below threshold" and read the short explanation of why flashing is dangerous.',
  },
  notes: 'WCAG 2.3.1 Three Flashes or Below Threshold (A); 2.3.2 Three Flashes (AAA). Photosensitive epilepsy risk from flashing is well documented. The countdown text is updated by Kofi by hand; live counting needs JavaScript, which this track doesn\'t teach.',
};

export default lesson;

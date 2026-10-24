import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 7 — history: blink and marquee, Flash, CSS transitions and animations. Reading. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Blinking text and Flash',
  summary: 'Miracle shows Kofi a screenshot of a 1990s website: blinking words, scrolling banners, a spinning envelope. "We\'ve always wanted the web to move," she says. "We just got better at it."',
  minutes: 12,
  outcomes: ['Describe how early websites added motion', 'Explain why Flash disappeared', 'Explain where CSS transitions and animations came from'],
  learn: [
    {
      kind: 'reading',
      title: 'How the web learned to move',
      html:
        '<p>In the mid-1990s, two browser makers each added their own moving tag. Netscape had <strong>&lt;blink&gt;</strong>, which made text flash on and off. Internet Explorer had <strong>&lt;marquee&gt;</strong>, which scrolled text across the screen like a news ticker. Pages blinked and scrolled everywhere, and both tags became famous as examples of what not to do. Modern browsers dropped blink long ago.</p>' +
        '<p>For bigger animations, sites used <strong>animated GIFs</strong> and, from the late 1990s, <strong>Flash</strong>: a plug-in that played animations, games and video inside a page. For years, Flash was how websites moved. But it needed installing, drained phone batteries, had security problems, and the iPhone never supported it. Adobe, which made it, stopped supporting Flash at the end of 2020.</p>' +
        '<p>Meanwhile, browser makers were building motion into CSS itself. In 2007, Apple\'s WebKit team (the engine behind Safari) proposed <strong>CSS transitions and animations</strong>. They became web standards, and today every major browser supports them, with no plug-in and very little code.</p>' +
        '<p>The lesson of the 1990s still stands: motion that blinks, flashes or never stops is tiring, distracting, and for some people genuinely harmful. Good motion is short, gentle and purposeful.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Then and now',
      caption: 'A modern, gentle version of "look here": a soft glow that plays twice and stops. No blink, no marquee.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .new { display: inline-block; padding: 4px 10px; border-radius: 8px; background-color: #FFC83D; color: #14213D; animation: glow 1.5s ease-in-out 2; }\n  @keyframes glow { 50% { transform: scale(1.08); } }\n</style>\n<p>Rain on Zinc <span class="new">New</span></p>\n',
      challenge: 'Change the 2 to 1. It plays once, then rests.',
    },
  ],
  apply: {
    scenario: 'Blinking text and Flash.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the ways of adding motion in order.',
        lines: ['blink and marquee tags', 'Animated GIFs and Flash', 'CSS transitions and animations proposed', 'CSS motion in every major browser'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Flash disappear?',
        options: [
          { text: 'It was too simple', why: 'It was powerful, but had serious problems.' },
          { text: 'It needed a plug-in, drained batteries, had security problems, and Adobe ended support in 2020' },
          { text: 'It never existed', why: 'It was hugely popular for years.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each to what it did.',
        pairs: [
          ['<blink>', 'Flashed text on and off'],
          ['<marquee>', 'Scrolled text across the screen'],
          ['Flash', 'Played animations in a plug-in'],
          ['CSS transitions', 'Smooth changes, built into browsers'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good modern motion, or a 1990s habit?',
        groups: ['Good motion', '1990s habit'],
        items: [
          { text: 'A short hover lift', group: 0 },
          { text: 'Text that blinks forever', group: 1 },
          { text: 'A badge that glows twice and stops', group: 0 },
          { text: 'A banner that scrolls non-stop', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Make the New badge glow only once: change the animation\'s count from 2 to 1',
        starter: '<style>\n  .new { animation: glow 1.5s ease-in-out 2; }\n  @keyframes glow { 50% { transform: scale(1.08); } }\n</style>\n<span class="new">New</span>\n',
        solution: '<style>\n  .new { animation: glow 1.5s ease-in-out 1; }\n  @keyframes glow { 50% { transform: scale(1.08); } }\n</style>\n<span class="new">New</span>\n',
        hint: 'animation: glow 1.5s ease-in-out 1;',
        checks: [
          { message: 'Plays once', codeIncludes: 'ease-in-out 1;' },
          { message: 'Keyframes kept', codeIncludes: '@keyframes glow' },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Bring back marquee! A scrolling banner of gig dates!',
        options: [
          { text: 'Yes, marquee is the best.', why: 'It\'s hard to read and distracting.' },
          { text: 'Make it scroll faster.', why: 'Even harder to read.' },
          { text: 'Scrolling text is hard to read and never stops. A clear, still list of dates is easier for everyone.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the statement that\'s wrong.',
        lines: ['CSS transitions don\'t need a plug-in.', 'Flash is the best way to animate a website today.', 'blink and marquee were early moving tags.'],
        bug: 1,
        explanation: 'Flash support ended in 2020. Today motion is built into CSS.',
      },
      {
        kind: 'mcq',
        prompt: 'Who proposed CSS transitions and animations?',
        options: [
          { text: 'Netscape, in 1995', why: 'Netscape made blink.' },
          { text: 'Apple\'s WebKit team, in 2007' },
          { text: 'Adobe, with Flash', why: 'Flash was a separate plug-in.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the lesson of the 1990s.',
        template: 'Good motion is short, [[1]] and [[2]].',
        blanks: [['gentle'], ['purposeful']],
        distractors: ['flashing', 'endless', 'loud'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Adobe stop supporting Flash? (a year)',
        answers: ['2020'],
        placeholder: 'A year',
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the most annoying motion you\'ve seen on a website or app? Why was it annoying?',
    starters: ['The worst was...', 'It annoyed me because...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "MDN using CSS animations" and read the introduction.',
  },
  notes: 'blink: Netscape Navigator (c. 1994–95), removed from modern browsers; marquee: Internet Explorer, now obsolete. Flash (Macromedia, later Adobe) end of support 31 December 2020; never supported on iPhone. WebKit proposed CSS Transitions/Animations in 2007 (WebKit blog).',
};

export default lesson;

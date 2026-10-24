import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 17 — endless auto-moving content: the five-second rule, play once, pause on hover. Story choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The slideshow that never stops',
  summary: 'Kofi builds a strip of covers that slides sideways across the top of the page, forever, like a shop window display. Ama tries to read the beat names as they slide past. She can\'t. Choose what happens to the strip.',
  minutes: 11,
  outcomes: ['Explain the five-second rule for moving content', 'Use animation-play-state to pause on hover and focus', 'Choose still layouts over endless motion'],
  learn: [
    {
      kind: 'story',
      title: 'Too fast to read',
      beats: [
        { speaker: 'narrator', text: 'Covers glide from right to left across the top of the page, on a loop that never ends.' },
        { speaker: 'ama', text: 'I wanted to tap Harmattan Morning but it went away.' },
        { speaker: 'miracle', text: 'There\'s a rule for this: if something moves on its own for more than five seconds, people need a way to pause or stop it.' },
        { speaker: 'tey', text: 'And often the best answer is simply not to make it move.' },
      ],
      choice: {
        prompt: 'What should happen to the sliding strip?',
        options: [
          {
            text: 'Replace it with the still cover gallery, newest first. If any strip stays, it pauses when people point at it or tab into it, and stops for reduced motion.',
            outcome: 'Ama taps Harmattan Morning first time. Nothing on the page moves unless it helps.',
            best: true,
          },
          {
            text: 'Keep it sliding forever, just slower.',
            outcome: 'Still impossible to tap reliably, and still tugging at everyone\'s eyes while they read.',
          },
          {
            text: 'Make it slide faster so people see more covers.',
            outcome: 'Nobody can read anything. Grandma has to look away.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p><strong>The five-second rule:</strong> anything that moves, scrolls or blinks on its own for more than five seconds needs a way for people to pause, stop or hide it. <strong>animation-play-state: paused</strong> freezes an animation where it is. Pausing on :hover and :focus-within helps mouse and keyboard users, but phone users can\'t hover, so a still layout is often the kinder choice.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Pause when you point',
      caption: 'The strip slides slowly, but freezes while you point at it (and while a link inside it has keyboard focus). For reduced motion, it doesn\'t move at all.',
      code: '<style>\n  body { margin: 0; background-color: #14213D; font-family: Verdana, sans-serif; overflow-x: hidden; }\n  .strip { display: flex; gap: 8px; width: max-content; animation: slide 20s linear infinite; }\n  .strip img { width: 100px; height: auto; border-radius: 6px; }\n  .strip:hover, .strip:focus-within { animation-play-state: paused; }\n  @keyframes slide { to { transform: translateX(-50%); } }\n  @media (prefers-reduced-motion: reduce) { .strip { animation: none; } }\n</style>\n<section class="strip">\n  <img src="cover-1.png" alt="Rain on Zinc cover" width="400" height="400"><img src="cover-2.png" alt="Harmattan Morning cover" width="400" height="400"><img src="cover-3.png" alt="Night Bus to Kumasi cover" width="400" height="400"><img src="cover-1.png" alt="Sunrise in Osu cover" width="400" height="400"><img src="cover-2.png" alt="Jollof Bounce cover" width="400" height="400"><img src="cover-3.png" alt="Kente Code cover" width="400" height="400">\n</section>\n',
      challenge: 'Delete the :hover/:focus-within rule. Can you still read a cover as it moves?',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Moving for more than 5 seconds? People must be able to pause it. Often the best fix is to keep it still.',
    },
  ],
  apply: {
    scenario: 'The slideshow that never stops.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the five-second rule say?',
        options: [
          { text: 'Anything that moves on its own for over five seconds needs a way to pause or stop it' },
          { text: 'Animations must last five seconds', why: 'It\'s about letting people stop long motion.' },
          { text: 'Pages must load in five seconds', why: 'It\'s about moving content.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Let people freeze the strip: .strip:hover, .strip:focus-within get animation-play-state paused',
        starter: '<style>\n  .strip { display: flex; animation: slide 20s linear infinite; }\n  @keyframes slide { to { transform: translateX(-50%); } }\n\n</style>\n<section class="strip"><img src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        solution: '<style>\n  .strip { display: flex; animation: slide 20s linear infinite; }\n  @keyframes slide { to { transform: translateX(-50%); } }\n  .strip:hover, .strip:focus-within { animation-play-state: paused; }\n</style>\n<section class="strip"><img src="cover-1.png" alt="Rain on Zinc cover"></section>\n',
        hint: '.strip:hover, .strip:focus-within { animation-play-state: paused; }',
        checks: [
          { message: 'Pauses the animation', codeIncludes: 'animation-play-state: paused' },
          { message: 'For mouse users', codeIncludes: ':hover' },
          { message: 'And keyboard users', codeIncludes: ':focus-within' },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['A still gallery', 'Ama taps first time'],
          ['Slower, but endless', 'Still hard to tap'],
          ['Faster', 'Nobody can read it'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a way to pause, or fine as it is?',
        groups: ['Needs a pause', 'Fine'],
        items: [
          { text: 'A strip that slides forever', group: 0 },
          { text: 'A badge that pulses three times', group: 1 },
          { text: 'A banner that scrolls non-stop', group: 0 },
          { text: 'A card that lifts on hover', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'Is pausing on hover enough?',
        options: [
          { text: 'Yes, hover works everywhere.', why: 'Phones don\'t hover.' },
          { text: 'Add more hover effects.', why: 'Phone users still can\'t pause it.' },
          { text: 'It helps mouse and keyboard users, but phones can\'t hover. A still gallery works for everyone.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks the five-second rule.',
        language: 'css',
        lines: ['.new { animation: pulse 1.2s ease-in-out 3; }', '.ticker { animation: scroll 10s linear infinite; }', '.card { transition: transform 200ms ease-out; }'],
        bug: 1,
        explanation: 'It moves forever with no way to pause. Pause it on hover and focus, stop it for reduced motion, or keep it still.',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'A keyboard user tabs to a link inside the strip. What happens?',
        code: '.strip { animation: slide 20s linear infinite; }\n.strip:focus-within { animation-play-state: paused; }',
        language: 'css',
        options: [
          { text: 'It keeps sliding', why: ':focus-within pauses it.' },
          { text: 'The strip freezes while focus is inside it' },
          { text: 'It restarts from the beginning', why: 'paused freezes it where it is.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Freeze the strip.',
        language: 'css',
        template: '.strip:hover { animation-[[1]]: [[2]]; }',
        blanks: [['play-state'], ['paused']],
        distractors: ['delay', 'stopped', 'none'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After how many seconds of moving on its own must people be able to pause something? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does :focus-within match?',
        options: [
          { text: 'An element when anything inside it has keyboard focus' },
          { text: 'Only the element itself when focused', why: 'That\'s :focus.' },
          { text: 'Elements with a mouse over them', why: 'That\'s :hover.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is anything on your page moving on its own for more than five seconds? What will you do?',
    starters: ['My...', 'I\'ll...'],
  },
  deepen: {
    title: 'Read more',
    summary: 'Search "WCAG pause stop hide" and read what counts as moving content.',
  },
  notes: 'WCAG 2.2.2 Pause, Stop, Hide (Level A): moving content that starts automatically, lasts more than 5 seconds and is shown with other content needs a pause/stop/hide mechanism. Hover/focus pausing alone isn\'t a complete mechanism for touch users, hence the still-gallery best choice.',
};

export default lesson;

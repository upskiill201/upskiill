import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 2 · Lesson 13 — prefers-reduced-motion: who turns motion off, and how to respect it. Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'When motion makes people ill',
  summary: 'Grandma says the dealing covers and the pulsing banner make her feel a bit dizzy. On her phone, she\'s even switched on a setting called "Reduce motion". Tey explains what that setting is for, and how a site can listen to it.',
  minutes: 11,
  outcomes: ['Explain why some people turn motion off', 'Use the prefers-reduced-motion media query', 'Keep the information when the motion goes'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'For some people, movement on a screen causes dizziness, nausea or headaches, especially big movements like zooming, sliding or spinning. This is common with vestibular (inner-ear) conditions, migraines, and simply with age.',
          replies: ['So they turn it off?'],
        },
        {
          tey: 'Phones and computers have a setting for it, often called "Reduce motion". Websites can read it with a media query: @media (prefers-reduced-motion: reduce) { ... }. Rules inside apply only for people who asked for less motion.',
          replies: ['What do I put inside?'],
        },
        {
          tey: 'Turn off the big stuff: the dealing, the pulsing, the lifting. animation: none; and transition: none; on those elements. Colour changes on hover are usually fine to keep.',
          replies: ['Do they miss anything?'],
        },
        {
          tey: 'They shouldn\'t. Motion should decorate, not carry information. Without the pulse, the banner still says "3 days to the show". Without the dealing, the covers are simply there.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Respect the setting',
      caption: 'If your device has "Reduce motion" turned on, the badge won\'t pulse. Everyone else sees the gentle pulse.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  .new { display: inline-block; padding: 4px 10px; border-radius: 8px; background-color: #FFC83D; color: #14213D; animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n  @media (prefers-reduced-motion: reduce) {\n    .new { animation: none; }\n  }\n</style>\n<h2>Rain on Zinc <span class="new">New</span></h2>\n',
      challenge: 'Find your own device\'s reduce-motion setting (check locally: it\'s usually under Accessibility) and try it.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '@media (prefers-reduced-motion: reduce) { animation: none; transition: none; } for the big motion. Never let motion carry the information.',
    },
  ],
  apply: {
    scenario: 'When motion makes people ill.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do some people turn on "Reduce motion"?',
        options: [
          { text: 'To save battery only', why: 'For many it\'s about feeling unwell.' },
          { text: 'Movement on screen can make them dizzy, sick or give them headaches' },
          { text: 'They don\'t like colours', why: 'It\'s about motion.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Respect the setting: inside @media (prefers-reduced-motion: reduce), give .new animation: none',
        starter: '<style>\n  .new { animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n\n</style>\n<span class="new">New</span>\n',
        solution: '<style>\n  .new { animation: pulse 1.2s ease-in-out 3; }\n  @keyframes pulse { 50% { transform: scale(1.1); } }\n  @media (prefers-reduced-motion: reduce) {\n    .new { animation: none; }\n  }\n</style>\n<span class="new">New</span>\n',
        hint: '@media (prefers-reduced-motion: reduce) { .new { animation: none; } }',
        checks: [
          { message: 'Listens for the setting', codeIncludes: 'prefers-reduced-motion' },
          { message: 'Asking for less', codeIncludes: 'reduce' },
          { message: 'Turns the animation off', codeIncludes: 'animation: none' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Turn it off for reduced motion, or fine to keep?',
        groups: ['Turn off', 'Fine to keep'],
        items: [
          { text: 'Covers dealing in', group: 0 },
          { text: 'A hover colour change', group: 1 },
          { text: 'A pulsing banner', group: 0 },
          { text: 'A focus outline', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to its job.',
        pairs: [
          ['prefers-reduced-motion', 'The person\'s motion setting'],
          ['reduce', 'They asked for less motion'],
          ['animation: none', 'Stop the animation'],
          ['transition: none', 'Changes happen instantly'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'If the banner doesn\'t pulse for Grandma, will she miss the countdown?',
        options: [
          { text: 'No: the banner still says "3 days to the show" in bold. The pulse was only decoration.' },
          { text: 'Yes, so keep the pulse.', why: 'The words carry the information.' },
          { text: 'Hide the banner for her.', why: 'Keep the information, lose the motion.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the media query that will never match.',
        language: 'css',
        lines: ['@media (prefers-reduced-motion: reduce) { .new { animation: none; } }', '@media (reduce-motion: yes) { .card { transition: none; } }', '@media (min-width: 700px) { .page { grid-template-columns: 2fr 1fr; } }'],
        bug: 1,
        explanation: 'Not a real media feature. It\'s prefers-reduced-motion: reduce.',
        fix: '@media (prefers-reduced-motion: reduce) { .card { transition: none; } }',
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Grandma has "Reduce motion" on. What does the badge do?',
        code: '.new { animation: pulse 1.2s ease-in-out 3; }\n@media (prefers-reduced-motion: reduce) { .new { animation: none; } }',
        language: 'css',
        options: [
          { text: 'Pulses three times', why: 'The media query turns it off for her.' },
          { text: 'Stays still, but is still shown' },
          { text: 'Disappears', why: 'Only the animation is removed.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the media query.',
        language: 'css',
        template: '@media ([[1]]: [[2]]) {\n  .card { transition: none; }\n}',
        blanks: [['prefers-reduced-motion'], ['reduce']],
        distractors: ['reduce-motion', 'none', 'off'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What value of prefers-reduced-motion means "less motion please"? (one word)',
        answers: ['reduce'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What should never depend on motion?',
        options: [
          { text: 'Decoration', why: 'Decoration is exactly what motion is for.' },
          { text: 'Nothing; motion can carry anything', why: 'Some people turn it off.' },
          { text: 'Important information, like the gig date' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Do you know anyone who gets motion sick? How might big screen animations affect them?',
    starters: ['I know...', 'It might...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Add a prefers-reduced-motion block to your stylesheet that turns off your animations and transforms. Test it with your device\'s Reduce motion setting.',
  },
  notes: 'Media Queries Level 5 prefers-reduced-motion. Vestibular disorders and migraine sensitivity to motion (WCAG 2.3.3 Animation from Interactions, AAA). Media query checks use codeIncludes because the loader ignores @media.',
};

export default lesson;

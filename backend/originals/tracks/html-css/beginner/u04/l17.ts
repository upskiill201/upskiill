import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17 — story choice: a missing brace breaks half the stylesheet; how to debug it. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Half the styles vanished',
  summary: 'Kofi adds one new rule and suddenly his links are blue again, his paragraphs are cramped and the font is back to the old one. Only the top of his stylesheet still works. He wants to delete everything and start over.',
  minutes: 11,
  outcomes: ['Find a missing brace that breaks later rules', 'Debug CSS one change at a time', 'Read your stylesheet from the top down'],
  learn: [
    {
      kind: 'story',
      title: 'Everything below the line',
      beats: [
        { speaker: 'narrator', text: 'Kofi adds a rule for his gig dates. The heading is still orange, but every rule after the new one has stopped working.' },
        { speaker: 'kofi', text: 'I broke CSS. All of it. I\'m deleting the whole style tag and starting again.' },
        { speaker: 'miracle', text: '(on the video call) Don\'t. When the top works and the bottom doesn\'t, the problem is usually right where it stops. What did you add last?' },
        { speaker: 'tey', text: 'A missing closing brace means the browser thinks your next rules are still inside the broken one. It can\'t read them, so it skips them.' },
      ],
      choice: {
        prompt: 'What should Kofi do?',
        options: [
          {
            text: 'Look at the last rule he added, and check every brace and semicolon from there.',
            outcome: 'Line 9: dl { color: gold; with no closing brace. He adds }, and every style comes back at once. Thirty seconds.',
            best: true,
          },
          {
            text: 'Delete the whole style tag and rewrite it from memory.',
            outcome: 'An hour later he has most of it back, plus two new typos.',
          },
          {
            text: 'Change lots of things at once until it works.',
            outcome: 'Something works again, but he doesn\'t know which change fixed it, or what else he broke.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'One missing brace',
      caption: 'The dl rule has no closing brace, so the p rule after it is swallowed. Add the } and run it.',
      code: '<style>\n  h1 { color: orange; }\n  dl { color: gold;\n  p { line-height: 1.6; color: teal; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Late nights in Accra.</p>\n',
      challenge: 'Add the missing } after color: gold; and watch the paragraph turn teal.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Top works, bottom broken? Check the rule where it stops. Change one thing at a time, then run.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s vanishing styles.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Fix Kofi\'s stylesheet so the paragraph is teal again',
        starter: '<style>\n  h1 { color: orange; }\n  dl { color: gold;\n  p { color: teal; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Late nights in Accra.</p>\n',
        solution: '<style>\n  h1 { color: orange; }\n  dl { color: gold; }\n  p { color: teal; }\n</style>\n<h1>Mensah Beats</h1>\n<p>Late nights in Accra.</p>\n',
        hint: 'The dl rule needs a closing }.',
        checks: [
          { message: 'The paragraph is teal', dom: { selector: 'p', style: 'color', styleValue: 'teal' } },
          { message: 'The heading is still orange', dom: { selector: 'h1', style: 'color', styleValue: 'orange' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The top of the stylesheet works and the bottom doesn\'t. Where should Kofi look first?',
        options: [
          { text: 'At the rule where things stop working' },
          { text: 'At the very first line', why: 'The first line is fine: it works.' },
          { text: 'In the HTML', why: 'The pattern points to a CSS rule where it stops.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that breaks everything below it.',
        language: 'css',
        lines: ['body { color: white; }', 'h1 { color: orange; }', 'li { color: gold;', 'a { color: orange; }'],
        bug: 2,
        explanation: 'No closing brace. The a rule gets swallowed into it.',
        fix: 'li { color: gold; }',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to what happened.',
        pairs: [
          ['Check the last rule he added', 'Fixed in thirty seconds'],
          ['Delete and rewrite', 'An hour and two new typos'],
          ['Change lots at once', 'No idea which change worked'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s debugging steps in order.',
        lines: ['Notice where it stops working', 'Look at the rule just above that point', 'Check every brace, colon and semicolon', 'Fix one thing and run again'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'kofi',
        message: 'I changed five things and now it works. Which one fixed it?',
        options: [
          { text: 'No way to know. Next time, one change at a time, then run.' },
          { text: 'Probably all five.', why: 'Maybe one fixed it and another broke something.' },
          { text: 'Doesn\'t matter.', why: 'It matters next time it breaks.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Which rules work?',
        code: 'h1 { color: orange; }\np { color: teal;\na { color: gold; }',
        language: 'css',
        options: [
          { text: 'All three', why: 'The missing } breaks what comes after it.' },
          { text: 'Only the h1 rule' },
          { text: 'None', why: 'The h1 rule is complete and works.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s advice.',
        template: 'Change [[1]] thing at a time, then [[2]].',
        blanks: [['one'], ['run']],
        distractors: ['every', 'delete', 'panic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which character closes a CSS rule? (type its name, e.g. bracket)',
        answers: ['curly brace', 'brace', 'closing brace', 'curly bracket', 'closing curly brace'],
        placeholder: 'A character name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good debugging habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'One change, then run', group: 0 },
          { text: 'Rewrite everything from memory', group: 1 },
          { text: 'Start where it stops working', group: 0 },
          { text: 'Change five things at once', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When something you made breaks, what\'s your first instinct? What would Miracle\'s approach change?',
    starters: ['My first instinct is...', 'Miracle\'s way would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'In the playground, remove one brace on purpose and see which rules stop working. Then fix it.',
  },
  notes: 'An unclosed block makes following rules part of the broken block (CSS Syntax error recovery). Miracle (CastId miracle) speaks.',
};

export default lesson;

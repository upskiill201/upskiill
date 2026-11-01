import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Explain cards: enough formatting, but no more. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Enough formatting, but no more',
  summary: 'After the headings lesson, Zanele goes too far: everything is bold, every sentence is a bullet. Mrs Achieng hands back the fourth principle: enough formatting, but no more.',
  minutes: 12,
  outcomes: [
    'Choose bullets, tables and bold on purpose',
    'Avoid over-formatting',
    'Know when a table beats a paragraph',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Formatting helps readers find things, until there\'s so much that nothing stands out. Mrs Achieng\'s guide:</p><table><tr><th>Tool</th><th>Use it for</th><th>Don\'t</th></tr><tr><td><strong>Bullets</strong></td><td>3 to 6 separate, parallel items</td><td>Turn every sentence into a bullet</td></tr><tr><td><strong>Numbered lists</strong></td><td>Steps in order, or asks</td><td>Number things with no order</td></tr><tr><td><strong>Tables</strong></td><td>Comparing items across the same measures (depots by late rate, cost, orders)</td><td>One-column "tables"</td></tr><tr><td><strong>Bold</strong></td><td>One or two key facts per page</td><td>Bold whole paragraphs</td></tr><tr><td><strong>Boxes</strong></td><td>The single most important thing: the recommendation</td><td>Five boxes per page</td></tr></table><p>Test: if you squint at the page, do the two or three most important things jump out? If everything jumps out, nothing does.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Format to make the most important things stand out. If everything is bold, nothing is.',
    },
  ],
  apply: {
    scenario: 'Formatting.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to its best use.',
        pairs: [
          ['Bullets', 'Separate, parallel items'],
          ['Numbered list', 'Steps in order'],
          ['Table', 'Comparing items on the same measures'],
          ['Bold', 'One or two key facts'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When does a table beat a paragraph?',
        options: [
          { text: 'When comparing several items across the same measures' },
          { text: 'Always', why: 'Only for comparisons.' },
          { text: 'Never', why: 'Tables are great for comparison.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good formatting or over-formatting?',
        groups: ['Good', 'Over-formatted'],
        items: [
          { text: 'One box for the recommendation', group: 0 },
          { text: 'Every sentence in bold', group: 1 },
          { text: 'A table comparing three depots', group: 0 },
          { text: 'Five boxes on one page', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I made everything bold so they won\'t miss anything.',
        prompt: "Mrs Achieng\'s best reply?",
        options: [
          { text: 'Good idea.', why: 'Nothing stands out.' },
          { text: 'Use capitals too.', why: 'Even worse.' },
          { text: 'Then they\'ll miss everything. Squint at it: what should jump out? Bold only that.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If [[1]] is bold, [[2]] is.',
        blanks: [['everything'], ['nothing']],
        distractors: ['something', 'all'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many items does the guide suggest for a bullet list? (Type the top number.)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the squint test?',
        options: [
          { text: 'Read with one eye closed', why: 'It checks what stands out.' },
          { text: 'Squint at the page: do the two or three key things jump out?' },
          { text: 'Print it tiny', why: 'Just squint.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which formatting choice is a mistake?',
        lines: [
          'A box around the recommendation.',
          'A table: depots by late rate, cost and orders.',
          'A numbered list for three unordered ideas.',
          'Bold on the 21% result.',
        ],
        bug: 2,
        fix: 'Use bullets for unordered ideas.',
        explanation: 'Numbers imply an order that isn\'t there.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Table or paragraph?',
        groups: ['Table', 'Paragraph'],
        items: [
          { text: 'Three depots by late rate and cost', group: 0 },
          { text: 'Why Saturdays matter to customers', group: 1 },
          { text: 'Monthly results for four months', group: 0 },
          { text: 'A short story about a driver', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to format a page.',
        lines: ['Decide the 2 or 3 key things', 'Choose the right tool for each', 'Remove extra formatting', 'Do the squint test'],
      },
    ],
  },
  reflect: {
    prompt: 'Do the squint test on a document you wrote. What jumps out? Is it what you wanted?',
    starters: ['What jumps out:...', 'What should:...'],
  },
  deepen: {
    title: 'Principle four',
    summary: 'Rogers and Lasky-Fink\'s fourth principle is deliberately balanced: "use enough formatting, but no more". Formatting is a signpost; too many signposts and the road disappears.',
  },
  notes: 'Rogers & Lasky-Fink (2023), principle 4. Squint test: common design heuristic.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 14 — shortening a long deck. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Shortening a long deck',
  summary: 'Tobi says the founders\' slot is now five minutes, not ten. Ada has to cut her deck in half, fast, without losing the story.',
  minutes: 12,
  outcomes: [
    'Cut a deck without losing the story',
    'Decide what moves to backup slides',
    'Use AI to suggest cuts, then choose',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Five minutes means about four slides. Ada\'s cutting rules:</p>' +
        '<table><tr><th>Rule</th><th>What it means</th></tr>' +
        '<tr><td><strong>Keep the spine</strong></td><td>Situation, problem, answer, ask. One slide each.</td></tr>' +
        '<tr><td><strong>Merge, don\'t cram</strong></td><td>Two slides that make the same point become one, with one idea.</td></tr>' +
        '<tr><td><strong>Move, don\'t delete</strong></td><td>Detail goes to backup slides after "Thank you", ready for questions.</td></tr>' +
        '<tr><td><strong>Cut the story, keep the evidence</strong></td><td>Shorter set-up, same strong chart.</td></tr></table>' +
        '<p>Ask AI: <em>"Here are my 7 slide titles. I now have 5 minutes. Which 4 make the strongest story? What should move to backup?"</em> Then decide yourself.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep the spine, merge slides that say the same thing, move detail to backup, and never cram two ideas onto one slide.',
    },
  ],
  apply: {
    scenario: 'Ada cuts her deck from 7 slides to 4.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four-slide spine.',
        lines: ['Situation', 'Problem', 'Answer', 'Ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Two slides make the same point. What should Ada do?',
        options: [
          { text: 'Merge them into one slide with one idea' },
          { text: 'Put both on one slide, smaller', why: 'That\'s cramming.' },
          { text: 'Keep both', why: 'No time.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Ada cut best?',
        options: [
          { text: 'Make it shorter.', why: 'No goal or time.' },
          { text: 'Here are my 7 slide titles. I now have 5 minutes for founders deciding on a second market. Which 4 make the strongest story, and what should move to backup?' },
          { text: 'Delete half.', why: 'Which half?' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Main deck or backup?',
        groups: ['Main deck', 'Backup'],
        items: [
          { text: 'The growth chart', group: 0 },
          { text: 'Cost breakdown by item', group: 1 },
          { text: 'The ask', group: 0 },
          { text: 'Failed-payment flowchart', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'You cut the cost slide? Won\'t they ask about money?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Probably. It\'s a backup slide right after "Thank you", so I can show it the moment they ask.' },
          { text: 'I deleted it.', why: 'Move, don\'t delete.' },
          { text: 'They won\'t ask.', why: 'Founders always ask about money.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: '[[1]], don\'t cram. Move, don\'t [[2]].',
        blanks: [['Merge'], ['delete']],
        distractors: ['Shrink', 'print'],
      },
      {
        kind: 'findBug',
        prompt: 'Which cutting choice is a mistake?',
        lines: [
          'Keep the growth chart',
          'Move costs to backup',
          'Fit all 7 slides\' text onto 4 slides in small font',
          'Keep the ask as the last slide',
        ],
        bug: 2,
        fix: 'Choose 4 ideas; move the rest to backup.',
        explanation: 'Cramming makes slides unreadable.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many slides for a 5-minute talk?',
        answers: ['4', 'four', '3', '3-4'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to its action.',
        pairs: [
          ['Keep the spine', 'One slide each for situation, problem, answer, ask'],
          ['Merge', 'Two same-point slides become one'],
          ['Move', 'Detail goes to backup'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s backup slide label.',
        tiles: ['Backup:', 'pilot', 'costs'],
        distractors: ['deleted'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Shorten this, or keep it?',
        groups: ['Shorten', 'Keep'],
        items: [
          { text: 'A two-minute set-up story', group: 0 },
          { text: 'The strongest chart', group: 1 },
          { text: 'A long thank-you list', group: 0 },
          { text: 'The ask', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who makes the final cut decisions?',
        options: [
          { text: 'Ada' },
          { text: 'The AI', why: 'It suggests; Ada decides.' },
          { text: 'Nobody', why: 'Someone has to.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'If your next talk lost half its time, which slides would you keep?',
    starters: ['I\'d keep:', 'Backup:'],
  },
  deepen: { title: 'Try it today', summary: 'Take a deck and ask AI which half makes the strongest story. Compare with your own choice.' },
  notes: 'General presentation guidance.',
};

export default lesson;

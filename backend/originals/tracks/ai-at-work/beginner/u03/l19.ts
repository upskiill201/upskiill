import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 19 — the whole unit as one checklist and one reusable summary request. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your summary checklist',
  summary: 'Eight checks that turn any summary from "nice to read" into something you can act on and trust.',
  minutes: 12,
  outcomes: [
    'Use an 8-point checklist for any summary',
    'Keep one reusable summary request',
    'Know which checks matter most for which situations',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<h3>Before you ask</h3><ol><li><strong>Purpose:</strong> "After reading it, I need to..."</li><li><strong>Kind:</strong> gist, executive or action summary?</li><li><strong>Reader:</strong> who is it for, and what do they need?</li><li><strong>Privacy:</strong> anything to remove before pasting?</li></ol>',
    },
    {
      kind: 'text',
      html:
        '<h3>In the request</h3><ol start="5"><li><strong>References:</strong> page or section numbers, or quotes.</li><li><strong>Honesty:</strong> "Only what the text supports. Keep its certainty. Say if something is not in it."</li></ol>',
    },
    {
      kind: 'text',
      html:
        '<h3>After you get it</h3><ol start="7"><li><strong>Spot-check</strong> the claims you will act on: number, "not", who, certainty.</li><li><strong>The buts:</strong> "What did you leave out?" Then: what is the next step?</li></ol>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code:
        'I need to [purpose]. Give me a [gist / executive / action] summary\nfor [reader] of the text below.\nOnly include what the text supports, with page numbers.\nKeep its level of certainty. If something is not in the text, say so.\nAfter the summary, list caveats, conditions and disagreements separately.',
      caption: 'Your reusable summary request. Save it with your other templates.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Low stakes (deciding whether to read something)? Checks 1 and 2 are enough. High stakes (contracts, decisions, numbers)? Use all eight.',
    },
    {
      kind: 'check',
      question: 'Which checks happen AFTER you get the summary?',
      options: ['Purpose and kind', 'Spot-check and "what did you leave out?"', 'Privacy'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making the checklist a habit.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the 8 checks.',
        lines: ['Purpose', 'Kind', 'Reader', 'Privacy', 'References', 'Honesty', 'Spot-check', 'The buts'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Before, during, or after?',
        groups: ['Before asking', 'In the request', 'After'],
        items: [
          { text: 'Decide the purpose', group: 0 },
          { text: 'Ask for page numbers', group: 1 },
          { text: 'Spot-check key claims', group: 2 },
          { text: 'Remove private details', group: 0 },
          { text: '"What did you leave out?"', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada just wants to know if an article is worth reading. Which checks matter?',
        options: [
          { text: 'All eight, every time', why: 'Overkill for a low-stakes skim.' },
          { text: 'Purpose and kind (a gist) are enough' },
          { text: 'None', why: 'Purpose still shapes the summary.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the honesty line.',
        tiles: ['Only', 'what', 'the', 'text', 'supports'],
        distractors: ['imagine', 'guess'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the problem it prevents.',
        pairs: [
          ['Purpose', 'A useless, generic summary'],
          ['References', 'Claims you cannot check'],
          ['Spot-check', 'Acting on a wrong claim'],
          ['The buts', 'Missing caveats'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can you share your summary 'recipe'? Mine always come out vague.",
        prompt: 'What should Ada send?',
        options: [
          { text: '"Summarise this."', why: 'That is why Lucía\'s come out vague.' },
          { text: 'A list of AI tools.', why: 'The tool is not the problem; the request is.' },
          { text: "Her reusable request: purpose, kind, reader, page numbers, 'only what the text supports', keep certainty, then caveats separately." },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the reusable request.',
        template: 'I need to [purpose]. Give me a [[1]] summary for [reader]. Only what the text [[2]], with page numbers. If something is not in the text, [[3]] so.',
        blanks: [['action', 'executive', 'gist'], ['supports'], ['say']],
        distractors: ['ignores', 'hide'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the missing check for a high-stakes contract summary.',
        lines: ['Purpose: decide whether to renew.', 'Kind: action summary for my manager.', 'References: clause numbers.', 'Spot-check: skip it, the summary looked fine.'],
        bug: 3,
        fix: 'Spot-check: renewal, notice period and price against the clauses.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Check 1 is the ... sentence: "After reading it, I need to..." (one word)',
        answers: ['purpose'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request follows the checklist best?',
        options: [
          { text: 'Summarise this report.', why: 'Skips nearly every check.' },
          { text: 'I need to plan design changes. Action summary for a designer. Only what the text supports, page numbers, keep certainty. Then list caveats separately.' },
          { text: 'Summarise this, and be confident.', why: 'Invites false certainty.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Low stakes or high stakes?',
        groups: ['Low stakes', 'High stakes'],
        items: [
          { text: 'Is this article worth reading?', group: 0 },
          { text: 'Should we renew this contract?', group: 1 },
          { text: 'Gist of a newsletter', group: 0 },
          { text: 'Numbers for the board report', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Eight checks sounds like a lot for every summary.',
        prompt: "What's Ada's answer?",
        options: [
          { text: 'Yes, always do all eight.', why: 'Overkill for small things.' },
          { text: "It's not every time: purpose and kind for quick things, all eight when money, contracts or decisions are involved." },
          { text: 'Skip them all.', why: 'High-stakes summaries need them.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the summary, ask what it left ... (one word)',
        answers: ['out'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Unit 3 lesson to its checklist item.',
        pairs: [
          ['Summaries that are actually useful', 'Purpose and kind'],
          ['Summarise for a specific person', 'Reader'],
          ['Summaries you can trust', 'Spot-check'],
          ['When a summary leaves things out', 'The buts'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where should Ada keep her reusable summary request?',
        options: [
          { text: 'Nowhere, she will remember', why: 'Saved is faster and more reliable.' },
          { text: 'In the bin', why: 'It saves her time daily.' },
          { text: 'With her other saved templates and style guide' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the 8 checks do you skip most often? When would skipping it be risky for you?',
    starters: ['I usually skip...', 'It would be risky when...'],
  },
  deepen: { title: 'Do it now', summary: 'Save the reusable summary request next to your prompt recipe and templates.' },
  notes: 'Checklist consolidates Unit 3.',
};

export default lesson;

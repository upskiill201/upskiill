import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 15 — Checkpoint 3. Reviews documents, senior readers, other languages, proofreading. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: documents, seniors, languages, proofing',
  summary: 'Structure, decision-first writing, translation habits and the 30-second check, all mixed up.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can structure documents and write for seniors', 'Show you can translate and proofread safely'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint three of Unit 2. Higher stakes this time: documents for leaders, other languages, and the final check before sending.', replies: ['Ready'] },
        { tey: 'Warm-up: AI is a great spellchecker and a poor...', replies: ['Fact-checker', 'Typist'] },
        { tey: 'Fact-checker. Keep that in your head the whole way through.' },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's report to leadership, with a Spanish summary for Lucía's team.",
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a short work document.',
        lines: ['Title', 'One-line summary', "What's done", "What's next", 'Risks', 'Decisions needed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Message heading, or topic heading?',
        groups: ['Message', 'Topic'],
        items: [
          { text: 'Launch stays on the 14th', group: 0 },
          { text: 'Timeline', group: 1 },
          { text: 'Budget is on plan', group: 0 },
          { text: 'Budget', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should the first line to a director be?',
        options: [
          { text: 'Your recommendation or the decision needed' },
          { text: 'How the project started', why: 'Story order buries the point.' },
          { text: 'A long greeting', why: 'They read the first lines and decide.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the gap-marking instruction.',
        tiles: ['Mark', 'anything', 'unclear', 'with', 'a', 'question', 'mark'],
        distractors: ['invent'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Ada\'s line.',
        pairs: [
          ['Answer', '"Recommend: delay dark mode"'],
          ['Why', '"Otherwise launch slips 2 weeks"'],
          ['Options', '"A: delay; B: ship without dark charts"'],
          ['Ask', '"Your OK by Friday"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Could you send a Spanish version of the summary for our directors? First time writing to them.',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'Natural Mexican Spanish, formal "usted" for directors, keep product names in English, then back-translate to English.' },
          { text: 'Translate this to Spanish.', why: 'No formality, no check.' },
          { text: 'Make it casual Spanish with slang.', why: 'Directors, first contact: formal.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the date that contradicts.',
        lines: ['Launch: Thursday 14 May.', 'Review: Friday 15 May.', 'Retro: Tuesday 19 May.', 'Planning: Monday 21 May.'],
        bug: 3,
        fix: 'Planning: Monday 18 May.',
        explanation: 'If the 14th is a Thursday, the 21st is also a Thursday. Monday is the 18th.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'AI is a good spellchecker but a poor ...-checker (one word)',
        answers: ['fact'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI translation alone, or a human check?',
        groups: ['AI alone is fine', 'Human check'],
        items: [
          { text: 'A friendly thank-you', group: 0 },
          { text: 'A contract', group: 1 },
          { text: 'Understanding an email you received', group: 0 },
          { text: 'A price quote', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best one-pager from notes?',
        options: [
          { text: 'Tidy my notes.', why: 'No structure, no reader.' },
          { text: "One page for my manager: title, 1-line summary, Done, Next, Risks, Decisions. Only my notes; mark gaps [?]." },
          { text: 'Expand my notes into a 10-page report.', why: 'Longer is not the goal.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the 30-second check.',
        template: 'Names, numbers, [[1]], links, [[2]], recipients.',
        blanks: [['dates'], ['attachments']],
        distractors: ['fonts', 'colours'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your report was great, but my boss's first question was 'what's the risk if we wait?'",
        prompt: 'What should Ada do next time?',
        options: [
          { text: 'Ask the AI what a director would ask first, and answer it in the report.' },
          { text: 'Wait for questions.', why: 'Each round-trip slows the decision.' },
          { text: 'Add more pages.', why: 'Anticipate, do not pad.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idiom to the plain version.',
        pairs: [
          ['"Touch base"', '"Talk"'],
          ['"Ballpark figure"', '"Rough estimate"'],
          ['"Circle back"', '"Come back to it"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who catches it best?',
        groups: ['AI proofread', 'Your own check'],
        items: [
          { text: 'A spelling mistake', group: 0 },
          { text: 'A wrong recipient', group: 1 },
          { text: 'A broken link', group: 1 },
          { text: 'A clunky sentence', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Always mark your ... among the options (one word)',
        answers: ['recommendation', 'choice', 'pick'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the translation routine.',
        lines: ['Write plain source text', 'Ask for natural translation, reader and formality', 'Back-translate to check', 'Human check for important text'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line a senior reader does not need.',
        lines: ['Recommendation: extend the contract for 6 months.', 'Why: launch on track; phase 2 ready.', 'The team really enjoyed the Friday lunches.', 'Ask: yes by the 30th.'],
        bug: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Why write "6 May" instead of "05/06"?',
        options: [
          { text: '05/06 means different dates in different countries' },
          { text: 'It looks nicer', why: 'It prevents a real misunderstanding.' },
          { text: 'Numbers cannot be translated', why: 'They can, but the order differs.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI proofread your proposal and found nothing. Good to send?',
        prompt: "What's Ada's answer?",
        options: [
          { text: 'Almost: I still check names, numbers, dates, links, attachments and recipients myself.' },
          { text: 'Yes, the AI checked it.', why: 'It checks spelling, not facts.' },
          { text: 'Proofreading is not needed.', why: 'It is, every important send.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the senior-reader opener.',
        tiles: ['Recommendation:', 'extend', 'for', '6', 'months'],
        distractors: ['maybe'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Notes to document', 'Summary first, message headings'],
          ['Writing for seniors', 'Answer, Why, Options, Ask'],
          ['Other languages', 'Natural, formality, back-translate'],
          ['Proofreading', 'AI for spelling, you for facts'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For a contract translation, always get a qualified ... check (one word)',
        answers: ['human', 'person', 'translator', 'lawyer'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'People skim headings first', group: 0 },
          { text: 'Directors want the full history first', group: 1 },
          { text: 'Idioms often translate badly', group: 0 },
          { text: 'No spelling errors means no mistakes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which proofreading request is most useful?',
        options: [
          { text: 'Check this.', why: 'For what?' },
          { text: 'Proofread: spelling and grammar, plus list any inconsistent names, dates or numbers. Do not rewrite.' },
          { text: 'Rewrite this perfectly.', why: 'A rewrite is not a proofread, and still skips facts.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the senior shape.',
        template: '[[1]], Why, Options, [[2]].',
        blanks: [['Answer'], ['Ask']],
        distractors: ['History', 'Greeting'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four would have helped the most with something you wrote this month?',
    starters: ['This month I wrote...', 'It would have helped to...'],
  },
  deepen: { title: 'Keep going', summary: 'Rewrite the opening of one document you own using "Answer, Why, Options, Ask".' },
  notes: 'Review only. Dates in the find-the-bug item are internally consistent with "14 May is Thursday" by design; no year stated.',
};

export default lesson;

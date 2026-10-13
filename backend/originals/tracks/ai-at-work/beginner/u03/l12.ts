import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 12 — interrogating a document: specific questions, supporting quotes, "in the text or general knowledge?". */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Questions to ask a document',
  summary: 'Sometimes you do not need a summary at all. You need answers to your questions, each with the quote that proves it.',
  minutes: 13,
  outcomes: [
    'Ask a document specific questions instead of summarising it',
    'Get the supporting quote for every answer',
    'Tell when the AI is answering from the document vs from general knowledge',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Ada has a 25-page brand guide from Lucía's company. She needs three things: the exact blue, the logo spacing rule, and whether they allow dark backgrounds.", replies: ['So summarise it?', 'Ask the questions?'] },
        { tey: "Ask the questions. A summary might skip all three. Questions go straight to what you need." },
        { tey: "Here's the move that makes it trustworthy: ask for the quote and page that supports each answer.", replies: ['Why the quote?'] },
        { tey: "Because AI tools can blend the document with general knowledge. 'Most brand guides allow dark backgrounds' is not the same as 'THIS guide allows them'." },
        { tey: "So add one more line: 'If the answer is not in the document, say so. Do not use general knowledge.'", replies: ['That is clever'] },
        { tey: "And the best question of all, once you've asked yours: 'What does this document NOT say that I might assume it does?'" },
      ],
    },
    {
      kind: 'compare',
      title: 'Summary vs questions',
      before: { label: 'Summary request', text: 'Summarise this brand guide.' },
      after: {
        label: 'Questions with proof',
        text:
          'Answer from this brand guide only, with the quote and page for each:\n1. What is the exact primary blue (hex code)?\n2. What is the minimum space around the logo?\n3. Are dark backgrounds allowed?\nIf an answer is not in the guide, say "not in the document".',
      },
      notes: ['Goes straight to what Ada needs.', 'Quotes make every answer checkable.', '"Not in the document" stops general-knowledge guesses.'],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Magic line: "If the answer is not in the document, say so. Do not use general knowledge."',
    },
    {
      kind: 'check',
      question: 'Why ask for the supporting quote for each answer?',
      options: ['To make answers longer', 'So you can check it came from the document, not general knowledge', 'Quotes look professional'],
      answer: 1,
    },
  ],
  apply: {
    scenario: "Ada is questioning Lucía's brand guide.",
    items: [
      {
        kind: 'mcq',
        prompt: 'When are questions better than a summary?',
        options: [
          { text: 'When you need specific answers, not an overview' },
          { text: 'Never', why: 'Often you only need three facts.' },
          { text: 'Only for short documents', why: 'They are especially useful for long ones.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the magic line.',
        tiles: ['If', 'it', 'is', 'not', 'in', 'the', 'document,', 'say', 'so'],
        distractors: ['guess'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Answer from the document, or general knowledge sneaking in?',
        groups: ['From the document', 'General knowledge'],
        items: [
          { text: '"Page 6: primary blue is #1A4BFF."', group: 0 },
          { text: '"Most brands use blue for trust."', group: 1 },
          { text: '"Page 9: logo needs 24px clear space."', group: 0 },
          { text: '"Brand guides usually allow dark mode."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your designer used a dark background, but our guide doesn't allow them!",
        prompt: 'The AI had said "dark backgrounds are allowed" with no quote. What went wrong?',
        options: [
          { text: 'The answer came from general knowledge, not your guide. We should have asked for the quote, or "not in the document".' },
          { text: 'Your guide is wrong.', why: 'The guide is the authority here.' },
          { text: 'Dark backgrounds are always fine.', why: 'Not if the guide says otherwise.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s question request.',
        template: 'Answer from this guide [[1]], with the [[2]] and page for each. If an answer is not there, say "not in the [[3]]".',
        blanks: [['only'], ['quote'], ['document']],
        distractors: ['sometimes', 'emoji', 'internet'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the answer that needs checking.',
        lines: ['1. Primary blue: #1A4BFF (p.6, quoted).', '2. Logo clear space: 24px (p.9, quoted).', '3. Dark backgrounds: generally fine for most brands.'],
        bug: 2,
        fix: '3. Dark backgrounds: not in the document (ask Lucía).',
        explanation: 'No quote, and "most brands" is general knowledge.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The best final question: "What does this document NOT ... that I might assume?" (one word)',
        answers: ['say', 'cover', 'mention'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Ada\'s question to what it finds.',
        pairs: [
          ['"What is the exact blue?"', 'A specific fact'],
          ['"Quote and page?"', 'Proof you can check'],
          ['"What does it not say?"', 'Hidden assumptions'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best for checking the guide\'s font rules?',
        options: [
          { text: 'Tell me about fonts.', why: 'It may answer from general knowledge.' },
          { text: 'From this guide only: which fonts are allowed for headings and body text? Quote and page for each. Say "not in the document" if missing.' },
          { text: 'Summarise the guide.', why: 'Might skip fonts entirely.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s questioning routine.',
        lines: ['Write your specific questions', 'Ask for answers from the document only', 'Ask for quote and page for each', 'Ask what it does not say', 'Check the important quotes'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Summary or questions?',
        groups: ['Ask for a summary', 'Ask questions'],
        items: [
          { text: 'Deciding whether a report is worth reading', group: 0 },
          { text: 'Finding the exact refund policy', group: 1 },
          { text: 'Checking 3 rules in a brand guide', group: 1 },
          { text: 'Getting the gist of a long article', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI says our guide allows 'any shade of blue'. Is that right?",
        prompt: 'What should Ada do?',
        options: [
          { text: 'Ask for the exact quote and page. If there is none, it is not in the guide.' },
          { text: 'Believe it.', why: 'Check the quote first.' },
          { text: 'Use any blue.', why: 'Only after checking the guide.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every answer should come with the supporting ... (one word)',
        answers: ['quote', 'quotation', 'evidence'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the fix.',
        pairs: [
          ['General knowledge sneaks in', '"Document only; say if missing"'],
          ['Cannot verify the answer', 'Quote and page'],
          ['Summary skips what you need', 'Ask specific questions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "what does this document NOT say?"',
        options: [
          { text: 'To catch things you were assuming it covers' },
          { text: 'To make it longer', why: 'It is about blind spots.' },
          { text: 'No reason', why: 'Missing rules matter as much as stated ones.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What document do you check often for specific answers (a policy, a guide, a spec)? Write three questions you would ask it.',
    starters: ['The document:', '1.', '2.', '3.'],
  },
  deepen: { title: 'Try it today', summary: 'Ask your next document three questions with "quote and page" and the magic line.' },
  notes: 'Hex code and spacing values are fictional. Blending of document and general knowledge described generally.',
};

export default lesson;

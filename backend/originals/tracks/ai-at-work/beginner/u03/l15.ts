import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 15 — Checkpoint 3. Contracts, questioning documents, trustworthy summaries, omissions. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: read carefully, trust wisely',
  summary: 'Contracts, questions with proof, spot-checks, and the "buts" summaries drop. All mixed up.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can read contracts and documents carefully', 'Show you can check summaries and keep caveats'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint three of Unit 3. The careful-reading one. This is where people get burned in real life.', replies: ['No pressure'] },
        { tey: 'Warm-up: which word in a contract should make you stop?', replies: ['Unless', 'The'] },
        { tey: '"Unless". Small word, big consequences. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the partnership renewal.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the contract area to its question.',
        pairs: [
          ['Renewal', 'Does it continue automatically?'],
          ['Termination', 'How do we get out?'],
          ['Money', 'What do we pay, and when?'],
          ['Liability', 'Who is responsible if it goes wrong?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Read closely, or harmless?',
        groups: ['Read closely', 'Harmless'],
        items: [
          { text: 'unless', group: 0 },
          { text: 'automatically renews', group: 0 },
          { text: 'the parties', group: 1 },
          { text: 'provided that', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the AI\'s right role with a contract?',
        options: [
          { text: 'Decide whether to sign', why: 'Never; it is not a lawyer.' },
          { text: 'Help you find and understand key clauses, so you know what to ask an expert' },
          { text: 'Nothing', why: 'It is very useful for finding clauses.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the magic line for document questions.',
        tiles: ['If', 'it', 'is', 'not', 'in', 'the', 'document,', 'say', 'so'],
        distractors: ['guess'],
      },
      {
        kind: 'findBug',
        prompt: 'The source says "Lucía has not approved the renewal." Spot the error.',
        lines: ['Renewal discussed on Tuesday.', 'Lucía approved the renewal.', 'Next step: legal review.'],
        bug: 1,
        fix: 'Lucía has not approved the renewal yet.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "We just got charged for another year! The contract renewed by itself?",
        prompt: 'What would have prevented this?',
        options: [
          { text: 'Pulling out the renewal and notice clause, and putting the notice deadline in the calendar.' },
          { text: 'Nothing, it was bad luck.', why: 'It was in the contract.' },
          { text: 'A shorter contract.', why: 'Length was not the problem; the missed deadline was.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'An invented detail in an AI answer is a ... (one word)',
        answers: ['hallucination'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the summary failure to an example.',
        pairs: [
          ['Invented detail', 'A price not in the source'],
          ['Flipped meaning', 'Dropped "not"'],
          ['Wrong attribution', "The intern's idea credited to the CEO"],
          ['False certainty', '"May" became "will"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Caveat, condition or dissent?',
        groups: ['Caveat', 'Condition', 'Dissent'],
        items: [
          { text: 'Results may not hold', group: 0 },
          { text: 'Only on phones', group: 1 },
          { text: 'Two designers disagreed', group: 2 },
          { text: 'If legal approves', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best for checking a brand guide\'s rules?',
        options: [
          { text: 'Tell me about your brand.', why: 'General knowledge creeps in.' },
          { text: 'From this guide only: allowed fonts and colours, quote and page for each, "not in the document" if missing.' },
          { text: 'Summarise the guide.', why: 'May skip what you need.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the 2-minute spot-check.',
        lines: ['Pick the claims you will act on', 'Find each in the source', 'Check number, "not", who said it, certainty', 'Fix anything off'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The summary says the new flow boosts sign-ups. Roll it out on desktop?",
        prompt: 'What should Ada check first?',
        options: [
          { text: 'Roll it out now.', why: 'Check the conditions first.' },
          { text: 'Whether the source says it worked on desktop. Summaries drop conditions like "only on phones".' },
          { text: 'Ignore the summary.', why: 'Check it instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the contract request.',
        template: 'Table of obligations, payments, renewal, termination and liability with [[1]] numbers and exact [[2]]. Quote every sentence with "[[3]]".',
        blanks: [['clause'], ['quotes'], ['unless']],
        distractors: ['phone', 'the'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary can be accurate and still ... (one word)',
        answers: ['mislead', 'misleading'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Spot the answer that needs checking.',
        lines: ['Primary blue: #1A4BFF (p.6, quoted).', 'Logo space: 24px (p.9, quoted).', 'Animations: most brands allow them.'],
        bug: 2,
        fix: 'Animations: not in the document (ask Lucía).',
      },
      {
        kind: 'sortGroups',
        prompt: 'Spot-check it, or skim is fine?',
        groups: ['Spot-check', 'Skim'],
        items: [
          { text: 'A number going into the board report', group: 0 },
          { text: 'Background reading', group: 1 },
          { text: 'A decision you will tell your manager', group: 0 },
          { text: 'The general topic', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A report says "users prefer dark mode". What should Ada ask first?',
        options: [
          { text: 'What colour is the report?', why: 'Not relevant.' },
          { text: 'Nothing, build it', why: 'Check the evidence first.' },
          { text: 'Who ran it, how many users, which users?' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can your AI tell us if we should sign the new partnership contract?",
        prompt: "What's Ada's honest answer?",
        options: [
          { text: 'Yes, it will decide.', why: 'It is not a lawyer.' },
          { text: "It can pull out the key terms and anything unusual, but signing is our decision, ideally after a legal review." },
          { text: 'AI cannot read contracts.', why: 'It can help a lot with finding clauses.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the omission question.',
        tiles: ['What', 'did', 'you', 'leave', 'out?'],
        distractors: ['add'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ['Contracts', 'Find terms, quote small words, expert check'],
          ['Questioning documents', 'Quote and page; say if missing'],
          ['Trustworthy summaries', 'Spot-check what you act on'],
          ['Omissions', 'Keep the "buts"'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Contract deadlines go straight in your ... (one word)',
        answers: ['calendar', 'diary'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which summary request keeps the caveats?',
        options: [
          { text: 'Summarise in one line.', why: 'Caveats will be dropped.' },
          { text: 'Summarise for a decision-maker, then list caveats, conditions and disagreements separately, with page numbers.' },
          { text: 'Summarise positively.', why: 'Drops bad news.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: '"Not stated" can be a red flag', group: 0 },
          { text: 'Smooth summaries are accurate summaries', group: 1 },
          { text: 'AI can blend general knowledge into answers', group: 0 },
          { text: 'You must re-read everything to check a summary', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the contract routine.',
        lines: ['Extract key terms with quotes', 'Quote the small-word sentences', 'Read them yourself', 'List questions for an expert', 'Calendar the deadlines'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "what does this document NOT say?"',
        options: [
          { text: 'To make it longer', why: 'It finds blind spots.' },
          { text: 'No reason', why: 'Missing rules matter.' },
          { text: 'To catch what you are assuming it covers' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which careful-reading habit would have saved you (or your company) money or trouble?',
    starters: ['It would have saved...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Check the renewal terms of one subscription or contract you rely on.' },
  notes: 'Review only. Not legal advice.',
};

export default lesson;

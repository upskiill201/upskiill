import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 5 — Checkpoint 1. Summary kinds, readers, long documents, actions. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: summaries that work',
  summary: 'The right kind of summary, for the right reader, from long documents, ending in real actions.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can ask for the right summary', 'Show you can turn notes into real actions'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 3, first Checkpoint. Summaries, readers, long documents and actions.', replies: ['Ready'] },
        { tey: 'Warm-up: before asking for a summary, finish this sentence: "After reading it, I need to..."', replies: ['...decide something', '...do something'] },
        { tey: "Both good. That's the purpose, and the purpose decides the summary. Go." },
      ],
    },
  ],
  apply: {
    scenario: "Checkpoint: Ada's research week.",
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of summary to its question.',
        pairs: [
          ['Gist', 'What is this about?'],
          ['Executive', 'Conclusions and why they matter'],
          ['Action', 'What do we need to do?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does "summarise this" usually produce?',
        options: [{ text: 'A purposeless gist' }, { text: 'A perfect action list', why: 'It does not know your purpose.' }, { text: 'Nothing', why: 'It works, generically.' }],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which reader needs which line?',
        groups: ['Director', 'Developers', 'Customers'],
        items: [
          { text: 'Recommend fixing before launch', group: 0 },
          { text: 'Autofill breaks on some phones (p.14)', group: 1 },
          { text: 'Sign-up will be faster in the next update', group: 2 },
          { text: 'Low cost, could lift sign-ups', group: 0 },
          { text: 'Repro steps on p.31', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the section-by-section method.',
        lines: ['Get the map of sections', 'Pick the sections that matter', 'Summarise each one', 'Combine and rank'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "someone check the copy" into a real action.',
        tiles: ['Grace', 'will', 'check', 'the', 'copy', 'by', 'Thursday'],
        distractors: ['someone'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "10 minutes before a CEO call, 30-page report. What do I ask the AI for?",
        prompt: 'Which request?',
        options: [
          { text: 'Executive summary for a CEO: 3 conclusions, why each matters, page numbers, under 100 words.' },
          { text: 'Summarise this.', why: 'A gist will not prepare her.' },
          { text: 'Every detail please.', why: '10 minutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the vague action.',
        lines: ['Ada: send palette to Lucía by Wednesday.', 'Grace: book the review room for Thursday.', 'We should look into the budget at some point.'],
        bug: 2,
        fix: 'Ada: email finance for the Q3 budget by Friday.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who decides what goes into a summary? The ... (one word)',
        answers: ['reader', 'audience'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the action extraction request.',
        template: 'List actions as [[1]] | Action | Due. Flag any with no owner, a vague [[2]], or no [[3]].',
        blanks: [['Owner'], ['verb'], ['date']],
        distractors: ['Mood', 'font'],
      },
      {
        kind: 'mcq',
        prompt: 'A 120-page contract summary never mentions the termination section. What first?',
        options: [
          { text: 'Ask which pages it could read, then summarise that section on its own' },
          { text: 'Assume there is no such section', why: 'Long documents lose sections.' },
          { text: 'Ignore it', why: 'Missing sections are a red flag.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'One-shot summary or section by section?',
        groups: ['One shot', 'Section by section'],
        items: [
          { text: 'A 1-page memo', group: 0 },
          { text: 'A 90-page report', group: 1 },
          { text: 'A short email', group: 0 },
          { text: 'A 150-page policy', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The summary cites page 44 for a finding, but page 44 is about pricing!",
        prompt: 'What should Ada do?',
        options: [
          { text: "Find the real page, or remove the claim if it isn't in the report, and check other references." },
          { text: 'Insist on page 44.', why: 'Lucía checked. Look again.' },
          { text: 'Remove all page numbers.', why: 'They are how mistakes get caught.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the vague verb to a real one.',
        pairs: [
          ['"Look into"', '"Write a 1-page proposal"'],
          ['"Think about"', '"Decide yes or no"'],
          ['"Follow up"', '"Email to confirm the date"'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before the content of a long document, ask for its ... (one word)',
        answers: ['map', 'structure', 'sections', 'outline', 'contents'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which summary request is best for a client?',
        options: [
          { text: 'Summarise this report.', why: 'May include internal details.' },
          { text: 'Summarise for customers: what we learned and what we are improving, plain words, nothing internal.' },
          { text: 'Send the client the full report.', why: 'Internal details included.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the four parts of a real action.',
        lines: ['Owner', 'Verb', 'Deliverable', 'Date'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real action or vague?',
        groups: ['Real', 'Vague'],
        items: [
          { text: 'Grace will share the file by Friday', group: 0 },
          { text: 'Someone should check the copy', group: 1 },
          { text: 'Ada will email finance by Monday', group: 0 },
          { text: 'Think about dark mode', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "map first" request.',
        tiles: ['List', 'the', 'sections', 'with', 'page', 'numbers'],
        distractors: ['skip'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My CEO and my team both need the research summary. One email or two?',
        prompt: "What's the best advice?",
        options: [
          { text: 'Two, asked for in one request: impact and recommendation for the CEO, specifics for the team.' },
          { text: 'One long one for both.', why: 'Wrong for both readers.' },
          { text: 'Just the CEO.', why: 'The team needs it too.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the purpose sentence.',
        template: 'After [[1]] it, I need to [[2]] what to change.',
        blanks: [['reading'], ['decide', 'know']],
        distractors: ['burning', 'forget'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"We should look into it" is a wish. A real action needs one named ... (one word)',
        answers: ['owner', 'person'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the problem to the fix.',
        pairs: [
          ['Summary has no purpose', 'Name the kind and the reader'],
          ['Document too long', 'Section by section'],
          ['Cannot check a claim', 'Page numbers'],
          ['Action never happens', 'Owner, verb, date'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which part of a long document is most often squeezed out of a one-shot summary?',
        options: [{ text: 'Details from the middle' }, { text: 'The title', why: 'Titles survive.' }, { text: 'The first line', why: 'Openings usually survive.' }],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'Summaries can cite the wrong page', group: 0 },
          { text: '"Someone" is a fine owner', group: 1 },
          { text: 'Different readers need different summaries', group: 0 },
          { text: 'Longer summaries are always better', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the request that makes checking impossible.',
        lines: ['Summarise each section for a designer.', 'Keep page numbers.', 'Combine into one list and drop all references.'],
        bug: 2,
        fix: 'Combine into one list, keeping the references.',
      },
    ],
  },
  reflect: {
    prompt: 'Which summary habit will save you the most time this week?',
    starters: ['The habit is...', 'It will save time because...'],
  },
  deepen: { title: 'Keep going', summary: 'Use the purpose sentence before every summary request this week.' },
  notes: 'Review only.',
};

export default lesson;

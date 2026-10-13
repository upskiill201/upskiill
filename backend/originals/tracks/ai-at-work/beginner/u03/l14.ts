import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 14 — omissions: caveats, conditions, dissent and context are what summaries drop first. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When a summary leaves things out',
  summary: 'A summary can be 100% accurate and still mislead, by leaving out the "but". Learn what gets dropped and how to get it back.',
  minutes: 13,
  outcomes: [
    'Name what summaries drop first: caveats, conditions, dissent, context',
    'Ask for what was left out',
    'Decide when a missing caveat changes the decision',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The source paragraph: tap what a short summary would drop',
      text:
        'The new sign-up flow increased completed sign-ups in our two-week test, but only on phones; on desktop there was no clear difference. The test ran during a holiday period, so results may not hold. Two of the five designers felt the shorter form collects too little information for the sales team.',
      hotspots: [
        { phrase: 'in our two-week test', note: 'Context: a short test. A summary saying "sign-ups increased" hides how limited the evidence is.' },
        { phrase: 'but only on phones', note: 'A condition. Drop it and it sounds like the change works everywhere.' },
        { phrase: 'on desktop there was no clear difference', note: 'A result that limits the headline. Easy to omit, important for planning.' },
        { phrase: 'so results may not hold', note: 'A caveat. Summaries love to cut these.' },
        { phrase: 'Two of the five designers felt the shorter form collects too little information', note: 'Dissent. Minority views vanish first in a summary.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Accurate, but misleading',
      before: { label: 'Short summary', text: 'The new sign-up flow increased completed sign-ups.' },
      after: {
        label: 'With what matters',
        text: 'The new flow increased sign-ups on phones in a two-week holiday-period test (no clear change on desktop; may not hold). 2 of 5 designers worry it collects too little info for sales.',
      },
      notes: ['Every word of the short summary is true.', 'It still leads to a different decision.', 'The "buts" were the important part.'],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: "What did you leave out that a careful reader would want to know? List caveats, conditions and disagreements."',
    },
    {
      kind: 'check',
      question: 'Can a summary be 100% accurate and still mislead?',
      options: ['No, accurate means fine', 'Yes, by leaving out caveats and conditions', 'Only if it is long'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is making sure summaries keep the "buts".',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'What kind of detail is this?',
        groups: ['Caveat', 'Condition', 'Dissent'],
        items: [
          { text: 'Results may not hold', group: 0 },
          { text: 'Only on phones', group: 1 },
          { text: 'Two designers disagreed', group: 2 },
          { text: 'Small sample, holiday period', group: 0 },
          { text: 'If the budget is approved', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which detail do summaries usually drop first?',
        options: [
          { text: 'Caveats, conditions and minority views' },
          { text: 'The main headline', why: 'Headlines usually survive.' },
          { text: 'The title', why: 'Titles survive.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the omission question.',
        tiles: ['What', 'did', 'you', 'leave', 'out?'],
        distractors: ['invent', 'add'],
      },
      {
        kind: 'findBug',
        prompt: 'The source said "sign-ups rose on phones only". Spot the misleading line.',
        lines: ['Two-week test of the new flow.', 'Sign-ups increased across all devices.', 'Results may not hold outside the holiday period.'],
        bug: 1,
        fix: 'Sign-ups increased on phones; no clear change on desktop.',
        explanation: 'A dropped condition makes it sound universal.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Great news, the summary says the new flow boosts sign-ups! Let's roll it out on desktop too.",
        prompt: 'What should Ada say?',
        options: [
          { text: "Wait: the full report says it only helped on phones, and desktop showed no clear change. Let's test desktop separately." },
          { text: 'Yes, roll it out everywhere!', why: 'The condition ("phones only") was dropped.' },
          { text: 'The summary is wrong.', why: 'It was accurate, just incomplete.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the dropped detail to why it matters.',
        pairs: [
          ['"Only on phones"', 'Changes where to roll it out'],
          ['"May not hold"', 'Changes how confident to be'],
          ['"2 of 5 disagreed"', 'Changes who to consult'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s request.',
        template: 'What did you leave out that a [[1]] reader would want to know? List [[2]], conditions and [[3]].',
        blanks: [['careful'], ['caveats'], ['disagreements', 'dissent']],
        distractors: ['lazy', 'emojis', 'jokes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Minority or opposing views are called ... (one word)',
        answers: ['dissent', 'disagreements', 'objections'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request keeps the important "buts"?',
        options: [
          { text: 'Summarise in one line.', why: 'One line almost guarantees dropped caveats.' },
          { text: 'Summarise for a decision-maker. Then list separately: caveats, conditions, and any disagreements, with page numbers.' },
          { text: 'Summarise positively.', why: 'Invites dropping the bad news.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s routine for decision summaries.',
        lines: ['Get the summary', 'Ask what was left out', 'Check if any caveat changes the decision', 'Include the ones that do'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Does this missing detail change the decision?',
        groups: ['Changes it', 'Does not'],
        items: [
          { text: 'It only worked on phones (we planned to roll out on desktop)', group: 0 },
          { text: 'The test was run by a contractor', group: 1 },
          { text: 'The results may not hold outside holidays', group: 0 },
          { text: 'The report used a blue template', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Why do your summaries for our directors always have a 'But note:' line at the end?",
        prompt: "What's Ada's answer?",
        options: [
          { text: "So the caveats that could change their decision don't get lost. It's one line, and it has saved us twice." },
          { text: 'To make them longer.', why: 'It is there for the decision, not length.' },
          { text: 'Habit, no reason.', why: 'There is a very good reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A summary can be accurate and still ... (one word)',
        answers: ['mislead', 'misleading', 'wrong'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to its type.',
        pairs: [
          ['"Results may not hold"', 'Caveat'],
          ['"Only if the budget is approved"', 'Condition'],
          ['"Two designers disagreed"', 'Dissent'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where do the caveats belong in a summary for a director?',
        options: [
          { text: 'In a short "But note:" line, if they could change the decision' },
          { text: 'Nowhere; directors want only good news', why: 'Directors need caveats to decide well.' },
          { text: 'In a separate 10-page appendix', why: 'They will never see it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a decision that went wrong because of a missing "but". What should the summary have said?',
    starters: ['The decision was...', 'The missing "but" was...'],
  },
  deepen: { title: 'Try it today', summary: 'Add "But note:" to your next summary for a decision-maker, with the one caveat that matters.' },
  notes: 'Test results are a fictional example. Omission bias in summaries described qualitatively.',
};

export default lesson;

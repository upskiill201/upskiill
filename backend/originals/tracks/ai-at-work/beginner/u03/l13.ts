import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 13 — how summaries go wrong (invented details, flipped negations, wrong attribution) and the spot-check habit. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Summaries you can trust',
  summary: 'AI summaries are usually right, which is exactly why the wrong ones slip through. Learn how they fail, and a 2-minute spot-check.',
  minutes: 13,
  outcomes: [
    'Name the four ways summaries go wrong',
    'Spot-check a summary in two minutes',
    'Ask for summaries that are easier to verify',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'If an AI summary reads smoothly, it is accurate.',
          isFact: false,
          explain: 'Fluency and accuracy are different things. Wrong summaries read just as smoothly.',
        },
        {
          text: 'A summary can flip a "not" and reverse the meaning.',
          isFact: true,
          explain: '"The client did not approve" can become "the client approved". Always check negations on key points.',
        },
        {
          text: 'You need to re-read the whole source to check a summary.',
          isFact: false,
          explain: 'Spot-check the 2 or 3 claims you will act on. That catches most problems that matter.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Four ways summaries go wrong',
      html:
        '<ol>' +
        '<li><strong>Invented details.</strong> A number, date or name that is not in the source. Often called a "hallucination".</li>' +
        '<li><strong>Flipped meaning.</strong> A dropped "not", or "may" turned into "will".</li>' +
        '<li><strong>Wrong attribution.</strong> Something one person said, credited to another.</li>' +
        '<li><strong>False certainty.</strong> "Users want X" when the source said "a few users suggested X".</li>' +
        '</ol>' +
        '<h3>The 2-minute spot-check</h3>' +
        '<p>Pick the 2 or 3 claims you are going to act on or repeat. For each, find it in the source (page numbers make this fast) and check: the number, the negation, who said it, and how certain the source was.</p>' +
        '<h3>Ask for checkable summaries</h3>' +
        '<p><em>"Summarise this. Only include claims supported by the text, with page numbers. Keep the source\'s level of certainty: if it says \'some\' or \'may\', say that."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Check the claims you will act on: the number, the "not", who said it, and how sure the source was.',
    },
    {
      kind: 'check',
      question: 'The source says "a few users suggested dark mode". The summary says "users want dark mode". What went wrong?',
      options: ['Invented detail', 'False certainty', 'Nothing'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is checking AI summaries before acting on them.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the failure to an example.',
        pairs: [
          ['Invented detail', 'A budget figure not in the source'],
          ['Flipped meaning', '"Did not approve" became "approved"'],
          ['Wrong attribution', "Grace's idea credited to Ada"],
          ['False certainty', '"May" became "will"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which claims should Ada spot-check?',
        options: [
          { text: 'Every single sentence', why: 'Too slow; focus on what matters.' },
          { text: 'The 2 or 3 she will act on or repeat' },
          { text: 'None, summaries are reliable', why: 'Usually, which is why wrong ones slip through.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The source says: "Lucía has not yet approved the palette." Spot the error in the summary.',
        lines: ['Sign-up screens are finished.', 'Lucía approved the palette.', 'Testing is on Friday.'],
        bug: 1,
        fix: 'Lucía has not yet approved the palette.',
        explanation: 'A dropped "not" reversed the meaning.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the certainty instruction.',
        tiles: ['Keep', 'the', "source's", 'level', 'of', 'certainty'],
        distractors: ['ignore', 'boost'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Same certainty as the source, or changed?',
        groups: ['Same', 'Changed'],
        items: [
          { text: 'Source: "may slip". Summary: "may slip".', group: 0 },
          { text: 'Source: "may slip". Summary: "will slip".', group: 1 },
          { text: 'Source: "some users". Summary: "users".', group: 1 },
          { text: 'Source: "3 of 10 users". Summary: "3 of 10 users".', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your summary told my boss 'the client approved the budget'. We haven't approved anything yet!",
        prompt: 'What should Ada do?',
        options: [
          { text: 'Correct it straight away to everyone who saw it, and spot-check key claims before sending summaries from now on.' },
          { text: 'Blame the AI.', why: 'She sent it; she owns the correction.' },
          { text: 'Hope nobody noticed.', why: 'The boss already noticed.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the checkable-summary request.',
        template: 'Only include claims [[1]] by the text, with page [[2]]. If the source says "some" or "may", [[3]] that.',
        blanks: [['supported'], ['numbers'], ['say', 'keep']],
        distractors: ['invented', 'emojis', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'An invented detail in an AI answer is often called a ... (one word)',
        answers: ['hallucination', 'hallucinations'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the 2-minute spot-check.',
        lines: ['Pick the claims you will act on', 'Find each in the source', 'Check number, "not", who said it, certainty', 'Fix anything that is off'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which summary request is easiest to verify?',
        options: [
          { text: 'Summarise this.', why: 'No references, nothing to check against.' },
          { text: "Summarise this. Only claims supported by the text, with page numbers. Keep the source's certainty." },
          { text: 'Summarise this confidently.', why: 'Invites false certainty.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a spot-check, or fine to skim?',
        groups: ['Spot-check', 'Skim is fine'],
        items: [
          { text: 'A number you will put in a report', group: 0 },
          { text: 'Background you will not act on', group: 1 },
          { text: 'A decision you will tell your manager about', group: 0 },
          { text: 'The general topic of an article', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The summary credits our CEO with the idea for the new tagline. It was actually our intern's!",
        prompt: 'Which failure is this, and what fixes it?',
        options: [
          { text: 'An invented detail.', why: 'The idea was real; the credit was wrong.' },
          { text: 'Wrong attribution. Spot-check who said what before sharing.' },
          { text: 'Nothing wrong.', why: 'Credit matters, especially for an intern.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fluency and ... are different things (one word)',
        answers: ['accuracy', 'truth', 'correctness'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the spot-check question to the failure it catches.',
        pairs: [
          ['Is this number in the source?', 'Invented detail'],
          ['Is there a "not"?', 'Flipped meaning'],
          ['Who actually said it?', 'Wrong attribution'],
          ['How sure was the source?', 'False certainty'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do wrong summaries slip through so easily?',
        options: [
          { text: 'They are always obviously wrong', why: 'If they were, nobody would miss them.' },
          { text: 'Nobody reads summaries', why: 'People read and repeat them.' },
          { text: 'Most summaries are right and read smoothly, so we stop checking' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever repeated something from a summary that turned out to be wrong? Which of the four failures was it?',
    starters: ['I once repeated...', 'It was a case of...'],
  },
  deepen: { title: 'Try it today', summary: 'Spot-check the next summary you are about to forward: two claims, two minutes.' },
  notes: '"Hallucination" is the common term for fabricated output. Failure modes described qualitatively, no rates.',
};

export default lesson;

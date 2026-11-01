import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 11 — contracts and reports: what to extract, the small words that matter, and when you need a human expert. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Reading reports and contracts carefully',
  summary: 'In contracts and reports, the important part is often one small word. Learn what to pull out, and what AI must never decide for you.',
  minutes: 15,
  outcomes: [
    'Extract the key terms from a contract with clause references',
    'Spot the small words that change meaning',
    'Read a report\'s claims with healthy questions',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'What to pull out of any contract',
      html:
        '<p>This is not legal advice, and AI is not a lawyer. But AI can help you <strong>find</strong> the parts you must understand, so you know what to ask a real expert about.</p>' +
        '<table><thead><tr><th>Look for</th><th>The question it answers</th></tr></thead><tbody>' +
        '<tr><td>Obligations</td><td>What must each side do?</td></tr>' +
        '<tr><td>Money</td><td>What do we pay, when, and what happens if we are late?</td></tr>' +
        '<tr><td>Duration and renewal</td><td>How long does it last? Does it renew automatically?</td></tr>' +
        '<tr><td>Termination</td><td>How do we get out, and how much notice is needed?</td></tr>' +
        '<tr><td>Liability</td><td>Who is responsible if something goes wrong?</td></tr>' +
        '</tbody></table>' +
        '<h3>The small words that change everything</h3>' +
        '<p><strong>"Unless"</strong>, <strong>"except"</strong>, <strong>"provided that"</strong>, <strong>"may"</strong> vs <strong>"shall"</strong>, <strong>"automatically renews"</strong>. Summaries love to drop these. Ask the AI to quote any sentence containing them.</p>' +
        '<p><em>"From this contract, list obligations, payments, renewal, termination and liability as a table with clause numbers and exact quotes. Separately, quote every sentence containing \'unless\', \'except\', \'provided that\' or \'automatically\'. Flag anything unusual."</em></p>' +
        '<h3>And for reports</h3>' +
        '<p>Ask: who wrote it, when, based on what (how many people, which data)? "Users prefer dark mode" means something different from a survey of 12 people than of 12,000.</p>',
    },
    {
      kind: 'compare',
      title: 'What a summary said vs what the contract said',
      before: { label: 'AI summary', text: 'The contract runs for 12 months. Either side can cancel.' },
      after: {
        label: 'Clause 9.2, quoted',
        text: '"The Agreement shall automatically renew for successive 12-month terms unless either party gives 90 days\' written notice before the end of the current term."',
      },
      notes: ['"Automatically renew": it does not just end.', '"90 days\' written notice": a deadline you could easily miss.', 'The quote was what mattered, not the summary.'],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Anything you will sign or rely on legally: use AI to find and understand, then get a qualified person to check.',
    },
    {
      kind: 'check',
      question: 'Which word in a contract should make you stop and read closely?',
      options: ['"The"', '"Unless"', '"Agreement"'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is reviewing a supplier contract before her manager signs it.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the contract area to its question.',
        pairs: [
          ['Obligations', 'What must each side do?'],
          ['Renewal', 'Does it renew automatically?'],
          ['Termination', 'How do we get out?'],
          ['Liability', 'Who is responsible if it goes wrong?'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Small word that changes meaning, or harmless?',
        groups: ['Read closely', 'Harmless'],
        items: [
          { text: 'unless', group: 0 },
          { text: 'automatically renews', group: 0 },
          { text: 'the parties', group: 1 },
          { text: 'provided that', group: 0 },
          { text: 'hereinafter', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The summary says "either side can cancel". Clause 9.2 says 90 days\' written notice. Which do you trust?',
        options: [
          { text: 'The summary', why: 'Summaries drop exactly these details.' },
          { text: 'The quoted clause' },
          { text: 'Neither, sign anyway', why: 'This is a deadline you could miss.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the safety request.',
        tiles: ['Quote', 'every', 'sentence', 'with', '"unless"'],
        distractors: ['skip', 'summarise'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the plan that is risky.',
        lines: ['Ask the AI to list key terms with clause numbers.', 'Read the quoted clauses myself.', 'Let the AI decide whether we should sign.', 'Ask a qualified person about anything unclear.'],
        bug: 2,
        fix: 'Decide with my manager, after expert advice on anything unclear.',
        explanation: 'AI helps you find and understand. It does not make legal decisions.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Our renewal came through: another 12 months, automatically! We meant to cancel. How did we miss it?",
        prompt: "What's Ada's honest answer?",
        options: [
          { text: "Probably a 'renews automatically unless notice is given' clause. Next time, pull out renewal and notice terms and put the deadline in the calendar." },
          { text: 'Contracts never renew by themselves.', why: 'Many do, automatically.' },
          { text: 'Bad luck.', why: 'It was in the contract.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s contract request.',
        template: 'List obligations, payments, renewal, termination and liability as a table with [[1]] numbers and exact [[2]]. Flag anything [[3]].',
        blanks: [['clause'], ['quotes'], ['unusual']],
        distractors: ['phone', 'jokes', 'boring'],
      },
      {
        kind: 'typeAnswer',
        prompt: '"Shall" usually means must. "May" usually means ... (one word)',
        answers: ['can', 'optional', 'allowed', 'might'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best before signing a supplier contract?',
        options: [
          { text: 'Is this contract OK?', why: 'It cannot decide that, and the question hides the details.' },
          { text: "Table of obligations, payments, renewal, termination, liability with clause numbers and quotes. Quote every 'unless'/'except'/'automatically'. Flag anything unusual." },
          { text: 'Summarise the contract in 3 lines.', why: 'Exactly where key details get lost.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s contract routine.',
        lines: ['Extract key terms with clause numbers and quotes', 'Quote the small-word sentences', 'Read the quoted clauses herself', 'List questions for a qualified person', 'Put deadlines in the calendar'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good question to ask about a report, or not?',
        groups: ['Good question', 'Not useful'],
        items: [
          { text: 'Who wrote it, and when?', group: 0 },
          { text: 'How many people did they ask?', group: 0 },
          { text: 'Is the font nice?', group: 1 },
          { text: 'What data is this based on?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "A report says 'users prefer dark mode'. Should we build it?",
        prompt: 'What should Ada ask first?',
        options: [
          { text: 'Build it, the report says so.', why: 'Check what the claim is based on first.' },
          { text: "Who ran it, how many users, and which users? A survey of 12 people is very different from 12,000." },
          { text: 'Ignore all reports.', why: 'Read them with good questions instead.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Contract deadlines, like a 90-day notice, should go straight in your ... (one word)',
        answers: ['calendar', 'diary', 'agenda'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what it really means.',
        pairs: [
          ['"Automatically renews"', 'It continues unless you act'],
          ['"90 days\' written notice"', 'A deadline to cancel'],
          ['"Unless"', 'An exception follows'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is AI\'s right role with contracts?',
        options: [
          { text: 'Replace your lawyer', why: 'It is not a lawyer and makes mistakes.' },
          { text: 'None at all', why: 'It is very useful for finding and explaining clauses.' },
          { text: 'Help you find and understand the parts that matter, so you know what to ask an expert' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a contract, subscription or terms of service you rely on? Which of the five areas do you actually know?',
    starters: ['I rely on...', 'I am not sure about its...'],
  },
  deepen: {
    title: 'Go deeper',
    summary: 'Check one subscription you pay for: does it renew automatically, and how much notice is needed to cancel?',
  },
  notes: 'Not legal advice; framed as finding and understanding, with qualified review for binding decisions. Contract wording is a fictional example.',
};

export default lesson;

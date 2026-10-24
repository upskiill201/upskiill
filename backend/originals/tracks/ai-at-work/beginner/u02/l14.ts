import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 14 — proofreading: what AI catches, what only you can catch, and a final checklist. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Proofreading with AI',
  summary: 'AI is a great spellchecker and a terrible fact-checker. Use it for one, do the other yourself.',
  minutes: 13,
  outcomes: [
    'Know what AI proofreading catches and what it misses',
    'Ask the AI to check consistency, not just spelling',
    'Run a 30-second human check before anything important goes out',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Find the mistakes a spellchecker cannot see',
      text:
        'Hi Lucia,\n\nGreat news: the launch is confirmed for Thursday 14 May. The final designs are attached. Our review call is on Wednesday 15 May at 10am. Here is the link: teyro.app/review-call\n\nThanks,\nAda',
      hotspots: [
        { phrase: 'Hi Lucia', note: 'Her name is Lucía, with an accent. A spellchecker will not flag a misspelled name; you have to.' },
        { phrase: 'Thursday 14 May', note: 'Check: does the 14th actually fall on a Thursday that year? Date and weekday mismatches are very common.' },
        { phrase: 'The final designs are attached.', note: 'Are they? "Attached" with no attachment is one of the most common email mistakes.' },
        { phrase: 'Wednesday 15 May', note: 'If the 14th is Thursday, the 15th is Friday. The two dates contradict each other.' },
        { phrase: 'teyro.app/review-call', note: 'Click every link before sending. A wrong link looks exactly like a right one.' },
      ],
    },
    {
      kind: 'reading',
      title: 'What AI catches, and what you must',
      html:
        '<table><thead><tr><th>AI is good at</th><th>You must check</th></tr></thead><tbody>' +
        '<tr><td>Spelling and grammar</td><td>Names (and their accents)</td></tr>' +
        '<tr><td>Awkward or unclear sentences</td><td>Dates, weekdays and times</td></tr>' +
        '<tr><td>Repeated words, missing words</td><td>Numbers and prices</td></tr>' +
        '<tr><td>Inconsistent tense or style</td><td>Links and attachments</td></tr>' +
        '<tr><td>Contradictions, <em>if you ask</em></td><td>The recipient list</td></tr>' +
        '</tbody></table>' +
        '<p>The AI can help with the right column too, but only if you ask: <em>"Proofread this. Also list any dates, numbers or names that look inconsistent or contradict each other."</em></p>' +
        '<h3>The 30-second human check</h3>' +
        '<p>Before anything important: names, numbers, dates, links, attachments, recipients. Then read the first and last line out loud.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Names, numbers, dates, links, attachments, recipients. Thirty seconds, every important send.',
    },
    {
      kind: 'check',
      question: 'Which mistake is a spellchecker most likely to miss?',
      options: ['"teh" instead of "the"', 'A wrong date that is spelled correctly', 'A missing full stop'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is proofreading before a big send.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Who is better at catching it?',
        groups: ['AI proofread', 'Your own check'],
        items: [
          { text: 'A spelling mistake', group: 0 },
          { text: 'A missing attachment', group: 1 },
          { text: 'An awkward sentence', group: 0 },
          { text: 'The wrong recipient', group: 1 },
          { text: 'A link that goes to the wrong page', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "attached" with no attachment so common?',
        options: [
          { text: 'Email apps delete attachments', why: 'Usually it was never added.' },
          { text: 'You write "attached" before attaching, then forget' },
          { text: 'It is rare', why: 'It is one of the most common email mistakes.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the extra proofreading instruction.',
        tiles: ['List', 'any', 'dates', 'or', 'numbers', 'that', 'contradict'],
        distractors: ['ignore', 'invent'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the contradiction.',
        lines: ['The launch is on Thursday 14 May.', 'Testing ends the day before, Wednesday 13 May.', 'The review call is on Wednesday 15 May.'],
        bug: 2,
        fix: 'The review call is on Friday 15 May.',
        explanation: 'If the 14th is Thursday, the 15th is Friday.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each check to what can go wrong.',
        pairs: [
          ['Names', 'Lucia instead of Lucía'],
          ['Dates', 'Weekday does not match the date'],
          ['Links', 'Goes to the wrong page'],
          ['Recipients', 'Sent to the wrong Grace'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your email says the designs are attached, but I don't see anything!",
        prompt: 'Which reply is best?',
        options: [
          { text: "Sorry! Here they are, attached for real this time." },
          { text: 'Check your spam folder.', why: 'The likely cause is that it was never attached.' },
          { text: 'They were attached.', why: 'Check before defending.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the 30-second check.',
        template: 'Names, [[1]], dates, [[2]], attachments, [[3]].',
        blanks: [['numbers'], ['links'], ['recipients']],
        distractors: ['fonts', 'emojis'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'AI is a great spellchecker but a poor ...-checker (one word)',
        answers: ['fact'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most useful proofread?',
        options: [
          { text: 'Check this.', why: 'Check for what?' },
          { text: 'Proofread this: spelling and grammar. Also list any names, dates or numbers that look inconsistent. Do not rewrite it.' },
          { text: 'Make this perfect.', why: 'It may rewrite it, and still not check the facts.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s pre-send routine.',
        lines: ['AI proofread plus consistency check', 'Check names, numbers, dates yourself', 'Click every link, open every attachment', 'Check the recipients', 'Read the first and last line aloud'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs the full check, or a quick look is fine?',
        groups: ['Full check', 'Quick look'],
        items: [
          { text: 'A price quote to a client', group: 0 },
          { text: '"Thanks, got it!" to a teammate', group: 1 },
          { text: 'A launch announcement to all customers', group: 0 },
          { text: 'A lunch plan in team chat', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Small thing: it's Lucía with an accent. Happens all the time, don't worry!",
        prompt: "What's the best reply?",
        options: [
          { text: 'The spellchecker did not flag it.', why: 'True, but names are your job.' },
          { text: "Thanks for telling me, Lucía! I'll get it right from now on." },
          { text: 'Accents are hard to type.', why: 'Not her problem. Fix it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before sending, click every ... (one word)',
        answers: ['link', 'links'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the request to what it catches.',
        pairs: [
          ['"Proofread this"', 'Spelling and grammar'],
          ['"List inconsistent dates"', 'Contradictions'],
          ['Reading it aloud', 'Clunky sentences'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI found no spelling errors. Is the email ready?',
        options: [
          { text: 'Yes, completely', why: 'Correctly spelled facts can still be wrong.' },
          { text: 'Only if it is short', why: 'Length does not change what needs checking.' },
          { text: 'Not yet: names, numbers, dates, links, attachments and recipients still need checking' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What mistake have you sent before that a spellchecker could not have caught? Which check would have stopped it?',
    starters: ['I once sent...', 'The check that would have caught it:'],
  },
  deepen: { title: 'Do it now', summary: 'Save the 30-second checklist next to your recipe and voice note.' },
  notes:
    'Calendar facts in the example are deliberately inconsistent (14th Thursday / 15th Wednesday) as the teaching point; no real year is stated. Common-mistake claims phrased qualitatively.',
};

export default lesson;

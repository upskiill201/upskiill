import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 12 — writing up: decision first, the "so what", options with a recommendation. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'Writing for someone senior',
  summary: 'Senior people read for one thing: what do you need me to decide or know? Give them that first.',
  minutes: 14,
  outcomes: [
    'Lead with the decision or the "so what"',
    'Present options with a clear recommendation',
    'Anticipate the first question and answer it in advance',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'How senior people read',
      html:
        '<p>A director might get a hundred messages a day. They read the first lines, decide if they need to act, and move on. So the first lines must answer: <strong>what do you need from me, and why does it matter?</strong></p>' +
        '<h3>A shape that works: Answer, Why, Options, Ask</h3>' +
        '<ol>' +
        '<li><strong>Answer:</strong> the point in one sentence. "I recommend we delay the dark mode project to next quarter."</li>' +
        '<li><strong>Why:</strong> the "so what" for <em>them</em>: money, time, risk, customers. Not the history.</li>' +
        '<li><strong>Options:</strong> two or three, each in a line, with your recommendation marked.</li>' +
        '<li><strong>Ask:</strong> exactly what you need and by when. "Your OK by Friday."</li>' +
        '</ol>' +
        '<h3>Three habits seniors notice</h3>' +
        '<ul>' +
        '<li><strong>Numbers that matter, not every number.</strong> "Delaying saves two weeks of developer time" beats a spreadsheet.</li>' +
        '<li><strong>No surprises.</strong> Bad news early and plainly, with what you are doing about it.</li>' +
        '<li><strong>Answer the first question before they ask it.</strong> If they will ask "what does it cost?", say it.</li>' +
        '</ul>',
    },
    {
      kind: 'compare',
      title: 'Story order vs senior order',
      before: {
        label: 'Story order',
        text: 'So in March we started looking at dark mode, and then users mentioned it a few times, and the developers looked into it, and it turns out it is more work than we thought because of the charts, so we were thinking maybe we could possibly push it?',
      },
      after: {
        label: 'Senior order',
        text: 'Recommendation: move dark mode to next quarter.\nWhy: the charts need rework, so it would delay the launch by about two weeks.\nOptions: (A) delay dark mode, recommended; (B) ship it without dark charts; (C) delay the launch.\nAsk: your OK on option A by Friday.',
      },
      notes: ['The recommendation is the first word.', 'The why is about the launch, which the director cares about.', 'Options make the decision quick.', 'The ask has a date.'],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask the AI: "What is the first question a busy director would ask about this? Answer it in the message."',
    },
    {
      kind: 'check',
      question: 'What should the first sentence to a senior reader be?',
      options: ['How the project started', 'The recommendation or decision needed', 'A greeting paragraph'],
      answer: 1,
    },
  ],
  apply: {
    scenario: "Ada is writing to her manager's manager for the first time.",
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the senior-reader shape.',
        lines: ['Answer (the point)', 'Why it matters to them', 'Options, with a recommendation', 'The ask, with a date'],
      },
      {
        kind: 'mcq',
        prompt: 'What is the "so what" for a senior reader?',
        options: [
          { text: 'Why it matters to them: money, time, risk or customers' },
          { text: 'The full history of the project', why: 'History is rarely what they need.' },
          { text: 'How hard the team worked', why: 'Nice, but not what helps them decide.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Senior order, or story order?',
        groups: ['Senior order', 'Story order'],
        items: [
          { text: 'Recommendation: delay dark mode.', group: 0 },
          { text: 'Back in March, we started looking at...', group: 1 },
          { text: 'Ask: your OK by Friday.', group: 0 },
          { text: 'So anyway, after lots of discussion...', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a strong opening line.',
        tiles: ['Recommendation:', 'move', 'dark', 'mode', 'to', 'next', 'quarter'],
        distractors: ['maybe', 'possibly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Ada\'s line.',
        pairs: [
          ['Answer', '"Move dark mode to next quarter"'],
          ['Why', '"Otherwise launch slips two weeks"'],
          ['Options', '"A: delay; B: ship without dark charts"'],
          ['Ask', '"Your OK on A by Friday"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line a director does not need.',
        lines: [
          'Recommendation: delay dark mode to next quarter.',
          'Why: it would push the launch back about two weeks.',
          'Fun fact: the developers ordered pizza while investigating.',
          'Ask: your OK by Friday.',
        ],
        bug: 2,
        explanation: 'Every line should help them decide. This one does not.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "My CEO wants a decision on extending our contract with you. Can you send something she can decide from in 30 seconds?",
        prompt: 'Which opening should Ada send?',
        options: [
          { text: 'Recommendation: extend for 6 months. Why: launch is on track and phase 2 is ready to start. Ask: a yes by the 30th.' },
          { text: 'Thank you for this wonderful partnership over the past months, which started when...', why: 'Story order. The decision is buried.' },
          { text: 'Here is our full project history attached.', why: 'Not decidable in 30 seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Bad news to seniors: early and ... (one word)',
        answers: ['plainly', 'clearly', 'honestly', 'plain'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the shape.',
        template: '[[1]], Why, [[2]], Ask.',
        blanks: [['Answer'], ['Options']],
        distractors: ['History', 'Jokes'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the AI to write for a director?',
        options: [
          { text: 'Write to the director about dark mode.', why: 'No shape, no recommendation, no ask.' },
          {
            text: 'Write to a busy director: first line is my recommendation (delay dark mode); then why, in terms of launch timing; then 3 options with A recommended; then the ask (OK by Friday). Under 120 words. Answer the first question she would ask.',
          },
          { text: 'Write a formal, impressive letter to a director.', why: '"Impressive" is a wish, not a shape.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Number that matters to a director, or detail?',
        groups: ['Matters', 'Detail'],
        items: [
          { text: 'Delaying saves two weeks before launch', group: 0 },
          { text: 'We had 14 meetings about it', group: 1 },
          { text: 'Option B costs an extra developer for a month', group: 0 },
          { text: 'The investigation took 3 afternoons', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "My boss asked 'what does it cost?' straight after reading your proposal. It wasn't in there.",
        prompt: 'What should Ada do next time?',
        options: [
          { text: "Anticipate the first question: ask the AI what a director would ask first, and answer it in the message." },
          { text: 'Wait for questions and answer them later.', why: 'Each round-trip slows the decision.' },
          { text: 'Make the proposal longer.', why: 'Longer is not the fix. Anticipating is.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Give options, but always mark your ... (one word)',
        answers: ['recommendation', 'choice', 'pick'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the senior habit to its benefit.',
        pairs: [
          ['Recommendation first', 'They know what you want instantly'],
          ['Options', 'The decision is quick'],
          ['No surprises', 'They trust you with bad news'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give two or three options instead of one?',
        options: [
          { text: 'It shows you considered alternatives and makes the decision easy' },
          { text: 'To avoid making a recommendation', why: 'You should still recommend one.' },
          { text: 'Directors like long lists', why: 'Two or three, not long lists.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who is the most senior person you write to? Rewrite the opening of your last message to them as "Answer, Why, Options, Ask".',
    starters: ['Answer:', 'Why:', 'Ask:'],
  },
  deepen: { title: 'Go deeper', summary: 'Look up "BLUF (bottom line up front)" and "the pyramid principle" for more on writing for decision-makers.' },
  notes: '"Answer, Why, Options, Ask" is a Teyro simplification of BLUF / pyramid-style executive writing. No statistics; "a hundred messages a day" is illustrative ("might get").',
};

export default lesson;

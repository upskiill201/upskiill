import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 6 — out-of-date answers and training cut-offs. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Out-of-date answers',
  summary: 'AI tools learn from data up to a cut-off date. Anything newer, like prices, rules, people in jobs and fees, may be stale or missing.',
  minutes: 12,
  outcomes: [
    'Explain what a training cut-off is',
    'Know which kinds of facts go stale fastest',
    'Ask for, and check, the date of any fact that changes',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Every AI model learned from text up to a certain date: its training cut-off. After that, it knows nothing unless it can search the web.', replies: ['So it might not know this year\'s fees?'] },
        { tey: 'Exactly. Mobile money fees, tax rules, exchange rates, who runs a company: they change. The AI may confidently give you last year\'s.', replies: ['What if my tool can browse the web?'] },
        { tey: 'Better, but still check the date on the page it used. Search results can be old too.', replies: ['How do I ask?'] },
        { tey: 'Add: "When was this true? Give the date of your source, and tell me if it may have changed." Then check anything that matters against an official, current page.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Prices, fees, rules, rates and job titles change. Treat AI answers about them as "as of some past date" until you check today\'s version.',
    },
  ],
  apply: {
    scenario: 'Ada is checking the facts in the Ghana launch plan.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a training cut-off?',
        options: [
          { text: 'The date after which the model learned nothing new' },
          { text: 'The time limit on a chat', why: 'It\'s about what the model learned.' },
          { text: 'The maximum length of an answer', why: 'It\'s about dates.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Changes often, or fairly stable?',
        groups: ['Changes often', 'Fairly stable'],
        items: [
          { text: 'Mobile money transfer fees', group: 0 },
          { text: 'The capital of Ghana', group: 1 },
          { text: 'Exchange rates', group: 0 },
          { text: 'How a percentage works', group: 1 },
          { text: 'Who is CEO of a company', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s follow-up.',
        tiles: ['When', 'was', 'this', 'true?'],
        distractors: ['Who', 'cares?'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The plan says transfer fees in Ghana are 1%. Is that current?',
        prompt: 'What should Ada do?',
        options: [
          { text: 'Check the current fee on an official or provider page, note the date, and update the plan.' },
          { text: 'Say yes; the AI is up to date.', why: 'It may be using old data.' },
          { text: 'Remove all fees from the plan.', why: 'Check and keep the correct one.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the follow-up request.',
        template: 'When was this true? Give the [[1]] of your source, and tell me if it may have [[2]].',
        blanks: [['date'], ['changed']],
        distractors: ['colour', 'improved'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the fact to where to check it.',
        pairs: [
          ['Exchange rate', 'A central bank or bank\'s current page'],
          ['Provider fees', 'The provider\'s official price page'],
          ['A company\'s CEO', 'The company\'s own website'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line most needs a date check?',
        lines: [
          'Ghana\'s capital is Accra',
          'Mobile money transfer fee: 1%',
          'Our app supports English',
          'Launch region: Greater Accra',
        ],
        bug: 1,
        fix: 'Mobile money transfer fee: (checked today on the provider\'s page)',
        explanation: 'Fees change and may have been taxed or revised since the model\'s data.',
      },
      {
        kind: 'mcq',
        prompt: 'Ada\'s tool can search the web. Is she done checking?',
        options: [
          { text: 'No. She should check the date and source of the page it used.' },
          { text: 'Yes, web results are always current.', why: 'Pages can be years old.' },
          { text: 'Yes, if the answer is long.', why: 'Length isn\'t freshness.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good habit or risky habit?',
        groups: ['Good habit', 'Risky habit'],
        items: [
          { text: 'Writing "as of 12 May" next to a fee', group: 0 },
          { text: 'Copying an exchange rate from an AI chat', group: 1 },
          { text: 'Checking the provider\'s own price page', group: 0 },
          { text: 'Assuming last year\'s rules still apply', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The date after which a model learned nothing new is its training ... (one word)',
        answers: ['cut-off', 'cutoff', 'cut off'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s check for a changeable fact.',
        lines: ['Ask when it was true', 'Find the official current page', 'Compare', 'Write the date next to the fact'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request handles changing facts best?',
        options: [
          { text: 'What are the current fees?', why: 'It may answer from old data without saying so.' },
          { text: 'What were the fees as of your latest information? Say when that was, and list what I should check on official pages today.' },
          { text: 'Tell me the fees for next year.', why: 'It can\'t know that.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which facts in your job change often? Where would you check today\'s version?',
    starters: ['Facts that change:', 'Where I\'d check:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask your AI tool what its knowledge cut-off is, then ask it a question about a recent change in your field.' },
  notes: 'Training cut-offs are a general property of language models; exact dates vary by model. The 1% fee is fictional.',
};

export default lesson;

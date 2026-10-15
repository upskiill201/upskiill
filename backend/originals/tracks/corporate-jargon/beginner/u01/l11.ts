import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 11. Chat with Tey: the "busy" family (bandwidth, capacity, full plate) and saying "not now" professionally. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Bandwidth, capacity, full plate',
  summary: 'Friday morning. Remi is deep in invoices when Zanele asks for help with her spreadsheet. He wants to help, but he has no time. How do professionals say that?',
  minutes: 12,
  outcomes: [
    'Decode the "busy" family: bandwidth, capacity, full plate, stretched thin',
    'Say you\'re busy without sounding lazy or rude',
    'Offer an alternative instead of a flat no',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Friday, 10:15. Remi is deep in three months of Swift Freight invoices. Zanele appears: \"Remi! Do you have the bandwidth to help me fix my spreadsheet? Twenty minutes, tops.\" What does she mean by bandwidth?",
          replies: ['Is my internet fast enough?', 'Do I have time and energy for it?'],
        },
        {
          tey: "Time and energy. \"Bandwidth\" came from computing, where it means how much data a connection can carry. In offices, it's how much work a person can carry. So, does Remi have the bandwidth?",
          replies: ['Not really. The invoices are top priority.'],
        },
        {
          tey: "Right. Here's the problem: saying \"no\" to a colleague in week one feels awful. Saying \"yes\" and missing Brian's top priority is worse. There's a third way. Want to see it?",
          replies: ['Yes please.'],
        },
        {
          tey: "The \"not now, but\" reply: name what you're busy with, then offer something real. Like this: \"I'd love to help, but I'm at capacity until the wrap-up: Brian's invoices are top priority. Could I look at it at 4:30, or is it urgent?\"",
          replies: ['Why say what I\'m busy with?', 'Why ask if it\'s urgent?'],
        },
        {
          tey: "Both matter. Saying what you're busy with shows it's not an excuse. Asking if it's urgent means if it really is, she can tell you, and you can decide together, or ask Brian. You're not refusing. You're scheduling.",
          replies: ['And the other busy words?'],
        },
        {
          tey: "Same family: \"at capacity\" means completely full. \"A full plate\" or \"a lot on my plate\" means lots to do. \"Stretched thin\" means doing too many things to do any of them well. \"Swamped\" means flooded with work. All of them mean: I'm busy. The fix is always the same: say it, and offer a time.",
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Three ways to say "not now"',
      before: {
        label: 'Too blunt',
        text: 'No, I\'m busy.',
      },
      after: {
        label: 'Not now, but',
        text: 'I\'d love to help, but I\'m at capacity until 4: Brian\'s invoices are top priority. Could I look at it at 4:30, or is it urgent?',
      },
      notes: [
        'It starts warm: "I\'d love to help".',
        'It names what\'s on Remi\'s plate, so it\'s clearly not an excuse.',
        'It offers a real time: 4:30.',
        'It asks if it\'s urgent, so Zanele can push back if she needs to.',
      ],
    },
  ],
  apply: {
    scenario: 'Friday morning. Everyone wants a piece of Remi.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Do you have the bandwidth for this?" What is Zanele asking?',
        options: [
          { text: 'Is your internet connection fast?', why: 'The word came from computing, but at work it means a person\'s capacity.' },
          { text: 'Are you good at spreadsheets?', why: 'It\'s about time, not skill.' },
          { text: 'Do you have the time and energy to take this on?' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the busy words.',
        pairs: [
          ['At capacity', 'Completely full'],
          ['A full plate', 'Lots to do'],
          ['Stretched thin', 'Too many things at once'],
          ['Bandwidth', 'Time and energy for more'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "not now, but" reply in order.',
        lines: ['I\'d love to help,', 'but I\'m at capacity until 4:', 'Brian\'s invoices are top priority.', 'Could I look at it at 4:30, or is it urgent?'],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Do you have the bandwidth to help with my spreadsheet? Twenty minutes, tops.',
        prompt: 'Remi is busy with the top priority. Best reply?',
        options: [
          { text: 'No.', why: 'Clear, but cold. And it gives Zanele nowhere to go.' },
          { text: 'I\'d love to, but I\'m on Brian\'s invoices until 4. Could I help at 4:30, or is it urgent?' },
          { text: 'Sure! (and miss Brian\'s deadline)', why: 'Saying yes to everything means letting down the person whose work is top priority.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Finish the phrase: "I\'ve got a lot on my ..." (one word)',
        answers: ['plate'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the good reply say WHAT Remi is busy with?',
        options: [
          { text: 'So it\'s clearly a real reason, not an excuse' },
          { text: 'To show off about working for Brian', why: 'It\'s not a boast, it\'s context.' },
          { text: 'It doesn\'t matter what he says', why: '"I\'m busy" alone can sound like "I don\'t want to".' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good "not now" or not?',
        groups: ['Good', 'Needs work'],
        items: [
          { text: 'I\'m swamped until Monday, but could do Monday morning?', group: 0 },
          { text: 'Ask someone else.', group: 1 },
          { text: 'I\'m at capacity today. Is tomorrow at 10 okay, or is it urgent?', group: 0 },
          { text: 'Maybe. We\'ll see.', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s reply to Felix. Which sentence is the problem?',
        lines: [
          'Thanks for thinking of me, Felix!',
          'I\'m stretched thin today with the invoice project.',
          'So I can never help with IT things.',
        ],
        bug: 2,
        fix: 'Could I help on Monday afternoon instead?',
        explanation: '"Never" closes the door. Offer a real time instead.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the professional "not now".',
        template: 'I\'d love to help, but I\'m at [[1]] today. Could I look at it [[2]] morning, or is it [[3]]?',
        blanks: [['capacity'], ['tomorrow', 'Monday'], ['urgent']],
        distractors: ['bandwidth', 'never'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian himself asks Remi to take on a NEW task while he\'s on the invoices. What\'s the best reply?',
        options: [
          { text: '"I don\'t have the bandwidth."', why: 'With your manager, let them choose the order. They set the priorities.' },
          { text: '"Happy to. I\'m on the invoices right now: should this come first, or after?"' },
          { text: 'Say yes and quietly do both badly', why: 'Better to ask which comes first than to stretch yourself thin in silence.' },
        ],
        answer: 1,
        explanation: 'With a colleague, you offer a time. With your manager, you ask them to choose the order.',
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life do you find hard to say "not now" to? Write the "not now, but" reply you could use next time.',
    starters: ['I find it hard with...', 'Next time I\'ll say: "I\'d love to, but..."'],
  },
  deepen: {
    title: 'Your "not now, but" script',
    summary: 'Save your own version of the reply in your phone\'s notes: warm start, what you\'re busy with, a real time, and "is it urgent?". Use it the next time someone catches you at a bad moment.',
  },
  notes: '"Bandwidth" (Merriam-Webster sense: the emotional or mental capacity necessary to do something), "at capacity", "on my plate" (Cambridge), "stretched thin" (Cambridge: stretched too thin), "swamped" (Cambridge).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Step-by-step: logging an urge. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The urge log',
  summary: 'Miracle\'s advice after the boots: "Don\'t try to stop the urges yet. Just catch them." Here\'s how to log an urge in 20 seconds, so that by next week you can see your own pattern.',
  minutes: 11,
  outcomes: [
    'Log an urge to buy in under 20 seconds',
    'Record the details that reveal patterns',
    'Use the log without judging yourself',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Logging an urge',
      steps: [
        { title: '1. Notice the pull', body: 'The moment you feel "I want that, now", that\'s an urge. You don\'t have to resist it yet. Just notice it.' },
        { title: '2. Open the log', body: 'A note on your phone called "Urges". One line per urge. Kofi pins it to his home screen.' },
        { title: '3. Write five things', body: 'Time. Where you were (in person or which app). What you wanted and the price. How you felt (one word). Who you were with.' },
        { title: '4. Write what you did', body: 'Bought it, waited, or let it go. All three are fine to write. The log is information, not a test.' },
        { title: '5. One line, 20 seconds', body: 'Kofi\'s example: "Wed 11:40 p.m. · scrolling in bed · jersey GH₵250 · bored · alone · waited."' },
        { title: '6. Read it on Sunday', body: 'At the weekly money check, read the week\'s urges. Look for repeats: times, feelings, apps, people.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Time, place, item and price, feeling, who you were with, what you did. One line, every urge, no judgement.',
    },
  ],
  apply: {
    scenario: 'Kofi\'s first week of logging.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order how to log an urge.',
        lines: ['Notice the pull', 'Open the log', 'Write the five details', 'Write what you did', 'Read it on Sunday'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in an urge log line, or not needed?',
        groups: ['Belongs', 'Not needed'],
        items: [
          { text: 'The time', group: 0 },
          { text: 'How you felt, in one word', group: 0 },
          { text: 'A long essay about your childhood', group: 1 },
          { text: 'What you did', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Kofi\'s line to its detail.',
        pairs: [
          ['Wed 11:40 p.m.', 'Time'],
          ['Scrolling in bed', 'Where'],
          ['Jersey GH₵250', 'Item and price'],
          ['Bored', 'Feeling'],
          ['Waited', 'What he did'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why log urges without trying to stop them at first?',
        options: [
          { text: 'To see your patterns clearly before trying to change them' },
          { text: 'Because stopping urges is impossible', why: 'It\'s possible, once you understand them.' },
          { text: 'To feel bad', why: 'The log is information, not judgement.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'I bought the thing anyway. Should I still log it?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Yes, especially those. "Bought it" is just as useful to know as "waited".' },
          { text: 'No, only log the ones you resisted.', why: 'Then the log hides the most important information.' },
          { text: 'Stop logging; you failed.', why: 'Logging isn\'t a test you can fail.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The log rule.',
        template: 'One [[1]], every urge, no [[2]].',
        blanks: [['line'], ['judgement', 'judgment']],
        distractors: ['page', 'money'],
      },
      {
        kind: 'findBug',
        prompt: 'Which log line is missing the most useful detail?',
        lines: [
          'Fri 1:10 a.m. · in bed · sneakers GH₵400 · sad · alone · bought.',
          'Sat 2 p.m. · Kejetia · bag GH₵90 · excited · with Yaw · waited.',
          'Sun · phone case · bought.',
        ],
        bug: 2,
        fix: 'Sun 11 p.m. · scrolling · phone case GH₵60 · bored · alone · bought.',
        explanation: 'Without time, place, price and feeling, there\'s no pattern to find.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Logging takes about 20 seconds. Eleven urges in a week takes about how many minutes? (Round to the nearest minute.)',
        answers: ['4', 'four', '3.7', '4 minutes'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'When should Kofi read the log?',
        options: [
          { text: 'At his Sunday money check' },
          { text: 'Never; writing is enough', why: 'Reading it is where the patterns appear.' },
          { text: 'Every hour', why: 'Too often. Weekly is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why write "who you were with"?',
        options: [
          { text: 'Other people can be triggers, and that\'s a pattern worth spotting' },
          { text: 'To blame them', why: 'It\'s about spotting patterns, not blame.' },
          { text: 'It\'s not useful', why: 'Social triggers are common. Chapter 4 is about them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Start your urge log today. What will you call the note, and where will you pin it?',
    starters: ['My note is called...', 'I\'ll pin it...'],
  },
  deepen: {
    title: 'Why tracking urges helps',
    summary: 'Writing down urges and behaviours (self-monitoring) is used in many habit-change programmes, from saving to smoking. Simply noticing a pattern often weakens it, because the next time you feel the urge, you recognise it.',
  },
  notes: 'Self-monitoring as a behaviour-change technique: Michie et al. (2013) BCT taxonomy; Harkin et al. (2016) meta-analysis on monitoring. Urge log format is a teaching device.',
};

export default lesson;

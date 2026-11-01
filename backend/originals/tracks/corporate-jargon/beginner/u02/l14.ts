import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 14. Step-by-step: how to wrap up a meeting — "we're nearly at time", recap, next steps, AOB, "give you time back". */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Wrapping up: recap, next steps, AOB',
  summary: 'Brian ends every meeting the same way, and Remi finally notices the pattern: "We\'re nearly at time. To recap... Next steps... Any other business? Great, I\'ll give you five minutes back."',
  minutes: 12,
  outcomes: [
    'Decode the closing phrases: nearly at time, to recap, next steps, AOB, time back',
    'Close a meeting in five steps',
    'Make sure everyone leaves knowing who does what',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'How Brian closes a meeting, step by step',
      steps: [
        {
          title: 'Signal the end',
          body: '"We\'re nearly at time." or "We\'ve got five minutes left." This tells everyone to stop starting new topics. "At time" means at the planned end time.',
        },
        {
          title: 'Recap the decisions',
          body: '"To recap: we\'re testing the new courier on the Mombasa route first." A recap repeats what was DECIDED, in one or two sentences, so nobody leaves with a different version.',
        },
        {
          title: 'Next steps, with names',
          body: '"Next steps: Emeka sets up the test by Monday. Remi tracks delivery times. I\'ll update Mr Kamau." Every action has an owner, like the action items from last week.',
        },
        {
          title: 'AOB',
          body: '"Any other business?" (AOB) means: is there anything else, not on the agenda, that someone needs to raise? Usually the answer is no. Sometimes it\'s the most important thing all day.',
        },
        {
          title: 'Thank, and give time back',
          body: '"Thanks, everyone. I\'ll send round the notes. Let\'s give you five minutes back." Finishing early is a small gift: five minutes back is five minutes for coffee.',
        },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: 'Any other business?' },
        { speaker: 'zanele', text: 'Yes! The drones!' },
        { speaker: 'brian', text: 'Parking lot. Anything else?' },
        { speaker: 'narrator', text: 'Silence. Brian smiles. "Great, five minutes back." Everyone leaves a little happier.' },
        { speaker: 'tey', text: "AOB isn't a second chance for the parking lot, Zanele. But nice try." },
      ],
    },
  ],
  apply: {
    scenario: 'Thursday, 12:25. Five minutes left.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Brian\'s close in order.',
        lines: ['We\'re nearly at time.', 'To recap: we\'re testing the new courier first.', 'Next steps: Emeka sets up the test by Monday.', 'Any other business?', 'Thanks all, I\'ll give you five minutes back.'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "AOB" stand for?',
        options: [
          { text: 'Any other business' },
          { text: 'All on board', why: 'Nice guess, but it\'s "any other business".' },
          { text: 'After office break', why: 'Sadly not.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the closing phrase to what it does.',
        pairs: [
          ['We\'re nearly at time', 'No new topics now'],
          ['To recap', 'Repeat what was decided'],
          ['Next steps', 'Who does what next'],
          ['Five minutes back', 'Finishing early'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Remi, could you do the recap for us?',
        prompt: 'Best recap?',
        options: [
          { text: 'We talked about lots of courier stuff and drones.', why: 'A recap is the decisions, not the topics.' },
          { text: 'Everything was great!', why: 'Nice, but nobody knows what was decided.' },
          { text: 'We\'re testing the new courier on the Mombasa route first. Emeka sets it up by Monday, and I\'ll track the delivery times.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"To ___: we agreed to test the new courier." (one word)',
        answers: ['recap', 'summarise', 'summarize'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele closes her meeting. Which line is a mistake?',
        lines: [
          'We\'re nearly at time.',
          'Next steps: someone should probably look at couriers at some point.',
          'Any other business?',
        ],
        bug: 1,
        fix: 'Next steps: Zanele updates the courier tab by Tuesday.',
        explanation: 'A next step needs a name and a date. "Someone, at some point" means nobody, never.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for AOB, or not?',
        groups: ['Good AOB', 'Not for AOB'],
        items: [
          { text: 'Heads-up: I\'m on leave next Friday', group: 0 },
          { text: 'Restarting the whole courier debate', group: 1 },
          { text: 'The office is closed on Monday for the holiday', group: 0 },
          { text: 'A 20-minute presentation', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why repeat the decisions in a recap, if everyone was there?',
        options: [
          { text: 'To fill time', why: 'It takes 20 seconds and saves weeks.' },
          { text: 'People often leave with different versions of what was decided' },
          { text: 'It\'s the law', why: 'Just good sense.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Action item', 'A task with an owner'],
          ['In the weeds', 'Too much detail'],
          ['Pre-read', 'Read before the meeting'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Brian\'s favourite last line.',
        tiles: ['Thanks', 'all,', 'I\'ll', 'give', 'you', 'five', 'minutes', 'back.'],
        distractors: ['weeds', 'AOB'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last meeting, class or group call. If you had to recap it in two sentences, what was decided, and who does what next?',
    starters: ['To recap: ...', 'Next steps: ...'],
  },
  deepen: {
    title: 'Close your next call',
    summary: 'Even if you\'re not running it, offer: "Shall I recap what we decided?" in the last five minutes of your next meeting. People remember who brought clarity.',
  },
  notes: 'AOB = any other business (Cambridge; common in UK/Commonwealth meeting agendas, including East and West Africa). "At time" (meeting has reached its scheduled end). "Give you time back" (business idiom: end early).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Chapter Challenge: the nephew's back channel. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the back channel',
  summary: 'Day 12. Kavya mentions, casually, that she\'s been building a "flash sale countdown" for three days. Mr Rao\'s nephew, Rohit, has been messaging her directly with requests. "He said Mr Rao wants it." It\'s not on the list. It\'s not in the intent. It\'s eaten her shipping page time.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 2 tool in one live moment',
    'Close a back channel without blaming anyone',
    'Protect your team\'s priorities from surprise requests',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 12, 2:20 p.m.',
      beats: [
        { speaker: 'kavya', text: 'Oh, and the flash sale countdown is nearly done! Rohit said Mr Rao really wants it.' },
        { speaker: 'narrator', text: 'Arjun has never heard of the flash sale countdown. The shipping page, due Thursday, hasn\'t been started. Rohit has messaged Kavya eleven times this week. Kavya thought she was being helpful. She was, to Rohit.' },
        { speaker: 'joel', text: '(quietly) Rohit messaged me twice too. I didn\'t reply. I didn\'t know if I was allowed to.' },
        { speaker: 'narrator', text: 'Eighteen days to Diwali. You\'re with Arjun.' },
      ],
    },
  ],
  apply: {
    scenario: 'Day 12, 2:20 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun say to Kavya first?',
        options: [
          { text: '"You were trying to help, and that\'s great. That\'s a gap in our team page, not you. Let\'s fix how requests come in."' },
          { text: '"Why are you taking orders from Rohit?"', why: 'She didn\'t know she shouldn\'t. The page didn\'t say.' },
          { text: '"Stop the countdown immediately."', why: 'Maybe, but first fix the cause, kindly.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool fixes it?',
        groups: ['Ownership', 'Intent', 'Decisions'],
        items: [
          { text: 'Only Arjun talks to the client side', group: 0 },
          { text: 'Does a countdown serve the intent?', group: 1 },
          { text: 'Arjun decides what\'s in scope', group: 2 },
          { text: 'New tasks go on the list with an owner', group: 0 },
          { text: 'Shoppers buy a gift in under two minutes', group: 1 },
          { text: 'Clashes decided by noon', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Should I have replied to Rohit?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, you should always reply to the client.', why: 'Then two people take orders from two directions.' },
          { text: 'Ignore him forever.', why: 'Rude, and it doesn\'t fix the route.' },
          { text: 'You did the right thing by asking. From now on, forward anything from Rohit or Mr Rao to me, and I\'ll decide what comes onto the list.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Requests that skip the agreed route come through a back ___. (one word)',
        answers: ['channel', 'Channel', 'door'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s fix in order.',
        lines: ['Thank Kavya, own the gap', 'Add "requests come through Arjun" to the page', 'Check the countdown against the intent', 'Agree with Mr Rao how requests reach the team'],
      },
      {
        kind: 'mcq',
        prompt: 'How should Arjun raise it with Mr Rao (who reads only the first line)?',
        options: [
          { text: '"Your nephew has been causing problems for the team..."', why: 'Blames Rohit, and buries the ask.' },
          { text: 'Say nothing, just ignore Rohit', why: 'Rohit keeps messaging, and Mr Rao never knows why.' },
          { text: '"To hit Diwali, could all requests come to me first?" Then the reason, below.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new line for the team page. Which version breaks Chapter 2?',
        lines: [
          'Requests from Mr Rao or Rohit come to Arjun first.',
          'If something sounds urgent, everyone just does it.',
          'Arjun adds approved work to the list with an owner and a date.',
        ],
        bug: 1,
        fix: 'If something sounds urgent, call Arjun.',
        explanation: '"Everyone just does it" is two owners and no decider, all over again.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"That\'s a gap, not you."', 'Owning the gap'],
          ['Requests come to Arjun first', 'One route to the client'],
          ['Is the countdown in the intent?', 'Commander\'s intent'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The countdown is almost finished, and it does help Diwali sales. What should Arjun do with it?',
        options: [
          { text: 'Delete it to make a point', why: 'Wastes three days of good work.' },
          { text: 'Check it against the intent and guardrails; if it fits, put it on the list after the shipping page' },
          { text: 'Ship it now, before the shipping page', why: 'The shipping page is due Thursday and it\'s in scope.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2, in one line.',
        template: 'One [[1]] per piece, one route for requests, and everyone knows who [[2]].',
        blanks: [['owner'], ['decides']],
        distractors: ['meeting', 'shouts'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s first line to Mr Rao.',
        tiles: ['Could', 'all', 'requests', 'come', 'to', 'me', 'first?'],
        distractors: ['Kavya'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had work arrive through a back channel, from someone who wasn\'t supposed to assign it? What happened to your real priorities?',
    starters: ['The request came from...', 'My real priority was...'],
  },
  deepen: {
    title: 'Next: Day 12',
    summary: 'The back channel is closed. The team knows who owns what. Then Joel sends a pull request labelled "ready for review", and Arjun finds it has no tests, no Hindi and no error messages. Joel thinks it\'s great. Chapter 3: What good looks like.',
  },
  notes: 'Chapter 2 challenge. Single point of contact with clients, intake of new requests, intent and scope decisions. Rohit is a narrated named extra (Mr Rao\'s nephew). Fictional events.',
};

export default lesson;

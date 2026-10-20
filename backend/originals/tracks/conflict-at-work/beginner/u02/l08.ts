import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Explain cards: calming a group or a call. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Calming a group or a call',
  summary: 'One-to-one is hard. A meeting where three people are heated, or a video call where nobody can read the room, is harder. Priya shares how she calms groups and calls.',
  minutes: 12,
  outcomes: [
    'De-escalate a heated meeting',
    'Calm a video call or chat thread',
    'Move a heated discussion to a better place',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Priya\'s rules for groups and calls:</p><table><tr><th>Situation</th><th>What helps</th></tr><tr><td>Meeting heating up</td><td>Name it neutrally: "I think we\'re all frustrated. Let\'s take one point at a time." Then give each person a turn.</td></tr><tr><td>Two people arguing in front of others</td><td>"This sounds important. Can you two take 20 minutes after this and bring back a proposal?"</td></tr><tr><td>Video call</td><td>Faces are small and delays cause interruptions. Use a hand-raise, ask the quiet ones directly, and summarise more often.</td></tr><tr><td>Heated chat thread</td><td>Move it: "Let\'s jump on a 10-minute call." Text strips tone and fuels misreading (Chapter 3).</td></tr><tr><td>After any heated group moment</td><td>A short private check-in with each person: "That got intense. Are you OK?"</td></tr></table><p>The same principle as one-to-one: slow down, acknowledge, separate the issue from the people, then move to the problem.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In groups: name it neutrally, one point at a time. On chat: move to a call. Afterwards: a private check-in.',
    },
  ],
  apply: {
    scenario: 'Groups and calls.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to what helps.',
        pairs: [
          ['Meeting heating up', 'One point at a time, turns for each'],
          ['Two people arguing in public', 'Take it offline, bring back a proposal'],
          ['Video call', 'Hand-raise and summaries'],
          ['Heated chat thread', 'Move to a short call'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why move a heated chat thread to a call?',
        options: [
          { text: 'Text strips tone, so people misread each other more' },
          { text: 'Calls are always better', why: 'For heated topics, yes; for routine ones, not always.' },
          { text: 'To hide the evidence', why: 'It\'s about tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Calms the group, or heats it up?',
        groups: ['Calms', 'Heats up'],
        items: [
          { text: '"Let\'s take one point at a time."', group: 0 },
          { text: 'Letting the loudest person talk the longest', group: 1 },
          { text: 'Asking the quiet person directly', group: 0 },
          { text: 'Replying to the thread in capitals', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(on a Kinwell call, frustrated) The API changes again? That\'s the third time!',
        prompt: "Priya's best reply?",
        options: [
          { text: '"Fair point, Arjun, that\'s frustrating. Let\'s list what changed and why, one at a time."' },
          { text: '"Let\'s not get emotional."', why: 'That dismisses him.' },
          { text: '"Moving on."', why: 'That ignores a real issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'In a heated meeting.',
        template: 'Name it [[1]]. One [[2]] at a time.',
        blanks: [['neutrally'], ['point', 'issue']],
        distractors: ['loudly', 'person'],
      },
      {
        kind: 'mcq',
        prompt: 'Why check in privately after a heated group moment?',
        options: [
          { text: 'People may be upset but won\'t say so in front of others' },
          { text: 'To gossip', why: 'It\'s a care check.' },
          { text: 'It\'s not needed', why: 'Feelings often linger after.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Priya suggests moving a heated thread to a call of how many minutes?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this meeting plan heats things up?',
        lines: [
          'Name the frustration neutrally.',
          'Take one point at a time.',
          'Let Femi and Arjun fight it out in front of everyone.',
          'Check in with each person afterwards.',
        ],
        bug: 2,
        fix: 'Ask them to take 20 minutes after and bring a proposal.',
        explanation: 'A public fight raises the temperature for all.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good for video calls, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'A hand-raise', group: 0 },
          { text: 'Everyone talking at once', group: 1 },
          { text: 'Summarising every few minutes', group: 0 },
          { text: 'Cameras off during a tense topic', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to calm a heated meeting.',
        lines: ['Name it neutrally', 'One point at a time', 'Give each person a turn', 'Agree a next step', 'Check in privately after'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a heated meeting or chat you were in. Which of Priya\'s rules would have helped most?',
    starters: ['In that meeting...', 'It would have helped to...'],
  },
  deepen: {
    title: 'Meeting norms',
    summary: 'Teams that agree simple norms in advance (one speaker at a time, disagree with ideas not people, move heated threads to calls) have fewer meetings that boil over.',
  },
  notes: 'Group and remote de-escalation practices are a teaching synthesis. Text and tone: Kruger et al. (2005), JPSP 89(6), covered in Chapter 3.',
};

export default lesson;

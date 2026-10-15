import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: walking into a room — the pause, the scan, and where to start. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Walking into a room',
  summary: 'Femi has been to a hundred events. Grace asks him what he does in the first sixty seconds. His answer is so simple it\'s almost annoying.',
  minutes: 12,
  outcomes: [
    'Use the first sixty seconds of an event well',
    'Spot open groups, closed groups and easy starting points',
    'Have a "home base" to go back to',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Femi\'s first sixty seconds',
      steps: [
        {
          title: 'Pause at the door',
          body: '"I stop for three seconds inside the door. Breathe. Look. Most people rush in and grab their phone. Three seconds makes you look calm, even if you\'re not."',
        },
        {
          title: 'Scan for easy starts',
          body: '"I look for three things: people on their own, the drinks or food queue, and groups standing in an open shape. Those are my doors."',
        },
        {
          title: 'Open groups vs closed groups',
          body: 'A group standing in a tight circle, shoulders touching, is closed: deep in conversation. A group in a loose horseshoe, with a gap, is open: there\'s literally room for you. Two people standing side by side, facing the room, are often waiting to be joined.',
        },
        {
          title: 'Use the queue',
          body: '"Queues are the easiest small talk in the world. Everyone\'s bored, everyone\'s waiting, nobody can leave. \'What are you having?\' and you\'re away."',
        },
        {
          title: 'Have a home base',
          body: '"Pick a spot to come back to between conversations: near the drinks, a high table, the coat rack. It\'s fine to be there alone for a minute. Then go again."',
        },
        {
          title: 'Set a small goal',
          body: '"Not \'network\'. Something small: three conversations, or one person I\'d want to see again. When I hit it, I can go home happy."',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Pause, scan, start easy (someone alone, a queue, an open group), have a home base, set a small goal.',
    },
  ],
  apply: {
    scenario: 'Femi\'s event masterclass.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Femi\'s first minute in order.',
        lines: ['Pause at the door for three seconds', 'Scan for easy starts', 'Pick your first person or group', 'Go back to your home base between chats'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Open group, or closed group?',
        groups: ['Open', 'Closed'],
        items: [
          { text: 'A loose horseshoe with a gap', group: 0 },
          { text: 'A tight circle, shoulders touching', group: 1 },
          { text: 'Two people side by side, facing the room', group: 0 },
          { text: 'Two people facing each other, talking quietly', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why are queues easy places for small talk?',
        options: [
          { text: 'Everyone is waiting and bored, with a shared topic right there' },
          { text: 'People in queues are friendlier', why: 'Not necessarily. They\'re just available.' },
          { text: 'Nobody else can hear you', why: 'Not the reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'What\'s your goal for the next meetup? And don\'t say "network".',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'Talk to everyone in the room.', why: 'Too big. Pick something small.' },
          { text: 'Survive.', why: 'Honest, but give yourself something to aim for.' },
          { text: 'Three real conversations, and one person I\'d like to see again.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A spot to return to between conversations is your home ... (one word)',
        answers: ['base'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why pause for three seconds at the door?',
        options: [
          { text: 'To wait to be announced', why: 'Nobody is announcing you.' },
          { text: 'To find your phone', why: 'The opposite of the plan.' },
          { text: 'You look calm, and you can see where the easy starts are' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s plan for the door. Which line undoes the others?',
        lines: [
          'Pause and breathe for three seconds.',
          'Immediately take out my phone and look busy.',
          'Look for someone on their own or an open group.',
        ],
        bug: 1,
        fix: 'Keep my phone in my bag for the first ten minutes.',
        explanation: 'A phone tells everyone "don\'t talk to me", including the people who want to.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Someone on their own', 'The easiest start at an event'],
          ['First time at one of these?', 'Honest event opener'],
          ['Arrive early', 'Priya\'s introvert strategy'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Femi\'s queue opener.',
        template: 'What are you [[1]]? Is the [[2]] here any good?',
        blanks: [['having', 'getting'], ['food', 'wine', 'coffee']],
        distractors: ['earning', 'phone'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s small goal.',
        tiles: ['Three', 'conversations,', 'then', 'home.'],
        distractors: ['everyone', 'network'],
      },
    ],
  },
  reflect: {
    prompt: 'Picture the next event you\'ll go to. Where will your home base be, and what\'s your small goal?',
    starters: ['The event is...', 'My home base: ...', 'My goal: ...'],
  },
  deepen: {
    title: 'Watch the shapes',
    summary: 'At your next gathering, just watch for two minutes: which groups are open, which are closed, who\'s alone? You\'ll start seeing doors everywhere.',
  },
  notes: 'Open vs closed group formations reflect research on conversational group arrangements (Kendon\'s F-formations) — presented in plain terms. Other tips are practical advice.',
};

export default lesson;

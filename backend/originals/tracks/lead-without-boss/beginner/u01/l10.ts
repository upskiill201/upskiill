import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Chapter Challenge: the kick-off that only two people come to. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the empty room',
  summary: 'Week 2, Monday, 10:00. The kick-off. Remi has the room, the coffee and a one-page map. At 10:05, there\'s Zanele and Njeri. Felix declined. Wanjiku is "running late". Emeka\'s video square is black. Pauline hasn\'t replied.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one live moment',
    'Turn a disappointing start into progress',
    'Keep going without blaming anyone',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Monday, 10:05 a.m.',
      beats: [
        { speaker: 'zanele', text: '(whispering) Should we cancel?' },
        { speaker: 'njeri', text: 'I came up three floors for this. I\'m not going back down without telling my story.' },
        { speaker: 'narrator', text: 'Remi looks at the empty chairs. Part of him wants to email the no-shows: "Brian said this was important." Part of him wants to go home. Emeka\'s square flickers: "Sorry, can you hear me? I was on mute."' },
        { speaker: 'narrator', text: 'Three people, one video square, and four empty chairs. You\'re with Remi.' },
      ],
    },
  ],
  apply: {
    scenario: 'The meeting room, 10:05.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Remi do?',
        options: [
          { text: 'Run the meeting with who\'s here, then take the result to each person who missed it' },
          { text: 'Cancel and reschedule for everyone', why: 'Njeri came up three floors. Respect who showed up.' },
          { text: 'Email the no-shows: "Brian expects you here."', why: 'The sponsor-as-stick move.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool?',
        groups: ['Coalition', 'Listening tour', 'Credibility'],
        items: [
          { text: 'Letting Njeri tell her story', group: 0 },
          { text: 'Going to Felix\'s desk afterwards', group: 1 },
          { text: 'Sending the notes when promised', group: 2 },
          { text: 'Thanking Zanele and Emeka for coming', group: 0 },
          { text: 'Asking Wanjiku what she needs', group: 1 },
          { text: '"I\'ll have a plan to you by Wednesday."', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Sorry, can you hear me? I was on mute. Is it just us?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Yes, everyone else ignored it.', why: 'Blaming the absent, in front of the present.' },
          { text: 'We\'re cancelling, sorry.', why: 'Wastes the people who came.' },
          { text: 'It\'s us, and that\'s plenty to start. Njeri\'s about to tell the signature story. Then I want your reference-number one.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Using the boss\'s name to force attendance treats your sponsor as a ___. (one word)',
        answers: ['stick', 'Stick', 'weapon'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s next 48 hours in order.',
        lines: ['Run the meeting with who\'s here', 'Send short notes the same day', 'Visit each no-show at their desk', 'Bring everyone to one next step'],
      },
      {
        kind: 'mcq',
        prompt: 'Felix declined. What\'s the best way to read it?',
        options: [
          { text: 'He\'s against the project', why: 'You don\'t know that yet.' },
          { text: 'He doesn\'t like Remi', why: 'Assume busy before hostile.' },
          { text: 'He\'s busy and hasn\'t seen why it\'s worth it yet. Go to him' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s notes to everyone. Which line breaks Chapter 1?',
        lines: [
          'Thanks to Njeri, Emeka and Zanele for this morning.',
          'Disappointing that most of you couldn\'t make it.',
          'Three delays found. I\'ll come and see each of you this week.',
        ],
        bug: 1,
        fix: 'Short notes below, so you\'re up to date.',
        explanation: 'Guilt-tripping people who don\'t report to you makes them avoid you.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the absent person to Remi\'s follow-up.',
        pairs: [
          ['Felix', '10 minutes at his desk'],
          ['Wanjiku', 'Ask what she needs from it'],
          ['Pauline', 'A short note and a coffee'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did the small meeting achieve?',
        options: [
          { text: 'Nothing, because only two came', why: 'Two committed allies is a real start.' },
          { text: 'Njeri and Emeka became allies, and two of the three delays are now owned' },
          { text: 'It proved nobody cares', why: 'Two people very clearly cared.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1, in one line.',
        template: 'No [[1]]? Earn [[2]], listen first, and build a small [[3]].',
        blanks: [['title'], ['credibility', 'trust'], ['coalition']],
        distractors: ['army', 'stick'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s opening line.',
        tiles: ['It\'s', 'us,', 'and', 'that\'s', 'plenty.'],
        distractors: ['cancel'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever organised something and fewer people came than you hoped? What did you do? What would you do now?',
    starters: ['When fewer came, I...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Next: Week 2',
    summary: 'Remi visits Wanjiku with the notes. She reads them, takes off her glasses and says: "No. I can\'t approve refunds faster. If audit finds one mistake, it\'s my name." Chapter 2: What\'s in it for them?',
  },
  notes: 'Chapter 1 challenge. Small-coalition starts (Kotter), follow-up visits (listening tour), avoiding guilt and borrowed authority. Fictional events.',
};

export default lesson;

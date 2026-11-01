import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Story with a choice: the five minutes before the meeting starts. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The five minutes before the meeting',
  summary: 'Tuesday, 9:57. Six people in a meeting room, waiting for Priya. Everyone is staring at their laptop. The silence is so loud Grace can hear the projector hum.',
  minutes: 12,
  outcomes: [
    'Use the minutes before a meeting to connect',
    'Start a group chat without putting anyone on the spot',
    'Stop when the meeting starts',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 9:57 a.m., meeting room 3',
      beats: [
        { speaker: 'narrator', text: 'Six people. One empty chair at the head of the table: Priya is running late. Everyone stares at a laptop. Nobody is actually doing anything on their laptop.' },
        { speaker: 'grace', text: '(On the ward, the five minutes before handover were when you found out who was exhausted, who had a sick kid, who needed a hand. Here, everyone just... waits.)' },
        { speaker: 'tey', text: "Pre-meeting minutes are some of the best small-talk moments at work. Everyone is waiting, nobody is busy, and the topic is right there: the meeting, the week, the room. What should Grace do?" },
      ],
      choice: {
        prompt: 'The silence continues. Grace\'s move?',
        options: [
          {
            text: 'Say to the room: "Is it just me, or is this room always freezing? I\'m going to start bringing a blanket."',
            outcome: 'Laughter. Leo: "There\'s a secret thermostat behind the plant." Aisha: "Since when?" Four minutes of chat about the building. When Priya arrives, the room is warm in both senses.',
            best: true,
          },
          {
            text: 'Pick one person and ask them a personal question in front of everyone: "Leo, how\'s your love life?"',
            outcome: 'Leo turns the colour of a tomato. The silence returns, heavier.',
          },
          {
            text: 'Stare at her laptop like everyone else.',
            outcome: 'Safe. Silent. Priya arrives to six people pretending to read emails.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Pre-meeting small talk works best when it's about something everyone shares:</strong></p><ul><li>The room: \"Is it always this cold in here?\"</li><li>The week: \"Is anyone else's Tuesday feeling like a Thursday?\"</li><li>The meeting itself, lightly: \"Has anyone seen the new designs yet? I've heard they're good.\"</li><li>Something seasonal: a match, a holiday coming up, the weather.</li></ul><p>Avoid putting one person on the spot with a personal question in front of everyone. And when the meeting starts, stop. Small talk is the warm-up, not the meeting.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Group small talk: talk to the room, about something everyone shares. Let anyone join in.',
    },
  ],
  apply: {
    scenario: 'Tuesday, 9:57. Meeting room 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "Is this room always freezing?" a good pre-meeting opener?',
        options: [
          { text: 'It complains, and complaining is bonding', why: 'Light shared moments help; constant complaining doesn\'t.' },
          { text: 'Everyone shares the room, so anyone can join in' },
          { text: 'It gets the heating fixed', why: 'A bonus. Not the point.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good to say to the room, or not?',
        groups: ['Good for the room', 'Puts someone on the spot'],
        items: [
          { text: 'Has anyone seen the new designs yet?', group: 0 },
          { text: 'Leo, how\'s your love life?', group: 1 },
          { text: 'Is anyone else\'s Tuesday feeling like a Thursday?', group: 0 },
          { text: 'Aisha, why were you late yesterday?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '(in the room) Anyone watch the match last night?',
        prompt: 'Grace didn\'t watch it. Best way to join in?',
        options: [
          { text: 'I didn\'t, but from the noise on my street I\'m guessing someone scored. Good game?' },
          { text: 'I don\'t watch football.', why: 'Honest, but it closes the door.' },
          { text: 'Say nothing', why: 'You can join in without knowing the match.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Pre-meeting small talk is the warm-___, not the meeting. (one word)',
        answers: ['up'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Priya walks in and says, "Right, let\'s start." What does Grace do?',
        options: [
          { text: 'Finish her story about the thermostat', why: 'The meeting has started. Stop.' },
          { text: 'Ask Priya how her weekend was', why: 'Not now. She\'s starting.' },
          { text: 'Stop, and turn to the meeting' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s pre-meeting line. Which one puts someone on the spot?',
        lines: [
          'This room is like a fridge.',
          'Tomasz, you look terrible today, are you ill?',
          'Has anyone got holidays coming up?',
        ],
        bug: 1,
        fix: 'Tomasz, how was the Polish cooking at the weekend?',
        explanation: 'Commenting on how someone looks, in front of everyone, is the opposite of warm.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the shared topic to an opener.',
        pairs: [
          ['The room', '"Is it always this cold in here?"'],
          ['The week', '"Is today feeling like a Thursday?"'],
          ['The meeting', '"Has anyone seen the new designs?"'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Fine, thanks', 'The dead end'],
          ['Callback', 'Remembering something they said'],
          ['Count to two', 'What to do in a pause'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s room opener.',
        template: 'Is it just me, or is this room always [[1]]? I\'m going to start bringing a [[2]].',
        blanks: [['freezing', 'cold'], ['blanket']],
        distractors: ['love', 'terrible'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a shared opener for the room.',
        tiles: ['Has', 'anyone', 'seen', 'the', 'new', 'designs', 'yet?'],
        distractors: ['Leo,', 'love'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a meeting, class or event you go to regularly. What could you say to the room in the five minutes before it starts?',
    starters: ['Before ..., I could say...'],
  },
  deepen: {
    title: 'Arrive two minutes early',
    summary: 'For your next few meetings, arrive two minutes early and say one thing to the room. It\'s the easiest small talk of the day: everyone is there and nobody is busy.',
  },
  notes: 'Pre-meeting talk as relationship-building is widely discussed in workplace research on meeting "pre-meeting talk"; lesson keeps advice practical.',
};

export default lesson;

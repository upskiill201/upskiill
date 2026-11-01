import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Unit Challenge, "The Call Back": Clinton's 60-second class-rep speech. Cliffhanger into Chapter 2 (Arjun). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The Call Back: the 60-second speech',
  summary: 'One week later. Clinton calls back, whispering: he\'s backstage. Five candidates for first-year class rep, 200 students in the hall, 60 seconds each. The last speaker talked for four minutes and lost the room. Clinton is next.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one live moment',
    'Plan a 60-second message with one point and the listeners\' reason',
    'Finish strong and stop',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, the Call Back',
      beats: [
        { speaker: 'tey', text: "Tey FM, back on Line 1, a special call back. Clinton, where are you? You're whispering." },
        { speaker: 'clinton', text: '(whispering) Backstage. I\'m running for first-year class rep. Two hundred people. Sixty seconds each. The guy before me just talked for four minutes about his "vision". Half the hall is on their phones.' },
        { speaker: 'clinton', text: 'Also, update: the study session? Twenty-two people came. TWENTY-TWO. Brenda brought snacks. Nobody\'s muted me since.' },
        { speaker: 'tey', text: "Ignore-o-Meter reading: dropping fast! Okay, producer. Sixty seconds. Everything from this week. Let's coach him onto that stage." },
      ],
    },
  ],
  apply: {
    scenario: 'The Call Back. Clinton is backstage.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Step one, backstage: what\'s Clinton\'s one point?',
        options: [
          { text: 'Vote for me, and I\'ll make sure every student\'s problem actually gets heard' },
          { text: 'A list of fifteen promises', why: 'Fifteen points, zero remembered.' },
          { text: 'His life story', why: 'Sixty seconds, remember.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why should the students care?',
        options: [
          { text: 'Clinton really wants to win', why: 'His reason, not theirs.' },
          { text: 'Their problems (timetables, exam clashes, Wi-Fi) get fixed' },
          { text: 'He\'s the funniest candidate', why: 'Nice, but not their reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s 60 seconds in order.',
        lines: ['A strong first line: "Who here has been muted in a group chat?"', 'The point: "I want to be the rep who listens."', 'Proof: "Last week, 22 of you came to a study session because I asked what you needed."', 'One promise: a monthly "what\'s broken?" poll, and I\'ll report back.', 'Stop: "Vote Clinton. Thank you."'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '(whispering) Should I start with "Okay so, hi guys, it\'s me, so basically..."?',
        prompt: 'Producer, quick!',
        options: [
          { text: 'Yes, ease into it.', why: 'The hall is already on their phones.' },
          { text: 'Start with your playlist.', why: 'Never the playlist.' },
          { text: 'No warm-up! Start with the question: "Who here has been muted in a group chat?"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep in the speech, or cut?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'The study-session proof: 22 people came', group: 0 },
          { text: 'Fifteen policy ideas', group: 1 },
          { text: 'One clear promise: the monthly poll', group: 0 },
          { text: '"So yeah, anyway, like I said..."', group: 1 },
          { text: 'A story about the lecturer\'s weird slides', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After "Vote Clinton. Thank you." what does Clinton do? (one word)',
        answers: ['stop', 'stops', 'pause'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why open with "Who here has been muted in a group chat?"',
        options: [
          { text: 'It\'s relevant to everyone, gets a laugh, and grabs attention in the first seconds' },
          { text: 'To embarrass people', why: 'It\'s a shared joke, not a dig.' },
          { text: 'It\'s a rule of speeches', why: 'Not a rule. It just works here.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s speech draft. Which line breaks a Chapter 1 rule?',
        lines: [
          'I want to be the rep who listens.',
          '22 of you came on Sunday because I asked what you needed.',
          'Also here are my other 14 ideas, quickly, number one, number two...',
          'Vote Clinton. Thank you.',
        ],
        bug: 2,
        fix: 'One promise: a monthly "what\'s broken?" poll.',
        explanation: 'Fourteen ideas in 60 seconds means none of them land. One point, one promise.',
      },
      {
        kind: 'mcq',
        prompt: 'The hall goes quiet after his first line. Clinton panics and wants to fill the silence. What should he do?',
        options: [
          { text: 'Talk faster to fill it', why: 'The silence means they\'re listening.' },
          { text: 'Pause for a moment and let it land, then continue' },
          { text: 'Ask if they can hear him', why: 'They can. They\'re listening.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 1 tool.',
        pairs: [
          ['Knowing his one point', 'The Studio Whiteboard'],
          ['The study-session proof', 'Listen first, get heard second'],
          ['No warm-up', 'Point first'],
          ['"Vote Clinton. Thank you." Then silence.', 'Stop when you\'ve finished'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: '(after the speech, shouting over noise) THEY CLAPPED. Someone shouted "unmute Clinton!" I don\'t know if I won but I\'ve never been listened to like that.',
        prompt: 'Tey\'s sign-off?',
        options: [
          { text: 'Now send 60 messages to celebrate.', why: 'Relapse risk.' },
          { text: 'Okay, next caller.', why: 'Give him a moment!' },
          { text: 'That\'s the sound of being heard, Clinton. One point, their reason, and you stopped. Proud of you.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old Clinton, or new Clinton?',
        groups: ['Old Clinton', 'New Clinton'],
        items: [
          { text: 'Sixty-three messages', group: 0 },
          { text: 'One message with a question', group: 1 },
          { text: '"WHO\'S COMING"', group: 0 },
          { text: '"What topics are you stuck on?"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 in one line.',
        template: 'Listen [[1]]. One [[2]]. Their reason. Then [[3]].',
        blanks: [['first'], ['point'], ['stop']],
        distractors: ['louder', 'ten'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Clinton\'s opening line.',
        tiles: ['Who', 'here', 'has', 'been', 'muted', 'in', 'a', 'group', 'chat?'],
        distractors: ['basically'],
      },
    ],
  },
  reflect: {
    prompt: 'If you had 60 seconds to get a room to listen to you about something you care about, what would your one point, their reason and your first line be?',
    starters: ['My one point: ...', 'Their reason: ...', 'First line: ...'],
  },
  deepen: {
    title: 'Coming up next on Tey FM: Caller 2',
    summary: 'Tey: "And now, Line 2, all the way from Bengaluru. Arjun, you sound stressed." Arjun: "I warned my client about a bug. In detail. With diagrams. They launched anyway. Their shop crashed on the biggest sale of the year. I told them, Tey. I told them in paragraph four."',
  },
  notes: 'Unit Challenge: reviews Chapter 1. Class-rep election is fictional. Callback structure (opening hook, one point, proof, one promise, stop).',
};

export default lesson;

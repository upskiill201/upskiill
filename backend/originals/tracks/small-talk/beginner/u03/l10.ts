import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Unit Challenge. Kinwell's monthly social: the CEO, a new starter and a client. Cliffhanger into Chapter 4 (the meetup). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the monthly social',
  summary: 'Friday, 5 p.m. Kinwell\'s monthly social, in the office with pizza. Three people Grace must talk to: Sam the CEO, a nervous new starter, and a visiting client from a hospital trust. One hour.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every work small-talk skill in one evening',
    'Adapt to a CEO, a nervous newcomer and a client',
    'End each conversation kindly',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 5:00 p.m., Kinwell\'s kitchen',
      beats: [
        { speaker: 'narrator', text: 'Pizza boxes, a playlist Femi chose, forty people. Priya is by the window, already planning her exit. Femi is everywhere at once.' },
        { speaker: 'narrator', text: 'Three people Grace wants to talk to: Sam, the CEO; Mo, who started today and is holding a slice of pizza like a shield; and Dr Adeyemi, a consultant from a hospital that uses the Kinwell app, visiting for the evening.' },
        { speaker: 'tey', text: "A CEO, a newcomer and a client: three very different conversations. Weekends, callbacks, reading signals, watch and match, kind exits. Everything from this chapter." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. The monthly social.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Mo, the new starter, stands alone by the pizza. Best opener?',
        options: [
          { text: '"Why are you standing alone?"', why: 'Points out the awkwardness instead of easing it.' },
          { text: 'Leave him for someone else', why: 'Grace knows exactly how he feels.' },
          { text: '"Is this your first day? Mine was four weeks ago and I asked a developer about his pain levels. You\'re already doing better."' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Sam, the CEO) "Grace! How\'s week four treating you?"',
        prompt: 'Better than "Fine". Grace\'s answer?',
        options: [
          { text: 'Fine.', why: 'The dead end lives.' },
          { text: 'Really well! My first call with Arjun went brilliantly; we bonded over his guitar. Did you cycle in this week?' },
          { text: 'Can I talk to you about a pay rise?', why: 'Not at the pizza social.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which person is each line best for?',
        groups: ['Sam (CEO)', 'Mo (new starter)', 'Dr Adeyemi (client)'],
        items: [
          { text: 'What did you do before Kinwell?', group: 0 },
          { text: 'How\'s your first day been?', group: 1 },
          { text: 'How are your clinic staff finding the app?', group: 2 },
          { text: 'Want me to introduce you to a few people?', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Dr Adeyemi is a consultant. Grace was a nurse for 18 years. How should she use that?',
        options: [
          { text: 'Share it lightly as common ground: "I was a ward nurse for eighteen years, so I\'m dying to hear how clinics use the app."' },
          { text: 'Hide it; tech people don\'t want to hear about nursing', why: 'It\'s her best hook with a client from a hospital.' },
          { text: 'Ask about every patient he\'s ever had', why: 'Too much, and confidential.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remembering Sam cycles and asking about it is a ___. (one word)',
        answers: ['callback', 'call-back'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Dr Adeyemi) "We trialled your app in outpatients. Honestly? Mixed reviews."',
        prompt: 'Grace listens to understand. Best follow-up?',
        options: [
          { text: 'Oh. Anyway, lovely pizza.', why: 'He just told you something important.' },
          { text: 'I\'d love to hear that. What did the staff find hardest?' },
          { text: 'That\'s wrong, it\'s brilliant.', why: 'Defensive. Listen first.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s conversation with Mo. Which line puts him on the spot?',
        lines: [
          'How\'s your first day been?',
          'Everyone, look, it\'s the new guy! Say something funny, Mo!',
          'Want me to introduce you to Femi? He knows everyone.',
        ],
        bug: 1,
        fix: 'Come and meet a couple of people, if you like.',
        explanation: 'Pointing a nervous newcomer at the whole room is the opposite of kind.',
      },
      {
        kind: 'mcq',
        prompt: 'Priya, who hates socials, is alone by the window. What does Grace do?',
        options: [
          { text: 'Drag her into the biggest group', why: 'Not Priya\'s way.' },
          { text: 'Leave her alone completely', why: 'A quiet chat is very Priya.' },
          { text: 'Bring her a slice of pizza and have one real, quiet conversation' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Grace! Come here, I have to tell you the whole goat story NOW.',
        prompt: 'Grace is mid-conversation with Dr Adeyemi, the client. Kind exit for Femi?',
        options: [
          { text: 'One minute! I\'m with Dr Adeyemi. Save me the goat for Monday?' },
          { text: 'Not now, Femi!', why: 'A bit sharp, in front of a client.' },
          { text: 'Abandon the client for the goat', why: 'The goat can wait.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the chapter skill.',
        pairs: [
          ['Answering Sam with a detail', 'Beyond "Fine"'],
          ['Sharing nursing with the client', 'Your world, lightly'],
          ['A quiet chat with Priya', 'Introvert-friendly'],
          ['"Save me the goat for Monday?"', 'Kind exit with a later time'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Sam glances at his watch and the door. What does Grace say?',
        options: [
          { text: 'Keep telling him about her week', why: 'His signals say he needs to go.' },
          { text: '"I\'ll let you go. Have a great weekend, and enjoy the ride home!"' },
          { text: '"Are you leaving already?"', why: 'Makes it awkward to go.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter lesson is it from?',
        groups: ['Weekend answers', 'Senior people', 'Kind exits'],
        items: [
          { text: 'A word, a detail, a question', group: 0 },
          { text: 'Curiosity, not flattery', group: 1 },
          { text: 'Warm words, a reason, a later time', group: 2 },
          { text: 'Let them go when they need to', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s chapter in one line.',
        template: 'Better than "[[1]]". Curious, not [[2]]. Kind exits with a later [[3]].',
        blanks: [['Fine'], ['flattering'], ['time']],
        distractors: ['Hello', 'early'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s welcome to Mo.',
        tiles: ['Come', 'and', 'meet', 'a', 'couple', 'of', 'people?'],
        distractors: ['everyone', 'funny'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of your next work or school social. Who are three different people you\'d like to talk to, and what would you say to each?',
    starters: ['1. ... I\'d say...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'Coming up in Chapter 4: a room full of strangers',
    summary: 'Dr Adeyemi mentions a health-tech meetup next Thursday: "Seventy people, all strangers. You should come." Grace says yes. On Thursday, she spends the first hour by the snack table, and talks to exactly one man, about the snacks.',
  },
  notes: 'Unit Challenge: reviews Chapter 3 plus earlier. Mo (new starter) and Dr Adeyemi (client consultant) are named extras; their lines arrive via Grace\'s messages.',
};

export default lesson;

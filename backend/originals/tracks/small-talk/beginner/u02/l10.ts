import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10 — Unit Challenge. The team lunch: keeping a table of six talking, including Priya. Cliffhanger into Chapter 3. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the team lunch',
  summary: 'Friday, 1:00. Priya takes the UX team out for lunch: six people, one round table, and Priya, who hates small talk, sitting right next to Grace. Keep it going.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Keep a group conversation flowing with follow-ups, hooks and sharing',
    'Listen to understand, handle pauses and steer away from tricky topics',
    'Include the quietest person at the table',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 1:00 p.m., a Lebanese place on Oxford Road',
      beats: [
        { speaker: 'narrator', text: 'Six of them round a table: Priya, Grace, Aisha, Tomasz, a designer called Leo, and Femi, who invited himself.' },
        { speaker: 'priya', text: 'Order whatever you like. Kinwell is paying. I am not giving a speech.' },
        { speaker: 'narrator', text: 'The food arrives. Then the silence arrives. Six people look at their hummus.' },
        { speaker: 'tey', text: "Everything from this chapter, at one table. Ask, listen, share. Catch the hooks. Count to two. Steer kindly. And look after the person who's struggling most. Ready?" },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. Six people, one round table.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The silence has lasted two seconds. Best way to start?',
        options: [
          { text: '"Priya, how did you find this place? It\'s amazing."' },
          { text: '"So. Who\'s voting for who?"', why: 'Not at a team lunch.' },
          { text: 'Stare at the hummus with everyone else', why: 'Someone has to throw the ball.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'I used to come here when I was a student. My grandmother\'s cooking was similar, so it felt like home.',
        prompt: 'Two hooks. Best follow-up?',
        options: [
          { text: 'Cool. Anyway, Leo, what\'s your favourite film?', why: 'Priya just shared something personal. Don\'t switch away.' },
          { text: 'That\'s lovely. What did your grandmother make that you miss most?' },
          { text: 'Okay.', why: 'Dropped.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which move is it?',
        groups: ['Follow-up', 'Share', 'Steer'],
        items: [
          { text: 'What was her best dish?', group: 0 },
          { text: 'My nan made a terrible Sunday roast. We loved it.', group: 1 },
          { text: 'Ha, let\'s not talk salaries! Who\'s got holidays coming up?', group: 2 },
          { text: 'Did you study in Manchester?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Leo hasn\'t said a word in ten minutes. How does Grace include him?',
        options: [
          { text: '"Leo, you\'re very quiet. Are you okay?"', why: 'Pointing at someone\'s quietness can embarrass them.' },
          { text: 'Ignore him; he likes being quiet', why: 'Maybe, but a gentle invitation is kind.' },
          { text: '"Leo, you\'re a designer. Did you do the drawings on the office wall? They\'re great."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Short pause at the table? Count to ... (a number)',
        answers: ['two', '2'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'So Tomasz, what do you earn in Finance? Must be loads.',
        prompt: 'Grace steers kindly. What does she say?',
        options: [
          { text: 'Ha, Finance keeps that a secret, Femi. Tomasz, did you ever learn to cook Polish food like you said?' },
          { text: 'Femi! That\'s so rude!', why: 'A lecture in front of everyone.' },
          { text: 'Yes Tomasz, tell us.', why: 'Joining in makes it worse for Tomasz.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s turn at the table. Which line turns her into the lecture?',
        lines: [
          'Aisha, you said your pottery was a disaster. Has it improved?',
          'Ha, my son says I\'m embarrassing at parties.',
          'Let me tell you everything about wound care for twenty minutes.',
        ],
        bug: 2,
        fix: 'Has anyone been to the new gallery on the corner?',
        explanation: 'A long monologue stops the table talking. Share a little, then throw the ball.',
      },
      {
        kind: 'mcq',
        prompt: 'Aisha mentions her mum\'s new job made her nervous. Grace reflects back. Which one?',
        options: [
          { text: '"Great!"', why: 'Not listening.' },
          { text: '"So she\'s nervous about starting somewhere new?"' },
          { text: '"My mum never worked."', why: 'A switch.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the tool from this chapter.',
        pairs: [
          ['Priya\'s grandmother', 'Catching a hook'],
          ['Femi asking about salary', 'Steering kindly'],
          ['Leo\'s drawings', 'Including the quiet person'],
          ['Aisha\'s mum', 'Reflecting back'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Grace is asked, "So why did you leave nursing?" Best answer, using "answer, add, ask"?',
        options: [
          { text: '"Long story." (silence)', why: 'Closes the door.' },
          { text: 'A forty-minute history of the NHS', why: 'Answer briefly, then throw the ball.' },
          { text: '"Eighteen years of night shifts! I wanted to fix the systems, not just the patients. Did any of you switch careers?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: '(walking back) That was the first team lunch I\'ve actually enjoyed. You asked about my grandmother. Nobody does that.',
        prompt: 'Grace\'s reply?',
        options: [
          { text: 'You told the best story at the table. Thank you for lunch.' },
          { text: 'I know, I\'m amazing.', why: 'A joke that might not land. Keep the warmth on Priya.' },
          { text: 'Okay.', why: 'She just said something kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which chapter skill is it?',
        groups: ['Ask', 'Listen', 'Share'],
        items: [
          { text: 'A follow-up question', group: 0 },
          { text: 'Reflecting back', group: 1 },
          { text: 'Answer, add, ask', group: 2 },
          { text: 'Catching a hook', group: 1 },
          { text: 'FORD when your mind goes blank', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s chapter in one line.',
        template: 'Follow [[1]] before you switch. Catch the [[2]]. Answer, add, [[3]].',
        blanks: [['up'], ['hooks'], ['ask']],
        distractors: ['down', 'lecture'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s follow-up to Priya.',
        tiles: ['What', 'did', 'your', 'grandmother', 'make', 'that', 'you', 'miss?'],
        distractors: ['Anyway', 'Okay.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a group you\'re part of (team, class, family). Who\'s usually quietest? Write one question you could ask that would include them.',
    starters: ['The quietest person is...', 'I could ask...'],
  },
  deepen: {
    title: 'Coming up in Chapter 3: small talk at work',
    summary: 'Monday morning, week four. Grace walks into the office and Sam the CEO says, "How was your weekend?" She says, "Fine." He waits. She waits. He leaves. Then she finds out about the five-minute silence before every meeting, and her first video call with Arjun in Bengaluru.',
  },
  notes: 'Unit Challenge: reviews Chapter 2 plus Chapter 1. Oxford Road is a real Manchester road. Leo and Tomasz are named extras.',
};

export default lesson;

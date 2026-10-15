import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Tap to explore: joining a group that's already talking. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Joining a group already talking',
  summary: 'Joining two strangers is hard. Joining four who are already laughing feels impossible. Here is exactly how Femi does it, broken into the tiny moves most people never notice.',
  minutes: 12,
  outcomes: [
    'Join an open group without interrupting',
    'Listen first, then add something to their topic',
    'Know when a group isn\'t ready for a newcomer',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Femi joins a group, slowed down',
      text: 'Femi spots a loose group of three talking about a new app. He walks up to the gap and makes eye contact with one person, who smiles. He listens for a minute, nodding. At a pause he says: "Sorry to jump in, are you talking about the triage app? I\'ve been dying to know if it works." They open the circle. He introduces himself only after he\'s added something.',
      hotspots: [
        { phrase: 'loose group', note: 'He chose an open group, not a tight circle. Half the job is picking the right group.' },
        { phrase: 'walks up to the gap', note: 'He stands at the edge, in the gap, not behind someone\'s back.' },
        { phrase: 'makes eye contact with one person', note: 'Catching one person\'s eye, with a small smile, is a quiet "may I?". Usually they smile back.' },
        { phrase: 'listens for a minute', note: 'The most skipped step. Listening first tells you the topic, so you can add to it instead of hijacking it.' },
        { phrase: 'At a pause', note: 'He waits for a natural break, never mid-story.' },
        { phrase: 'Sorry to jump in', note: 'A light, polite entry line.' },
        { phrase: 'They open the circle', note: 'The group physically shifts to make room. That\'s your sign you\'re in.' },
        { phrase: 'introduces himself only after', note: 'He joins the conversation first, then gives his name. Leading with "Hi, I\'m Femi!" mid-topic can stop the flow.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Join in five moves: pick an open group, stand in the gap, catch an eye, listen first, add to THEIR topic at a pause.',
    },
    {
      kind: 'check',
      question: 'What should you do before speaking to a group?',
      options: ['Introduce yourself loudly', 'Listen for a minute to learn the topic', 'Tell your best story'],
      answer: 1,
      explanation: 'Listening first means you can add to their conversation instead of hijacking it.',
    },
  ],
  apply: {
    scenario: 'Femi\'s group-joining lesson.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five moves in order.',
        lines: ['Pick an open group', 'Stand in the gap', 'Catch someone\'s eye', 'Listen for a minute', 'Add to their topic at a pause'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Femi listen before he speaks?',
        options: [
          { text: 'To find out their salaries', why: 'No.' },
          { text: 'So he can add to their topic instead of changing it' },
          { text: 'Because he\'s shy', why: 'Femi is many things. Not shy.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good joining move, or awkward?',
        groups: ['Good move', 'Awkward'],
        items: [
          { text: 'Standing in the gap and catching an eye', group: 0 },
          { text: 'Standing right behind someone\'s back', group: 1 },
          { text: 'Waiting for a pause', group: 0 },
          { text: 'Starting your own topic mid-story', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(A group is discussing a new triage app. There\'s a pause.)',
        prompt: 'Grace\'s entry line?',
        options: [
          { text: 'Sorry to jump in, are you talking about the triage app? I used to work in A&E, so I\'m curious.' },
          { text: 'Hi, I\'m Grace! Anyway, I was a nurse for eighteen years...', why: 'Hijacks their topic.' },
          { text: 'Can I join? (silence)', why: 'A start, but give them something to respond to.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When a group shifts to make room, they open the ___. (one word)',
        answers: ['circle'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Grace catches someone\'s eye, but they look away and the group tightens. What does it mean?',
        options: [
          { text: 'Push in anyway', why: 'They\'ve signalled "not now".' },
          { text: 'They\'re in a private moment; try another group' },
          { text: 'They hate her', why: 'It\'s about the moment, not Grace.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s joining plan. Which step is in the wrong place?',
        lines: [
          'Pick an open group.',
          'Interrupt immediately with my name and job.',
          'Listen for a minute, then add something at a pause.',
        ],
        bug: 1,
        fix: 'Stand in the gap and catch someone\'s eye.',
        explanation: 'Leading with your name mid-topic stops the flow. Join the conversation first; names come after.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Home base', 'Somewhere to return between chats'],
          ['Open group', 'Loose shape with a gap'],
          ['Closed group', 'Tight circle'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s entry line.',
        template: 'Sorry to [[1]] in, are you talking about the [[2]] app?',
        blanks: [['jump'], ['triage']],
        distractors: ['barge', 'samosa'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a light entry line.',
        tiles: ['Mind', 'if', 'I', 'join', 'you?'],
        distractors: ['Move', 'Hello!!'],
      },
    ],
  },
  reflect: {
    prompt: 'When did you last want to join a group but didn\'t? Which of the five moves would have made it easier?',
    starters: ['I wanted to join...', 'The move that would have helped is...'],
  },
  deepen: {
    title: 'Practise the eye catch',
    summary: 'At your next event or busy office kitchen, practise just one move: stand at the edge of an open group and catch one person\'s eye with a small smile. Notice how often they make room.',
  },
  notes: 'Practical group-entry advice; open/closed formations relate to F-formation research (Kendon). Leading with listening aligns with responsiveness research (Huang et al. 2017).',
};

export default lesson;

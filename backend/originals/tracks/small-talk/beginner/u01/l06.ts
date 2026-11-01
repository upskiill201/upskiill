import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Tap to explore: reading the signals — does this person want to chat right now? */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Do they want to chat?',
  summary: 'Thursday lunchtime, the Kinwell kitchen. Four colleagues, four very different signals. Before Grace says a word, she reads the room the way she once read a ward.',
  minutes: 12,
  outcomes: [
    'Read the signals that say "happy to chat" and "not now"',
    'Respect a "not now" without taking it personally',
    'Notice when a chat is going well, and when to let it go',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The kitchen, 12:40',
      text: 'By the window, Priya eats alone with headphones in, eyes on her laptop. At the table, a designer looks up, smiles and moves her bag off the chair next to her. By the kettle, Femi is turned towards Grace, making eye contact. Near the door, a developer gives one-word answers and keeps glancing at the clock.',
      hotspots: [
        { phrase: 'headphones in', note: 'Headphones, eyes on a screen: "I\'m focused right now." A nod or a smile is fine. A long chat probably isn\'t welcome at this moment.' },
        { phrase: 'smiles', note: 'A smile when you come in is an open door.' },
        { phrase: 'moves her bag off the chair', note: 'A clear invitation: there\'s room for you.' },
        { phrase: 'turned towards', note: 'Bodies point where people want to go. Someone turned towards you is open to talking.' },
        { phrase: 'eye contact', note: 'Friendly eye contact usually means "go ahead". (How much eye contact feels polite varies between cultures and people, so don\'t read too much into less of it.)' },
        { phrase: 'one-word answers', note: 'One-word replies with no question back often mean "not now". It\'s rarely about you: they may be busy, tired or worried.' },
        { phrase: 'glancing at the clock', note: 'Checking the time or the door: they need to be somewhere. Wrap up kindly.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'grace', text: 'On the wards, I could tell from the doorway if a patient wanted to talk or wanted to be left alone.' },
        { speaker: 'femi', text: 'So do that here.' },
        { speaker: 'grace', text: '...Oh. It\'s the same thing, isn\'t it.' },
        { speaker: 'tey', text: "It is. And remember: \"not now\" is not \"not ever\", and it's almost never about you. Priya might love a chat at 4 p.m. when she isn't working on a deadline." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Open signals: a smile, turning towards you, making space, asking a question back. "Not now" signals: headphones, eyes on a screen, short answers, glancing away or at the time.',
    },
  ],
  apply: {
    scenario: 'Thursday lunchtime. The Kinwell kitchen.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Open to a chat, or "not now"?',
        groups: ['Open to a chat', 'Not now'],
        items: [
          { text: 'Smiles when you walk in', group: 0 },
          { text: 'Headphones in, typing fast', group: 1 },
          { text: 'Moves a bag so you can sit', group: 0 },
          { text: 'One-word answers, eyes on the door', group: 1 },
          { text: 'Asks you a question back', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Priya has headphones in and her eyes on her laptop. What should Grace do?',
        options: [
          { text: 'Tap her shoulder and start a long chat', why: 'Her signals say she\'s focused right now.' },
          { text: 'Smile or nod, and save the chat for later' },
          { text: 'Never speak to Priya again', why: '"Not now" isn\'t "not ever".' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the signal to what it usually means.',
        pairs: [
          ['Turned towards you', 'Open to talking'],
          ['Glancing at the clock', 'Needs to go soon'],
          ['Makes space for you', 'Join me'],
          ['Eyes on a screen', 'Focused right now'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'That developer by the door gave you three one-word answers. You okay?',
        prompt: 'How should Grace read it?',
        options: [
          { text: 'He hates me.', why: 'One-word answers are rarely about you.' },
          { text: 'I\'ll keep talking until he warms up.', why: 'Pushing past "not now" makes it worse.' },
          { text: 'He was probably just busy or had somewhere to be. I\'ll try another day.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: '"Not now" is not "not ___." (one word)',
        answers: ['ever'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Someone makes less eye contact than Grace expects. What should she assume?',
        options: [
          { text: 'Not much: look at the other signals too, like a smile or a question back' },
          { text: 'They definitely don\'t like her', why: 'Eye-contact habits vary between people and cultures.' },
          { text: 'They\'re lying', why: 'A myth. Eye contact isn\'t a lie detector.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s notes on signals. Which one is a mistake?',
        lines: [
          'Bodies point where people want to go.',
          'A smile when I walk in is an open door.',
          'If someone gives short answers, ask more and more questions until they open up.',
        ],
        bug: 2,
        fix: 'If someone gives short answers, wrap up kindly and try another time.',
        explanation: 'Short answers often mean "not now". Respecting that is what makes people want to talk to you later.',
      },
      {
        kind: 'mcq',
        prompt: 'The designer moves her bag off the chair and smiles. What\'s Grace\'s move?',
        options: [
          { text: 'Sit on the floor', why: 'There\'s a chair. She cleared it for you.' },
          { text: '"Mind if I join you? I\'m Grace, I started Monday."' },
          { text: 'Ignore her and eat at her desk', why: 'That was an invitation.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s signal summary.',
        template: 'Open: a [[1]], turning towards you, making [[2]]. Not now: headphones, short [[3]], glancing at the time.',
        blanks: [['smile'], ['space', 'room'], ['answers', 'replies']],
        distractors: ['frown', 'questions'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a kind exit when someone seems busy.',
        tiles: ['I\'ll', 'let', 'you', 'get', 'on.', 'Nice', 'to', 'meet', 'you!'],
        distractors: ['hate', 'rude'],
      },
    ],
  },
  reflect: {
    prompt: 'Which signals do YOU give when you don\'t want to chat? Which do you give when you do? Would a stranger read them correctly?',
    starters: ['When I don\'t want to chat, I...', 'When I do, I...'],
  },
  deepen: {
    title: 'Read one room',
    summary: 'Next time you walk into a kitchen, waiting room or café, take three seconds to read it. Who looks open? Who looks focused? Choose the open person first.',
  },
  notes: 'Body orientation and openness cues are standard nonverbal-communication teaching; lesson hedges eye-contact norms as varying by person and culture. Not about detecting lies.',
};

export default lesson;

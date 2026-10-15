import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Card deck: openers that work anywhere — comment on the shared moment, then ask. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Openers that work anywhere',
  summary: 'Grace has been rehearsing clever first lines in the shower. Femi\'s advice: "Stop. Look around. Say what you see, then ask a question." The simplest opener in the world.',
  minutes: 12,
  outcomes: [
    'Use the "notice, then ask" opener in any setting',
    'Find openers in the place, the occasion and the person',
    'Avoid openers that put people on the spot',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Wednesday. Grace shows Femi her list of rehearsed opening lines. Number one is a fact about octopuses.</p><p>Femi reads it twice. \"Grace. Bin it. The best opener is whatever is right in front of you both. Notice something you share, say it, then ask a question.\"</p><p>That's the formula: <strong>notice + ask</strong>.</p>",
    },
    {
      kind: 'text',
      html: "<h3>1. The place</h3><p>Anything you can both see or hear.</p><ul><li>\"This kitchen has three kettles and none of them work. Is that a Kinwell tradition?\"</li><li>\"I love this view. Have you been here long enough to stop noticing it?\"</li></ul><h3>2. The occasion</h3><p>Why you're both there.</p><ul><li>\"How do you know the host?\"</li><li>\"What brought you to this event?\"</li><li>\"Is this your first time at one of these?\"</li></ul>",
    },
    {
      kind: 'text',
      html: "<h3>3. The person (carefully)</h3><p>Something they chose, not something about their body.</p><ul><li>\"That's a great tote bag. Is that from the bookshop on Oldham Street?\"</li><li>\"You sounded very calm in that meeting. How long have you been doing this?\"</li></ul><p>Comment on choices (a bag, a book, a mug, a sticker on a laptop) and on things they've done. Avoid looks, weight, age and anything personal.</p>",
    },
    {
      kind: 'check',
      question: 'Which opener follows "notice + ask"?',
      options: ['"Hi."', '"The queue\'s moving fast today. Do you always come at this time?"', '"Did you know octopuses have three hearts?"'],
      answer: 1,
      explanation: 'It notices something you share (the queue) and asks an easy question.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Open questions (how, what, why) keep a conversation going. Closed ones (yes/no) often end it. "What brought you here?" beats "Are you enjoying it?"',
    },
  ],
  apply: {
    scenario: 'Wednesday. Femi\'s opener masterclass.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Which source is each opener using?',
        groups: ['The place', 'The occasion', 'The person'],
        items: [
          { text: 'This lift is slower than my old hospital\'s.', group: 0 },
          { text: 'How do you know the organiser?', group: 1 },
          { text: 'I love your laptop stickers. Where\'s that one from?', group: 2 },
          { text: 'Is this your first Kinwell all-hands?', group: 1 },
          { text: 'Do you know what the art on that wall is?', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s Femi\'s opener formula?',
        options: [
          { text: 'Tell a joke, then a fact', why: 'Clever lines add pressure. Simple works better.' },
          { text: 'Notice something you share, then ask a question' },
          { text: 'Introduce yourself with your full CV', why: 'Too much, too soon.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Which comment about a person is safe?',
        options: [
          { text: '"You look tired."', why: 'Comments on how someone looks can sting.' },
          { text: '"Have you lost weight?"', why: 'Bodies are off-limits.' },
          { text: '"That mug is brilliant. Where did you get it?"' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Your turn. We\'re at the coffee machine. It\'s broken again. Go.',
        prompt: 'Grace\'s opener?',
        options: [
          { text: 'Broken again. Is there a secret trick, or do we all just suffer?' },
          { text: 'Did you know octopuses have three hearts?', why: 'Bin the octopus.' },
          { text: 'Is it broken?', why: 'A yes/no question about the obvious. Add a bit more.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Questions starting with how, what or why are ___ questions. (one word)',
        answers: ['open'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s list of openers for the team lunch. Which should she cross out?',
        lines: [
          'How long have you been at Kinwell?',
          'You look much older than the others. How old are you?',
          'What\'s the best thing to order here?',
        ],
        bug: 1,
        fix: 'What were you working on before Kinwell?',
        explanation: 'Age and looks are personal. Ask about choices and experiences instead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Turn each closed question into an open one.',
        pairs: [
          ['Are you enjoying it?', 'What do you think of it so far?'],
          ['Is this your first time?', 'What brought you here?'],
          ['Do you like Manchester?', 'How are you finding Manchester?'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Femi say "bin" the rehearsed lines?',
        options: [
          { text: 'Because octopuses are boring', why: 'Octopuses are fascinating. That\'s not the point.' },
          { text: 'Rehearsed lines feel forced; what\'s right in front of you feels natural' },
          { text: 'Because you should never prepare', why: 'Preparing questions is fine. Forcing a script isn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'An opener for an event.',
        template: 'This is a great [[1]]. How do you [[2]] the [[3]]?',
        blanks: [['venue', 'event', 'room'], ['know'], ['host', 'organiser', 'organizer']],
        distractors: ['octopus', 'age'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "notice + ask" opener in a queue.',
        tiles: ['This', 'queue', 'is', 'huge.', 'Is', 'the', 'food', 'worth', 'it?'],
        distractors: ['octopus', 'old'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a place you\'ll be this week: an office, a class, a bus, an event. Write one opener from the place, one from the occasion and one about a person\'s choice.',
    starters: ['Place: ...', 'Occasion: ...', 'Person: ...'],
  },
  deepen: {
    title: 'Three openers in your pocket',
    summary: 'Keep three all-purpose openers ready: "How do you know [the host]?", "What brought you here?" and "How long have you been at [place]?" They work almost anywhere.',
  },
  notes: '"Notice + ask" (observation plus open question) is common conversation-skills advice, not from a single study. Open vs closed questions: standard communication teaching. Oldham Street is a real Manchester street (Northern Quarter).',
};

export default lesson;

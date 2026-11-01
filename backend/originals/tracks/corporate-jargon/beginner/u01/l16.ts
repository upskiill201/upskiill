import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16. Story: "Literal Remi" — idioms taken literally (ducks in a row, on the radar, hit the ground running, elephant in the room...). */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Literal Remi',
  summary: 'Brian asks Remi to get his ducks in a row before the wrap-up. Remi\'s brain, which takes everything literally, goes looking for ducks. A tour of the office idioms that make no sense until you see the picture.',
  minutes: 12,
  outcomes: [
    'Decode common office idioms: ducks in a row, on the radar, hit the ground running, the elephant in the room',
    'Use the "what\'s the picture?" trick on idioms you\'ve never heard',
    'Know when an idiom might not travel to other countries',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 3:45 p.m.',
      beats: [
        { speaker: 'brian', text: 'Remi, before the wrap-up, get your ducks in a row, okay? The supplier thing is definitely on Mr Kamau\'s radar now.' },
        { speaker: 'narrator', text: 'Remi nods. Inside his head, a small row of yellow ducks is walking across his desk. Above them, a radar screen beeps. On the screen: Mr Kamau.' },
        { speaker: 'zanele', text: 'You okay? You look like you\'re watching ducks.' },
        { speaker: 'remi', text: 'I am. Several.' },
        { speaker: 'tey', text: "This is Remi's superpower and his weakness: he sees every phrase as a picture. Good news: that's exactly how to decode idioms. Let's look at his pictures." },
        { speaker: 'narrator', text: 'Ducks in a row: ducklings lined up neatly behind their mother. Meaning: get everything organised and ready.' },
        { speaker: 'narrator', text: 'On someone\'s radar: showing up on their screen. Meaning: they know about it and are paying attention.' },
        { speaker: 'brian', text: 'Oh, and well done this week. You really hit the ground running.' },
        { speaker: 'narrator', text: 'Remi pictures himself jumping out of a plane and sprinting on landing. Which, honestly, is what Monday felt like. Meaning: started fast and did well from day one.' },
      ],
    },
    {
      kind: 'text',
      html: "<p>A few more office idioms, with their pictures:</p><ul><li><strong>The elephant in the room:</strong> a huge, obvious problem that nobody is mentioning. Picture an elephant in the meeting room that everyone pretends not to see.</li><li><strong>It's not rocket science:</strong> it's not complicated.</li><li><strong>Bring to the table:</strong> the skills or ideas you can offer. \"What does Zanele bring to the table? Spreadsheets.\"</li><li><strong>Back to the drawing board:</strong> it didn't work, start again from the beginning.</li></ul>",
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Idioms often don\'t travel. A phrase everyone knows in Nairobi may confuse a colleague in Lagos, London or Bengaluru. With people from other countries, plain words are kinder.',
    },
  ],
  apply: {
    scenario: 'Friday, 3:45 p.m. An hour to the wrap-up.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Get your ducks in a row." What does Brian want?',
        options: [
          { text: 'Bring some ducks', why: 'Remi\'s literal brain says yes. The office says no. It means get organised.' },
          { text: 'Get organised and ready' },
          { text: 'Stand in a line', why: 'The picture is a neat line, but the meaning is "be organised".' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idiom to its picture.',
        pairs: [
          ['Ducks in a row', 'Ducklings lined up neatly'],
          ['On the radar', 'A dot on a screen'],
          ['Hit the ground running', 'Sprinting the moment you land'],
          ['The elephant in the room', 'A huge thing everyone ignores'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Now match each idiom to its meaning.',
        pairs: [
          ['Ducks in a row', 'Organised and ready'],
          ['On the radar', 'Being noticed'],
          ['Hit the ground running', 'Started fast from day one'],
          ['Back to the drawing board', 'Start again'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can we talk about the elephant in the room? I cancelled Swift Freight\'s contract by email and nobody has said anything.',
        prompt: 'What is Zanele doing?',
        options: [
          { text: 'Talking about an actual animal', why: 'No elephants at Synergix. Yet.' },
          { text: 'Raising the big obvious problem that nobody is mentioning' },
          { text: 'Changing the subject', why: 'The opposite: she\'s naming the problem everyone is avoiding.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: '"It\'s not rocket ___" means "it\'s not complicated". (one word)',
        answers: ['science'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good news or bad news?',
        groups: ['Good news', 'Bad news'],
        items: [
          { text: 'You hit the ground running', group: 0 },
          { text: 'Back to the drawing board', group: 1 },
          { text: 'Your ducks are in a row', group: 0 },
          { text: 'There\'s an elephant in the room', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi explains idioms to Ada. Which line is wrong?',
        lines: [
          'On his radar: he knows about it.',
          'Not rocket science: very difficult and technical.',
          'Bring to the table: what you can offer.',
        ],
        bug: 1,
        fix: 'Not rocket science: not complicated at all.',
        explanation: 'The phrase says it is NOT rocket science, so it\'s simple.',
      },
      {
        kind: 'mcq',
        prompt: 'Remi is writing to a supplier in Brazil who learned English as a second language. Which sentence is best?',
        options: [
          { text: 'Please send the corrected invoices by Wednesday.' },
          { text: 'Let\'s get our ducks in a row on the invoices.', why: 'An idiom that may not travel. Plain words are clearer across countries.' },
          { text: 'This is on our radar, so hit the ground running.', why: 'Two idioms, zero clear instructions.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Brian\'s praise, translated.',
        template: '"You hit the ground running" = "You started [[1]] and did [[2]] from day one."',
        blanks: [['fast', 'quickly'], ['well']],
        distractors: ['slowly', 'badly'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Brian says, "Remi brings fresh eyes to the table." Build what he means.',
        tiles: ['Remi', 'offers', 'a', 'new', 'way', 'of', 'seeing', 'things.'],
        distractors: ['furniture', 'ducks'],
      },
    ],
  },
  reflect: {
    prompt: 'What idioms do people use where you work, study or live? Pick one and describe its picture, then its meaning.',
    starters: ['The idiom is...', 'The picture is...', 'It means...'],
  },
  deepen: {
    title: 'Idioms from home',
    summary: 'Every language has its own office idioms. Ask a colleague, friend or family member for one from their language, and add it to your notebook with its picture and meaning.',
  },
  notes: 'Meanings (Cambridge/Merriam-Webster): "get your ducks in a row" (organise), "on someone\'s radar" (being noticed/considered), "hit the ground running" (start quickly and successfully), "elephant in the room" (obvious problem no one discusses), "not rocket science", "bring to the table", "back to the drawing board". Pictures are memory aids, not etymology claims.',
};

export default lesson;

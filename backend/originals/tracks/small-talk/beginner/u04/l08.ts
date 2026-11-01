import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: networking myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Networking myths',
  summary: 'Jayden says networking is "fake people swapping business cards to get jobs". Grace used to agree. After two meetups, she\'s not so sure.',
  minutes: 11,
  outcomes: [
    'Bust the common myths that make networking feel fake',
    'See networking as building relationships, not collecting contacts',
    'Know what actually makes people remember you',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Networking is about meeting as many people as possible.', isFact: false, explain: 'Three real conversations beat thirty handshakes. People remember the person who listened, not the person who collected cards.' },
        { text: 'You have to be an extrovert to be good at networking.', isFact: false, explain: 'Priya proves otherwise. Listening, preparing and following up matter more than being loud.' },
        { text: 'The best way to start is to ask people for a job.', isFact: false, explain: 'Asking strangers for favours puts them on the spot. Relationships come first; opportunities usually follow.' },
        { text: 'Being genuinely curious about people makes networking feel less fake.', isFact: true, explain: 'When you\'re actually interested in someone, it\'s not "networking", it\'s just a conversation.' },
        { text: 'Following up after an event is where most of the value is.', isFact: true, explain: 'A short message the next day turns a nice chat into a real contact. Most people never send it. Lesson 9.' },
        { text: 'You should only talk to the most important person in the room.', isFact: false, explain: 'The person alone by the snacks might be next year\'s founder, or your next good friend. Everyone counts.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'jayden', text: 'Networking is so fake, Mum. You just pretend to like people so they give you jobs.' },
        { speaker: 'grace', text: 'I met Ravi by the samosas. Nobody gave anybody a job. We just liked each other. He\'s coming for Sunday lunch.' },
        { speaker: 'jayden', text: '...You made a FRIEND at a networking event?' },
        { speaker: 'tey', text: "That's the secret. Good networking isn't a performance. It's small talk with curious people, done over and over, and following up." },
      ],
    },
  ],
  apply: {
    scenario: 'Saturday. Jayden versus networking.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes networking feel less fake?',
        options: [
          { text: 'Being genuinely curious about the person in front of you' },
          { text: 'Having more business cards', why: 'Cards don\'t make connections.' },
          { text: 'Pretending to be an extrovert', why: 'Pretending is what makes it feel fake.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'You must meet everyone in the room', group: 0 },
          { text: 'Following up is where much of the value is', group: 1 },
          { text: 'Only extroverts can network', group: 0 },
          { text: 'Curiosity makes it feel natural', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'But isn\'t it all about getting stuff from people?',
        prompt: 'Grace\'s answer?',
        options: [
          { text: 'Yes, that\'s the only point.', why: 'That\'s exactly the myth.' },
          { text: 'It works better the other way round: get to know people first, help where you can, and good things follow.' },
          { text: 'Go and tidy your room.', why: 'Not an argument. Again.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Three real conversations beat thirty ___. (one word)',
        answers: ['handshakes'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why not ask strangers for a job in the first conversation?',
        options: [
          { text: 'It\'s illegal', why: 'Just awkward.' },
          { text: 'Nobody ever hires people they meet', why: 'They do, often after a relationship forms.' },
          { text: 'It puts them on the spot; relationships come first' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Femi\'s networking advice to Ravi. Which tip is a myth?',
        lines: [
          'Have a few real conversations, not loads of quick ones.',
          'Only talk to the most senior people; ignore everyone else.',
          'Message people you liked the next day.',
        ],
        bug: 1,
        fix: 'Talk to whoever looks open, including people on their own.',
        explanation: 'Everyone counts. Today\'s quiet stranger might be tomorrow\'s best contact, or friend.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['Meet as many as possible', 'A few real conversations'],
          ['Ask for jobs first', 'Relationships first'],
          ['Only extroverts can do it', 'Listeners do it brilliantly'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Conversations ending', 'Rarely when both people want'],
          ['The refill exit', '"I\'m going to grab a drink."'],
          ['Open group', 'A loose shape with a gap'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s definition of good networking.',
        template: 'Small talk with [[1]] people, done over and over, and following [[2]].',
        blanks: [['curious'], ['up']],
        distractors: ['important', 'down'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s answer to Jayden.',
        tiles: ['I', 'made', 'a', 'friend', 'at', 'a', 'networking', 'event.'],
        distractors: ['fake', 'job'],
      },
    ],
  },
  reflect: {
    prompt: 'What did you believe about networking before this lesson? What do you believe now?',
    starters: ['I used to think...', 'Now I think...'],
  },
  deepen: {
    title: 'Redefine it',
    summary: 'Next time you go to an event, don\'t call it networking. Call it "meeting a few curious people". Notice whether it changes how you feel walking in.',
  },
  notes: 'Myths are presented as common beliefs; corrections are practical advice consistent with weak-ties and conversation research in earlier chapters. Ravi now a friend of Grace (named extra).',
};

export default lesson;

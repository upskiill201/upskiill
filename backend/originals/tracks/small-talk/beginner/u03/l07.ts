import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Myth or Fact: small talk around the world — watch and match, don't stereotype. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Small talk around the world: watch and match',
  summary: 'Femi greets his auntie on the phone for a full two minutes before saying why he called. Arjun skips straight to work. Tomasz finds "How are you?" baffling. Who\'s doing it right?',
  minutes: 11,
  outcomes: [
    'Know that small-talk norms differ between cultures, families and people',
    'Avoid stereotypes: watch and match the person in front of you',
    'Handle "How are you?" when it\'s a greeting, not a question',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'In many cultures, greetings are longer and include asking after family and health before getting to business.', isFact: true, explain: 'In many places, including much of West and East Africa, a proper greeting takes time and skipping it can seem cold. Femi\'s two-minute greeting to his auntie is good manners, not delay.' },
        { text: '"How are you?" always expects a detailed answer.', isFact: false, explain: 'In the UK and US it\'s often just a greeting; "Good, thanks, you?" is the expected reply. In other places it\'s a real question. Tomasz says in Poland he\'d give an honest answer, which surprised his English colleagues.' },
        { text: 'Everyone from the same country does small talk the same way.', isFact: false, explain: 'Families, regions, industries and personalities differ hugely. Use culture as a gentle clue, never a rule.' },
        { text: 'How comfortable people are with silence varies between cultures and people.', isFact: true, explain: 'Some people find a pause relaxing; others rush to fill it. Neither is wrong.' },
        { text: 'The safest approach is to memorise rules for every country.', isFact: false, explain: 'You\'d never finish, and you\'d stereotype people. Watch the person in front of you, and match their pace and style.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'femi', text: 'My auntie would be offended if I called and said "Hi, quick question." You greet first. Properly. You ask about everyone.' },
        { speaker: 'arjun', text: '(on the call later) With my clients in different countries, I watch what they do first. If they chat, I chat. If they go straight to work, so do I.' },
        { speaker: 'grace', text: 'So: watch and match.' },
        { speaker: 'tey', text: "Exactly. Culture gives you clues. The person in front of you gives you the answer." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Watch and match: how long they greet, how close they stand, how comfortable they are with pauses, what topics they bring up. Then follow their lead.',
    },
  ],
  apply: {
    scenario: 'A week of different styles.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Femi spends two minutes greeting his auntie before saying why he called. Why?',
        options: [
          { text: 'In many cultures a proper greeting comes first, and skipping it can seem cold' },
          { text: 'He\'s wasting time', why: 'In his family\'s culture, it\'s good manners.' },
          { text: 'He forgot why he called', why: 'He knew exactly why.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'How are you?',
        prompt: 'In the Manchester office, this is mostly a greeting. Best reply?',
        options: [
          { text: 'A full health update', why: 'Here it\'s usually a greeting, not a check-up.' },
          { text: 'Good, thanks! You?' },
          { text: 'Why do you ask?', why: 'A bit suspicious for a hello.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Watch and match, or stereotype?',
        groups: ['Watch and match', 'Stereotype'],
        items: [
          { text: 'He went straight to work, so I did too.', group: 0 },
          { text: 'She\'s from there, so she must hate chatting.', group: 1 },
          { text: 'They greeted me at length, so I took my time too.', group: 0 },
          { text: 'Everyone from that country is loud.', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey\'s rule: watch and ... (one word)',
        answers: ['match'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'A new client starts the call with work immediately. What does Grace do?',
        options: [
          { text: 'Insist on five minutes of small talk first', why: 'Follow their lead.' },
          { text: 'Assume they\'re rude', why: 'It\'s a style, not rudeness.' },
          { text: 'Go straight to work too, and add a warm word at the end' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s notes on culture. Which line is a stereotype?',
        lines: [
          'Greeting styles vary; watch how people greet me.',
          'People from cold countries never want to chat.',
          '"How are you?" can be a greeting or a real question, depending on where you are.',
        ],
        bug: 1,
        fix: 'Comfort with chatting varies by person; follow their lead.',
        explanation: 'A whole nation isn\'t one person. Culture is a clue, not a rule.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you notice to how you match it.',
        pairs: [
          ['Long, warm greeting', 'Take your time too'],
          ['Straight to business', 'Keep small talk short'],
          ['Comfortable pauses', 'Don\'t rush to fill them'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Tomasz answered "How are you?" honestly, with details, and his colleagues looked surprised. What\'s the kind reading?',
        options: [
          { text: 'Different habits: in some places it\'s a real question, in others mostly a greeting' },
          { text: 'Tomasz overshared', why: 'He answered the question as asked, in his habit.' },
          { text: 'His colleagues were rude', why: 'They were just used to a different habit.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Arrive early', 'Introvert strategy'],
          ['Give yourself a job', 'A reason to talk to people'],
          ['Count to two', 'What to do in a pause'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s rule.',
        tiles: ['If', 'they', 'chat,', 'I', 'chat.', 'If', 'not,', 'I', 'don\'t.'],
        distractors: ['always'],
      },
    ],
  },
  reflect: {
    prompt: 'What small-talk habits did you grow up with: long greetings, quick hellos, comfortable silences? How do they differ from the people you work or study with?',
    starters: ['Where I grew up, people...', 'At work or school, people...'],
  },
  deepen: {
    title: 'Notice one difference',
    summary: 'This week, notice one small-talk habit in someone from a different background from you. Ask them about it, with curiosity: "In your family, how long does a greeting take?" It\'s a great conversation in itself.',
  },
  notes: 'Cross-cultural variation in greetings, "how are you" as phatic vs literal, and silence tolerance is documented in intercultural pragmatics but most country-specific claims online are popular writing; lesson hedges with "in many cultures" and teaches watch-and-match, avoiding national stereotypes. Extended greetings in many West/East African cultures are widely described. Tomasz\'s Polish example is framed as his personal experience.',
};

export default lesson;

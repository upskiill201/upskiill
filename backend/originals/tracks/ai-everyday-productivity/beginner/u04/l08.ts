import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Myth or Fact: learning with AI. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Learning myths',
  summary: 'Tomás: "Why learn anything? AI translates." Marta: "Real learning happens in classrooms." Lucía has a week of evidence. Sort the myths from the facts about learning with AI.',
  minutes: 11,
  outcomes: [
    'Know what AI translation gets right and wrong',
    'Use role-play to practise conversations',
    'Pick study habits that work',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'AI translation is so good you never need to check it.', isFact: false, explain: 'It\'s usually good for common phrases, but it can miss tone, formality, and details like obrigado and obrigada. Check what matters with a person if you can.' },
        { text: 'Role-playing a conversation with AI is useful speaking practice.', isFact: true, explain: '"Be a distributor from São Paulo and ask me simple questions" lets her practise answering before it\'s real.' },
        { text: 'Reading the answer is about as good as trying to remember it.', isFact: false, explain: 'Trying to remember, even if you fail, builds memory more. That\'s retrieval.' },
        { text: 'Short daily practice usually beats one long cram session.', isFact: true, explain: 'Spacing. Twenty minutes a day for ten days beats four hours the night before.' },
        { text: 'Because Spanish and Portuguese are similar, similar-looking words always mean the same thing.', isFact: false, explain: 'False friends: "esquisito" is strange, "polvo" is octopus. Ask AI for a list of false friends for your languages.' },
        { text: 'Some AI tools can listen and talk, which helps with speaking and listening practice.', isFact: true, explain: 'Voice features let her practise out loud. Pronunciation feedback varies; a real person is still the best final check.' },
      ],
    },
    {
      kind: 'story',
      title: 'Tomás\'s theory',
      beats: [
        { speaker: 'tomas', text: 'I\'ll just use live translation on every call. Why learn anything?' },
        { speaker: 'lucia', text: 'Because the distributors will remember the person who tried. Nobody remembers the translation app.' },
      ],
    },
  ],
  apply: {
    scenario: 'Learning myths at Nopal.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Role-play helps you practise speaking', group: 0 },
          { text: 'Never check AI translation', group: 1 },
          { text: 'Short daily practice beats cramming', group: 0 },
          { text: 'Similar words always mean the same', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can AI translation miss?',
        options: [
          { text: 'Nothing, it\'s perfect', why: 'It can miss tone and details.' },
          { text: 'Every single word', why: 'It\'s usually good for common phrases.' },
          { text: 'Tone, formality and details like obrigado and obrigada' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Live translation on every call. Problem solved.',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'It helps in a pinch. But people remember the person who tried, and translation can miss tone.' },
          { text: 'Yes, never learn anything.', why: 'She\'s seen what learning gets her.' },
          { text: 'Translation apps are banned.', why: 'They aren\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'False friends.',
        template: 'In Portuguese, "esquisito" means [[1]] and "polvo" means [[2]].',
        blanks: [['strange', 'weird'], ['octopus']],
        distractors: ['delicious', 'dust'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt sets up good speaking practice?',
        options: [
          { text: 'Translate my answers.', why: 'That\'s doing it for her.' },
          { text: 'You\'re a distributor from São Paulo. Ask me one simple question at a time in Portuguese about Nopal. Wait for my answer.' },
          { text: 'Talk to me in Portuguese about anything.', why: 'Too open; practise what she\'ll need.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is a myth?',
        lines: [
          'Trying to remember builds memory.',
          'Rereading is as good as recalling.',
          'Mistakes make great flashcards.',
        ],
        bug: 1,
        fix: 'Recalling beats rereading.',
        explanation: 'Rereading feels easy, which is why it feels like learning.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the myth to the truth.',
        pairs: [
          ['"Translation is perfect"', 'Check what matters'],
          ['"Cram the night before"', 'A little, often'],
          ['"Similar words match"', 'Watch for false friends'],
          ['"Reading is enough"', 'Quiz yourself'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the word for similar-looking words with different meanings? (Two words.)',
        answers: ['false friends', 'false friend', 'False friends'],
        placeholder: 'Two words',
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Can AI actually teach you, or is that just hype?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'It does everything a teacher does.', why: 'A person is still the best final check.' },
          { text: 'Just hype.', why: 'It quizzed her every day for a week.' },
          { text: 'As a patient quiz partner and explainer, it\'s great. You still have to do the remembering, and a real person is the best final check.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the best final check on Lucía\'s pronunciation?',
        options: [
          { text: 'Asking AI "is my accent good?"', why: 'Feedback varies; a person is better.' },
          { text: 'A real person who speaks Portuguese' },
          { text: 'Reading it faster', why: 'Speed isn\'t pronunciation.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which learning myth did you believe? What will you do instead?',
    starters: ['I believed...', 'Instead I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask an AI tool for 5 false friends between two languages you know (or English and another language). Make each one a flashcard.',
  },
  notes: 'Retrieval and spacing as before. False friends checked. Voice features exist in some chat tools; stated as "some tools" without naming products.',
};

export default lesson;

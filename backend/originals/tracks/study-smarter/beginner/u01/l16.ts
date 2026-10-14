import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 16 — studying on your phone: voice, photos of notes, short sessions on the move. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Studying on your phone',
  summary: 'Forty minutes on a trotro every day. Kofi turns the ride home into a quiz, using his voice and a photo of his notes.',
  minutes: 11,
  outcomes: [
    'Use voice to explain what you know and find the gaps',
    'Turn a photo of your notes into questions',
    'Keep phone study short, focused and private',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'On the trotro home',
      before: {
        label: 'Before',
        text: 'Kofi types a long recipe question with his thumbs, the trotro hits a bump, he gives up, and scrolls videos for 40 minutes.',
      },
      after: {
        label: 'After',
        text: 'Kofi photographs today\'s Chemistry notes and says into his phone: "Final year. Turn these notes into 5 questions. Ask them one at a time and wait for my answer." He answers out loud, quietly, all the way home.',
      },
      notes: ['A photo replaces typing out notes.', 'Voice replaces typing with thumbs.', 'The ride becomes a quiz, not a scroll.'],
    },
    {
      kind: 'text',
      html: '<p>Three phone moves that work:</p><ol><li><strong>Photo to quiz:</strong> snap your notes or a textbook page (most AI apps can read photos) and ask for questions on it.</li><li><strong>Talk it out:</strong> use voice to explain a topic in your own words for one minute, then ask: <em>"What did I get wrong or leave out?"</em> This is the explain-it-back check, hands-free.</li><li><strong>Five-minute bursts:</strong> phone study works best in short, focused bursts, like one quiz on one syllabus line.</li></ol><p><strong>Two rules.</strong> First, check the AI read your photo correctly, especially numbers and handwriting. Second, only photograph your own notes: never a classmate, a test paper, or anything with other people\'s details.</p>',
    },
    {
      kind: 'check',
      question: 'Kofi photographs his notes. What should he check first?',
      options: ['That the AI read the numbers and words correctly', 'That the photo looks nice', 'Nothing, photos are always read perfectly'],
      answer: 0,
    },
  ],
  apply: {
    scenario: 'Kofi studies on the way home.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the phone move to how it works.',
        pairs: [
          ['Photo to quiz', 'Snap your notes, ask for questions'],
          ['Talk it out', 'Explain it aloud, ask what you missed'],
          ['Five-minute burst', 'One quiz on one syllabus line'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has a photo of his notes on the trotro. Which request is best?',
        options: [
          { text: 'What is this?', why: 'No job, no level.' },
          { text: '[photo] Final year. Turn these notes into 5 questions. Ask one at a time and wait for my answer.' },
          { text: '[photo] Summarise this so I can reread it.', why: 'Rereading again. Ask for questions.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which photo should Kofi NOT send to an AI?',
        lines: ['His own Chemistry notes', 'A page from his textbook', "Efua's notebook, without asking her"],
        bug: 2,
        fix: 'Ask Efua first, or use his own notes.',
        explanation: "It's her work. Never share someone else's notes or details without asking.",
      },
      {
        kind: 'typeAnswer',
        prompt: 'After explaining a topic aloud, you ask: "What did I get wrong or leave ...?" (one word)',
        answers: ['out'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'I took a photo of my Physics notes and the AI says the speed of light is 3 km/s. That seems slow?',
        prompt: 'What should Kofi say?',
        options: [
          { text: 'It probably misread your handwriting. Check the numbers against your notes. Light is about 300,000 km/s.' },
          { text: 'The AI read it, so it must be right.', why: 'AI can misread handwriting, especially numbers.' },
          { text: 'Physics changed.', why: 'It did not.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good phone study, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'One quiz on one syllabus line', group: 0 },
          { text: 'Explaining a topic aloud for a minute', group: 0 },
          { text: 'Photographing a test paper', group: 1 },
          { text: 'Typing a 300-word question on a bumpy ride', group: 1 },
          { text: 'Photo of your own notes, then questions', group: 0 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "talk it out" follow-up.',
        tiles: ['What', 'did', 'I', 'get', 'wrong', 'or', 'leave', 'out?'],
        distractors: ['right', 'copy'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is explaining a topic aloud useful?',
        options: [
          { text: 'It shows you what you actually know, and the AI can spot the gaps' },
          { text: 'It is louder than reading', why: 'Volume is not the point.' },
          { text: 'It saves your phone battery', why: 'Not really, and not the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the two phone rules.',
        template: 'Check the AI [[1]] your photo correctly. Only photograph your [[2]] notes.',
        blanks: [['read'], ['own']],
        distractors: ['liked', "friend's"],
      },
      {
        kind: 'orderLines',
        prompt: "Put Kofi's trotro routine in order.",
        lines: ['Photograph today\'s notes', 'Check the AI read them right', 'Ask for 5 questions, one at a time', 'Answer each one quietly out loud'],
      },
    ],
  },
  reflect: {
    prompt: 'When do you have 5 to 40 spare minutes with your phone (a ride, a queue, a break)? How could you use one of them?',
    starters: ['I have spare time when...', 'I could use it to...'],
  },
  deepen: {
    title: 'Try it today',
    summary: 'Next time you have five spare minutes, photograph one page of notes and answer 3 questions on it.',
  },
  notes: 'Trotro: shared minibus in Ghana. Speed of light ≈ 300,000 km/s (299,792 km/s). Photo/voice input availability varies by app; stated as "most AI apps".',
};

export default lesson;

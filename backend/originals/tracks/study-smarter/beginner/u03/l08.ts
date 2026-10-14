import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 8 — flashcards that test, not tell. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Flashcards that test, not tell',
  summary: 'A flashcard with a paragraph on the front teaches nothing. A flashcard with one sharp question is a tiny exam. Here is how to make the second kind.',
  minutes: 12,
  outcomes: [
    'Write flashcards with one question and one answer',
    'Turn your notes into flashcards with AI, then fix them',
    'Use fill-in-the-gap cards for definitions and processes',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two flashcards on the same topic',
      before: {
        label: 'Tells',
        text: 'FRONT: Osmosis\nBACK: Osmosis is the movement of water molecules across a partially permeable membrane from a dilute solution to a concentrated solution. It is passive. Examples include root hair cells and...',
      },
      after: {
        label: 'Tests',
        text: 'FRONT: In osmosis, water moves from a ______ solution to a ______ solution.\nBACK: dilute → concentrated',
      },
      notes: ['One fact per card.', 'The front is a question you have to answer.', 'The back is short enough to check in a second.'],
    },
    {
      kind: 'text',
      html: '<p>Good flashcards follow three rules:</p><ol><li><strong>One fact per card.</strong> If the back has three facts, make three cards.</li><li><strong>The front is a question.</strong> Or a sentence with a gap. Never just a topic word.</li><li><strong>Both ways for terms.</strong> Term to definition, and definition to term.</li></ol><p>AI is fast at this: <em>"Turn my notes into flashcards. One fact per card. Front: a question or a sentence with a gap. Back: under 10 words."</em></p><p>But <strong>check every card</strong> before you study it. Fix anything that\'s wrong, and delete anything you don\'t need. Learning a wrong flashcard 20 times is worse than not learning it at all.</p>',
    },
    {
      kind: 'check',
      question: 'The back of a card has three facts. What should you do?',
      options: ['Keep it, more is better', 'Split it into three cards', 'Delete it'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi makes flashcards for the mocks.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Tests, or tells?',
        groups: ['Tests', 'Tells'],
        items: [
          { text: 'Front: "Osmosis". Back: a paragraph', group: 1 },
          { text: 'Front: "What does active transport need that diffusion doesn\'t?"', group: 0 },
          { text: 'Front: "Diffusion moves particles from ___ to ___ concentration"', group: 0 },
          { text: 'Front: "Chapter 4 notes"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best flashcards?',
        options: [
          { text: 'Make flashcards.', why: 'No rules: expect paragraph-sized backs.' },
          { text: 'Turn my notes into flashcards. One fact per card. Front: a question or a gap. Back: under 10 words.' },
          { text: 'Make 500 flashcards on Biology.', why: 'Far too many, and not from his notes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Flashcard: "Active transport moves substances from a ___ to a high concentration." (one word)',
        answers: ['low', 'lower'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The AI made these cards. Which one must Kofi fix before studying?',
        lines: ['Q: Does osmosis need energy? A: No, it is passive.', 'Q: What moves in osmosis? A: Water.', 'Q: Which way does water move? A: Concentrated to dilute.'],
        bug: 2,
        fix: 'A: Dilute to concentrated.',
        explanation: 'Learning a wrong card many times is worse than not learning it. Check every card first.',
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: "The AI made me 200 flashcards in one go. I'll just start studying them.",
        prompt: 'What should Kofi say?',
        options: [
          { text: 'Check them first. Fix the wrong ones and delete the ones you don\'t need. 200 is probably too many.' },
          { text: 'Great, start now.', why: 'Some may be wrong, and he would learn them.' },
          { text: 'Ask for 400.', why: 'More cards are not better.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the problem it prevents.',
        pairs: [
          ['One fact per card', 'Backs too long to check'],
          ['Front is a question', 'Reading instead of answering'],
          ['Check every card', 'Learning something wrong'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Make a two-way pair for diffusion.',
        template: 'Card 1: "Diffusion means...?" Card 2: "Particles spreading from high to low concentration is called...?" Answer to card 2: [[1]].',
        blanks: [['diffusion']],
        distractors: ['osmosis', 'active transport'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is a gap sentence better than a topic word on the front?',
        options: [
          { text: 'It forces you to recall a specific fact' },
          { text: 'It is shorter', why: 'Often it is longer. It is better because it tests.' },
          { text: 'It looks more serious', why: 'Looks are not the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build rule one.',
        tiles: ['One', 'fact', 'per', 'card'],
        distractors: ['ten', 'page'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the flashcard routine in order.',
        lines: ['Write your own notes', 'Ask the AI to turn them into cards, with the rules', 'Check and fix every card', 'Study them, one at a time'],
      },
    ],
  },
  reflect: {
    prompt: 'Write two flashcards for something you are studying: one question card and one gap card.',
    starters: ['Card 1 front:', 'Card 1 back:', 'Card 2 front:', 'Card 2 back:'],
  },
  deepen: {
    title: 'Make a deck tonight',
    summary: 'Turn one page of your notes into 10 flashcards with the AI, check every card, and study them. Chapter 4 shows you how to space them out.',
  },
  notes: 'Flashcard design principles (minimum information, cloze deletion) are standard spaced-repetition guidance (e.g., Wozniak\'s "20 rules"); stated generally.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 17 — handling questions. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Handling questions',
  summary: 'Ada uses AI to predict the founders\' questions and prepare short answers. Tap her question sheet to see how it\'s built.',
  minutes: 12,
  outcomes: [
    'Predict likely questions with AI',
    'Prepare short, honest answers',
    'Handle a question you can\'t answer',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s question sheet',
      text: 'Q: What did it cost? A: 300 GHS per shop; backup slide 9. Q: What if the bank is late again? A: Manual settlement costs about 400 GHS a week; we\'d pause new shops. Q: Why not Kenya? A: Honestly, we haven\'t tested it; Ghana had the partner bank ready. Q: Will shops keep using it? A: Too early to know; week 8 review will tell us.',
      hotspots: [
        { phrase: 'backup slide 9', note: 'Link each answer to a backup slide so you can show, not just tell.' },
        { phrase: 'we\'d pause new shops', note: 'A plan, not just a worry. Founders want to know you\'ve thought ahead.' },
        { phrase: 'Honestly, we haven\'t tested it', note: 'An honest "we don\'t know" beats a confident guess.' },
        { phrase: 'Too early to know', note: 'Say what you don\'t know, and when you will.' },
        { phrase: 'week 8 review', note: 'Point to when the answer will come. That keeps trust.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask AI for the 10 most likely questions from this audience. Write a two-sentence answer for each, link a backup slide, and say "I don\'t know yet" honestly.',
    },
  ],
  apply: {
    scenario: 'Ada prepares for founders\' questions.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request predicts questions best?',
        options: [
          { text: 'What will they ask?', why: 'No audience details.' },
          { text: 'Our two founders care about cost, risk and growth. Here\'s my deck. List the 10 questions they\'re most likely to ask, hardest first.' },
          { text: 'Give me easy questions.', why: 'Prepare for hard ones.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good answer, or weak answer?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '"300 GHS per shop; here\'s the breakdown"', group: 0 },
          { text: '"Um, I\'d have to check"', group: 1 },
          { text: '"Too early to know; week 8 will tell us"', group: 0 },
          { text: '"Definitely, they\'ll love it forever"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if they ask something you really don\'t know?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'ll say "I don\'t know yet, I\'ll find out and send it by Friday", and then actually send it.' },
          { text: 'I\'ll make something up.', why: 'A guess can backfire badly.' },
          { text: 'I\'ll change the subject.', why: 'Answer honestly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Write a [[1]]-sentence answer for each, and link a [[2]] slide.',
        blanks: [['two', '2'], ['backup']],
        distractors: ['ten', 'title'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to the answer type.',
        pairs: [
          ['What did it cost?', 'A number plus backup slide'],
          ['What if the bank is late again?', 'A plan'],
          ['Will shops keep using it?', 'Honest "too early", with a date'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which answer on Ada\'s sheet is a problem?',
        lines: [
          'Cost: 300 GHS per shop (slide 9)',
          'Bank late again: pause new shops, manual settlement',
          'Why not Kenya: Kenya would definitely fail',
          'Shops keep using it: too early; week 8 review',
        ],
        bug: 2,
        fix: 'Why not Kenya: we haven\'t tested it; Ghana had a partner ready.',
        explanation: 'A confident claim with no evidence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many likely questions should Ada ask the AI for?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s honest answer.',
        tiles: ['I', 'don\'t', 'know', 'yet;', 'I\'ll', 'send', 'it', 'Friday'],
        distractors: ['definitely'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s preparation.',
        lines: ['Ask AI for likely questions', 'Write short answers', 'Link backup slides', 'Practise saying them'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Answer from the sheet, or from AI on the spot?',
        groups: ['Prepared answer', 'Never'],
        items: [
          { text: 'Cost per shop', group: 0 },
          { text: 'Typing the question into AI during the meeting', group: 1 },
          { text: 'Plan if the bank is late', group: 0 },
          { text: 'Reading an AI answer aloud unchecked', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give a date with "I don\'t know yet"?',
        options: [
          { text: 'It shows you\'ll follow through, which keeps trust' },
          { text: 'To sound busy', why: 'It\'s a commitment.' },
          { text: 'No reason', why: 'It keeps trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for the hardest questions first?',
        options: [
          { text: 'Those are the ones you most need to prepare' },
          { text: 'To feel bad', why: 'To prepare.' },
          { text: 'Order doesn\'t matter', why: 'Hard ones need the most work.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For your next presentation, write the three hardest likely questions and your two-sentence answers.',
    starters: ['Q1:', 'A1:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for the 10 hardest questions about something you\'re presenting. Answer the top three.' },
  notes: 'Fictional figures.',
};

export default lesson;

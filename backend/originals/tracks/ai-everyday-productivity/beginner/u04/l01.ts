import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. Story with a choice: translate and memorise? */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Translate and memorise?',
  summary: 'Day 16. Carmen: "The São Paulo distributors moved the call to Day 29. You still open in Portuguese." Lucía knows "obrigado" and one football chant. The fastest-looking plan might be the one that fails.',
  minutes: 12,
  outcomes: [
    'Tell the difference between AI doing the work and AI helping you learn',
    'Pick an approach that survives a real conversation',
    'Set a clear, small learning goal',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 16, Carmen\'s office',
      beats: [
        { speaker: 'carmen', text: 'They moved the video call to Day 29. Sixty seconds in Portuguese to open, then we switch to Spanish. They\'ll love it. Can you?' },
        { speaker: 'lucia', text: 'Of course. (She can\'t.)' },
        { speaker: 'tomas', text: 'Easy. AI translates your opening, you memorise the sounds. Done tonight.' },
        { speaker: 'narrator', text: 'It\'s tempting. Thirteen days, a party, a move. But the distributors won\'t just listen. They\'ll answer.' },
        { speaker: 'tey', text: 'Doing it for her, or teaching her? That\'s the choice with AI and learning. What should Lucía do?' },
      ],
      choice: {
        prompt: 'What should Lucía do?',
        options: [
          { text: 'Tomás\'s plan: AI translates, she memorises the sounds.', outcome: 'It works until the first distributor smiles and says "Que legal! Há quanto tempo a Nopal existe?" She doesn\'t understand a word, freezes, and switches to Spanish after eleven seconds.' },
          { text: 'Skip it. Open in Spanish and apologise.', outcome: 'Safe, and fine. But Carmen asked, the distributors would love it, and thirteen days at twenty minutes a day is enough for a strong, simple opening.' },
          { text: 'Use AI as a tutor: understand every line of the opening, then let it quiz her and role-play the call, twenty minutes a day.', outcome: 'Yes. Slower on Day 16, much stronger on Day 29. When a distributor asks how long Nopal has existed, she understands, and answers with a smile: "Doze anos!"', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'If AI does the thinking, you get the answer. If AI makes you do the thinking, you get the skill. For learning, choose the second.',
    },
  ],
  apply: {
    scenario: 'Thirteen days to Portuguese.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the weak point in Tomás\'s plan?',
        options: [
          { text: 'Memorised sounds collapse when someone replies or asks a question' },
          { text: 'AI can\'t translate Portuguese', why: 'It usually translates common phrases well.' },
          { text: 'It takes too long', why: 'It\'s fast. That\'s the trap.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'AI doing it for you, or AI teaching you?',
        groups: ['Doing it for you', 'Teaching you'],
        items: [
          { text: 'Translate my whole opening', group: 0 },
          { text: 'Quiz me one line at a time', group: 1 },
          { text: 'Write my homework answers', group: 0 },
          { text: 'Explain why it\'s "obrigada", not "obrigado"', group: 1 },
          { text: 'Role-play the call with me', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'Why learn it if AI can translate it in one second?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Good point, I won\'t bother.', why: 'Translation won\'t help her answer live questions.' },
          { text: 'Because on Day 29 they\'ll talk back, and the AI won\'t be holding my hand on the call.' },
          { text: 'Because translation is illegal.', why: 'It isn\'t; it just isn\'t learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The learning rule.',
        template: 'If AI does the thinking, you get the [[1]]. If AI makes you think, you get the [[2]].',
        blanks: [['answer'], ['skill']],
        distractors: ['bill', 'headache'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the plan to what happens on Day 29.',
        pairs: [
          ['Memorise the sounds', 'Freezes at the first question'],
          ['Skip Portuguese', 'Fine, but a missed chance'],
          ['AI as a tutor', 'Understands and answers'],
          ['Cram the night before', 'Forgets half of it'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first prompt starts Lucía\'s learning plan well?',
        options: [
          { text: 'Translate this into Portuguese.', why: 'That\'s doing it for her.' },
          { text: 'Teach me Portuguese.', why: 'Too big: all of Portuguese?' },
          { text: 'I\'m a Spanish speaker. Help me learn a 60-second opening for a business call in Brazilian Portuguese. Explain each line, then quiz me.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day is the São Paulo video call? (A number.)',
        answers: ['29', 'day 29', 'twenty-nine'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which goal is too vague to plan for?',
        lines: [
          'Learn Portuguese.',
          'Open a video call in Portuguese for 60 seconds.',
          'Understand and answer 3 simple questions about Nopal.',
        ],
        bug: 0,
        fix: 'Make it small and specific, like the other two.',
        explanation: '"Learn Portuguese" has no finish line. The other two can be practised and checked.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s learning approach.',
        lines: ['Set a small goal', 'Understand each line', 'Get quizzed every day', 'Role-play the call', 'Rehearse with a person'],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Honestly, will you be ready?',
        prompt: 'Lucía\'s honest answer?',
        options: [
          { text: 'I\'ll be fluent by then.', why: 'Not in 13 days. Be honest.' },
          { text: 'Probably not, let\'s skip it.', why: 'She has a realistic plan.' },
          { text: 'For a 60-second opening and a few simple answers, yes. Twenty minutes a day with AI as my tutor.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s something you\'d like to learn, not just get done? Write it as a small goal with a finish line.',
    starters: ['I want to learn...', 'I\'ll know I\'ve got it when...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one small thing to learn this week (ten words, a recipe, a formula). Ask an AI tool: "Explain it to me, then quiz me one question at a time and wait for my answer."',
  },
  notes: '"Que legal! Há quanto tempo a Nopal existe?" = "Cool! How long has Nopal existed?" "Doze anos" = twelve years (Nopal\'s age is fictional). Carmen per CAST (Nopal marketing director).',
};

export default lesson;

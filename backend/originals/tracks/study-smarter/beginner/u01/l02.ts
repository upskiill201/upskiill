import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2 — free. What AI is good at for studying, what it isn't, and the line on cheating. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: "What AI is good at for studying (and what it isn't)",
  summary: "It's a patient explainer and a tireless quizmaster. It's also confidently wrong sometimes, and it can't learn anything for you.",
  minutes: 12,
  outcomes: [
    'Name what AI does well for studying',
    'Name what it does badly, and why that matters',
    'Tell using AI to learn from using it to skip learning',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'AI knows everything, so its answers are always right.',
          isFact: false,
          explain: "AI writes the most likely-sounding answer. Usually that's right. Sometimes it's confidently wrong, especially with numbers, dates and quotes.",
        },
        {
          text: 'AI can explain the same idea ten different ways until one makes sense.',
          isFact: true,
          explain: "This is its superpower for studying. It never gets tired of you saying \"I still don't get it\".",
        },
        {
          text: 'AI knows exactly what is in your syllabus and what your teacher will test.',
          isFact: false,
          explain: "It doesn't know your exam board, your teacher, or what was covered in class, unless you tell it.",
        },
        {
          text: 'Using AI for schoolwork is always cheating.',
          isFact: false,
          explain: "It depends on your school's rules and on how you use it. Getting an explanation is like asking a tutor. Handing in its work as yours is cheating.",
        },
        {
          text: 'If the AI does your homework, you learn less.',
          isFact: true,
          explain: "Learning happens when your brain does the work. If the AI does it, the AI got the practice, not you. And there's no AI in the exam room.",
        },
      ],
    },
    {
      kind: 'chat',
      turns: [
        { tey: "So here's my honest take. For studying, AI is brilliant at three things.", replies: ['Which three?'] },
        { tey: "Explaining (at your level, as many times as you need). Quizzing (endless practice questions). And giving feedback on work YOU did." },
        { tey: "And it's bad at three things: being reliably right about facts, knowing your syllabus, and learning for you.", replies: ['Learning for me?'] },
        { tey: "Yep. Your brain only gets stronger when it does the lifting. If the AI writes the answer, you watched someone else go to the gym." },
        { tey: 'So the rule for this whole course: you think first, AI second. Use it to understand and practise, never to skip the thinking.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Explain, quiz, give feedback: yes. Be your source of truth, know your syllabus, learn for you: no.',
    },
    {
      kind: 'check',
      question: 'Which is the best use of AI for studying?',
      options: ['Writing your homework answers', 'Quizzing you on a topic you just revised', 'Telling you what will be in the exam'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi is working out what his new study partner is actually for.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good at, or bad at?',
        groups: ['Good at', 'Bad at'],
        items: [
          { text: 'Explaining an idea five different ways', group: 0 },
          { text: 'Knowing what your teacher will test', group: 1 },
          { text: 'Making practice questions', group: 0 },
          { text: 'Always getting dates and numbers right', group: 1 },
          { text: 'Giving feedback on your own draft', group: 0 },
          { text: 'Learning the topic for you', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why can\'t the AI know what Mrs Asante will put in the test?',
        options: [
          { text: "It wasn't in her lessons, and nobody told it", why: 'Close, but the point is it never sees your class at all.' },
          { text: "It can't see your class, your syllabus or your teacher unless you tell it" },
          { text: 'Teachers block AI from reading their tests', why: "It's simpler than that. It has no way of knowing." },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "Using AI is cheating, Kofi. Everyone knows that.",
        prompt: 'Efua sits next to Kofi in Chemistry. What is the most accurate reply?',
        options: [
          { text: "It depends how you use it. Copying its answers is cheating. Asking it to explain moles is like asking a tutor." },
          { text: "No it isn't. You can use it for anything.", why: 'Handing in its work as yours is cheating at most schools.' },
          { text: "You're right, I'll stop.", why: "Efua has a point about copying, but explaining isn't cheating." },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rule for this course: you think first, AI ... (one word)',
        answers: ['second'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: "Match the AI's strength to how Kofi could use it.",
        pairs: [
          ['Explaining', '"Explain molar mass like I missed the lesson"'],
          ['Quizzing', '"Ask me 5 questions on moles, one at a time"'],
          ['Feedback', '"Here\'s my answer. What did I miss?"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which of Kofi's plans skips the learning?",
        lines: [
          'Ask the AI to explain moles with an example.',
          'Ask the AI to answer the homework questions, then copy them.',
          'Ask the AI to quiz me on what I learned.',
        ],
        bug: 1,
        fix: 'Do the homework myself, then ask the AI to check my answers.',
        explanation: "If the AI does the questions, the AI got the practice. Kofi still can't do them in the test.",
      },
      {
        kind: 'mcq',
        prompt: 'The AI tells Kofi a chemistry date confidently. What should he do?',
        options: [
          { text: 'Trust it, it sounded sure', why: 'Sounding sure and being right are different things.' },
          { text: 'Check it against his textbook or notes before learning it' },
          { text: 'Never use AI again', why: 'Checking is the fix, not quitting.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Tey's take.",
        template: 'AI is great at [[1]], quizzing and [[2]]. It is bad at being reliably [[3]], knowing your syllabus, and learning for you.',
        blanks: [['explaining'], ['feedback'], ['right', 'correct']],
        distractors: ['cheating', 'guessing'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s gym line.',
        tiles: ['Your', 'brain', 'only', 'gets', 'stronger', 'when', 'it', 'does', 'the', 'work'],
        distractors: ['AI', 'never'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Learning, or skipping the learning?',
        groups: ['Learning', 'Skipping it'],
        items: [
          { text: 'Asking it to explain a step you got wrong', group: 0 },
          { text: 'Pasting its essay in as yours', group: 1 },
          { text: 'Asking it to check an answer you wrote', group: 0 },
          { text: 'Getting it to fill in your worksheet', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever used AI in a way that skipped the learning? What would the "think first, AI second" version have looked like?',
    starters: ['One time I...', 'Next time I will...'],
  },
  deepen: {
    title: 'Check your school\'s rules',
    summary: "Find your school's or university's rules on AI (a handbook, a website, or ask a teacher). You'll need them in Chapter 6.",
  },
  notes: 'No statistics. "Confidently wrong with numbers, dates and quotes" is a widely documented limitation of language models (hallucination); stated generally.',
};

export default lesson;

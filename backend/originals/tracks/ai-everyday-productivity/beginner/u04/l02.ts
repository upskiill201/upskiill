import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Reading: how learning actually sticks. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How learning actually sticks',
  summary: 'A study of about 1,000 secondary-school students found that a chatbot raised their practice scores, and then lowered their exam scores. Read why, and the three habits that make AI a tutor instead of a crutch.',
  minutes: 13,
  outcomes: [
    'Explain why getting answers from AI can weaken learning',
    'Use retrieval and spacing with AI',
    'Make AI give hints, not answers',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The crutch and the coach',
      html: '<p>In 2024, researchers ran an experiment with about a thousand secondary-school maths students in Turkey. Some practised with a regular AI chatbot. Some practised with a version set up like a tutor: it gave hints, not answers. Some had no AI at all.</p><p>During practice, the AI groups did much better. No surprise: the chatbot could just give them the answers.</p><p>Then came the exam, with no AI. Students who had practised with the regular chatbot scored about <strong>17% lower</strong> than students who never had it. The tutor version largely avoided that drop.</p><blockquote>When AI does the work, practice feels easy and learning doesn\'t happen. When it makes you work, learning sticks.</blockquote><h3>Three habits that make learning stick</h3><ul><li><strong>Retrieval: pull it out of your head.</strong> Trying to remember something, even when you get it wrong, strengthens memory more than reading it again. Psychologists call it the testing effect. AI makes this easy: "Quiz me, and wait for my answer."</li><li><strong>Spacing: a little, often.</strong> Twenty minutes a day for thirteen days beats four hours the night before. Ask AI to bring back yesterday\'s lines today.</li><li><strong>Doing it yourself first.</strong> Try to say the line before you look. Try the problem before you ask. Then ask for a hint, not the answer.</li></ul><h3>The tutor setup</h3><p>Lucía starts every study chat the same way: "Be my tutor. Don\'t give me answers. Quiz me, wait for my reply, give me a hint if I\'m stuck, and only then explain."</p><p>It\'s slower. It feels harder. That\'s the point: the effort is the learning.</p>',
    },
    {
      kind: 'check',
      question: 'In the 2024 study, what happened to students who practised with a regular chatbot, once the AI was taken away?',
      options: [
        'They did better than everyone',
        'They did about the same as students without AI',
        'They did worse in the exam than students who never had it',
      ],
      answer: 2,
      explanation: 'About 17% worse. The chatbot did their thinking during practice. The tutor-style version largely avoided this.',
    },
  ],
  apply: {
    scenario: 'Making learning stick.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to what Lucía does.',
        pairs: [
          ['Retrieval', '"Quiz me and wait for my answer"'],
          ['Spacing', '20 minutes a day for 13 days'],
          ['Doing it first', 'Says the line before looking'],
          ['Hints, not answers', '"Give me a clue if I\'m stuck"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did practice scores go up but exam scores go down?',
        options: [
          { text: 'The exam was harder', why: 'Everyone took the same exam.' },
          { text: 'The chatbot did the thinking in practice, so the learning didn\'t happen' },
          { text: 'AI is bad at maths', why: 'Practice scores went up.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tutor setup.',
        template: 'Don\'t give me [[1]]. Quiz me, [[2]] for my reply, give a hint if I\'m stuck.',
        blanks: [['answers'], ['wait']],
        distractors: ['hints', 'hurry'],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'My nephew uses AI for homework and his grades went up. So it\'s working?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Yes, grades are all that matter.', why: 'Homework grades might hide that he\'s not learning.' },
          { text: 'AI should be banned.', why: 'Used as a tutor, it helps.' },
          { text: 'Maybe. Ask how he does in tests without it. If AI does the thinking, the homework looks good and the learning doesn\'t happen.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Crutch or coach?',
        groups: ['Crutch', 'Coach'],
        items: [
          { text: 'Give me the answer', group: 0 },
          { text: 'Give me a hint', group: 1 },
          { text: 'Do my exercise', group: 0 },
          { text: 'Quiz me on yesterday\'s lines', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how much lower did the regular-chatbot students score in the exam? (A percentage.)',
        answers: ['17', '17%', 'about 17%', '17 percent', 'seventeen'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which study plan breaks the spacing habit?',
        lines: [
          'Day 16–28: 20 minutes a day.',
          'Day 28: 4 hours of everything, all at once.',
          'Each day: quick review of yesterday first.',
        ],
        bug: 1,
        fix: 'Keep Day 28 short: a rehearsal, not a cram.',
        explanation: 'A cram the night before is the opposite of spacing.',
      },
      {
        kind: 'mcq',
        prompt: 'What does "the testing effect" mean?',
        options: [
          { text: 'Trying to remember something strengthens memory more than rereading it' },
          { text: 'Tests make you nervous', why: 'That\'s not it.' },
          { text: 'Only tests can measure learning', why: 'It\'s about how memory strengthens.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good 20-minute study session.',
        lines: ['Quick quiz on yesterday', 'Try today\'s new lines yourself', 'Ask for hints where stuck', 'Get quizzed on today\'s lines', 'Say the whole opening aloud'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the tutor setup feel harder?',
        options: [
          { text: 'It\'s broken', why: 'It\'s working as intended.' },
          { text: 'Because you\'re doing the thinking, and that effort is the learning' },
          { text: 'Because tutors are strict', why: 'It\'s the effort that matters.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of something you once "learned" by reading the answer. Do you still remember it? What would retrieval practice have looked like?',
    starters: ['I once learned...', 'Retrieval would have been...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Start a study chat with: "Be my tutor. Don\'t give me answers. Quiz me one question at a time, wait for my reply, give a hint if I\'m stuck, then explain." Try it on anything you\'re learning.',
  },
  notes: 'Bastani et al. (2024), "Generative AI Can Harm Learning" (working paper / PNAS 2025): ~1,000 high-school maths students in Turkey; GPT Base access improved practice performance but reduced unassisted exam performance by about 17% vs control; a GPT Tutor version with hints largely mitigated the harm. Testing effect: Roediger & Karpicke (2006). Spacing: Cepeda et al. (2006).',
};

export default lesson;

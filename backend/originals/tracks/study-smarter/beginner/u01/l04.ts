import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4 — free. Miracle's study prompt recipe: Who I am, What I'm studying, What I need, How I want it. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The study prompt recipe',
  summary: "Miracle's four-part recipe works for any subject: who you are, what you're studying, what you need, and how you want it.",
  minutes: 13,
  outcomes: [
    'Use the four-part study recipe on any subject',
    'Choose what you need: explain, quiz, or check',
    'Ask for the shape that suits you',
  ],
  learn: [
    {
      kind: 'story',
      title: 'First group call',
      beats: [
        { speaker: 'narrator', text: "Thursday, 7pm. Kofi's first video call with his mentor, Miracle, a final-year Software Engineering student in Buea, Cameroon." },
        { speaker: 'narrator', text: 'Two more faces on the call: Clinton and David, both in their final year at a school in Buea.' },
        { speaker: 'miracle', text: "Show me your last AI question, Kofi. Not the answer. The question." },
        { speaker: 'kofi', text: '"I\'m in my last year and I missed the moles lesson. Explain it simply." It worked!' },
        { speaker: 'miracle', text: "Good. Now let's make it work every time, for every subject. I use a recipe. Four parts. I wish someone had given it to me at your age." },
      ],
    },
    {
      kind: 'steps',
      title: "Miracle's study recipe",
      steps: [
        { title: 'Who I am', body: 'Your stage and what you already know. "Final year of school, I know moles but not molar mass."' },
        { title: "What I'm studying", body: 'The exact topic, ideally the line from your syllabus. "Calculating moles from mass, for my Chemistry test."' },
        { title: 'What I need', body: 'Pick one job: explain it, quiz me, or check my answer. One job per question works best.' },
        { title: 'How I want it', body: 'The shape: "short", "with an example", "step by step", "one question at a time", "no new words without explaining them".' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Here\'s the full recipe in action:</p><p><em>"<strong>Who:</strong> I\'m in my final year of school and I know what a mole is. <strong>What:</strong> calculating the number of moles from a mass, for a Chemistry test. <strong>Need:</strong> explain how to do it. <strong>How:</strong> step by step, with one worked example, then stop."</em></p><p>It looks long. It takes about 30 seconds to type, and it saves you ten minutes of reading the wrong answer.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Who I am. What I\'m studying. What I need. How I want it.',
    },
    {
      kind: 'check',
      question: 'Which part is "quiz me"?',
      options: ['Who I am', 'What I need', 'How I want it'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'The study group tries the recipe.',
    items: [
      {
        kind: 'orderLines',
        prompt: "Put Miracle's recipe in order.",
        lines: ['Who I am', "What I'm studying", 'What I need', 'How I want it'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the recipe is this?',
        groups: ['Who or What', 'Need', 'How'],
        items: [
          { text: 'Final year, I know moles', group: 0 },
          { text: 'Calculating moles from mass', group: 0 },
          { text: 'Quiz me', group: 1 },
          { text: 'One question at a time', group: 2 },
          { text: 'Check my answer', group: 1 },
          { text: 'With one worked example', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'David wants to revise quadratic equations. Which question uses the whole recipe?',
        options: [
          { text: 'Quadratic equations please.', why: 'Topic only.' },
          {
            text: "I'm in my final year and I can factorise simple quadratics. Topic: solving with the quadratic formula. Quiz me with 5 questions, one at a time, and tell me what I got wrong.",
          },
          { text: 'I am good at maths. Give me hard questions.', why: 'No topic, no clear job, no shape.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'The recipe is too long. I just want the answer fast.',
        prompt: 'What should Kofi tell Clinton?',
        options: [
          { text: 'It takes 30 seconds to type and saves ten minutes of reading the wrong answer.' },
          { text: 'You\'re right, skip it.', why: "A fast question that gets a useless answer isn't fast." },
          { text: 'Make it even longer.', why: 'Longer isn\'t the point. Four clear parts are.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which part of Clinton's question is missing its job?",
        lines: [
          "Who: final year, I know Newton's first law.",
          "What: Newton's second law, F = ma.",
          'Need: everything about physics.',
          'How: short, with a football example.',
        ],
        bug: 2,
        fix: 'Need: explain what F = ma means.',
        explanation: '"Everything" isn\'t a job. Pick one: explain, quiz, or check.',
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's question.",
        template: "Who: final year, I know moles. What: molar [[1]]. Need: [[2]] me with 3 questions. How: one at a [[3]].",
        blanks: [['mass'], ['quiz', 'test'], ['time']],
        distractors: ['marry', 'week', 'pay'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the need to a question.',
        pairs: [
          ['Explain', '"Explain molar mass step by step"'],
          ['Quiz', '"Ask me 5 questions on molar mass"'],
          ['Check', '"Here\'s my working. Is it right?"'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The recipe is: who I am, what I\'m studying, what I need, and ... I want it (one word)',
        answers: ['how'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: "Build a good 'How' for Kofi.",
        tiles: ['Step', 'by', 'step,', 'with', 'one', 'example'],
        distractors: ['every', 'formula'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for one job per question?',
        options: [
          { text: 'Mixing jobs gets you a muddled answer that does none of them well' },
          { text: 'The AI can only read one sentence', why: 'It can read a lot. Clear jobs just work better.' },
          { text: 'It is a school rule', why: "It's a habit that gets better answers, not a rule." },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write the full recipe for one thing you need to study this week: who, what, need, how.',
    starters: ['Who:', 'What:', 'Need:', 'How:'],
  },
  deepen: {
    title: 'Use it once today',
    summary: 'Use the four-part recipe for one real study question today. Did the answer start in the right place?',
  },
  notes: 'Recipe is a teaching device (Teyro), not a cited framework. Quadratic formula, F = ma and molar mass are standard final-year secondary content.',
};

export default lesson;

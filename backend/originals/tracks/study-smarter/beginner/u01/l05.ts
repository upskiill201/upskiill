import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: moles finally click. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: moles finally click',
  summary: 'Kofi used everything from this week on the topic he avoided for a year. Now it is your turn: level, gap, shape and the recipe, all mixed.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can ask a study question that gets a useful answer', 'Use the four-part recipe without looking'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday night',
      beats: [
        { speaker: 'narrator', text: 'Sunday, 9pm. Two weeks to the test. Kofi opens his chat and types the whole recipe, from memory.' },
        { speaker: 'narrator', text: 'Ten minutes later he works out how many moles are in 36 grams of water. Two. He checks it in his textbook. Two.' },
        { speaker: 'kofi', text: 'Miracle. MIRACLE. I just did a moles question by myself.' },
        { speaker: 'miracle', text: "That's the point. The AI explained it. You did it. Now let's prove it stuck." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1. Two weeks to the Chemistry test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Kofi\'s first question ("explain moles in chemistry") get a wall of text?',
        options: [
          { text: 'It said nothing about who was asking, so the AI aimed at nobody in particular' },
          { text: 'Moles are too hard for AI', why: 'The AI explained it well once it knew who was asking.' },
          { text: 'He used the wrong app', why: 'A different app would have guessed the same way.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good use of AI for studying, or not?',
        groups: ['Good use', 'Not a good use'],
        items: [
          { text: 'Explain a topic I missed', group: 0 },
          { text: 'Tell me what will be in my exam', group: 1 },
          { text: 'Quiz me one question at a time', group: 0 },
          { text: 'Write my homework answers', group: 1 },
          { text: 'Check the working I did', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the study recipe in order.',
        lines: ['Who I am', "What I'm studying", 'What I need', 'How I want it'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi wants to practise moles. Which question is best?',
        options: [
          { text: 'Moles questions.', why: 'No level, no job, no shape.' },
          {
            text: "Final year, I can now find moles from a mass. Topic: moles and molar mass. Quiz me with 5 questions, one at a time, and explain any I get wrong.",
          },
          { text: 'Give me the answers to 5 moles questions.', why: "Answers without questions teach him nothing." },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Water weighs 18 g per mole. How many moles are in 36 g of water?',
        answers: ['2', 'two', '2 moles', '2 mol'],
        placeholder: 'Number',
        explanation: 'Moles = mass ÷ molar mass = 36 ÷ 18 = 2.',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'I asked the AI about vectors and it used "scalar" five times. I still have no idea what scalar means.',
        prompt: 'What should Kofi tell David?',
        options: [
          { text: 'Ask it: "What does scalar mean? Explain it simply before you use it again."' },
          { text: 'Ignore that word.', why: 'It might be the key word in the whole topic.' },
          { text: 'Ask a different question.', why: 'He should fill the gap, not avoid it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Spot the weak line in Clinton's question.",
        lines: [
          "Who: final year, I know Newton's laws.",
          'What: momentum, for a Physics test.',
          'Need: explain it.',
          'How: whatever.',
        ],
        bug: 3,
        fix: 'How: short, with a football example, then one question to check I got it.',
        explanation: '"Whatever" gives the AI nothing about the shape you need.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the lesson to its big idea.',
        pairs: [
          ["Kofi's first question", 'Short questions get answers for nobody'],
          ['Good at, bad at', 'Explain and quiz: yes. Learn for you: no'],
          ['Tell it your level', 'Say what you already know'],
          ['The recipe', 'Who, what, need, how'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule for this whole course.',
        template: 'You [[1]] first, AI [[2]].',
        blanks: [['think'], ['second']],
        distractors: ['copy', 'first', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: "Build the 'Who' part of Kofi's question.",
        tiles: ['Final', 'year,', 'I', 'know', 'moles'],
        distractors: ['nothing', 'professor'],
      },
      {
        kind: 'mcq',
        prompt: 'The AI says something about moles that disagrees with Kofi\'s textbook. What should he trust?',
        options: [
          { text: 'The textbook, then ask his teacher if he is unsure' },
          { text: 'The AI, because it sounds more confident', why: 'Confidence is not the same as being right.' },
          { text: 'Whichever is shorter', why: 'Length has nothing to do with being right.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of your level is this?',
        groups: ['Your stage', 'What you know', 'Your gap'],
        items: [
          { text: 'First-year university, Economics', group: 0 },
          { text: 'I can read a supply and demand graph', group: 1 },
          { text: "I don't get why the curve shifts", group: 2 },
          { text: 'I know what a mole is', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You have now finished the first five lessons. Which one changed how you ask for help the most?',
    starters: ['The lesson that changed most for me was...', 'Because...'],
  },
  deepen: { title: 'Keep going', summary: 'Use the full recipe on your hardest subject this week, and do one question on your own afterwards.' },
  notes: 'Review only. 36 g H2O ÷ 18 g/mol = 2 mol.',
};

export default lesson;

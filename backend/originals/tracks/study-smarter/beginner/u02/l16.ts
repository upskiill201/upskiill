import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 16 — teach it to Efua: preparing to teach is one of the best ways to learn. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Teach it to Efua',
  summary: "Kofi has 20 minutes in the library to teach Efua limiting reagents. Getting ready to teach makes him understand it better than ever.",
  minutes: 13,
  outcomes: [
    'Plan a 20-minute teaching session with AI help',
    'Make the learner do the thinking, not you',
    'Use teaching to find your own last gaps',
  ],
  learn: [
    {
      kind: 'steps',
      title: "Kofi's 20-minute teaching plan",
      steps: [
        { title: 'Check yourself first (night before)', body: 'Kofi explains limiting reagents back to the AI as a "confused classmate". Two holes appear. He fixes them before teaching anyone.' },
        { title: 'Start from what she knows (2 minutes)', body: 'Efua already gets the jollof version. He starts there: "Remember the tomatoes?"' },
        { title: 'One worked example, with reasons (5 minutes)', body: 'He writes one example on paper, saying WHY at every step. He asked the AI for a good example the night before, and checked it himself.' },
        { title: 'She does one (8 minutes)', body: 'A similar question with different numbers. He stays quiet while she works. Hints only if she\'s stuck twice.' },
        { title: 'She explains it back (5 minutes)', body: '"Teach it back to me." Where she hesitates is where she needs more practice.' },
      ],
    },
    {
      kind: 'text',
      html: '<p>Notice who did the most work in that plan: Efua. A good teacher talks less than you\'d think.</p><p>And notice step 1. <strong>Preparing to teach</strong> made Kofi find two holes in his own understanding. Research suggests that just expecting to teach something can help you learn it better, because you organise it more carefully.</p><p>AI can help you prepare: <em>"I\'m teaching [topic] to a classmate for 20 minutes. Suggest one good worked example and one practice question with different numbers. Don\'t write the explanation for me. I\'ll do that."</em></p>',
    },
    {
      kind: 'check',
      question: 'In the plan, who does most of the thinking?',
      options: ['Kofi', 'Efua, the learner', 'The AI'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi gets ready to teach.',
    items: [
      {
        kind: 'orderLines',
        prompt: "Put Kofi's teaching plan in order.",
        lines: ['Check yourself with the AI the night before', 'Start from what she knows', 'One worked example, with reasons', 'She does a similar one', 'She explains it back'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request helps Kofi prepare without doing his job for him?',
        options: [
          { text: 'Write a lesson I can read out to Efua.', why: 'Then the AI is teaching, and Kofi learns less.' },
          { text: "I'm teaching limiting reagents to a classmate for 20 minutes. Suggest one worked example and one practice question. Don't write the explanation, I'll do that." },
          { text: 'Teach Efua for me.', why: 'Both of them would miss the learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'efua',
        message: "Can you just do this one so I can see how?",
        prompt: 'Kofi already showed one worked example. What is the best reply?',
        options: [
          { text: 'Sure, here is the answer.', why: 'Then she watches again instead of doing.' },
          { text: 'You should already know this.', why: 'Unkind, and it does not help.' },
          { text: "I did one already. Your turn. I'll stay quiet, and give a hint if you get stuck twice." },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Practice question. 2Mg + O₂ → 2MgO. You have 4 moles of Mg and 1 mole of O₂. How many moles of MgO form?',
        answers: ['2', 'two'],
        placeholder: 'Number',
        explanation: '1 mole of O₂ reacts with 2 moles of Mg to make 2 moles of MgO. O₂ is limiting.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good teaching move, or not?',
        groups: ['Good', 'Not great'],
        items: [
          { text: 'Start from what she already knows', group: 0 },
          { text: 'Talk for the whole 20 minutes', group: 1 },
          { text: 'Stay quiet while she works', group: 0 },
          { text: 'Give the answer as soon as she pauses', group: 1 },
          { text: 'Ask her to explain it back', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: "Which part of Clinton's plan for teaching David is a problem?",
        lines: ['Start from what David knows.', 'Show one worked example.', 'Then do five more examples while David watches.'],
        bug: 2,
        fix: 'Then David does one himself, and explains it back.',
        explanation: 'Watching five more is not practice.',
      },
      {
        kind: 'mcq',
        prompt: 'Why did preparing to teach help Kofi himself?',
        options: [
          { text: 'He had to organise it clearly, and that showed him his own gaps' },
          { text: 'Efua told him the answers', why: 'She was the learner.' },
          { text: 'It did not help him, only Efua', why: 'Step 1 found two holes in his understanding.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the teaching rule.',
        template: 'A good teacher talks [[1]] and lets the learner do the [[2]].',
        blanks: [['less'], ['thinking', 'work']],
        distractors: ['more', 'watching'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to its time.',
        pairs: [
          ['Start from what she knows', '2 minutes'],
          ['Worked example', '5 minutes'],
          ['She does one', '8 minutes'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: "Build Kofi's last step.",
        tiles: ['Now', 'teach', 'it', 'back', 'to', 'me'],
        distractors: ['copy', 'watch'],
      },
    ],
  },
  reflect: {
    prompt: 'Plan a 10-minute teaching session for a topic you know well. Who would you teach, and what would they do?',
    starters: ['I would teach... to...', 'They would...'],
  },
  deepen: {
    title: 'Teach someone this week',
    summary: 'Teach one topic to a friend or family member. Prepare with the AI, but let them do the thinking.',
  },
  notes: 'Learning by teaching / expecting to teach: Nestojko, Bui, Kornell & Bjork (2014), Memory & Cognition. Stated as "research suggests". 2Mg + O2: 1 mol O2 limits → 2 mol MgO.',
};

export default lesson;

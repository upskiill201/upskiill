import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18 — you think first, AI second. Miracle's near-miss with a module she let AI do for her. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'You think first, AI second',
  summary: "Miracle tells the group how she nearly failed a module in her second year. The AI did her assignments. It couldn't sit her exam.",
  minutes: 12,
  outcomes: [
    'Explain why "AI did it" is not "I can do it"',
    'Use the think-first rule on homework',
    'Notice when you are leaning on AI too much',
  ],
  learn: [
    {
      kind: 'story',
      title: "Miracle's confession",
      beats: [
        { speaker: 'narrator', text: 'Thursday call. Clinton has just said the AI "basically does my Maths homework now".' },
        { speaker: 'miracle', text: 'Can I tell you a story I am not proud of?' },
        { speaker: 'miracle', text: 'Second year, a programming module. The weekly exercises were hard, so I pasted them into an AI and handed in what it gave me. Full marks, every week.' },
        { speaker: 'miracle', text: 'Then the practical exam. No internet, no AI, just me and a blank screen. I sat there for twenty minutes before I wrote a single line.' },
        { speaker: 'clinton', text: 'So what happened?' },
        { speaker: 'miracle', text: 'I scraped a pass, then spent the whole holiday relearning everything I had "done". My homework said I could code. I couldn\'t.' },
        { speaker: 'tey', text: 'Notice: the AI never made a mistake in this story. It did the exercises perfectly. That was the problem. It got the practice, and Miracle got nothing.' },
      ],
      choice: {
        prompt: 'Clinton has Maths homework tonight. What is the think-first way to use AI?',
        options: [
          {
            text: 'Try every question himself first. Then ask the AI to check his working and explain any he got wrong.',
            outcome: 'Slower tonight. But in the exam, the questions look familiar, because he has actually done them.',
            best: true,
          },
          {
            text: 'Paste the questions in, copy the answers.',
            outcome: "Done in ten minutes, full marks. And in the exam, Miracle's blank screen, in Maths.",
          },
          {
            text: 'Ask the AI to explain each question, then copy its working.',
            outcome: "Better than copying answers, but he still never tried one himself. Reading working isn't doing it.",
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>The rule of this whole course, in full:</p><ol><li><strong>Think first.</strong> Try it yourself: the question, the plan, the first draft, even a bad guess.</li><li><strong>AI second.</strong> Then use AI to explain what you got wrong, check your work, or quiz you.</li></ol><p>A quick test for any study session: <em>at the end, could I do this without the AI?</em> If the answer is no, the AI did the learning, not you.</p><p>Signs you\'re leaning too hard: you open the AI before reading the question, you can\'t explain an answer you handed in, or homework is easy but tests feel impossible.</p>',
    },
    {
      kind: 'check',
      question: 'What is the quick test at the end of a study session?',
      options: ['Did I finish fast?', 'Could I do this without the AI?', 'Did the AI make mistakes?'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'The group decides how to use AI on homework.',
    items: [
      {
        kind: 'mcq',
        prompt: "In Miracle's story, why did she struggle in the exam?",
        options: [
          { text: 'The AI made mistakes in her homework', why: 'It did the homework perfectly. That was the problem.' },
          { text: 'The AI did the practice, so she never learned to do it herself' },
          { text: 'The exam was unfair', why: 'It tested what the homework should have taught her.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Think first, or AI first?',
        groups: ['Think first', 'AI first'],
        items: [
          { text: 'Try the question, then ask the AI to check', group: 0 },
          { text: 'Paste the question in before reading it', group: 1 },
          { text: 'Write a bad first draft, then ask for feedback', group: 0 },
          { text: 'Ask for the essay plan before thinking about it', group: 1 },
          { text: 'Guess why, then ask the AI', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'But my homework marks are great with AI. Why would I make it harder?',
        prompt: 'What should Kofi reply?',
        options: [
          { text: 'Your marks are fake.', why: 'True-ish, but not helpful. Explain why it matters.' },
          { text: 'Keep doing it.', why: "That's Miracle's story." },
          { text: "Because there's no AI in the exam room. Homework is practice. If the AI practises, you don't." },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the quick test.',
        tiles: ['Could', 'I', 'do', 'this', 'without', 'the', 'AI?'],
        distractors: ['faster', 'with'],
      },
      {
        kind: 'findBug',
        prompt: "Which line in David's plan breaks the think-first rule?",
        lines: ['Read the essay question.', 'Ask the AI for a full essay plan.', 'Write the essay from its plan.'],
        bug: 1,
        fix: 'Write my own rough plan, then ask the AI what is missing.',
        explanation: 'The plan is the thinking. If the AI makes it, he skipped the hard part.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the warning sign to what it means.',
        pairs: [
          ['Opening the AI before reading the question', 'AI first, not think first'],
          ["Can't explain an answer you handed in", "The AI learned it, you didn't"],
          ['Homework easy, tests impossible', 'The practice is not yours'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'You think first, AI ... (one word)',
        answers: ['second'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has tried a Chemistry question and got 3 moles, but the book says 1.5. Which request is best?',
        options: [
          { text: 'What is the answer?', why: 'He already has the answer. He needs his mistake.' },
          { text: "Here's my working: [working]. I got 3, the answer is 1.5. Which step did I get wrong?" },
          { text: 'Do this question for me.', why: 'He already tried. Now find his mistake.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s point about the story.',
        template: 'The AI got the [[1]], and Miracle got [[2]].',
        blanks: [['practice', 'practise'], ['nothing']],
        distractors: ['blame', 'everything'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the think-first homework routine in order.',
        lines: ['Read the question', 'Try it yourself, even if unsure', 'Ask the AI to check your working', 'Redo any you got wrong, without help'],
      },
    ],
  },
  reflect: {
    prompt: 'Be honest: is there a subject where your homework is easier than your tests? What would think-first look like there?',
    starters: ['The subject is...', 'Think-first would mean...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'For your next homework, try every question before opening an AI. Then ask it to check, not to do.',
  },
  notes: "Miracle's story is fictional. Principle: generation effect / retrieval practice (learning from producing answers), stated generally.",
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 3 · Lesson 8 — learning a new topic with AI: levels, analogies, explain-back and self-quizzing. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: "Explain it like I'm new here",
  summary: 'Understanding beats summarising. Use AI as a patient tutor, then prove to yourself that you actually get it.',
  minutes: 14,
  outcomes: [
    'Ask for an explanation at the right level',
    'Use analogies, and know where they break',
    'Explain it back and get quizzed, so it sticks',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'From "I read it" to "I get it"',
      html:
        '<p>Reading a summary feels like understanding. Often it is not. The test is simple: could you explain it to a colleague without looking?</p>' +
        '<h3>1. Pick the level</h3>' +
        '<p>"Explain like I\'m new to this team" is very different from "explain like I\'m an engineer". Say who you are: <em>"I\'m a designer with no coding background."</em></p>' +
        '<h3>2. Ask for an analogy, and its limits</h3>' +
        '<p>"An API is like a waiter: you order from the menu, the kitchen does the work, the waiter brings it back." Analogies make ideas stick. But every analogy breaks somewhere, so ask: <em>"Where does this analogy stop being accurate?"</em></p>' +
        '<h3>3. Explain it back</h3>' +
        '<p>Write your own two-sentence explanation and ask: <em>"Is this right? What did I miss or get wrong?"</em> This is a version of the <strong>Feynman technique</strong>: if you cannot explain it simply, you do not understand it yet.</p>' +
        '<h3>4. Get quizzed</h3>' +
        '<p><em>"Ask me 3 questions to check I understand. One at a time. Wait for my answer."</em> Trying to recall something, rather than re-reading it, is one of the best-studied ways to make learning stick.</p>' +
        '<p>Which, you may have noticed, is exactly how Teyro lessons work.</p>',
    },
    {
      kind: 'steps',
      title: "Ada learns what an API is, in 4 minutes",
      steps: [
        { title: 'Level', body: '"I\'m a designer, no coding background. Explain what an API is in 3 sentences."' },
        { title: 'Analogy and limits', body: '"Give me an everyday analogy, then tell me where it stops being accurate."' },
        { title: 'Explain back', body: '"Here\'s my version: an API is how two apps ask each other for things. Is that right? What am I missing?"' },
        { title: 'Quiz', body: '"Ask me 3 questions, one at a time, to check I understand."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: "If you can't explain it simply, you don't understand it yet. Explain it back before you move on.",
    },
    {
      kind: 'check',
      question: 'What is the best test of understanding?',
      options: ['Reading the summary twice', 'Explaining it in your own words without looking', 'Highlighting the text'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is learning new topics quickly with AI.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the learn-it routine.',
        lines: ['Say your level', 'Ask for an analogy and its limits', 'Explain it back', 'Get quizzed'],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask where an analogy stops being accurate?',
        options: [
          { text: 'Every analogy breaks somewhere, and you should know where' },
          { text: 'Analogies are always wrong', why: 'They help a lot; they just have limits.' },
          { text: 'To make the answer longer', why: 'It is about accuracy.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the explain-back request.',
        tiles: ['Is', 'this', 'right?', 'What', 'did', 'I', 'miss?'],
        distractors: ['perfect', 'skip'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Real understanding, or just feels like it?',
        groups: ['Real understanding', 'Just feels like it'],
        items: [
          { text: 'Explaining it to a colleague without notes', group: 0 },
          { text: 'Re-reading the summary three times', group: 1 },
          { text: 'Answering quiz questions correctly', group: 0 },
          { text: 'Highlighting every line', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "My boss wants me to 'get up to speed on SEO' by Friday. I know nothing about it.",
        prompt: 'What should Ada suggest?',
        options: [
          { text: "Tell the AI your level, ask for a simple explanation and an analogy, explain it back, then get it to quiz you." },
          { text: 'Read 10 long articles.', why: 'Slow, and reading is not the same as understanding.' },
          { text: 'Ask for a summary and stop there.', why: 'A summary feels like understanding but often is not.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s level request.',
        template: "I'm a [[1]] with no [[2]] background. Explain what an API is in [[3]] sentences.",
        blanks: [['designer'], ['coding', 'technical'], ['3', 'three']],
        distractors: ['wizard', 'cooking', '300'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the step that skips real learning.',
        lines: ['Ask for a simple explanation.', 'Ask for an analogy and its limits.', 'Assume you understand and move on.', 'Get quizzed.'],
        bug: 2,
        fix: 'Explain it back in your own words and ask what you missed.',
      },
      {
        kind: 'typeAnswer',
        prompt: '"If you can\'t explain it simply, you don\'t understand it" is the ... technique (one name)',
        answers: ['feynman'],
        placeholder: 'One name',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which quiz request works best?',
        options: [
          { text: 'Quiz me.', why: 'On what? How many? It may dump all questions with answers.' },
          { text: 'Ask me 3 questions to check I understand APIs, one at a time. Wait for my answer before the next.' },
          { text: 'Give me 50 questions with answers.', why: 'Seeing the answers skips the recall.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to why it works.',
        pairs: [
          ['Say your level', 'The explanation fits you'],
          ['Analogy', 'The idea sticks'],
          ['Explain back', 'Finds your gaps'],
          ['Quiz', 'Recall makes it last'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good analogy use, or risky?',
        groups: ['Good', 'Risky'],
        items: [
          { text: '"An API is like a waiter" plus where it breaks', group: 0 },
          { text: 'Building a decision on the analogy alone', group: 1 },
          { text: 'Using an analogy to explain to a new colleague', group: 0 },
          { text: 'Assuming the analogy is exactly how it works', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I explained SEO back to the AI and it said I mixed up two things. Embarrassing!',
        prompt: "What's Ada's take?",
        options: [
          { text: "That's the point! Better to find the gap with the AI than in front of your boss." },
          { text: 'Stop explaining things back.', why: 'Finding gaps is the whole value.' },
          { text: 'The AI must be wrong.', why: 'Check, but it may well be right.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Trying to remember something, instead of re-reading it, is called ... practice (one word)',
        answers: ['retrieval', 'recall'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to the level request.',
        pairs: [
          ['Ada, designer', '"No coding background"'],
          ['Grace, new joiner', '"New to this team and its tools"'],
          ['A developer', '"Assume I know the basics"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Teyro quiz you at the end of every lesson?',
        options: [
          { text: 'Recalling what you learned makes it stick far better than re-reading' },
          { text: 'To fill time', why: 'It is how learning lasts.' },
          { text: 'To catch you out', why: 'It is practice, not a trap.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What is one thing at work you think you understand but could not explain simply? Try explaining it here in two sentences.',
    starters: ['The thing is...', 'In two sentences:'],
  },
  deepen: {
    title: 'Go deeper',
    summary: 'Look up "retrieval practice" and "the Feynman technique". Both are simple, well-known ways to learn faster.',
  },
  notes:
    'Retrieval practice (the testing effect) is a well-established finding in learning research; described qualitatively. Feynman technique is a widely used learning heuristic.',
};

export default lesson;

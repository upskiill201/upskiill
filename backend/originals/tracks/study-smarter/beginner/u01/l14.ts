import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 14 — Miracle's trick: the syllabus is the map (coverage, traffic lights, questions per line). */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Study from your syllabus',
  summary: 'Your syllabus lists what can be examined. Miracle turns every line into questions and a traffic light, so nothing surprises her.',
  minutes: 13,
  outcomes: [
    'Use your syllabus as a checklist of what can be examined',
    'Rate each line red, amber or green',
    'Turn syllabus lines into practice questions with AI',
  ],
  learn: [
    {
      kind: 'reading',
      title: "Miracle's trick: the syllabus is the map",
      html: `<p>On Thursday's call, Miracle shares her screen. It's her old school syllabus, every line coloured red, amber or green.</p>
<p>"Your syllabus is the most useful document you own," she says. "It's the list of everything they're allowed to ask you. Most people never read it."</p>
<h3>What a syllabus is</h3>
<p>A syllabus (sometimes called a specification or curriculum) lists the topics and skills your course covers, often line by line: <em>"Calculate the number of moles from a given mass."</em> Your teacher or exam board publishes it. If you don't have it, ask your teacher where to find it.</p>
<h3>The traffic light</h3>
<p>Go through it line by line, and rate yourself honestly:</p>
<ul>
<li><strong>Green:</strong> I could answer a question on this right now, without notes.</li>
<li><strong>Amber:</strong> I sort of get it, but I'd make mistakes.</li>
<li><strong>Red:</strong> I don't get it, or I've never studied it.</li>
</ul>
<p>Now you know where to spend your time: reds first, then ambers. Greens just need a quick quiz now and then.</p>
<h3>Where AI comes in</h3>
<p>Paste in a few lines and ask: <em>"Turn each of these syllabus lines into 2 practice questions at final-year level. One at a time, wait for my answer."</em></p>
<p>Now your quiz covers exactly what you can be examined on. Nothing more, nothing missing. And after the quiz, update your colours: a line only turns green when you get its questions right <strong>without notes</strong>.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Reds first, then ambers. A line turns green only when you can answer it without notes.',
    },
    {
      kind: 'check',
      question: 'Which line should Kofi study first?',
      options: ['A green line', 'An amber line', 'A red line'],
      answer: 2,
    },
  ],
  apply: {
    scenario: 'Kofi colours his Chemistry syllabus.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Red, amber or green?',
        groups: ['Green', 'Amber', 'Red'],
        items: [
          { text: 'I can answer it now, no notes', group: 0 },
          { text: 'I get it but make mistakes', group: 1 },
          { text: "I've never studied this", group: 2 },
          { text: 'I got both quiz questions right, no notes', group: 0 },
          { text: 'I need my notes to answer', group: 1 },
          { text: "I don't understand it at all", group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the syllabus so useful for revision?',
        options: [
          { text: 'It contains the exam questions', why: 'It lists topics, not the actual questions.' },
          { text: "It lists everything you're allowed to be asked" },
          { text: 'It is shorter than the textbook', why: 'True, but that is not the main reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi has three red syllabus lines. Which request is best?',
        options: [
          { text: 'Explain all of chemistry.', why: 'Far too wide.' },
          { text: '[3 syllabus lines] Turn each line into 2 practice questions at final-year level. One at a time, wait for my answer.' },
          { text: 'Which of these lines will be in my exam?', why: "The AI can't know that." },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I don't actually know where my syllabus is. Is it even important?",
        prompt: 'What should Kofi say?',
        options: [
          { text: "Really important, it's the list of what they can ask you. Ask your teacher where to find it." },
          { text: 'Ask the AI to write you one.', why: "It would guess. He needs his course's real syllabus." },
          { text: 'Not important, just study everything.', why: 'Without the list, you will miss things or waste time.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: "Which of Kofi's colours is wrong?",
        lines: [
          'Moles from mass: green (got both questions right, no notes).',
          'Molar mass: green (I read my notes twice).',
          'Limiting reagents: amber (got one of two right).',
        ],
        bug: 1,
        fix: 'Molar mass: amber until I answer questions on it without notes.',
        explanation: 'Reading notes is not a test. Green means right without notes.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which colour do you study first? (one word)',
        answers: ['red'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: "Put Miracle's syllabus routine in order.",
        lines: ['Get your syllabus', 'Rate every line red, amber or green', 'Turn red lines into questions with AI', 'Update the colours after the quiz'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the colour to what you do with it.',
        pairs: [
          ['Red', 'Study it first'],
          ['Amber', 'Study it next'],
          ['Green', 'A quick quiz now and then'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's request.",
        template: 'Turn each of these [[1]] lines into 2 practice [[2]] at final-year level.',
        blanks: [['syllabus'], ['questions']],
        distractors: ['textbook', 'answers'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the green rule.',
        tiles: ['Green', 'means', 'right', 'without', 'notes'],
        distractors: ['after', 'reading'],
      },
    ],
  },
  reflect: {
    prompt: 'Find the syllabus for one of your subjects. How many lines would you honestly colour red right now?',
    starters: ['The subject is...', 'My red lines are about...'],
  },
  deepen: {
    title: 'Colour one page',
    summary: 'Colour one page of your syllabus red, amber or green. Turn your reds into AI questions this week.',
  },
  notes: 'Traffic-light self-assessment (RAG) is a common classroom technique. No claims about any specific exam board.',
};

export default lesson;

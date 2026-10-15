import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Reading: the first ten seconds decide (thin slices, first impressions). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'The first ten seconds decide',
  summary: 'Arjun sends Ada an article with one line underlined: "People decide fast." Ada reads it on the bus home, and realises she lost Mrs Adeyemi before floor 3.',
  minutes: 12,
  outcomes: [
    'Know what research says about first impressions',
    'Understand why your opening line matters most',
    'Write an opening that earns the next ten seconds',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'People decide fast',
      html: "<p>Ada's bus is stuck in Lagos traffic, so she reads the whole thing.</p><h3>Thin slices</h3><p>In 1993, psychologists Nalini Ambady and Robert Rosenthal showed students silent video clips of teachers, some as short as a few seconds. The students rated the teachers. Their quick ratings matched, surprisingly well, the ratings from the teachers' real students at the end of a whole term.</p><p>Later research found something even faster. In a 2006 study by Janine Willis and Alexander Todorov, people formed impressions of faces, such as how trustworthy someone seemed, after seeing them for just a tenth of a second. Looking for longer mostly made them more confident in the same judgement.</p><h3>What this means for a pitch</h3><p>It doesn't mean first impressions are always right. They're often wrong. It means they happen <strong>fast</strong>, and people then listen for evidence that agrees with them.</p><p>So your first ten seconds matter more than any other ten. In the lift, Mrs Adeyemi's first ten seconds of Ada were: <em>\"Oh! Um. Hi. So, it's built in Python...\"</em> By floor 3, she'd filed Ada under \"technical, unclear\".</p><h3>How to win the first ten seconds</h3><ul><li><strong>Start with your one sentence</strong>, or a short hook (Chapter 3).</li><li><strong>Skip the warm-up</strong>: no \"so, um, basically\".</li><li><strong>Look at them</strong>, not at your phone.</li><li><strong>Smile, and breathe first.</strong> A one-second pause before you start makes you look calm, even if you aren't.</li></ul>",
    },
    {
      kind: 'check',
      question: 'In the 2006 face study, how quickly did people form impressions?',
      options: ['In about a tenth of a second', 'After about ten minutes', 'Only after a full conversation'],
      answer: 0,
      explanation: 'Impressions formed after a tenth of a second; longer looks mostly boosted confidence in the same judgement.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'First impressions are fast, not always fair. Make your first ten seconds count: one clear sentence, no warm-up.',
    },
  ],
  apply: {
    scenario: 'The bus home. Reading Arjun\'s article.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did the "thin slices" teacher study find?',
        options: [
          { text: 'Nobody could judge anything from short clips', why: 'The opposite.' },
          { text: 'Only the sound mattered', why: 'The clips were silent.' },
          { text: 'Ratings from short silent clips matched end-of-term student ratings surprisingly well' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Does this research mean first impressions are always RIGHT?',
        options: [
          { text: 'No: they\'re fast, not always accurate, and people then look for evidence that agrees' },
          { text: 'Yes, always', why: 'They\'re often wrong.' },
          { text: 'They don\'t exist', why: 'They exist, and form fast.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong first ten seconds, or weak?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Your one sentence, looking at them', group: 0 },
          { text: '"So, um, basically, okay..."', group: 1 },
          { text: 'A breath and a smile, then the point', group: 0 },
          { text: 'Reading from your phone', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So Mrs Adeyemi decided about me by floor 3? That\'s so unfair.',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'It\'s hopeless now.', why: 'There are 32 floors and five weeks.' },
          { text: 'Unfair, maybe. But now you know: open with your sentence and you\'ll start the next lift ride ahead.' },
          { text: 'Judges are always right.', why: 'First impressions are often wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The study that used short clips of teachers is known as "thin ___". (one word)',
        answers: ['slices', 'slice'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a strong opening in order.',
        lines: ['Breathe', 'Look at them and smile', 'Say your one sentence', 'Pause'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s new opening. Which line wastes the first ten seconds?',
        lines: [
          '(breath, smile)',
          '"So, um, okay, basically, how do I start this..."',
          '"I help office savings groups track who\'s paid."',
        ],
        bug: 1,
        fix: 'Go straight to the one sentence.',
        explanation: 'The warm-up fills the most important seconds with nothing.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Feature', 'What it has'],
          ['Benefit', 'What it does for them'],
          ['60 seconds', 'About 140 words'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The opening rule.',
        template: 'First impressions are [[1]], not always [[2]]. Make your first ten seconds [[3]].',
        blanks: [['fast', 'quick'], ['fair', 'right', 'accurate'], ['count']],
        distractors: ['slow', 'warm-up'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the advice.',
        tiles: ['Start', 'with', 'your', 'one', 'sentence.'],
        distractors: ['um,'],
      },
    ],
  },
  reflect: {
    prompt: 'What are the first ten seconds of your pitch right now? Rewrite them so they start with what matters.',
    starters: ['My first ten seconds now: ...', 'New version: ...'],
  },
  deepen: {
    title: 'Record your first ten seconds',
    summary: 'Record only the first ten seconds of your pitch on your phone. Watch it as if you were a stranger. What impression would you form?',
  },
  notes: 'Ambady & Rosenthal (1993), Journal of Personality and Social Psychology 64(3): thin slices of teacher behaviour (silent clips, 2–30 s) predicted end-of-semester evaluations. Willis & Todorov (2006), Psychological Science 17(7): judgements of faces after 100 ms; more exposure mostly increased confidence. Lesson stresses fast ≠ accurate.',
};

export default lesson;

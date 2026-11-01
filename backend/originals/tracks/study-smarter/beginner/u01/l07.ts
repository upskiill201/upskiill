import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7 — your textbook first, AI second: ground the AI in your own material. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Your textbook first, AI second',
  summary: 'Paste in the paragraph you are stuck on, and the AI explains YOUR material, in your exam\'s words, instead of its own.',
  minutes: 13,
  outcomes: [
    'Give the AI your own material to explain',
    'Keep its answer in your exam\'s words and methods',
    'Ask it to point to where its answer comes from',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why your own material beats a blank question',
      html: `<p>On Tuesday, Kofi asks the AI how to find molar mass. It explains a method that is correct but uses a different symbol from his textbook, and a different way of setting out the working. Mrs Asante marks that layout down in the test.</p>
<p><strong>The AI didn't know which textbook he uses.</strong> When you ask a blank question, it explains the topic the most common way it has seen. That might not be the way your course does it.</p>
<h3>Start from your material</h3>
<p>So flip it around. Start with <em>your</em> material, and ask the AI to explain that:</p>
<ul>
<li><strong>A paragraph from your textbook</strong> you don't understand.</li>
<li><strong>A line from your syllabus</strong>: "Calculate the number of moles from a given mass."</li>
<li><strong>Your teacher's worked example</strong> from your class notes.</li>
</ul>
<p>Then ask: <em>"Explain this paragraph in simpler words. Use the same symbols and method as the text."</em></p>
<h3>Why it works</h3>
<p>The AI now explains <strong>your</strong> method, in <strong>your</strong> course's words. And because the answer is tied to text you can see, it's much easier to check. If it adds something the paragraph doesn't say, ask: <em>"Where in the paragraph does it say that?"</em></p>
<p><strong>Keep it to what you need:</strong> a paragraph or a page, not a whole book. And only paste material you're allowed to share. Your own notes and a short extract to study from are normally fine.</p>`,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: "Your material first, AI second. It explains your textbook in your exam's words, and you can check it against the page.",
    },
    {
      kind: 'check',
      question: 'Why did Kofi lose marks after his blank question?',
      options: ['The method was wrong', "It used a different method from his course, and he didn't notice", 'He used too many words'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi brings his textbook into the chat.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Kofi is stuck on a textbook paragraph about molar mass. Which question is best?',
        options: [
          { text: 'Explain molar mass.', why: 'A blank question: the AI uses its own method, not his course\'s.' },
          { text: '[pastes the paragraph] Explain this in simpler words. Use the same symbols and method as the text.' },
          { text: '[pastes the whole textbook] Explain chemistry.', why: 'Far too much. Give it the part you need.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good material to start from, or not?',
        groups: ['Good to start from', 'Not a good idea'],
        items: [
          { text: 'The paragraph you are stuck on', group: 0 },
          { text: 'A line from your syllabus', group: 0 },
          { text: "Your teacher's worked example", group: 0 },
          { text: 'An entire textbook', group: 1 },
          { text: "A classmate's private messages", group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'When the AI adds something the paragraph doesn\'t say, ask: "Where in the ... does it say that?" (one word)',
        answers: ['paragraph', 'text', 'textbook'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s answer should Kofi question?',
        lines: [
          'The paragraph says molar mass is the mass of one mole.',
          'It shows water as 18 g/mol, from H = 1 and O = 16.',
          'It also says you must always round to 3 decimal places in exams.',
        ],
        bug: 2,
        fix: 'Ask: "Where in the paragraph does it say that?" Then check what his teacher wants.',
        explanation: "The paragraph never said it. The AI added a rule his course might not use.",
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Before you ask the AI anything, what does your textbook say?',
        prompt: 'Miracle asks this on every call. What does she want Kofi to do?',
        options: [
          { text: 'Stop using AI', why: 'She uses AI too. She wants it grounded in his course.' },
          { text: 'Start from his own course material, then ask the AI to explain it' },
          { text: 'Read the whole textbook first', why: 'Just the part he is stuck on.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the instruction that keeps the AI on Kofi\'s method.',
        tiles: ['Use', 'the', 'same', 'symbols', 'and', 'method', 'as', 'the', 'text'],
        distractors: ['your', 'favourite'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you paste to how you\'d use it.',
        pairs: [
          ['A textbook paragraph', '"Explain this in simpler words"'],
          ['A syllabus line', '"What do I need to know for this?"'],
          ["Your teacher's worked example", '"Walk me through each step"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is an answer based on your own material easier to check?',
        options: [
          { text: 'You can compare it line by line with the page in front of you' },
          { text: 'The AI is never wrong about textbooks', why: 'It can still add or change things. That\'s why you check.' },
          { text: 'It is shorter', why: 'Not always. The point is you have the source.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: "Complete Kofi's question.",
        template: 'Here is a paragraph from my [[1]]: [paragraph]. Explain it in [[2]] words, using the same method as the [[3]].',
        blanks: [['textbook'], ['simpler', 'simple', 'plain'], ['text', 'textbook', 'paragraph']],
        distractors: ['harder', 'internet'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "textbook first" routine in order.',
        lines: ['Find the part you are stuck on', 'Paste just that part', 'Ask it to explain using the same method', 'Check its answer against the page'],
      },
    ],
  },
  reflect: {
    prompt: 'Which subject do you study from a set textbook or notes? What paragraph would you paste in first?',
    starters: ['The subject is...', 'The paragraph I am stuck on is about...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Take one paragraph you find hard, paste it in, and ask for a simpler explanation using the same method. Check every line against the page.',
  },
  notes: 'Grounding the AI in supplied text reduces (but does not remove) made-up content; Chapter 5 covers checking. The "3 decimal places" rule is a fictional example of an added rule. Copyright note kept general: short extracts for personal study.',
};

export default lesson;

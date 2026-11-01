import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Before / After: asking for changes, not restarts. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Change it, don\'t restart it',
  summary: 'Benny looks at Hazel\'s page: "It\'s kinda boring, Miss B." She types "make it better", and it changes the colours, the words, the layout and her price. One small request at a time works better.',
  minutes: 11,
  outcomes: [
    'Ask for one specific change at a time',
    'Say what to keep the same',
    'Point at the exact part you mean',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to ask for a change',
      before: { label: 'Vague', text: 'make it better' },
      after: { label: 'Specific', text: 'Make the "Book a lesson" button bigger and gold, like our band shirts. Keep everything else the same.' },
      notes: [
        '"Better" means something different to everyone. The AI will guess, and change lots of things.',
        'The specific version names one thing ("Book a lesson" button) and exactly how to change it (bigger, gold).',
        '"Keep everything else the same" protects the parts that were already right, like the price.',
      ],
    },
    {
      kind: 'text',
      html: '<p>Three habits for every change:</p><ul><li><strong>One change per message.</strong> Easy to check, easy to undo.</li><li><strong>Point at it.</strong> Use the words on the page ("the About me section") so it knows exactly where.</li><li><strong>Say what stays.</strong> "Keep everything else the same."</li></ul><p>Then refresh the page in your browser and look. Did it do what you asked, and only that?</p>',
    },
    {
      kind: 'check',
      question: 'Which request is easiest to check afterwards?',
      options: ['make it better', 'Change the heading to "Trumpet lessons with Miss B". Keep everything else the same.', 'fix the design and the words and add more stuff'],
      answer: 1,
      explanation: 'One clear change: you can see in a second whether it happened.',
    },
  ],
  apply: {
    scenario: 'Benny\'s design notes.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Benny: "The heading is boring." Which request is best?',
        options: [
          { text: 'Make the heading less boring', why: 'It will guess what "less boring" means.' },
          { text: 'Redo the whole page', why: 'Throws away everything that was right.' },
          { text: 'Change the heading to "Trumpet lessons with Miss B" in a bold serif font. Keep everything else the same.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which request is the risky one?',
        lines: [
          'Make the email link bigger.',
          'Add a photo spot at the top of the About me section.',
          'Change everything to look more modern.',
          'Move the price above the times.',
        ],
        bug: 2,
        fix: 'Name one thing to change and how.',
        explanation: '"Everything" invites it to change the parts that were already right.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'Make the "Book a lesson" button gold', group: 0 },
          { text: 'Make it pop', group: 1 },
          { text: 'Add a line under the price: "First lesson half price"', group: 0 },
          { text: 'Improve the vibe', group: 1 },
          { text: 'Fix it', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the safety phrase.',
        template: 'Make the button gold. [[1]] everything [[2]] the same.',
        blanks: [['Keep'], ['else']],
        distractors: ['Change', 'more'],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I asked it to "make it better" and now the price says $45!',
        prompt: 'Hazel\'s fix?',
        options: [
          { text: 'Tell it: "The price must be $30. Change only that."' },
          { text: 'Delete the whole folder and start again.', why: 'One wrong line doesn\'t need a restart.' },
          { text: 'Ask it to "make it better" again.', why: 'Same vague request, new random changes.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a precise change request.',
        tiles: ['In the About me section,', 'add one line:', '"I\'ve played trumpet for 20 years."', 'Keep everything else the same.'],
        distractors: ['Make it better.', 'Change the colours.'],
      },
      {
        kind: 'mcq',
        prompt: 'After asking for a change, what should Hazel do next?',
        options: [
          { text: 'Ask for five more changes straight away', why: 'Check each one first, so you know what did what.' },
          { text: 'Refresh the page and check it did that, and only that' },
          { text: 'Trust it and move on', why: 'Look first. It takes ten seconds.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to why it helps.',
        pairs: [
          ['One change per message', 'Easy to check and undo'],
          ['Point at it', 'It knows exactly where'],
          ['Say what stays', 'Protects what was already right'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Hazel changed the page. What does she do in the browser to see the new version?',
        answers: ['refresh', 'reload', 'refresh the page', 'reload the page'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Hazel wants three changes. Best approach?',
        options: [
          { text: 'One message with all three, plus "and anything else you think"', why: '"Anything else" invites surprises.' },
          { text: '"Do the three things we talked about"', why: 'It doesn\'t know what you talked about with Benny.' },
          { text: 'Three messages, one change each, checking the page after each one' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone asked you to "make it better" (at work, school, home). What did you wish they\'d said instead?',
    starters: ['They said...', 'I wish they\'d said...'],
  },
  deepen: {
    title: 'On your computer: three changes',
    summary: 'In your my-site folder, run claude. Ask for three small changes, one per message, each ending with "Keep everything else the same." Refresh your page after each one and check.',
  },
  notes: 'General prompting practice; no tool-specific facts.',
};

export default lesson;

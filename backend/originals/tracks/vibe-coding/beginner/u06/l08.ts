import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 6 · Lesson 8. Reading: when to take over. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'When to take over',
  summary: 'The AI has tried three times to move the "Drive" button two pixels left. Ruth leans over, opens the file, changes one number and saves. "Sometimes the fastest AI is your own hand."',
  minutes: 12,
  outcomes: [
    'Know the signs it\'s time to stop asking the AI',
    'Make a tiny edit yourself in a code editor',
    'Know when to ask a human instead',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Four times to take the wheel',
      html:
        '<p>The AI is your fastest typist, not your only option. Take over when:</p>' +
        '<ol><li><strong>The change is tiny and you can see it.</strong> A word, a number, a colour. Open the file in a code editor (VS Code is free), change it, save, refresh. Ten seconds.</li>' +
        '<li><strong>It has failed at the same thing twice.</strong> A third try usually means a third guess. Stop, get evidence, or do it yourself.</li>' +
        '<li><strong>You understand it better than it does.</strong> Hazel knows the gig list. If the AI keeps getting "who drives what" wrong, she writes the rule out in plain words, with examples.</li>' +
        '<li><strong>It needs a human decision.</strong> "Should parents see each other\'s phone numbers?" is Ruth\'s and Hazel\'s call, not the AI\'s.</li></ol>' +
        '<p><strong>And when you\'re stuck for real, ask a person.</strong> Ruth, a friend who codes, a forum. Bring the same evidence: error, recipe, what you\'ve tried. Good questions get good help.</p>' +
        '<p>One rule when you edit by hand: Claude Code\'s rewind can\'t undo your own edits. Commit before, so git can.</p>',
    },
    {
      kind: 'check',
      question: 'The AI has failed to change a button colour twice. What now?',
      options: ['Ask a third time, louder', 'Change the colour yourself in the file', 'Give up on the button'],
      answer: 1,
      explanation: 'Tiny, visible, already failed twice: your own hand is faster.',
    },
  ],
  apply: {
    scenario: 'Taking the wheel.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Do it yourself, or ask the AI?',
        groups: ['Do it yourself', 'Ask the AI'],
        items: [
          { text: 'Fix a typo: "Satruday"', group: 0 },
          { text: 'Add a whole new sign-up form', group: 1 },
          { text: 'Change $30 to $35', group: 0 },
          { text: 'Connect a new table to the page', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which decision belongs to humans, not the AI?',
        options: [
          { text: 'Which HTML tag to use', why: 'The AI can decide that.' },
          { text: 'Whether parents can see each other\'s phone numbers' },
          { text: 'How to name a variable', why: 'Small technical choice, fine for the AI.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'I\'m scared to edit code myself. What if I break it?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Commit first. Then, if you break it, git restore puts it back.' },
          { text: 'Then never touch it.', why: 'Tiny edits are a great way to learn, with git as a net.' },
          { text: 'Ask the AI to stop you.', why: 'Git is the safety net.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Hazel edits gigs.js by hand. Which line has her typo?',
        lines: ['const title = "Jazz brunch";', 'const place = "Audubon Park";', 'const drivers_needed = "three;'],
        bug: 2,
        fix: 'const drivers_needed = 3;',
        explanation: 'A missing closing quote breaks the file. (And a number doesn\'t need quotes.)',
        language: 'javascript',
      },
      {
        kind: 'fillBlank',
        prompt: 'The hand-edit rule.',
        template: '[[1]] before you edit by hand. Rewind can\'t undo [[2]] edits.',
        blanks: [['Commit'], ['your own', 'my own', 'manual']],
        distractors: ['Delete', 'its'],
      },
      {
        kind: 'mcq',
        prompt: 'It has failed the same fix twice. What does a third try usually give you?',
        options: [
          { text: 'The right answer, by luck', why: 'Usually a third guess.' },
          { text: 'A third guess. Time to stop and get evidence, or do it yourself' },
          { text: 'A bigger plan', why: 'It\'s more of the same guessing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which free code editor does the lesson name?',
        answers: ['vs code', 'vscode', 'visual studio code'],
        placeholder: 'Name',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the move.',
        pairs: [
          ['Tiny visible change', 'Edit it yourself'],
          ['Failed twice', 'Stop and get evidence'],
          ['A people decision', 'Hazel and Ruth decide'],
          ['Really stuck', 'Ask a person, with evidence'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'You want my help? Then bring me what you\'d bring the AI.',
        prompt: 'What does Hazel bring?',
        options: [
          { text: '"It\'s broken, help."', why: 'Ruth needs evidence too.' },
          { text: 'Her laptop and a sad face.', why: 'Evidence helps more.' },
          { text: 'The exact error, the recipe, and what she\'s already tried.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 4: Hazel\'s hand edit broke the page and isn\'t committed. Fastest way back?',
        options: [
          { text: 'git restore on that file' },
          { text: 'Rewind', why: 'Rewind can\'t undo your own edits.' },
          { text: 'Rewrite it from memory', why: 'git restore is exact.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who could you ask for help when you\'re stuck? Write down one person or place.',
  },
  deepen: {
    title: 'On your computer: one hand edit',
    summary: 'Install VS Code (code.visualstudio.com) if you don\'t have an editor. Commit, then open your project and change one word on a page by hand. Save, refresh, check. Commit it with a message.',
  },
  notes: 'Claude Code checkpoints do not track manual edits made outside it (code.claude.com checkpointing, October 2026). VS Code is free from code.visualstudio.com.',
};

export default lesson;

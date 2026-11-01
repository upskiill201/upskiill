import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Card deck: checkpoints and rewind, and their limits. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Checkpoints and rewind',
  summary: 'How did Hazel get the thermometer back at 12:20 a.m.? Two taps of Esc. Here\'s what checkpoints save, how to rewind, and the one kind of change they can\'t undo.',
  minutes: 11,
  outcomes: [
    'Open the rewind menu with Esc Esc or /rewind',
    'Choose to restore code, conversation, or both',
    'Know what checkpoints can\'t undo',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p>Before each message you send, Claude Code saves a <strong>checkpoint</strong>: a snapshot of the files it has edited.</p><p>To go back, press <strong>Esc twice</strong> (with an empty input box) or type <strong>/rewind</strong>. You\'ll see your earlier messages. Pick one, then choose:</p><ul><li><strong>Restore code and conversation</strong>: back to that moment completely.</li><li><strong>Restore code</strong>: files go back, chat stays.</li><li><strong>Restore conversation</strong>: chat goes back, files stay.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Checkpoints don\'t undo changes made by commands it ran in the terminal (like deleting a file with a command), or edits you made yourself outside it. The official docs say it plainly: checkpoints are not a replacement for version control. That\'s git, next lesson.',
    },
    {
      kind: 'check',
      question: 'Hazel wants her files back but wants to keep the chat. Which option?',
      options: ['Restore code', 'Restore conversation', 'Never mind'],
      answer: 0,
      explanation: 'Restore code puts files back and leaves the chat as it is.',
    },
  ],
  apply: {
    scenario: 'Rewinding midnight.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When does Claude Code save a checkpoint?',
        options: [
          { text: 'Once a week', why: 'Much more often.' },
          { text: 'Only when you ask', why: 'It\'s automatic.' },
          { text: 'Before each message you send' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Type the command that opens the rewind menu.',
        answers: ['/rewind', 'rewind'],
        placeholder: '/...',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rewind option to what it does.',
        pairs: [
          ['Restore code and conversation', 'Back to that moment completely'],
          ['Restore code', 'Files back, chat stays'],
          ['Restore conversation', 'Chat back, files stay'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Can a checkpoint undo it?',
        groups: ['Checkpoint can undo', 'Needs git'],
        items: [
          { text: 'A file Claude Code edited', group: 0 },
          { text: 'A file deleted by a terminal command', group: 1 },
          { text: 'An edit you made yourself in another editor', group: 1 },
          { text: 'Two files it changed in one message', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'So we have rewind. We don\'t need git, right?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Right, rewind is enough.', why: 'Rewind misses command changes and your own edits, and lives only in the tool.' },
          { text: 'Rewind is a quick undo inside the tool. Git is the real save: it catches everything and works with any tool.' },
          { text: 'We don\'t need either.', why: 'Midnight says otherwise.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The shortcut.',
        template: 'Press [[1]] twice with an [[2]] input box to open rewind.',
        blanks: [['Esc', 'escape'], ['empty']],
        distractors: ['Enter', 'full'],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel ran a command that deleted old-photos/. Can rewind bring it back?',
        options: [
          { text: 'Yes, rewind undoes everything', why: 'Not changes made by terminal commands.' },
          { text: 'Probably not: changes made by commands aren\'t tracked by checkpoints. That\'s why git matters' },
          { text: 'Only on Mondays', why: 'It\'s about how the change was made.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s notes is wrong?',
        lines: [
          'Esc Esc or /rewind opens the menu.',
          'Checkpoints are saved before each message.',
          'Checkpoints replace git completely.',
          'I can restore code, chat, or both.',
        ],
        bug: 2,
        fix: 'Checkpoints are a quick undo; git is the real save.',
        explanation: 'The official docs say checkpoints are not a replacement for version control.',
      },
      {
        kind: 'orderLines',
        prompt: 'Rewinding the midnight change, in order.',
        lines: [
          'Clear the input box',
          'Press Esc twice',
          'Pick the message before "make it look professional"',
          'Choose Restore code',
          'Open the page and check the thermometer is back',
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review: after any restore, what\'s the last step?',
        options: [
          { text: 'Check it: open the page and run the tests' },
          { text: 'Trust it', why: 'Check, as always.' },
          { text: 'Make another big change', why: 'Check first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When would you use rewind instead of asking the AI to "undo that"?',
  },
  deepen: {
    title: 'On your computer: rewind once',
    summary: 'In your project, ask for a small change you don\'t want (like "make the heading purple"). Approve it. Then press Esc twice, pick the message before it, choose Restore code, and check your page is back.',
  },
  notes: 'code.claude.com checkpointing (October 2026): checkpoint before each prompt; Esc Esc (empty input) or /rewind; options Restore code and conversation / conversation / code / summarize; cannot undo Bash-only file changes, external manual edits; "not a replacement for version control". Option names may vary slightly by version.',
};

export default lesson;

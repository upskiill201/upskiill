import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14 — Stopping halfway on purpose. */

const MSG_PLAIN = 'Write morning_message in board/message.py: takes the list of order ids and returns one line for Brian. Only change board/message.py. Done when all tests pass.';
const START = `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nPracticeAgent().run(${JSON.stringify(MSG_PLAIN)}, project)\nmessage = project.load("board.message")\n`;

const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Stop halfway on purpose',
  summary: 'Step 3 is the morning message. Before going on, Remi stops and shows it to Brian. Brian tries it on a quiet day with nothing at risk, and gets "0 deliveries at risk today: ."',
  minutes: 11,
  outcomes: [
    'Plan deliberate stops to show work to people',
    'Find the cases tests didn\'t think of',
    'Fix the brief, not just the code',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Small steps give you natural places to stop. Use them: show the work to the people who\'ll use it before building on top.', replies: ['Show Brian the message?'] },
        { tey: 'Exactly. On a normal day: "Good morning! 6 deliveries at risk today: D-1002, D-1004..." Fine. Brian asks: what about a quiet day?', replies: ['What happens?'] },
        { tey: '"Good morning! 0 deliveries at risk today: ." Nobody wrote a test for an empty list, and the brief never mentioned it. Brian found it in ten seconds.', replies: ['So I fix the code?'] },
        { tey: 'Fix the brief: add "If none are at risk, say so." Restore your checkpoint, run the step again, and the code handles it. The brief keeps the decision for next time.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Normal day, quiet day',
      caption: 'The message step without the empty case.',
      code: START + '\nprint(message.morning_message(["D-1002", "D-1004", "D-1008"]))\nprint(message.morning_message([]))\n',
      challenge: 'Add "If none are at risk, say so." to the brief and run it again.',
    },
  ],
  apply: {
    scenario: 'Show it before you build on it.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the message for a quiet day (an empty list), using the step without the empty case',
        starter: START,
        solution: START + 'print(message.morning_message([]))\n',
        hint: 'message.morning_message([])',
        checks: [{ message: 'Print the awkward quiet-day message', outputEquals: 'Good morning! 0 deliveries at risk today: .' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why stop and show Brian before the next step?',
        options: [
          { text: 'To slow the project down', why: 'It saves time by catching problems early.' },
          { text: 'He uses it, so he spots problems the tests never thought of' },
          { text: 'Because the agent needs a break', why: 'It\'s for the people, not the agent.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Add the empty case to the brief, run it on a fresh project, and print the quiet-day message',
        starter: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nbrief = ${JSON.stringify(MSG_PLAIN)}\nPracticeAgent().run(brief, project)\nprint(project.load("board.message").morning_message([]))\n`,
        solution: `from teyro_agent import Project, PracticeAgent\n\nproject = Project()\nbrief = ${JSON.stringify(MSG_PLAIN)} + " If none are at risk, say so."\nPracticeAgent().run(brief, project)\nprint(project.load("board.message").morning_message([]))\n`,
        hint: 'Add " If none are at risk, say so." to the brief',
        checks: [{ message: 'Print Good morning! No deliveries at risk today.', outputEquals: 'Good morning! No deliveries at risk today.' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'A good place to stop and show someone, or not?',
        groups: ['Stop and show', 'Keep going'],
        items: [
          { text: 'The message Brian will read every day is ready', group: 0 },
          { text: 'You fixed a typo in a comment', group: 1 },
          { text: 'The morning list works on the sample', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the day to the message.',
        pairs: [
          ['Normal day', '6 deliveries at risk today: ...'],
          ['Quiet day, no empty case', '0 deliveries at risk today: .'],
          ['Quiet day, with the empty case', 'No deliveries at risk today.'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: '"0 deliveries at risk today: ." looks broken.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'There will never be a quiet day.', why: 'There will, and Brian will see this.' },
          { text: 'That\'s how computers talk.', why: 'It\'s a missing case, easy to fix.' },
          { text: 'Good catch. I\'ll add "If none are at risk, say so." to the brief, redo this step, and show you again.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'ids = []\nprint(f"{len(ids)} at risk: {\', \'.join(ids)}.")',
        language: 'python',
        options: [
          { text: '0 at risk: .' },
          { text: 'No deliveries at risk.', why: 'There\'s no special case for an empty list.' },
          { text: 'An error', why: 'Joining an empty list gives an empty string.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix, in the brief.',
        template: 'If [[1]] are at risk, say [[2]].',
        blanks: [['none'], ['so']],
        distractors: ['all', 'nothing'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s fix loses the decision for next time?',
        lines: [
          'Restore the checkpoint from before step 3.',
          'Edit board/message.py by hand to handle the empty list.',
          'Run the tests.',
          'Show Brian again.',
        ],
        bug: 1,
        fix: 'Add "If none are at risk, say so." to the brief and rerun the step.',
        explanation: 'A hand fix works once; the brief keeps the decision.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who found the quiet-day problem?',
        answers: ['Brian', 'brian'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Who would spot problems in your work fastest, if you showed it to them halfway?',
    starters: ['I\'d show...', 'They\'d spot...'],
  },
  deepen: {
    title: 'Empty, one, many',
    summary: 'Testers check lists with zero items, one item and many items. The "zero" case is the one everyone forgets. Chapter 5 turns it into a test.',
  },
  notes: 'Practice agent message step without the empty case: morning_message([]) -> "Good morning! 0 deliveries at risk today: ."; with "If none are at risk, say so." -> "Good morning! No deliveries at risk today."',
};

export default lesson;

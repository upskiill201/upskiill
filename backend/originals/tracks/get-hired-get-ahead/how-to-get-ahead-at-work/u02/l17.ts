import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 17 — story choice: overloaded after saying yes to everything. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Too much on the plate',
  summary: 'Month five. Goal 1, sync status updates, Kemi, the payout fix, two code-review rotations, and a "small favour" for finance. Clinton is answering messages at midnight and his tests are getting sloppy. Something has to give.',
  minutes: 11,
  outcomes: ['Recognise overload before it causes mistakes', 'Renegotiate priorities with your manager', 'Drop or hand off work openly'],
  learn: [
    {
      kind: 'story',
      title: 'Midnight',
      beats: [
        { speaker: 'narrator', text: 'Month five, 11:48pm. Clinton is answering a finance question, half-asleep. Yesterday he pushed a change with a missing test. Paul caught it.' },
        { speaker: 'clinton', text: 'I said yes to everything because I wanted to be valuable. Now I\'m doing everything badly.' },
        { speaker: 'tey', text: 'Overload is common for people who care. The fix usually isn\'t working harder; it\'s deciding together what matters most, and letting the rest go openly.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Bring his full list to Ngozi, ask which two things matter most, and agree what to drop or hand off.',
            outcome: 'Ngozi takes one look: "You\'re doing two people\'s jobs. Drop the second review rotation, hand the finance favour back, keep Goal 1 and the payout fix." He sleeps that night.',
            best: true,
          },
          {
            text: 'Keep going: he\'ll catch up at the weekend.',
            outcome: 'The weekend disappears. Monday he misses a bug that reaches drivers. Overload became a real mistake.',
          },
          {
            text: 'Quietly stop doing some things without telling anyone.',
            outcome: 'Finance waits for an answer that never comes. Kemi doesn\'t know he\'s stopped reviewing her code. Trust drops on two fronts.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Overloaded? Bring the full list to your manager. Agree the top priorities. Drop or hand off the rest, openly.',
    },
  ],
  apply: {
    scenario: 'Clinton is overloaded.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the usual fix for overload?',
        options: [
          { text: 'Deciding together what matters most, and letting the rest go openly' },
          { text: 'Working harder', why: 'That led to sloppy tests.' },
          { text: 'Quitting', why: 'Renegotiate priorities first.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of overload, or normal busy?',
        groups: ['Overload', 'Normal busy'],
        items: [
          { text: 'Answering messages at midnight most nights', group: 0 },
          { text: 'A full but manageable day', group: 1 },
          { text: 'Tests getting sloppy', group: 0 },
          { text: 'One late night before a launch', group: 1 },
          { text: 'Forgetting promises', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Ngozi.',
        from: 'clinton',
        message: 'How do I bring this up with Ngozi?',
        options: [
          { text: '"Here\'s everything I\'m doing. I\'m stretched and my quality is slipping. Which two matter most, and what can I drop or hand off?"' },
          { text: '"I\'m fine!" (he isn\'t)', why: 'Be honest early.' },
          { text: '"Everyone gives me too much."', why: 'Bring the list and ask for priorities.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the choice that damages trust.',
        lines: ['Brings the full list to Ngozi.', 'Silently stops reviewing Kemi\'s code.', 'Hands the finance favour back with a note.'],
        bug: 1,
        explanation: 'Dropping work silently leaves people waiting. Tell them.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s steps in order.',
        lines: ['Write down everything he\'s doing', 'Bring it to Ngozi', 'Agree the top priorities', 'Tell people what he\'s dropping or handing off'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Renegotiate with Ngozi', 'A manageable plan, and sleep'],
          ['Keep going', 'A bug reaches drivers'],
          ['Drop things silently', 'People left waiting'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Ngozi say Clinton was doing?',
        options: [
          { text: '"Two people\'s jobs"' },
          { text: '"Not enough"', why: 'She said two people\'s jobs.' },
          { text: '"Nothing useful"', why: 'She said two people\'s jobs.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Agree the top [[1]]. Drop or hand off the rest, [[2]].',
        blanks: [['priorities'], ['openly']],
        distractors: ['excuses', 'secretly', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which month did Clinton get overloaded? Month ___ (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep, or drop / hand off (per Ngozi)?',
        groups: ['Keep', 'Drop or hand off'],
        items: [
          { text: 'Goal 1', group: 0 },
          { text: 'Second review rotation', group: 1 },
          { text: 'The payout fix', group: 0 },
          { text: 'The finance favour', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you been overloaded at work, school or home? What would you put on your "full list"?',
    starters: ['My list would include...', 'I could drop or hand off...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down everything you\'re currently responsible for. Circle the two that matter most. Talk to someone about the rest.',
  },
  notes: 'Overload and fatigue increase errors; kept qualitative. If stress is persistent or severe, encourage talking to someone you trust or a professional.',
};

export default lesson;

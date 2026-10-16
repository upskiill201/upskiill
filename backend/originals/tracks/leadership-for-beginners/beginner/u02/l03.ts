import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Step-by-step: running a great one-on-one. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Running a great one-on-one',
  summary: 'Monday, Lucía\'s first proper one-on-one: Sofía, 30 minutes. Last week, their chat lasted four minutes and Sofía said "fine" eleven times. Tey helps her plan this one.',
  minutes: 12,
  outcomes: [
    'Plan a one-on-one in five steps',
    'Ask questions that get real answers',
    'End with something both of you will do',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A one-on-one in five steps',
      steps: [
        { title: '1. Same time, every week', body: 'Put it in the calendar and protect it. Moving it often tells people they\'re not a priority.' },
        { title: '2. Start with them', body: 'Open with a real question: "What\'s on your mind?" or "How\'s this week going, really?" Then wait. Count to five if you have to. Silence is where real answers come from.' },
        { title: '3. Ask follow-ups', body: '"Tell me more." "What makes it hard?" "What have you tried?" Follow-up questions show you\'re actually listening.' },
        { title: '4. Ask how you can help', body: '"What\'s one thing I could do, or stop doing, that would help you?" Asking what to stop is often where the gold is.' },
        { title: '5. Agree next steps, and write them down', body: 'One or two things, with who does what. Next week, start by checking them. That\'s how trust builds: small promises kept.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Lucía and Sofía, week 2 vs week 3',
      before: { label: 'Week 2', text: '"So, all good?" "Fine." "Any questions?" "No, fine." "Great, see you!" (4 minutes)' },
      after: { label: 'Week 3', text: '"How\'s this week going, really?" (pause) "...Honestly? I\'m not sure what you want from the summer plan." "Tell me more." (26 minutes, and a plan.)' },
      notes: ['An open question, then a real pause.', 'A follow-up instead of moving on.', 'It ends with a plan both of them wrote down.'],
    },
  ],
  apply: {
    scenario: 'Monday, Sofía\'s one-on-one.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Same time, every week', 'Start with their question', 'Ask follow-ups', 'Ask how you can help', 'Agree next steps'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did week 2\'s one-on-one last four minutes?',
        options: [
          { text: 'Sofía doesn\'t like Lucía', why: 'The questions were the problem.' },
          { text: 'There was nothing to talk about', why: 'There was: the summer plan confusion.' },
          { text: 'Closed questions ("All good?") get one-word answers' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Open or closed question?',
        groups: ['Open', 'Closed'],
        items: [
          { text: 'How\'s this week going, really?', group: 0 },
          { text: 'All good?', group: 1 },
          { text: 'What makes it hard?', group: 0 },
          { text: 'Any questions?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'sofia',
        message: '...Honestly? I\'m not sure what you want from the summer plan.',
        prompt: 'Lucía\'s best next line?',
        options: [
          { text: 'It\'s obvious, just do it like last year.', why: 'She just took a risk telling you. Don\'t brush it off.' },
          { text: 'Thank you for saying that. Tell me more: which part is unclear?' },
          { text: 'Okay. Anything else?', why: 'Skips the most useful thing she\'s said.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'After an open question, give them time: count to ___. (a number)',
        answers: ['5', 'five', '3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "what could I stop doing?"',
        options: [
          { text: 'It often surfaces what\'s really getting in the way, including you' },
          { text: 'To get out of work', why: 'It\'s about helping them.' },
          { text: 'It sounds clever', why: 'It\'s useful, not clever.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s notes after the meeting. Which one breaks the trust loop?',
        lines: [
          'Next steps: I send Sofía last year\'s brief by Tuesday.',
          'Next steps: none written down, we\'ll remember.',
          'Next week: start by checking last week\'s next steps.',
        ],
        bug: 1,
        fix: 'Next steps: Sofía drafts the plan outline by Friday.',
        explanation: 'Unwritten next steps get forgotten, and forgotten promises cost trust.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Weekly, 30 minutes', 'The rhythm'],
          ['The employee', 'Drives the agenda'],
          ['Too much manager talk', 'The warning sign'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The help question.',
        template: 'What\'s one thing I could [[1]], or [[2]] doing, that would [[3]] you?',
        blanks: [['do'], ['stop'], ['help']],
        distractors: ['start', 'fix'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the best follow-up.',
        tiles: ['Tell', 'me', 'more.'],
        distractors: ['Fine.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the three questions you\'d ask in a one-on-one with someone you lead or work with. Make all three open questions.',
    starters: ['1. ...', '2. ...', '3. ...'],
  },
  deepen: {
    title: 'The five-second pause',
    summary: 'In your next conversation where you ask how someone is, wait five full seconds after their first answer. Notice what they add when you don\'t rush on.',
  },
  notes: 'One-on-one structure (protected cadence, employee-led opening, follow-up questions, "how can I help / what should I stop", recorded next steps) reflects Rogelberg (Glad We Met) and standard manager guidance.',
};

export default lesson;

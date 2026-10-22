import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final Challenge: the team reset (course and track finale). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the team reset',
  summary: 'The app launched on 21 November. Step 3 works. Priya asks Grace to run a one-hour "team reset": how the team wants to handle conflict from now on. The final challenge uses the whole course.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use everything from the course together', 'Help a team agree how to handle conflict'],
  learn: [
    {
      kind: 'reading',
      title: 'The launch, and the reset',
      html: '<p><strong>Launch:</strong> 21 November, one week later than planned. After the fix, the pilot surgery\'s drop-out at step 3 for patients over 65 fell from 38% to 14%. Callum presents the numbers to the board and credits "Grace\'s research and Femi\'s rebuild".</p><p><strong>The reset:</strong> the whole team, one hour, one question: <em>"How do we want to handle disagreement from now on?"</em> Grace facilitates. What they agree:</p><ol><li>Disagree about the work, never the person.</li><li>Concerns about someone\'s work go one-to-one first.</li><li>Heated? Anyone can call a 20-minute pause.</li><li>Short message feels off? Ask lightly.</li><li>New work comes with "what moves?"</li></ol><p>Femi adds a sixth, to laughter: <em>"No one-word replies when someone\'s worried."</em></p>',
    },
    {
      kind: 'story',
      title: 'After the reset',
      beats: [
        { speaker: 'femi', text: 'Six weeks ago I blamed you in stand-up. Today you ran the meeting that fixed how we argue.' },
        { speaker: 'grace', text: 'Turns out the ward rules work in an office. I just had to write them down.' },
        { speaker: 'tey', text: 'That\'s the course, and the track: ask, push back, and repair. Same skills, every conversation.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the team reset.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each team agreement to the chapter it came from.',
        pairs: [
          ['Work, not the person', 'The quiet war'],
          ['20-minute pause', 'Cool it down'],
          ['Ask lightly', 'That\'s not what I meant'],
          ['One-to-one first', 'That\'s not fair'],
          ['"What moves?"', 'Lines that hold'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Drop-out at step 3 for over-65s fell from 38% to 14%. By how many percentage points?',
        answers: ['24', '24%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Grace ask the team to write the agreement together?',
        options: [
          { text: 'To save her time', why: 'It\'s about ownership.' },
          { text: 'Because she had no ideas', why: 'She had a whole page.' },
          { text: 'People keep agreements they helped write' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill is this?',
        groups: ['De-escalation', 'Criticism', 'Boundaries'],
        items: [
          { text: 'Lower and slower', group: 0 },
          { text: '"What might be right in this?"', group: 1 },
          { text: '"Which should move?"', group: 2 },
          { text: 'Acknowledge before you solve', group: 0 },
          { text: 'Draft, then respond', group: 1 },
          { text: 'Same calm words', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'What if someone breaks the agreement in a heated moment?',
        prompt: "Grace's best reply?",
        options: [
          { text: 'Then they\'re out of the team.', why: 'An ultimatum, not a boundary.' },
          { text: 'They will, sometimes. Then anyone can point to it kindly: "Shall we take our 20 minutes?" It\'s there to help, not to punish.' },
          { text: 'Then the agreement failed.', why: 'Agreements are reminders, not perfection.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The track in one line.',
        template: 'Ask, push [[1]], and [[2]].',
        blanks: [['back'], ['repair']],
        distractors: ['forward', 'avoid'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On what date in November did the app launch?',
        answers: ['21', '21st', 'the 21st', '21 November'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'How did Callum credit the team at the board?',
        options: [
          { text: '"Grace\'s research and Femi\'s rebuild"' },
          { text: 'He took the credit himself', why: 'He credited both.' },
          { text: 'He didn\'t mention them', why: 'He named them.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which proposed team rule doesn\'t fit the course?',
        lines: [
          'Disagree about the work, never the person.',
          'Concerns go one-to-one first.',
          'Avoid all disagreement to keep the peace.',
          'Anyone can call a 20-minute pause.',
        ],
        bug: 2,
        fix: 'Raise disagreements early, calmly.',
        explanation: 'Silence is not peace: rule 1.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the course\'s journey.',
        lines: ['Notice the quiet war', 'Cool it down', 'Check what they meant', 'Answer unfair criticism', 'Set lines that hold'],
      },
    ],
  },
  reflect: {
    prompt: 'Your final challenge: suggest a short "how we disagree" agreement to your team, family or flatmates. Write the three rules you\'d propose.',
    starters: ['Rule 1:...', 'Rule 2:...', 'Rule 3:...'],
  },
  deepen: {
    title: 'Team agreements',
    summary: 'Teams that agree simple working norms, especially about disagreement, tend to have fewer destructive conflicts. Writing them together is what makes them stick.',
  },
  notes: 'Course and track finale (fictional): launch 21 November; over-65 step 3 drop-out 38% → 14% at the pilot surgery; team reset agreement (five rules plus Femi\'s sixth). Team norms and psychological safety: Edmondson (1999); Google\'s Project Aristotle (2015) on psychological safety.',
};

export default lesson;

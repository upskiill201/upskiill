import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Step-by-step: run the meeting so everyone gets heard (silent writing first, rounds, one-voice rule, summary). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Run the meeting so everyone gets heard',
  summary: 'Lucía\'s big team planning meeting is next week. Diego talks the most. Sofía, the newest hire, hasn\'t said a word in a month. Tey: "You\'re the host now. Let\'s design a meeting where everyone gets airtime. Like a radio show."',
  minutes: 12,
  outcomes: [
    'Collect ideas in writing before discussion starts',
    'Give everyone a turn with simple rounds',
    'Set one kind, clear rule about interruptions',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Host a meeting like a radio show',
      steps: [
        {
          title: '1. Send the question before the meeting',
          body: '"Next week: what should our autumn campaign focus on? Bring two ideas." Quiet people do their best thinking before the meeting, not on the spot.',
        },
        {
          title: '2. Start with silent writing',
          body: 'Give everyone three minutes to write ideas on sticky notes or in a shared doc, alone, before anyone speaks. Research on brainstorming suggests groups who think alone first often come up with more ideas than groups who start by talking, partly because in open discussion people wait for turns and forget ideas while louder voices fill the time.',
        },
        {
          title: '3. Go round the room',
          body: 'Each person shares one idea in turn. Everyone gets airtime, including Sofía. Diego gets his turn too, so he doesn\'t need to grab one.',
        },
        {
          title: '4. Set one kind rule',
          body: '"Today, one voice at a time. If you have a thought, jot it down; I\'ll come to everyone." Say it with a smile, at the start, for everyone, not just Diego.',
        },
        {
          title: '5. Summarise and credit',
          body: 'End with: "So: Sofía\'s idea on student discounts, plus Diego\'s idea for the launch event. I\'ll write it up by Friday." Credit by name, and say what happens next.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Question before. Silent writing first. Rounds. One voice at a time. Summarise with names.',
    },
  ],
  apply: {
    scenario: 'Tey FM. Designing Lucía\'s planning meeting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why start with silent writing before discussion?',
        options: [
          { text: 'So the meeting is quieter', why: 'Nice side effect. Not the reason.' },
          { text: 'Everyone thinks independently first, so loud voices don\'t steer all the ideas' },
          { text: 'So Lucía can skip the meeting', why: 'She\'s the host.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s meeting in order.',
        lines: ['Send the question in advance.', 'Set the "one voice at a time" rule.', 'Three minutes of silent writing.', 'Go round the room, one idea each.', 'Summarise with names and next steps.'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Won\'t Diego feel targeted by the "one voice at a time" rule?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Not if it\'s for everyone, said with a smile at the start, and you make sure he gets his turn.' },
          { text: 'Say "especially you, Diego."', why: 'That targets him.' },
          { text: 'Skip the rule.', why: 'Then you\'re back to nine interruptions.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Sending the question before the meeting helps ___ people prepare. (one word)',
        answers: ['quiet', 'quieter', 'shy', 'introverted'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Gets everyone heard, or just the loudest?',
        groups: ['Everyone heard', 'Loudest heard'],
        items: [
          { text: 'Silent writing first', group: 0 },
          { text: '"Anyone got ideas? Just shout them out!"', group: 1 },
          { text: 'Going round the room', group: 0 },
          { text: 'Letting the discussion run with no host', group: 1 },
          { text: 'Summarising with names', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give Diego a guaranteed turn?',
        options: [
          { text: 'To reward interrupting', why: 'Everyone gets a turn, not just Diego.' },
          { text: 'If he knows his turn is coming, he doesn\'t need to grab one' },
          { text: 'He\'s the most senior', why: 'Everyone gets one, whatever their level.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s meeting plan. Which step will let the loudest voice take over?',
        lines: [
          'Email the question two days before.',
          'Open with: "Okay, anyone, just shout out ideas!"',
          'End by summarising with names and next steps.',
        ],
        bug: 1,
        fix: 'Open with three minutes of silent writing.',
        explanation: 'An open "shout it out" rewards whoever is fastest and loudest. Silent writing first.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Amplification', 'Repeat and credit by name'],
          ['Reclaim calmly', '"That builds on what I suggested"'],
          ['Silent writing', 'Everyone thinks first'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Lucía\'s opening rule.',
        template: 'Today, one [[1]] at a time. If you have a thought, jot it [[2]]. I\'ll come to [[3]].',
        blanks: [['voice'], ['down'], ['everyone']],
        distractors: ['Diego', 'shout'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the summary opening.',
        tiles: ['So:', 'Sofía\'s', 'idea,', 'plus', 'Diego\'s', 'launch', 'event.'],
        distractors: ['my'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a meeting or group you\'re part of. Which one step from this lesson would help the quietest person get heard?',
    starters: ['The quietest person is...', 'The step that would help: ...'],
  },
  deepen: {
    title: 'Try silent writing once',
    summary: 'Next time you\'re in a group that needs ideas (a project, a trip, a plan), suggest three minutes of silent writing before anyone talks. Compare the ideas to what normally comes up.',
  },
  notes: 'Production blocking in brainstorming groups: Diehl & Stroebe (1987), Journal of Personality and Social Psychology 53(3) — nominal groups (individuals working alone, ideas pooled) produced more ideas than interacting groups; "brainwriting" as a remedy. Stated with "suggests" and "often". Round-robin and turn-taking rules are standard facilitation practice.',
};

export default lesson;

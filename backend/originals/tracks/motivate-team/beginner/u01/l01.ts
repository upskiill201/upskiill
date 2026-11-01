import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: Miracle's first stand-up with Clinic Success. "Third manager in two years." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The third manager',
  summary: 'Week 1, Monday, Lagos. Miracle, a developer, is now leading Afiya\'s Clinic Success team: five people, the lowest morale in the company, eight weeks before 300 clinics go live. Her first stand-up. Bisi smiles: "Welcome. You\'re our third manager in two years."',
  minutes: 11,
  outcomes: [
    'See what low motivation really looks like in a team',
    'Notice why quick fixes like pizza don\'t touch it',
    'Know this course\'s goal: find what makes people care, and what\'s stopping them',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 1, Monday, 9:00 a.m.',
      beats: [
        { speaker: 'bisi', text: 'Welcome! You\'re our third manager in two years. The last one lasted four months. We have a sweepstake.' },
        { speaker: 'narrator', text: 'Chidi is looking at his phone. Halima is taking notes nobody asked for. Emmanuel is eating chin chin. On the wall, last quarter\'s team survey: "I feel motivated at work: 2.1 out of 5."' },
        { speaker: 'folake', text: '(passing by, quietly to Miracle) Eight weeks to rollout. Buy them pizza on Friday. Morale is a pizza problem.' },
      ],
      choice: {
        prompt: 'What should Miracle do in her first week?',
        options: [
          {
            text: 'Book 30 minutes with each person and ask: "What\'s the best and worst part of this job?"',
            outcome: 'By Thursday she has a list. Nobody mentioned pizza. Everybody mentioned the broken headsets, the 11 p.m. clinic calls, and that nobody ever hears how the clinics are doing after they go live.',
            best: true,
          },
          {
            text: 'Give a big motivational speech about the rollout.',
            outcome: 'Bisi has heard two of those already. She mouths the words along with Miracle, quietly, and Emmanuel snorts.',
          },
          {
            text: 'Buy pizza on Friday, as Folake said.',
            outcome: 'Everyone enjoys the pizza. On Monday, the survey would still say 2.1.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Low motivation is rarely laziness. It's usually what happens when people's work is frustrating, unseen or pointless to them. You can't fix that with a speech or a pizza. You fix it by finding out what's in the way, and what would make the work worth caring about. <strong>This course:</strong> eight weeks with Miracle, from the least motivated team in the company to rollout day. You'll learn what research says really motivates people, and what doesn't.</p>",
    },
  ],
  apply: {
    scenario: 'Week 1, the first stand-up.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why won\'t pizza fix the team\'s motivation?',
        options: [
          { text: 'They don\'t like pizza', why: 'They enjoyed it. Monday was the same.' },
          { text: 'It doesn\'t touch what\'s actually frustrating them' },
          { text: 'Pizza is too expensive', why: 'Cost isn\'t the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A sign of low motivation, or not?',
        groups: ['Low motivation', 'Not a sign'],
        items: [
          { text: 'A sweepstake on how long managers last', group: 0 },
          { text: 'Asking lots of questions about clinics', group: 1 },
          { text: 'Survey: 2.1 out of 5', group: 0 },
          { text: 'Taking careful notes', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'You\'re our third manager in two years. We have a sweepstake.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I\'ll be different, I promise.', why: 'They\'ve heard that twice.' },
          { text: 'That\'s not very welcoming.', why: 'She\'s joking, and testing. Laugh and listen.' },
          { text: 'Ha! Then I\'d better learn fast. Could I grab 30 minutes with you this week? I want to hear what the last two got wrong.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Low motivation is rarely ___. (one word)',
        answers: ['laziness', 'Laziness', 'lazy'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s first week in order.',
        lines: ['Meet each person one-to-one', 'Ask the best and worst part of the job', 'Look for patterns', 'Fix one thing fast'],
      },
      {
        kind: 'mcq',
        prompt: 'What did everyone mention in the one-to-ones?',
        options: [
          { text: 'Broken headsets, late-night calls and never hearing how clinics are doing' },
          { text: 'Pizza', why: 'Nobody mentioned pizza.' },
          { text: 'Higher pay, only', why: 'Not the main theme.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan. Which line won\'t help?',
        lines: [
          'Meet each person for 30 minutes this week.',
          'Open Friday with a speech about why they should care more.',
          'Ask what makes a good day and a bad day here.',
        ],
        bug: 1,
        fix: 'Fix the most-mentioned problem by Friday.',
        explanation: 'Telling people to care more is the speech they\'ve heard twice.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to the team.',
        pairs: [
          ['Bisi', 'First support hire, 4 years in'],
          ['Chidi', 'Top performer, bored'],
          ['Halima', 'Newest, a former nurse'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Find what makes people [[1]], and what\'s [[2]] them.',
        blanks: [['care'], ['stopping', 'blocking']],
        distractors: ['pay', 'helping'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s question.',
        tiles: ['What\'s', 'the', 'worst', 'part', 'of', 'this', 'job?'],
        distractors: ['pizza'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you felt unmotivated at work, school or in a team. What was really causing it? Would pizza have helped?',
    starters: ['I felt unmotivated because...', 'What would have helped was...'],
  },
  deepen: {
    title: 'Best and worst',
    summary: 'Ask one person you work or study with: "What\'s the best and the worst part of what you do here?" Listen for what\'s in the way.',
  },
  notes: 'Story setup. Fictional company (Afiya), survey score and team. Miracle\'s move to Lagos follows How to Make People Listen to You.',
};

export default lesson;

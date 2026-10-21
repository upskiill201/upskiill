import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Step-by-step: group exercises. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Group exercises',
  summary: 'Thirty minutes to plan a fix for late deliveries, with five strangers and one person who won\'t stop talking. Ada\'s five steps for standing out by helping the group.',
  minutes: 12,
  outcomes: [
    'Contribute well in a group exercise',
    'Bring others in and keep the group on track',
    'Help the group reach a clear answer',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five moves in a group exercise',
      steps: [
        { title: '1. Clarify the task', body: '"So we need a plan in 30 minutes. Shall we spend 5 on ideas, 15 on choosing, and 10 on the plan?" Structure helps everyone.' },
        { title: '2. Add one good idea', body: '"We could check which routes are late most often before changing partners." One clear idea beats five half ones.' },
        { title: '3. Build on others by name', body: '"Building on Brian K\'s point about drivers..." It shows you listen and gives credit.' },
        { title: '4. Bring quiet people in', body: '"Zanele, you mentioned data earlier. What would you check first?" Assessors notice.' },
        { title: '5. Keep time and summarise', body: '"Five minutes left. So our plan is: find the late routes, test a fix on one, then decide." Someone has to land it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Clarify, add one good idea, build on others by name, bring quiet people in, keep time and summarise.',
    },
  ],
  apply: {
    scenario: 'The group exercise.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five moves.',
        lines: ['Clarify the task', 'Add one good idea', 'Build on others by name', 'Bring quiet people in', 'Keep time and summarise'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the move to Remi\'s line.',
        pairs: [
          ['Clarify', '"5 on ideas, 15 on choosing, 10 on the plan?"'],
          ['Build on others', '"Building on Brian K\'s point..."'],
          ['Bring people in', '"Zanele, what would you check first?"'],
          ['Summarise', '"So our plan is..."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "one clear idea" better than five half ones?',
        options: [
          { text: 'It\'s easier for the group to use and for assessors to notice' },
          { text: 'Five ideas looks lazy', why: 'Quality and clarity matter.' },
          { text: 'It isn\'t', why: 'Clarity helps everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Remi\'s plan, how many of the 30 minutes go on choosing?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(after) Thanks for bringing me in. I had the data idea but couldn\'t get a word in.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'It was the best idea in the room. Checking routes first was yours.' },
          { text: 'You should have spoken louder.', why: 'Not kind or helpful.' },
          { text: 'I took credit for it, sorry.', why: 'He gave her credit.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Building on others.',
        template: '"[[1]] on Brian K\'s point about [[2]]..."',
        blanks: [['Building'], ['drivers']],
        distractors: ['Arguing', 'lunch'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Scores well with assessors, or badly?',
        groups: ['Well', 'Badly'],
        items: [
          { text: 'Giving credit by name', group: 0 },
          { text: 'Interrupting to win', group: 1 },
          { text: 'Keeping time', group: 0 },
          { text: 'Dismissing others\' ideas', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone has to summarise at the end. Why might it help to be that person?',
        options: [
          { text: 'It shows you listened and can bring ideas together' },
          { text: 'You get the last word over everyone', why: 'It\'s about landing the group\'s plan.' },
          { text: 'It doesn\'t help', why: 'It\'s a visible, useful role.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which of Remi\'s moves would cost him points?',
        lines: [
          'Suggest a time plan.',
          'Add the "check late routes first" idea.',
          'Tell Brian K his idea is stupid.',
          'Summarise in the last five minutes.',
        ],
        bug: 2,
        fix: 'Build on the useful part of Brian K\'s idea.',
        explanation: 'Dismissing others scores badly.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long is the group exercise, in minutes?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'In your next group task, try one move you don\'t usually make. Which will it be?',
    starters: ['I\'ll try...'],
  },
  deepen: {
    title: 'Roles in groups',
    summary: 'Groups need people who generate ideas, people who organise, and people who include others. You don\'t have to be the leader to stand out; you have to be useful.',
  },
  notes: 'Group-exercise advice is common assessment-centre guidance. Fictional case and dialogue.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge, "The Call Back": Lucía's first team planning meeting, with Diego in it. Cliffhanger into Chapter 5 (Miracle). */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'The Call Back: the planning meeting',
  summary: 'The director is joining Lucía\'s quarterly planning meeting, to "see how the new lead is doing". Diego has had three coffees. Sofía looks terrified. Lucía calls Tey from the stairwell, five minutes before.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool in one live meeting',
    'Hold the floor in front of a senior audience',
    'Make sure the quietest person is heard too',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, the Call Back',
      beats: [
        { speaker: 'tey', text: "Tey FM, Line 4 is back! Lucía, is that an echo? Are you in a stairwell?" },
        { speaker: 'lucia', text: 'Yes. The director is coming to my planning meeting. Diego has had three coffees. He\'s vibrating. Sofía has prepared two brilliant ideas and told me she\'s "probably not going to say them".' },
        { speaker: 'tey', text: "So: a senior audience, a caffeinated Diego, and a quiet genius. Producer, this is the big one. Five minutes. Everything from this chapter." },
      ],
    },
  ],
  apply: {
    scenario: 'The Call Back. The planning meeting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How should Lucía open the meeting?',
        options: [
          { text: 'Decision and shape first: "Today we\'re choosing next quarter\'s two priorities. Silent writing, then a round, then we decide."' },
          { text: '"So, um, I\'ve been thinking about lots of things..."', why: 'Three coffees will fill that gap.' },
          { text: '"Diego, please don\'t interrupt today."', why: 'That singles him out in front of the director.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s meeting in order.',
        lines: ['Decision and shape of the meeting', 'The "one voice at a time" rule, for everyone', 'Three minutes of silent writing', 'A round: one idea each', 'Decide, and summarise with names'],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: '(during Lucía\'s intro) Ooh, can I just quickly say, I think we should do a podcast, a TikTok AND a billboard...',
        prompt: 'Lucía\'s response?',
        options: [
          { text: '"Diego. Stop. Talking."', why: 'Firm, but harsh, with the director watching.' },
          { text: '"Okay, let\'s talk about billboards."', why: 'And the meeting is gone.' },
          { text: '"Love the energy, Diego. Write all three down. You\'re first in the round."' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps Sofía be heard, or doesn\'t?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'Silent writing before discussion', group: 0 },
          { text: '"Anyone? Just shout out ideas!"', group: 1 },
          { text: 'A round where everyone shares one idea', group: 0 },
          { text: 'Letting Diego and the director debate', group: 1 },
          { text: 'Lucía amplifying Sofía\'s idea by name', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Repeating Sofía\'s idea and crediting her by name is called ___. (one word)',
        answers: ['amplification', 'amplifying'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'In the round, Sofía shares her idea quietly. Then the director says: "Diego, what do you think of that?" Diego says: "Ooh yes, student discounts, my idea exactly!" What should Lucía say?',
        options: [
          { text: '"Diego, that\'s not your idea!"', why: 'Accurate, but harsh in front of the director.' },
          { text: 'Nothing, so there\'s no awkwardness.', why: 'Then Sofía\'s idea becomes Diego\'s.' },
          { text: '"Sofía\'s idea is strong. Sofía, can you say more about how it would work?"' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'The director starts talking over Lucía\'s summary. What\'s the firm, warm move?',
        options: [
          { text: 'Stop instantly; it\'s the director', why: 'Seniority doesn\'t cancel the summary.' },
          { text: 'Finish the sentence calmly, then: "One second, I\'m nearly done, then I\'d love your view."' },
          { text: '"Please stop interrupting me."', why: 'Firm, but sharp with your boss\'s boss.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s closing summary. Which line drops a Chapter 4 tool?',
        lines: [
          'So: priority one is Sofía\'s student-discount plan.',
          'Priority two is Diego\'s launch event.',
          'Someone will probably follow up at some point.',
        ],
        bug: 2,
        fix: 'I\'ll send decisions and next steps by 5 p.m.',
        explanation: 'No follow-up, no record. Name, time, and send it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the Chapter 4 tool.',
        pairs: [
          ['"Write all three down, you\'re first"', 'Holding the floor, warmly'],
          ['"Sofía\'s idea is strong"', 'Amplification'],
          ['Silent writing, then a round', 'Running a meeting where everyone\'s heard'],
          ['"I\'ll send decisions by 5 p.m."', 'The follow-up'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tey! The director said "This is the best planning meeting this team has had in years." And Sofía came up to me afterwards and said "Thank you for making space." I nearly cried in the stairwell. Again.',
        prompt: 'Tey\'s sign-off?',
        options: [
          { text: 'You didn\'t just get heard, Lucía. You built a room where everyone gets heard. That\'s leadership.' },
          { text: 'Now fire Diego.', why: 'Diego was great. He just needed a host.' },
          { text: 'Next caller.', why: 'Let her enjoy the stairwell moment.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Old Lucía, or new Lucía?',
        groups: ['Old Lucía', 'New Lucía'],
        items: [
          { text: 'A slow build-up to the point', group: 0 },
          { text: 'Decision first, then the shape', group: 1 },
          { text: 'Stopping mid-sentence for Diego', group: 0 },
          { text: '"Hold that thought, you\'re next"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 in one line.',
        template: 'Hold the [[1]]. Share the [[2]]. Credit by [[3]].',
        blanks: [['floor'], ['airtime', 'floor', 'room'], ['name']],
        distractors: ['volume', 'shouting'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s meeting opener.',
        tiles: ['Today', 'we\'re', 'choosing', 'two', 'priorities.'],
        distractors: ['um,', 'maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Next time you\'re leading or part of a group discussion, which Chapter 4 tool will you use, and who will it help be heard?',
    starters: ['The tool: ...', 'It will help...'],
  },
  deepen: {
    title: 'Coming up next on Tey FM: Caller 5',
    summary: 'Tey: "Line 5, back home in Buea. Miracle! Clinton and David\'s old mentor!" Miracle: "Hi Tey. I have a job offer from a startup in Lagos that I love. My parents want me to take the bank job here. Every time I bring it up, they stop listening. I need them to hear me. Dinner\'s on Sunday."',
  },
  notes: 'Unit Challenge: reviews Chapter 4. The director, Sofía and the meeting are fictional.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 1 — opens the chapter: "What did that change?" Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"What did that change?"',
  summary: 'Month three. Clinton is busy from 8am to 6pm: reviews, small fixes, three meetings a day. In his 1:1, he lists eleven things he did. Ngozi listens, then asks one question: "Which of those changed something for our drivers?" He can\'t answer.',
  minutes: 11,
  outcomes: ['Tell being busy apart from being valuable', 'Connect your work to what your team is trying to achieve', 'Choose where to spend your time'],
  learn: [
    {
      kind: 'story',
      title: 'Eleven things',
      beats: [
        { speaker: 'narrator', text: 'Month three. Tuesday 1:1. Clinton reads his list: eleven reviews, fixes and meetings. He\'s proud of it.' },
        { speaker: 'ngozi', text: 'That\'s a lot. Which of those changed something for our drivers?' },
        { speaker: 'clinton', text: '...Maybe the tap-once fix? From last month?' },
        { speaker: 'ngozi', text: 'Being busy is easy here. Being useful means knowing what we\'re trying to change this quarter, and spending your best hours on it.' },
        { speaker: 'tey', text: 'Busy and valuable aren\'t the same. Value usually comes from work tied to what the team or business most needs.' },
      ],
      choice: {
        prompt: 'What should Clinton do next week?',
        options: [
          {
            text: 'Find out the team\'s goals this quarter, and spend his best hours on work tied to them.',
            outcome: 'The goal: cut failed driver confirmations by half. He drops two low-value meetings, focuses on sync status, and next 1:1 he has one result, not eleven tasks.',
            best: true,
          },
          {
            text: 'Do even more things, so the list is longer.',
            outcome: 'Fourteen things. Same question. Same silence.',
          },
          {
            text: 'Stop doing small tasks entirely and only work on big ideas.',
            outcome: 'Reviews pile up, teammates are blocked, and the big idea isn\'t tied to the team\'s goals either.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Busy isn\'t valuable. Know what your team is trying to change, and spend your best hours there.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> what makes someone valuable, finding your team\'s goals, prioritising, saying "not now", making your work visible, skills that compound, making others better, and finding the problem nobody owns. Your kit piece: an impact record.</p>',
    },
  ],
  apply: {
    scenario: 'Ngozi\'s question.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was wrong with Clinton\'s list of eleven things?',
        options: [
          { text: 'It was too short', why: 'Length wasn\'t the issue.' },
          { text: 'It showed activity, not what changed' },
          { text: 'Nothing', why: 'It didn\'t show impact.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Activity or impact?',
        groups: ['Activity', 'Impact'],
        items: [
          { text: 'Attended three meetings', group: 0 },
          { text: 'Failed confirmations down 20%', group: 1 },
          { text: 'Reviewed six pull requests', group: 0 },
          { text: 'Support calls about sync down a third', group: 1 },
          { text: 'Worked on sync all week', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best follow-up question.',
        from: 'clinton',
        message: 'What should I ask Ngozi after her question?',
        options: [
          { text: '"So should I do more things?"', why: 'Ask about goals instead.' },
          { text: '"Was my list bad?"', why: 'Ask what matters most.' },
          { text: '"What are we trying to change this quarter, and where would my time help most?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the plan that repeats the mistake.',
        lines: ['Learn the team\'s goals.', 'Make the list longer next week.', 'Spend best hours on the goal.'],
        bug: 1,
        explanation: 'A longer list is still activity, not impact.',
      },
      {
        kind: 'mcq',
        prompt: 'What was the team\'s goal this quarter?',
        options: [
          { text: 'Cut failed driver confirmations by half' },
          { text: 'Attend more meetings', why: 'Fewer failed confirmations.' },
          { text: 'Hire more people', why: 'Cut failed confirmations by half.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Learn goals, focus there', 'One real result'],
          ['Do even more things', 'Same question, same silence'],
          ['Only big ideas', 'Teammates blocked'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngozi\'s point.',
        template: 'Being [[1]] is easy. Being [[2]] means knowing what we\'re trying to change.',
        blanks: [['busy'], ['useful', 'valuable']],
        distractors: ['late', 'quiet', 'loud'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many things were on Clinton\'s list? (a number)',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Where should Clinton spend his best hours?',
        options: [
          { text: 'In meetings', why: 'On the goal.' },
          { text: 'On whatever\'s newest', why: 'On the goal.' },
          { text: 'On work tied to the team\'s goal' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Tied to the goal, or not?',
        groups: ['Tied', 'Not tied'],
        items: [
          { text: 'Sync status for support', group: 0 },
          { text: 'Redesigning the team\'s chat emojis', group: 1 },
          { text: 'Fixing a failed-confirmation bug', group: 0 },
          { text: 'An unrelated side tool', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at your last week. Which things changed something for someone? Which were just busy?',
    starters: ['Changed something:', 'Just busy:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask your manager or teacher: "What are we trying to change this quarter?" Write the answer at the top of your to-do list.',
  },
  notes: 'Opens L3 Ch2 (founder topic: How to Become More Valuable at Work). Outline: "Busy isn\'t valuable."',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Step-by-step: the hard conversation (Crucial Conversations, SBI). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The hard conversation',
  summary: '3:45 p.m. Fifteen minutes until Diego. Lucía\'s heart is going fast. She knows WHAT to say now. Tey walks her through HOW the conversation should go.',
  minutes: 12,
  outcomes: [
    'Run a hard conversation in five steps',
    'Keep it safe enough that the other person keeps talking',
    'End with a clear agreement',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A hard conversation in five steps',
      steps: [
        { title: '1. Start with what you both want', body: 'Before the problem, the shared goal: "I want this team to be a place where everyone brings ideas, and you\'re a big part of that." The authors of Crucial Conversations call it starting with heart: know what you really want, for you, them and the relationship.' },
        { title: '2. Give the SBI', body: 'Situation, Behaviour, Impact. Short, calm, facts. Then stop talking.' },
        { title: '3. Ask, and really listen', body: '"What did you mean by it?" "How did you see it?" Use Chapter 2\'s listening: say it back, name the feeling. If they get defensive, make it safe again: "I\'m not saying you\'re a bad person. I\'m talking about one comment."' },
        { title: '4. Agree what changes', body: 'Ask before you tell: "What could you do next time?" Their idea beats your instruction. Get to something specific.' },
        { title: '5. Follow up', body: 'Notice when they do it right, and say so. "Thanks for backing Sofía\'s map today." A hard conversation isn\'t finished until the follow-up.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Opening line, two ways',
      before: { label: 'Ambush', text: '"Sit down. We need to talk about your attitude."' },
      after: { label: 'Safe start', text: '"Thanks for making time. I want to talk about something from the review, because I want this team to be somewhere everyone shares ideas, and you matter a lot to that."' },
      notes: ['The ambush makes him defend himself before he\'s heard anything.', 'The safe start says why, and that he matters.', 'Same conversation. Very different chance of it going well.'],
    },
  ],
  apply: {
    scenario: '3:45 p.m., getting ready for Diego.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Start with what you both want', 'Give the SBI', 'Ask, and really listen', 'Agree what changes', 'Follow up'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with what you both want?',
        options: [
          { text: 'To delay the hard bit', why: 'It\'s one sentence, then straight to it.' },
          { text: 'It makes it safe: he knows you\'re not out to get him' },
          { text: 'To flatter him', why: 'It should be true, not flattery.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes it safe, or makes it unsafe?',
        groups: ['Safe', 'Unsafe'],
        items: [
          { text: '"I\'m talking about one comment, not who you are."', group: 0 },
          { text: '"Sit down. We need to talk about your attitude."', group: 1 },
          { text: '"How did you see it?"', group: 0 },
          { text: '"Everyone thinks you\'re a problem."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'Oh come on, it was a JOKE. Everyone laughed.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'It wasn\'t funny.', why: 'Now you\'re arguing about comedy.' },
          { text: 'Okay, forget I said anything.', why: 'Folding at the first push back.' },
          { text: 'I know you meant it as a joke. I\'m not saying you\'re a bad person. But Sofía stopped talking, and I need her ideas.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A hard conversation isn\'t finished until the follow-___. (one word)',
        answers: ['up', 'Up'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "What could you do next time?" instead of telling him?',
        options: [
          { text: 'People commit more to ideas they came up with themselves' },
          { text: 'Lucía doesn\'t know the answer', why: 'She might, but his idea sticks better.' },
          { text: 'To avoid responsibility', why: 'She still agrees the change with him.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan. Which step is missing its purpose?',
        lines: [
          'Open: what I want for the team, and his part in it.',
          'Then list every annoying thing he\'s done since Day 1.',
          'Ask how he saw it. Agree one change.',
        ],
        bug: 1,
        fix: 'Then one SBI: the review comment only.',
        explanation: 'One clear issue. A list of grievances turns feedback into an attack.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Start with heart', '"I want everyone to share ideas."'],
          ['Make it safe', '"I\'m talking about one comment."'],
          ['Follow up', '"Thanks for backing Sofía today."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'One [[1]]. Ask, then [[2]]. Agree, then follow [[3]].',
        blanks: [['issue', 'thing'], ['listen'], ['up']],
        distractors: ['list', 'shout'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s safety line.',
        tiles: ['I\'m', 'talking', 'about', 'one', 'comment.'],
        distractors: ['everything'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a hard conversation you\'ve been avoiding. Write your opening line: what you both want.',
    starters: ['The conversation is with...', 'My opening: "I want..."'],
  },
  deepen: {
    title: 'Write the first line',
    summary: 'For your next hard conversation, write only the first sentence in advance: the shared goal. A good first sentence makes the rest much easier.',
  },
  notes: 'Patterson, Grenny, McMillan & Switzler, Crucial Conversations (2002; 3rd ed. 2021): "Start with Heart", "Make It Safe", restoring mutual purpose and respect. SBI from Center for Creative Leadership. Self-generated solutions and commitment: goal-setting/participation research.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: assessment day. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Assessment day',
  summary: 'Synergix, Monday, 9 a.m. Five candidates, one group exercise, then a panel with Brian Otieno, who speaks almost entirely in jargon. Remi\'s hands are shaking. Next to him sits a candidate called Zanele.',
  minutes: 11,
  outcomes: [
    'Know what a final round usually involves',
    'Notice how nerves show up',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Synergix, Nairobi. Five candidates. The task: "Our delivery partner is late one in three times. Propose a plan in 30 minutes."' },
        { speaker: 'zanele', text: '(quietly, to Remi) My hands are cold. Are yours?' },
        { speaker: 'remi', text: 'Shaking. I keep telling myself I\'m excited.' },
        { speaker: 'narrator', text: 'One candidate, Brian K, starts talking at once and doesn\'t stop. Two others say nothing.' },
        { speaker: 'narrator', text: 'After lunch: a panel with Brian Otieno, Head of Strategy & Operations. "So, let\'s deep-dive your value-add."' },
        { speaker: 'tey', text: 'This chapter: nerves, group exercises, final-round questions, following up, and what to do with an offer, or a no.' },
      ],
      choice: {
        prompt: 'In the group exercise, one candidate is talking over everyone. What should Remi do?',
        options: [
          { text: 'Build on a good point, then invite a quiet candidate in: "Zanele, you mentioned data earlier?"', outcome: 'Strong. Assessors watch for people who help the group, not just themselves.', best: true },
          { text: 'Talk louder than him', outcome: 'Now two people are dominating. Assessors notice.' },
          { text: 'Stay silent to be polite', outcome: 'Then the assessors have nothing to score.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'In group exercises, assessors score how you help the group think, not how much you talk.',
    },
  ],
  apply: {
    scenario: 'Assessment day.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many candidates are in the group exercise?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What do assessors usually look for in a group exercise?',
        options: [
          { text: 'How you help the group think and reach a plan' },
          { text: 'Who talks the most', why: 'Dominating usually scores badly.' },
          { text: 'Who agrees with everyone', why: 'They want contribution.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the group, or not?',
        groups: ['Helps', 'Doesn\'t'],
        items: [
          { text: 'Inviting a quiet person in', group: 0 },
          { text: 'Talking over others', group: 1 },
          { text: 'Building on someone\'s idea', group: 0 },
          { text: 'Saying nothing for 30 minutes', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'My hands are cold. I always freeze in groups.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'Me too, shaking. Let\'s try to bring each other in. You\'re good with data, right?' },
          { text: 'You\'ll be fine, stop worrying.', why: 'Kind, but brush-off.' },
          { text: 'Then let me do all the talking.', why: 'That hurts both of them.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the day to what it checks.',
        pairs: [
          ['Group exercise', 'How you work with others'],
          ['Panel', 'Your stories and thinking'],
          ['Lunch with staff', 'Often informal, still noticed'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Assessors score how you help the [[1]] think, not how much you [[2]].',
        blanks: [['group'], ['talk']],
        distractors: ['boss', 'eat'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian Otieno says "deep-dive your value-add". What should Remi do if he\'s unsure what it means?',
        options: [
          { text: 'Ask: "Do you mean what I\'d bring to the team?"' },
          { text: 'Nod and guess', why: 'Clarifying is better.' },
          { text: 'Use more jargon back', why: 'Plain clarity wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s group-exercise plan is a mistake?',
        lines: [
          'Listen first for a couple of minutes.',
          'Build on good points by name.',
          'Win by speaking more than anyone.',
          'Help summarise the plan at the end.',
        ],
        bug: 2,
        fix: 'Help the group reach a clear plan.',
        explanation: 'Dominating usually scores badly.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Nerves', 'Group exercises', 'Final-round questions', 'Following up', 'Offers and nos'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the case, the delivery partner is late one in how many times?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'In group work, are you more likely to dominate or go quiet? What could you do instead?',
    starters: ['I usually...', 'Instead I could...'],
  },
  deepen: {
    title: 'Assessment centres',
    summary: 'Many graduate and internship programmes use assessment days with group tasks, case exercises and panels. They\'re designed to see how you work, not just how you talk about work.',
  },
  notes: 'Fictional assessment day at Synergix; Brian Otieno (Head of Strategy & Ops, CAST.md) and Zanele (the other intern in Corporate Jargon). The delivery case foreshadows Data Science for Beginners.',
};

export default lesson;

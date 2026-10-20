import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: cool it down',
  summary: 'Lower and slower, the calm-down sequence, naming feelings, flooding, and soft starts. A quick check before Grace learns exactly what to say as an argument heats up.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['De-escalate with voice, naming and pauses', 'Open hard conversations softly'],
  learn: [
    {
      kind: 'story',
      title: 'Friday coffee',
      beats: [
        { speaker: 'femi', text: 'Thanks for raising Thursday the way you did. I\'d have got defensive if you\'d gone in hard.' },
        { speaker: 'grace', text: 'Ward rule: start soft. It works on frightened people. And on stressed developers.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: cool it down.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the calm-down sequence.',
        lines: ['Slow yourself first', 'Acknowledge, don\'t argue', 'Name the real concern', 'Pause if it\'s too hot', 'Move to the problem'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Calming or escalating?',
        groups: ['Calming', 'Escalating'],
        items: [
          { text: '"That sounds really stressful."', group: 0 },
          { text: '"Calm down."', group: 1 },
          { text: 'A slow, quiet voice', group: 0 },
          { text: '"You always do this."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone is flooded and can\'t hear you. Best move?',
        options: [
          { text: 'Suggest a 20-minute break and agree when to come back' },
          { text: 'Explain your point again, more clearly', why: 'Flooded people can\'t take it in.' },
          { text: 'Leave and never mention it', why: 'Pause, then return.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'I\'m too angry to talk about this right now.',
        prompt: "Grace's best reply?",
        options: [
          { text: '"That\'s fair. Shall we pick it up at 3, after a break?"' },
          { text: '"No, we\'re doing this now."', why: 'Pushing a flooded person rarely works.' },
          { text: '"Fine, forget it then."', why: 'Agree a time to come back.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to the research.',
        pairs: [
          ['Labelling calms the alarm', 'Lieberman'],
          ['Starts predict endings', 'Gottman, on harsh starts'],
          ['Flooding blocks listening', 'Gottman, on flooding'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A soft start.',
        template: 'One specific [[1]], how it affected you, their [[2]], a request.',
        blanks: [['moment'], ['pressure']],
        distractors: ['insult', 'salary'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this opener breaks the soft-start rules?',
        lines: [
          'Can we talk about yesterday\'s call?',
          'When I was interrupted, I lost my thread.',
          'You never let anyone finish.',
          'Could we try a hand-raise for calls?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: '"Never" makes it sweeping.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does acknowledging work even when you disagree?',
        options: [
          { text: 'People calm down when they feel heard, and then they can listen' },
          { text: 'It means you give in', why: 'Acknowledging isn\'t agreeing.' },
          { text: 'It doesn\'t work', why: 'It\'s a core de-escalation skill.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Grace\'s reply to Femi, at what time do they pick it up? (a number)',
        answers: ['3', 'three', '3pm', '3 pm'],
        placeholder: 'A time',
      },
      {
        kind: 'sortGroups',
        prompt: 'A tentative label, or a verdict?',
        groups: ['Tentative', 'Verdict'],
        items: [
          { text: '"It sounds like you\'re worried."', group: 0 },
          { text: '"You\'re angry."', group: 1 },
          { text: '"I wonder if the deadline is the problem."', group: 0 },
          { text: '"You\'re clearly jealous."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Practise one calming line out loud now, slowly and quietly: "That sounds really frustrating."',
    starters: ['It felt...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4.',
};

export default lesson;

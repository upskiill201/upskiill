import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: one more project. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'One more project',
  summary: 'Launch week. Priya asks Grace to "quickly" run a survey for another team. Grace says yes before Priya finishes the sentence. By Wednesday she\'s working until 10 p.m., and Jayden has taken the car again.',
  minutes: 11,
  outcomes: [
    'Notice when you\'re saying yes against your own limits',
    'See the cost of having no boundaries',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Launch week',
      beats: [
        { speaker: 'priya', text: 'Grace, could you quickly run a patient survey for the clinics team? It\'s only a few days.' },
        { speaker: 'grace', text: 'Of course! No problem.' },
        { speaker: 'narrator', text: 'She already has the pilot test, step 3 reviews and launch support. By Wednesday she\'s working until 10 p.m.' },
        { speaker: 'narrator', text: 'At home, the car is gone again. A text: "Got the car, back late x". Grace stares at the ceiling.' },
        { speaker: 'grace', text: 'On the ward I\'d never have let anyone take on four patients\' care alone. I just did it to myself.' },
        { speaker: 'tey', text: 'This chapter: what a boundary is, saying no kindly, boundaries vs ultimatums, a four-part way to ask, and holding the line.' },
      ],
      choice: {
        prompt: 'What could Grace have said to Priya?',
        options: [
          { text: '"I\'d like to help. This week I\'m on the pilot test and launch. Which should move to make room?"', outcome: 'Good. Helpful, honest about capacity, and the priority decision goes to the person who owns it.', best: true },
          { text: '"Of course! No problem."', outcome: 'A yes that cost her evenings and risked the launch work.' },
          { text: '"No. I\'m too busy."', outcome: 'True, but a flat no leaves Priya without a path.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A boundary isn\'t a wall. It\'s an honest limit, said kindly, with a choice attached.',
    },
  ],
  apply: {
    scenario: 'Launch week.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A sign Grace needs a boundary, or not?',
        groups: ['Needs a boundary', 'Not really'],
        items: [
          { text: 'Working until 10 p.m. in launch week', group: 0 },
          { text: 'Enjoying a hard problem', group: 1 },
          { text: 'Saying yes before hearing the request', group: 0 },
          { text: 'Jayden taking the car without asking, again', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Grace\'s instant yes a problem?',
        options: [
          { text: 'She agreed before checking her capacity, and her evenings and launch work paid for it' },
          { text: 'Surveys are pointless', why: 'The survey wasn\'t the problem.' },
          { text: 'It wasn\'t a problem', why: 'She was working until 10 p.m.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Grace\'s possible reply to its effect.',
        pairs: [
          ['"Of course, no problem!"', 'Overload'],
          ['"No, too busy."', 'A dead end for Priya'],
          ['"Which should move to make room?"', 'A shared decision'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Priya\'s my manager. Can I even say no?',
        prompt: "Tey's best reply?",
        options: [
          { text: 'You can say "yes, if something moves". Asking which priority to drop isn\'t refusing; it\'s helping her manage the team.' },
          { text: 'No, managers can\'t be refused.', why: 'Honest capacity is part of the job.' },
          { text: 'Just quietly not do it.', why: 'That breaks trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Until what time is Grace working by Wednesday? (e.g. 10 pm)',
        answers: ['10', '10 pm', '10pm', '10 p.m.', '22:00'],
        placeholder: 'A time',
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'A boundary is an honest [[1]], said kindly, with a [[2]] attached.',
        blanks: [['limit'], ['choice', 'option']],
        distractors: ['wall', 'threat'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Grace realise about the ward?',
        options: [
          { text: 'She\'d never have let a colleague take on that much alone, but she did it to herself' },
          { text: 'The ward was easier', why: 'It was about workload limits.' },
          { text: 'Nurses never say no', why: 'They manage safe workloads.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Grace\'s plan keeps the overload going?',
        lines: [
          'Tell Priya what I\'m already working on.',
          'Ask which task should move.',
          'Do the survey at night so nobody notices.',
          'Talk to Jayden about the car.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Hidden overtime is no boundary at all.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['What a boundary is', 'Saying no kindly', 'Boundary vs ultimatum', 'A four-part ask', 'Holding the line'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Counting the survey, how many pieces of work does Grace have this week?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Where are you saying yes against your own limits right now, at work or at home?',
    starters: ['I keep saying yes to...', 'It costs me...'],
  },
  deepen: {
    title: 'Burnout',
    summary: 'The World Health Organization describes burnout as resulting from chronic workplace stress that has not been successfully managed. Boundaries are one of the ways people manage it.',
  },
  notes: 'Fictional: launch-week survey request; Grace already on pilot test, step 3 reviews, launch support. WHO ICD-11 (2019) defines burn-out as "resulting from chronic workplace stress that has not been successfully managed".',
};

export default lesson;

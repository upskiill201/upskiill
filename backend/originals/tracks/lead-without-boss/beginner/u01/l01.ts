import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: Brian gives Remi the refund problem. Responsibility without authority. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The six-week fix',
  summary: 'Monday, Week 1. Remi\'s first month in his real job at Synergix. Brian drops a folder on his desk: business customers wait 21 days for a refund, and the CEO wants it under five. "You have six weeks. Kamau will want to see it." Remi has no team.',
  minutes: 11,
  outcomes: [
    'See what "leading without being the boss" really means',
    'Notice the first trap: trying to fix it all alone',
    'Know this course\'s goal: get a result through people who don\'t report to you',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 1, Monday, 9:12 a.m.',
      beats: [
        { speaker: 'brian', text: 'Remi, congratulations again on the job. Here\'s your first real project. When a delivery goes wrong, our business customers wait 21 days for a refund. Mama Mboga Fresh says they\'ll leave us. Kamau wants it under five days. You have six weeks.' },
        { speaker: 'remi', text: 'Okay. Who\'s on my team?' },
        { speaker: 'brian', text: 'Ah. Nobody, officially. Refunds touch Finance, IT, Logistics, Marketing and the warehouse. You\'ll need all of them. None of them work for you. Or me, really.' },
        { speaker: 'narrator', text: 'Brian leaves. Remi stares at the folder. Twenty-one days. Five teams. Zero people who have to listen to him. He opens his laptop and starts redesigning the whole refund process himself.' },
      ],
      choice: {
        prompt: 'What should Remi do first?',
        options: [
          {
            text: 'Close the laptop and go and ask the five teams how refunds actually work today.',
            outcome: 'By lunch Remi has learned three things the folder didn\'t say, and Njeri in the warehouse has said, "Finally, someone asks us."',
            best: true,
          },
          {
            text: 'Spend the week designing the perfect new process, then present it.',
            outcome: 'A beautiful plan that five teams see for the first time on Friday. Nobody helped build it, so nobody wants to do it.',
          },
          {
            text: 'Email all five team heads: "The CEO wants this fixed. Please send me your people."',
            outcome: 'Borrowing the CEO\'s name on day one. Three polite replies, zero people, and a story about "the new guy" at lunch.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Most work today crosses teams. You'll often be responsible for something without having authority over the people who can make it happen. That's what this course is about. <strong>Leading without being the boss</strong> means getting a result through people who don't report to you, using credibility, generosity, a shared goal and follow-through instead of a title. Remi has six weeks. You'll learn alongside him.</p>",
    },
  ],
  apply: {
    scenario: 'Week 1, Monday morning.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What makes Remi\'s project hard?',
        options: [
          { text: 'He doesn\'t understand refunds', why: 'He\'s great at understanding problems. Bringing people with him is the hard part.' },
          { text: 'He\'s responsible for the result, but nobody he needs reports to him' },
          { text: 'Six weeks is too long', why: 'If anything, it\'s short.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Leading without a title, or not?',
        groups: ['Leading without a title', 'Not quite'],
        items: [
          { text: 'Asking each team how refunds work today', group: 0 },
          { text: 'Redesigning everything alone', group: 1 },
          { text: 'Building a shared goal with them', group: 0 },
          { text: 'Using the CEO\'s name to make people help', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I heard Brian gave you the refund monster. Want me to just build you a spreadsheet tonight?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Yes, and I\'ll design the whole process myself this week.', why: 'The solo trap, with a spreadsheet.' },
          { text: 'No thanks, I\'ve got it.', why: 'Turning down your first ally.' },
          { text: 'You\'re a legend. First, can you come with me to ask the teams how it really works? Then the spreadsheet.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Remi is responsible for the result but has no ___ over the people he needs. (one word)',
        answers: ['authority', 'Authority', 'power'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good first week in order.',
        lines: ['Understand how it works today', 'Meet the people involved', 'Agree a shared goal', 'Plan the fix together'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is borrowing the CEO\'s name on day one risky?',
        options: [
          { text: 'People help because they have to, not because they want to, and they notice' },
          { text: 'The CEO might be busy', why: 'It\'s about how people feel when you pull rank you don\'t have.' },
          { text: 'It\'s not risky', why: 'It costs credibility you haven\'t earned yet.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Monday plan. Which line is the solo trap?',
        lines: [
          'Visit Finance, IT, Logistics, Marketing, the warehouse.',
          'Write the full new process tonight so it\'s ready.',
          'Ask each one: what slows refunds down?',
        ],
        bug: 1,
        fix: 'Write down what each team tells me.',
        explanation: 'A plan nobody helped build is a plan nobody wants to run.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their team.',
        pairs: [
          ['Wanjiku', 'Finance'],
          ['Felix', 'IT'],
          ['Njeri', 'The warehouse'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Get a [[1]] through people who don\'t [[2]] to you.',
        blanks: [['result'], ['report']],
        distractors: ['title', 'listen'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the number on Remi\'s map.',
        tiles: ['21', 'days', 'to', '5.'],
        distractors: ['50'],
      },
    ],
  },
  reflect: {
    prompt: 'When have you had to get something done through people who didn\'t have to help you (a group project, a family event, a team at work)? What worked?',
    starters: ['I needed them to...', 'What worked was...'],
  },
  deepen: {
    title: 'Who do you need?',
    summary: 'Think of one thing you\'re responsible for. List everyone who has to help for it to happen. Circle the ones who don\'t report to you. That\'s your leading-without-a-title list.',
  },
  notes: 'Story setup. "Responsibility without authority" framing: Cohen & Bradford, Influence Without Authority (1989; 3rd ed. 2017). Fictional company and figures (21 days, Mama Mboga Fresh from Corporate Jargon).',
};

export default lesson;

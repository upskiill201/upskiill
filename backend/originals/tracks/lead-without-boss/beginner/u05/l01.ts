import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: "Kamau wants you to present. Just you." Sharing the stage. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Just you',
  summary: 'Week 6, Monday. The chart says 4 days, below the goal. Audit errors: zero. Then Brian: "Kamau wants you to present on Friday. Fifteen minutes. Just you." Remi looks at the five names on the chart.',
  minutes: 11,
  outcomes: [
    'See how a big moment can build or break your coalition',
    'Ask to share the stage without refusing the request',
    'Know this chapter\'s goal: show the result so the whole team shines',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 6, Monday, 9:15 a.m.',
      beats: [
        { speaker: 'brian', text: 'Four days! Remi, Kamau is thrilled. He wants you to present on Friday. Fifteen minutes, just you. This is a big moment for your career.' },
        { speaker: 'narrator', text: 'A big moment. Remi imagines it: him at the front, the chart behind him, Kamau nodding. It\'s a very nice picture. Then he imagines Njeri hearing about it on Monday from someone else.' },
        { speaker: 'zanele', text: '(quietly) You know what you\'re going to do, right?' },
      ],
      choice: {
        prompt: 'What should Remi say to Brian?',
        options: [
          {
            text: '"Thank you. Could I open and close, and have each owner show their own two minutes? Kamau should hear it from them."',
            outcome: 'Brian pauses, then grins. "That\'s exactly what Kamau will like. Do it." Remi texts five people: "Friday, 2 minutes each, your fix, your number."',
            best: true,
          },
          {
            text: '"Sure, I\'ll do it alone, and I\'ll mention everyone."',
            outcome: 'Kind intentions. But a slide that says "Thanks: Njeri, Wanjiku, Felix, Emeka, Pauline" is not the same as Kamau hearing Njeri explain her form.',
          },
          {
            text: '"No, I don\'t want to present. Give it to the team."',
            outcome: 'Modest, but it turns down the CEO and leaves nobody to tie it together. Brian looks confused.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>The last week of a project is where coalitions are made or broken. Everyone watches who gets the stage. Remi built this result through people who didn't have to help him. If he takes the spotlight alone, he spends every bit of referent power he built. If he shares it, he multiplies it. <strong>This chapter:</strong> how trust works, how to persuade a senior audience, how to make others shine, influence versus manipulation, and how to make the change last after you leave.</p>",
    },
  ],
  apply: {
    scenario: 'Week 6, Monday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why ask for each owner to present their part?',
        options: [
          { text: 'Remi is nervous', why: 'He still opens and closes.' },
          { text: 'Kamau hears it from the people who did it, and they get the visibility' },
          { text: 'To make the meeting longer', why: 'Same 15 minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds the coalition, or spends it?',
        groups: ['Builds it', 'Spends it'],
        items: [
          { text: 'Each owner presents their own number', group: 0 },
          { text: 'A "thanks to the team" slide at the end', group: 1 },
          { text: 'Texting the five owners straight away', group: 0 },
          { text: 'Presenting alone because the CEO asked', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Are you sure? This is your moment.',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'You\'re right, I\'ll do it alone.', why: 'Spends the coalition on one meeting.' },
          { text: 'I don\'t really care about moments.', why: 'It\'s fine to care. Share it.' },
          { text: 'It\'s our moment. I\'ll still tie it together, but Kamau should hear Njeri explain her form herself.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Taking the spotlight alone spends your ___ power. (one word)',
        answers: ['referent', 'Referent'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s plan in order.',
        lines: ['Thank Brian', 'Ask to share the stage', 'Text the five owners', 'Plan opening and closing'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the result on the chart?',
        options: [
          { text: '21 days down to 4, with zero audit errors' },
          { text: '21 down to 11', why: 'That was Week 5.' },
          { text: '21 down to 5 exactly', why: 'Even better: 4.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s text to the five. Which line breaks the plan?',
        lines: [
          'Friday, Kamau review: 2 minutes each, your fix, your number.',
          'I\'ll present the main story; you can just stand next to me.',
          'I\'ll open and close and tie it together.',
        ],
        bug: 1,
        fix: 'Zanele will help with your slide if you want.',
        explanation: '"Just stand next to me" turns owners into props.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 4 review.',
        pairs: [
          ['Helpful follow-up', 'Ask what\'s in the way'],
          ['Joint escalation', 'Go up together'],
          ['Small wins', 'One number, every Friday'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'Show the result so the whole [[1]] shines. Don\'t [[2]] the spotlight.',
        blanks: [['team', 'group'], ['take', 'steal', 'hog']],
        distractors: ['boss', 'share'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s text.',
        tiles: ['Your', 'fix,', 'your', 'number.'],
        distractors: ['my'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone shared the stage with you, or didn\'t. How did it change how you felt about working with them again?',
    starters: ['When they shared it...', 'When they didn\'t...'],
  },
  deepen: {
    title: 'Hand over the mic',
    summary: 'Next time you present group work, give each contributor a short slot to present their own part. Watch how they talk about the project afterwards.',
  },
  notes: 'Story setup. Referent power (French & Raven); credit and visibility as currencies (Cohen & Bradford). Fictional figures (4 days).',
};

export default lesson;

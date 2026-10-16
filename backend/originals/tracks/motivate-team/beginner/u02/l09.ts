import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: the team's new goal and Monday board, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the new board',
  summary: 'Week 2, Friday. The whiteboard has a new top line, written by the team. Folake walks past, stops, and reads it twice. Tap through to see every Chapter 2 tool on one board.',
  minutes: 11,
  outcomes: [
    'See every Chapter 2 tool on one team board',
    'Design a board that shows purpose, not just activity',
    'Make the goal something the team owns',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Clinic Success board, Week 2',
      text: 'Our goal: all 300 clinics live by rollout, and every live clinic sending results within a day. This week\'s story (Halima): a Kano grandmother read her own results in Hausa. Results sent this week: 3,200. Bisi\'s clinics: 12. Halima\'s: 9. Chidi\'s: the northern 40. Emmanuel\'s: 11, including Dr Bello. Fixed and followed up: Ibadan saw 40 patients on Friday. Next visit: Emmanuel, to Abeokuta.',
      hotspots: [
        { phrase: 'all 300 clinics live by rollout', note: 'An outcome goal, built with the team, pointed at clinics, not tickets.' },
        { phrase: 'every live clinic sending results within a day', note: 'Specific and challenging (Locke and Latham), and it means patients, not dashboards.' },
        { phrase: 'This week\'s story (Halima)', note: 'Task significance, brought by the team, every week.' },
        { phrase: 'Results sent this week: 3,200.', note: 'One real number, so the story isn\'t a one-off.' },
        { phrase: 'Chidi\'s: the northern 40.', note: 'Task identity: whole pieces of work people can call theirs.' },
        { phrase: 'Ibadan saw 40 patients on Friday.', note: 'Closing the loop: hard work gets to see its ending.' },
        { phrase: 'Next visit: Emmanuel, to Abeokuta.', note: 'A visit for everyone. Especially Emmanuel.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A board that motivates: an outcome goal, a real story, one number, owned work, closed loops and the next visit.',
    },
  ],
  apply: {
    scenario: 'Line check, the board.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Folake read the top line twice?',
        options: [
          { text: 'It was misspelled', why: 'It was the goal itself.' },
          { text: 'She didn\'t approve it', why: 'She was surprised it was theirs.' },
          { text: 'It\'s a goal about clinics and patients, written by the team' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['Task significance', 'Task identity', 'Outcome goal'],
        items: [
          { text: 'The Kano grandmother story', group: 0 },
          { text: 'Chidi\'s northern 40', group: 1 },
          { text: 'All 300 clinics live', group: 2 },
          { text: 'Ibadan saw 40 patients', group: 0 },
          { text: 'Bisi\'s 12 clinics', group: 1 },
          { text: 'Results within a day', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'emmanuel',
        message: 'I\'m visiting Abeokuta? Will Dr Bello be there?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'She will. She asked to meet the person who fixed her login. That\'s you.' },
          { text: 'Doesn\'t matter, it\'s just a visit.', why: 'It matters a lot. That\'s the point.' },
          { text: 'Only if you hit your numbers.', why: 'Visits aren\'t a reward to earn.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Each person owning their own clinics adds task ___. (one word)',
        answers: ['identity', 'Identity'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why no ticket counts on the board?',
        options: [
          { text: 'They\'re secret', why: 'They exist. They\'re just not the headline.' },
          { text: 'They pull attention to activity; the board shows outcomes and people' },
          { text: 'Nobody closes tickets now', why: 'They do. The goal is clinics.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'An earlier version of the board. Which line breaks Chapter 2?',
        lines: [
          'Our goal: all 300 clinics live by rollout.',
          'Top ticket-closer this week: Chidi (312).',
          'This week\'s story: a Kano grandmother.',
        ],
        bug: 1,
        fix: 'Fixed and followed up: Ibadan saw 40 patients.',
        explanation: 'A ticket ranking turns the board back into a race about activity.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the board in order, top to bottom.',
        lines: ['The goal', 'This week\'s story', 'One number', 'Who owns which clinics', 'Next visit'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['The Monday story', 'Grant: task significance'],
          ['Owned clinics', 'Hackman and Oldham'],
          ['Results within a day', 'Locke and Latham'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Show [[1]] and outcomes, not just [[2]].',
        blanks: [['people', 'stories'], ['activity', 'tickets']],
        distractors: ['slogans', 'blame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the board\'s first word.',
        tiles: ['Our', 'goal:'],
        distractors: ['My'],
      },
    ],
  },
  reflect: {
    prompt: 'Sketch a board for a team or group you\'re in: the goal, a story, one number, who owns what. What would you leave off?',
    starters: ['The goal: ...', 'I\'d leave off...'],
  },
  deepen: {
    title: 'Redesign one board',
    summary: 'If your team has a dashboard or board, move one real story and one outcome number to the top. Move the activity counts lower down.',
  },
  notes: 'Synthesis of Chapter 2 tools: outcome goals (Locke & Latham), task significance (Grant), task identity (Hackman & Oldham), closing the loop, beneficiary contact. Fictional board.',
};

export default lesson;

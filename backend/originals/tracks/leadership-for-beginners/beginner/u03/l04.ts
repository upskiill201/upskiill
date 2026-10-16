import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Reading: priorities, and why the team can't do everything (multitasking cost, WIP limits, stop-doing). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Priorities: the team can\'t do everything',
  summary: 'Lucía wrote down everything the team is doing. Twenty-three things. For five people. On the bus home, Tey sends her something to read.',
  minutes: 12,
  outcomes: [
    'Know why doing many things at once slows everyone down',
    'Choose a small number of priorities',
    'Make a "stop doing" list',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Twenty-three things, five people',
      html: "<p>A team with too many priorities doesn't have priorities. It has a list.</p><h3>Switching has a cost</h3><p>Research on task-switching (for example, by psychologists Joshua Rubinstein, David Meyer and Jeffrey Evans) shows that every time we switch between tasks, we lose time getting back up to speed. Some estimates put the cost of heavy switching as high as <strong>40% of productive time</strong>. Five people juggling 23 things are switching all day.</p><h3>Finish, then start</h3><p>Teams that build things (software teams, factories) often limit how much work is \"in progress\" at once. The idea is simple: <strong>finishing</strong> three things beats <strong>starting</strong> ten. Work that is 90% done is worth nothing to a customer.</p><h3>A few priorities, clearly ranked</h3><p>Pick one top priority and a very small number of others. Rank them. When two collide, the ranking decides, not whoever shouts loudest. Some leaders use a simple test: if this were the only thing we did this month, would it matter most?</p><h3>The stop-doing list</h3><p>Every new priority needs room. Ask the team: \"What are we doing that nobody would miss?\" Diego's 14-page quarterly report turned out to be read by nobody, including Carmen. She wanted one page.</p><p>Saying no isn't laziness. It's what makes yes possible.</p>",
    },
    {
      kind: 'check',
      question: 'What\'s the point of a "stop doing" list?',
      options: ['To make room for what matters most', 'To do less work overall', 'To punish low performers'],
      answer: 0,
      explanation: 'Every new priority needs time from somewhere.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One top priority, a few others, ranked. Finish before you start. Make a stop-doing list.',
    },
  ],
  apply: {
    scenario: 'The bus home, reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does juggling 23 things slow a team down?',
        options: [
          { text: 'It doesn\'t; more is always faster', why: 'Task-switching research says otherwise.' },
          { text: 'Every switch between tasks costs time to get back up to speed' },
          { text: 'Because the list is too long to read', why: 'It\'s the switching that costs.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good priority habit, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'One clear top priority', group: 0 },
          { text: 'Everything is urgent', group: 1 },
          { text: 'Finish before starting something new', group: 0 },
          { text: 'Start ten things at once', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'Honestly, I only read the first page of Diego\'s report.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'He worked really hard on it, though.', why: 'Effort on the wrong thing is still wasted.' },
          { text: 'Great, I\'ll tell him.', why: 'Fine, but it misses the chance to free up his time.' },
          { text: 'Then shall we make it one page? That frees up Diego for the launch.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A list of things the team will no longer do is a "stop ___" list. (one word)',
        answers: ['doing', 'Doing'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Some estimates put heavy task-switching costs as high as...',
        options: [
          { text: '40% of productive time' },
          { text: '1%', why: 'Much more than that.' },
          { text: '100%', why: 'That would mean nothing ever gets done.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea.',
        pairs: [
          ['Switching cost', 'Time lost getting back up to speed'],
          ['Limit work in progress', 'Finish before you start'],
          ['Stop-doing list', 'Make room for what matters'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s priority list. Which line breaks it?',
        lines: [
          '1. Chili-lime campaign, launch June 17.',
          '2. Newsletter test sends.',
          '3. Also all 21 other things, equally important.',
        ],
        bug: 2,
        fix: 'Paused until July: the 21 other things.',
        explanation: 'If everything else is equally important, the ranking means nothing.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put setting priorities in order.',
        lines: ['List everything the team is doing', 'Pick one top priority', 'Rank a few others', 'Agree what to stop'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] three things beats [[2]] ten.',
        blanks: [['Finishing', 'finishing'], ['starting']],
        distractors: ['planning', 'doing'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the stop-doing question.',
        tiles: ['What', 'would', 'nobody', 'miss?'],
        distractors: ['love'],
      },
    ],
  },
  reflect: {
    prompt: 'List everything you\'re working on right now. Which one thing matters most? What could go on a stop-doing list?',
    starters: ['The one thing is...', 'I could stop...'],
  },
  deepen: {
    title: 'One thing off',
    summary: 'This week, take one thing off your plate: something nobody would miss. Use the time on your top priority.',
  },
  notes: 'Task switching: Rubinstein, Meyer & Evans (2001), "Executive Control of Cognitive Processes in Task Switching", J. Experimental Psychology: Human Perception and Performance 27(4); "up to 40% of productive time" is Meyer\'s widely cited estimate (APA), hedged as "some estimates". WIP limits from Kanban / lean practice. Fictional figures (23 things, 14-page report).',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 1 — a slide outline in minutes. Story: the founders' invitation. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A slide outline in minutes',
  summary: 'Month 6. Ada has ten minutes in front of the founders, Seun and Amaka, in two weeks. She starts where most people don\'t: an outline, not slides.',
  minutes: 12,
  outcomes: [
    'Ask AI for a slide outline from your material',
    'Fix the outline before making any slides',
    'Give AI the audience, time and goal',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Ten minutes with the founders',
      beats: [
        { speaker: 'narrator', text: 'Month 6. Tobi: "Seun and Amaka want the pilot story. Ten minutes, Thursday after next."' },
        { speaker: 'ada', text: 'I\'ll open slides and start designing.' },
        { speaker: 'tey', text: 'Wait. Paste your one-page report into the AI and ask for an outline first: one line per slide. Design comes last.' },
        { speaker: 'narrator', text: 'The AI suggests 14 slides. Ada cuts it to 7: ten minutes is about one slide every minute and a half.' },
        { speaker: 'ada', text: 'Seven lines on one page. I can see the whole talk before I\'ve made a single slide.' },
      ],
      choice: {
        prompt: 'Why start with an outline?',
        options: [
          { text: 'It\'s fast to fix the story before you spend hours on slides', outcome: 'Yes. Moving a line takes seconds; redesigning slides takes hours.', best: true },
          { text: 'Outlines look professional', outcome: 'Nobody sees the outline. It\'s for you.' },
          { text: 'Because AI can\'t make slides', outcome: 'Some tools can. The outline still comes first.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask for an outline first: audience, time, goal, and one line per slide. Fix the story, then design.',
    },
  ],
  apply: {
    scenario: 'Ada starts her founders\' presentation.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gives the best outline?',
        options: [
          { text: 'Make a presentation about the pilot.', why: 'No audience, time or goal.' },
          { text: 'From this report, outline a 10-minute talk for our two founders. Goal: approval to expand the pilot. One line per slide, about 7 slides.' },
          { text: 'Make 30 slides.', why: 'Too many for ten minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many slides did Ada cut the outline to?',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Tell the AI, or not needed?',
        groups: ['Tell the AI', 'Not needed'],
        items: [
          { text: 'Who the audience is', group: 0 },
          { text: 'How long you have', group: 0 },
          { text: 'Your favourite font', group: 1 },
          { text: 'What you want them to decide', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach.',
        lines: ['Paste the report', 'Ask for a one-line-per-slide outline', 'Cut and reorder it', 'Then make slides'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'How\'s the founders\' deck going? Have you started designing?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Not yet: I\'ve got a 7-line outline and I\'m fixing the story first. Slides tomorrow.' },
          { text: 'Yes, 30 slides done!', why: 'Too many, too soon.' },
          { text: 'I\'ll wing it.', why: 'Founders deserve preparation.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Fix the [[1]], then [[2]].',
        blanks: [['story'], ['design']],
        distractors: ['font', 'panic'],
      },
      {
        kind: 'findBug',
        prompt: 'Which outline line doesn\'t belong in a 10-minute founders\' talk?',
        lines: [
          'The pilot is ahead of plan',
          'Payments grew by half in four weeks',
          'A history of mobile money since 2007',
          'Ask: approve a second market',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Founders know the history; they need the result and the ask.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the detail to why AI needs it.',
        pairs: [
          ['Audience', 'Sets the level and tone'],
          ['Time', 'Sets the number of slides'],
          ['Goal', 'Sets where the talk ends'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s request.',
        tiles: ['One', 'line', 'per', 'slide,', 'about', '7', 'slides'],
        distractors: ['30'],
      },
      {
        kind: 'mcq',
        prompt: 'About how long per slide in a 10-minute, 7-slide talk?',
        options: [
          { text: 'About a minute and a half' },
          { text: 'About 10 seconds', why: 'Too fast.' },
          { text: 'About 5 minutes', why: 'That would be 35 minutes.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Outline stage, or design stage?',
        groups: ['Outline', 'Design'],
        items: [
          { text: 'Deciding the order of points', group: 0 },
          { text: 'Choosing colours', group: 1 },
          { text: 'Cutting slides', group: 0 },
          { text: 'Picking a template', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the founders\' presentation for?',
        options: [
          { text: 'Getting approval to expand the pilot' },
          { text: 'Showing every number', why: 'It has a decision to win.' },
          { text: 'Practising slides', why: 'It has a real goal.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'For your next presentation, write the audience, time and goal in one sentence each.',
    starters: ['Audience:', 'Goal:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI for a one-line-per-slide outline of your next talk. Cut it by a third.' },
  notes: 'Seun and Amaka are the founders of Ada\'s startup (narrated). Content fictional.',
};

export default lesson;

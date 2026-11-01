import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 15 — Checkpoint 3. Image rights, data slides, feedback, cutting. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: rights, data, feedback, cuts',
  summary: 'Images you\'re allowed to use, readable data slides, honest feedback and a deck cut in half. Show you can get a deck ready for the real room.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can choose images and data visuals safely', 'Show you can improve and shorten a deck'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. Three days to the founders, now five minutes.', replies: ['Ready'] },
        { tey: 'Warm-up: a photo from a news site. Free to use?', replies: ['No, check the licence'] },
        { tey: 'Online isn\'t free. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: getting the deck ready.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Safe to use, or not?',
        groups: ['Safe', 'Not safe'],
        items: [
          { text: 'Ada\'s launch photo, with permission', group: 0 },
          { text: 'A photo copied from a news site', group: 1 },
          { text: 'Licensed stock image', group: 0 },
          { text: 'AI image of a real celebrity using the app', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does crediting a website make its photo OK to use?',
        options: [
          { text: 'Yes', why: 'You need permission or a licence.' },
          { text: 'No; credit isn\'t permission' },
          { text: 'Only for small images', why: 'Size doesn\'t matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep on the slide chart, or remove?',
        groups: ['Keep', 'Remove'],
        items: [
          { text: 'One total line', group: 0 },
          { text: 'Gridlines', group: 1 },
          { text: 'Highlighted final value', group: 0 },
          { text: '8-point grey labels', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which feedback request is best?',
        options: [
          { text: 'Is it good?', why: 'Praise.' },
          { text: 'Act as a busy founder. For each slide: is the title the point, what\'s confusing, what would you ask? Be direct. Name the weakest slide.' },
          { text: 'Say something nice.', why: 'Not feedback.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the four-slide spine.',
        lines: ['Situation', 'Problem', 'Answer', 'Ask'],
      },
      {
        kind: 'findBug',
        prompt: 'Which cutting choice is wrong?',
        lines: ['Keep the growth chart', 'Move costs to backup', 'Delete the cost slide forever', 'Keep the ask last'],
        bug: 2,
        fix: 'Move it to backup.',
        explanation: 'Founders will ask about costs.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says your deck is "excellent". Done?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, excellent.', why: 'Praise isn\'t a review.' },
          { text: 'AI reviews are useless.', why: 'Useful when asked well.' },
          { text: 'I asked it to be direct and it flagged slide 4. And I\'m showing Tobi tomorrow, because he knows the founders.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Found online isn\'t [[1]]. Move detail, don\'t [[2]] it.',
        blanks: [['free'], ['delete']],
        distractors: ['fun', 'print'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the image source to what to check.',
        pairs: [
          ['Photo of people', 'Their permission'],
          ['Stock image', 'The licence'],
          ['AI image', 'The tool\'s terms'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Ada says with the chart.',
        tiles: ['Six', 'hundred', 'a', 'week,', 'up', 'from', 'four', 'hundred'],
        distractors: ['about'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Five-minute talk: about how many slides?',
        answers: ['4', 'four', '3', '3-4'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI first pass, or a real person?',
        groups: ['AI', 'Real person'],
        items: [
          { text: 'Spotting label titles', group: 0 },
          { text: 'What Amaka always asks', group: 1 },
          { text: 'Crowded slides', group: 0 },
          { text: 'How the founders feel about costs', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What has the US Copyright Office said about fully AI-made images?',
        options: [
          { text: 'They need human creative input to be copyrighted' },
          { text: 'The AI owns them', why: 'Human authorship is required.' },
          { text: 'They\'re illegal', why: 'They\'re allowed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which slide plan crams?',
        lines: ['Slide 1: shops juggle apps', 'Slide 2: costs, risks, team and timeline', 'Slide 3: payments grew by half', 'Slide 4: approve a second market'],
        bug: 1,
        fix: 'Slide 2: shops find fees confusing (rest to backup)',
        explanation: 'Four ideas on one slide.',
      },
    ],
  },
  reflect: {
    prompt: 'Which of these four would most improve your next real presentation?',
    starters: ['The one:', 'Because...'],
  },
  notes: 'Checkpoint for Unit 8 lessons 11-14.',
};

export default lesson;

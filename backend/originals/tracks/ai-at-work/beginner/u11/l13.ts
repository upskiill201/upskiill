import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 13 — keeping your own skills sharp. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Keeping your own skills sharp',
  summary: 'Tolu admits he can\'t write a summary without AI anymore. Tey explains the "jagged frontier", and how to keep your own skills strong.',
  minutes: 12,
  outcomes: [
    'Know the "jagged frontier" finding',
    'Keep core skills strong while using AI',
    'Notice when AI is outside its strengths',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'In a 2023 Harvard and BCG study, consultants using AI did realistic tasks. On tasks AI was good at, they finished more, faster, with higher quality.', replies: ['So AI made them better?'] },
        { tey: 'On those tasks, yes. But on a task just outside AI\'s strengths, consultants using AI were about 19 percentage points less likely to get the right answer. They trusted it where they shouldn\'t have.', replies: ['How do I know where the edge is?'] },
        { tey: 'The researchers called it a "jagged frontier": AI is great at some tasks and weak at similar-looking ones. Your own skill is how you notice when it\'s wrong.', replies: ['So how do I stay sharp?'] },
        { tey: 'Do some work without AI regularly. Draft first sometimes, then compare. Explain AI answers in your own words. Your judgement is the part AI can\'t replace.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'AI is strong on some tasks and weak on similar ones. Keep your skills sharp: draft first sometimes, compare, and explain answers yourself.',
    },
  ],
  apply: {
    scenario: 'Tolu worries he\'s losing his skills.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is the "jagged frontier"?',
        options: [
          { text: 'AI is strong at some tasks and weak at similar-looking ones' },
          { text: 'A border in a map', why: 'It\'s about AI\'s uneven strengths.' },
          { text: 'AI is equally good at everything', why: 'It\'s uneven.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'On the task outside AI\'s strengths, AI users were about how many percentage points less likely to be correct?',
        answers: ['19', '19 points'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps skills sharp, or lets them fade?',
        groups: ['Keeps sharp', 'Fades'],
        items: [
          { text: 'Drafting first, then comparing with AI', group: 0 },
          { text: 'Copying every answer without reading', group: 1 },
          { text: 'Explaining AI answers in your own words', group: 0 },
          { text: 'Never doing the task yourself', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'My junior team uses AI for everything. Should I worry?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'A little. Ask them to draft some things first and compare with AI. Their judgement is what catches AI mistakes.' },
          { text: 'No, AI does it all now.', why: 'Judgement still matters.' },
          { text: 'Ban AI for juniors.', why: 'Balance, not a ban.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] first sometimes, then [[2]].',
        blanks: [['Draft'], ['compare']],
        distractors: ['Copy', 'delete'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the skill it protects.',
        pairs: [
          ['Draft first', 'Writing'],
          ['Explain answers yourself', 'Understanding'],
          ['Spot-check facts', 'Judgement'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which belief is risky?',
        lines: [
          'AI is great at some tasks',
          'It can be weak at similar-looking ones',
          'If it\'s good at one task, it\'s good at the next',
          'My skill helps me spot its mistakes',
        ],
        bug: 2,
        fix: 'Check AI more carefully on unfamiliar tasks.',
        explanation: 'The frontier is jagged.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request keeps Tolu learning?',
        options: [
          { text: 'Write the summary for me.', why: 'He learns nothing.' },
          { text: 'Here\'s my own summary of this report. Compare it with the report and tell me what I missed or got wrong.' },
          { text: 'Do my job today.', why: 'No learning.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s learning request.',
        tiles: ['Tell', 'me', 'what', 'I', 'missed'],
        distractors: ['Write', 'it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was the Harvard and BCG "jagged frontier" study?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good practice routine for Tolu, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'One summary a week without AI', group: 0 },
          { text: 'Never reading the source', group: 1 },
          { text: 'Asking AI to critique his draft', group: 0 },
          { text: 'Pasting AI output unread', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does your own skill matter even with AI?',
        options: [
          { text: 'It\'s how you notice when AI is wrong' },
          { text: 'It doesn\'t anymore', why: 'It catches mistakes.' },
          { text: 'Only for exams', why: 'For judgement at work.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which skill of yours is fading because AI does it? How will you practise it?',
    starters: ['The skill:', 'I\'ll practise by...'],
  },
  deepen: { title: 'Try it today', summary: 'Draft one thing yourself today, then ask AI what you missed.' },
  notes: 'Dell\'Acqua et al. (2023), Harvard Business School Working Paper 24-013 ("Navigating the Jagged Technological Frontier"), 758 BCG consultants: inside the frontier, 12% more tasks, 25% faster, 40%+ higher quality; outside it, 19 percentage points less likely to be correct.',
};

export default lesson;

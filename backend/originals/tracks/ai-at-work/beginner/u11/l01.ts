import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 1 — prompts worth saving. Story: "Can I have your prompts?" */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Prompts worth saving',
  summary: 'Month 9. Everyone wants Ada\'s prompts, but they\'re scattered across 300 chats. Which ones are actually worth saving?',
  minutes: 12,
  outcomes: [
    'Spot prompts worth saving',
    'Know what makes a prompt reusable',
    'Start a small collection today',
  ],
  learn: [
    {
      kind: 'story',
      title: '300 chats',
      beats: [
        { speaker: 'narrator', text: 'Month 9. Tolu: "Can I have that prompt you use for meeting follow-ups?" Ada scrolls. And scrolls. 300 chats.' },
        { speaker: 'ada', text: 'I\'ve written that prompt from scratch maybe forty times. Slightly different each time.' },
        { speaker: 'tey', text: 'That\'s the sign a prompt is worth saving: you use it often, it works well, and you keep rewriting it.' },
        { speaker: 'narrator', text: 'Ada makes a list of the tasks she does every week with AI. Six of them come up again and again.' },
        { speaker: 'ada', text: 'Six prompts would cover most of my week. That\'s my playbook\'s first page.' },
      ],
      choice: {
        prompt: 'Which prompts should Ada save first?',
        options: [
          { text: 'The ones she uses weekly and that reliably give good results', outcome: 'Yes. Frequent and reliable: that\'s where saving pays off.', best: true },
          { text: 'Every prompt she\'s ever written', outcome: 'A library of 300 prompts is as hard to search as 300 chats.' },
          { text: 'The longest, most impressive ones', outcome: 'Length isn\'t value. Usefulness is.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Save prompts you use often, that work well, and that you keep rewriting. Start with five or six.',
    },
  ],
  apply: {
    scenario: 'Ada picks her first prompts to save.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Worth saving, or not?',
        groups: ['Worth saving', 'Not worth it'],
        items: [
          { text: 'Meeting follow-up, used weekly', group: 0 },
          { text: 'A one-off question about a holiday', group: 1 },
          { text: 'Friday status update, used weekly', group: 0 },
          { text: 'A prompt that gave a bad answer', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the clearest sign a prompt is worth saving?',
        options: [
          { text: 'It\'s very long', why: 'Length isn\'t value.' },
          { text: 'You use it often, it works, and you keep rewriting it' },
          { text: 'It was the first you wrote', why: 'Use and quality matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many chats did Ada have to scroll through?',
        answers: ['300', 'three hundred'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you send me all your prompts?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Here are all 300.', why: 'Too many to use.' },
          { text: 'They\'re in my chats somewhere.', why: 'Not useful to others.' },
          { text: 'I\'m picking the six I use every week that work best. I\'ll send those, with a note on when to use each.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Save prompts you use [[1]], that work [[2]].',
        blanks: [['often'], ['well']],
        distractors: ['once', 'badly'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Ada\'s weekly task to a prompt to save.',
        pairs: [
          ['Monday', 'Plan my week'],
          ['After meetings', 'Five-part follow-up'],
          ['Friday', 'Status update'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which item on Ada\'s save list doesn\'t belong?',
        lines: [
          'Meeting follow-up (weekly)',
          'Status update (weekly)',
          'Birthday poem for a cousin (once)',
          'Pre-send check (daily)',
        ],
        bug: 2,
        fix: 'Delete it from the work playbook.',
        explanation: 'One-off tasks don\'t need a saved prompt.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Frequent', 'and', 'reliable', 'first'],
        distractors: ['long'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada finds prompts worth saving.',
        lines: ['List weekly AI tasks', 'Find the best prompt for each', 'Save five or six', 'Share them'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start with five or six, not fifty?',
        options: [
          { text: 'A small, good collection actually gets used' },
          { text: 'There\'s a limit', why: 'It\'s about usability.' },
          { text: 'Fifty is better', why: 'Too many to find.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Reusable, or tied to one moment?',
        groups: ['Reusable', 'One moment'],
        items: [
          { text: 'Turn notes into a five-part follow-up', group: 0 },
          { text: 'Reply to Carmen about Monday\'s outage', group: 1 },
          { text: 'Summarise any report for a busy manager', group: 0 },
          { text: 'Draft a thank-you to Seun for Tuesday', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does saving the prompt save Ada?',
        options: [
          { text: 'Nothing', why: 'Time and consistency.' },
          { text: 'Only typing', why: 'Also quality.' },
          { text: 'Time, and getting consistently good results' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which AI tasks do you do every week? Which prompt do you keep rewriting?',
    starters: ['Every week I...', 'I keep rewriting...'],
  },
  deepen: { title: 'Try it today', summary: 'Write down three AI tasks you do weekly. Save your best prompt for one of them.' },
  notes: 'Content fictional.',
};

export default lesson;

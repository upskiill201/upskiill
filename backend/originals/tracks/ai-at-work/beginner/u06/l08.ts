import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 8 — checklists for repeat work. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Checklists for repeat work',
  summary: 'Every shop sign-up has the same 8 steps, and missing one costs a day. A short checklist fixes that. Surgeons use them too.',
  minutes: 12,
  outcomes: [
    'Know why checklists work for repeat tasks',
    'Turn a process into a short checklist with AI',
    'Keep checklists short enough to use',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Checklists are only for beginners.',
          isFact: false,
          explain: 'Experts use them too. Pilots and surgeons use checklists precisely because experts skip steps under pressure.',
        },
        {
          text: 'A simple checklist has saved lives in hospitals.',
          isFact: true,
          explain: 'A 2009 study of the WHO Surgical Safety Checklist across eight hospitals found deaths fell from 1.5% to 0.8% after it was introduced.',
        },
        {
          text: 'The longer the checklist, the better.',
          isFact: false,
          explain: 'Long checklists get skipped. Keep only the steps that are easy to miss and costly to forget.',
        },
        {
          text: 'AI can turn a written process into a checklist in seconds.',
          isFact: true,
          explain: 'Paste the process and ask for a short checklist of the steps people usually miss. Then test it once and trim it.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Checklist only the steps that are easy to miss and costly to forget. Five to nine items. Test it once, then trim.',
    },
  ],
  apply: {
    scenario: 'Tolu makes a shop sign-up checklist.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened after the WHO Surgical Safety Checklist was introduced in the 2009 study?',
        options: [
          { text: 'Deaths fell from 1.5% to 0.8%' },
          { text: 'Nothing changed', why: 'Deaths and complications fell.' },
          { text: 'Surgeries got much longer', why: 'The finding was about safety.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Put it on the checklist, or leave it off?',
        groups: ['On the checklist', 'Leave off'],
        items: [
          { text: 'Make a test payment with the shop owner', group: 0 },
          { text: 'Walk to the shop', group: 1 },
          { text: 'Check the owner\'s ID matches the account name', group: 0 },
          { text: 'Say hello', group: 1 },
          { text: 'Give them the support number', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best checklist?',
        options: [
          { text: 'Make a checklist.', why: 'No process given.' },
          { text: 'Here\'s our shop sign-up process. Make a checklist of 5-9 steps, only the ones people are likely to miss or that cause problems if missed.' },
          { text: 'List every possible step.', why: 'Too long to use.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Tolu\'s checklist has 34 items. Isn\'t that thorough?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Too long to use at a busy market stall. We\'re cutting it to the 8 steps people actually miss.' },
          { text: 'Yes, longer is better.', why: 'Long checklists get skipped.' },
          { text: 'We\'ll drop the checklist.', why: 'Trim it instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Checklist only the steps that are easy to [[1]] and costly to [[2]].',
        blanks: [['miss'], ['forget']],
        distractors: ['love', 'print'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many items should a usable checklist have, at most? (number)',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which item doesn\'t belong on the sign-up checklist?',
        lines: [
          'ID matches account name',
          'Test payment completed',
          'Smile and be friendly',
          'Support number given',
        ],
        bug: 2,
        fix: 'Remove it; it isn\'t a step people forget that breaks the sign-up.',
        explanation: 'Checklists are for easily missed, costly steps.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the checklist step to the problem it prevents.',
        pairs: [
          ['ID matches account', 'Payments to the wrong person'],
          ['Test payment done', 'Shop thinks it works when it doesn\'t'],
          ['Support number given', 'Shop stuck with nobody to call'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tolu\'s checklist rule.',
        tiles: ['Test', 'it', 'once,', 'then', 'trim', 'it'],
        distractors: ['frame'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Tolu makes the checklist.',
        lines: ['Write out the process', 'Ask AI for the easy-to-miss steps', 'Try it at one shop', 'Trim what didn\'t help'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good checklist habit or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Testing it at one shop first', group: 0 },
          { text: 'Adding every possible step', group: 1 },
          { text: 'Keeping it to one page', group: 0 },
          { text: 'Never updating it', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do experts still use checklists?',
        options: [
          { text: 'Under pressure, anyone can skip a step' },
          { text: 'They forget everything', why: 'Pressure, not ignorance.' },
          { text: 'They don\'t', why: 'Pilots and surgeons do.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which task do you repeat often and sometimes get wrong? What would its checklist say?',
    starters: ['The task:', 'Checklist item 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Paste one repeated process into AI and ask for a 5-9 item checklist of easy-to-miss steps.' },
  notes: 'Haynes et al. (2009), New England Journal of Medicine: WHO Surgical Safety Checklist in 8 hospitals; deaths 1.5% to 0.8%, complications 11.0% to 7.0%. See also Gawande, The Checklist Manifesto (2009).',
};

export default lesson;

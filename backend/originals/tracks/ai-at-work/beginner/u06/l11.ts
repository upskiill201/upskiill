import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 6 · Lesson 11 — risks: what could go wrong? The pre-mortem. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Risks: what could go wrong?',
  summary: 'Asking "what could go wrong?" gets polite answers. Imagining the project has already failed gets honest ones. That\'s the pre-mortem, and AI is a great partner for it.',
  minutes: 13,
  outcomes: [
    'Run a pre-mortem with AI',
    'Rank risks by likelihood and impact',
    'Turn the top risks into actions',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The pre-mortem',
      html:
        '<p>Psychologist Gary Klein popularised the <strong>pre-mortem</strong>: before starting, imagine it\'s three months from now and the project has failed. Then write down why.</p>' +
        '<p>It works because imagining a failure as certain makes reasons easier to find. A 1989 study by Mitchell, Russo and Pennington found that this "prospective hindsight" increased people\'s ability to identify reasons for an outcome by about <strong>30%</strong>.</p>' +
        '<h3>With AI</h3>' +
        '<p><em>"It\'s December. Our 3-month pilot with 50 shops in Makola market failed. Write the 8 most likely reasons why."</em></p>' +
        '<p>Then rank each reason: <strong>how likely</strong> and <strong>how bad</strong>. Act on the ones high on both: give each an owner and a step to prevent it.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Imagine it already failed and ask why. Rank by likelihood and impact. Give the top risks an owner and a prevention step.',
    },
  ],
  apply: {
    scenario: 'Tolu runs a pre-mortem on the pilot.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is a pre-mortem?',
        options: [
          { text: 'Imagining the project has already failed, and asking why' },
          { text: 'A review after the project ends', why: 'That\'s a post-mortem.' },
          { text: 'A celebration before launch', why: 'It\'s a risk exercise.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'By about what percentage did prospective hindsight improve finding reasons? (number)',
        answers: ['30', '30%'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request gets the most honest risks?',
        options: [
          { text: 'What could go wrong with our pilot?', why: 'Tends to get polite, generic answers.' },
          { text: 'It\'s December. Our 3-month pilot with 50 Makola shops failed. Write the 8 most likely reasons why.' },
          { text: 'Will our pilot succeed?', why: 'It can\'t know.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Rank the risks. Act now, or watch?',
        groups: ['Act now (likely and bad)', 'Watch'],
        items: [
          { text: 'Shops stop using the app after week 2', group: 0 },
          { text: 'A flyer has a typo', group: 1 },
          { text: 'Settlement to shops is slower than promised', group: 0 },
          { text: 'It rains on launch morning', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to a prevention step.',
        pairs: [
          ['Shops stop using it', 'Weekly visits for the first month'],
          ['Slow settlement', 'Agree settlement times with the bank in writing'],
          ['Support calls unanswered', 'A named person on the support line each day'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Isn\'t it negative to imagine the pilot failing?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'It\'s the opposite: we find the problems now, while they\'re cheap to fix.' },
          { text: 'Yes, let\'s skip it.', why: 'It\'s how you prevent failure.' },
          { text: 'It\'s just for fun.', why: 'It\'s a serious tool.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Rank by [[1]] and [[2]].',
        blanks: [['likelihood'], ['impact']],
        distractors: ['colour', 'length'],
      },
      {
        kind: 'findBug',
        prompt: 'Which top risk has no action?',
        lines: [
          'Shops stop using it: weekly visits (Tolu)',
          'Slow settlement: written agreement (Ada)',
          'Support unanswered: we\'ll see what happens',
          'Fraud: ID check on sign-up (Tolu)',
        ],
        bug: 2,
        fix: 'Support unanswered: named person on the line each day (Tolu).',
        explanation: 'A top risk needs an owner and a step.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the pre-mortem opener.',
        tiles: ['It\'s', 'December.', 'The', 'pilot', 'failed.', 'Why?'],
        distractors: ['succeeded.'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pre-mortem.',
        lines: ['Imagine it failed', 'List the reasons', 'Rank likelihood and impact', 'Give top risks an owner and a step'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Who should add risks the AI can\'t know?',
        groups: ['The AI can suggest', 'People must add'],
        items: [
          { text: 'Common reasons pilots fail', group: 0 },
          { text: 'The bank\'s settlement problems last year', group: 1 },
          { text: 'General market risks', group: 0 },
          { text: 'A key shop owner who\'s unhappy', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does imagining certain failure work better than "what could go wrong"?',
        options: [
          { text: 'Treating failure as fact makes reasons easier to find, and less awkward to say' },
          { text: 'It doesn\'t', why: 'Research found it helps.' },
          { text: 'It scares people into working harder', why: 'It\'s about finding reasons.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Run a two-minute pre-mortem on something you\'re working on. What\'s the top reason it could fail?',
    starters: ['It failed because...', 'To prevent it...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to write the "failed project" story for your current project. Act on the top reason.' },
  notes: 'Klein (2007), Harvard Business Review, "Performing a project premortem". Mitchell, Russo & Pennington (1989), Journal of Behavioral Decision Making: prospective hindsight increased ability to identify reasons by ~30%.',
};

export default lesson;

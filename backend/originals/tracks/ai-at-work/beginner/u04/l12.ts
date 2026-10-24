import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 12 — high-stakes vs low-stakes tasks. */
const lesson: OriginalLesson = {
  key: 'l12',
  title: 'High-stakes vs low-stakes tasks',
  summary: 'Not every AI answer needs the same checking. Match the effort to what happens if it\'s wrong.',
  minutes: 12,
  outcomes: [
    'Sort tasks by what a mistake would cost',
    'Choose a light or a full check',
    'Know which tasks need a human expert',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two tasks, same morning',
      before: {
        label: 'Low stakes',
        text: 'Ada asks the AI for five ideas for the team lunch message. If one is a bit cheesy, nobody is hurt.\nCheck: a quick read for tone. Two seconds.',
      },
      after: {
        label: 'High stakes',
        text: 'Ada asks the AI what the rules are for storing Ghanaian customers\' ID numbers. If it\'s wrong, the company could break data protection law.\nCheck: use it only to find the questions, then confirm with the official regulator\'s guidance and the company\'s legal adviser.',
      },
      notes: [
        'Ask: "What happens if this is wrong, and who gets hurt?"',
        'Low stakes: a quick read. High stakes: official sources and a qualified human.',
        'Legal, medical, financial and safety questions are always high stakes.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Check effort should match the cost of being wrong. Legal, money, health and safety: AI helps you prepare, a qualified human decides.',
    },
  ],
  apply: {
    scenario: 'Ada is sorting her AI tasks for the week.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Low stakes or high stakes?',
        groups: ['Low stakes', 'High stakes'],
        items: [
          { text: 'Ideas for a team lunch message', group: 0 },
          { text: 'Data protection rules for customer IDs', group: 1 },
          { text: 'A tidier version of her notes', group: 0 },
          { text: 'Tax on a client invoice', group: 1 },
          { text: 'A name for an internal Slack channel', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What question decides how much to check?',
        options: [
          { text: 'How long is the answer?', why: 'Length doesn\'t measure risk.' },
          { text: 'What happens if this is wrong, and who gets hurt?' },
          { text: 'Which AI tool wrote it?', why: 'All tools can be wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s risk question.',
        tiles: ['What', 'happens', 'if', 'this', 'is', 'wrong?'],
        distractors: ['nice'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the task to the right check.',
        pairs: [
          ['Team lunch idea', 'Quick read'],
          ['Client statistic', 'Open the source'],
          ['Legal rule', 'Official guidance and a legal adviser'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can we just use the AI\'s answer on Ghana\'s data protection law for the launch plan?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, it sounded very sure.', why: 'High stakes need a qualified human.' },
          { text: 'No, never ask AI about law.', why: 'It can help you prepare questions.' },
          { text: 'It\'s a good list of questions to ask. Let\'s confirm the answers with the regulator\'s guidance and our lawyer.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Check effort should match the [[1]] of being [[2]].',
        blanks: [['cost'], ['wrong']],
        distractors: ['length', 'polite'],
      },
      {
        kind: 'findBug',
        prompt: 'Which item in Ada\'s plan is under-checked?',
        lines: [
          'Lunch message: quick read',
          'Client stat: source opened',
          'Invoice tax rate: copied from AI chat',
          'Slack channel name: no check',
        ],
        bug: 2,
        fix: 'Invoice tax rate: confirmed with finance or the official tax authority.',
        explanation: 'Money and tax are high stakes.',
      },
      {
        kind: 'mcq',
        prompt: 'Which areas are always high stakes?',
        options: [
          { text: 'Legal, money, health and safety' },
          { text: 'Only legal', why: 'Money, health and safety too.' },
          { text: 'None, if the AI is good', why: 'Stakes are about consequences, not the tool.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What\'s the AI\'s role here?',
        groups: ['AI can draft it', 'AI helps prepare, a human decides'],
        items: [
          { text: 'Thank-you note to a colleague', group: 0 },
          { text: 'Whether a contract clause is legal', group: 1 },
          { text: 'Agenda for a team meeting', group: 0 },
          { text: 'A customer\'s refund under consumer law', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Legal, money, health and ... are always high stakes (one word)',
        answers: ['safety'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is right for a high-stakes legal question?',
        options: [
          { text: 'Tell me the law so I can put it in the plan.', why: 'Treats AI as the final authority.' },
          { text: 'List the questions I should ask a lawyer about storing customer ID numbers in Ghana, and the official bodies whose guidance I should read.' },
          { text: 'Give me a short legal answer.', why: 'Short doesn\'t make it reliable.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s approach to a high-stakes question.',
        lines: ['Ask AI for the key questions', 'Read the official guidance', 'Confirm with a qualified person', 'Then write the plan'],
      },
    ],
  },
  reflect: {
    prompt: 'List two low-stakes and two high-stakes AI tasks from your job. How would you check each?',
    starters: ['Low stakes:', 'High stakes:'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next AI task, ask "What happens if this is wrong?" and pick the matching check.' },
  notes: 'General risk-based guidance. Nothing here is legal advice; legal questions should go to a qualified adviser and official regulator guidance.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 11 · Lesson 19 — Ada's personal AI playbook. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your personal AI playbook',
  summary: 'Everything from Unit 11 comes together in Ada\'s one-page playbook: what she uses AI for, how, and how she keeps it improving.',
  minutes: 12,
  outcomes: [
    'Write a one-page AI playbook',
    'Link each part to a lesson in this unit',
    'Share a version with your team',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<p>Ada\'s one-page playbook:</p>' +
        '<table><tr><th>Section</th><th>What\'s in it</th></tr>' +
        '<tr><td><strong>Setup</strong></td><td>Custom instructions: role, style, "never invent figures".</td></tr>' +
        '<tr><td><strong>My six prompts</strong></td><td>Templates with blanks, each with when to use and what to check.</td></tr>' +
        '<tr><td><strong>My chains</strong></td><td>Monthly report: five steps with checks.</td></tr>' +
        '<tr><td><strong>My day</strong></td><td>Inbox, plan, write, follow up, wrap up. One AI-free hour.</td></tr>' +
        '<tr><td><strong>Automations</strong></td><td>Friday status draft, human check before sending.</td></tr>' +
        '<tr><td><strong>Don\'t</strong></td><td>One-line replies, personal messages, regulated decisions, never-paste data.</td></tr>' +
        '<tr><td><strong>Upkeep</strong></td><td>Friday two-minute review, test after updates, one change a week.</td></tr></table>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Setup, prompts, chains, day, automations, don\'ts, upkeep. One page you actually use, improved every week.',
    },
  ],
  apply: {
    scenario: 'Ada writes her playbook.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the playbook sections.',
        lines: ['Setup', 'My six prompts', 'My chains', 'My day', 'Automations', 'Don\'t', 'Upkeep'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the section to the lesson.',
        pairs: [
          ['Setup', 'Custom instructions'],
          ['My chains', 'Chaining tasks together'],
          ['Upkeep', 'Your weekly AI review'],
          ['Automations', 'Simple automations'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section does this belong in?',
        groups: ['Don\'t', 'Upkeep'],
        items: [
          { text: 'Personal messages', group: 0 },
          { text: 'Test after updates', group: 1 },
          { text: 'Never-paste data', group: 0 },
          { text: 'One change a week', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the playbook to one page?',
        options: [
          { text: 'Pages are expensive', why: 'Usability.' },
          { text: 'It\'s easy to use and share' },
          { text: 'Longer is better', why: 'One page gets used.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen wants to give your playbook to our whole team. Can we?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Only copy it exactly.', why: 'Adapt it.' },
          { text: 'No, it\'s personal.', why: 'Sharing helps.' },
          { text: 'Yes. Keep the structure, swap in your tools, prompts and rules, and give it an owner who updates it.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the callout.',
        template: 'One page you actually [[1]], improved every [[2]].',
        blanks: [['use'], ['week']],
        distractors: ['print', 'year'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line doesn\'t belong in Ada\'s playbook?',
        lines: [
          'Setup: plain British English, never invent figures',
          'Prompts: six templates with checks',
          'Don\'t: condolences or regulated decisions',
          'Setup: bank login ada@ / Pilot2024!',
        ],
        bug: 3,
        fix: 'Remove it and change the password.',
        explanation: 'Credentials never go in a playbook.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the playbook\'s summary.',
        tiles: ['Setup,', 'prompts,', 'chains,', 'day,', 'don\'ts,', 'upkeep'],
        distractors: ['secrets'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many prompts are in Ada\'s "My prompts" section?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'In the "Don\'t" section, or fine with AI?',
        groups: ['Don\'t', 'Fine'],
        items: [
          { text: 'One-line replies', group: 0 },
          { text: 'Report summaries', group: 1 },
          { text: 'Credit decisions about shops', group: 0 },
          { text: 'Meeting follow-up drafts', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why include a "Don\'t" section?',
        options: [
          { text: 'Knowing when not to use AI is as important as knowing how' },
          { text: 'To fill space', why: 'It prevents mistakes.' },
          { text: 'No reason', why: 'It matters.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What keeps the playbook from going stale?',
        options: [
          { text: 'Printing it', why: 'Upkeep does.' },
          { text: 'Nothing; it\'s permanent', why: 'Tools change.' },
          { text: 'The Friday review and testing after updates' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Draft your own one-page playbook. Which section is strongest? Which is empty?',
    starters: ['Strongest:', 'Empty:'],
  },
  deepen: { title: 'Try it today', summary: 'Write the "Don\'t" section of your playbook first: when you won\'t use AI.' },
  notes: 'Summary of Unit 11. Credentials shown are fictional.',
};

export default lesson;

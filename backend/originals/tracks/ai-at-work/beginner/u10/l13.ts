import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 13 — safe settings in AI tools. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Safe settings in AI tools',
  summary: 'Ada opens the settings of her AI tool for the first time. Five minutes there makes everything safer.',
  minutes: 12,
  outcomes: [
    'Find the privacy settings in an AI tool',
    'Know the settings that matter most',
    'Recheck settings when tools update',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A five-minute settings check',
      steps: [
        { title: '1. Training', body: 'Look for a setting about using your chats to improve the model. Many tools let you turn it off. Work plans often have it off by default.' },
        { title: '2. History and retention', body: 'How long are chats kept? Can you delete them? Some tools offer temporary chats that aren\'t saved to your history.' },
        { title: '3. Memory', body: 'Some tools remember details about you across chats. Check what it has saved, and remove anything sensitive.' },
        { title: '4. Connected apps and files', body: 'Has the tool been given access to your email, drive or calendar? Only keep what you need.' },
        { title: '5. Your account', body: 'Use your work account for work, with a strong password and two-step login.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Check training, history, memory, connected apps and account security. Five minutes now; recheck after big updates.',
    },
  ],
  apply: {
    scenario: 'Ada checks her AI tool\'s settings.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five checks.',
        lines: ['Training', 'History and retention', 'Memory', 'Connected apps and files', 'Your account'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the "training" setting usually control?',
        options: [
          { text: 'How fast it answers', why: 'It\'s about data use.' },
          { text: 'Whether your chats may be used to improve the model' },
          { text: 'Your font size', why: 'It\'s about data use.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Safer setting, or riskier?',
        groups: ['Safer', 'Riskier'],
        items: [
          { text: 'Training on chats turned off', group: 0 },
          { text: 'Access to all your email, never used', group: 1 },
          { text: 'Two-step login on', group: 0 },
          { text: 'Memory full of client names', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I\'ve never looked at my AI tool\'s settings. Should I?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'No, defaults are always fine.', why: 'Defaults vary.' },
          { text: 'Only IT can change them.', why: 'Many are user settings.' },
          { text: 'Yes, it takes five minutes: check training, history, memory, connected apps and your login security.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Five minutes now; [[1]] after big [[2]].',
        blanks: [['recheck'], ['updates']],
        distractors: ['ignore', 'holidays'],
      },
      {
        kind: 'findBug',
        prompt: 'Which setting needs fixing?',
        lines: [
          'Training on my chats: off',
          'Temporary chat for sensitive questions: used',
          'Memory: "Ada\'s bank password is..."',
          'Two-step login: on',
        ],
        bug: 2,
        fix: 'Delete that memory, and change the password.',
        explanation: 'A password should never be stored in an AI tool.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the setting to what to check.',
        pairs: [
          ['Memory', 'What it remembers about you'],
          ['Connected apps', 'Which accounts it can reach'],
          ['History', 'How long chats are kept'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why use your work account for work?',
        options: [
          { text: 'Work plans often have different data protections, and your company can manage it' },
          { text: 'It\'s prettier', why: 'It\'s about protection and control.' },
          { text: 'No difference', why: 'There often is.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s reminder.',
        tiles: ['Recheck', 'settings', 'after', 'updates'],
        distractors: ['never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does the settings check take?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep the connection, or remove?',
        groups: ['Keep', 'Remove'],
        items: [
          { text: 'Calendar, used daily for scheduling', group: 0 },
          { text: 'An old personal drive, never used', group: 1 },
          { text: 'Work drive for an approved project', group: 0 },
          { text: 'A friend\'s shared folder', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s a temporary chat good for?',
        options: [
          { text: 'Pasting passwords safely', why: 'Never paste passwords.' },
          { text: 'Nothing', why: 'It limits what\'s kept.' },
          { text: 'Questions you don\'t want saved in your history' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Open your AI tool\'s settings now. What did you find that surprised you?',
    starters: ['I found...', 'I changed...'],
  },
  deepen: { title: 'Try it today', summary: 'Do the five-minute settings check on the AI tool you use most.' },
  notes: 'Setting names and defaults vary by provider and plan; check your tool\'s current documentation.',
};

export default lesson;

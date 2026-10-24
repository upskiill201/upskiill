import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 5 · Lesson 9 — finding gaps in your thinking. Story: the sceptical investor. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Finding gaps in your thinking',
  summary: 'Ada\'s draft recommendation feels solid. She asks the AI to play a sceptical investor, and it finds the hole she couldn\'t see.',
  minutes: 12,
  outcomes: [
    'Use AI to challenge your own reasoning',
    'Set up a useful "critic" role',
    'Decide which challenges to act on',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The sceptical investor',
      beats: [
        { speaker: 'narrator', text: 'Wednesday night. Ada\'s draft: "Launch in Ghana next. Big market, partner bank ready, English-speaking."' },
        { speaker: 'ada', text: 'Act as a sceptical investor. Here is my recommendation. What are the three biggest holes?' },
        { speaker: 'narrator', text: 'The AI: "1. You assume small shops will switch from apps they already use. Why would they? 2. No licence timeline. 3. No cost for customer support in local languages."' },
        { speaker: 'ada', text: 'Number one. I never asked why anyone would switch.' },
        { speaker: 'tey', text: 'That\'s the gap that matters. The AI didn\'t decide for you. It asked the question an investor would.' },
      ],
      choice: {
        prompt: 'What should Ada do with hole number one?',
        options: [
          { text: 'Research why small shops would switch, and add the answer, or the uncertainty, to the brief', outcome: 'Yes. A real gap gets real research, or an honest "we don\'t know yet".', best: true },
          { text: 'Ignore it; the AI is being negative', outcome: 'She asked it to be sceptical. This is the useful part.' },
          { text: 'Delete the recommendation', outcome: 'A gap is something to fill, not a reason to give up.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Give the AI a critic\'s role ("sceptical investor", "worried regulator") and ask for the three biggest holes. Then research the one that matters most.',
    },
  ],
  apply: {
    scenario: 'Ada is stress-testing her recommendation.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why give the AI a "sceptical investor" role?',
        options: [
          { text: 'Investors are always right', why: 'The role is a tool to find gaps.' },
          { text: 'It pushes the AI to find weaknesses instead of agreeing' },
          { text: 'To make the answer longer', why: 'To make it critical.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s critic request.',
        tiles: ['What', 'are', 'the', 'three', 'biggest', 'holes?'],
        distractors: ['nicest'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the critic role to what it finds.',
        pairs: [
          ['Sceptical investor', 'Weak business assumptions'],
          ['Worried regulator', 'Compliance gaps'],
          ['Busy shop owner', 'Reasons not to use the app'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Act on it now, or note it for later?',
        groups: ['Research now', 'Note for later'],
        items: [
          { text: 'Why would shops switch apps?', group: 0 },
          { text: 'Licence timeline unknown', group: 0 },
          { text: 'Logo might need a local twist', group: 1 },
          { text: 'Office location in Accra', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI says our plan has holes. Should I worry?',
        prompt: 'Best reply?',
        options: [
          { text: 'No, the AI is just negative.', why: 'Some holes are real.' },
          { text: 'Yes, let\'s cancel.', why: 'Gaps are for filling.' },
          { text: 'That\'s why I asked it to look. One hole really matters: why shops would switch. I\'ll have an answer, or an honest "unknown", tomorrow.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Give the AI a [[1]] role and ask for the three biggest [[2]].',
        blanks: [['critic'], ['holes']],
        distractors: ['fan', 'compliments'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request finds the most useful gaps?',
        options: [
          { text: 'Is my plan good?', why: 'Invites agreement.' },
          { text: 'Act as a busy shop owner in Accra who already uses a payments app. Read our pitch and tell me honestly why you wouldn\'t switch.' },
          { text: 'Find anything wrong.', why: 'Too vague; may return trivia.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Which of the AI\'s "holes" is the least important?',
        lines: [
          'You assume shops will switch apps',
          'There\'s no licence timeline',
          'The brief uses two different fonts',
          'Support in local languages isn\'t costed',
        ],
        bug: 2,
        fix: 'Fix it later; focus on the first two.',
        explanation: 'Fonts don\'t change the decision.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s stress-test.',
        lines: ['Write the draft recommendation', 'Ask a critic role for the holes', 'Pick the hole that matters most', 'Research it'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many holes does Ada ask for?',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Assumption, or checked fact?',
        groups: ['Assumption', 'Checked fact'],
        items: [
          { text: 'Shops will want to switch', group: 0 },
          { text: 'The partner bank operates in Accra (their site)', group: 1 },
          { text: 'Support costs will be low', group: 0 },
          { text: 'English is an official language (official sources)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who decides what to do about the holes?',
        options: [
          { text: 'Ada and Lucía' },
          { text: 'The AI', why: 'It finds questions; people decide.' },
          { text: 'Nobody', why: 'Someone has to.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Take a plan you\'re confident about. Which critic role would find its weakest point?',
    starters: ['The plan:', 'The critic:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to play a sceptical reviewer of something you wrote. Act on the single biggest point.' },
  notes: 'Fictional scenario. "Pre-mortem" and devil\'s-advocate techniques are established ways to surface weaknesses in plans.',
};

export default lesson;

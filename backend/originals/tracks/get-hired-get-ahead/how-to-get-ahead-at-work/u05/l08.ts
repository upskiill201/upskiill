import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 8 — applying for an internal role. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Applying from inside',
  summary: 'Internal moves have their own etiquette. Get it wrong and you can upset your manager, even if the move happens. Here\'s how Clinton applies for the APM role the right way.',
  minutes: 12,
  outcomes: ['Follow internal application etiquette', 'Keep your current manager on side', 'Prepare as seriously as for an outside job'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps for an internal move',
      steps: [
        { title: '1. Tell your manager first', body: 'Before applying, Clinton tells Ngozi. She already knows his plan, so it\'s no surprise. "I\'m applying for Aïcha\'s APM role. I wanted you to hear it from me."' },
        { title: '2. Follow the official process', body: 'Apply through the internal job system, even though he knows Aïcha. Fair process protects everyone.' },
        { title: '3. Prepare like an outside job', body: 'Tailored CV, the bridge story, STAR stories for product skills, questions for the panel. Internal candidates who coast often lose.' },
        { title: '4. Keep your current work excellent', body: 'The sync-service split still matters. Slipping now would hurt both his reputation and Ngozi\'s team.' },
        { title: '5. Plan the handover', body: 'Offer a handover plan early: who takes what, how long. It shows care for the team he\'s leaving.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Manager first, official process, prepare properly, keep current work strong, plan the handover.',
    },
  ],
  apply: {
    scenario: 'Clinton applies internally.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Tell your manager first', 'Follow the official process', 'Prepare like an outside job', 'Keep your current work excellent', 'Plan the handover'],
      },
      {
        kind: 'mcq',
        prompt: 'Why tell Ngozi before applying?',
        options: [
          { text: 'She has to approve every thought', why: 'It\'s about respect and trust.' },
          { text: 'So she hears it from him, not from someone else' },
          { text: 'No reason', why: 'Surprises damage trust.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good internal etiquette, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Applying through the official system', group: 0 },
          { text: 'Asking Aïcha to skip the process', group: 1 },
          { text: 'Offering a handover plan early', group: 0 },
          { text: 'Letting current work slip', group: 1 },
          { text: 'Preparing STAR stories', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the internal-candidate mistake.',
        lines: ['Tells Ngozi first.', 'Doesn\'t prepare because "they know me".', 'Plans the handover.'],
        bug: 1,
        explanation: 'Internal candidates who coast often lose. Prepare properly.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s message to Ngozi.',
        from: 'clinton',
        message: 'What do I say to Ngozi before applying?',
        options: [
          { text: 'Nothing; she\'ll find out.', why: 'Tell her first.' },
          { text: '"I\'m leaving your team."', why: 'Be warm and specific about the plan.' },
          { text: '"I\'m applying for Aïcha\'s APM role, and I wanted you to hear it from me first. I\'ll keep the split on track and plan a handover."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to why it matters.',
        pairs: [
          ['Official process', 'Fairness protects everyone'],
          ['Current work excellent', 'Protects his reputation'],
          ['Handover plan', 'Shows care for the team'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should Clinton prepare for the internal interview?',
        options: [
          { text: 'Like an outside job: CV, bridge story, STAR stories, questions' },
          { text: 'Not at all', why: 'Prepare properly.' },
          { text: 'Ask for the questions in advance', why: 'Prepare properly instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Manager [[1]]. Official [[2]].',
        blanks: [['first'], ['process']],
        distractors: ['last', 'shortcut', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which project must Clinton keep on track? The sync-service ___. (one word)',
        answers: ['split'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds trust, or risks it?',
        groups: ['Builds', 'Risks'],
        items: [
          { text: 'No surprises for Ngozi', group: 0 },
          { text: 'Skipping the process', group: 1 },
          { text: 'Early handover plan', group: 0 },
          { text: 'Coasting on reputation', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you applied for a different role inside your organisation, who would you tell first, and what would you say?',
    starters: ['I\'d tell...', 'I\'d say...'],
  },
  deepen: {
    title: 'Check locally',
    summary: 'Find out how internal moves work where you are: is there a process, and do you need your manager\'s agreement?',
  },
  notes: 'Internal mobility policies vary; some companies require manager sign-off or a minimum time in role.',
};

export default lesson;

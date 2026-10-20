import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: the internal interview panel. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the panel',
  summary: 'The APM panel: Aïcha, her manager, and Brenda from talent. Brenda smiles: "Last time I interviewed you, you were a graduate." First question: "Why the change?" Before Clinton answers, a quiz. Adverts, the change story, internal etiquette and profiles.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a role description', 'Tell a "towards" change story', 'Follow internal etiquette and update your profile honestly'],
  learn: [
    {
      kind: 'story',
      title: 'The panel',
      beats: [
        { speaker: 'narrator', text: 'A meeting room. Aïcha, her manager, and Brenda Fon from talent.' },
        { speaker: 'brenda', text: 'Last time I interviewed you, you were a graduate who almost missed his bus. So, Clinton: why the change?' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: the panel.',
    items: [
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s answer to Brenda.',
        from: 'brenda',
        message: 'Why the change from engineering to product?',
        options: [
          { text: '"I\'ve always cared most about who uses what I build. This year\'s research and specs were what I looked forward to most, and engineering makes me a better PM."' },
          { text: '"I\'m tired of coding."', why: 'Towards, not away.' },
          { text: '"Product pays more."', why: 'Tell the towards story.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the internal-move steps in order.',
        lines: ['Tell your manager first', 'Follow the official process', 'Prepare like an outside job', 'Keep current work excellent', 'Plan the handover'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Towards or away?',
        groups: ['Towards', 'Away'],
        items: [
          { text: 'I want to decide what we build', group: 0 },
          { text: 'I\'m bored', group: 1 },
          { text: 'Research energises me', group: 0 },
          { text: 'My team annoys me', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the profile overclaim.',
        lines: ['Developer at Njangi Pay.', 'Product Manager (soon, probably).', 'User research for drivers.'],
        bug: 1,
        explanation: 'Claim titles only when you have them.',
      },
      {
        kind: 'mcq',
        prompt: 'What does Clinton uniquely bring to the APM role?',
        options: [
          { text: 'Experience building for low-connectivity users' },
          { text: 'A business degree', why: 'His offline experience.' },
          { text: 'Nothing', why: 'His offline experience.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each advert line to Clinton\'s evidence.',
        pairs: [
          ['Talk to users weekly', 'Bafoussam workshop'],
          ['Specs and priorities', 'Two specs, priority draft'],
          ['Say no to good ideas', 'Practising in feature-request reviews'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why should internal candidates prepare as seriously as external ones?',
        options: [
          { text: 'Those who coast on reputation often lose' },
          { text: 'They shouldn\'t', why: 'Coasting loses.' },
          { text: 'It\'s required by law', why: 'Coasting loses.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Towards, not [[1]]. Manager [[2]].',
        blanks: [['away'], ['first']],
        distractors: ['towards', 'last', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Who from talent sits on the panel? (one word)',
        answers: ['brenda'],
        placeholder: 'A name',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good internal etiquette, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Official application', group: 0 },
          { text: 'Asking to skip the process', group: 1 },
          { text: 'A handover plan', group: 0 },
          { text: 'Letting work slip', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How should Clinton mention his gap (saying no)?',
        options: [
          { text: 'Name it, and say how he\'s practising' },
          { text: 'Hide it', why: 'Honest gap plus action.' },
          { text: 'Claim he\'s great at it', why: 'Overclaiming backfires.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Imagine someone who interviewed you years ago interviewing you again. What would you want them to notice?',
    starters: ['I\'d want them to see...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Practise your "Why the change?" answer out loud three times, with a friend playing the panel.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09. Brenda (CastId brenda) returns, a callback to the Njangi Pay graduate interview.',
};

export default lesson;

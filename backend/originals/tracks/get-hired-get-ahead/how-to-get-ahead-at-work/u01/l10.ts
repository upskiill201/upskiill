import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: the first team demo. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the first demo',
  summary: 'Friday team demo. Clinton shows the "tap once" fix in 90 seconds. The support lead claps. Paul nods. Then Ngozi turns the stand-up into a quick quiz for the new starters. Reviews, learning fast, earning trust and early wins.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read feedback as standards', 'Learn a workplace fast', 'Earn a senior colleague\'s trust and pick a good early win'],
  learn: [
    {
      kind: 'story',
      title: 'Demo day',
      beats: [
        { speaker: 'narrator', text: 'Friday demo. Ninety seconds: before, three taps; after, one. The support lead claps. Paul nods, once.' },
        { speaker: 'ngozi', text: 'Good. Small, finished, real. Now, new starters: quick questions. I like to check what sticks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: Ngozi\'s quick quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'How should you read review comments?',
        options: [
          { text: 'As a map of the team\'s standards' },
          { text: 'As personal attacks', why: 'They\'re standards.' },
          { text: 'As optional', why: 'They\'re how the team works.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the learning approach in order.',
        lines: ['Draw a one-page map', 'Keep a glossary', 'Learn your part in detail', 'Explain it back'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific question, or too big?',
        groups: ['Specific', 'Too big'],
        items: [
          { text: 'Which branch do hotfixes go on?', group: 0 },
          { text: 'Explain the whole system', group: 1 },
          { text: 'Should this test mock the network?', group: 0 },
          { text: 'How does everything work?', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the poor early-win choice.',
        lines: ['Fix a bug drivers complain about.', 'A three-week dashboard nobody asked for.', 'Update the setup guide.'],
        bug: 1,
        explanation: 'Impressive but unasked and unlikely to finish.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best answer to Ngozi.',
        from: 'ngozi',
        message: 'What makes a senior colleague willing to help you?',
        options: [
          { text: 'Doing homework first, asking small questions, using their answers visibly, and giving back.' },
          { text: 'Being very friendly.', why: 'Nice helps; being easy to help matters more.' },
          { text: 'Asking them everything.', why: 'Small, specific questions.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to its purpose.',
        pairs: [
          ['Glossary', 'No more mystery words'],
          ['Standards list', 'Never the same comment twice'],
          ['Explain it back', 'Check real understanding'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should you do before starting an early-win project?',
        options: [
          { text: 'Check it with your manager' },
          { text: 'Keep it secret', why: 'Check first.' },
          { text: 'Ask the whole company', why: 'Your manager is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ngozi\'s praise.',
        template: 'Small, [[1]], [[2]].',
        blanks: [['finished'], ['real']],
        distractors: ['flashy', 'huge', 'secret'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds was Clinton\'s demo? (a number)',
        answers: ['90', 'ninety'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Map or detail?',
        groups: ['Map', 'Detail'],
        items: [
          { text: 'What the product does', group: 0 },
          { text: 'One function\'s exact name', group: 1 },
          { text: 'Who owns what', group: 0 },
          { text: 'A variable\'s spelling', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What should Clinton do with team habits he learns from reviews?',
        options: [
          { text: 'Write them in the shared onboarding doc' },
          { text: 'Keep them secret', why: 'Share them for the next new person.' },
          { text: 'Forget them', why: 'Write them down.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of this week\'s habits would help you most right now: the map, the glossary, the standards list, or small questions?',
    starters: ['The one I need is...', 'Because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Show one small, finished piece of work to the people it helps this week. Keep it under 90 seconds.',
  },
  notes: 'Checkpoint 2. Reviews l06–l09. Ngozi Bate (CastId ngozi) speaks.',
};

export default lesson;

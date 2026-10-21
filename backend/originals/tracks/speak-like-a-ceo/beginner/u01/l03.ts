import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: what "um" really does. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'What "um" really does',
  summary: 'Diego counted Lucía\'s fillers on Monday: 23 "ums" in four minutes. She wants to get rid of every one. The research says that\'s not quite the goal.',
  minutes: 12,
  outcomes: [
    'Know what fillers do for listeners',
    'Reduce fillers without obsessing',
    'Use a pause instead',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Fillers, honestly',
      html: '<p>"Um" and "uh" aren\'t random noise. In a well-known 2002 paper, psychologists Herbert Clark and Jean Fox Tree argued that speakers use them as signals:</p><ul><li><strong>"Uh"</strong> tends to signal a short delay coming.</li><li><strong>"Um"</strong> tends to signal a longer one.</li><li>Listeners use them to know the speaker is still thinking, not finished.</li></ul><p>So a few fillers in conversation are normal and even useful. But in a talk or an update, lots of them can distract and make you sound less prepared.</p><p>What helps:</p><ul><li><strong>Know your first sentence.</strong> Many fillers come at the start, while you search for words.</li><li><strong>Pause instead.</strong> A silent pause gives you the same thinking time without the sound.</li><li><strong>Reduce, don\'t ban.</strong> Trying to never say "um" can make you so self-conscious you stumble more.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Fillers signal thinking. In talks, swap most of them for a silent pause. Reduce, don\'t ban.',
    },
  ],
  apply: {
    scenario: 'Fillers.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many "ums" did Diego count?',
        answers: ['23', 'twenty-three', 'twenty three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'According to Clark and Fox Tree, what does "um" tend to signal?',
        options: [
          { text: 'A longer delay coming' },
          { text: 'A short delay', why: 'That\'s "uh".' },
          { text: 'Nothing at all', why: 'It\'s a signal.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps or doesn\'t help?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'Knowing your first sentence', group: 0 },
          { text: 'Banning every "um" and panicking', group: 1 },
          { text: 'A silent pause', group: 0 },
          { text: 'Talking faster to avoid gaps', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the filler to what it signals.',
        pairs: [
          ['"Uh"', 'A short delay'],
          ['"Um"', 'A longer delay'],
          ['A silent pause', 'Thinking time, no sound'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I\'ll never say "um" again. Starting now.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Don\'t aim for zero. Aim for fewer: know your first line and pause when you need to think.' },
          { text: 'Perfect, zero ums.', why: 'Banning them can backfire.' },
          { text: 'Say "like" instead.', why: 'Pause instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]], don\'t ban. Swap fillers for a [[2]].',
        blanks: [['Reduce'], ['pause']],
        distractors: ['Shout', 'joke'],
      },
      {
        kind: 'mcq',
        prompt: 'Where do many fillers come from?',
        options: [
          { text: 'Searching for words, especially at the start' },
          { text: 'Speaking too slowly', why: 'Searching for words.' },
          { text: 'Knowing too much', why: 'Searching for words.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Lucía\'s plan will backfire?',
        lines: [
          'Write my first sentence down.',
          'Pause when I need to think.',
          'Punish myself for every single "um".',
          'Record Monday\'s update and count again.',
        ],
        bug: 2,
        fix: 'Aim for fewer, not zero.',
        explanation: 'Self-consciousness can cause more stumbles.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Clark and Fox Tree\'s paper published?',
        answers: ['2002'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s filler fix.',
        lines: ['Know the first sentence', 'Start speaking', 'Pause when searching', 'Record and count afterwards'],
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself talking for one minute about your week. Count your fillers. Where did most of them come?',
    starters: ['I counted...', 'Most came...'],
  },
  deepen: {
    title: 'Fillers across languages',
    summary: 'Every language seems to have its own fillers: "eh" in Spanish, "euh" in French, "eto" in Japanese. They\'re part of how people talk, which is why reducing beats banning.',
  },
  notes: 'Clark & Fox Tree (2002), Cognition, "Using uh and um in spontaneous speaking": uh signals a minor delay, um a major one. Advice on reducing (not banning) fillers: common speaking-coach practice.',
};

export default lesson;

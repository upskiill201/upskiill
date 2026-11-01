import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Chat with Tey: when your mind goes blank. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'When your mind goes blank',
  summary: 'Ada\'s biggest fear isn\'t forgetting a word. It\'s forgetting EVERYTHING: standing on stage, 300 faces, and nothing in her head. She asks Tey what to do if it happens.',
  minutes: 11,
  outcomes: [
    'Have a plan if your mind goes blank',
    'Use a pause, a breath and your beats to recover',
    'Know that a short silence looks normal from the audience',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Ada, you look worried.",
          replies: ['What if I go completely blank on stage? Total white screen.'],
        },
        {
          tey: "It happens to almost every speaker at some point. So let's plan for it, then you won't need to fear it. Step one: stop and breathe. Don't say \"sorry, sorry\". Just pause.",
          replies: ['But the silence will be SO awkward!'],
        },
        {
          tey: "From the stage, three seconds feels like a minute. From the audience, it looks like you're thinking, or letting something land. Most people won't even notice.",
          replies: ['Okay. Then what?'],
        },
        {
          tey: "Step two: go back to your last beat. Say the last thing again, in different words: \"So, Tunde swore he'd paid...\" Saying it again often unlocks the next beat.",
          replies: ['And if that doesn\'t work?'],
        },
        {
          tey: "Step three: jump to your anchor. Your one sentence: \"I help savings groups track who's paid, so nobody argues about money.\" Then go straight to the ask and the rhyme. A shorter pitch that ends strong beats a long one that falls apart.",
          replies: ['Can I bring notes?'],
        },
        {
          tey: "If notes are allowed, yes: one small card with your beats, held loosely. A glance is fine. Reading isn't. Knowing it's there often means you never need it.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Blank? Pause and breathe. Repeat your last beat. If needed, jump to your one sentence, then the ask. End strong.',
    },
  ],
  apply: {
    scenario: 'Tey\'s blank-mind plan.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the blank-mind plan in order.',
        lines: ['Pause and breathe', 'Repeat your last beat in different words', 'If still stuck, say your one sentence', 'Go to the ask and the closing line'],
      },
      {
        kind: 'mcq',
        prompt: 'What does a three-second pause look like to the audience?',
        options: [
          { text: 'A total disaster', why: 'It feels that way to you, not them.' },
          { text: 'A fire alarm', why: 'Nobody will notice.' },
          { text: 'Usually like you\'re thinking or letting something land' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'My instinct would be to say "Sorry, sorry, I forgot, sorry!"',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Skip the sorries: they turn a quiet pause into a big moment. Just breathe and go back to your last beat.' },
          { text: 'Yes, apologise loudly so they understand.', why: 'It draws attention to the slip.' },
          { text: 'Walk off stage.', why: 'Never needed.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If all else fails, jump to your one ___. (one word)',
        answers: ['sentence'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps recovery, or makes it worse?',
        groups: ['Helps', 'Makes it worse'],
        items: [
          { text: 'A pause and a breath', group: 0 },
          { text: '"Sorry, sorry, I forgot!"', group: 1 },
          { text: 'Repeating your last beat', group: 0 },
          { text: 'Starting the whole pitch again', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why practise the blank-mind plan in advance?',
        options: [
          { text: 'Because it will definitely happen', why: 'It might not. But a plan helps either way.' },
          { text: 'Having a plan reduces the fear, and makes recovery automatic if it happens' },
          { text: 'There\'s no reason to', why: 'Fear of blanking makes blanking more likely.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s notes card plan. Which line breaks Tey\'s advice?',
        lines: [
          'One small card with my seven beats.',
          'Read the full 120-word script from the card, word for word.',
          'Hold it loosely and glance only if I need to.',
        ],
        bug: 1,
        fix: 'Beats only, big enough to read at a glance.',
        explanation: 'A full script on a card turns into reading. Beats only.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Beats, not script', 'Step to the next stone'],
          ['Pause', 'Feels long, looks normal'],
          ['One sentence', 'Your anchor'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s plan.',
        template: '[[1]] and breathe. Repeat your last [[2]]. End [[3]].',
        blanks: [['Pause'], ['beat'], ['strong']],
        distractors: ['Apologise', 'early'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s reassurance.',
        tiles: ['A', 'pause', 'looks', 'like', 'thinking.'],
        distractors: ['sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own blank-mind plan: your anchor sentence, your ask, and one phrase to say while you find your place ("So, where was I? Ah, yes...").',
    starters: ['My anchor: ...', 'My ask: ...', 'My recovery phrase: ...'],
  },
  deepen: {
    title: 'Practise going blank',
    summary: 'Ask a friend to clap at a random moment while you rehearse. When they do, stop, breathe, and use your plan to recover. Practising the recovery makes it automatic.',
  },
  notes: 'Recovery strategies (pause, repeat the last point, return to a core message, minimal notes) are standard public-speaking advice. Links to Chapter 4 L6 (beats) and Chapter 1 L4 (one sentence).',
};

export default lesson;

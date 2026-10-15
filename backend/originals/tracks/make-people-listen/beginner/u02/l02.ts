import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 2. Reading: the curse of knowledge (Newton 1990 tappers and listeners). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The curse of knowledge',
  summary: 'Tey asks Arjun to tap out "Happy Birthday" on the studio desk, and the producer to guess the song. Arjun is sure it\'s obvious. It is not. Welcome to the curse of knowledge.',
  minutes: 12,
  outcomes: [
    'Explain the curse of knowledge and the tapping experiment',
    'Spot when your own expertise is hiding your message',
    'Use simple tests to check your explanation lands',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why experts are so hard to understand',
      html: "<p>Tey slides a pencil across the desk. \"Arjun, tap out the rhythm of a famous song. Don't tell us which.\"</p><p>Arjun taps. <em>Tap tap tap-tap tap tap.</em> He's sure it's obvious. The producer guesses: \"Er... the national anthem?\" It was \"Happy Birthday\". Arjun is genuinely amazed.</p><h3>The tapping experiment</h3><p>In 1990, a Stanford graduate student, Elizabeth Newton, ran exactly this experiment. \"Tappers\" tapped the rhythms of well-known songs; \"listeners\" tried to name them. Before starting, tappers predicted listeners would get about <strong>half</strong> of them right. Listeners actually identified about <strong>1 in 40</strong> (2.5%).</p><p>Why so far off? Because tappers <em>hear the melody in their heads</em> while they tap. They can't un-hear it. Listeners just hear knocking.</p><h3>The curse of knowledge</h3><p>Once you know something well, it's very hard to imagine not knowing it. You skip steps that feel obvious. You use words you've forgotten are jargon. You think your point is clear, because to you, the melody is playing.</p><p>Arjun's email was a tapped song. He heard the whole melody: race conditions, locks, retries, therefore delay the sale. Mr Rao heard knocking.</p><h3>How to break the curse</h3><ul><li><strong>Remember the tappers:</strong> your listener probably understands far less than you think.</li><li><strong>Start with the conclusion</strong>, not the reasoning. (Next lesson.)</li><li><strong>Test it on a non-expert:</strong> a friend, a family member. If they can repeat your point back, it works.</li><li><strong>Swap jargon for everyday words</strong>, and use comparisons to things people already know.</li></ul>",
    },
    {
      kind: 'check',
      question: 'Tappers predicted listeners would name about half the songs. How many did listeners actually get?',
      options: ['About half', 'About 1 in 40', 'All of them'],
      answer: 1,
      explanation: 'Around 2.5%. Tappers could hear the melody in their heads; listeners couldn\'t.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The curse of knowledge: once you know something, you can\'t easily imagine not knowing it. Your listener hears knocking, not the melody.',
    },
  ],
  apply: {
    scenario: 'Tey FM, the tapping test.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why were the tappers so wrong about how many songs listeners would get?',
        options: [
          { text: 'They could hear the melody in their heads and couldn\'t imagine not hearing it' },
          { text: 'The listeners weren\'t trying', why: 'They were. They just heard knocking.' },
          { text: 'The songs were obscure', why: 'They were well-known songs.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of the curse of knowledge, or a cure?',
        groups: ['Sign of the curse', 'A cure'],
        items: [
          { text: 'Skipping steps because they feel obvious', group: 0 },
          { text: 'Testing your explanation on a non-expert', group: 1 },
          { text: 'Using jargon without noticing', group: 0 },
          { text: 'Starting with the conclusion', group: 1 },
          { text: 'Assuming your point is clear', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'But "race condition" is a basic term. Everyone knows it.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'You\'re right, Mr Rao should learn it.', why: 'He\'s running a shop, not a server.' },
          { text: 'Use it more often so he learns.', why: 'Repetition doesn\'t explain it.' },
          { text: 'Everyone in YOUR world knows it. To Mr Rao, that\'s knocking. That\'s the curse.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name of the bias: the curse of ___. (one word)',
        answers: ['knowledge'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the simplest test that your explanation works?',
        options: [
          { text: 'Another expert understands it', why: 'They share your curse.' },
          { text: 'It feels clear to you', why: 'Of course it does. You hear the melody.' },
          { text: 'A non-expert can repeat your point back to you' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new email opening. Which line is still cursed?',
        lines: [
          'Please delay the sale by two days.',
          'Otherwise the race condition in the checkout queue will deadlock the DB.',
          'If the sale goes ahead, the shop will crash when lots of people pay at once.',
        ],
        bug: 1,
        fix: 'Delete it, or say "a known bug can freeze payments when many people pay at once."',
        explanation: 'Line two is still knocking. Line three already says it in plain words.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Swap the jargon for everyday words.',
        pairs: [
          ['Race condition', 'Two things clashing at the same moment'],
          ['Deadlock', 'Everything freezes, waiting'],
          ['Under heavy traffic', 'When lots of people use it at once'],
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Goldfish attention span', 'A myth'],
          ['Listen first', 'Earns you a hearing'],
          ['Point first', 'What, when, where up front'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tapping experiment.',
        template: 'Tappers predicted [[1]]. Listeners got about 1 in [[2]].',
        blanks: [['half', '50%'], ['40', 'forty']],
        distractors: ['all', '4'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the cure in one line.',
        tiles: ['Test', 'it', 'on', 'someone', 'who', 'doesn\'t', 'know.'],
        distractors: ['expert'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you know so well that you might be "tapping" when you explain it? Who could you test your explanation on?',
    starters: ['I might be tapping when I explain...', 'I could test it on...'],
  },
  deepen: {
    title: 'Try the tapping test',
    summary: 'Tap out a well-known song for a friend or family member and ask them to guess it. Before you start, guess how likely they are to get it. You\'ll feel the curse of knowledge for yourself.',
  },
  notes: 'Newton (1990), Stanford PhD research ("tappers and listeners"), widely reported in Heath & Heath, Made to Stick (2007): tappers predicted ~50% identification; listeners identified 3 of 120 songs (2.5%). "Curse of knowledge" term from Camerer, Loewenstein & Weber (1989). Secondary-source caveat noted in outline.',
};

export default lesson;

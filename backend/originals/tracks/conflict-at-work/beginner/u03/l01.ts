import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: "Fine." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Fine."',
  summary: 'Grace posts an update in the team channel. Femi replies with one word: "Fine." The next day he skips lunch. By Thursday, Grace is sure he\'s furious. She\'s wrong.',
  minutes: 11,
  outcomes: [
    'See how a short message can start a misunderstanding',
    'Notice the story you add to someone\'s words',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One word',
      beats: [
        { speaker: 'grace', text: '(in the channel) Re-tested step 3 after the fix: 2 of 6 older users still got stuck. Can we look again?' },
        { speaker: 'femi', text: '(nine minutes later) Fine.' },
        { speaker: 'narrator', text: 'Grace reads it ten times. "Fine." Full stop. No emoji. He\'s angry. She doesn\'t reply.' },
        { speaker: 'narrator', text: 'Wednesday, Femi skips team lunch. Grace is now certain: he thinks she\'s ruining the launch.' },
        { speaker: 'narrator', text: 'Thursday, Priya mentions Femi\'s daughter was in A&E on Tuesday. He\'d typed "Fine." from the hospital car park.' },
        { speaker: 'tey', text: 'This chapter: why writing hides tone, the stories we add, intent vs impact, checking what people meant, and clearing it up.' },
      ],
      choice: {
        prompt: 'What could Grace have done on Tuesday, after "Fine."?',
        options: [
          { text: 'Asked: "Thanks. Is now a bad time? Happy to pick it up whenever suits you."', outcome: 'Right. One kind question would have shown he was dealing with something else.', best: true },
          { text: 'Replied "Wow, OK then."', outcome: 'Her story would have become his story too, and the cold war would start for real.' },
          { text: 'Complained to Priya that Femi was rude', outcome: 'She\'d have reported a "rudeness" that was really a dad in a hospital car park.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a message feels cold, check before you react: "Is now a bad time?"',
    },
  ],
  apply: {
    scenario: '"Fine."',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where was Femi when he typed "Fine."?',
        options: [
          { text: 'In a hospital car park; his daughter was in A&E' },
          { text: 'At his desk, angry', why: 'That was Grace\'s story.' },
          { text: 'At lunch', why: 'He skipped lunch the next day.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'What actually happened, or the story Grace added?',
        groups: ['What happened', 'Grace\'s story'],
        items: [
          { text: 'He wrote "Fine."', group: 0 },
          { text: 'He\'s angry with her', group: 1 },
          { text: 'He skipped lunch', group: 0 },
          { text: 'He thinks she\'s ruining the launch', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'After the fix, how many of 6 older users still got stuck?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'How was I supposed to know about his daughter?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'You should have guessed.', why: 'She couldn\'t know; she could ask.' },
          { text: 'You couldn\'t. That\'s why it\'s worth asking before deciding what a message means.' },
          { text: 'It doesn\'t matter.', why: 'It changed the whole meaning.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Grace\'s possible reply to what it would have done.',
        pairs: [
          ['"Is now a bad time?"', 'Shown what was really going on'],
          ['"Wow, OK then."', 'Started a real cold war'],
          ['A complaint to Priya', 'Made it bigger and unfair'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'When a message feels [[1]], check before you [[2]].',
        blanks: [['cold'], ['react']],
        distractors: ['warm', 'sleep'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did "Fine." feel angry to Grace?',
        options: [
          { text: 'It was angry', why: 'It wasn\'t; he was distracted.' },
          { text: 'The full stop proves anger', why: 'Punctuation is easy to over-read.' },
          { text: 'Short text has no tone, so she filled it in with her own worry' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s Tuesday thinking was the mistake?',
        lines: [
          'He replied "Fine."',
          'It\'s short.',
          'So he\'s definitely angry with me.',
          'I could ask if now\'s a bad time.',
        ],
        bug: 2,
        fix: 'I don\'t know what it means yet.',
        explanation: 'She jumped from a word to a conclusion.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Why writing hides tone', 'The stories we add', 'Intent vs impact', 'Checking what they meant', 'Clearing it up'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes after Grace\'s message did Femi reply?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a message that made you anxious or annoyed. What story did you add to it? Did you ever check?',
    starters: ['The message was...', 'The story I added was...'],
  },
  deepen: {
    title: 'Negativity in short messages',
    summary: 'Many people read short, neutral messages as negative, especially from someone they\'re already worried about. The worry supplies the tone the words don\'t have.',
  },
  notes: 'Fictional: Grace\'s re-test 2 of 6 still stuck; Femi\'s "Fine." from the hospital car park (daughter in A&E). Tone ambiguity in text: Kruger et al. (2005), see Lesson 2.',
};

export default lesson;

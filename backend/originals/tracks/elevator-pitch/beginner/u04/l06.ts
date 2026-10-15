import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Before/After: memorised script vs knowing your beats. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Memorised script vs knowing your beats',
  summary: 'Ada is trying to memorise all 120 words exactly. If she gets one word wrong, she goes back to the start. Arjun: "Stop. You don\'t need the words. You need the beats."',
  minutes: 11,
  outcomes: [
    'Know the risk of memorising every word',
    'Learn your pitch as a few key beats',
    'Sound natural, and recover easily if you slip',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to learn a pitch',
      before: {
        label: 'Word for word',
        text: '120 words, every one fixed. Ada recites it like a poem. One wrong word and she freezes, searching for the "right" next word. It sounds recited, because it is.',
      },
      after: {
        label: 'Beats',
        text: 'Seven beats: Hook. Tunde. App. Treasurer. Numbers. Ask. Rhyme. Ada knows what each beat says, and only two lines word for word: the hook and the closing rhyme. The rest comes out a little differently each time, and sounds like her talking.',
      },
      notes: [
        'Beats are like stepping stones: miss a word and you just step to the next stone.',
        'Memorise only the first line and the last line exactly.',
        'Small changes in wording each time are fine. Nobody else knows the "real" script.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>How to learn beats:</strong> write each beat as one or two words. Practise saying each beat in your own words. Then practise moving from one beat to the next without looking. Finally, lock in just the opening and closing lines word for word: they're where nerves hit hardest.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Memorise the first and last lines. Learn the rest as beats. If you slip, step to the next stone.',
    },
  ],
  apply: {
    scenario: 'Arjun: "You need the beats."',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the main risk of memorising every word?',
        options: [
          { text: 'One wrong word can make you freeze, and it tends to sound recited' },
          { text: 'There\'s no risk', why: 'Ada keeps freezing.' },
          { text: 'You\'ll be too natural', why: 'The opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s seven beats in order.',
        lines: ['Hook', 'Tunde', 'App', 'Treasurer', 'Numbers', 'Ask', 'Rhyme'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Memorise word for word, or learn as a beat?',
        groups: ['Word for word', 'As a beat'],
        items: [
          { text: 'The opening hook', group: 0 },
          { text: 'The Tunde story', group: 1 },
          { text: 'The closing rhyme', group: 0 },
          { text: 'The treasurer example', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If I say it slightly differently each time, won\'t the judges notice?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, so memorise harder.', why: 'That\'s how the freezing started.' },
          { text: 'Change it completely each time.', why: 'Same beats, slightly different words.' },
          { text: 'They\'ll only hear it once. Nobody knows the "real" script. Slight changes just make you sound natural.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Learn the middle of your pitch as ___, not exact words. (one word)',
        answers: ['beats', 'beat', 'stepping stones'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why memorise the opening line exactly?',
        options: [
          { text: 'It\'s the least important', why: 'It\'s one of the most important.' },
          { text: 'Judges check it against the video', why: 'It\'s for your nerves, not the judges.' },
          { text: 'Nerves hit hardest at the start, so a fixed first line gets you going' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Ada forgets a word in the Tunde beat. What should she NOT do?',
        lines: [
          'Say it in different words and carry on.',
          'Stop, apologise, and start the whole pitch again from the hook.',
          'Step to the next beat: the app.',
        ],
        bug: 1,
        fix: 'Keep going: say it differently, or step to the next beat.',
        explanation: 'Starting over turns a tiny slip into a big moment. Beats let you keep going.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['"I\'m excited"', 'Reframe nerves'],
          ['Record and watch', 'Real rehearsal'],
          ['Beats, not script', 'Sound natural'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s rule.',
        template: 'Memorise the [[1]] and [[2]] lines. Learn the rest as [[3]].',
        blanks: [['first', 'opening'], ['last', 'closing'], ['beats']],
        distractors: ['every', 'middle'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the advice.',
        tiles: ['If', 'you', 'slip,', 'step', 'to', 'the', 'next', 'beat.'],
        distractors: ['restart'],
      },
    ],
  },
  reflect: {
    prompt: 'Break your pitch into 5–7 beats, one or two words each. Then write your opening and closing lines exactly.',
    starters: ['My beats: ...', 'Opening line: ...', 'Closing line: ...'],
  },
  deepen: {
    title: 'Say it three ways',
    summary: 'Say your pitch three times using only your beats list, letting the words change each time. Notice how much more natural the third version sounds.',
  },
  notes: 'Learning key points rather than verbatim scripts (with memorised openings and closings) is standard public-speaking guidance.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 16 — practising your talk with AI. Story: the rehearsal. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Practising your talk with AI',
  summary: 'The night before, Ada rehearses. AI can\'t hear her nerves, but it can play a tough founder and fire questions until she\'s ready.',
  minutes: 12,
  outcomes: [
    'Rehearse a talk out loud, timed',
    'Use AI to play a tough audience',
    'Practise the first and last minute most',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The night before',
      beats: [
        { speaker: 'narrator', text: 'Wednesday, 8pm. Ada stands in her living room with a timer. First run: 7 minutes 40. Her slot is 5.' },
        { speaker: 'ada', text: 'I keep explaining the set-up. I\'ll cut it to one sentence.' },
        { speaker: 'narrator', text: 'Second run: 5 minutes 10. Then she types: "Act as Seun, a sharp founder who cares about cost. Ask me one hard question at a time about this deck."' },
        { speaker: 'narrator', text: 'Question three: "Why should we pay for manual settlement if the bank is late again?" Ada has no answer. Yet.' },
        { speaker: 'tey', text: 'Better to find that gap tonight than tomorrow at 10am. Write the answer, say it aloud twice, then run the whole talk once more.' },
      ],
      choice: {
        prompt: 'What should Ada do with the question she couldn\'t answer?',
        options: [
          { text: 'Work out a short honest answer, practise saying it, and add a backup slide if needed', outcome: 'Yes. A rehearsed answer to the hardest question is worth more than another polish of the slides.', best: true },
          { text: 'Hope Seun doesn\'t ask it', outcome: 'If the AI thought of it, Seun might too.' },
          { text: 'Add three new slides about it', outcome: 'A short spoken answer, plus one backup slide at most.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Rehearse out loud with a timer. Ask AI to play your toughest listener, one question at a time. Practise the first and last minute most.',
    },
  ],
  apply: {
    scenario: 'Ada rehearses the night before.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s rehearsal.',
        lines: ['Run it out loud with a timer', 'Cut what runs long', 'Let AI play a tough founder', 'Prepare answers to the gaps', 'Run it once more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How long was Ada\'s first run? (minutes, e.g. 7:40)',
        answers: ['7:40', '7.40', '740', '7 40', '7m40s'],
        placeholder: 'A time',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes the best practice audience?',
        options: [
          { text: 'Ask me questions.', why: 'No role or focus.' },
          { text: 'Act as Seun, a sharp founder who cares about cost. Ask me one hard question at a time about this deck, and wait for my answer before the next.' },
          { text: 'Tell me I\'ll do great.', why: 'Comforting, not practice.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good rehearsal habit, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Practising out loud', group: 0 },
          { text: 'Reading slides silently', group: 1 },
          { text: 'Timing each run', group: 0 },
          { text: 'Only rehearsing the middle', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Nervous about tomorrow?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'A bit. But I\'ve run it four times, it\'s under 5 minutes, and I\'ve practised answers to the three hardest questions.' },
          { text: 'Terrified, I haven\'t practised.', why: 'She has.' },
          { text: 'No, I\'ll improvise.', why: 'Preparation beats improvising.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Rehearse out [[1]] with a [[2]].',
        blanks: [['loud'], ['timer']],
        distractors: ['quietly', 'snack'],
      },
      {
        kind: 'findBug',
        prompt: 'Which rehearsal step is the weakest?',
        lines: [
          'Run 1: timed, out loud',
          'Cut the long set-up',
          'Skip the hard questions; they might not come up',
          'Run 3: under 5 minutes',
        ],
        bug: 2,
        fix: 'Let AI play a tough founder and prepare answers.',
        explanation: 'Hard questions are what rehearsal is for.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the rehearsal tool to what it catches.',
        pairs: [
          ['A timer', 'Running long'],
          ['Saying it aloud', 'Awkward wording'],
          ['AI as a tough founder', 'Unanswered questions'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the role request.',
        tiles: ['Ask', 'me', 'one', 'hard', 'question', 'at', 'a', 'time'],
        distractors: ['easy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is Ada\'s slot?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why practise the first and last minute most?',
        options: [
          { text: 'They shape first impressions and what people remember' },
          { text: 'The middle doesn\'t matter', why: 'It does; these matter most.' },
          { text: 'They\'re the longest', why: 'They\'re the most memorable.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What can AI not do in rehearsal?',
        options: [
          { text: 'Hear your tone or see your nerves, unless you use voice tools' },
          { text: 'Ask questions', why: 'It can.' },
          { text: 'Play a role', why: 'It can.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the hardest question someone could ask about your work? Write a short answer.',
    starters: ['The question:', 'My answer:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to play your toughest listener for one thing you\'re presenting. Answer three questions out loud.' },
  notes: 'Fictional scenario.',
};

export default lesson;

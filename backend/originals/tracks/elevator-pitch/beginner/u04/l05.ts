import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus earlier chapters. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: rehearsal two',
  summary: 'Wednesday. Ada rehearses for three colleagues, phone in her pocket. She stumbles on one line, laughs, and carries on. 58 seconds. Tunde: "No hostages this time."',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use rehearsal, preparation and the excitement reframe without notes', 'Connect delivery to earlier chapters'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, the meeting room',
      beats: [
        { speaker: 'ada', text: '(backstage, whispering) I\'m excited. I\'m excited. (breath out)' },
        { speaker: 'narrator', text: 'Phone in pocket. Eyes up. The hook lands; someone laughs at "What could possibly go wrong?" She forgets one word in the middle, smiles, and keeps going.' },
        { speaker: 'narrator', text: '58 seconds. Tunde: "No hostages this time. And you looked at me during my bit. I felt seen."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: rehearsal two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was the biggest change from rehearsal one?',
        options: [
          { text: 'New words', why: 'Same words, new delivery.' },
          { text: 'No phone, eyes up, and a steady pace' },
          { text: 'A bigger audience', why: 'Fewer people, actually.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the rehearsal steps in order.',
        lines: ['Out loud, standing', 'Timed', 'Recorded and reviewed', 'In front of people'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps delivery, or hurts it?',
        groups: ['Helps', 'Hurts'],
        items: [
          { text: 'Reading from your phone', group: 1 },
          { text: 'Knowing your numbers cold', group: 0 },
          { text: 'Cramming until 3 a.m.', group: 1 },
          { text: '"I\'m excited" and slow breaths', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quiz: in the 2009 study, did displayed passion predict funding?',
        prompt: 'Your answer?',
        options: [
          { text: 'Yes, it was the biggest factor.', why: 'It wasn\'t.' },
          { text: 'Nobody got funded.', why: 'Some did, the prepared ones.' },
          { text: 'No. Perceived preparedness did.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada forgot a word but kept going. What did she do instead of panicking? (one word)',
        answers: ['smiled', 'smile', 'laughed', 'continued'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why aim for about 55–58 seconds, not 60?',
        options: [
          { text: 'To leave a buffer for pauses, laughs or a stumble' },
          { text: 'Judges like short pitches only', why: 'The buffer is for safety.' },
          { text: 'No reason', why: 'There\'s a good reason.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A colleague\'s advice. Which line is a myth?',
        lines: [
          'Practise the start and the ask the most.',
          'Real speakers never feel nervous, so if you do, you\'re not ready.',
          'Record yourself and watch it back.',
        ],
        bug: 1,
        fix: 'Most speakers feel nerves; they use the energy.',
        explanation: 'Nerves are normal, even for experienced speakers.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter taught it?',
        pairs: [
          ['The one sentence', 'Chapter 1'],
          ['Present, past, future', 'Chapter 2'],
          ['The Pixar pitch', 'Chapter 3'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The 2008 angels study suggests delivery matters. What does that mean for preparation?',
        options: [
          { text: 'Skip preparation and just perform', why: 'Performance without preparation is shaky.' },
          { text: 'Good delivery comes mostly from preparation: know it well enough to look up and speak naturally' },
          { text: 'Delivery doesn\'t matter after all', why: 'It mattered more than angels admitted.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4 so far.',
        template: '[[1]] beats passionate. Rehearse out [[2]]. Nerves? Say "I\'m [[3]]."',
        blanks: [['Prepared'], ['loud'], ['excited']],
        distractors: ['Loud', 'calm'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s review.',
        tiles: ['No', 'hostages', 'this', 'time.'],
        distractors: ['phone'],
      },
    ],
  },
  reflect: {
    prompt: 'Rehearse your pitch in front of one person this week. Write down what went better than you expected, and one thing to fix.',
    starters: ['Better than expected: ...', 'To fix: ...'],
  },
  deepen: {
    title: 'The stumble drill',
    summary: 'Rehearse once and deliberately skip a line in the middle. Practise carrying on smoothly. Knowing you can recover makes stumbles much less scary.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus earlier chapters.',
};

export default lesson;

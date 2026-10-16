import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint. Reviews lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: after the coffee',
  summary: 'The coffee ran 40 minutes over. Marta cried a little, then laughed a lot. Walking back, she says: "Okay, boss. Just don\'t turn into Carmen." Lucía promises nothing, and smiles.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the first-days tools without notes', 'Spot leadership myths in real plans'],
  learn: [
    {
      kind: 'story',
      title: 'Day 2, 4:52 p.m.',
      beats: [
        { speaker: 'marta', text: 'Okay. I\'m still disappointed. But I\'m glad you asked. Just... don\'t turn into Carmen.' },
        { speaker: 'lucia', text: 'I\'ll try to be me. Just with more meetings.' },
        { speaker: 'narrator', text: 'Back at her desk, Lucía finds a note from Tey: "One relationship sorted. Five to go. Quick check first."' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: your first two days.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does a new title give you, according to the research?',
        options: [
          { text: 'Instant respect', why: 'That\'s the myth.' },
          { text: 'Responsibility, but not automatic influence' },
          { text: 'Total control', why: 'New managers often feel less in control.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or reality?',
        groups: ['Myth', 'Reality'],
        items: [
          { text: 'People must obey the title', group: 0 },
          { text: 'Influence is earned', group: 1 },
          { text: 'Compliance is enough', group: 0 },
          { text: 'Commitment comes from trust', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Quick quiz: what am I measured by now?',
        prompt: 'Your answer?',
        options: [
          { text: 'How many posts you write.', why: 'That was the old job.' },
          { text: 'How many hours you work.', why: 'Hours aren\'t results.' },
          { text: 'What your team achieves, not what you do yourself.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gallup: managers account for at least ___% of the variance in team engagement. (a number)',
        answers: ['70', 'seventy'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the honest coffee in order.',
        lines: ['Name the change', 'Ask and listen', 'Say what you hope for', 'Be fair to everyone'],
      },
      {
        kind: 'mcq',
        prompt: 'Which promise should Lucía avoid?',
        options: [
          { text: '"You\'ll get the next promotion."' },
          { text: '"I\'ll listen to you."', why: 'She can keep that one.' },
          { text: '"I\'ll help you grow."', why: 'That\'s in her control.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for tomorrow. Which line is the doer trap?',
        lines: [
          'Meet each person for 20 minutes.',
          'Rewrite everyone\'s work myself so it\'s perfect.',
          'Ask the team what slows them down.',
        ],
        bug: 1,
        fix: 'Ask what help they need to make it great.',
        explanation: 'Rewriting their work is doing, not leading, and it tells them she doesn\'t trust them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who said it?',
        pairs: [
          ['"The job is yours."', 'Carmen'],
          ['"Don\'t turn into Carmen."', 'Marta'],
          ['"What am I now?"', 'Lucía'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does real influence come from?',
        options: [
          { text: 'The org chart', why: 'It names the role, not the respect.' },
          { text: 'Character and competence, built over time' },
          { text: 'Being everyone\'s friend', why: 'Friendly helps; fair matters more.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1 so far.',
        template: 'Influence is [[1]]. You\'re measured by your [[2]]. Be [[3]] to everyone.',
        blanks: [['earned'], ['team'], ['fair']],
        distractors: ['given', 'posts'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s promise to herself.',
        tiles: ['I\'ll', 'try', 'to', 'be', 'me.'],
        distractors: ['Carmen'],
      },
    ],
  },
  reflect: {
    prompt: 'Which idea from these lessons surprised you most? How would it change the way you lead, or the way you see your own manager?',
    starters: ['What surprised me...', 'It changes...'],
  },
  deepen: {
    title: 'Ask your own manager',
    summary: 'If you have a manager, ask them: "What surprised you most when you first started leading people?" Most will have a story, and it\'ll probably match Lucía\'s.',
  },
  notes: 'Checkpoint: reviews lessons 1–4.',
};

export default lesson;

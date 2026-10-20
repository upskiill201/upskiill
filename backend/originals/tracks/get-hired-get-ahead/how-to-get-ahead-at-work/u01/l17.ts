import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 17 — story choice: feeling like a fraud among experienced colleagues. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Feeling like a fraud',
  summary: 'Week eight. In the architecture meeting, everyone uses words Clinton half-knows. Paul draws a diagram in ten seconds. Clinton thinks: "They\'re going to find out I don\'t belong here." What should he do with that feeling?',
  minutes: 11,
  outcomes: ['Recognise the "I don\'t belong" feeling', 'Respond to it with facts and action', 'Talk about it with someone you trust'],
  learn: [
    {
      kind: 'story',
      title: 'The architecture meeting',
      beats: [
        { speaker: 'narrator', text: 'Week eight. A meeting about splitting the sync service. Words fly: idempotency, backpressure, event sourcing. Paul draws a diagram in ten seconds flat.' },
        { speaker: 'clinton', text: '(to himself) Everyone here is smarter than me. Any day now they\'ll realise they hired the wrong person.' },
        { speaker: 'tey', text: 'Many people feel like this in a new job, especially surrounded by experienced colleagues. The feeling is common and it isn\'t evidence. What you do with it matters.' },
      ],
      choice: {
        prompt: 'What should Clinton do with the feeling?',
        options: [
          {
            text: 'Write down the unknown words, look them up, and tell Miracle how he feels.',
            outcome: 'Miracle laughs: "I felt that for my whole first year." By Friday, "backpressure" is in his glossary and he asks Paul one good question about it.',
            best: true,
          },
          {
            text: 'Work until midnight every night to catch up on everything.',
            outcome: 'Two weeks later he\'s exhausted, makes a careless mistake, and feels even more like a fraud.',
          },
          {
            text: 'Stay silent in every meeting so nobody finds out.',
            outcome: 'Nobody finds out he doesn\'t know backpressure. Nobody finds out what he does know, either.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The "I don\'t belong" feeling is common and isn\'t evidence. Turn it into a glossary, a question and a conversation.',
    },
  ],
  apply: {
    scenario: 'Clinton feels like a fraud.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Is "I don\'t belong here" evidence that Clinton doesn\'t belong?',
        options: [
          { text: 'No: it\'s a common feeling, not evidence' },
          { text: 'Yes, feelings are facts', why: 'Feelings aren\'t evidence.' },
          { text: 'Only on Mondays', why: 'It\'s a feeling, not a fact.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful response, or unhelpful?',
        groups: ['Helpful', 'Unhelpful'],
        items: [
          { text: 'Add unknown words to his glossary', group: 0 },
          { text: 'Work until midnight every night', group: 1 },
          { text: 'Tell Miracle how he feels', group: 0 },
          { text: 'Go silent in every meeting', group: 1 },
          { text: 'Ask Paul one good question', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'You sound quiet. What\'s going on?',
        options: [
          { text: 'I feel like everyone\'s smarter and I\'ll get found out. Did you ever feel like that?' },
          { text: 'Nothing, I\'m fine. (he isn\'t)', why: 'Saying it out loud helps.' },
          { text: 'I\'m quitting.', why: 'Talk it through first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the thought that isn\'t a fact.',
        lines: ['I don\'t know what backpressure means yet.', 'They hired the wrong person.', 'Ngozi praised my incident write-up.'],
        bug: 1,
        explanation: 'A feeling, not a fact. The facts say otherwise.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Glossary, question, talk to Miracle', 'Backpressure learned, a good question asked'],
          ['Midnight every night', 'Exhaustion and a careless mistake'],
          ['Silent in meetings', 'Nobody sees what he knows'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s response in order.',
        lines: ['Notice the feeling', 'Write down the unknown words', 'Look them up', 'Ask one good question', 'Talk to someone he trusts'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What evidence does Clinton have that he belongs?',
        options: [
          { text: 'The tap-once fix, the incident write-up, Ngozi\'s praise' },
          { text: 'None at all', why: 'He has plenty of evidence.' },
          { text: 'Only his title', why: 'His work is the evidence.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s point.',
        template: 'The feeling is [[1]], and it isn\'t [[2]].',
        blanks: [['common'], ['evidence']],
        distractors: ['rare', 'permanent', 'proof'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which week was the architecture meeting? (a number)',
        answers: ['8', 'eight'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Fact or feeling?',
        groups: ['Fact', 'Feeling'],
        items: [
          { text: 'I shipped the tap-once fix', group: 0 },
          { text: 'Everyone\'s smarter than me', group: 1 },
          { text: 'I flagged the bug at 7:15', group: 0 },
          { text: 'I\'ll be found out', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When have you felt like you didn\'t belong somewhere? What evidence said otherwise?',
    starters: ['I felt it when...', 'The evidence was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write three facts about things you\'ve done well recently. Read them next time the "I don\'t belong" feeling shows up.',
  },
  notes: 'Often called "impostor feelings"; the original "impostor phenomenon" work is Clance & Imes (1978). Presented as a common experience, not a diagnosis; no prevalence statistics used.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5 — Checkpoint, "The Phone-In Quiz". Reviews lessons 1–4 plus Chapters 1–2. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'The Phone-In Quiz: David\'s voice check',
  summary: 'David has a group meeting tomorrow. He\'s practised his line twelve times in the mirror. Before he hangs up, Tey has one more thing: the Tey FM Phone-In Quiz, with David as the contestant.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use voice, pause and the nerves research without notes', 'Connect David\'s tools to Chapters 1 and 2'],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:58 p.m.',
      beats: [
        { speaker: 'david', text: 'I practised in the mirror. Breath. "I have an idea." Pause. "Donor... buddies." Pause. My roommate asked if I was okay.' },
        { speaker: 'tey', text: "Your roommate will be fine. And now, David, you are tonight's contestant on... the Tey FM Phone-In Quiz!" },
        { speaker: 'david', text: '(very quietly) Oh no.' },
        { speaker: 'tey', text: "Louder, contestant!" },
        { speaker: 'david', text: '(a breath, full voice) Oh. No.' },
      ],
    },
  ],
  apply: {
    scenario: 'The Tey FM Phone-In Quiz, starring David.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the 2015 study, what changed when people HEARD a pitch instead of reading it?',
        options: [
          { text: 'Nothing', why: 'Hearing made a real difference.' },
          { text: 'They rated the speaker as more competent and intelligent' },
          { text: 'They trusted the speaker less', why: 'The opposite.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put David\'s delivery in order.',
        lines: ['Breathe', 'Pause', 'Say the idea slowly', 'Pause again', 'Stop'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Illusion, or reality?',
        groups: ['The illusion', 'The reality'],
        items: [
          { text: 'Everyone can see my nerves', group: 0 },
          { text: 'Audiences notice far less than speakers think', group: 1 },
          { text: 'My red face is all they\'ll remember', group: 0 },
          { text: 'They mostly see someone sharing an idea', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: 'Quiz question: should I end my idea with "but it\'s probably stupid"?',
        prompt: 'Your answer, contestant?',
        options: [
          { text: 'Yes, it sounds humble.', why: 'It sounds like you don\'t believe it, so they won\'t either.' },
          { text: 'Only if it\'s really stupid.', why: 'Donor buddies is not stupid.' },
          { text: 'No. Say the idea, pause, and stop. No apology.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Speak loud enough for the person at the ___ of the room. (one word)',
        answers: ['back'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why did knowing about the illusion of transparency help speakers?',
        options: [
          { text: 'They stopped worrying so much about being "seen", so they relaxed and spoke better' },
          { text: 'It made them louder', why: 'It made them calmer.' },
          { text: 'It didn\'t help', why: 'It did: calmer speakers, better-rated speeches.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'David\'s plan for tomorrow. Which line breaks this chapter\'s advice?',
        lines: [
          'Take a breath before I speak.',
          'Say "donor buddies" quickly so it\'s over faster.',
          'Pause after, and let the group react.',
        ],
        bug: 1,
        fix: 'Say "donor buddies" slowly.',
        explanation: 'Rushing the key idea is how it got lost. Slow the words that matter.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which caller learned it?',
        pairs: [
          ['Listen first, then speak', 'Clinton'],
          ['Answer first, details last', 'Arjun'],
          ['Pause before and after', 'David'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does David need to become loud like Junior to be heard?',
        options: [
          { text: 'Yes, volume is everything', why: 'Volume helps, but it\'s one tool of many.' },
          { text: 'No: a full voice, pauses and good timing are enough' },
          { text: 'Yes, and he should copy Junior\'s jokes', why: 'David should sound like David.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3 so far.',
        template: 'Use your [[1]]. Pause before and [[2]]. Your nerves are less [[3]] than you think.',
        blanks: [['voice'], ['after'], ['visible', 'obvious']],
        distractors: ['notebook', 'loud'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build David\'s line.',
        tiles: ['I', 'have', 'an', 'idea:', 'donor', 'buddies.'],
        distractors: ['sorry,', 'maybe'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of David\'s tools (voice, pause, knowing nerves are less visible) would help you most? When could you try it this week?',
    starters: ['The tool I need most is...', 'I\'ll try it when...'],
  },
  deepen: {
    title: 'Practise out loud',
    summary: 'Before an important conversation, say your key line out loud three times: once normally, once with a breath and pause, once slower. Out loud, not in your head. It feels silly; it works.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapters 1–2.',
};

export default lesson;

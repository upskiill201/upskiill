import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Card deck: celebrating well (peak-end rule; rituals; naming everyone). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Celebrate it properly',
  summary: 'Rollout is Saturday. Folake has booked a restaurant for Saturday night. Miracle wonders if dinner is enough to mark eight weeks that changed this team. Tey deals out the cards on celebrating well.',
  minutes: 11,
  outcomes: [
    'Know why how something ends shapes how it\'s remembered',
    'Celebrate in ways that mean something to people',
    'Make sure everyone, including the quiet work, is seen',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Psychologists <strong>Daniel Kahneman</strong> and colleagues found that people tend to remember experiences mostly by their most intense moment and how they <strong>ended</strong>, known as the peak-end rule. A hard eight weeks that ends well is often remembered as a good eight weeks. Here are the cards for ending well.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 1: Mark the moment itself</h3><p>When clinic 300 goes live, stop everything. Ring the bell 300 times if you have to. The peak deserves to be felt, together.</p><h3>Card 2: Tell the story back</h3><p>\"Week 1: 2.1 out of 5. Six broken headsets. A sweepstake on how long I\'d last. Today: 300 clinics.\" Reminding people how far they came makes the ending mean more.</p><h3>Card 3: Name everyone, specifically</h3><p>Not \"thanks, team\". Chidi's northern 40. Halima's Hausa clinics. Bisi's script. Emmanuel's 16-clinic Thursday. And the on-call nights nobody saw.</p>",
    },
    {
      kind: 'text',
      html: "<h3>Card 4: Let the people you helped speak</h3><p>A two-minute video from Nurse Adaeze and Dr Bello will mean more than any speech from Folake or Miracle.</p><h3>Card 5: Celebrate their way, too</h3><p>Dinner is lovely. Halima might prefer a quiet thank-you. Chidi might prefer the next big problem. A celebration can have more than one shape.</p><h3>Card 6: Then rest</h3><p>A slow Monday, a late start, or a day off. Rest after a peak is part of the celebration. It tells people the effort was seen, and won\'t simply become the new normal.</p>",
    },
    {
      kind: 'check',
      question: 'What does the peak-end rule say about how we remember experiences?',
      options: ['Mostly by the most intense moment and the ending', 'By the average of every day', 'Only by the beginning'],
      answer: 0,
      explanation: 'End hard weeks well, and they\'re remembered well.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Mark the peak together. Tell the story back. Name everyone, specifically. Let the people you helped speak. Celebrate their way. Then rest.',
    },
  ],
  apply: {
    scenario: 'Planning the celebration.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the ending of rollout week matter so much?',
        options: [
          { text: 'Folake will be watching', why: 'It\'s about the team\'s memory.' },
          { text: 'People tend to remember experiences by their peak and their ending' },
          { text: 'It doesn\'t; the work is done', why: 'How it ends shapes how it\'s remembered.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good celebration, or weak one?',
        groups: ['Good', 'Weak'],
        items: [
          { text: 'Ringing the bell for clinic 300', group: 0 },
          { text: '"Thanks, team, back to work."', group: 1 },
          { text: 'A video from Nurse Adaeze', group: 0 },
          { text: 'Straight on to the next deadline', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'I\'ve booked dinner for Saturday. Anything else?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Dinner is perfect, thank you. Could we also give everyone Monday morning off, and could you thank each of them by name, specifically?' },
          { text: 'No, that\'s plenty.', why: 'Dinner is good. Rest and specific thanks make it stick.' },
          { text: 'Can we have a bonus instead?', why: 'They already have the team bonus.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kahneman\'s finding is called the peak-___ rule. (one word)',
        answers: ['end', 'End'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the card to the move.',
        pairs: [
          ['Mark the peak', 'The bell for clinic 300'],
          ['Tell the story back', '"Week 1: 2.1 out of 5"'],
          ['Then rest', 'Monday morning off'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why let Nurse Adaeze and Dr Bello speak?',
        options: [
          { text: 'They\'re good speakers', why: 'It\'s about who they are.' },
          { text: 'Hearing from the people you helped means more than any leader\'s speech' },
          { text: 'To save Miracle a speech', why: 'It\'s the most meaningful voice.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s celebration plan. Which line weakens the ending?',
        lines: [
          'Ring the bell together for clinic 300.',
          'Monday 8 a.m.: kick-off for next quarter\'s target.',
          'A short video from Nurse Adaeze at dinner.',
        ],
        bug: 1,
        fix: 'Monday morning off; we start at 1 p.m.',
        explanation: 'Jumping straight to the next target makes the peak feel like the new normal.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the celebration in order.',
        lines: ['Mark the moment together', 'Tell the story back', 'Name everyone specifically', 'Then rest'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'End hard weeks [[1]], and they\'re [[2]] well.',
        blanks: [['well'], ['remembered']],
        distractors: ['fast', 'forgotten'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the story-back line.',
        tiles: ['Week', '1:', '2.1', 'out', 'of', '5.'],
        distractors: ['10.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a hard project or season that ended well, or badly. How did the ending change how you remember the whole thing?',
    starters: ['It ended...', 'Now I remember it as...'],
  },
  deepen: {
    title: 'End it on purpose',
    summary: 'For the next thing you finish with others, plan the ending: a moment together, the story told back, everyone named, and some rest.',
  },
  notes: 'Peak-end rule: Daniel Kahneman, Barbara Fredrickson, Charles Schreiber & Donald Redelmeier (1993), "When more pain is preferred to less: Adding a better end", Psychological Science 4(6); Redelmeier & Kahneman (1996), Pain 66(1). Celebration rituals and recognition: hedged practice guidance. Fictional details.',
};

export default lesson;

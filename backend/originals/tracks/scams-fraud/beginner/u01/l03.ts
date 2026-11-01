import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 3. Reading: why scams work on clever people. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Why clever people fall for it',
  summary: 'Grace spent 18 years making calm decisions in emergencies on a hospital ward. So why did a text nearly get her? Here\'s what pressure does to the brain, and why scammers plan for it.',
  minutes: 12,
  outcomes: [
    'Explain "hot" and "cold" thinking',
    'See why intelligence doesn\'t protect you',
    'Understand how big the problem is',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Hot and cold',
      html: '<p>On the ward, Grace had protocols for emergencies: checklists, second checks, "stop and confirm the patient\'s name". They existed because even brilliant nurses make mistakes when rushed, tired or frightened.</p><p>Psychologists sometimes describe two states:</p><ul><li><strong>Cold thinking:</strong> calm, slow, careful. You check details, notice odd things, ask questions.</li><li><strong>Hot thinking:</strong> fast and driven by emotion: fear, love, excitement, panic. You act first and think later.</li></ul><p>Scams are designed to move you from cold to hot, fast. Urgency, authority, emotion and secrecy all push you there. In the hot state, being clever doesn\'t help much, because you\'re not using the careful part of your thinking at all.</p><p><strong>That\'s why scam victims include doctors, lawyers, accountants and engineers.</strong> Research and police reports consistently show fraud victims come from every age, income and education level. The ones who are caught out usually weren\'t foolish; they were busy, kind, worried or excited at the wrong moment.</p><p><strong>How big is it?</strong> In the UK, the banking industry body UK Finance reported that over £1 billion was stolen through fraud in 2023, and fraud is one of the most common crimes people experience. Most of it never makes the news.</p><p><strong>The fix isn\'t being cleverer.</strong> It\'s having a protocol, like Grace\'s ward checklists: a habit that forces a pause and a second check before any money moves.</p>',
    },
    {
      kind: 'check',
      question: 'Why doesn\'t intelligence protect people from scams?',
      options: ['Clever people are greedy', 'Scams push you into fast, emotional thinking where cleverness isn\'t being used', 'It does protect them'],
      answer: 1,
      explanation: 'In the hot state, careful thinking is switched off.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Scams push you from calm "cold" thinking into fast "hot" thinking. Anyone can be caught. The protection is a protocol that forces a pause.',
    },
  ],
  apply: {
    scenario: 'Hot and cold thinking.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Hot thinking or cold thinking?',
        groups: ['Hot', 'Cold'],
        items: [
          { text: 'Paying before reading the details', group: 0 },
          { text: 'Calling back on a known number', group: 1 },
          { text: 'Panicking about a "locked account"', group: 0 },
          { text: 'Checking the sender carefully', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a scam try to do to your thinking?',
        options: [
          { text: 'Make it slower', why: 'The opposite.' },
          { text: 'Nothing', why: 'That\'s exactly the aim.' },
          { text: 'Move it from calm to fast and emotional' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'I\'m surprised you nearly fell for it, Grace. You\'re so sharp.',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Sharp doesn\'t help when you\'re worried and rushed. That\'s why I want a checklist, like on the ward.' },
          { text: 'I wasn\'t really fooled.', why: 'Honesty helps others.' },
          { text: 'I must be getting old.', why: 'It\'s pressure, not age.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The fix.',
        template: 'The fix isn\'t being [[1]]; it\'s a [[2]] that forces a pause.',
        blanks: [['cleverer', 'smarter'], ['protocol', 'habit', 'checklist']],
        distractors: ['richer', 'password'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each ward habit to its money version.',
        pairs: [
          ['Confirm the patient\'s name', 'Confirm who\'s really asking'],
          ['Second check before giving a drug', 'Second check before sending money'],
          ['Stop if something feels wrong', 'Pause if a message feels urgent'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which statement is wrong?',
        lines: [
          'Fraud victims come from every age and education level.',
          'Pressure switches off careful thinking.',
          'People with degrees are rarely scammed.',
        ],
        bug: 2,
        fix: 'Highly educated people are scammed too.',
        explanation: 'Scams target emotion and timing, not knowledge.',
      },
      {
        kind: 'mcq',
        prompt: 'Roughly how much did UK Finance report was stolen through fraud in the UK in 2023?',
        options: [
          { text: 'About £1,000', why: 'Far more.' },
          { text: 'Nothing; fraud is rare', why: 'It\'s very common.' },
          { text: 'Over £1 billion' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many years was Grace a ward nurse?',
        answers: ['18', 'eighteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to cool down hot thinking.',
        lines: ['Notice the strong feeling', 'Stop: don\'t act yet', 'Breathe and read again slowly', 'Check through a trusted channel'],
      },
      {
        kind: 'mcq',
        prompt: 'Who is usually caught out by scams?',
        options: [
          { text: 'Only foolish people', why: 'Anyone can be.' },
          { text: 'People who were busy, kind, worried or excited at the wrong moment' },
          { text: 'Only the elderly', why: 'All ages.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When are you most likely to be in "hot" thinking: rushing, tired, worried? What could slow you down?',
    starters: ['I\'m most rushed when...', 'I could slow down by...'],
  },
  deepen: {
    title: 'Fraud is under-reported',
    summary: 'Many victims never report fraud, often out of embarrassment. That means official figures are likely to underestimate it. Talking openly, as Grace does, makes it easier for others to speak up.',
  },
  notes: 'UK Finance Annual Fraud Report 2024: £1.17bn stolen through fraud in 2023 (stated as "over £1 billion"). Hot/cold states: Loewenstein hot-cold empathy gap, simplified. Priya per CAST.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Side by side: resetting the team after a change. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Reset the team',
  summary: 'Option B changes Kavya and Joel\'s next six days. Arjun could send a quick "new plan, let\'s go!" Or he could reset expectations properly. Two versions of the message.',
  minutes: 11,
  outcomes: [
    'Reset a team\'s expectations after a change',
    'Say what changed, what moved and what stays',
    'Give people the why, not just the new tasks',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Arjun\'s message to the team',
      before: { label: 'Quick update', text: 'New plan! Mr Rao wants a comeback code. Kavya, can you add it? Let\'s push, team!' },
      after: { label: 'Proper reset', text: 'What changed: Mr Rao chose option B, a ₹100 comeback code for every Diwali buyer, ready Day 24. Why: he wants customers back after Diwali. Who: Joel owns the code (it touches checkout); Kavya adds the banner. What moved: coupons slip to Day 26. What stays: launch Day 28, all 14 musts. What\'s not happening: points (January). Questions on today\'s call at 11.' },
      notes: [
        'The quick update leaves everyone guessing what else changed.',
        'The reset answers every question before it\'s asked.',
        '"What stays" matters as much as "what changed": it calms people.',
      ],
    },
    {
      kind: 'text',
      html: "<p>When plans change, people's first question is often <em>\"what does this mean for me?\"</em> A good reset answers it in five parts: <strong>what changed, why, who owns what, what moved, and what stays the same</strong>. The last part is the one leaders forget. Without it, people quietly worry that everything has changed, and start second-guessing work that's still fine.</p>",
    },
    {
      kind: 'check',
      question: 'Which part of a reset do leaders most often forget?',
      options: ['What stays the same', 'What changed', 'Who owns it'],
      answer: 0,
      explanation: 'Without it, people assume everything changed.',
    },
  ],
  apply: {
    scenario: 'Resetting after option B.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Quick update or proper reset?',
        groups: ['Quick update', 'Proper reset'],
        items: [
          { text: '"New plan! Let\'s push!"', group: 0 },
          { text: '"What stays: launch Day 28."', group: 1 },
          { text: '"Kavya, can you add it?"', group: 0 },
          { text: '"Joel owns the code; Kavya the banner."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why say what stays the same?',
        options: [
          { text: 'To fill space', why: 'It calms people.' },
          { text: 'Otherwise people assume everything changed and second-guess good work' },
          { text: 'It\'s not needed', why: 'It\'s the part leaders forget.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So do I stop the shipping-page polish?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'No, that stays. Only coupons move. You add the banner by Day 24, then finish polish as planned.' },
          { text: 'Yes, everything stops for the code.', why: 'Only coupons moved.' },
          { text: 'Up to you.', why: 'That\'s guessing again.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'People\'s first question after a change: "What does this mean for ___?" (one word)',
        answers: ['me', 'Me'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the reset to the line.',
        pairs: [
          ['What changed', '"Option B: a ₹100 comeback code."'],
          ['What moved', '"Coupons slip to Day 26."'],
          ['What stays', '"Launch Day 28, all 14 musts."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Joel own the comeback code, not Kavya?',
        options: [
          { text: 'Kavya is busy', why: 'It\'s about ownership on the team page.' },
          { text: 'It touches checkout, which Joel owns' },
          { text: 'Arjun prefers Joel', why: 'It follows the ownership list.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s reset. Which line is missing a part?',
        lines: [
          'What changed: option B, comeback code by Day 24.',
          'Why: customers coming back after Diwali.',
          'Who: someone can pick it up.',
        ],
        bug: 2,
        fix: 'Who: Joel owns the code; Kavya adds the banner.',
        explanation: '"Someone can pick it up" is the "we\'ll handle it" of resets.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a team reset in order.',
        lines: ['What changed', 'Why', 'Who owns what', 'What moved', 'What stays the same'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'What [[1]], what moved, and what [[2]] the same.',
        blanks: [['changed'], ['stays']],
        distractors: ['broke', 'hides'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the calming line.',
        tiles: ['What', 'stays:', 'launch', 'Day', '28.'],
        distractors: ['panic'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a change that was announced badly where you study or work. Which part of the reset was missing?',
    starters: ['The change was...', 'Missing: ...'],
  },
  deepen: {
    title: 'Five-part reset',
    summary: 'Next time a plan changes, send a five-part reset: what changed, why, who, what moved, what stays. Count the follow-up questions.',
  },
  notes: 'Change communication: clarity on what changes and what remains reduces uncertainty (e.g. Bordia et al. 2004 on uncertainty during change), hedged. Fictional details.',
};

export default lesson;

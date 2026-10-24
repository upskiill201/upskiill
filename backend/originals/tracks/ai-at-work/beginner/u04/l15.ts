import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 15 — Checkpoint 3. Pre-send checks, stakes, detection, ownership. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: check it, then own it',
  summary: 'The six pre-send checks, matching effort to stakes, judging content fairly, and owning what you send.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can check a message before it goes out', 'Show you can match checks to stakes'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. Pre-send checks, stakes, AI detection and ownership.', replies: ['Ready'] },
        { tey: 'Warm-up: the AI got the total wrong and you sent it. Whose mistake?', replies: ['Mine'] },
        { tey: 'Yours to own, yours to fix. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: a busy Wednesday.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the six pre-send checks.',
        lines: ['Names', 'Numbers', 'Dates and times', 'Promises', 'Leftovers', 'Tone'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line should never be sent?',
        lines: ['Hi Lucía,', 'As an AI language model, I recommend...', 'The deck is attached.', 'Thanks, Ada'],
        bug: 1,
        fix: 'I recommend...',
        explanation: 'A leftover from the AI.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Low stakes or high stakes?',
        groups: ['Low', 'High'],
        items: [
          { text: 'A birthday card message', group: 0 },
          { text: 'A tax rate on an invoice', group: 1 },
          { text: 'A team meeting agenda', group: 0 },
          { text: 'Rules for storing ID numbers', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A detector says a draft is "90% AI". What should Ada do?',
        options: [
          { text: 'Reject it immediately', why: 'Detectors are unreliable.' },
          { text: 'Judge the draft on accuracy and specifics; don\'t treat the score as proof' },
          { text: 'Trust it completely', why: 'Scores aren\'t proof either way.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your email promised a refund within 24 hours. Is that real?',
        prompt: 'If Ada didn\'t mean to promise that, best reply?',
        options: [
          { text: 'The AI wrote that part.', why: 'Own it.' },
          { text: 'Yes, of course.', why: 'Don\'t make a promise you can\'t keep.' },
          { text: 'My mistake, I shouldn\'t have promised that. Let me confirm the real timeline with finance and get back to you today.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the slip.',
        pairs: [
          ['Names', 'Wrong spelling of a CEO\'s name'],
          ['Dates', 'Wrong day of the week'],
          ['Promises', 'A refund nobody approved'],
          ['Leftovers', '[Insert result]'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Check effort matches the [[1]] of being wrong. If your name is on it, you [[2]] it.',
        blanks: [['cost'], ['own']],
        distractors: ['length', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the risk question.',
        tiles: ['What', 'happens', 'if', 'this', 'is', 'wrong?'],
        distractors: ['Why'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is right for a high-stakes tax question?',
        options: [
          { text: 'What tax rate should I put on the invoice?', why: 'Treats AI as final.' },
          { text: 'What questions should I ask our finance team about the tax on this invoice, and which official source should I check?' },
          { text: 'Guess the tax rate.', why: 'Never guess money.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Owning it, or avoiding it?',
        groups: ['Owning', 'Avoiding'],
        items: [
          { text: '"My mistake, here\'s the fix"', group: 0 },
          { text: '"Everyone makes AI mistakes"', group: 1 },
          { text: '"I\'ll check totals from now on"', group: 0 },
          { text: 'Saying nothing', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which group did detectors wrongly flag in the 2023 Stanford study? (two words: non-native ...)',
        answers: ['english writers', 'English writers', 'English speakers', 'english speakers', 'writers'],
        placeholder: 'Two words',
      },
      {
        kind: 'findBug',
        prompt: 'Which item is under-checked?',
        lines: ['Lunch idea: quick read', 'Client stat: source opened', 'Contract clause: copied from AI', 'Team agenda: quick read'],
        bug: 2,
        fix: 'Contract clause: reviewed by the legal adviser.',
        explanation: 'Legal is always high stakes.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the final step of the pre-send check?',
        options: [
          { text: 'Read it once as the person receiving it' },
          { text: 'Run a detector', why: 'Read it as the receiver.' },
          { text: 'Make it longer', why: 'Read it as the receiver.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Should we stop using AI after the invoice mix-up?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, it\'s too risky.', why: 'Overcorrection.' },
          { text: 'Yes, but only for invoices.', why: 'Checking fixes it everywhere.' },
          { text: 'No, the fix is checking. AI drafts, we recheck numbers and promises before anything goes out.' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign it off yourself, or get an expert?',
        groups: ['Myself, after checking', 'Expert'],
        items: [
          { text: 'A meeting summary', group: 0 },
          { text: 'A data protection rule', group: 1 },
          { text: 'A sourced slide', group: 0 },
          { text: 'A medical claim in an ad', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of today\'s skills would have saved you from a past mistake?',
    starters: ['The mistake was...', 'The skill that would have helped:'],
  },
  notes: 'Checkpoint for Unit 4 lessons 11-14.',
};

export default lesson;

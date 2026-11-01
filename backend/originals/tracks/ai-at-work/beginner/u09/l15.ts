import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 15 — Checkpoint 3. Rehearsal, negotiation, apologies, when not to use AI. */
const lesson: OriginalLesson = {
  key: 'l15',
  title: 'Checkpoint: hard talks and real apologies',
  summary: 'Rehearsing hard conversations, negotiating with interests, apologies that work, and knowing when to put AI away.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can prepare and negotiate a hard conversation', 'Show you can apologise well and know AI\'s limits'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 3. The bank call, the apology, and Tolu.', replies: ['Ready'] },
        { tey: 'Warm-up: what are the four things to prepare for a hard conversation?', replies: ['Ask, facts, pushback, fallback'] },
        { tey: 'Exactly. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the end of outage week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the preparation.',
        lines: ['Ask', 'Facts', 'Likely pushback', 'Fallback'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which role-play request is best?',
        options: [
          { text: 'Agree with me.', why: 'No practice.' },
          { text: 'Act as the bank\'s partner manager, careful with money. Push back realistically, one reply at a time.' },
          { text: 'Be furious.', why: 'Unrealistic.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Position or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"We won\'t pay"', group: 0 },
          { text: 'Keep costs down', group: 1 },
          { text: '"Pay everything"', group: 0 },
          { text: 'Keep shops\' trust', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'BATNA: Best Alternative To a Negotiated ... (one word)',
        answers: ['Agreement', 'agreement'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the apology.',
        lines: ['What happened', 'Responsibility', 'Sorry', 'Repair', 'What changes', 'Next step'],
      },
      {
        kind: 'findBug',
        prompt: 'Which apology line should go?',
        lines: ['Our app stopped payments for two hours.', 'That was our responsibility.', 'We apologise for any inconvenience.', 'Fees for the day are refunded.'],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Empty phrase.',
      },
      {
        kind: 'sortGroups',
        prompt: 'AI draft, or your own words?',
        groups: ['AI draft OK', 'Own words'],
        items: [
          { text: 'Status update', group: 0 },
          { text: 'Condolences', group: 1 },
          { text: 'Meeting follow-up', group: 0 },
          { text: 'Thanks to a mentor', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The bank won\'t cover refunds. Disaster?',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Yes, total disaster.', why: 'She has a BATNA and options.' },
          { text: 'No: shops are refunded either way. I\'m offering options: half the cost or a fee waiver.' },
          { text: 'Let\'s threaten them.', why: 'Damages the partnership.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Look past positions to [[1]]. AI helps you think, not [[2]] for you.',
        blanks: [['interests'], ['speak']],
        distractors: ['threats', 'pay'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the apology part that research rates highest.',
        pairs: [
          ['Most valued', 'Taking responsibility'],
          ['Also highly valued', 'Offering repair'],
          ['Least useful', '"Any inconvenience"'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the responsibility line.',
        tiles: ['That', 'was', 'our', 'responsibility'],
        distractors: ['their'],
      },
      {
        kind: 'findBug',
        prompt: 'Which fallback is really a threat?',
        lines: ['Bank covers half', 'Bank waives next month\'s fees', 'We leave today if they say no', 'Joint message to shops'],
        bug: 2,
        fix: 'Remove it; keep realistic options.',
        explanation: 'A threat, not a fallback.',
      },
      {
        kind: 'mcq',
        prompt: 'Lucía has to tell someone their role is ending. Best approach?',
        options: [
          { text: 'An AI-written email', why: 'Life-changing news needs a person.' },
          { text: 'A group chat message', why: 'Private conversation first.' },
          { text: 'A conversation first; a written note can follow' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What can AI role-play not tell Ada?',
        options: [
          { text: 'What the real person will actually say' },
          { text: 'Possible pushback', why: 'It can suggest that.' },
          { text: 'Options to offer', why: 'It can suggest those.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these skills would help most in a conversation you\'re dreading?',
    starters: ['The conversation:', 'The skill:'],
  },
  notes: 'Checkpoint for Unit 9 lessons 11-14.',
};

export default lesson;

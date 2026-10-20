import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: name the tactic',
  summary: 'The flinch, extreme anchors, good cop / bad cop and deadlines. A quick check before the next two tactics: "my boss won\'t allow it" and the last-minute nibble.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot four common tactics', 'Choose a calm answer to each'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday night',
      beats: [
        { speaker: 'kavya', text: 'I\'ve turned my sticky note into a poster. "Tactics spotted: 5. Tactics that worked: 0."' },
        { speaker: 'arjun', text: 'Let\'s keep it that way.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: name the tactic.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the tactic to the calm answer.',
        pairs: [
          ['Flinch', 'Don\'t move; explain once'],
          ['Extreme anchor', 'Counter with your number and reasons'],
          ['Good cop / bad cop', 'Treat them as one team'],
          ['Deadline', 'Ask what\'s driving the date'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tactic is this?',
        groups: ['Flinch', 'Deadline', 'Good cop'],
        items: [
          { text: '"Ooh. That much?"', group: 0 },
          { text: '"Offer ends at midnight."', group: 1 },
          { text: '"I\'m on your side here."', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'They open at an extreme number. What should you avoid?',
        options: [
          { text: 'Bargaining up from their number' },
          { text: 'Explaining your own price', why: 'That\'s a good counter-anchor.' },
          { text: 'Asking about scope', why: 'That moves away from their anchor.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'They anchor at £20,000; your price is £40,000. What\'s the middle, in pounds?',
        answers: ['30000', '30,000', '£30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'The client says "decide by 5 p.m. or it\'s gone". What do I say?',
        prompt: "Arjun's best reply?",
        options: [
          { text: '"Thanks. What\'s driving 5 p.m.? I want to give you a considered answer."' },
          { text: '"OK, yes, whatever you want."', why: 'That\'s what the deadline is designed for.' },
          { text: '"That\'s a cheap trick."', why: 'Calling it out rudely backfires.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'After a flinch.',
        template: 'Don\'t [[1]]. Explain [[2]], then stop.',
        blanks: [['move'], ['once']],
        distractors: ['breathe', 'twice'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this response to good cop / bad cop is the mistake?',
        lines: [
          'Thank you both.',
          'I hear the budget concern.',
          'Since you\'re on our side, we\'ll take your number.',
          'Let me send options tomorrow.',
        ],
        bug: 2,
        fix: 'Judge the number on its merits.',
        explanation: 'The "good cop" offer is still an offer.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does spotting a tactic help?',
        options: [
          { text: 'It stops working on you once you see it as a move' },
          { text: 'You can accuse them', why: 'It\'s for your own clarity.' },
          { text: 'It doesn\'t help', why: 'Recognising it removes most of its power.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many tactics worked on Arjun\'s team, according to Kavya\'s poster?',
        answers: ['0', 'zero', 'none'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the general answer to any tactic.',
        lines: ['Notice it', 'Name it to yourself', 'Don\'t reward it', 'Return to interests and standards'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the four tactics would be hardest for you to resist? What would you say?',
    starters: ['The hardest is...', 'I would say...'],
  },
  notes: 'Checkpoint for Chapter 2 lessons 1-4. Midpoint of 20,000 and 40,000 = 30,000.',
};

export default lesson;

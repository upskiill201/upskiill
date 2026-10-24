import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Tap to explore: ward rules v2. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Ward rules v2',
  summary: 'Grace adds the calm-down rules to her page. Most of them she used on the ward every night; now they have words. Tap each new line.',
  minutes: 11,
  outcomes: [
    'Add de-escalation rules to your own list',
    'Link each rule to a lesson from this chapter',
    'Keep the rules short enough to use under stress',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Grace\'s ward rules v2',
      text: 'Rules 1 to 5 from v1, plus: Rule 6: When voices rise, go lower and slower. Rule 7: Acknowledge before you solve. Rule 8: Name it to tame it, as a guess. Rule 9: Flooded? Twenty minutes, then come back. Rule 10: Start soft: one moment, my feeling, their pressure, a request. Never say "calm down".',
      hotspots: [
        { phrase: 'go lower and slower', note: 'Lesson 1: Grace\'s ward voice in the design review.' },
        { phrase: 'Acknowledge before you solve', note: 'Lesson 2: the calm-down sequence.' },
        { phrase: 'Name it to tame it, as a guess', note: 'Lesson 3: labelling calms the brain\'s alarm.' },
        { phrase: 'Twenty minutes, then come back', note: 'Lesson 3: Gottman\'s advice on flooding.' },
        { phrase: 'Start soft', note: 'Lesson 4: how it starts predicts how it ends.' },
        { phrase: 'Never say "calm down"', note: 'Lesson 6: the one line that almost never works.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v2 adds lower and slower, acknowledge first, name it, the 20-minute break, and soft starts.',
    },
  ],
  apply: {
    scenario: 'Ward rules v2.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the rule to the lesson.',
        pairs: [
          ['Lower and slower', 'The raised voice'],
          ['Acknowledge first', 'The calm-down sequence'],
          ['Twenty minutes', 'Name it to tame it'],
          ['Start soft', 'Harsh vs soft start'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many rules are on v2 in total?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why "name it to tame it, as a guess"?',
        options: [
          { text: 'Guessing is lazy', why: 'Tentative labels work better.' },
          { text: 'To avoid naming it', why: 'You still name it, gently.' },
          { text: 'A guess ("it sounds like...") invites correction; a verdict invites defence' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'From v1 or new on v2?',
        groups: ['v1', 'New on v2'],
        items: [
          { text: 'Silence is not peace', group: 0 },
          { text: 'Lower and slower', group: 1 },
          { text: 'Triage first', group: 0 },
          { text: 'Start soft', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'Can I borrow your rules? I think I\'m the voice that rises.',
        prompt: "Grace's best reply?",
        options: [
          { text: 'No, they\'re mine.', why: 'Sharing helps the team.' },
          { text: 'Of course. Rule 9 might be your favourite: twenty minutes, then come back.' },
          { text: 'You definitely need them.', why: 'Kind, not cutting.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Rule 6.',
        template: 'When voices rise, go [[1]] and [[2]].',
        blanks: [['lower'], ['slower']],
        distractors: ['louder', 'faster'],
      },
      {
        kind: 'mcq',
        prompt: 'What does a soft start include?',
        options: [
          { text: 'A list of everything they\'ve done wrong', why: 'That\'s a harsh start.' },
          { text: 'An apology for raising it', why: 'No need to apologise.' },
          { text: 'One moment, my feeling, their pressure, a request' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v2 is wrong?',
        lines: [
          'When voices rise, go lower and slower.',
          'Acknowledge before you solve.',
          'Flooded? Push through until it\'s settled.',
          'Start soft.',
        ],
        bug: 2,
        fix: 'Flooded? Twenty minutes, then come back.',
        explanation: 'Flooded people can\'t listen.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes is the flooding break in Rule 9?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new rules as written.',
        lines: ['Lower and slower', 'Acknowledge before you solve', 'Name it to tame it', 'Twenty minutes, then come back', 'Start soft'],
      },
    ],
  },
  reflect: {
    prompt: 'Add two de-escalation rules to your own list. Which situations will you use them in?',
    starters: ['Rule:...', 'I\'ll use it when...'],
  },
  notes: 'Ward rules v2 (fictional) adds Chapter 2 rules.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Myth or Fact: "calm down" vs "I'm excited" (Brooks 2014, hedged). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '"Calm down" vs "I\'m excited"',
  summary: 'Every time Ada imagines the stage, her heart races. Everyone tells her "Just calm down." It never works. Tey has a different idea.',
  minutes: 11,
  outcomes: [
    'Know why "calm down" rarely works',
    'Try reframing nerves as excitement',
    'Use simple things that help before you speak',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'The best way to handle nerves is to tell yourself to calm down.', isFact: false, explain: 'Myth, often. Nerves and calm are very different body states. Going from a racing heart to calm is a big jump, and trying to force it can make you notice the nerves more.' },
        { text: 'Nerves and excitement feel very similar in the body.', isFact: true, explain: 'Fact. Both come with a faster heart, energy and alertness. The main difference is whether you read the feeling as a threat or an opportunity.' },
        { text: 'Saying "I am excited" before a speech may help more than "I am calm".', isFact: true, explain: 'Fact, with a caveat. In a 2014 study by Alison Wood Brooks, people who said "I am excited" before a speech were rated more persuasive, confident and competent than those who said "I am calm". It\'s one well-known study; more replication would make it stronger.' },
        { text: 'Good speakers don\'t feel nervous.', isFact: false, explain: 'Myth. Many experienced speakers still feel nerves. They\'ve just learned to use the energy rather than fight it.' },
        { text: 'A few slow breaths before you speak can help you feel steadier.', isFact: true, explain: 'Fact. Slow breathing, especially longer breaths out, is a widely used way to steady yourself before a stressful moment.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Don\'t fight the racing heart. Name it: "I\'m excited." Breathe slowly out. Use the energy.',
    },
  ],
  apply: {
    scenario: 'Myth or fact: nerves.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t "just calm down" usually work?',
        options: [
          { text: 'It always works', why: 'Ada\'s heart disagrees.' },
          { text: 'Going from a racing heart to calm is a big jump, and forcing it can make you notice the nerves more' },
          { text: 'Because calm is bad', why: 'Calm is fine; it\'s just hard to force.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good speakers never feel nervous', group: 0 },
          { text: 'Nerves and excitement feel alike in the body', group: 1 },
          { text: '"Calm down" is the best fix', group: 0 },
          { text: 'Slow breaths can steady you', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So I just say "I\'m excited" and my nerves vanish?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, guaranteed.', why: 'Promising too much. It\'s one study.' },
          { text: 'No, it\'s useless.', why: 'It\'s worth trying; the study was promising.' },
          { text: 'They won\'t vanish. The idea is to treat the energy as fuel instead of a threat. One study found it helped; it\'s worth trying.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the 2014 study, which phrase helped more: "I am calm" or "I am ___"? (one word)',
        answers: ['excited'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the main difference between nerves and excitement?',
        options: [
          { text: 'Mostly how you interpret the same feeling: threat or opportunity' },
          { text: 'Completely different body states', why: 'They\'re surprisingly similar.' },
          { text: 'Excitement is only for parties', why: 'It works for stages too.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s backstage routine in order.',
        lines: ['Notice the racing heart', 'Say "I\'m excited"', 'Three slow breaths, long breaths out', 'Walk on and say the hook'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s self-talk before pitch night. Which line works against her?',
        lines: [
          'My heart is racing. That\'s energy.',
          'I must be totally calm or I\'ll fail.',
          'I\'m excited to tell them about Tunde.',
        ],
        bug: 1,
        fix: 'Nerves are normal. I\'ll use them.',
        explanation: 'Demanding total calm is the "calm down" trap. Nerves are normal and usable.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Preparedness', 'Predicted funding'],
          ['Rehearsal', 'Out loud, timed, recorded'],
          ['"I\'m excited"', 'Reframing nerves'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s tip.',
        template: 'Don\'t [[1]] the racing heart. Name it: "I\'m [[2]]." Breathe slowly [[3]].',
        blanks: [['fight'], ['excited'], ['out']],
        distractors: ['calm', 'in'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s backstage line.',
        tiles: ['I\'m', 'not', 'scared.', 'I\'m', 'excited.'],
        distractors: ['calm.'],
      },
    ],
  },
  reflect: {
    prompt: 'What happens in your body before you speak in public? Write a short line you could say to yourself to turn it into energy.',
    starters: ['Before I speak, I feel...', 'I\'ll tell myself...'],
  },
  deepen: {
    title: 'Try the reframe',
    summary: 'Next time you feel nervous before speaking (a meeting, a call, a class), say "I\'m excited" out loud or in your head, and take three slow breaths. Notice whether it changes anything.',
  },
  notes: 'Brooks (2014), Journal of Experimental Psychology: General 143(3): "Get excited: reappraising pre-performance anxiety as excitement" — saying "I am excited" (vs "I am calm") before a persuasive speech led to ratings of more persuasive, competent, confident. Hedged: direct replications are limited (a 2025 replication attempt exists). Slow-breathing advice stated generally.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 14 — handling nerves before and during. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When your hands shake',
  summary: 'David still freezes, even with perfect stories. His hands shake and his mind empties. Miracle admits hers did too, for years. These are the steps that helped her, and that help most people.',
  minutes: 12,
  outcomes: ['Use simple steps to calm nerves before an interview', 'Buy thinking time during one', 'Recover after a stumble'],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps for nerves',
      steps: [
        { title: '1. Practise out loud, a lot', body: 'The more you\'ve said your stories out loud, the less your brain has to invent under pressure. Practise with friends, with a recording, in the mirror.' },
        { title: '2. Slow your breathing', body: 'Before you go in, breathe out slowly, longer than you breathe in, a few times. Slow breathing helps many people feel calmer.' },
        { title: '3. Reframe the feeling', body: 'A racing heart feels the same whether you\'re scared or excited. Some people find it helps to tell themselves, "I\'m ready, and this is energy."' },
        { title: '4. Buy time when you need it', body: '"That\'s a good question; let me think for a moment." Or: "Could you repeat that?" A short pause looks thoughtful, not weak. Have water and take a sip.' },
        { title: '5. Recover from a stumble', body: '"Sorry, let me start that again." Then start again. One rough answer rarely decides an interview; how you recover often impresses people.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Practise out loud. Breathe out slowly. Pause on purpose. Restart if you stumble. Nerves are normal.',
    },
  ],
  apply: {
    scenario: 'Clinton helps David with his nerves.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Practise out loud, a lot', 'Slow your breathing', 'Reframe the feeling', 'Buy time when you need it', 'Recover from a stumble'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does practising out loud help with nerves?',
        options: [
          { text: 'It makes you memorise every word', why: 'It\'s familiarity, not memorising.' },
          { text: 'Your brain has less to invent under pressure' },
          { text: 'It doesn\'t help', why: 'It\'s one of the most useful steps.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to buy time, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'Let me think for a moment', group: 0 },
          { text: 'Could you repeat that?', group: 0 },
          { text: 'Talking nonstop to fill silence', group: 1 },
          { text: 'A sip of water', group: 0 },
          { text: 'Walking out', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Halfway through my answer I lost my place completely. Is the interview over?',
        options: [
          { text: 'Yes, leave.', why: 'One stumble rarely decides it.' },
          { text: 'Keep talking about anything.', why: 'Restart calmly instead.' },
          { text: 'No: say "Sorry, let me start that again," and start again. Recovering well often impresses.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the unhelpful thought.',
        lines: ['A racing heart is energy.', 'If I\'m nervous, I\'ve already failed.', 'A pause looks thoughtful.'],
        bug: 1,
        explanation: 'Nerves are normal. Most interviewers expect some.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to a step.',
        pairs: [
          ['In the waiting room', 'Breathe out slowly'],
          ['A tricky question', '"Let me think for a moment"'],
          ['Lost your place', '"Sorry, let me start again"'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should the out-breath compare to the in-breath?',
        options: [
          { text: 'Longer' },
          { text: 'Shorter', why: 'Breathe out longer.' },
          { text: 'Hold it', why: 'Breathe out slowly instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s tip.',
        template: 'Pause on [[1]]. Restart if you [[2]].',
        blanks: [['purpose'], ['stumble']],
        distractors: ['accident', 'win', 'leave'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps for nerves does Miracle give? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps nerves, or makes them worse?',
        groups: ['Helps', 'Worse'],
        items: [
          { text: 'Practising with a friend', group: 0 },
          { text: 'Arriving late and rushing', group: 1 },
          { text: 'Slow breathing', group: 0 },
          { text: 'Five energy drinks', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What happens to you when you\'re nervous? Which of the five steps would help you most?',
    starters: ['When I\'m nervous...', 'The step that would help is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Before your next stressful moment, breathe out slowly, longer than you breathe in, five times. Notice whether it helps you.',
  },
  notes: 'Slow breathing with longer exhalation is widely used for calming; reappraising anxiety as excitement draws on Brooks (2014), Journal of Experimental Psychology: General. Kept modest ("helps many people"); not medical advice. If anxiety is severe, encourage learners to speak to a professional.',
};

export default lesson;

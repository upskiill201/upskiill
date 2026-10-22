import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 3 — "Tell me about yourself": rambling vs. present-past-future. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Present, past, future',
  summary: 'Clinton\'s first answer started in Bamenda and ended in football. Miracle gives him a three-part shape: present, past, future. His second answer takes 55 seconds, and David forgets to be serious.',
  minutes: 11,
  outcomes: ['Answer "Tell me about yourself" in three parts', 'Keep it to about a minute', 'End on why this job'],
  learn: [
    {
      kind: 'compare',
      title: 'Two answers',
      before: { label: 'The life story', text: '"Well, I was born in Bamenda, then we moved to Buea, I like football, I\'m doing Computer Science, which I chose because I like computers, and I\'m a hard worker and a team player..."\n\nFour minutes. Chronological. Nothing proves anything, and the job isn\'t mentioned once.' },
      after: { label: 'Present, past, future', text: '"Right now I\'m a final-year Computer Science student, and part-time at Kmer Logistics I\'m building offline delivery confirmations: eleven drivers use them.\nBefore that, I built a savings tracker for my mum\'s njangi that 60 people now use, and I run a 40-person tech meet-up.\nNext, I want to build payment tools people rely on every day, which is why I\'m so excited about this role at Njangi Pay."\n\n55 seconds. Proof in every part. Ends on the job.' },
      notes: [
        'Present: what you do now, with one piece of proof.',
        'Past: one or two things that led here, with results.',
        'Future: what you want next, and why this job fits.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Present, past, future. About a minute. End on why this job.',
    },
  ],
  apply: {
    scenario: 'Clinton rebuilds his answer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the answer in order.',
        lines: ['Present: what you do now, with proof', 'Past: what led here, with results', 'Future: what you want next', 'Why this job fits'],
      },
      {
        kind: 'mcq',
        prompt: 'What was the biggest problem with the first answer?',
        options: [
          { text: 'It mentioned Bamenda', why: 'Bamenda\'s fine. It lacked proof and relevance.' },
          { text: 'No proof, and it never mentioned the job' },
          { text: 'It was too short', why: 'It was four minutes.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part is this line?',
        groups: ['Present', 'Past'],
        items: [
          { text: 'Part-time at Kmer, building offline confirmations', group: 0 },
          { text: 'Built a savings tracker 60 people use', group: 1 },
          { text: 'A final-year CS student', group: 0 },
          { text: 'Started a 40-person meet-up in first year', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that should be cut.',
        lines: ['Right now I\'m building offline confirmations at Kmer.', 'I\'m a hard worker and a team player and a fast learner.', 'Next, I want to build payment tools people rely on.'],
        bug: 1,
        explanation: 'Adjectives with no proof. His stories already show it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Should I include that I\'m top of my class?',
        options: [
          { text: 'No, never mention grades.', why: 'One relevant line is fine.' },
          { text: 'Make it the whole answer.', why: 'One line, then proof and the future.' },
          { text: 'Yes, in the present part, if it\'s relevant to the role, then move on to proof from your placements.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part to Clinton\'s line.',
        pairs: [
          ['Present', 'Eleven drivers use my offline confirmations'],
          ['Past', 'A savings tracker 60 people use'],
          ['Future', 'Payment tools people rely on every day'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should the answer end?',
        options: [
          { text: 'On why this job fits what you want next' },
          { text: 'On your hobbies', why: 'End on the job.' },
          { text: '"So, yeah."', why: 'End on why this job.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the shape.',
        template: '[[1]], past, [[2]]. About a [[3]].',
        blanks: [['Present'], ['future'], ['minute']],
        distractors: ['Childhood', 'hobbies', 'hour'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds did Clinton\'s second answer take? (a number)',
        answers: ['55', 'fifty-five', 'fifty five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it in, or cut it?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'Eleven drivers use it', group: 0 },
          { text: 'My favourite football team', group: 1 },
          { text: 'Why Njangi Pay', group: 0 },
          { text: 'I\'m a perfectionist', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own present, past and future in one sentence each.',
    starters: ['Right now I...', 'Next, I want...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Record your answer again using present, past, future. Compare it with your recording from lesson 1.',
  },
  notes: 'Present–past–future is a common structure for this question. Where you live: some cultures expect more personal background or more modesty; keep the proof, adjust the tone.',
};

export default lesson;

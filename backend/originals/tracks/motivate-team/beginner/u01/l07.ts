import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Chat with Tey: the three needs (self-determination theory, Ryan & Deci 2000). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Three needs everyone has',
  summary: 'Saturday. Miracle reads her stay-interview notes again. Chidi is bored. Halima feels like an outsider. Bisi wants her experience to count. Three different people, three different problems. Or are they? She asks Tey.',
  minutes: 11,
  outcomes: [
    'Know the three psychological needs behind motivation',
    'Spot which need is missing for each person',
    'Feed the needs in small, everyday ways',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'What do your notes say about each person?',
          replies: ['Chidi\'s bored. Halima feels like an outsider. Bisi wants her four years to count.'],
        },
        {
          tey: "Psychologists Richard Ryan and Edward Deci spent decades on this, in what's called self-determination theory. They found people have three basic needs at work. When they're met, people tend to be more motivated, do better work and feel better. Your three notes are those three needs.",
          replies: ['What are they?'],
        },
        {
          tey: "Competence: feeling good at something and getting better. That's Chidi: he's mastered the job and there's nothing left to grow into. Relatedness: feeling you belong and people care. That's Halima. Autonomy: having some choice in how you work. That's Bisi: four years of ideas, nobody asking.",
          replies: ['So each person needs a different one?'],
        },
        {
          tey: "Everyone needs all three. Each person is hungriest for a different one right now. Chidi might need a harder problem: the 40 clinics in the north that nobody has cracked. Halima might need someone to say, \"You understand clinics better than any of us.\" Bisi might need to own the onboarding script.",
          replies: ['That sounds like a lot to manage.'],
        },
        {
          tey: "It's smaller than it sounds. One question in each one-to-one: \"What would make this week feel like a good week?\" The answers will usually point straight at the hungriest need.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Three needs: competence (getting better), relatedness (belonging), autonomy (choice). Everyone needs all three. Find the hungriest one for each person.',
    },
  ],
  apply: {
    scenario: 'Tey and Miracle, Saturday.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the three needs in self-determination theory?',
        options: [
          { text: 'Money, status, holidays', why: 'Not the three basic needs.' },
          { text: 'Competence, relatedness, autonomy' },
          { text: 'Food, sleep, coffee', why: 'Important, but not these.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which need is it?',
        groups: ['Competence', 'Relatedness', 'Autonomy'],
        items: [
          { text: 'Chidi\'s hard problem in the north', group: 0 },
          { text: 'Halima feeling she belongs', group: 1 },
          { text: 'Bisi owning the onboarding script', group: 2 },
          { text: 'Learning a new skill', group: 0 },
          { text: 'A team that cares about you', group: 1 },
          { text: 'Choosing how to do the work', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Honestly, I could do this job in my sleep.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'I believe it. Want a problem nobody has cracked? The 40 clinics in the north keep dropping off. Interested?' },
          { text: 'Then do more tickets.', why: 'More of the same isn\'t growth.' },
          { text: 'Don\'t get too comfortable.', why: 'He needs a challenge, not a warning.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Feeling you belong and people care: ___. (one word)',
        answers: ['relatedness', 'Relatedness', 'belonging'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their hungriest need.',
        pairs: [
          ['Chidi', 'Competence'],
          ['Halima', 'Relatedness'],
          ['Bisi', 'Autonomy'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does each person need only one of the three?',
        options: [
          { text: 'Yes, one each', why: 'Everyone needs all three.' },
          { text: 'No: everyone needs all three, but one may be hungriest right now' },
          { text: 'Nobody needs any', why: 'Decades of research say otherwise.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan. Which line ignores the three needs?',
        lines: [
          'Give Chidi the northern clinics problem.',
          'Tell Halima to try harder to fit in.',
          'Ask Bisi to rewrite the onboarding script.',
        ],
        bug: 1,
        fix: 'Tell Halima what her nursing experience adds that nobody else has.',
        explanation: 'Belonging isn\'t Halima\'s job alone. The team and leader build it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put feeding the needs in order.',
        lines: ['Ask what makes a good week', 'Spot the hungriest need', 'Offer one small change for it', 'Check in next week'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Competence, [[1]] and [[2]]. Find the hungriest one.',
        blanks: [['relatedness', 'autonomy'], ['autonomy', 'relatedness']],
        distractors: ['money', 'fame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the one-to-one question.',
        tiles: ['What', 'would', 'make', 'this', 'a', 'good', 'week?'],
        distractors: ['bad'],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three needs is hungriest for you right now: competence, relatedness or autonomy? What would feed it?',
    starters: ['My hungriest need is...', 'It would help if...'],
  },
  deepen: {
    title: 'The good-week question',
    summary: 'Ask one person: "What would make this week feel like a good week for you?" Listen for competence, relatedness or autonomy.',
  },
  notes: 'Richard M. Ryan & Edward L. Deci (2000), "Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being", American Psychologist 55(1); workplace applications: Deci, Olafsen & Ryan (2017), Annual Review of Organizational Psychology. Fictional details.',
};

export default lesson;

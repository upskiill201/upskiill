import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 19 — the learner's own skills inventory begins. Before / After. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your inventory begins',
  summary: 'Time for the first real piece of your career kit: your skills inventory. Same method as Clinton, your life, your words. It\'s what your CV, cover letter and interviews will all be built from.',
  minutes: 12,
  outcomes: ['Write your own skills inventory', 'Give every skill a line of proof', 'Choose your top three to lead with'],
  learn: [
    {
      kind: 'compare',
      title: 'From a list to an inventory',
      before: { label: 'A list of words', text: 'Skills: teamwork, communication, Excel, leadership, hardworking.\n\nFive words anyone could write. No proof, no stories, nothing to remember. This is where most people stop.' },
      after: { label: 'An inventory', text: 'Organising (transferable): run a weekly study group of 8; nobody missed an exam deadline this year.\nExcel (technical): built my family shop\'s stock sheet; we stopped running out of bestsellers.\nCalm under pressure (personal): handled the shop alone the week my aunt was ill.\n\nEach skill has a type, one line of proof, and a result. This is what you\'ll build your CV from.' },
      notes: [
        'One row per skill: the skill, its type, one line of proof, the result.',
        'Aim for 8 to 10 skills, from at least three places in your life.',
        'Star your top three: the ones you have the best proof for, and that match the jobs you want.',
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Keep it true. Everything in your inventory will end up on applications, and anything there can be checked.',
    },
  ],
  apply: {
    scenario: 'You start your own inventory.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of an inventory row to an example.',
        pairs: [
          ['Skill', 'Organising'],
          ['Type', 'Transferable'],
          ['Proof', 'Run a weekly study group of 8'],
          ['Result', 'Nobody missed a deadline this year'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How many skills should a first inventory aim for?',
        options: [
          { text: 'One', why: 'Too few to choose from. Aim for 8 to 10.' },
          { text: 'About 8 to 10, from at least three places in your life' },
          { text: '50', why: 'Too many to give each real proof. Quality beats quantity.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the inventory row that\'s missing proof.',
        lines: ['Excel (technical): built the shop\'s stock sheet; no more running out of bestsellers.', 'Leadership (transferable): I am a natural leader.', 'Patience (personal): taught my grandmother to video-call; she now calls every Sunday.'],
        bug: 1,
        fix: 'Leadership (transferable): captain of the netball team; we reached the regional final.',
        explanation: 'A claim, not proof. Every row needs something you did and what changed.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which type is each skill?',
        groups: ['Technical', 'Transferable', 'Personal'],
        items: [
          { text: 'Excel', group: 0 },
          { text: 'Teaching others', group: 1 },
          { text: 'Patient', group: 2 },
          { text: 'Video editing', group: 0 },
          { text: 'Negotiating', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which three skills should you star as your top three?',
        options: [
          { text: 'The ones with the best proof that match the jobs you want' },
          { text: 'The ones that sound most impressive', why: 'Impressive without proof doesn\'t help. Strong proof does.' },
          { text: 'Three at random', why: 'Choose on purpose: best proof, best match.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your inventory has nine skills, all from university. Where\'s the rest of your life?',
        options: [
          { text: 'Good point. I\'ll add skills from home, church and my weekend job, so it\'s from at least three places.' },
          { text: 'Only university counts.', why: 'Skills count wherever you built them.' },
          { text: 'I\'ll add more university skills.', why: 'Variety shows you use skills everywhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete an inventory row.',
        template: 'Patience ([[1]]): taught my grandmother to video-call; she now calls every [[2]].',
        blanks: [['personal'], ['Sunday', 'week']],
        distractors: ['technical', 'never', 'year'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the steps for building your inventory in order.',
        lines: ['Mine three places in your life for skills', 'Write one row per skill with proof and a result', 'Check every row is true', 'Star your top three'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Every inventory row needs a skill, a type, proof and a ___. (one word)',
        answers: ['result', 'outcome'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which row is ready for a CV?',
        options: [
          { text: '"Communication: good."', why: 'No proof, no result.' },
          { text: '"Communication (transferable): write the weekly church newsletter for 200 members; sign-ups for events doubled."' },
          { text: '"Communication: I talk a lot."', why: 'Honest, maybe, but not proof of a skill.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Write your first three inventory rows now: skill, type, proof, result. Which one are you proudest of?',
    starters: ['Row 1: ...', 'The one I\'m proudest of is...'],
  },
  deepen: {
    title: 'Your career kit, piece 1',
    summary: 'Finish your inventory: 8 to 10 rows, from at least three places in your life, each with proof and a result. Star your top three. Keep it safe: Chapter 3 turns it into your CV.',
  },
  notes: 'The learner\'s own career kit, piece 1 (outline engagement point 1). Examples are from varied lives (family shop, netball, grandmother, church newsletter) to fit a global audience.',
};

export default lesson;

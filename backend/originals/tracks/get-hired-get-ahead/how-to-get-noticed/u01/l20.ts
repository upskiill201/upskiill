import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 20 — Chapter Challenge: Clinton's skills inventory and his answer for Brenda. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Clinton\'s inventory',
  summary: 'Brenda Fon from Njangi Pay is giving a talk on campus next week, and Clinton is going. This time, when she asks "So what can you do?", he\'ll have an answer. Everything from this chapter, in one inventory.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Build a full skills inventory with proof', 'Choose your top skills for a real role', 'Answer "What can you do?" in two confident, true sentences'],
  learn: [
    {
      kind: 'story',
      title: 'Second chance',
      beats: [
        { speaker: 'narrator', text: 'Monday. Seven months to graduation. A poster in the CS building: "Careers talk: Brenda Fon, Njangi Pay. Thursday, 4pm."' },
        { speaker: 'clinton', text: 'Second chance. If she asks what I can do, I am NOT saying "no experience".' },
        { speaker: 'miracle', text: 'Then build the inventory tonight. Top three skills, the proof for each, and a two-sentence answer. Practise it out loud until it sounds like you.' },
        { speaker: 'tey', text: 'Every lesson from this chapter, in one piece of work. Let\'s build Clinton\'s inventory.' },
      ],
    },
    {
      kind: 'steps',
      title: 'The kit so far',
      steps: [
        { title: 'Lesson 1', body: '"I don\'t have any experience." Nothing written down.' },
        { title: 'This chapter', body: 'Skills mined from five places in his life, rewritten with strong verbs, proved with STAR stories and an evidence bank, levels kept honest, gaps turned into plans.' },
        { title: 'Tonight', body: 'His skills inventory: the first piece of his career kit. Yours too, if you did lesson 19.' },
        { title: 'Next chapter', body: 'Proof without experience: Clinton builds a small project for his mum\'s njangi, so his inventory has something he can show.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: build Clinton\'s inventory.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Step 1: sort Clinton\'s skills by type.',
        groups: ['Technical', 'Transferable', 'Personal'],
        items: [
          { text: 'JavaScript', group: 0 },
          { text: 'Organising events', group: 1 },
          { text: 'Calm under pressure', group: 2 },
          { text: 'Explaining tech simply', group: 1 },
          { text: 'Git', group: 0 },
          { text: 'Reliable', group: 2 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Step 2: match each skill to its proof.',
        pairs: [
          ['Organising events', 'Grew the meet-up from 6 to 40 members'],
          ['Calm under pressure', 'Moved 40 people to the library when the venue cancelled'],
          ['Explaining tech simply', 'Explains repairs to customers at the phone stall'],
          ['Leadership', 'Turned a losing run into 4 wins in 5'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Step 3: tap the inventory row that breaks a rule from this chapter.',
        lines: ['JavaScript (technical): built a fixtures app the faculty uses.', 'French (technical): fluent.', 'Reliable (personal): ran the meet-up every week for two years.'],
        bug: 1,
        fix: 'French (technical): intermediate, comfortable in conversation; practising daily.',
        explanation: 'He\'s intermediate. "Fluent" would fall apart the moment Brenda switches language.',
      },
      {
        kind: 'mcq',
        prompt: 'Step 4: Njangi Pay wants people who learn fast, stay calm when things break and explain tech simply. Which top three should Clinton star?',
        options: [
          { text: 'Football, music and films', why: 'Hobbies without the skills named. Match the advert.' },
          { text: 'Calm under pressure, explaining tech simply, and learning fast (he taught himself video editing and testing)' },
          { text: 'Whatever sounds most impressive', why: 'Best proof that matches the role, not what sounds big.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Step 5: put Clinton\'s best STAR story in order.',
        lines: ['An hour before a meet-up, our venue cancelled.', 'I had to find a new room for 40 people, fast.', 'I called the library, booked a study room and posted the change in the group.', '38 of 40 people came, and the speaker said it was the best-run event she\'d visited.'],
      },
      {
        kind: 'chatReply',
        prompt: 'Step 6: Brenda asks again.',
        from: 'brenda',
        message: 'Nice to see you again! So, what can you do?',
        options: [
          { text: 'I don\'t have any experience yet, but I\'m a fast learner.', why: 'The answer from lesson 1. He has much better now.' },
          { text: 'I organise people and stay calm when things break. When our meet-up venue cancelled an hour before, I moved 40 people to the library, and 38 came.' },
          { text: 'I\'m a passionate, dynamic team player.', why: 'Adjectives. Brenda has heard them all today.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Step 7: gaps against an advert. Must fix first, or plan for later?',
        groups: ['Must fix first', 'Plan for later'],
        items: [
          { text: 'A "must have" with no proof at all', group: 0 },
          { text: 'No API experience (nice to have)', group: 1 },
          { text: 'No automated testing (nice to have)', group: 1 },
          { text: 'French only intermediate (a plus)', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Step 8: where will Clinton keep adding new wins each week?',
        options: [
          { text: 'Nowhere, he\'ll remember them', why: 'He won\'t, and neither will anyone. Write them down.' },
          { text: 'In a public post every day', why: 'The bank is private and quick. Posting is optional.' },
          { text: 'In his evidence bank' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s two-sentence answer.',
        template: 'I [[1]] people and stay calm when things break. When our venue cancelled, I moved [[2]] people to the library.',
        blanks: [['organise', 'organize'], ['40', 'forty']],
        distractors: ['claim', '400', 'ignore'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each tool from this chapter to what it does.',
        pairs: [
          ['Skill mining', 'Finds skills in everyday life'],
          ['STAR', 'Turns a skill into a story'],
          ['Evidence bank', 'Keeps proof ready for later'],
          ['Gap plan', 'Turns a missing skill into a task'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Step 9: after the talk, Brenda says one more thing.',
        from: 'brenda',
        message: 'That\'s a great example. Our graduate applications open in three months. Have you got a CV ready?',
        options: [
          { text: 'Not yet, but I will. Could I ask what you look for first on a graduate CV?' },
          { text: 'Yes, it\'s perfect.', why: 'It isn\'t written yet. Honest and curious beats a bluff.' },
          { text: 'I don\'t do CVs.', why: 'He\'s about to learn. Chapter 3.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write your own two-sentence answer to "So, what can you do?", with one real example. Then say it out loud three times. How does it feel compared with lesson 1?',
    starters: ['I...', 'When..., I...', 'Compared with lesson 1, I feel...'],
  },
  deepen: {
    title: 'Your career kit, piece 1: done',
    summary: 'Make sure your inventory has 8 to 10 rows with proof, your top three starred, and your two-sentence answer written at the top. Chapter 2 helps you build something you can show.',
  },
  notes: 'Unit Challenge (playbook §8a.3). Climax per the outline: Clinton\'s skills inventory and his answer for Brenda, at a campus talk a week after the fair (marker moves to 7 months next chapter). "Kit so far" uses a neutral steps card. These exercises double as Jump ahead / placement questions for the whole chapter.',
};

export default lesson;

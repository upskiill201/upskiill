import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 3 — free. Technical, transferable and personal skills. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Three kinds of skill',
  summary: 'Clinton\'s first list says "Python, JavaScript, Excel". That\'s it. Miracle says he\'s listed one kind of skill out of three, and the other two are the ones that travel with you to any job.',
  minutes: 11,
  outcomes: ['Tell technical, transferable and personal skills apart', 'Explain why transferable skills matter in any job', 'Add the missing kinds to your own list'],
  learn: [
    {
      kind: 'compare',
      title: 'Clinton\'s list, before and after',
      before: { label: 'One kind of skill', text: 'Skills: Python, JavaScript, Excel.\n\nAll technical skills: tools and know-how for a particular kind of work. Useful, but every other Computer Science student lists the same three. Nothing says what Clinton is like to work with.' },
      after: { label: 'All three kinds', text: 'Technical: Python, JavaScript, Excel.\nTransferable: organising events, keeping a big group informed, solving scheduling problems.\nPersonal: calm under pressure, curious, reliable.\n\nNow Brenda can picture him on her team, doing more than writing code.' },
      notes: [
        'Technical skills: tools and know-how for a type of work (coding, accounting, a language, driving).',
        'Transferable skills: things you can do in almost any job (organising, explaining, solving problems, working in a team).',
        'Personal qualities: how you work (reliable, curious, calm). Best shown with a story, not just named.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Transferable skills travel with you. You learned them in one place, and you can use them anywhere.',
    },
  ],
  apply: {
    scenario: 'Clinton sorts his skills.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Technical, transferable or personal?',
        groups: ['Technical', 'Transferable', 'Personal'],
        items: [
          { text: 'Python', group: 0 },
          { text: 'Organising events', group: 1 },
          { text: 'Reliable', group: 2 },
          { text: 'Excel formulas', group: 0 },
          { text: 'Explaining things clearly', group: 1 },
          { text: 'Curious', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a skill "transferable"?',
        options: [
          { text: 'You learned it at university', why: 'Where you learned it doesn\'t matter. What matters is that you can use it in almost any job.' },
          { text: 'You can use it in almost any job' },
          { text: 'It can be transferred to a friend', why: 'Ha. It travels with you, from job to job.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Your list says Python, JavaScript, Excel. What will make you different from the other 200 CS graduates?',
        options: [
          { text: 'I\'ll add more programming languages.', why: 'More of the same kind. Add the other two kinds.' },
          { text: 'Nothing, we\'re all the same.', why: 'You run a 40-person meet-up. That\'s different.' },
          { text: 'My transferable skills: I organise people and keep big groups running.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each kind of skill to its description.',
        pairs: [
          ['Technical', 'Tools and know-how for one type of work'],
          ['Transferable', 'Useful in almost any job'],
          ['Personal', 'How you work, shown through stories'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Clinton is applying for a sales role, not a developer role. Which skills matter most there?',
        options: [
          { text: 'His transferable skills: organising, explaining, persuading people' },
          { text: 'Only Python', why: 'Python won\'t sell much. His people skills travel straight into sales.' },
          { text: 'None of his skills count for sales', why: 'Transferable skills count in any job. That\'s the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s a personal quality, not a technical skill.',
        lines: ['JavaScript', 'Database design', 'Calm under pressure', 'Git'],
        bug: 2,
        explanation: 'Calm under pressure is about how you work. Best shown with a story: "When our meet-up venue cancelled an hour before..."',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] skills travel with you to any job. Personal qualities are best shown with a [[2]].',
        blanks: [['Transferable'], ['story']],
        distractors: ['Technical', 'photo', 'grade'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which kind of skill did each activity build?',
        groups: ['Technical', 'Transferable'],
        items: [
          { text: 'Learning to edit videos for the meet-up', group: 0 },
          { text: 'Getting five team captains to agree on fixtures', group: 1 },
          { text: 'Building a spreadsheet of members', group: 0 },
          { text: 'Explaining the rules to new members', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Skills you can take into almost any job are called ___ skills.',
        answers: ['transferable', 'transferrable', 'portable'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which is the strongest way to show a personal quality?',
        options: [
          { text: '"I am very reliable."', why: 'A claim anyone can make.' },
          { text: '"I\'m the most reliable person you\'ll ever meet."', why: 'Bigger claim, same problem: no proof.' },
          { text: '"I\'ve run the meet-up every week for two years and never missed one."' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your list from lesson 1. Which items are technical? Which are transferable? Which personal qualities do they show?',
    starters: ['A transferable skill on my list is...', 'A personal quality I can show is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Find a job advert for any job you might want, even far in the future. Underline the technical skills in one colour and the transferable ones in another. Which kind does it ask for more?',
  },
  notes: 'The three-way split (technical/job-specific, transferable/soft, personal qualities) is a common careers-service framework (e.g. UK National Careers Service, university careers centres); terminology varies ("hard" vs "soft" skills), noted in l16 myths.',
};

export default lesson;

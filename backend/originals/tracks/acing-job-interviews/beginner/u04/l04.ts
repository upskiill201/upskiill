import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: the salary question. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The salary question',
  summary: '"Anything is fine" told Mr Njoroge that Remi hadn\'t thought about it. Ada shows him how to answer "what are your salary expectations?" with research, a range and flexibility.',
  minutes: 12,
  outcomes: [
    'Research a fair pay range before interviews',
    'Answer salary questions with a range',
    'Stay flexible without underselling yourself',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Salary: unprepared vs prepared',
      before: {
        label: 'Unprepared',
        text: '"Anything is fine, honestly. I just want the experience."\nNo research.\nNo number.\nInvites the lowest offer, and sounds unsure of your value.',
      },
      after: {
        label: 'Prepared',
        text: '"From what I\'ve seen, internships like this in Nairobi pay about KES 25,000 to 40,000 a month. I\'d be looking for 30,000 to 35,000, but I\'m flexible for the right role and learning."\nResearch first.\nA range that starts at a fair target.\nA friendly note of flexibility.',
      },
      notes: [
        'Research ranges from careers offices, friends in similar roles and job ads that show pay.',
        'Give a range whose bottom is a number you\'d be happy with.',
        'It\'s also fine to ask first: "What range do you have in mind for this role?"',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Research the range, give your own range starting at a fair target, and add that you\'re flexible for the right role.',
    },
  ],
  apply: {
    scenario: 'Salary expectations.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Prepared or unprepared?',
        groups: ['Prepared', 'Unprepared'],
        items: [
          { text: '"I\'d be looking for 30,000 to 35,000."', group: 0 },
          { text: '"Anything is fine."', group: 1 },
          { text: '"What range do you have in mind?"', group: 0 },
          { text: '"Whatever you think."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What range does Remi\'s research show for similar internships?',
        options: [
          { text: 'KES 5,000 to 10,000', why: 'His research shows 25,000 to 40,000.' },
          { text: 'KES 100,000 plus', why: 'Far above the range.' },
          { text: 'KES 25,000 to 40,000 a month' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the bottom of Remi\'s own range, in KES?',
        answers: ['30000', '30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the source to what it gives Remi.',
        pairs: [
          ['Careers office', 'Typical stipends'],
          ['Friends in similar roles', 'Real recent pay'],
          ['Job ads with pay', 'What employers advertise'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Won\'t naming a number cost me the job?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Yes, always say anything.', why: 'That invites a low offer.' },
          { text: 'A researched range plus "I\'m flexible for the right role" rarely costs a job. "Anything is fine" can cost you money.' },
          { text: 'Ask for double the range.', why: 'Stay within research.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The prepared answer.',
        template: 'Research the [[1]], give your own range, and add that you\'re [[2]] for the right role.',
        blanks: [['range'], ['flexible']],
        distractors: ['weather', 'desperate'],
      },
      {
        kind: 'mcq',
        prompt: 'What should the bottom of your range be?',
        options: [
          { text: 'A number you\'d genuinely be happy with' },
          { text: 'The lowest number in the market', why: 'They\'ll hear the bottom.' },
          { text: 'Zero', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens Remi\'s salary answer?',
        lines: [
          'Internships like this pay about 25,000 to 40,000.',
          'I\'d be looking for 30,000 to 35,000.',
          'But I could do 15,000 if that helps.',
          'I\'m flexible for the right role.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He undercuts his own range before they even reply.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the top of the market range Remi found, in KES?',
        answers: ['40000', '40,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to prepare for the salary question.',
        lines: ['Research the market range', 'Choose a fair target', 'Build your range from it', 'Practise saying it calmly'],
      },
    ],
  },
  reflect: {
    prompt: 'Research a pay range for a role you want. Write your answer to "what are your salary expectations?"',
    starters: ['The market range is...', 'I\'d say...'],
  },
  deepen: {
    title: 'Where pay is public',
    summary: 'Some countries and companies publish pay ranges in job ads. Where they don\'t, careers offices, alumni and friends are the best sources. Negotiation Skills for Beginners covers the rest.',
  },
  notes: 'Fictional stipend range KES 25,000–40,000/month (illustrative, not market data). Range-offer advice links to Ames & Mason (2015) in Negotiation Skills for Beginners.',
};

export default lesson;

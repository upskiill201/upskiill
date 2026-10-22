import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 13 — spotting AI-written content, and why detectors fail. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Spotting AI-written content',
  summary: 'Can you tell if something was written by AI? Sometimes. Can detector tools? Much less reliably than people think, and they can wrongly accuse real writers.',
  minutes: 12,
  outcomes: [
    'Know why AI detectors are unreliable',
    'Spot common signs of unedited AI text',
    'Judge content by its accuracy, not by who wrote it',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'AI detector tools can reliably tell whether a text was written by AI.',
          isFact: false,
          explain: 'In 2023, OpenAI withdrew its own AI text classifier because of its low accuracy.',
        },
        {
          text: 'Detectors can wrongly flag writing by non-native English speakers as AI.',
          isFact: true,
          explain: 'A 2023 Stanford study (Liang et al.) found popular detectors flagged over half of essays by non-native English writers as AI-generated.',
        },
        {
          text: 'Unedited AI text often has tell-tale habits, like generic openings and lists of three.',
          isFact: true,
          explain: 'Signs include "In today\'s fast-paced world", vague praise, and no specific details. But humans write like that too.',
        },
        {
          text: 'If a text was written with AI, it must be wrong.',
          isFact: false,
          explain: 'What matters is whether it\'s accurate and useful. Check the facts, not the author.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never accuse someone of using AI based on a detector score. Judge the work by its accuracy and its specifics.',
    },
  ],
  apply: {
    scenario: 'A freelancer\'s blog draft lands on Ada\'s desk, and Lucía asks if it was AI-written.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did OpenAI withdraw its AI text classifier in 2023?',
        options: [
          { text: 'It was too accurate', why: 'The opposite.' },
          { text: 'Its accuracy was too low' },
          { text: 'It was too expensive', why: 'Accuracy was the reason given.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Possible sign of unedited AI text, or a sign of real knowledge?',
        groups: ['Possible AI sign', 'Real knowledge'],
        items: [
          { text: '"In today\'s fast-paced digital world..."', group: 0 },
          { text: 'A quote from a named customer in Kumasi', group: 1 },
          { text: 'Vague praise with no examples', group: 0 },
          { text: 'A specific number from your own pilot', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'A detector says the freelancer\'s draft is "87% AI". Should we stop paying her?',
        prompt: 'Best reply?',
        options: [
          { text: 'Yes, 87% is proof.', why: 'Detector scores aren\'t proof.' },
          { text: 'Run five detectors and average them.', why: 'Averaging unreliable tools isn\'t proof either.' },
          { text: 'Detectors aren\'t reliable. Let\'s judge the draft on accuracy and specifics, and ask her about her process if we\'re unsure.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did OpenAI withdraw its AI text classifier?',
        answers: ['2023'],
        placeholder: 'A year',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the claim to the evidence.',
        pairs: [
          ['Detectors are unreliable', 'OpenAI withdrew its classifier (2023)'],
          ['Detectors can be unfair', 'Non-native writers flagged (Liang et al., 2023)'],
          ['Judge the work itself', 'Check facts and specifics'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Check the [[1]], not the [[2]].',
        blanks: [['facts'], ['author']],
        distractors: ['font', 'length'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the draft is the weakest?',
        lines: [
          'In today\'s fast-paced world, payments are evolving rapidly.',
          'In our Accra pilot, 840 of 1,200 users paid weekly.',
          'Ama, a fabric trader, said fees were her main worry.',
          'The next update cuts fees for small payments.',
        ],
        bug: 0,
        fix: 'Delete it and start with the pilot result.',
        explanation: 'Generic and empty, whoever wrote it.',
      },
      {
        kind: 'mcq',
        prompt: 'Who was most often wrongly flagged in the Liang et al. study?',
        options: [
          { text: 'Non-native English writers' },
          { text: 'Professional novelists', why: 'Non-native English writers.' },
          { text: 'Nobody', why: 'Over half of their essays were flagged.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fair response or unfair response?',
        groups: ['Fair', 'Unfair'],
        items: [
          { text: 'Checking the facts in the draft', group: 0 },
          { text: 'Accusing her based on a score', group: 1 },
          { text: 'Asking about her process', group: 0 },
          { text: 'Assuming AI text is always wrong', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule.',
        tiles: ['Judge', 'the', 'work,', 'not', 'the', 'tool'],
        distractors: ['score'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request best improves a generic draft?',
        options: [
          { text: 'Make this sound less like AI.', why: 'Cosmetic; it stays empty.' },
          { text: 'Replace every generic sentence with a specific fact, example or number from these notes.' },
          { text: 'Add more adjectives.', why: 'Makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'What makes writing trustworthy, whoever wrote it?',
        options: [
          { text: 'A low detector score', why: 'Scores are unreliable.' },
          { text: 'Long paragraphs', why: 'Length isn\'t trust.' },
          { text: 'Accurate, specific, checkable content' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever judged a piece of writing by who you thought wrote it? What should you have checked instead?',
    starters: ['I judged...', 'I should have checked...'],
  },
  deepen: { title: 'Try it today', summary: 'Take an AI draft and replace every generic sentence with a specific fact. Compare the two versions.' },
  notes: 'OpenAI discontinued its AI classifier on 20 July 2023 citing low accuracy. Liang et al. (2023), Patterns: GPT detectors misclassified over half of TOEFL essays by non-native English writers as AI-generated.',
};

export default lesson;

import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Step-by-step: setting clear expectations. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Setting clear expectations',
  summary: 'Marta redid the social calendar three times because Lucía kept saying "not quite." Marta never knew what "quite" was. Tey: "If you can\'t describe done, nobody can deliver it."',
  minutes: 12,
  outcomes: [
    'Set expectations in five steps',
    'Describe what "done" looks like before work starts',
    'Check understanding without being patronising',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Clear expectations in five steps',
      steps: [
        { title: '1. The what', body: 'Say the task in one sentence. "A social calendar for the chili-lime launch, June 17 to July 1."' },
        { title: '2. The why', body: 'Why it matters, and who it\'s for. "It\'s the main way young buyers will hear about the launch." People make better choices when they know the purpose.' },
        { title: '3. What "done" looks like', body: 'Be specific: "Two posts a day, each with a photo and a line of copy, in the shared sheet." If you have an example, share it. This is the step most leaders skip.' },
        { title: '4. By when, and how much freedom', body: '"Draft by Friday. The style is yours; just keep the brand colours." Say what\'s fixed and what\'s their call.' },
        { title: '5. Check understanding, and agree check-ins', body: 'Not "Any questions?" Instead: "What do you think will be the hardest part?" Then: "Let\'s look at it together Wednesday."' },
      ],
    },
    {
      kind: 'compare',
      title: 'Lucía to Marta, before and after',
      before: { label: 'Before', text: '"Can you redo the social calendar? Make it better." (Three drafts. "Not quite." Marta, quietly fed up.)' },
      after: { label: 'After', text: '"Two posts a day, June 17 to July 1, photo plus one line, in the shared sheet. It\'s how young buyers hear about the launch. Draft Friday; style is yours. What will be hardest?"' },
      notes: ['"Done" is described before work starts.', 'The why helps Marta make good choices on her own.', 'Her style is hers. Only the essentials are fixed.'],
    },
  ],
  apply: {
    scenario: 'Lucía and Marta, a fresh start.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['The what', 'The why', 'What done looks like', 'By when, and how much freedom', 'Check understanding'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Marta redo the calendar three times?',
        options: [
          { text: 'She\'s bad at calendars', why: 'She\'s the most dependable person on the team.' },
          { text: 'She wasn\'t trying', why: 'She was trying very hard.' },
          { text: 'Nobody had described what "done" looked like' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Clear or vague?',
        groups: ['Clear', 'Vague'],
        items: [
          { text: '"Two posts a day, photo plus one line"', group: 0 },
          { text: '"Make it better"', group: 1 },
          { text: '"Draft by Friday"', group: 0 },
          { text: '"Whenever you get a chance"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'Can I change the style, or does it have to look like last year?',
        prompt: 'Lucía\'s best answer?',
        options: [
          { text: 'Whatever you think.', why: 'Too vague: she needs to know what\'s fixed.' },
          { text: 'Style is yours. Just keep the brand colours and the June 17 start.' },
          { text: 'Exactly like last year, please.', why: 'Possible, but it takes away her autonomy for no reason.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The step most leaders skip: describing what ___ looks like. (one word)',
        answers: ['done', 'Done', 'finished', 'success'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "What will be hardest?" instead of "Any questions?"',
        options: [
          { text: 'It gets a real answer; "any questions?" usually gets "no"' },
          { text: 'It\'s more polite', why: 'It\'s more useful.' },
          { text: 'To test her', why: 'It\'s to surface problems early.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s brief for Diego. Which line is the vague one?',
        lines: [
          'Carmen\'s report: one page, three numbers, by Thursday.',
          'Make it look professional.',
          'Why: she presents it to the CEO on Friday.',
        ],
        bug: 1,
        fix: 'Use the brand template, with a chart for each number.',
        explanation: '"Professional" means something different to everyone. Say what it looks like.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['The why', '"It\'s how young buyers hear about it."'],
          ['Freedom', '"The style is yours."'],
          ['Check-in', '"Let\'s look at it Wednesday."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'If you can\'t describe [[1]], nobody can [[2]] it.',
        blanks: [['done'], ['deliver']],
        distractors: ['better', 'fix'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the better check question.',
        tiles: ['What', 'will', 'be', 'the', 'hardest', 'part?'],
        distractors: ['questions?'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you were asked to do something and got it "wrong". Which of the five steps was missing?',
    starters: ['I was asked to...', 'The missing step was...'],
  },
  deepen: {
    title: 'Describe done',
    summary: 'Next time you ask someone to do something, add one sentence describing what "done" looks like. Watch how many fewer redos you get.',
  },
  notes: 'Expectation-setting structure (task, purpose, definition of done, deadline and decision rights, check for understanding) reflects standard delegation and management guidance; "structure and clarity" from Project Aristotle; purpose and commitment from goal-setting research (Locke & Latham).',
};

export default lesson;

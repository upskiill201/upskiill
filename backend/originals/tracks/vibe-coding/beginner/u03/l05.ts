import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint: lessons 1–4 of Chapter 3, plus review. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Benny\'s numbers',
  summary: 'Benny ran the bake sale table and typed every sale into the thermometer on his phone. Ruth doesn\'t believe a single number. Check the change, ask the right questions, and find the truth.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Read a diff and spot a surprise', 'Check a change against its brief'],
  learn: [
    {
      kind: 'story',
      title: 'Monday, band room',
      beats: [
        { speaker: 'benny', text: 'Bake sale: $340! And I asked the AI to make the thermometer work on phones.' },
        { speaker: 'ruth', text: 'The cash box says $285.' },
        { speaker: 'benny', text: '...Huh.' },
        { speaker: 'tey', text: 'Two questions: what did Benny\'s change actually do, and does the total add up? Use Chapter 3.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the bake sale numbers.',
    items: [
      {
        kind: 'findBug',
        prompt: 'Benny asked only for "work on phones". Which line in the diff is a surprise?',
        lines: [
          '+ <meta name="viewport" content="width=device-width">',
          '+ .bar { width: 100%; }',
          '+ pledges.push({ name, amount: 55 });',
        ],
        bug: 2,
        fix: 'Remove it: it adds a $55 test pledge nobody made.',
        explanation: 'A made-up $55 pledge has nothing to do with phones. That\'s the gap between $340 and $285.',
        language: 'html',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Screen says $340. Cash box says $285. How much is the gap? (Number only.)',
        answers: ['55', '$55'],
        placeholder: 'Number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Benny ask the AI?',
        options: [
          { text: 'Fix the money', why: 'Which money? It needs specifics.' },
          { text: 'Make it better on phones', why: 'Same vague ask that caused the surprise.' },
          { text: 'You added "pledges.push({ name, amount: 55 })". I didn\'t ask for that. Why? Remove it and keep the phone changes.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to the lesson.',
        pairs: [
          ['Read the diff', 'What did it change?'],
          ['Ask it to explain', 'Why did it change that?'],
          ['Tick the brief', 'Does it do what I asked?'],
          ['Use real numbers', 'Looks right isn\'t a check'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'But it looked perfect on my phone!',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Then your phone is broken.', why: 'The phone was fine. The total was wrong.' },
          { text: 'Looking perfect and adding up are different checks. Let\'s add two sales and compare to the cash box.' },
          { text: 'Then it\'s fine.', why: 'Ruth\'s cash box disagrees by $55.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Real check, or not?',
        groups: ['Real check', 'Not a check'],
        items: [
          { text: 'Add $20 and $15, expect $35', group: 0 },
          { text: 'It looked perfect', group: 1 },
          { text: 'Compare the screen total to the cash box', group: 0 },
          { text: 'The AI said "All done!"', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Read a diff.',
        template: 'Lines starting with [[1]] were added. Lines starting with [[2]] were removed.',
        blanks: [['+'], ['-']],
        distractors: ['*', '#'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a good bug report?',
        options: [
          { text: 'What I tried, what I expected, and what happened' },
          { text: '"It\'s broken"', why: 'It doesn\'t know what\'s broken.' },
          { text: 'A long rant', why: 'Short and specific wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 2: why did the vague "work on phones" ask lead to surprises?',
        options: [
          { text: 'Phones are hard', why: 'The problem was the brief.' },
          { text: 'No limits or done-when, so it guessed what else to change' },
          { text: 'Benny typed fast', why: 'Speed wasn\'t the issue.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Checking a change, in order.',
        lines: [
          'Look at the diff summary: files and lines',
          'Read anything removed or surprising',
          'Ask it to explain anything unclear',
          'Test with real numbers from the brief',
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Fine. How will you stop this happening at the next bake sale?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'Ban Benny from the laptop.', why: 'Benny isn\'t the problem; unchecked changes are.' },
          { text: 'Hope.', why: 'Hope isn\'t a check.' },
          { text: 'Every change gets its diff read and a real-number check before we use it.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which check do you think you\'ll skip when you\'re in a hurry? What will remind you not to?',
  },
  deepen: {
    title: 'On your computer: check one change fully',
    summary: 'Make one small change to your tool. Then do all four: read the diff summary, read anything removed, ask it to explain, test with real numbers.',
  },
  notes: 'Review of Chapter 3 lessons 1–4 and Chapter 2.',
};

export default lesson;

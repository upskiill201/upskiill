import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 3. Step-by-step: persuading a senior audience (answer first; Minto pyramid principle). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Answer first',
  summary: 'Remi\'s first draft of Friday starts in Week 1: "So, six weeks ago, Brian gave me a folder..." Mrs Achieng reads it and says: "Mr Kamau will be checking his phone by slide two." Tey shows him how senior people like to hear things.',
  minutes: 12,
  outcomes: [
    'Open with the answer, not the history',
    'Structure a short senior presentation in five steps',
    'End with a clear ask',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A senior presentation in five steps',
      steps: [
        { title: '1. Answer first', body: '"Business refunds now take 4 days, down from 21. Zero new audit errors." Barbara Minto\'s pyramid principle, taught to consultants for decades: start with the main point, then support it. Senior people want the answer before the story.' },
        { title: '2. Why it matters to them', body: '"Mama Mboga Fresh has told us they\'re staying." Link the result to what the CEO cares about: customers, risk, money.' },
        { title: '3. How, in three parts', body: 'Three fixes, three owners, two minutes each: the warehouse form, Finance\'s sample-check, the shared reference number. Three is easy to follow.' },
        { title: '4. The honest bit', body: 'What\'s still fragile: "The new screen waits for next quarter. The sample-check needs a permanent owner." Senior people trust you more when you show the risks yourself.' },
        { title: '5. The ask', body: 'End with one clear decision you need: "Could Finance own the sample-check permanently, and could the screen be first in next quarter\'s IT plan?"' },
      ],
    },
    {
      kind: 'compare',
      title: 'The first 30 seconds',
      before: { label: 'Story first', text: '"So, six weeks ago, Brian gave me a folder about refunds, and I didn\'t really know where to start, so I went to visit..."' },
      after: { label: 'Answer first', text: '"Business refunds now take 4 days, down from 21, with zero new audit errors. Mama Mboga is staying. Five people did it. You\'ll hear from each of them."' },
      notes: ['Story first makes the CEO wait for the point.', 'Answer first gives the result, why it matters, and who did it in 20 seconds.', 'The story can still come. Just after the answer.'],
    },
  ],
  apply: {
    scenario: 'Rewriting Friday\'s opening.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Answer first', 'Why it matters to them', 'How, in three parts', 'The honest bit', 'The ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why open with the answer for a senior audience?',
        options: [
          { text: 'They don\'t like stories', why: 'Stories are fine, after the answer.' },
          { text: 'To save slides', why: 'It\'s about what they need first.' },
          { text: 'They want the main point first, then the support' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Answer first, or story first?',
        groups: ['Answer first', 'Story first'],
        items: [
          { text: '"Refunds now take 4 days."', group: 0 },
          { text: '"So, six weeks ago..."', group: 1 },
          { text: '"Mama Mboga is staying."', group: 0 },
          { text: '"I didn\'t know where to start..."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'And what will you ask him for at the end?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'Nothing, I just want to show him.', why: 'Without an ask, the fix may fade.' },
          { text: 'Finance owns the sample-check for good, and the screen goes first in next quarter\'s IT plan.' },
          { text: 'A promotion.', why: 'Self-orientation, at the worst moment.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Barbara Minto\'s structure is the ___ principle. (one word)',
        answers: ['pyramid', 'Pyramid'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why include "the honest bit"?',
        options: [
          { text: 'Showing the risks yourself builds trust with senior people' },
          { text: 'To lower expectations', why: 'It\'s honesty, not modesty.' },
          { text: 'It\'s required by audit', why: 'It\'s about credibility.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft close. Which line is the weak ask?',
        lines: [
          'Refunds: 21 days to 4, zero audit errors.',
          'Still fragile: the screen and the sample-check owner.',
          'Anyway, let us know if you have any thoughts!',
        ],
        bug: 2,
        fix: 'Could Finance own the sample-check, and the screen go first next quarter?',
        explanation: '"Any thoughts" isn\'t a decision. End with one clear ask.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Remi\'s line.',
        pairs: [
          ['Answer first', '"4 days, down from 21."'],
          ['Why it matters', '"Mama Mboga is staying."'],
          ['The honest bit', '"The screen waits for next quarter."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: '[[1]] first, then the [[2]]. End with an [[3]].',
        blanks: [['Answer', 'answer'], ['story', 'support'], ['ask']],
        distractors: ['Story', 'apology'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s first line.',
        tiles: ['Refunds', 'now', 'take', '4', 'days.'],
        distractors: ['So,'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the next update you\'ll give someone senior. Write the first sentence as the answer, not the history.',
    starters: ['My first sentence: ...', 'My ask: ...'],
  },
  deepen: {
    title: 'Flip one message',
    summary: 'Take your next long email or update and move the last sentence (usually the point) to the top. See if the reply comes faster.',
  },
  notes: 'Barbara Minto, The Pyramid Principle (1987; developed at McKinsey from the 1960s): lead with the governing thought, then supporting points. "Bottom line up front" (BLUF) is the same idea in military writing. Fictional figures.',
};

export default lesson;
